// src/components/AdminUsers.tsx
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./styles/AdminUsers.css";

interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: "admin" | "chef" | "cliente";
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de edición
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalNombre, setModalNombre] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");
  const [modalRol, setModalRol] = useState<"admin" | "chef" | "cliente">(
    "cliente"
  );

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

  // Abre el modal y carga los datos del usuario seleccionado
  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setModalNombre(user.nombre);
    setModalEmail(user.email);
    setModalPassword(user.password);
    setModalRol(user.rol);
    setShowModal(true);
  };

  // Envía los cambios al backend y refresca la lista
  const handleSaveModal = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:3000/api/usuarios/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: modalNombre,
            email: modalEmail,
            password: modalPassword,
            rol: modalRol,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      setShowModal(false);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el usuario");
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-users">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            {/* */}
            <th>Nombre</th>

            <th>Email</th>
            {/* */}
            <th>Password</th>
            {/* */}
            <th>Rol</th>
            {/* */}
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* */}
              <td>{user.nombre}</td>
              {/* */}
              <td>{user.email}</td>
              {/* */}
              <td>{user.password}</td>
              {/* */}
              <td>{user.rol}</td>
              {/* */}
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenModal(user)}
                >
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar el usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario #{selectedUser?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={modalNombre}
                onChange={(e) => setModalNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                value={modalPassword}
                onChange={(e) => setModalPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRol">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                value={modalRol}
                onChange={(e) =>
                  setModalRol(e.target.value as "admin" | "chef" | "cliente")
                }
              >
                <option value="admin">Admin</option>
                <option value="chef">Chef</option>
                <option value="cliente">Cliente</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveModal}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
