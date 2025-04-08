import { overlay } from "overlay-kit";
import NoticeModal from "./NoticeModal";
import { NoticeType } from "@/types/interface";

export default function NoticeSection({ notice }: { notice: NoticeType }) {
  const openNoticeModal = () => {
    overlay.open(({ isOpen, close }) => {
      return <NoticeModal isOpen={isOpen} close={close} notice={notice} />;
    });
  };
  return (
    <section className="mb-3 px-4">
      <button
        onClick={openNoticeModal}
        className="flex w-full cursor-pointer items-center gap-x-1 rounded-sm p-1.5 text-sm bg-[#EDF7FF] text-grey-05"
      >
        <p className="truncate overflow-hidden">
          <span className="font-medium">공지: </span>
          {notice.content}
        </p>
      </button>
    </section>
  );
}
