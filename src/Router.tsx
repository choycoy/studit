import { Routes, Route } from "react-router-dom";
import StudyDetail from "./pages/StudyDetail";
import Layout from "./components/Layout";
import EditStudy from "./pages/EditStudy";
import MyPage from "./pages/MyPage";
import Point from "./pages/Point";
import MyStudyList from "./pages/MyStudyList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/study/:studyId" element={<StudyDetail />} />
        <Route path="/edit-study/:studyId" element={<EditStudy />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/point" element={<Point />} />
        <Route path="/my-study" element={<MyStudyList />} />
      </Route>
    </Routes>
  );
};
export default Router;
