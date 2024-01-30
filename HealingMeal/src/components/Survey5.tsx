import { useState } from "react";
import styles from "../styles/Styles.module.less";
import SelectedFood from "./SelectedFood";

interface Survey5Props {
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPast: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Survey5: React.FunctionComponent<Survey5Props> = ({ onNext, onPast }) => {
  const [selectedFoods, setSelectedFoods] = useState<{
    [key: string]: string[];
  }>({
    Category1: [],
    Category2: [],
    Category3: [],
    Category4: [],
    Category5: [],
    Category6: [],
    Category7: [],
    Category8: [],
    Category9: [],
    Category10: [],
  });
  console.log(selectedFoods);

  const handleFoodSelection = (
    category: string,
    upDatedSelectedFoods: string[]
  ) => {
    setSelectedFoods({
      ...selectedFoods,
      [category]: upDatedSelectedFoods,
    });
  };

  const categorys: { [key: string]: string[] } = {
    Category1: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "청국장",
      "짬뽕",
    ],
    Category2: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category3: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category4: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category5: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category6: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category7: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category8: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category9: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    Category10: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
  };

  const handleSelectAll = (category: string, selectAll: boolean) => {
    const allFoods = categorys[category] || [];
    const currentSelectedFoods = selectedFoods[category] || [];

    let updatedSelectedFoods: string[];

    if (selectAll) {
      // 전체 선택
      updatedSelectedFoods = Array.from(
        new Set([...currentSelectedFoods, ...allFoods])
      );
    } else {
      // 전체 선택 해제
      updatedSelectedFoods = currentSelectedFoods.filter(
        (food) => !allFoods.includes(food)
      );
    }

    handleFoodSelection(category, updatedSelectedFoods);
  };

  return (
    <div className={styles.SurveyContainer2}>
      <div className={styles.Survey_Page}>
        <div className={styles.Survey_box}>
          <div className={styles.Survey_title}>
            <div className={styles.title_text}>
              <strong>설문조사</strong>
              <p>식단제외 음식 선택</p>
            </div>
          </div>
          <div className={styles.Survey5_Page}>
            {Object.keys(selectedFoods).map((category, index) => (
              <SelectedFood
                key={category}
                categoryName={category}
                categoryIndex={index}
                foods={categorys[category] || []} // 각 카테고리에 해당하는 음식 목록 전달
                selectedFoods={selectedFoods[category] || []} // 각 카테고리에 해당하는 선택된 음식 목록 전달
                onSelect={(category, upDatedSelectedFoods) =>
                  handleFoodSelection(category, upDatedSelectedFoods)
                }
                onSelectAll={(category, selectAll) =>
                  handleSelectAll(category, selectAll)
                }
              />
            ))}
          </div>

          <div className={styles.Survey_btn}>
            <button onClick={(e) => onPast(e)} className={styles.Past_btn}>
              이전
            </button>
            <button onClick={(e) => onNext(e)} className={styles.Next_btn}>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey5;
