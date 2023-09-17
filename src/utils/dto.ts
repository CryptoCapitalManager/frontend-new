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

interface userTradesDTO {
    balance: string;
    totalDeposited: string;
    totalWithdrawn: string;
    balanceChanges: balanceChangeDTO[];
    ROI: string;
}

interface balanceChangeDTO {
    actionType: string;
    amount: string;
    date: string;
}

export { type tradingPairDTO, type tradingPairDataDTO, type userTradesDTO };
