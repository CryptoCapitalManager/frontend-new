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

export {
    type tradingPairDTO,
    type tradingPairDataDTO,
    type balanceChangeDTO,
    type userDataDTO,
};
