let myform = document.forms[0];
if (myform.elements.birthdate) {
    myform.elements.birthdate.addEventListener("change", handleDateInputChange);
}
let ageEl = myform.elements.age;
if (ageEl.parentElement) {
    ageEl.parentElement.style.display = 'none';
}