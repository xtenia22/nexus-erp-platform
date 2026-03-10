# Arquitectura inicial

## Estructura general

- `apps/web`: frontend en Next.js
- `apps/api`: backend en NestJS
- `packages`: código compartido
- `docs`: documentación
- `infra`: infraestructura y despliegue

## Visión de arquitectura

El sistema empresarial existente será la fuente principal de datos.

La plataforma web no se conectará directamente a la base empresarial desde el frontend.  
La integración se realizará a través de una API intermedia.

## Capas previstas

### 1. Sistema empresarial
Base de datos y lógica existente del negocio.

### 2. API de integración
Responsable de exponer datos de forma segura y controlada.

### 3. Backend web moderno
Responsable de normalizar datos, aplicar reglas web y exponer endpoints al frontend.

### 4. Frontend web
Interfaz de usuario moderna para navegación, consulta y futuras operaciones.

## Primer enfoque

Primera fase orientada a solo lectura:
- listado de productos
- detalle de producto
- búsqueda básica
- estructura preparada para crecer