import Cover from "@/components/Cover";
import { Typography } from "@/components/ui/typography";
import type { Volume } from "@/lib/types";
import { Eye, Star } from "lucide-react";
import { type FC, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type BookProps = {
    /** The data object containing all volume information for a single book. */
    book: Volume;
    /** Visit count of the book. */
    visitCount: number;
};

const BookCard: FC<BookProps> = ({ book, visitCount }): ReactElement => {
    const navigate = useNavigate();

    const navigateToBook = () => {
        navigate(`/book/${book.id}`, { relative: "route" });
    };

    return (
        <div className={`cursor-pointer w-30 md:w-40`} onClick={navigateToBook}>
            <Cover
                className="mb-2"
                src={book.volumeInfo?.imageLinks?.smallThumbnail}
                alt={`${book.id}-img`}
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
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <Star className="text-primary fill-primary" size="18" />
                    <Typography variant="muted" className="font-m font-bold">
                        {book.volumeInfo.averageRating ?? 0}
                    </Typography>
                    <Typography variant="muted" className="font-m">
                        ({book.volumeInfo.ratingsCount ?? 0})
                    </Typography>
                </div>
                {import.meta.env.DEV && (
                    <div className="flex gap-1 items-center">
                        <Eye className="text-muted-foreground" size="18" />
                        <Typography variant="muted" className="font-m font-bold">
                            {visitCount}
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookCard;
