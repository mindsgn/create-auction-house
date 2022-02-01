import React from 'react';
import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "./@zora/nft-preview/NFTPreview";
import { useRouter } from "next/router";
import { css } from '@emotion/react';

const Posts = ({ posts, loading }) => {
    const router = useRouter();
    if (loading) {
        return <h2>Loading...</h2>;
    }

  return (
    <div css={css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
    `}>
        {
            posts && posts.map((token: any) => {
            const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
            return (
                <NFTPreview
                  css={css`
                    background: #ffffff;
                    min-height: 350px;
                    min-width: 300px;
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
            })
        }
    </div>
  );
};

export default Posts;