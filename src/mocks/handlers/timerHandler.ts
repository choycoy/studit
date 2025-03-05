import { http, HttpResponse } from "msw";
import { timersData, todoListData } from "../data/studyMockData";
import { TimerRequest } from "@/types/request";

setInterval(() => {
  Object.values(timersData).forEach((timers) => {
    timers.forEach((timer) => {
      if (timer.isRunning) {
        timer.timerTime += 1;
      }
    });
  });
}, 1000);

const activeTimers: Record<number, number | undefined> = {};
function startTimer(studyId: number) {
  if (activeTimers[studyId]) {
    return;
  }

  activeTimers[studyId] = window.setInterval(() => {
    const hasRunningTodo = todoListData[studyId]?.todos.some((todo) => todo.isRunning);
    if (!hasRunningTodo) {
      stopTimer(studyId);
      return;
    }
    todoListData[studyId].studyTotalTime += 1;
    todoListData[studyId].todos = todoListData[studyId].todos.map((todo) =>
      todo.isRunning ? { ...todo, studyTime: todo.studyTime + 1 } : todo,
    );
  }, 1000);
}
function stopTimer(studyId: number) {
  if (activeTimers[studyId]) {
    clearInterval(activeTimers[studyId]!);
    delete activeTimers[studyId];
  }
}

const timeHandler = [
  http.get("/timers/:studyId", async ({ params }) => {
    const studyId = Number(params.studyId);
    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. 'studyId' must be a number.",
        }),
        { status: 400 },
      );
    }

    const timers = timersData[studyId];
    if (!timers) {
      return new HttpResponse(
        JSON.stringify({ success: false, message: `No timer data found for study ID ${studyId}.` }),
        {
          status: 404,
        },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Timer data retrieved successfully.",
        data: timers,
      }),
      { status: 200 },
    );
  }),
  http.post("/timer/start/:studyId", async ({ params, request }) => {
    const studyId = Number(params.studyId);
    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. 'studyId' must be a number.",
        }),
        { status: 400 },
      );
    }

    const body = (await request.json()) as TimerRequest;
    if (!body) {
      return new HttpResponse(JSON.stringify({ success: false, message: "Invalid or missing request body." }), {
        status: 400,
      });
    }

    const { userId, todoId } = body;
    if (!userId) {
      return new HttpResponse(JSON.stringify({ success: false, message: "userId is required." }), { status: 400 });
    }
    if (!todoId) {
      return new HttpResponse(JSON.stringify({ success: false, message: "todoId is required." }), { status: 400 });
    }

    const studyData = timersData[studyId];
    if (!studyData) {
      return new HttpResponse(JSON.stringify({ success: false, message: "Study data not found." }), { status: 404 });
    }

    const userData = studyData.find((data) => data.userId === userId);
    const todoData = todoListData[studyId]?.todos.find((todo) => todo.todoId === todoId);

    if (!userData || !todoData) {
      return new HttpResponse(JSON.stringify({ success: false, message: "User or todo data not found." }), {
        status: 400,
      });
    }
    userData.isRunning = true;
    todoData.isRunning = true;
    startTimer(studyId);

    return new HttpResponse(JSON.stringify({ success: true, message: "Timer has started." }), { status: 200 });
  }),
  http.post("/timer/stop/:studyId", async ({ params, request }) => {
    const studyId = Number(params.studyId);
    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. 'studyId' must be a number.",
        }),
        { status: 400 },
      );
    }

    const body = (await request.json()) as TimerRequest;
    if (!body) {
      return new HttpResponse(JSON.stringify({ success: false, message: "Invalid or missing request body." }), {
        status: 400,
      });
    }

    const { userId, todoId } = body;
    if (!userId) {
      return new HttpResponse(JSON.stringify({ success: false, message: "userId is required." }), { status: 400 });
    }
    if (!todoId) {
      return new HttpResponse(JSON.stringify({ success: false, message: "todoId is required." }), { status: 400 });
    }

    const studyData = timersData[studyId];
    if (!studyData) {
      return new HttpResponse(JSON.stringify({ success: false, message: "Study data not found." }), { status: 404 });
    }

    const userData = studyData.find((data) => data.userId === userId);
    const todoData = todoListData[studyId]?.todos.find((todo) => todo.todoId === todoId);

    if (!userData || !todoData) {
      return new HttpResponse(JSON.stringify({ success: false, message: "User or todo data not found." }), {
        status: 400,
      });
    }

    userData.isRunning = false;
    todoData.isRunning = false;
    stopTimer(studyId);

    return new HttpResponse(JSON.stringify({ success: true, message: "Timer has stopped." }), { status: 200 });
  }),
];
export default timeHandler;
