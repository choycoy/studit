export interface StudyItem {
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
  img: string;
  dayBeforeStart: number;
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
export interface UpcomingStudyItem extends StudyInfo {
  recruit_id: number;
}
export interface OnGoingStudyItem extends StudyInfo {
  registerId: number;
  deductedPoint: number;
  obtainedPoint: number;
}
export interface CompletedStudyItem extends StudyInfo {
  studyId: number;
  deductedPoint: number;
  obtainedPoint: number;
}
export type StudyStatusType = "ongoing" | "upcoming" | "completed";
export type StudyItemType = UpcomingStudyItem | OnGoingStudyItem | CompletedStudyItem;
export interface StudyInfo {
  gatherDate: string;
  title: string;
  enterPoint: number;
  tag: string;
  weeklyStudyTime: number;
  category: string;
}
export interface UserProfile {
  userId: number;
  nickname: string;
  points: number;
  applied: number;
  in_progress: number;
  completed: number;
  profileImage: string;
}
export interface IUserPoints {
  userId: number;
  totalPoints: number;
  totalRewardPoints: number;
  totalDeductedPoints: number;
  totalWithdrawnPoints: number;
}
export interface GroupedByDate {
  date: string;
  records: PointRecord[];
}
export interface PointRecord {
  id: number;
  type: PointFilterType;
  amount: number;
  total_after: number;
  time: string;
}
export type PointFilterType = "전체" | "충전" | "차감" | "출금" | "보상" | "환불";
export interface PointRequest extends Record<string, unknown> {
  amount: number;
}
export interface AvgStats {
  userId: number;
  userTodoCompletion: number | null;
  averageTodoCompletion: number;
  userGoalRate: number | null;
  averageGoalRate: number;
}
