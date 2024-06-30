import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import axios from "axios";
import { TbPlus } from "react-icons/tb";


const SheetManagement = () => {
    const { props } = usePage();
    const { auth } = props;
    const [sheets, setSheets] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/sheets?user_id=${auth.user.id}`)
            .then((response) => {
                console.log(response.data.sheets);
                setSheets(response.data.sheets);
            })
            .catch((error) => {
                console.error("Error fetching sheets:", error.response ? error.response.data : error.message);
            });
    }, [auth.user.id]);

    const handleAddSheet = () => {
        axios
            .post('/api/sheets', {
                title: "新しいシート",
                user_id: auth.user.id,
            })
            .then((response) => {
                const newSheet = response.data.sheet;
                setSheets([...sheets, newSheet]);
            })
            .catch((error) => {
                console.error("Error adding sheet:", error.response ? error.response.data : error.message);
                // Added: log full error response
                console.log("Full error response:", error.response);
            });
    };

    return (
        <Layout>
                <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center mt-6">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">シート一覧</h2>
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
                                <tr>
                                    <td colSpan="2" className="border px-4 py-2 text-left">
                                        <button onClick={handleAddSheet} className="flex items-center">
                                            <TbPlus className="text-2xl mr-2" /> 新しいシートを追加
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </Layout>
    );
};

export default SheetManagement;
