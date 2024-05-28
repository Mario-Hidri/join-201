let defaultContacts = [{ name: "Alice Adams", email: "alice.adams@example.com", phone: "555-123-4567", color: "#FF6F61" }, { name: "Bob Baker", email: "bob.baker@example.com", phone: "555-234-5678", color: "#6B8E23" }, { name: "Charlie Carter", email: "charlie.carter@example.com", phone: "555-345-6789", color: "#4682B4" }, { name: "David Davis", email: "david.davis@example.com", phone: "555-456-7890", color: "#DA70D6" }, { name: "Emily Evans", email: "emily.evans@example.com", phone: "555-567-8901", color: "#FF6347" }, { name: "Fiona Fisher", email: "fiona.fisher@example.com", phone: "555-678-9012", color: "#40E0D0" }, { name: "George Green", email: "george.green@example.com", phone: "555-789-0123", color: "#FFD700" }, { name: "Hannah Harris", email: "hannah.harris@example.com", phone: "555-890-1234", color: "#FFA07A" }, { name: "Ian Irving", email: "ian.irving@example.com", phone: "555-901-2345", color: "#7FFFD4" }, { name: "Jackie Jackson", email: "jackie.jackson@example.com", phone: "555-012-3456", color: "#BA55D3" }, { name: "Kevin King", email: "kevin.king@example.com", phone: "555-123-4568", color: "#6495ED" }, { name: "Laura Lee", email: "laura.lee@example.com", phone: "555-234-5679", color: "#8A2BE2" }, { name: "Michael Moore", email: "michael.moore@example.com", phone: "555-345-6780", color: "#FF4500" }, { name: "Nancy Nelson", email: "nancy.nelson@example.com", phone: "555-456-7891", color: "#00CED1" }, { name: "Oliver Owens", email: "oliver.owens@example.com", phone: "555-567-8902", color: "#B0E0E6" }, { name: "Paul Peterson", email: "paul.peterson@example.com", phone: "555-678-9013", color: "#20B2AA" }, { name: "Quincy Quinn", email: "quincy.quinn@example.com", phone: "555-789-0124", color: "#FF69B4" }, { name: "Rachel Rogers", email: "rachel.rogers@example.com", phone: "555-890-1235", color: "#DC143C" }, { name: "Steve Smith", email: "steve.smith@example.com", phone: "555-901-2346", color: "#00FF7F" }, { name: "Tracy Thompson", email: "tracy.thompson@example.com", phone: "555-012-3457", color: "#8B4513" }, { name: "Uma Underwood", email: "uma.underwood@example.com", phone: "555-123-4569", color: "#7FFF00" }, { name: "Victor Vance", email: "victor.vance@example.com", phone: "555-234-5680", color: "#FF1493" }, { name: "Wendy White", email: "wendy.white@example.com", phone: "555-345-6781", color: "#1E90FF" }, { name: "Xander Xiong", email: "xander.xiong@example.com", phone: "555-456-7892", color: "#4B0082" }, { name: "Yara Young", email: "yara.young@example.com", phone: "555-567-8903", color: "#8FBC8F" }, { name: "Zachary Zimmerman", email: "zachary.zimmerman@example.com", phone: "555-678-9014", color: "#ADFF2F" }];
let allContacts = [];
let lastSelectedContactIndex = null;
let currentEditIndex = -1;


function addContact() {
    let name = document.getElementById('add_contact_name').value;
    let email = document.getElementById('add_contact_email').value;
    let phone = document.getElementById('add_contact_phone').value;
    let contact = createContact(name, email, phone, getRandomColor());

    addContactToArray(contact);
    saveContactsToLocalStorage();
    renderContacts();
    showTempDiv();
    hideElement('slidingPage');
}

function resetSelectedIndexes() {
    lastSelectedContactIndex = null;
    currentEditIndex = -1;
}

function createContact(name, email, phone, color) {
    return {
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().getTime(),
        contactSelect: false,
        color: color
    };
}

function addContactToArray(contact) {
    allContacts.push(contact);
}

function saveContactsToLocalStorage() {
    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}

function initContactForaddTask() {
    let allContactsAsString = localStorage.getItem('allContacts');
    if (allContactsAsString) {
        allContacts = JSON.parse(allContactsAsString) || [];
    } else {
        allContacts = defaultContacts;
        saveContactsToLocalStorage();
    }
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

function deleteContact(currentEditIndex) {
    let position = currentEditIndex;
    allContacts.splice(position, 1);

    saveContactsToLocalStorage();
    renderContacts();
    hideElement('editContactDisplay');
    resetSelectedIndexes();
}

function hideElement(elementId) {
    let element = document.getElementById(elementId);

    // Clear the input fields if the sliding page is being hidden
    if (elementId === 'slidingPage') {
        clearSlidingPageInputs();
    }

    element.classList.remove('show');
    element.classList.add('hide');
    setTimeout(function () {
        element.classList.add('hidden');
    }, 300);
}

function clearSlidingPageInputs() {
    document.getElementById('add_contact_name').value = '';
    document.getElementById('add_contact_email').value = '';
    document.getElementById('add_contact_phone').value = '';
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
        container.innerHTML += generateContactHTML(contact, index, contact.color);
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

function hideEditDisplay() {
    let editContactDisplay = document.getElementById('editContactDisplay');
    editContactDisplay.classList.add('hidden');
    resetSelectedIndexes();
}

function setColorfulDivBackgroundColor(index) {
    let contactCard = document.getElementById(`contact${index}`);
    let randomColor = contactCard.querySelector('.image_container').style.backgroundColor;
    let contactName = allContacts[index].name;
    let firstNameInitial = contactName.charAt(0);
    let lastNameInitial = contactName.split(' ')[1]?.charAt(0) || '';

    let colorfulDiv = document.getElementById('colorfulDiv');
    colorfulDiv.style.backgroundColor = randomColor;

    colorfulDiv.innerHTML = generateInitials(firstNameInitial, lastNameInitial);
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
    if (lastSelectedContactIndex === index) {
        hideEditDisplay();
    } else {
        updateEditDisplay(contact);
        showEditDisplay();
        lastSelectedContactIndex = index;
        currentEditIndex = index;
        setColorfulDivBackgroundColor(index);
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

function showTempDiv() {
    let tempDiv = document.getElementById('tempDiv');
    tempDiv.classList.remove('hidden');

    tempDiv.classList.add('show-temp');

    setTimeout(function () {
        tempDiv.classList.remove('show-temp');
        tempDiv.classList.add('hide-temp');

        setTimeout(function () {
            tempDiv.classList.remove('hide-temp');
            tempDiv.classList.add('hidden'); 
        }, 500); 
    }, 2000); 
}

window.onload = init;
