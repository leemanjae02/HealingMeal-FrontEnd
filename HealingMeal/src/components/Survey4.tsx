import { useState } from "react";
import styles from "../styles/Survey4.module.less";
import { useForm } from "../hooks/useForm";
import CustomAxios from "../api/Axios";
import AuthStore from "../stores/AuthStore";

interface Survey4Props {
  setKcal: (kcal: number) => void;
  exerciseType?: number;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPast: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSurvey4ContinueValid: (survey4ContinueValid: boolean) => void;
  setSurvey4Valid: (survey4Valid: boolean) => void;
  age: string;
  diabetestype: number;
  kcal: number;
}

const Survey4: React.FunctionComponent<Survey4Props> = ({
  setKcal,
  exerciseType = 0,
  onNext,
  onPast,
  setSurvey4ContinueValid,
  setSurvey4Valid,
  age,
  diabetestype,
  kcal,
}) => {
  const [kcalCheck1, setKcalCheck1] = useState<boolean>(false);
  const [kcalCheck2, setKcalCheck2] = useState<boolean>(false);
  const [height, onChangeHeight] = useForm(); //계산기 키
  const [weight, onChangeWeight] = useForm(); //계산기 몸무게
  const [gender, onChangeGender] = useForm(); //계산기 성별
  const [showCalculate, setShowcertification] = useState<boolean>(false); //열량계산결과
  const [showbmi, setShowBMI] = useState<number>(0); //bmi값
  const [weightLevel, setWeightLevel] = useState<string>(""); // 최종결과페이지 결과메시지
  const [bmiResponse, setBMIResponse] = useState<string>(""); //체중 감량, 유지, 증량 반환
  const [changeExerciseType, setChangeExerciseType] = useState<number>(0); // 3번 설문조사 운동유형 값 변환

  console.log(exerciseType);
  const handleTypeSelect = (kcal: number) => {
    setKcal(kcal);
  };
  const handleValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (kcal) {
      setSurvey4Valid(true);
      onNext(e);
      PostSurvey4();
    } else {
      setSurvey4Valid(false);
    }
  };

  const handleContinueValidation = () => {
    if (height && weight && gender) {
      setSurvey4ContinueValid(true);
      clickKclaCheck2();
    } else {
      setSurvey4ContinueValid(false);
    }
  };

  const handleResult = () => {
    alert("아래로 스크롤 해주세요!");
    if (showCalculate === true) {
      setKcalCheck2(true);
    }
  };

  const _ChangeExerciseType = () => {
    if (exerciseType === 1) {
      setChangeExerciseType(27.5);
    } else if (exerciseType === 2) {
      setChangeExerciseType(32.5);
    } else {
      setChangeExerciseType(37.5);
    }
  };
  const clickKclaCheck1 = () => {
    alert("아래로 스크롤 해주세요!");
    setKcalCheck1(true);
    _ChangeExerciseType();
  };

  const clickKclaCheck2 = () => {
    setShowcertification(true);
    handleTypeSelect(calculatedKcal);
    showBMI();
  };
  const calculateStandardWeight = () => {
    const heightInMeters = Number(height) / 100;
    const returnStandardWeight =
      gender === "MALE" ? heightInMeters ** 2 * 22 : heightInMeters ** 2 * 21;
    return parseFloat(returnStandardWeight.toFixed(1));
  };

  const standardWeight = calculateStandardWeight();

  console.log("표준", standardWeight);
  const DailyCalories = () => {
    const activityMultiplier =
      Number(weight) <= 0 ? 0 : Number(weight) * changeExerciseType;
    return activityMultiplier.toFixed(0);
  };
  const calculatedKcal = parseFloat(DailyCalories());

  const calculateBMI = () => {
    const heightInMeters = Number(height) / 100;
    const bmi = Number(weight) / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const updateBMIState = () => {
    const bmi = calculateBMI();
    setShowBMI(bmi);
    return bmi;
  };
  const showBMI = () => {
    const showbmi = updateBMIState();
    if (showbmi < 18.5) {
      setWeightLevel("저체중");
      setBMIResponse("체중증가");
    } else if (showbmi >= 18.5 && showbmi <= 22.9) {
      setWeightLevel("적정 체중");
      setBMIResponse("체중유지");
    } else if (showbmi >= 23 && showbmi <= 24.9) {
      setWeightLevel("과체중");
      setBMIResponse("체중감량");
    } else {
      setWeightLevel("비만");
      setBMIResponse("체중감량");
    }
  };
  const PostSurvey4 = async () => {
    const Survey4Data = {
      age: age,
      diabetesType: diabetestype,
      numberOfExercises: exerciseType,
      height: Number(height),
      weight: Number(weight),
      gender: gender,
      standardWeight: standardWeight,
      bodyMassIndex: showbmi,
      caloriesNeededPerDay: kcal,
      weightLevel: weightLevel,
    };
    try {
      const response = await CustomAxios.post(
        AuthStore.userID + "/survey",
        Survey4Data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("surveyid", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("체인지", changeExerciseType);
  console.log("showbmi", showbmi);
  return (
    <div className={styles.SurveyContainer}>
      <div className={styles.Survey_Page}>
        <div className={styles.Survey_title}>
          <div className={styles.title_text}>
            <strong>설문조사</strong>
            <p>하루 필요 열량</p>
          </div>
        </div>
        <div className={styles.Page_infor}>
          <div className={styles.Page_Scorll}>
            <div className={styles.Survey4_inforBox1}>
              <div className={styles.infor1}>
                <div className={styles.infor1_title}>
                  <strong>하루 필요 열량을 알아보세요!</strong>
                </div>
                <div className={styles.infor1_inforText}>
                  <p>
                    하루 총필요 열량을 계산하는 방법은 다음과 같습니다. <br />
                    ※ 체중이 60kg인 남자가 보통 활동을 한다면 &nbsp;
                    <br />
                    <span>하루 필요열량</span>은 60 X 30 = 1800kcal입니다.
                  </p>
                </div>
              </div>
              <div className={styles.infor1_imgBox}>
                <div className={styles.imgBox}>
                  <div className={styles.imgBox_icon}>
                    <img src="/images/run2.jpg" />
                  </div>
                  <div className={styles.imgBox_text}>
                    <div>
                      <p>
                        <strong>주 0~2회 운동을 하는 경우</strong>
                      </p>
                    </div>
                    <div>
                      <p>본인체중 X 25-30 (칼로리/일)</p>
                    </div>
                  </div>
                </div>
                <div className={styles.imgBox}>
                  <div className={styles.imgBox_icon}>
                    <img src="/images/run2.jpg" />
                  </div>
                  <div className={styles.imgBox_text}>
                    <div>
                      <p>
                        <strong>주 3~4회 운동을 하는 경우</strong>
                      </p>
                    </div>
                    <div>
                      <p>본인체중 X 30-35 (칼로리/일)</p>
                    </div>
                  </div>
                </div>
                <div className={styles.imgBox}>
                  <div className={styles.imgBox_icon}>
                    <img src="/images/run2.jpg" />
                  </div>
                  <div className={styles.imgBox_text}>
                    <div>
                      <p>
                        <strong>주 5~7회 운동을 하는 경우</strong>
                      </p>
                    </div>
                    <div>
                      <p>본인체중 X 35-40 (칼로리/일)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Survey4_btn}>
                <button
                  onClick={clickKclaCheck1}
                  className={styles.continue_btn}
                >
                  계속
                </button>
              </div>
            </div>
            {kcalCheck1 && (
              <div className={styles.Survey4_inforBox2}>
                <div className={styles.inforBox2_text}>
                  <p>
                    연령, 식습관, 활동량에 따라 필요열량을 산정하는데 고려해야
                    할 사항들이 많으므로 정확한 필요열량을 알아보기 위해서는{" "}
                    <span>임상영양사와 상담</span>하시는 것을 권장드립니다.
                  </p>
                </div>
                <div className={styles.calculator_box}>
                  <div className={styles.calculator}>
                    <table>
                      <tbody>
                        <tr>
                          <th>키</th>
                          <td>
                            <input
                              type="number"
                              value={height}
                              onChange={onChangeHeight}
                            />
                            cm
                          </td>
                        </tr>
                        <tr>
                          <th>체중</th>
                          <td>
                            <input
                              type="number"
                              value={weight}
                              onChange={onChangeWeight}
                            />
                            kg
                          </td>
                        </tr>
                        <tr>
                          <th>성별</th>
                          <td>
                            <input
                              type="radio"
                              name="gender"
                              value="MALE"
                              checked={gender === "MALE"}
                              onChange={onChangeGender}
                            />
                            남
                            <input
                              type="radio"
                              name="gender"
                              value="FEMALE"
                              checked={gender === "FEMALE"}
                              onChange={onChangeGender}
                            />
                            여
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {showCalculate && (
                    <div className={styles.calculator}>
                      <table>
                        <tbody>
                          <tr>
                            <th>표준체중</th>
                            <td className={styles.calculator_result}>
                              <span>{calculateStandardWeight()}</span>kg
                            </td>
                          </tr>
                          <tr>
                            <th>체질량지수</th>
                            <td className={styles.calculator_result}>
                              <span>{calculateBMI()}</span>kg/㎡
                            </td>
                          </tr>
                          <tr>
                            <th>하루 필요 열량</th>
                            <td className={styles.calculator_result}>
                              <span>{DailyCalories()}</span>kcal
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                {showCalculate ? (
                  <div className={styles.Survey4_btn}>
                    <button
                      onClick={handleResult}
                      className={styles.continue_btn}
                    >
                      결과보기
                    </button>
                  </div>
                ) : (
                  <div className={styles.Survey4_btn}>
                    <button
                      onClick={handleContinueValidation}
                      className={styles.continue_btn}
                      disabled={!height || !weight || !gender}
                    >
                      계산하기
                    </button>
                  </div>
                )}
              </div>
            )}
            {kcalCheck2 && (
              <div className={styles.Survey4_inforBox3}>
                <div className={styles.Survey4_calculator_result}>
                  <div>
                    표준체중은 <span>{calculateStandardWeight()}kg</span>
                    입니다.
                  </div>
                  <div>
                    현재체중은 <span>{weightLevel}</span>입니다.
                  </div>
                  <div>
                    [<span>{bmiResponse}</span>]을 위해 하루
                    <span>{DailyCalories()}kcal</span>의 열량 섭취가 권장됩니다.
                  </div>
                  <div>
                    '보통의 활동을 하는 경우'에 해당되는 '하루필요 열량'입니다.
                  </div>
                  <div>
                    ※나이, 활동량, 치료목표등에 따라 가감이 필요할 수 있으므로
                    자세한 내용은 전문가와 상의하시기 바랍니다.
                  </div>
                </div>
                <div className={styles.Survey4_btn}>
                  <button
                    onClick={(e) => onPast(e)}
                    className={styles.Survey4_Past_btn}
                  >
                    이전
                  </button>
                  <button
                    onClick={(e) => handleValidation(e)}
                    className={styles.Survey4_Next_btn}
                    disabled={!kcal}
                  >
                    다음
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey4;
