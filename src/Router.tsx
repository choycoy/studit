import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyDetail from "./pages/StudyDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/study/:studyId" element={<StudyDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
