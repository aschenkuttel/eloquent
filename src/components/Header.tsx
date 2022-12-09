import {ReactElement} from "react"

export default function Header(): ReactElement {
    return (
        <header className="bg-indigo-600">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
                    <p>Image</p>
                    <p>About</p>
                </div>
            </nav>
        </header>
    )
}