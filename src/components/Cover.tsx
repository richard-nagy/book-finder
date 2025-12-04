import { CircleQuestionMark } from "lucide-react";
import type { FC, ReactElement } from "react";

type CoverProps = {
    /** The alternative text for the image, essential for accessibility. */
    alt: string;
    /** Optional source URL (src) of the book cover image. */
    src?: string;
    /** Optional additional CSS class names to apply to the container element. */
    className?: string;
};

const Cover: FC<CoverProps> = ({ src, alt, className }): ReactElement => {
    return (
        <div
            className={`bg-background flex justify-center items-center shrink-0 w-30 md:w-40 h-45 md:h-60  ${className ?? ""}`}
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
