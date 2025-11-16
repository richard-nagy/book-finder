import { ToggleButton } from "@/components/toggle-button";
import { Button } from "@/components/ui/button";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle,
} from "@/components/ui/item";
import type { BookDoc } from "@/utils/types";
import { Star } from "lucide-react";
import type { FC, ReactElement } from "react";

type BookProps = {
    book: BookDoc;
};
const Book: FC<BookProps> = (props: BookProps): ReactElement => {
    const { book } = props;

    return (
        <Item variant="muted" className="max-w-80">
            <ItemHeader>
                <img
                    src="https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop"
                    alt={book.key + "img"}
                    className="aspect-square w-full rounded-sm object-cover"
                />
            </ItemHeader>
            <ItemContent>
                <ItemTitle>
                    {book.author_name}
                </ItemTitle>
                <ItemDescription>
                    {book.title}
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button variant="outline" size="icon">
                    <ToggleButton Icon1={Star} Icon2={Star} text="Toggle Favorite" icon2Fill="white" />
                </Button>
            </ItemActions>
        </Item>
    );
};

export default Book;
