import request from "@/utils/request.ts";
import {DeploymentsDetailProps,DeploymentsAllProps} from "@/types/deployments.ts";
export default {
    GetList(path:string){
        return request.get<string[]>(path)
    },
    GetDetail(path:string){
        return request.get<DeploymentsDetailProps[]>(path)
    },
    GetAllList(path:string){
        return request.get<DeploymentsAllProps[]>(path)
    },
    PostDetail(path:string,params:object){
        return request.post<DeploymentsDetailProps>(path,params)
    },
    Create(path:string,params:object){
        return request.post<DeploymentsDetailProps>(path,params)
    }
}
