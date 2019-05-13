import VueRouter from "vue-router";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const router = new VueRouter(
    {
        mode: "history",
        routes: [
            {
                path: "/",
                component: Index
            },
            {
                path: "/register",
                component: Register
            },
            {
                path: "/dashboard",
                component: Dashboard
            }
        ]
    }
);

export default router;