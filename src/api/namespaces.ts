import request from "@/utils/request.ts";
import {NamespacesDetailProps} from "@/types/namespaces.ts";
export default {
    GetList(path:string){
        return request.get<string[]>(path)
    },
    GetDetail(path:string){
        return request.get<NamespacesDetailProps>(path)
    },
    PostDetail(path:string,params:object){
        return request.post<NamespacesDetailProps>(path,params)
    }
}
