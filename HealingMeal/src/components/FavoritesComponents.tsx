import React from "react";
import styles from "../styles/Favorites.module.less";

const FavoritesComponents = () => {
  return (
    <div className={styles.RightContainer}>
      <p className={styles.title}>즐겨찾기</p>
      <div className={styles.Container2}>
        <div className={styles.Favorites_box}>
          <div className={styles.Meal_Title}>아침식단</div>
          <div className={styles.Meal_List}>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
        </div>
        <div className={styles.Favorites_box}>
          <div className={styles.Meal_Title}>점심식단</div>
          <div className={styles.Meal_List}></div>
        </div>
        <div className={styles.Favorites_box}>
          <div className={styles.Meal_Title}>저녁식단</div>
          <div className={styles.Meal_List}></div>
        </div>
        <div className={styles.Favorites_box}>
          <div className={styles.Meal_Title}>간식식단</div>
          <div className={styles.Meal_List}></div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesComponents;
