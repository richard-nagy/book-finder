import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

// function TypographyH4({
//     className,
//     children,
//     ...props
// }: HTMLAttributes<HTMLHeadingElement>) {
//     return (
//         <h4
//             className={cn(
//                 "scroll-m-20 text-xl font-semibold tracking-tight",
//                 className,
//             )}
//             {...props}
//         >
//             {children}
//         </h4>
//     );
// }

function TypographyP({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        >
            {children}
        </p>
    );
}

function TypographyMuted({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        >
            {children}
        </p>
    );
}

export { TypographyMuted, TypographyP };
