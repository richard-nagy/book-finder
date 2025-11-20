import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ChangeEvent,
    type FC,
    type ReactElement,
} from "react";

type DebouncedInputProps = {
    /** If defined, the input change will be debounced by this value in milliseconds.  */
    debounceMs?: number;
    /** Placeholder text for the input. */
    placeholder?: string;
    /** Will run on input change. */
    onChange: (value: string) => void;
};
const DebouncedInput: FC<DebouncedInputProps> = (
    props: DebouncedInputProps,
): ReactElement => {
    const { debounceMs, placeholder, onChange } = props;

    const [inputValue, setInputValue] = useState("");

    const debouncedOnChange = useMemo(
        () =>
            debounce((value: string) => {
                onChange(value);
            }, debounceMs),
        [debounceMs, onChange],
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setInputValue(newValue);

            if (debounceMs) {
                debouncedOnChange(newValue);
            } else {
                onChange(newValue);
            }
        },
        [debounceMs, debouncedOnChange, onChange],
    );

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel();
        };
    }, [debouncedOnChange]);

    return (
        <Input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default DebouncedInput;
