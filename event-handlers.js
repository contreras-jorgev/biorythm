const handleDateInputChange = (e) => {
    let birthdayEl = e.target;
    if ( birthdayEl ) {
        let birthdayStr = birthdayEl.value;

        let birthday = new Date(birthdayStr); // Bug: birthday is one day off.
        createBiorythm(birthday);
    }
}

const handleNameInputChange = (e) => {
    let nameEl = e.target;
    let titleEl = document.getElementById('mytitle');

    if ( nameEl && titleEl ) {
        titleEl.innerText = `${nameEl.value}'s Biorythm`;
    }

}