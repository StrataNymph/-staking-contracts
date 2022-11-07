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

const CakeToken = artifacts.require("ProtocolsToken");


const SyrupBar = artifacts.require("SyrupBar");
const LPtoken = artifacts.require("TokenA");
const MasterChef = artifacts.require("MasterChef");



contract("Strata_Defi", (accounts) => {
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
        LPtokenInstance = await LPtoken.new();
        CakeTokenInstance = await CakeToken.new();
        SyrupBarInstance = await SyrupBar.new(CakeTokenInstance.address);
      
         var devaddr = testAccount2;
         var ProtocolsPerBlock = "1000000000000000000"
        MasterChefInstance = await MasterChef.new(CakeTokenInstance.address, SyrupBarInstance.address, devaddr, ProtocolsPerBlock, currentBlock);


        await CakeTokenInstance.transferOwnership(MasterChefInstance.address, {from : owner});
        await SyrupBarInstance.transferOwnership(MasterChefInstance.address, {from : owner});
    });

            


        describe("[Testcase 1 : check if the smart contract has been created as set in the variables]", () => {
        it("1.1. Is the cake token address is the same as set in the variable?", async function () {

           
                expect(await  MasterChefInstance.Protocols()).equal(CakeTokenInstance.address);
                expect(await  MasterChefInstance.syrup()).equal(SyrupBarInstance.address);
                expect(await  MasterChefInstance.devaddr()).equal(testAccount2);
                expect(Number(await  MasterChefInstance.ProtocolsPerBlock())).equal(Number(1000000000000000000));
              
              
              
              })
                
              
           
                it("1.2.", async function () {
                  expect(Number(await  MasterChefInstance.BONUS_MULTIPLIER())).equal(Number(1)
                  
                  );
                })


                it("1.3.", async function () {
                  var poolInfo =await MasterChefInstance.poolInfo([0]);
                expect(poolInfo[0]).equal(CakeTokenInstance.address);



       });

                   

    });



            describe("[Testcase 1 : Add pool function]", () => {
              it("", async function () {


        var withUpdate = true;
        var allocPoint = "1000";
        var pID = "1";


          await MasterChefInstance.add( allocPoint, LPtokenInstance.address, withUpdate,{ from:owner });

          addFirstlptokenblock = await web3.eth.getBlockNumber();
          console.log("Add First LP Token Block", Number(addFirstlptokenblock));

          var poolInfo1 = await MasterChefInstance.poolInfo([Number(pID)]);

          expect(poolInfo1.lpToken).equal(LPtokenInstance.address);
          expect(Number(poolInfo1.allocPoint)).equal(Number(1000));

          expect(Number(poolInfo1.lastRewardBlock)).equal(Number(addFirstlptokenblock));



        });
        });


        
describe("[Testcase 3 : deposit function first time first user]", () => {
  describe("", () => {
    const user = testAccount1;
    const amount = "2000000000000000000";
    var pID = "1";
    const allocatedPoint = "1000";

    var accProtocolsPerShare;
    var kblDevaddrFee;

    accProtocolsPerShare = 0;
    kblDevaddrFee = 0;
    rewards = 0;


    
    it("",
      async function () {
        
      
       await LPtokenInstance.transfer(user, amount,{
          from: owner,
        });

      

        await LPtokenInstance.approvel(
          MasterChefInstance.contract.options.address,
          amount,
          { from: user}
          
        );



        var beforeUserbalance = await LPtokenInstance.balanceOf(user);


        var beforefirstLppools = await MasterChefInstance.poolInfo([
          Number(pID),
        ]);
        expect(beforefirstLppools.lpToken).equal(LPtokenInstance.address);
        expect(Number(beforefirstLppools.allocPoint)).equal(
          Number(allocatedPoint)
        );
        expect(Number(beforefirstLppools.lastRewardBlock)).equal(
          Number(addFirstlptokenblock)
        );
        expect(Number(beforefirstLppools.accProtocolsPerShare)).equal(
          Number(accProtocolsPerShare)
        );

        var beforeuserdetails = await MasterChefInstance.userInfo(
          Number(pID),
          user
        );

       
        var beforelpcontractbalance = await LPtokenInstance.balanceOf(
          MasterChefInstance.address
        );



      
        const deposit = await MasterChefInstance.deposit(
          Number(pID),
          amount,
          { from: user }
        );



        var afterUserbalance = await LPtokenInstance.balanceOf(user);
        expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
          (Number(beforeUserbalance / 1e18) - Number(amount / 1e18)).toFixed(
            3
          )
        );
      
        firstEnterLpBlock = await web3.eth.getBlockNumber();
        console.log("firstEnterLpBlock", Number(firstEnterLpBlock));

        var afterfirstLppools = await MasterChefInstance.poolInfo([
          Number(pID),
        ]);
       
        expect(afterfirstLppools.lpToken).equal(LPtokenInstance.address);
        expect(Number(afterfirstLppools.allocPoint)).equal(
          Number(allocatedPoint)
        );
        expect(Number(afterfirstLppools.lastRewardBlock)).equal(
          Number(firstEnterLpBlock)
        );
        expect(Number(afterfirstLppools.accProtocolsPerShare)).equal(
          Number(accProtocolsPerShare)
        );

        expectEvent(deposit, "Deposit", {
          user: user,
          pid: pID.toString(),
          amount: amount.toString(),
        });


     var afteruserdetails = await MasterChefInstance.userInfo(
      Number(pID),
      user
    );
    expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
      (
        Number(beforeuserdetails.amount / 1e18) + Number(amount / 1e18)
      ).toFixed(3)
    );

   console.log("afteruserdetails",(Number(afteruserdetails[1])));
       
   


    expect(Number(afteruserdetails.rewardDebt / 1e18).toFixed(3)).equal(
      (
        Number(beforeuserdetails.rewardDebt / 1e18) +
        Number(rewards / 1e18)
      ).toFixed(3)
    );
    console.log("rewardDebt",Number(afteruserdetails.rewardDebt ))
    var afterlpcontractbalance = await LPtokenInstance.balanceOf(
      MasterChefInstance.address
    );
    expect(Number(afterlpcontractbalance).toFixed(3)).equal(
      (
        Number(beforelpcontractbalance) +
        Number(amount)
      ).toFixed(3)
    );
 

});
})
})




