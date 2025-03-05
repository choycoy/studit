import { StudyOngoingType, NoticeType, TodoListType, TimerType } from "@/types/interface";

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
    hasNotice: true,
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
export const dummyNotices: { [studyId: number]: NoticeType } = {
  14: {
    noticeId: 1,
    content:
      "안녕하세요, 9급 행정직 스터디입니다! 🚀 우리는 꾸준한 학습과 목표 달성을 위해 함께 노력하는 스터디입니다. 매주 월요일 아침 8시부터 학습을 시작하는 것이 암묵적인 약속이며, 각자 계획에 따라 성실히 공부합니다.",
    created: "2025-02-19T12:00:00",
  },
};

export const todoListData: { [studyId: number]: TodoListType } = {
  14: {
    studyTotalTime: 12004,
    todos: [
      {
        todoId: 1,
        todoName: "행정법 핵심 개념 정리",
        isCompleted: true,
        studyTime: 5000,
        isRunning: false,
      },
      {
        todoId: 2,
        todoName: "행정학 기출 문제 풀이",
        isCompleted: false,
        studyTime: 7004,
        isRunning: false,
      },
    ],
  },
  // 15: {
  //   studyTotalTime: 3245,
  //   todos: [
  //     {
  //       todoId: 10,
  //       todoName: 'HSK 5급 듣기 연습',
  //       isCompleted: true,
  //       studyTime: 3200,
  //       isRunning: false,
  //     },
  //     {
  //       todoId: 12,
  //       todoName: 'HSK 5급 독해 연습',
  //       isCompleted: false,
  //       studyTime: 45,
  //       isRunning: false,
  //     },
  //   ],
  // },
};
export const timersData: { [studyId: number]: TimerType[] } = {
  14: [
    {
      userId: 1,
      nickname: "지식 헌터",
      timerTime: 12004,
      isRunning: false,
    },
    {
      userId: 2,
      nickname: "행정마스터",
      timerTime: 22326,
      isRunning: true,
    },
    {
      userId: 3,
      nickname: "끝까지가자",
      timerTime: 10353,
      isRunning: true,
    },
    {
      userId: 4,
      nickname: "공시대장",
      timerTime: 1000,
      isRunning: false,
    },
    {
      userId: 5,
      nickname: "합격러쉬",
      timerTime: 18745,
      isRunning: true,
    },
    {
      userId: 6,
      nickname: "공부의신",
      timerTime: 7560,
      isRunning: true,
    },
    {
      userId: 7,
      nickname: "패스메이커",
      timerTime: 13450,
      isRunning: true,
    },
    {
      userId: 8,
      nickname: "목표달성",
      timerTime: 2950,
      isRunning: false,
    },
    {
      userId: 9,
      nickname: "노력천재",
      timerTime: 16500,
      isRunning: true,
    },
    {
      userId: 10,
      nickname: "포기없다",
      timerTime: 9400,
      isRunning: false,
    },
  ],
  // 15: [
  //   {
  //     userId: 15,
  //     nickname: '니하오마스터',
  //     timerTime: 5040,
  //     isRunning: false,
  //   },
  //   {
  //     userId: 16,
  //     nickname: '중궈고수',
  //     timerTime: 3245,
  //     isRunning: false,
  //   },
  //   {
  //     userId: 17,
  //     nickname: '열정만렙',
  //     timerTime: 500,
  //     isRunning: true,
  //   },
  //   {
  //     userId: 18,
  //     nickname: '레드불 중독',
  //     timerTime: 1032,
  //     isRunning: false,
  //   },
  // ],
};
