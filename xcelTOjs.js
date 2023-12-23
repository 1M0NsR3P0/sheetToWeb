let loading = false;

document.getElementById('excelFile').addEventListener('change', async (event) => {
  loading = true;
  document.querySelector("#table-container").style.display = "block";
  document.querySelector("#data").innerHTML = '';

  const file = event.target.files[0];

  // Wrap the file reading in a promise
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };

  if (file) {
    try {
      const data = await readFile(file);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Get the range of the sheet
      const range = XLSX.utils.decode_range(sheet['!ref']);

      // Process the data to replace undefined cells with a space
      const processedData = [];
      for (let i = range.s.r; i <= range.e.r; i++) {
        const row = [];
        for (let j = range.s.c; j <= range.e.c; j++) {
          const cellAddress = XLSX.utils.encode_cell({ r: i, c: j });
          const cellValue = sheet[cellAddress] ? sheet[cellAddress].v : undefined;
          row.push(cellValue === undefined ? " " : cellValue);
        }
        if (row.length > 0) {
          processedData.push(row);
        }
      }
      const filteredData = processedData.filter(row => row.some(cell => cell.trim() !== ""));
      filteredData.forEach(every => {
        const row = document.createElement('tr');
        every.forEach(element => {
          const cell = document.createElement('td');
          cell.innerText = element;
          row.appendChild(cell);
        });
        document.querySelector('#data').appendChild(row);
      });
    } catch (error) {
      console.error("Error reading file:", error);
    } finally {
      loading = false;
      console.log(loading);
    }
  }
});


function format(f = undefined){
  if(!f){

  }
  if(f==='size'){
    document.querySelector(`#data tr`)
  }
  if(f==='color'){}
  if(f==='bunderlineold'){}
  if(f==='highlight'){}
  if(f==='bold'){}

}