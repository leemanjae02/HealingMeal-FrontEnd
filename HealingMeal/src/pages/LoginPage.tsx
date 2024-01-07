import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/LoginPage.less";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [idMessage, setIDMessage] = useState<string>("");

  const [isid, setIsid] = useState<boolean>(false);
  const [ispassword, setIspassword] = useState<boolean>(false);
  const [loginMsg, setLoginMsg] = useState<string>("");
  const formData = new FormData();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isid && ispassword) {
      try {
        formData.append("loginId", id);
        formData.append("password", password);

        const response = await axios.post(
          "http://localhost:8080/user/login",
          formData
        );
        if (response.status === 200) {
          navigate("/main");
          console.log("로그인 성공!");
        }
      } catch (error) {
        console.log(error);
        setLoginMsg("아이디 또는 비밀번호를 잘못 입력했습니다.");
      }
    } else {
      setIDMessage("아이디를 입력해주세요.");
      setPasswordMessage("비밀번호를 입력해주세요.");
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
    <div className="Container">
      <header></header>
      <div className="LoginPage">
        <div className="LoginBox1">
          <p>Healing Meal</p>
          <form>
            <div className="box">
              <div className="idbox">
                <img src="../../public/images/person.svg" />
                <input
                  type="text"
                  placeholder="아이디"
                  value={id}
                  onChange={onChangeID}
                />
              </div>
              <div>
                <img src="../../public/images/lock.svg" />
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
              {loginMsg && <li>•{loginMsg}</li>}
            </ul>
            <button type="submit" className="certification-btn" onClick={login}>
              로그인
            </button>
            <p>
              계정이 없으신가요? <Link to="/signup">회원가입</Link> 하러 가기
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
