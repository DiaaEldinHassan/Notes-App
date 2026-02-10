import axios from "axios";
import { apiUrl } from "../../config.service";

export async function  updateUser(data) {
    try {
        const token=localStorage.getItem("token");
        if(!token) return "User is not authorized";
        const newUserData=await axios.patch(`${apiUrl}/users/updateUserData`,data,{headers:{Authorization:`Bearer ${token}`}});
        return newUserData;
    } catch (error) {
        console.log(error)
    }
}