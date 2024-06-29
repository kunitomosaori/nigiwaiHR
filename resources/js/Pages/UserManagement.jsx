import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Layout from "@/Layouts/Layout";

const UserManagement = () => {
    const [users, setUsers] = useState([]);

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
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">ユーザー管理</h1>
                    <Suspense fallback={<div>Loading...</div>}>
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
                    </Suspense>
                </div>
            </div>
        </Layout>
    );
};

export default UserManagement;
