import styles from "../styles/MealInfor.module.less";
interface MealData {
  bookmarkId?: number;
  snack_or_tea?: string;
  main_dish: string;
  imageURL: string;
  rice?: string;
  meals: string;
  sideDishForUserMenu?: string[];
  kcal: string;
  protein: string;
  carbohydrate: string;
  fat: string;
}

const MealComponent = ({
  food,
  openModal,
}: {
  food: MealData;
  openModal: (food: MealData) => void;
}) => {
  return (
    <div className={styles.Meal_components} onClick={() => openModal(food)}>
      <div className={styles.Meal_components_img}>
        <img src={food.imageURL} />
      </div>
      <p className={styles.Meal_components_text}>
        {" "}
        {food.main_dish ? food.main_dish : food.snack_or_tea}
      </p>
    </div>
  );
};

export default MealComponent;
