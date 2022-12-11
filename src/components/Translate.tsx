import {ReactElement, useEffect, useState} from "react";
import axios from "axios";
import Recorder from "./Recorder";
import sourceLanguages from "../data/sourceLanguages.json";
import targetLanguages from "../data/targetLanguages.json";
import LangSelect from "./LangSelect";
import Select from "./Select";
import Output from "./Output";


export default function Translate(): ReactElement {
    const [result, setResult] = useState("")
    const [recordedText, setRecordedText] = useState("")
    const [isTranslating, setIsTranslating] = useState(false)
    const [sourceLanguage, setSourceLanguage] = useState("")
    const [targetLanguage, setTargetLanguage] = useState("")
    const [formality, setFormality] = useState("default")
    const [classify, setClassify] = useState(false)
    const [censor, setCensor] = useState(false)

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
                    formality: formality,
                    text: recordedText
                }
            });

            try {
                const response = await assembly.get("/translate");
                const result = response.data.translations.map((t: { text: string }) => t.text)
                let translatedString = result.join(" ")

                if (classify) {
                    const cohere = await summarize(translatedString)
                    translatedString = cohere.data.text
                }

                setResult(translatedString)
                setIsTranslating(false)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [recordedText])

    const summarize = async (text: string) => {
        const assembly = axios.create({
            baseURL: "https://api.cohere.ai",
            headers: {
                authorization: process.env.REACT_APP_COHERE_API_KEY,
                "content-type": "application/json"
            }
        });

        return await assembly.post('/generate', {
            model: "medium",
            prompt: text,
            max_tokens: 100,
            temperature: 0.8,
            stop_sequences: ["--"],
            k: 0,
            p: 0.75
        })
    }

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
                              censor={censor}
                              isNotSupported={!navigator.mediaDevices}/>
                </div>

                <div>
                    <LangSelect languages={targetLanguages} label="Translate to"
                                language={targetLanguage} setLanguage={setTargetLanguage}/>
                </div>
            </div>

            <div className="w-full flex flex-col justify-between sm:items-center gap-6 bg-white border border-gray-200
            p-6 rounded-xl sm:flex-row sm:gap-4">
                <div>
                    <Select label="Formality" options={["default", "more", "less", "prefer_more", "prefer_less"]}
                            selected={formality} setSelected={setFormality}/>
                </div>

                <fieldset className="space-y-2">
                    <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="censor"
                                aria-describedby="censor-description"
                                name="censor"
                                type="checkbox"
                                onChange={(e) => setCensor(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="censor" className="font-medium text-gray-700">
                                Censor Profanity
                            </label>
                        </div>
                    </div>

                    <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="classify"
                                aria-describedby="classify-description"
                                name="classify"
                                type="checkbox"
                                onChange={(e) => setClassify(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="classify" className="font-medium text-gray-700">
                                Continue with cohere.ai
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>

            <Output result={result}/>
        </div>
    )
}