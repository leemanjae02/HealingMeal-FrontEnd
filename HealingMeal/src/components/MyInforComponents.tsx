import React, { useEffect } from "react";
import styles from "../styles/MyPage.module.less";
import { useState } from "react";

interface MyInforProps {
  loginID: string;
  name: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  gender: string;
  diabetesType: number;
  age: string;
  numberOfExercises: number;
  height: number;
  weight: number;
  stewsAndHotpots: string;
  stewedFood: string;
  stirFriedFood: string;
  grilledFood: string;
  vegetableFood: string;
  steamedFood: string;
  pancakeFood: string;
  breadAndConfectionery: string;
  beveragesAndTeas: string;
  dairyProducts: string;
}
const MyInforComponents: React.FunctionComponent<MyInforProps> = ({
  loginID,
  name,
  email,
  birthDate,
  phoneNumber,
  gender,
  diabetesType,
  age,
  numberOfExercises,
  height,
  weight,
  stewsAndHotpots,
  stewedFood,
  stirFriedFood,
  grilledFood,
  vegetableFood,
  steamedFood,
  pancakeFood,
  breadAndConfectionery,
  beveragesAndTeas,
  dairyProducts,
}) => {
  const [genderChange, setGenderChange] = useState<string>("");
  const [diabetesTypeChange, setDiabetesTypeChange] = useState<string>("");
  const [numberOfExercisesChange, setNumberOfExercisesChange] =
    useState<string>("");
  useEffect(() => {
    const changeInfor = () => {
      const chageGender = () => {
        if (gender === "MALE") {
          setGenderChange("남자");
        } else if (gender === "FEMALE") {
          setGenderChange("여자");
        } else {
          setGenderChange("");
        }
      };
      const changeDiabetesType = () => {
        if (diabetesType === 1) {
          setDiabetesTypeChange("제 2형 당뇨병");
        }
      };
      const changeExerciseType = () => {
        if (numberOfExercises === 1) {
          setNumberOfExercisesChange("주 0~2회");
        } else if (numberOfExercises === 2) {
          setNumberOfExercisesChange("주 3~4회");
        } else if (numberOfExercises === 3) {
          setNumberOfExercisesChange("주 5~7회");
        } else {
          setNumberOfExercisesChange("");
        }
      };
      chageGender();
      changeDiabetesType();
      changeExerciseType();
    };

    changeInfor();
  }, [gender, diabetesType, numberOfExercises]);

  return (
    <div className={styles.RightContainer}>
      <p className={styles.title}>내 정보</p>
      <div className={styles.Container2}>
        <div className={styles.MyInforBox}>
          <p className={styles.InforTitle}>회원가입 정보</p>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름 </div>
            <div className={styles.Text}>{name}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>성별 </div>
            <div className={styles.Text}>{genderChange}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>생년월일 </div>
            <div className={styles.Text}>{birthDate}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>전화번호 </div>
            <div className={styles.Text}>{phoneNumber}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>아이디 </div>
            <div className={styles.Text}>{loginID}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이메일 </div>
            <div className={styles.Text}>{email}</div>
          </div>
        </div>
        <div className={styles.MySurveyBox}>
          <p className={styles.InforTitle}>설문조사 정보</p>
          <div className={styles.InforList}>
            <div className={styles.titleText}>연령대 </div>
            <div className={styles.Text}>{age}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>당뇨유형</div>
            <div className={styles.Text}>{diabetesTypeChange}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>운동유형</div>
            <div className={styles.Text}>{numberOfExercisesChange}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>키 </div>
            <div className={styles.Text}>{height}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>체중 </div>
            <div className={styles.Text}>{weight}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>성별 </div>
            <div className={styles.Text}>{genderChange}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>찌개류 </div>
            <div className={styles.Text}>{stewsAndHotpots}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>조림류 </div>
            <div className={styles.Text}>{stewedFood}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>볶음류 </div>
            <div className={styles.Text}>{stirFriedFood}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>구이류 </div>
            <div className={styles.Text}>{grilledFood}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>나물류 </div>
            <div className={styles.Text}>{vegetableFood}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>찜류 </div>
            <div className={styles.Text}>{steamedFood}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>부침류 </div>
            <div className={styles.Text}>{pancakeFood}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>제과류 </div>
            <div className={styles.Text}>{breadAndConfectionery}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>음료류 </div>
            <div className={styles.Text}>{beveragesAndTeas}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>유제품류 </div>
            <div className={styles.Text}>{dairyProducts}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInforComponents;
