// '/login' route
const router = require('express').Router();
const User = require('../models/User');

router.post("/login", function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	if (username == null || password == null) {
		console.log("输入值不能为空");
		res.send({ error: "输入值不能为空" });
		return;
	}
	User.findOne(
		{
			where: {
				username: username
			}
		}
	).then(user => {
		if (user.password == password) {
			console.log("success");
			res.send({ status: "success", info: "登陆成功" })
		}
		else {
			console.log("帐号或密码错误");
			res.send({ status: "fail", error: "账号或密码错误" })
		}
	}).catch(err => {
		console.log(err);
		res.send(err);
	})
})

module.exports = router;