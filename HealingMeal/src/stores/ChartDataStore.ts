import { makeAutoObservable, action } from "mobx";
import CustomAxios from "../api/Axios.tsx";
import AuthStore from "./AuthStore.ts";

class ChartDataStore {
  kcal: number = 0;
  protein: number = 0;
  fat: number = 0;
  carbohydrate: number = 0;

  constructor() {
    makeAutoObservable(this, {
      setKcal: action,
      setFat: action,
      setCarbohydrate: action,
      setProtein: action,
      clearCharData: action,
    });
  }

  getChartData = async () => {
    try {
      const response = await CustomAxios.get(
        AuthStore.userID + "/surveyResult"
      );
      if (response.status === 200) {
        this.setKcal(response.data.kcal);
        this.setProtein(response.data.protein);
        this.setCarbohydrate(response.data.carbohydrate);
        this.setFat(response.data.fat);
      }
    } catch (error) {
      console.log("chartDataStoreError", error);
    }
  };

  clearCharData() {
    this.kcal = 0;
    this.protein = 0;
    this.carbohydrate = 0;
    this.fat = 0;
  }
  setKcal(data: number) {
    this.kcal = data;
  }
  setProtein(data: number) {
    this.protein = data;
  }
  setFat(data: number) {
    this.fat = data;
  }
  setCarbohydrate(data: number) {
    this.carbohydrate = data;
  }
}

const chartDataStore = new ChartDataStore();
export default chartDataStore;
