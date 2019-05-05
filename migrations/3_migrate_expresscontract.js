const ExpressContract = artifacts.require("ExpressContract");

module.exports = function (deployer) {
  deployer.deploy(ExpressContract);
};
