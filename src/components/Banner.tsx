import { useSeverityLevelColor } from "@/hooks/hooks";
import { SeverityLevel } from "@/lib/types";
import { type FC, type ReactElement } from "react";

type BannerProps = {
    title: string;
    level: SeverityLevel;
    icon?: ReactElement;
    className?: string;
};

const Banner: FC<BannerProps> = ({
    icon,
    title,
    level,
    className,
}: BannerProps): ReactElement => {
    const severityLevelColor = useSeverityLevelColor(level);

    return (
        <div className={`p-2 w-full flex items-center justify-center gap-3 text-gray-950 font-semibold ${severityLevelColor.bg} ${className}`}>
            {icon}
            {title}
        </div>
    );
};

export default Banner;
