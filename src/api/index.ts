import request from "@/utils/request.ts";
import {Login} from '@/types/api.ts';
import {UserItem} from '@/types/users.ts';
export default {
  login(params: Login.params){
    return request.post(
      '/users/login',
      params,{showLoading:false,showError:false}
    )
  },
  getUserInfo(){
    return request.get<UserItem>('/users/info')
  }
}
