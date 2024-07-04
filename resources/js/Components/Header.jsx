import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { PiListBold } from "react-icons/pi";

const Header = ({ toggleMenu, menuVisible,className }) => {
    const { props } = usePage();
    const { auth } = props;

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post("/logout");
    };

    return (
        <>
            <header className={`header fixed top-0 w-full z-1000 ${className}`}>
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center">
                        <button onClick={toggleMenu} className="hover:bg-grey hover:bg-opacity-50">
                            <PiListBold className="h-6 w-6 fill-current" />
                        </button>
                        <h1 className="text-xl mx-5">にぎわいHR</h1>
                    </div>
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
