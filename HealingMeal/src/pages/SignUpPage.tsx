import React, { useState } from "react";
import "../styles/SignUpPage.less";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../api/Axios.tsx";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [gender, setgender] = useState<string | null>(null);
  const [call, setCall] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<string>("");
  const [showcertification, setShowcertification] = useState(false);
  const [join, setJoin] = useState<boolean>(false);
  const [idcheck, setIdCheck] = useState<boolean>(false);

  const [idMessage, setIDMessage] = useState<string>(""); // 유효성 검사 메시지
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [mailMessage, setMailMessage] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [birthMessage, setBirthMessage] = useState<string>("");
  const [genderMessage, setGenderMessage] = useState<string>("");
  const [callMessage, setCallMessage] = useState<string>("");
  const [emailCheckMessage, setEmailCheckMessage] = useState<string>("");
  const [idcheckMessage, setIdCheckMessage] = useState<string>("");

  const [isid, setIsid] = useState<boolean>(false); //is가 붙은 변수들은 유효성 검사 상태 확인
  const [ispassword, setIspassword] = useState<boolean>(false);
  const [isemail, setIsemail] = useState<boolean>(false);
  const [isname, setIsname] = useState<boolean>(false);
  const [isbirth, setIsbirth] = useState<boolean>(false);
  const [iscall, setIscall] = useState<boolean>(false);
  const [iscertification, setIscertification] = useState<boolean>(false);

  const checkInput = (): boolean => {
    if (!id.trim()) {
      setIDMessage("아이디: 필수 정보입니다.");
    }

    if (!password.trim()) {
      setPasswordMessage("비밀번호: 필수 정보입니다.");
    }

    if (!email.trim()) {
      setMailMessage("이메일: 필수 정보입니다.");
    }

    if (!name.trim()) {
      setNameMessage("이름: 필수 정보입니다.");
    }

    if (!birth.trim()) {
      setBirthMessage("생년월일: 필수 정보입니다.");
    }

    if (!call.trim()) {
      setCallMessage("전화번호: 필수 정보입니다.");
    }

    if (!gender) {
      setGenderMessage("성별: 필수 정보입니다.");
    }
    if (!idcheck) {
      setIdCheckMessage("중복확인이 필요합니다.");
    }

    if (
      !isid ||
      !ispassword ||
      !isemail ||
      !isbirth ||
      !iscall ||
      !gender ||
      !idcheck
    ) {
      return false;
    }

    return true;
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkInput()) {
      setShowcertification(true);
      setJoin(true);
      if (!iscertification) {
        setEmailCheckMessage("이메일 인증을 완료해주세요.");
        return;
      }
      try {
        const response = await CustomAxios.post(
          "/user/join",
          {
            loginId: id,
            password: password,
            name: name,
            email: email,
            gender: gender,
            birthDate: birth,
            phoneNumber: call,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
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
    const selectedGenderText = e.currentTarget.innerText;
    let selectedGender = "";
    if (selectedGenderText === "남자") {
      selectedGender = "MALE";
    } else if (selectedGenderText === "여자") {
      selectedGender = "FEMALE";
    }
    setgender(selectedGender);
    if (selectedGender != null) {
      setGenderMessage("");
    }
  };

  const [certification, setCertification] = useState<string>("");
  const checkEmail = async () => {
    try {
      if (iscertification) {
        return;
      }
      const response = await CustomAxios.post(
        "/api/email-check",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("확인", response.data);
      setCertification(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handeleEmailCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCheck(e.target.value.trim());

    if (certification === e.target.value && certification !== "") {
      setIscertification(true);
      setEmailCheckMessage("인증번호가 일치합니다.");
    } else {
      setEmailCheckMessage("인증번호가 일치하지 않습니다.");
      setIscertification(false);
    }
  };

  const onClickRerequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    checkEmail();
    console.log("재요청");
  };
  const handleIdcheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (id === "") {
        return;
      }
      const response = await CustomAxios.post("/user/join/id", {
        loginId: id,
      });
      if (response.status === 200) {
        setIdCheck(true);
        setIdCheckMessage("사용가능한 아이디입니다!");
      }
    } catch (error) {
      setIdCheck(false);
      setIdCheckMessage("중복된 아이디입니다.");
    } finally {
      setTimeout(() => {
        setIdCheckMessage("");
      }, 3000);
    }
  };

  return (
    <div className="SignupPage_Container">
      <header>
        <p className="logo">Healing Meal</p>
      </header>
      <div className="SingupPage">
        <div className="SingupBox1">
          <p>Healing Meal</p>
          <form>
            <div className="box">
              <div className="idbox">
                <img src="/images/person.svg" />
                <input
                  type="text"
                  placeholder="아이디"
                  value={id}
                  onChange={onChangeID}
                />
                <button
                  id="idCheckBtn"
                  className={`IDcheck ${idcheck && isid ? "disabled" : ""}`}
                  type="submit"
                  onClick={handleIdcheck}
                >
                  중복확인
                </button>
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
              {idcheckMessage && (
                <li style={{ color: idcheck ? "green" : "red" }}>
                  •{idcheckMessage}
                </li>
              )}
              {idMessage && <li>•{idMessage}</li>}
              {passwordMessage && <li>•{passwordMessage}</li>}
            </ul>
            <div className="SingupBox2">
              <div>
                <img src="/images/person.svg" />
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <div>
                <img src="/images/phone.svg" />
                <input
                  type="tel"
                  placeholder="전화번호"
                  value={call}
                  onChange={onChangeCall}
                />
              </div>
              <div>
                <img src="/images/badge.svg" />
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
                  className={gender === "MALE" ? "selected" : ""}
                >
                  남자
                </button>
                <button
                  type="button"
                  onClick={onClickGender}
                  className={gender === "FEMALE" ? "selected" : ""}
                >
                  여자
                </button>
              </div>
              <div>
                <img src="/images/email.svg" />
                <input
                  type="email"
                  placeholder="이메일 @gmail.com"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
            </div>
            <ul className="messagebox">
              {nameMessage && <li>•{nameMessage}</li>}
              {callMessage && <li>•{callMessage}</li>}
              {birthMessage && <li>•{birthMessage}</li>}
              {genderMessage && <li>•{genderMessage}</li>}
              {mailMessage && <li>•{mailMessage}</li>}
            </ul>
            {showcertification && (
              <div className="showbox">
                <input
                  type="text"
                  placeholder="인증번호"
                  value={emailCheck}
                  onChange={handeleEmailCheckChange}
                />
                <button
                  className="Re-request-btn"
                  type="submit"
                  onClick={onClickRerequest}
                >
                  재요청
                </button>
              </div>
            )}
            <ul>
              {emailCheckMessage && (
                <li>
                  •{emailCheckMessage}
                  <br />
                  <span>•이메일로 인증번호가 발송됐어요.</span>
                </li>
              )}
            </ul>

            <button
              type="submit"
              className="certification-btn"
              onClick={(e) => {
                e.preventDefault();
                if (!checkInput()) {
                  return;
                }
                checkEmail();
                signup(e);
              }}
            >
              {join ? "가입하기" : "인증요청"}
            </button>
          </form>
        </div>
      </div>
      <footer className="Signup_footer">
        <p className="footer_text">Sungkonghoe University GDSC </p>
      </footer>
    </div>
  );
};

export default SignUpPage;
