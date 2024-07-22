/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import localforage from "localforage";
import { newUser } from "./interface/types";

export const saveToIndexedDB = async (data: newUser) => {
    try {
        const users:newUser[] | null = await localforage.getItem('User')

        const indx = users?.findIndex((i) => i.user.email === data.user.email)!

        if(users) users[indx] = data
        await localforage.setItem('User', users)
    } catch (error) {
        console.log(error)  // make it user friendly
    }
}