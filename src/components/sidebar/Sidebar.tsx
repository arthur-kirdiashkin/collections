import "./sidebar.css";
import close from "../../assets/close.png";
import type {
  CollectionFilters,
  Specialization,
} from "../../types/collections.types";
import SidebarSearch from "./SidebarSearch";
import SidebarFilters from "./SidebarFilters";

interface SidebarProps {
  specializations: Specialization[];
  filters: CollectionFilters;
  onUpdateFilter: (newParams: Partial<CollectionFilters>) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function Sidebar({
  specializations,
  filters,
  onUpdateFilter,
  onClose,
  isOpen,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <img onClick={onClose} className="close-btn" src={close} alt="закрыть" />
      <SidebarSearch
        value={filters.search}
        onChange={(searchValue) => onUpdateFilter({ search: searchValue })}
      />
      <SidebarFilters
        specializations={specializations}
        filters={filters}
        onUpdateFilter={onUpdateFilter}
      />
    </aside>
  );
}
