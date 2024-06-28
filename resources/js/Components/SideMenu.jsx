import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { TbInbox, TbChevronDown, TbChevronRight } from "react-icons/tb";
const treeData = [
    {
        title: '受信トレイ',
        key: '0-0',
        icon: <TbInbox className="text-2xl" />,
        link: '/dashboard',
        children: [
            {
                title: '目標記入',
                key: '0-0-0',
                link: '/dashboard',
            },
            {
                title: '振り返り',
                key: '0-0-1',
                link: '/dashboard',
            },
            {
                title: '承認',
                key: '0-0-2',
                link: '/dashboard',
            },
        ],
    },
    {
        title: '評価シート作成',
        key: '0-0',
        icon: <TbInbox className="text-2xl" />,
        link: '/dashboard',
    },
    {
        title: '期初',
        key: '0-1',
        link: '/idl/index_idl',
    },
    {
        title: '期末',
        key: '0-2',
        link: '/idl/select_idl',
    },
    {
        title: 'ログアウト',
        key: '0-3',
        link: '/phpkadai05/logout',
    },
];
const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(!expanded);
    };
    return (
        <li className="border-b md:border-none flex flex-col hover:bg-sky-700 rounded">
            <div className="flex items-center">
                {node.children && (
                    <span onClick={handleExpand} className="cursor-pointer">
                        {expanded ? <TbChevronDown className="text-2xl" /> : <TbChevronRight className="text-2xl" />}
                    </span>
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
        </li>
    );
};
const SideMenu = ({ menuVisible }) => {
    return (
        <div
            className={`bg-sky-950 w-1/4 min-h-screen fixed overflow-y-auto sidemenu ${menuVisible ? "" : "hidden"
                }`}
        >
            <div className="container mx-auto text-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-semibold md:text-xl"></h1>
                </div>
                <div id="menu" className="md:flex">
                    <ul className="flex flex-col">
                        {treeData.map((node) => (
                            <TreeNode key={node.key} node={node} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default SideMenu;
