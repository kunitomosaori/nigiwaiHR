import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

const Sheet = () => {
    const { isAdmin, sheetId } = usePage().props; // 権限情報、シートIDを取得

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 月を0始まりから1始まりに変換

    const [status, setStatus] = useState(null);
    const [formData, setFormData] = useState({
        sheetId: sheetId,
        companyGoal: "",
        personalGoal: "",
        comments: [
            {
                item: "目標予算",
                schedule: "",
                selfComment: "",
                managerComment: "",
                secondComment: "",
                weight: 0,
                selfRating: "",
                managerRating: "",
                secondRating: "",
                finalRating: "",
            },
            {
                item: "粗利益予算",
                schedule: "",
                selfComment: "",
                managerComment: "",
                secondComment: "",
                weight: 0,
                selfRating: "",
                managerRating: "",
                secondRating: "",
                finalRating: "",
            },
            {
                item: "改善項目（定量）",
                schedule: "",
                selfComment: "",
                managerComment: "",
                secondComment: "",
                weight: 0,
                selfRating: "",
                managerRating: "",
                secondRating: "",
                finalRating: "",
            },
        ],
    });

    const [showSecondComments, setShowSecondComments] = useState(false);
    const [showFinalRating, setShowFinalRating] = useState(false);

    useEffect(() => {
        // シートデータとステータスを取得するAPIコール
        axios
            .get(`/api/sheets/${sheetId}`)
            .then((response) => {
                const sheet = response.data.sheet;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    companyGoal: sheet.company_goal,
                    personalGoal: sheet.personal_goal,
                    comments:
                        sheet.performances.length > 0
                            ? sheet.performances.map((performance, index) => ({
                                  ...formData.comments[index],
                                  schedule: performance.schedule,
                                  weight: performance.weight,
                                  selfComment: performance.self_comment,
                                  selfRating: performance.self_evaluation,
                                  managerComment:
                                      performance.supervisor_comment,
                                  managerRating:
                                      performance.supervisor_evaluation,
                                  secondComment: performance.second_comment,
                                  secondRating: performance.second_evaluation,
                              }))
                            : formData.comments, // シートのperformanceがない場合、既存のコメントデータを使用
                }));
                setStatus(sheet.sheet_status_id);
            })
            .catch((error) => {
                console.error("Error fetching sheet data:", error);
            });
    }, [sheetId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCommentChange = (index, field, value) => {
        const updatedComments = formData.comments.map((comment, i) =>
            i === index ? { ...comment, [field]: value } : comment
        );
        setFormData({ ...formData, comments: updatedComments });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (status === 1) {
            handleSubmit(e);
        } else if (status === 3 && isJulyOrDecember) {
            handleCommentUpdate(e);
        } else if (status === 4) {
            handleSupervisorUpdate(e);
        } else if (status === 5) {
            handleSecondUpdate(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedSheetData = {
            personalGoal: formData.personalGoal,
            sheet_status_id: 2,
            performances: formData.comments.map((comment, index) => ({
                detail_type: index + 1,
                schedule: comment.schedule,
                weight: comment.weight,
            })),
        };

        axios
            .put(`/api/sheets/${formData.sheetId}`, updatedSheetData)
            .then((response) => {
                console.log("Sheet updated successfully:", response.data);
                setStatus(2); // ステータスを2に更新
            })
            .catch((error) => {
                console.error("Error updating sheet:", error);
            });
    };

    const handleCommentUpdate = (e) => {
        e.preventDefault();
        const updatedCommentsData = {
            comments: formData.comments.map((comment, index) => ({
                detail_type: index + 1,
                self_comment: comment.selfComment,
                self_evaluation: comment.selfRating,
            })),
        };

        axios
            .put(
                `/api/sheets/${formData.sheetId}/comments-and-status`,
                updatedCommentsData
            )
            .then((response) => {
                setStatus(4); // ステータスを4に更新
                console.log(
                    "Comments and status updated successfully:",
                    response.data
                );
            })
            .catch((error) => {
                console.error("Error updating comments and status:", error);
            });
    };

    const handleSupervisorUpdate = (e) => {
        e.preventDefault();
        const updatedSupervisorCommentsData = {
            comments: formData.comments.map((comment, index) => ({
                detail_type: index + 1,
                supervisor_comment: comment.managerComment,
                supervisor_evaluation: comment.managerRating,
            })),
        };

        axios
            .put(
                `/api/sheets/${formData.sheetId}/supervisor-comments-and-status`,
                updatedSupervisorCommentsData
            )
            .then((response) => {
                setStatus(5); // ステータスを5に更新
                console.log(
                    "Supervisor comments and status updated successfully:",
                    response.data
                );
            })
            .catch((error) => {
                console.error(
                    "Error updating supervisor comments and status:",
                    error
                );
            });
    };

    const handleSecondUpdate = (e) => {
        e.preventDefault();
        const updatedSecondCommentsData = {
            comments: formData.comments.map((comment, index) => ({
                detail_type: index + 1,
                second_comment: comment.secondComment,
                second_evaluation: comment.secondRating,
            })),
        };

        axios
            .put(
                `/api/sheets/${formData.sheetId}/second-comments-and-status`,
                updatedSecondCommentsData
            )
            .then((response) => {
                setStatus(6); // ステータスを6に更新
                console.log(
                    "Second comments and status updated successfully:",
                    response.data
                );
            })
            .catch((error) => {
                console.error(
                    "Error updating second comments and status:",
                    error
                );
            });
    };

    const handleFinalApproval = (e) => {
        e.preventDefault();
        const updatedFinalCommentsData = {
            comments: formData.comments.map((comment, index) => ({
                detail_type: index + 1,
                final_evaluation: comment.finalRating,
            })),
        };

        axios
            .put(
                `/api/sheets/${formData.sheetId}/final-approval`,
                updatedFinalCommentsData
            )
            .then((response) => {
                setStatus(7); // ステータスを7に更新
                console.log(
                    "Final approval and status updated successfully:",
                    response.data
                );
            })
            .catch((error) => {
                console.error(
                    "Error updating final approval and status:",
                    error
                );
            });
    };

    const handleApprove = () => {
        axios
            .put(`/api/sheets/${formData.sheetId}/status`, {
                sheet_status_id: 3,
            })
            .then((response) => {
                setStatus(3); // ステータスを3に更新
                console.log("Sheet approved successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error approving sheet:", error);
            });
    };

    const isJulyOrDecember =
        new Date().getMonth() + 1 === 7 || new Date().getMonth() + 1 === 12;

    const getStatusHeader = () => {
        switch (status) {
            case 1:
                return {
                    title: "目標設定（期初）",
                    description:
                        "個人目標・スケジュール・ウエイトを入力してください",
                };
            case 2:
                return {
                    title: "目標承認（期初）",
                    description:
                        "個人目標を確認し問題なければ承認ボタンを押してください",
                };
            case 3:
                return {
                    title: "本人評価（期末）",
                    description:
                        "個人目標に対する本人コメント・評価を実施してください",
                };
            case 4:
                return {
                    title: "上司評価（期末）",
                    description:
                        "個人目標に対する上司コメント・評価を実施してください",
                };
            case 5:
                return {
                    title: "二次評価（期末）",
                    description:
                        "個人目標に対する二次コメント・評価を実施してください",
                };
            case 6:
                return {
                    title: "最終評価（期末）",
                    description: "個人目標に対する最終評価を実施してください",
                };
            case 7:
                return {
                    title: "最終評価決定済み（期末）",
                    description: "個人目標に対する最終評価をご確認ください",
                };
            default:
                return { title: "", description: "" };
        }
    };

    const { title, description } = getStatusHeader();

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-lg">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white border h-24 p-2 pointer-events-none opacity-50">
                        <textarea
                            name="companyGoal"
                            value={formData.companyGoal}
                            onChange={handleChange}
                            placeholder="会社目標"
                            className="w-full h-full"
                            disabled={true} // 常に入力不可
                        />
                    </div>
                    <div
                        className={`bg-white border h-24 p-2 ${
                            status === 1 ? "" : "pointer-events-none opacity-50"
                        }`}
                    >
                        <textarea
                            name="personalGoal"
                            value={formData.personalGoal}
                            onChange={handleChange}
                            placeholder="個人目標"
                            className="w-full h-full"
                            disabled={status !== 1}
                        />
                    </div>
                </div>

                <table className="w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">項目</th>
                            <th className="px-4 py-2">
                                達成目標の具体的施策・スケジュール
                            </th>
                            <th className="px-4 py-2">本人コメント</th>
                            <th className="px-4 py-2">上司コメント</th>
                            {showSecondComments && (
                                <th className="px-4 py-2">二次コメント</th>
                            )}
                            <th className="px-4 py-2">ウエイト</th>
                            <th className="px-4 py-2">本人評価</th>
                            <th className="px-4 py-2">上司評価</th>
                            {showSecondComments && (
                                <th className="px-4 py-2">二次評価</th>
                            )}
                            {showFinalRating && (
                                <th className="px-4 py-2">最終評価</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {formData.comments.map((comment, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    {comment.item}
                                </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 1
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }`}
                                >
                                    <textarea
                                        value={comment.schedule}
                                        onChange={(e) =>
                                            handleCommentChange(
                                                index,
                                                "schedule",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        disabled={status !== 1}
                                    />
                                </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 3 && isJulyOrDecember
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }`}
                                >
                                    <textarea
                                        value={comment.selfComment}
                                        onChange={(e) =>
                                            handleCommentChange(
                                                index,
                                                "selfComment",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        disabled={
                                            !(status === 3 && isJulyOrDecember)
                                        }
                                    />
                                </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 4
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }`}
                                >
                                    <textarea
                                        value={comment.managerComment}
                                        onChange={(e) =>
                                            handleCommentChange(
                                                index,
                                                "managerComment",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        disabled={status !== 4}
                                    />
                                </td>
                                {showSecondComments && (
                                    <td className="border px-4 py-2">
                                        <textarea
                                            value={comment.secondComment}
                                            onChange={(e) =>
                                                handleCommentChange(
                                                    index,
                                                    "secondComment",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                            disabled={
                                                status === 7 || status > 5
                                            }
                                        />
                                    </td>
                                )}
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 1
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }`}
                                >
                                    <select
                                        value={comment.weight}
                                        onChange={(e) =>
                                            handleCommentChange(
                                                index,
                                                "weight",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        disabled={status !== 1}
                                    >
                                        {[...Array(11).keys()].map((i) => (
                                            <option key={i} value={i * 10}>
                                                {i * 10}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 3 && isJulyOrDecember
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }`}
                                >
                                    <select
                                        value={comment.selfRating}
                                        onChange={(e) =>
                                            handleCommentChange(
                                                index,
                                                "selfRating",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        disabled={
                                            !(status === 3 && isJulyOrDecember)
                                        }
                                    >
                                        {["", "S", "A", "B", "C", "D"].map(
                                            (rating) => (
                                                <option
                                                    key={rating}
                                                    value={rating}
                                                >
                                                    {rating}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 4
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }`}
                                >
                                    <select
                                        value={comment.managerRating}
                                        onChange={(e) =>
                                            handleCommentChange(
                                                index,
                                                "managerRating",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        disabled={status !== 4}
                                    >
                                        {["", "S", "A", "B", "C", "D"].map(
                                            (rating) => (
                                                <option
                                                    key={rating}
                                                    value={rating}
                                                >
                                                    {rating}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </td>
                                {showSecondComments && (
                                    <td className="border px-4 py-2">
                                        <select
                                            value={comment.secondRating}
                                            onChange={(e) =>
                                                handleCommentChange(
                                                    index,
                                                    "secondRating",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                            disabled={
                                                status === 7 || status > 5
                                            }
                                        >
                                            {["", "S", "A", "B", "C", "D"].map(
                                                (rating) => (
                                                    <option
                                                        key={rating}
                                                        value={rating}
                                                    >
                                                        {rating}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </td>
                                )}
                                {showFinalRating && (
                                    <td className="border px-4 py-2">
                                        <select
                                            value={comment.finalRating}
                                            onChange={(e) =>
                                                handleCommentChange(
                                                    index,
                                                    "finalRating",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                            disabled={status === 7}
                                        >
                                            {["", "S", "A", "B", "C", "D"].map(
                                                (rating) => (
                                                    <option
                                                        key={rating}
                                                        value={rating}
                                                    >
                                                        {rating}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 flex justify-center space-x-4">
                    {status === 2 && (
                        <button
                            onClick={handleApprove}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            承認
                        </button>
                    )}
                    {status === 3 && isJulyOrDecember && (
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            本人コメント・評価を保存
                        </button>
                    )}
                    {status === 4 && (
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            上司コメント・評価を保存
                        </button>
                    )}
                    {status !== 2 &&
                        status !== 7 &&
                        status !== 4 &&
                        status !== 3 &&
                        status !== 6 && (
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                保存
                            </button>
                        )}
                    {status === 5 && !showSecondComments && (
                        <button
                            onClick={() => setShowSecondComments(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            コメント/評価を追加
                        </button>
                    )}
                    {status === 6 && !showFinalRating && (
                        <button
                            onClick={() => setShowFinalRating(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            最終承認確認
                        </button>
                    )}
                    {showFinalRating && status === 6 && (
                        <button
                            onClick={handleFinalApproval}
                            className="bg-red-300 text-white px-4 py-2 rounded-md"
                        >
                            最終承認
                        </button>
                    )}
                </div>
                {status === 7 && (
                    <h2 className="text-red-500 text-2xl text-center">
                        承認済み
                    </h2>
                )}
            </div>
        </Layout>
    );
};

export default Sheet;
