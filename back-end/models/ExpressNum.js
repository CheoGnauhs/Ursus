// 各类快递数量
const sequelize = require('./database');
const Sequelize = require('sequelize');
const Express = require('./Express');

class ExpressNum extends Sequelize.Model {
    async getUnsubmittedExpress() {
        let count = 0;
        let uid = this.uid;
        await Express.count(
            {
                where:
                {
                    uid: uid,
                    status: "created"
                }
            }
        ).then(res => {
            console.log("unsubmitted_express:" + res);
            count += res;
        });
        return count;
    };
    async getProcessingExpress() {
        let count = 0;
        let uid = this.uid;
        await Express.count(
            {
                where: {
                    uid: uid,
                    status: {
                        [Sequelize.Op.or]: ["searching", "delivering", 'ownerChecked', 'courierChecked']
                    }
                }
            }
        ).then(res => {
            console.log("inprocessing_express:" + res);
            count += res;
        });
        return count;
    };
    async getNeedCommentExpress() {
        let count = 0;
        let uid = this.uid;
        await Express.count(
            {
                where: {
                    uid: uid,
                    status: "needComment"
                }
            }
        ).then(res => {
            console.log("needcomment_express:" + res);
            count += res;
        });
        return count;
    };
    async getFinishedExpress() {
        let count = 0;
        let uid = this.uid;
        await Express.count(
            {
                where: {
                    uid: uid,
                    status: "finished"
                }
            }
        ).then(res => {
            console.log("finished_express" + res);
            count += res;
        });
        return count;
    }
};

ExpressNum.init(
    {
        // 用户ID
        uid: {
            type: Sequelize.INTEGER
        }
    },
    {
        sequelize,
        modelName: "expressnum",
        tableName: "expressnums"
    }
)

module.exports = ExpressNum;