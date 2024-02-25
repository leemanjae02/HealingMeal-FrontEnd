import React, { useState, useEffect } from "react";
import styles from "../styles/MyPage.module.less";
import { useForm } from "../hooks/useForm.tsx";
import CustomAxios from "../api/Axios.tsx";
import AuthStore from "../stores/AuthStore.ts";
import StatusModal from "./StatusModal.tsx";
import SelectedFood from "./SelectedFood.tsx";
interface MyInforChangeProps {
  loginID: string;
}

interface FormattedData {
  selectedFoods: {
    [category: string]: string;
  };
}

const MyInforChangeComponents: React.FunctionComponent<MyInforChangeProps> = ({
  loginID,
}) => {
  const [name, onChangeName] = useForm();
  const [birthDate, onChangeBirthDate] = useForm();
  const [password, onChangePassword] = useForm();
  const [newPassword, onChangeNewPassword] = useForm();
  const [phoneNumber, onChangePhoneNumber] = useForm();
  const [email, onChangeEmail] = useForm();
  const [gender, onChangeGender] = useForm();
  const [Surveygender, onChangeSurveyGender] = useForm();
  const [age, onChangeAge] = useForm();
  const [diabetesType, onChangeDiabetesType] = useForm();
  const [exercises, onChangeExercises] = useForm();
  const [changeExercise, setChangeExercise] = useState<number>(0);
  const [height, onChangeHeight] = useForm();
  const [weight, onChangeWeight] = useForm();

  const [showbmi, setShowBMI] = useState<number>(0); //bmi값
  const [weightLevel, setWeightLevel] = useState<string>(""); // 최종결과페이지 결과메시지
  const [checkPassword, setCheckPassword] = useState<boolean>(false); // 새 비밀번호 입력창을 띄우기 위한 상탸

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [statusMSG, setStatusMSG] = useState<string>("");

  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [isValidNameMSG, setIsValidNameMSG] = useState<string>("");
  const [isValidBirthDate, setIsValidBirthDate] = useState<boolean>(false);
  const [isValidBirthDateMSG, setIsValidBirthDateMSG] = useState<string>("");
  const [isValidGender, setIsValidGender] = useState<boolean>(false);
  const [isValidGenderMSG, setIsValidGenderMSG] = useState<string>("");
  // const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  // const [isValidPasswordMSG, setIsValidPasswordMSG] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidEmailMSG, setIsValidEmailMSG] = useState<string>("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(false);
  const [isValidPhoneNumberMSG, setIsValidPhoneNumberMSG] =
    useState<string>("");

  const [selectedFoods, setSelectedFoods] = useState<{
    [key: string]: string[];
  }>({
    stewsAndHotpots: [],
    stewedFood: [],
    stirFriedFood: [],
    grilledFood: [],
    vegetableFood: [],
    steamedFood: [],
    pancakeFood: [],
    breadAndConfectionery: [],
    beveragesAndTeas: [],
    dairyProducts: [],
  });
  console.log(selectedFoods.stewsAndHotpots);

  const handleFoodSelection = (
    category: string,
    upDatedSelectedFoods: string[]
  ) => {
    setSelectedFoods({
      ...selectedFoods,
      [category]: upDatedSelectedFoods,
    });
  };

  const categorys: { [key: string]: string[] } = {
    stewsAndHotpots: [
      "콩비지찌개",
      "오징어찌개",
      "동태찌개",
      "돼지고기찌개",
      "버섯전골",
      "오리탕",
    ],
    stewedFood: [
      "버섯조림",
      "삼치조림",
      "양미리조림",
      "어묵조림",
      "우엉조림",
      "오징어채조림",
    ],
    stirFriedFood: [
      "죽순볶음",
      "멸치조림",
      "팔보채",
      "풋고추볶음",
      "감자조림",
      "땅콩조림",
    ],
    grilledFood: [
      "버섯구이",
      "가지구이",
      "스테이크",
      "조개구이",
      "황태구이",
      "장어구이",
    ],
    vegetableFood: [
      "시금치나물무침",
      "씀바귀나물무침",
      "참나물",
      "가죽나물무침",
      "콩나물무침",
      "유채나물",
    ],
    steamedFood: [
      "아귀찜",
      "애호박찜",
      "달걀찜",
      "옥수수",
      "풋고추찜",
      "코다리찜",
    ],
    pancakeFood: [
      "채소전",
      "닭발볶음",
      "고구마전",
      "부추전",
      "맛살전",
      "감자전",
    ],
    breadAndConfectionery: [
      "호두호밀브레드",
      "통밀빵",
      "에그 번 샌드위치",
      "블랙올리브탕종식빵",
      "BELT샌드위치",
      "샐러드빵",
    ],
    beveragesAndTeas: [
      "토마토주스",
      "자몽그린티",
      "당근사과주스",
      "수박주스",
      "라임티",
      "석류",
    ],
    dairyProducts: [
      "자몽요구르트",
      "오가닉그릭요거트플레인",
      "블랙베리요거트",
      "그릭요거트(액상)",
      "",
      "",
    ],
  };

  console.log("제외음식", selectedFoods.stewsAndHotpots);
  const handleSelectAll = (category: string, selectAll: boolean) => {
    const allFoods = categorys[category] || [];
    const currentSelectedFoods = selectedFoods[category] || [];

    let updatedSelectedFoods: string[];

    if (selectAll) {
      // 전체 선택
      updatedSelectedFoods = Array.from(
        new Set([...currentSelectedFoods, ...allFoods])
      );
    } else {
      // 전체 선택 해제
      updatedSelectedFoods = currentSelectedFoods.filter(
        (food) => !allFoods.includes(food)
      );
    }

    handleFoodSelection(category, updatedSelectedFoods);
  };

  const formattedData: FormattedData = {
    selectedFoods: {},
  };

  // 각 카테고리에 대해 선택된 음식 배열을 문자열로 변환하여 formattedData에 추가
  Object.keys(selectedFoods).forEach((category: string) => {
    formattedData.selectedFoods[category] = selectedFoods[category].join(", ");
  });

  const removeLastComma = (str: string) => {
    if (str.endsWith(", ")) {
      return str.slice(0, -2);
    }
    return str;
  };

  useEffect(() => {
    showBMI();
    if (exercises === "1") {
      setChangeExercise(27.5);
    } else if (exercises === "2") {
      setChangeExercise(32.5);
    } else {
      setChangeExercise(37.5);
    }
  }, [exercises]);

  const calculateBMI = () => {
    const heightInMeters = Number(height) / 100;
    const bmi = Number(weight) / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };
  console.log(height, weight);

  const updateBMIState = () => {
    const bmi = calculateBMI();
    setShowBMI(bmi);
    return bmi;
  };

  const showBMI = () => {
    const showbmi = updateBMIState();
    if (showbmi < 18.5) {
      setWeightLevel("저체중");
    } else if (showbmi >= 18.5 && showbmi <= 22.9) {
      setWeightLevel("적정 체중");
    } else if (showbmi >= 23 && showbmi <= 24.9) {
      setWeightLevel("과체중");
    } else {
      setWeightLevel("비만");
    }
  };

  const calculateStandardWeight = () => {
    //표준체중 계산
    const heightInMeters = Number(height) / 100;
    const returnStandardWeight =
      Surveygender === "MALE"
        ? heightInMeters ** 2 * 22
        : heightInMeters ** 2 * 21;
    return parseFloat(returnStandardWeight.toFixed(1));
  };

  const standardWeight = calculateStandardWeight();

  const DailyCalories = () => {
    // 하루 필요 칼로리
    const activityMultiplier =
      Number(weight) <= 0 ? 0 : Number(weight) * changeExercise;
    return activityMultiplier.toFixed(0);
  };
  const calculatedKcal = parseFloat(DailyCalories());

  console.log("표준체중", standardWeight);
  console.log("하루칼로리", calculatedKcal);
  console.log("운동유형", exercises);
  console.log("운동유형변환", changeExercise);
  console.log("bmi", showbmi);

  const clickCheckPassword = async () => {
    try {
      const response = await CustomAxios.post(
        AuthStore.userID + "/check/password",
        {
          password,
        }
      );
      if (response.status === 200) {
        setCheckPassword(true);
      }
    } catch (error) {
      console.log(error);

      setCheckPassword(false);
    }
  };

  const clickChangePassword = async () => {
    const passwordRule =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRule.test(newPassword)) {
      openModal();
      setStatusMSG(
        "비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자 한 개 이상 포함해야 합니다."
      );
      return;
    }
    try {
      const response = await CustomAxios.put(AuthStore.userID + "/change/pwd", {
        nowPwd: password,
        changePwd: newPassword,
      });
      if (response.status === 200) {
        console.log("비밀번호 변경 성공");
        openModal();
        setStatusMSG("비밀번호 변경에 성공했습니다!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clickChangeInfor = async () => {
    if (!checkInput()) {
      // 유효성 검사 수행
      openModal();
      setStatusMSG("유효성 검사를 통과하지 못했습니다.");
      return; // 유효성 검사 실패 시 함수 종료}
    }

    try {
      const response = await CustomAxios.put(
        AuthStore.userID + "/change/join",
        {
          name,
          email,
          gender,
          birthDate,
          phoneNumber,
        }
      );
      if (response.status === 200) {
        openModal();
        setStatusMSG("정보변경에 성공했습니다!");
      }
    } catch (error) {
      console.log(error);
      openModal();
      setStatusMSG("정보변경에 실패했습니다.");
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const checkInput = (): boolean => {
    const birthRule =
      /^(?:[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1])){0,1}[0-9]{6}$/;
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split("@")[1];
    const PhoneRule = /^010[0-9]{8}$/;
    const PhoneCheck = phoneNumber.replace(/-/g, "");

    if (name === "") {
      setIsValidNameMSG("이름을 입력해주세요.");
    } else {
      setIsValidName(true);
      setIsValidNameMSG("");
    }

    if (birthDate === "") {
      setIsValidBirthDateMSG("생년월일을 입력해주세요.");
    } else if (!birthRule.test(birthDate)) {
      setIsValidBirthDateMSG("생년월일을 다시 확인해주세요.");
    } else {
      setIsValidBirthDate(true);
      setIsValidBirthDateMSG("");
    }

    if (gender === "") {
      setIsValidGenderMSG("성별을 선택해주세요.");
    } else {
      setIsValidGender(true);
      setIsValidGenderMSG("");
    }

    if (email === "") {
      setIsValidEmailMSG("이메일을 입력해주세요.");
    } else if (!emailRule.test(email)) {
      setIsValidEmailMSG("이메일 형식이 유효하지 않습니다.");
    } else if (domain !== "gmail.com") {
      setIsValidEmailMSG("현재 변경 가능한 이메일은 gmail.com입니다.");
    } else {
      setIsValidEmail(true);
      setIsValidEmailMSG("");
    }

    if (phoneNumber === "") {
      setIsValidPhoneNumberMSG("전화번호를 입력해주세요.");
    } else if (!PhoneRule.test(PhoneCheck)) {
      setIsValidPhoneNumberMSG("전화번호를 다시 확인해주세요.");
    } else {
      setIsValidPhoneNumber(true);
      setIsValidPhoneNumberMSG("");
    }
    if (
      !isValidName ||
      !isValidBirthDate ||
      !isValidEmail ||
      !isValidGender ||
      !isValidPhoneNumber
    ) {
      return false;
    }
    return true;
  };

  console.log("email", email);
  console.log("name", name);
  console.log("phoneNuber", phoneNumber);
  console.log("gender", gender);
  console.log("birthDate", birthDate);

  console.log("생년월일 유효성", isValidBirthDate);
  console.log("이메일 유효성", isValidEmail);
  console.log("휴대전화 유효성", isValidPhoneNumber);
  console.log("성별 유효성", isValidGender);
  console.log("이름 유효성", isValidName);

  const clickChangeSurvey = async () => {
    try {
      const response = await CustomAxios.put(
        AuthStore.userID + "/change/survey",
        {
          age,
          diabetesType,
          numberOfExercises: exercises,
          height: Number(height),
          weight: Number(weight),
          gender: Surveygender,
          standardWeight,
          bodyMassIndex: showbmi,
          caloriesNeededPerDay: calculatedKcal,
          weightLevel,
        }
      );
      if (response.status === 200) {
        openModal();
        setStatusMSG("설문정보 변경에 성공했습니다!");
      }
    } catch (error) {
      console.log(error);
      openModal();
      setStatusMSG("설문정보 변경에 실패했습니다.");
    }
  };

  const clickFoodChange = async () => {
    const ChangeFoodData = {
      stewsAndHotpots: removeLastComma(
        formattedData.selectedFoods.stewsAndHotpots
      ),
      stewedFood: removeLastComma(formattedData.selectedFoods.stewedFood),
      stirFriedFood: removeLastComma(formattedData.selectedFoods.stirFriedFood),
      grilledFood: removeLastComma(formattedData.selectedFoods.grilledFood),
      vegetableFood: removeLastComma(formattedData.selectedFoods.vegetableFood),
      steamedFood: removeLastComma(formattedData.selectedFoods.steamedFood),
      pancakeFood: removeLastComma(formattedData.selectedFoods.pancakeFood),
      breadAndConfectionery: removeLastComma(
        formattedData.selectedFoods.breadAndConfectionery
      ),
      beveragesAndTeas: removeLastComma(
        formattedData.selectedFoods.beveragesAndTeas
      ),
      dairyProducts: removeLastComma(formattedData.selectedFoods.dairyProducts),
    };

    try {
      const response = await CustomAxios.put(
        AuthStore.userID + "/change/filterFood",
        ChangeFoodData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        openModal();
        setStatusMSG("음식정보 수정에 성공했습니다!");
      }
    } catch (error) {
      console.log(error);
      openModal();
      setStatusMSG("음식정보 수정에 실패했습니다.");
    }
  };

  return (
    <div className={styles.RightContainer}>
      <p className={styles.title}>내 정보 수정</p>
      <div className={styles.Container2}>
        <div className={styles.MyInforBox}>
          <p className={styles.InforTitle}>회원가입 정보</p>
          <div className={styles.InforList}>
            <div className={styles.titleText}>아이디 </div>
            <div className={styles.Text}>
              {loginID}
              <span>아이디는 수정이 불가합니다.</span>
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이름 </div>
            <div className={styles.Text}>
              <input
                type="text"
                placeholder="수정할 이름을 작성해주세요."
                value={name}
                onChange={onChangeName}
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>생년월일 </div>
            <div className={styles.Text}>
              <input
                type="text"
                placeholder="수정할 생년월일을 작성해주세요. 예시: 011225"
                value={birthDate}
                onChange={onChangeBirthDate}
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>성별 </div>
            <div className={styles.Text}>
              <label htmlFor="male">
                <input
                  className={styles.radioInput}
                  id="male"
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={gender === "MALE"}
                  onChange={onChangeGender}
                />
                남자
              </label>
              <label htmlFor="female">
                <input
                  className={styles.radioInput}
                  id="female"
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  checked={gender === "FEMALE"}
                  onChange={onChangeGender}
                />
                여자
              </label>
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>이메일 </div>
            <div className={styles.Text}>
              <input
                type="text"
                placeholder="수정할 이메일을 입력해주세요."
                value={email}
                onChange={onChangeEmail}
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>전화번호 </div>
            <div className={styles.Text}>
              <input
                type="tel"
                placeholder="수정할 전화번호를 입력해주세요."
                value={phoneNumber}
                onChange={onChangePhoneNumber}
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>비밀번호 </div>
            <div className={styles.Text}>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력해주세요."
                value={password}
                onChange={onChangePassword}
              />
              <div className={styles.checkPassword_btn}>
                <button onClick={clickCheckPassword}>확인</button>
              </div>
            </div>
          </div>
          {checkPassword && (
            <div className={styles.InforList}>
              <div className={styles.titleText}>새 비밀번호 </div>
              <div className={styles.Text}>
                <input
                  type="password"
                  placeholder="새 비밀번호를 입력해주세요."
                  value={newPassword}
                  onChange={onChangeNewPassword}
                />
                <div className={styles.checkPassword_btn}>
                  <button onClick={clickChangePassword}>변경</button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.changeInfor}>
            <button onClick={clickChangeInfor}>수정</button>
          </div>

          {modalOpen && (
            <StatusModal
              statusMSG={statusMSG}
              isValidBirthDateMSG={isValidBirthDateMSG}
              isValidEmailMSG={isValidEmailMSG}
              isValidGenderMSG={isValidGenderMSG}
              isValidPhoneNumberMSG={isValidPhoneNumberMSG}
              isValidNameMSG={isValidNameMSG}
              closeModal={closeModal}
            />
          )}
        </div>

        <div className={styles.MySurveyBox}>
          <p className={styles.InforTitle}>설문조사 정보</p>
          <div className={styles.InforList}>
            <div className={styles.titleText}>연령대 </div>
            <div className={styles.Text}>
              <label htmlFor="age1">
                <input
                  className={styles.radioInput}
                  id="age1"
                  type="radio"
                  name="age"
                  value="18~29"
                  checked={age === "18~29"}
                  onChange={onChangeAge}
                />
                18~29
              </label>
              <label htmlFor="age2">
                <input
                  className={styles.radioInput}
                  id="age2"
                  type="radio"
                  name="age"
                  value="30~39"
                  checked={age === "30~39"}
                  onChange={onChangeAge}
                />
                30~39
              </label>
              <label htmlFor="age3">
                <input
                  className={styles.radioInput}
                  id="age3"
                  type="radio"
                  name="age"
                  value="40~49"
                  checked={age === "40~49"}
                  onChange={onChangeAge}
                />
                40~49
              </label>
              <label htmlFor="age4">
                <input
                  className={styles.radioInput}
                  id="age4"
                  type="radio"
                  name="age"
                  value="50~"
                  checked={age === "50~"}
                  onChange={onChangeAge}
                />
                50~
              </label>
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>당뇨유형 </div>
            <div className={styles.Text}>
              <label htmlFor="diabetesType">
                <input
                  className={styles.radioInput}
                  id="diabetesType"
                  type="radio"
                  name="diabetesType"
                  value="1"
                  checked={diabetesType === "1"}
                  onChange={onChangeDiabetesType}
                />
                제 2형 당뇨병
              </label>
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>운동유형 </div>
            <div className={styles.Text}>
              <label htmlFor="exercises1">
                <input
                  className={styles.radioInput}
                  id="exercises1"
                  type="radio"
                  name="exercises"
                  value="1"
                  checked={exercises === "1"}
                  onChange={onChangeExercises}
                />
                주 0~2회
              </label>
              <label htmlFor="exercises2">
                <input
                  className={styles.radioInput}
                  id="exercises2"
                  type="radio"
                  name="exercises"
                  value="2"
                  checked={exercises === "2"}
                  onChange={onChangeExercises}
                />
                주 3~4회
              </label>
              <label htmlFor="exercises3">
                <input
                  className={styles.radioInput}
                  id="exercises3"
                  type="radio"
                  name="exercises"
                  value="3"
                  checked={exercises === "3"}
                  onChange={onChangeExercises}
                />
                주 5~7회
              </label>
            </div>
          </div>

          <div className={styles.InforList}>
            <div className={styles.titleText}>키 </div>
            <div className={styles.Text}>
              <input
                type="number"
                placeholder="수정할 키를 입력해주세요."
                value={height}
                onChange={onChangeHeight}
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>몸무게 </div>
            <div className={styles.Text}>
              <input
                type="number"
                placeholder="수정할 몸무게를 입력해주세요."
                value={weight}
                onChange={onChangeWeight}
              />
            </div>
          </div>
          <div className={styles.InforList}>
            <div className={styles.titleText}>성별 </div>
            <div className={styles.Text}>
              <label htmlFor="Surveymale">
                <input
                  className={styles.radioInput}
                  id="Surveymale"
                  type="radio"
                  name="Surveygender"
                  value="MALE"
                  checked={Surveygender === "MALE"}
                  onChange={onChangeSurveyGender}
                />
                남자
              </label>
              <label htmlFor="Surveyfemale">
                <input
                  className={styles.radioInput}
                  id="Surveyfemale"
                  type="radio"
                  name="Surveygender"
                  value="FEMALE"
                  checked={Surveygender === "FEMALE"}
                  onChange={onChangeSurveyGender}
                />
                여자
              </label>
            </div>
          </div>

          <div className={styles.changeInfor}>
            <button onClick={clickChangeSurvey}>수정</button>
          </div>
        </div>

        <div className={styles.FoodSelected}>
          {Object.keys(selectedFoods).map((category, index) => (
            <SelectedFood
              key={category}
              categoryName={category}
              categoryIndex={index}
              foods={categorys[category] || []} // 각 카테고리에 해당하는 음식 목록 전달
              selectedFoods={selectedFoods[category] || []} // 각 카테고리에 해당하는 선택된 음식 목록 전달
              onSelect={(category, upDatedSelectedFoods) =>
                handleFoodSelection(category, upDatedSelectedFoods)
              }
              onSelectAll={(category, selectAll) =>
                handleSelectAll(category, selectAll)
              }
            />
          ))}
          <div className={styles.changeInfor}>
            <button onClick={clickFoodChange}>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInforChangeComponents;
