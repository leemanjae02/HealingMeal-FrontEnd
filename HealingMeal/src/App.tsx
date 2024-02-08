import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import FindIDPage from "./pages/FindID";
import FindPWPage from "./pages/FindPW";
import SurveyPage from "./pages/SurveyPage";
import MyPage from "./pages/MyPage";
import FavoritesComponents from "./components/FavoritesComponents";
import MyInforChangeComponents from "./components/MyInforChangeComponents";

function App() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />}>
        <Route path="favorites" element={<FavoritesComponents />} />
        <Route path="change" element={<MyInforChangeComponents />} />
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
