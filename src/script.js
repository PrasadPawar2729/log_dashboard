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

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
}

function fetchLogs() {
    const logLevel = document.getElementById('logLevel').value;

    fetch(`/logs?level=${logLevel}`)
    .then(response => response.json())
    .then(data => {
        const logsList = document.getElementById('logsList');
        logsList.innerHTML = '';

        data.forEach((log, index) => {
            const li = document.createElement('li');
            li.textContent = JSON.stringify(log);
            logsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching logs:', error);
    });
}