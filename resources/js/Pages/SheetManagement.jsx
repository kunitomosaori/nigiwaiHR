import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import axios from "axios";
import { TbPlus } from "react-icons/tb";

const SheetManagement = () => {
    const { props } = usePage();
    const { auth } = props;
    const [sheets, setSheets] = useState([]);
    const [subordinates, setSubordinates] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(auth.user.id);

    useEffect(() => {
        axios
            .get(`/api/sheets?user_id=${selectedUserId}`)
            .then((response) => {
                console.log(response.data.sheets);
                setSheets(response.data.sheets);
            })
            .catch((error) => {
                console.error(
                    "Error fetching sheets:",
                    error.response ? error.response.data : error.message
                );
            });

        axios
            .get("/subordinates")
            .then((response) => {
                console.log(response.data.subordinates);
                setSubordinates(response.data.subordinates);
            })
            .catch((error) => {
                console.error(
                    "Error fetching subordinates:",
                    error.response ? error.response.data : error.message
                );
            });
    }, [selectedUserId]);

    const handleAddSheet = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // JavaScriptの月は0-11の範囲なので+1する
        const period = month <= 6 ? "上半期" : "下半期";
        const title = `${year}${period}評価シート`;

        axios
            .post("/api/sheets", {
                title: title,
                user_id: selectedUserId,
            })
            .then((response) => {
                const newSheet = response.data.sheet;
                setSheets([...sheets, newSheet]);
            })
            .catch((error) => {
                console.error(
                    "Error adding sheet:",
                    error.response ? error.response.data : error.message
                );
                // Added: log full error response
                console.log("Full error response:", error.response);
            });
    };

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    return (
        <Layout>
            <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center mt-6">
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">シート一覧</h2>
                    <div className="mb-4">
                        <label className="mr-2">ユーザーを選択：</label>
                        <select
                            value={selectedUserId}
                            onChange={handleUserChange}
                            className="border p-2 rounded"
                        >
                            <option value={auth.user.id}>
                                {auth.user.name}
                            </option>
                            {subordinates.map((subordinate) => (
                                <option
                                    key={subordinate.id}
                                    value={subordinate.id}
                                >
                                    {subordinate.name}
                                </option>
                            ))}
                        </select>
                    </div>
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
                                    <td className="border px-4 py-2">
                                        {sheet.title}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {sheet.created_at}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td
                                    colSpan="2"
                                    className="border px-4 py-2 text-left"
                                >
                                    <button
                                        onClick={handleAddSheet}
                                        className="flex items-center"
                                    >
                                        <TbPlus className="text-2xl mr-2" />{" "}
                                        新しいシートを追加
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
