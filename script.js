async function fetchCountryInfo() {
    const capital = document.getElementById("capitalInput").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const countryTable = document.getElementById("countryTable");
    const tableBody = document.getElementById("tableBody");

    // Reset previous results and errors
    errorMessage.classList.add("hidden");
    countryTable.classList.add("hidden");
    tableBody.innerHTML = "";

    if (capital === "") {
        errorMessage.textContent = "Please enter a capital city name.";
        errorMessage.classList.remove("hidden");
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();
        const country = data[0];

        // Populate table with data
        const row = `
            <tr>
                <td>${country.name.common}</td>
                <td>${country.capital[0]}</td>
                <td>${country.population.toLocaleString()}</td>
                <td>${country.region}</td>
                <td>${country.subregion || "N/A"}</td>
            </tr>
        `;
        tableBody.innerHTML = row;

        // Show the table
        countryTable.classList.remove("hidden");
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
}
