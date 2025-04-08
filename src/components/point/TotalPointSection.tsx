import PointIcon from "@/assets/icons/point.svg";
import { overlay } from "overlay-kit";
import WithdrawModal from "./WithdrawModal";
import { IUserPoints } from "@/types/interface";

export default function TotalPointSection({ userId, userPoints }: { userId: number; userPoints: IUserPoints }) {
  const { totalPoints, totalRewardPoints, totalDeductedPoints, totalWithdrawnPoints } = userPoints;
  const openOverlay = () => {
    overlay.open(({ isOpen, close }) => {
      return <WithdrawModal userId={userId} isOpen={isOpen} close={close} currentPoint={totalPoints} />;
    });
  };

  return (
    <section className="py-3 w-[311px] box-content">
      <div className="mb-2 flex items-center justify-between px-4">
        <div>
          <div className="flex items-center gap-x-1">
            <PointIcon alt="포인트" />
            <h1 className="text-lg font-medium">보유한 포인트</h1>
          </div>
          <h2 className="ml-7 text-xl font-bold">{totalPoints.toLocaleString()} P</h2>
        </div>
        <button onClick={openOverlay} className="btn-sm">
          출금하기
        </button>
      </div>
      <ul className="flex w-full items-center justify-between text-sm">
        <li className="flex grow flex-col items-center gap-y-1.5 border-r border-grey-05">
          <span>총 보상 포인트</span>
          <span className="font-medium">{totalRewardPoints.toLocaleString()} P</span>
        </li>
        <li className="flex grow flex-col items-center gap-y-1.5 border-r border-grey-05">
          <span>총 차감 포인트</span>
          <span className="font-medium">{totalDeductedPoints.toLocaleString()} P</span>
        </li>
        <li className="flex grow flex-col items-center gap-y-1.5">
          <span>총 출금 포인트</span>
          <span className="font-medium">{totalWithdrawnPoints.toLocaleString()} P</span>
        </li>
      </ul>
    </section>
  );
}
