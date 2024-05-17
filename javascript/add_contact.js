let defaultContacts = [
    {
        name: "Alice Adams",
        email: "alice.adams@example.com",
        phone: "555-123-4567"
    },
    {
        name: "Bob Baker",
        email: "bob.baker@example.com",
        phone: "555-234-5678"
    },
    {
        name: "Charlie Carter",
        email: "charlie.carter@example.com",
        phone: "555-345-6789"
    },
    {
        name: "David Davis",
        email: "david.davis@example.com",
        phone: "555-456-7890"
    },
    {
        name: "Emily Evans",
        email: "emily.evans@example.com",
        phone: "555-567-8901"
    },
    {
        name: "Frank Fisher",
        email: "frank.fisher@example.com",
        phone: "555-678-9012"
    },
    {
        name: "Grace Garcia",
        email: "grace.garcia@example.com",
        phone: "555-789-0123"
    },
    {
        name: "Henry Harris",
        email: "henry.harris@example.com",
        phone: "555-890-1234"
    },
    {
        name: "Isabel Ingram",
        email: "isabel.ingram@example.com",
        phone: "555-901-2345"
    },
    {
        name: "Jack Johnson",
        email: "jack.johnson@example.com",
        phone: "555-012-3456"
    },
    {
        name: "Katherine King",
        email: "katherine.king@example.com",
        phone: "555-123-4567"
    },
    {
        name: "Liam Lee",
        email: "liam.lee@example.com",
        phone: "555-234-5678"
    },
    {
        name: "Mia Martinez",
        email: "mia.martinez@example.com",
        phone: "555-345-6789"
    },
    {
        name: "Nathan Nelson",
        email: "nathan.nelson@example.com",
        phone: "555-456-7890"
    },
    {
        name: "Olivia Olson",
        email: "olivia.olson@example.com",
        phone: "555-567-8901"
    },
    {
        name: "Peter Parker",
        email: "peter.parker@example.com",
        phone: "555-678-9012"
    },
    {
        name: "Quinn Quinn",
        email: "quinn.quinn@example.com",
        phone: "555-789-0123"
    },
    {
        name: "Rachel Roberts",
        email: "rachel.roberts@example.com",
        phone: "555-890-1234"
    },
    {
        name: "Samuel Smith",
        email: "samuel.smith@example.com",
        phone: "555-901-2345"
    },
    {
        name: "Taylor Taylor",
        email: "taylor.taylor@example.com",
        phone: "555-012-3456"
    },
    {
        name: "Uma Underwood",
        email: "uma.underwood@example.com",
        phone: "555-123-4567"
    },
    {
        name: "Victor Vega",
        email: "victor.vega@example.com",
        phone: "555-234-5678"
    },
    {
        name: "Wendy White",
        email: "wendy.white@example.com",
        phone: "555-345-6789"
    },
    {
        name: "Xavier Xavier",
        email: "xavier.xavier@example.com",
        phone: "555-456-7890"
    },
    {
        name: "Yvonne Young",
        email: "yvonne.young@example.com",
        phone: "555-567-8901"
    },
    {
        name: "Zack Zimmerman",
        email: "zack.zimmerman@example.com",
        phone: "555-678-9012"
    }
];


let allContacts = [];
let currentEditIndex = -1; 

function addContact() {
    let name = document.getElementById('add_contact_name').value;
    let email = document.getElementById('add_contact_email').value;
    let phone = document.getElementById('add_contact_phone').value;

    let contact = createContact(name, email, phone);
    addContactToArray(contact);
    saveContactsToLocalStorage();
    renderContacts();
}

function createContact(name, email, phone) {
    return {
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().getTime()
    };
}

function addContactToArray(contact) {
    allContacts.push(contact);
}

function saveContactsToLocalStorage() {
    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}

function init() {
    let allContactsAsString = localStorage.getItem('allContacts');
    if (allContactsAsString) {
        allContacts = JSON.parse(allContactsAsString) || [];
    } else {
        allContacts = defaultContacts;
        saveContactsToLocalStorage();
    }
    renderContacts();
    includeHTML();
}

function hidePage() {
    let slidingPage = document.getElementById('slidingPage');
    slidingPage.classList.remove('show');
    slidingPage.classList.add('hide');
    setTimeout(function () {
        slidingPage.classList.add('hidden');
    }, 300);
}

function showPage() {
    let slidingPage = document.getElementById('slidingPage');
    slidingPage.classList.remove('hidden');
    slidingPage.classList.remove('hide');
    slidingPage.classList.add('show');
}

function renderContacts() {
    clearContactsContainers();
    for (let i = 0; i < allContacts.length; i++) {
        let contact = allContacts[i];
        let initial = contact.name.charAt(0).toUpperCase();
        let containerId = 'contacts_container_' + initial;
        insertContactIntoContainer(containerId, contact, i);
    }
}

function clearContactsContainers() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        let container = document.getElementById('contacts_container_' + letter);
        if (container) {
            container.innerHTML = '';
        }
    }
}

function insertContactIntoContainer(containerId, contact, index) {
    let container = document.getElementById(containerId);
    if (container) {
        container.innerHTML += generateContactHTML(contact, index);
    }
}

function generateContactHTML(contact, index) {
    const lastNameInitial = contact.name.split(' ')[1]?.charAt(0) || '';

    return `
                <div onclick="populateEditForm(${index})"   class="contact_card">
                    <div  class="image_container">
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

function showEditForm() {
    document.getElementById('editContactForm').classList.remove('hidden');
}

function populateEditForm(index) {
    currentEditIndex = index;
    let contact = allContacts[index];

    document.getElementById('edit_contact_name').value = contact.name;
    document.getElementById('edit_contact_email').value = contact.email;
    document.getElementById('edit_contact_phone').value = contact.phone;

    showEditForm();
}

function saveEditedContact() {
    let name = document.getElementById('edit_contact_name').value;
    let email = document.getElementById('edit_contact_email').value;
    let phone = document.getElementById('edit_contact_phone').value;

    if (currentEditIndex >= 0) {
        allContacts[currentEditIndex] = createContact(name, email, phone);
        saveContactsToLocalStorage();
        renderContacts();
        document.getElementById('editContactForm').classList.add('hidden');
    }
}

window.onload = init;