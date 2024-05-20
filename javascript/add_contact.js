// Function to add a new contact
function addContact() {
    let name = document.getElementById('add_contact_name').value;
    let email = document.getElementById('add_contact_email').value;
    let phone = document.getElementById('add_contact_phone').value;
    let contact = createContact(name, email, phone);
    addContactToArray(contact);
    saveContactsToLocalStorage();
}

// Function to reset selected indexes
function resetSelectedIndexes() {
    lastSelectedContactIndex = null;   
    currentEditIndex = -1;             
}

// Function to delete a contact
function deleteContact(currentEditIndex) {
    let position = currentEditIndex;
    allContacts.splice(position, 1);

    saveContactsToLocalStorage();
    renderContacts();
    hideElement('editContactDisplay'); 
    resetSelectedIndexes();           
}

// Function to create a contact object
function createContact(name, email, phone) {
    return {
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().getTime()
    };
}

// Function to add a contact to the contacts array
function addContactToArray(contact) {
    allContacts.push(contact);
}

// Function to save contacts to local storage
function saveContactsToLocalStorage() {
    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}

// Initialization function to load contacts from local storage
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

// Function to hide an element by ID
function hideElement(elementId) {
    let element = document.getElementById(elementId);
    element.classList.remove('show');
    element.classList.add('hide');
    setTimeout(function () {
        element.classList.add('hidden');
    }, 300);
}

// Function to show an element by ID
function showElement(elementId) {
    let element = document.getElementById(elementId);
    element.classList.remove('hidden');
    element.classList.remove('hide');
    element.classList.add('show');
}

// Function to render all contacts
function renderContacts() {
    clearContactsContainers();
    for (let i = 0; i < allContacts.length; i++) {
        let contact = allContacts[i];
        let initial = contact.name.charAt(0).toUpperCase();
        let containerId = 'contacts_container_' + initial;
        insertContactIntoContainer(containerId, contact, i);
    }
}

// Function to clear all contact containers
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

// Function to insert a contact into a container
function insertContactIntoContainer(containerId, contact, index) {
    let container = document.getElementById(containerId);
    if (container) {
        container.innerHTML += generateContactHTML(contact, index);
    }
}

// Function to show the edit form
function showEditForm() {
    document.getElementById('editContactForm').classList.remove('hidden');
}

// Function to show the edit display
function showEditDisplay() {
    document.getElementById('editContactDisplay').classList.remove('hidden');
}

// Function to toggle contact selection
function toggleContactSelection(index) {
    if (lastSelectedContactIndex !== null && lastSelectedContactIndex !== index) {
        document.getElementById('contact' + lastSelectedContactIndex).classList.remove('selected');
    }
    document.getElementById('contact' + index).classList.toggle('selected');
}

// Function to update the edit display with contact details
function updateEditDisplay(contact) {
    document.getElementById('edit_contact_name').textContent = contact.name;
    document.getElementById('edit_contact_email').textContent = contact.email;
    document.getElementById('edit_contact_phone').textContent = contact.phone;
    document.getElementById('edit_contact_email').setAttribute('href', 'mailto:' + contact.email);
    document.getElementById('edit_contact_name_input').value = contact.name;
    document.getElementById('edit_contact_email_input').value = contact.email;
    document.getElementById('edit_contact_phone_input').value = contact.phone;
}

// Function to populate the edit display with contact details
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

// Function to create a contact card
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

// Function to save the edited contact details
function saveEditedContact() {
    let name = document.getElementById('edit_contact_name_input').value;
    let email = document.getElementById('edit_contact_email_input').value;
    let phone = document.getElementById('edit_contact_phone_input').value;

    if (currentEditIndex >= 0) {
        updateContactAndRender(name, email, phone);
    }
}

// Function to update the contact and render the contact list
function updateContactAndRender(name, email, phone) {
    allContacts[currentEditIndex].name = name;
    allContacts[currentEditIndex].email = email;
    allContacts[currentEditIndex].phone = phone;

    saveContactsToLocalStorage();
    renderContacts();
    document.getElementById('editContactForm').classList.add('hidden');
}

// Function to hide the editing form
function hideEditing() {
    document.getElementById('editContactForm').classList.add('hidden');
}

// Initialize the application on window load
window.onload = init;
