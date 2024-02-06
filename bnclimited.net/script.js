let user;
let financialAction;
const action = ["deposited", "received"]

const generateRandom  = () => {
  const randomIndex = Math.floor(Math.random() * action.length);
  financialAction = action[randomIndex]
}


async function fetchUser() {
  try {
    const response = await fetch("https://testapi.devtoolsdaily.com/users");

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const data = await response.json();

    // Ensure there is at least one user in the data array
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      user = data[randomIndex];
    } else {
      throw new Error("No user data available");
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
}

async function fetchData() {
  try {
    await fetchUser();
    generateRandom()
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const response = await fetch('https://blockchain.info/unconfirmed-transactions?format=json');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const firstTransaction = data.txs[randomNumber];
    const targetAmount = 0.01;

    firstTransaction.out.forEach(output => {
      const address = output.addr;
      const amount = output.value / 1e8;
      const newDate = new Date();
      const time = newDate.toTimeString();
      const name = user.firstName;

      if (amount >= targetAmount) {
        showToast(`${name} just ${financialAction}\n${amount} \n BTC at ${address} \n Time: ${time}`);
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function showToast(message) {
  Toastify({
    text: message,
    duration: 5000,
    gravity: 'bottom',
    position: 'right',
    outerWidth: "auto",
    style: {
      width: "auto", // Adjust width as needed
      overflow: "hidden",
    },
    background: 'linear-gradient(to right, #00b09b, #96c93d)',
  }).showToast();
}

// Fetch data every 60 seconds
setInterval(fetchData, 6000);
