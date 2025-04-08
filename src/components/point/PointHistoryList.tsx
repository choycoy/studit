import useIntersect from "@/hooks/useIntersect";
import { toMonthDay, formatTimeToAMPM } from "@/utils/commonUtils";
import React from "react";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import emptyPointIcon from "@/assets/imgs/empty-point.png";
import { PointFilterType } from "@/types/interface";
import { useState, useCallback } from "react";
import { POINTFILTERS } from "@/constants";
import useGetPointHistory from "@/hooks/point/useGetPointHistory";

function PointHistoryList({ userId }: { userId: number }) {
  const [selectedFilter, setSelectedFilter] = useState<PointFilterType>("전체");
  const { pointHistory, isHistoryLoading, fetchNextPage, hasNextPage } = useGetPointHistory(userId, selectedFilter);
  const handleFilterClick = useCallback((filter: PointFilterType) => {
    setSelectedFilter(filter);
  }, []);
  const { setTarget } = useIntersect({
    hasNextPage,
    fetchNextPage,
  });

  if (!pointHistory || isHistoryLoading) return null;

  return (
    <section className="flex flex-col py-2 w-full px-4">
      <div className="mb-2 flex gap-x-1.5 text-sm">
        {POINTFILTERS.map((pointFilter) => {
          return (
            <button
              key={pointFilter}
              onClick={() => handleFilterClick(pointFilter)}
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
        pointHistory.map((pointItem, index) => {
          const isLastItem = index === pointHistory.length - 1;
          return (
            <div key={index} className="mb-1.5">
              <p className="mb-1.5 text-xs">{toMonthDay(pointItem.date)}</p>
              <ul className="flex flex-col gap-y-2">
                {pointItem.records.map((pointRecord) => {
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
        })
      ) : (
        <div className="mt-12 flex h-full items-start justify-center gap-x-2.5">
          <p className="bg-grey-01 mt-2 rounded-full px-2 py-1">{selectedFilter} 포인트 내역이 없어요.</p>
          <img src={emptyPointIcon} alt="스터딧 캐릭터" className="w-20" />
        </div>
      )}
    </section>
  );
}
export default React.memo(PointHistoryList);
