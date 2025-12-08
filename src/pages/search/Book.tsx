import Cover from "@/components/Cover";
import { Typography } from "@/components/ui/typography";
import type { Volume } from "@/lib/types";
import { type FC, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type BookProps = {
    /** The data object containing all volume information for a single book. */
    book: Volume;
};

const Book: FC<BookProps> = ({ book }): ReactElement => {
    const navigate = useNavigate();

    const navigateToBook = () => {
        navigate(`/book/${book.id}`, { relative: "route" });
    };

    return (
        <div className={`cursor-pointer w-30 md:w-40`} onClick={navigateToBook}>
            <Cover
                className="mb-2"
                src={book.volumeInfo?.imageLinks?.smallThumbnail}
                alt={book.id + "-img"}
            />
            {(book.volumeInfo?.authors?.length ?? 0) > 0 ?
                book.volumeInfo?.authors?.map((a, i) => (
                    <Typography variant="muted" key={`author-${i}`}>
                        {a}
                        {i + 1 !== (book.volumeInfo?.authors?.length ?? 0) &&
                            ","}
                    </Typography>
                ))
            :   <Typography variant="muted" className="italic">
                    &copy; Unknown author(s)
                </Typography>
            }
            <div className="mt-1">{book.volumeInfo?.title}</div>
        </div>
    );
};

export default Book;
