import React, { useState } from "react";
import "../styles/LoginPage.less";

function LoginPage() {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [call, setCall] = useState("");
  //   const [country, setCountry] = useState("");
  const [medical, setMedical] = useState("");
  const medicalOptions = [
    { value: "none", label: "질병 선택" },
    { value: "diabetes", label: "당뇨병" },
    { value: "hypertension", label: "고혈압" },
    { value: "hyperlipidemia", label: "고지혈증" },
    { value: "obesity", label: "비만" },
    { value: "cancer", label: "암" },
  ];
  const onChangeMedical = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMedical(e.target.value);
    console.log(medical);
  };
  const onChangeID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
    console.log(id);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(e.target.value);
  };
  const onChangeCall = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCall(e.target.value);
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
                  onChange={onChangePassword}
                />
              </div>
            </div>
            <div className="LoginBox2">
              <div>
                <img src="../../public/images/person.svg" />
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <div>
                <img src="../../public/images/email.svg" />
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
              <div>
                <img src="../../public/images/badge.svg" />
                <input
                  type="number"
                  placeholder="생년월일 6자리"
                  value={birth}
                  onChange={onChangeBirth}
                />
              </div>
              <div className="gender">
                <button>남자</button>
                <button>여자</button>
                <button>선택안함</button>
              </div>
              <div className="medical">
                <img src="../../public/images/medical.svg" />
                <select onChange={onChangeMedical} value={medical}>
                  {medicalOptions.map((option) => (
                    <option key={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="country">
                <img src="../../public/images/country.svg" />
                <select></select>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="전화번호"
                  value={call}
                  onChange={onChangeCall}
                />
              </div>
            </div>
            <button type="submit" className="certification-btn">
              인증요청
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