describe("[Testcase 3 : deposit function first time second user]", () => {
  describe("", () => {




  const user = testAccount2;
  const amount = "15000000000000000000";
  var pID = "1";
  const allocatedPoint = "1000";
  var rewards;
  var cakeShare;
  var cakeDevaddrFee;

  cakeShare = 0;
  cakeDevaddrFee = 0;
  rewards = 0;
  var ProtocolsPerBlock = "1000000000000000000"

  it("",
  async function () {
    
  

      

   await LPtokenInstance.transfer(user, amount,{
      from: owner,
    });

  

    await LPtokenInstance.approvel(
      MasterChefInstance.contract.options.address,
      amount,
      { from: user}
      
    );



    var beforeUserbalance = await LPtokenInstance.balanceOf(user);


    var beforelpcontractbalance = await LPtokenInstance.balanceOf(
      MasterChefInstance.address
    );


    var beforefirstLppools = await MasterChefInstance.poolInfo([
      Number(pID),
    ]);
    expect(beforefirstLppools.lpToken).equal(LPtokenInstance.address);
    expect(Number(beforefirstLppools.allocPoint)).equal(
      Number(allocatedPoint)
    );

    var beforeuserdetails = await MasterChefInstance.userInfo(
      Number(pID),
      user
    );
    var bonusMutipler = await MasterChefInstance.BONUS_MULTIPLIER();
    var totalAllocPoint = await MasterChefInstance.totalAllocPoint();




    const deposit = await MasterChefInstance.deposit(
      Number(pID),
      amount,
      { from: user }
    );


    secondEnterLpBlock = await web3.eth.getBlockNumber();
    console.log("secondEnterLpBlock", Number(secondEnterLpBlock));

    var mutipler =
      (Number(secondEnterLpBlock) -
        Number(beforefirstLppools.lastRewardBlock)) *
      Number(bonusMutipler);
    var cakeReward =
      (Number(mutipler) * Number(ProtocolsPerBlock) * Number(allocatedPoint)) /
      Number(totalAllocPoint);

      cakeDevaddrFee = Number(cakeReward / 10);
    console.log("cakeDevaddrFee", Number(cakeDevaddrFee / 1e18));
     var syrup=Number(cakeReward);
    console.log("syrup",syrup);

    cakeShare = (Number(cakeReward) * Number(1e12)) /
      Number(beforelpcontractbalance);





      var afterfirstLppools = await MasterChefInstance.poolInfo([
        Number(pID),
      ]);
      expect(afterfirstLppools.lpToken).equal(LPtokenInstance.address);
      expect(Number(afterfirstLppools.allocPoint)).equal(
        Number(allocatedPoint)
      );
      expect(Number(afterfirstLppools.lastRewardBlock)).equal(
        Number(secondEnterLpBlock)
      );
      expect(
        Number(afterfirstLppools.accProtocolsPerShare / 1e18).toFixed(3)
      ).equal(
        (
          Number(cakeShare / 1e18) +
          Number(beforefirstLppools.accProtocolsPerShare / 1e18)
        ).toFixed(3)
      );
         console.log("accProtocolsPerShare ",Number(afterfirstLppools.accProtocolsPerShare))

      rewards =
      (Number(amount) * Number(afterfirstLppools.accProtocolsPerShare)) /
      Number(1e12);
    console.log("rewards", Number(rewards / 1e18));


      expectEvent(deposit, "Deposit", {
        user: user,
        pid: pID.toString(),
        amount: amount.toString(),
      });

      var afteruserdetails = await MasterChefInstance.userInfo(
        Number(pID),
        user
      );
      expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
        (
          Number(beforeuserdetails.amount / 1e18) + Number(amount / 1e18)
        ).toFixed(3)
      );
      expect(Number(afteruserdetails.rewardDebt / 1e18).toFixed(3)).equal(
        (
          Number(beforeuserdetails.rewardDebt / 1e18) +
          Number(rewards/1e18)
        ).toFixed(3)
      );

      console.log("rewardDebt",Number(afteruserdetails.rewardDebt));

      var afterUserbalance = await LPtokenInstance.balanceOf(user);
      expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
        (Number(beforeUserbalance / 1e18) - Number(amount / 1e18)).toFixed(
          3
        )
      );



      var afterlpcontractbalance = await LPtokenInstance.balanceOf(
        MasterChefInstance.address
      );
      expect(Number(afterlpcontractbalance).toFixed(3)).equal(
        (
          Number(beforelpcontractbalance) +
          Number(amount)
        ).toFixed(3)
      );
   


    });
  })

});

