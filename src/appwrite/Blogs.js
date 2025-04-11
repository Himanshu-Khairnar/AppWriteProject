import { ID } from "appwrite";
import { databases } from "./config";
const databaseId = import.meta.env.VITE_APP_DATABASE_ID;
const collectionId = import.meta.env.VITE_APP_COLLECTION_ID;
export const CreateBlog = async (data) => {
  try {
    return await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating blog", error.message);
  }
};
export const UpdateBlog = async (data) => {
  try {
    return await databases.updateDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating blog", error.message);
  }
};
export const DeletingBlog = async (docId) => {
  try {
    return await databases.deleteDocument(databaseId, collectionId, docId);
  } catch (error) {
    console.log(error);
    throw new Error("Error in deleting blog", error.message);
  }
};
export const GettingAllBlog = async () => {
  try {
    return await databases.listDocuments(databaseId, collectionId);
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating blog", error.message);
  }
};
export const GettingBlog = async (docId) => {
  try {
    return await databases.getDocument(databaseId, collectionId, docId);
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating blog", error.message);
  }
};
