interface tradingPairDTO {
    ROI: number;
    date: string;
    entryPrice: number;
    entryTX: string;
    exitPrice: number;
    exitTX: string;
    positionType: string;
    realROI: number;
    tradingPair: string;
}

interface tradingPairDataDTO {
    messages: tradingPairDTO[];
}

interface userDataDTO {
    balance: number;
    totalDeposited: number;
    totalWithdrawn: number;
    balanceChanges: balanceChangeDTO[];
    ROI: number;
}

interface balanceChangeDTO {
    actionType: string;
    amount: number;
    date: string;
}

interface withdrawlResponse {
    args: withdrawlInstance[];
    inTrade: number;
}

interface withdrawlInstance {
    invesmentNumber: number;
    amount: number;
}

export {
    type tradingPairDTO,
    type tradingPairDataDTO,
    type balanceChangeDTO,
    type userDataDTO,
    type withdrawlResponse,
};
