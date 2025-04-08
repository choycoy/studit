import TotalPointSection from "@/components/point/TotalPointSection";
import useGetUserPoints from "@/hooks/point/useGetUserPoints";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import PointHistoryList from "@/components/point/PointHistoryList";

export default function Point() {
  const userId = 1;
  const { userPoints, isUserPointsLoading } = useGetUserPoints(userId);

  if (!userPoints || isUserPointsLoading) return null;

  return (
    <div className="flex flex-col items-center">
      <TotalPointSection userId={userId} userPoints={userPoints} />
      <div className="bg-main h-1.5 w-full" />
      <PointHistoryList userId={userId} />
      <ScrollToTopBtn />
    </div>
  );
}
