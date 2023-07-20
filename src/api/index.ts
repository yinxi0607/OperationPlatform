import request from "@/utils/request.ts";
import {Login,User} from '@/types/api.ts';
export default {
  login(params: Login.params){
    return request.post(
      '/users/login',
      params,{showLoading:false,showError:false}
    )
  },
  getUserInfo(){
    return request.get<User.UserItem>('/users/info')
  }
}
