import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";
import Teaching from "../Pages/Teaching/Teaching";
import AllClasses from "../Pages/AllClasses/AllClasses";
import Dashboard from "../Layout/Dashboard";

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
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {

            }
        ]
    }

]);

export default router;