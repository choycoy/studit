import studyDetailHandler from "./studyDetailHandler";
import todoHandler from "./todoHandler";
import timeHandler from "./timerHandler";
import myPageHandler from "./myPageHandler";
import pointHandler from "./pointHandler";
import homeHandlers from "./homeHandler";
const handlers = [
  ...studyDetailHandler,
  ...todoHandler,
  ...timeHandler,
  ...myPageHandler,
  ...pointHandler,
  ...homeHandlers,
];
export default handlers;
