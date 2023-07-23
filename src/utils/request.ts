import axios, {AxiosError,AxiosResponse} from "axios";
import {hideLoading, showLoading} from "@/utils/loading/index..tsx";
import env from "@/config/index.ts";
import {ResponseData} from "@/types/api.ts";
import store from "@/store/index.ts";
import {MessageHandleError} from "@/utils/index.ts";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
    timeout: 8000,
    timeoutErrorMessage: "请求超时",
    withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        if (config.showLoading) showLoading()
        const token = store.token
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        if (env.mock) {
            config.baseURL = env.mockApi
        } else {
            config.baseURL = env.baseApi
        }
        return {...config}
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => { // 使用泛型，可以替换any为具体类型
        const data: ResponseData<any> = response.data; // 使用泛型，可以替换any为具体类型
        hideLoading();
        if (data.code === 500001) {
            MessageHandleError(data.msg);
            store.token = "";
        } else if (data.code !== 0) {
            if (response.config.showError === false) {
                return Promise.resolve(data);
            } else {
                MessageHandleError(data.msg);
                return Promise.reject(data);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data.data;
    },
    (err: AxiosError) => {
        hideLoading();
        MessageHandleError(err.message);
        return Promise.reject(err.message);
    }
);

interface IConfig {
    showLoading?: boolean
    showError?: boolean
}

export default {
    get<T>(url: string, params?: object, options: IConfig = {showLoading: true, showError: true}): Promise<T> {
        return instance.get(url, {params, ...options})
    },
    post<T>(url: string, params?: object, options: IConfig = {showLoading: true, showError: true}): Promise<T> {
        return instance.post(url, params, options)
    },
    delete<T>(url: string): Promise<T> {
        return instance.delete(url)
    },
    put<T>(url: string, params?: object, options: IConfig = {showLoading: true, showError: true}): Promise<T> {
        return instance.put(url, params, options)
    }
}
