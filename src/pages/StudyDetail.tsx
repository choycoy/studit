import useGetStudyDetail from "@/hooks/study-detail/useGetStudyDetail";
import { useParams, useNavigate } from "react-router-dom";
import { overlay } from "overlay-kit";
import NoticeIcon from "@/assets/icons/notice.svg";
import NoticeModal from "@/components/study-detail/NoticeModal";
import useGetNotice from "@/hooks/study-detail/notice/useGetNotice";
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
import { useState } from "react";
import LeaveStudyModal from "@/components/study-detail/LeaveModal";
import ManageNoticeModal from "@/components/study-detail/ManageNoticeModal";

export default function StudyDetail() {
  const studyId = Number(useParams().studyId);
  const userId = 1;
  const { studyDetail, isDetailLoading } = useGetStudyDetail(studyId);
  const { notice, isNoticeLoading } = useGetNotice(studyId, studyDetail?.hasNotice);
  const {
    todoList,
    timers,
    setTimers,
    todoListLoading,
    isTimerLoading,
    todoStates,
    handleCheckboxChange,
    setLocalTodoList,
  } = useTodoNTimers(studyId, userId);
  const {
    isAdding,
    setIsAdding,
    newTodo,
    setNewTodo,
    handleKeyDown,
    startEditing,
    isEditing,
    setIsEditing,
    saveEdit,
    editingTodo,
    setEditingTodo,
  } = useTodoActions(studyId);
  const { startTimer, stopTimer, activeTodoId } = useTodoTimer({ studyId, userId, setTimers, setLocalTodoList });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (!studyDetail || isDetailLoading || isNoticeLoading || !todoList || todoListLoading || isTimerLoading) return null;

  const { title, leaderId, hasNotice } = studyDetail;
  const { studyTotalTime, todos } = todoList;
  const openNoticeModal = () => {
    overlay.open(({ isOpen, close }) => {
      return <NoticeModal isOpen={isOpen} close={close} notice={notice} />;
    });
  };
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
    <div className="text-main pt-2.5 relative h-full">
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
      <section
        className={`${
          isMenuOpen ? "slide-down transition-transform duration-300 ease-in-out" : "invisible"
        } study-menu`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="스터디 메뉴 닫기"
          className="self-end close-btn cursor-pointer pr-9"
        >
          <CloseIcon alt="스터디 메뉴 닫기" />
        </button>
        <button
          className={`flex w-full cursor-pointer items-center px-4 py-2 hover:text-grey-01 transition-colors ${
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
          className={`flex w-full cursor-pointer items-center px-4 py-2 hover:text-grey-01 transition-colors ${
            !isLeader && "text-grey-01"
          }`}
          onClick={() => navigate(`/edit-study/${studyId}`)}
        >
          스터디 정보 수정
          <span className="rounded-full bg-white px-1.5 py-1 text-xs text-main font-bold ml-2">스터디장</span>
        </button>
        <button className="cursor-pointer py-2 pl-4 hover:text-grey-01 transition-colors" onClick={openLeaveModal}>
          스터디 나가기
        </button>
      </section>
      {hasNotice && (
        <section className="mb-3 px-4">
          <button
            onClick={openNoticeModal}
            className="flex w-full cursor-pointer items-center gap-x-1 rounded-sm bg-main p-1.5 text-sm text-white"
          >
            <NoticeIcon alt="공지" className="h-5 w-5 flex-shrink-0" />
            <div className="flex w-full gap-x-1 truncate overflow-hidden">
              <span className="flex-shrink-0 font-medium">공지:</span>
              <span className="truncate">{notice.content}</span>
            </div>
          </button>
        </section>
      )}
      <section className="grid h-[254px] grid-cols-4 gap-x-4 px-4">
        {timers.map((timer: TimerType) => {
          const isLeader = leaderId === timer.userId;
          const savedData = localStorage.getItem("activeTodo") && timer.userId === userId;
          return (
            <div className="relative flex flex-col items-center text-sm" key={timer.userId}>
              {isLeader && <LeaderIcon className="absolute -top-1 right-1.5 h-4 w-4" alt="스터디장" />}
              {timer.isRunning || savedData ? (
                <LightOnIcon alt={timer.nickname + "타이머 측정 하지 않는 중"} />
              ) : (
                <LightOffIcon alt={timer.nickname + "타이머 측정 중"} />
              )}
              <span className="whitespace-nowrap">{timer.nickname}</span>
              <span className="text-xs font-medium">{formatTime(timer.timerTime)}</span>
            </div>
          );
        })}
      </section>
      <div className="bg-main mt-1 mb-2 h-1.5 w-full" />
      <section className="px-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">
            총 스터디 시간: <span className="font-bold">{formatTime(studyTotalTime)}</span>
          </h1>
          <button className="btn-sm" onClick={() => setIsAdding(true)}>
            투두 추가
          </button>
        </div>
        <ul className="mt-3 flex flex-col gap-y-2">
          {isAdding && (
            <li className="flex items-center gap-x-2.5">
              <div className="flex items-center gap-x-1.5">
                <div className="border-white-gray h-[18px] w-[18px] rounded-sm border-2" />
                <input
                  type="text"
                  value={newTodo}
                  placeholder="생성할 투두 입력후 Enter"
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  autoFocus
                  className="border-main w-[196px] border-b p-1"
                />
              </div>
              <button
                className="text-dark-gray hover:text-gray cursor-pointer transition-colors"
                onClick={() => setIsAdding(false)}
                aria-label='lt="투두 생성 취소" '
              >
                <CloseIcon alt="투두 생성 취소" className="h-3 w-3" />
              </button>
            </li>
          )}
          {todos.map((todo: TodoType) => {
            const { todoId, todoName, studyTime } = todo;

            return (
              <li key={todoId} className="flex items-center justify-between">
                <div className="flex items-center gap-x-1.5">
                  {isEditing && editingTodo.todoId === todoId ? (
                    <div className="flex w-full items-center gap-x-1.5">
                      <button
                        className="text-dark-gray hover:text-gray cursor-pointer transition-colors"
                        onClick={() => setIsEditing(false)}
                        aria-label="투두 수정 취소"
                      >
                        <CloseIcon className="h-3.5 w-3.5" alt="투두 수정 취소" />
                      </button>
                      <input
                        type="text"
                        value={editingTodo.todoName}
                        onChange={(e) => setEditingTodo((prev) => ({ ...prev, todoName: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEdit();
                          }
                        }}
                        autoFocus
                        className="border-main max-w-[196px] border-b p-1 text-sm"
                      />
                    </div>
                  ) : (
                    <label htmlFor={`todo-${todoId}`} className="flex cursor-pointer items-center gap-2">
                      <input
                        id={`todo-${todoId}`}
                        onChange={() => handleCheckboxChange(todoId, !todoStates[todoId])}
                        checked={todoStates[todoId] || false}
                        type="checkbox"
                        className="checked:bg-main border-white-gray relative h-[18px] w-[18px] appearance-none rounded-sm border-2 checked:border-transparent checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-white checked:after:content-['✓']"
                      />
                      <button
                        className="line-clamp-2 max-w-[196px] text-sm"
                        onClick={() => startEditing(todoId, todoName)}
                      >
                        {todoName}
                      </button>
                    </label>
                  )}
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-medium">{formatTime(studyTime)}</span>
                  <button
                    aria-label={activeTodoId === todoId ? `${todoName} 타이머 중지` : `${todoName} 타이머 시작`}
                    onClick={() => {
                      if (activeTodoId === todoId) stopTimer(todoId);
                      else startTimer(todoId);
                    }}
                    className="cursor-pointer"
                  >
                    {activeTodoId === todoId ? (
                      <PauseIcon alt={`${todoName} 타이머 정지`} className="h-10 w-10" />
                    ) : (
                      <PlayIcon alt={`${todoName} 타이머 재생`} className="h-10 w-10" />
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
