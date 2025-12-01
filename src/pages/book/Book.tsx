import Cover from "@/components/Cover";
import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import {
    TypographyH2,
    TypographyH4,
    TypographyMuted,
} from "@/components/ui/typography";
import { useBookSearch } from "@/context/BookSearchContext";
import type { Volume } from "@/lib/types";
import parse from "html-react-parser";
import { CircleQuestionMark, Star } from "lucide-react";
import { useEffect, useState, type FC, type ReactElement } from "react";
import { useParams } from "react-router-dom";

const Book: FC = (): ReactElement => {
    const { id } = useParams();
    const { volumeFetchIsLoading, getBookByVolumeId } = useBookSearch();

    const [volume, setVolume] = useState<Volume | null>(null);

    useEffect(() => {
        if (id) {
            getBookByVolumeId(id).then((v) => {
                setVolume(v);
            });
        }
    }, [getBookByVolumeId, id]);

    if (volumeFetchIsLoading) {
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
        <div className="flex justify-center gap-10">
            <Cover
                alt={volume.id + "img"}
                className="object-cover mb-2"
                src={volume.volumeInfo?.imageLinks?.smallThumbnail}
            />
            <div className="max-w-200 flex-column">
                {(volume.volumeInfo?.authors?.length ?? 0) > 0 ?
                    volume.volumeInfo?.authors?.map((a, i) => (
                        <TypographyH4 className="text-secondary-foreground">
                            {a}
                            {i + 1 !==
                                (volume?.volumeInfo?.authors?.length ?? 0) &&
                                ","}
                        </TypographyH4>
                    ))
                :   <TypographyH4 className="italic">
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
                <div className="mt-5">
                    {volume.volumeInfo?.description ?
                        parse(volume.volumeInfo?.description)
                    :   ""}
                </div>
            </div>
        </div>
    );
};

export default Book;
