import { createBrowserRouter } from "react-router";
import { NotFound } from './components';
import Homepage from "./pages/Homepage/Homepage";
import Layout from "./layouts/Layout";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout />,
        errorElement: <NotFound />,
        children:[
            {
                path: "/",
                element: <Homepage />
            },
            // {
            //     path: "/productpage",
            //     element: <Productpage />
            // },
        ],
    },
]);