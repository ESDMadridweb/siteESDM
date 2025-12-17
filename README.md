# Web Escuela Superior de Diseño Madrid

## Tecnologías utilizadas

- Nuxt 3 | Frontend
- Tailwind CSS | Estilos
- Wordpress | Backend
- Netlify | Despliegue

## Estructura del Proyecto

```text
siteESDM/
├── assets               # Recursos estáticos procesables (CSS, imágenes, fuentes)
├── components           # Componentes Vue reutilizables
├── composables          # Funciones reactivas reutilizables (composables de Vue 3)
├── layouts              # Layouts para estructurar páginas
├── middleware           # Funciones que se ejecutan antes de cargar una página/ruta
├── netlify              # Configuración de despliegue para Netlify
├── pages                # Páginas Vue que generan automáticamente rutas
├── plugins              # Plugins de Vue o terceros para integrar en la app
├── public               # Archivos estáticos sin procesar (favicon, robots.txt)
├── stores               # Almacenamiento global (Pinia o Vuex)
├── utils                # Funciones y helpers generales
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore           # Archivos/carpetas que Git debe ignorar
├── .npmrc               # Configuración de npm específica del proyecto
├── app.vue              # Componente raíz de la aplicación Nuxt
├── error.vue            # Página de error personalizada
├── nuxt.config.js       # Configuración principal de Nuxt.js
├── package-lock.json    # Registro de versiones exactas de dependencias
├── package.json         # Dependencias, scripts y metadata del proyecto
├── README.md            # Documentación del proyecto
├── tailwind.config.cjs  # Configuración de Tailwind CSS
```

## Enlaces
### Producción
https://site-esdm.netlify.app/
### Preview
https://preview--site-esdm.netlify.app/

## Configuración

Asegúrate de instalar las dependencias:

```bash
npm install
```

## Servidor de Desarrollo

Inicia el servidor de desarrollo en http://localhost:3000:

```bash
npm run dev
```

## Producción

**⚠️ Atención:** Una vez se suban cambios a las ramas "main" o "preview", se iniciarán automáticamente los procesos de construcción en Netlify.

Compila la aplicación para producción:

```bash
npm run build
```

Vista previa local de la compilación para producción:

```bash
npm run preview
```