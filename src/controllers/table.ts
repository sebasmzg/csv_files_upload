export async function tableTemplate(arrayTable: [string[]]):Promise<string>{
    return `
        <table class="table table-stripped">
            <thead>
                ${arrayTable[0].map(value =>{
                    return `
                        <th scope="col">${value}</th>
                    `
                }).join('')}
            <thead>
            <tbody>
                ${arrayTable.map((value, index) => {
                    if(index === 0) return `
                        <tr>
                            ${value.map(sub_val =>{
                                return `
                                    <td>
                                        ${sub_val}
                                    </td>
                                `
                            }).join('')}
                        </tr>
                    `
                }).join('')}
            </tbody>
        </table>
    `;
}