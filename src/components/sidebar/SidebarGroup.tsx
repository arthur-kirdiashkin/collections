import { useState } from "react";
import "./sidebar-group.css";
import SidebarChip from "./SidebarChip";

interface SidebarItem {
  id: number;
  title: string;
  imageSrc?: string | null;
}

interface SidebarGroupProps {
  title: string;
  items?: SidebarItem[];
  selected?: number[] | number | boolean | null;
  onSelected: (value: any) => void;
  limit?: number;
}

export default function SidebarGroup({
  title,
  items = [],
  selected,
  onSelected,
  limit = 6,
}: SidebarGroupProps) {
  const [show, setShow] = useState(false);

  const displayedItems = show ? items : items.slice(0, limit);

  const isItemActive = (id: SidebarItem["id"]) => {
    return selected === id;
  };

  const isItemSelected = (id: SidebarItem["id"]) => {
    onSelected(selected === id ? undefined : id);
  };

  return (
    <div className="sidebar-group">
      <h3 className="sidebar-group__title">{title}</h3>
      <div className="sidebar-group__content">
        {displayedItems.map((item) => (
          <SidebarChip
            isActive={isItemActive(item.id)}
            onClick={() => isItemSelected(item.id)}
            key={item.id}
            value={item.title}
          />
        ))}
      </div>
      {items.length > limit ? (
        <p
          className="sidebar-group__btn"
          onClick={() => setShow((prev) => !prev)}
        >
          {!show ? "Посмотреть еще" : "Скрыть"}
        </p>
      ) : null}
    </div>
  );
}
