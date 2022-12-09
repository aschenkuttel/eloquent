import {ReactElement, useState} from "react"
import Recorder from "./Recorder"

export default function Translate(): ReactElement {
    const [result, setResult] = useState("")

    if (navigator.mediaDevices) {
        console.log("YES")
    } else {
        console.log("NO")
    }

    if (result) {
        return <></>
    } else {
        return <Recorder setResult={setResult}/>
    }
}