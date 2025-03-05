import { http, HttpResponse } from "msw";
import { timersData } from "../data/studyMockData";

setInterval(() => {
  Object.values(timersData).forEach((timers) => {
    timers.forEach((timer) => {
      if (timer.isRunning) {
        timer.timerTime += 1;
      }
    });
  });
}, 1000);

const timeHandler = [
  http.get("/timers/:studyId", async ({ params }) => {
    const studyId = Number(params.studyId);
    if (isNaN(studyId)) {
      return new HttpResponse(JSON.stringify({ message: "Invalid request. studyId must be a number." }), {
        status: 400,
      });
    }
    const timers = timersData[studyId];
    if (!timers) {
      return new HttpResponse(JSON.stringify({ message: `No timer data found for study ID ${studyId}.` }), {
        status: 404,
      });
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
];
export default timeHandler;
