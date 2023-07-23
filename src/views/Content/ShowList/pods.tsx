import React, {useEffect, useState} from "react";
import {Space, Table} from "antd";
import {PodsProps} from "@/types/pods.ts";
import {ColumnsType} from "antd/es/table";
import {Link} from "react-router-dom";
import pods from "@/api/pods.ts";


const PodsAll: React.FC = () => {
    const [dataSource, setDataSource] = useState<PodsProps[]>()
    useEffect(() => {
        const handlerAllPods = async () => {
            try {
                const dataTempPromise = await pods.GetAllList("/pods/");
                console.log('dataSource', dataTempPromise)
                setDataSource(dataTempPromise)

            } catch (error) {
                console.log('error', error)
            }
        }
        void handlerAllPods()

    }, [])

    const columns: ColumnsType<PodsProps> = [
        {
            title: 'Namespaces',
            dataIndex: 'namespace',
            sorter: (a, b) => a.namespace.length - b.namespace.length,
            sortDirections: ['descend'],
        },
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
            title: 'Ready',
            dataIndex: 'ready',
            sorter: (a, b) => a.ready.length - b.ready.length,
            sortDirections: ['descend'],
        },
        {
            title: 'CreationTimestamp',
            dataIndex: 'creation_timestamp',
            sorter: (a, b) => {
                const dateA = new Date(a.creation_timestamp);
                const dateB = new Date(b.creation_timestamp);
                return dateA.getTime() - dateB.getTime();
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Restarts',
            dataIndex: 'restarts',
        },
        {
            title: 'IP',
            dataIndex: 'ip',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={"/pods/" + record.namespace + "/" + record.name+"/logs"}>Logs</Link>
                </Space>
            ),
        },
    ];

    return (
        <div>
            {dataSource ? (<Table columns={columns} dataSource={dataSource}/>) : (<div>loading</div>)}
        </div>
    )
}

export default PodsAll