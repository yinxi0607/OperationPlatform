import request from "@/utils/request.ts";
import {
    DeploymentsPodsProps,
    DeploymentsAllProps,
    DeploymentInfoProps
} from "@/types/deployments.ts";

export default {
    GetList(path: string) {
        return request.get<string[]>(path)
    },
    GetPods(path: string) {
        return request.get<DeploymentsPodsProps[]>(path)
    },
    GetInfo(path: string) {
        return request.get<DeploymentInfoProps>(path)
    },
    GetAllList(path: string) {
        return request.get<DeploymentsAllProps[]>(path)
    },
    PostDetail(path: string, params: object) {
        return request.post<DeploymentsPodsProps>(path, params)
    },
    Create(path: string, params: object) {
        return request.post<DeploymentsPodsProps>(path, params)
    },
    Delete(path: string) {
        return request.delete(path)
    },
    Put(path: string, params: object) {
        return request.put<DeploymentInfoProps>(path, params)
    }
}
