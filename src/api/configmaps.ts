import request from "@/utils/request.ts";
import {ConfigmapsAllProps} from "@/types/configmaps.ts";

export default {

    GetAllList(path: string) {
        return request.get<ConfigmapsAllProps[]>(path)
    },
    GetInfo(path: string) {
        return request.get<ConfigmapsAllProps>(path)
    },
    UpdateInfo(path: string, data: ConfigmapsAllProps) {
        return request.put(path, data)
    },
    Create(path: string, data: ConfigmapsAllProps) {
        return request.post(path, data)
    }
}
