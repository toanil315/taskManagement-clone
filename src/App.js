import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PublicLayout from './layout/PublicLayout/PublicLayout';
import Projects from './page/Projects/Projects';
import CreateProject from './page/CreateProject/CreateProject';
import FormLayout from './layout/FormLayout/FormLayout';
import Login from './page/Login-Signup/Login';
import Signup from './page/Login-Signup/Signup';
import DrawerHOC from './component/Drawer/DrawerHOC';
import ProjectDetail from './page/ProjectDetail/ProjectDetail';
import ModalTask from './component/Modals/ModalTask/ModalTask';

function App() {
  return (
    <BrowserRouter>
      <DrawerHOC />
      <ModalTask />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Projects />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="createProject" element={<CreateProject />} />
        </Route>
        <Route path="login" element={<FormLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="signup" element={<FormLayout />}>
          <Route index element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
