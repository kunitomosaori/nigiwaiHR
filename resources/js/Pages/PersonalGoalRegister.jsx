import React, { useState } from 'react';
import axios from 'axios';
import Layout from '@/Layouts/Layout';

const PersonalGoalRegister = () => {
    const [formData, setFormData] = useState({
        goal_idl: '',
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
        axios.post('/api/insert_idl', formData)
            .then(response => {
                console.log("Success:", response.data);
            })
            .catch(error => {
                console.error("Error:", error.response ? error.response.data : error.message);
            });
    };

    return (
        <Layout>
            <div className="content-wrapper container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center mt-20 transition-margin duration-300">
                <form onSubmit={handleSubmit}>
                    <fieldset className="space-y-4">
                        <legend className="text-xl font-bold">個人目標</legend><br />
                        <label>
                            目標：
                            <input
                                type="text"
                                name="goal_idl"
                                value={formData.goal_idl}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label><br />
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

export default PersonalGoalRegister;
