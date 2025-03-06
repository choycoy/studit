import client from "@/utils/client";
import { StudyDetail } from "@/types/interface";

const studyDetailApis = {
  getStudyDetail: async (studyId: number) => {
    const { data } = await client.get(`/study/${studyId}`);
    return data;
  },
  updateStudyDetail: async (studyId: number, editInfo: StudyDetail) => {
    const { data } = await client.patch(`/study/${studyId}`, {
      title: editInfo.title,
      description: editInfo.description,
      tags: editInfo.tags,
    });
    return data;
  },
  createNotice: async (studyId: number, content: string) => {
    const { data } = await client.post(`/study/notice/${studyId}`, { content: content });
    return data;
  },
  getNotice: async (studyId: number) => {
    const { data } = await client.get(`/study/notice/${studyId}`);
    return data;
  },
  editNotice: async (studyId: number, content: string) => {
    const { data } = await client.patch(`/study/notice/${studyId}`, { content: content });
    return data;
  },
  deleteNotice: async (studyId: number) => {
    const { data } = await client.delete(`/study/notice/${studyId}`);
    return data;
  },
  getTodoList: async (studyId: number) => {
    const { data } = await client.get(`/todos/${studyId}`);
    return data;
  },
  createTodo: async (studyId: number, todoName: string) => {
    const { data } = await client.post(`/todos/new/${studyId}`, {
      todoName: todoName,
    });
    return data;
  },
  editTodo: async (studyId: number, todoName: string, todoId: number) => {
    const { data } = await client.patch(`/todos/change/${studyId}`, {
      todoId: todoId,
      todoName: todoName,
    });
    return data;
  },
  toggleTodoStatus: async (studyId: number, todoId: number, isCompleted: boolean) => {
    const { data } = await client.patch(`/todos/complete/${studyId}`, {
      todoId: todoId,
      isCompleted: isCompleted,
    });
    return data;
  },
  getTimers: async (studyId: number) => {
    const { data } = await client.get(`/timers/${studyId}`);
    return data;
  },
  startTimer: async (studyId: number, userId: number, todoId: number) => {
    const { data } = await client.post(`/timer/start/${studyId}`, { userId: userId, todoId: todoId });
    return data;
  },
  stopTimer: async (studyId: number, userId: number, todoId: number) => {
    const { data } = await client.post(`/timer/stop/${studyId}`, { userId: userId, todoId: todoId });
    return data;
  },
};
export default studyDetailApis;
