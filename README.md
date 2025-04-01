
# 📌 Migración de Datos

Este proyecto realiza la migración de datos desde archivos **XLSX** a una base de datos **MySQL**, transformando y almacenando la información en las tablas correspondientes.

## 🚀 Tecnologías Utilizadas
Para garantizar la compatibilidad y evitar posibles fallos, se recomienda utilizar las siguientes versiones de las tecnologías:
- **Node.js** v22.14.0
- **MySQL** 8.0.30
- **Knex.js**
- **dotenv** 
- **xlsx**

## 📌 Requisitos Previos

1. **MySQL 8.0.30** instalado y en ejecución.
2. La base de datos **`esquema-db`** ya creada e importada en MySQL (el script sql se encuentra en la carpeta database).
3. Configuración de las variables de entorno en un archivo `.env`.

## 🔧 Instalación e Ejecucion
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Eaguiwa/prueba-migracion.git
   cd migracion-datos
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar las variables de entorno en el archivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=esquema-db
   DB_PORT=3306
   ```
4. Iniciar la Migracion:
   ```sh
   npm start
   ```
### 📝 Resultado esperado en la consola

```
------------------------------------------
Conexión a la base de datos exitosa.
------------------------------------------
Iniciando Migración ...
Pacientes insertados correctamente.
Presupuestos insertados correctamente.
Productos insertados correctamente.
Tratamientos insertados correctamente.
Detalles de presupuesto insertados correctamente.
Migración completada.
------------------------------------------
```
## 🛠️ Explicación de la Estrategia de Migración

El proceso de migración sigue un flujo definido para garantizar la integridad de los datos y minimizar errores:

1. **Verificación de conexión:** Antes de iniciar la migración, se valida que la conexión a la base de datos sea exitosa. Si falla, el proceso se detiene inmediatamente.
2. **Lectura de datos desde XLSX:** Se extraen los datos crudos de los archivos XLSX.
3. **Transformación de datos:**
   - Se ajustan los atributos para que coincidan con la estructura de la base de datos.
   - Se validan y mapean las claves foráneas.
   - Se consideran valores por defecto cuando faltan datos críticos.
4. **Inserción en la base de datos:**
   - Se utiliza un proceso transaccional para asegurar la integridad de los datos.
   - Se sigue un orden lógico de inserción para evitar conflictos con claves foráneas:
     1. **Pacientes**: Se insertan primero, ya que son la base de referencia para otros datos.
     2. **Presupuestos**: Se enlazan a los pacientes insertados.
     3. **Productos y Tratamientos**: Se extraen desde los detalles del presupuesto y se registran por separado.
     4. **Detalle de Presupuesto**: Se inserta en último lugar, asegurando que los presupuestos, productos y tratamientos ya existan.
5. **Manejo de errores y validaciones:** Si ocurre un error en cualquier punto del proceso, la transacción se revierte para evitar datos inconsistentes.

## Estructura del Proyecto
```
📂 migracion-datos/  
│── 📂 src/  
│   │── 📂 config/  
│   │   ├── database.js          # Configuración de conexión a la base de datos  
│   │  
│   │── 📂 services/  
│   │   ├── insert-data.js       # Lógica de inserción de datos en la base de datos  
│   │  
│   │── 📂 utils/  
│   │   ├── read-excel.js        # Función para leer los datos de los archivos XLSX  
│   │   ├── transformer-data.js  # Transformación y validación de los datos extraídos  
│   │  
│   │── index.js                 # Punto de entrada principal, ejecuta la migración  
│  
│── 📂 data/                     # Carpeta que contiene los archivos XLSX de entrada  
│   ├── pacientes.xlsx  
│   ├── presupuestos.xlsx  
│   ├── presupuestos_detalle.xlsx  
│  
│── .env                         # Archivo de configuración con variables de entorno  

```



# 📌 API CLINICA

Esta API proporciona endpoints para consultar los datos migrados de pacientes, presupuestos, tratamientos y productos.

## 🚀 Tecnologías Utilizadas
Para garantizar la compatibilidad y evitar posibles fallos, se recomienda utilizar las siguientes versiones de las tecnologías:
- **Node.js v22.14.0**
- **MySQL 8.0.30**
- **Express.js**
- **Knex.js**
- **dotenv**

## 🔧 Instalación e Ejecucion
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Eaguiwa/prueba-migracion.git
   cd api
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar las variables de entorno en el archivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=esquema-db
   DB_PORT=3306
   ```
