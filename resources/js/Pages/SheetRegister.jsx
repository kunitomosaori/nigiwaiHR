import Layout from "@/Layouts/Layout";
import React, { useState } from "react";

const SheetRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        goal: "",
        comment: "",
        comment_boss: "",
        evaluation: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/insert.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Layout>
            <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center">
                <form onSubmit={handleSubmit}>
                    <fieldset className="space-y-4">
                        <legend className="text-xl font-bold">
                            人事評価シート
                        </legend>
                        <br />
                        <label>
                            名前：
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <br />
                        <label>
                            目標：
                            <input
                                type="text"
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <br />
                        <label>
                            コメント：
                            <textarea
                                name="comment"
                                rows="4"
                                cols="40"
                                value={formData.comment}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            ></textarea>
                        </label>
                        <br />
                        <label>
                            コメント（上司）：
                            <textarea
                                name="comment_boss"
                                rows="4"
                                cols="40"
                                value={formData.comment_boss}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            ></textarea>
                        </label>
                        <br />
                        <label>
                            評価：
                            <input
                                type="radio"
                                name="evaluation"
                                value="0"
                                checked={formData.evaluation === "0"}
                                onChange={handleChange}
                                className="ml-1"
                            />{" "}
                            S
                            <input
                                type="radio"
                                name="evaluation"
                                value="1"
                                checked={formData.evaluation === "1"}
                                onChange={handleChange}
                                className="ml-1"
                            />{" "}
                            A
                            <input
                                type="radio"
                                name="evaluation"
                                value="2"
                                checked={formData.evaluation === "2"}
                                onChange={handleChange}
                                className="ml-1"
                            />{" "}
                            B
                            <input
                                type="radio"
                                name="evaluation"
                                value="3"
                                checked={formData.evaluation === "3"}
                                onChange={handleChange}
                                className="ml-1"
                            />{" "}
                            C
                        </label>
                        <br />
                        <input
                            type="submit"
                            value="送信"
                            className="bg-orange-400 hover:bg-orange-300 px-5 py-2 rounded-md"
                        />
                    </fieldset>
                </form>
            </div>
        </Layout>
    );
};

export default SheetRegister;
