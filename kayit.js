// kayit.js

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const regUsernameInput = document.getElementById('reg-username');
    const regEmailInput = document.getElementById('reg-email');
    const regPasswordInput = document.getElementById('reg-password');
    const registerMessage = document.getElementById('registerMessage');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const newUsername = regUsernameInput.value.trim();
            const newEmail = regEmailInput.value.trim();
            const newPassword = regPasswordInput.value.trim();

            // Basit doğrulama: Alanlar boş olmasın
            if (!newUsername || !newEmail || !newPassword) {
                registerMessage.textContent = 'Lütfen tüm alanları doldurun.';
                registerMessage.className = 'message invalid';
                return;
            }

            // Kullanıcı adının veya e-postanın zaten var olup olmadığını kontrol et
            // NOT: `users` dizisi, `giris.js` dosyasından global olarak erişilebilir olmalı.
            // Eğer `giris.js`'deki `users` dizisi global değilse, burada tekrar tanımlamanız veya
            // `users` dizisini başka bir ortak `data.js` gibi dosyada tutmanız gerekir.
            const existingUser = users.find(user =>
                user.username === newUsername || user.email === newEmail
            );

            if (existingUser) {
                registerMessage.textContent = 'Bu kullanıcı adı veya e-posta zaten kullanılıyor.';
                registerMessage.className = 'message invalid';
                return;
            }

            // Yeni kullanıcı objesi
            const newUser = {
                username: newUsername,
                email: newEmail,
                password: newPassword
            };

            // users dizisine yeni kullanıcıyı ekle
            users.push(newUser);

            // localStorage'daki kullanıcı listesini güncelle
            // ÖNEMLİ: users dizisini localStorage'da tutuyorsanız bu adım gerekli.
            // Şu anki kurulumumuzda users dizisi sadece JS içinde ve her yenilemede sıfırlanıyor.
            // Kalıcı kayıt için bu verinin bir API'ye gönderilmesi veya
            // basit bir geliştirme için tüm users dizisinin localStorage'a kaydedilmesi gerekir.
            // Şimdilik, kalıcılık sağlamak için localStorage'a kaydedelim (SADECE GELİŞTİRME AMAÇLI):
            localStorage.setItem('allUsers', JSON.stringify(users)); // Yeni kullanıcılar için ayrı bir anahtar kullanın

            registerMessage.textContent = 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.';
            registerMessage.className = 'message valid';

            // Formu temizle
            registerForm.reset();

            // Kullanıcıyı giriş sayfasına yönlendir (isteğe bağlı, otomatik giriş de yapılabilir)
            setTimeout(() => {
                window.location.href = 'kullanici_giris.html';
            }, 2000); // 2 saniye sonra yönlendir
        });
    }
});