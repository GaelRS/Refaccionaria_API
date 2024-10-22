# Refaccionaria_API
Esta API está diseñada para gestionar clientes y piezas en una refaccionaria, ofreciendo un conjunto de operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para ambas entidades.

- Entidades<br>
  - 🛠️ Piezas
    - Producto: Nombre del producto.
    - Categoria: Categoría a la que pertenece el producto.
    - Precio: Precio del producto.
    - Descripcion: Descripción detallada del producto.
    - Codigo: Código único del producto.
    - Marca: Marca del producto.
    - Stock: Estado de disponibilidad del producto (por ejemplo, "Disponible", "Agotado").
    - ModelosVehiculos: Lista de modelos de vehículos compatibles con la pieza.
  - 👤 Clientes
    - Nombre: Nombre completo del cliente.
    - Correo: Correo electrónico del cliente.
    - Telefono: Número de teléfono del cliente.
    - ProductosComprados: Lista de IDs de los productos que ha comprado el cliente.
      
El sistema está optimizado con características avanzadas como paginación, búsqueda por categorías y almacenamiento en caché para un mejor rendimiento.

## Tecnologías🖥️
Este proyecto ha sido desarrollado con las siguientes tecnologías:
- ⚙️ Node.js - Entorno de ejecución de JavaScript.
- 🟦 TypeScript - Superconjunto de JavaScript.
- 🐳 Docker - Contenedorización del proyecto.
- 📦 pnpm - Gestor de paquetes.
- 🍃 MongoDB - Base de datos NoSQL.
- 🚀 Express - Framework para construir la API.
- 📜 Swagger - Documentación de API.
- 🧠 Redis - Almacenamiento de cache.

## Requisitos📋
- [x] 🛠️ DataGrip - Herramienta de administración de bases de datos.
- [x] 🐳 Docker - Contenedorización del proyecto.
- [x] 📝 Visual Studio Code - Editor de código.
      
## Instalación 🔧
- ⚙️ Configuración inicial<br>
      1. Clonar el repositorio en el directorio de tu preferencia.<br>
         ``git clone https://github.com/GaelRS/Refaccionaria_API.git``<br>
      2. Una vez que haya clonado el repositorio, dirígete a la terminal y ejecuta el siguiente comando.<br>
         ``pnpm install``<br>
         
