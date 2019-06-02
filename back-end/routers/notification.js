const router = require("express").Router();
const Notification = require("../models/Notification");

router.get("/notification", function (req, res) {
    let uid = req.query.uid;
    Notification.findAll(
        {
            where:
                { uid: uid }
        }
    ).then(notifications => {
        console.log(notifications);
        res.status(200).send({ status: "success", info: "通知请求成功", data: notifications });
    }).catch(err => {
        console.log(err);
        res.status(400).send({ status: "failed", info: "通知请求失败", error: err });
    })
});

router.post("/notification", function (req, res) {
    Notification.create(
        {
            uid: req.body.uid,
            content: req.body.content,
            isRead: false
        }
    ).then(notification => {
        console.log(notification);
        res.status(200).send({ status: "success", info: "通知创建成功", data: notification });
    }).catch(err => {
        console.log(err);
        res.status(400).send({ status: "failed", info: "通知创建失败", error: err })
    })
});

router.put("/notification", function (req, res) {
    let data = {
        uid: req.body.uid,
        content: req.body.content,
        isRead: req.body.isRead
    };
    for (let att in data) {
        if (data[att] === null || data[att] === undefined) {
            delete data[att];
        }
    }
    Notification.update(
        data,
        {
            where:
            {
                id: req.body.id
            }
        }
    ).then(() => {
        console.log("Updated");
        res.status(200).send({ status: "success", info: "更新成功" });
    }).catch(err => {
        console.log("Update failed");
        res.status(400).send({ status: "failed", info: "更新失败" });
    })
});

router.delete("/notification", function (req, res) {
    Notification.destroy(
        {
            where:
            {
                id: req.body.id
            }
        }
    ).then(() => {
        console.log("Deleted");
        res.status(200).send({ status: "success", info: "删除成功" });
    }).catch(err => {
        console.log("Delete failed");
        res.status(400).send({ status: "failed", info: "删除失败" });
    })
});

router.patch("/notification", function (req, res) {
    Notification.sync({ force: true }).then(res => {
        console.log(res);
    })
});

router.get("/unread_notifications", function (req, res) {
    Notification.findAll(
        {
            where:
            {
                uid: req.query.uid,
                isRead: false
            }
        }
    ).then(notifications => {
        console.log(notifications);
        Notifications.update(
            { isRead: true },
            {
                where: {
                    uid: req.query.uid,
                    isRead: false
                }
            }
        ).then(() => {
            console.log("Updated");
        }).catch(err => {
            console.log(err);
        });
        res.status(200).send({ status: "success", info: "通知请求成功", data: notifications });
    }).catch(err => {
        console.log("request error");
        res.status(400).send({ status: "failed", info: "通知请求失败", error: err });
    })
});

router.get("/unread_notifications_count", function (req, res) {
    Notification.count(
        {
            where:
            {
                uid: req.query.uid,
                isRead: false
            }
        }
    ).then(count => {
        console.log(count);
        res.status(200).send({ status: "success", info: "通知数量请求成功", count: count });
    }).catch(err => {
        console.log(err);
        res.status(400).send({ status: "failed", info: "通知数量请求失败", error: err });
    })
});

module.exports = router;