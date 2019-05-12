import VueRouter from "vue-router";
import Index from "./pages/Index";

const router = new VueRouter(
    {
        mode: "history",
        routes: [
            {
                path: "/",
                component: Index
            }
        ]
    }
);

export default router;