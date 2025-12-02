import { BookFinder } from "@/lib/Icons";
import { LogoSize } from "@/lib/types";
import type { FC, ReactElement } from "react";
import { TypographyH2, TypographyH3, TypographyH4 } from "./ui/typography";

type LogoProps = {
    /** */
    size: LogoSize;
    /** */
    className?: string;
    /** */
    onClick?: () => void;
};
const Logo: FC<LogoProps> = (props: LogoProps): ReactElement | null => {
    const { size, className, onClick } = props;

    switch (size) {
        case LogoSize.big:
            return (
                <TypographyH2
                    className={`flex items-center gap-1 ${className}`}
                    onClick={onClick}
                >
                    <BookFinder size={30} /> Book Finder
                </TypographyH2>
            );
        case LogoSize.medium:
            return (
                <TypographyH3
                    className={`flex items-center gap-1 ${className}`}
                    onClick={onClick}
                >
                    <BookFinder size={24} /> Book Finder
                </TypographyH3>
            );
        case LogoSize.small:
            return (
                <TypographyH4
                    className={`flex items-center gap-1 ${className}`}
                    onClick={onClick}
                >
                    <BookFinder size={20} /> Book Finder
                </TypographyH4>
            );
        default:
            return null;
    }
};

export default Logo;
