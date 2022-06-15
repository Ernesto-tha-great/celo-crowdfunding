import * as React from "react";
import deployedContracts from "@celo-progressive-dapp-starter/hardhat/deployments/hardhat_contracts.json";
import { useCelo } from '@celo/react-celo';
import AppLayout from "@/components/layout/AppLayout";
import Welcome from "@/components/Welcome";


export default function App() {
  const { network } = useCelo();

 

  const contracts =
    deployedContracts[network?.chainId?.toString()]?.[
      network?.name?.toLocaleLowerCase()
    ]?.contracts;

  return (
    <AppLayout title="Celo Starter" description="Celo Starter">
    <Welcome contractData={contracts?.CrowdFund}  />
  </AppLayout>
  );
}
