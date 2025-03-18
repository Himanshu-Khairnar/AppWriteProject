import { Account, Client, ID } from "appwrite";
import conf from "../config/config";

export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique, email, password, name);
      if (user) {
        return this.login({ email, passowrd });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, passowrd }) {
    try {
      return await this.account.createEmailPasswordSession(email, passowrd);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error in fetching current user", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions("all");
    } catch (error) {
      console.log("error in logout", error);
    }
    return null;
  }
}

const AuthService = new AuthServices();

export default AuthService;
