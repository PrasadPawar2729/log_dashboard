document.addEventListener('DOMContentLoaded', (event) => {
    fetchLogs();
});

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        console.error('No file selected');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const json = JSON.parse(event.target.result);
            displayLogs(json);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file);
}

function fetchLogs() {
    const logLevel = document.getElementById('logLevel').value;

    fetch(`https://mocki.io/v1/4e2cbfe3-d142-455b-ae4e-4576d1169899?level=${logLevel}`)
    .then(response => response.json())
    .then(data => {
        displayLogs(data);
    })
    .catch(error => {
        console.error('Error fetching logs:', error);
    });
}

function displayLogs(data) {
    const dataTableBody = document.querySelector('#dataTable tbody');
    dataTableBody.innerHTML = '';

    data.forEach(item => {
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
}
