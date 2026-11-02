import { ACCESS_OPTIONS } from "../../constants/constants";
import type {
  CollectionFilters,
  Specialization,
} from "../../types/collections.types";
import SidebarGroup from "./SidebarGroup";

interface SidebarFiltersProps {
  specializations: Specialization[];
  filters: CollectionFilters;
  onUpdateFilter: (newParams: CollectionFilters) => void;
}

export default function SidebarFilters({
  specializations,
  filters,
  onUpdateFilter,
}: SidebarFiltersProps) {
  const selectedAccessId =
    typeof filters.isFree === "boolean"
      ? ACCESS_OPTIONS.find((e) => e.isFree === filters.isFree)?.id
      : undefined;

  return (
    <div>
      <SidebarGroup
        items={specializations}
        selected={filters.specialization}
        onSelected={(id?: number) => {
          if (id !== undefined) {
            onUpdateFilter({ specialization: id });
          }
        }}
        title="Специализация"
      />
      <SidebarGroup
        items={ACCESS_OPTIONS}
        selected={selectedAccessId}
        onSelected={(id?: number) => {
          const option = ACCESS_OPTIONS.find((e) => e.id === id);
          onUpdateFilter({ isFree: option?.isFree });
        }}
        title="Доступ"
      />
    </div>
  );
}
