"use strict";
const csvForm = document.getElementById('csvForm');
const csvFile = document.getElementById('csvFile');
const displayArea = document.getElementById('displayArea');
let final_values = [];
csvForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let csvReader = new FileReader();
    const input = csvFile.files[0];
    csvReader.readAsText(input);
});
