import {Navigate, Route} from "react-router-dom";
import SignInPage from "../page/SignInPage";
import SignUpPage from "../page/SignUpPage";
import React from "react";
import HomePage from "../page/client/HomePage";
import BookPage from "../page/client/BookPage";
import EmployeesPage from "../page/admin/EmployeesPage";
import SkillsPage from "../page/admin/SkillsPage";
import SchedulesPage from "../page/admin/SchedulesPage";
import ServicesPage from "../page/client/ServicesPage";
import ServicesAdminPage from "../page/admin/ServicesAdminPage";
import AppointmentsPage from "../page/admin/AppointmentsPage";

const AppRoutes = [
    // Client routes
    <Route path="/" exact element={<Navigate replace to={"/home"}/>}/>,
    <Route path="/home" element={<HomePage/>}/>,
    <Route path="/book" element={<BookPage/>}/>,
    <Route path="/services" element={<ServicesPage/>}/>,
    // Admin routes
    <Route path="/admin/employee" element={<EmployeesPage/>}/>,
    <Route path="/admin/skills" element={<SkillsPage/>}/>,
    <Route path="/admin/schedules" element={<SchedulesPage/>}/>,
    <Route path="/admin/appointments" element={<AppointmentsPage/>}/>,
    <Route path="/admin/services" element={<ServicesAdminPage/>}/>,
    // Other routes
    <Route path="/sign-in" element={<SignInPage/>}/>,
    <Route path="/sign-up" element={<SignUpPage/>}/>
];

export default AppRoutes;