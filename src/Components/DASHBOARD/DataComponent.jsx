import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { visualTemplate } from "../utils/VisualTemplateforVisualFields";
import Topbar from "../Topbar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  FileDown,
  Funnel,
  SquareChartGantt,
  Trash2,
} from "lucide-react";
import { getAuthToken, API_URL } from "../utils/apiConfig";

export default function DataComponent() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyFilter, setCompanyFilter] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const navigate = useNavigate();
  const token = getAuthToken();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/get-inspection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          page: pageIndex + 1,
          limit: pageSize,
          filter: globalFilter,
        }),
      });

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, globalFilter]);

  const getVisualInspectionStatus = (visualData) => {
    return Object.entries(visualTemplate).map(([key, { name, options }]) => {
      const value = visualData[key];
      const optionName = options[value] || "Unknown";
      return (
        <p key={key}>
          {name}: {optionName}
        </p>
      );
    });
  };

  const getThermalInspectionStatus = (thermalData) => {
    if (typeof thermalData === "string") {
      const parsedData = JSON.parse(thermalData);
      return <p>Status: {parsedData.status || "Unknown"}</p>;
    } else if (typeof thermalData === "object") {
      return Object.entries(thermalData).map(([deviceId, status]) => (
        <p key={deviceId}>
          {deviceId}: {status}
        </p>
      ));
    } else {
      return <p>Unknown format</p>;
    }
  };

  const handleDownloadPDF = (item) => {
    navigate("/generate-pdf", { state: { inspectionData: item } });
  };

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: "inspection_id",
        header: ({ column }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Inspection ID
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFilterDialogOpen(true)}
              title="Filter"
            >
              <Funnel className="h-4 w-4" />
            </button>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          return row
            .getValue(columnId)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "inspection_done_by",
        header: ({ column }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Inspection Done By
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFilterDialogOpen(true)}
              title="Filter"
            >
              <Funnel className="h-4 w-4" />
            </button>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          return row
            .getValue(columnId)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "location_id",
        header: ({ column }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Location ID
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFilterDialogOpen(true)}
              title="Filter"
            >
              <Funnel className="h-4 w-4" />
            </button>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          return row
            .getValue(columnId)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "project_id",
        header: ({ column }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Project ID
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFilterDialogOpen(true)}
              title="Filter"
            >
              <Funnel className="h-4 w-4" />
            </button>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          return row
            .getValue(columnId)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "location_type",
        header: ({ column }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Location Type
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFilterDialogOpen(true)}
              title="Filter"
            >
              <Funnel className="h-4 w-4" />
            </button>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          return row
            .getValue(columnId)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "visual_inspection",
        header: ({ column }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Visual Inspection
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </button>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFilterDialogOpen(true)}
              title="Filter"
            >
              <Funnel className="h-4 w-4" />
            </button>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          // Adjust filter logic if needed
          return row
            .getValue(columnId)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
        cell: ({ row }) => {
          // Use state for toggling "view more/view less"
          const [expanded, setExpanded] = useState(false);
          const visualData = row.original.visual_inspection;
          // getVisualInspectionStatus returns an array of <p> elements
          const rendered = getVisualInspectionStatus(visualData);
          const previewCount = 1; // Show one line as preview
          const isOverflow = rendered.length > previewCount;

          return (
            <div className="text-sm space-y-1">
              {expanded ? rendered : rendered.slice(0, previewCount)}
              {isOverflow && (
                <button
                  className="text-blue-500 text-xs underline mt-1"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "View Less" : "View More"}
                </button>
              )}
            </div>
          );
        },
      },

      {
        accessorKey: "thermal_inspection",
        header: ({ column }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Thermal Inspection
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFilterDialogOpen(true)}
              title="Filter"
            >
              <Funnel className="h-4 w-4" />
            </button>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          return row
            .getValue(columnId)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
        cell: ({ row }) => {
          const [expanded, setExpanded] = useState(false);
          const thermalData = row.original.thermal_inspection;
          // Obtain the content from your helper
          const statusElements = getThermalInspectionStatus(thermalData);
          // Ensure we have an array of elements
          const rendered = Array.isArray(statusElements)
            ? statusElements
            : [statusElements];

          const previewCount = 1; // Show one line as a preview
          const isOverflow = rendered.length > previewCount;

          return (
            <div className="text-sm space-y-1">
              {expanded ? rendered : rendered.slice(0, previewCount)}
              {isOverflow && (
                <button
                  className="text-blue-500 text-xs underline mt-1"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "View Less" : "View More"}
                </button>
              )}
            </div>
          );
        },
      },

      // {
      //   accessorKey: "thermal_inspection",
      //   header: "Thermal Inspection",
      //   cell: ({ row }) => getThermalInspectionStatus(row.original.thermal_inspection),
      // },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex gap-2 border1">
              <button
                className="text-blue-500"
                onClick={() => navigate(`/view/${item.inspection_id}`)}
              >
                <SquareChartGantt className="h-5 w-5" />
              </button>
              <button className="text-red-500">
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                className="text-green-500"
                onClick={() => handleDownloadPDF(item)}
              >
                <FileDown className="h-5 w-5" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      globalFilter,
    },
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <Topbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <input
            className="border px-3 py-2 rounded w-1/7"
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Showing {data.length} of {total} records
          </p>
        </div>

        <div className="rounded-md border border-gray-300 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none"
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={row.getIsSelected() ? "bg-blue-50" : ""}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500 text-sm"
                  >
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex w-full flex-col-reverse items-center justify-between md:flex-row md:gap-8 py-4 sticky">
          <div className="flex-1 text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex flex-col-reverse items-center gap-4 md:flex-row md:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="flex items-center justify-center text-sm font-medium">
                Rows per page
              </p>
              <select
                className="h-6 md:h-8 px-1 md:px-2 w-[50px] md:w-[70px] rounded border border-gray-300 text-sm md:text-base"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[2, 5, 10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="h-8 w-8 p-0 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                className="h-8 w-8 p-0 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className="h-8 w-8 p-0 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                className="h-8 w-8 p-0 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {filterDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Filter by Company</h2>
              <input
                type="text"
                placeholder="Enter company name"
                className="w-full border border-gray-300 rounded p-2 mb-4"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  onClick={() => setFilterDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    table.getColumn("company").setFilterValue(companyFilter);
                    setFilterDialogOpen(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
