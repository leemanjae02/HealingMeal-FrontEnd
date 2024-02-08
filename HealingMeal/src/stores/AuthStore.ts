import { action, makeAutoObservable } from "mobx";
import CustomAxios from "../api/Axios";

class AuthStore {
  isLoggedIn: boolean = false;
  userID: string | "" = "";
  userName: string | "" = "000";
  constructor() {
    makeAutoObservable(this, {
      login: action,
      logout: action,
      checkLoginStatus: action,
    });
    this.checkLoginStatus();
  }
  async checkLoginStatus() {
    try {
      const response = await CustomAxios.get("/user/confirm", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const userData = response.data;
        if (userData.length >= 2) {
          const userName = userData[0];
          const userID = userData[1];

          this.login(userName, userID);
        }
      }
    } catch (error) {
      this.logout();
    }
  }
  login = (userName: string, userID: string) => {
    this.isLoggedIn = true;
    this.userName = userName;
    this.userID = userID;
  };

  // logout = action(() => {
  //   this.isLoggedIn = false;
  //   this.userName = "000";
  //   this.userID = "";
  // });

  logout = async () => {
    try {
      const response = await CustomAxios.get("/user/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        this.setLoggedOut();
      }
    } catch (error) {
      console.log("AuthStore 로그아웃 호출에러", error);
    }
  };

  setLoggedOut() {
    this.isLoggedIn = false;
    this.userName = "000";
    this.userID = "";
  }
}

export default new AuthStore();
