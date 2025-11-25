import { TypographyMuted } from "@/components/ui/typography";
import type { Volume } from "@/utils/types";
import { type FC, type ReactElement } from "react";

type BookProps = {
    book: Volume;
};
const Book: FC<BookProps> = (props: BookProps): ReactElement => {
    const { book } = props;

    return (
        <div className="w-50">
            <img
                src={
                    book.volumeInfo?.imageLinks?.smallThumbnail ??
                    "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop"
                }
                alt={book.id + "img"}
                className="w-50 object-cover mb-2"
            />
            {(book.volumeInfo?.authors?.length ?? 0) > 0 ?
                book.volumeInfo?.authors?.map((a, i) => (
                    <TypographyMuted>
                        {a}
                        {i + 1 !== (book.volumeInfo?.authors.length ?? 0) &&
                            ","}
                    </TypographyMuted>
                ))
            :   <TypographyMuted className="italic">
                    � Unknown author(s)
                </TypographyMuted>
            }
            <div className="mt-2">{book.volumeInfo.title}</div>
        </div>
    );
};

export default Book;
