import type { Dispatch, SetStateAction } from "react";
import arrowLeft from "./../../assets/arrow_left.png";
import arrowRight from "./../../assets/arrow_right.png";
import "./collection_pagination.css";

interface CollectionPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export default function CollectionPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CollectionPaginationProps) {
  const getPaginationPages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage < 5) {
      return [...Array.from({ length: 6 }, (_, i) => i + 1), "...", totalPages];
    }

    if (currentPage < totalPages - 3) {
      return [
        1,
        "...",
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        "...",
        totalPages,
      ];
    }

    const lastPages = Array.from({ length: 6 }, (_, i) => totalPages - 5 + i);

    return [1, "...", ...lastPages];
  };

  const pages = getPaginationPages(currentPage, totalPages);

  const handlePrevPageClick = () => {
    onPageChange((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPageClick = () => {
    onPageChange((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="pagination-container">
      <img
        onClick={handlePrevPageClick}
        className="pagination-btn"
        src={arrowLeft}
        alt="Стрелка влево"
      />
      <div className="pagination-list">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <div key={`dots-${index}`} className="pagination-dots">
                ...
              </div>
            );
          }

          return (
            <button
              className={
                currentPage === page
                  ? "pagination-number selected-btn"
                  : "pagination-number"
              }
              onClick={() => onPageChange(Number(page))}
              key={page}
            >
              {page}
            </button>
          );
        })}
      </div>

      <img
        onClick={handleNextPageClick}
        className="pagination-btn"
        src={arrowRight}
        alt="Стрелка вправо"
      />
    </div>
  );
}
