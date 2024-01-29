// Fetch data from the API
function fetchData() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    fetch('https://blockchain.info/unconfirmed-transactions?format=json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming you want to check the first transaction in the response
        const firstTransaction = data.txs[randomNumber];
  
        // Replace 'TARGET_AMOUNT' with the specific amount you are interested in (in BTC)
        const targetAmount = 0.01;
  
        // Check each output in the transaction
        firstTransaction.out.forEach(output => {
          const address = output.addr;
          const amount = output.value / 1e8;
          const newDate = new Date();
          const time = newDate.toTimeString()
  
          // Check if the address received the specified amount
          if (amount >= targetAmount) {
            // Display the toaster notification
            showToast(`BTC Received!\n${amount} BTC at ${address} Time: ${time}`);
          }
        });
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }
  
  // Function to display the toaster notification
  function showToast(message) {
    Toastify({
      text: message,
      duration: 5000, // Duration in milliseconds
      gravity: 'bottom', // Position the toaster at the bottom
      position: 'right', // Center the toaster horizontally
      outerWidth: "auto",
      style: {
        width: "auto"
      },
      background: 'linear-gradient(to right, #00b09b, #96c93d)', // Customize the background color
    }).showToast();
  }
  
  // Fetch data every 60 seconds (adjust as needed)
  setInterval(fetchData, 6000);
  