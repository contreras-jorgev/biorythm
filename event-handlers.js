const handleDateInputChange = (e) => {
    let birthdayEl = e.target;
    let birthdateStr = birthdayEl.value;

    let birthdate = new Date(birthdateStr);
    createBiorythm(birthdate);
}