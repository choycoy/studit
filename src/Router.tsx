import { Routes, Route } from "react-router-dom";
import StudyDetail from "./pages/StudyDetail";
import Layout from "./components/Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/study/:studyId" element={<StudyDetail />} />
      </Route>
    </Routes>
  );
};
export default Router;
