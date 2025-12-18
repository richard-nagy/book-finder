import { Button } from "@/components/ui/button";
import { Page } from "@/lib/types";
import { HomeIcon } from "lucide-react";
import { type FC, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@/components/ui/typography.tsx";

const PageNotFound: FC = (): ReactElement => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-full">
            <Typography variant="h1"> 404</Typography>
            <Typography variant="h4">Page Not Found</Typography>
            <Button className="mt-2" onClick={() => navigate(`/${Page.homepage}`)}>
                <HomeIcon /> Go Home
            </Button>
        </div>
    );
};

export default PageNotFound;
