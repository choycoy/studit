import ModalOverlay from "../ModalOverlay";
import CloseIcon from "@/assets/icons/close.svg";
import { handleKeyDown } from "../../utils/commonUtils";
import useWithdrawPoint from "@/hooks/point/useWithdrawPoint";
import { useState } from "react";

export default function WithdrawModal({
  userId,
  isOpen,
  close,
  currentPoint,
}: {
  userId: number;
  isOpen: boolean;
  close: () => void;
  currentPoint: number;
}) {
  const [inputPoint, setInputPoint] = useState(0);
  const [shaking, setShaking] = useState(false);
  // const { showToast } = useToastStore();
  const { withdrawPoint } = useWithdrawPoint(inputPoint, userId);
  const isInputInValid = inputPoint < 1000 || inputPoint % 1000 !== 0;
  const [notification, setNotification] = useState("*출금은 1,000P 단위로 가능해요");

  const handleInput = () => {
    if (isInputInValid) {
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
    } else if (currentPoint < inputPoint) {
      setNotification("포인트가 부족해요.");
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
    } else {
      withdrawPoint();
      // showToast(inputPoint.toLocaleString() + ' P가 출금됐어요 !', false);
      close();
    }
  };
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <section className="modal-container">
        <p className="text-main mb-3.5 font-bold">포인트를 출금해요</p>
        <div className="mb-1 flex w-full items-center justify-between">
          <p>
            현재 보유한 포인트<span className="text-main ml-1 font-medium">{currentPoint.toLocaleString()} P</span>
          </p>
          <button className="btn-sm" onClick={() => setInputPoint(currentPoint)}>
            전체 적용
          </button>
        </div>
        <div className="mb-3 flex w-full flex-col gap-y-2">
          <label htmlFor="withdrawPoint">출금할 포인트</label>
          <input
            id="withdrawPoint"
            className="text-input"
            value={inputPoint.toLocaleString()}
            placeholder="출금할 포인트"
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              setInputPoint(Number(rawValue) || 0);
            }}
            onKeyDown={(e) => handleKeyDown(e, () => handleInput())}
          />
          <p className={`text-xs font-medium ${shaking ? "shake" : ""}`}>{notification}</p>
        </div>
        <button onClick={handleInput} className="button">
          출금하기
        </button>
        <button aria-label="포인트 출금 모달 닫기" className="close-position" onClick={() => close()}>
          <CloseIcon className="close-btn" alt="포인트 출금 모달 닫기" />
        </button>
      </section>
    </ModalOverlay>
  );
}
