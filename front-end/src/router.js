import VueRouter from "vue-router";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserPanel from "./components/UserPanel";

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
				component: Dashboard,
				children: [
					{
						path: "",
						component: UserPanel
					}
				]
			}
		]
	}
);

export default router;