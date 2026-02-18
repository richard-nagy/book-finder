import { Logo } from "@/components/Logo.tsx";
import { useIsMobile } from "@/hooks/use-mobile";
import { GitHubIcon } from "@/lib/Icons";
import { Page } from "@/lib/types";
import { type FC, type ReactElement, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchField from "./SearchField";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const TopBar: FC = (): ReactElement => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useIsMobile();

    const isHomePage = useMemo(
        () => location.pathname.includes(`/${Page.homepage}`),
        [location.pathname],
    );

    return (
        <div className="flex justify-between items-center w-full sticky top-0 p-3">
            {!isHomePage ?
                <>
                    <Logo
                        className="cursor-pointer"
                        noText={isMobile}
                        height={36}
                        onClick={() => navigate(Page.homepage)}
                    />
                    <SearchField showBackButton isDialogViewAllowed />
                </>
            :   <span />}
            <div className={"flex justify-end w-auto gap-2"}>
                <Button
                    size="icon"
                    asChild
                >
                    <a
                        href="https://github.com/richard-nagy/book-finder"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                    >
                        <GitHubIcon />
                    </a>
                </Button>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default TopBar;
