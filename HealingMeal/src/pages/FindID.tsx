import { useForm } from "../hooks/useForm.tsx";
import { useState } from "react";
import CustomAxios from "../api/Axios.tsx";
import "../styles/FindIdPage.less";
import "../index.css";
const FindIDPage = () => {
  const [name, onChangeName] = useForm();
  const [email, onChangeEmail] = useForm();
  const [answer, setAnswer] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const FindID = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setMessage("이름과 이메일을 다 입력해주세요.");
      return;
    } else {
      setMessage("");
    }
    try {
      const response = await CustomAxios.get("/user/search/id", {
        params: { name, email },
      });
      if (response.status === 200) {
        setAnswer(response.data);
      }
    } catch (error) {
      setMessage("이름과 이메일을 다시 확인하고 입력해주세요.");
      console.log(error);
    }
  };
  return (
    <div className="Container">
      <header>
        <p className="logo">
          <strong>Healing Meal</strong> 아이디 찾기
        </p>
      </header>

      <hr />
      <div className="Box">
        <div className="textbox">
          <strong>회원 정보에 등록한 이름과 이메일로 인증</strong>
          <span>
            회원정보에 등록한 이메일과 입력한 이메일이 같아야, 인증이
            가능합니다.
          </span>
          <form>
            <div className="InputBox">
              <div className="InforInput">
                <strong>이&nbsp;&nbsp;&nbsp;름</strong>
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
            </div>
            <div className="InputBox">
              <div className="InforInput">
                <strong>이메일</strong>
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
            </div>
          </form>
          <div className="FindId_message_box">
            {message && <p>•{message}</p>}
          </div>
          {answer && (
            <div className="answerBox">
              <div>{answer}</div>
            </div>
          )}
        </div>
        <button className="next-Btn" type="submit" onClick={FindID}>
          요청
        </button>
      </div>
      <footer className="FindId_footer">
        <p className="footer_text">Sungkonghoe University GDSC </p>
      </footer>
    </div>
  );
};

export default FindIDPage;
