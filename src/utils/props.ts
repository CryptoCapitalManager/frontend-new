import React from "react";

interface navbarProps {
    scrollToSection: (ref: React.MutableRefObject<any>) => void;
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
}

interface introProps {
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
}

interface howProps {
    how: React.MutableRefObject<null>;
}

interface storyProps {
    about: React.MutableRefObject<null>;
}

export { type navbarProps, type introProps, type howProps, type storyProps };
