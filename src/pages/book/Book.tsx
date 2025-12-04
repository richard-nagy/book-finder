import Cover from "@/components/Cover";
import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import {
    TypographyH2,
    TypographyH4,
    TypographyMuted,
    TypographyP,
} from "@/components/ui/typography";
import { useBook } from "@/context/BookContext";
import { useIsMobile } from "@/hooks/use-mobile";
import parse from "html-react-parser";
import { CircleQuestionMark, Star } from "lucide-react";
import { useEffect, useMemo, type FC, type ReactElement } from "react";
import { useParams } from "react-router-dom";

const Book: FC = (): ReactElement => {
    const { id } = useParams();
    const { volumeFetchIsPending, volumeMap, fetchVolume } = useBook();
    const isMobile = useIsMobile();

    const volume = useMemo(
        () => (id ? (volumeMap?.get(id) ?? null) : null),
        [id, volumeMap],
    );

    useEffect(() => {
        if (id && !volume) {
            fetchVolume(id);
        }
    }, [fetchVolume, id, volume]);

    if (volumeFetchIsPending) {
        return (
            <EmptyView
                icon={<Spinner />}
                title="Loading the Book..."
                description="Please wait while we are loading the Book."
            />
        );
    }

    if (volume === null) {
        return (
            <EmptyView
                icon={<CircleQuestionMark />}
                title="No Book was found..."
                description="We couldn't find the book."
            />
        );
    }

    return (
        <div
            className={`flex items-start justify-center gap-10 ${isMobile && "flex-col"}`}
        >
            <Cover
                alt={volume.id + "img"}
                className="object-cover mb-2"
                src={volume.volumeInfo?.imageLinks?.smallThumbnail}
            />
            <div className="max-w-200 flex-column shrink">
                {(volume.volumeInfo?.authors?.length ?? 0) > 0 ?
                    volume.volumeInfo?.authors?.map((a, i) => (
                        <TypographyH4
                            className="text-secondary-foreground"
                            key={`author-${i}`}
                        >
                            {a}
                            {i + 1 !==
                                (volume?.volumeInfo?.authors?.length ?? 0) &&
                                ","}
                        </TypographyH4>
                    ))
                    : <TypographyH4 className="italic">
                        � Unknown author(s)
                    </TypographyH4>
                }
                <div className="gap-2 mt-1 flex items-center">
                    <TypographyH2>
                        {volume.volumeInfo?.title}
                        {volume.volumeInfo?.language && (
                            <span className="text-muted-foreground">
                                {" "}
                                (
                                {volume.volumeInfo?.language?.toLocaleLowerCase()}
                                )
                            </span>
                        )}
                    </TypographyH2>
                    <Star className="text-primary fill-primary ml-3" />
                    <b>{volume.volumeInfo?.averageRating ?? 0}</b>
                    <TypographyMuted>
                        ({volume.volumeInfo?.ratingsCount ?? 0})
                    </TypographyMuted>
                </div>
                {volume.volumeInfo?.subtitle && (
                    <TypographyH4 className="text-secondary-foreground">
                        {volume.volumeInfo?.subtitle}
                    </TypographyH4>
                )}
                {volume.volumeInfo?.pageCount && (
                    <TypographyMuted>
                        ({volume.volumeInfo?.pageCount} pages)
                    </TypographyMuted>
                )}
                <TypographyP className="mt-5">
                    {volume.volumeInfo?.description ?
                        parse(volume.volumeInfo?.description)
                        : ""}
                </TypographyP>
                <TypographyMuted className="mt-5">
                    {volume.volumeInfo?.publisher}{" "}
                    {volume.volumeInfo?.publishedDate ??
                        `(${volume.volumeInfo?.publishedDate})`}
                </TypographyMuted>
            </div>
        </div>
    );
};

export default Book;
