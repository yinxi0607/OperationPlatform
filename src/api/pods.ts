import request from "@/utils/request.ts";
import {PodsProps} from "@/types/pods.ts";

export default {
    GetAllList(path: string) {
        return request.get<PodsProps[]>(path)
    },
    GetLogs(path: string) {
        return request.get<string>(path)
    }
}
