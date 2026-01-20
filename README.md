# H.A.C. Renovation Inc. - Sitio Web

Sitio web profesional para H.A.C. Renovation Inc., una empresa de construcción y renovación con sede en Montreal, Canadá. El sitio incluye un sistema de cotizaciones interactivo, portafolio de proyectos, y panel de administración.

## 📋 Descripción

Este proyecto es un sitio web moderno y responsivo diseñado para mostrar los servicios de construcción y renovación de H.A.C. Renovation Inc. Incluye un sistema de formularios inteligente que integra con Google Sheets para gestionar las solicitudes de cotización de los clientes.

## ✨ Características

- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio
- **Multiidioma**: Soporte para inglés (EN) y francés (FR)
- **Sistema de Cotizaciones Inteligente**: 
  - Wizard de múltiples pasos con preguntas personalizadas según el tipo de proyecto
  - Formularios especializados para cocinas y baños con categorización automática
  - Integración con Google Sheets para almacenamiento de datos
- **Portafolio Interactivo**: Galería de proyectos con comparativas antes/después
- **Panel de Administración**: Sistema de gestión para clientes, calendario y dashboard
- **SEO Optimizado**: Meta tags, sitemap y estructura semántica
- **Formularios de Contacto**: Múltiples puntos de contacto y solicitud de cotizaciones

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica del sitio
- **CSS3**: Estilos personalizados y animaciones
- **JavaScript (Vanilla)**: Funcionalidad interactiva y manejo de formularios
- **Tailwind CSS**: Framework CSS utility-first (via CDN)
- **Google Apps Script**: Backend para procesamiento de formularios
- **Google Sheets**: Base de datos para almacenar solicitudes de cotización

## 📁 Estructura del Proyecto

```
hac-tests/
├── index.html              # Página principal del sitio
├── privacy-policy.html     # Política de privacidad
├── script.js               # JavaScript principal (formularios, traducciones, etc.)
├── styles.css              # Estilos CSS personalizados
├── google-apps-script.js   # Código para Google Apps Script
├── sitemap.xml             # Sitemap para SEO
├── robots.txt              # Configuración para crawlers
├── admin/                  # Panel de administración
│   ├── login.html
│   ├── dashboard.html
│   ├── clients.html
│   └── calendar.html
├── docs/                   # Documentación
│   ├── INSTRUCCIONES_ACTUALIZACION.md
│   └── INSTRUCCIONES_GOOGLE_SHEETS.md
└── public/                 # Recursos estáticos
    ├── logo.png
    ├── hac.png
    ├── before_*.jpg        # Imágenes de proyectos (antes)
    ├── after_*.jpg         # Imágenes de proyectos (después)
    └── ...
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- Un editor de código (VS Code, Sublime Text, etc.)
- Una cuenta de Google (para Google Sheets y Apps Script)
- Un servidor web local (opcional, para desarrollo)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone [url-del-repositorio]
   cd hac-tests
   ```

2. **Configurar Google Sheets**
   - Crea una nueva hoja de cálculo en Google Sheets
   - Configura las columnas según se indica en `docs/INSTRUCCIONES_GOOGLE_SHEETS.md`
   - Las columnas requeridas son:
     ```
     name, email, phone, message, is_owner, address, project_type, 
     property_type, square_feet, budget, timeline, preferred_contact, 
     portfolio_project, privacy_policy, bathroom_category, bathroom_goal, 
     bathroom_layout, bathroom_shower_tub, bathroom_finishes, bathroom_vanity, 
     bathroom_durability, bathroom_budget, bathroom_upgrades, created_at, status
     ```

3. **Configurar Google Apps Script**
   - Abre tu Google Sheet
   - Ve a **Extensiones** > **Apps Script**
   - Copia todo el contenido de `google-apps-script.js`
   - Pégalo en el editor de Apps Script
   - Reemplaza `'YOUR_SHEET_NAME'` con el nombre de tu hoja
   - Guarda el proyecto
   - Despliega como **Aplicación web** con acceso **"Cualquiera"**
   - Copia la URL de la aplicación web generada

4. **Configurar la URL en el código**
   - Abre `script.js`
   - Busca la línea que contiene `const scriptURL`
   - Reemplaza la URL con la que obtuviste de Google Apps Script
   ```javascript
   const scriptURL = "https://script.google.com/macros/s/.../exec";
   ```

