# Gestor de Metas y Tareas

Aplicación web para gestionar metas, objetivos y tareas de manera eficiente.

## Características

- Gestión jerárquica de metas, objetivos y tareas
- Seguimiento de progreso
- Filtros y búsqueda
- Interfaz intuitiva y responsive

## Instalación Local

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

## Despliegue en GitHub Pages

1. Instala la dependencia gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Modifica el campo "homepage" en package.json:
```json
{
  "homepage": "https://[TU_USUARIO].github.io/gestor-metas-tareas"
}
```

3. Despliega la aplicación:
```bash
npm run deploy
```

4. Configura GitHub Pages en tu repositorio:
   - Ve a Settings > Pages
   - En "Source", selecciona la rama "gh-pages"
   - Guarda los cambios

## Despliegue

### Opción 1: Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Despliega:
```bash
vercel
```

### Opción 2: Netlify

1. Instala Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Despliega:
```bash
netlify deploy
```

## Tecnologías Utilizadas

- React 18
- React Scripts
- Lucide React (Iconos)
- React Datepicker

## Estructura del Proyecto

```
src/
  ├── TaskManager.jsx    # Componente principal
  ├── styles/           # Estilos y temas
  └── utils/            # Utilidades y helpers
```

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm build`: Genera la versión de producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expulsa la configuración de Create React App
- `npm run deploy`: Despliega la aplicación en GitHub Pages

## Licencia

MIT 