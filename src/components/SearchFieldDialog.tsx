import { googleBooksApiKey } from "@/lib/constants";
import { Search, SearchIcon } from "lucide-react";
import {
    useCallback,
    useState,
    type FC,
    type KeyboardEvent,
    type ReactElement,
} from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

type SearchFieldDialogProps = {
    /** Value for the text input. */
    inputValue: string;
    /** If true, the search field is currently empty. */
    isInputEmpty: boolean;
    /**
     * Handler for keydown events on the input field, typically used to trigger search on "Enter".
     *
     * @param {KeyboardEvent<HTMLInputElement>} event - The keyboard event object.
     */
    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    /** Function to execute the search navigation based on the current input value. */
    navigateToSearchQuery: () => void;
    /**
     * Setter function to update the state of the input value.
     *
     * @param {string} value - The new string value to set for the input field.
     */
    setInputValue: (value: string) => void;
};

const SearchFieldDialog: FC<SearchFieldDialogProps> = ({
    isInputEmpty,
    inputValue,
    navigateToSearchQuery,
    handleKeyDown,
    setInputValue,
}): ReactElement | null => {
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    const onSearchClick = useCallback(() => {
        setDialogIsOpen(false);
        navigateToSearchQuery();
    }, [navigateToSearchQuery]);

    if (!googleBooksApiKey) {
        return null;
    }

    return (
        <Dialog open={dialogIsOpen}>
            <DialogTrigger>
                <Button onClick={() => setDialogIsOpen(true)}>
                    <SearchIcon /> Search
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="w-100">
                <DialogHeader>
                    <DialogTitle>Search for books</DialogTitle>
                </DialogHeader>
                <Input
                    type="text"
                    value={inputValue}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setDialogIsOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogClose>
                    <Button disabled={isInputEmpty} onClick={onSearchClick}>
                        <Search />
                        Search
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SearchFieldDialog;
