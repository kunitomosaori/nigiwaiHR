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
            <Header toggleMenu={toggleMenu} menuVisible={menuVisible} />
            <SideMenu menuVisible={menuVisible} />
            <main
                className={`content-wrapper ${
                    menuVisible ? "ml-64" : "ml-0"
                } mt-20 transition-margin duration-300`}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
