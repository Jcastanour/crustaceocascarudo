-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS crustaceodb;
USE crustaceodb;

-- Tabla de Usuarios (Clientes, Chefs, Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin', 'chef') NOT NULL DEFAULT 'cliente'
);

-- Insertar valores iniciales en Usuarios
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Don cangrejo', 'admin@email.com', '1234', 'admin'),
('chef', 'chef@email.com', '1234', 'chef'),
('Alejo', 'alejo@gmail.com', '1234', 'cliente');

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0,
	imagen VARCHAR(255)
);

-- Insertar valores iniciales en Productos
INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES
('Cangreburger', 'Pan, carne, queso, lechuga', 1.25, 'images/burger1.jpg'),
('Cangreburger + gaseosa', 'Pan, carne, lechuga, queso, lechuga, gaseosa', 3.25, 'images/burger2.jpg'),
('Combo Cangreburger + gaseosa + papas', 'Pan, carne, tomate, queso, lechuga, gaseosa, papas', 5.25, 'images/burger3.jpg');

-- Tabla de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    cantidad_producto INT NOT NULL,
    id_cliente INT NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'entregado') NOT NULL DEFAULT 'pendiente',
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Insertar un pedido de ejemplo en Pedidos (opcional)
INSERT INTO pedidos (id_producto, cantidad_producto, id_cliente, estado) VALUES
(1, 2, 3, 'pendiente');