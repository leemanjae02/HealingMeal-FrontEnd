import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Myinfor.module.less";
import MyInforComponents from "../components/MyInforComponents";
import FavoritesComponents from "../components/FavoritesComponents";
import MyInforChangeComponents from "../components/MyInforChange";
import CustomAxios from "../api/Axios";

const MyPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("mypage");
  const [myData, setMyData] = useState<{
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
  } | null>(null);

  const handleTabChange = (tab: any) => {
    setSelectedTab(tab);
    navigate(`/mypage/${tab}`);
  };
  const handleMyInfor = () => {
    setSelectedTab("");
    navigate("/mypage");
  };

  useEffect(() => {
    const UserID = window.sessionStorage.getItem("userID");
    const getMyData = async () => {
      try {
        const response = await CustomAxios.get(UserID + "/totalData", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setMyData({
            loginID: response.data.loginId,
            name: response.data.name,
            email: response.data.email,
            birthDate: response.data.birthDate,
            phoneNumber: response.data.phoneNumber,
            gender: response.data.gender,
            diabetesType: response.data.diabetesType,
            age: response.data.age,
            numberOfExercises: response.data.numberOfExercises,
            height: response.data.height,
            weight: response.data.weight,
            stewsAndHotpots: response.data.stewsAndHotpots,
            stewedFood: response.data.stewedFood,
            stirFriedFood: response.data.stirFriedFood,
            grilledFood: response.data.grilledFood,
            vegetableFood: response.data.vegetableFood,
            steamedFood: response.data.steamedFood,
            pancakeFood: response.data.pancakeFood,
            breadAndConfectionery: response.data.breadAndConfectionery,
            beveragesAndTeas: response.data.beveragesAndTeas,
            dairyProducts: response.data.dairyProducts,
          });

          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyData();
  }, []);

  return (
    <div className={styles.MyInforPage}>
      <header>
        <p className={styles.logo}>Healing Meal</p>
      </header>
      <div className={styles.MyInforContainer}>
        <div className={styles.MyInforContainer2}>
          <div className={styles.LeftContainer}>
            <div className={styles.MyInforBox}>
              <div className={styles.imageBox}>
                <div>
                  <img src="../../public/images/userLogo.png" />
                </div>
              </div>
              <div className={styles.nameBox}>
                <strong>{`${myData?.name || "000"}님`} </strong>&nbsp;환영합니다
              </div>
            </div>
            <div className={styles.listBox}>
              <div className={styles.listItem} onClick={handleMyInfor}>
                내 정보
              </div>
              <div
                className={styles.listItem}
                onClick={() => handleTabChange("change")}
              >
                내 정보 수정
              </div>
              <div
                className={styles.listItem}
                onClick={() => handleTabChange("favorites")}
              >
                즐겨찾기
              </div>
            </div>
          </div>
          <div className={styles.RightContainer}>
            <p className={styles.title}>내 정보</p>
            <div className={styles.Container2}>
              <div className={styles.MyInforBox}>
                <div className={styles.InforList}>
                  <div className={styles.titleText}>이름 </div>
                  <div className={styles.Text}>{myData?.name}</div>
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
        </div>
      </div>
    </div>
  );
};

export default MyPage;