describe("[Testcase 3 : deposit function second time first user]", () => {
  describe("", () => {




  const user = testAccount1;
  const amount ="35000000000000000000";
  var pID = "1";
  const allocatedPoint = "1000";
 
  var rewards1;
  var CakeShare;
  var CakeDevaddrFee;
  var ProtocolsPerBlock = "1000000000000000000"


  CakeShare = 0;
  CakeDevaddrFee = 0;
  
 

  it("",
  async function () {
    
  

      
   await LPtokenInstance.transfer(user, amount,{
      from: owner,
    });

  

    await LPtokenInstance.approvel(
      MasterChefInstance.contract.options.address,
      amount,
      { from: user}
      
    );
    var beforeUserbalance2 = await  CakeTokenInstance .balanceOf(user);
    console.log("beforeUserbalance2 ",Number(beforeUserbalance2))



    var beforeUserbalance = await LPtokenInstance.balanceOf(user);


    var beforelpcontractbalance = await LPtokenInstance.balanceOf(
      MasterChefInstance.address
    );


    var beforefirstLppools = await MasterChefInstance.poolInfo([
      Number(pID),
    ]);


    expect(beforefirstLppools.lpToken).equal(LPtokenInstance.address);
    expect(Number(beforefirstLppools.allocPoint)).equal(
      Number(allocatedPoint)
    );

    var beforeuserdetails = await MasterChefInstance.userInfo(
      Number(pID),
      user
    );
    var bonusMutipler = await MasterChefInstance.BONUS_MULTIPLIER();
    var totalAllocPoint = await MasterChefInstance.totalAllocPoint();




    const deposit = await MasterChefInstance.deposit(
      Number(pID),
      amount,
      { from: user }
    );



    var pendingProtocols=(Number(await MasterChefInstance.pendingProtocols(pID,user)));
    console.log("pendingProtocols",(Number(pendingProtocols)));




    secondEnterLpBlock = await web3.eth.getBlockNumber();
    console.log("secondEnterLpBlock", Number(secondEnterLpBlock));



    var mutipler =
      (Number(secondEnterLpBlock) -
        Number(beforefirstLppools.lastRewardBlock)) *
      Number(bonusMutipler);


    var cakeReward =
      (Number(mutipler) * Number(ProtocolsPerBlock) * Number(allocatedPoint)) /
      Number(totalAllocPoint);


      CakeDevaddrFee = Number(cakeReward / 10);
    console.log("CakeDevaddrFee", Number(CakeDevaddrFee / 1e18));


     var syrup=Number(cakeReward);
    console.log("syrup",syrup);

    CakeShare  = (Number(cakeReward) * Number(1e12)) /
      Number(beforelpcontractbalance);


      var afterUserbalance2= await CakeTokenInstance.balanceOf(user);
      console.log("afterUserbalance2",Number(afterUserbalance2))


      var afterfirstLppools = await MasterChefInstance.poolInfo([
        Number(pID),
      ]);
      expect(afterfirstLppools.lpToken).equal(LPtokenInstance.address);
      expect(Number(afterfirstLppools.allocPoint)).equal(
        Number(allocatedPoint)
      );
      expect(Number(afterfirstLppools.lastRewardBlock)).equal(
        Number(secondEnterLpBlock)
      );
      expect(
        Number(afterfirstLppools.accProtocolsPerShare / 1e18).toFixed(3)
      ).equal(
        (
          Number(CakeShare / 1e18) +
          Number(beforefirstLppools.accProtocolsPerShare / 1e18)
        ).toFixed(3)
      );
      console.log("afterfirstLppools.accCakePerShare",(Number(afterfirstLppools.accProtocolsPerShare)));



      expectEvent(deposit, "Deposit", {
        user: user,
        pid: pID.toString(),
        amount: amount.toString(),
      });

      var afteruserdetails = await MasterChefInstance.userInfo(
        Number(pID),
        user
      );


      

      expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
        (
          Number(beforeuserdetails.amount / 1e18) + Number(amount / 1e18)
        ).toFixed(3)
      );
       console.log("afteruserdetails.amount",(Number(afteruserdetails.amount)));
       console.log("afteruserdetails.rewardDebt",(Number(afteruserdetails.rewardDebt)));

    


     var values=(Number(afteruserdetails.amount)*Number(afterfirstLppools.accProtocolsPerShare))/ Number(1e12);
       console.log("values",Number(values));

    expect(Number(afteruserdetails.rewardDebt / 1e18).toFixed(3)).equal(
      Number(values / 1e18).toFixed(3)
    );

      expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
        (
          Number(beforeuserdetails.amount / 1e18) + Number(amount / 1e18)
        ).toFixed(3)
      );

      var afterUserbalance = await LPtokenInstance.balanceOf(user);
      expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
        (Number(beforeUserbalance / 1e18) - Number(amount / 1e18)).toFixed(
          3
        )
      );


      var afterlpcontractbalance = await LPtokenInstance.balanceOf(
        MasterChefInstance.address
      );
      expect(Number(afterlpcontractbalance).toFixed(3)).equal(
        (
          Number(beforelpcontractbalance) +
          Number(amount)
        ).toFixed(3)
      );
   


    });
  })  
 


});




