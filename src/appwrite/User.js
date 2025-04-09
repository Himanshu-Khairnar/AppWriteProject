import { account, databases, storage } from "./config";
import { ID, Query } from "appwrite";
const databaseId = import.meta.env.VITE_APP_DATABASE_ID;
const collectionId = import.meta.env.VITE_APP_COLLECTION_USER;
const bucketId = import.meta.env.VITE_APP_BUCKET_ID;
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
export const isSlugUnique = async (slug) => {
  const res = await databases.listDocuments(databaseId, collectionId, [
    Query.equal("username", slug),
  ]);
  return res.total === 0;
};
export const createUserDetails = async (data) => {
  try {
    console.log(data);

    const image = await storage.createFile(
      bucketId,
      ID.unique(),
      data?.avatar[0],
    );

    return await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        username: data.username,
        bio: data.bio,
        Avatar: image.$id,
        Github: data.github,
        userId: data.userId,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in created user details", error.message);
  }
};
export const updateUserDetails = async (data) => {
  try {
    console.log(data);

    const image = await storage.createFile(
      bucketId,
      ID.unique(),
      data?.avatar[0],
      ["role:all"]
    );

    return await databases.updateDocument(
      databaseId,
      collectionId,
      data.$id,
      {
        username: data.username,
        bio: data.bio,
        Avatar: image.$id,
        Github: data.github,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in created user details", error.message);
  }
};
export const getUserDetails = async (userId) => {
  return await databases.listDocuments(databaseId, collectionId, [
    Query.equal("userId", userId),
  ]);
};


export const getImagePreview =  (fileId) => {
  try {
    return storage.getFileView(bucketId, fileId).href; 
  } catch (error) {
    console.log(error);
    throw new Error("Error in preview image", error.message);
  }
};
