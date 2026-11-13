# Horizonte Travel — Actividad 2, Angular

**Proyecto:** Sistema Web de Gestión, Búsqueda y Reservas para Agencias de Viajes.
**Universidad de Guayaquil | Grupo 7 | Desarrollo de aplicaciones web avanzado.**

## Ejecutar en Visual Studio Code

1. Abrir la carpeta `HorizonteTravel_Actividad2` en Visual Studio Code.
2. Menú **Terminal > Nueva terminal**.
3. Ejecutar `npm install` (solo la primera vez).
4. Ejecutar `npm start`.
5. Abrir `http://localhost:4200/`.

**Requisito técnico:** Node.js 22.12 o superior compatible con Angular 21, y npm.

## Credenciales públicas de prueba

- **Usuario:** `roy`
- **Contraseña:** `Travel2026`

Se encuentran en `src/app/services/auth.service.ts`, declaradas como propiedades públicas: `usuarioValido` y `claveValida`. El mismo servicio comparte `usuarioAutenticado` y `nombreAutenticado` entre los componentes.

## Verificaciones funcionales

1. En `/login`, intentar iniciar con ambos campos vacíos: aparece el mensaje para completar campos.
2. Escribir `roy` y una contraseña incorrecta: aparece **Error en credenciales**.
3. Escribir `roy` y `Travel2026`: accede al panel en `/inicio` y aparece **Acceso concedido**.
4. Verificar que el encabezado muestre **Roy Gómez** y **Cerrar sesión** en lugar de **Iniciar sesión**.
5. Abrir cada uno de los cinco módulos: Catálogo, Reservas, Pagos, Administración, Soporte.
6. En Catálogo, filtrar destinos y seleccionar **Reservar**; comprobar que abre Reservas con el destino elegido.
7. En Reservas, registrar una solicitud y comprobar que se refleja en la tabla y en los indicadores de Administración.
8. Presionar **Cerrar sesión**; vuelve a `/login` y las rutas privadas quedan protegidas.

## Organización del código

- `src/app/app.component.*`: toolbar/header que cambia según el estado de sesión y pie de página.
- `src/app/app.routes.ts`: rutas Angular.
- `src/app/guards/auth.guard.ts`: impide entrar a páginas privadas sin sesión.
- `src/app/services/auth.service.ts`: credenciales de prueba y estado de sesión compartido.
- `src/app/services/travel-data.service.ts`: datos ilustrativos en memoria y solicitudes de reserva.
- `src/app/pages/login`: formulario con validación.
- `src/app/pages/inicio`: pantalla principal diferente de login.
- `src/app/pages/catalogo`: catálogo y filtros.
- `src/app/pages/reservas`: solicitudes e itinerarios.
- `src/app/pages/pagos`: pagos y facturas ilustrativos.
- `src/app/pages/administracion`: indicadores y gestión.
- `src/app/pages/soporte`: soporte, preguntas frecuentes y reseñas.

## Alcance y limitaciones

**Prototipo académico, NO autenticación ni pagos de producción.** Las credenciales son públicas y la sesión reside solo en memoria (se pierde al recargar la página). Las reservas también están solo en memoria. No utiliza base de datos, envío de correos, pasarela de pago ni autorización por roles. Las cifras y destinos son ilustrativos. En producción, las credenciales NO deben almacenarse en el frontend.

## Entregables

El PDF de evidencias y las capturas se suministran por separado. La grabación final del video **debe realizarla el grupo**, mostrando la ejecución real y la presencia de los cinco integrantes, según la consigna. No hay video grupal auténtico generado en esta entrega.
