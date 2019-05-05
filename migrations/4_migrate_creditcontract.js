const CreditContract = artifacts.require("CreditContract");

module.exports = function (deployer) {
    deployer.deploy(CreditContract);
};
