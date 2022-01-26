import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "./@zora/nft-preview/NFTPreview";
import { useRouter } from "next/router";
import { NavLink } from './NavLink';
import { css } from '@emotion/react';
import {  useWalletButton, } from "@zoralabs/simple-wallet-provider";

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();
  const { buttonAction, actionText, connectedInfo, active  } = useWalletButton();

  return (
    <>
      <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      <NavLink 
        css={css`
        border: none;
        cursor: pointer;
      `}
      passHref href="/list">
        <h2
          css={css`
          border: none;
          cursor: pointer;
        `}>List</h2>
      </NavLink>
      {
            active ?
            <div>
            <button 
              css={css`
                border: none;
                cursor: pointer;
              `}
              onClick={() => buttonAction()}>
              <h2>Disconect Wallet</h2>
            </button>
          </div>
            :
            <div>
            <button 
              css={css`
                border: none;
                cursor: pointer;
              `}
              onClick={() => buttonAction()}>
              <h2>Connect Wallet</h2>
            </button>
          </div>
      }
     </div>
     <div css={{ display: "flex", flexDirection:'column', flexWrap: "wrap", justifyContent: "center", alignItems:'center' }}>
      <div>
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      </div>
      <div>
        <p>{process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION}</p>
      </div>
     </div>
      <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {tokens &&
          tokens.map((token) => {
            const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
            return (
                <NFTPreview
                  css={css`
                    background: #ffffff;
                    min-height: 350px;
                    min-width: 300px;
                    border: 1px solid white;
                    margin-right: 20px;
                    cursor: pointer;
                    -webkit-perspective: 600px;
                    -moz-perspective: 600px;
                    -ms-perspective: 600px;
                    perspective: 600px;
                    border: 2px solid black;
                    margin: 15px;
                    box-shadow: 10px 10px;
                    padding: 10px;
                    font-weight: bold;
                    box-shadow: 5px 5px rgb(0 0 0 / 50%);
                    &:hover {
                      box-shadow: 5px 5px pink;
                      border: 2px solid pink;
                      color: pink;
                    }`}
                  initialData={token}
                  key={tokenInfo.tokenId}
                  id={tokenInfo.tokenId}
                  contract={tokenInfo.tokenContract}
                  onClick={(evt) =>
                    router.push(
                      `/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`
                    )
                  }
                useBetaIndexer={true}/>
            );
          })}
      </div>
    </>
  );
};