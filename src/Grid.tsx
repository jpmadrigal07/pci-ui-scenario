import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useMemo, useRef } from "react";
import columnDefs from "./helpers/columnDef";
import { PAGE_TITLE } from "./helpers/constants";
import { I_GridTableRef } from "./global";
import formattedData from "./helpers/formattedData";

const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<I_GridTableRef | null>(null);
  const defaultColDef = useMemo(() => { 
    return {
      sortable: true
    };
  }, []);
  useEffect(() => {
    document.title = PAGE_TITLE
  }, []);
  const resetFiltersSorters = () => {
    gridRef.current?.api?.setFilterModel(null);
    gridRef.current?.columnApi?.resetColumnState();
  }
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px" }}>
        <h2>{PAGE_TITLE}</h2>
        <button type="button" onClick={() => resetFiltersSorters()}>Clear Filters and Sorters</button>
      </div>
      <AgGridReact
        // @ts-ignore
        ref={gridRef}
        rowData={formattedData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
