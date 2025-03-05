import { http, HttpResponse } from "msw";
import { todoListData } from "../data/studyMockData";

const todoHandler = [
  http.get("/todos/:studyId", ({ params }) => {
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

    const todoList = todoListData[studyId];

    if (!todoList) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No todo list found for study ID ${studyId}.`,
        }),
        { status: 404 },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Todo list retrieved successfully.",
        data: todoList,
      }),
      { status: 200 },
    );
  }),
];
export default todoHandler;
