import { http, HttpResponse } from "msw";
import { todoListData } from "../data/studyMockData";
import { TodoType } from "@/types/interface";
import { CreateTodoRequest, ToggleTodoRequest, EditTodoRequest } from "@/types/request";

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
  http.post("/todos/new/:studyId", async ({ params, request }) => {
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
          message: `No todoList found for studyId: ${studyId}`,
        }),
        { status: 404 },
      );
    }

    const body = (await request.json()) as CreateTodoRequest;

    if (!body) {
      return new HttpResponse(JSON.stringify({ success: false, message: "Invalid or missing request body." }), {
        status: 400,
      });
    }

    const { todoName } = body;

    if (!todoName) {
      return new HttpResponse(JSON.stringify({ success: false, message: "todoName is required." }), { status: 400 });
    }

    const newTodo: TodoType = {
      todoId: todoList.todos.length + 1,
      todoName: todoName as string,
      isCompleted: false,
      studyTime: 0,
      isRunning: false,
    };

    todoList.todos.unshift(newTodo);

    return new HttpResponse(JSON.stringify({ success: true, message: "Todo has been added." }), { status: 200 });
  }),
  http.patch("/todos/change/:studyId", async ({ params, request }) => {
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

    const body = (await request.json()) as EditTodoRequest;
    if (!body) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request body or missing data.",
        }),
        { status: 400 },
      );
    }

    const { todoName, todoId } = body;
    if (!todoId) {
      return new HttpResponse(JSON.stringify({ success: false, message: "todoId is required." }), { status: 400 });
    }
    if (!todoName) {
      return new HttpResponse(JSON.stringify({ success: false, message: "todoName is required." }), { status: 400 });
    }

    const targetTodo = todoList.todos.find((todo) => todo.todoId === todoId);
    if (!targetTodo) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Todo not found.",
        }),
        { status: 404 },
      );
    }

    targetTodo.todoName = todoName;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Todo has been successfully updated.",
      }),
      { status: 200 },
    );
  }),
  http.patch("/todos/complete/:studyId", async ({ params, request }) => {
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

    const body = (await request.json()) as ToggleTodoRequest;
    if (!body) {
      return new HttpResponse(JSON.stringify({ success: false, message: "Invalid or missing request body." }), {
        status: 400,
      });
    }

    const todoList = todoListData[studyId];
    if (!todoList) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No todoList found for studyId: ${studyId}`,
        }),
        { status: 404 },
      );
    }

    const { todoId, isCompleted } = body;
    if (!todoId) {
      return new HttpResponse(JSON.stringify({ success: false, message: "todoId is required." }), { status: 400 });
    }
    if (isCompleted === null) {
      return new HttpResponse(JSON.stringify({ success: false, message: "isCompleted is required." }), { status: 400 });
    }

    const targetTodo = todoList.todos.find((todo) => todo.todoId === todoId);
    if (!targetTodo) {
      return new HttpResponse(JSON.stringify({ success: false, message: "Todo not found." }), { status: 404 });
    }

    targetTodo.isCompleted = isCompleted;

    return new HttpResponse(JSON.stringify({ success: true, message: "Todo completion status has been updated." }), {
      status: 200,
    });
  }),
];
export default todoHandler;
