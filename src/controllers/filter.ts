export function filterData(arrayTable: string[][], searchTerm: string): string[][] {
    if (!searchTerm) return arrayTable;
    const lowerCaseTerm = searchTerm.toLowerCase();
    return arrayTable.filter(row => row.some(cell => cell.toLowerCase().includes(lowerCaseTerm)));
}
