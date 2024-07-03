import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import axios from "axios";
import { TbPlus, TbChevronDown } from "react-icons/tb";

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
    const [isUserListOpen, setIsUserListOpen] = useState(false);
    const [isEvaluatorListOpen, setIsEvaluatorListOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedEvaluators, setSelectedEvaluators] = useState([]);

    useEffect(() => {
        axios
            .get(`api/sheet-images?user_id=${auth.user.id}`)
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
        if (!isFormValid()) {
            return;
        }

        axios
            // タイトルと期間を保存
            .post("/api/sheet-images", {
                title: title,
                period_id: selectedPeriodId,
            })
            .then((response) => {
                const newSheetImage = {
                    id: response.data.id,
                    title: response.data.title,
                    periodSetting: response.data.periodSetting,
                    createdBy: response.data.createdBy,
                };
                setSheetImages([...sheetImages, newSheetImage]);

                const connectionData = {
                    sheetImage_id: newSheetImage.id,
                    evaluatee_id: selectedUsers.map(user => user.id) || null,
                    evaluatee_department_id: selectedDepartmentId || null,
                    evaluator_id: selectedEvaluators.map(user => user.id) || null,
                    evaluator_department_id: selectedEvaluatorDepartmentId || null,
                };
                console.log("Connection Data:", connectionData);

                axios
                    .post("/api/connections-user-sheet", connectionData)
                    .then((response) => {
                        console.log("ConnectionsUserSheet created:", response.data);
                    })
                    .catch((error) => {
                        console.error(
                            "Error adding connections user sheet:",
                            error.response ? error.response.data : error.message
                        );
                    });
            })
            .catch((error) => {
                console.error(
                    "Error adding sheet image:",
                    error.response ? error.response.data : error.message
                );
            });
    };

    const handleUserChange = (user) => {
        setSelectedUsers([...selectedUsers, user]);
        setUsers(users.filter((u) => u.id !== user.id));
    };

    const handleEvaluatorChange = (user) => {
        setSelectedEvaluators([...selectedEvaluators, user]);
        setUsers(users.filter((u) => u.id !== user.id));
    };

    const isFormValid = () => {
        return (
            selectedPeriodId &&
            title &&
            (selectedUsers.length > 0 || selectedDepartmentId) &&
            (selectedEvaluators.length > 0 || selectedEvaluatorDepartmentId)
        );
    };

    return (
        <Layout>
            <div className="container mx-auto p-6 rounded-lg text-center flex justify-center mt-6 bg-white shadow-lg">
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">シート一覧</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border border-gray-300">年度</th>
                                <th className="px-4 py-2 border border-gray-300">シートタイトル</th>
                                <th className="px-4 py-2 border border-gray-300">被評価者を選択</th>
                                <th className="px-4 py-2 border border-gray-300">被評価者を部署から選択</th>
                                <th className="px-4 py-2 border border-gray-300">評価者を選択</th>
                                <th className="px-4 py-2 border border-gray-300">評価者を部署から選択</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-100">
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
                                <td className="border px-4 py-2 relative">
                                    <div className="border p-2 rounded w-full flex items-center justify-between">
                                        <div className="">被評価者を選択</div>
                                        <button
                                            onClick={() => setIsUserListOpen(!isUserListOpen)}
                                        >
                                            <TbChevronDown className="ml-2" />
                                        </button>
                                    </div>
                                    {isUserListOpen && (
                                        <div className="absolute bg-white border rounded mt-2 w-full z-10">
                                            {users.map((user) => (
                                                <div
                                                    key={user.id}
                                                    onClick={() => handleUserChange(user)}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    {user.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div>
                                        {selectedUsers.map((user) => (
                                            <div key={user.id} className="p-2">
                                                {user.name}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={selectedDepartmentId}
                                        onChange={(e) => setSelectedDepartmentId(e.target.value)}
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
                                <td className="border px-4 py-2 relative">
                                    <div className="border p-2 rounded w-full flex items-center justify-between">
                                        <div className="">評価者を選択</div>
                                        <button
                                            onClick={() => setIsEvaluatorListOpen(!isEvaluatorListOpen)}
                                        >
                                            <TbChevronDown className="ml-2" />
                                        </button>
                                    </div>
                                    {isEvaluatorListOpen && (
                                        <div className="absolute bg-white border rounded mt-2 w-full z-10">
                                            {users.map((user) => (
                                                <div
                                                    key={user.id}
                                                    onClick={() => handleEvaluatorChange(user)}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    {user.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div>
                                        {selectedEvaluators.map((user) => (
                                            <div key={user.id} className="p-2">
                                                {user.name}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={selectedEvaluatorDepartmentId}
                                        onChange={(e) => setSelectedEvaluatorDepartmentId(e.target.value)}
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
                                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                                        disabled={!isFormValid()}
                                    >
                                        <TbPlus className="text-2xl mr-2" />{" "}
                                        新しいシートを追加
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">過去に作成したシート</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border border-gray-300">年度</th>
                                <th className="px-4 py-2 border border-gray-300">シートタイトル</th>
                                <th className="px-4 py-2 border border-gray-300">被評価者を選択</th>
                                <th className="px-4 py-2 border border-gray-300">被評価者を部署から選択</th>
                                <th className="px-4a py-2 border border-gray-300">評価者を選択</th>
                                <th className="px-4 py-2 border border-gray-300">評価者を部署から選択</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sheetImages.map((sheetImage) => (
                                <tr key={sheetImage.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{sheetImage.periodSetting}</td>
                                    <td className="border px-4 py-2">{sheetImage.title}</td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default SheetManagement;

