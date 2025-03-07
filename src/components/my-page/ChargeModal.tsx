import ModalOverlay from "../ModalOverlay";
import CloseIcon from "../../assets/icons/close.svg";
import { handleKeyDown } from "../../utils/commonUtils";
import { useState } from "react";
import useChargePoint from "@/hooks/my-page/useChargePoint";

export default function ChargeModal({
  isOpen,
  close,
  currentPoint,
  userId,
}: {
  isOpen: boolean;
  close: () => void;
  currentPoint: number;
  userId: number;
}) {
  const [inputPoint, setInputPoint] = useState(0);
  const [shaking, setShaking] = useState(false);
  // const { showToast } = useToastStore();
  const { chargePoint } = useChargePoint(inputPoint, userId);
  const isInputInValid = inputPoint < 100 || inputPoint % 100 !== 0;

  const handleInput = () => {
    if (isInputInValid) {
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
    } else {
      chargePoint();
      // showToast(inputPoint.toLocaleString() + ' P가 충전됐어요 !', true);
      close();
    }
  };
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <section className="modal-container">
        <p className="mb-3.5 font-bold">포인트를 충전해요</p>
        <p className="mb-1 self-start">
          현재 보유한 포인트<span className="ml-1 font-medium">{currentPoint.toLocaleString()} P</span>{" "}
        </p>
        <div className="mb-4 flex w-full flex-col">
          <label htmlFor="chargePoint" className="mb-1">
            충전할 포인트
          </label>
          <input
            id="chargePoint"
            className="text-input2 mb-1"
            value={inputPoint.toLocaleString()}
            placeholder="충전할 포인트"
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              setInputPoint(Number(rawValue) || 0);
            }}
            onKeyDown={(e) => handleKeyDown(e, () => handleInput())}
          />
          <p className={`text-xs font-medium ${shaking ? "shake" : ""}`}>*충전은 100P 단위로 가능해요.</p>
        </div>
        <button onClick={handleInput} className="button">
          충전하기
        </button>
        <button aria-label="포인트 충전 모달 닫기" className="close-position" onClick={() => close()}>
          <CloseIcon className="close-btn" alt="포인트 충전 모달 닫기" />
        </button>
      </section>
    </ModalOverlay>
  );
}
