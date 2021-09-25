import { GridColDef, DataGrid } from "@material-ui/data-grid";
import React from "react";
import { createTheme, Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';

type GridProps<TResult> = {
  rows: TResult[];
  columns: GridColDef[];
};

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        border: 0,
        height: '90vh',
        color: '#e3e9e5',
        //   theme.palette.type === 'light'
        //     ? 'rgba(0,0,0,.85)'
        //     : 'rgba(255,255,255,0.85)',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: '#272626', // theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        // '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        //   borderRight: `1px solid ${
        //     theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
        //   }`,
        // },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid #0b0c0b`,
        },
        '& .MuiDataGrid-cell': {
          color: '#e3e9e5',
          backgroundColor: '#272626',
          borderTop: '0',
          borderBottom: '0',
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        },
    
      },
    }),
  { defaultTheme },
);

export function Grid<TResult>({ rows, columns }: GridProps<TResult>) {
    const classes = useStyles();

    console.log('rendering grid', rows);
    return (

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        className={classes.root}
        //   onRowSelected={(params) => {
        //     console.warn("click", params.data);
        //     useRouteMatch("/races");
        //   }}
      />

  );
}
