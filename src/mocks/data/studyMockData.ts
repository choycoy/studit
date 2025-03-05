import { StudyOngoingType } from "@/types/interface";

export const dummyStudyList: StudyOngoingType[] = [
  {
    roomId: 14,
    title: "9급 행정직 스터디",
    category: "공무원",
    tags: ["행정법", "행정학", "국어"],
    studyStartAt: "2025-02-19T17",
    studyEndAt: "2025-06-18T17",
    currentMembers: 3,
    deposit: 10000,
    goalTime: 50,
    status: "ACTIVE",
    leaderId: 1,
    leaderNickName: "지식 헌터",
    hasNotice: false,
    description:
      "9급 공무원 행정직 시험 준비를 위한 스터디입니다. 스터디원들은 필요한 과목을 학습하고, 시험 준비에 필요한 자료를 정리하며 학습합니다.",
  },
  // {
  //   roomId: 15,
  //   title: 'HSK 5급 스터디',
  //   category: '어학',
  //   tags: ['중국어', 'HSK'],
  //   studyStartAt: '2025-02-18T16',
  //   studyEndAt: '2025-04-22T16',
  //   currentMembers: 4,
  //   deposit: 8000,
  //   goalTime: 30,
  //   status: 'ACTIVE',
  //   leaderId: 16,
  //   hasNotice: false,
  //   leaderNickName: '중궈고수',
  //   description:
  //     'HSK 5급 시험 대비를 위한 듣기 및 독해 연습을 중심으로 공부하는 스터디입니다. 스터디원들은 듣기 연습과 독해 연습을 통해 실력을 향상시키고 시험 준비를 진행합니다.',
  // },
];
