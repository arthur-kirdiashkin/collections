import "./sidebar_chip.css";

interface SidebarChipProps {
  onClick?: () => void;
  value: string;
  isActive: boolean;
  key: number;
}

export default function SidebarChip({
  onClick,
  value,
  isActive,
  key,
}: SidebarChipProps) {
  return (
    <div
      key={key}
      onClick={onClick}
      className={`sidebar-chip ${isActive ? "selected" : ""}`}
    >
      <p className="sidebar-chip__text">{value}</p>
    </div>
  );
}
