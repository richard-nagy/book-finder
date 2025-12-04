import Cover from "@/components/Cover";
import { TypographyMuted } from "@/components/ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Volume } from "@/lib/types";
import { type FC, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type BookProps = {
    book: Volume;
};
const Book: FC<BookProps> = ({ book }): ReactElement => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const width = isMobile ? 30 : 40;
    const height = isMobile ? 45 : 60;

    const navigateToBook = () => {
        navigate(`/book/${book.id}`, { relative: "route" });
    };

    return (
        <div
            className={`${"w-" + width} ${"h-" + height} cursor-pointer outline-1`}
            onClick={navigateToBook}
        >
            <Cover
                className="mb-2"
                src={book.volumeInfo?.imageLinks?.smallThumbnail}
                alt={book.id + "-img"}
            />
            {(book.volumeInfo?.authors?.length ?? 0) > 0 ?
                book.volumeInfo?.authors?.map((a, i) => (
                    <TypographyMuted key={`author-${i}`}>
                        {a}
                        {i + 1 !== (book.volumeInfo?.authors?.length ?? 0) &&
                            ","}
                    </TypographyMuted>
                ))
            :   <TypographyMuted className="italic">
                    � Unknown author(s)
                </TypographyMuted>
            }
            <div className="mt-1">{book.volumeInfo.title}</div>
        </div>
    );
};

export default Book;
