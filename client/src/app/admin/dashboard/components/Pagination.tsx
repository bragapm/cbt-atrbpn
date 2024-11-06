import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { FC, useState, useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const calculateVisiblePages = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    setVisiblePages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  };

  useEffect(() => {
    calculateVisiblePages();
  }, [currentPage, totalPages]);

  return (
    <div className="flex gap-2 w-full justify-evenly">
      <button
        className="px-3 py-1 bg-white rounded-lg"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft size={16} />
      </button>
      <button
        className="px-3 py-1 bg-white  rounded-lg"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1   rounded-lg ${
            currentPage === page ? "bg-[#8CBAC7]" : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}
      {totalPages > visiblePages[visiblePages.length - 1] && <span>...</span>}
      <button
        className="px-3 py-1 bg-white  rounded-lg"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {totalPages}
      </button>
      <button
        className="px-3 py-1 bg-white  rounded-lg"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
      <button
        className="px-3 py-1 bg-white  rounded-lg"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
