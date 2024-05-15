let allContacts = [];

init();


function addContact() {
    let name = document.getElementById('add_contact_name').value;
    let email = document.getElementById('add_contact_email').value;
    let phone = document.getElementById('add_contact_phone').value;

    let contact = {
        'name': name,
        'email': email,
        'phone': phone,
        'createdAt': new Date().getTime()
    };

    allContacts.push(contact);

    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}

function init() {
    includeHTML();

    let allContactsAsString = localStorage.getItem('allContacts');
    if (allContactsAsString) {
        allContacts = JSON.parse(allContactsAsString) || [];
    } else {
        allContacts = [];
    }
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