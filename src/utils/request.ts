import type {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import axios from 'axios'

const Axios = axios.create({
		baseURL: '/api',
		timeout: 2000,//响应时间
})
// 处理请求响应器
Axios.interceptors.request.use(config => {
		// 在发送请求之前做些什么
		return config;
})
//处理响应拦截器
Axios.interceptors.response.use((response: AxiosResponse) => {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		if (response.status === 200) {
				return response.data
		} else {
				console.warn(response)
		}
}, function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error);
});

//再次对请求方法封装
type Data<T> = {
		code: number,
		data: T
}
const http = <T>(url: string, method: Method, submitData?: object, config?: AxiosRequestConfig) => {
		//ts内不可以传泛型
		return Axios.request<T, Data<T>>({
				url, method,
				[method.toLowerCase() === 'get' ? "params" : "data"]: submitData,
				...config
		})
}
export default http
