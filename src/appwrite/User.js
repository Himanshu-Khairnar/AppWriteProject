import { account, databases,storage } from "./config";
import { ID } from "appwrite";
const database = import.meta.env.VITE_APP_DATABASE_ID;
const collection = import.meta.env.VITE_APP_COLLECTION_USER;
const bucket = import.meta.env.VITE_APP_BUCKET_ID;
export const createUser = async (email, password, name) => {
  try {
    console.log(email, password, name);

    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating user", error.message);
  }
};
export const login = async (email, password) => {
  try {
    console.log(email, password);

    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log(error);
    throw new Error("Error in login user", error.message);
  }
};
export const logout = async () => {
  try {
    return account.deleteSessions();
  } catch (error) {
    console.log(error);
    throw new Error("Error in logout user", error.message);
  }
};
export const updateUser = async (email, password) => {
  try {
    return account.updateEmail(email, password);
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating user", error.message);
  }
};
export const updatePassword = async (newpassword, oldpassword) => {
  try {
    return account.updatePassword(newpassword, oldpassword);
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating password", error.message);
  }
};
export const getAccount = async () => {
  try {
    return account.get();
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating password", error.message);
  }
};

export const createUserDetails = async (data) => {
  try {
    
    const image = await storage.createFile(storage,ID.unique(),data?.image)
    return await databases.createDocument(
      database,collection,ID.unique(),{
        data
      }
    )
  } catch (error) {
    console.log(error);
    throw new Error("Error in created user details", error.message);
  }
};
