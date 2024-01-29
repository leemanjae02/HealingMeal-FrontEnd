import styles from "../styles/Styles.module.less";

interface Survey3Props {
  setExerciseType: (exerciseType: number) => void;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPast: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSurvey3Valid: (setSurvey3Valid: boolean) => void;
  exerciseType: number;
}

const Survey3: React.FunctionComponent<Survey3Props> = ({
  setExerciseType,
  onNext,
  onPast,
  setSurvey3Valid,
  exerciseType,
}) => {
  const handleTypeSelect = (selectedType: number) => {
    setExerciseType(selectedType);
    console.log("3 컴포넌트", selectedType);
  };
  const handleValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("1번자식 함수", exerciseType);
    if (exerciseType) {
      setSurvey3Valid(true);
      onNext(e);
    } else {
      setSurvey3Valid(false);
    }
  };

  return (
    <div className={styles.SurveyContainer2}>
      <div className={styles.Survey_Page}>
        <div className={styles.Survey_box}>
          <div className={styles.Survey_title}>
            <div className={styles.title_text}>
              <strong>설문조사</strong>
              <p>운동유형 선택</p>
            </div>
          </div>
          <div className={styles.Survey_container}>
            <div className={styles.Survey2_box}>
              <p className={styles.Survey2_box_text}>
                주에 얼마나 운동을 얼마나 하시나요?
              </p>
              <div className={styles.Survey3_box}>
                <div
                  className={`${styles.Survey3_box_text} ${
                    exerciseType === 1 ? styles.selected : ""
                  }`}
                  onClick={() => handleTypeSelect(1)}
                >
                  주 0~2회 운동을 하는경우
                </div>
                <div
                  className={`${styles.Survey3_box_text} ${
                    exerciseType === 2 ? styles.selected : ""
                  }`}
                  onClick={() => handleTypeSelect(2)}
                >
                  주 3~4회 운동을 하는경우
                </div>
                <div
                  className={`${styles.Survey3_box_text} ${
                    exerciseType === 3 ? styles.selected : ""
                  }`}
                  onClick={() => handleTypeSelect(3)}
                >
                  주 5~7회 운동을 하는경우
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Survey_btn}>
          <button onClick={(e) => onPast(e)} className={styles.Past_btn}>
            이전
          </button>
          <button
            onClick={(e) => handleValidation(e)}
            className={styles.Next_btn}
            disabled={!exerciseType}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey3;
