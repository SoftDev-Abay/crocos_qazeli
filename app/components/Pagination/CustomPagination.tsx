import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomPagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  const router = useRouter();

  const createPageURL = (pageNumber: number) => {
    if (searchParams !== null) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    }
  };

  const onPageChange = (pageNumber: number) => {
    const newUrl = createPageURL(pageNumber);
    if (newUrl) {
      router.push(newUrl);
    }
  };

  // return (
  //   <nav className="pagination" role="navigation" aria-label="pagination">
  //     <button
  //       className="pagination-previous"
  //       onClick={() => onPageChange(currentPage - 1)}
  //       disabled={currentPage === 1}
  //     >
  //       Previous
  //     </button>

  //     <ul className="pagination-list">
  //       {Array.from({ length: totalPages }, (_, i) => i + 1)
  //         .slice(currentPage - 1, currentPage + maxVisiblePages - 1)
  //         .map((pageNumber) => (
  //           <li key={pageNumber}>
  //             <button
  //               className={`pagination-link ${
  //                 pageNumber === currentPage ? "is-current" : ""
  //               }`}
  //               onClick={() => onPageChange(pageNumber)}
  //             >
  //               {pageNumber}
  //             </button>
  //           </li>
  //         ))}
  //     </ul>

  //     <button
  //       className="pagination-next"
  //       onClick={() => onPageChange(currentPage + 1)}
  //       disabled={currentPage === totalPages}
  //     >
  //       Next page
  //     </button>
  //   </nav>
  // );

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />
    </Stack>
  );
};

export default CustomPagination;
