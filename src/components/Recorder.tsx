import {ReactElement, useState, useRef, Fragment} from "react"
import {MicrophoneIcon} from '@heroicons/react/20/solid'
import axios from "axios"
import clsx from "clsx"


interface RecorderInterface {
    sourceLanguage: string,
    targetLanguage: string,
    setRecordedText: (result: string) => void,
    isTranslating: boolean,
    setIsTranslating: (state: boolean) => void,
    isNotSupported: boolean
}

export default function Recorder({
                                     sourceLanguage,
                                     targetLanguage,
                                     setRecordedText,
                                     isTranslating,
                                     setIsTranslating,
                                     isNotSupported
                                 }: RecorderInterface): ReactElement {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const chunks = useRef<Blob[]>([]);

    const requestAccess = async () => {
        try {
            return await navigator.mediaDevices.getUserMedia({audio: true});
        } catch (error) {
            console.error(`The following getUserMedia error occurred: ${error}`)
            return
        }
    }

    const record = async () => {
        const stream = await requestAccess();
        if (!stream) return;

        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
            chunks.current.push(e.data);
        };

        mediaRecorder.current.onstop = async () => {
            try {
                const blob = new Blob(chunks.current, {type: "audio/ogg; codecs=opus"});
                setIsTranslating(true)
                await translate(blob)
            } catch (error) {
                console.log(error)
            } finally {
                chunks.current = [];
                setIsRecording(false)
            }
        };

        mediaRecorder.current.start();
        setIsRecording(true);
    }

    const stop = async () => {
        if (mediaRecorder.current === null) return;
        mediaRecorder.current.stop();
    }

    const upload = async (blob: Blob) => {
        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json"
            },
        });

        try {
            const data = await blob.arrayBuffer()
            const response = await assembly.post("/upload", data);
            return response.data.upload_url;
        } catch (error) {
            console.log(error);
        }
    }

    const transcribe = async (url: string) => {
        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
            },
        });

        const res = await assembly.post("/transcript", {
            audio_url: url,
            language_code: sourceLanguage
        })
        return res.data.id
    }

    const fetchResult = async (id: string): Promise<{ text?: string, error?: string }> => {
        return new Promise(async (resolve) => {
            const intervalID = setInterval(async () => {
                const assembly = axios.create({
                    baseURL: "https://api.assemblyai.com/v2",
                    headers: {
                        authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                        "content-type": "application/json",
                    },
                });

                try {
                    const response = await assembly.get(`/transcript/${id}`)
                    if (response.data.status === "completed") {
                        clearInterval(intervalID)
                        resolve(response.data)
                    }
                } catch (error: unknown) {
                    resolve({error: "RIP"})
                }
            }, 500)
        })
    }

    const translate = async (blob: Blob) => {
        const url = await upload(blob)
        const id = await transcribe(url)
        const result = await fetchResult(id)

        if (!result.text) {
            setRecordedText("")
        } else {
            setRecordedText(result.text)
        }

        setIsTranslating(false)
    }

    const recordContent = () => {
        if (isTranslating) {
            return (
                <Fragment>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <MicrophoneIcon className="relative h-5 w-5" aria-hidden="true"/>
                    Record
                </Fragment>
            )
        }
    }

    return (
        <button
            type="button"
            disabled={!sourceLanguage || !targetLanguage ||
                sourceLanguage === targetLanguage.toLowerCase() ||
                isTranslating || isNotSupported}
            onClick={isRecording ? stop : record}
            className={clsx("w-full h-auto inline-flex items-center gap-2 rounded-lg border border-transparent",
                "bg-emerald-500 px-4 py-4 text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2",
                "focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:ring-gray-200",
                "sm:py-0 sm:w-auto animate-ping-low",
                isRecording && "bg-rose-500 focus:ring-rose-400 hover:bg-rose-600")}>
            {recordContent()}
        </button>
    )
}