import { useCallback, useState, type FC } from "react";
import Input from "./components/Input";

interface BookDoc {
    title: string;
    author_name: string[];
    key: string;
}

interface OpenLibraryResponse {
    docs: BookDoc[];
}

const App: FC = () => {
    const [books, setBooks] = useState<BookDoc[]>([]);

    const fetchBooks = useCallback(async (searchQuery: string) => {
        try {
            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`;
            const response = await fetch(url);
            const data: OpenLibraryResponse = await response.json();
            setBooks(data.docs);
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div>
            <Input onChange={fetchBooks} debounceMs={250} />
            <ul>
                {books.map((b) => (
                    <li key={b.key}>{b.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
