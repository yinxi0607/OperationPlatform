import request from "@/utils/request.ts";
import {DeploymentsPodsProps,DeploymentsAllProps} from "@/types/deployments.ts";
export default {
    GetList(path:string){
        return request.get<string[]>(path)
    },
    GetDetail(path:string){
        return request.get<DeploymentsPodsProps[]>(path)
    },
    GetAllList(path:string){
        return request.get<DeploymentsAllProps[]>(path)
    },
    PostDetail(path:string,params:object){
        return request.post<DeploymentsPodsProps>(path,params)
    },
    Create(path:string,params:object){
        return request.post<DeploymentsPodsProps>(path,params)
    }
}
