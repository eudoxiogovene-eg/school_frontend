

import axios from "axios"
const user=localStorage.getItem('user')
const userData=user?JSON.parse(user):''
const token=user?userData.token:''



const api= axios.create({
    baseURL: 'http://localhost:3333',
        headers:{
            Authorization:`Bearer ${token}`
        } 
 
})

export default api