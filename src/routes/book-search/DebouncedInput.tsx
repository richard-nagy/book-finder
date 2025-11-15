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

type DebouncedInputType = {
    /** Will run on input change. */
    onChange: (value: string) => void;
    /** If defined, the input change will be debounced by this value in milliseconds.  */
    debounceMs?: number;
};
const DebouncedInput: FC<DebouncedInputType> = (
    props: DebouncedInputType,
): ReactElement => {
    const { debounceMs, onChange } = props;

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

    return <Input type="text" value={inputValue} onChange={handleChange} />;
};

export default DebouncedInput;
