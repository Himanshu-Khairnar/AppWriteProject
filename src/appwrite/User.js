import { account } from "./config";

export const createUser = async (email, password, name) => {
  try {
    return await account.create(ID, email, password, name);
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
    throw new Error("Error in creating user", error.message);
  }
};

export const updateUser = async (email, password) => {
  try {
    return account.updateEmail(email, password);
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating user", error.message);
  }
};

export const updatePassword = async (newpassword, oldpassword) => {
  try {
    return account.updatePassword(newpassword, oldpassword);
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating user", error.message);
  }
};
