import styles from "../styles/Styles.module.less";
import CustomAxios from "../api/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarChartComponents from "./BarChart";
import AuthStore from "../stores/AuthStore";

const SurveyResult = () => {
  const [kcal, setKcal] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [carbohydrate, setCarbohydrate] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);

  const navigate = useNavigate();
  const ClickHome = () => {
    navigate("/");
  };
  useEffect(() => {
    const SurveyResult = async () => {
      try {
        const response = await CustomAxios.get(
          AuthStore.userID + "/surveyResult",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setKcal(response.data.kcal);
          setProtein(response.data.protein);
          setCarbohydrate(response.data.carbohydrate);
          setFat(response.data.fat);
        }
      } catch (error) {
        console.log(error);
      }
    };
    SurveyResult();
  }, []);

  return (
    <div className={styles.SurveyContainer2}>
      <div className={styles.Survey_Page}>
        <div className={styles.Survey_box}>
          <div className={styles.Survey_title}>
            <div className={styles.title_text}>
              <strong>분석결과</strong>
            </div>
          </div>
          <div className={styles.Survey_Result}>
            <div className={styles.SurveyResult_Chart}>
              <BarChartComponents
                protein={protein}
                kcal={kcal}
                carbohydrate={carbohydrate}
                fat={fat}
              />
            </div>
            <div className={styles.SurveyResult_infor}>
              <div className={styles.SurveyResult_box}>
                <div className={styles.SurveyResult_icon}>
                  <div className={styles.mini_icon}>
                    <img src="../../public/images/kcal-icon.png" />
                    <p className={styles.icon_name}>칼로리</p>
                    <p className={styles.icon_text}>{kcal}kcal</p>
                  </div>
                  <div className={styles.mini_icon}>
                    <img src="../../public/images/meat-icon.png" />
                    <p className={styles.icon_name}>단백질</p>
                    <p className={styles.icon_text}>{protein}g</p>
                  </div>
                  <div className={styles.mini_icon}>
                    <img src="../../public/images/bab-icon.png" />
                    <p className={styles.icon_name}>탄수화물</p>
                    <p className={styles.icon_text}>{carbohydrate}g</p>
                  </div>
                  <div className={styles.mini_icon}>
                    <img src="../../public/images/fat-icon.png" />
                    <p className={styles.icon_name}>지방</p>
                    <p className={styles.icon_text}>{fat}g</p>
                  </div>
                </div>
              </div>
              <div className={styles.SurveyResult_box2}>
                <p>
                  입력하신 정보로 분석결과가 생성되었습니다. <br />
                  <span>지금 바로 맞춤식단을 확인해보세요!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Survey_btn}>
          <button className={styles.Home_btn} onClick={ClickHome}>
            내 식단 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyResult;
