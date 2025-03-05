import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import "./styles/AdminProducts.css";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImage, setEditImage] = useState<File | null>(null);

  // Estados para el modal de agregar producto
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addPrice, setAddPrice] = useState<number>(0);
  const [addImage, setAddImage] = useState<File | null>(null);

  // Obtiene la lista de productos desde el backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/productos");
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const data = await response.json();
      setProducts(data.productos);
    } catch (err) {
      console.error(err);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Abre el modal de edición cargando los datos del producto seleccionado
  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setEditName(product.name);
    setEditDescription(product.description || "");
    setEditPrice(product.price);
    setEditImage(null);
    setShowEditModal(true);
  };

  // Envía la actualización del producto al backend
  const handleSaveEditModal = async () => {
    if (!selectedProduct) return;
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("description", editDescription);
      formData.append("price", editPrice.toString());
      if (editImage) {
        formData.append("image", editImage);
      }
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:3000/api/productos/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // Al usar FormData no se especifica "Content-Type"
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }
      setShowEditModal(false);
      await fetchProducts();
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el producto");
    }
  };

  // Envía la petición DELETE para eliminar un producto
  const handleDeleteProduct = async (productId: number) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:3000/api/productos/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      await fetchProducts();
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el producto");
    }
  };

  // Abre el modal para agregar un nuevo producto
  const handleOpenAddModal = () => {
    setAddName("");
    setAddDescription("");
    setAddPrice(0);
    setAddImage(null);
    setShowAddModal(true);
  };

  // Envía la información del nuevo producto al backend
  const handleSaveAddModal = async () => {
    try {
      const formData = new FormData();
      formData.append("name", addName);
      formData.append("description", addDescription);
      formData.append("price", addPrice.toString());
      if (addImage) {
        formData.append("image", addImage);
      }
      const token = localStorage.getItem("userToken");
      const response = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }
      setShowAddModal(false);
      await fetchProducts();
    } catch (error) {
      console.error(error);
      setError("No se pudo agregar el producto");
    }
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-products">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {/* */}
            <th>Nombre</th>
            {/* */}
            <th>Descripción</th>
            {/* */}
            <th>Precio</th>
            {/* */}
            <th>Imagen</th>
            {/* */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              {/* */}
              <td>{product.name}</td>
              {/* */}
              <td>{product.description}</td>
              {/* */}
              <td>${Number(product.price).toFixed(2)}</td>
              {/* */}
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px" }}
                  />
                ) : (
                  "Sin imagen"
                )}
              </td>
              {/* */}
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenEditModal(product)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" className="mt-3" onClick={handleOpenAddModal}>
        Agregar Producto
      </Button>

      {/* Modal para editar producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto #{selectedProduct?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editDescription" className="mt-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editPrice" className="mt-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group controlId="editImage" className="mt-2">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files && target.files.length > 0) {
                    setEditImage(target.files[0]);
                  }
                }}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEditModal}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar producto */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSaveAddModal();
          }}
        >
          <Modal.Body>
            <Form.Group controlId="addName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="addDescription" className="mt-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="addPrice" className="mt-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={addPrice}
                onChange={(e) => setAddPrice(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group controlId="addImage" className="mt-2">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files && target.files.length > 0) {
                    setAddImage(target.files[0]);
                  }
                }}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Agregar Producto
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
