document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.querySelector('.profile-icon');
    const profileDropdown = document.querySelector('.profile-dropdown');

    profileIcon.addEventListener('click', () =>{
        const isVisible = profileDropdown.style.display === 'block';
        profileDropdown.style.display = isVisible ? 'none' : 'block';

        profileIcon.style.color = isVisible ? '' : '#1f3c88';
        // profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';

        // profileIcon.style.color = '#1f3c88';
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
             profileIcon.style.color = '';
        }
    })
})