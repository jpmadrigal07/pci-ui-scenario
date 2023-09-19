import { AgGridReact } from "ag-grid-react";
import { ColDef, ColumnApi, GridApi } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useMemo, useRef } from "react";

function getMonthNumber(monthStr: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return months.indexOf(monthStr);
}

const filterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split(' ');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(getMonthNumber(dateParts[0])),
      Number(dateParts[1].replace(',', ''))
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: 'agSetColumnFilter' },
  { 
    field: "discovery_date",
    headerName: "Discovery Date",
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
  },
  { field: "h_mag", headerName: "H (mag)", filter: 'agNumberColumnFilter' },
  { field: "moid_au", headerName: "MOID (au)", filter: 'agNumberColumnFilter' },
  { field: "q_au_1", headerName: "q (au)", filter: 'agNumberColumnFilter' },
  { field: "q_au_2", headerName: "Q (au)", filter: 'agNumberColumnFilter' },
  { field: "period_yr", headerName: "Period (yr)", filter: 'agNumberColumnFilter' },
  { field: "i_deg", headerName: "Inclination (deg)", filter: 'agNumberColumnFilter' },
  { field: "pha", headerName: "Potentially Hazardous", filter: 'agSetColumnFilter' },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, filter: 'agSetColumnFilter' },
];

const TITLE = "Near-Earth Object Overview";

const dateFormat = new Intl.DateTimeFormat('en-US', { 
  dateStyle: 'long'
});

const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<{ api: GridApi, columnApi: ColumnApi } | null>(null);
  const defaultColDef = useMemo(() => { 
    return {
      sortable: true
    };
  }, []);
  useEffect(() => {
    document.title = TITLE
  }, []);
  const updatedData = data.map((row) => {
    return {
      ...row,
      discovery_date: dateFormat.format(new Date(row.discovery_date)),
      pha: row.pha === "Y" ? "Yes" : row.pha === "N" ? "No" : "",
    };
  });
  const resetFiltersSorters = () => {
    gridRef.current?.api?.setFilterModel(null);
    gridRef.current?.columnApi?.resetColumnState();
  }
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px" }}>
        <h2>{TITLE}</h2>
        <button type="button" onClick={() => resetFiltersSorters()}>Clear Filters and Sorters</button>
      </div>
      <AgGridReact
        // @ts-ignore
        ref={gridRef}
        rowData={updatedData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
