import Logo from "@/components/Logo";
import SearchField from "@/components/SearchField";
import { LogoSize } from "@/lib/types";
import type { FC, ReactElement } from "react";

const Homepage: FC = (): ReactElement => {
    return <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Logo size={LogoSize.large} />
        <SearchField showBackButton={false} />
    </div>
}

export default Homepage;