
const data = [
    { name: "John Doe", email: "john@example.com", age: 25, country: "USA" },
    { name: "Jane Smith", email: "jane@example.com", age: 30, country: "UK" },
    { name: "Alice Brown", email: "alice@example.com", age: 22, country: "Canada" },
    { name: "Bob Johnson", email: "bob@example.com", age: 27, country: "India" },
    { name: "Charlie White", email: "charlie@example.com", age: 35, country: "Germany" },
    { name: "David Black", email: "david@example.com", age: 29, country: "France" },
    { name: "Eve Williams", email: "eve@example.com", age: 24, country: "Italy" },
    { name: "Frank Thomas", email: "frank@example.com", age: 31, country: "Spain" },
    { name: "Grace Lee", email: "grace@example.com", age: 28, country: "Japan" },
    { name: "Henry Adams", email: "henry@example.com", age: 26, country: "Brazil" }
];

let currentPage = 1;
const rowsPerPage = 5;
let filteredData = [...data];

// Populate table dynamically
function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = filteredData.slice(start, end);

    paginatedData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.name}</td><td>${row.email}</td><td>${row.age}</td><td>${row.country}</td>`;
        tableBody.appendChild(tr);
    });

    renderPagination();
}

function sortTable(columnIndex) {
    const keys = ["name", "email", "age", "country"];
    filteredData.sort((a, b) => {
        let valA = a[keys[columnIndex]];
        let valB = b[keys[columnIndex]];
        return valA > valB ? 1 : -1;
    });
    renderTable();
}

function filterTable() {
    const query = document.getElementById("search").value.toLowerCase();
    filteredData = data.filter(row =>
        Object.values(row).some(value => value.toString().toLowerCase().includes(query))
    );
    currentPage = 1;
    renderTable();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const pageNumbers = document.getElementById("pageNumbers");
    pageNumbers.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement("span");
        span.innerText = i;
        span.classList.add("page-number");
        if (i === currentPage) span.classList.add("active");
        span.onclick = () => { currentPage = i; renderTable(); };
        pageNumbers.appendChild(span);
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

// Initial render
renderTable();
