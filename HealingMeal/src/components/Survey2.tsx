import styles from "../styles/Styles.module.less";

interface Survey2Props {
  setDiabetesType: (diabetestype: number) => void;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPast: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSurvey2Valid: (survey2Valid: boolean) => void;
  diabetestype: number;
}

const Survey2: React.FunctionComponent<Survey2Props> = ({
  setDiabetesType,
  onNext,
  onPast,
  setSurvey2Valid,
  diabetestype,
}) => {
  const handleTypeSelect = (selectedType: number) => {
    setDiabetesType(selectedType);
  };
  const handleValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("1번자식 함수", diabetestype);
    if (diabetestype) {
      setSurvey2Valid(true);
      onNext(e);
    } else {
      setSurvey2Valid(false);
    }
  };

  return (
    <div className={styles.SurveyContainer2}>
      <div className={styles.Survey_Page}>
        <div className={styles.Survey_box}>
          <div className={styles.Survey_title}>
            <div className={styles.title_text}>
              <strong>설문조사</strong>
              <p>당뇨유형 선택</p>
            </div>
          </div>
          <div className={styles.Survey_container}>
            <div className={styles.Survey2_box}>
              <p className={styles.Survey2_box_text}>
                진단받은 당뇨 유형을 선택해주세요.
              </p>
              <div className={styles.Survey2_box1}>
                <div
                  className={`${styles.Survey2_box1_text} ${
                    diabetestype === 1 ? styles.selected : ""
                  }`}
                  onClick={() => handleTypeSelect(1)}
                >
                  제 2형 당뇨병
                </div>
              </div>
              <div className={styles.Survey2_box_text}>
                <div>
                  현재 저희 서비스는&nbsp;<span>제 2형 당뇨병</span>&nbsp;식단만
                  제공합니다.
                  <br />
                  <div className={styles.Survey2_box_text_p}>
                    추후 서비스 업데이트 예정입니다. 양해부탁드립니다.
                  </div>
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
            disabled={!diabetestype}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey2;
