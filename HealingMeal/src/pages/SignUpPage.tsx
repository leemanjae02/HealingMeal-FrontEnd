import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.less";
// import { useForm } from "../hooks/useForm";

const SignUpPage = () => {
  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [gender, setgender] = useState<string | null>(null);
  const [call, setCall] = useState<string>("");
  const [certification, setCertification] = useState<string>("");
  const [showcertification, setShowcertification] = useState(false);
  const [join, setJoin] = useState<boolean>(false);

  const [idMessage, setIDMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [mailMessage, setMailMessage] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [birthMessage, setBirthMessage] = useState<string>("");
  const [genderMessage, setGenderMessage] = useState<string>("");
  const [callMessage, setCallMessage] = useState<string>("");
  const [certificationMessage, setCertificationMessage] = useState<string>("");

  const [isid, setIsid] = useState<boolean>(false);
  const [ispassword, setIspassword] = useState<boolean>(false);
  const [isemail, setIsemail] = useState<boolean>(false);
  const [isname, setIsname] = useState<boolean>(false);
  const [isbirth, setIsbirth] = useState<boolean>(false);
  const [iscall, setIscall] = useState<boolean>(false);
  const [iscertification, setIscertification] = useState<boolean>(false);

  const signup = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      isid &&
      ispassword &&
      isemail &&
      isname &&
      isbirth &&
      iscall &&
      gender
    ) {
      //회원가입
      setShowcertification(true);
      setJoin(true);
      if (certification === "") {
        setCertificationMessage("인증이 필요합니다.");
      } else {
        console.log("회원가입 성공!");

        //인증번호 확인 로직 추가
      }
    } else {
      if (!isid) setIDMessage("아이디: 필수 정보입니다.");
      if (!ispassword) setPasswordMessage("비밀번호: 필수 정보입니다.");
      if (!isemail) setMailMessage("이메일: 필수 정보입니다.");
      if (!isname) setNameMessage("이름: 필수 정보입니다.");
      if (!iscall) setCallMessage("전화번호: 필수 정보입니다.");
      if (!isbirth) setBirthMessage("생년월일: 필수 정보입니다.");
      if (!gender) setGenderMessage("성별: 필수 정보입니다.");
    }
  };

  const onChangeID = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idRule = /^(?=.*[A-Za-z].*[A-Za-z])[A-Za-z\d]{6,}$/;
    e.preventDefault();
    setID(e.target.value);
    if (e.target.value === "") {
      setIDMessage("아이디: 필수 정보입니다.");
      setIsid(false);
    } else if (!idRule.test(e.target.value)) {
      setIDMessage("아이디는 6자 이상 영문이어야 합니다.");
      setIsid(false);
    } else {
      setIDMessage("");
      setIsid(true);
    }
  };

  const onChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRule =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 8자 이상, 대문자, 소문자, 숫자, 특수문자 한 개 이상포함
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordMessage("비밀번호: 필수 정보입니다.");
      setIspassword(false);
    } else if (!passwordRule.test(e.target.value)) {
      setPasswordMessage(
        "비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자 한 개 이상 포함해야 합니다."
      );
      setIspassword(false);
    } else {
      setPasswordMessage("");
      setIspassword(true);
    }
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameMessage("이름: 필수 정보입니다.");
      setIsname(false);
    } else {
      setNameMessage("");
      setIsname(true);
    }
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = e.target.value;
    const domain = email.split("@")[1];
    setEmail(e.target.value);
    if (e.target.value === "") {
      setMailMessage("이메일: 필수 정보입니다.");
      setIsemail(false);
    } else if (!emailRule.test(email)) {
      setMailMessage("이메일 형식이 유효하지 않습니다.");
      setIsemail(false);
    } else if (domain !== "gmail.com") {
      setMailMessage("현재 서비스에 가입 가능한 이메일은 gmail입니다.");
      setIsemail(false);
    } else {
      setMailMessage("");
      setIsemail(true);
    }
  };
  const onChangeCall = (e: React.ChangeEvent<HTMLInputElement>) => {
    const callRule = /^010[0-9]{8}$/;
    const call = e.target.value.replace(/-/g, "");
    setCall(e.target.value);
    if (e.target.value === "") {
      setCallMessage("휴대전화번호: 필수 정보입니다.");
      setIscall(false);
    } else if (!callRule.test(call)) {
      setCallMessage("휴대전화 번호를 다시 확인해주세요.");
      setIscall(false);
    } else {
      setCallMessage("");
      setIscall(true);
    }
  };
  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthRule =
      /^(?:[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1])){0,1}[0-9]{6}$/;
    const birth = e.target.value;
    setBirth(e.target.value);
    if (e.target.value === "") {
      setBirthMessage("생년월일: 필수 정보입니다.");
      setIsbirth(false);
    } else if (!birthRule.test(birth)) {
      setBirthMessage("생년월일을 다시 확인해주세요.");
      setIsbirth(false);
    } else {
      setBirthMessage("");
      setIsbirth(true);
    }
  };

  const onClickGender: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const selectedGender = e.currentTarget.innerText;
    setgender(selectedGender);
    if (selectedGender != null) {
      setGenderMessage("");
    }

    console.log(selectedGender);
  };

  const onChangeCertification = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertification(e.target.value);
    if (e.target.value === "") {
      setCertificationMessage("인증이 필요합니다.");
      setIscertification(false);
    } else {
      setCertificationMessage("");
      setIscertification(true);
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
                  placeholder="이메일 @gmail.com"
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
                <button
                  type="button"
                  onClick={onClickGender}
                  className={gender === "남자" ? "selected" : ""}
                >
                  남자
                </button>
                <button
                  type="button"
                  onClick={onClickGender}
                  className={gender === "여자" ? "selected" : ""}
                >
                  여자
                </button>
                <button
                  type="button"
                  onClick={onClickGender}
                  className={gender === "선택안함" ? "selected" : ""}
                >
                  선택안함
                </button>
              </div>
              <div>
                <img src="../../public/images/phone.svg" />
                <input
                  type="tel"
                  placeholder="전화번호"
                  value={call}
                  onChange={onChangeCall}
                />
              </div>
            </div>
            <ul className="messagebox">
              {nameMessage && <li>•{nameMessage}</li>}
              {mailMessage && <li>•{mailMessage}</li>}
              {birthMessage && <li>•{birthMessage}</li>}
              {genderMessage && <li>•{genderMessage}</li>}
              {callMessage && <li>•{callMessage}</li>}
            </ul>
            {showcertification && (
              <div>
                <input
                  type="text"
                  placeholder="인증번호"
                  value={certification}
                  onChange={onChangeCertification}
                />
              </div>
            )}
            <ul>{certificationMessage && <li>•{certificationMessage}</li>}</ul>

            <button
              type="submit"
              className="certification-btn"
              onClick={join ? signup : signup}
            >
              {join ? "가입하기" : "인증요청"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
