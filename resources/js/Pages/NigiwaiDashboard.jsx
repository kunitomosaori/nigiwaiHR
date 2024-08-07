import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import axios from "axios";

const NigiwaiDashboard = () => {
    const { props } = usePage();
    const { auth } = props;
    const [mySheets, setMySheets] = useState([]);
    const [approvalSheets, setApprovalSheets] = useState([]);
    const [activeTab, setActiveTab] = useState("mySheets");
    // activeTab=mySheets自分宛のシートと承認   activeTab=approvalSheets承認/評価するシート
    const [filter, setFilter] = useState("all");
    const [yearFilter, setYearFilter] = useState("all");

    useEffect(() => {
        axios
            .get(`/api/my/connections-user-sheet`)
            .then((response) => {
                const connections = response.data;
                console.log('Connections:', connections); // コンソールに出力
                const approvalSheetImageIds = connections.filter(conn => conn.role === 'evaluator').map(conn => conn.sheetImage_id);
                console.log('Approval Sheet Image IDs:', approvalSheetImageIds);

                axios
                    .get(`/api/sheets-evaluatee`)
                    .then((response) => {
                        console.log(response.data.sheets); // デバッグ用ログ
                        setMySheets(response.data.sheets.map(sheet => ({
                            id: sheet.id,
                            evaluatee_id: sheet.evaluatee_id,
                            sheetImage_id: sheet.sheetImage_id,
                            sheet_status_id: sheet.sheet_status_id,
                            personal_goal: sheet.personal_goal,
                            created_at: sheet.created_at,
                            updated_at: sheet.updated_at,
                            sheet_image: {
                                id: sheet.sheet_image.id,
                                title: sheet.sheet_image.title,
                                created_at: sheet.sheet_image.created_at,
                                updated_at: sheet.sheet_image.updated_at,
                                created_by_id: sheet.sheet_image.created_by_id,
                                period_id: sheet.sheet_image.period_id,
                            },
                        })));
                    })
                    .catch((error) => {
                        console.error("Error fetching my sheets:", error.response ? error.response.data : error.message);
                    });

                axios
                .get(`/api/sheets-evaluator`, { params: { sheetImage_ids: approvalSheetImageIds }})
                .then((response) => {
                        console.log(response.data.sheets); // デバッグ用ログ
                        setApprovalSheets(response.data.sheets.map(sheet => ({
                            id: sheet.id,
                            evaluatee_id: sheet.evaluatee_id,
                            sheetImage_id: sheet.sheetImage_id,
                            sheet_status_id: sheet.sheet_status_id,
                            personal_goal: sheet.personal_goal,
                            created_at: sheet.created_at,
                            updated_at: sheet.updated_at,
                            sheet_image: {
                                id: sheet.sheet_image.id,
                                title: sheet.sheet_image.title,
                                created_at: sheet.sheet_image.created_at,
                                updated_at: sheet.sheet_image.updated_at,
                                created_by_id: sheet.sheet_image.created_by_id,
                                period_id: sheet.sheet_image.period_id,
                            },
                        })));
                    })
                    .catch((error) => {
                        console.error("Error fetching approval sheets:", error.response ? error.response.data : error.message);
                    });
            })
            .catch((error) => {
                console.error("Error fetching connections:", error.response ? error.response.data : error.message);
            });
    }, [auth.user.id]);

    const filterSheets = (type) => {
        let filteredSheets = [];
        if (type === "mySheets") {
            filteredSheets = mySheets;
        } else if (type === "approvalSheets") {
            filteredSheets = approvalSheets;
        }

        if (filter === "unsubmitted") {
            if (type === "mySheets") {
                filteredSheets = filteredSheets.filter(sheet => sheet.sheet_status_id === 1);
            } else if (type === "approvalSheets") {
                filteredSheets = filteredSheets.filter(sheet => sheet.sheet_status_id === 2);
            }
        } else if (filter === "unreviewed") {
            if (type === "mySheets") {
                filteredSheets = filteredSheets.filter(sheet => sheet.sheet_status_id === 3);
            } else if (type === "approvalSheets") {
                filteredSheets = filteredSheets.filter(sheet => sheet.sheet_status_id === 4);
            }
        }
        return filteredSheets;
    };

    const getStatusAction = (statusId, type) => {
        if (type === "mySheets") {
            switch (statusId) {
                case 1:
                    return "提出してください";
                case 2:
                    return "承認待ち";
                case 3:
                    return "振り返りをしてください";
                case 4:
                    return "評価待ち";
                default:
                    return "不明なステータス";
            }
        } else if (type === "approvalSheets") {
            switch (statusId) {
                case 1:
                    return "提出待ち";
                case 2:
                    return "承認してください";
                case 3:
                    return "振り返り待ち";
                case 4:
                    return "評価してください";
                default:
                    return "不明なステータス";
            }
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-6 rounded-lg text-center flex justify-center mt-6">
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">シート一覧画面</h2>
                    <div className="mb-4 flex justify-center border-b-2 border-gray-300">
                        <button
                            className={`px-4 py-2 ${activeTab === "mySheets" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                            onClick={() => {
                                setActiveTab("mySheets");
                            }}
                        >
                            自分宛のシート
                        </button>
                        <button
                            className={`px-4 py-2 ml-2 ${activeTab === "approvalSheets" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                            onClick={() => setActiveTab("approvalSheets")}
                        >
                            承認/評価するシート
                        </button>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex">
                            <button
                                className={`px-4 py-2 mx-1 rounded-full ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                onClick={() => setFilter("all")}
                            >
                                全て
                            </button>
                            <button
                                className={`px-4 py-2 mx-1 rounded-full ${filter === "unsubmitted" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                onClick={() => setFilter("unsubmitted")}
                            >
                                {activeTab === "mySheets" ? "未提出" : "未承認"}
                            </button>
                            <button
                                className={`px-4 py-2 mx-1 rounded-full ${filter === "unreviewed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                onClick={() => setFilter("unreviewed")}
                            >
                                {activeTab === "mySheets" ? "未振り返り" : "未評価"}
                            </button>
                        </div>
                        <select
                            className="px-10 py-2 rounded-full bg-gray-200 text-gray-700"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                        >
                            <option value="all">全ての年度</option>
                            <option value="2023前期">2023年度前期</option>
                            <option value="2023後期">2023年度後期</option>
                            <option value="2024前期">2024年度前期</option>
                            <option value="2024後期">2024年度後期</option>
                        </select>
                    </div>
                    {activeTab === "mySheets" && (
                        <div>
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-300">シート作成者</th>
                                        <th className="px-4 py-2 border border-gray-300">シートタイトル</th>
                                        <th className="px-4 py-2 border border-gray-300">進捗</th>
                                        <th className="px-4 py-2 border border-gray-300">あなたがやること</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterSheets("mySheets").map((sheet) => (
                                        <tr key={sheet.id} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{sheet.sheet_image.created_by_id}</td>
                                            <td className="border px-4 py-2">
                                                <Link href={`/sheet/${sheet.id}`} className="text-blue-500 hover:underline">
                                                    {sheet.sheet_image.title}
                                                </Link>
                                            </td>
                                            <td className="border px-4 py-2">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${sheet.progress}%` }}>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border px-4 py-2">{getStatusAction(sheet.sheet_status_id, "mySheets")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === "approvalSheets" && (
                        <div>
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-300">シート作成者</th>
                                        <th className="px-4 py-2 border border-gray-300">シートタイトル</th>
                                        <th className="px-4 py-2 border border-gray-300">進捗</th>
                                        <th className="px-4 py-2 border border-gray-300">あなたがやること</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterSheets("approvalSheets").map((sheet) => (
                                        <tr key={sheet.id} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{sheet.sheet_image.created_by_id}</td>
                                            <td className="border px-4 py-2">
                                                <Link href={`/sheet/${sheet.id}`} className="text-blue-500 hover:underline">
                                                    {sheet.sheet_image.title}
                                                </Link>
                                            </td>
                                            <td className="border px-4 py-2">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${sheet.progress}%` }}>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border px-4 py-2">{getStatusAction(sheet.sheet_status_id, "approvalSheets")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default NigiwaiDashboard;
