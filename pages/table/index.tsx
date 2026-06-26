import React, { useState, useEffect, useMemo } from "react";

// Debounce Hook
function useDebounce(value: string, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value]);

  return debounced;
}

const DataTable = () => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  // UI states
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [sortBy, setSortBy] = useState<"name" | "email">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [filter, setFilter] = useState("all");

  // Fetch from API
  useEffect(() => {
    async function getUsers() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await res.json();
      setRawData(json);
    }
    getUsers();
  }, []);

  // Process data: search + filter + sort + pagination
  useEffect(() => {
    let result = [...rawData];

    // Search
    if (debouncedSearch) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Filter example: name starts with "C"
    if (filter === "startsWithC") {
      result = result.filter((user) => user.name.startsWith("C"));
    }

    // Sort
    result.sort((a, b) => {
      const valA = a[sortBy].toLowerCase();
      const valB = b[sortBy].toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination
    const start = (page - 1) * pageSize;
    const paginated = result.slice(start, start + pageSize);

    setData(paginated);
  }, [rawData, debouncedSearch, sortBy, sortOrder, page, filter]);

  const total = rawData.length;
  const totalPages = Math.ceil(total / pageSize);

  const rows = useMemo(
    () =>
      data.map((u) => (
        <tr key={u.id}>
          <td>{u.name}</td>
          <td>{u.email}</td>
        </tr>
      )),
    [data]
  );

  return (
    <div style={{ width: "600px", margin: "20px auto" }}>
      {/* Search */}
      <input
        placeholder="Search by name…"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginRight: "10px" }}
      />

      {/* Filter */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Users</option>
        <option value="startsWithC">Name starts with C</option>
      </select>

      {/* Sort Toggle */}
      <button
        onClick={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
        style={{ marginLeft: "10px" }}
      >
        Sort ({sortOrder})
      </button>

      {/* Table */}
      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th onClick={() => setSortBy("name")} style={{ cursor: "pointer" }}>
              Name
            </th>
            <th onClick={() => setSortBy("email")} style={{ cursor: "pointer" }}>
              Email
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "15px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
