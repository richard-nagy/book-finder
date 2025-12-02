import { LogoSize, Page } from "@/lib/types";
import { useMemo, type FC, type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchField from "./SearchField";
import { ThemeToggle } from "./ThemeToggle";

const TopBar: FC = (): ReactElement => {
    const navigate = useNavigate();

    const location = useLocation();

    const isHomePage = useMemo(
        () => location.pathname === `/${Page.homepage}`,
        [location.pathname],
    );

    return (
        <div className="flex justify-between w-full sticky top-0 p-3">
            {!isHomePage
                ? <>
                    <Logo
                        size={LogoSize.medium}
                        className="cursor-pointer"
                        onClick={() => navigate(Page.homepage)}
                    />
                    <SearchField showBackButton />
                </>
                : <span />
            }
            <div className="w-38 flex justify-end">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default TopBar;
