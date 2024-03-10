
import { Route, Routes } from "react-router-dom";
import ProjectsList from "@pages/projects";
import IssuesList from "@pages/components/issueList";
import Issue from "@pages/components/issue";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectsList />} />
      <Route path='/view/:id' element={<IssuesList />} />
      <Route path='/edit/:id' element={<Issue />} />
      <Route path='/create' element={<Issue />} />
    </Routes>
  );
};

export default MainRoutes;