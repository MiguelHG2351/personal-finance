import React, { useState } from 'react';

// Iconos SVG como constantes (basados en el diseño de Figma)
const searchIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2398908b' viewBox='0 0 256 256'%3E%3Cpath d='m229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z'%3E%3C/path%3E%3C/svg%3E";
const caretDownIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2398908b' viewBox='0 0 256 256'%3E%3Cpath d='m213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'%3E%3C/path%3E%3C/svg%3E";
const caretRightIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23201f24' viewBox='0 0 256 256'%3E%3Cpath d='m181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z'%3E%3C/path%3E%3C/svg%3E";

export interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableFilter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  filters?: TableFilter[];
  sortable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  className?: string;
  onRowClick?: (row: T) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Componente de Paginación
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between pt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white border border-[#98908b] rounded-lg px-4 py-3 h-10 flex items-center gap-4 text-[#201f24] text-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="w-4 h-4 rotate-180">
          <img src={caretRightIcon} alt="" className="w-full h-full" />
        </div>
        Prev
      </button>
      
      <div className="flex items-center gap-2">
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-normal ${
              page === currentPage
                ? 'bg-[#201f24] text-white'
                : 'bg-white border border-[#98908b] text-[#201f24]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white border border-[#98908b] rounded-lg px-4 py-3 h-10 flex items-center gap-4 text-[#201f24] text-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <div className="w-4 h-4">
          <img src={caretRightIcon} alt="" className="w-full h-full" />
        </div>
      </button>
    </div>
  );
};

// Componente principal de la Tabla
export const Table = <T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Buscar...",
  filters = [],
  sortable = false,
  pagination = false,
  itemsPerPage = 10,
  className = "",
  onRowClick,
}: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar datos
  const filteredData = data.filter((item) => {
    // Filtro de búsqueda
    if (searchable && searchTerm) {
      const searchableText = columns
        .map(col => {
          const value = item[col.key];
          return typeof value === 'string' ? value.toLowerCase() : String(value).toLowerCase();
        })
        .join(' ');
      
      if (!searchableText.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    // Filtros específicos
    for (const [filterKey, filterValue] of Object.entries(filterValues)) {
      if (filterValue && filterValue !== 'all') {
        if (item[filterKey] !== filterValue) {
          return false;
        }
      }
    }

    return true;
  });

  // Ordenar datos
  const sortedData = [...filteredData];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination 
    ? sortedData.slice(startIndex, startIndex + itemsPerPage)
    : sortedData;

  const handleSort = (key: string) => {
    if (!sortable) return;
    
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [filterKey]: value
    }));
    setCurrentPage(1); // Reset a la primera página cuando se cambia un filtro
  };

  return (
    <div className={`bg-white rounded-xl p-8 ${className}`}>
      {/* Filtros superiores */}
      {(searchable || filters.length > 0) && (
        <div className="flex items-center justify-between mb-6">
          {/* Barra de búsqueda */}
          {searchable && (
            <div className="w-80">
              <div className="relative bg-white border border-[#98908b] rounded-lg px-5 py-3 flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-sm text-[#98908b] font-normal outline-none bg-transparent"
                  />
                </div>
                <div className="w-4 h-4">
                  <img src={searchIcon} alt="" className="w-full h-full" />
                </div>
              </div>
            </div>
          )}

          {/* Filtros */}
          {filters.length > 0 && (
            <div className="flex items-center gap-6">
              {filters.map((filter) => (
                <div key={filter.key} className="flex items-center gap-2">
                  <span className="text-sm text-[#696868] font-normal">
                    {filter.label}
                  </span>
                  <div className="relative">
                    <select
                      value={filterValues[filter.key] || filter.defaultValue || 'all'}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="bg-white border border-[#98908b] rounded-lg px-5 py-3 text-sm text-[#201f24] font-normal appearance-none pr-10 min-w-[120px]"
                    >
                      <option value="all">Todos</option>
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none">
                      <img src={caretDownIcon} alt="" className="w-full h-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Encabezados de tabla */}
      <div className="flex items-center justify-between py-4 border-b border-[#f2f2f2]">
        {columns.map((column) => (
          <div
            key={column.key}
            className={`text-sm text-[#696868] font-normal ${column.width || 'flex-1'} ${
              sortable && column.sortable !== false ? 'cursor-pointer' : ''
            }`}
            onClick={() => column.sortable !== false && handleSort(column.key)}
          >
            {column.header}
          </div>
        ))}
      </div>

      {/* Filas de datos */}
      <div className="space-y-0">
        {paginatedData.map((row, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-4 border-b border-[#f2f2f2] last:border-b-0 ${
              onRowClick ? 'cursor-pointer hover:bg-[#f8f4f0]' : ''
            }`}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={`text-sm ${column.width || 'flex-1'}`}
              >
                {column.render 
                  ? column.render(row[column.key], row)
                  : row[column.key]
                }
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Paginación */}
      {pagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Table;
