import {ReactElement} from "react";
import {NavLink} from "react-router-dom";
import {ChatBubbleLeftIcon} from "@heroicons/react/24/solid";

export default function Header(): ReactElement {
    return (
        <header className="bg-gray-100 border-b border-gray-200">
            <nav className="px-4" aria-label="Top">
                <div className="max-w-2xl mx-auto px-2">
                    <div className="flex w-full items-center justify-between py-6">
                        <NavLink to="/">
                            <ChatBubbleLeftIcon className="w-8 h-8 text-emerald-600"/>
                        </NavLink>
                        <p>About</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}