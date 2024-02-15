import { useEffect, useState } from "react";
import styles from "../styles/Favorites.module.less";
import MealComponent from "../components/MealInfor.tsx";
import CustomAxios from "../api/Axios.tsx";
import AuthStore from "../stores/AuthStore.ts";
import MealInforModal from "./MealInforModal.tsx";
import mealAiStore from "../stores/MealAiTextStore.ts";

interface MealData {
  bookmarkId: number;
  main_dish: string;
  snack_or_tea?: string;
  imageURL: string;
  rice?: string;
  meals: string;
  sideDishForUserMenu?: string[];
  kcal: string;
  protein: string;
  carbohydrate: string;
  fat: string;
}

console.log("이름", AuthStore.userID);
const FavoritesComponents = () => {
  const [selectedFood, setSelectedFood] = useState<MealData | null>(null);
  const [favorites, setFavorites] = useState<MealData[]>([]);
  const [favoritesSnack, setFavoritesSnack] = useState<MealData[]>([]);

  const getFavoritesMeal = async () => {
    if (AuthStore.userID) {
      try {
        const response = await CustomAxios.get(AuthStore.userID + "/bookmark", {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log(response.data);
          setFavorites(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await CustomAxios.get(
          AuthStore.userID + "/snack/bookmark",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("간식", response.data);
          setFavoritesSnack(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getFavoritesMeal();
    mealAiStore.getMealAiText();
  }, [AuthStore.userID]);

  const openModal = (food: MealData) => {
    setSelectedFood(food);
  };

  const closeModal = () => {
    setSelectedFood(null);
  };

  const clickDeleteFavoritesMeal = async () => {
    const bookmarkId = selectedFood?.bookmarkId;
    if (
      selectedFood?.meals === "BREAKFAST" ||
      selectedFood?.meals === "LUNCH" ||
      selectedFood?.meals === "DINNER"
    ) {
      try {
        const response = await CustomAxios.delete(bookmarkId + "/bookmark", {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("삭제 성공");
          getFavoritesMeal();
          closeModal();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await CustomAxios.delete(
          bookmarkId + "/snack/bookmark",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("삭제 성공");
          getFavoritesMeal();
          closeModal();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mealAiText = {
    breakfastAi: mealAiStore.BreakfastAiText,
    breakfastSnackAi: mealAiStore.BreakfastSnackAiText,
    lunchAi: mealAiStore.LunchAiText,
    lunchSnackAi: mealAiStore.LunchSnackAiText,
    dinnerAi: mealAiStore.DinnerAiText,
  };

  console.log("?", mealAiText);
  return (
    <div className={styles.RightContainer}>
      <p className={styles.title}>즐겨찾기</p>
      <div className={styles.Container2}>
        <div className={styles.Container3}>
          <div className={styles.Favorites_box}>
            <div className={styles.Meal_Title}>
              <p>아침식단</p>
            </div>
            <div className={styles.Meal_List}>
              {favorites
                .filter((food) => food.meals === "BREAKFAST")
                .map((food) => (
                  <MealComponent
                    key={food.bookmarkId}
                    food={food}
                    openModal={() => openModal(food)}
                  />
                ))}
            </div>
          </div>
          <div className={styles.Favorites_box}>
            <div className={styles.Meal_Title}>
              <p>점심식단</p>
            </div>
            <div className={styles.Meal_List}>
              {favorites
                .filter((food) => food.meals === "LUNCH")
                .map((food) => (
                  <MealComponent
                    key={food.bookmarkId}
                    food={food}
                    openModal={() => openModal(food)}
                  />
                ))}
            </div>
          </div>
          <div className={styles.Favorites_box}>
            <div className={styles.Meal_Title}>
              <p>저녁식단</p>
            </div>
            <div className={styles.Meal_List}>
              {favorites
                .filter((food) => food.meals === "DINNER")
                .map((food) => (
                  <MealComponent
                    key={food.bookmarkId}
                    food={food}
                    openModal={() => openModal(food)}
                  />
                ))}
            </div>
          </div>
          <div className={styles.Favorites_box}>
            <div className={styles.Meal_Title}>
              <p>아침 간식식단</p>
            </div>
            <div className={styles.Meal_List}>
              {favoritesSnack
                .filter((food) => food.meals === "BREAKFAST_SNACKORTEA")
                .map((food) => (
                  <MealComponent
                    key={food.bookmarkId}
                    food={food}
                    openModal={() => openModal(food)}
                  />
                ))}
            </div>
          </div>
          <div className={styles.Favorites_box}>
            <div className={styles.Meal_Title}>
              <p>점심 간식식단</p>
            </div>
            <div className={styles.Meal_List}>
              {favoritesSnack
                .filter((food) => food.meals === "LUNCH_SNACKORTEA")
                .map((food) => (
                  <MealComponent
                    key={food.bookmarkId}
                    food={food}
                    openModal={() => openModal(food)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {selectedFood && (
        <MealInforModal
          food={selectedFood}
          mealAiText={mealAiText}
          closeModal={closeModal}
          clickDeleteFavoritesMeal={clickDeleteFavoritesMeal}
        />
      )}
    </div>
  );
};

export default FavoritesComponents;
