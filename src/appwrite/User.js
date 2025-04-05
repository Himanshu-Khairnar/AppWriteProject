import { account } from "./config";
import { ID } from "appwrite";
export const createUser = async (email, password, name) => {
  try {
    
    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating user", error.message);
  }
};
export const login = async (email, password) => {
  try {
    return account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log(error);
    throw new Error("Error in login user", error.message);
  }
};
export const logout  = async()=>{
  try {
    return account.deleteSessions()
  } catch (error) {
     console.log(error);
     throw new Error("Error in logout user", error.message);
  
  }
}
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

export const getAccount = async ()=>{
  try {
    return account.get()
  } catch (error) {
  console.log(error);
  throw new Error("Error in updating password", error.message);    
  }
}