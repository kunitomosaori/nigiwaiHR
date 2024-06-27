import React from "react";
import { Link } from "@inertiajs/react";

const SideMenu = ({ menuVisible }) => {
    return (
        <div
            className={`bg-sky-950 w-1/4 min-h-screen fixed overflow-y-auto sidemenu ${
                menuVisible ? "" : "hidden"
            }`}
        >
            <div className="container mx-auto text-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-semibold md:text-xl"></h1>
                </div>
                <div id="menu" className="md:flex">
                    <ul className="flex flex-col">
                        <li className="border-b md:border-none">
                            <Link
                                href="/nigiwai-dashboard"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                ダッシュボード
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/sheet-register"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                人事評価シート登録
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/phpkadai05/select"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                人事評価シート一覧
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/user-register"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                ユーザー登録
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/phpkadai05/company/index_co"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                会社目標登録
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/phpkadai05/company/select_co"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                会社目標表示
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/idl/index_idl"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                個人目標登録
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/idl/select_idl"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                個人目標表示
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/phpkadai05/goal/index_goal"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                業績目標登録
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/phpkadai05/goal/select_goal"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                業績目標表示
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/phpkadai05/competency/index_competency"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                行動評価登録
                            </Link>
                        </li>
                        <li className="border-b md:border-none">
                            <Link
                                href="/phpkadai05/competency/select_competency"
                                className="block px-8 py-2 my-4 hover:bg-sky-700 rounded"
                            >
                                行動評価表示
                            </Link>
                        </li>
                        <li>
                            <div className="my-8 text-center md:my-4">
                                <Link
                                    href="/phpkadai05/logout"
                                    className="px-6 py-2 bg-orange-500 hover:bg-orange-400 rounded-full"
                                >
                                    ログアウト
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
