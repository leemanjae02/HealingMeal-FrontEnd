import { useEffect, useState } from "react";
import "../styles/MainPage.less";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../api/Axios";
import MealComponent from "../components/MealInfor";
import Slider from "react-slick";
import "slick-carousel/slick/slick.less";
import AOS from "aos";
import "aos/dist/aos.css";
import PieChartComponents from "../components/PieChart";
import AuthStore from "../stores/AuthStore";
import { observer } from "mobx-react";
import MealInforModal from "../components/MealInforModal";
import mealAiStore from "../stores/ChartDataStore";
interface MealData {
  main_dish: string;
  imageURL: string;
  rice?: string;
  meals: string;
  sideDishForUserMenu?: string[];
  kcal: string;
  protein: string;
  carbohydrate: string;
  fat: string;
}

interface SnackData {
  snack_or_tea: string;
  imageURL: string;
  meals: string;
  kcal: string;
  protein: string;
  carbohydrate: string;
  fat: string;
}

document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
  AOS.refresh();
});
const MainPage = observer(() => {
  const navigate = useNavigate();
  // const [loginCheck, setLoginCheck] = useState<boolean>(false);
  // const [userName, setUserName] = useState<string | null>(null);
  const { isLoggedIn, userName } = AuthStore;
  const [loding, setLoding] = useState<boolean>(false);
  const [checkMealResult, setCheckMealResult] = useState<boolean>(false);
  const [checkSurveyResult, setCheckSurveyResult] = useState<boolean>(false);
  const [mealAiText, setMealAiText] = useState<{
    breakfastAi: string;
    breakfastSnackAi: string;
    lunchAi: string;
    lunchSnackAi: string;
    dinnerAi: string;
  } | null>(null);

  const [selectedFood, setSelectedFood] = useState<{
    main_dish: string;
    imageURL: string;
    kcal: string;
    protein: string;
    carbohydrate: string;
    fat: string;
    meals: string;
    rice?: string;
    sideDishForUserMenu?: string[];
  } | null>(null);

  const [breakfastInfor, setBreakfastInfor] = useState<MealData>({
    main_dish: "된장찌개",
    imageURL: "../../public/images/defaultBreakfast.png",
    rice: "",
    meals: "아침식단",
    sideDishForUserMenu: [],
    kcal: "",
    protein: "",
    carbohydrate: "",
    fat: "",
  });

  const [breakfastSnack, setBreakfastSnack] = useState<SnackData>({
    snack_or_tea: "샌드위치",
    imageURL: "../../public/images/defaultBreakfastSnack.jpg",
    meals: "아침간식",
    kcal: "",
    protein: "",
    carbohydrate: "",
    fat: "",
  });

  const [lunchInfor, setLunchInfor] = useState<MealData>({
    main_dish: "제육볶음",
    imageURL: "../../public/images/defaultLunch.png",
    rice: "",
    meals: "점심식단",
    sideDishForUserMenu: [],
    kcal: "",
    protein: "",
    carbohydrate: "",
    fat: "",
  });

  const [lunchSnack, setLunchSnack] = useState<SnackData>({
    snack_or_tea: "그릭요거트",
    imageURL: "../../public/images/defaultLunchSnack.jpg",
    meals: "점심간식",
    kcal: "",
    protein: "",
    carbohydrate: "",
    fat: "",
  });

  const [dinnerInfor, setDinnerInfor] = useState<MealData>({
    main_dish: "칼국수",
    imageURL: "../../public/images/defaultDinner.jpg",
    rice: "",
    meals: "저녁식단",
    sideDishForUserMenu: [],
    kcal: "",
    protein: "",
    carbohydrate: "",
    fat: "",
  });

  useEffect(() => {
    const loginCheck = async () => {
      try {
        await AuthStore.checkLoginStatus();
        if (AuthStore.isLoggedIn) {
          console.log(
            AuthStore.isLoggedIn,
            AuthStore.userID,
            AuthStore.userName
          );
          await checkSurvey();
        }
      } catch (error) {
        console.log(error);
      }
    };

    loginCheck();
  }, [AuthStore.isLoggedIn]);

  const ChartData = () => {
    const _kcal = window.sessionStorage.getItem("kcal");
    const kcal = _kcal ? parseInt(_kcal) : 0;
    const _protein = window.sessionStorage.getItem("protein");
    const protein = _protein ? parseInt(_protein) : 0;
    const _fat = window.sessionStorage.getItem("fat");
    const fat = _fat ? parseInt(_fat) : 0;
    const _carbohydrate = window.sessionStorage.getItem("carbohydrate");
    const carbohydrate = _carbohydrate ? parseInt(_carbohydrate) : 0;

    return { kcal, protein, fat, carbohydrate };
  };
  useEffect(() => {
    ChartData();
  }, []);

  const checkSurvey = async () => {
    try {
      const response = await CustomAxios.get(
        AuthStore.userID + "/checkingSurvey",
        {
          withCredentials: true,
        }
      );
      if (response.data === "설문 내용 있음.") {
        console.log(response.data);
        setCheckSurveyResult(true);
        await checkMeal();
      } else {
        // 설문 내용이 없는 경우
        console.log("설문 내용 없음");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkMeal = async () => {
    try {
      const response = await CustomAxios.get(AuthStore.userID + "/check", {
        withCredentials: true,
      });
      if (response.data === true) {
        setCheckMealResult(true);
        console.log("식단생성됨", response.data);
        setLoding(true);
        await Promise.all([
          getBreakfast(),
          getLunch(),
          getDinner(),
          getBreakfastSnack(),
          getLunchSnack(),
          getMealAiText(),
        ]);
        setLoding(false);
      } else if (checkMealResult === false) {
        generate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (checkMealResult === false) {
  //     checkMeal();
  //   }
  // }, [checkMealResult]);

  const generate = async () => {
    try {
      setLoding(true);
      const response = await CustomAxios.post(AuthStore.userID + "/generate", {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("식단생성 성공");
        await AiGenerate();
        await Promise.all([
          getBreakfast(),
          getLunch(),
          getDinner(),
          getBreakfastSnack(),
          getLunchSnack(),
          getMealAiText(),
        ]);
        setLoding(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AiGenerate = async () => {
    try {
      const response = await CustomAxios.post(
        AuthStore.userID + "/ai/generate",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("ai생성 성공");
        // await Promise.all([
        //   getBreakfast(),
        //   getLunch(),
        //   getDinner(),
        //   getBreakfastSnack(),
        //   getLunchSnack(),
        //   getMealAiText(),
        // ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBreakfast = async () => {
    try {
      const response = await CustomAxios.get(
        AuthStore.userID + "/provide/breakfast",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setBreakfastInfor(response.data);
        // setBreakfastInfor({
        //   mainDish: response.data.main_dish,
        //   imageURL: response.data.imageURL,
        //   rice: response.data.rice,
        //   meals: response.data.meals,
        //   sideDish: response.data.sideDishForUserMenu,
        //   kcal: response.data.kcal,
        //   protein: response.data.protein,
        //   carbohydrate: response.data.carbohydrate,
        //   fat: response.data.fat,
        // });
        console.log("아침식단 생성 성공", response.data);
      }
    } catch (error) {
      console.log("아침식단 오류", error);
    }
  };

  const getLunch = async () => {
    try {
      const response = await CustomAxios.get(
        AuthStore.userID + "/provide/lunch",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLunchInfor(response.data);
        // setLunchInfor({
        //   mainDish: response.data.main_dish,
        //   imageURL: response.data.imageURL,
        //   rice: response.data.rice,
        //   meals: response.data.meals,
        //   sideDish: response.data.sideDishForUserMenu,
        //   kcal: response.data.kcal,
        //   protein: response.data.protein,
        //   carbohydrate: response.data.carbohydrate,
        //   fat: response.data.fat,
        // });
        console.log("점심식단 성공", response.data);
      }
    } catch (error) {
      console.log("점심식단 오류", error);
    }
  };
  const getDinner = async () => {
    try {
      const response = await CustomAxios.get(
        AuthStore.userID + "/provide/dinner",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setDinnerInfor(response.data);
        // setDinnerInfor({
        //   mainDish: response.data.main_dish,
        //   imageURL: response.data.imageURL,
        //   rice: response.data.rice,
        //   meals: response.data.meals,
        //   sideDish: response.data.sideDishForUserMenu,
        //   kcal: response.data.kcal,
        //   protein: response.data.protein,
        //   carbohydrate: response.data.carbohydrate,
        //   fat: response.data.fat,
        // });
        console.log("저녁식단 성공", response.data);
      }
    } catch (error) {
      console.log("저녁식단 오류", error);
    }
  };
  const getBreakfastSnack = async () => {
    try {
      const response = await CustomAxios.get(
        AuthStore.userID + "/provide/breakfast-snack-or-tea",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setBreakfastSnack(response.data);
        // setBreakfastSnack({
        //   snack_or_tea: response.data.snack_or_tea,
        //   imageURL: response.data.imageURL,
        //   meals: response.data.meals,
        //   kcal: response.data.kcal,
        //   protein: response.data.protein,
        //   carbohydrate: response.data.carbohydrate,
        //   fat: response.data.fat,
        // });
        console.log("아점간식식단 성공", response.data);
      }
    } catch (error) {
      console.log("아점간식식단 오류", error);
    }
  };
  const getLunchSnack = async () => {
    try {
      const response = await CustomAxios.get(
        AuthStore.userID + "/provide/lunch-snack-or-tea",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLunchSnack(response.data);
        // setLunchSnack({
        //   snack_or_tea: response.data.snack_or_tea,
        //   imageURL: response.data.imageURL,
        //   meals: response.data.meals,
        //   kcal: response.data.kcal,
        //   protein: response.data.protein,
        //   carbohydrate: response.data.carbohydrate,
        //   fat: response.data.fat,
        // });
        console.log("점저간식식단 성공", response.data);
      }
    } catch (error) {
      console.log("점저간식식단 오류", error);
    }
  };

  const getMealAiText = async () => {
    try {
      const [BreakfastAi, BreakfastSnackAi, LunchAi, LunchSnackAi, DinnerAi] =
        await Promise.all([
          CustomAxios.get(AuthStore.userID + "/ai/breakfast"),
          CustomAxios.get(AuthStore.userID + "/ai/breakfast-snackortea"),
          CustomAxios.get(AuthStore.userID + "/ai/lunch"),
          CustomAxios.get(AuthStore.userID + "/ai/lunch-snackortea"),
          CustomAxios.get(AuthStore.userID + "/ai/dinner", {
            withCredentials: true,
          }),
        ]);
      if (BreakfastAi.status !== 200) {
        console.error("BreakfastAi API 호출 실패:", BreakfastAi.data);
      }
      if (BreakfastSnackAi.status !== 200) {
        console.error("BreakfastSnackAi API 호출 실패:", BreakfastSnackAi.data);
      }
      if (LunchAi.status !== 200) {
        console.error("LunchAi API 호출 실패:", LunchAi.data);
      }
      if (LunchSnackAi.status !== 200) {
        console.error("LunchSnackAi API 호출 실패:", LunchSnackAi.data);
      }
      if (DinnerAi.status !== 200) {
        console.error("DinnerAi API 호출 실패:", DinnerAi.data);
      }

      if (
        BreakfastAi.status === 200 &&
        BreakfastSnackAi.status === 200 &&
        LunchAi.status === 200 &&
        LunchSnackAi.status === 200 &&
        DinnerAi.status === 200
      ) {
        setMealAiText({
          breakfastAi: BreakfastAi.data.answer,
          breakfastSnackAi: BreakfastSnackAi.data.answer,
          lunchAi: LunchAi.data.answer,
          lunchSnackAi: LunchSnackAi.data.answer,
          dinnerAi: DinnerAi.data.answer,
        });
        mealAiStore.setBreakfastAiText(BreakfastAi.data.ansewer);
        mealAiStore.setLunchAiText(LunchAi.data.answer);
        mealAiStore.setDinnerAiText(DinnerAi.data.answer);
        mealAiStore.setBreakfastSnackAiText(BreakfastSnackAi.data.answer);
        mealAiStore.setLunchSnackAiText(LunchSnackAi.data.answer);
      }
    } catch (error) {
      console.log("한 개 이상의 API 통신 에러", error);
    }
  };

  const clickLogin = () => {
    navigate("/login");
  };

  const clicksurvey = () => {
    navigate("/survey");
  };

  const clickFavorites = () => {
    navigate("/mypage/favorites");
  };

  const clickMypage = () => {
    navigate("/mypage");
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  const foods = [
    {
      main_dish: breakfastInfor.main_dish,
      imageURL: breakfastInfor.imageURL,
      rice: breakfastInfor.rice,
      meals: breakfastInfor.meals,
      sideDishForUserMenu: breakfastInfor.sideDishForUserMenu,
      kcal: breakfastInfor.kcal,
      protein: breakfastInfor.protein,
      carbohydrate: breakfastInfor.carbohydrate,
      fat: breakfastInfor.fat,
    },
    {
      main_dish: breakfastSnack.snack_or_tea,
      imageURL: breakfastSnack.imageURL,
      meals: breakfastSnack.meals,
      kcal: breakfastSnack.kcal,
      protein: breakfastSnack.protein,
      carbohydrate: breakfastSnack.carbohydrate,
      fat: breakfastSnack.fat,
    },
    {
      main_dish: lunchInfor.main_dish,
      imageURL: lunchInfor.imageURL,
      rice: lunchInfor.rice,
      meals: lunchInfor.meals,
      sideDishForUserMenu: lunchInfor.sideDishForUserMenu,
      kcal: lunchInfor.kcal,
      protein: lunchInfor.protein,
      carbohydrate: lunchInfor.carbohydrate,
      fat: lunchInfor.fat,
    },
    {
      main_dish: lunchSnack.snack_or_tea,
      imageURL: lunchSnack.imageURL,
      meals: lunchSnack.meals,
      kcal: lunchSnack.kcal,
      protein: lunchSnack.protein,
      carbohydrate: lunchSnack.carbohydrate,
      fat: lunchSnack.fat,
    },
    {
      main_dish: dinnerInfor.main_dish,
      imageURL: dinnerInfor.imageURL,
      rice: dinnerInfor.rice,
      meals: dinnerInfor.meals,
      sideDishForUserMenu: dinnerInfor.sideDishForUserMenu,
      kcal: dinnerInfor.kcal,
      protein: dinnerInfor.protein,
      carbohydrate: dinnerInfor.carbohydrate,
      fat: dinnerInfor.fat,
    },
  ];

  const settings = {
    dots: false,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    prevArrow: <></>,
    nextArrow: <></>,
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthStore.logout();
    } catch (error) {
      console.log("메인페이지 로그아웃 호출 에러", error);
    }
  };

  const openModal = (food: MealData) => {
    setSelectedFood(food);
  };

  const closeModal = () => {
    setSelectedFood(null);
  };

  const LoadingAnimation = () => {
    const [dots, setDots] = useState(".");

    useEffect(() => {
      const intervalId = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots.length < 3) {
            return prevDots + ".";
          } else {
            return ".";
          }
        });
      }, 500); // 500ms 간격으로 문자열 변경

      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
    }, []);

    return (
      <div className="LoadingAnimation">
        {`${userName}님`} 맞춤 식단 준비 중{dots} <br />
        잠시만 기다려주세요😄
      </div>
    );
  };

  // const replaceBreakfastAi = mealAiText?.breakfastAi.replace(/-/g, "\n");
  // const replaceBreakfastSnactAi = mealAiText?.breakfastSnackAi.replace(
  //   /-/g,
  //   "\n"
  // );
  // const replaceLunchAi = mealAiText?.lunchAi.replace(/-/g, "\n");
  // const replaceLunchSnackAi = mealAiText?.lunchSnackAi.replace(/-/g, "\n");
  // const replaceDinnerAi = mealAiText?.dinnerAi.replace(/-/g, "\n");

  // const convertMealsToKorean = (meals: string): string => {
  //   switch (meals) {
  //     case "BREAKFAST":
  //       return "아침식단";
  //     case "LUNCH":
  //       return "점심식단";
  //     case "DINNER":
  //       return "저녁식단";
  //     case "BREAKFAST_SNACKORTEA":
  //       return "아침간식";
  //     case "LUNCH_SNACKORTEA":
  //       return "점심간식";
  //     default:
  //       return meals;
  //   }
  // };
  console.log(selectedFood?.meals);
  const clickFavoritesMeal = async () => {
    try {
      const response = await CustomAxios.post(AuthStore.userID + "/bookmark", {
        meals: selectedFood?.meals,
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="MainPage_Container">
      <header>
        <p className="logo">Healing Meal</p>
        <div className="btn_Box">
          {isLoggedIn ? (
            <>
              <span
                className="user_name"
                onClick={clickMypage}
              >{`${userName}님`}</span>
              <button onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={clickLogin}>로그인</button>
              <button onClick={clickSignup}>회원가입</button>
            </>
          )}
        </div>
      </header>

      <div className="main_Container">
        <div className="infor_Container">
          <div className="image_box">
            <img src="../../public/images/mainPageCover.jpg" />
            <p className="main_img_text">Welcome to healing meal</p>
            <div className="image_box_div">
              {isLoggedIn ? (
                <>
                  {checkSurveyResult ? (
                    <button className="Main_img_btn" onClick={clickFavorites}>
                      나의 식단 즐겨찾기
                    </button>
                  ) : (
                    <button className="Main_img_btn" onClick={clicksurvey}>
                      나만의 식단찾기
                    </button>
                  )}
                </>
              ) : (
                <button className="Main_img_btn" onClick={clickLogin}>
                  로그인
                </button>
              )}
            </div>
          </div>
          <div className="Meal_box">
            <p className="Meal_box_user">
              {`${userName}님`} <span>&nbsp;당뇨 맞춤 식단</span>
            </p>
            <div className="Meal_infor">
              {loding ? (
                <LoadingAnimation />
              ) : (
                <>
                  <Slider {...settings} className="custom-slick-slider">
                    {foods.map((food, meal) => (
                      <MealComponent
                        key={meal}
                        food={food}
                        openModal={() => openModal(food)}
                      />
                    ))}
                  </Slider>
                </>
              )}
            </div>
          </div>
          <div data-aos="fade-up" className="kcal_box">
            <div className="chart_box">
              <div className="_kcal">칼로리: {ChartData().kcal}kcal</div>
              <div className="pieChart">
                <PieChartComponents
                  protein={ChartData().protein}
                  fat={ChartData().fat}
                  carbohydrate={ChartData().carbohydrate}
                />
              </div>
            </div>
            <div className="chart_infor">{`${userName}님`}</div>
          </div>
          {selectedFood && (
            <MealInforModal
              food={selectedFood}
              mealAiText={mealAiText}
              closeModal={closeModal}
              clickFavoritesMeal={clickFavoritesMeal}
            />

            // <div className="popup">
            //   <div className="Menu_box">
            //     <div className="popup_image">
            //       <img src={selectedFood.imageURL} />
            //     </div>
            //     <div className="Menu_info">
            //       <p>
            //         <span>식단:</span>{" "}
            //         {convertMealsToKorean(selectedFood.meals)}
            //       </p>
            //       <p>
            //         <span>대표메뉴:</span> {selectedFood.mainDish}
            //       </p>
            //       {selectedFood.rice && (
            //         <p>
            //           <span>밥:</span> {selectedFood.rice}
            //         </p>
            //       )}
            //       {selectedFood.sideDish && (
            //         <p>
            //           <span>반찬:</span> {selectedFood.sideDish.join(", ")}
            //         </p>
            //       )}
            //     </div>
            //   </div>
            //   <div className="NutritionInfo">
            //     <div className="NutritionInfo_Icon">
            //       <div className="mini_icon">
            //         <img src="../../public/images/kcal-icon.png" />
            //         <p className="IconName">칼로리</p>
            //         <p className="mini_text">{selectedFood.kcal}Kcal</p>
            //       </div>
            //       <div className="mini_icon">
            //         <img src="../../public/images/meat-icon.png" />
            //         <p className="IconName">단백질</p>
            //         <p className="mini_text">{selectedFood.protein}g</p>
            //       </div>
            //       <div className="mini_icon">
            //         <img src="../../public/images/bab-icon.png" />
            //         <p className="IconName">탄수화물</p>
            //         <p className="mini_text">{selectedFood.carbohydrate}g</p>
            //       </div>
            //       <div className="mini_icon">
            //         <img src="../../public/images/fat-icon.png" />
            //         <p className="IconName">지방</p>
            //         <p className="mini_text">{selectedFood.fat}g</p>
            //       </div>
            //     </div>
            //     <div className="NutritionInfo_ai">
            //       {selectedFood.meals === "BREAKFAST" &&
            //         replaceBreakfastAi
            //           ?.split("\n")
            //           .map((line, index) => <p key={index}>{line}</p>)}
            //       {selectedFood.meals === "BREAKFAST_SNACKORTEA" &&
            //         replaceBreakfastSnactAi
            //           ?.split("\n")
            //           .map((line, index) => <p key={index}>{line}</p>)}
            //       {selectedFood.meals === "LUNCH" &&
            //         replaceLunchAi
            //           ?.split("\n")
            //           .map((line, index) => <p key={index}>{line}</p>)}
            //       {selectedFood.meals === "LUNCH_SNACKORTEA" &&
            //         replaceLunchSnackAi
            //           ?.split("\n")
            //           .map((line, index) => <p key={index}>{line}</p>)}
            //       {selectedFood.meals === "DINNER" &&
            //         replaceDinnerAi
            //           ?.split("\n")
            //           .map((line, index) => <p key={index}>{line}</p>)}
            //     </div>
            //   </div>
            //   <div className="closePopUp">
            //     <button className="favorites_btn" onClick={clickFavoritesMeal}>
            //       즐겨찾기
            //     </button>
            //     <button className="close_Btn" onClick={closeModal}>
            //       X
            //     </button>
            //   </div>
            // </div>
          )}
        </div>
      </div>
      {/* <footer className="MainPage_footer">
        <p className="footer_text">Sungkonghoe University GDSC </p>
      </footer> */}
    </div>
  );
});

export default MainPage;
