import { useState } from "react";
import arrowIcon from "../../assets/arrow_down.png";
import "./nav_dropdown.css";
import type { PreparationLink } from "../../constants/constants";

interface NavDropdownProps {
  title?: string;
  items?: PreparationLink[];
}

export default function NavDropdown({
  title = "Подготовка",
  items = [],
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-dropdown">
      <button
        type="button"
        className="nav-dropdown__btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="nav-dropdown__title">{title}</span>
        <img
          src={arrowIcon}
          alt="Развернуть"
          className={`nav-dropdown__arrow ${isOpen ? "open" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="nav-dropdown__menu">
          {items.map((item) => (
            <li key={item.label} className="nav-dropdown__item">
              <a
                href={item.href}
                className="nav-dropdown__link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
