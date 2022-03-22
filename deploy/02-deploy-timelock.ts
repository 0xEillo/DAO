import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { MIN_DELAY } from '../helper-hardhat-config';

const deployTimeLock: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {

    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("--------------------------------------------------------------------------------");
    log("Deploying TimeLock token");
    const governanceToken = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
    })
}

export default deployTimeLock;