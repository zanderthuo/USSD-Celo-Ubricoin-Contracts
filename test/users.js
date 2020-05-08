const UserContract = artifacts.require("./User.sol")
const PhoneContract = artifacts.require("./AccessPhone.sol")
const ERC20Contract = artifacts.require("./ERC20.sol")


contract("User", function(accounts) {
    let alice = accounts[0];
    let bob = "0x40058579f9D68ebebBe6E6F45c1995D5143F26AC";
    let userContract
    let phoneContract
    let erc20Contract
    console.log(UserContract.address)
    it("should assert true", async() => {
        userContract = await UserContract.deployed();
        assert(userContract.address, "address not defined");
        phoneContract = await PhoneContract.deployed();
        assert(phoneContract.address, "address not defined");
        assert.isTrue(true);
        erc20Contract = await ERC20Contract.deployed()
        assert(erc20Contract.address, "address not defined");
        assert.isTrue(true);
    });

    // it("should add passwords in user contract", async () => {
    //     let passwords = ["hi", "hello", "test"]
    //     let hashed = []
    //     for(password of passwords) {
    //         hashed.push(web3.utils.sha3(web3.utils.asciiToHex(password)))
    //     }
    //     console.log(hashed)

    //     await userContract.addPasswords(hashed)
    //     assert.equal(await userContract.isPasswordValid(web3.utils.asciiToHex("hi")), true)
    //     try {
    //         assert.equal(await userContract.isPasswordValid(web3.utils.asciiToHex("his")), false)

    //     } catch(e) {
    //         console.log(e)
    //     }
    // });

    // it("should add trusted entity in the contract in user contract", async () => {

    //     await userContract.addTrustedEntity(phoneContract.address)
    //     assert.equal(await userContract.trustedEntities(phoneContract.address), true)
    //     assert.equal(await userContract.trustedEntities("0x0000000000000000000000000000000000000000"), false)
    // });


    // Create an ERC20 token and add it to the contract balance (user already gets it filled)

    it("should register the user in the accessphone", async() => {

        // now the accessphone should register the phoneNumber of the user
        try {
            await phoneContract.registerNewUser("254777777777", userContract.address)
        } catch (e) {
            console.log(e)
        }
        // accessphone gets a portion of the user's token using a password
        assert.equal(await phoneContract.users(userContract.address), "254777777777")
    });

    it("should let the accessphone get 100 tokens from the user", async() => {

        let balanceBefore = await erc20Contract.balanceOf(userContract.address)
            // now the accessphone should register the phoneNumber of the user
        try {
            await phoneContract.getUserTokens(erc20Contract.address, "100", "254777777777", web3.utils.asciiToHex("hi"))
        } catch (e) {
            console.log(e)
        }
        let balanceAfter = await erc20Contract.balanceOf(userContract.address)
        console.log(balanceBefore.toString(), balanceAfter.toString())
            // accessphone gets a portion of the user's token using a password
        assert.equal((balanceBefore.sub(balanceAfter)).toString(), "100")
        let balancePhone = await erc20Contract.balanceOf(phoneContract.address)
        assert.equal((balancePhone).toString(), "100")

        // asset it is retired
        assert.equal(await userContract.isPasswordValid(web3.utils.asciiToHex("hi")), false)

        // assert the user has 100 tokens
        assert.equal((await phoneContract.getUserBalance(userContract.address, erc20Contract.address)).toString(), "100")
            // assert.equal((await userContract.totalPasswordsLeft()).toString(), "2")

    });

    // now authtransfer from the user with a password

    it("should let the accessphone transfer user tokens with password", async() => {

        // need to register a new address
        let balanceBefore = (await phoneContract.getUserBalance(userContract.address, erc20Contract.address))
            // now the accessphone should register the phoneNumber of the user

        await phoneContract.registerNewUser("254777777778", bob)
        try {
            await phoneContract.authTransfer(erc20Contract.address, "254777777778", "50", "254777777777", web3.utils.asciiToHex("hello"))
        } catch (e) {
            console.log(e)
        }
        let balanceAfter = (await phoneContract.getUserBalance(userContract.address, erc20Contract.address))

        // assert the user has 50 tokens
        assert.equal((await phoneContract.getUserBalance(userContract.address, erc20Contract.address)).toString(), "50")
            // assert.equal((await userContract.totalPasswordsLeft()).toString(), "1")

    });

});