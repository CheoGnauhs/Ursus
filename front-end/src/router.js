import VueRouter from "vue-router";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserPanel from "./components/UserPanel";
import NewExpress from "./components/NewExpress";
import InProcess from "./components/InProcess";
import Unsubmitted from "./components/Unsubmitted";
import NeedComment from "./components/NeedComment";
import Finished from './components/Finished';

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
					},
					{
						path: "new-express",
						component: NewExpress
					},
					{
						path: "in-process",
						component: InProcess
					},
					{
						path: "unsubmitted",
						component: Unsubmitted
					},
					{
						path: "need-comment",
						component: NeedComment
					},
					{
						path: "finished",
						component: Finished
					}
				]
			}
		]
	}
);

export default router;