4. Iniciar la API:
   ```sh
   npm start
   ```


## 📂 Estructura del Proyecto
```
📂 api/
│── 📂 src/
│   │── 📂 config/        
│   │   ├── database.js   # Configuración de conexión a la base de datos
│   │
│   │── 📂 routes/        # Definición de las rutas de la API
│   │
│   │── 📂 controllers/   # Definición de Controladores
│   │
│   │── 📂 services/      # Definición Servicios
│   │
│   │── app.js           # Configuración de Express y carga de rutas
│   │── server.js        # Punto de entrada de la aplicación
│
│── .env                 # Archivo de configuración de variables de entorno (BD)


```

## 📌 Endpoints Disponibles

Utilizar un cliente como Postman para realizar pruebas de los endpoints de la API.

### 1️⃣ **Pacientes**
- **`GET /api/pacientes`** → Obtiene la lista de pacientes.
- **`GET /api/pacientes/:id`** → Obtiene los detalles de un paciente específico.

### 2️⃣ **Presupuestos**
- **`GET /api/presupuestos`** → Obtiene la lista de presupuestos.
- **`GET /api/presupuestos/:id`** → Obtiene los detalles de un presupuesto, incluyendo sus líneas de detalle.

### 3️⃣ **Tratamientos**
- **`GET /api/tratamientos`** → Obtiene la lista de tratamientos extraídos.

### 4️⃣ **Productos**
- **`GET /api/productos`** → Obtiene la lista de productos extraídos.

## 📡 Ejemplo de Uso
### 🔹 Obtener detalles de un presupuesto, incluyendo sus líneas de detalle.
**Petición:**
```sh
GET http://localhost:3000/api/presupuestos/9154
```
**Respuesta:**
```json
[
   {
    "id_presupuesto": 9155,
    "id_paciente": 1243845,
    "id_super_clinica": 47,
    "id_clinica": 37,
    "fecha": "2025-03-31T00:22:14.000Z",
    "url_presupuesto": "",
    "monto_total": "879.34",
    "monto_pagado": "300.00",
    "saldo_pendiente": "0.00",
    "id_estado": 1,
    "id_tipo_pago": 1,
    "old_id": 39931,
    "id_estado_registro": 1,
    "numero_historia": null,
    "id_contacto": null,
    "fecha_creacion": "2025-03-31T00:22:14.000Z",
    "fecha_modificacion": "2025-03-31T00:22:14.000Z",
    "usuario_creacion": null,
    "id_usuario_creacion": null,
    "detalles": [
        {
            "id_detalle_presupuesto": 2507,
            "id_presupuesto": 9155,
            "id_tratamiento": null,
            "item": 109328,
            "descripcion": "RADIOFRECUENCIA  FRACCIONADA",
            "cantidad": 2,
            "precio": "142.15",
            "descuento": "0.00",
            "id_tipo_iva": null,
            "total_item": "284.30",
            "id_producto": 109328,
            "old_id": 39931
        },
        {
            "id_detalle_presupuesto": 2508,
            "id_presupuesto": 9155,
            "id_tratamiento": null,
            "item": 109329,
            "descripcion": "Indiba Edna Pro Max",
            "cantidad": 10,
            "precio": "59.50",
            "descuento": "0.00",
            "id_tipo_iva": null,
            "total_item": "595.04",
            "id_producto": 109329,
            "old_id": 39931
         }
      ]
   }
]
```
## decisión tomada durante el desarrollo

- **Versión de Node.js:** No se especificó una versión exacta en la prueba técnica, por lo que se utilizó **Node.js v22.14.0**
- **Nombres de archivos y estructura:** Se optó por una estructura modular con **config, services y utils** para mejorar la organización y facilitar la escalabilidad.
- **Valores por defecto:** En caso de datos faltantes en los archivos **XLSX**, se asignan valores predeterminados según la lógica del negocio para evitar registros incompletos.
- **Uso de `old_id` para mapeo de claves:** Se decidió almacenar los identificadores originales en la columna `old_id` para rastrear los datos migrados y facilitar futuras validaciones o referencias.
- **Uso de Knex.js:** Se decidió utilizar **Knex.js** como query builder.
- **Manejo de transacciones:** Para garantizar la integridad de los datos, se implementaron **transacciones** en la inserción de datos.

✨ _Desarrollado por [Edson Aguilar]_ ✨

