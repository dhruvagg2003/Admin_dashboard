// Popup logic
const scheduleRecyclerButtons = document.querySelectorAll('.schedule-recycler');
const recyclerPopup = document.getElementById('recyclerPopup');
const selectRecyclerButton = document.getElementById('selectRecycler');
let currentCard;

scheduleRecyclerButtons.forEach(button => {
    button.addEventListener('click', () => {
        recyclerPopup.style.display = 'flex';
        // Save reference to the current card
        currentCard = button.closest('.card');
    });
});

selectRecyclerButton.addEventListener('click', () => {
    const selectedRecycler = document.getElementById('recyclerSelect').value;
    alert(`Recycler ${selectedRecycler} scheduled!`);
    recyclerPopup.style.display = 'none';
    // Show scheduled recycler name on the card
    currentCard.querySelector('.scheduled-recycler').textContent = `Scheduled Recycler: ${selectedRecycler}`;
});

// Update status logic
const updateStatusButtons = document.querySelectorAll('.update-status');

updateStatusButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        if (card.classList.contains('green')) {
            card.classList.remove('green');
            card.classList.add('orange');
            alert('Status updated to Hotspot');
            // Remove scheduled recycler name when status is updated
            card.querySelector('.scheduled-recycler').textContent = '';
        } else {
            card.classList.remove('orange');
            card.classList.add('green');
            alert('Status updated to Recycle Scheduled');
            // Send alert message to the recycler
        }
    });
});

// Delete card logic
const deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        card.remove();
    });
});
