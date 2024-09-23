// Function to get search history from localStorage
function getSearchHistory() {
    // Retrieve the history from localStorage
    let history = localStorage.getItem('searchHistory');
    // Parse the JSON string into a JavaScript array, or return an empty array if null
    return history ? JSON.parse(history) : [];
}

// Function to update the displayed search history
function updateHistoryDisplay() {
    let historyList = document.getElementById('history-list'); // Reference to the history list element
    historyList.innerHTML = ''; // Clear any existing history in the list

    // Retrieve and iterate over the search history array
    let history = getSearchHistory();
    history.forEach((item) => {
        let listItem = document.createElement('li'); // Create a new list item for each history entry
        listItem.textContent = item; // Set the text content to the search term
        historyList.appendChild(listItem); // Add the list item to the history list
    });
}

// Function to add a new search term to the history
function addToHistory(searchTerm) {
    let history = getSearchHistory(); // Retrieve current history

    if (!history.includes(searchTerm)) { // Check if search term is not already in history (to prevent duplicates)
        history.push(searchTerm); // Add the search term to the history array
        localStorage.setItem('searchHistory', JSON.stringify(history)); // Save updated history back to localStorage
        updateHistoryDisplay(); // Update the display of search history
    }
}

// Function to clear the search history
function clearHistory() {
    localStorage.removeItem('searchHistory'); // Remove search history from localStorage
    updateHistoryDisplay(); // Update the display of search history
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', function () {
    let searchInput = document.getElementById('search-input').value.trim(); // Get the value from the search input

    if (searchInput) {
        addToHistory(searchInput); // Add search term to history
        document.getElementById('search-input').value = ''; // Clear input field
    } else {
        alert("Please enter a search term."); // Display an alert if the search input is empty
    }
});

// Event listener for the clear history button
document.getElementById('clear-history').addEventListener('click', function () {
    clearHistory(); // Clear the search history
});

// Display the search history when the page loads
window.onload = updateHistoryDisplay; // Update history display when the page loads

