# Instrucciones para Configurar Google Sheets

## Paso 1: Preparar Google Sheet

1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1qTqxLkRD_TG3fqxmWO-XuNT9abAglB4LrDDjB9vLgI4/edit

2. Asegúrate de que la hoja se llama "customers" (o cambia el nombre en el código)

3. Verifica que las columnas estén en este orden exacto en la primera fila:
   - name
   - email
   - phone
   - message
   - is_owner
   - address
   - project_type
   - property_type
   - square_feet
   - budget
   - timeline
   - preferred_contact
   - created_at
   - status

## Paso 2: Crear Google Apps Script

1. En tu Google Sheet, ve a **Extensiones** > **Apps Script**

2. Se abrirá un nuevo editor. Elimina cualquier código que esté ahí

3. Copia TODO el contenido del archivo `google-apps-script.js` y pégalo en el editor

4. **IMPORTANTE**: Si tu hoja no se llama "customers", cambia esta línea:
   ```javascript
   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('customers');
   ```
   Reemplaza 'customers' con el nombre de tu hoja

5. Guarda el proyecto:
   - Haz clic en el ícono de guardar (💾) o presiona Ctrl+S (Cmd+S en Mac)
   - Dale un nombre al proyecto, por ejemplo: "Quote Form Handler"

## Paso 3: Desplegar como Aplicación Web

1. En el editor de Apps Script, haz clic en el botón **"Desplegar"** (arriba a la derecha)

2. Selecciona **"Nueva implementación"**

3. Haz clic en el ícono de engranaje ⚙️ junto a "Tipo" y selecciona **"Aplicación web"**

4. Configura:
   - **Descripción**: "Form handler for quote requests" (opcional)
   - **Ejecutar como**: **"Yo"** (tu cuenta de Google)
   - **Quién tiene acceso**: **"Cualquiera"** (importante para que funcione desde el sitio web)

5. Haz clic en **"Desplegar"**

6. La primera vez, Google te pedirá autorización:
   - Haz clic en **"Autorizar acceso"**
   - Selecciona tu cuenta de Google
   - Haz clic en **"Avanzado"** si aparece
   - Haz clic en **"Ir a [nombre del proyecto] (no seguro)"**
   - Haz clic en **"Permitir"**

7. Después de autorizar, copia la **URL de la aplicación web** que aparece
   - Debe verse algo como: `https://script.google.com/macros/s/AKfycby.../exec`

## Paso 4: Conectar con el Sitio Web

1. Abre el archivo `script.js` en tu proyecto

2. Busca esta línea (alrededor de la línea 350):
   ```javascript
   const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
   ```

3. Reemplaza `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` con la URL que copiaste en el Paso 3

4. Guarda el archivo

## Paso 5: Probar

1. Abre tu sitio web en el navegador

2. Llena el formulario de contacto inicial

3. Haz clic en "Get Free Quote"

4. Completa todos los pasos del wizard

5. Envía el formulario

6. Verifica en tu Google Sheet que los datos se hayan guardado correctamente

## Solución de Problemas

### Los datos no se guardan en Google Sheet

- Verifica que la URL de Apps Script esté correcta en `script.js`
- Asegúrate de que el nombre de la hoja en el código coincida con tu Google Sheet
- Verifica que hayas desplegado la aplicación web con acceso "Cualquiera"
- Revisa la consola del navegador (F12) para ver si hay errores

### Error de CORS

- Google Apps Script con "no-cors" puede tener limitaciones
- Si hay problemas, puedes cambiar el modo a "cors" en `script.js`:
  ```javascript
  mode: "cors",  // en lugar de "no-cors"
  ```

### Las columnas no coinciden

- Asegúrate de que las columnas en tu Google Sheet estén en el orden exacto especificado
- El código creará automáticamente las columnas si la hoja no existe

## Notas Importantes

- La primera vez que alguien use el formulario, puede haber un pequeño retraso mientras Google Apps Script se "despierta"
- Los datos se guardan en tiempo real en tu Google Sheet
- Puedes agregar validaciones adicionales en el código de Apps Script si lo necesitas
- El campo `status` se establece automáticamente como "new" para cada nuevo registro

