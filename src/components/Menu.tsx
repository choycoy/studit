import logoImg from "@/assets/imgs/s-logo.png";
import { Link } from "react-router-dom";
import kakaoLogo from "@/assets/imgs/kakao-logo.png";
import CloseIcon from "@/assets/icons/close.svg";

export default function Menu({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  return (
    <section
      className={`fixed top-0 left-0 w-full h-full bg-main text-white z-50 transition-transform duration-300 flex flex-col justify-between ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex gap-x-[18px] ml-7 mt-[84px]">
        <img src={logoImg} alt="스터딧 로고" className="w-[61px] h-[59px]" />
        <h1 className="text-[22px] font-bold">
          입금해라, 공부할 것이다
          <br />
          <span className="rammetto-one-regular">STUDIT</span>
        </h1>
      </div>
      <ul className="ml-10 flex flex-col gap-y-5 text-lg">
        <li className="hover:text-grey-01 transition-colors">
          <Link to={"/"}>홈</Link>
        </li>
        <li className="hover:text-grey-01 transition-colors">
          <Link to={"/study-lounge"}>스터디 라운지</Link>
        </li>
        <li className="hover:text-grey-01 transition-colors">
          <Link to={"/my-page"}>마이 페이지</Link>
        </li>
      </ul>
      <button className="cursor-pointer flex justify-center w-[343px] bg-[#FEE500] h-[44px] items-center mx-4 rounded-full mb-[52px] hover:grayscale-[35%]">
        <img alt="카카오 로고" src={kakaoLogo} />
        <span className="ml-2 text-black opacity-85 font-bold">3초만에 카카오톡으로 시작하기</span>
      </button>
      <button className="fixed top-6 right-5 z-50 cursor-pointer" aria-label="메뉴 닫기" onClick={close}>
        <CloseIcon alt="메뉴 닫기" className="hover:text-grey-01 transition-colors" />
      </button>
    </section>
  );
}
