let myform = document.forms[0];

if (myform.elements.username) {
    myform.elements.username.addEventListener("input", handleNameInputChange);
}
if (myform.elements.birthday) {
    myform.elements.birthday.addEventListener("input", handleDateInputChange);
}
let ageEl = myform.elements.age;
if (ageEl.parentElement) {
    ageEl.parentElement.style.display = 'none';
}
