# 🍔🦀 Proyecto Crustáceo Cascarudo 🦀🍔

Bienvenido al proyecto **Crustáceo Cascarudo**. Este repositorio contiene el backend y frontend de un sistema para administrar pedidos en un restaurante.

### 🚀 Instalación y configuración del entorno

Sigue los pasos a continuación para configurar y ejecutar el proyecto correctamente:

## Cuentas base:
* correo: admin@gmail.com, contraseña: 1234
* correo: chef@gmail.com, contraseña: 1234
* Puede crear una cuenta de cliente al registrarse

---

## 1️⃣ Configurar la base de datos en DBngin

Para comenzar con el proyecto, primero necesitas configurar la base de datos.

### Pasos:

1. **Abrir DBngin**: Abre la aplicación **DBngin**.
2. **Crear un nuevo engine**:
   - Crea un nuevo **Database Engine** con el nombre **`crustaceodb`**.
   - Configura el **puerto 3306** para la base de datos MySQL.
3. **Iniciar el servicio**: Asegúrate de que el servicio de MySQL esté en ejecución.

---

## 2️⃣ Abrir el proyecto en tu entorno de desarrollo

Abre tu editor de código favorito (recomendamos **Visual Studio Code (Demás que en Intellij tambien corre 👀)**):

1. **Cargar el proyecto**: Abre el proyecto **Crustáceo Cascarudo** dentro del editor.

---

## 3️⃣ Configurar y ejecutar el Backend

### Pasos:

1. **Abrir terminal**:
   - Abre una nueva terminal de comandos (cmd).
2. **Navegar a la carpeta del Backend**:
   - `cd backend`
3. **Instalar dependencias**:
   - Ejecuta el siguiente comando para instalar las dependencias necesarias:
     ```bash
     npm install
     ```
   - Asegúrate de que la instalación se complete sin errores.
4. **Iniciar el servidor**:
   - Ejecuta el servidor con:
     ```bash
     node server.js
     ```

   - Tambien lo puedes ejecutar con:
     ```bash
     npm run dev
     ```

   - Si todo está correcto, deberías ver el siguiente mensaje en la consola:
     ```bash
     Conexión a MySQL exitosa
     Servidor corriendo en el puerto 3000
     ```

---

## 4️⃣ Ejecutar el script de la base de datos

Para configurar la base de datos, necesitas ejecutar un script que creará las tablas y configurará todo lo necesario.

### Pasos:

1. **Navegar a la carpeta del script**:
   - Dirígete a la carpeta **`backend/db`**.
2. **Abrir el archivo SQL**:
   - Abre el archivo **`crustaceodb.sql`** en tu cliente MySQL.
3. **Ejecutar el script**:
   - Ejecuta el script en tu cliente MySQL para crear las tablas y configurar la base de datos **crustaceodb**.

---

## 5️⃣ Configurar y ejecutar el Frontend

Ahora es momento de configurar el frontend para interactuar con el backend.

### Pasos:

1. **Abrir una segunda terminal**:
   - Abre otra terminal de comandos (cmd).
2. **Navegar a la carpeta del Frontend**:
   - `cd Frontend`
3. **Instalar dependencias**:
   - Ejecuta el siguiente comando para instalar las dependencias necesarias:
     ```bash
     npm install
     ```
   - Asegúrate de que la instalación se complete sin errores.
4. **Iniciar el Frontend**:

   - Inicia el servidor del frontend con:
     ```bash
     npm run dev
     ```
   - Si todo está correcto, verás un mensaje en la consola con un enlace como este:

     ```bash
     Vite running at: http://localhost:5173/
     ```

   - Abre el enlace en tu navegador para acceder a la página del **Crustáceo Cascarudo**.

---

## 🍔🦀 ¡Esperamos que disfrutes de la página del mejor restaurante de Fondo de Bikini! 🦀🍔

---
### Estructura del Proyecto

```plaintext
crustaceocascarudo/
├── backend/
│   ├── db/
│   │   └── crustaceodb.sql
│   ├── server.js
│   └── (otros archivos del backend)
├── frontend/
│   ├── (archivos del frontend)
└── README.md
```
