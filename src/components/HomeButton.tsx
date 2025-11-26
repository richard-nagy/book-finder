import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import type { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

const HomeButton: FC = (): ReactElement => (
    <Button asChild>
        <Link to="/">
            <HomeIcon />
            Home
        </Link>
    </Button>
);

export default HomeButton;
