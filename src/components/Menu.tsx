import kakaoLogo from "@/assets/imgs/kakao-logo.png";
import CloseIcon from "@/assets/icons/close.svg";
import { useNavigate } from "react-router-dom";

export default function Menu({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const navigate = useNavigate();

  return (
    <section
      className={`fixed top-0 left-0 w-full h-full bg-main text-white z-50 transition-transform duration-300 flex flex-col justify-between ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h1 className="text-2xl font-bold ml-7 mt-[84px]">
        입금해라, 공부할 것이다
        <br />
        <span className="bagel-fat-one-regular">STUDIT</span>
      </h1>
      <ul className="ml-10 flex flex-col gap-y-5 text-lg">
        <li>
          <button
            className="cursor-pointer hover:text-grey-01 transition-colors"
            onClick={() => {
              close();
              navigate("/");
            }}
          >
            홈
          </button>
        </li>
        <li>
          <button
            className="cursor-pointer hover:text-grey-01 transition-colors"
            onClick={() => {
              close();
              navigate("/study-lounge");
            }}
          >
            스터디 라운지
          </button>
        </li>
        <li>
          <button
            className="cursor-pointer hover:text-grey-01 transition-colors"
            onClick={() => {
              close();
              navigate("/my-page");
            }}
          >
            마이 페이지
          </button>
        </li>
      </ul>
      <button className="cursor-pointer flex justify-center w-[343px] bg-[#FEE500] h-[44px] items-center mx-auto rounded-full mb-[52px] hover:grayscale-[35%]">
        <img alt="카카오 로고" src={kakaoLogo} />
        <span className="ml-2 text-black opacity-85 font-medium">3초만에 카카오톡으로 시작하기</span>
      </button>
      <button className="fixed top-6 right-5 z-50 cursor-pointer" aria-label="메뉴 닫기" onClick={close}>
        <CloseIcon alt="메뉴 닫기" className="hover:text-grey-01 transition-colors" />
      </button>
    </section>
  );
}
