import Logo from "@/components/Logo";
import SearchField from "@/components/SearchField";
import { Typography } from "@/components/ui/typography";
import { LogoSize } from "@/lib/types";
import type { FC, ReactElement } from "react";

const Homepage: FC = (): ReactElement => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Logo size={LogoSize.large} />
            <Typography variant="muted" disableMobileView className="mb-4">
                Find books and explore their summaries..
            </Typography>
            <SearchField className="" />
        </div>
    );
};

export default Homepage;
