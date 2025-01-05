import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import AddProduct from "./AddProducts"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/product-detail/${params.row.id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cube-manage/product/get-all-products", {
          params: { page, pageSize },
        });
        setProducts(response.data); 
        setRowCount(response.data.totalElements);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]);


  const columns = [
    {
      field: "imgUrl",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <Box
          component="img"
          src={params.row.imgUrl}
          alt={params.row.name}
          sx={{
            width: 50,
            height: 50,
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      )
    },
    { field: "id", headerName: "Product ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "brandName",
      headerName: "Brand",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header title="Products" subtitle="List of Products" />
      <Button
        onClick={() => setOpenDialog(true)}
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: colors.blueAccent[700],
          position: "absolute",
          top: 100,
          right: 40,
          zIndex: 1, // Ensures the button is on top
        }}
      >
        Add Product
      </Button>

      {/* AddProduct Dialog Popup */}
      <AddProduct open={openDialog} onClose={() => setOpenDialog(false)} />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={products} columns={columns} onRowClick={handleRowClick} />
      </Box>
    </Box>
  );
};

export default Products;
