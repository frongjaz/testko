import React from 'react';

const Pagination = ({ totalPages, paginate, currentPage, releasesPerPage, handleReleasesPerPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
        
      <ul className='pagination'>
      <div className="pagination-controls">
        <select id="releasesPerPage" value={releasesPerPage} onChange={handleReleasesPerPageChange}>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => paginate(1)} href='#!' className='page-link'>
            &laquo;
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage - 1)} href='#!' className='page-link'>
            &lt;
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage + 1)} href='#!' className='page-link'>
            &gt;
          </a>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={() => paginate(totalPages)} href='#!' className='page-link'>
            &raquo;
          </a>
        </li>
      </ul>
     
    </nav>
  );
};

export default Pagination;
