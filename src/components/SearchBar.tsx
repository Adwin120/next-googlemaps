"use client";
import usePromise from "@/hooks/usePromise";
import { search } from "@/utils/mock";
import { Combobox } from "@headlessui/react";
import { useCallback, useState } from "react";
import { css } from "../../styled-system-out/css";

interface Props {}
const SearchBar: React.FC<Props> = () => {
    const [query, setQuery] = useState<string | null>(null); //TODO: change to position representing object
    const [input, setInput] = useState<string>("");

    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    const searchPromise = useCallback(() => {
        return search(input);
    }, [input]);
    const [options, status] = usePromise(searchPromise);
    return (
        <Combobox value={query} onChange={(value) => {setIsInputFocused(false) ;setQuery(value)}} nullable>
            {({open}) => <div className={css({ pos: "relative" })}>
                <Combobox.Input onChange={(e) => setInput(e.target.value)} onMouseDown={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} />
                {(isInputFocused || open) && <Combobox.Options className={css({ pos: "absolute", w: "full" })} hold static>
                    {status !== "success" ? (
                        <div>loading</div>
                    ) : options.length === 0 ? (
                        <div>no options</div>
                    ) : (
                        options.map((option) => (
                            <Combobox.Option value={option} key={option}>
                                {({ active, selected }) => (
                                    <div
                                        className={css({
                                            bg: active ? "blue.500" : "gray.600",
                                            color: selected ? "red" : "initial",
                                        })}
                                    >
                                        {option}
                                    </div>
                                )}
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>}
            </div>}
        </Combobox>
    );
};

export default SearchBar;
