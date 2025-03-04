-- Crear la base de datos
drop schema crustaceodb;
drop table IF EXISTS productos;
DROP TABLE IF EXISTS usuarios;
drop table IF EXISTS pedidos;
drop table IF EXISTS product;
drop table IF EXISTS pedido;
drop table IF EXISTS usuario;

CREATE DATABASE IF NOT EXISTS crustaceodb;
USE crustaceodb;



-- Tabla de Usuarios (Cliegointes, Chefs, Administradores)
CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin', 'chef') NOT NULL DEFAULT 'cliente'
);

-- Insertar valores iniciales en Usuarios
INSERT INTO usuario (nombre, email, password, rol) VALUES
('Don cangrejo', 'admin@email.com', '1234', 'admin'),
('chef', 'chef@email.com', '1234', 'chef'),
('Alejo', 'alejo@gmail.com', '1234', 'cliente');

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
	image VARCHAR(255)
);

-- Insertar valores iniciales en Productos
INSERT INTO product (name, description, price, image) VALUES
('Cangreburger', 'Pan, carne, queso, lechuga', 1.25, 'images/cangreburger.jpg'),
('Cangreburger + gaseosa', 'Pan, carne, lechuga, queso, lechuga, gaseosa', 3.25, 'images/combo2.jpg'),
('Combo Cangreburger + gaseosa + papas', 'Pan, carne, tomate, queso, lechuga, gaseosa, papas', 5.25, 'images/combo3.jpg');

CREATE TABLE IF NOT EXISTS pedido (
  id INT NOT NULL AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('pendiente', 'entregado') NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (id),
  FOREIGN KEY (id_cliente) REFERENCES usuario(id) ON DELETE CASCADE
);

INSERT INTO pedido (id_cliente, estado) VALUES (3, 'pendiente');


-- Tabla de Detalles del Pedido
CREATE TABLE IF NOT EXISTS pedido_detalle (
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad_producto INT NOT NULL,
  PRIMARY KEY (id_pedido,id_producto),
  FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES product(id) ON DELETE CASCADE
);

INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad_producto) VALUES (100, 1, 2);
INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad_producto) VALUES (100, 2, 3);
