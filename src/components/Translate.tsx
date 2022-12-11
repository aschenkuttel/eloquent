import {ReactElement, useEffect, useState} from "react"
import Recorder from "./Recorder"
import sourceLanguages from "../data/sourceLanguages.json";
import targetLanguages from "../data/targetLanguages.json";
import LangSelect from "./LangSelect";
import Output from "./Output";
import axios from "axios";


export default function Translate(): ReactElement {
    const [result, setResult] = useState("")
    const [recordedText, setRecordedText] = useState("")
    const [isTranslating, setIsTranslating] = useState(false)
    const [sourceLanguage, setSourceLanguage] = useState("")
    const [targetLanguage, setTargetLanguage] = useState("")

    useEffect(() => {
        (async () => {
            if (!recordedText) return

            const assembly = axios.create({
                baseURL: "http://eloquent-proxy.herokuapp.com/http://api-free.deepl.com/v2",
                headers: {
                    authorization: process.env.REACT_APP_DEEPL_API_KEY,
                },
                params: {
                    source_lang: sourceLanguage,
                    target_lang: targetLanguage,
                    formality: "prefer_less",
                    text: recordedText
                }
            });

            try {
                const response = await assembly.get("/translate");
                const result = response.data.translations.map((t: { text: string }) => t.text)
                setResult(result.join(" "))
            } catch (error) {
                console.log(error);
            }
        })()
    }, [recordedText])

    return (
        <div className="w-full max-w-2xl flex flex-col gap-4">
            <div className="w-full flex flex-col justify-between gap-6 bg-white border border-gray-200
            p-6 rounded-xl sm:flex-row sm:gap-4">
                <div>
                    <LangSelect languages={sourceLanguages} label="Translate from"
                                language={sourceLanguage} setLanguage={setSourceLanguage}/>

                </div>

                <div className="flex gap-2">
                    <Recorder sourceLanguage={sourceLanguage}
                              targetLanguage={targetLanguage}
                              setRecordedText={setRecordedText}
                              isTranslating={isTranslating}
                              setIsTranslating={setIsTranslating}
                              isNotSupported={!navigator.mediaDevices}/>
                </div>

                <div>
                    <LangSelect languages={targetLanguages} label="Translate to"
                                language={targetLanguage} setLanguage={setTargetLanguage}/>
                </div>
            </div>

            <Output result={result}/>
        </div>
    )
}