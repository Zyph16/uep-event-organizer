document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.querySelector('.profile-icon');
    const profileDropdown = document.querySelector('.profile-dropdown');

    profileIcon.addEventListener('click', () =>{
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
    });
    requestAnimationFrame(() => {
        const rect = profileDropdown.getBoundingClientRect();

        if(rect.right > window.innerWidth ){
            profileDropdown.style.left = 'auto';
            profileDropdown.style.right= '0';
        }

        if(rect.left < 0 ){
            profileDropdown.style.left = '0';
            profileDropdown.style.right= 'auto';
        }
    });
    window.addEventListener('click', (e) => {
        if(!e.target.closest('.profile-container')){
            profileDropdown.style.display ='none';
        }
    })
})