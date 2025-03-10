import { useState, useEffect } from "react";
import ArrowUpIcon from "@/assets/icons/arrow-up.svg";

export default function ScrollToTopBtn({ hasBanner = false }: { hasBanner?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: -52,
      behavior: "smooth",
    });
  };
  return (
    <>
      {isVisible && (
        <button
          aria-label="페이지 상단으로 이동"
          onClick={scrollToTop}
          className={`bg-main fixed right-4 flex h-[30px] w-[30px] items-center justify-center rounded-full shadow-md ${
            hasBanner ? "top-8" : "bottom-8"
          }`}
        >
          <ArrowUpIcon alt="화살표" className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
