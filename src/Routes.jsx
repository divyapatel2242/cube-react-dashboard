import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Customer from "./scenes/customer";
import Products from "./scenes/products";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Geography from "./scenes/geography";
import LoginPage from "./scenes/login";
import Logout from "./scenes/logout";
import ProtectedRoute from "./ProtectedRoutes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ProductDetail from './scenes/products/ProductDetail';

const AppRoutes = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/customer"
                element={
                    <ProtectedRoute>
                        <Customer />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/contacts"
                element={
                    <ProtectedRoute>
                        <Contacts />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/form"
                element={
                    <ProtectedRoute>
                        <Form />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/bar"
                element={
                    <ProtectedRoute>
                        <Bar />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/pie"
                element={
                    <ProtectedRoute>
                        <Pie />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/line"
                element={
                    <ProtectedRoute>
                        <Line />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/geography"
                element={
                    <ProtectedRoute>
                        <Geography />
                    </ProtectedRoute>
                }
            />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
            </main>
        </div>
    );
};

export default AppRoutes;
