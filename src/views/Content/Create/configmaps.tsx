import {
    Button,
    Form,
    Input,
    Select,
    Space,

} from 'antd';
import {useEffect, useState} from 'react';
import {ConfigmapsAllProps} from "@/types/configmaps.ts";
import namespaces from "@/api/namespaces.ts";
import configmaps from "@/api/configmaps.ts";


const ConfigmapsCreate = () => {
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    const [configmapInfo, setConfigmapInfo] = useState<ConfigmapsAllProps>({
        data: {},
        name: "",
        namespace: "",
    });
    const [namespacesList, setNamespacesList] = useState<string[]>([]);

    const [dataList, setDataList] = useState<Array<{ [key: string]: string }>>([]);
    const handleAddNewData = () => {
        if (newKey && newValue) {
            setConfigmapInfo({
                ...configmapInfo,
                data: {
                    ...configmapInfo?.data,
                    [newKey]: newValue,
                },
            });
            setDataList([...dataList,{
                [newKey]: newValue,
            }])
            setNewKey("");
            setNewValue("");
            console.log("configmapInfo", configmapInfo)
        }
    };
    useEffect(() => {
        async function handleGetList() {
            try {
                const dataTempPromise = await namespaces.GetList("/namespaces");
                console.log('data', dataTempPromise)
                setNamespacesList(dataTempPromise)
                // setInitLoading(false)
            } catch (error) {
                console.log('error', error)
            }
        }
        void handleGetList()
    }, [])
    const handlerSubmit = (values: any) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            configmapInfo.name = values.name;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            configmapInfo.namespace = values.namespace;
            configmapInfo.creation_timestamp = "";
            console.log('configmapInfo', configmapInfo);
            configmaps.Create("/configmaps", configmapInfo).then((res) => {
                console.log('res', res);
            }).catch((err) => {
                console.log('err', err);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: '80vw'}}
                onFinish={handlerSubmit}
            >
                <Form.Item label="Namespaces" name="namespace" required={true}>
                    {
                        <Select>
                            {namespacesList.length > 0 &&
                                namespacesList.map((item, index) => (
                                    <Select.Option value={item} key={index}>
                                        {item}
                                    </Select.Option>
                                ))}
                        </Select>
                    }

                </Form.Item>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Data List">
                    {/* 遍历 dataList 数组并为每个键值对创建一个展示元素 */}
                    {dataList.map((item, index) => {
                        const key = Object.keys(item)[0];
                        const value = item[key];
                        return (
                            <div key={index}>
                                <strong>{key}:</strong> {value}
                            </div>
                        );
                    })}
                </Form.Item>
                <Form.Item label="Data" name='data'>
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
                </Form.Item>

                <Form.Item style={{marginLeft: '30vw'}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ConfigmapsCreate;