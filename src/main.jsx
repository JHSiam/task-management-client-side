import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import AuthProvider from './authentication/AuthProvider.jsx';
import Login from './authentication/Login.jsx';
import Register from './authentication/Register.jsx';
import AddTask from './components/AddTask.jsx';
import TaskBoard from './components/TaskBoard.jsx';
import PrivatePage from './routes/PrivatePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/add",
        element: <PrivatePage><AddTask></AddTask></PrivatePage>
      },
      {
        path: "/",
        element: <TaskBoard></TaskBoard>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
