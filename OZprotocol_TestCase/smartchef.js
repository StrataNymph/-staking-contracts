const {
    expectEvent, // Assertions for emitted events
    time,
    expectRevert,
} = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const { use } = require("chai");

var chai = require("chai");
const { experiment } = require("fp-ts/lib/Store");
var expect = chai.expect;


const StakedToken = artifacts.require("TokenA");
const RewardToken = artifacts.require("ProtocolsToken");
const SmartChefInitializable = artifacts.require("SmartChefInitializable");



contract("Smartchef", (accounts) => {
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const owner = accounts[0];
    const feeAddress = accounts[1];
    const testAccount1 = accounts[6];
    const testAccount2 = accounts[7];
    const testAccount3 = accounts[8];
    const testAccount4 = accounts[9];
    const testAccount5 = accounts[10];
    const testAccount6 = accounts[11];
    const testAccount7 = accounts[12];
    const testAccount8 = accounts[13];
    const testAccount9 = accounts[14];
    const testAccount10 = accounts[15];
    const testAccount11 = accounts[16];
    const testAccount12 = accounts[17];
    const testAccount13 = accounts[18];
    const testAccount14 = accounts[19];
    const testAccount15 = accounts[20];
    

    var currentBlock;
    before(async function () {
        currentBlock = await web3.eth.getBlockNumber();
        StakedTokenInstance = await StakedToken.new();
        RewardTokenInstance = await RewardToken.new();
        SmartChefInitializableInstance = await SmartChefInitializable.new();
      
      
     

       
    });

            


    describe("[Testcase 1 : check if the smart contract has been created as set in the variables]", () => {
        it("1.1. Is the cake token address is the same as set in the variable?", async function () {

          var  startBlock = await web3.eth.getBlockNumber();
    //    startBlock = Number(startBlock) + Number(500)
          var bonusEndBlock = startBlock + Number(100);
          var poolLimitPerUser = "50000000000000000000";
          var rewardPerBlock = "2000000000000000000"
         
            await SmartChefInitializableInstance.initialize(StakedTokenInstance.address, RewardTokenInstance.address, rewardPerBlock, startBlock, bonusEndBlock,  poolLimitPerUser, owner, {from : owner})


            expect(await  SmartChefInitializableInstance.isInitialized()).equal(true);
            expect(await  SmartChefInitializableInstance.stakedToken()).equal(StakedTokenInstance.address);
            expect(await  SmartChefInitializableInstance.rewardToken()).equal( RewardTokenInstance.address);
            expect(Number(await  SmartChefInitializableInstance.startBlock())).equal(Number(startBlock));
            expect(Number(await  SmartChefInitializableInstance.bonusEndBlock())).equal(Number(bonusEndBlock));


       
       

        });



    });

//     describe("[Testcase 1 : update start and end blocks]", () => {
//         it("", async function () {

//             var startBlock =await web3.eth.getBlockNumber() + Number(100);
//             var bonusEndBlock = Number(startBlock) + Number(20);

// await SmartChefInitializableInstance.updateStartAndEndBlocks(startBlock, bonusEndBlock, {from : owner})
// var updateRewardPerBlock = "5000000000000000000"

// await SmartChefInitializableInstance.updateRewardPerBlock(updateRewardPerBlock, {from : owner})




//         });



//     });


describe("[Testcase 2 : deposit function first time first user]", () => {
    it(" ", async function () {


        await RewardTokenInstance.mint(SmartChefInitializableInstance.address, "50000000000000000000", {from : owner})

    
        

var amount = "10000000000000000000";
var user = testAccount2;
var rewardPerBlock = "2000000000000000000"


await StakedTokenInstance.transfer(user, amount,{
from: owner,
});



await StakedTokenInstance.approvel(
SmartChefInitializableInstance.contract.options.address,
amount,
{ from: user})

var beforeuserBalance = await StakedTokenInstance.balanceOf(user)

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)

var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
console.log("lastRewardBlock", Number(lastRewardBlock))


var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})

var currentBlock = await web3.eth.getBlockNumber();
console.log("currentBlock", Number(currentBlock))



var afteruserBalance = await StakedTokenInstance.balanceOf(user)
expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));


var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));



var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("stakedAccountBalance", Number(stakedAccountBalance))

var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
console.log("precisionFactor", Number(precisionFactor))


expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
});

});


