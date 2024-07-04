import Layout from "@/Layouts/Layout";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        lid: "",
        lpw: "",
        kanri_flg: "0",
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
        // Inertia.jsを使用してLaravelのコントローラにデータを送信
        Inertia.post("/user-register", formData);
    };

    return (
        <Layout>
            <div className="content-wrapper container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center mt-20 transition-margin duration-300">
                <form onSubmit={handleSubmit}>
                    <fieldset className="space-y-4">
                        <legend className="text-xl font-bold">
                            ユーザー登録
                        </legend>
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
                            Login ID：
                            <input
                                type="text"
                                name="lid"
                                value={formData.lid}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <br />
                        <label>
                            Login PW：
                            <input
                                type="password"
                                name="lpw"
                                value={formData.lpw}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <br />
                        <label>
                            管理FLG：
                            <input
                                type="radio"
                                name="kanri_flg"
                                value="0"
                                checked={formData.kanri_flg === "0"}
                                onChange={handleChange}
                                className="ml-1"
                            />{" "}
                            一般
                            <input
                                type="radio"
                                name="kanri_flg"
                                value="1"
                                checked={formData.kanri_flg === "1"}
                                onChange={handleChange}
                                className="ml-1"
                            />{" "}
                            管理者
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

export default UserRegister;
