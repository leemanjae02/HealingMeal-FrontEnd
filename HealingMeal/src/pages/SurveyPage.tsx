import React, { useState } from "react";
import "../styles/SurveyPage.less";
import Survey1 from "../components/Survey1";
import Survey2 from "../components/Survey2";
import Survey3 from "../components/Survey3";
import Survey4 from "../components/Survey4";
import Survey5 from "../components/Survey5";
import SurveyResult from "../components/SurveyResult";
const SurveyPage = () => {
  const [age, setAge] = useState<string>("");
  const [diabetestype, setDiabetesType] = useState<number>(0);
  const [exerciseType, setExerciseType] = useState<number>(0);
  const [Kcal, setKcal] = useState<number>(0);
  const [ChangePage, setChangePage] = useState<number>(1);

  const [survey1Valid, setSurvey1Valid] = useState<boolean>(false);
  const [survey2Valid, setSurvey2Valid] = useState<boolean>(false);
  const [survey3Valid, setSurvey3Valid] = useState<boolean>(false);
  const [survey4Valid, setSurvey4Valid] = useState<boolean>(false);
  const [survey4ContinueiValid, setSurvey4ContinueValid] =
    useState<boolean>(false);

  console.log("당뇨유형", diabetestype);
  console.log("부모 1번 설문조사 유효성", survey1Valid);
  console.log("부모 1번 설문조사 응답값", age);
  console.log(Kcal);
  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChangePage((Next) => Next + 1);
  };

  const handlePastPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChangePage((Next) => Next - 1);
  };
  return (
    <div className="SurveyContainer">
      <header>
        <p className="logo">Healing Meal</p>
      </header>
      <div className="SurveyContainer2">
        {ChangePage === 1 && (
          <Survey1
            setAge={setAge}
            onNext={handleNextPage}
            setSurvey1Valid={setSurvey1Valid}
            age={age}
          />
        )}
        {ChangePage === 2 && (
          <Survey2
            setDiabetesType={setDiabetesType}
            onNext={handleNextPage}
            onPast={handlePastPage}
            setSurvey2Valid={setSurvey2Valid}
            diabetestype={diabetestype}
          />
        )}
        {ChangePage === 3 && (
          <Survey3
            setExerciseType={setExerciseType}
            onNext={handleNextPage}
            onPast={handlePastPage}
            setSurvey3Valid={setSurvey3Valid}
            exerciseType={exerciseType}
          />
        )}
        {ChangePage === 4 && (
          <Survey4
            setKcal={setKcal}
            exerciseType={exerciseType}
            onNext={handleNextPage}
            onPast={handlePastPage}
            setSurvey4ContinueValid={setSurvey4ContinueValid}
            setSurvey4Valid={setSurvey4Valid}
            age={age}
            diabetestype={diabetestype}
            kcal={Kcal}
          />
        )}
        {ChangePage === 5 && (
          <Survey5 onNext={handleNextPage} onPast={handlePastPage} />
        )}
        {ChangePage === 6 && <SurveyResult />}
      </div>

      <footer className="SurveyPage_footer">
        <p className="footer_text">Sungkonghoe University GDSC </p>
      </footer>
    </div>
  );
};

export default SurveyPage;
