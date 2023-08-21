import React from "react";
import { tradingPairDTO } from "./dto";

interface navbarProps {
    scrollToSection: (ref: React.MutableRefObject<any>) => void;
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
}

interface introWebProps {
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
    data: tradingPairDTO[];
}

interface introMobileProps {
    data: tradingPairDTO[];
}

interface howProps {
    how: React.MutableRefObject<null>;
}

interface storyProps {
    about: React.MutableRefObject<null>;
}

interface calculatorProps {
    data: tradingPairDTO[];
}

interface transparencyProps {
    data: tradingPairDTO[];
}

interface tableProps {
    data: tradingPairDTO[];
}

export {
    type navbarProps,
    type introWebProps,
    type introMobileProps,
    type howProps,
    type storyProps,
    type calculatorProps,
    type transparencyProps,
    type tableProps,
};
