import { Routes, Route } from "react-router-dom";
import StudyDetail from "./pages/StudyDetail";
import Layout from "./components/Layout";
import EditStudy from "./pages/EditStudy";
import MyPage from "./pages/MyPage";
import Point from "./pages/Point";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/study/:studyId" element={<StudyDetail />} />
        <Route path="/edit-study/:studyId" element={<EditStudy />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/point" element={<Point />} />
      </Route>
    </Routes>
  );
};
export default Router;