describe("[Testcase 3 : deposit function second time first user]", () => {
    it(" ", async function () {


        var amount = "5000000000000000000";
        var user = testAccount2;
        var rewardPerBlock = "2000000000000000000"
        var beforeDepositAmount = "15000000000000000000"
        
        var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        var rewardDebt = userInfo.rewardDebt;
        console.log("rewardDebt", Number(rewardDebt))
         
        await StakedTokenInstance.transfer(user, amount,{
            from: owner,
          });
        
          var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
          console.log("accTokenPerShare1", Number(accTokenPerShare1))
        
        
          await StakedTokenInstance.approvel(
            SmartChefInitializableInstance.contract.options.address,
            amount,
            { from: user})
        
            var beforeuserBalance = await StakedTokenInstance.balanceOf(user)
        
            var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        
        
            var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        
        var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
        console.log("lastRewardBlock", Number(lastRewardBlock))
        
        var beforerewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("beforerewardToken", Number(beforerewardToken))
        
        
      var deposit =  await SmartChefInitializableInstance.deposit(amount, {from : user})
        var userInfo1 = await SmartChefInitializableInstance.userInfo(user)
        
        
        var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
        console.log("accTokenPerShare2", Number(accTokenPerShare2))
        
        
        var afteruserBalance = await StakedTokenInstance.balanceOf(user)
        expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));
        
        
        var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));
        
        
        
        var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        console.log("stakedAccountBalance", Number(stakedAccountBalance))
        
        
        var currentBlock = await web3.eth.getBlockNumber();
        console.log("currentBlock", Number(currentBlock))
        
        
         var mutipler = Number(currentBlock) - Number(lastRewardBlock)
         var GKTReward = Number(mutipler) * Number(rewardPerBlock)
        console.log("GKTReward", Number(GKTReward))
        
        var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
        console.log("precisionFactor", Number(precisionFactor))
        var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
        console.log("accTokenPerShare", Number(accTokenPerShare))
        
        
        var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare) / Number(precisionFactor) - Number(rewardDebt);
        console.log("pendingCalculation", Number(pendingCalculation))
        
        var afterrewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("afterrewardToken", Number(afterrewardToken))
        
        
        expect(Number(afterrewardToken)).equal(Number(beforerewardToken) + Number(pendingCalculation))


expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
          })

});




describe("[Testcase 4 : deposit function third time first user]", () => {
    it(" ", async function () {


var amount = "5000000000000000000";
var user = testAccount2;
var rewardPerBlock = "2000000000000000000"
var beforeDepositAmount = "15000000000000000000"

var userInfo = await SmartChefInitializableInstance.userInfo(user)

var rewardDebt = userInfo.rewardDebt;
console.log("rewardDebt", Number(rewardDebt))

await StakedTokenInstance.transfer(user, amount,{
from: owner,
});

var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
console.log("accTokenPerShare1", Number(accTokenPerShare1))


await StakedTokenInstance.approvel(
SmartChefInitializableInstance.contract.options.address,
amount,
{ from: user})

var beforeuserBalance = await StakedTokenInstance.balanceOf(user)

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)


var userInfo = await SmartChefInitializableInstance.userInfo(user)


var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
console.log("lastRewardBlock", Number(lastRewardBlock))

var beforerewardToken = await RewardTokenInstance.balanceOf(user)
console.log("beforerewardToken", Number(beforerewardToken))


var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})
var userInfo1 = await SmartChefInitializableInstance.userInfo(user)


var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
console.log("accTokenPerShare2", Number(accTokenPerShare2))


var afteruserBalance = await StakedTokenInstance.balanceOf(user)
expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));


var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));



var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("stakedAccountBalance", Number(stakedAccountBalance))


var currentBlock = await web3.eth.getBlockNumber();
console.log("currentBlock", Number(currentBlock))


var mutipler = Number(currentBlock) - Number(lastRewardBlock)
var GKTReward = Number(mutipler) * Number(rewardPerBlock)
console.log("GKTReward", Number(GKTReward))

var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
console.log("precisionFactor", Number(precisionFactor))
var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
console.log("accTokenPerShare", Number(accTokenPerShare))


var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare) / Number(precisionFactor) - Number(rewardDebt);
console.log("pendingCalculation", Number(pendingCalculation))

var afterrewardToken = await RewardTokenInstance.balanceOf(user)
console.log("afterrewardToken", Number(afterrewardToken))


expect(Number(afterrewardToken)).equal(Number(beforerewardToken) + Number(pendingCalculation))

expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
});

});



describe("[Testcase 2 : deposit function first time second user]", () => {
    it(" ", async function () {


        await RewardTokenInstance.mint(SmartChefInitializableInstance.address, "50000000000000000000", {from : owner})
      
    
         
var amount = "10000000000000000000";
var user = testAccount3;
var rewardPerBlock = "2000000000000000000"
var beforeDepositAmount = 0;
var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
var rewardDebt = userInfo.rewardDebt;
console.log("rewardDebt", Number(rewardDebt))

await StakedTokenInstance.transfer(user, amount,{
from: owner,
});



await StakedTokenInstance.approvel(
SmartChefInitializableInstance.contract.options.address,
amount,
{ from: user})

var beforeuserBalance = await StakedTokenInstance.balanceOf(user)

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)

var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
console.log("lastRewardBlock", Number(lastRewardBlock))


var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})

var currentBlock = await web3.eth.getBlockNumber();
console.log("currentBlock", Number(currentBlock))



var afteruserBalance = await StakedTokenInstance.balanceOf(user)
expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));


var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));



var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("stakedAccountBalance", Number(stakedAccountBalance))

var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
console.log("precisionFactor", Number(precisionFactor))

var rewardDebt = 0;

