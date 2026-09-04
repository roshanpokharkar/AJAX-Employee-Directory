let employees = [];


// Fetch Employees using XMLHttpRequest

function fetchEmployees() {

    const xhr = new XMLHttpRequest();

    const loading =
        document.getElementById("loading");

    const error =
        document.getElementById("error");

    const container =
        document.getElementById("employeeContainer");


    // Show loading

    loading.style.display = "block";

    error.innerHTML = "";

    container.innerHTML = "";


    // AJAX Request

    xhr.open(
        "GET",
        "https://jsonplaceholder.typicode.com/users",
        true
    );


    // Response received

    xhr.onload = function () {

        loading.style.display = "none";


        if (xhr.status === 200) {

            employees =
                JSON.parse(xhr.responseText);


            document.getElementById(
                "totalEmployees"
            ).innerText = employees.length;


            createCityFilter();

            displayEmployees(employees);

        }

        else {

            error.innerHTML =
                "❌ Unable to fetch data from server.";

        }

    };


    // Network error

    xhr.onerror = function () {

        loading.style.display = "none";

        error.innerHTML =
            "❌ Network Error. Please check your internet.";

    };


    // Send AJAX Request

    xhr.send();

}


// Display Employees

function displayEmployees(data) {

    const container =
        document.getElementById("employeeContainer");


    container.innerHTML = "";


    document.getElementById(
        "visibleEmployees"
    ).innerText = data.length;


    if (data.length === 0) {

        container.innerHTML =
            "<h3>No employee found.</h3>";

        return;

    }


    data.forEach(function(employee) {

        const card =
            document.createElement("div");


        card.className =
            "employee-card";


        card.innerHTML = `

            <div class="avatar">
                ${employee.name.charAt(0)}
            </div>

            <h2>${employee.name}</h2>

            <p>
                <span class="label">
                    Username:
                </span>
                ${employee.username}
            </p>

            <p>
                <span class="label">
                    Email:
                </span>
                ${employee.email}
            </p>

            <p>
                <span class="label">
                    Phone:
                </span>
                ${employee.phone}
            </p>

            <p>
                <span class="label">
                    City:
                </span>
                ${employee.address.city}
            </p>

            <p>
                <span class="label">
                    Company:
                </span>
                ${employee.company.name}
            </p>

            <span class="badge">
                Active Employee
            </span>

        `;


        container.appendChild(card);

    });

}


// Search

document.getElementById(
    "searchInput"
).addEventListener(
    "input",
    function() {

        const value =
            this.value.toLowerCase();


        const filtered =
            employees.filter(function(employee) {

                return employee.name
                    .toLowerCase()
                    .includes(value);

            });


        displayEmployees(filtered);

    }
);


// Create City Filter

function createCityFilter() {

    const select =
        document.getElementById("cityFilter");


    select.innerHTML =
        '<option value="all">All Cities</option>';


    const cities = [];


    employees.forEach(function(employee) {

        const city =
            employee.address.city;


        if (!cities.includes(city)) {

            cities.push(city);

        }

    });


    cities.forEach(function(city) {

        const option =
            document.createElement("option");

        option.value = city;

        option.innerText = city;

        select.appendChild(option);

    });

}


// City Filter

document.getElementById(
    "cityFilter"
).addEventListener(
    "change",
    function() {

        const city =
            this.value;


        if (city === "all") {

            displayEmployees(employees);

            return;

        }


        const filtered =
            employees.filter(function(employee) {

                return employee.address.city === city;

            });


        displayEmployees(filtered);

    }
);


// Load data automatically

window.onload = function() {

    fetchEmployees();

};