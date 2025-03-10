import { useLocation, useNavigate } from "react-router-dom";
import { StudyStatusType, StudyItemType, CompletedStudyItem } from "@/types/interface";
import useGetMyStudyList from "@/hooks/my-page/useGetMyStudyList";
import useIntersect from "@/hooks/useIntersect";
import PointIcon from "@/assets/icons/point.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import banner from "@/assets/imgs/banner.png";
import emptyImg from "@/assets/imgs/empty-study-list.png";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";

export default function MyStudyList() {
  const userId = 1;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studyType: StudyStatusType = (queryParams.get("status") as StudyStatusType) || "upcoming";
  const title =
    studyType === "upcoming"
      ? "참여할 스터디 목록"
      : studyType === "ongoing"
      ? "참여 중인 스터디 목록"
      : studyType === "completed"
      ? "완료한 스터디 목록"
      : "";
  const emptyText =
    studyType === "upcoming"
      ? "시작 전인 스터디"
      : studyType === "ongoing"
      ? "진행 중인 스터디"
      : studyType === "completed"
      ? "완료한 스터디"
      : "";
  const { studyList, isLoading, fetchNextPage, hasNextPage } = useGetMyStudyList(userId, studyType);
  const { setTarget } = useIntersect({ hasNextPage, fetchNextPage });
  const navigate = useNavigate();

  if (!studyList || isLoading) return null;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-52px)]">
      {studyList.length > 0 ? (
        <section className={`flex flex-col justify-between px-4 pt-2 pb-5 ${studyList.length <= 4 ? "h-full" : ""}`}>
          <div className="flex flex-col gap-y-2">
            {studyList.map((studyItem: StudyItemType, index: number) => {
              const isLastItem = index === studyList.length - 1;
              const { gatherDate, title, enterPoint, tag, weeklyStudyTime, category } = studyItem;
              const isCompletedStudy = (study: StudyItemType): study is CompletedStudyItem => {
                return "studyId" in study;
              };
              const isOngoingStudy = (study: StudyItemType): study is CompletedStudyItem => {
                return "registerId" in study;
              };

              const ref = isLastItem ? setTarget : null;
              const getStudyItemId = (studyItem: StudyItemType): number | undefined => {
                if ("recruit_id" in studyItem) {
                  return studyItem.recruit_id;
                } else if ("registerId" in studyItem) {
                  return studyItem.registerId;
                } else if ("studyId" in studyItem) {
                  return studyItem.studyId;
                }
                return undefined;
              };
              const studyItemContent = (
                <div
                  className={`border-main flex w-full flex-col gap-y-1 rounded-sm border px-2.5 py-2 text-sm ${
                    isCompletedStudy(studyItem) || isOngoingStudy(studyItem) ? "h-[110px]" : "h-[87px]"
                  }`}
                >
                  <div className="flex justify-between text-xs font-medium">
                    <div className="flex gap-x-1">
                      <div className="border-grey-01 flex items-center gap-x-[2px] rounded-full border px-1 py-[2px]">
                        <PointIcon alt="포인트" className="h-3.5 w-3.5" />
                        <span>{enterPoint.toLocaleString()}</span>
                      </div>
                      <span className="border-grey-01 rounded-full border px-1 py-[2px]">{category}</span>
                      <span className="border-grey-01 rounded-full border px-1 py-[2px]">{tag}</span>
                    </div>
                    <span className="text-main text-sm font-bold">주 {weeklyStudyTime}시간</span>
                  </div>
                  <p className="text-left font-medium">{title}</p>
                  <p className="text-grey-04 text-left">스터디 기간: {gatherDate}</p>
                  {isCompletedStudy(studyItem) || isOngoingStudy(studyItem) ? (
                    <div className="flex gap-x-2.5">
                      <span>
                        획득한 포인트:{" "}
                        <span className="text-charge font-bold">{studyItem.obtainedPoint.toLocaleString()} P</span>
                      </span>
                      <span>
                        차감된 포인트:{" "}
                        <span className="text-deduct font-bold">{studyItem.deductedPoint.toLocaleString()} P</span>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
              if (isCompletedStudy(studyItem)) {
                return <div key={index}>{studyItemContent}</div>;
              }

              return (
                <button
                  key={index}
                  ref={ref}
                  onClick={() => {
                    if (studyType === "upcoming") navigate(`../recruit/${getStudyItemId(studyItem)}`);
                    else if (studyType === "ongoing") navigate(`../study/${getStudyItemId(studyItem)}`);
                  }}
                  className="cursor-pointer"
                >
                  {studyItemContent}
                </button>
              );
            })}
          </div>
          <button
            aria-label="스터디 목록으로 이동"
            onClick={() => navigate("/")}
            className="mt-4 flex w-full cursor-pointer justify-between rounded bg-gradient-to-tr from-[#C2FBDB] to-[#EBC9E9] px-4 py-2 text-[#000000]"
          >
            <div className="flex flex-col justify-between py-2">
              <p className="text-left text-2xl font-bold">입금해라 공부할 것이다</p>
              <div className="flex items-center gap-x-1">
                <span className="text-sm"> 스터디 목록 보러가기 </span>
                <ChevronRight alt="스터디 목록 화살표" className="h-auto w-1.5" />
              </div>
            </div>
            <img src={banner} alt="배너" className="h-auto w-[54px]" />
          </button>
        </section>
      ) : (
        <section className="flex flex-col items-center h-full justify-center px-4">
          <p className="mb-5 text-center">
            아직 {emptyText}가 없어요.
            <br />
            함께할 스터디를 찾아볼까요?
          </p>
          <img src={emptyImg} alt={`빈 ${title}`} className="h-auto w-[76px]" />
          <button onClick={() => navigate("/")} className="mt-10 button">
            스터디 보러가기
          </button>
        </section>
      )}
      <ScrollToTopBtn hasBanner />
    </div>
  );
}
