function buildTable(tableId) {
    const table = document.getElementById(tableId);
    return function(...args) {
        
        const tr = document.createElement("tr");
        args.forEach(val => {
            // This is certainly not exhaustive (e.g. try passing a number in) but works for what I need it to do.
            // inserts the value as a part of td.
            const td = document.createElement('td');
            if(typeof val === 'string') td.innerText = val;
            else td.appendChild(val)
            tr.appendChild(td);
        })
        table.appendChild(tr)


    }

}