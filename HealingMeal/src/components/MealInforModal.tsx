// MealModal.tsx
import React from "react";
import styles from "../styles/MealInforModal.module.less";

interface MealInforModalProps {
  food: {
    bookmarkId?: number;
    main_dish: string;
    imageURL: string;
    kcal: string;
    protein: string;
    carbohydrate: string;
    fat: string;
    meals: string;
    rice?: string;
    sideDishForUserMenu?: string[];
    snack_or_tea?: string;
  };
  mealAiText: {
    breakfastAi: string;
    breakfastSnackAi: string;
    lunchAi: string;
    lunchSnackAi: string;
    dinnerAi: string;
  } | null;

  closeModal: () => void;
  clickFavoritesMeal?: () => void;
  clickDeleteFavoritesMeal?: () => void;
}

const MealInforModal: React.FC<MealInforModalProps> = ({
  food,
  mealAiText,
  closeModal,
  clickFavoritesMeal,
  clickDeleteFavoritesMeal,
}) => {
  const convertMealsToKorean = (meals: string): string => {
    switch (meals) {
      case "BREAKFAST":
        return "아침식단";
      case "LUNCH":
        return "점심식단";
      case "DINNER":
        return "저녁식단";
      case "BREAKFAST_SNACKORTEA":
        return "아침간식";
      case "LUNCH_SNACKORTEA":
        return "점심간식";
      default:
        return meals;
    }
  };
  const replaceBreakfastAi = mealAiText?.breakfastAi.replace(/-/g, "\n");
  const replaceBreakfastSnactAi = mealAiText?.breakfastSnackAi.replace(
    /-/g,
    "\n"
  );
  const replaceLunchAi = mealAiText?.lunchAi.replace(/-/g, "\n");
  const replaceLunchSnackAi = mealAiText?.lunchSnackAi.replace(/-/g, "\n");
  const replaceDinnerAi = mealAiText?.dinnerAi.replace(/-/g, "\n");
  return (
    <div className={styles.popup}>
      <div className={styles.Menu_box}>
        <div className={styles.popup_image}>
          <img src={food.imageURL} />
        </div>
        <div className={styles.Menu_info}>
          <p>
            <span>식단:</span> {convertMealsToKorean(food.meals)}
          </p>
          <p>
            <span>대표메뉴:</span>{" "}
            {food.main_dish ? food.main_dish : food.snack_or_tea}
          </p>
          {food.rice && (
            <p>
              <span>밥:</span> {food.rice}
            </p>
          )}
          {food.sideDishForUserMenu && (
            <p>
              <span>반찬:</span> {food.sideDishForUserMenu.join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className={styles.NutritionInfo}>
        <div className={styles.NutritionInfo_Icon}>
          <div className={styles.mini_icon}>
            <img src="../../public/images/kcal-icon.png" />
            <p className={styles.IconName}>칼로리</p>
            <p className={styles.mini_text}>{food.kcal}Kcal</p>
          </div>
          <div className={styles.mini_icon}>
            <img src="../../public/images/meat-icon.png" />
            <p className={styles.IconName}>단백질</p>
            <p className={styles.mini_text}>{food.protein}g</p>
          </div>
          <div className={styles.mini_icon}>
            <img src="../../public/images/bab-icon.png" />
            <p className={styles.IconName}>탄수화물</p>
            <p className={styles.mini_text}>{food.carbohydrate}g</p>
          </div>
          <div className={styles.mini_icon}>
            <img src="../../public/images/fat-icon.png" />
            <p className={styles.IconName}>지방</p>
            <p className={styles.mini_text}>{food.fat}g</p>
          </div>
        </div>
        <div className={styles.NutritionInfo_ai}>
          {food.meals === "BREAKFAST" &&
            replaceBreakfastAi
              ?.split("\n")
              .map((line, index) => <p key={index}>{line}</p>)}
          {food.meals === "BREAKFAST_SNACKORTEA" &&
            replaceBreakfastSnactAi
              ?.split("\n")
              .map((line, index) => <p key={index}>{line}</p>)}
          {food.meals === "LUNCH" &&
            replaceLunchAi
              ?.split("\n")
              .map((line, index) => <p key={index}>{line}</p>)}
          {food.meals === "LUNCH_SNACKORTEA" &&
            replaceLunchSnackAi
              ?.split("\n")
              .map((line, index) => <p key={index}>{line}</p>)}
          {food.meals === "DINNER" &&
            replaceDinnerAi
              ?.split("\n")
              .map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </div>
      <div className={styles.closePopUp}>
        {clickFavoritesMeal && (
          <button className={styles.favorites_btn} onClick={clickFavoritesMeal}>
            즐겨찾기
          </button>
        )}
        {clickDeleteFavoritesMeal && (
          <button
            className={styles.favorites_btn}
            onClick={clickDeleteFavoritesMeal}
          >
            삭제
          </button>
        )}
        <button className={styles.close_Btn} onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default MealInforModal;
