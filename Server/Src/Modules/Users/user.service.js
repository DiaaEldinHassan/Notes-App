import {findById, findByIdAndUpdate, throwError,throwSuccess} from "../../index.js";
export async function getUserData(token) {
    try {
        if(!token) throwError(401,"User is not authorized");
        const user=await findById(token._id,"-password");
       return throwSuccess("User Data Found",user);
    } catch (error) {
        throwError(error.status,error.message);
    }
}

export async function updateData(data,token) {
    try {
        if(!token) throwError(401,"User is not authorized");
        const userData=await findByIdAndUpdate(data,token._id);
        return throwSuccess("Updated Successfully",userData);
    } catch (error) {
        throwError(error.status,error.message);
    }
}