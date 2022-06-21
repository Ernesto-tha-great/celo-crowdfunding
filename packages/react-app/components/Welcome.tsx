import React, { useState, useEffect } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { truncateAddress } from "@/utils";
import { useCelo } from "@celo/react-celo";
import { CrowdFund } from "@celo-progressive-dapp-starter/hardhat/types/Crowdfund";
import { Project } from "@celo-progressive-dapp-starter/hardhat/types/Project";
import { CeloContract } from "@celo/contractkit/lib/base";
import deployedContracts from "@celo-progressive-dapp-starter/hardhat/artifacts/contracts/Project.sol/Project.json";
import { ProjectCard } from "./ProjectCard";
import { Input } from "./Input";

const Welcome = ({ contractData }) => {
  const { address, connect, kit } = useCelo();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: "",
    duration: "",
    goal: "",
  });
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await contract.methods.returnProjects().call();
      const data2 = [];
      for (let i = 0; i < result.length; i++) {
        const projectContract = contractData
          ? (new kit.connection.web3.eth.Contract(
              deployedContracts.abi,
              result[i]
            ) as any as Project)
          : null;
        const data = await projectContract.methods.getDetails().call();
        const structuredData = {
          projectCreator: data.projectCreator,
          projectTitle: data.projectTitle,
          projectDescription: data.projectDescription,
          projectImageLink: data.projectImageLink,
          fundRaisingDeadline: data.fundRaisingDeadline,
          projectGoalAmount: data.projectGoalAmount,
        };
        data2.push(structuredData);
      }
      setResults(data2);
    };
    fetchProjects();
  }, []);

  const handleSubmit = (e) => {
    const { title, desc, img, duration, goal } = formData;
    e.preventDefault();

    if (!title || !desc || !duration || !goal || !img) {
      return alert("Please fill all the fields");
    } else {
      createProject();
    }
  };

  const contract = contractData
    ? (new kit.connection.web3.eth.Contract(
        contractData.abi,
        contractData.address
      ) as any as CrowdFund)
    : null;

  const handleChange = (e: { target: { value: any } }, name: any) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const createProject = async () => {
    const stableTokenAddress = await kit.registry.addressFor(
      CeloContract.StableToken
    );
    const gasPriceMinimumContract = await kit.contracts.connection.gasPrice();
    const { title, desc, img, duration, goal } = formData;
    await contract.methods
      .startProject(stableTokenAddress, title, desc, img, duration, goal)
      .send({ from: address, gasPrice: gasPriceMinimumContract });
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className=" flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start flex-col mf:mr-10">
            <h1 className="text-white text-3xl sm:text-5xl text-gradient py-1">
              pool Crypto <br /> solve real problems
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              create and support campaigns to help towards a greener and
              sustainable enviroment for the future!
            </p>
            {!address && (
              <button
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                type="button"
                onClick={() => connect().catch((e) => console.log(e))}
              >
                <p className="text-white text-base font-semibold">
                  Connect Wallet
                </p>
              </button>
            )}

            <div className="white-glassmorphism text-white p-5 mt-4 rounded-md">
              <div className="items-center">
                <p className="font-bold mb-5">How it Works</p>
                <p className="my-3">1. Creator creates a new project </p>

                <p className="my-3">
                  2. Contributors contribute until deadline
                </p>
                <p className="my-3">
                  3. If total pledged doesn&apos;t get met on deadline date,
                  contributors expire the project and refund donated funds back
                </p>
                <p className="my-3">
                  4. If total amount pledged reaches the goal, creator declares
                  the fundraise a success
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72  w-full my-5 eth-card white-glassmorphism">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} className="text-white text-2xl" />
                  </div>
                  <BsInfoCircle
                    fontSize={17}
                    className="text-white text-2xl ml-2"
                  />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {truncateAddress(address)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Address
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <h2 className="text-white font-medium">Start a Project</h2>
              <Input
                placeholder="Project Title"
                name="title"
                type="text"
                handleChange={handleChange}
              />
              <Input
                placeholder="Project Description"
                name="desc"
                type="text"
                handleChange={handleChange}
              />
              <Input
                placeholder="Image Link"
                name="img"
                type="text"
                handleChange={handleChange}
              />
              <Input
                placeholder="Duration in days."
                name="duration"
                type="number"
                handleChange={handleChange}
              />
              <Input
                placeholder="goal amount"
                name="goal"
                type="number"
                handleChange={handleChange}
              />

              <div className="h-[1px] w-full bg-gray-400 my-2" />
              <button
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                type="button"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="blue-glassmorphism grdient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {address ? (
            <>
              <h3 className="text-white text-3xl text-center my-2">
                Latest Campaigns
              </h3>
              <div className="flex flex-wrap justify-center items-center mt-10">
                {results
                  ?.map((item, index) => (
                    <ProjectCard item={item} key={index} />
                  ))
                  .reverse()}
              </div>
            </>
          ) : (
            <h3 className="text-white text-3xl text-center my-2">
              Connect your account
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
