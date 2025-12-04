import { BookFinder } from "@/lib/Icons";
import { LogoSize } from "@/lib/types";
import { getLogoSize } from "@/lib/utils";
import type { FC, ReactElement } from "react";
import { Typography } from "./ui/typography";

const appName = "Book Finder";

type LogoProps = {
    /** Size of the logo. */
    size: LogoSize;
    /** ClassName for the logo. */
    className?: string;
    /** If true only show the icon. */
    iconOnly?: boolean;
    /** Optional on click method for the logo. */
    onClick?: () => void;
};
const Logo: FC<LogoProps> = ({
    size,
    className: classNameProp,
    iconOnly,
    onClick,
}): ReactElement | null => {
    const className = `flex items-center gap-1 ${classNameProp}`;

    const logo = <BookFinder size={getLogoSize(size)} />;

    if (iconOnly) {
        return (
            <div className={className} onClick={onClick}>
                {logo}
            </div>
        );
    }

    switch (size) {
        case LogoSize.large:
            return (
                <Typography
                    variant="h2"
                    className={className}
                    onClick={onClick}
                >
                    {logo} {appName}
                </Typography>
            );
        case LogoSize.medium:
            return (
                <Typography
                    variant="h3"
                    className={className}
                    onClick={onClick}
                >
                    {logo} {appName}
                </Typography>
            );
        case LogoSize.small:
            return (
                <Typography
                    variant="h4"
                    className={className}
                    onClick={onClick}
                >
                    {logo} {appName}
                </Typography>
            );
        default:
            return null;
    }
};

export default Logo;
