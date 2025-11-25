import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ChangeEvent,
    type FC,
    type KeyboardEvent,
    type ReactElement,
} from "react";

type DebouncedInputProps = {
    /** Default value of the input. */
    defaultValue?: string;
    /** If defined, the input change will be debounced by this value in milliseconds.  */
    debounceMs?: number;
    /** Placeholder text for the input. */
    placeholder?: string;
    /** className prop for the Input component. */
    className?: string;
    /** If true the text will be focused by default. */
    autoFocus?: boolean;
    /** Runs on input change. */
    onChange: (value: string) => void | Promise<void>;
    /** Handle on key down event. */
    handleKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};
const DebouncedInput: FC<DebouncedInputProps> = (
    props: DebouncedInputProps,
): ReactElement => {
    const {
        debounceMs,
        placeholder,
        className,
        defaultValue,
        autoFocus,
        onChange,
        handleKeyDown,
    } = props;

    const [inputValue, setInputValue] = useState(defaultValue);

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
            className={className}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
        />
    );
};

export default DebouncedInput;
