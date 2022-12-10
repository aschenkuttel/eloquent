import {ReactElement, useState} from "react"
import {ClipboardIcon} from "@heroicons/react/24/outline"
import Info from "./Info";

interface OutputInterface {
    result: string
}

export default function Output({result}: OutputInterface): ReactElement {
    const [show, setShow] = useState<boolean>(false)

    return (
        <div className="relative w-full h-80 bg-white border border-gray-200 p-6 rounded-xl">
            {result}
            <ClipboardIcon className="absolute bottom-4 right-4 w-6 h-6 text-gray-700
            opacity-50 hover:opacity-75 cursor-pointer" onClick={async () => {
                await navigator.clipboard.writeText(result);
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 2000)
            }}/>
            <Info show={show} setShow={setShow}/>
        </div>
    )
}