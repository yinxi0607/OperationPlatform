import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Row, Col
} from 'antd';
import React, {useEffect, useState} from 'react';
import namespaces from "@/api/namespaces.ts";
import deployments from "@/api/deployments.ts";
import {MessageHandleSuccess} from "@/utils";


const DeploymentCreate: React.FC = () => {
    const [namespacesList, setNamespacesList] = useState<string[]>([]);
    useEffect(() => {
        async function handleGetList() {
            try {
                const dataTempPromise = await namespaces.GetList("/namespaces/list");
                console.log('data', dataTempPromise)
                setNamespacesList(dataTempPromise)
                // setInitLoading(false)
            } catch (error) {
                console.log('error', error)
            }
        }

        void handleGetList()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call

        // const data = ['1','2','3']
    }, [])
    const handlerSubmit = async (values: any) => {
        try{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.requests_resource_cpu = values.requests_resource_cpu.toString();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.requests_resource_memory = values.requests_resource_memory.toString();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.limit_resource_cpu = values.limit_resource_cpu.toString();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.limit_resource_memory = values.limit_resource_memory.toString();
            await deployments.Create("/deployments/",values)
            MessageHandleSuccess("部署成功")
        }catch (error){
            console.log('error', error)
        }

    }
    return (
        <div>
            <h1>Deployment Create</h1>


            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: '80vw'}}
                onFinish={(values) => void handlerSubmit(values)}
            >
                <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please input name!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Select Namespaces" name="namespace" required={true}>
                    <Select>
                        {namespacesList.length > 0 &&
                            namespacesList.map((item, index) => (
                                <Select.Option value={item} key={index}>
                                    {item}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Port" name="port" rules={[{required: true, message: 'Please input a port number!'}]}>
                    <InputNumber min={1}/>
                </Form.Item>
                <Form.Item label="Image" name="image" rules={[{required: true, message: 'Please input image!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Replicas" name="replicas" initialValue={1}>
                    <InputNumber min={1} defaultValue={1}/>
                </Form.Item>

                <Form.Item label="Resources Limit" style={{marginBottom: 0}}>
                    <Row gutter={2}>
                        <Col span={12}>
                            <Form.Item
                                label="Memory(Gi)"
                                name="limit_resource_memory"
                                initialValue={1}
                            >
                                <InputNumber min={1} defaultValue={1}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="CPU(m)"
                                name="limit_resource_cpu"
                                initialValue={1000}
                            >
                                <InputNumber min={1000} defaultValue={1000}/>
                            </Form.Item>
                        </Col>

                    </Row>

                </Form.Item>
                <Form.Item label="Resources Requests" style={{marginBottom: 0}}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Memory(Mi)"
                                name="requests_resource_memory"
                                initialValue={1}
                            >
                                <InputNumber min={1} defaultValue={1}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="CPU(m)"
                                name="requests_resource_cpu"
                                initialValue={1}
                            >
                                <InputNumber min={1} defaultValue={1}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item style={{marginLeft: '30vw'}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default DeploymentCreate;