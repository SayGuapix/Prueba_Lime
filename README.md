Dado que la prueba no me llego al correo, quiza por algun error tecnico, decidi inventarme un poco la prueba, en la entrevista presencial me mencionaron que especificamente seria un CRUD con cualquier tecnologia, el tema del CRUD no me llego, asi que inventandolo un poco y por no quedarme sin hacer nada, hice un CRUD de laboratorio clinico por creer que podria haber sido el caso. los agentes de IA que usare seran de Cline y Codex.


# Clinical Lab CRUD

Aplicacion web para gestionar un laboratorio clinico. El proyecto esta preparado como un monorepo pequeno con React, Express, SQLite y Prisma.

<img width="2506" height="1159" alt="image" src="https://github.com/user-attachments/assets/25e72eb9-a5cd-42fa-92ce-37180b6c5629" />
<img width="2501" height="1247" alt="image" src="https://github.com/user-attachments/assets/ff501bb4-d754-49bd-bf7d-2ab1635c60a1" />

## Alcance funcional

### Entidades y relaciones

- **Patient**: datos basicos del paciente. Un paciente puede tener muchas ordenes.
- **LabTest**: catalogo de pruebas disponibles, con codigo unico y precio.
- **LabOrder**: solicitud de una prueba para un paciente. Relaciona `Patient` con `LabTest` y mantiene el estado del proceso.
- **LabResult**: resultado de una orden. Cada orden puede tener como maximo un resultado.

Relaciones principales:

- `Patient 1:N LabOrder`
- `LabTest 1:N LabOrder`
- `LabOrder 1:0..1 LabResult`

### Operaciones CRUD previstas

- Pacientes: listar, consultar por id, crear, editar y eliminar.
- Pruebas: listar, consultar por id, crear, editar y eliminar o desactivar.
- Ordenes: listar, consultar por id, crear, editar estado y eliminar.
- Resultados: consultar por orden, crear y editar.

### Validaciones importantes

- Nombre y apellido obligatorios.
- Documento de paciente unico.
- Fecha de nacimiento valida y no futura.
- Codigo y nombre de prueba obligatorios; codigo unico.
- Precio de prueba mayor o igual a cero.
- Una orden debe referenciar un paciente y una prueba existentes.
- Estado de orden restringido a `PENDING`, `IN_PROGRESS`, `COMPLETED` o `CANCELLED`.
- Una orden no puede tener mas de un resultado.
- No se permite eliminar pacientes o pruebas que tengan ordenes asociadas.

### Endpoints previstos

- `GET /api/patients` - listar pacientes.
- `GET /api/patients/:id` - consultar un paciente.
- `POST /api/patients` - crear un paciente.
- `PATCH /api/patients/:id` - actualizar un paciente.
- `DELETE /api/patients/:id` - eliminar un paciente.
- `GET /api/tests` - listar pruebas.
- `GET /api/tests/:id` - consultar una prueba.
- `POST /api/tests` - crear una prueba.
- `PATCH /api/tests/:id` - actualizar una prueba.
- `DELETE /api/tests/:id` - eliminar una prueba.
- `GET /api/orders` - listar ordenes.
- `GET /api/orders/:id` - consultar una orden.
- `POST /api/orders` - crear una orden.
- `PATCH /api/orders/:id` - actualizar una orden.
- `DELETE /api/orders/:id` - eliminar una orden.
- `GET /api/orders/:id/result` - consultar el resultado de una orden.
- `POST /api/orders/:id/result` - crear el resultado de una orden.
- `GET /api/results` - listar resultados.
- `GET /api/results/:id` - consultar un resultado.
- `POST /api/results` - crear un resultado.
- `PATCH /api/results/:id` - actualizar un resultado.
- `DELETE /api/results/:id` - eliminar un resultado.
- `GET /api/health` (ya disponible para comprobar el servidor)


## Estructura

```text
.
├── client/
│   ├── src/
│   │   ├── services/       # Comunicacion HTTP
│   │   ├── types/          # Tipos compartidos del frontend
│   │   ├── App.tsx         # Pantalla inicial
│   │   └── main.tsx
│   └── vite.config.ts
├── server/
│   ├── prisma/schema.prisma
│   └── src/
│       ├── config/         # Variables de entorno
│       ├── controllers/    # Entrada HTTP
│       ├── routes/         # Rutas Express
│       └── types/
├── package.json
└── .gitignore
```

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.

## Puesta en marcha

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000`
- Health check: `http://localhost:3000/api/health`

La configuracion local vive en `server/.env` y su plantilla versionable en `server/.env.example`.
