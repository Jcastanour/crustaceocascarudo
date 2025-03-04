// src/components/AdminPanel.tsx
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { AdminOrders } from "./AdminViews/AdminOrders";
import { AdminUsers } from "./AdminViews/AdminUsers";
import { AdminProducts } from "./AdminViews/AdminProducts";

import "../styles/AdminPanel.css";

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <Tabs
        id="admin-panel-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "orders")}
        className="mb-3"
      >
        <Tab eventKey="orders" title="Pedidos">
          <AdminOrders />
        </Tab>
        <Tab eventKey="users" title="Usuarios">
          <AdminUsers />
        </Tab>
        <Tab eventKey="products" title="Productos">
          <AdminProducts />
        </Tab>
      </Tabs>
    </div>
  );
};
