import React from 'react';

export default function Pagination({ page, pages, onPageChange }) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
      >
        ← Trước
      </button>
      
      {Array.from({ length: Math.min(5, pages) }, (_, i) => {
        let pageNum;
        if (pages <= 5) {
          pageNum = i + 1;
        } else if (page <= 3) {
          pageNum = i + 1;
        } else if (page >= pages - 2) {
          pageNum = pages - 4 + i;
        } else {
          pageNum = page - 2 + i;
        }
        
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-2 rounded-lg border ${
              pageNum === page
                ? 'bg-primary text-white border-primary'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
      >
        Sau →
      </button>
      
      <span className="text-gray-600 text-sm ml-4">
        Trang {page} / {pages}
      </span>
    </div>
  );
}
