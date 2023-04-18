import http from "@/utils/request";

export const userApi = (data: object, config?: any) => http('/', 'get', data, config)
