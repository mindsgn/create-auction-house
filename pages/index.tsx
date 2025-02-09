import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";

import { AuctionsList } from "../components/AuctionsList";

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "@zoralabs/nft-hooks";

export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head />
      <AuctionsList tokens={tokens} />
    </IndexWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const contractAddress = process.env
    .NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string;
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    curatorAddress: process.env.NEXT_PUBLIC_CURATORS_ID as any,
    collectionAddresses: contractAddress ? contractAddress.split(',') : undefined,
    limit: 100,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};

const IndexWrapper = styled(PageWrapper)`
  font-family: 'Londrina Solid', cursive;
  max-width: var(--content-width-xl);
  background: #feefd5;  
`;
