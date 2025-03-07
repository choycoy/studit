import studyDetailHandler from "./studyDetailHandler";
import todoHandler from "./todoHandler";
import timeHandler from "./timerHandler";
import myPageHandler from "./myPageHandler";
import pointHandler from "./pointHandler";
const handlers = [...studyDetailHandler, ...todoHandler, ...timeHandler, ...myPageHandler, ...pointHandler];
export default handlers;
