const handleDateInputChange = (e) => {
    let birthdayEl = e.target;
    if ( birthdayEl ) {
        let birthdayStr = birthdayEl.value; // Assuming the format is "YYYY-MM-DD"
        
        // Split the date string into components
        let [year, month, day] = birthdayStr.split('-').map(Number);
        
        // Create a new Date object (month is 0-indexed)
        let birthday = new Date(year, month - 1, day);
        createBiorhythm(birthday);
    }
}

const handleNameInputChange = (e) => {
    let nameEl = e.target;
    let titleEl = document.getElementById('mytitle');

    if ( nameEl && titleEl ) {
        titleEl.innerText = `${nameEl.value}'s Biorhythm`;
    }
}