var pendingCalculation = Number(beforeDepositAmount) * Number(0) / Number(precisionFactor) - Number(rewardDebt);
console.log("pendingCalculation", Number(pendingCalculation))

var afterrewardToken = await RewardTokenInstance.balanceOf(user)
console.log("afterrewardToken", Number(afterrewardToken))


expect(Number(afterrewardToken)).equal(Number(pendingCalculation))
var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
var rewardDebt = userInfo.rewardDebt;
console.log("rewardDebt", Number(rewardDebt))


expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
});

});





describe("[Testcase 3 : deposit function second time second user]", () => {
    it(" ", async function () {


        var amount = "5000000000000000000";
        var user = testAccount3;
        var rewardPerBlock = "2000000000000000000"
        var beforeDepositAmount = "10000000000000000000"
        
        var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        var rewardDebt = userInfo.rewardDebt;
        console.log("rewardDebt", Number(rewardDebt))
         
        await StakedTokenInstance.transfer(user, amount,{
            from: owner,
          });
        
          var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
          console.log("accTokenPerShare1", Number(accTokenPerShare1))
        
        
          await StakedTokenInstance.approvel(
            SmartChefInitializableInstance.contract.options.address,
            amount,
            { from: user})
        
            var beforeuserBalance = await StakedTokenInstance.balanceOf(user)
        
            var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        
        
            var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        
        var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
        console.log("lastRewardBlock", Number(lastRewardBlock))
        
        var beforerewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("beforerewardToken", Number(beforerewardToken))
        
        
        var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})
        var userInfo1 = await SmartChefInitializableInstance.userInfo(user)
        
        
        var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
        console.log("accTokenPerShare2", Number(accTokenPerShare2))
        
        
        var afteruserBalance = await StakedTokenInstance.balanceOf(user)
        expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));
        
        
        var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));
        
        
        
        var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        console.log("stakedAccountBalance", Number(stakedAccountBalance))
        
        
        var currentBlock = await web3.eth.getBlockNumber();
        console.log("currentBlock", Number(currentBlock))
        
        
         var mutipler = Number(currentBlock) - Number(lastRewardBlock)
         var GKTReward = Number(mutipler) * Number(rewardPerBlock)
        console.log("GKTReward", Number(GKTReward))
        
        var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
        console.log("precisionFactor", Number(precisionFactor))
        var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
        console.log("accTokenPerShare", Number(accTokenPerShare))
        
        
        var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare2) / Number(precisionFactor) - Number(14000000000000000000);
        console.log("pendingCalculation", Number(pendingCalculation))
        
        var afterrewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("afterrewardToken", Number(afterrewardToken))
        
        
        expect(Number(afterrewardToken)).equal(Number(beforerewardToken) + Number(pendingCalculation))

expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
          })
});





describe("[Testcase 3 : deposit function third time second user]", () => {
    it(" ", async function () {


        var amount = "5000000000000000000";
        var user = testAccount3;
        var rewardPerBlock = "2000000000000000000"
        var beforeDepositAmount = "15000000000000000000"
        
        var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        var rewardDebt = userInfo.rewardDebt;
        console.log("rewardDebt", Number(rewardDebt))
         
        await StakedTokenInstance.transfer(user, amount,{
            from: owner,
          });
        
          var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
          console.log("accTokenPerShare1", Number(accTokenPerShare1))
        
        
          await StakedTokenInstance.approvel(
            SmartChefInitializableInstance.contract.options.address,
            amount,
            { from: user})
        
            var beforeuserBalance = await StakedTokenInstance.balanceOf(user)
        
            var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        
        
            var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        
        var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
        console.log("lastRewardBlock", Number(lastRewardBlock))
        
        var beforerewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("beforerewardToken", Number(beforerewardToken))
        
        
    var deposit=   await SmartChefInitializableInstance.deposit(amount, {from : user})
        var userInfo1 = await SmartChefInitializableInstance.userInfo(user)
        
        
        var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
        console.log("accTokenPerShare2", Number(accTokenPerShare2))
        
        
        var afteruserBalance = await StakedTokenInstance.balanceOf(user)
        expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));
        
        
        var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));
        
        
        
        var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        console.log("stakedAccountBalance", Number(stakedAccountBalance))
        
        
        var currentBlock = await web3.eth.getBlockNumber();
        console.log("currentBlock", Number(currentBlock))
        
        
         var mutipler = Number(currentBlock) - Number(lastRewardBlock)
         var GKTReward = Number(mutipler) * Number(rewardPerBlock)
        console.log("GKTReward", Number(GKTReward))
        
        var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
        console.log("precisionFactor", Number(precisionFactor))
        var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
        console.log("accTokenPerShare", Number(accTokenPerShare))
        
        
        var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare2) / Number(precisionFactor) - Number(24000000000000000000);
        console.log("pendingCalculation", Number(pendingCalculation))
        
        var afterrewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("afterrewardToken", Number(afterrewardToken))
        
        
        expect(Number(afterrewardToken)).equal(Number(beforerewardToken) + Number(pendingCalculation))

expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
          })
});







describe("[Testcase 2 : deposit function first time third user]", () => {
    it(" ", async function () {


        await RewardTokenInstance.mint(SmartChefInitializableInstance.address, "50000000000000000000", {from : owner})
      
    
         
var amount = "10000000000000000000";
var user = testAccount4;
var rewardPerBlock = "2000000000000000000"
var beforeDepositAmount = 0;
var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
var rewardDebt = userInfo.rewardDebt;
console.log("rewardDebt", Number(rewardDebt))

await StakedTokenInstance.transfer(user, amount,{
from: owner,
});



await StakedTokenInstance.approvel(
SmartChefInitializableInstance.contract.options.address,
amount,
{ from: user})

var beforeuserBalance = await StakedTokenInstance.balanceOf(user)

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)

var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
console.log("lastRewardBlock", Number(lastRewardBlock))


var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})

var currentBlock = await web3.eth.getBlockNumber();
console.log("currentBlock", Number(currentBlock))



var afteruserBalance = await StakedTokenInstance.balanceOf(user)
expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));


var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));



var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("stakedAccountBalance", Number(stakedAccountBalance))

var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
console.log("precisionFactor", Number(precisionFactor))

var rewardDebt = 0;

var pendingCalculation = Number(beforeDepositAmount) * Number(0) / Number(precisionFactor) - Number(rewardDebt);
console.log("pendingCalculation", Number(pendingCalculation))

var afterrewardToken = await RewardTokenInstance.balanceOf(user)
console.log("afterrewardToken", Number(afterrewardToken))


expect(Number(afterrewardToken)).equal(Number(pendingCalculation))
var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
var rewardDebt = userInfo.rewardDebt;
console.log("rewardDebt", Number(rewardDebt))

expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});

});

});





describe("[Testcase 3 : deposit function second time third user]", () => {
    it(" ", async function () {


        var amount = "5000000000000000000";
        var user = testAccount4;
        var rewardPerBlock = "2000000000000000000"
        var beforeDepositAmount = "10000000000000000000"
        
        var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        var rewardDebt = userInfo.rewardDebt;
        console.log("rewardDebt", Number(rewardDebt))
         
        await StakedTokenInstance.transfer(user, amount,{
            from: owner,
          });
        
          var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
          console.log("accTokenPerShare1", Number(accTokenPerShare1))
        
        
          await StakedTokenInstance.approvel(
            SmartChefInitializableInstance.contract.options.address,
            amount,
            { from: user})
        
            var beforeuserBalance = await StakedTokenInstance.balanceOf(user)
        
            var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        
        
            var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        
        var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
        console.log("lastRewardBlock", Number(lastRewardBlock))
        
        var beforerewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("beforerewardToken", Number(beforerewardToken))
        
        
        var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})
        var userInfo1 = await SmartChefInitializableInstance.userInfo(user)
        
        
        var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
        console.log("accTokenPerShare2", Number(accTokenPerShare2))
        
        
        var afteruserBalance = await StakedTokenInstance.balanceOf(user)
        expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));
        
        
        var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));
        
        
        
        var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        console.log("stakedAccountBalance", Number(stakedAccountBalance))
        
        
        var currentBlock = await web3.eth.getBlockNumber();
        console.log("currentBlock", Number(currentBlock))
        
        
         var mutipler = Number(currentBlock) - Number(lastRewardBlock)
         var GKTReward = Number(mutipler) * Number(rewardPerBlock)
        console.log("GKTReward", Number(GKTReward))
        
        var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
        console.log("precisionFactor", Number(precisionFactor))
        var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
        console.log("accTokenPerShare", Number(accTokenPerShare))
        
        
        var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare2) / Number(precisionFactor) - Number(19714285714280000000);
        console.log("pendingCalculation", Number(pendingCalculation))
        
        var afterrewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("afterrewardToken", Number(afterrewardToken))
        
        
        expect(Number(afterrewardToken)).equal(Number(beforerewardToken) + Number(pendingCalculation))

expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
          })
});





