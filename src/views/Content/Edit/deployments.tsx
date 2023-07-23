import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {DeploymentDetailProps, DeploymentsPodsProps} from "@/types/deployments.ts";
import deployments from "@/api/deployments.ts";

const DeploymentsEdit = () => {
    const {namespaceName, deploymentName} = useParams<{ namespaceName: string; deploymentName: string }>();
    const [deploymentDetail,setDeploymentDetail] = useState<DeploymentDetailProps>()
    useEffect(() => {
        const handlerNamespacesDetail = async () => {
            try {
                if (!deploymentName) return
                if (!namespaceName) return
                const dataTempPromise = await deployments.GetDetail("/deployments/" + namespaceName + "/" + deploymentName+"/info");
                console.log('dataSource', dataTempPromise)
                setDeploymentDetail(dataTempPromise)

            } catch (error) {
                console.log('error', error)
            }
        }
        void handlerNamespacesDetail()
        },[])
    return (
        <div>
        <h1>Deployments Edit</h1>
            <div>
                {deploymentDetail?deploymentDetail:(<div>Loading</div>)}
            </div>
        </div>
    );
}

export default DeploymentsEdit;