describe("[Testcase 3 : deposit function second time second user]", () => {
describe("", () => {




      const user = testAccount2;
      const amount ="32000000000000000000";
      var pID = "1";
      const allocatedPoint = "1000";
      var ProtocolsPerBlock = "1000000000000000000"
     
      var rewards1;
      var CakeShare;
      var CakeDevaddrFee;

      CakeShare = 0;
      CakeDevaddrFee = 0;
      
     

      it("",
      async function () {
        
      

          
       await LPtokenInstance.transfer(user, amount,{
          from: owner,
        });

      

        await LPtokenInstance.approvel(
          MasterChefInstance.contract.options.address,
          amount,
          { from: user}
          
        );
        var beforeUserbalance2 = await  CakeTokenInstance .balanceOf(user);
        console.log("beforeUserbalance2 ",Number(beforeUserbalance2))



        var beforeUserbalance = await LPtokenInstance.balanceOf(user);


        var beforelpcontractbalance = await LPtokenInstance.balanceOf(
          MasterChefInstance.address
        );


        var beforefirstLppools = await MasterChefInstance.poolInfo([
          Number(pID),
        ]);


        expect(beforefirstLppools.lpToken).equal(LPtokenInstance.address);
        expect(Number(beforefirstLppools.allocPoint)).equal(
          Number(allocatedPoint)
        );

        var beforeuserdetails = await MasterChefInstance.userInfo(
          Number(pID),
          user
        );
        var bonusMutipler = await MasterChefInstance.BONUS_MULTIPLIER();
        var totalAllocPoint = await MasterChefInstance.totalAllocPoint();




        const deposit = await MasterChefInstance.deposit(
          Number(pID),
          amount,
          { from: user }
        );



        var pendingProtocols=(Number(await MasterChefInstance.pendingProtocols(pID,user)));
        console.log("pendingProtocols",(Number(pendingProtocols)));




        secondEnterLpBlock = await web3.eth.getBlockNumber();
        console.log("secondEnterLpBlock", Number(secondEnterLpBlock));



        var mutipler =
          (Number(secondEnterLpBlock) -
            Number(beforefirstLppools.lastRewardBlock)) *
          Number(bonusMutipler);


        var cakeReward =
          (Number(mutipler) * Number(ProtocolsPerBlock) * Number(allocatedPoint)) /
          Number(totalAllocPoint);


          CakeDevaddrFee = Number(cakeReward / 10);
        console.log("CakeDevaddrFee", Number(CakeDevaddrFee / 1e18));


         var syrup=Number(cakeReward);
        console.log("syrup",syrup);

        CakeShare  = (Number(cakeReward) * Number(1e12)) /
          Number(beforelpcontractbalance);


          var afterUserbalance2= await CakeTokenInstance.balanceOf(user);
          console.log("afterUserbalance2",Number(afterUserbalance2))


          var afterfirstLppools = await MasterChefInstance.poolInfo([
            Number(pID),
          ]);
          expect(afterfirstLppools.lpToken).equal(LPtokenInstance.address);
          expect(Number(afterfirstLppools.allocPoint)).equal(
            Number(allocatedPoint)
          );
          expect(Number(afterfirstLppools.lastRewardBlock)).equal(
            Number(secondEnterLpBlock)
          );
          expect(
            Number(afterfirstLppools.accProtocolsPerShare / 1e18).toFixed(3)
          ).equal(
            (
              Number(CakeShare / 1e18) +
              Number(beforefirstLppools.accProtocolsPerShare / 1e18)
            ).toFixed(3)
          );
          console.log("afterfirstLppools.accProtocolsPerShare",(Number(afterfirstLppools.accProtocolsPerShare)));



          expectEvent(deposit, "Deposit", {
            user: user,
            pid: pID.toString(),
            amount: amount.toString(),
          });

          var afteruserdetails = await MasterChefInstance.userInfo(
            Number(pID),
            user
          );


          

          expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
            (
              Number(beforeuserdetails.amount / 1e18) + Number(amount / 1e18)
            ).toFixed(3)
          );
           console.log("afteruserdetails.amount",(Number(afteruserdetails.amount)));
           console.log("afteruserdetails.rewardDebt",(Number(afteruserdetails.rewardDebt)));

        


         var values=(Number(afteruserdetails.amount)*Number(afterfirstLppools.accProtocolsPerShare))/ Number(1e12);
           console.log("values",Number(values));

        expect(Number(afteruserdetails.rewardDebt / 1e18).toFixed(3)).equal(
          Number(values / 1e18).toFixed(3)
        );

          expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
            (
              Number(beforeuserdetails.amount / 1e18) + Number(amount / 1e18)
            ).toFixed(3)
          );

          var afterUserbalance = await LPtokenInstance.balanceOf(user);
          expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
            (Number(beforeUserbalance / 1e18) - Number(amount / 1e18)).toFixed(
              3
            )
          );


          var afterlpcontractbalance = await LPtokenInstance.balanceOf(
            MasterChefInstance.address
          );
          expect(Number(afterlpcontractbalance).toFixed(3)).equal(
            (
              Number(beforelpcontractbalance) +
              Number(amount)
            ).toFixed(3)
          );
       


        });
      })  
  

    })



    describe("[Testcase 3 : withdraw function first user]", () => {
      describe("", () => {




          const user = testAccount1;
          const pID = "1";
          var amount = "37000000000000000000";
          var rewards = "50817607613095990000";
       
          const allocatedPoint = "1000";
          var cakeShare;
          var cakeDevaddrFee;
          var CakePerBlock = "1000000000000000000"
   
    
          cakeShare = 0;
          cakeDevaddrFee = 0;
          it(
            "5.1:If Check the Testaccount8 Emergency Withdraw Function Pool ID is" +
              Number(pID) +
              "and Deposit Amount is" +
              Number(amount / 1e18) +
              "token and return WithDraw value is" +
              Number(amount / 1e18) +
              "token and Rewards amount is 0?",
            async function () {
           var befreuserAmount = await MasterChefInstance.userInfo(
                Number(pID),
                user
              );
              befreuserAmount = befreuserAmount.amount;
              expect(Number(befreuserAmount / 1e18).toFixed(3)).equal(
                Number(amount / 1e18).toFixed(3)
              );
              beforeuserRewards = await MasterChefInstance.userInfo(
                Number(pID),
                user
              );
             var beforeuserRewards = beforeuserRewards.rewardDebt;
              // expect(Number(beforeuserRewards / 1e18).toFixed(3)).equal(
              //   Number(rewards / 1e18).toFixed(3)
              // );
              var beforeuserdetails = await MasterChefInstance.userInfo(
                Number(pID),
                user
              );

              var beforelpcontractbalance = await LPtokenInstance.balanceOf(
                MasterChefInstance.address
              );

              var beforefirstLppools = await MasterChefInstance.poolInfo([
                Number(pID),
              ]);
  

              var bonusMutipler = await MasterChefInstance.BONUS_MULTIPLIER();
              var totalAllocPoint = await MasterChefInstance.totalAllocPoint();
    

              var beforeUserbalance2 = await  CakeTokenInstance .balanceOf(user);
              console.log("beforeUserbalance2 ",Number(beforeUserbalance2))  



              var beforeUserbalance = await LPtokenInstance.balanceOf(user);


              const withdraw = await MasterChefInstance.withdraw(
                Number(pID),"2000000000000000000",
                { from: user }
              );


              secondEnterLpBlock = await web3.eth.getBlockNumber();
              console.log("secondEnterLpBlock", Number(secondEnterLpBlock));
    
  
  
              var mutipler =
                (Number(secondEnterLpBlock) -
                  Number(beforefirstLppools.lastRewardBlock)) *
                Number(bonusMutipler);
  
  
              var cakeReward =
                (Number(mutipler) * Number(CakePerBlock) * Number(allocatedPoint)) /
                Number(totalAllocPoint);
  
    
                cakeDevaddrFee = Number(cakeReward / 10);
              console.log("klanDevaddrFee", Number(cakeDevaddrFee / 1e18));
  
  
               var syrup=Number(cakeReward);
              console.log("syrup",syrup);
    
              cakeShare = (Number(cakeReward) * Number(1e12)) /
                Number(beforelpcontractbalance);
    
    
                var afterUserbalance2= await CakeTokenInstance.balanceOf(user);
                console.log("afterUserbalance2",Number(afterUserbalance2))
    
    

                var afterfirstLppools = await MasterChefInstance.poolInfo([
                  Number(pID),
                ]);

                 expect(afterfirstLppools.lpToken).equal(LPtokenInstance.address);
                      

                expect(
                  Number(afterfirstLppools.accProtocolsPerShare / 1e18).toFixed(3)
                ).equal(
                  (
                    Number(cakeShare / 1e18) +
                    Number(beforefirstLppools.accProtocolsPerShare / 1e18)
                  ).toFixed(3)
                );
                console.log("afterfirstLppools.accProtocolsPerShare",(Number(afterfirstLppools.accProtocolsPerShare)));
    

                
                var afteruserdetails = await MasterChefInstance.userInfo(
                  Number(pID),
                  user
                );
  
  
                
  
                expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
                  (
                    Number(beforeuserdetails.amount / 1e18) - Number(2000000000000000000/ 1e18)
                  ).toFixed(3)
                );
                 console.log("afteruserdetails.amount",(Number(afteruserdetails.amount)));
                 console.log("afteruserdetails.rewardDebt",(Number(afteruserdetails.rewardDebt)));
    
              
  
   
               var rewards1=(Number(afteruserdetails.amount)*Number(afterfirstLppools.accProtocolsPerShare))/ Number(1e12);
                 console.log("rewards1",Number(rewards1));
  
              expect(Number(afteruserdetails.rewardDebt / 1e18).toFixed(3)).equal(
                Number(rewards1 / 1e18).toFixed(3)
              );
  




              var afterUserbalance = await LPtokenInstance.balanceOf(user);
              expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
                (Number(beforeUserbalance / 1e18) + Number(2000000000000000000/ 1e18)).toFixed(
                  3
                )
              );
  

              var afterlpcontractbalance = await LPtokenInstance.balanceOf(
                MasterChefInstance.address
              );
              expect(Number(afterlpcontractbalance).toFixed()).equal(
                (
                  Number(beforelpcontractbalance) -
                  Number(2000000000000000000)
                ).toFixed());
           
                })


            

            })
          })

          describe("[Testcase 4 : withdraw function second user]", () => {
              describe("", () => {
                const user = testAccount2;
                const pID = "1";
                var amount = "47000000000000000000";
                var rewards = "65133285410494000000";
             
                const allocatedPoint = "1000";
                var cakeShare;
                var cakeDevaddrFee;
                var CakePerBlock = "1000000000000000000"
   
                cakeShare = 0;
                cakeDevaddrFee = 0;
                it(
                  "5.1:If Check the Testaccount8 Emergency Withdraw Function Pool ID is" +
                    Number(pID) +
                    "and Deposit Amount is" +
                    Number(amount / 1e18) +
                    "token and return WithDraw value is" +
                    Number(amount / 1e18) +
                    "token and Rewards amount is 0?",
                  async function () {
                 var befreuserAmount = await MasterChefInstance.userInfo(
                      Number(pID),
                      user
                    );
                    befreuserAmount = befreuserAmount.amount;
                    expect(Number(befreuserAmount / 1e18).toFixed(3)).equal(
                      Number(amount / 1e18).toFixed(3)
                    );
                    beforeuserRewards = await MasterChefInstance.userInfo(
                      Number(pID),
                      user
                    );
                   var beforeuserRewards = beforeuserRewards.rewardDebt;
                  //   expect(Number(beforeuserRewards / 1e18).toFixed(3)).equal(
                  //     Number(rewards / 1e18).toFixed(3)
                  //   );
                    var beforeuserdetails = await MasterChefInstance.userInfo(
                      Number(pID),
                      user
                    );

                    var beforelpcontractbalance = await LPtokenInstance.balanceOf(
                      MasterChefInstance.address
                    );

                    var beforefirstLppools = await MasterChefInstance.poolInfo([
                      Number(pID),
                    ]);
        

                    var bonusMutipler = await MasterChefInstance.BONUS_MULTIPLIER();
                    var totalAllocPoint = await MasterChefInstance.totalAllocPoint();
          

                    var beforeUserbalance2 = await  CakeTokenInstance .balanceOf(user);
                    console.log("beforeUserbalance2 ",Number(beforeUserbalance2))  



                    var beforeUserbalance = await LPtokenInstance.balanceOf(user);


                    const withdraw = await MasterChefInstance.withdraw(
                      Number(pID),"47000000000000000000",
                      { from: user }
                    );


                    secondEnterLpBlock = await web3.eth.getBlockNumber();
                    console.log("secondEnterLpBlock", Number(secondEnterLpBlock));
          
        
        
                    var mutipler =
                      (Number(secondEnterLpBlock) -
                        Number(beforefirstLppools.lastRewardBlock)) *
                      Number(bonusMutipler);
        
        
                    var cakeReward =
                      (Number(mutipler) * Number(CakePerBlock) * Number(allocatedPoint)) /
                      Number(totalAllocPoint);
        
          
                      cakeDevaddrFee = Number(cakeReward / 10);
                    console.log("klanDevaddrFee", Number(cakeDevaddrFee / 1e18));
        
        
                     var syrup=Number(cakeReward);
                    console.log("syrup",syrup);
          
                    cakeShare = (Number(cakeReward) * Number(1e12)) /
                      Number(beforelpcontractbalance);
          
          
                      var afterUserbalance2= await CakeTokenInstance.balanceOf(user);
                      console.log("afterUserbalance2",Number(afterUserbalance2))
          
          

                      var afterfirstLppools = await MasterChefInstance.poolInfo([
                        Number(pID),
                      ]);

                       expect(afterfirstLppools.lpToken).equal(LPtokenInstance.address);
                            

                      expect(
                        Number(afterfirstLppools.accProtocolsPerShare / 1e18).toFixed(3)
                      ).equal(
                        (
                          Number(cakeShare / 1e18) +
                          Number(beforefirstLppools.accProtocolsPerShare / 1e18)
                        ).toFixed(3)
                      );
                      console.log("afterfirstLppools.accProtocolsPerShare",(Number(afterfirstLppools.accProtocolsPerShare)));
          
      
                      
                      var afteruserdetails = await MasterChefInstance.userInfo(
                        Number(pID),
                        user
                      );
        
        
                      
        
                      expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
                        (
                          Number(beforeuserdetails.amount / 1e18) - Number(47000000000000000000/ 1e18)
                        ).toFixed(3)
                      );
                       console.log("afteruserdetails.amount",(Number(afteruserdetails.amount)));
                       console.log("afteruserdetails.rewardDebt",(Number(afteruserdetails.rewardDebt)));
          
                    
        
         
                     var rewards1=(Number(afteruserdetails.amount)*Number(afterfirstLppools.accProtocolsPerShare))/ Number(1e12);
                       console.log("rewards1",Number(rewards1));
        
                    expect(Number(afteruserdetails.rewardDebt / 1e18).toFixed(3)).equal(
                      Number(rewards1 / 1e18).toFixed(3)
                    );
        




                    var afterUserbalance = await LPtokenInstance.balanceOf(user);
                    expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
                      (Number(beforeUserbalance / 1e18) + Number(47000000000000000000/ 1e18)).toFixed(
                        3
                      )
                    );
        

                    var afterlpcontractbalance = await LPtokenInstance.balanceOf(
                      MasterChefInstance.address
                    );
                    expect(Number(afterlpcontractbalance).toFixed()).equal(
                      (
                        Number(beforelpcontractbalance) -
                        Number(47000000000000000000)
                      ).toFixed()
                    );
                 



                      

                  })
                })

    
      })




      describe("[Testcase 3 : enter staking first user]", () => {
        describe("", () => {


            const user = testAccount1;
            const amount = "2208525201741000000";
            var pID = "0";
            const allocatedPoint = "333";
  
            var accKBLAPerShare;
            var kblDevaddrFee;
      
            accKBLAPerShare = 0;
            kblDevaddrFee = 0;
            rewards = 0;
      
  
            
            it("",
              async function () {
                
              
  
  
              
            
              
  
                await CakeTokenInstance.approve(
                  MasterChefInstance.contract.options.address,
                  amount,
                  { from: user}
                  
                );
  
  
  
                var beforeUserbalance = await CakeTokenInstance.balanceOf(user);
  
  
                var beforefirstLppools = await MasterChefInstance.poolInfo([
                  Number(pID),
                ]);
               
      
                var beforeuserdetails = await MasterChefInstance.userInfo(
                  Number(pID),
                  user
                );
  
               
                var beforelpcontractbalance = await CakeTokenInstance.balanceOf(
                  MasterChefInstance.address
                );
  
  
  
              
                const enterStaking = await MasterChefInstance.enterStaking(
                 
                  amount,
                  { from: user }
                );
  
  
  
                var afterUserbalance = await CakeTokenInstance.balanceOf(user);
                expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
                  (Number(beforeUserbalance / 1e18) - Number(amount / 1e18)).toFixed(
                    3
                  )
                );
              
                firstEnterLpBlock = await web3.eth.getBlockNumber();
                console.log("firstEnterLpBlock", Number(firstEnterLpBlock));
      
                var afterfirstLppools = await MasterChefInstance.poolInfo([
                  Number(pID),
                ]);
               
               
      
                expectEvent(enterStaking, "Deposit", {
                  user: user,
                  pid: pID.toString(),
                  amount: amount.toString(),
                });
      
  
             var afteruserdetails = await MasterChefInstance.userInfo(
              Number(pID),
              user
            );
            
  
           console.log("afteruserdetails",(Number(afteruserdetails[1])));
               
           
  
  console.log("rewardDebt",Number(afteruserdetails.rewardDebt ))
            var afterlpcontractbalance = await CakeTokenInstance.balanceOf(
              MasterChefInstance.address
            );
            expect(Number(afterlpcontractbalance).toFixed(3)).equal(
              (
                Number(beforelpcontractbalance) +
                Number(amount)
              ).toFixed(3)
            );
         
  
    });
  })














})



