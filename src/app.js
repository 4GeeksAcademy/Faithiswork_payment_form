import "bootstrap";
import "./style.css";

window.onload = function() {
  const form = document.getElementById("form1");
  const alertBox = document.getElementById("alert1");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let valid = true;
    const invalidFields = [];
    const cardNumber = document.getElementById("cardNumber");
    const cvv = document.getElementById("cvv");
    const amount = document.getElementById("amount");
    const firstName = document.getElementById("validationDefault01");
    const lastName = document.getElementById("validationDefault02");
    const city = document.getElementById("validationDefault03");
    const state = document.getElementById("validationDefault04");
    const zip = document.getElementById("validationDefault05");
    const message = document.getElementById("exampleFormControlTextarea1");

    function validateField(field, regex, errorMessage) {
      const errorLabel = document.getElementById(`${field.id}Error`);
      errorLabel.innerHTML = "";
      if (!regex.test(field.value)) {
        valid = false;
        invalidFields.push({ field: field, errorMessage: errorMessage });
        field.style.backgroundColor = "#f8d7da";
      } else {
        field.style.backgroundColor = "";
      }
    }

    validateField(cardNumber, /^\d{16}$/, "Card number must be 16 digits.");
    validateField(cvv, /^\d{3,4}$/, "CVV must be 3 or 4 digits.");
    validateField(
      amount,
      /^\d+(\.\d{1,2})?$/,
      "Amount must be a valid number."
    );
    validateField(
      firstName,
      /^[a-zA-Z]+$/,
      "First name must only contain letters."
    );
    validateField(
      lastName,
      /^[a-zA-Z]+$/,
      "Last name must only contain letters."
    );
    validateField(city, /^[a-zA-Z\s]+$/, "City must only contain letters.");
    const stateErrorLabel = document.getElementById("validationDefault04Error");
    stateErrorLabel.innerHTML = "";
    if (state.value === "") {
      valid = false;
      invalidFields.push({ field: state, errorMessage: "State is required." });
      state.style.backgroundColor = "#f8d7da";
    } else {
      state.style.backgroundColor = "";
    }
    validateField(zip, /^\d{5}$/, "Zip code must be 5 digits.");
    validateField(message, /.+/, "Message cannot be empty.");

    if (!valid) {
      alertBox.innerHTML = "Some fields are missing or incorrectly formatted!";
      for (let i = 0; i < invalidFields.length; i++) {
        document.getElementById(
          `${invalidFields[i].field.id}Error`
        ).innerHTML += invalidFields[i].errorMessage;
      }
      alertBox.hidden = false;
    } else {
      alertBox.hidden = true;
      console.log("Form is valid and ready for submission!");
    }
  });
};
