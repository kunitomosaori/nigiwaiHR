import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import axios from "axios";
import { TbPlus } from "react-icons/tb";

const SheetManagement = () => {
    const { props } = usePage();
    const { auth, isAdmin } = props;
    const [sheets, setSheets] = useState([]);
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sheetImages, setSheetImages] = useState([]);
    const [periodSettings, setPeriodSettings] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(auth.user.id);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [title, setTitle] = useState("");
    const [selectedPeriodId, setSelectedPeriodId] = useState("");
    const [selectedEvaluatorId, setSelectedEvaluatorId] = useState("");
    const [selectedEvaluatorDepartmentId, setSelectedEvaluatorDepartmentId] = useState("");

    useEffect(() => {
        axios
            .get(`api/my-sheet-images?user_id=${auth.user.id}`)
            .then((response) => {
                setSheetImages(response.data);
                console.log("取得したシート:", response.data);
            })
            .catch((error) => {
                console.error(
                    "Error fetching sheet images:",
                    error.response ? error.response.data : error.message
                );
            });

        axios
            .get('/api/period-settings')
            .then((response) => {
                setPeriodSettings(response.data.period_settings);
                console.log("取得した期間設定:", response.data.period_settings);
            })
            .catch((error) => {
                console.error(
                    "Error fetching period settings:",
                    error.response ? error.response.data : error.message
                );
            });

        axios
            .get("/departments")
            .then((response) => {
                setDepartments(response.data.departments);
            })
            .catch((error) => {
                console.error(
                    "Error fetching departments:",
                    error.response ? error.response.data : error.message
                );
            });

        axios
            .get("/api/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error fetching users:",
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
            .post("/sheets", {
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
            });
    };

    const handleAddSheetsForDepartment = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // JavaScriptの月は0-11の範囲なので+1する
        const period = month <= 6 ? "上半期" : "下半期";
        const title = `${year}${period}評価シート`;

        axios
            .post("/sheets/department", {
                title: title,
                department_id: selectedDepartmentId,
            })
            .then((response) => {
                const newSheets = response.data.sheets;
                setSheets([...sheets, ...newSheets]);
            })
            .catch((error) => {
                console.error(
                    "Error adding sheets for department:",
                    error.response ? error.response.data : error.message
                );
            });
    };

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartmentId(e.target.value);
    };

    const handleEvaluatorChange = (e) => {
        setSelectedEvaluatorId(e.target.value);
    };

    const handleEvaluatorDepartmentChange = (e) => {
        setSelectedEvaluatorDepartmentId(e.target.value);
    };

    const isFormValid = () => {
        return (
            (selectedUserId || selectedDepartmentId) &&
            (selectedEvaluatorId || selectedEvaluatorDepartmentId)
        );
    };

    return (
        <Layout>
            <div className="container mx-auto p-6 rounded-lg text-center flex justify-center mt-6">
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">シート一覧</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border border-gray-300">年度</th>
                                <th className="px-4 py-2 border border-gray-300">シートタイトル</th>
                                <th className="px-4 py-2 border border-gray-300">被評価者を選択</th>
                                <th className="px-4 py-2 border border-gray-300">被評価者を部署から選択</th>
                                <th className="px-4 py-2 border border-gray-300">評価者を選択</th>
                                <th className="px-4 py-2 border border-gray-300">評価者を部署から選択</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sheetImages.map((sheetImage) => (
                                <tr key={sheetImage.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{sheetImage.periodSetting}</td>
                                    <td className="border px-4 py-2">{sheetImage.title}</td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                </tr>
                            ))}
                            <tr className="hover:bg-gray-50">
                                <td className="border px-4 py-2">
                                    <select
                                        value={selectedPeriodId}
                                        onChange={(e) => setSelectedPeriodId(e.target.value)}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="">期間を選択</option>
                                        {periodSettings.map((periodSetting) => (
                                            <option key={periodSetting.id} value={periodSetting.id}>
                                                {periodSetting.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="border p-2 rounded w-full"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={selectedUserId}
                                        onChange={handleUserChange}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="">被評価者を選択</option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={selectedDepartmentId}
                                        onChange={handleDepartmentChange}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="">部門を選択</option>
                                        {departments.map((department) => (
                                            <option
                                                key={department.id}
                                                value={department.id}
                                            >
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={selectedEvaluatorId}
                                        onChange={handleEvaluatorChange}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="">評価者を選択</option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={selectedEvaluatorDepartmentId}
                                        onChange={handleEvaluatorDepartmentChange}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="">部門を選択</option>
                                        {departments.map((department) => (
                                            <option
                                                key={department.id}
                                                value={department.id}
                                            >
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6" className="border px-4 py-2 text-left">
                                    <button
                                        onClick={handleAddSheet}
                                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                                        disabled={!isFormValid()}
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
