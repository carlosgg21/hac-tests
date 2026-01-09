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
 *     square_feet, budget, timeline, preferred_contact, portfolio_project, privacy_policy,
 *     bathroom_category, bathroom_goal, bathroom_layout, bathroom_shower_tub, bathroom_finishes,
 *     bathroom_vanity, bathroom_durability, bathroom_budget, bathroom_upgrades,
 *     kitchen_category, kitchen_goal, kitchen_layout, kitchen_cabinetry, kitchen_finishes,
 *     kitchen_countertop, kitchen_upgrades, kitchen_appliances, kitchen_durability, kitchen_budget,
 *     created_at, status
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
        'timeline', 'preferred_contact', 'portfolio_project', 'privacy_policy',
        'bathroom_category', 'bathroom_goal', 'bathroom_layout', 'bathroom_shower_tub', 
        'bathroom_finishes', 'bathroom_vanity', 'bathroom_durability', 'bathroom_budget', 
        'bathroom_upgrades', 'kitchen_category', 'kitchen_goal', 'kitchen_layout', 
        'kitchen_cabinetry', 'kitchen_finishes', 'kitchen_countertop', 'kitchen_upgrades',
        'kitchen_appliances', 'kitchen_durability', 'kitchen_budget', 'created_at', 'status'
      ];
      sheet.appendRow(headers);
    }
    
    // Parse data - handle both JSON and URL-encoded formats
    let data = {};
    
    // First, try to get data from e.parameter (URL-encoded form data from POST)
    // Google Apps Script automatically parses URL-encoded data into e.parameter
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
      Logger.log('Using e.parameter (URL-encoded data)');
    } else if (e.postData && e.postData.contents) {
      // Check content type to determine how to parse
      const contentType = e.postData.type || '';
      
      if (contentType.includes('application/json')) {
        // Try to parse as JSON
        try {
          data = JSON.parse(e.postData.contents);
          Logger.log('Parsed as JSON');
        } catch (jsonError) {
          Logger.log('JSON parse error: ' + jsonError.toString());
          // If JSON parsing fails, try URL-encoded
          const urlParams = e.postData.contents.split('&');
          urlParams.forEach(param => {
            const parts = param.split('=');
            if (parts.length >= 2) {
              const key = decodeURIComponent(parts[0]);
              const value = decodeURIComponent(parts.slice(1).join('=')); // Handle values with = in them
              data[key] = value;
            }
          });
          Logger.log('Parsed as URL-encoded after JSON failed');
        }
      } else {
        // Assume URL-encoded format
        const urlParams = e.postData.contents.split('&');
        urlParams.forEach(param => {
          const parts = param.split('=');
          if (parts.length >= 2) {
            const key = decodeURIComponent(parts[0]);
            const value = decodeURIComponent(parts.slice(1).join('=')); // Handle values with = in them
            data[key] = value;
          }
        });
        Logger.log('Parsed as URL-encoded (default)');
      }
    }
    
    // Log received data for debugging
    Logger.log('Received data keys: ' + Object.keys(data).join(', '));
    Logger.log('Sample data: name=' + (data.name || 'N/A') + ', email=' + (data.email || 'N/A'));
    
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
      data.portfolio_project || '',
      data.privacy_policy || 'FALSE',
      data.bathroom_category || '',
      data.bathroom_goal || '',
      data.bathroom_layout || '',
      data.bathroom_shower_tub || '',
      data.bathroom_finishes || '',
      data.bathroom_vanity || '',
      data.bathroom_durability || '',
      data.bathroom_budget || '',
      data.bathroom_upgrades || '',
      data.kitchen_category || '',
      data.kitchen_goal || '',
      data.kitchen_layout || '',
      data.kitchen_cabinetry || '',
      data.kitchen_finishes || '',
      data.kitchen_countertop || '',
      data.kitchen_upgrades || '',
      data.kitchen_appliances || '',
      data.kitchen_durability || '',
      data.kitchen_budget || '',
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
    project_type: 'Bathroom Remodel',
    property_type: 'Residential',
    square_feet: '500',
    budget: '$25k-$50k',
    timeline: '1-3 months',
    preferred_contact: 'Email',
    portfolio_project: 'Bathroom Remodel',
    privacy_policy: 'TRUE',
    bathroom_category: 'Mid-Range',
    bathroom_goal: 'mid-range',
    bathroom_layout: 'mid-range',
    bathroom_shower_tub: 'mid-range',
    bathroom_finishes: 'mid-range',
    bathroom_vanity: 'mid-range',
    bathroom_durability: 'mid-range',
    bathroom_budget: 'mid-range',
    bathroom_upgrades: 'heated_floors, shower_niches',
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