5. **Configurar imágenes**
   - Asegúrate de que todas las imágenes estén en la carpeta `public/`
   - Verifica que las rutas en `index.html` sean correctas

## 📖 Uso

### Desarrollo Local

1. **Usando un servidor local simple** (Python):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Usando Node.js (http-server)**:
   ```bash
   npx http-server
   ```

3. Abre tu navegador en `http://localhost:8000`

### Despliegue

El sitio es estático y puede desplegarse en cualquier servicio de hosting:

- **Netlify**: Arrastra y suelta la carpeta del proyecto
- **Vercel**: Conecta tu repositorio Git
- **GitHub Pages**: Configura en la sección Settings > Pages
- **Servidor tradicional**: Sube todos los archivos vía FTP

## 🔧 Configuración Avanzada

### Personalización de Colores

Los colores principales están definidos en `index.html` dentro de la configuración de Tailwind:

```javascript
colors: {
    'primary': '#1e3a5f',
    'primary-light': '#2c4f7c',
    'accent': '#e67e22',
    'accent-light': '#f39c12',
}
```

### Agregar Traducciones

Las traducciones están en `script.js` en el objeto `translations`. Para agregar un nuevo idioma:

1. Agrega una nueva clave al objeto `translations`
2. Copia todas las claves del inglés y traduce
3. Agrega el botón de cambio de idioma en el HTML

### Modificar el Formulario de Cotización

Los formularios están en `index.html` dentro del modal `#quoteWizardModal`. Para agregar nuevos campos:

1. Agrega el campo en el HTML
2. Actualiza `google-apps-script.js` para recibir el nuevo campo
3. Agrega la columna correspondiente en Google Sheets

## 📝 Servicios Ofrecidos

El sitio muestra los siguientes servicios:

1. **Interior Demolition** - Demolición interior
2. **Framing & Structure** - Estructura y armazón
3. **Plaster & Painting** - Yeso y pintura
4. **Patio & Fencing** - Patios y cercas
5. **Concrete Work** - Trabajos en concreto
6. **Floors & Tiling** - Pisos y azulejos

## 📞 Información de Contacto

- **Teléfono**: (438) 989-5253 / (514) 462-7417
- **Email**: hacrenovaccion@gmail.com
- **Dirección**: 2504 Place Keller, Montreal, Canada

## 🔒 Privacidad

El sitio incluye una página de política de privacidad (`privacy-policy.html`) que debe ser revisada y actualizada según las leyes aplicables en Canadá.

## 📚 Documentación Adicional

- `docs/INSTRUCCIONES_ACTUALIZACION.md` - Instrucciones para actualizar formularios
- `docs/INSTRUCCIONES_GOOGLE_SHEETS.md` - Guía de configuración de Google Sheets

## 🐛 Solución de Problemas

### El formulario no envía datos

1. Verifica que la URL de Google Apps Script sea correcta en `script.js`
2. Asegúrate de que Google Apps Script esté desplegado con acceso "Cualquiera"
3. Revisa la consola del navegador (F12) para errores
4. Verifica que las columnas en Google Sheets estén en el orden correcto

### Las imágenes no se muestran

1. Verifica que las rutas en `index.html` sean relativas y correctas
2. Asegúrate de que los archivos existan en la carpeta `public/`
3. Verifica los permisos de archivos en el servidor

### Las traducciones no funcionan

1. Verifica que `script.js` esté cargado correctamente
2. Revisa que los atributos `data-translate` estén en los elementos HTML
3. Verifica la consola del navegador para errores de JavaScript

## 🤝 Contribuciones

Este es un proyecto privado para H.A.C. Renovation Inc. Para sugerencias o mejoras, contacta al equipo de desarrollo.

## 📄 Licencia

Todos los derechos reservados © 2026 H.A.C. Renovation Inc.

## 👥 Créditos

- **Desarrollo**: Equipo de desarrollo H.A.C. Renovation
- **Diseño**: Basado en mejores prácticas de UX/UI modernas
- **Fuentes**: Google Fonts (Inter, Playfair Display)
- **Iconos**: Heroicons (SVG)

## 📅 Versión

**Versión actual**: 1.0.0

---

Para más información, visita [www.hacrenovation.ca](https://www.hacrenovation.ca) o contacta directamente a través de los canales mencionados arriba.
