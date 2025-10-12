// services/AdminServices/QuestionService.ts
import httpClient from "../../config/httpClient";
import { apiConfig } from "../../config/apiConfig";

const handle = async (req) => (await req).data;

const QuestionService = {
  getAll: (params) =>
    handle(httpClient.get(apiConfig.Question.getAll, { params })),

  getById: (id) =>
    handle(httpClient.get(apiConfig.Question.getById(id))),

  create: (payload) =>
    handle(httpClient.post(apiConfig.Question.create, payload)),

  update: (id, payload) =>
    handle(httpClient.put(apiConfig.Question.update(id), payload)),

  addAnswer: (id, payload) =>
    handle(httpClient.post(apiConfig.Question.addAnswer(id), payload)),

  getAnswers: (id) =>
    handle(httpClient.get(apiConfig.Question.getAnswers(id))),

  delete: (id) =>
    handle(httpClient.delete(apiConfig.Question.delete(id))),

  deleteAnswer: (answerId) =>
    handle(httpClient.delete(apiConfig.Question.deleteAnswer(answerId))),
};

export default QuestionService;
