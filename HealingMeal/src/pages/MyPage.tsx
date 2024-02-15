import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Myinfor.module.less";
import MyInforComponents from "../components/MyInforComponents.tsx";
import FavoritesComponents from "../components/FavoritesComponents.tsx";
import MyInforChangeComponents from "../components/MyInforChangeComponents.tsx";
import CustomAxios from "../api/Axios.tsx";
import PasswordCheckModal from "../components/PasswordCheckModal.tsx";
import AuthStore from "../stores/AuthStore.ts";
import { observer } from "mobx-react";

const MyPage = observer(() => {
  const navigate = useNavigate();
  const { isLoggedIn, userName } = AuthStore;
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("mypage");
  const [passwordCheckModal, setPasswordCheckModal] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [checkPasswordMSG, setCheckPasswordMSG] = useState<string>("");
  const [myData, setMyData] = useState<{
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
  } | null>(null);

  useEffect(() => {
    const loginCheck = async () => {
      try {
        await AuthStore.checkLoginStatus();
        if (AuthStore.isLoggedIn) {
          console.log(
            AuthStore.isLoggedIn,
            AuthStore.userID,
            AuthStore.userName
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    loginCheck();
  }, [AuthStore.isLoggedIn]);

  useEffect(() => {});

  const handleTabChange = (tab: any) => {
    setSelectedTab(tab);
    navigate(`/mypage/${tab}`);
    if (tab === "change") {
      setPasswordCheckModal(true);
      window.sessionStorage.setItem("passwordCheckModal", JSON.stringify(true));
    }
  };

  console.log(selectedTab);

  useEffect(() => {
    const savePasswordCheckModal =
      window.sessionStorage.getItem("passwordCheckModal");
    if (savePasswordCheckModal) {
      setPasswordCheckModal(JSON.parse(savePasswordCheckModal));
    }
  }, []);

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

  const openMyInfoChange = () => {
    setPasswordCheckModal(false);
    window.sessionStorage.removeItem("passwordCheckModal");
  };

  const closePasswordCheckModal = () => {
    setPasswordCheckModal(false);
    window.sessionStorage.removeItem("passwordCheckModal");
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
        if (AuthStore.userID) {
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyData();
  }, [AuthStore.userID]);
  const clickHome = () => {
    navigate("/");
  };
  const logout = async (): Promise<void> => {
    try {
      await AuthStore.logout();
      navigate("/login");
    } catch (error) {
      console.log("마이페이지 로그아웃 호출 에러", error);
    }
  };
  return (
    <div className={styles.MyInforPage}>
      <div className={styles.MyInforContainer}>
        <div className={styles.MyInforContainer2}>
          <div className={styles.LeftContainer}>
            <div className={styles.header_logo}>
              <p onClick={clickHome}>Healing Meal</p>
            </div>
            <div className={styles.LeftContainer2}>
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
                <div
                  className={`${styles.listItem} ${
                    selectedTab === "" ? styles.selected : ""
                  }`}
                  onClick={handleMyInfor}
                >
                  내정보
                </div>
                <div
                  className={`${styles.listItem} ${
                    selectedTab === "change" ? styles.selected : ""
                  }`}
                  onClick={() => handleTabChange("change")}
                >
                  내정보수정
                </div>
                <div
                  className={`${styles.listItem} ${
                    selectedTab === "favorites" ? styles.selected : ""
                  }`}
                  onClick={() => handleTabChange("favorites")}
                >
                  즐겨찾기
                </div>
              </div>
              <div className={styles.listBox2}>
                <div className={styles.listItem2}>
                  오직 나를 위한 당뇨 맞춤식단
                </div>
                <div className={styles.listItem2}>
                  <div className={styles.listItem2_footer}>
                    <div>
                      {isLoggedIn ? ( // 사용자한테는 로그인 상태 체크 후 동적으로 버튼이 바뀌는게 보여지지 않음
                        <div>
                          <button onClick={logout}>로그아웃</button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => navigate("/login")}>
                            로그인
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedTab === "change" && (
            <>
              {passwordCheckModal ? (
                <PasswordCheckModal
                  setCheckPassword={setCheckPassword}
                  checkPasswordMSG={checkPasswordMSG}
                  getPassword={getPassword}
                  onClose={closePasswordCheckModal}
                />
              ) : (
                <MyInforChangeComponents loginID={myData?.loginID || ""} />
              )}
            </>
          )}
          {selectedTab === "favorites" && <FavoritesComponents />}
          {selectedTab !== "change" && selectedTab !== "favorites" && (
            <MyInforComponents
              loginID={myData?.loginID || ""}
              name={myData?.name || ""}
              email={myData?.email || ""}
              birthDate={myData?.birthDate || ""}
              phoneNumber={myData?.phoneNumber || ""}
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
});
export default MyPage;
