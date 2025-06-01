document.addEventListener('DOMContentLoaded', function() {
    const yoneticiGirisForm = document.getElementById('yoneticiGirisForm');
    const yoneticiAdiInput = document.getElementById('yoneticiadi');
    const yoneticiSifreInput = document.getElementById('yoneticisifre');
    const yoneticiGirisMesaj = document.getElementById('yoneticiGirisMesaj');

    const yoneticiAdi = "admin";   // Belirlenen yönetici adı
    const yoneticiSifre = "admin123"; // Belirlenen yönetici şifresi
    const adminPanelUrl = "yonetici_paneli.html"; // Yönetici paneli URL'si

    yoneticiGirisForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yenilenmesini engelle

        const girilenYoneticiAdi = yoneticiAdiInput.value;
        const girilenSifre = yoneticiSifreInput.value;

        if (girilenYoneticiAdi === yoneticiAdi && girilenSifre === yoneticiSifre) {
            yoneticiGirisMesaj.textContent = "Yönetici girişi başarılı! Yönlendiriliyorsunuz...";
            yoneticiGirisMesaj.className = "valid";
            // Yöneticiyi yönetici paneline yönlendir
            window.location.href = adminPanelUrl;
        } else {
            yoneticiGirisMesaj.textContent = "Yönetici adı veya şifre hatalı.";
            yoneticiGirisMesaj.className = "invalid";
        }
    });
});