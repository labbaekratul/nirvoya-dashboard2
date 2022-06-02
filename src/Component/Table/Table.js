import React, { forwardRef, useEffect, useRef } from "react";
import {
  BsArrowDown,
  BsArrowUp,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight
} from "react-icons/bs";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from "react-table";
import GlobalFilter from "./GlobalFilter";

// select table row
const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

function Table({ columns, data, url, handleDeleteClick }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter } = state;

  // Render the UI for your table
  return (
    <>
      <GlobalFilter
        selectedFlatRows={selectedFlatRows}
        filter={globalFilter}
        setFilter={setGlobalFilter}
        handleDeleteClick={handleDeleteClick}
        url={url}
        data={data}
      />
      
      <table
        {...getTableProps({ className: "table table-hover align-middle" })}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps(), {
                    className: column.collapse ? "collapse" : "",
                  })}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsArrowDown />
                      ) : (
                        <BsArrowUp />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        className: cell.column.collapse ? "collapse" : "",
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <span>
          <b> &nbsp; Go to page : &nbsp;</b>
          <input
            className="ms-1"
            type="number"
            min="1"
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{
              width: "70px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
        </span>

        <span className="me-2">
          <b>|</b> &nbsp; Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        {/* -------------------- */}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <BsChevronDoubleLeft />
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <BsChevronLeft />
        </button>

        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <BsChevronRight />
        </button>
        <button
          className="me-2"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <BsChevronDoubleRight />
        </button>

        {/* ---------------------------- */}

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[15, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows:": selectedFlatRows.map((d) => d.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
}

export default Table;
