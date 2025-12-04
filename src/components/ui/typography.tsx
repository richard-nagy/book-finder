import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactElement } from "react";
import { createElement, type ElementType } from "react";

type TypographyVariant = "muted" | "p" | "h4" | "h3" | "h2" | "h1";

type TypographyProps = {
    variant: TypographyVariant;
} & HTMLAttributes<HTMLElement>;

/**
 * A combined typography component that renders different HTML elements based on the 'variant' prop.
 *
 * @param {TypographyVariant} variant - The type of typography to render (e.g., "h1", "p", "muted").
 * @param {string} [className] - Additional class names to apply.
 * @param {React.ReactNode} children - The content of the typography element.
 * @returns {JSX.Element} The rendered typography element.
 */
export function Typography({
    variant,
    className,
    children,
    ...props
}: TypographyProps): ReactElement {
    const isMobile = useIsMobile();

    const variantMap: Record<
        TypographyVariant,
        { tag: ElementType; desktopClass: string; mobileClass: string }
    > = {
        h1: {
            tag: "h1",
            desktopClass: "text-4xl lg:text-5xl",
            mobileClass: "text-3xl",
        },
        h2: {
            tag: "h2",
            desktopClass: "text-3xl",
            mobileClass: "text-2xl"
        },
        h3: {
            tag: "h3",
            desktopClass: "text-2xl",
            mobileClass: "text-xl",
        },
        h4: {
            tag: "h4",
            desktopClass: "text-xl",
            mobileClass: "text-lg", 
        },
        p: {
            tag: "p",
            desktopClass: "text-base",
            mobileClass: "text-sm",
        },
        muted: {
            tag: "p",
            desktopClass: "text-sm",
            mobileClass: "text-xs",
        },
    };

    const { tag, desktopClass, mobileClass } = variantMap[variant];

    const commonClasses: Record<TypographyVariant, string> = {
        h1: "scroll-m-20 pb-1 font-extrabold tracking-tight",
        h2: "scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 font-semibold tracking-tight",
        h4: "scroll-m-20 font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        muted: "text-muted-foreground",
    };

    const sizeClass = isMobile ? mobileClass : desktopClass;

    const baseClass = cn(commonClasses[variant], sizeClass);

    return createElement(
        tag,
        {
            className: cn(baseClass, className),
            ...props,
        },
        children,
    );
}
