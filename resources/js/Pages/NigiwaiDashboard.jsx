import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import axios from "axios";

const NigiwaiDashboard = () => {
    const { props } = usePage();
    const { auth } = props;
    const [sheets, setSheets] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/user-sheets?user_id=${auth.user.id}`)
            .then((response) => {
                console.log(response.data.sheets); // デバッグ用ログ
                setSheets(response.data.sheets);
            })
            .catch((error) => {
                console.error("Error fetching sheets:", error.response ? error.response.data : error.message);
            });
    }, [auth.user.id]);

    return (
        <Layout>
                <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center mt-6">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">割り当てられたシート</h2>
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">シートタイトル</th>
                                    <th className="px-4 py-2">作成日</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sheets.map((sheet) => (
                                    <tr key={sheet.id}>
                                        <td className="border px-4 py-2">{sheet.title}</td>
                                        <td className="border px-4 py-2">{sheet.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </Layout>
    );
};

const LinkCard = ({ link, imgSrc, text }) => {
    return (
        <Link
            href={link}
            className="hover:text-orange-600 bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
        >
            <img src={imgSrc} alt={text} />
            <span>{text}</span>
        </Link>
    );
};

export default NigiwaiDashboard;
