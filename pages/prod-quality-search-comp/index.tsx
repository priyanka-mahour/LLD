import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../custom-hooks/debounce-hook";

interface Product {
  id: number;
  title: string;
  description: string;
}

interface SearchResult {
  products: Product[];
  total?: number;
  skip?: number;
  limit?: number;
}

const DEBOUNCE_DELAY = 300;

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSuggestion = async () => {
    try {
      setLoading(true);
      setError(null);
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(
          debouncedQuery,
        )}`,
        { signal: controller.signal },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data: SearchResult = await response.json();
      setResults(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults({ products: [] });
      setError(null);
      return;
    }

    fetchSuggestion();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [debouncedQuery]);

  console.log('results.products', results.products && results.products[0]?.title)
  console.log('length', results)

  return (
    <div
      style={{
        width: "400px",
        position: "relative",
      }}
    >
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightedIndex(-1);
        }}
        // onKeyDown={handleKeyDown}
        aria-label="Search"
        aria-expanded={results.products?.length > 0}
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-activedescendant={
          highlightedIndex >= 0
            ? `result-${results?.products[highlightedIndex].id}`
            : undefined
        }
      />

      {loading && <div>Loading...</div>}
      {error && <div role="alert">{error}</div>}
      {!loading && !error && debouncedQuery && results.products?.length === 0 && (
        <div>No results found</div>
      )}

      {results && results.products?.length > 0 && (
        <ul>
          {results.products.map((item, index) => (
            <li
              id={`result-${item.id}`}
              key={item.id}
              role="option"
              aria-selected={highlightedIndex === index}
              style={{
                background: highlightedIndex === index ? "#eee" : "transparent",
                cursor: "pointer",
                padding: "8px",
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                setQuery(item.title);
                setResults({ products: [] });
              }}
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
