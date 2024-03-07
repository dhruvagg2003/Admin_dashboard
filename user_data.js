

  const users = [
    {
      sno: 1,
      name: "Simran",
      phoneNo: "9472850370",
      email: "simran@gmail.com",
      address: "Landran",
      ecoCreditsEarned: 200,
      eWasteDonated: 500,
      status: "Active",
      donationHistory: [10, 20, 15, 25, 30]
    },
    {
      sno: 2,
      name: "Shreya",
      phoneNo: "9876543210",
      email: "shreya@gmail.com",
      address: "Chandigarh",
      ecoCreditsEarned: 650,
      eWasteDonated: 750,
      status: "Active",
      donationHistory: [115, 25, 20, 30, 35]
    },

    {
        sno: 3,
        name: "Japneet",
        phoneNo: "9876544646",
        email: "japneet.bhatia@gmail.com",
        address: "456 Park Avenue, Dhakoli",
        ecoCreditsEarned: 250,
        eWasteDonated: 950,
        status: "Active",
        donationHistory: [65, 50, 45, 70, 35]
      },

      {
        sno: 4,
        name: "Kamankshi",
        phoneNo: "9876543678",
        email: "kamankshi.goyal@gmail.com",
        address: "Sangrur",
        ecoCreditsEarned: 200,
        eWasteDonated: 800,
        status: "Active",
        donationHistory: [50, 60, 55, 70, 28]
      },

      {
        sno: 5,
        name: "Dhruv Aggarwal",
        phoneNo: "8439012578",
        email: "Dhruv.aggrawal@gmail.com",
        address: "Mohali",
        ecoCreditsEarned: 350,
        eWasteDonated: 1000,
        status: "Active",
        donationHistory: [60, 67, 85, 88, 35]
      },

      {
        sno: 6,
        name: "Abhishek Guleria",
        phoneNo: "9350052590",
        email: "Abhishek.guleria@gmail.com",
        address: "kalka",
        ecoCreditsEarned: 300,
        eWasteDonated: 900,
        status: "Active",
        donationHistory: [55, 87, 65, 56, 82]
      },
    // Add more users here
  ];
  
  // Function to generate random donation history data
  function generateRandomData() {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push(Math.floor(Math.random() * 100)); // Generating random data points
    }
    return data;
  }
  
  // Function to sort users based on e-waste donated
  function sortByEWasteDonated() {
    users.sort((a, b) => b.eWasteDonated - a.eWasteDonated);
    displayUserInfo(); // Re-display user information after sorting
  }
  
  // Function to sort users based on eco-credits earned
  function sortByEcoCreditsEarned() {
    users.sort((a, b) => b.ecoCreditsEarned - a.ecoCreditsEarned);
    displayUserInfo(); // Re-display user information after sorting
  }
  
  // Function to display user information
  function displayUserInfo() {
    const totalUsers = users.length;
    const totalEWaste = users.reduce((total, user) => total + user.eWasteDonated, 0);
    const totalEcoPoints = users.reduce((total, user) => total + user.ecoCreditsEarned, 0);
    const totalActiveUsers = users.filter(user => user.status === "Active").length;
  
    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalEWaste').textContent = totalEWaste + " grams";
    document.getElementById('totalEcoPoints').textContent = totalEcoPoints;
  
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ""; // Clear existing data before re-populating
  
    users.forEach(user => {
      const row = `
        <tr>
          <td>${user.sno}</td>
          <td>${user.name}</td>
          <td>${user.phoneNo}</td>
          <td>${user.email}</td>
          <td>${user.address}</td>
          <td>${user.ecoCreditsEarned}</td>
          <td>${user.eWasteDonated}</td>
          <td class="${user.status.toLowerCase()}">${user.status}</td>
          <td><button onclick="showDonationHistory(${user.sno})">View</button></td>
        </tr>
      `;
      userTableBody.innerHTML += row;
    });
  }
  
  // Function to show donation history graph
  function showDonationHistory(sno) {
    const user = users.find(user => user.sno === sno);
    const graphPopup = document.getElementById('graphPopup');
    const closeBtn = document.querySelector('.close-btn');
  
    const donationChartCanvas = document.getElementById('donationChart').getContext('2d');
  
    const donationChart = new Chart(donationChartCanvas, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Donation History',
          data: user.donationHistory.map((value, index) => ({ x: index + 1, y: value })),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'E-Waste Donated ( 100 grams)'
            },
            type: 'linear',
            position: 'bottom'
          },
          y: {
            title: {
              display: true,
              text: 'Ecopoints earned'
            },
            type: 'linear',
            position: 'left'
          }
        }
      }
    });
  
    // Show the popup
    graphPopup.style.display = 'block';
  
    // Close the popup when close button is clicked
    closeBtn.onclick = function() {
      graphPopup.style.display = 'none';
      donationChart.destroy(); // Destroy the chart to prevent memory leaks
    };
  }
  
  // Function to close popup
  function closePopup() {
    const graphPopup = document.getElementById('graphPopup');
    graphPopup.style.display = 'none';
  }
  
  // Call the function to display user information when the page loads
  window.onload = function() {
    displayUserInfo();
  };