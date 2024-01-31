import { useState } from "react";
import styles from "../styles/Styles.module.less";
import SelectedFood from "./SelectedFood";
import CustomAxios from "../api/Axios";

interface Survey5Props {
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPast: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface FormattedData {
  selectedFoods: {
    [category: string]: string;
  };
}

const Survey5: React.FunctionComponent<Survey5Props> = ({ onNext, onPast }) => {
  const [selectedFoods, setSelectedFoods] = useState<{
    [key: string]: string[];
  }>({
    stewsAndHotpots: [],
    stewedFood: [],
    stirFriedFood: [],
    grilledFood: [],
    vegetableFood: [],
    steamedFood: [],
    pancakeFood: [],
    breadAndConfectionery: [],
    beveragesAndTeas: [],
    dairyProducts: [],
  });
  console.log(selectedFoods.stewsAndHotpots);
  const handleValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    onNext(e);
    PostSurvey5();
  };

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
    stewsAndHotpots: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "청국장",
      "짬뽕",
    ],
    stewedFood: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    stirFriedFood: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    grilledFood: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    vegetableFood: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    steamedFood: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    pancakeFood: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    breadAndConfectionery: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    beveragesAndTeas: [
      "김치찌개",
      "된장찌개",
      "부대찌개",
      "버섯전골",
      "샤브샤브",
      "롤",
    ],
    dairyProducts: [
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

  const formattedData: FormattedData = {
    selectedFoods: {},
  };

  // 각 카테고리에 대해 선택된 음식 배열을 문자열로 변환하여 formattedData에 추가
  Object.keys(selectedFoods).forEach((category: string) => {
    formattedData.selectedFoods[category] = selectedFoods[category].join(", ");
  });

  const removeLastComma = (str: string) => {
    if (str.endsWith(", ")) {
      return str.slice(0, -2);
    }
    return str;
  };

  console.log(
    "리무브",
    removeLastComma(formattedData.selectedFoods.stewedFood)
  );

  const PostSurvey5 = async () => {
    const SurveyID = window.sessionStorage.getItem("surveyID");
    const Survey5Data = {
      stewsAndHotpots: removeLastComma(
        formattedData.selectedFoods.stewsAndHotpots
      ),
      stewedFood: removeLastComma(formattedData.selectedFoods.stewedFood),
      stirFriedFood: removeLastComma(formattedData.selectedFoods.stirFriedFood),
      grilledFood: removeLastComma(formattedData.selectedFoods.grilledFood),
      vegetableFood: removeLastComma(formattedData.selectedFoods.vegetableFood),
      steamedFood: removeLastComma(formattedData.selectedFoods.steamedFood),
      pancakeFood: removeLastComma(formattedData.selectedFoods.pancakeFood),
      breadAndConfectionery: removeLastComma(
        formattedData.selectedFoods.breadAndConfectionery
      ),
      beveragesAndTeas: removeLastComma(
        formattedData.selectedFoods.beveragesAndTeas
      ),
      dairyProducts: removeLastComma(formattedData.selectedFoods.dairyProducts),
    };

    console.log("5data", Survey5Data);

    try {
      const response = await CustomAxios.post(
        SurveyID + "/filterFood",
        Survey5Data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("survey5 post 응답", response.data);
        window.sessionStorage.setItem("surveyID", response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
            <button
              onClick={(e) => handleValidation(e)}
              className={styles.Next_btn}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey5;
