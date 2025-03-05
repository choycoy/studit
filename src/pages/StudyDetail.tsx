import useGetStudyDetail from "@/hooks/study-detail/useGetStudyDetail";
import { useParams } from "react-router-dom";
import { overlay } from "overlay-kit";
import NoticeIcon from "@/assets/icons/notice.svg";
import NoticeModal from "@/components/study-detail/NoticeModal";
import useGetNotice from "@/hooks/study-detail/useGetNotice";
import LightOffIcon from "@/assets/icons/light-off.svg";
import LightOnIcon from "@/assets/icons/light-on.svg";
import useTodoNTimers from "@/hooks/study-detail/todo-timer/useTodoNTimers";
import { TimerType, TodoType } from "@/types/interface";
import LeaderIcon from "@/assets/icons/leader.svg";
import { formatTime } from "@/utils/commonUtils";
import CloseIcon from "@/assets/icons/close.svg";
import useTodoTimer from "@/hooks/study-detail/todo-timer/useTodoTimer";
import useTodoActions from "@/hooks/study-detail/todo-timer/useTodoActions";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";

export default function StudyDetail() {
  return (
    <div>
      <h1>This is Study Detail Page</h1>
    </div>
  );
}
