import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { MIN_DELAY, VOTING_DELAY, VOTING_PERIOD, QUOROM_PERCENTAGE } from '../helper-hardhat-config';

const deployGovernorContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {

    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");
    log("--------------------------------------------------------------------------------");
    log("Deploying Governor contract");
    const governorContract = await deploy("BoxGovernor", {
        from: deployer,
        args: [governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUOROM_PERCENTAGE],
        log: true,
    })
}

export default deployGovernorContract;