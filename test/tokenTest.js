const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require('chai');
const { link, solidity } = require('ethereum-waffle');
const {ArizeToken} = require('../artifacts/contracts/ArizeToken.sol/ArizeToken.json');
const { SignerWithAddress }  = require('@nomiclabs/hardhat-ethers/signers');
chai.use(solidity);

describe("ARZ Token Test Cases", function () {

  let Token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async  () =>{
    [owner, addr1, addr2] = await ethers.getSigners();
    const get_contract = await ethers.getContractFactory("ArizeToken");
    token = await get_contract.deploy("ARize Token", "ARZ", 1000000000, 1,1,1);
    await token.deployed();
  });

  it("Should check the token name to be ARize Token", async function() {
    console.log("Before seeting timeoutfn");
     const name =  expect(await token.name()).to.equal("ARize Token");
  });


  it("Should check the token Symbol to be ARZ", async function () {
    expect(await token.symbol()).to.equal("ARZ");
  });

  it("Should check the total supply of the token", async function () {
    expect(await token.totalSupply()).to.equal(1000000000);
  });

  it("Should check the Balance of owner to be equal to total supply ie 1000000000", async function () {
    expect(await token.balanceOf(owner.address)).to.equal(1000000000);
  });
  it("Should transfer some tokens to recepient's accounts", async ()=>{
    await token.transfer(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });
  it("Should set the approval", async ()=>{
    await token.approve(addr1.address, 1000);
  });
  it("Should reduce the balance of owner after token transfer ie totalsupply-transferedAmount", async ()=>{
    await token.transfer(addr1.address, 1000);
    expect(await token.balanceOf(owner.address)).to.equal(999999000);
  });
  it("Should increaseAllowance", async ()=>{
    await token.increaseAllowance(addr1.address, 2000);
  });
  
  it("Should decreaseAllowance", async ()=>{
    await token.approve(addr1.address, 1000);
    await token.decreaseAllowance(addr1.address, 200);
  });
  
  it("Should Check the user if is in whitelist", async ()=>{
    expect(await token.isInBlacklist(addr1.address)).to.equal(false);
  });

  it("Should BlackList the User", async ()=>{
    await token.blackList(addr1.address, true);
    expect(await token.isInBlacklist(addr1.address)).to.equal(true);
    
  })
  it("Should not transfer the token to the blacklisted User", async ()=>{
    await token.blackList(addr1.address, true);
    await token.transfer(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(0);
  })
  it("Should whitelist the user", async ()=>{
    await token.blackList(addr1.address, true);
    await token.whiteList(addr1.address, true);
    expect(await token.isInBlacklist(addr1.address)).to.equal(false);
  })
  it("Should whitelist the user and transfer the tokens", async ()=>{
    await token.blackList(addr1.address, true);
    await token.whiteList(addr1.address, true);
    await token.transfer(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  })

  it("Should bulk blacklist the user", async ()=>{
    await token.bulkBlackList([addr1.address, addr2.address], [true, true]);
    expect(await token.isInBlacklist(addr1.address)).to.equal(true);
    expect(await token.isInBlacklist(addr2.address)).to.equal(true);
  })

  it("Can set set the timelock", async ()=>{
    await token.setTimeLocked(true, 10000);    
  })
});



