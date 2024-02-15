import { makeAutoObservable, action } from "mobx";
import CustomAxios from "../api/Axios.tsx";
import AuthStore from "./AuthStore.ts";

class MealAiStore {
  BreakfastAiText: string = "";
  LunchAiText: string = "";
  DinnerAiText: string = "";
  BreakfastSnackAiText: string = "";
  LunchSnackAiText: string = "";

  constructor() {
    makeAutoObservable(this, {
      setBreakfastAiText: action,
      setLunchAiText: action,
      setDinnerAiText: action,
      setBreakfastSnackAiText: action,
      setLunchSnackAiText: action,
    });
  }
  getMealAiText = async () => {
    try {
      const [BreakfastAi, BreakfastSnackAi, LunchAi, LunchSnackAi, DinnerAi] =
        await Promise.all([
          CustomAxios.get(AuthStore.userID + "/ai/breakfast"),
          CustomAxios.get(AuthStore.userID + "/ai/breakfast-snackortea"),
          CustomAxios.get(AuthStore.userID + "/ai/lunch"),
          CustomAxios.get(AuthStore.userID + "/ai/lunch-snackortea"),
          CustomAxios.get(AuthStore.userID + "/ai/dinner", {
            withCredentials: true,
          }),
        ]);
      if (BreakfastAi.status !== 200) {
        console.error("BreakfastAi API 호출 실패:", BreakfastAi.data);
      }
      if (BreakfastSnackAi.status !== 200) {
        console.error("BreakfastSnackAi API 호출 실패:", BreakfastSnackAi.data);
      }
      if (LunchAi.status !== 200) {
        console.error("LunchAi API 호출 실패:", LunchAi.data);
      }
      if (LunchSnackAi.status !== 200) {
        console.error("LunchSnackAi API 호출 실패:", LunchSnackAi.data);
      }
      if (DinnerAi.status !== 200) {
        console.error("DinnerAi API 호출 실패:", DinnerAi.data);
      }

      if (
        BreakfastAi.status === 200 &&
        BreakfastSnackAi.status === 200 &&
        LunchAi.status === 200 &&
        LunchSnackAi.status === 200 &&
        DinnerAi.status === 200
      ) {
        this.setBreakfastAiText(BreakfastAi.data.answer);
        this.setLunchAiText(LunchAi.data.answer);
        this.setDinnerAiText(DinnerAi.data.answer);
        this.setBreakfastSnackAiText(BreakfastSnackAi.data.answer);
        this.setLunchSnackAiText(LunchSnackAi.data.answer);
      }
    } catch (error) {
      console.log("한 개 이상의 API 통신 에러", error);
    }
  };

  setBreakfastAiText(text: string) {
    this.BreakfastAiText = text;
  }

  setLunchAiText(text: string) {
    this.LunchAiText = text;
  }

  setDinnerAiText(text: string) {
    this.DinnerAiText = text;
  }

  setBreakfastSnackAiText(text: string) {
    this.BreakfastSnackAiText = text;
  }

  setLunchSnackAiText(text: string) {
    this.LunchSnackAiText = text;
  }
}

const mealAiStore = new MealAiStore();
export default mealAiStore;
