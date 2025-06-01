// kullanici_giris.js

// users dizisini localStorage'dan yükle veya varsayılan 10 kullanıcıyı kullan
let users = JSON.parse(localStorage.getItem('allUsers')) || [
    { username: 'ahmet.demir', password: 'Password1', email: 'ahmet.demir@example.com' },
    { username: 'zeynep.kaya', password: 'Password2', email: 'zeynep.kaya@example.com' },
    { username: 'mehmet.yilmaz', password: 'Password3', email: 'mehmet.yilmaz@example.com' },
    { username: 'ayse.can', password: 'Password4', email: 'ayse.can@example.com' },
    { username: 'ali.guler', password: 'Password5', email: 'ali.guler@example.com' },
    { username: 'fatma.celik', password: 'Password6', email: 'fatma.celik@example.com' },
    { username: 'can.kara', password: 'Password7', email: 'can.kara@example.com' },
    { username: 'elif.uzun', password: 'Password8', email: 'elif.uzun@example.com' },
    { username: 'deniz.sahin', password: 'Password9', email: 'deniz.sahin@example.com' },
    { username: 'mustafa.yildiz', password: 'Password10', email: 'mustafa.yildiz@example.com' }
];

function saveUsersToLocalStorage() {
    localStorage.setItem('allUsers', JSON.stringify(users));
}

// Navigasyon durumunu güncelleyen fonksiyon
function updateLoginStatus() {
    const loginLinkLi = document.getElementById('login-link-li');
    const favoritesLinkLi = document.getElementById('favorites-link-li');
    const logoutButtonLi = document.getElementById('logout-button-li');
    const registerLinkLi = document.getElementById('register-link-li');
    const cartLinkli = document.getElementById('cart-link-li'); // Sepet linki elementini alıyoruz

    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        if (loginLinkLi) loginLinkLi.style.display = 'none';
        if (registerLinkLi) registerLinkLi.style.display = 'none';
        if (favoritesLinkLi) favoritesLinkLi.style.display = 'block';
        if (logoutButtonLi) logoutButtonLi.style.display = 'block';
    } else {
        if (loginLinkLi) loginLinkLi.style.display = 'block';
        if (registerLinkLi) registerLinkLi.style.display = 'block';
        if (favoritesLinkLi) favoritesLinkLi.style.display = 'none';
        if (logoutButtonLi) logoutButtonLi.style.display = 'none';
    }
}

// Favorileri yöneten fonksiyonlar
function getFavoriteArtworks(username) {
    const userFavorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
    return userFavorites;
}

function saveFavoriteArtworks(username, favorites) {
    localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
}

function addArtworkToFavorites(username, artworkId, artworkTitle) {
    let favorites = getFavoriteArtworks(username);
    // Favorilerde bu eser zaten var mı kontrol et
    if (!favorites.some(fav => fav.id === artworkId)) {
        favorites.push({ id: artworkId, title: artworkTitle });
        saveFavoriteArtworks(username, favorites);
        return true; // Başarıyla eklendi
    }
    return false; // Zaten favorilerdeydi
}

function removeArtworkFromFavorites(username, artworkId) {
    let favorites = getFavoriteArtworks(username);
    const initialLength = favorites.length;
    favorites = favorites.filter(fav => fav.id !== artworkId);
    if (favorites.length < initialLength) {
        saveFavoriteArtworks(username, favorites);
        return true; // Başarıyla silindi
    }
    return false; // Favorilerde bulunamadı
}


