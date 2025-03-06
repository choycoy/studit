import ModalOverlay from "../ModalOverlay";
import CloseIcon from "@/assets/icons/close.svg";
import { handleMaxLengthChange } from "@/utils/commonUtils";
import NoticeIcon from "@/assets/icons/notice-black.svg";
import useGetStudyDetail from "@/hooks/study-detail/useGetStudyDetail";
import { useState, useEffect } from "react";
import useGetNotice from "@/hooks/study-detail/notice/useGetNotice";
import useCreateNotice from "@/hooks/study-detail/notice/useCreateNotice";
import useEditNotice from "@/hooks/study-detail/notice/useEditNotice";
import useDeleteNotice from "@/hooks/study-detail/notice/useDeleteNotice";

export default function ManageNoticeModal({
  isOpen,
  close,
  studyId,
  hasNotice,
}: {
  isOpen: boolean;
  close: () => void;
  studyId: number;
  hasNotice: boolean;
}) {
  const { refetchDetail } = useGetStudyDetail(studyId);
  const { notice, isNoticeLoading, refetchNotice } = useGetNotice(studyId, hasNotice);
  const [input, setInput] = useState("");
  const { createNotice } = useCreateNotice({ studyId, content: input, close });
  const { editNotice } = useEditNotice({ studyId, content: input, close, refetchNotice });
  const { deleteNotice } = useDeleteNotice({ studyId, close, refetchDetail });

  useEffect(() => {
    if (notice?.content && hasNotice) {
      setInput(notice.content);
    }
  }, [notice, hasNotice]);

  if (!isOpen || isNoticeLoading) return null;

  return (
    <ModalOverlay>
      <section className="modal-container">
        <div className="flex items-center gap-x-1.5">
          <NoticeIcon alt="공지" />
          <p className="font-bold">공지를 {hasNotice ? "수정 또는 삭제" : "등록"}해요</p>
        </div>
        <textarea
          value={input}
          onChange={(e) => handleMaxLengthChange(e, 250, () => setInput(e.target.value))}
          className="border-main border p-2 mt-3.5 h-[200px] w-full rounded text-sm"
        />
        <span className="mt-1 mb-1.5 self-end text-xs">{input.length}/200</span>
        {!hasNotice ? (
          <button onClick={() => createNotice()}>등록하기</button>
        ) : (
          <div className="flex items-center gap-x-2">
            <button
              className="text-grey-04 bg-grey-01 hover:bg-grey-02 cursor-pointer rounded-md px-2.5 py-1.5 font-medium transition-colors"
              onClick={() => deleteNotice()}
            >
              삭제하기
            </button>
            <button
              className="bg-main hover:bg-main-hover cursor-pointer rounded-md px-2.5 py-1.5 font-medium text-white transition-colors"
              onClick={() => editNotice()}
            >
              수정하기
            </button>
          </div>
        )}
        <button
          aria-label={`${hasNotice ? "공지 관리하기 모달 닫기" : "공지 등록하기 모달 닫기"}`}
          className="close-position"
          onClick={() => close()}
        >
          <CloseIcon
            className="close-btn"
            alt={`${hasNotice ? "공지 관리하기 모달 닫기" : "공지 등록하기 모달 닫기"}`}
          />
        </button>
      </section>
    </ModalOverlay>
  );
}
