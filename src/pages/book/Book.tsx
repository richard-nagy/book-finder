import Cover from "@/components/Cover";
import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { Typography } from "@/components/ui/typography";
import { useBook } from "@/context/BookContext";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Volume } from "@/lib/types";
import parse from "html-react-parser";
import { CircleQuestionMark, Star } from "lucide-react";
import { useEffect, useMemo, type FC, type ReactElement } from "react";
import { useParams } from "react-router-dom";

const AuthorList: FC<{ authors: string[] | undefined }> = ({ authors }) => {
    if (!authors || authors.length === 0) {
        return (
            <Typography variant="h4" className="italic">
                Unknown author(s)
            </Typography>
        );
    }

    return (
        <>
            {authors.map((a, i) => (
                <Typography
                    variant="h4"
                    className="text-secondary-foreground"
                    key={`author-${i}`}
                >
                    {a}
                    {i + 1 !== authors.length && ","}
                </Typography>
            ))}
        </>
    );
};

const DescriptionAndPublisher: FC<{ volumeInfo: Volume["volumeInfo"] }> = ({
    volumeInfo,
}) => (
    <div className="flex flex-col gap-4">
        {volumeInfo?.description && (
            <Typography variant="p" className="mt-6">
                {parse(volumeInfo.description)}
            </Typography>
        )}
        <Typography variant="muted">
            {volumeInfo?.publisher}{" "}
            {volumeInfo?.publishedDate && `(${volumeInfo.publishedDate})`}
        </Typography>
    </div>
);

const Book: FC = (): ReactElement => {
    const { id } = useParams<{ id: string }>();
    const { volumeFetchIsPending, volumeMap, fetchVolume } = useBook();
    const isMobile = useIsMobile();

    const volume: Volume | null = useMemo(
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

    if (!volume) {
        return (
            <EmptyView
                icon={<CircleQuestionMark />}
                title="No Book was found..."
                description="We couldn't find the book."
            />
        );
    }

    const volumeInfo = volume.volumeInfo;

    return (
        <>
            <div className={`flex items-start justify-center gap-10`}>
                {/* Cover */}
                <Cover
                    alt={volume.id + "img"}
                    className="object-cover mb-2"
                    src={volumeInfo?.imageLinks?.smallThumbnail}
                />

                <div className="max-w-xl flex flex-col shrink">
                    {/* Authors */}
                    <AuthorList authors={volumeInfo?.authors} />

                    <div className="gap-2 mt-1 flex items-start">
                        {/* Title */}
                        <Typography variant="h2">
                            {volumeInfo?.title}
                            {volumeInfo?.language && (
                                <span className="text-muted-foreground">
                                    {" "}
                                    ({volumeInfo.language.toLocaleLowerCase()})
                                </span>
                            )}
                        </Typography>

                        {/* Rating and Count */}
                        <div className="flex gap-2 items-center">
                            <Star
                                className="text-primary fill-primary ml-3"
                                size={isMobile ? "20" : "24"}
                            />
                            <b>{volumeInfo?.averageRating ?? 0}</b>
                            <Typography variant="muted">
                                ({volumeInfo?.ratingsCount ?? 0})
                            </Typography>
                        </div>
                    </div>

                    {/* Subtitle */}
                    {volumeInfo?.subtitle && (
                        <Typography
                            variant="h4"
                            className="text-secondary-foreground"
                        >
                            {volumeInfo.subtitle}
                        </Typography>
                    )}

                    {/* Page Count */}
                    {volumeInfo?.pageCount && (
                        <Typography variant="muted">
                            ({volumeInfo.pageCount} pages)
                        </Typography>
                    )}

                    {/* Description and Publisher for Desktop */}
                    {!isMobile && (
                        <DescriptionAndPublisher volumeInfo={volumeInfo} />
                    )}
                </div>
            </div>

            {/* Description and Publisher for Mobile */}
            {isMobile && <DescriptionAndPublisher volumeInfo={volumeInfo} />}
        </>
    );
};

export default Book;
