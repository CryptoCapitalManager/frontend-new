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

export { type tradingPairDTO, type tradingPairDataDTO };
