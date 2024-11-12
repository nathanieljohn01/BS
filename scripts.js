// Function to redirect to booking page with selected service and price as URL parameters
function selectHaircut(service, price) {
    Swal.fire({
        title: `You selected ${service}`,
        text: `Price: ₱${price}`,
        icon: 'info',
        confirmButtonText: 'Book Now',
        confirmButtonColor: '#d32f2f'
    }).then(() => {
        // Redirect to book.html with selected service and price as URL parameters
        window.location.href = `book.html?service=${encodeURIComponent(service)}&price=${price}`;
    });
}

// Function to retrieve URL parameters for autofill
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to set default date and time to 11/13/2024 3:50 AM
function setDefaultDateTime() {
    const dateField = document.getElementById("date");
    if (dateField) {
        dateField.value = '2024-11-13T03:50'; // Default date and time
    }
}

// Autofill booking form fields if parameters exist and set default date and time
document.addEventListener("DOMContentLoaded", function () {
    const serviceField = document.getElementById("service");
    const priceField = document.getElementById("price");

    setDefaultDateTime(); // Set the default date and time on page load

    const service = getQueryParam("service");
    const price = getQueryParam("price");

    if (service && price) {
        serviceField.value = service;
        priceField.value = `₱${price}`;
        updateTotal();
    }
});

// Add a reset listener to set the default date and time again when the form is reset
document.getElementById("booking-form").addEventListener("reset", setDefaultDateTime);

// Function to update total price based on add-ons
function updateTotal() {
    const basePrice = parseInt(getQueryParam("price")) || 0;
    const shave = document.getElementById("shave").checked ? parseInt(document.getElementById("shave").value) : 0;
    const wash = document.getElementById("wash").checked ? parseInt(document.getElementById("wash").value) : 0;
    const totalPrice = basePrice + shave + wash;
    document.getElementById("total").value = `₱${totalPrice}`;
}

// Helper function to format date for display
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
}

// Booking form submission handler with validation and confirmation
document.getElementById("booking-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const total = document.getElementById("total").value;

    if (name && service && date) {
        // Format the date to the required display format
        const formattedDate = formatDateTime(date);

        Swal.fire({
            title: 'Appointment Confirmed!',
            html: `Thank you, ${name}!<br>Your appointment for <strong>${service}</strong> on <strong>${formattedDate}</strong> is confirmed.<br>Total Price: <strong>${total}</strong>`,
            icon: 'success',
            confirmButtonColor: '#d32f2f'
        });

        // Reset the form and set default date and time after submission
        document.getElementById("booking-form").reset();
        setDefaultDateTime(); // Reset the datetime field to default
        document.getElementById("total").value = '';
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all the fields.',
            icon: 'error',
            confirmButtonColor: '#d32f2f'
        });
    }
});
