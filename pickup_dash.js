function openPopup(serialNumber) {
    document.getElementById('popupOverlay').style.display = 'flex';
    document.getElementById('statusSelect').dataset.serialNumber = serialNumber;
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}
function updateStatus() {
    var serialNumber = document.getElementById('statusSelect').dataset.serialNumber;
    var statusSelect = document.getElementById('statusSelect');
    var selectedStatus = statusSelect.options[statusSelect.selectedIndex].text;
    var pickupDate = document.getElementById('pickupDate').value;
    var pickupTime = document.getElementById('pickupTime').value;

    // Update status cell
    var statusCell = document.getElementById('status' + serialNumber);
    statusCell.innerText = selectedStatus;
    statusCell.classList.remove('scheduled', 'pending', 'served');
    statusCell.classList.add(selectedStatus.toLowerCase());

    // Check if the selected status is 'Scheduled'
    if (selectedStatus.toLowerCase() === 'schedule') {
        statusCell.classList.add('scheduled');
        statusCell.style.fontWeight = 'bold';
        statusCell.style.color = 'green';

        // Update date and time cells with green color
        var dateCell = document.getElementById('date' + serialNumber);
        var timeCell = document.getElementById('time' + serialNumber);
        dateCell.innerText = pickupDate || '-';
        timeCell.innerText = pickupTime || '-';
        dateCell.style.color = 'green';
        timeCell.style.color = 'green';
    } else if (selectedStatus.toLowerCase() === 'pending') {
        statusCell.style.fontWeight = '';
        statusCell.style.color = 'red';

        // Update date and time cells with red color
        var dateCell = document.getElementById('date' + serialNumber);
        var timeCell = document.getElementById('time' + serialNumber);
        dateCell.innerText = pickupDate || '-';
        timeCell.innerText = pickupTime || '-';
        dateCell.style.color = 'red';
        timeCell.style.color = 'red';
    } else {
        // For other statuses, remove bold and color styles from status, date, and time cells
        statusCell.style.fontWeight = '';
        statusCell.style.color = '';
        var dateCell = document.getElementById('date' + serialNumber);
        var timeCell = document.getElementById('time' + serialNumber);
        dateCell.style.color = '';
        timeCell.style.color = '';
    }

    updateStats();

    closePopup(); // Close the popup after updating the status
    return false; // Prevent form submission and page reload
}




function updateStats() {
    var totalScheduled = 0;
    var totalPending = 0;
    var totalServed = 0;

    var rows = document.querySelectorAll('#pickupTable tbody tr');
    rows.forEach(function(row) {
        var status = row.querySelector('.status-cell').innerText.trim().toLowerCase();
        if (status === 'schedule') {
            totalScheduled++;
        } else if (status === 'pending') {
            totalPending++;
        } else if (status === 'served') {
            totalServed++;
        }
    });

    var totalNotScheduled = rows.length - totalScheduled - totalPending - totalServed;

    document.getElementById('totalScheduled').innerText = "Scheduled: " + totalScheduled;
    document.getElementById('totalPending').innerText = "Pending: " + totalPending;
    document.getElementById('totalServed').innerText = "Served: " + totalServed;
    document.getElementById('totalNotScheduled').innerText = "Not Scheduled: " + totalNotScheduled;
}

function sortTable(criteria) {
    var table, rows, switching, i, shouldSwitch;
    table = document.getElementById("pickupTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            var x = rows[i].getElementsByTagName("TD")[criteria === 'status' ? 7 : 8].innerText;
            var y = rows[i + 1].getElementsByTagName("TD")[criteria === 'status' ? 7 : 8].innerText;
            if (criteria === 'date') {
                x = new Date(x);
                y = new Date(y);
            }
            if ((criteria === 'date' && x > y) || (criteria === 'status' && x.toLowerCase() > y.toLowerCase())) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


document.getElementById("sortByDateBtn").addEventListener("click", function() {
    sortTable('date');
});



// Update initial statistics
updateStats();