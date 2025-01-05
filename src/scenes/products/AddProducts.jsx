import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress, MenuItem, Select, FormControl, InputLabel, Box, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";

const AddProduct = ({ open, onClose }) => {
    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState([]);
    const [costPrice, setCostPrice] = useState(0.0);
    const [salePrice, setSalePrice] = useState(0.0);
    const [productImgUrl, setProductImgUrl] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productItemRequests, setProductItemRequests] = useState([{ sku: "", size: "" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("http://localhost:8080/cube-manage/product/get-brands"); // Adjust URL as needed
                setBrands(response.data); // Assuming response contains an array of brand objects with `id` and `name`
            } catch (error) {
                console.error("Error fetching brands:", error);
                setError("Failed to load brands. Please try again.");
            }
        };

        if (open) fetchBrands(); // Fetch brands only when the dialog is open
    }, [open]);

    const handleAddItem = () => {
        setProductItemRequests([...productItemRequests, { sku: "", size: "" }]);
    };

    // Handle removing a product item row
    const handleRemoveItem = (index) => {
        setProductItemRequests(productItemRequests.filter((_, i) => i !== index));
    };

    // Handle updating a specific product item
    const handleUpdateItem = (index, field, value) => {
        const updatedItems = productItemRequests.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setProductItemRequests(updatedItems);
    };

    // Handle form submit
    const handleSubmit = async () => {
        setLoading(true);
        setError(""); // Clear any previous errors

        const productData = {
            name: productName,
            brand: parseInt(brand),
            imgUrl: productImgUrl,
            description: productDescription,
            costPrice: parseFloat(costPrice),
            salePrice: parseFloat(salePrice),
            productItemRequests: productItemRequests
        };

        try {
            const response = await axios.post("http://localhost:8080/cube-manage/product/add-product", productData); // Adjust URL as needed
            console.log("Product added successfully", response.data);
            onClose(); 
        } catch (error) {
            console.error("Error adding product:", error);
            setError("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent>
                <TextField
                    label="Product Name"
                    fullWidth
                    margin="normal"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="brand-select-label">Product Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        {brands.map((b) => (
                            <MenuItem key={b.id} value={b.id}>
                                {b.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Product Cost Price"
                    fullWidth
                    margin="normal"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                />
                <TextField
                    label="Product Sale Price"
                    fullWidth
                    margin="normal"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                />
                <TextField
                    label="Product Image"
                    fullWidth
                    margin="normal"
                    value={productImgUrl}
                    onChange={(e) => setProductImgUrl(e.target.value)}
                />
                <TextField
                    label="Product Description"
                    fullWidth
                    margin="normal"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
                <Box mt={2}>
                    <Typography variant="h6">Product Items</Typography>
                    {productItemRequests.map((item, index) => (
                        <Box display="flex" alignItems="center" key={index} mt={2}>
                            <TextField
                                label="SKU"
                                value={item.sku}
                                onChange={(e) => handleUpdateItem(index, "sku", e.target.value)}
                                margin="normal"
                                style={{ marginRight: 16 }}
                            />
                            <TextField
                                label="Size"
                                value={item.size}
                                onChange={(e) => handleUpdateItem(index, "size", e.target.value)}
                                margin="normal"
                                style={{ marginRight: 16 }}
                            />
                            <IconButton onClick={() => handleRemoveItem(index)} color="error">
                                <Remove />
                            </IconButton>
                        </Box>
                    ))}
                    <Button onClick={handleAddItem} variant="contained" color="primary" startIcon={<Add />}>
                        Add Item
                    </Button>
                </Box>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Add Product"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProduct;
