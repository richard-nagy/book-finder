import { Button } from "@/components/ui/button";
import { type ElementType, type FC, useState } from "react";

interface ToggleButtonProps {
    Icon1: ElementType;
    Icon2: ElementType;
    text: string;
    defaultSelected?: boolean;
    icon1Fill?: string;
    icon2Fill?: string;
}

export const ToggleButton: FC<ToggleButtonProps> = (props) => {
    const {
        text,
        Icon1,
        Icon2,
        icon1Fill = "none",
        icon2Fill = "none",
        defaultSelected = true,
    } = props;

    const [isSelected, setIsSelected] = useState<boolean>(defaultSelected);

    const toggleSelection = () => {
        setIsSelected((prev) => !prev);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleSelection}
            className="relative"
        >
            <Icon1
                className={`h-[1.2rem] w-[1.2rem] transition-all 
                    ${isSelected ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`}
                fill={icon1Fill}
            />
            <Icon2
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all 
                    ${!isSelected ? "scale-100 rotate-0" : "scale-0 rotate-90"}`}
                fill={icon2Fill}
            />
            <span className="sr-only">{text}</span>
        </Button>
    );
};
