import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    TbInbox,
    TbChevronDown,
    TbChevronRight,
    TbPencilPlus,
    TbUsers,
    TbCircleDotted,
    TbLogout,
} from "react-icons/tb";

const treeData = [
    {
        title: "自分宛てのシート",
        key: "0-0",
        icon: <TbInbox className="text-2xl" />,
        link: "/dashboard",
        children: [
            {
                title: "目標記入",
                key: "0-0-0",
                link: "/dashboard",
            },
            {
                title: "振り返り",
                key: "0-0-1",
                link: "/dashboard",
            },
            {
                title: "承認",
                key: "0-0-2",
                link: "/dashboard",
            },
        ],
    },
    {
        title: "評価シート作成",
        key: "0-0",
        icon: <TbPencilPlus className="text-2xl" />,
        link: "/sheet-management",
        border: true,
    },
    {
        title: "社員管理",
        key: "0-1",
        icon: <TbUsers className="text-2xl" />,
        link: "/user-management",
    },
    {
        title: "会社目標登録",
        key: "0-2",
        icon: <TbCircleDotted className="text-2xl" />,
        link: "/company-goal",
        border: true,
    },
    {
        title: "ログアウト",
        key: "0-3",
        icon: <TbLogout className="text-2xl" />,
        link: "/phpkadai05/logout",
    },
];

const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(!expanded);
    };
    return (
        <li
            className={`flex flex-col ${
                node.border ? "border-b" : ""
            } md:border-none`}
        >
            <div className="flex items-center hover:bg-sky-700 rounded">
                {node.children ? (
                    <span onClick={handleExpand} className="cursor-pointer">
                        {expanded ? (
                            <TbChevronDown className="text-2xl w-7 p-1" />
                        ) : (
                            <TbChevronRight className="text-2xl w-7 p-1" />
                        )}
                    </span>
                ) : (
                    <span className="w-7 p-1"></span> // トグルボタンと同じ幅のpaddingを追加
                )}
                {node.icon && node.icon}
                <Link href={node.link} className="block px-6 py-1 my-2">
                    {node.title}
                </Link>
            </div>
            {expanded && node.children && (
                <ul className="ml-4">
                    {node.children.map((childNode) => (
                        <TreeNode key={childNode.key} node={childNode} />
                    ))}
                </ul>
            )}
            {node.border && <div className="border-b my-4"></div>}
        </li>
    );
};

const SideMenu = ({ menuVisible, className }) => {
    const { props } = usePage();
    const { isAdmin } = props;

    return (
        <div
            className={`min-h-screen fixed overflow-y-auto p-6 ${className} ${
                menuVisible ? "" : "hidden"
            }`}
        >
            <div className="container mx-auto text-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-semibold md:text-xl"></h1>
                </div>
                <div id="menu" className="md:flex">
                    <ul className="flex flex-col">
                        {treeData.map(
                            (node) =>
                                // isAdminがtrueの場合のみ表示
                                (node.title !== "会社目標登録" || isAdmin) && (
                                    <TreeNode key={node.key} node={node} />
                                )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
