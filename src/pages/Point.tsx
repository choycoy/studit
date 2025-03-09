import { PointFilterType, PointRecord } from "@/types/interface";
import { useState } from "react";
import { overlay } from "overlay-kit";
import WithdrawModal from "@/components/point/WithdrawModal";
import useGetUserPoints from "@/hooks/point/useGetUserPoints";
import PointIcon from "@/assets/icons/point.svg";
import { POINTFILTERS } from "@/constants";
import useGetPointHistory from "@/hooks/point/useGetPointHistory";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import { toMonthDay, formatTimeToAMPM } from "@/utils/commonUtils";
import emptyPointIcon from "@/assets/imgs/empty-point.png";
import useIntersect from "@/hooks/useIntersect";

export default function Point() {
  const userId = 1;
  const { userPoints, isUserPointsLoading } = useGetUserPoints(userId);
  const [selectedFilter, setSelectedFilter] = useState<PointFilterType>("전체");
  const { pointHistory, isHistoryLoading, fetchNextPage, hasNextPage } = useGetPointHistory(userId, selectedFilter);
  const { setTarget } = useIntersect({
    hasNextPage,
    fetchNextPage,
  });

  if (!userPoints || isUserPointsLoading || !pointHistory || isHistoryLoading) return null;

  const { totalPoints, totalRewardPoints, totalDeductedPoints, totalWithdrawnPoints } = userPoints;
  const openOverlay = () => {
    overlay.open(({ isOpen, close }) => {
      return <WithdrawModal userId={userId} isOpen={isOpen} close={close} currentPoint={totalPoints} />;
    });
  };
  return (
    <div className="flex flex-col items-center">
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
      <div className="bg-main h-1.5 w-full" />
      <section className="flex flex-col py-2 w-full px-4">
        <div className="mb-2 flex gap-x-1.5 text-sm">
          {POINTFILTERS.map((pointFilter) => {
            return (
              <button
                key={pointFilter}
                onClick={() => setSelectedFilter(pointFilter)}
                className={`rounded-full border px-2 py-[2px] transition-colors cursor-pointer ${
                  selectedFilter === pointFilter ? "bg-main border-main text-white" : "border-grey-01 hover:bg-grey-01"
                }`}
              >
                {pointFilter}
              </button>
            );
          })}
        </div>
        {pointHistory.length > 0 ? (
          <div>
            {pointHistory.map((pointItem, index) => {
              const isLastItem = index === pointHistory.length - 1;
              return (
                <div key={index} className="mb-1.5">
                  <p className="mb-1.5 text-xs">{toMonthDay(pointItem.date)}</p>
                  <ul className="flex flex-col gap-y-2">
                    {pointItem.records.map((pointRecord: PointRecord) => {
                      const { id, type, time, amount, total_after } = pointRecord;

                      const Icon = ["충전", "환불", "보상"].includes(type) ? PlusIcon : MinusIcon;
                      const typeClass =
                        type === "충전"
                          ? "text-charge"
                          : type === "환불"
                          ? "text-grey-05"
                          : type === "보상"
                          ? "text-main"
                          : type === "차감"
                          ? "text-deduct"
                          : "text-withdraw";
                      const sign = ["충전", "환불", "보상"].includes(type) ? "+" : "-";
                      const ref = isLastItem ? setTarget : null;
                      return (
                        <li ref={ref} key={id} className="flex items-center text-sm">
                          <Icon alt={type} className={`h-6 w-6 ${typeClass}`} />
                          <div className="ml-2 flex flex-col">
                            <span className="font-medium">
                              {amount.toLocaleString()} P {type}
                            </span>
                            <span className="text-xs">{formatTimeToAMPM(time)}</span>
                          </div>
                          <div className="ml-auto flex flex-col items-end">
                            <span className={`font-bold ${typeClass}`}>
                              {sign} {amount.toLocaleString()} P
                            </span>
                            <span className="text-xs">{total_after.toLocaleString()} P</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 flex h-full items-start justify-center gap-x-2.5">
            <p className="bg-grey-01 mt-2 rounded-full px-2 py-1">{selectedFilter} 포인트 내역이 없어요.</p>
            <img src={emptyPointIcon} alt="스터딧 캐릭터" className="w-20" />
          </div>
        )}
      </section>
    </div>
  );
}
