document.addEventListener('DOMContentLoaded', (event) => {
    fetchData();
});

function fetchData() {
    fetch('https://mocki.io/v1/4e2cbfe3-d142-455b-ae4e-4576d1169899')
    .then(response => response.json())
    .then(data => {
        const dataTableBody = document.querySelector('#dataTable tbody');
        dataTableBody.innerHTML = '';

        data.forEach((item, index) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const scoreCell = document.createElement('td');
            scoreCell.textContent = item.score;
            row.appendChild(scoreCell);

            const ageCell = document.createElement('td');
            ageCell.textContent = item.age;
            row.appendChild(ageCell);

            const cityCell = document.createElement('td');
            cityCell.textContent = item.city;
            row.appendChild(cityCell);

            const genderCell = document.createElement('td');
            genderCell.textContent = item.gender;
            row.appendChild(genderCell);

            dataTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