describe("[Testcase 3 : enter staking second time first user]", () => {
describe("", () => {


const user = testAccount1;
const amount = "2208525201741000000";
var pID = "0";
const allocatedPoint = "333";

var accKBLAPerShare;
var kblDevaddrFee;

accKBLAPerShare = 0;
kblDevaddrFee = 0;
rewards = 0;



it("",
  async function () {
    
  


  

  

    await CakeTokenInstance.approve(
      MasterChefInstance.contract.options.address,
      amount,
      { from: user}
      
    );



    var beforeUserbalance = await CakeTokenInstance.balanceOf(user);


    var beforefirstLppools = await MasterChefInstance.poolInfo([
      Number(pID),
    ]);
   

    var beforeuserdetails = await MasterChefInstance.userInfo(
      Number(pID),
      user
    );

   
    var beforelpcontractbalance = await CakeTokenInstance.balanceOf(
      MasterChefInstance.address
    );



  
    const enterStaking = await MasterChefInstance.enterStaking(
     
      amount,
      { from: user }
    );



    var afterUserbalance = await CakeTokenInstance.balanceOf(user);
    // expect(Number(afterUserbalance / 1e18).toFixed(3)).equal(
    //   (Number(beforeUserbalance / 1e18) - Number(amount / 1e18)).toFixed(
    //     3
    //   )
    // );
  
    firstEnterLpBlock = await web3.eth.getBlockNumber();
    console.log("firstEnterLpBlock", Number(firstEnterLpBlock));

    var afterfirstLppools = await MasterChefInstance.poolInfo([
      Number(pID),
    ]);
   
   

    expectEvent(enterStaking, "Deposit", {
      user: user,
      pid: pID.toString(),
      amount: amount.toString(),
    });


 var afteruserdetails = await MasterChefInstance.userInfo(
  Number(pID),
  user
);


console.log("afteruserdetails",(Number(afteruserdetails[1])));
   


console.log("rewardDebt",Number(afteruserdetails.rewardDebt ))
var afterlpcontractbalance = await CakeTokenInstance.balanceOf(
  MasterChefInstance.address
);
expect(Number(afterlpcontractbalance).toFixed(3)).equal(
  (
    Number(beforelpcontractbalance) +
    Number(amount)
  ).toFixed(3)
);


});
})



})



