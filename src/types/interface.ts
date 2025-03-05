export interface StudyOngoingType {
  roomId: number;
  leaderId: number;
  leaderNickName: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  goalTime: number;
  deposit: number;
  studyStartAt: string;
  studyEndAt: string;
  currentMembers: number;
  status: string;
  hasNotice: boolean;
}
export interface NoticeType {
  noticeId: number;
  content: string;
  created: string;
}
export interface TodoListType {
  studyTotalTime: number;
  todos: TodoType[];
}
export interface TodoType {
  todoId: number;
  todoName: string;
  isCompleted: boolean;
  studyTime: number;
  isRunning: boolean;
}
export interface TimerType {
  userId: number;
  nickname: string;
  timerTime: number;
  isRunning: boolean;
}
export interface StudyDetail {
  title: string;
  description: string;
  tags: string[];
}
