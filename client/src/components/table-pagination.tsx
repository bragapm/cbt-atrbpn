import { ChevronFirst, ChevronLast } from "lucide-react";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export interface PaginationTableProps {
  totalItems: number; // Total number of items
  pageSize: number; // Number of items per page
  currentPage: number; // Currently active page
  onPageChange: (page: number) => void; // Callback for page change
}

const PaginationTable: React.FC<PaginationTableProps> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageLimit = 3; // Limit before ellipsis is shown

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  // Helper function to render pagination items
  const renderPageNumbers = () => {
    const pages = [];

    // Always show the first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          // href="#"
          isActive={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if currentPage is greater than pageLimit
    if (currentPage > pageLimit) {
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    // Show pages around the currentPage
    const startPage = Math.max(2, currentPage - 1); // Start from page 2, not 1
    const endPage = Math.min(totalPages - 1, currentPage + 1); // Stop before the last page

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            // href=""
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if there are more pages after current page range
    if (currentPage < totalPages - pageLimit) {
      pages.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    // Always show the last page if there are more than 1 page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            // href="#"
            isActive={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* First Page Button */}
        <PaginationItem>
          <PaginationLink
            //  href="#"
            onClick={handleFirstPage}
          >
            <ChevronFirst className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            //  href="#"
            onClick={handlePrevious}
          />
        </PaginationItem>

        {/* Page Numbers with Ellipsis Logic */}
        {renderPageNumbers()}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            //  href="#"
            onClick={handleNext}
          />
        </PaginationItem>

        {/* Last Page Button */}
        <PaginationItem>
          <PaginationLink
            // href="#"
            onClick={handleLastPage}
          >
            <ChevronLast className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTable;
