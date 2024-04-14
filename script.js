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

function showDetails() {
    // Get input values
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const ageGroupElement = document.getElementById('age');
    const ageGroup = ageGroupElement.options[ageGroupElement.selectedIndex].text; // Get the text content of the selected option

    // Calculate tax details
    const taxDetails = calculateTax(grossIncome, extraIncome, deductions, ageGroup);

    // Display tax details in the popup
    const detailsSection = document.getElementById("details");
    detailsSection.innerHTML = `
             <h1> Financial details </h1>
        <table>
            <tr>
                <td>Income:</td>
                <td>₹ ${grossIncome.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
                <td>Extra Income:</td>
                <td>₹ ${extraIncome.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
                <td>Deductions:</td>
                <td>₹ ${deductions.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
                <td>Age Group:</td>
                <td>${ageGroup}</td>
            </tr>

            <tr>
            <td>Overall Income:</td>
            <td>₹ ${taxDetails.overallIncome.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
          
                 <td>Taxable Income:</td>
                 <td>₹ ${taxDetails.taxableIncome.toLocaleString('en-IN')}</td>
             </tr>
           
             <tr>
                 <td>Tax Amount:</td>
                 <td>₹ ${taxDetails.taxAmount.toLocaleString('en-IN')}</td>
             </tr>
             <tr>
                 <td>Income after tax deduction:</td>
                 <td>₹ ${taxDetails.incomeAftertax.toLocaleString('en-IN')}</td>
             </tr>
            
             
        </table>

        <div class="but1" id="exit">
        <button class="exit" onclick="closePopup()">X</button>
    </div>
       
    `;
    

    detailsSection.style.display = "block";

}



function calculateTax(grossIncome, extraIncome, deductions, ageGroup) {
    // Check if any field is empty
    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions) || ageGroup === "") {
        document.getElementById('errorField').textContent = 'Please fill in all fields.';
        return; // Exit the function
    } else {
        document.getElementById('errorField').textContent = ''; // Clear error message if all fields are filled
    }

    // Calculate overall income after deductions
    const overallIncome = grossIncome + extraIncome - deductions;

    // Check if overall income is under 8 Lakhs
    if (overallIncome <= 800000) {
        taxAmount= 0 ;
        taxableIncome=0;
        return { taxAmount: 0 ,taxableIncome:0,incomeAftertax: overallIncome,overallIncome:overallIncome}; // No tax
    } else {
        // Calculate taxable income
        const taxableIncome = overallIncome - 800000; // Deduct 8 Lakhs
       

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
        const taxAmount = taxableIncome * taxRate;

        const incomeAftertax=overallIncome-taxAmount;

       

        // Return tax amount
       
      return {taxAmount: taxAmount, taxableIncome: taxableIncome, incomeAftertax: incomeAftertax, overallIncome: overallIncome };
    }

    // Show pop-up
    document.getElementById('popup').style.display = 'block';
}

document.getElementById("calculateButton").addEventListener("click", function() {
    // Call the calculateTax function and pass input values
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const ageGroup = document.getElementById('age').value;

    console.log(grossIncome);

    // Calculate tax details
    const taxDetails = calculateTax(grossIncome, extraIncome, deductions, ageGroup);

    // Display tax value
    const taxValueElement = document.getElementById('taxValue');
    
        taxValueElement.textContent = '₹ ' + taxDetails.incomeAftertax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    // Show popup
    document.getElementById('popup').style.display = 'block';
});

 //close popup
function closePopup()
{
    document.getElementById('popup').style.display = 'none';
    //empty all values;
    document.getElementById('grossIncome').value="";
    document.getElementById('extraIncome').value="";
    document.getElementById('deductions').value="";
    document.getElementById('age').value="";
    document.getElementById("details").style.display='none';
}

