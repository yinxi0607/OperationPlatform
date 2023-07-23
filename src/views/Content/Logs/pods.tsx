import {Input} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import pods from "@/api/pods.ts";

const { TextArea } = Input;
const PodLogs = () => {
    const {namespaceName,podName} = useParams()
    const [podLogs, setPodLogs] = useState<string>()
    useEffect(
        () => {
            console.log('PodLogs')
            async function handleGetPodLogs() {
                try {
                    if(!namespaceName) return
                    if(!podName) return
                    const dataTempPromise = await pods.GetLogs("/pods/" + namespaceName + "/" + podName + "/logs");
                    console.log('deploymentInfo', dataTempPromise)
                    setPodLogs(dataTempPromise)

                } catch (error) {
                    console.log('error', error)
                }
            }
            void handleGetPodLogs()
        },[]
    )
    return (
        <div>
        <h1>Pod Logs</h1>
            <TextArea autoSize={true} size="large" value={podLogs}/>
        </div>
    );
}

export default PodLogs;