describe("[Testcase 5: second user first time]", () => {
describe("", () => {
const user = testAccount2;
const amount = "2752063623155000000";
var pID = "0";
const allocatedPoint = "1000";

var accKBLAPerShare;
var kblDevaddrFee;

accKBLAPerShare = 0;
kblDevaddrFee = 0;
rewards = 0;



it("",
async function () {
  


  await CakeTokenInstance.approve(
    MasterChefInstance.contract.options.address,
    amount,
    { from: user}
    
  );



  var beforeUserbalance1 = await CakeTokenInstance.balanceOf(user);
  console.log("beforeUserbalance1",Number(beforeUserbalance1))

  var beforeUserbalance2 = await SyrupBarInstance.balanceOf(user);
  console.log("beforeUserbalance2",Number(beforeUserbalance2))

  var beforefirstLppools = await MasterChefInstance.poolInfo([
    Number(pID),
  ]);
 

  var beforeuserdetails = await MasterChefInstance.userInfo(
    Number(pID),
    user
  );

 
  var beforelpcontractbalance = await CakeTokenInstance.balanceOf(
    MasterChefInstance.address
  );




  const enterStaking = await MasterChefInstance.enterStaking(
   
    amount,
    { from: user }
  );



  var afterUserbalance1= await CakeTokenInstance.balanceOf(user);


  console.log("afterUserbalance1",Number(afterUserbalance1))
  expect(Number(afterUserbalance1 / 1e18).toFixed()).equal(
    (Number(beforeUserbalance1 / 1e18) - Number(amount / 1e18)).toFixed(
      
    )
  );


  var afterUserbalance2= await SyrupBarInstance.balanceOf(user);


  console.log("afterUserbalance2",Number(afterUserbalance2))

  expect(Number(afterUserbalance2 / 1e18).toFixed(3)).equal(
    (Number(beforeUserbalance2 / 1e18) + Number(amount / 1e18)).toFixed(
      3
    )
  );



  firstEnterLpBlock = await web3.eth.getBlockNumber();
  console.log("firstEnterLpBlock", Number(firstEnterLpBlock));

  var afterfirstLppools = await MasterChefInstance.poolInfo([
    Number(pID),
  ]);
 
 

  expectEvent(enterStaking, "Deposit", {
    user: user,
    pid: pID.toString(),
    amount: amount.toString(),
  });


var afteruserdetails = await MasterChefInstance.userInfo(
Number(pID),
user
);


console.log("afteruserdetails",(Number(afteruserdetails.amount)));
 



console.log("rewardDebt",Number(afteruserdetails.rewardDebt ))



var afterlpcontractbalance = await CakeTokenInstance.balanceOf(
MasterChefInstance.address
);
expect(Number(afterlpcontractbalance).toFixed(3)).equal(
(
  Number(beforelpcontractbalance) +
  Number(amount)
).toFixed(3)
);


});
})
})


