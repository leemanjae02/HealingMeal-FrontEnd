import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/LoginPage.less";
import CustomAxios from "../api/Axios.tsx";
import "../index.css";
const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [idMessage, setIDMessage] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [isid, setIsid] = useState<boolean>(false);
  const [ispassword, setIspassword] = useState<boolean>(false);
  const formData = new FormData();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isid && ispassword) {
      try {
        formData.append("loginId", id);
        formData.append("password", password);

        const response = await CustomAxios.post("/user/login", formData);

        if (response.status === 200) {
          navigate("/");
          console.log("로그인 성공!");
        }
      } catch (error) {
        console.log(error);
        setLoginMessage("아이디 또는 비밀번호를 잘못 입력했습니다.");
      }
    } else {
      if (!isid) setIDMessage("아이디를 입력해주세요.");
      if (!ispassword) setPasswordMessage("비밀번호를 입력해주세요.");
    }
  };

  const onChangeID = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setID(e.target.value);
    if (e.target.value === "") {
      setIDMessage("아이디: 필수 정보입니다.");
      setIsid(false);
    } else {
      setIDMessage("");
      setIsid(true);
    }
  };

  const onChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordMessage("비밀번호: 필수 정보입니다.");
      setIspassword(false);
    } else {
      setPasswordMessage("");
      setIspassword(true);
    }
  };

  return (
    <div className="LoginPage_Container">
      <header>
        <p className="logo">Healing Meal</p>
        <div className="Link_Box">
          <div>
            <Link to="/findid">아이디 찾기</Link>
          </div>
          <div>
            <Link to="/findPw">비밀번호 찾기</Link>
          </div>
          <div>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </header>

      <div className="LoginPage">
        <div className="Page1">
          <div className="LoginBox1">
            <p>Healing Meal</p>
            <form>
              <div className="LoginBox2">
                <div className="idbox">
                  <img src="/images/person.svg" />
                  <input
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={onChangeID}
                  />
                </div>
                <div>
                  <img src="/images/lock.svg" />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onChangePW}
                  />
                </div>
              </div>
              <ul className="messagebox">
                {idMessage && <li>•{idMessage}</li>}
                {passwordMessage && <li>•{passwordMessage}</li>}
                {loginMessage && <li>•{loginMessage}</li>}
              </ul>
              <button
                type="submit"
                className="certification-btn"
                onClick={login}
              >
                로그인
              </button>
              <div className="linkbox"></div>
            </form>
          </div>
        </div>
        <div className="Page2">
          <p className="Page2_textBox">
            <strong>
              FIND YOUR
              <br />
              PERSONALIZED
              <br />
              DIABETES MEAL PLAN
            </strong>
          </p>
        </div>
      </div>
      <footer className="login_footer">
        <p className="footer_text">Sungkonghoe University GDSC </p>
      </footer>
    </div>
  );
};

export default LoginPage;
