import { overlay } from "overlay-kit";
import LeaveStudyModal from "@/components/study-detail/LeaveModal";
import ManageNoticeModal from "@/components/study-detail/ManageNoticeModal";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icons/close.svg";
import { Dispatch, SetStateAction } from "react";

export default function StudyMenuList({
  isMenuOpen,
  setIsMenuOpen,
  studyId,
  leaderId,
  userId,
  hasNotice,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  studyId: number;
  leaderId: number;
  userId: number;
  hasNotice: boolean;
  toggleMenu: () => void;
}) {
  const navigate = useNavigate();
  const openLeaveModal = () => {
    toggleMenu();
    overlay.open(({ isOpen, close }) => {
      return <LeaveStudyModal isOpen={isOpen} close={close} />;
    });
  };
  const openManageModal = () => {
    toggleMenu();
    overlay.open(({ isOpen, close }) => {
      return <ManageNoticeModal isOpen={isOpen} close={close} studyId={studyId} hasNotice={hasNotice} />;
    });
  };
  const isLeader = leaderId === userId;
  return (
    <section
      className={`${isMenuOpen ? "slide-down transition-transform duration-300 ease-in-out" : "invisible"} study-menu`}
    >
      <button
        onClick={() => setIsMenuOpen(false)}
        aria-label="스터디 메뉴 닫기"
        className="self-end close-btn cursor-pointer pr-9"
      >
        <CloseIcon alt="스터디 메뉴 닫기" />
      </button>
      <button
        className={`flex w-full cursor-pointer items-center px-4 py-2 hover:opacity-85 transition-opacity ${
          !isLeader && "text-grey-01"
        }`}
        onClick={openManageModal}
        disabled={!isLeader}
      >
        공지 {hasNotice ? "수정 및 삭제" : "등록"}하기
        <span className="rounded-full bg-white px-1.5 py-1 text-xs text-main ml-2 font-bold">스터디장</span>
      </button>
      <button
        disabled={!isLeader}
        className={`flex w-full cursor-pointer items-center px-4 py-2 hover:opacity-85 transition-opacity ${
          !isLeader && "text-grey-01"
        }`}
        onClick={() => navigate(`/edit-study/${studyId}`)}
      >
        스터디 정보 수정
        <span className="rounded-full bg-white px-1.5 py-1 text-xs text-main font-bold ml-2">스터디장</span>
      </button>
      <button className="cursor-pointer py-2 pl-4 hover:opacity-85 transition-opacity" onClick={openLeaveModal}>
        스터디 나가기
      </button>
    </section>
  );
}
