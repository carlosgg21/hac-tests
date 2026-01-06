/**
 * Google Apps Script para recibir datos del formulario y guardarlos en Google Sheets
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1qTqxLkRD_TG3fqxmWO-XuNT9abAglB4LrDDjB9vLgI4/edit
 * 
 * 2. Ve a Extensiones > Apps Script
 * 
 * 3. Pega este código completo en el editor
 * 
 * 4. Reemplaza 'YOUR_SHEET_NAME' con el nombre de tu hoja (probablemente "customers" o "Tab")
 * 
 * 5. Guarda el proyecto (Ctrl+S o Cmd+S) y dale un nombre, por ejemplo "Quote Form Handler"
 * 
 * 6. Haz clic en "Desplegar" > "Nueva implementación"
 * 
 * 7. Selecciona:
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquiera
 * 
 * 8. Haz clic en "Desplegar"
 * 
 * 9. Copia la URL de la aplicación web (algo como: https://script.google.com/macros/s/...)
 * 
 * 10. Pega esa URL en el archivo script.js, reemplazando "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
 * 
 * 11. Asegúrate de que las columnas en tu Google Sheet estén en este orden:
 *     name, email, phone, message, is_owner, address, project_type, property_type, 
 *     square_feet, budget, timeline, preferred_contact, created_at, status
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Try to get the sheet - check common names
    let sheet = spreadsheet.getSheetByName('customers');
    if (!sheet) {
      sheet = spreadsheet.getSheetByName('Tab');
    }
    if (!sheet) {
      sheet = spreadsheet.getSheetByName('Sheet1');
    }
    if (!sheet) {
      // Get the first sheet if none of the above exist
      sheet = spreadsheet.getSheets()[0];
    }
    
    // If sheet is empty or doesn't have headers, add them
    if (sheet.getLastRow() === 0) {
      const headers = [
        'name', 'email', 'phone', 'message', 'is_owner', 'address', 
        'project_type', 'property_type', 'square_feet', 'budget', 
        'timeline', 'preferred_contact', 'created_at', 'status'
      ];
      sheet.appendRow(headers);
    }
    
    // Parse data - handle both JSON and URL-encoded formats
    let data = {};
    
    if (e.postData && e.postData.contents) {
      // Try to parse as JSON first
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, try URL-encoded format
        const params = e.parameter;
        if (params && Object.keys(params).length > 0) {
          data = params;
        } else {
          // Parse URL-encoded string manually
          const urlParams = e.postData.contents.split('&');
          urlParams.forEach(param => {
            const [key, value] = param.split('=');
            if (key && value) {
              data[decodeURIComponent(key)] = decodeURIComponent(value);
            }
          });
        }
      }
    } else if (e.parameter) {
      // Direct parameter access (URL-encoded)
      data = e.parameter;
    }
    
    // Prepare the row data in the correct order
    const rowData = [
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.is_owner || 'FALSE',
      data.address || '',
      data.project_type || '',
      data.property_type || '',
      data.square_feet || '',
      data.budget || '',
      data.timeline || '',
      data.preferred_contact || '',
      data.created_at || new Date().toISOString(),
      data.status || 'new'
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - you can run this to test the script
 * Remove this function before deploying
 */
function testDoPost() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    message: 'Test message',
    is_owner: 'TRUE',
    address: '123 Test St',
    project_type: 'Kitchen',
    property_type: 'Residential',
    square_feet: '500',
    budget: '$25k-$50k',
    timeline: '1-3 months',
    preferred_contact: 'Email',
    created_at: new Date().toISOString(),
    status: 'new'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

