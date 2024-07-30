const handleDateInputChange = (e) => {
    let birthdayEl = e.target;
    if ( birthdayEl ) {
        let birthdateStr = birthdayEl.value;

        let birthdate = new Date(birthdateStr);
        createBiorythm(birthdate);
    }
}