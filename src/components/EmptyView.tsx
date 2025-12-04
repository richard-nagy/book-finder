import type { FC, JSX, ReactElement } from "react";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "./ui/empty";

type EmptyViewProps = {
    /** The main heading or title displayed in the empty view. */
    title: string;
    /** A detailed explanation or context accompanying the title. */
    description: string;
    /** Optional React element (like an SVG icon) to visually represent the state. */
    icon?: JSX.Element;
};

const EmptyView: FC<EmptyViewProps> = ({
    icon,
    title,
    description,
}): ReactElement => {
    return (
        <Empty className="w-full mt-10">
            <EmptyHeader>
                {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};

export default EmptyView;
