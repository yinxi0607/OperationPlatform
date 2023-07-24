import React, {useEffect, useState} from "react";
import {Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {Link} from "react-router-dom";
import {ConfigmapsAllProps} from "@/types/configmaps.ts";
import configmaps from "@/api/configmaps.ts";


const ConfigmapsAll: React.FC = () => {
    const [dataSource, setDataSource] = useState<ConfigmapsAllProps[]>()
    useEffect(() => {
        const handlerNamespacesDetail = async () => {
            try {
                const dataTempPromise = await configmaps.GetAllList("/configmaps/");
                console.log('dataSource', dataTempPromise)
                setDataSource(dataTempPromise)

            } catch (error) {
                console.log('error', error)
            }
        }
        void handlerNamespacesDetail()

    }, [])

    const columns: ColumnsType<ConfigmapsAllProps> = [
        {
            title: 'Namespaces',
            dataIndex: 'namespace',
            sorter: (a, b) => a.namespace.length - b.namespace.length,
            sortDirections: ['descend'],
            onCell: (record, index) => {
                // 查找和当前单元格相同的 namespace 的数量
                if (!dataSource) return { rowSpan: 0 };
                const sameNamespaceCount = dataSource.filter((item) => item.namespace === record.namespace).length;

                // 如果当前单元格是相同 namespace 的第一个，则设置 rowSpan 为 sameNamespaceCount
                if (index === dataSource.findIndex((item) => item.namespace === record.namespace)) {
                    return { rowSpan: sameNamespaceCount };
                }

                // 如果当前单元格不是相同 namespace 的第一个，则设置 rowSpan 为 0
                return { rowSpan: 0 };
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
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
                    <Link to={"/configmaps/" + record.namespace + "/" + record.name+"/edit"}>Edit</Link>
                    <Link to={"/configmaps/" + record.namespace + "/" + record.name+"/delete"}>Delete</Link>
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

export default ConfigmapsAll