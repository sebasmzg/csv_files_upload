const csvForm = <HTMLFormElement> document.getElementById('csvForm');
const csvFile = <HTMLInputElement> document.getElementById('csvFile');
const displayArea = <HTMLDivElement> document.getElementById('displayArea');

let final_values=[];

csvForm.addEventListener('submit',(e:Event)=>{
    e.preventDefault();

    let csvReader = new FileReader();

    const input = csvFile.files![0];


    csvReader.readAsText(input);
})