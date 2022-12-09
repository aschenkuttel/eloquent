import {ReactElement, useState, useRef} from "react"
import {MicrophoneIcon} from '@heroicons/react/20/solid'
import clsx from "clsx"

interface RecorderInterface {
    setResult: (result: string) => void
}

export default function Recorder({setResult}: RecorderInterface): ReactElement {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string>("")
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
        if (!stream) {
            return;
        } else {

        }

        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
            chunks.current.push(e.data);
        };

        mediaRecorder.current.onstop = () => {
            try {
                const blob = new Blob(chunks.current, {type: "audio/ogg; codecs=opus"});
                setAudioURL(window.URL.createObjectURL(blob));
            } catch (error) {
                console.log("YIKES")
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

    return (
        <div>
            <audio src={audioURL} controls></audio>

            <button
                type="button"
                onClick={isRecording ? stop : record}
                className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <MicrophoneIcon className={clsx("h-5 w-5", isRecording && "text-rose-700")} aria-hidden="true"/>
            </button>
        </div>
    )
}