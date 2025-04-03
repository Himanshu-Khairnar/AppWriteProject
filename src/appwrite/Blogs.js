import { databases } from "./config";

export const CreateBlog = async (data, docId) => {
  try {
    return await databases.createDocument(
      "<DATABASE_ID>",
      "<COLLECTION_ID>",
      docId,
      data
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating blog", error.message);
  }
};
export const UpdateBlog = async (data, docId) => {
  try {
    return await databases.updateDocument(
      "<DATABASE_ID>",
      "<COLLECTION_ID>",
      docId,
      data
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating blog", error.message);
  }
};
export const DeletingBlog = async (data, docId) => {
  try {
    return await databases.deleteDocument(
      "<DATABASE_ID>",
      "<COLLECTION_ID>",
      docId
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in deleting blog", error.message);
  }
};
export const GettingAllBlog = async () => {
  try {
    return await databases.listDocuments(
      "<DATABASE_ID>", // databaseId
      "<COLLECTION_ID>", // collectionId
      [] // queries (optional)
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating blog", error.message);
  }
};
export const GettingBlog = async (doc) => {
  try {
    return await databases.getDocument(
      "<DATABASE_ID>", // databaseId
      "<COLLECTION_ID>", // collectionId
      "<DOCUMENT_ID>", // documentId
      [] // queries (optional)
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating blog", error.message);
  }
};