describe("[Testcase 5: enter staking second user second time]", () => {
describe("", () => {
const user = testAccount2;
const amount = "300000000000000000";
var pID = "0";
const allocatedPoint = "1000";

var accKBLAPerShare;
var kblDevaddrFee;

accKBLAPerShare = 0;
kblDevaddrFee = 0;
rewards = 0;



it("",
async function () {
  


  await CakeTokenInstance.approve(
    MasterChefInstance.contract.options.address,
    amount,
    { from: user}
    
  );



  var beforeUserbalance1 = await CakeTokenInstance.balanceOf(user);
  console.log("beforeUserbalance1",Number(beforeUserbalance1))

  var beforeUserbalance2 = await SyrupBarInstance.balanceOf(user);
  console.log("beforeUserbalance2",Number(beforeUserbalance2))

  var beforefirstLppools = await MasterChefInstance.poolInfo([
    Number(pID),
  ]);
 

  var beforeuserdetails = await MasterChefInstance.userInfo(
    Number(pID),
    user
  );

 
  var beforelpcontractbalance = await CakeTokenInstance.balanceOf(
    MasterChefInstance.address
  );




  const enterStaking = await MasterChefInstance.enterStaking(
   
    amount,
    { from: user }
  );



  var afterUserbalance1= await CakeTokenInstance.balanceOf(user);


  console.log("afterUserbalance1",Number(afterUserbalance1))
//   expect(Number(afterUserbalance1 / 1e18).toFixed()).equal(
//     (Number(beforeUserbalance1 / 1e18) - Number(amount / 1e18)).toFixed(
      
//     )
//   );


  var afterUserbalance2= await SyrupBarInstance.balanceOf(user);


  console.log("afterUserbalance2",Number(afterUserbalance2))

  expect(Number(afterUserbalance2 / 1e18).toFixed(3)).equal(
    (Number(beforeUserbalance2 / 1e18) + Number(amount / 1e18)).toFixed(
      3
    )
  );



  firstEnterLpBlock = await web3.eth.getBlockNumber();
  console.log("firstEnterLpBlock", Number(firstEnterLpBlock));

  var afterfirstLppools = await MasterChefInstance.poolInfo([
    Number(pID),
  ]);
 
 

  expectEvent(enterStaking, "Deposit", {
    user: user,
    pid: pID.toString(),
    amount: amount.toString(),
  });


var afteruserdetails = await MasterChefInstance.userInfo(
Number(pID),
user
);


console.log("afteruserdetails",(Number(afteruserdetails.amount)));
 



console.log("rewardDebt",Number(afteruserdetails.rewardDebt ))



var afterlpcontractbalance = await CakeTokenInstance.balanceOf(
MasterChefInstance.address
);
expect(Number(afterlpcontractbalance).toFixed(3)).equal(
(
  Number(beforelpcontractbalance) +
  Number(amount)
).toFixed(3)
);


});
})
})



