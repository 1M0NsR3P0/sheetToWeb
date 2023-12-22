
document.getElementById('excelFile').addEventListener('change', handleFile);

/*
  this file handler will get inputed xls, csv or excel file.
  create a json file with sheet to json converted lib.
  after filtering the empty arrays it will append all the cells.
  finally make css design...
*/

function handleFile(event) {
  document.querySelector("#data").innerHTML = ''
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

      // filtering out empty cells...
      const filteredData = jsonData.filter(array => array.length > 0);
      const outputDiv = document.getElementById('data');

      // creating a map loop to call appending function for every column
      filteredData[0].map((each, idx) => appender(idx))

      // creating a column appender function to append every xls cell
      function appender(colum) {
        const col = document.createElement('ul');
        filteredData.map(every => {
          const cell = document.createElement('li');
          cell.style.listStyle = 'none';
          cell.innerText = every[colum];
          col.appendChild(cell);
          if (cell.parentElement && cell.parentElement.children[0] === cell) {
            cell.style.fontSize = '1.5rem';
          }
        })
        outputDiv.appendChild(col)
      }
    };

    reader.readAsArrayBuffer(file);
  }

}

