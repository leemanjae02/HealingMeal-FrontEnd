import { makeAutoObservable, action } from "mobx";

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
