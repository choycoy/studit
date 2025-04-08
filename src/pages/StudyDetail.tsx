import NoticeSection from "@/components/study-detail/NoticeSection";
import StudyMenuList from "@/components/study-detail/StudyMenu";
import GroupTimers from "@/components/study-detail/GroupTimers";
import TodoListSection from "@/components/study-detail/TodoListSection";
import useStudyDetail from "@/hooks/study-detail/useStudyDetail";
import useGetNotice from "@/hooks/study-detail/notice/useGetNotice";
import useTodoTimer from "@/hooks/study-detail/todo-timer/useTodoTimer";
import useSpeechRecognition from "@/hooks/study-detail/useSpeechRecognition";
import useTodoNTimers from "@/hooks/study-detail/todo-timer/useTodoNTimers";

export default function StudyDetail() {
  const { isDetailLoading, isMenuOpen, showTooltip, toggleMenu, studyDetail, setIsMenuOpen, studyId, userId } =
    useStudyDetail();
  const { localTodoList, timers, setTimers, todoListLoading, isTimerLoading, setLocalTodoList, todoList } =
    useTodoNTimers(studyId, userId);
  const { studyTotalTime, todos } = localTodoList;
  const { notice, isNoticeLoading } = useGetNotice(studyId, studyDetail?.hasNotice);
  const { startTimer, stopTimer, activeTodoId } = useTodoTimer({ studyId, userId, setTimers, setLocalTodoList });
  useSpeechRecognition({ startTimer, stopTimer, activeTodoId, todoListLoading, todoList });

  if (!studyDetail || isDetailLoading || isNoticeLoading || !localTodoList || todoListLoading || isTimerLoading)
    return null;
  const { title, leaderId, hasNotice } = studyDetail;

  return (
    <div className="pt-2.5 relative h-full">
      <section className="pb-3 px-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">{title}</h1>
          <button
            className="bg-main text-white text-sm font-medium px-1.5 py-1.5 rounded-sm cursor-pointer hover:bg-main-hover transition-colors"
            onClick={toggleMenu}
          >
            스터디 메뉴
          </button>
        </div>
      </section>
      <StudyMenuList
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        studyId={studyId}
        leaderId={leaderId}
        userId={userId}
        hasNotice={hasNotice}
        toggleMenu={toggleMenu}
      />
      {hasNotice && <NoticeSection notice={notice} />}
      <GroupTimers timers={timers} leaderId={leaderId} userId={userId} />
      <div className="bg-main mt-1 mb-2 h-1.5 w-full" />
      <TodoListSection
        studyId={studyId}
        userId={userId}
        studyTotalTime={studyTotalTime}
        todos={todos}
        activeTodoId={activeTodoId}
        showTooltip={showTooltip}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
    </div>
  );
}
