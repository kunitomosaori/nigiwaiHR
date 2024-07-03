import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Layout from "@/Layouts/Layout";
import { TbPlus } from "react-icons/tb";
import { Link } from "@inertiajs/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [grades, setGrades] = useState([]); // 追加: グレードの状態を管理
    const [viewMode, setViewMode] = useState('table'); // 追加: ビューモードの状態を管理
    const [groupMode, setGroupMode] = useState('none'); // 追加: グループモードの状態を管理
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        position: "",
        grade: "",
        department: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data || []); // 修正: デフォルト値として空配列を設定
                console.log('取得したユーザーの一覧:', response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

        axios.get('/api/user-grades')
            .then(response => {
                setGrades(response.data.grades || []); // 追加: グレードの一覧を取得
                console.log('取得したグレードの一覧:', response.data.grades);
            })
            .catch(error => {
                console.error('Error fetching grades:', error);
            });
    }, []);

    const handleAddUser = () => {
        const newErrors = {};
        if (!newUser.name) newErrors.name = "入力が必要です";
        if (!newUser.email) newErrors.email = "入力が必要です";
        if (!newUser.position) newErrors.position = "入力が必要です";
        if (!newUser.grade) newErrors.grade = "入力が必要です";
        if (!newUser.department) newErrors.department = "入力が必要です";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post('/api/users', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUser({
                    name: "",
                    email: "",
                    position: "",
                    grade: "",
                    department: ""
                });
                setErrors({});
            })
            .catch(error => {
                console.error('Error adding user:', error);
            });
    };

    const groupUsers = (users, groupMode) => {
        if (groupMode === 'grade') {
            const grouped = grades.reduce((groups, grade) => {
                groups[grade.name] = [];
                return groups;
            }, {});
            users.forEach(user => {
                const gradeName = grades.find(g => g.id === user.grade_id)?.name || '未設定';
                if (!grouped[gradeName]) {
                    grouped[gradeName] = [];
                }
                grouped[gradeName].push(user);
            });
            return grouped;
        } else if (groupMode === 'department') {
            return users.reduce((groups, user) => {
                const department = user.department || '未設定';
                if (!groups[department]) {
                    groups[department] = [];
                }
                groups[department].push(user);
                return groups;
            }, {});
        } else {
            return { '全ユーザー': users };
        }
    };

    const groupedUsers = groupUsers(users, groupMode);

    //ドラッグ・アンド・ドロップが終わった後の処理
    const onDragEnd = (result) => {
        // ドラッグ元とドロップ先の情報を取得
        const { source, destination } = result;
        console.log('source:', source);
        console.log('destination:', destination);

        // ドロップ先が存在しない場合は何もしない
        if (!destination) return;

        // ドラッグ元とドロップ先のグループIDを取得
        const sourceGroup = source.droppableId;
        const destinationGroup = destination.droppableId;

        // ドラッグ元とドロップ先が同じグループの場合は何もしない
        if (sourceGroup === destinationGroup) return;

        // ドラッグされたユーザーを取得
        const user = groupedUsers[sourceGroup][source.index];
        // ユーザー情報を更新するためにコピーを作成
        const updatedUser = { ...user };

        // グループモードがグレードの場合、ユーザーのグレードIDを更新
        if (groupMode === 'grade') {
            const newGrade = grades.find(grade => grade.name === destinationGroup);
            updatedUser.grade_id = newGrade.id;

            // ユーザーのグレードIDを更新するAPIリクエストを送信
            axios.put(`/api/users/${user.id}`, { grade_id: newGrade.id })
                .then(response => {
                    setUsers(users.map(u => u.id === user.id ? response.data : u));
                })
                .catch(error => {
                    console.error('Error updating user grade:', error);
                });
        // グループモードが部署の場合、ユーザーの部署を更新
        } else if (groupMode === 'department') {
            updatedUser.department = destinationGroup;

            // ユーザーの部署を更新するAPIリクエストを送信
            axios.put(`/api/users/${user.id}`, { department: destinationGroup })
                .then(response => {
                    setUsers(users.map(u => u.id === user.id ? response.data : u));
                })
                .catch(error => {
                    console.error('Error updating user department:', error);
                });
        }

        // 更新されたユーザー情報をコンソールに出力
        console.log('Updated User:', updatedUser);
    };

    return (
        <Layout>
            <div className="container mx-auto p-6 rounded-lg text-center flex justify-center mt-6">
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">ユーザー管理</h2>
                    <div className="mb-4 flex justify-center border-b-2 border-gray-300">
                        <button
                            className={`px-4 py-2 ${viewMode === 'table' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setViewMode('table')}
                        >
                            テーブル表示
                        </button>
                        <button
                            className={`px-4 py-2 ml-2 ${viewMode === 'board' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setViewMode('board')}
                        >
                            ボード表示
                        </button>
                    </div>
                    <div className="mb-4 flex justify-center border-b-2 border-gray-300">
                        <button
                            className={`px-4 py-2 ${groupMode === 'none' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setGroupMode('none')}
                        >
                            グループなし
                        </button>
                        <button
                            className={`px-4 py-2 ml-2 ${groupMode === 'grade' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setGroupMode('grade')}
                        >
                            グレードでグループ
                        </button>
                        <button
                            className={`px-4 py-2 ml-2 ${groupMode === 'department' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setGroupMode('department')}
                        >
                            部署でグループ
                        </button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">新しいユーザーを追加</h2>
                        <table className="min-w-full bg-white mb-4">
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            placeholder="名前"
                                            value={newUser.name}
                                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                            className={`border p-2 rounded w-full ${errors.name ? 'border-red-500' : ''}`}
                                        />
                                        {errors.name ? <p className="text-red-500 text-xs mt-1">{errors.name}</p> : <p className="text-red-500 text-xs mt-1">&nbsp;</p>}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="email"
                                            placeholder="メール"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                            className={`border p-2 rounded w-full ${errors.email ? 'border-red-500' : ''}`}
                                        />
                                        {errors.email ? <p className="text-red-500 text-xs mt-1">{errors.email}</p> : <p className="text-red-500 text-xs mt-1">&nbsp;</p>}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            placeholder="ポジション"
                                            value={newUser.position}
                                            onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                                            className={`border p-2 rounded w-full ${errors.position ? 'border-red-500' : ''}`}
                                        />
                                        {errors.position ? <p className="text-red-500 text-xs mt-1">{errors.position}</p> : <p className="text-red-500 text-xs mt-1">&nbsp;</p>}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <select
                                            value={newUser.grade}
                                            onChange={(e) => setNewUser({ ...newUser, grade: e.target.value })}
                                            className={`border p-2 rounded w-full ${errors.grade ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">等級を選択</option>
                                            {grades.map(grade => (
                                                <option key={grade.id} value={grade.id}>{grade.name}</option>
                                            ))}
                                        </select>
                                        {errors.grade ? <p className="text-red-500 text-xs mt-1">{errors.grade}</p> : <p className="text-red-500 text-xs mt-1">&nbsp;</p>}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            placeholder="部署"
                                            value={newUser.department}
                                            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                                            className={`border p-2 rounded w-full ${errors.department ? 'border-red-500' : ''}`}
                                        />
                                        {errors.department ? <p className="text-red-500 text-xs mt-1">{errors.department}</p> : <p className="text-red-500 text-xs mt-1">&nbsp;</p>}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={handleAddUser}
                                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                                        >
                                            <TbPlus className="text-2xl mr-2" /> 追加
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {viewMode === 'table' ? (
                                Object.keys(groupedUsers).map(group => (
                                    <div key={group} className="mb-6">
                                        <h2 className="text-2xl font-bold mb-4 bg-gray-200 p-2 rounded">{group}</h2>
                                        <Droppable droppableId={group}>
                                            {(provided) => (
                                                <table className="min-w-full bg-white mb-4 shadow-md rounded" ref={provided.innerRef} {...provided.droppableProps}>
                                                    <thead>
                                                        <tr className="bg-gray-100">
                                                            <th className="py-2 px-4 border-b text-left">名前</th>
                                                            <th className="py-2 px-4 border-b text-left">メール</th>
                                                            <th className="py-2 px-4 border-b text-left">ポジション</th>
                                                            <th className="py-2 px-4 border-b text-left">等級</th>
                                                            <th className="py-2 px-4 border-b text-left">部署</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {groupedUsers[group].map((user, index) => (
                                                            <Draggable key={user.id} draggableId={user.id.toString()} index={index}>
                                                                {(provided) => (
                                                                    <tr
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="hover:bg-gray-50"
                                                                    >
                                                                        <td className="py-2 px-4 border-b">{user.name}</td>
                                                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                                                        <td className="py-2 px-4 border-b">{user.position}</td>
                                                                        <td className="py-2 px-4 border-b">{grades.find(g => g.id === user.grade_id)?.name || '未設定'}</td>
                                                                        <td className="py-2 px-4 border-b">{user.department}</td>
                                                                    </tr>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </tbody>
                                                </table>
                                            )}
                                        </Droppable>
                                    </div>
                                ))
                            ) : (
                                Object.keys(groupedUsers).map(group => (
                                    <div key={group} className="mb-6">
                                        <h2 className="text-2xl font-bold mb-4 bg-gray-200 p-2 rounded">{group}</h2>
                                        <Droppable droppableId={group}>
                                            {(provided) => (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" ref={provided.innerRef} {...provided.droppableProps}>
                                                    {groupedUsers[group].map((user, index) => (
                                                        <Draggable key={user.id} draggableId={user.id.toString()} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="bg-white p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300"
                                                                >
                                                                    <h2 className="text-xl font-bold mb-2">{user.name}</h2>
                                                                    <p className="mb-1"><strong>メール:</strong> {user.email}</p>
                                                                    <p className="mb-1"><strong>ポジション:</strong> {user.position}</p>
                                                                    <p className="mb-1"><strong>等級:</strong> {grades.find(g => g.id === user.grade_id)?.name || '未設定'}</p>
                                                                    <p className="mb-1"><strong>部署:</strong> {user.department}</p>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                ))
                            )}
                        </DragDropContext>
                    </Suspense>
                </div>
            </div>
        </Layout>
    );
};

export default UserManagement;

