const scriptURL =
    "<Script URL>";

const form = document.forms["submit-to-google-sheet"];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then(() => {
            alert("Team Registered!");
            form.reset();
        })
        .catch((error) => console.error("Error!", error.message));
});

/*

Instructions to be followed by the admin of google sheets.

## 1. Create a Google Apps Script

- Click on `Tools > Script Editor…` which should open a new tab.
- Rename it `Submit Form to Google Sheets`. _Make sure to wait for it to actually save and update the title before editing the script._
- Now, delete the `function myFunction() {}` block within the `Code.gs` tab.
- Paste the following script in it's place and `File > Save`:

```js
var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
```

## 2. Run the setup function

- Next, go to `Run > Run Function > initialSetup` to run this function.
- In the `Authorization Required` dialog, click on `Review Permissions`.
- Sign in or pick the Google account associated with this projects.
- You should see a dialog that says `Hi {Your Name}`, `Submit Form to Google Sheets wants to`...
- Click `Allow`

## 4. Add a new project trigger 
- Click on `Edit > Current project’s triggers`. 
- In the dialog click `No triggers set up. Click here to add one now.` 
- In the dropdowns select `doPost`
- Set the events fields to `From spreadsheet` and `On form submit`
- Then click `Save`

## 5. Publish the project as a web app

- Click on `Publish > Deploy as web app…`.
- Set `Project Version` to `New` and put `initial version` in the input field below.
- Leave `Execute the app as:` set to `Me(your@address.com)`.
- For `Who has access to the app:` select `Anyone, even anonymous`.
- Click `Deploy`.
- In the popup, copy the `Current web app URL` from the dialog.
- And click `OK`.
*/
