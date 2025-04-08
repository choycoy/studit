import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { formatTime } from "@/utils/commonUtils";
import useTodoActions from "@/hooks/study-detail/todo-timer/useTodoActions";
import useTodoNTimers from "@/hooks/study-detail/todo-timer/useTodoNTimers";
import { TodoType } from "@/types/interface";

export default function TodoItem({
  todo,
  activeTodoId,
  index,
  showTooltip,
  studyId,
  userId,
  startTimer,
  stopTimer,
}: {
  todo: TodoType;
  activeTodoId: number | null;
  index: number;
  showTooltip: boolean;
  studyId: number;
  userId: number;
  startTimer: (todoId: number) => void;
  stopTimer: (todoId: number) => void;
}) {
  const { startEditing, isEditing, setIsEditing, saveEdit, editingTodo, setEditingTodo } = useTodoActions(studyId);
  const { handleCheckboxChange, todoStates } = useTodoNTimers(studyId, userId);
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
              className="check-box check-box-after"
            />
            <button className="line-clamp-2 max-w-[196px] text-sm" onClick={() => startEditing(todoId, todoName)}>
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
          className="cursor-pointer relative"
        >
          {activeTodoId === todoId ? (
            <PauseIcon alt={`${todoName} 타이머 정지`} className="h-10 w-10" />
          ) : (
            <PlayIcon alt={`${todoName} 타이머 재생`} className="h-10 w-10" />
          )}
          {index === 0 && showTooltip && (
            <p className="absolute whitespace-nowrap right-0 shadow-md shadow-zinc-400 bg-main rounded px-2.5 py-2 text-xs font-medium text-white z-40 -bottom-[42px] after:right-3.5 tooltip">
              마이크로 타이머를 쉽게 시작하고 멈출 수 있어요
            </p>
          )}
        </button>
      </div>
    </li>
  );
}