describe("[Testcase 3 : deposit function third time third user]", () => {
    it(" ", async function () {


        var amount = "5000000000000000000";
        var user = testAccount4;
        var rewardPerBlock = "2000000000000000000"
        var beforeDepositAmount = "15000000000000000000"
        
        var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        var rewardDebt = userInfo.rewardDebt;
        console.log("rewardDebt", Number(rewardDebt))
         
        await StakedTokenInstance.transfer(user, amount,{
            from: owner,
          });
        
          var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
          console.log("accTokenPerShare1", Number(accTokenPerShare1))
        
        
          await StakedTokenInstance.approvel(
            SmartChefInitializableInstance.contract.options.address,
            amount,
            { from: user})
        
            var beforeuserBalance = await StakedTokenInstance.balanceOf(user)
        
            var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        
        
            var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        
        var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
        console.log("lastRewardBlock", Number(lastRewardBlock))
        
        var beforerewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("beforerewardToken", Number(beforerewardToken))
        
        
        var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})
        var userInfo1 = await SmartChefInitializableInstance.userInfo(user)
        
        
        var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
        console.log("accTokenPerShare2", Number(accTokenPerShare2))
        
        
        var afteruserBalance = await StakedTokenInstance.balanceOf(user)
        expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));
        
        
        var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));
        
        
        
        var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        console.log("stakedAccountBalance", Number(stakedAccountBalance))
        
        
        var currentBlock = await web3.eth.getBlockNumber();
        console.log("currentBlock", Number(currentBlock))
        
        
         var mutipler = Number(currentBlock) - Number(lastRewardBlock)
         var GKTReward = Number(mutipler) * Number(rewardPerBlock)
        console.log("GKTReward", Number(GKTReward))
        
        var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
        console.log("precisionFactor", Number(precisionFactor))
        var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
        console.log("accTokenPerShare", Number(accTokenPerShare))
        
        
        var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare2) / Number(precisionFactor) - Number(31371428571420000000);
        console.log("pendingCalculation", Number(pendingCalculation))
        
        var afterrewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("afterrewardToken", Number(afterrewardToken))
        
        
        expect(Number(afterrewardToken/1e18).toFixed(3)).equal((Number(beforerewardToken/1e18) + Number(pendingCalculation/1e18)).toFixed(3))


expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
          })
});





describe("[Testcase 2 : deposit function first time third user]", () => {
    it(" ", async function () {


        await RewardTokenInstance.mint(SmartChefInitializableInstance.address, "50000000000000000000", {from : owner})
      
    
         
var amount = "10000000000000000000";
var user = testAccount5;
var rewardPerBlock = "2000000000000000000"
var beforeDepositAmount = 0;
var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
var rewardDebt = userInfo.rewardDebt;
console.log("rewardDebt", Number(rewardDebt))

await StakedTokenInstance.transfer(user, amount,{
from: owner,
});



await StakedTokenInstance.approvel(
SmartChefInitializableInstance.contract.options.address,
amount,
{ from: user})

var beforeuserBalance = await StakedTokenInstance.balanceOf(user)

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)

var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
console.log("lastRewardBlock", Number(lastRewardBlock))


var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})

var currentBlock = await web3.eth.getBlockNumber();
console.log("currentBlock", Number(currentBlock))



var afteruserBalance = await StakedTokenInstance.balanceOf(user)
expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));


var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));



var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("stakedAccountBalance", Number(stakedAccountBalance))

var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
console.log("precisionFactor", Number(precisionFactor))

var rewardDebt = 0;

var pendingCalculation = Number(beforeDepositAmount) * Number(0) / Number(precisionFactor) - Number(rewardDebt);
console.log("pendingCalculation", Number(pendingCalculation))

var afterrewardToken = await RewardTokenInstance.balanceOf(user)
console.log("afterrewardToken", Number(afterrewardToken))


expect(Number(afterrewardToken)).equal(Number(pendingCalculation))
var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
var rewardDebt = userInfo.rewardDebt;
console.log("rewardDebt", Number(rewardDebt))

expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});

});

});





describe("[Testcase 3 : deposit function second time third user]", () => {
    it(" ", async function () {


        var amount = "5000000000000000000";
        var user = testAccount5;
        var rewardPerBlock = "2000000000000000000"
        var beforeDepositAmount = "10000000000000000000"
        
        var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        var rewardDebt = userInfo.rewardDebt;
        console.log("rewardDebt", Number(rewardDebt))
         
        await StakedTokenInstance.transfer(user, amount,{
            from: owner,
          });
        
          var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
          console.log("accTokenPerShare1", Number(accTokenPerShare1))
        
        
          await StakedTokenInstance.approvel(
            SmartChefInitializableInstance.contract.options.address,
            amount,
            { from: user})
        
            var beforeuserBalance = await StakedTokenInstance.balanceOf(user)
        
            var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        
        
            var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        
        var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
        console.log("lastRewardBlock", Number(lastRewardBlock))
        
        var beforerewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("beforerewardToken", Number(beforerewardToken))
        
        
        var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})
        var userInfo1 = await SmartChefInitializableInstance.userInfo(user)
        
        
        var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
        console.log("accTokenPerShare2", Number(accTokenPerShare2))
        
        
        var afteruserBalance = await StakedTokenInstance.balanceOf(user)
        expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));
        
        
        var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));
        
        
        
        var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        console.log("stakedAccountBalance", Number(stakedAccountBalance))
        
        
        var currentBlock = await web3.eth.getBlockNumber();
        console.log("currentBlock", Number(currentBlock))
        
        
         var mutipler = Number(currentBlock) - Number(lastRewardBlock)
         var GKTReward = Number(mutipler) * Number(rewardPerBlock)
        console.log("GKTReward", Number(GKTReward))
        
        var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
        console.log("precisionFactor", Number(precisionFactor))
        var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
        console.log("accTokenPerShare", Number(accTokenPerShare))
        
        
        var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare2) / Number(precisionFactor) - Number(23338528138510000000);
        console.log("pendingCalculation", Number(pendingCalculation))
        
        var afterrewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("afterrewardToken", Number(afterrewardToken))
        
        
        expect(Number(afterrewardToken/1e18).toFixed(3)).equal((Number(beforerewardToken/1e18) + Number(pendingCalculation/1e18)).toFixed(3))

expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
          })
});





describe("[Testcase 3 : deposit function third time third user]", () => {
    it(" ", async function () {


        var amount = "5000000000000000000";
        var user = testAccount5;
        var rewardPerBlock = "2000000000000000000"
        var beforeDepositAmount = "15000000000000000000"
        
        var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        var rewardDebt = userInfo.rewardDebt;
        console.log("rewardDebt", Number(rewardDebt))
         
        await StakedTokenInstance.transfer(user, amount,{
            from: owner,
          });
        
          var accTokenPerShare1 = await SmartChefInitializableInstance.accTokenPerShare()
          console.log("accTokenPerShare1", Number(accTokenPerShare1))
        
        
          await StakedTokenInstance.approvel(
            SmartChefInitializableInstance.contract.options.address,
            amount,
            { from: user})
        
            var beforeuserBalance = await StakedTokenInstance.balanceOf(user)
        
            var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        
        
            var userInfo = await SmartChefInitializableInstance.userInfo(user)
        
        
        var lastRewardBlock = await SmartChefInitializableInstance.lastRewardBlock();
        console.log("lastRewardBlock", Number(lastRewardBlock))
        
        var beforerewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("beforerewardToken", Number(beforerewardToken))
        
        
        var deposit = await SmartChefInitializableInstance.deposit(amount, {from : user})
        var userInfo1 = await SmartChefInitializableInstance.userInfo(user)
        
        
        var accTokenPerShare2 = await SmartChefInitializableInstance.accTokenPerShare()
        console.log("accTokenPerShare2", Number(accTokenPerShare2))
        
        
        var afteruserBalance = await StakedTokenInstance.balanceOf(user)
        expect(Number(afteruserBalance)).equal(Number(beforeuserBalance) - Number(amount));
        
        
        var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        expect(Number(afterContractBalance)).equal(Number(beforeContractBalance) + Number(amount));
        
        
        
        var stakedAccountBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
        console.log("stakedAccountBalance", Number(stakedAccountBalance))
        
        
        var currentBlock = await web3.eth.getBlockNumber();
        console.log("currentBlock", Number(currentBlock))
        
        
         var mutipler = Number(currentBlock) - Number(lastRewardBlock)
         var GKTReward = Number(mutipler) * Number(rewardPerBlock)
        console.log("GKTReward", Number(GKTReward))
        
        var precisionFactor = await SmartChefInitializableInstance.PRECISION_FACTOR()
        console.log("precisionFactor", Number(precisionFactor))
        var accTokenPerShare = Number(accTokenPerShare1) + (Number(GKTReward) * Number(precisionFactor) / Number(beforeDepositAmount))
        console.log("accTokenPerShare", Number(accTokenPerShare))
        
        
        var pendingCalculation = Number(beforeDepositAmount) * Number(accTokenPerShare2) / Number(precisionFactor) - Number(36293506493475000000);
        console.log("pendingCalculation", Number(pendingCalculation))
        
        var afterrewardToken = await RewardTokenInstance.balanceOf(user)
        console.log("afterrewardToken", Number(afterrewardToken))
        
        
        expect(Number(afterrewardToken/1e18).toFixed(3)).equal((Number(beforerewardToken/1e18) + Number(pendingCalculation/1e18)).toFixed(3))


expectEvent(deposit, "Deposit",{
user : user,
amount : amount,


});
          })
});




describe("[Testcase 3 : stop reward functiom]", () => {
    it(" ", async function () {

var bonusEndBlock = await SmartChefInitializableInstance.bonusEndBlock();
console.log("bonusEndBlock", Number(bonusEndBlock))
await SmartChefInitializableInstance.stopReward({from : owner})
var afterbonusEndBlock = await SmartChefInitializableInstance.bonusEndBlock();
console.log("afterbonusEndBlock", Number(afterbonusEndBlock))
var currentBlock = await web3.eth.getBlockNumber();
console.log("currentBlock", Number(currentBlock))
// var increaseBlock = currentBlock + Number(7101)
// console.log("increaseBlock", Number(increaseBlock))
// await time.advanceBlockTo(increaseBlock)




    });


});


