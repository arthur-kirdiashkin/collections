import { useEffect, useState } from "react";

import "./sidebar_search.css";
import { useDebounce } from "../../hooks/useDebounce";

interface SidebarSearchProps {
  value?: string;
  onChange: (searchValue: string) => void;
}

export default function SidebarSearch({
  value = "",
  onChange,
}: SidebarSearchProps) {
  const [search, setSearch] = useState(value);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed !== value) {
      onChange(trimmed);
    }
  }, [debouncedSearch, value]);

  return (
    <div className="sidebar-search">
      <span className="sidebar-search__icon" />
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        name="search"
        className="sidebar-search__input"
        type="text"
        placeholder="Введите запрос..."
      />
    </div>
  );
}
