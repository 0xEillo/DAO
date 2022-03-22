import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { ZERO_ADDRESS } from '../helper-hardhat-config';

const deployBox: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {

    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    log("--------------------------------------------------------------------------------");
    log("Deploying Box...");
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log:true
    });
    const timeLock = await ethers.getContract("TimeLock");
    const boxContract = await ethers.getContract("Box");
    const trasferOwnerTx = await boxContract.transferOwnership(timeLock.address);
    await trasferOwnerTx.wait(1);
  

}

export default deployBox;