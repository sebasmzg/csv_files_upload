// Function to filter data
export function filterData(arrayTable, searchTerm) {
    // If there is no search term, return the original data
    if (!searchTerm)
        return arrayTable;
    // Convert the search term to lowercase
    const lowerCaseTerm = searchTerm.toLowerCase();
    // Filter
    return arrayTable.filter(row => 
    // Check if any cell in the row contains the search term
    Object.values(row).some(cell => {
        if (cell == null)
            return false; // Maneja valores nulos o indefinidos
        // Convert the cell value to lowercase and remove accents
        return cell.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(lowerCaseTerm);
    }));
}
