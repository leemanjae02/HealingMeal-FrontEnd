import { useState } from "react";
import "../styles/MainPage.less";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate();
  // const [loginCheck, setLoginCheck] = useState<boolean>(false);

  const clickLogin = () => {
    navigate("/login");
    // setLoginCheck(true);
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="Container">
      <header>
        <div className="header_Box">
          <p className="logo">Healing Meal</p>
          <div className="btn_Box">
            <button onClick={clickLogin}>로그인</button>
            <button onClick={clickSignup}>회원가입</button>
          </div>
        </div>
      </header>
      <div className="main_Container">
        <div className="infor_Container"></div>
      </div>
    </div>
  );
};

export default MainPage;
