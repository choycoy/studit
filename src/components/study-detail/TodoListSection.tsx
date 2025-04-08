import CloseIcon from "@/assets/icons/close.svg";
import { formatTime } from "@/utils/commonUtils";
import useTodoActions from "@/hooks/study-detail/todo-timer/useTodoActions";
import { TodoType } from "@/types/interface";
import TodoItem from "./TodoItem";

export default function TodoListSection({
  studyId,
  studyTotalTime,
  todos,
  activeTodoId,
  showTooltip,
  userId,
  startTimer,
  stopTimer,
}: {
  studyId: number;
  studyTotalTime: number;
  todos: TodoType[];
  activeTodoId: number | null;
  showTooltip: boolean;
  userId: number;
  startTimer: (todoId: number) => void;
  stopTimer: (todoId: number) => void;
}) {
  const { isAdding, setIsAdding, newTodo, setNewTodo, handleKeyDown } = useTodoActions(studyId);

  return (
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
        {todos.map((todo: TodoType, index: number) => {
          return (
            <TodoItem
              todo={todo}
              activeTodoId={activeTodoId}
              index={index}
              showTooltip={showTooltip}
              studyId={studyId}
              userId={userId}
              startTimer={startTimer}
              stopTimer={stopTimer}
              key={todo.todoId}
            />
          );
        })}
      </ul>
    </section>
  );
}
