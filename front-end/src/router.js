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
import UserInfo from "./components/UserInfo";
import BlockInfo from "./components/BlockInfo";
import CreditInfo from "./components/CreditInfo";
import Notifications from "./components/Notifications";
import ExpressLocation from "./components/ExpressLocation";
import Courier from "./pages/Courier";
import GetNewExpress from "./components/GetNewExpress";

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
				path: "/dashboard/:uid",
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
					},
					{
						path: "user-info",
						component: UserInfo
					},
					{
						path: "block-info",
						component: BlockInfo
					},
					{
						path: "credit-info",
						component: CreditInfo
					},
					{
						path: "notifications",
						component: Notifications
					},
					{
						path: "express-location",
						component: ExpressLocation
					}
				]
			},
			{
				path: "/courier/:uid",
				component: Courier,
				children: [
					{
						path: "",
						component: UserPanel
					},
					{
						path: "get-new-express",
						component: GetNewExpress
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
					},
					{
						path: "user-info",
						component: UserInfo
					},
					{
						path: "block-info",
						component: BlockInfo
					},
					{
						path: "credit-info",
						component: CreditInfo
					},
					{
						path: "notifications",
						component: Notifications
					},
					{
						path: "express-location",
						component: ExpressLocation
					}
				]
			}
		]
	}
);

export default router;