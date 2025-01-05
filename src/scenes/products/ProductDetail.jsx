import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const ProductDetailDashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [productDetail,setProductDetail] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductItem, setSelectedProductItem] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/cube-manage/product/get-product-detail`,{
                params:{id}
            });
                setProductDetail(response.data);
            } catch (err) {
                setError("Failed to fetch product details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleRowClick = (item) => {
        setSelectedProductItem(item);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProductItem(null);
    };

    const barChartData = {
        labels: Array.isArray(productDetail.productOrderCounts)
            ? productDetail.productOrderCounts.map((order) => order.saleDate)
            : [],
        datasets: [
            {
                label: "Sales Count",
                data: Array.isArray(productDetail.productOrderCounts)
                    ? productDetail.productOrderCounts.map(
                        (order) => order.saleCount
                    )
                    : [],
                backgroundColor: colors.blueAccent[400],
            },
            {
                label: "Profit",
                data: Array.isArray(productDetail.productOrderCounts)
                    ? productDetail.productOrderCounts.map(
                        (order) => order.saleProfit
                    )
                    : [],
                backgroundColor: colors.greenAccent[400],
            },
        ],
    };

    // Pie Chart Data
    const pieChartData = {
        labels: Array.isArray(productDetail.productOrderStatusCounts)
            ? productDetail.productOrderStatusCounts.map(
                (status) => status.status
            )
            : [],
        datasets: [
            {
                data: Array.isArray(productDetail.productOrderStatusCounts)
                    ? productDetail.productOrderStatusCounts.map(
                        (status) => status.statusCount
                    )
                    : [],
                backgroundColor: [
                    colors.greenAccent[400],
                    colors.blueAccent[400],
                    colors.redAccent[400],
                ],
            },
        ],
    };

    const getBarChartData = (orderCounts) => ({
        labels: orderCounts.map((order) => order.saleDate),
        datasets: [
            {
                label: "Sales Count",
                data: orderCounts.map((order) => order.saleCount),
                backgroundColor: colors.blueAccent[400],
            },
            {
                label: "Profit ($)",
                data: orderCounts.map((order) => order.saleProfit),
                backgroundColor: colors.greenAccent[400],
            },
        ],
    });

    const getPieChartData = (statusCounts) => ({
        labels: statusCounts.map((status) => status.status),
        datasets: [
            {
                data: statusCounts.map((status) => status.statusCount),
                backgroundColor: [
                    colors.blueAccent[400],
                    colors.greenAccent[400],
                    colors.redAccent[400],
                ],
            },
        ],
    });

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!productDetail) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography>No product details available.</Typography>
            </Box>
        );
    }

    return (
        <Box m="20px">
            <Header title="Product Details" subtitle={`Dashboard for ${productDetail.name}`} />

            <Box display="flex" flexDirection="column" gap="20px">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="8px"
                >
                    <Typography variant="h5">Name: {productDetail.name}</Typography>
                    <Typography variant="h6">Brand: {productDetail.brandName}</Typography>
                    <Typography variant="body1">Description: {productDetail.description}</Typography>
                    <Typography variant="body2">
                        Current Inventory: {productDetail.currentAvailableTotalInventory}
                    </Typography>
                    <Typography variant="body2">Total Sales: {productDetail.totalSale}</Typography>
                    <Typography variant="body2">Total Profit: ${productDetail.totalProfit}</Typography>
                    <Box
                        component="img"
                        src={productDetail.img}
                        alt={productDetail.name}
                        sx={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "8px",
                            objectFit: "cover",
                            marginTop: "20px",
                        }}
                    />
                </Box>
                
                <Box display="flex" gap="20px">
                     {/* Bar Chart */}
                    <Box
                        sx={{
                            flex: 1,
                            backgroundColor: colors.primary[400],
                            p: "20px",
                            borderRadius: "8px",
                        }}
                    >
                        <Typography variant="h6" mb="10px">
                            Sales and Profit Over Time
                        </Typography>
                        <Bar data={barChartData} />
                    </Box>

                    {/* Pie Chart */}
                    <Box
                        sx={{
                            flex: 1,
                            backgroundColor: colors.primary[400],
                            p: "20px",
                            borderRadius: "8px",
                        }}
                    >
                        <Typography variant="h6" mb="10px">
                            Order Status Distribution
                        </Typography>
                        <Pie data={pieChartData} />
                    </Box>
                </Box>

                {/* Product Items Table */}
                <Box
                    sx={{
                        backgroundColor: colors.primary[400],
                        p: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <Typography variant="h6" mb="10px">
                        Product Items
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>SKU</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Available Inventory</TableCell>
                                <TableCell>Total Sale</TableCell>
                                <TableCell>Total Profit ($)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productDetail.productItemDetailResponses.map((item) => (
                                <TableRow key={item.sku} onClick={() => handleRowClick(item)}>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell>{item.availableInventory}</TableCell>
                                    <TableCell>{item.totalSale}</TableCell>
                                    <TableCell>{item.totalProfit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>

            {/* Dialog for Product Item Details */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
                <DialogTitle>
                    Product Item Details
                    <IconButton
                        onClick={handleCloseDialog}
                        sx={{
                            position: "absolute",
                            right: "8px",
                            top: "8px",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedProductItem && (
                        <Box>
                            <Typography variant="h6">SKU: {selectedProductItem.sku}</Typography>
                            <Typography>Size: {selectedProductItem.size}</Typography>
                            <Typography>
                                Available Inventory: {selectedProductItem.availableInventory}
                            </Typography>
                            <Typography>Total Sale: {selectedProductItem.totalSale}</Typography>
                            <Typography>Total Profit: ${selectedProductItem.totalProfit}</Typography>

                            {/* Charts */}
                            <Box display="flex" gap="20px" mt="20px">
                                {/* Bar Chart */}
                                <Box
                                    sx={{
                                        flex: 1,
                                        backgroundColor: colors.primary[400],
                                        p: "20px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Typography variant="h6" mb="10px">
                                        Sales and Profit Over Time
                                    </Typography>
                                    <Bar
                                        data={getBarChartData(
                                            selectedProductItem.productOrderCounts
                                        )}
                                    />
                                </Box>

                                {/* Pie Chart */}
                                <Box
                                    sx={{
                                        flex: 1,
                                        backgroundColor: colors.primary[400],
                                        p: "20px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Typography variant="h6" mb="10px">
                                        Order Status Distribution
                                    </Typography>
                                    <Pie
                                        data={getPieChartData(
                                            selectedProductItem.productOrderStatusCounts
                                        )}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ProductDetailDashboard;