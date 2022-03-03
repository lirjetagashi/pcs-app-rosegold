import {Navigate, Route} from "react-router-dom";
import SignInPage from "../page/SignInPage";
import SignUpPage from "../page/SignUpPage";
import React from "react";
import HomePage from "../page/client/HomePage";
import BookPage from "../page/client/BookPage";
import EmployeesPage from "../page/admin/EmployeesPage";
import CategoriesPage from "../page/admin/CategoriesPage";
import SchedulesPage from "../page/admin/SchedulesPage";
import ServicesPage from "../page/client/ServicesPage";
import ServicesAdminPage from "../page/admin/ServicesAdminPage";
import AppointmentsPage from "../page/admin/AppointmentsPage";

const AppRoutes = [
    // Client routes
    <Route key={1} path="/" exact element={<Navigate replace to={"/home"}/>}/>,
    <Route key={2} path="/home" element={<HomePage/>}/>,
    <Route key={3} path="/book" element={<BookPage/>}/>,
    <Route key={4} path="/services" element={<ServicesPage/>}/>,
    // Admin routes
    <Route key={5} path="/admin/employee" element={<EmployeesPage/>}/>,
    <Route key={6} path="/admin/categories" element={<CategoriesPage/>}/>,
    <Route key={7} path="/admin/schedules" element={<SchedulesPage/>}/>,
    <Route key={8} path="/admin/appointments" element={<AppointmentsPage/>}/>,
    <Route key={9} path="/admin/services" element={<ServicesAdminPage/>}/>,
    // Other routes
    <Route key={10} path="/sign-in" element={<SignInPage/>}/>,
    <Route key={11} path="/sign-up" element={<SignUpPage/>}/>
];

export default AppRoutes;