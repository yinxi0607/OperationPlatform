import React, {useEffect, useState} from "react";
import deployments from "@/api/deployments.ts";
import {Space, Table} from "antd";
import {DeploymentsAllProps} from "@/types/deployments.ts";
import {ColumnsType} from "antd/es/table";
import {Link} from "react-router-dom";


const DeploymentsAll: React.FC = () => {
    const [dataSource, setDataSource] = useState<DeploymentsAllProps[]>()
    useEffect(() => {
        const handlerNamespacesDetail = async () => {
            try {
                const dataTempPromise = await deployments.GetAllList("/deployments/");
                console.log('dataSource', dataTempPromise)
                setDataSource(dataTempPromise)

            } catch (error) {
                console.log('error', error)
            }
        }
        void handlerNamespacesDetail()

    }, [])

    const columns: ColumnsType<DeploymentsAllProps> = [
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={"/deployments/" + record.namespace + "/edit/" + record.name}>Edit</Link>
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

export default DeploymentsAll