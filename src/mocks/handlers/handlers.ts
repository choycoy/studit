import studyDetailHandler from "./studyDetailHandler";
import todoHandler from "./todoHandler";
import timeHandler from "./timerHandler";
const handlers = [...studyDetailHandler, ...todoHandler, ...timeHandler];
export default handlers;
