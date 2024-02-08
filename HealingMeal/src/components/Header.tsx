import { Link } from "react-router-dom";
import "../styles/Myinfor.module.less";

const Header = () => {
  return (
    <header>
      <p className="logo">
        <Link to="/">Healing Meal</Link>
      </p>
    </header>
  );
};

export default Header;
