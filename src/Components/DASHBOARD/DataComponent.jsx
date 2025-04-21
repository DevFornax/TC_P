import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  getSortedRowModel,
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
  CircleX,
  FileDown,
  Funnel,
  FunnelX,
  SlidersHorizontal,
  SquareChartGantt,
  Trash2,
} from "lucide-react";

import { getAuthToken, API_URL } from "../utils/apiConfig";

export default function DataComponent() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isColumnVisible, setIsColumnVisible] = useState(false);
  const visibilityRef = useRef(null);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterOperator, setFilterOperator] = useState("equals");
  const [filterValue, setFilterValue] = useState("");
  const [activeColumn, setActiveColumn] = useState(null);
  const [columnName, setColumnName] = useState("");
  const [activeFilterColumns, setActiveFilterColumns] = useState([]);

  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const token = getAuthToken();
  const navigate = useNavigate();

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

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatKeyName = (key) => {
    return capitalizeFirstLetter(key.replace(/_/g, " "));
  };

  const getVisualInspectionStatus = (visualData) => {
    if (!visualData || typeof visualData !== "object") {
      return <p>No Data</p>;
    }

    return Object.entries(visualData).map(([key, value]) => {
      if (visualTemplate.hasOwnProperty(key)) {
        const { name, options } = visualTemplate[key];
        const label = capitalizeFirstLetter(name.replace(/_/g, " ")); 
        const optionName = options?.[value] || value;
        return (
          <p key={key}>
            {label}: {optionName}
          </p>
        );
      } else {
        return (
          <p key={key}>
            {formatKeyName(key)}: {value}
          </p>
        );
      }
    });
  };

  const getThermalInspectionStatus = (thermalData) => {
    const formatStatus = (status) => {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === "notdone") return "Not Done";
      if (status === "M") return "Medium";
      if (status === "H") return "High";
      return status.at(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    if (typeof thermalData === "string") {
      const parsedData = JSON.parse(thermalData);
      return (
        <p key="thermal-status">
          {formatStatus(parsedData.status) || "Unknown"}
        </p>
      );
    } else if (typeof thermalData === "object") {
      return Object.entries(thermalData).map(([deviceId, status]) => (
        <p key={deviceId}>
          {deviceId}: {formatStatus(status)}
        </p>
      ));
    } else {
      return <p>Unknown format</p>;
    }
  };

  const handleDownloadPDF = (item) => {
    navigate("/generate-pdf", { state: { inspectionData: item } });
  };

  const filterFunctions = {
    equals: (row, columnId, filterValue) => {
      const cellValue = String(row.getValue(columnId));
      return cellValue.toLowerCase() === String(filterValue).toLowerCase();
    },
    contains: (row, columnId, filterValue) => {
      const cellValue = String(row.getValue(columnId));
      return cellValue
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
    startsWith: (row, columnId, filterValue) => {
      const cellValue = String(row.getValue(columnId));
      return cellValue
        .toLowerCase()
        .startsWith(String(filterValue).toLowerCase());
    },
    endsWith: (row, columnId, filterValue) => {
      const cellValue = String(row.getValue(columnId));
      return cellValue
        .toLowerCase()
        .endsWith(String(filterValue).toLowerCase());
    },
    greaterThan: (row, columnId, filterValue) => {
      const cellValue = Number(row.getValue(columnId));
      return !isNaN(cellValue) && cellValue > Number(filterValue);
    },
    lessThan: (row, columnId, filterValue) => {
      const cellValue = Number(row.getValue(columnId));
      return !isNaN(cellValue) && cellValue < Number(filterValue);
    },
    greaterThanOrEqual: (row, columnId, filterValue) => {
      const cellValue = Number(row.getValue(columnId));
      return !isNaN(cellValue) && cellValue >= Number(filterValue);
    },
    lessThanOrEqual: (row, columnId, filterValue) => {
      const cellValue = Number(row.getValue(columnId));
      return !isNaN(cellValue) && cellValue <= Number(filterValue);
    },
  };

  const operators = [
    { value: "equals", label: "Equals" },
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts with" },
    { value: "endsWith", label: "Ends with" },
    { value: "greaterThan", label: "Greater than" },
    { value: "lessThan", label: "Less than" },
    { value: "greaterThanOrEqual", label: "Greater than or equal" },
    { value: "lessThanOrEqual", label: "Less than or equal" },
  ];

  const columns = useMemo(() => [
    {
      accessorKey: "inspection_id",
      enableHiding: false,
      header: ({ column }) => {
        const isFiltered = activeFilterColumns.includes(column.id);
        return (
          <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Inspection ID
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            {!isFiltered && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setActiveColumn(column);
                  setFilterDialogOpen(true);
                  setColumnName("Inspection ID");
                }}
                title="Filter"
              >
                <Funnel className="h-4 w-4" />
              </button>
            )}
            {isFiltered && (
              <button
                className="border1"
                onClick={() => {
                  const col = table.getColumn(column.id);
                  if (col) col.setFilterValue(undefined);

                  setActiveFilterColumns((prev) =>
                    prev.filter((colId) => colId !== column.id)
                  );
                }}
              >
                <CircleX size={18} color="#f87171" />
              </button>
            )}
          </div>
        );
      },
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "inspection_done_by",
      header: ({ column }) => {
        const isFiltered = activeFilterColumns.includes(column.id);
        return (
          <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Inspection Done By
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            {!isFiltered && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setActiveColumn(column);
                  setFilterDialogOpen(true);
                  setColumnName("Inspection Done By");
                }}
                title="Filter"
              >
                <Funnel className="h-4 w-4" />
              </button>
            )}
            {isFiltered && (
              <button
                className="border1"
                onClick={() => {
                  const col = table.getColumn(column.id);
                  if (col) col.setFilterValue(undefined);

                  setActiveFilterColumns((prev) =>
                    prev.filter((colId) => colId !== column.id)
                  );
                }}
              >
                <CircleX size={18} color="#f87171" />
              </button>
            )}
          </div>
        );
      },
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "location_id",
      header: ({ column }) => {
        const isFiltered = activeFilterColumns.includes(column.id);
        return (
          <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Location ID
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            {!isFiltered && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setActiveColumn(column);
                  setFilterDialogOpen(true);
                  setColumnName("Location ID");
                }}
                title="Filter"
              >
                <Funnel className="h-4 w-4" />
              </button>
            )}
            {isFiltered && (
              <button
                className="border1"
                onClick={() => {
                  const col = table.getColumn(column.id);
                  if (col) col.setFilterValue(undefined);

                  setActiveFilterColumns((prev) =>
                    prev.filter((colId) => colId !== column.id)
                  );
                }}
              >
                <CircleX size={18} color="#f87171" />
              </button>
            )}
          </div>
        );
      },
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "project_id",
      header: ({ column }) => {
        const isFiltered = activeFilterColumns.includes(column.id);
        return (
          <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Project ID
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>

            {!isFiltered && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setActiveColumn(column);
                  setFilterDialogOpen(true);
                  setColumnName("Project ID");
                }}
                title="Filter"
              >
                <Funnel className="h-4 w-4" />
              </button>
            )}
            {isFiltered && (
              <button
                className="border1"
                onClick={() => {
                  const col = table.getColumn(column.id);
                  if (col) col.setFilterValue(undefined);

                  setActiveFilterColumns((prev) =>
                    prev.filter((colId) => colId !== column.id)
                  );
                }}
              >
                <CircleX size={18} color="#f87171" />
              </button>
            )}
          </div>
        );
      },
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "location_type",
      header: ({ column }) => {
        const isFiltered = activeFilterColumns.includes(column.id);
        return (
          <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Location Type
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            {!isFiltered && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setActiveColumn(column);
                  setFilterDialogOpen(true);
                  setColumnName("Location Type");
                }}
                title="Filter"
              >
                <Funnel className="h-4 w-4" />
              </button>
            )}
            {isFiltered && (
              <button
                className="border1"
                onClick={() => {
                  const col = table.getColumn(column.id);
                  if (col) col.setFilterValue(undefined);
                  setActiveFilterColumns((prev) =>
                    prev.filter((colId) => colId !== column.id)
                  );
                }}
              >
                <CircleX size={18} color="#f87171" />
              </button>
            )}
          </div>
        );
      },
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "visual_inspection",
      header: ({ column }) => (
        <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
          <button
            className="text-sm font-medium flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Visual Inspection
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </button>
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => {
              setActiveColumn(column);
              setFilterDialogOpen(true);
              setColumnName("Visual Inspection");
            }}
            title="Filter"
          ></button>
        </div>
      ),
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: ({ row }) => {
        const [expanded, setExpanded] = useState(false);
        const visualData = row.original.visual_inspection;
        const rendered = getVisualInspectionStatus(visualData);
        const previewCount = 1;
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
        <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
          <button
            className="text-sm font-medium flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Thermal Inspection
            <ChevronsUpDown className="ms-2 h-4 w-4" />
          </button>
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => {
              setActiveColumn(column);
              setFilterDialogOpen(true);
              setColumnName("Thermal Inspection");
            }}
            title="Filter"
          ></button>
        </div>
      ),
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: ({ row }) => {
        const [expanded, setExpanded] = useState(false);
        const thermalData = row.original.thermal_inspection;
        const statusElements = getThermalInspectionStatus(thermalData);
        const rendered = Array.isArray(statusElements)
          ? statusElements
          : [statusElements];

        const previewCount = 1;
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
      accessorKey: "created_at",
      header: ({ column }) => {
        const isFiltered = activeFilterColumns.includes(column.id);
        return (
          <div className="flex items-center whitespace-nowrap gap-2 min-w-0">
            <button
              className="text-sm font-medium flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Created At
              <ChevronsUpDown className="ms-2 h-4 w-4" />
            </button>
            {!isFiltered && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setActiveColumn(column);
                  setFilterDialogOpen(true);
                  setColumnName("Created At");
                }}
                title="Filter"
              >
                <Funnel className="h-4 w-4" />
              </button>
            )}
            {isFiltered && (
              <button
                className="border1"
                onClick={() => {
                  const col = table.getColumn(column.id);
                  if (col) col.setFilterValue(undefined);
                  setActiveFilterColumns((prev) =>
                    prev.filter((colId) => colId !== column.id)
                  );
                }}
              >
                <CircleX size={18} color="#f87171" />
              </button>
            )}
          </div>
        );
      },
      filterFn: (row, columnId, filter) => {
        if (!filter || !filter.operator || !filter.value) return true;
        return filterFunctions[filter.operator](row, columnId, filter.value);
      },
      cell: (info) => {
        const rawValue = info.getValue();
        const date = new Date(rawValue);

        const formattedDate = date.toISOString().split("T")[0]; // "2025-04-14"
        const hours = String(date.getHours()).padStart(2, "0"); // "15"
        const minutes = String(date.getMinutes()).padStart(2, "0"); // "04"

        return `${formattedDate} | ${hours}:${minutes}`;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex gap-1">
            <button
              className="text-blue-400"
              onClick={() => navigate(`/view/${item.inspection_id}`)}
            >
              <SquareChartGantt className="w-5" />
            </button>
            <button
              className="text-red-400"
              onClick={() => {
                setDeleteModelOpen(true);
                setItemToDelete(item);
              }}
            >
              <Trash2 className="w-5" />
            </button>
            <button
              className="text-green-400"
              onClick={() => handleDownloadPDF(item)}
            >
              <FileDown className="w-5" />
            </button>
          </div>
        );
      },
    },
  ]);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${API_URL}/delete-inspection?inspection_id=${itemToDelete.inspection_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to delete");
      }

      await fetchData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item.");
    } finally {
      setDeleteModelOpen(false);
      setItemToDelete(null);
    }
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      sorting,
      rowSelection,
      globalFilter,
      columnVisibility,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    enableRowSelection: true,
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const columnDisplayNames = {
    inspection_id: "Inspection ID",
    inspection_done_by: "Inspection Done",
    location_id: "Location ID",
    project_id: "Project ID",
    location_type: "Location Type",
    visual_inspection: "Visual Inspection",
    thermal_inspection: "Thermal Inspection",
  };
  const handleColumnVisiblity = () => {
    setIsColumnVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        visibilityRef.current &&
        !visibilityRef.current.contains(event.target)
      ) {
        setIsColumnVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="p-8 mt-12">
       
        <div className="flex justify-between items-center mb-4">
          <input
            className="border border-gray-300 px-3 py-1 rounded-md w-[200px]"
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <button
            className={`flex justify-center p-[2px] border border-gray-400 w-[50px] rounded-md`}
            onClick={handleColumnVisiblity}
          >
            <SlidersHorizontal className="w-5 text-gray-700" />
          </button>
          {isColumnVisible && (
            <div
              ref={visibilityRef}
              id="column-toggle-dropdown"
              role="menu"
              aria-label="Toggle columns"
              className="absolute right-8 mt-64 w-64 max-h-72 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg z-50"
            >
              <div className="sticky top-0 z-10 bg-gray-100 border-b border-gray-200 px-4 py-2 font-semibold text-gray-700 select-none">
                Toggle columns
              </div>
              <div className="divide-y border2">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    const isVisible = column.getIsVisible();
                    return (
                      <div
                        key={column.id}
                        onClick={() => column.toggleVisibility(!isVisible)}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 capitalize text-gray-800"
                      >
                        {isVisible && (
                          <span className="mr-2 text-gray-500">✔</span>
                        )}
                        <span>
                          {columnDisplayNames[column.id] || column.id}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Table  */}
        <div className="rounded-lg border border-gray-300 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none ${
                        activeFilterColumns.includes(header.column.id)
                          ? "border-x2 bg-gray-200"
                          : "border-none"
                      }`}
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
                        className={`px-6 py-3 whitespace-nowrap text-sm ${
                          activeFilterColumns.includes(cell.column.id)
                            ? "bg-blue-50 text-gray-800"
                            : "text-gray-700"
                        }`}
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

        {/* Pagination  */}
        <div className="flex w-full flex-col-reverse items-center justify-between md:flex-row md:gap-8 py-4 sticky">
          <div className="flex-1 text-muted-foreground text-sm text-gray-700">
            {table.getFilteredRowModel().rows.length} records visible ({total}{" "}
            total)
          </div>
          <div className="flex flex-col-reverse items-center gap-4 md:flex-row md:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="flex items-center justify-center text-sm font-medium">
                Rows per page
              </p>
              <div className="relative inline-block">
                <select
                  className="h-6 md:h-8 px-1 md:px-2 w-[50px] md:w-[60px] rounded border border-gray-300 text-sm md:text-base appearance-none pr-6"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 20, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>

                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
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

        {/* Filter model  */}
        {filterDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                Filter {columnName}
              </h2>
              <div className="flex gap-2 mb-4">
                <div className="relative inline-block">
                  <select
                    value={filterOperator}
                    onChange={(e) => setFilterOperator(e.target.value)}
                    className="h-7 md:h-8 px-1 md:px-2 rounded border border-gray-300 text-sm md:text-base appearance-none pr-6 w-[200px]"
                  >
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Enter value"
                  className="border border-gray-300 rounded h-8 px-2 py-1 w-[200px]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setFilterDialogOpen(false)}
                  className="px-4 py-0 text-sm border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (activeColumn) {
                      activeColumn.setFilterValue({
                        operator: filterOperator,
                        value: filterValue,
                      });
                      setActiveFilterColumns((prev) =>
                        prev.includes(activeColumn.id)
                          ? prev
                          : [...prev, activeColumn.id]
                      );
                    }
                    setFilterDialogOpen(false);
                    setFilterOperator("equals");
                    setFilterValue("");
                  }}
                  className="px-4 py-2 text-sm bg-[#385e72] text-white rounded disabled:bg-[#b7cfdc]"
                  disabled={!filterValue}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* delete model  */}
        {deleteModelOpen && itemToDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Delete Model</h2>
              <div className="flex gap-2 mb-4">
                Are you sure you want to delete data with ID:{" "}
                {itemToDelete.inspection_id}?
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteModelOpen(false)}
                  className="px-4 py-0 text-sm border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm bg-[#f87171] text-white rounded hover:bg-[#e25757]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
