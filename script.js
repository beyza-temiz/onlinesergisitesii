
let slideIndex = 1;
showSlides(slideIndex);

// İleri/geri kontrolü
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Nokta kontrolü
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

    // Otomatik geçiş(- her 3 saniyede bir)
    // setTimeout(plusSlides, 3000, 1);
}

// İlk yüklemede otomatik geçişi başlatmak için 
// setTimeout(plusSlides, 3000, 1);
document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.dropdown-content a');
    const artworkItems = document.querySelectorAll('.artwork-item');
    const dropdownButton = document.querySelector('.dropbtn');

    filterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const filterValue = this.dataset.filter;

            artworkItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.type === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Açılır menü butonunun metnini güncelle ve aktif linki işaretle
            dropdownButton.textContent = this.textContent;
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Açılır menüyü kapat 
            const dropdownContent = this.closest('.dropdown').querySelector('.dropdown-content');
            dropdownContent.style.display = 'none';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {

    const sepetSayisiSpan = document.getElementById('sepet-sayisi');
    const sepet = localStorage.getItem('sepet') ? JSON.parse(localStorage.getItem('sepet')) : []; // Sepet verisini localStorage'dan al

    if (sepetSayisiSpan) {
        sepetSayisiSpan.textContent = sepet.length; // Sepet sayısını span'in içeriğine yaz
    }


});