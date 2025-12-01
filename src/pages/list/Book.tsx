import Cover from "@/components/Cover";
import { TypographyMuted } from "@/components/ui/typography";
import type { Volume } from "@/utils/types";
import { useCallback, type FC, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type BookProps = {
    book: Volume;
};
const Book: FC<BookProps> = (props: BookProps): ReactElement => {
    const { book } = props;

    const navigate = useNavigate();

    const navigateToBook = useCallback(() => {
        navigate(`/book/${book.id}`, { relative: "route" });
    }, [book.id, navigate]);

    return (
        <div className="w-50 cursor-pointer" onClick={navigateToBook}>
            <Cover
                className="mb-2"
                src={book.volumeInfo?.imageLinks?.smallThumbnail}
                alt={book.id + "-img"}
            />
            {(book.volumeInfo?.authors?.length ?? 0) > 0 ?
                book.volumeInfo?.authors?.map((a, i) => (
                    <TypographyMuted>
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
