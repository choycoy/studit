export interface NoticeRequest extends Record<string, unknown> {
  content: string;
}
export interface TimerRequest extends Record<string, unknown> {
  todoId: number;
  userId: number;
}
export interface CreateTodoRequest extends Record<string, unknown> {
  todoName: string;
}
export interface EditTodoRequest extends Record<string, unknown> {
  todoId: number;
  todoName: string;
}
export interface ToggleTodoRequest extends Record<string, unknown> {
  studyId: number;
  isCompleted: boolean;
}
