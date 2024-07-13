import localforage from "localforage";
import { newUser } from "../interface/types";

export const fetchData = async (email: string): Promise<newUser | null> => {
  try {
    const userData = await localforage.getItem<newUser>(`user_${email}`);
    return userData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
