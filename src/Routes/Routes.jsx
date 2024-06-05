import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";
import Teaching from "../Pages/Teaching/Teaching";
import AllClasses from "../Pages/AllClasses/AllClasses";
import Dashboard from "../Layout/Dashboard";
import Profile from "../components/Profile/Profile";
import TeacherRequest from "../Pages/Dashboard/Admin/TeacherRequest/TeacherRequest";
import Users from "../Pages/Dashboard/Admin/Users/Users";
import PrivateRoute from "./PrivateRoute";
import AddClass from "../Pages/Dashboard/Teacher/AddClass/AddClass";
import AllClass from "../Pages/Dashboard/Admin/AllClass/AllClass";
import MyClass from "../Pages/Dashboard/Teacher/MyClass/MyClass";
import UpdateClass from "../Pages/Dashboard/Teacher/UpdateClass/UpdateClass";
import EnrollClass from "../Pages/Dashboard/Student/EnrollClass/EnrollClass";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import Payment from "../Pages/Payment/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,

        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/teaching',
                element: <Teaching></Teaching>
            },
            {
                path: '/allclasses',
                element: <AllClasses></AllClasses>
            },
            {
                path:'/classDetails/:id',
                element:<ClassDetails></ClassDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`),
            },
            {
                path:'/payment/:id',
                element:<Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`),
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // common
            {
                path: 'profile',
                element:<Profile></Profile>
            },

            // for admin route
            {
                path: 'teacherRequest',
                element: <TeacherRequest></TeacherRequest>
            },
            {
                path:'users',
                element:<PrivateRoute><Users></Users></PrivateRoute>
            },
            {
                path:'allClasses',
                element:<AllClass></AllClass>
            },

            // for teacher route
            {
                path:'addclass',
                element:<AddClass></AddClass>
            },
            {
                path:'myClass',
                element:<MyClass></MyClass>
            },
            {
                path:'update/:id',
                element:<UpdateClass></UpdateClass>,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`),
            },

            // for student routes
            {
                path:'myEnrollClass',
                element:<EnrollClass></EnrollClass>
            }
        ]
    }

]);

export default router;