// src/components/auth_components/RoleLanding.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth_components/AuthManager";

const ROLE_ROUTE = {
  superadmin: "/superadmin-dashboard",
  admin: "/admin-dashboard",
  user: "/user-dashboard",
  student: "/user-dashboard",
  instructor: "/user-dashboard",
  accountant: "/user-dashboard",
  alumni_relations: "/user-dashboard",
  business_analyst: "/user-dashboard",
  content_creator: "/user-dashboard",
  course_coordinator: "/user-dashboard",
  customer: "/user-dashboard",
  client: "/user-dashboard",
  customer_support: "/user-dashboard",
  data_scientist: "/user-dashboard",
  department_head: "/user-dashboard",
  developer: "/user-dashboard",
  event_coordinator: "/user-dashboard",
  employee: "/user-dashboard",
  hr_manager: "/user-dashboard",
  intern: "/user-dashboard",
  legal_advisor: "/user-dashboard",
  maintenance_staff: "/user-dashboard",
  marketing_manager: "/user-dashboard",
  operations_manager: "/user-dashboard",
  product_owner: "/user-dashboard",
  project_manager: "/user-dashboard",
  qa_lead: "/user-dashboard",
  recruiter: "/user-dashboard",
  registrar: "/user-dashboard",
  researcher: "/user-dashboard",
  sales_executive: "/user-dashboard",
  support_engineer: "/user-dashboard",
  tech_lead: "/user-dashboard",
  test_engineer: "/user-dashboard",
  ux_ui_designer: "/user-dashboard",
  vendor: "/user-dashboard",
  outlet: "/user-dashboard",
  delivery_person: "/user-dashboard",
  default: "/user-dashboard",
};

const RoleLanding = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  const role = user?.role || "default";
  const to = ROLE_ROUTE[role] || ROLE_ROUTE.default;
  return <Navigate to={to} replace />;
};

export default RoleLanding;
