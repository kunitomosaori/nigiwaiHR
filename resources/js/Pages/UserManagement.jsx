import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Layout from "@/Layouts/Layout";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [viewMode, setViewMode] = useState('table'); // 追加: ビューモードの状態を管理

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data || []); // 修正: デフォルト値として空配列を設定
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">ユーザー管理</h1>
                    <div className="mb-4 flex space-x-2">
                        <button
                            className={`px-4 py-2 rounded-lg shadow-md ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-400'}`}
                            onClick={() => setViewMode('table')}
                        >
                            テーブル表示
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg shadow-md ${viewMode === 'board' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-400'}`}
                            onClick={() => setViewMode('board')}
                        >
                            ボード表示
                        </button>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        {viewMode === 'table' ? (
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">名前</th>
                                        <th className="py-2 px-4 border-b text-left">メール</th>
                                        <th className="py-2 px-4 border-b text-left">ポジション</th>
                                        <th className="py-2 px-4 border-b text-left">等級</th>
                                        <th className="py-2 px-4 border-b text-left">部署</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="py-2 px-4 border-b">{user.name}</td>
                                            <td className="py-2 px-4 border-b">{user.email}</td>
                                            <td className="py-2 px-4 border-b">{user.position}</td>
                                            <td className="py-2 px-4 border-b">{user.grade}</td>
                                            <td className="py-2 px-4 border-b">{user.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {users.map(user => (
                                    <div key={user.id} className="bg-white p-4 border rounded shadow">
                                        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
                                        <p className="mb-1"><strong>メール:</strong> {user.email}</p>
                                        <p className="mb-1"><strong>ポジション:</strong> {user.position}</p>
                                        <p className="mb-1"><strong>等級:</strong> {user.grade}</p>
                                        <p className="mb-1"><strong>部署:</strong> {user.department}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Suspense>
                </div>
            </div>
        </Layout>
    );
};

export default UserManagement;
