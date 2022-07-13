import { gql, useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useRef, useState } from "react";
import CellImagePreview from "../../components/CellImagePreview";

import { useGetProductsQuery } from "../../graphql/__generated__/resolvers-types";

const Store: NextPage = ({}) => {
  const { loading, error, data } = useGetProductsQuery({
    variables: {
      limit: 20,
      offset: 0,
    },
  });

  const gridRef = useRef(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [gridReady, setGridReady] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    { field: "order", maxWidth: 80 },
    {
      field: "image",
      maxWidth: 200,
      cellRenderer: CellImagePreview,
    },
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
    setGridReady(true);
  }, []);

  const rowData = useMemo(() => {
    if (gridReady && data?.products) {
      return data.products.map((item: any, i: number) => {
        return {
          order: i + 1,
          ...item,
        };
      });
    }
    return null;
  }, [data, gridReady]);

  return (
    <>
      <div className="h-screen ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"single"}
          onGridReady={onGridReady}
          suppressContextMenu={true}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Store;
