import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/Layouts/Layout";

const PersonalGoals = () => {
    const [values, setValues] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios
            .get("/api/personal-goals")
            .then((response) => {
                setValues(response.data.values);
                setIsAdmin(response.data.isAdmin);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <Layout>
            <div className="content-wrapper container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center mt-20 transition-margin duration-300">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">個人目標</th>
                            {isAdmin && (
                                <th className="px-4 py-2">ユーザー名</th>
                            )}
                            <th className="px-4 py-2">更新</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((v) => (
                            <tr key={v.id}>
                                <td className="border px-4 py-2">{v.goal}</td>
                                {isAdmin && (
                                    <td className="border px-4 py-2">
                                        {v.name}
                                    </td>
                                )}
                                <td className="border px-4 py-2">
                                    <a
                                        href={`detail_idl.php?id=${v.id}`}
                                        className="hover:text-orange-400"
                                    >
                                        更新
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default PersonalGoals;
