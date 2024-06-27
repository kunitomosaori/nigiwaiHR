import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

const NigiwaiDashboard = () => {
    const { props } = usePage();
    const { auth, values_user_info, values_co } = props;

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center">
                    <div className="flex space-x-6">
                        <LinkCard
                            link="index"
                            imgSrc="./img/hand.png"
                            text="人事評価シート登録"
                        />
                        <LinkCard
                            link="select"
                            imgSrc="./img/document.png"
                            text="人事評価シート一覧"
                        />
                        {auth.user.kanri_flg === 1 && (
                            <LinkCard
                                link="user"
                                imgSrc="./img/human.png"
                                text="ユーザー登録"
                            />
                        )}
                    </div>
                </div>

                {/* <UserInfoTable users={values_user_info} />

                <CompanyGoalsTable
                    goals={values_co}
                    isAdmin={auth.user.kanri_flg === 1}
                />

                <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center">
                    <div className="chart-container">
                        <canvas id="behaviorChart"></canvas>
                    </div>
                </div> */}
            </div>
        </Layout>
    );
};

const LinkCard = ({ link, imgSrc, text }) => {
    return (
        <Link
            href={link}
            className="hover:text-orange-600 bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
        >
            <img src={imgSrc} alt={text} />
            <span>{text}</span>
        </Link>
    );
};

// const UserInfoTable = ({ users }) => {
//     return (
//         <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center">
//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">所属</th>
//                         <th className="px-4 py-2">等級</th>
//                         <th className="px-4 py-2">役職</th>
//                         <th className="px-4 py-2">氏名</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={index}>
//                             <td className="border px-4 py-2">
//                                 {user.department_name}
//                             </td>
//                             <td className="border px-4 py-2">
//                                 {user.grade_name}
//                             </td>
//                             <td className="border px-4 py-2">
//                                 {user.position_name}
//                             </td>
//                             <td className="border px-4 py-2">{user.name}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// const CompanyGoalsTable = ({ goals, isAdmin }) => {
//     return (
//         <div className="container mx-auto bg-sky-50 p-6 rounded-lg text-center flex justify-center">
//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">会社目標</th>
//                         {isAdmin && <th className="px-4 py-2">変更</th>}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {goals.map((goal, index) => (
//                         <tr key={index}>
//                             <td className="border px-4 py-2">{goal.goal_co}</td>
//                             {isAdmin && (
//                                 <td className="border px-4 py-2">
//                                     <Link
//                                         href={`detail_co?id=${goal.id}`}
//                                         className="hover:text-orange-400"
//                                     >
//                                         更新
//                                     </Link>
//                                 </td>
//                             )}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

export default NigiwaiDashboard;
