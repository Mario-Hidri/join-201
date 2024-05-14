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

