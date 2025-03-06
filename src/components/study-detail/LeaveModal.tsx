import ModalOverlay from "../ModalOverlay";
import CloseIcon from "@/assets/icons/close.svg";

export default function LeaveStudyModal({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const handleLeave = () => {
    window.location.href = "/";
  };
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <section className="modal-container h-[103px] gap-y-3.5">
        <p className="text-main font-bold">스터디를 나가시겠어요?</p>
        <div className="flex items-center gap-x-2 text-sm">
          <button
            className="text-grey-04 bg-grey-01 hover:bg-grey-02 cursor-pointer rounded-md px-2.5 py-1.5 font-medium transition-colors"
            onClick={handleLeave}
          >
            나갈래요
          </button>
          <button
            className="bg-main hover:bg-main-hover cursor-pointer rounded-md px-2.5 py-1.5 font-medium text-white transition-colors"
            onClick={() => close()}
          >
            아니요
          </button>
        </div>
        <button aria-label="스터디 나가기 모달 닫기" className="close-position" onClick={() => close()}>
          <CloseIcon className="close-btn" alt="스터디 나가기 모달 닫기" />
        </button>
      </section>
    </ModalOverlay>
  );
}
