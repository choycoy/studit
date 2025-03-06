import logoImg from "@/assets/imgs/logo.png";
import MenuIcon from "@/assets/icons/hamburger-menu.svg";
import { overlay } from "overlay-kit";
import Menu from "./Menu";
import { Link } from "react-router-dom";

export default function Header() {
  const onClick = () => {
    overlay.open(({ isOpen, close }) => {
      return <Menu isOpen={isOpen} close={close} />;
    });
  };
  return (
    <header className="max-w-3xl w-full h-[52px] bg-main px-4 flex items-center justify-between">
      <Link to={"/"}>
        <img src={logoImg} alt="스터딧 로고" className="w-[87px] h-[18px]" />
      </Link>
      <button aria-label="메뉴" onClick={onClick} className="cursor-pointer">
        <MenuIcon alt="메뉴" />
      </button>
    </header>
  );
}
