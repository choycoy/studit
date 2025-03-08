import EditIcon from "@/assets/icons/edit.svg";
import { Link } from "react-router-dom";
import useGetProfile from "@/hooks/my-page/useGetProfile";
import { overlay } from "overlay-kit";
import ProfileModifyModal from "@/components/my-page/ProfileModifyModal";
import ChargeModal from "@/components/my-page/ChargeModal";
import { useNavigate } from "react-router-dom";
import ThreeDotsLoader from "@/components/my-page/ThreeDotsLoader";
import useGetStats from "@/hooks/my-page/useGetStats";
import { BarChart, Bar, YAxis } from "recharts";

export default function MyPage() {
  const userId = 1;
  const { userData, isUserDataLoading } = useGetProfile(userId);
  const { averageStats, isAvgLoading } = useGetStats(userId);
  const navigate = useNavigate();
  if (!userData || isUserDataLoading || !averageStats || isAvgLoading) return null;

  const { nickname, profileImage, points, applied, in_progress, completed } = userData;
  const { averageTodoCompletion, userTodoCompletion, userGoalRate, averageGoalRate } = averageStats;
  const todoData = [
    {
      value1: averageTodoCompletion,
      value2: userTodoCompletion || 0,
    },
  ];
  const studyTimeData = [
    {
      value1: averageGoalRate,
      value2: userGoalRate || 0,
    },
  ];
  const todoDiff = Math.abs(averageTodoCompletion - (userTodoCompletion || 0));
  const studyTimeDiff = Math.abs(averageGoalRate - (userGoalRate || 0));
  const todoComparison = averageTodoCompletion - (userTodoCompletion || 0);
  const studyTimeComparison = averageGoalRate - (userGoalRate || 0);

  const openModifyModal = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <ProfileModifyModal userImg={profileImage} nickname={nickname} isOpen={isOpen} close={close} userId={userId} />
      );
    });
  };
  const openChargePoint = () => {
    overlay.open(({ isOpen, close }) => {
      return <ChargeModal isOpen={isOpen} close={close} currentPoint={points} userId={userId} />;
    });
  };

  return (
    <div className="flex h-full flex-col px-4 pt-4 pb-7">
      <section className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <img src={profileImage} alt={nickname + "프로필"} className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-y-0.5">
            <div className="flex items-center gap-x-1.5">
              <span className="font-bold">{nickname}</span>
              <button
                aria-label="프로필 변경"
                className="hover:text-grey-04 cursor-pointer rounded-full p-1 transition-colors"
                onClick={openModifyModal}
              >
                <EditIcon alt="프로필 변경" className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-x-1">
              <p>
                보유한 포인트: <span className="font-bold text-main">{points.toLocaleString()} P</span>
              </p>
            </div>
          </div>
        </div>
        <button className="btn-sm justify-self-end" onClick={openChargePoint}>
          충전하기
        </button>
      </section>
      <section className="my-3 text-sm">
        <p className="mb-2 font-medium">스터디 현황</p>
        <div className="border-grey-02 flex w-full justify-around rounded-md border py-2">
          <Link className="flex cursor-pointer flex-col items-center" to="/my-study?status=upcoming">
            <span className="font-medium">시작 전</span>
            <span className="text-main font-bold">{applied}</span>
          </Link>
          <Link className="flex cursor-pointer flex-col items-center" to="/my-study?status=ongoing">
            <span className="font-medium">진행 중</span>
            <span className="text-main font-bold">{in_progress}</span>
          </Link>
          <Link className="flex cursor-pointer flex-col items-center" to="/my-study?status=completed">
            <span className="font-medium">완료</span>
            <span className="text-main font-bold">{completed}</span>
          </Link>
        </div>
      </section>
      <section className="text-sm">
        <p className="mb-3 font-medium">지난 일주일 동안 {nickname}님은 다른 사용자들보다</p>
        <div className="flex justify-between">
          <div className="flex flex-col items-center gap-y-1">
            <div className="border-grey-02 relative flex h-[152px] w-[152px] grow flex-col items-center justify-center rounded-lg border">
              {userTodoCompletion ? (
                <div className="flex flex-col items-center">
                  <BarChart data={todoData} width={52} height={100}>
                    <YAxis domain={[0, 100]} hide />
                    <Bar dataKey="value1" className="fill-grey-02" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="value2" className="fill-main" radius={[2, 2, 0, 0]} />
                  </BarChart>
                  <p className="text-center">
                    <span className="text-main font-bold">{todoDiff}% </span>
                    {todoComparison < 0 ? "더 많은" : "더 적은"}
                    <br /> 투두를 완료했어요
                  </p>
                </div>
              ) : (
                <div className={`flex flex-col items-center gap-y-12 ${!userGoalRate && "mt-8"}`}>
                  <ThreeDotsLoader />
                  <p className="text-center">
                    데이터가 <br />
                    쌓이는 중이에요
                  </p>
                </div>
              )}
            </div>
            {userTodoCompletion && (
              <p>
                나의 투두 달성률: <span className="font-bold text-main">{userTodoCompletion}%</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <div className="border-grey-02 relative flex h-[152px] w-[152px] grow flex-col items-center justify-center rounded-lg border">
              {userGoalRate ? (
                <div className="flex flex-col items-center">
                  <BarChart data={studyTimeData} width={52} height={100}>
                    <YAxis domain={[0, 100]} hide />
                    <Bar dataKey="value1" className="fill-grey-02" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="value2" className="fill-main" radius={[2, 2, 0, 0]} />
                  </BarChart>
                  <p className="text-center">
                    <span className="text-main font-bold">{studyTimeDiff}% </span>
                    {studyTimeComparison < 0 ? "더 " : "적게 "} 목표 시간을
                    <br />
                    달성 했어요
                  </p>
                </div>
              ) : (
                <div className={`flex flex-col items-center gap-y-12 ${!userGoalRate && "mt-8"}`}>
                  <ThreeDotsLoader />
                  <p className="text-center">
                    데이터가 <br />
                    쌓이는 중이에요
                  </p>
                </div>
              )}
            </div>
            {userGoalRate && (
              <p>
                나의 목표 시간 달성률: <span className="font-bold text-main">{userGoalRate}%</span>
              </p>
            )}
          </div>
        </div>
      </section>
      <button onClick={() => navigate("/point")} className="button mt-4">
        포인트 출금하고 내역을 볼 수 있어요
      </button>
    </div>
  );
}