describe("[Testcase 5: leave staking first user]", () => {
  describe("", () => {






      const user = testAccount2;
      const pID = "0";
      var amount = "5752063623155000000";
      var rewards = "1051500795205927600";
   
      const allocatedPoint = "333";
      var cakeShare;
      var cakeDevaddrFee;
      var CakePerBlock = "1000000000000000000"
       

      cakeShare = 0;
      cakeDevaddrFee = 0;
      it(
        "5.1:If Check the Testaccount8 Emergency Withdraw Function Pool ID is" +
          Number(pID) +
          "and Deposit Amount is" +
          Number(amount / 1e18) +
          "token and return WithDraw value is" +
          Number(amount / 1e18) +
          "token and Rewards amount is 0?",
        async function () {
      
         
          var beforeuserdetails = await MasterChefInstance.userInfo(
            Number(pID),
            user
          );

          var beforelpcontractbalance = await CakeTokenInstance.balanceOf(
              MasterChefInstance.address
          );

          var beforefirstLppools = await MasterChefInstance.poolInfo([
            Number(pID),
          ]);


          var bonusMutipler = await MasterChefInstance.BONUS_MULTIPLIER();
          var totalAllocPoint = await MasterChefInstance.totalAllocPoint();


         



          var beforeUserbalance1 = await CakeTokenInstance.balanceOf(user);
          console.log("beforeUserbalance1",Number(beforeUserbalance1/1e18).toFixed())

          var beforeUserbalance2 = await SyrupBarInstance.balanceOf(user);
          console.log("beforeUserbalance2",Number(beforeUserbalance2/1e18))




          const leaveStaking = await MasterChefInstance.leaveStaking(
           "2752063623155000000",
            { from: user }
          );




          secondEnterLpBlock = await web3.eth.getBlockNumber();
          console.log("secondEnterLpBlock", Number(secondEnterLpBlock));



          var mutipler =
            (Number(secondEnterLpBlock) -
              Number(beforefirstLppools.lastRewardBlock)) *
            Number(bonusMutipler);


          var cakeReward =
            (Number(mutipler) * Number(CakePerBlock) * Number(allocatedPoint)) /
            Number(totalAllocPoint);


            cakeDevaddrFee = Number(cakeReward / 10);
          console.log("klanDevaddrFee", Number(cakeDevaddrFee / 1e18));


           var syrup=Number(cakeReward);
          console.log("syrup",syrup);

          cakeShare = (Number(cakeReward) * Number(1e12)) /
            Number(beforelpcontractbalance);


          

            var afterfirstLppools = await MasterChefInstance.poolInfo([
              Number(pID),
            ]);

             expect(afterfirstLppools.lpToken).equal(CakeTokenInstance.address);
                  

            expect(
              Number(afterfirstLppools.accProtocolsPerShare / 1e18).toFixed(3)
            ).equal(
              (
                Number(cakeShare / 1e18) +
                Number(beforefirstLppools.accProtocolsPerShare / 1e18)
              ).toFixed(3)
            );
            console.log("afterfirstLppools.accProtocolsPerShare",(Number(afterfirstLppools.accProtocolsPerShare)));


            
            var afteruserdetails = await MasterChefInstance.userInfo(
              Number(pID),
              user
            );


            

            expect(Number(afteruserdetails.amount / 1e18).toFixed(3)).equal(
              (
                Number(beforeuserdetails.amount / 1e18) - Number(2752063623155000000/ 1e18)
              ).toFixed(3)
            );
             console.log("afteruserdetails.amount",(Number(afteruserdetails.amount/1e18)));
             console.log("afteruserdetails.rewardDebt",(Number(afteruserdetails.rewardDebt)));

          

             expectEvent(leaveStaking, "Withdraw", {
              user: user,
              pid: pID.toString(),
              amount:"2752063623155000000",
            });
  

           var rewards1=(Number(afteruserdetails.amount)*Number(afterfirstLppools.accProtocolsPerShare))/ Number(1e12);
             console.log("rewards1",Number(rewards1/1e18));

          expect(Number(afteruserdetails.rewardDebt / 1e32).toFixed()).equal(
            Number(rewards1 / 1e32).toFixed()
          );


         

          var afterUserbalance2= await SyrupBarInstance.balanceOf(user);


          console.log("afterUserbalance2",Number(afterUserbalance2/1e18))

          expect(Number(afterUserbalance2 / 1e18).toFixed(3)).equal(
            (Number(beforeUserbalance2 / 1e18) - Number(2752063623155000000 / 1e18)).toFixed(
              3
            )
          )
         
         


          var afterlpcontractbalance = await CakeTokenInstance.balanceOf(
            MasterChefInstance.address
          );
          expect(Number(afterlpcontractbalance/1e18).toFixed()).equal(
            (
              Number(beforelpcontractbalance/1e18) -
              Number(2752063623155000000/1e18)
            ).toFixed()
          );

         

          var rewards2=((Number(beforeuserdetails.amount)*Number(afterfirstLppools.accProtocolsPerShare))/ Number(1e12))-Number(beforeuserdetails.rewardDebt)
          console.log("rewards2",Number(rewards2));
          var afterUserbalance1= await CakeTokenInstance.balanceOf(user);


          console.log("afterUserbalance1",Number(afterUserbalance1))
         
        
          expect(Number(afterUserbalance1 / 1e18).toFixed(1)).equal(
            (Number(beforeUserbalance1/1e18) + Number(rewards2/1e18)+Number(2752063623155000000/1e18)).toFixed(1))
         
            
         
            })
      })



      describe("[Testcase 5: Emergency withdraw function]", () => {
          describe("", () => {
      


              const user = testAccount1;
              const pID = "1";
              var amount = "35000000000000000000";
              var rewards = "49650584074910000000";
        

              it(
                "5.1:If Check the Testaccount8 Emergency Withdraw Function Pool ID is" +
                  Number(pID) +
                  "and Deposit Amount is" +
                  Number(amount / 1e18) +
                  "token and return WithDraw value is" +
                  Number(amount / 1e18) +
                  "token and Rewards amount is 0?",
                async function () {
                var befreuserAmount = await MasterChefInstance.userInfo(
                    Number(pID),
                    user
                  );

                  befreuserAmount = befreuserAmount.amount;
                  console.log("befreuserAmount",Number(befreuserAmount))
                  expect(Number(befreuserAmount / 1e18).toFixed(3)).equal(
                    Number(amount / 1e18).toFixed(3)
                  );
                 var beforeuserRewards = await MasterChefInstance.userInfo(
                    Number(pID),
                    user
                  );
                  beforeuserRewards = beforeuserRewards.rewardDebt;
                  console.log("beforeuserRewards",Number(beforeuserRewards))
                  // expect(Number(beforeuserRewards / 1e18).toFixed(3)).equal(
                  //   Number(rewards / 1e18).toFixed(3)
                  // );
        
                  const emergencyWithdraw = await MasterChefInstance.emergencyWithdraw(
                    Number(pID),
                    { from: user }
                  );
        
                  expectEvent(emergencyWithdraw, "EmergencyWithdraw", {
                    user: user,
                    pid: pID.toString(),
                    amount: amount.toString(),
                  });
        
                  afteruserAmount = await MasterChefInstance.userInfo(
                    Number(pID),
                    user
                  );
                  afteruserAmount = afteruserAmount.amount;
                  expect(Number(afteruserAmount / 1e18).toFixed(3)).equal(
                    Number(0 / 1e18).toFixed(3)
                  );
                  afteruserRewards = await MasterChefInstance.userInfo(
                    Number(pID),
                    user
                  );
                  afteruserRewards = afteruserRewards.rewardDebt;
                  expect(Number(afteruserRewards / 1e18).toFixed(3)).equal(
                    Number(0 / 1e18).toFixed(3)
                  );
                }
              );
            });



              





      


      });








  });



});