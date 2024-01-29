import styles from "../styles/Styles.module.less";

interface Survey2Props {
  setDiabetesType: (diabetestype: number) => void;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPast: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSurvey2Valid: (survey2Valid: boolean) => void;
  diabetestype: number;
}

const Survey5: React.FunctionComponent<Survey2Props> = ({
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
              <p>식단제외 음식 선택</p>
            </div>
          </div>
          <div className={styles.Survey5_Page}>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>{" "}
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>{" "}
            <div className={styles.Survey5_select_div}>
              <div className={styles.Survey5_select_foodName}>
                <p>찌개 및 전골류</p>
              </div>
              <div className={styles.Survey5_select_food}>
                <table>
                  <tbody>
                    <tr>
                      <td>김치찌개</td>
                      <td>된장찌개</td>
                      <td>부대찌개</td>
                    </tr>
                    <tr>
                      <td>버섯전골</td>
                      <td>샤브샤브</td>
                      <td>배고파</td>
                    </tr>
                  </tbody>
                </table>
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
    </div>
  );
};

export default Survey5;
