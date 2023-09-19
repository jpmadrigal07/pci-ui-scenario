import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" },
  { field: "discovery_date", headerName: "Discovery Date" },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", headerName: "Potentially Hazardous" },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, },
];

const TITLE = "Near-Earth Object Overview";

const dateFormat = new Intl.DateTimeFormat('en-US', { 
  dateStyle: 'long'
});

const NeoGrid = (): JSX.Element => {
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
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <h2>{TITLE}</h2>
      <AgGridReact
        rowData={updatedData}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
