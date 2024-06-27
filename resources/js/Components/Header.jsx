import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const Header = ({ toggleMenu, menuVisible }) => {
    const { props } = usePage();
    const { auth } = props;

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post("/logout");
    };

    return (
        <>
            <header className="header shadow-md fixed top-0 w-full z-1000 bg-white">
                <div className="flex justify-between items-center p-4">
                    <div>
                        <button onClick={toggleMenu}>
                            <svg
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
                            </svg>
                        </button>
                    </div>
                    <h1 className="text-xl">にぎわいHR</h1>
                    <div className="flex items-center">
                        <h1 className="text-4xl font-semibold md:text-xl mr-5">
                            {auth.user.name}さん　　
                        </h1>
                        <a
                            href="#"
                            onClick={handleLogout}
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-400 rounded-full text-white"
                        >
                            ログアウト
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
