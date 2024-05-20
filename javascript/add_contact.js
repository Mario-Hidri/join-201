let defaultContacts = [{ name: "Alice Adams", email: "alice.adams@example.com", phone: "555-123-4567" }, { name: "Bob Baker", email: "bob.baker@example.com", phone: "555-234-5678" }, { name: "Charlie Carter", email: "charlie.carter@example.com", phone: "555-345-6789" }, { name: "David Davis", email: "david.davis@example.com", phone: "555-456-7890" }, { name: "Emily Evans", email: "emily.evans@example.com", phone: "555-567-8901" }, { name: "Frank Fisher", email: "frank.fisher@example.com", phone: "555-678-9012" }, { name: "Grace Garcia", email: "grace.garcia@example.com", phone: "555-789-0123" }, { name: "Henry Harris", email: "henry.harris@example.com", phone: "555-890-1234" }, { name: "Isabel Ingram", email: "isabel.ingram@example.com", phone: "555-901-2345" }, { name: "Jack Johnson", email: "jack.johnson@example.com", phone: "555-012-3456" }, { name: "Katherine King", email: "katherine.king@example.com", phone: "555-123-4567" }, { name: "Liam Lee", email: "liam.lee@example.com", phone: "555-234-5678" }, { name: "Mia Martinez", email: "mia.martinez@example.com", phone: "555-345-6789" }, { name: "Nathan Nelson", email: "nathan.nelson@example.com", phone: "555-456-7890" }, { name: "Olivia Olson", email: "olivia.olson@example.com", phone: "555-567-8901" }, { name: "Peter Parker", email: "peter.parker@example.com", phone: "555-678-9012" }, { name: "Quinn Quinn", email: "quinn.quinn@example.com", phone: "555-789-0123" }, { name: "Rachel Roberts", email: "rachel.roberts@example.com", phone: "555-890-1234" }, { name: "Samuel Smith", email: "samuel.smith@example.com", phone: "555-901-2345" }, { name: "Taylor Taylor", email: "taylor.taylor@example.com", phone: "555-012-3456" }, { name: "Uma Underwood", email: "uma.underwood@example.com", phone: "555-123-4567" }, { name: "Victor Vega", email: "victor.vega@example.com", phone: "555-234-5678" }, { name: "Wendy White", email: "wendy.white@example.com", phone: "555-345-6789" }, { name: "Xavier Xavier", email: "xavier.xavier@example.com", phone: "555-456-7890" }, { name: "Yvonne Young", email: "yvonne.young@example.com", phone: "555-567-8901" }, { name: "Zack Zimmerman", email: "zack.zimmerman@example.com", phone: "555-678-9012" }];
let allContacts = [];
let lastSelectedContactIndex = null;
let currentEditIndex = -1; 

function addContact() {
    let name = document.getElementById('add_contact_name').value;
    let email = document.getElementById('add_contact_email').value;
    let phone = document.getElementById('add_contact_phone').value;
    let contact = createContact(name, email, phone);
    addContactToArray(contact);
    saveContactsToLocalStorage();
}

function resetSelectedIndexes() {
    lastSelectedContactIndex = null;   
    currentEditIndex = -1;             
}

function deleteContact(currentEditIndex){
    let position = currentEditIndex;
    allContacts.splice(position, 1);
  
    saveContactsToLocalStorage();
    renderContacts();
    hideElement('editContactDisplay'); 
    resetSelectedIndexes(); 
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

function hideElement(elementId) {
    let element = document.getElementById(elementId);
    element.classList.remove('show');
    element.classList.add('hide');
    setTimeout(function () {
        element.classList.add('hidden');
    }, 300);
}

function showElement(elementId) {
    let element = document.getElementById(elementId);
    element.classList.remove('hidden');
    element.classList.remove('hide');
    element.classList.add('show');
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

function showEditForm() {
    document.getElementById('editContactForm').classList.remove('hidden');
}

function showEditDisplay() {
    document.getElementById('editContactDisplay').classList.remove('hidden');
}

function toggleContactSelection(index) {
    if (lastSelectedContactIndex !== null && lastSelectedContactIndex !== index) {
        document.getElementById('contact' + lastSelectedContactIndex).classList.remove('selected');
    }
    document.getElementById('contact' + index).classList.toggle('selected');
}

function updateEditDisplay(contact) {

    document.getElementById('edit_contact_name').textContent = contact.name;
    document.getElementById('edit_contact_email').textContent = contact.email;
    document.getElementById('edit_contact_phone').textContent = contact.phone;
    document.getElementById('edit_contact_email').setAttribute('href', 'mailto:' + contact.email);
    document.getElementById('edit_contact_name_input').value = contact.name;
    document.getElementById('edit_contact_email_input').value = contact.email;
    document.getElementById('edit_contact_phone_input').value = contact.phone;
}

function showEditDisplay() {
    let editContactDisplay = document.getElementById('editContactDisplay');
    editContactDisplay.classList.remove('hidden');
}

function populateEditDisplay(contact, index) {
    toggleContactSelection(index);
    let editContactDisplay = document.getElementById('editContactDisplay');
    if (lastSelectedContactIndex === index) {
        editContactDisplay.classList.add('hidden');
        resetSelectedIndexes();
    } else {
        updateEditDisplay(contact);
        showEditDisplay();
        lastSelectedContactIndex = index;
        currentEditIndex = index;
    }
}

function createContactCard(contact, index) {
    let contactCard = document.createElement('div');
    contactCard.classList.add('contact_card');
    contactCard.setAttribute('id', 'contact' + index);
    contactCard.onclick = function () {
        populateEditDisplay(contact, index);
    };
    contactCard.innerHTML = createContactCardContent(contact);
    return contactCard;
}

function saveEditedContact() {
    let name = document.getElementById('edit_contact_name_input').value;
    let email = document.getElementById('edit_contact_email_input').value;
    let phone = document.getElementById('edit_contact_phone_input').value;

    if (currentEditIndex >= 0) {
        updateContactAndRender(name, email, phone)
    }
}

function updateContactAndRender(name, email, phone) {
    allContacts[currentEditIndex]['name'] = name;
    allContacts[currentEditIndex]['email'] = email;
    allContacts[currentEditIndex]['phone'] = phone;

    saveContactsToLocalStorage();
    renderContacts();
    document.getElementById('editContactForm').classList.add('hidden');
}

function hideEditing() {
    document.getElementById('editContactForm').classList.add('hidden');
}

window.onload = init;