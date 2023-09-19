import { ColDef } from "ag-grid-community";
import filterDate from "./filterDate";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: 'agSetColumnFilter' },
  { 
    field: "discovery_date",
    headerName: "Discovery Date",
    filter: 'agDateColumnFilter',
    filterParams: filterDate,
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

export default columnDefs;