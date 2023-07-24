import {Button, Descriptions, Input, Space, Popconfirm} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import configmaps from "@/api/configmaps.ts";
import { ConfigmapsAllProps } from "@/types/configmaps.ts";

const ConfigmapInfo = () => {
    const [configmapInfo, setConfigmapInfo] = useState<ConfigmapsAllProps>();
    const [isEditing, setIsEditing] = useState(false);
    const [editingConfigmapInfo, setEditingConfigmapInfo] = useState<ConfigmapsAllProps>({
        data: {},
        creation_timestamp: "",
        name: "",
        namespace: "",
    });
    const { namespaceName, configmapName } = useParams<{ namespaceName: string; configmapName: string }>();
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    useEffect(() => {
        async function handleGetConfigmapInfo() {
            try {
                if (namespaceName && configmapName) {
                    const dataTempPromise = await configmaps.GetInfo("/configmaps/" + namespaceName + "/" + configmapName + "/info");
                    console.log("configmapInfo", dataTempPromise);
                    setConfigmapInfo(dataTempPromise);
                }
            } catch (error) {
                console.log("error", error);
            }
        }
        void handleGetConfigmapInfo();
    }, []);

    useEffect(() => {
        console.log("configmapInfo changed", configmapInfo);
    }, [configmapInfo]);

    const handleStartEditing = () => {
        setIsEditing(true);
        if (configmapInfo){
            setEditingConfigmapInfo(configmapInfo);
        }

    };

    const handleSaveEditing = async () => {
        try{
            // 在这里保存对 configmapInfo 的更改
            // 例如：await updateConfigmapInfo(editingConfigmapInfo);
            setIsEditing(false);
            await configmaps.UpdateInfo("/configmaps", editingConfigmapInfo);
            setConfigmapInfo(editingConfigmapInfo);
        }catch (error){
            console.log("error", error);
        }



    };
    const handleAddNewData = () => {
        if (newKey && newValue) {
            setEditingConfigmapInfo({
                ...editingConfigmapInfo,
                data: {
                    ...editingConfigmapInfo?.data,
                    [newKey]: newValue,
                },
            });
            setNewKey("");
            setNewValue("");
        }
    };

    const handleEditChange = (key: string, value: string) => {
        setEditingConfigmapInfo({
            ...editingConfigmapInfo,
            data: {
                ...editingConfigmapInfo?.data,
                [key]: value,
            },
        });
    };

    const handleDeleteData = (key: string) => {
        const newData = { ...editingConfigmapInfo.data };
        delete newData[key];
        setEditingConfigmapInfo({
            ...editingConfigmapInfo,
            data: newData,
        });
    };
    return (
        <div>
            <Descriptions
                title="Configmap Info"
                bordered
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                extra={
                    isEditing ? (
                        <>
                            <Button type="primary" onClick={() => void handleSaveEditing()}>
                                Save
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                        </>
                    ) : (
                        <Button type="primary" onClick={() => handleStartEditing()}>
                            Edit
                        </Button>
                    )
                }
            >
                <Descriptions.Item label="Namespaces">
                    {configmapInfo?.namespace}
                </Descriptions.Item>
                <Descriptions.Item label="Name">{configmapInfo?.name}</Descriptions.Item>
                <Descriptions.Item label="CreationTimestamp">
                    {configmapInfo?.creation_timestamp}
                </Descriptions.Item>
                <Descriptions.Item label="Data">
                    {isEditing ? (
                        <>
                            {Object.entries(editingConfigmapInfo.data).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong>{" "}
                                    <Input
                                        value={value}
                                        onChange={(e) => handleEditChange(key, e.target.value)}
                                    />
                                    <Popconfirm
                                        title="Are you sure to delete this data?"
                                        onConfirm={() => handleDeleteData(key)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="link" danger>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </div>
                            ))}
                            <Space>
                                <Input
                                    placeholder="New Key"
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value)}
                                />
                                <Input
                                    placeholder="New Value"
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                />
                                <Button type="primary" onClick={handleAddNewData}>
                                    Add
                                </Button>
                            </Space>
                        </>
                    ) : configmapInfo ? (
                        Object.entries(configmapInfo.data).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}:</strong> {value}
                            </div>
                        ))
                    ) : null}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default ConfigmapInfo;
