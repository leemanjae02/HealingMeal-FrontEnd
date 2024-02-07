import React from "react";
import styles from "../styles/Myinfor.module.less";

interface MyInforProps {
  loginID: string;
  name: string;
  email: string;
  birthDate: number;
  phoneNumber: number;
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
  return (
    <div className={styles.RightContainer}>
      <p className={styles.title}>내 정보</p>
      <div className={styles.Container2}>
        <div className={styles.MyInforBox}>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름 </div>
            <div className={styles.Text}>{name}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>성별 </div>
            <div className={styles.Text}>{gender}</div>
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
          <div className={styles.InforList}>
            <div className={styles.titleText}>연령대 </div>
            <div className={styles.Text}>{age}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>당뇨유형</div>
            <div className={styles.Text}>{diabetesType}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>운동유형</div>
            <div className={styles.Text}>{numberOfExercises}</div>
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
            <div className={styles.Text}>{gender}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>찌개 밎 전골류 </div>
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
            <div className={styles.titleText}>빵 밎 과자류 </div>
            <div className={styles.Text}>{breadAndConfectionery}</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>음료 밎 차류 </div>
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
