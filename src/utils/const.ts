const ARBITRUM_GOERLI_CONFIGURATION = {
    chainId: "0x66eed",
    rpcUrls: ["https://endpoints.omniatech.io/v1/arbitrum/goerli/public"],
    chainName: "Arbitrum Goerli",
    nativeCurrency: {
        name: "ARBITRUM Goerli",
        symbol: "AGOR",
        decimals: 18,
    },
    blockExplorerUrls: ["https://goerli-rollup-explorer.arbitrum.io"],
};

const ARBITRUM_CONFIGURATION = {
    chainId: "0xa4b1",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    chainName: "Arbitrum One",
    nativeCurrency: {
        name: "ARBITRUM",
        symbol: "ETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://arbiscan.io"],
};

const ARBITRUM_USDC_ADDRESS = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8";
const ARBITRUM_GOERLI_USDC_ADDRESS =
    "0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892";

export {
    ARBITRUM_GOERLI_CONFIGURATION,
    ARBITRUM_CONFIGURATION,
    ARBITRUM_GOERLI_USDC_ADDRESS,
    ARBITRUM_USDC_ADDRESS,
};
