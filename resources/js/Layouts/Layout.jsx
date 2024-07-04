import React, { useState } from "react";
import SideMenu from "../Components/SideMenu";
import Header from "../Components/Header";

const Layout = ({ children }) => {
    const [menuVisible, setMenuVisible] = useState(true);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div>
            <Header className="bg-white shadow-md shadow-inner" toggleMenu={toggleMenu} menuVisible={menuVisible} />
            <SideMenu className="w-1/5 bg-sky-950" menuVisible={menuVisible} />
            <main
                className={`content-wrapper ${
                    menuVisible ? "w-4/5" : "w-full"
                } transition-margin duration-300 ms-auto`}
                style={{ marginTop: document.querySelector('header')?.offsetHeight || 0 }}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
