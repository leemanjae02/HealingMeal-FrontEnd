import React from "react";
import styles from "../styles/SelectedFood.module.less";

interface SelectedFoodProps {
  categoryIndex: number;
  categoryName: string;
  foods: string[];
  selectedFoods: string[];
  onSelect: (category: string, updatedSelectedFoods: string[]) => void;
  onSelectAll: (category: string, selectAll: boolean) => void;
}

const SelectedFood: React.FunctionComponent<SelectedFoodProps> = ({
  categoryIndex,
  categoryName,
  foods,
  selectedFoods,
  onSelect,
  onSelectAll,
}) => {
  const handleClickFood = (selectedFood: string) => {
    const updatedSelectedFoods = selectedFoods.includes(selectedFood)
      ? selectedFoods.filter((food) => food !== selectedFood)
      : [...selectedFoods, selectedFood];

    onSelect(categoryName, updatedSelectedFoods);
  };
  const handleSelectAll = () => {
    const selectAll = selectedFoods.length !== foods.length;
    onSelectAll(categoryName, selectAll);
  };
  // const handleSelectAll = () => {
  //   const selectAll = Object.keys(selectedFoods).length !== foods.length;
  //   onSelectAll(categoryName, selectAll);
  // };

  const categoryNames = [
    "찌개 밎 전골류",
    "조림류",
    "볶음류",
    "구이류",
    "나물류",
    "찜류",
    "전 밎 부침류",
    "빵 밎 과자류",
    "음료 및 차류",
    "유제품류",
  ];
  const categorytitle = categoryNames[categoryIndex];
  return (
    <div className={styles.Survey5_select_div}>
      <div className={styles.Survey5_select_foodName}>
        <p>{categorytitle}</p>
        <div className={styles.SelectAll_btn}>
          <button onClick={handleSelectAll}>전체선택</button>
        </div>
      </div>
      <div className={styles.Survey5_select_food}>
        <table>
          <tbody>
            {[0, 1].map((rowIndex) => (
              <tr key={rowIndex}>
                {[0, 1, 2].map((colIndex) => {
                  const foodIndex = rowIndex * 3 + colIndex;
                  const food = foods[foodIndex];
                  return (
                    <td key={colIndex}>
                      {food && (
                        <button
                          onClick={() => handleClickFood(food)}
                          className={
                            selectedFoods.includes(food) ? styles.selected : ""
                          }
                        >
                          {food}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedFood;
