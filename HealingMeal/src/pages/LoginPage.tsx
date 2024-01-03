import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginPage.less";

const LoginPage = () => {
  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [idMessage, setIDMessage] = useState<string>("");

  const [isid, setIsid] = useState<boolean>(false);
  const [ispassword, setIspassword] = useState<boolean>(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (isid && ispassword) {
      // 로그인 로직을 여기에 추가
      console.log("로그인 성공!");
    } else {
      if (!isid) setIDMessage("아이디: 필수 정보입니다.");
      if (!ispassword) setPasswordMessage("비밀번호: 필수 정보입니다.");
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
