document.getElementById('excelFile').addEventListener('change', handleFile);

/*
  this file handler will get inputed xls, csv or excel file.
  create a json file with sheet to json converted lib.
  after filtering the empty arrays it will append all the cells.
  finally make css design...
*/

document.querySelector("#table-container").style.display = "none"
function handleFile(event) {
  document.querySelector("#table-container").style.display = "block"
  document.querySelector("#data").innerHTML = '';
  const file = event.target.files[0];

  // file reader to convert xcel to json
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      
      const filteredData = jsonData.filter(every=>every.length > 0)
      filteredData.map(every=>{
        const row = document.createElement('tr');
        every.forEach(element => {
          const cell = document.createElement('td');
          cell.innerText = element;
          row.appendChild(cell);
          
        });
        document.querySelector('#data').appendChild(row)
        
      })

    };

    reader.readAsArrayBuffer(file);
  }
}
