import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import FindIDPage from "./pages/FindID";
import FindPWPage from "./pages/FindPW";

function App() {
  return (
    <Routes>
      <Route path="/findpw" element={<FindPWPage />} />
      <Route path="/findid" element={<FindIDPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
