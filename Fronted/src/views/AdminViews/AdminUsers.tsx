// src/components/AdminUsers.tsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles/AdminUsers.css";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "admin" | "chef" | "cliente";
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch("http://localhost:3000/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }
      const data = await response.json();
      setUsers(data.usuarios);
    } catch (err) {
      console.error(err);
      setError("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-users">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <p>
            {user.nombre} - {user.email} - {user.rol}
          </p>
          <Button variant="primary" size="sm">
            Editar
          </Button>
        </div>
      ))}
    </div>
  );
};
