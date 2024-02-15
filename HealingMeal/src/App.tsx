import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import FindIDPage from "./pages/FindID.tsx";
import FindPWPage from "./pages/FindPW.tsx";
import SurveyPage from "./pages/SurveyPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import FavoritesComponents from "./components/FavoritesComponents.tsx";
import MyInforChangeComponents from "./components/MyInforChangeComponents.tsx";

function App() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />}>
        <Route path="favorites" element={<FavoritesComponents />} />
        <Route path="change" element={<MyInforChangeComponents loginID="" />} />
      </Route>

      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/findpw" element={<FindPWPage />} />
      <Route path="/findid" element={<FindIDPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
