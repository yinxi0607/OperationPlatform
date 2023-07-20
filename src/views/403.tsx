import {Result,Button} from 'antd';
import {useNavigate} from "react-router";

function NoPermission(){
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate('/');
  }
  return <Result status={403} title="403" subTitle="抱歉，你没有权限访问此页面" extra={
    <Button type="primary" onClick={handleClick}>Back Home</Button>
  }/>
}

export default NoPermission;
