import { useEffect, useState } from "react";
import "../styles/MainPage.less";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../api/Axios";

const MainPage = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const isLogin = sessionStorage.getItem("Name") !== null;
    setLoginCheck(isLogin);
    setUserName(sessionStorage.getItem("Name"));
  }, []);
  const clickLogin = () => {
    navigate("/login");
  };

  const clicksurvey = () => {
    navigate("/survey");
  };

  const clickSignup = () => {
    navigate("/signup");
  };
  const logout = async (): Promise<void> => {
    try {
      const response = await CustomAxios.get("/user/logout");
      if (response.status === 200) {
        sessionStorage.removeItem("Name");
        setLoginCheck(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="MainPage_Container">
      <header>
        <p className="logo">Healing Meal</p>
        <div className="btn_Box">
          {loginCheck ? (
            <>
              <span className="user_name">{`${userName}님`}</span>
              <button onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={clickLogin}>로그인</button>
              <button onClick={clickSignup}>회원가입</button>
            </>
          )}
        </div>
      </header>
      <div className="main_Container">
        <div className="infor_Container">
          <div className="image_box">
            <img src="../../public/images/mainPageCover.jpg" />
            <div className="image_box_div">
              {loginCheck ? (
                <>
                  <button className="Main_img_btn" onClick={clicksurvey}>
                    나만의 식단찾기
                  </button>
                </>
              ) : (
                <button className="Main_img_btn" onClick={clickLogin}>
                  로그인
                </button>
              )}
            </div>
          </div>
          <div className="Meal_box"></div>
          <div className="kcal_box"></div>
        </div>
      </div>
      {/* <footer className="MainPage_footer">
        <p className="footer_text">Sungkonghoe University GDSC </p>
      </footer> */}
    </div>
  );
};

export default MainPage;
