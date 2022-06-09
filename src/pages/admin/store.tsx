import { gql, useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useRef, useState } from "react";

const Store: NextPage = ({}) => {
  const ALL_PRODUCTS_QUERY = gql`
    {
      products(limit: 10, offset: 0) {
        id
        name
        description
        labelPrice
        variants {
          id
          imageId
          title
          price
        }
        images {
          id
          position
          source
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data);

  const gridRef = useRef(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", minWidth: 150 },
    { field: "age", maxWidth: 90 },
    { field: "country", minWidth: 150 },
    { field: "year", maxWidth: 90 },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <>
      <h3>Store</h3>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={"single"}
        onGridReady={onGridReady}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Store;
