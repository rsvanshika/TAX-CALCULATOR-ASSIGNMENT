function validateInput(input) {
    // Get the next sibling element of the input element, which is assumed to be the error icon
    var errorIcon = input.nextElementSibling;
    // Get the trimmed value of the input element
    var inputValue = input.value.trim();

    // Check if the input value is not a number or is empty
    if (isNaN(inputValue) || inputValue === '') {
        // If the input value is not a number or is empty, display the error icon
        errorIcon.style.display = 'inline-block';
    } else {
        // If the input value is a valid number, hide the error icon
        errorIcon.style.display = 'none';
    }
}


function calculateTax() {
    // Get input values
    var grossIncome = parseFloat(document.getElementById('grossIncome').value) ;
    var extraIncome = parseFloat(document.getElementById('extraIncome').value) ;
    var deductions = parseFloat(document.getElementById('deductions').value) ;
    var ageGroup = document.getElementById('age').value;


    // Calculate overall income after deductions
    var overallIncome = grossIncome + extraIncome - deductions;

    // Check if overall income is under 8 Lakhs
    if (overallIncome <= 800000) {
        document.getElementById('taxValue').textContent = 'No tax';
    } else {
        // Calculate taxable income
        var taxableIncome = overallIncome - 800000; // Deduct 8 Lakhs

        // Determine tax rate based on age group
        var taxRate;
        switch (ageGroup) {
            case 'option1': // Age < 40
                taxRate = 0.3;
                break;
            case 'option2': // Age ≥ 40 but < 60
                taxRate = 0.4;
                break;
            case 'option3': // Age ≥ 60
                taxRate = 0.1;
                break;
            default:
                taxRate = 0.3; // Default tax rate for age < 40
                break;
        }

        // Calculate tax amount
        var tax = taxableIncome * taxRate;

        console.log(tax)

        // Display tax value
        document.getElementById('taxValue').textContent = tax.toFixed(2);
    }

    // Show pop-up
    document.getElementById('popup').style.display = 'block';
}

 //close popup
function closePopup()
{
    document.getElementById('popup').style.display = 'none';
    //empty all values;
    grossIncome.value=' ';
    extraIncome.value=' ';
    deductions.value=' ';
    ageGroup.value='';
}