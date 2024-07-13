import localforage from "localforage";
import { newUser, userDetails } from "../interfaces/UserInterface";

export const updateUserInDB = async(data:newUser) => {
    await localforage.setItem('current-user', [data])


}

export const getUserFromDB = async(_data:userDetails) => {
    // const users:newUser[] = await localforage.getItem('users')

    // const currentUser = users?.filter((user)=>user.user.email === data.email && user.user.password === data.password)
}