import styles from "../styles/Styles.module.less";

interface Survey1Props {
  setAge: (age: string) => void;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSurvey1Valid: (survey1Valid: boolean) => void;
  age: string;
}

const Survey1: React.FunctionComponent<Survey1Props> = ({
  setAge,
  onNext,
  setSurvey1Valid,
  age,
}) => {
  const handleAgeSelect = (age: string) => {
    setAge(age);
  };

  console.log("1번 자식", age);
  const handleValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("1번자식 함수", age);
    if (age) {
      setSurvey1Valid(true);
      onNext(e);
    } else {
      setSurvey1Valid(false);
    }
  };
  return (
    <div className={styles.SurveyContainer2}>
      <div className={styles.Survey_Page}>
        <div className={styles.Survey_box}>
          <div className={styles.Survey_title}>
            <div className={styles.title_text}>
              <strong>설문조사</strong>
              <p>연령대 선택</p>
            </div>
          </div>
          <div className={styles.Survey_container}>
            <div className={styles.Survey_btn_box2}>
              <div className={styles.age_btn1}>
                <div
                  className={`${styles.age_box} ${
                    age === "18~29" ? styles.selected : ""
                  }`}
                  onClick={() => handleAgeSelect("18~29")}
                >
                  <div className={styles.btn_img}>
                    <img src="../../public/images/18.png" />
                  </div>
                  <div className={styles.btn}>
                    <div className={styles.age_btn}>18~29</div>
                  </div>
                </div>

                <div
                  className={`${styles.age_box} ${
                    age === "30~39" ? styles.selected : ""
                  }`}
                  onClick={() => handleAgeSelect("30~39")}
                >
                  <div className={styles.btn_img}>
                    <img src="../../public/images/30.png" />
                  </div>
                  <div className={styles.btn}>
                    <div className={styles.age_btn}>30~39</div>
                  </div>
                </div>
              </div>
              <div className={styles.age_btn1}>
                <div
                  className={`${styles.age_box} ${
                    age === "40~49" ? styles.selected : ""
                  }`}
                  onClick={() => handleAgeSelect("40~49")}
                >
                  <div className={styles.btn_img}>
                    <img src="../../public/images/40.png" />
                  </div>
                  <div className={styles.btn}>
                    <div className={styles.age_btn}>40~49</div>
                  </div>
                </div>
                <div
                  className={`${styles.age_box} ${
                    age === "50~" ? styles.selected : ""
                  }`}
                  onClick={() => handleAgeSelect("50~")}
                >
                  <div className={styles.btn_img}>
                    <img src="../../public/images/50.png" />
                  </div>
                  <div className={styles.btn}>
                    <div className={styles.age_btn}>50~</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Survey_btn}>
          <button
            onClick={(e) => handleValidation(e)}
            className={styles.Next_btn}
            disabled={!age}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey1;
