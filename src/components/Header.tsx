import {ReactElement} from "react";
import {ChatBubbleLeftIcon} from "@heroicons/react/24/solid";

export default function Header(): ReactElement {
    return (
        <header className="bg-gray-100 border-b border-gray-200">
            <nav className="mx-auto max-w-2xl px-6 sm:px-0" aria-label="Top">
                <div className="flex w-full items-center justify-between py-6">
                    <ChatBubbleLeftIcon className="w-8 h-8 text-emerald-600"/>

                    <p>About</p>
                </div>
            </nav>
        </header>
    )
}