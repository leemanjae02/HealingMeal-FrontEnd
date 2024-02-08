import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Myinfor.module.less";
import MyInforComponents from "../components/MyInforComponents";
import FavoritesComponents from "../components/FavoritesComponents";
import MyInforChangeComponents from "../components/MyInforChangeComponents";
import CustomAxios from "../api/Axios";
import PasswordCheckModal from "../components/PasswordCheckModal";
import AuthStore from "../stores/AuthStore";

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = AuthStore;
  const [selectedTab, setSelectedTab] = useState("mypage");
  const [passwordCheckModal, setPasswordCheckModal] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [checkPasswordMSG, setCheckPasswordMSG] = useState<string>("");
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
    if (tab === "change") {
      setPasswordCheckModal(true);
    }
  };
  useEffect(() => {
    const getPassword = async () => {
      try {
        const response = await CustomAxios.post(
          AuthStore.userID + "/check/password",
          {
            password: checkPassword,
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("비밀번호 확인 완료", response.data);
          openMyInfoChange();
        }
      } catch (error) {
        console.log(error);
        setCheckPasswordMSG("비밀번호를 다시 확인해주세요.");
      }
    };

    const timeoutId = setTimeout(() => {
      if (selectedTab === "change") {
        getPassword();
      }
    }, 1000); //1초 딜레이
    return () => clearTimeout(timeoutId);
  }, [checkPassword, selectedTab]);
  const openMyInfoChange = () => {
    setPasswordCheckModal(false);
  };

  const closePasswordCheckModal = () => {
    setPasswordCheckModal(false);
  };

  const handleMyInfor = () => {
    setSelectedTab("");
    navigate("/mypage");
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/mypage/change")) {
      setSelectedTab("change");
    } else if (path.includes("/mypage/favorites")) {
      setSelectedTab("favorites");
    } else {
      setSelectedTab("");
    }

    const getMyData = async () => {
      try {
        const response = await CustomAxios.get(
          AuthStore.userID + "/totalData",
          {
            withCredentials: true,
          }
        );
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
  const clickHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.MyInforPage}>
      {/* <header>
        <p className={styles.logo} onClick={clickHome}>
          Healing Meal
        </p>
      </header> */}
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
                <strong>{`${userName || "000"}님`} </strong>
                &nbsp;환영합니다
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
            <div className={styles.listBox2}>1</div>
          </div>

          {selectedTab === "change" && (
            <>
              {passwordCheckModal ? (
                <PasswordCheckModal
                  setCheckPassword={setCheckPassword}
                  checkPasswordMSG={checkPasswordMSG}
                  onClose={closePasswordCheckModal}
                />
              ) : (
                <MyInforChangeComponents />
              )}
            </>
          )}
          {selectedTab === "favorites" && <FavoritesComponents />}
          {selectedTab !== "change" && selectedTab !== "favorites" && (
            <MyInforComponents
              loginID={myData?.loginID || ""}
              name={myData?.name || ""}
              email={myData?.email || ""}
              birthDate={myData?.birthDate || 0}
              phoneNumber={myData?.phoneNumber || 0}
              gender={myData?.gender || ""}
              diabetesType={myData?.diabetesType || 0}
              age={myData?.age || ""}
              numberOfExercises={myData?.numberOfExercises || 0}
              height={myData?.height || 0}
              weight={myData?.weight || 0}
              stewsAndHotpots={myData?.stewsAndHotpots || ""}
              stewedFood={myData?.stewedFood || ""}
              stirFriedFood={myData?.stirFriedFood || ""}
              grilledFood={myData?.grilledFood || ""}
              vegetableFood={myData?.vegetableFood || ""}
              steamedFood={myData?.steamedFood || ""}
              pancakeFood={myData?.pancakeFood || ""}
              breadAndConfectionery={myData?.breadAndConfectionery || ""}
              beveragesAndTeas={myData?.beveragesAndTeas || ""}
              dairyProducts={myData?.dairyProducts || ""}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default MyPage;
