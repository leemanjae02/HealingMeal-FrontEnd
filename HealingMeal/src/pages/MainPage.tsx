import { useEffect, useState } from "react";
import "../styles/MainPage.less";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../api/Axios";
import MealComponent from "../components/MealInfor";
import Slider from "react-slick";
import "slick-carousel/slick/slick.less";
import AOS from "aos";
import "aos/dist/aos.css";

document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
  AOS.refresh();
});

const MainPage = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<{
    foodName: string;
    imageURL: string;
  } | null>(null);

  useEffect(() => {
    const isLoginCheck = async () => {
      try {
        const response = await CustomAxios.get("/user/confirm", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserName(response.data);
          setLoginCheck(true);
        }
      } catch (error) {
        setUserName("OOO");
        console.log(error);
      }
    };
    isLoginCheck();
  }, []);

  const clickLogin = () => {
    navigate("/login");
  };

  const clicksurvey = () => {
    navigate("/survey");
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  const foods = [
    { foodName: "계란말이", imageURL: "../../public/images/foodtest.png" },
    { foodName: "갈비구이", imageURL: "../../public/images/foodtest.png" },
    { foodName: "꽃게탕", imageURL: "../../public/images/foodtest.png" },
    { foodName: "짜장면", imageURL: "../../public/images/foodtest.png" },
    { foodName: "뚝배기불고기", imageURL: "../../public/images/foodtest.png" },
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
      const response = await CustomAxios.get("/user/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLoginCheck(false);
        setUserName("OOO");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (food: { foodName: string; imageURL: string }) => {
    setSelectedFood(food);
  };

  const closeModal = () => {
    setSelectedFood(null);
  };

  return (
    <div className="MainPage_Container">
      <header>
        <p className="logo">Healing Meal</p>
        <div className="btn_Box">
          {loginCheck ? (
            <>
              <span className="user_name">{`${userName}님`}</span>
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
              {loginCheck ? (
                <>
                  <button className="Main_img_btn" onClick={clicksurvey}>
                    나만의 식단찾기
                  </button>
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
              <Slider {...settings} className="custom-slick-slider">
                {foods.map((food, index) => (
                  <MealComponent
                    key={index}
                    food={food}
                    openModal={() => openModal(food)}
                  />
                ))}
              </Slider>
            </div>
          </div>
          <div data-aos="fade-up" className="kcal_box"></div>
          {selectedFood && (
            <div className="popup">
              <div className="Menu_box">
                <div className="popup_image">
                  <img src={selectedFood.imageURL} />
                </div>
                <div className="Menu_info">
                  <p>대표메뉴 {selectedFood.foodName}</p>
                  * 밥 <br />
                  * 국 <br />
                  * 반찬 <br />
                </div>
              </div>
              <div className="Meal2_box">
                * 영양정보 <br />
                * 영양정보 <br />
                * 영양정보 <br />
                * 영양정보 <br />
              </div>
              <div className="closePopUp">
                <button className="closeBtn" onClick={closeModal}>
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <footer className="MainPage_footer">
        <p className="footer_text">Sungkonghoe University GDSC </p>
      </footer> */}
    </div>
  );
};

export default MainPage;
