import resso from 'resso'
import {UserItem} from '@/types/users.ts'

const store = resso({
  token: '',
  userInfo: {
    userEmail: "",
    userName: ''
  },
  updateUserInfo(userInfo: UserItem){
    store.userInfo = userInfo
  }
})

export default store
