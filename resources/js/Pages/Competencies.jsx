import React, { useState, useEffect } from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

const CompetenciesCreate = () => {
    const { sheetId, competencyItems, competencies, status } = usePage().props;
    const { data, setData, post, errors } = useForm({
        sheetId: sheetId,
        competencies: competencyItems.map((item) => {
            const existingCompetency = competencies.find(
                (c) => c.competency_id === item.id
            );
            return {
                competency_id: item.id,
                self_evaluation: existingCompetency
                    ? existingCompetency.self_evaluation
                    : "",
                supervisor_evaluation: existingCompetency
                    ? existingCompetency.supervisor_evaluation
                    : "",
                weight: existingCompetency ? existingCompetency.weight : 0,
            };
        }),
    });

    const handleChange = (index, field, value) => {
        const newCompetencies = [...data.competencies];
        newCompetencies[index][field] = value;
        setData("competencies", newCompetencies);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...data,
            competencies: data.competencies.map((competency) => ({
                ...competency,
                self_evaluation: competency.self_evaluation || "",
                supervisor_evaluation: competency.supervisor_evaluation || "",
                weight: competency.weight || 0,
            })),
        };
        post(route("sheet-competencies.store"), { data: formData });
    };

    const isJuneOrDecember =
        new Date().getMonth() + 1 === 7 || new Date().getMonth() + 1 === 12;

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">行動評価の登録</h1>
                <form onSubmit={handleSubmit}>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">評価項目</th>
                                <th className="px-4 py-2">自己評価</th>
                                <th className="px-4 py-2">上司評価</th>
                                <th className="px-4 py-2">ウェイト</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.competencies.map((competency, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {competencyItems[index].name}
                                    </td>
                                    <td
                                        className={`border px-4 py-2 ${
                                            status === 3 && isJuneOrDecember
                                                ? ""
                                                : "pointer-events-none opacity-50"
                                        }`}
                                    >
                                        <select
                                            value={competency.self_evaluation}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "self_evaluation",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                            disabled={
                                                !(
                                                    status === 3 &&
                                                    isJuneOrDecember
                                                )
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
                                        {errors[
                                            `competencies.${index}.self_evaluation`
                                        ] && (
                                            <div className="text-red-500">
                                                {
                                                    errors[
                                                        `competencies.${index}.self_evaluation`
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </td>
                                    <td
                                        className={`border px-4 py-2 ${
                                            status === 4
                                                ? ""
                                                : "pointer-events-none opacity-50"
                                        }`}
                                    >
                                        <select
                                            value={
                                                competency.supervisor_evaluation
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "supervisor_evaluation",
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
                                        {errors[
                                            `competencies.${index}.supervisor_evaluation`
                                        ] && (
                                            <div className="text-red-500">
                                                {
                                                    errors[
                                                        `competencies.${index}.supervisor_evaluation`
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </td>
                                    <td
                                        className={`border px-4 py-2 ${
                                            status === 1
                                                ? ""
                                                : "pointer-events-none opacity-50"
                                        }`}
                                    >
                                        <select
                                            value={competency.weight}
                                            onChange={(e) =>
                                                handleChange(
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
                                        {errors[
                                            `competencies.${index}.weight`
                                        ] && (
                                            <div className="text-red-500">
                                                {
                                                    errors[
                                                        `competencies.${index}.weight`
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            保存
                        </button>
                        <Link
                            href={`/sheet/${sheetId}`}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            戻る
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default CompetenciesCreate;
