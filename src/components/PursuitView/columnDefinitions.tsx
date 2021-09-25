import { GridColDef, DataGrid, GridCellParams } from "@material-ui/data-grid"
import { Button } from "@material-ui/core";

import React from "react"
import { PursuitResult } from "../../model";

export const createColumns = (onDelete: (row: PursuitResult) => void): GridColDef[] => {
    console.warn("creating race list cols", onDelete);
    return [
      {
        field: "name",
        headerName: "Boat Class",
        width: 250,
        renderCell: (params: GridCellParams) => (
          <strong>
            {(params.row as PursuitResult).boatClass.className}
          </strong>
        ),
      },
      {
        field: "startTime",
        headerName: "Start Time",
        width: 250,
        renderCell: (params: GridCellParams) => (
          <strong>
            {(params.row as PursuitResult).formattedStart}
          </strong>
        ),
      },
      {
        field: "id",
        headerName: "Actions",
        width: 250,
        renderCell: (params: GridCellParams) => (
          <strong>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 5 }}
              onClick={() => {
                return onDelete(params.row as PursuitResult);
              }}
            >
              Delete
            </Button>
          </strong>
        ),
      },
    ];
  };