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

  // Estados para el modal de edición y creación
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalNombre, setModalNombre] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");
  const [modalRol, setModalRol] = useState<"admin" | "chef" | "cliente">(
    "cliente"
  );

  const [createNombre, setCreateNombre] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createRol, setCreateRol] = useState<"admin" | "chef" | "cliente">(
    "cliente"
  );

  // Fetch users from the backend
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

  // Open modal to edit user
  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setModalNombre(user.nombre);
    setModalEmail(user.email);
    setModalPassword(user.password);
    setModalRol(user.rol);
    setShowModal(true);
  };

  // Save edited user
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

  // Handle user deletion
  const handleDeleteUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:3000/api/usuarios/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el usuario");
    }
  };

  // Open modal to create new user
  const handleOpenCreateModal = () => {
    setCreateNombre("");
    setCreateEmail("");
    setCreatePassword("");
    setCreateRol("cliente");
    setShowCreateModal(true);
  };

  // Save new user
  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: createNombre,
          email: createEmail,
          password: createPassword,
          rol: createRol,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }
      setShowCreateModal(false);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setError("No se pudo crear el usuario");
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
            <th>Nombre</th>
            <th>Email</th>
            <th>Password</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.rol}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenModal(user)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="success" onClick={handleOpenCreateModal}>
        Crear Usuario
      </Button>

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

      {/* Modal para crear un nuevo usuario */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCreateNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={createNombre}
                onChange={(e) => setCreateNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCreateEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={createEmail}
                onChange={(e) => setCreateEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCreatePassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCreateRol">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                value={createRol}
                onChange={(e) =>
                  setCreateRol(e.target.value as "admin" | "chef" | "cliente")
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
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Crear Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
