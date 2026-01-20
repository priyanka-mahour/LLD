// import "./styles.css";
import { useState, useEffect, useCallback } from "react";

// User type
interface User {
  id: number;
  name: string;
  email: string;
}

export default function App() {
  const [list, setList] = useState<User[]>([]);
  const [paginationList, setPaginationList] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);

  const pageSize = 3;

  // Fetch API
  const fetchData = async (): Promise<void> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: User[] = await response.json();

    setList(data);
    setPaginationList(data.slice(0, pageSize));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search Handler
  const handleSearch = useCallback(() => {
    const filtered = list.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setPageNumber(0);
    setPaginationList(filtered.slice(0, pageSize));
  }, [list, searchText]);

  useEffect(() => {
    handleSearch();
  }, [searchText, handleSearch]);

  const totalPages = Math.ceil(list.length / pageSize);

  // Next Page
  const nextPage = () => {
    if (pageNumber < totalPages - 1) {
      const newPage = pageNumber + 1;
      const start = newPage * pageSize;
      const end = start + pageSize;

      setPaginationList(list.slice(start, end));
      setPageNumber(newPage);
    }
  };

  // Previous Page
  const prevPage = () => {
    if (pageNumber > 0) {
      const newPage = pageNumber - 1;
      const start = newPage * pageSize;
      const end = start + pageSize;

      setPaginationList(list.slice(start, end));
      setPageNumber(newPage);
    }
  };

  return (
    <div className="App">
      <input
        placeholder="Search"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(event.target.value)
        }
      />

      {paginationList.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      ))}

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={prevPage} disabled={pageNumber === 0}>
          Previous
        </button>

        <button onClick={nextPage} disabled={pageNumber >= totalPages - 1}>
          Next
        </button>
      </div>

      <p>
        Page {pageNumber + 1} of {totalPages}
      </p>
    </div>
  );
}