describe("[Testcase 3 : withdraw function first user]", () => {
    it(" ", async function () {


var withdrawAmount = "0"
var user = testAccount2;
var rewardAmount = "30491341991299998000"

var beforeUserReward = await RewardTokenInstance.balanceOf(user);
console.log("beforeUserReward", Number(beforeUserReward))

var beforeContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractReward", Number(beforeContractReward))


var withdraw = await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserReward = await RewardTokenInstance.balanceOf(user);
console.log("afterUserReward", Number(afterUserReward))



var afterContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractReward", Number(afterContractReward))

expect(Number(afterUserReward/1e18).toFixed(3)).equal((Number(beforeUserReward/1e18) + Number(rewardAmount/1e18)).toFixed(3))
expect(Number(afterContractReward/1e18).toFixed(3)).equal((Number(beforeContractReward/1e18) - Number(rewardAmount/1e18)).toFixed(3))



expectEvent(withdraw, "Withdraw",{
user : user,
amount : withdrawAmount,


});



});


it(" ", async function () {
// var increaseBlock = currentBlock + Number(1)
// console.log("increaseBlock", Number(increaseBlock))
// await time.advanceBlockTo(increaseBlock)


var withdrawAmount = "15000000000000000000"
var user = testAccount2;

var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("beforeUserBalance", Number(beforeUserBalance))

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractBalance", Number(beforeContractBalance))


await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("afterUserBalance", Number(afterUserBalance))



var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractBalance", Number(afterContractBalance))

expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))



});



it(" ", async function () {
  
    var withdrawAmount = "5000000000000000000"
    var user = testAccount2;
  
    var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("beforeUserBalance", Number(beforeUserBalance))
    
    var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("beforeContractBalance", Number(beforeContractBalance))
    
    
    await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})
    
    
    
    var afterUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("afterUserBalance", Number(afterUserBalance))
    
    
    
    var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("afterContractBalance", Number(afterContractBalance))
    
    expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
    expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))
    
    
    
    });




});



describe("[Testcase 3 : pending reward function]", () => {
    it(" ", async function () {



var user = testAccount2;
var pendingReward = await SmartChefInitializableInstance.pendingReward(user, {from : owner})
console.log("pendingReward", Number(pendingReward))


var user = testAccount3;
var pendingReward = await SmartChefInitializableInstance.pendingReward(user, {from : owner})
console.log("pendingReward", Number(pendingReward))




var user = testAccount4;
var pendingReward = await SmartChefInitializableInstance.pendingReward(user, {from : owner})
console.log("pendingReward", Number(pendingReward))


var user = testAccount5;
var pendingReward = await SmartChefInitializableInstance.pendingReward(user, {from : owner})
console.log("pendingReward", Number(pendingReward))




});




});




describe("[Testcase 3 : withdraw function second user]", () => {
    it(" ", async function () {


var withdrawAmount = "0"
var user = testAccount3;
var rewardAmount = "10804040404000000000"

var beforeUserReward = await RewardTokenInstance.balanceOf(user);
console.log("beforeUserReward", Number(beforeUserReward))

var beforeContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractReward", Number(beforeContractReward))


await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserReward = await RewardTokenInstance.balanceOf(user);
console.log("afterUserReward", Number(afterUserReward))



var afterContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractReward", Number(afterContractReward))

//expect(Number(afterUserReward/1e18).toFixed(3)).equal((Number(beforeUserReward/1e18) + Number(rewardAmount/1e18)).toFixed(3))
//expect(Number(afterContractReward/1e18).toFixed(3)).equal((Number(beforeContractReward/1e18) - Number(rewardAmount/1e18)).toFixed(3))






});


it(" ", async function () {

var withdrawAmount = "15000000000000000000"
var user = testAccount3;

var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("beforeUserBalance", Number(beforeUserBalance))

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractBalance", Number(beforeContractBalance))


await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("afterUserBalance", Number(afterUserBalance))



var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractBalance", Number(afterContractBalance))

expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))



});



it(" ", async function () {
  
    var withdrawAmount = "5000000000000000000"
    var user = testAccount3;
  
    var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("beforeUserBalance", Number(beforeUserBalance))
    
    var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("beforeContractBalance", Number(beforeContractBalance))
    
    
    await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})
    
    
    
    var afterUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("afterUserBalance", Number(afterUserBalance))
    
    
    
    var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("afterContractBalance", Number(afterContractBalance))
    
    expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
    expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))
    
    
    
    });




});
describe("[Testcase 3 : withdraw function third user]", () => {
    it(" ", async function () {


var withdrawAmount = "0"
var user = testAccount4;
var rewardAmount = "2222222222200000000"

var beforeUserReward = await RewardTokenInstance.balanceOf(user);
console.log("beforeUserReward", Number(beforeUserReward))

var beforeContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractReward", Number(beforeContractReward))


await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserReward = await RewardTokenInstance.balanceOf(user);
console.log("afterUserReward", Number(afterUserReward))



var afterContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractReward", Number(afterContractReward))

//expect(Number(afterUserReward/1e18).toFixed(3)).equal((Number(beforeUserReward/1e18) + Number(rewardAmount/1e18)).toFixed(3))
//expect(Number(afterContractReward/1e18).toFixed(3)).equal((Number(beforeContractReward/1e18) - Number(rewardAmount/1e18)).toFixed(3))






});


it(" ", async function () {

var withdrawAmount = "10000000000000000000"
var user = testAccount4;

var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("beforeUserBalance", Number(beforeUserBalance))

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractBalance", Number(beforeContractBalance))


await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("afterUserBalance", Number(afterUserBalance))



var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractBalance", Number(afterContractBalance))

expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))



});



