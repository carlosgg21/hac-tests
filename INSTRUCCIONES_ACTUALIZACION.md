# Instrucciones para Corregir el Formulario de Bathroom Remodel

## ⚠️ IMPORTANTE: Sigue estos pasos para que el formulario funcione correctamente

### Paso 1: Actualizar las Columnas en Google Sheet

1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1qTqxLkRD_TG3fqxmWO-XuNT9abAglB4LrDDjB9vLgI4/edit

2. En la primera fila (fila 1), asegúrate de tener estas columnas en este orden exacto:

   | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y |
   |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
   | name | email | phone | message | is_owner | address | project_type | property_type | square_feet | budget | timeline | preferred_contact | portfolio_project | privacy_policy | bathroom_category | bathroom_goal | bathroom_layout | bathroom_shower_tub | bathroom_finishes | bathroom_vanity | bathroom_durability | bathroom_budget | bathroom_upgrades | created_at | status |

3. Si tu hoja ya tiene datos, **agrega las columnas faltantes** después de la columna `preferred_contact`:
   - Columna M: `portfolio_project`
   - Columna N: `privacy_policy`
   - Columna O: `bathroom_category`
   - Columna P: `bathroom_goal`
   - Columna Q: `bathroom_layout`
   - Columna R: `bathroom_shower_tub`
   - Columna S: `bathroom_finishes`
   - Columna T: `bathroom_vanity`
   - Columna U: `bathroom_durability`
   - Columna V: `bathroom_budget`
   - Columna W: `bathroom_upgrades`

### Paso 2: Actualizar el Google Apps Script

1. En tu Google Sheet, ve a **Extensiones** > **Apps Script**

2. **Elimina todo el código existente** y copia TODO el contenido del archivo `google-apps-script.js` de este proyecto

3. Pega el código completo en el editor de Apps Script

4. Guarda el proyecto (Ctrl+S o Cmd+S)

5. Haz clic en **"Desplegar"** > **"Gestionar implementaciones"**

6. Si ya tienes una implementación:
   - Haz clic en el ícono de edición (lápiz) junto a la implementación existente
   - Haz clic en **"Nueva versión"**
   - Haz clic en **"Desplegar"**
   
   Si no tienes una implementación:
   - Haz clic en **"Nueva implementación"**
   - Tipo: **"Aplicación web"**
   - Ejecutar como: **"Yo"**
   - Quién tiene acceso: **"Cualquiera"**
   - Haz clic en **"Desplegar"**

7. **IMPORTANTE**: Copia la URL de la aplicación web (debe verse como: `https://script.google.com/macros/s/.../exec`)

8. Abre el archivo `script.js` en este proyecto y verifica que la línea 776 tenga la URL correcta:
   ```javascript
   const scriptURL = "TU_URL_AQUI"
   ```

### Paso 3: Verificar que Funciona

1. Abre tu sitio web en el navegador

2. Ve a la sección "Our Work" (Portfolio)

3. Haz clic en "Get Free Quote" en el proyecto "Bathroom Remodel"

4. Completa todos los pasos del formulario

5. Envía el formulario

6. Verifica en tu Google Sheet que los datos se hayan guardado correctamente

### Solución de Problemas

**Si los datos no se guardan:**

1. Abre la consola del navegador (F12) y busca errores
2. Verifica que la URL del Google Apps Script sea correcta en `script.js`
3. Verifica que todas las columnas estén en el orden correcto en el Google Sheet
4. Asegúrate de que el Google Apps Script esté desplegado con acceso "Cualquiera"
5. Revisa los logs en Google Apps Script: Ve a **Ver** > **Registros de ejecución**

**Si faltan columnas en el Sheet:**

- El código creará automáticamente las columnas si la hoja está vacía
- Si ya tienes datos, debes agregar las columnas manualmente

**Nota sobre los campos del formulario de baño:**

- Los campos `bathroom_*` solo se llenarán cuando el proyecto sea "Bathroom Remodel"
- Para otros tipos de proyectos, estos campos quedarán vacíos (esto es normal)
