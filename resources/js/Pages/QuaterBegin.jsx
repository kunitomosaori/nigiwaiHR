import React, { useState } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

const QuarterBegin = () => {
    const { isAdmin, status } = usePage().props; // 権限情報とステータスを取得
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 月を0始まりから1始まりに変換

    const [formData, setFormData] = useState({
        companyGoal: "",
        personalGoal: "",
        schedule: "",
        comments: [
            {
                item: "目標予算",
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
    const [showFinalRating, setShowFinalRating] = useState(
        false || status === 7
    );

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/insert_idl", formData)
            .then((response) => {
                console.log("Success:", response.data);
            })
            .catch((error) => {
                console.error(
                    "Error:",
                    error.response ? error.response.data : error.message
                );
            });
    };

    const isJuneOrDecember = currentMonth === 7 || currentMonth === 12;

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">目標承認</h1>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div
                        className={`bg-white border h-24 p-2 ${
                            isAdmin && status !== 7
                                ? ""
                                : "pointer-events-none opacity-50"
                        }`}
                    >
                        <textarea
                            name="companyGoal"
                            value={formData.companyGoal}
                            onChange={handleChange}
                            placeholder="会社目標"
                            className="w-full h-full"
                            disabled={!isAdmin || status === 7} // 管理者かつステータスが7以外で入力可
                        />
                    </div>
                    <div
                        className={`bg-white border h-24 p-2 ${
                            status === 1 && status !== 7
                                ? ""
                                : "pointer-events-none opacity-50"
                        }`}
                    >
                        <textarea
                            name="personalGoal"
                            value={formData.personalGoal}
                            onChange={handleChange}
                            placeholder="個人目標"
                            className="w-full h-full"
                            disabled={status !== 1 || status === 7} // ステータスが1かつ7以外で入力可
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
                                        status === 1 && status !== 7
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }`}
                                >
                                    <textarea
                                        name="schedule"
                                        value={formData.schedule}
                                        onChange={handleChange}
                                        className="w-full"
                                        disabled={status !== 1 || status === 7} // ステータスが1かつ7以外で入力可
                                    />
                                </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 3 &&
                                        isJuneOrDecember &&
                                        status !== 7
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
                                            !(
                                                status === 3 &&
                                                isJuneOrDecember &&
                                                status !== 7
                                            )
                                        } // ステータスが3かつ6月または12月かつ7以外で入力可
                                    />
                                </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 4 && status !== 7
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
                                        disabled={status !== 4 || status === 7} // ステータスが4かつ7以外で入力可
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
                                            disabled={status === 7} // ステータスが7の場合入力不可
                                        />
                                    </td>
                                )}
                                <td
                                    className={`border px-4 py-2 ${
                                        status === 1 && status !== 7
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
                                        disabled={status !== 1 || status === 7} // ステータスが1かつ7以外で入力可
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
                                        status === 3 &&
                                        isJuneOrDecember &&
                                        status !== 7
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
                                            !(
                                                status === 3 &&
                                                isJuneOrDecember &&
                                                status !== 7
                                            )
                                        } // ステータスが3かつ6月または12月かつ7以外で入力可
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
                                        status === 4 && status !== 7
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
                                        disabled={status !== 4 || status === 7} // ステータスが4かつ7以外で入力可
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
                                            disabled={status === 7} // ステータスが7の場合入力不可
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
                                            disabled={status === 7} // ステータスが7の場合入力不可
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
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            承認
                        </button>
                    )}
                    {status !== 2 && status !== 7 && (
                        <button
                            onClick={handleSubmit}
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
                            onClick={handleSubmit}
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

export default QuarterBegin;
