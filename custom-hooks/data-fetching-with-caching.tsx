import { useState, useRef, useEffect } from "react";

interface UseFetchOptions {
  staleTime?: number;
  retry?: number;
  onError?: (error: Error) => void;
}

function useFetchData<T>(
  url: string,
  options: UseFetchOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Cache using useRef to avoid re-fetching on every render
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(
    new Map()
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      const { staleTime = 5 * 60 * 1000, retry = 3 } = options;

      // Check cache
      const cached = cacheRef.current.get(url);
      const now = Date.now();

      if (cached && now - cached.timestamp < staleTime) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        let response;
        let lastError: Error | null = null;

        // Retry logic
        for (let i = 0; i < retry; i++) {
          try {
            response = await fetch(url, {
              signal: controller.signal,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            break;
          } catch (err) {
            lastError = err as Error;
            if (i < retry - 1) {
              // Exponential backoff: wait 2^i * 100ms
              await new Promise(resolve =>
                setTimeout(resolve, Math.pow(2, i) * 100)
              );
            }
          }
        }

        if (!response) throw lastError;

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setError(null);
          // Update cache
          cacheRef.current.set(url, { data: result, timestamp: now });
        }
      } catch (err) {
        if (isMounted && err instanceof Error) {
          setError(err);
          options.onError?.(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, options]);

  return { data, loading, error };
}

// Usage
function App() {
  const { data, loading, error } = useFetchData<{ id: number; name: string }[]>(
    "https://api.example.com/dealers",
    { staleTime: 10 * 60 * 1000, retry: 3 }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data?.map(d => <div key={d.id}>{d.name}</div>)}</div>;
}