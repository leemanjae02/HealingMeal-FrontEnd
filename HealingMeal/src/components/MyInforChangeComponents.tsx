import React from "react";
import styles from "../styles/Myinfor.module.less";

interface MyInforChangeProps {
  loginID: string;
}

const MyInforChangeComponents: React.FunctionComponent<MyInforChangeProps> = ({
  loginID,
}) => {
  return (
    <div className={styles.RightContainer}>
      <p className={styles.title}>내 정보 수정</p>
      <div className={styles.Container2}>
        <div className={styles.MyInforBox}>
          <p className={styles.InforTitle}>회원가입 정보</p>
          <div className={styles.InforList}>
            <div className={styles.titleText}>아이디: </div>
            <div className={styles.Text}>
              {loginID}
              <span>아이디는 수정이 불가합니다.</span>
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>
              <input type="text" placeholder="수정할 이름을 작성해주세요." />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>생년월일: </div>
            <div className={styles.Text}>
              <input
                type="text"
                placeholder="수정할 생년월일을 작성해주세요. 예시: 011225"
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>성별: </div>
            <div className={styles.Text}>
              <input
                type="checkbox"
                placeholder="수정할 성별을 작성해주세요."
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
        </div>
        <div className={styles.MySurveyBox}>
          <p className={styles.InforTitle}>설문조사 정보</p>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름: </div>
            <div className={styles.Text}>이만재</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInforChangeComponents;
