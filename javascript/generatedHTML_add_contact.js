function generateContactHTML(contact, index) {
    const lastNameInitial = contact.name.split(' ')[1]?.charAt(0) || '';
    return `
        <div id="contact${index}" onclick="populateEditDisplay(allContacts[${index}], ${index})" class="contact_card">
            <div class="image_container">
                <img src="./assets/img/contacts_img/Ellipse 5.svg" alt="Profile Picture">
                <div class="initials">
                    <span class="initials1">${contact.name.charAt(0)}</span>
                    <span class="initials2">${lastNameInitial}</span>
                </div>
            </div>
            <div class="contact_info">
                <h1>${contact.name}</h1>
                <a href="mailto:${contact.email}">${contact.email}</a>
            </div>
        </div>
    `;
}

function createContactCardContent(contact) {
    return `
        <div class="image_container">
            <img src="./assets/img/contacts_img/Ellipse 5.svg" alt="">
        </div>
        <div class="contact_card_text">
            <h3>${contact.name}</h3>
            <a href="mailto:${contact.email}">${contact.email}</a>
        </div>`;
}