- 🐳 Configuración de Contenedores
  > ⚠️ IMPORTANTE<br>
  > Asegurate que estes dentro de la carpeta del repositorio<br>
    - 1.crear contenedor que contiene la BD de Mongo.<br>
        ``docker run --name Refaccionaria -p 27017:27017 -v refaccionaria:/data/db -d mongo``
      
        - 1.1 Verificar que el sistema esté en ejecución. A continuación, abre DataGrip y crea una nueva fuente de datos (Data Source) para MongoDB. Luego, introduce el siguiente script.
          ```bash
          use Refaccionaria;
          
          db.createCollection("Piezas");
          db.Piezas.insertMany([{"producto":"Frenos de disco","categoria":"Frenos","precio":1500,"descripcion":"Frenos de disco de alta calidad para                   vehículos.","codigo":"FREN1234","marca":"Autoparts","stock":"Disponible","modelosVehiculos":["Toyota Corolla 2020","Honda Civic 2019"]},{"producto":"Filtro de aire","categoria":"Motor","precio":800,"descripcion":"Filtro de aire de alto rendimiento.","codigo":"MOT9876","marca":"Performance Parts","stock":"Agotado","modelosVehiculos":["Ford Mustang 2018","Chevrolet Camaro 2020","Dodge Challenger 2021"]},{"producto":"Amortiguadores","categoria":"Suspensión","precio":2500,"descripcion":"Amortiguadores delanteros con alta durabilidad.","codigo":"SUSP5678","marca":"ShockMaster","stock":"Disponible","modelosVehiculos":["Nissan Sentra 2019","Mazda 3 2020"]},{"producto":"Pastillas de freno","categoria":"Frenos","precio":1200,"descripcion":"Pastillas de freno cerámicas.","codigo":"FREN2345","marca":"BrakesPlus","stock":"Disponible","modelosVehiculos":["Toyota Prius 2018","Honda Accord 2019","Hyundai Elantra 2020"]},{"producto":"Aceite sintético","categoria":"Aceites","precio":600,"descripcion":"Aceite sintético para motor 5W-30.","codigo":"ACE1234","marca":"OilMaster","stock":"Disponible","modelosVehiculos":["Chevrolet Silverado 2020","Ram 1500 2019"]},{"producto":"Bujías","categoria":"Motor","precio":900,"descripcion":"Bujías de iridio de alto rendimiento.","codigo":"MOT1234","marca":"SparkPro","stock":"Agotado","modelosVehiculos":["Honda CR-V 2018","Toyota RAV4 2020","Ford Escape 2019"]},{"producto":"Resortes de suspensión","categoria":"Suspensión","precio":2300,"descripcion":"Resortes de suspensión de alta resistencia.","codigo":"SUSP3456","marca":"SpringKing","stock":"Disponible","modelosVehiculos":["Subaru Impreza 2019","Hyundai Tucson 2020"]},{"producto":"Discos de freno","categoria":"Frenos","precio":1800,"descripcion":"Discos de freno ventilados.","codigo":"FREN6789","marca":"StopMaster","stock":"Disponible","modelosVehiculos":["Volkswagen Golf 2020","Audi A3 2019"]},{"producto":"Aceite para transmisiones","categoria":"Aceites","precio":700,"descripcion":"Aceite para transmisiones automáticas.","codigo":"ACE5678","marca":"TransOil","stock":"Agotado","modelosVehiculos":["Jeep Wrangler 2020","Nissan Xterra 2019"]},{"producto":"Correa de distribución","categoria":"Motor","precio":1100,"descripcion":"Correa de distribución reforzada.","codigo":"MOT4567","marca":"PowerBelt","stock":"Disponible","modelosVehiculos":["Mitsubishi Outlander 2020","Kia Sportage 2019"]}])

          db.createCollection("Clientes");
          db.Clientes.insertMany([{"nombre":"Gael Rosas Serratos","correo":"gael.rosas@gmail.com","telefono":"442-193-4547","productosComprados":["6717de78847ec1245fa626cc"]},{"nombre":"Ana López Martínez","correo":"ana.lopez@gmail.com","telefono":"553-192-8484","productosComprados":["6717de78847ec1245fa626cd","6717de78847ec1245fa626ce"]},{"nombre":"Carlos Pérez Gómez","correo":"carlos.perez@hotmail.com","telefono":"777-555-1234","productosComprados":["6717de78847ec1245fa626cf"]},{"nombre":"Marta Ruiz Hernández","correo":"marta.ruiz@gmail.com","telefono":"123-456-7890","productosComprados":["6717de78847ec1245fa626d0","6717de78847ec1245fa626d1","6717de78847ec1245fa626d2"]},{"nombre":"Javier Gómez López","correo":"javier.gomez@hotmail.com","telefono":"222-444-5566","productosComprados":["6717de78847ec1245fa626d3"]},{"nombre":"Lucía Martínez Pérez","correo":"lucia.martinez@gmail.com","telefono":"999-888-7777","productosComprados":["6717de78847ec1245fa626d4"]},{"nombre":"Roberto Sánchez Torres","correo":"roberto.sanchez@hotmail.com","telefono":"555-123-4567","productosComprados":["6717de78847ec1245fa626d5","6717de78847ec1245fa626d0"]},{"nombre":"Claudia Torres Jiménez","correo":"claudia.torres@gmail.com","telefono":"444-555-6666","productosComprados":["6717de78847ec1245fa626cd"]},{"nombre":"Diego Fernández Ruiz","correo":"diego.fernandez@hotmail.com","telefono":"333-222-1111","productosComprados":["6717de78847ec1245fa626cc","6717de78847ec1245fa626d2"]},{"nombre":"Elena Jiménez Morales","correo":"elena.jimenez@gmail.com","telefono":"666-777-8888","productosComprados":["6717de78847ec1245fa626cf","6717de78847ec1245fa626d1"]}])
          ```
  - 2.Crear contenedor para redis.<br>
    ``docker run -d --name redis -p 6379:6379 redis``
  - 3.Crear el contenedor de la API.<br>
    ``docker build -t refaccionariadocker:1 .``<br>
    Una vez hecho esto y que los otros dos contenedores esten corriendo, ingresa el siguiente comando en la terminal.<br>
    ``docker run -d -p 3000:3000 --name refaccionariad refaccionariadocker:1``

## Uso de la API 🌐<br>
Una vez hecho todo lo anterior, la API estará disponible en swagger para verificar el funcionamiento de los endpoint, ingresando la siguiente URL en el navegador de tu prefrencia.<br>
``http://localhost:3000/Swagger/``

>❗NOTA<br>
>Para el alta de clientes o para los métodos GET en ambas entidades, para los ID solo basta con que en DataGrip ingreses el siguiente comando
>``db.Clientes.find();`` o ``db.Piezas.find();``<br>
>NO SUBIR CAMBIOS A GIT
