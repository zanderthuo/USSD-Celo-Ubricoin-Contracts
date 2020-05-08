// var Phoneaccess = artifacts.require("./Accessphone.sol");
// var Erc20 = artifacts.require("./ERC20.sol");
// var Users = artifacts.require("./User.sol");

// module.exports = function(deployer) {
//     deployer.deploy(Phoneaccess);
//     deployer.deploy(Erc20);
//     deployer.deploy(Users);

// };

const User = artifacts.require("./User.sol");
const Phoneaccess = artifacts.require("./Accessphone.sol");
const ERC20 = artifacts.require("./ERC20.sol");

module.exports = function(deployer) {
    // Use deployer to state migration tasks.
    console.log("Deploying...")

    let passwords = ["hi", "hello", "test", "what", "where", "when", "this", "awesome", "pwd", "notgoodpassword", "123456"]
    let hashed = []
    for (password of passwords) {
        hashed.push(web3.utils.sha3(web3.utils.asciiToHex(password)))
    }
    console.log(hashed)

    deployer.deploy(Phoneaccess).then(async() => {
        return deployer.deploy(User, "254777777777", "Bob", Phoneaccess.address, hashed);
    }).then(async() => {
        return deployer.deploy(ERC20, "TEST", "TEST", 1, User.address, "100000000")
    }).then(async() => {
        console.log("Deployed with addresses")
        console.log("User ", User.address)
        console.log("Phoneaccess ", Phoneaccess.address)
        console.log("ERC20 ", ERC20.address)
    });
};