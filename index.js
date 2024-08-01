let myform = document.forms[0];

if (myform.elements.username) {
    myform.elements.username.addEventListener("change", handleNameInputChange);
}
if (myform.elements.birthday) {
    myform.elements.birthday.addEventListener("change", handleDateInputChange);
}
let ageEl = myform.elements.age;
if (ageEl.parentElement) {
    ageEl.parentElement.style.display = 'none';
}