it(" ", async function () {
  
    var withdrawAmount = "5000000000000000000"
    var user = testAccount4;
  
    var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("beforeUserBalance", Number(beforeUserBalance))
    
    var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("beforeContractBalance", Number(beforeContractBalance))
    
    
    await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})
    
    
    
    var afterUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("afterUserBalance", Number(afterUserBalance))
    
    
    
    var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("afterContractBalance", Number(afterContractBalance))
    
    expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
    expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))
    
    var startBlock = await SmartChefInitializableInstance.startBlock();
    console.log("startBlock", Number(startBlock))

    var bonusEndBlock = await SmartChefInitializableInstance.bonusEndBlock();
    console.log("bonusEndBlock", Number(bonusEndBlock))


    
    });


});




describe("[Testcase 3 : withdraw function fourth user]", () => {
    it(" ", async function () {


var withdrawAmount = "0"
var user = testAccount5;
var rewardAmount = "10804040404000000000"

var beforeUserReward = await RewardTokenInstance.balanceOf(user);
console.log("beforeUserReward", Number(beforeUserReward))

var beforeContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractReward", Number(beforeContractReward))


await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserReward = await RewardTokenInstance.balanceOf(user);
console.log("afterUserReward", Number(afterUserReward))



var afterContractReward = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractReward", Number(afterContractReward))

//expect(Number(afterUserReward/1e18).toFixed(3)).equal((Number(beforeUserReward/1e18) + Number(rewardAmount/1e18)).toFixed(3))
//expect(Number(afterContractReward/1e18).toFixed(3)).equal((Number(beforeContractReward/1e18) - Number(rewardAmount/1e18)).toFixed(3))






});


it(" ", async function () {

var withdrawAmount = "15000000000000000000"
var user = testAccount5;

var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("beforeUserBalance", Number(beforeUserBalance))

var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeContractBalance", Number(beforeContractBalance))


await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})



var afterUserBalance = await StakedTokenInstance.balanceOf(user);
console.log("afterUserBalance", Number(afterUserBalance))



var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterContractBalance", Number(afterContractBalance))

expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))



});



it(" ", async function () {
  
    var withdrawAmount = "5000000000000000000"
    var user = testAccount5;
  
    var beforeUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("beforeUserBalance", Number(beforeUserBalance))
    
    var beforeContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("beforeContractBalance", Number(beforeContractBalance))
    
    
    await SmartChefInitializableInstance.withdraw(withdrawAmount, {from : user})
    
    
    
    var afterUserBalance = await StakedTokenInstance.balanceOf(user);
    console.log("afterUserBalance", Number(afterUserBalance))
    
    
    
    var afterContractBalance = await StakedTokenInstance.balanceOf(SmartChefInitializableInstance.address)
    console.log("afterContractBalance", Number(afterContractBalance))
    
    expect(Number(afterUserBalance/1e18).toFixed(3)).equal((Number(beforeUserBalance/1e18) + Number(withdrawAmount/1e18)).toFixed(3))
    expect(Number(afterContractBalance/1e18).toFixed(3)).equal((Number(beforeContractBalance/1e18) - Number(withdrawAmount/1e18)).toFixed(3))
    
    
    
    });




});



//     describe("[Testcase 3 : update Start and end blocks]", () => {
//         it(" ", async function () {


//             currentBlock = await web3.eth.getBlockNumber();
// var startBlock = Number(currentBlock) + Number(5)
// var bonusEndBlock = Number(startBlock) + Number(10)


// await SmartChefInitializableInstance.updateStartAndEndBlocks(startBlock, bonusEndBlock, {from : owner})


// var startBlock = await SmartChefInitializableInstance.startBlock();
// console.log("startBlock", Number(startBlock))

// var bonusEndBlock = await SmartChefInitializableInstance.bonusEndBlock();
// console.log("bonusEndBlock", Number(bonusEndBlock))




// });



//     });





describe("[Testcase 3 : emergency withdraw function]", () => {
it(" ", async function () {

var beforeRewardBalance = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("beforeRewardBalance", Number(beforeRewardBalance))
await SmartChefInitializableInstance.emergencyRewardWithdraw(beforeRewardBalance, {from : owner})
var afterRewardBalance = await RewardTokenInstance.balanceOf(SmartChefInitializableInstance.address)
console.log("afterRewardBalance", Number(afterRewardBalance))
});

});





// describe("[Testcase 3 : update reward per block function]", () => {
//     it(" ", async function () {

//         var beforeRewardPerBlock = await SmartChefInitializableInstance.rewardPerBlock()
//         console.log("beforeRewardPerBlock", Number(beforeRewardPerBlock))

//         var updateRewardPerBlockAmount = "5000000000000000000"
//     await SmartChefInitializableInstance.updateRewardPerBlock(updateRewardPerBlockAmount, {from : owner})
   
//     var afterRewardPerBlock = await SmartChefInitializableInstance.rewardPerBlock()
//     console.log("afterRewardPerBlock", Number(afterRewardPerBlock))
// });

// });














});