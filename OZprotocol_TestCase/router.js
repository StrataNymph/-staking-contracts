const {
    expectEvent, // Assertions for emitted events
    time,
    expectRevert,
  } = require("@openzeppelin/test-helpers");
  
  var chai = require("chai");
  var expect = chai.expect;
  const WBNB = artifacts.require('WBNB');

  const factory= artifacts.require('ProtocolsFactory');
  
  const Router = artifacts.require("ProtocolsRouter");
  const LPtoken = artifacts.require("TokenA");
  const GOD = artifacts.require("TokenC");
  
  const  pair = artifacts.require("ProtocolsPair");
  
  
  contract("Strata_Defi", (accounts) => {
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const owner = accounts[0];
    const feeAddress = accounts[0];
    const lottery = accounts[0];
    const development = accounts[1];
    const market = accounts[2];
    const stability = accounts[3];
    const devFoundation = accounts[4];
    const liquidValue = accounts[5];
    const feeTo = accounts[30];
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
    const testAccount16 = accounts[21];
    const testAccount17 = accounts[22];

   
    before(async function () {
      WBNBInstance = await WBNB.new();
      LPtokenInstance=await LPtoken.new();
      GODInstance=await GOD.new();
  
      factoryInstance= await factory.new(
        feeAddress,
       
      );
      pairInstance=await pair.new();
  
  
      RouterInstance = await Router.new(
        factoryInstance.address,
        WBNBInstance.address,
        
      );
    });


    describe("[Testcase 1 : check if the smart contract has been created as set in the variables]", () => {
        it("1.1. Is the Factory Contract Address the same as set in the variable?", async function () {
          expect(await RouterInstance.factory()).equal(
            factoryInstance.address
          );
        });
        it("1.2. Is the WBNB Token Contract Address the same as set in the variable?", async function () {
          expect(await RouterInstance .WETH()).equal(WBNBInstance.address);
        });
       
        it("1.3. Is the Pair Code Hash in KabolaFactory?", async function () {
          console.log("PairCode", await factoryInstance.INIT_CODE_PAIR_HASH ());
        });
     

      });

      


      describe("[Testcase 2 : check if the Add Liquidity Function in KabolaRouter Contract features implemented work as intended]", () => {
        describe("", () => {
          const LiquidtyProvider = testAccount1;
          const tokensA = "50000000000000000000";
          const tokensB = "25000000000000000000";
          const tokenMinA = "0";
          const tokenMinB = "0";
          var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
          var lpToken;
          lpToken = Number(tokensA) * Number(tokensB);
          lpToken = Math.sqrt(lpToken);
          it(
            "2.1.If Check the LiquidtyProvider Add Liquidity is Token A Value" +
              Number(tokensA / 1e18) +
              "token, Token B Value" +
              Number(tokensB / 1e18) +
              "token, Token A Min Value" +
              Number(tokenMinA) +
              "token, Token B Min Value" +
              Number(tokenMinB) +
              " and return Values LP Token" +
              Number(lpToken / 1e18) +
              "Token?",
            async function () {
              await LPtokenInstance.transfer(LiquidtyProvider, tokensA, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                tokensA,
                { from: LiquidtyProvider }
              );
              await GODInstance.transfer(LiquidtyProvider, tokensB, {
                from: owner,
              });
              await GODInstance.approvel(
                RouterInstance.contract.options.address,
                tokensB,
                { from: LiquidtyProvider }
              );
    
              var beforeUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenAbalance", Number(beforeUsertokenAbalance))
              var beforeUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenBbalance", Number(beforeUsertokenBbalance))
              await RouterInstance.addLiquidity(
                LPtokenInstance.address,
                GODInstance.address,
                tokensA,    
                tokensB,
                tokenMinA,
                tokenMinB,
                LiquidtyProvider,
                deadline,
                { from: LiquidtyProvider }
              );
    
              var afterUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenAbalance", Number(afterUsertokenAbalance))
              expect(Number(afterUsertokenAbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenAbalance / 1e18) - Number(tokensA / 1e18)
                ).toFixed(3)
              );
    
              var afterUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenBbalance", Number(afterUsertokenBbalance))
              expect(Number(afterUsertokenBbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenBbalance / 1e18) - Number(tokensB / 1e18)
                ).toFixed(3)
              );
    
              var getPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
              console.log("getPair",getPair)

             
              var pairInstance = await pair.at(getPair);
         
    
              var lpTokens = await pairInstance.balanceOf(LiquidtyProvider);
              console.log("lpTokens", Number(lpTokens))
              expect(Number(lpTokens / 1e18).toFixed(3)).equal(
                Number(lpToken / 1e18).toFixed(3)
              );
    
          
              var lastPair = await pairInstance.kLast();
              console.log("KLast", Number(lastPair));
            });
        });
      });

      describe("[Testcase 3 : check if the Add Liquidity Function in KabolaRouter Contract features implemented work as intended]", () => {
        describe("", () => {
          const LiquidtyProvider = testAccount2;
          const tokensA = "50000000000000000000";
          const tokensB = "25000000000000000000";
          const tokenMinA = "0";
          const tokenMinB = "0";
          var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
          var lpToken;
          lpToken = Number(tokensA) * Number(tokensB);
          lpToken = Math.sqrt(lpToken);
          it(
            "2.1.If Check the LiquidtyProvider Add Liquidity is Token A Value" +
              Number(tokensA / 1e18) +
              "token, Token B Value" +
              Number(tokensB / 1e18) +
              "token, Token A Min Value" +
              Number(tokenMinA) +
              "token, Token B Min Value" +
              Number(tokenMinB) +
              " and return Values LP Token" +
              Number(lpToken / 1e18) +
              "Token?",
            async function () {
              await LPtokenInstance.transfer(LiquidtyProvider, tokensA, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                tokensA,
                { from: LiquidtyProvider }
              );
              await GODInstance.transfer(LiquidtyProvider, tokensB, {
                from: owner,
              });
              await GODInstance.approvel(
                RouterInstance.contract.options.address,
                tokensB,
                { from: LiquidtyProvider }
              );
    
              var beforeUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenAbalance", Number(beforeUsertokenAbalance))
              var beforeUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenBbalance", Number(beforeUsertokenBbalance))
              await RouterInstance.addLiquidity(
                LPtokenInstance.address,
                GODInstance.address,
                tokensA,    
                tokensB,
                tokenMinA,
                tokenMinB,
                LiquidtyProvider,
                deadline,
                { from: LiquidtyProvider }
              );
    
              var afterUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenAbalance", Number(afterUsertokenAbalance))
              expect(Number(afterUsertokenAbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenAbalance / 1e18) - Number(tokensA / 1e18)
                ).toFixed(3)
              );
    
              var afterUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenBbalance", Number(afterUsertokenBbalance))
              expect(Number(afterUsertokenBbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenBbalance / 1e18) - Number(tokensB / 1e18)
                ).toFixed(3)
              );
    
              var getPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
              console.log("getPair",getPair)
    
              var pairInstance = await pair.at(getPair);
    
              var lpTokens = await pairInstance.balanceOf(LiquidtyProvider);
              console.log("lpTokens", Number(lpTokens))
              expect(Number(lpTokens / 1e18).toFixed(3)).equal(
                Number(lpToken / 1e18).toFixed(3)
              );
    
             
              var lastPair = await pairInstance.kLast();
              console.log("KLast", Number(lastPair));
            });
        });
      });
      describe("", () => {
        const LiquidtyProvider = testAccount2;
        const tokensA = "50000000000000000000";
        const tokensB = "25000000000000000000";
        const tokenMinA = "0";
        const tokenMinB = "0";
        var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
        var lpToken;
        lpToken = Number(tokensA) * Number(tokensB);
        lpToken = Math.sqrt(lpToken);
        it(
          "2.2.If Check the LiquidtyProvider BNB Add Liquidity is Token A Value" +
            Number(tokensA / 1e18) +
            "token, BNB Value" +
            Number(tokensB / 1e18) +
            "token, Token A Min Value" +
            Number(tokenMinA) +
            "token, Token B Min Value" +
            Number(tokenMinB) +
            " and return Values LP Token" +
            Number(lpToken / 1e18) +
            "Token?",
            async function () {
              await LPtokenInstance.transfer(LiquidtyProvider, tokensA, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                tokensA,
                { from: LiquidtyProvider }
              );
           
              var beforeUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenAbalance", Number(beforeUsertokenAbalance))
            var beforeUserBNBbalance = await web3.eth.getBalance(
              LiquidtyProvider
            );
            console.log("beforeUserBNBbalance", Number(beforeUserBNBbalance))
            await RouterInstance.addLiquidityETH(
              LPtokenInstance.address,
              tokensA,
              tokenMinA,
              tokenMinB,
              LiquidtyProvider,
              deadline,
              { from: LiquidtyProvider, value: tokensB }
            );
    
            var afterUsertokenAbalance = await LPtokenInstance.balanceOf(
              LiquidtyProvider
            );
            console.log("afterUsertokenAbalance", Number(afterUsertokenAbalance))
            expect(Number(afterUsertokenAbalance / 1e18).toFixed(3)).equal(
              (
                Number(beforeUsertokenAbalance / 1e18) - Number(tokensA / 1e18)
              ).toFixed(3)
            );
    
            var afterUserBNBbalance = await web3.eth.getBalance(LiquidtyProvider);
            console.log("afterUserBNBbalance", Number(afterUserBNBbalance))
            expect(Number(afterUserBNBbalance / 1e18).toFixed()).equal(
              (
                Number(beforeUserBNBbalance / 1e18) - Number(tokensB / 1e18)
              ).toFixed()
            );
    
            var getPair = await factoryInstance.getPair(
              LPtokenInstance.address,
              WBNBInstance.address
            );
            console.log("getPair", (getPair))
            var pairInstance = await pair.at(getPair);
      
            var lpTokens = await pairInstance.balanceOf(LiquidtyProvider);
            console.log("lpTokens", Number(lpTokens))
            expect(Number(lpTokens / 1e18).toFixed(3)).equal(
              Number(lpToken / 1e18).toFixed(3)
            );
         
    
            
          }
        );
      });

      describe("[Testcase 4 : check if the Add Liquidity Function in KabolaRouter Contract features implemented work as intended]", () => {
        describe("", () => {
          const LiquidtyProvider = testAccount3;
          const tokensA = "50000000000000000000";
          const tokensB = "25000000000000000000";
          const tokenMinA = "0";
          const tokenMinB = "0";
          var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
          var lpToken;
          lpToken = Number(tokensA) * Number(tokensB);
          lpToken = Math.sqrt(lpToken);
          it(
            "2.1.If Check the LiquidtyProvider Add Liquidity is Token A Value" +
              Number(tokensA / 1e18) +
              "token, Token B Value" +
              Number(tokensB / 1e18) +
              "token, Token A Min Value" +
              Number(tokenMinA) +
              "token, Token B Min Value" +
              Number(tokenMinB) +
              " and return Values LP Token" +
              Number(lpToken / 1e18) +
              "Token?",
            async function () {
              await LPtokenInstance.transfer(LiquidtyProvider, tokensA, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                tokensA,
                { from: LiquidtyProvider }
              );
              await GODInstance.transfer(LiquidtyProvider, tokensB, {
                from: owner,
              });
              await GODInstance.approvel(
                RouterInstance.contract.options.address,
                tokensB,
                { from: LiquidtyProvider }
              );
    
              var beforeUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenAbalance", Number(beforeUsertokenAbalance))
              var beforeUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenBbalance", Number(beforeUsertokenBbalance))
              await RouterInstance.addLiquidity(
                LPtokenInstance.address,
                GODInstance.address,
                tokensA,    
                tokensB,
                tokenMinA,
                tokenMinB,
                LiquidtyProvider,
                deadline,
                { from: LiquidtyProvider }
              );
    
              var afterUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenAbalance", Number(afterUsertokenAbalance))
              expect(Number(afterUsertokenAbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenAbalance / 1e18) - Number(tokensA / 1e18)
                ).toFixed(3)
              );
    
              var afterUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenBbalance", Number(afterUsertokenBbalance))
              expect(Number(afterUsertokenBbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenBbalance / 1e18) - Number(tokensB / 1e18)
                ).toFixed(3)
              );
    
              var getPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
              console.log("getPair",getPair)
    
              var pairInstance = await pair.at(getPair);
    
              var lpTokens = await pairInstance.balanceOf(LiquidtyProvider);
              console.log("lpTokens", Number(lpTokens))
              expect(Number(lpTokens / 1e18).toFixed(3)).equal(
                Number(lpToken / 1e18).toFixed(3)
              );
    
            
              var lastPair = await pairInstance.kLast();
              console.log("KLast", Number(lastPair));
            });
        });
      });

      

      describe("[Testcase 5 : check if the Add Liquidity Function in KabolaRouter Contract features implemented work as intended]", () => {
        describe("", () => {
          const LiquidtyProvider = testAccount3;
          const tokensA = "75000000000000000000";
          const tokensB = "22000000000000000000";
          const tokenMinA = "0";
          const tokenMinB = "0";
          var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
          var lpToken;
          // lpToken = Number(tokensA) * Number(tokensB);
          // lpToken = Math.sqrt(lpToken);
          lpToken="66468037431535460000"
          it(
            "2.1.If Check the LiquidtyProvider Add Liquidity is Token A Value" +
              Number(tokensA / 1e18) +
              "token, Token B Value" +
              Number(tokensB / 1e18) +
              "token, Token A Min Value" +
              Number(tokenMinA) +
              "token, Token B Min Value" +
              Number(tokenMinB) +
              " and return Values LP Token" +
              Number(lpToken / 1e18) +
              "Token?",
            async function () {
              await LPtokenInstance.transfer(LiquidtyProvider, tokensA, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                tokensA,
                { from: LiquidtyProvider }
              );
              await GODInstance.transfer(LiquidtyProvider, tokensB, {
                from: owner,
              });
              await GODInstance.approvel(
                RouterInstance.contract.options.address,
                tokensB,
                { from: LiquidtyProvider }
              );
    
              var beforeUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenAbalance", Number(beforeUsertokenAbalance));
              var beforeUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenBbalance", Number(beforeUsertokenBbalance));
              await RouterInstance.addLiquidity(
                LPtokenInstance.address,
                GODInstance.address,
                tokensA,    
                tokensB,
                tokenMinA,
                tokenMinB,
                LiquidtyProvider,
                deadline,
                { from: LiquidtyProvider }
              );
    
              var afterUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenAbalance", Number(afterUsertokenAbalance));
              expect(Number(afterUsertokenAbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenAbalance / 1e18) - Number(44000000000000000000 / 1e18)
                ).toFixed(3)
              );
    
              var afterUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenBbalance", Number(afterUsertokenBbalance));
              expect(Number(afterUsertokenBbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenBbalance / 1e18) - Number(tokensB / 1e18)
                ).toFixed(3)
              );
    
              var getPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
              console.log("getPair",getPair)
    
              var pairInstance = await pair.at(getPair);
    
              var lpTokens = await pairInstance.balanceOf(LiquidtyProvider);
              console.log("lpTokens", Number(lpTokens));
              expect(Number(lpTokens / 1e18).toFixed(3)).equal(
                Number(lpToken / 1e18).toFixed(3)
              );
    
          
    
              var lastPair = await pairInstance.kLast();
              console.log("KLast", Number(lastPair));
            });
        });
      });

      describe("[Testcase 6 : check if the Add Liquidity Function in KabolaRouter Contract features implemented work as intended]", () => {
        describe("", () => {
          const LiquidtyProvider = testAccount3;
          const tokensA = "75000000000000000000";
          const tokensB = "22000000000000000000";
          const tokenMinA = "0";
          const tokenMinB = "0";
          var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
          var lpToken;
          // lpToken = Number(tokensA) * Number(tokensB);
          // lpToken = Math.sqrt(lpToken);
          lpToken="97580735803743550000"
          it(
            "2.1.If Check the LiquidtyProvider Add Liquidity is Token A Value" +
              Number(tokensA / 1e18) +
              "token, Token B Value" +
              Number(tokensB / 1e18) +
              "token, Token A Min Value" +
              Number(tokenMinA) +
              "token, Token B Min Value" +
              Number(tokenMinB) +
              " and return Values LP Token" +
              Number(lpToken / 1e18) +
              "Token?",
            async function () {
              await LPtokenInstance.transfer(LiquidtyProvider, tokensA, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                tokensA,
                { from: LiquidtyProvider }
              );
              await GODInstance.transfer(LiquidtyProvider, tokensB, {
                from: owner,
              });
              await GODInstance.approvel(
                RouterInstance.contract.options.address,
                tokensB,
                { from: LiquidtyProvider }
              );
    
              var beforeUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenAbalance", Number(beforeUsertokenAbalance));
              var beforeUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenBbalance", Number(beforeUsertokenBbalance));
              await RouterInstance.addLiquidity(
                LPtokenInstance.address,
                GODInstance.address,
                tokensA,    
                tokensB,
                tokenMinA,
                tokenMinB,
                LiquidtyProvider,
                deadline,
                { from: LiquidtyProvider }
              );
    
              var afterUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenAbalance", Number(afterUsertokenAbalance));
              expect(Number(afterUsertokenAbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenAbalance / 1e18) - Number(44000000000000000000 / 1e18)
                ).toFixed(3)
              );
    
              var afterUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenBbalance", Number(afterUsertokenBbalance));
              expect(Number(afterUsertokenBbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenBbalance / 1e18) - Number(tokensB / 1e18)
                ).toFixed(3)
              );
    
              var getPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
              console.log("getPair",getPair)
    
              var pairInstance = await pair.at(getPair);
    
              var lpTokens = await pairInstance.balanceOf(LiquidtyProvider);
              console.log("lpTokens", Number(lpTokens));
              expect(Number(lpTokens / 1e18).toFixed(3)).equal(
                Number(lpToken / 1e18).toFixed(3)
              );
    
          
    
              var lastPair = await pairInstance.kLast();
              console.log("KLast", Number(lastPair));
            });
        });
      });

      describe("[Testcase 7 : check if the Add Liquidity Function in KabolaRouter Contract features implemented work as intended]", () => {
        describe("", () => {
          const LiquidtyProvider = testAccount1;
          const tokensA = "70000000000000000000";
          const tokensB = "88000000000000000000";
          const tokenMinA = "0";
          const tokenMinB = "0";
          var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
          var lpToken;
          // lpToken = Number(tokensA) * Number(tokensB);
          // lpToken = Math.sqrt(lpToken);
          lpToken="84852813742385700000"
          it(
            "2.1.If Check the LiquidtyProvider Add Liquidity is Token A Value" +
              Number(tokensA / 1e18) +
              "token, Token B Value" +
              Number(tokensB / 1e18) +
              "token, Token A Min Value" +
              Number(tokenMinA) +
              "token, Token B Min Value" +
              Number(tokenMinB) +
              " and return Values LP Token" +
              Number(lpToken / 1e18) +
              "Token?",
            async function () {
              await LPtokenInstance.transfer(LiquidtyProvider, tokensA, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                tokensA,
                { from: LiquidtyProvider }
              );
              await GODInstance.transfer(LiquidtyProvider, tokensB, {
                from: owner,
              });
              await GODInstance.approvel(
                RouterInstance.contract.options.address,
                tokensB,
                { from: LiquidtyProvider }
              );
    
              var beforeUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenAbalance", Number(beforeUsertokenAbalance));
              var beforeUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("beforeUsertokenBbalance", Number(beforeUsertokenBbalance));
              await RouterInstance.addLiquidity(
                LPtokenInstance.address,
                GODInstance.address,
                tokensA,    
                tokensB,
                tokenMinA,
                tokenMinB,
                LiquidtyProvider,
                deadline,
                { from: LiquidtyProvider }
              );
    
              var afterUsertokenAbalance = await LPtokenInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenAbalance", Number(afterUsertokenAbalance));
              expect(Number(afterUsertokenAbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenAbalance / 1e18) - Number(tokensA/ 1e18)
                ).toFixed(3)
              );
    
              var afterUsertokenBbalance = await GODInstance.balanceOf(
                LiquidtyProvider
              );
              console.log("afterUsertokenBbalance", Number(afterUsertokenBbalance));
              expect(Number(afterUsertokenBbalance / 1e18).toFixed(3)).equal(
                (
                  Number(beforeUsertokenBbalance / 1e18) - Number(35000000000000000000 / 1e18)
                ).toFixed(3)
              );
    
              var getPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
              console.log("getPair",getPair)
    
              var pairInstance = await pair.at(getPair);
    
              var lpTokens = await pairInstance.balanceOf(LiquidtyProvider);
              console.log("lpTokens", Number(lpTokens));
              expect(Number(lpTokens / 1e18).toFixed(3)).equal(
                Number(lpToken / 1e18).toFixed(3)
              );
    
              var lastPair = await pairInstance.kLast();
              console.log("KLast", Number(lastPair));
            });
        });
      });

      describe("[Testcase 8 : check if the Swap Exact Tokens and Swap Exact BNB Tokens For Tokens in kabolaswap Contract features implemented work as intended]", () => {
        describe("", () => {
          const user = testAccount4;
          const swapToken = "200000000000000000000";
          const outMin = "0";
          var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
          var reverseA="308000000000000000000"
      
          var reverseB="154000000000000000000"
          var fee;
          var lotteryFee;
          var financeFee;
          var k;
          var flag=1;
          var token;
      
          k=Number(reverseA)*Number(reverseB)
          fee=Number(swapToken)-Number(swapToken*0.002)
      
          if(flag==1){
            token=Math.abs((Number(k)/(Number(reverseA)+Number(fee)))-Number(reverseB))
          }
          else{
            token=Math.abs((Number(k)/(Number(reverseB)+Number(fee)))-Number(reverseA))
          }
      
        
          it(
            "3.1.If Check the Testaccount 4  Swap Exact Tokens For Tokens is Swap(A Token --> B Token) Token Value" +
              Number(swapToken / 1e18) +
              "token and return Values User Token" +
              Number(token/1e18) +
              "Token, Lottery Fee"+Number(lotteryFee/1e18)+"Token and Finance Fee"+Number(financeFee/1e18)+"token?",
            async function () {
              await LPtokenInstance.transfer(user, swapToken, {
                from: owner,
              });
              await LPtokenInstance.approvel(
                RouterInstance.contract.options.address,
                swapToken,
                { from: user }
              );
      
              var beforeUserswaptokenbalance=await LPtokenInstance.balanceOf(user)
              console.log("beforeUserswaptokenbalance",Number(beforeUserswaptokenbalance))
              var beforeUsertokenbalance=await GODInstance.balanceOf(user)
              console.log("beforeUsertokenbalance",Number(beforeUsertokenbalance))
             
             
      
              var beforegetPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
      
              var beforepairInstance = await pair.at(beforegetPair);
      
              var beforereverse = await beforepairInstance.getReserves();
              console.log("beforereverse  --> 0", Number(beforereverse[0]));
              console.log("beforereverse  --> 1", Number(beforereverse[1]));
      
             const swap= await RouterInstance.swapExactTokensForTokens(
                swapToken,
                outMin,
                [ LPtokenInstance.address,
                  GODInstance.address],
                user,
                deadline,
                { from: user }
              );
      
              var aftergetPair = await factoryInstance.getPair(
                LPtokenInstance.address,
                GODInstance.address
              );
      
              var afterpairInstance = await pair.at(aftergetPair);
      
              var afterreverse = await afterpairInstance.getReserves();
              console.log("afterreverse --> 0", Number(afterreverse[0]));
              console.log("afterreverse --> 1", Number(afterreverse[1]));
      
              var afterUserswaptokenbalance=await LPtokenInstance.balanceOf(user)
              console.log("afterUserswaptokenbalance",Number(afterUserswaptokenbalance))
              expect((Number(afterUserswaptokenbalance/1e18)).toFixed(3)).equal((Number(beforeUserswaptokenbalance/1e18)-Number(swapToken/1e18)).toFixed(3));
      
              var afterUsertokenbalance=await GODInstance.balanceOf(user)
              console.log("afterUsertokenbalance",Number(afterUsertokenbalance))
              expect((Number(afterUsertokenbalance/1e18)).toFixed(0)).equal((Number(beforeUsertokenbalance/1e18)+Number(token/1e18)).toFixed(0));
      
           
            }
          );
        });
      
      
        });
      
        describe("[Testcase 9 : check if the Swap Exact Tokens and Swap Exact BNB Tokens For Tokens in kabolaswap Contract features implemented work as intended]", () => {
          describe("", () => {
            const user = testAccount5;
            const swapToken = "10000000000000000000";
            const outMin = "0";
            var deadline = Math.floor(new Date().getTime() / 1000.0) + 7200;
            var reverseA="508000000000000000000"
        
            var reverseB="93443656422379830000"
            var fee;
            var lotteryFee;
            var financeFee;
            var k;
            var flag=1;
            var token;
        
            k=Number(reverseA)*Number(reverseB)
            fee=Number(swapToken)-Number(swapToken*0.002)
        
            if(flag==1){
              token=Math.abs((Number(k)/(Number(reverseA)+Number(fee)))-Number(reverseB))
            }
            else{
              token=Math.abs((Number(k)/(Number(reverseB)+Number(fee)))-Number(reverseA))
            }
       
        
            it(
              "3.1.If Check the Testaccount 4  Swap Exact Tokens For Tokens is Swap(A Token --> B Token) Token Value" +
                Number(swapToken / 1e18) +
                "token and return Values User Token" +
                Number(token/1e18) +
                "Token, Lottery Fee"+Number(lotteryFee/1e18)+"Token and Finance Fee"+Number(financeFee/1e18)+"token?",
              async function () {
                await LPtokenInstance.transfer(user, swapToken, {
                  from: owner,
                });
                await LPtokenInstance.approvel(
                  RouterInstance.contract.options.address,
                  swapToken,
                  { from: user }
                );
        
                var beforeUserswaptokenbalance=await LPtokenInstance.balanceOf(user)
                console.log("beforeUserswaptokenbalance",Number(beforeUserswaptokenbalance))
                var beforeUsertokenbalance=await GODInstance.balanceOf(user)
                console.log("beforeUsertokenbalance",Number(beforeUsertokenbalance))
               
        
               
        
                var beforegetPair = await factoryInstance.getPair(
                  LPtokenInstance.address,
                  GODInstance.address
                );
        
                var beforepairInstance = await pair.at(beforegetPair);
        
                var beforereverse = await beforepairInstance.getReserves();
                console.log("beforereverse  --> 0", Number(beforereverse[0]));
                console.log("beforereverse  --> 1", Number(beforereverse[1]));
        
               const swap= await RouterInstance.swapExactTokensForTokens(
                  swapToken,
                  outMin,
                  [ LPtokenInstance.address,
                    GODInstance.address],
                  user,
                  deadline,
                  { from: user }
                );
        
                var aftergetPair = await factoryInstance.getPair(
                  LPtokenInstance.address,
                  GODInstance.address
                );
        
                var afterpairInstance = await pair.at(aftergetPair);
        
                var afterreverse = await afterpairInstance.getReserves();
                console.log("afterreverse --> 0", Number(afterreverse[0]));
                console.log("afterreverse --> 1", Number(afterreverse[1]));
        
                var afterUserswaptokenbalance=await LPtokenInstance.balanceOf(user)
                console.log("afterUserswaptokenbalance",Number(afterUserswaptokenbalance))
                expect((Number(afterUserswaptokenbalance/1e18)).toFixed(3)).equal((Number(beforeUserswaptokenbalance/1e18)-Number(swapToken/1e18)).toFixed(3));
        
                var afterUsertokenbalance=await GODInstance.balanceOf(user)
                console.log("afterUsertokenbalance",Number(afterUsertokenbalance))
                expect((Number(afterUsertokenbalance/1e18)).toFixed(3)).equal((Number(beforeUsertokenbalance/1e18)+Number(token/1e18)).toFixed(3));
        
              
              }
            );
          });
        
        
          });
 
  
  
  
  
  




    });