document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus();

    const kullaniciGirisForm = document.getElementById('kullaniciGirisForm');
    const kullaniciAdiInput = document.getElementById('kullaniciadi');
    const kullaniciSifreInput = document.getElementById('kullaniciSifre');
    const kullaniciGirisMesaj = document.getElementById('kullaniciGirisMesaj');

    if (kullaniciGirisForm) {
        kullaniciGirisForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const girilenKullaniciAdi = kullaniciAdiInput.value;
            const girilenSifre = kullaniciSifreInput.value;

            const foundUser = users.find(user =>
                user.username === girilenKullaniciAdi && user.password === girilenSifre
            );

            if (foundUser) {
                localStorage.setItem('loggedInUser', foundUser.username);
                kullaniciGirisMesaj.textContent = "Giriş başarılı! Yönlendiriliyorsunuz...";
                kullaniciGirisMesaj.className = "message valid";

                updateLoginStatus();

                setTimeout(() => {
                    window.location.href = 'kullanici_paneli.html';
                }, 2000);

            } else {
                kullaniciGirisMesaj.textContent = "Kullanıcı adı veya şifre hatalı.";
                kullaniciGirisMesaj.className = "message invalid";
                localStorage.removeItem('loggedInUser');
                updateLoginStatus();
            }
        });
    }

    // Header'daki çıkış butonu için olay dinleyici (tüm sayfalarda bulunur)
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            alert('Başarıyla çıkış yapıldı.');
            updateLoginStatus(); // Çıkış sonrası menüyü güncelle
            window.location.href = 'index.html';
        });
    }

    // Favorilere Ekle butonları için olay dinleyici (sergiyi_kesfet.html gibi sayfalarda kullanılacak)
    // Bu kod parçacığı sadece .add-to-favorites sınıfına sahip butonlar varsa çalışır.
    const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');
    if (addToFavoritesButtons.length > 0) {
        addToFavoritesButtons.forEach(button => {
            button.addEventListener('click', function() {
                const loggedInUser = localStorage.getItem('loggedInUser');
                if (!loggedInUser) {
                    alert('Favorilere eklemek için önce giriş yapmalısınız!');
                    window.location.href = 'kullanici_giris.html'; // Giriş sayfasına yönlendir
                    return;
                }

                const artworkId = this.dataset.artworkId;
                const artworkTitle = this.dataset.artworkTitle;

                if (addArtworkToFavorites(loggedInUser, artworkId, artworkTitle)) {
                    alert(`${artworkTitle} favorilerinize eklendi!`);
                    // Butonun metnini veya görünümünü değiştirebilirsiniz
                    this.textContent = 'Favorilerde';
                    this.disabled = true; // Tekrar eklemeyi engelle
                } else {
                    alert(`${artworkTitle} zaten favorilerinizde.`);
                }
            });
        });
    }

    // Favorilerim sayfasındaki "Favorilerden Kaldır" butonları için olay dinleyici (favorilerim.html'de kullanılacak)
    // Bu kod parçacığı sadece .remove-from-favorites sınıfına sahip butonlar varsa çalışır.
    const removeFromFavoritesButtons = document.querySelectorAll('.remove-from-favorites');
    if (removeFromFavoritesButtons.length > 0) {
        removeFromFavoritesButtons.forEach(button => {
            button.addEventListener('click', function() {
                const loggedInUser = localStorage.getItem('loggedInUser');
                if (!loggedInUser) {
                    alert('Çıkış yapmalısınız.'); // Normalde bu butonu görmemeliler
                    return;
                }

                const artworkId = this.dataset.artworkId;
                const artworkTitle = this.dataset.artworkTitle; // Opsiyonel, kullanıcıya göstermek için

                if (confirm(`${artworkTitle || 'Bu eseri'} favorilerinizden kaldırmak istediğinizden emin misiniz?`)) {
                    if (removeArtworkFromFavorites(loggedInUser, artworkId)) {
                        alert(`${artworkTitle || 'Eser'} favorilerinizden kaldırıldı.`);
                        // Kaldırılan eseri sayfadan kaldır
                        this.closest('.favorite-artwork-item').remove();
                        // Eğer favorilerim sayfası boş kaldıysa mesaj göster
                        if (document.querySelectorAll('.favorite-artwork-item').length === 0) {
                            const favoritesList = document.getElementById('favorites-list');
                            if (favoritesList) {
                                favoritesList.innerHTML = '<p>Henüz favori eseriniz bulunmamaktadır.</p>';
                            }
                        }
                    } else {
                        alert('Eser favorilerinizde bulunamadı.');
                    }
                }
            });
        });
    }
});