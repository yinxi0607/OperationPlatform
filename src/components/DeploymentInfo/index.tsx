import {Button, Col, Form, Input, InputNumber, Row, Select} from "antd";
import {useEffect, useRef, useState} from "react";
import namespaces from "@/api/namespaces.ts";
import deployments from "@/api/deployments.ts";
import {MessageHandleSuccess} from "@/utils";
import {useLocation, useParams} from "react-router-dom";
import { DeploymentInfoProps} from "@/types/deployments.ts";
import { FormInstance } from "antd/lib/form";

const DeploymentInfo = () => {
    const [namespacesList, setNamespacesList] = useState<string[]>([]);
    const [deploymentInfo, setDeploymentInfo] = useState<DeploymentInfoProps>();
    const location = useLocation();
    const {namespaceName, deploymentName} = useParams<{ namespaceName: string; deploymentName: string }>();

    const isEdit = location.pathname.includes('edit');
    const isDelete = location.pathname.includes('delete');
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

        async function handleGetDeploymentInfo() {
            try {
                if (namespaceName && deploymentName) {
                    const dataTempPromise = await deployments.GetInfo("/deployments/" + namespaceName + "/" + deploymentName + "/info");
                    console.log('deploymentInfo', dataTempPromise)
                    setDeploymentInfo(dataTempPromise)
                    console.log('deploymentInfo11', deploymentInfo)
                }
            } catch (error) {
                console.log('error', error)
            }
        }

        if (isEdit||isDelete) {

            void handleGetDeploymentInfo()
        } else {
            void handleGetList()
        }
        // void handleGetList()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call

        // const data = ['1','2','3']
    }, [])
    const formRef = useRef<FormInstance>(null);
    useEffect(() => {
        console.log('deploymentInfo has changed:', deploymentInfo);
        if (deploymentInfo && formRef.current) {
            formRef.current.setFieldsValue({
                name: deploymentInfo.name,
                namespace: deploymentInfo.namespace,
                port: deploymentInfo.port,
                image: deploymentInfo.image,
                replicas: deploymentInfo.replicas,
                requests_resource_cpu: deploymentInfo.requests_resource_cpu,
                requests_resource_memory: deploymentInfo.requests_resource_memory,
                limit_resource_cpu: deploymentInfo.limit_resource_cpu,
                limit_resource_memory: deploymentInfo.limit_resource_memory,

                // ... 其他表单项的值
            });
        }
    }, [deploymentInfo]);

    const handlerSubmit = async (values: any) => {
        try {

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.requests_resource_cpu = values.requests_resource_cpu.toString();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.requests_resource_memory = values.requests_resource_memory.toString();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.limit_resource_cpu = values.limit_resource_cpu.toString();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            values.limit_resource_memory = values.limit_resource_memory.toString();
            if (namespaceName && deploymentName){
                if (isEdit){
                    await deployments.Put("/deployments/", values)
                    MessageHandleSuccess("更新成功")
                    return
                }else if (isDelete){
                    await deployments.Delete("/deployments/"+namespaceName+"/"+deploymentName+"/delete")
                    MessageHandleSuccess("删除成功")
                    return
                }
            }
            await deployments.Create("/deployments/", values)
            MessageHandleSuccess("部署成功")
        } catch (error) {
            console.log('error', error)
        }

    }
    return (
        <div>
            <Form
                ref={formRef}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: '80vw'}}
                onFinish={(values) => void handlerSubmit(values)}
            >
                <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please input name!'}]}>
                    <Input disabled={isEdit||isDelete}/>
                </Form.Item>
                <Form.Item label="Select Namespaces" name="namespace" required={true}>
                    {
                        isEdit||isDelete ? <Input disabled={true}/> : <Select>
                            {namespacesList.length > 0 &&
                                namespacesList.map((item, index) => (
                                    <Select.Option value={item} key={index}>
                                        {item}
                                    </Select.Option>
                                ))}
                        </Select>
                    }

                </Form.Item>
                <Form.Item label="Port" name="port" rules={[{required: true, message: 'Please input a port number!'}]}>
                    <InputNumber min={1} disabled={isEdit||isDelete}/>
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
                                label="Memory(Mi)"
                                name="limit_resource_memory"
                                initialValue={2000}
                            >
                                <InputNumber min={1}/>
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
                                initialValue={200}
                            >
                                <InputNumber min={1}/>
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
                    {
                        isDelete?(<Button type='primary' danger htmlType="submit">Delete</Button>):(<Button type="primary" htmlType="submit">Submit</Button>)
                    }

                </Form.Item>
            </Form>
        </div>
    );
}

export default DeploymentInfo