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
		if (user == null) {
			console.log("用户不存在")
			res.status(400).send({ error: "帐号或密码错误" });
		}
		if (user.password == password) {
			console.log("login success");
			res.status(200).send({ status: "success", info: "登陆成功", id: user.id })
		}
		else {
			console.log("帐号或密码错误");
			res.status(400).send({ status: "fail", error: "账号或密码错误" })
		}
	}).catch(err => {
		console.log(err);
		res.status(400).send(err);
	})
})

module.exports = router;