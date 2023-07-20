import './index.less'
import {Form, Button, Input,message} from "antd";
// import './index.less'
import styles from './index.module.less'
import api from '@/api'
import {Login} from '@/types/api'
import {useState} from "react";
import store from '@/store'
export default function LoginFC() {
  // const {message} = App.useApp()
  const [loading,setLoading] = useState(false)
  const onFinish = async (values: Login.params) => {
    try{
      setLoading(true)
      const data:any = await api.login(values)
      setLoading(false)
      store.token = data.token
      message.success("登录成功")
      console.log('data',data)
      const params = new URLSearchParams(location.search)
      location.href = params.get("callback")||"/dashboard"
    }catch (error){
      console.log('error',error)
      message.error("登录失败")
      setLoading(false)
    }

  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='userPwd'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
