import React, {useEffect, useState} from "react";
import namespaces from "@/api/namespaces.ts";
import {useParams} from "react-router-dom";
import {Button, Input} from 'antd';
import {MessageHandleSuccess} from "@/utils";
import {NamespacesDetailProps} from "@/types/namespaces.ts";



const NamespacesDetail: React.FC = () => {
    const [loadings, setLoadings] = useState<boolean>(false);
    const [onChangeSign, setOnChangeSign] = useState<boolean>(false);
    const { item } = useParams<{ item: string }>();
    const [inputData, setInputData] = useState<NamespacesDetailProps>({name:"",status:""});
    useEffect(() => {
        const handlerNamespacesDetail = async () => {
            try {
                if (!item) return
                const dataTempPromise = await namespaces.GetDetail("/namespaces/edit/"+item);
                console.log('NamespacesDetailProps', dataTempPromise)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                // const { name: Name, status: Status } = dataTempPromise as any;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                setInputData(dataTempPromise)
                // setInitLoading(false)
            } catch (error) {
                console.log('error', error)
            }
        }
        void handlerNamespacesDetail()

    },[])
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
        setOnChangeSign(true);
        const { name, value } = e.target;
        console.log('name', name, 'value', value)
        if (name === 'name') setInputData({name:value, status:inputData.status})
        else setInputData({name:inputData.name, status:value})
    };

    const handlerSubmit = async () => {
        try {
            if (!onChangeSign) return MessageHandleSuccess('No change');
            setLoadings(true);
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            await namespaces.PostDetail("/namespaces/edit/"+item, inputData);
            setLoadings(false);
        } catch (error) {
            setLoadings(false);
            console.log('error', error);
        }
        setTimeout(() => {
            setLoadings(false)
        }, 3000);
    }
    return (
        <div>
            <Input name="name" showCount maxLength={20} onChange={onChange} placeholder="Name" value={inputData.name}/>
            <br />
            <br />
            <Input name="status" showCount maxLength={20} onChange={onChange} placeholder="Status"  value={inputData.status}/>
            <br />
            <br />
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button type="primary" loading={loadings} onClick={handlerSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default NamespacesDetail