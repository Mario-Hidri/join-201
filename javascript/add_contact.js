let defaultContacts = [
    {
        name: "Anton Mayer",
        email: "antonm@gmail.com",
        phone: "444"
    },
    {
        name: "Anton Mayer",
        email: "antonm@gmail.com",
        phone: "444"
    },
    {
        name: "Anton Mayer",
        email: "antonm@gmail.com",
        phone: "444"
    },
    {
        name: "Anton Mayer",
        email: "antonm@gmail.com",
        phone: "444"
    }
];

let allContacts = [];

function addContact() {
    let name = document.getElementById('add_contact_name').value;
    let email = document.getElementById('add_contact_email').value;
    let phone = document.getElementById('add_contact_phone').value;

    let contact = {
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().getTime()
    };

    allContacts.push(contact);

    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);

    renderContacts();
}

function init() {
    includeHTML();

    let allContactsAsString = localStorage.getItem('allContacts');
    if (allContactsAsString) {
        allContacts = JSON.parse(allContactsAsString) || [];
    } else {
        // If no contacts are in localStorage, use the default contacts
        allContacts = defaultContacts;
    }

    renderContacts();
}

function hidePage() {
    let slidingPage = document.getElementById('slidingPage');
    slidingPage.classList.remove('show');
    slidingPage.classList.add('hide');

    setTimeout(() => {
        slidingPage.classList.add('hidden');
    }, 300);
}

function showPage() {
    const slidingPage = document.getElementById('slidingPage');
    slidingPage.classList.remove('hidden', 'hide');
    slidingPage.classList.add('show');
}

function renderContacts() {
    let contacts_container = '';

    for (let i = 0; i < allContacts.length; i++) {
        contacts_container += generateContactHTML(allContacts[i]);
    }
    document.getElementById('contacts_container_A').innerHTML = contacts_container;
}

function generateContactHTML(contact) {
    const lastNameInitial = contact.name.split(' ')[1]?.charAt(0) || '';

    return `
        <div class="contact_card">
            <div class="image_container">
                <img src="./assets/img/contacts_img/Ellipse 5.png" alt="Profile Picture">
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

window.onload = init;
