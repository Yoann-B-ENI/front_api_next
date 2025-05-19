import Link from 'next/link'

interface PaginationButtonsProps {
  url: string;
  page: string;
  pagination: Pagination;
}

export default function PaginationButtons({ url, page, pagination }: PaginationButtonsProps){

    return(
        <div className="flex justify-center mt-16 space-x-4">
          {pagination.prev_url && (
            <Link
              href={`${url}?page=${Number(page) - 1}`}
              className="text-white bg-blue-500 border-0 py-2 px-8 rounded text-lg hover:bg-blue-600 focus:outline-none"
            >
              Previous page
            </Link>
          )}
          {pagination.next_url && (
            <Link
              href={`${url}?page=${Number(page) + 1}`}
              className="text-white bg-blue-500 border-0 py-2 px-8 rounded text-lg hover:bg-blue-600 focus:outline-none"
            >
              Next page
            </Link>
          )}
        </div>
    );
}