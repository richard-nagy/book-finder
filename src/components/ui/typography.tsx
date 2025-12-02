import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

function TypographyH1({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                "scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                className,
            )}
            {...props}
        >
            {children}
        </h1>
    );
}

function TypographyH2({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className,
            )}
            {...props}
        >
            {children}
        </h2>
    );
}

function TypographyH3({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className,
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

function TypographyH4({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h4
            className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                className,
            )}
            {...props}
        >
            {children}
        </h4>
    );
}

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

export {
    TypographyMuted,
    TypographyP,
    TypographyH4,
    TypographyH3,
    TypographyH2,
    TypographyH1,
};
