import { ID, Query } from "appwrite";
import { databases, storage } from "./config";
const databaseId = import.meta.env.VITE_APP_DATABASE_ID;
const collectionId = import.meta.env.VITE_APP_COLLECTION_ID;
const bucketId = import.meta.env.VITE_APP_BUCKET_ID;

export const CreateBlogDoc = async (data) => {
  try {
    const image = await storage.createFile(
      bucketId,
      ID.unique(),
      data?.heroImage[0]
    );
    const getPreview = await storage.getFileView(bucketId, image.$id).href;

    return await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        title: data.title,
        featured_image: getPreview,
        content: data.content,
        tags: data.tags,
        userId: data.userId,
        type: data.type,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating blog", error.message);
  }
};
export const UpdateBlogs = async (data) => {
  try {
    console.log(data);

    let getPreview;
    if (data.heroImage[0]) {
      const image = await storage.createFile(
        bucketId,
        ID.unique(),
        data?.heroImage[0]
      );
      console.log(image);

      getPreview = storage.getFileView(bucketId, image.$id).href;
      console.log(getPreview);

      const fileId = data?.image.match(/\/files\/(.*?)\/view/)[1];
      console.log(fileId);

      await storage.deleteFile(bucketId, fileId);
    }
    return await databases.updateDocument(databaseId, collectionId, data.id, {
      title: data.title,
      featured_image: getPreview || data?.image,
      content: data.content,
      tags: data.tags,
      userId: data.userId,
      type: data.type,
    });
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
export const GettingAllBlog = async (type) => {
  try {
    const qurey =
      type === "blog"
        ? [Query.equal("type", "blog")]
        : [Query.equal("type", "project")];
    return await databases.listDocuments(databaseId, collectionId, qurey);
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
export const addView = async (docId) => {
  try {
    const blog = await databases.getDocument(databaseId, collectionId, docId);
    return databases.updateDocument(databaseId, collectionId, docId, {
      views: blog.views + 1,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error in adding view", error.message);
  }
};
export const addLike = async (docId, userId) => {
  try {
    const blog = await databases.getDocument(databaseId, collectionId, docId);
    const usersLike = [...blog.likedUserId, userId];
    return databases.updateDocument(databaseId, collectionId, docId, {
      likes: blog.likes + 1,
      likedUserId: usersLike,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error in adding view", error.message);
  }
};
export const disLike = async (docId, userId) => {
  try {
    const blog = await databases.getDocument(databaseId, collectionId, docId);
    const usersLike = blog.likedUserId.filter((item) => item !== userId);

    return databases.updateDocument(databaseId, collectionId, docId, {
      likes: blog.likes === 0 ? 0 : blog.likes - 1,
      likedUserId: usersLike,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error in adding view", error.message);
  }
};
export const checkLike = async (userId, docId) => {
  try {
    const blog = await databases.getDocument(databaseId, collectionId, docId);
    console.log(blog);
    if (blog.likedUserId === null) return false;
    const hasLiked = blog.likedUserId.includes(userId);
    return hasLiked;
  } catch (error) {
    console.log(error);
    throw new Error("error in checking user", error.message);
  }
};

export const getRecentBlog = async (type) => {
  try {
    const query = [Query.orderDesc("$createdAt"), Query.limit(4)];
    const additionQuery =
      type === "blog"
        ? [Query.equal("type", "blog")]
        : Query.equal("type", "project");
    query.push(additionQuery);
    return await databases.listDocuments(databaseId, collectionId, query);
  } catch (error) {
    console.log(error);
    throw new Error("error in getting recent blog", error.message);
  }
};
