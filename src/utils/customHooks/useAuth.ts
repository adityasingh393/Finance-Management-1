import { useEffect, useState } from "react"
import { newUser } from "../interface/types"


export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<newUser>()

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user: newUser = await JSON.parse(sessionStorage.getItem('currentUser')!)

                if(user) setCurrentUser(user)
                else throw new Error()
            } catch (error) {
                console.log('Error occured while fetching current user!', error)
            }
        }

        getCurrentUser()
    }, [currentUser])

    return {currentUser}
}