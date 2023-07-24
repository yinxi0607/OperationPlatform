import React, {useEffect, useState} from "react";
import {List, Skeleton} from "antd";
import {Link, useLocation} from "react-router-dom";
import namespaces from "@/api/namespaces.ts";
export interface ShowListProps {
    headerName: string
}

const ShowList: React.FC<ShowListProps> = ({headerName}) => {
    const location = useLocation()
    const [loading, setLoading] = useState(false);
    // const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState<string[]>([]);
    useEffect(() => {
        async function handleGetList() {
            try {
                const path = location.pathname
                console.log('path', path)
                const dataTempPromise = await namespaces.GetList("/namespaces/");
                console.log('data', dataTempPromise)
                setList(dataTempPromise)
                // setInitLoading(false)
                setLoading(false)
            } catch (error) {
                console.log('error', error)
            }
        }
        void handleGetList()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call

        // const data = ['1','2','3']
    },[])
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            // loading={initLoading}
            header={<div style={{alignItems: 'center', justifyContent: 'center', position: 'relative',left: '40%'}}>{headerName}</div>}
            renderItem={(item) => (
                <List.Item
                    actions={[<Link key="list-loadmore-edit" to={`/namespaces/edit/${item}`}>edit</Link>]}
                >
                    <Skeleton avatar title={false} loading={loading}>
                        <List.Item.Meta
                            title={item}
                            style={{alignItems: 'center', justifyContent: 'center', position: 'relative',left: '40%'}}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}

export default ShowList