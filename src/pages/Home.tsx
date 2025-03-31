import { useEffect, useState } from "react";
import aiApis from "@/service/aiApis";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import Slider from "react-slick";
import useGetPopular from "@/hooks/home/useGetPopular";
import { Link } from "react-router-dom";
import { StudyItem } from "@/types/interface";

export default function Home() {
  const [sortedContents, setSortedContents] = useState<StudyItem[]>([]);
  const navigate = useNavigate();
  const { popularStudies, isPopularLoading } = useGetPopular();

  useEffect(() => {
    const fetchContents = async () => {
      const contentsData = await aiApis.getStudyList();
      const targetContentData = { category: "공무원", tags: ["행정"] };
      const worker = new Worker(new URL("../ai/contentWorker.ts", import.meta.url), { type: "module" });

      worker.postMessage({ targetContentData, contentsData });

      worker.onmessage = (event) => {
        const sortedContents = event.data;
        setSortedContents(sortedContents);
      };

      return () => worker.terminate();
    };
    fetchContents();
  }, []);

  if (!popularStudies || isPopularLoading) return null;

  const banners = [
    {
      text: "같이 시작하자,\n더 이상 미룰 순 없다.",
      buttonText: "스터디 목록",
      link: "/study-lounge",
    },
    {
      text: "성공 아니면 차감!\n포인트는 승자에게!",
      buttonText: "포인트 조회",
      link: "/point",
    },
  ];

  const setting4Banner = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 6000,
    draggable: true,
    swipe: true,
    touchMove: true,
  };

  const setting4Popular = {
    slidesToShow: 2.5,
    slidesToScroll: 2,
    infinite: true,
    swipe: true,
    arrows: false,
    variableWidth: true,
  };

  return (
    <div className="px-4">
      <Slider {...setting4Banner}>
        {banners.map((banner, index) => {
          return (
            <button
              key={index}
              aria-label={banner.buttonText}
              onClick={() => navigate(banner.link)}
              className={`mt-0.5 flex w-full h-[130px] cursor-pointer justify-between rounded text-white ${
                index === 1 ? "bg-[#6997E0]" : "bg-main"
              } px-4`}
            >
              <div className="flex flex-col justify-between py-2.5 h-full">
                <p className="text-left text-2xl font-bold whitespace-pre-line">{banner.text}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-1">
                    <span className="text-sm font-medium">{banner.buttonText}</span>
                    <ChevronRightIcon alt="화살표" className="h-3 w-1.5" />
                  </div>
                  <span className="text-xs font-normal">
                    {index + 1} / {banners.length}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </Slider>
      <section className="mt-3">
        <h1 className="font-medium mb-1.5">지금 인기 있는 스터디에요</h1>
        <Slider {...setting4Popular}>
          {popularStudies.map((study: StudyItem) => {
            const { img, title, roomId, goalTime, dayBeforeStart, status } = study;

            return (
              <Link to="" key={roomId} className="!w-32 relative !mr-2.5 text-xs">
                <img src={img} alt={title} className="w-32 h-32 study-img" />
                <p className="mt-1 text-sm font-medium">{title}</p>

                <p className="text-grey-03">{dayBeforeStart === 1 ? "내일" : `${dayBeforeStart}일 뒤`} 시작</p>
                <div className="flex items-center gap-x-1 text-xs">
                  <span className="bg-[#F1A6A6] text-white rounded-full py-0.5 px-1">주 {goalTime}시간</span>
                  <span className="text-main font-medium">{status === "RECRUITING" ? "모집중" : "진행중"}</span>
                </div>
              </Link>
            );
          })}
        </Slider>
      </section>
      <section className="my-3 h-96">
        <h2 className="font-medium mb-1.5">지식 헌터님을 위한 스터디에요!</h2>
        <div className="flex flex-col gap-y-1">
          {sortedContents.slice(0, 3).map((content) => {
            const { roomId, goalTime, img, title, dayBeforeStart, status, category } = content;

            return (
              <div key={roomId} className="flex gap-x-2">
                <img src={img} className="w-20 h-20 study-img" alt={title} />
                <div className="flex flex-col items-start text-sm">
                  <div className="flex items-center gap-x-0.5 font-medium">
                    <span className="bg-[#F72C5B] text-white rounded-full py-0.5 px-1 text-xs">주 {goalTime}시간</span>
                    <span className="bg-[#F72C5B] text-white rounded-full py-0.5 px-1 text-xs">{category}</span>
                  </div>
                  <div className="flex gap-x-1">
                    <p className="font-medium">{title}</p>
                    <p className="text-main font-medium">{status === "RECRUITING" ? "모집중" : "진행중"}</p>
                  </div>
                  <p className="text-grey-03">{dayBeforeStart === 1 ? "내일" : `${dayBeforeStart}일 뒤`} 시작</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
