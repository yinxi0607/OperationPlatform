import React, {useEffect, useState} from "react";
import deployments from "@/api/deployments.ts";
import {useParams} from "react-router-dom";
import {Table} from "antd";
import {DeploymentsDetailProps} from "@/types/deployments.ts";
import {ColumnsType} from "antd/es/table";


const DeploymentsDetail: React.FC = () => {

    const {namespaceName, deploymentName} = useParams<{ namespaceName: string; deploymentName: string }>();
    console.log(namespaceName, deploymentName)
    const [dataSource, setDataSource] = useState<DeploymentsDetailProps[]>()
    useEffect(() => {
        const handlerNamespacesDetail = async () => {
            try {
                if (!deploymentName) return
                if (!namespaceName) return
                const dataTempPromise = await deployments.GetDetail("/deployments/" + namespaceName + "/" + deploymentName);
                console.log('dataSource', dataTempPromise)
                setDataSource(dataTempPromise)

            } catch (error) {
                console.log('error', error)
            }
        }
        void handlerNamespacesDetail()

    }, [])

    const columns: ColumnsType<DeploymentsDetailProps> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Image',
            dataIndex: 'image',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend'],
        },
        {
            title: 'RunningTime',
            dataIndex: 'running_time',
            sorter: (a, b) => {
                const dateA = new Date(a.running_time);
                const dateB = new Date(b.running_time);
                return dateA.getTime() - dateB.getTime();
            },
            sortDirections: ['descend'],
        },
    ];

    return (
        <div>
            {dataSource ? (<Table columns={columns} dataSource={dataSource}/>) : (<div>loading</div>)}
        </div>
    )
}

export default DeploymentsDetail