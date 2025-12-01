import { CircleQuestionMark } from "lucide-react";
import type { FC, ReactElement } from "react";

type CoverProps = {
    /** Alternate text for an image. */
    alt: string;
    /** Width in rem (1 will equal to 4 pixels). */
    width?: number;
    /** Height in rem (1 will equal to 4 pixels). */
    height?: number;
    /** Source of the image. */
    src?: string;
    /** ClassName for the Cover Container element. */
    className?: string;
};
const Cover: FC<CoverProps> = (props: CoverProps): ReactElement => {
    const { src, alt, className, height, width } = props;

    return (
        <div
            className={`bg-background w-${width ?? 50} h-${height ?? 75} flex justify-center items-center ${className ?? ""}`}
        >
            {src ?
                <img
                    src={src}
                    alt={alt}
                    className="object-contain w-full h-full"
                />
            :   <CircleQuestionMark className="text-muted-foreground" />}
        </div>
    );
};

export default Cover;
