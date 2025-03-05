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
