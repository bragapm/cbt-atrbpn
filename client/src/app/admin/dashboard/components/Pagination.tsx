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

  // Fungsi untuk menghitung halaman mana yang akan ditampilkan
  const calculateVisiblePages = () => {
    // Implementasi logika untuk menghitung halaman yang akan ditampilkan
    // Contoh: Tampilkan 5 halaman di sekitar halaman aktif
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    setVisiblePages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  };

  // Efek samping untuk menghitung ulang halaman yang terlihat saat currentPage berubah
  useEffect(() => {
    calculateVisiblePages();
  }, [currentPage, totalPages]);

  return (
    <div className="flex gap-2 w-full mx-auto justify-evenly">
      <button
        className="px-3 py-1 bg-white rounded-lg"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      <button
        className="px-3 py-1 bg-white  rounded-lg"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
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
        &gt;
      </button>
      <button
        className="px-3 py-1 bg-white  rounded-lg"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
