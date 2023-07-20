import './App.css'
import {ConfigProvider,App as AntdApp} from "antd";
import {RouterProvider} from "react-router-dom";
import router from "./router";

function App() {

  return (
      <ConfigProvider
          theme={
              {
                  token: {
                      colorPrimary: '#ed6c00',
                  }
              }
          }
      >
          <AntdApp>
              <RouterProvider router={router}/>
          </AntdApp>

      </ConfigProvider>
  )
}

export default App
