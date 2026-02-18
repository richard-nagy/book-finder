import Cover from "@/components/Cover";
import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { Typography } from "@/components/ui/typography";
import { useBook } from "@/context/BookContext";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Volume } from "@/lib/types";
import { incrementVisit } from "@/services/VisitsApi";
import parse from "html-react-parser";
import { CircleQuestionMark, Eye, Star } from "lucide-react";
import {
    useEffect,
    useMemo,
    useState,
    type FC,
    type ReactElement,
} from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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

const BookDetails: FC = (): ReactElement => {
    const { id } = useParams<{ id: string }>();
    const { volumeFetchIsPending, volumeMap, fetchVolume } = useBook();
    const isMobile = useIsMobile();
    const [visitCount, setVisitCount] = useState<number>(0);

    const volume: Volume | null = useMemo(
        () => (id ? (volumeMap?.get(id) ?? null) : null),
        [id, volumeMap],
    );

    // Fetch volume
    useEffect(() => {
        if (id && !volume) {
            fetchVolume(id);
        }
    }, [fetchVolume, id, volume]);

    const iconSize = useMemo(() => (isMobile ? "20" : "24"), [isMobile]);

    // Track book view
    useEffect(() => {
        const fetchIncrementVisit = async () => {
            if (!id) {
                return;
            }

            try {
                const newVisitCount = await incrementVisit(id);
                setVisitCount(newVisitCount.count);
            } catch (error) {
                console.error("Failed to track visit:", error);
                toast.error("Failed to track view", {
                    description: "Could not update view count for this book.",
                });
            }
        };

        void fetchIncrementVisit();
    }, [id]);

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
                    alt={`${volume.id}-img`}
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

                        <div className="flex flex-col gap-2 ml-3">
                            {/* Rating and Count */}
                            <div className="flex gap-2 items-center">
                                <Star
                                    className="text-primary fill-primary"
                                    size={iconSize}
                                />
                                <Typography variant="p" className="font-bold">
                                    {volumeInfo?.averageRating ?? 0}
                                </Typography>
                                <Typography variant="muted">
                                    ({volumeInfo?.ratingsCount ?? 0})
                                </Typography>
                            </div>

                            {/* View count (only in dev mode) */}
                            {import.meta.env.DEV && (
                                <div className="flex gap-2 items-center">
                                    <Eye size={iconSize} />
                                    <Typography variant="p" className="font-bold">
                                        {visitCount}
                                    </Typography>
                                </div>
                            )}
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

export default BookDetails;
