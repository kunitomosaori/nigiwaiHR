import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/Layouts/Layout";

const CompanyGoal = () => {
    const [goal, setGoal] = useState("");
    const [periodId, setPeriodId] = useState(null);

    useEffect(() => {
        axios
            .get("/api/company-goal")
            .then((response) => {
                setGoal(response.data.goal);
                setPeriodId(response.data.period_id);
            })
            .catch((error) => {
                console.error("Error fetching current goal:", error);
            });
    }, []);

    const handleChange = (e) => {
        setGoal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/company-goal", { goal, period_id: periodId })
            .then((response) => {
                alert("処理に成功しました");
            })
            .catch((error) => {
                console.error("There was an error saving the goal!", error);
            });
    };

    return (
        <Layout>
            <div className="content-wrapper container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center mt-20 transition-margin duration-300">
                <form onSubmit={handleSubmit} className="w-full">
                    <textarea
                        className="w-full h-64 border p-4"
                        value={goal}
                        onChange={handleChange}
                        placeholder="会社目標を入力してください"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        保存
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default CompanyGoal;
