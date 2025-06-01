// javaScript/sepet.js

// allArtworks dizisi: Eser detaylarını almak için gerekli
// Bu dizi, projenizdeki tüm eserleri içermelidir.
// Eğer bu veriyi bir API'den çekiyorsanız, bu kısmı kaldırıp API çağrısını yapmalısınız.
const allArtworks = [
    { id: 'eser1', ad: 'Gül Ebru', sanatci: 'Hatice Fer', tur: 'Ebru Sanatı', fiyat: 1200, gorsel: 'ebru1_kucuk.jpg' },
    { id: 'eser2', ad: 'Aslan Heykel', sanatci: 'Ali Pek', tur: 'Heykel', fiyat: 3000, gorsel: 'heykel1_kucuk.jpg' },
    { id: 'eser3', ad: 'Hat', sanatci: 'Ayşe Yıl', tur: 'Hat Sanatı', fiyat: 800, gorsel: 'hat1_kucuk.jpg' },
    { id: 'eser4', ad: 'Renk Cümbüşü', sanatci: 'Arda Demir', tur: 'Resim', fiyat: 1500, gorsel: 'resim6_kucuk.jpg' },
    { id: 'eser5', ad: 'Şekiller', sanatci: 'Elif Kaya', tur: 'Dijital Sanat', fiyat: 950, gorsel: 'resim4_kucuk.jpg' },
    { id: 'eser6', ad: 'Umut Çiçeği', sanatci: 'Maria Pink', tur: 'Resim', fiyat: 1100, gorsel: 'resim2_kucuk.jpg' },
    { id: 'eser7', ad: 'At Heykeli', sanatci: 'Ali Pek', tur: 'Heykel', fiyat: 2800, gorsel: 'heykel2_kucuk.jpg' },
    { id: 'eser8', ad: 'Ebru', sanatci: 'Hatice Fer', tur: 'Ebru Sanatı', fiyat: 950, gorsel: 'ebru2_kucuk.jpg' },
    { id: 'eser9', ad: 'Doğa Resmi', sanatci: 'Arda Demir', tur: 'Resim', fiyat: 900, gorsel: 'resim5_kucuk.jpg' },
    { id: 'eser10', ad: 'Mandala Motifi', sanatci: 'Elif Kaya', tur: 'Resim', fiyat: 650, gorsel: 'resim8_kucuk.jpg' },
    { id: 'eser11', ad: 'Ebru Sanati', sanatci: 'Hatice Fer', tur: 'Ebru Sanatı', fiyat: 750, gorsel: 'ebru3_kucuk.jpg' },
    { id: 'eser12', ad: 'Renklerin Dünyası', sanatci: 'Hatice Fer', tur: 'Ebru Sanatı', fiyat: 980, gorsim: 'ebru4_kucuk.jpg' },
];

// Sepet verilerini localStorage'dan çeker
function getCartItems(username) {
    const users = JSON.parse(localStorage.getItem('allUsers')) || [];
    const user = users.find(u => u.username === username);
    return user ? user.cart || [] : [];
}

// Sepet verilerini localStorage'a kaydeder
function saveCartItems(username, cartItems) {
    let users = JSON.parse(localStorage.getItem('allUsers')) || [];
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex > -1) {
        users[userIndex].cart = cartItems;
        localStorage.setItem('allUsers', JSON.stringify(users));
        return true;
    }
    return false; // Kullanıcı bulunamadı
}

// Sepete eser ekler
function addArtworkToCart(username, artworkId, artworkTitle, price) {
    if (!username) {
        alert('Sepete ürün eklemek için giriş yapmalısınız.');
        return false;
    }

    const cartItems = getCartItems(username);
    const existingItem = cartItems.find(item => item.id === artworkId);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        alert(`${artworkTitle} eserinden bir adet daha sepete eklendi.`);
    } else {
        cartItems.push({ id: artworkId, title: artworkTitle, quantity: 1, price: price });
        alert(`${artworkTitle} eseri sepete eklendi.`);
    }

    saveCartItems(username, cartItems);
    return true;
}

// Sepetten eser kaldırır (tamamen)
function removeArtworkFromCart(username, artworkId) {
    if (!username) {
        alert('Bu işlemi yapmak için giriş yapmalısınız.');
        return false;
    }

    let cartItems = getCartItems(username);
    const initialLength = cartItems.length;
    cartItems = cartItems.filter(item => item.id !== artworkId);

    if (cartItems.length < initialLength) {
        saveCartItems(username, cartItems);
        return true; // Başarıyla kaldırıldı
    }
    return false; // Eser sepette bulunamadı
}

// Sepetteki bir eserin miktarını azaltır
function decreaseArtworkQuantity(username, artworkId) {
    if (!username) {
        alert('Bu işlemi yapmak için giriş yapmalısınız.');
        return false;
    }

    const cartItems = getCartItems(username);
    const itemIndex = cartItems.findIndex(item => item.id === artworkId);

    if (itemIndex > -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;
            saveCartItems(username, cartItems);
            return true; // Miktar azaltıldı
        } else {
            // Miktar 1 ise, kaldır (bu kısım removeArtworkFromCart fonksiyonunu çağırır)
            return removeArtworkFromCart(username, artworkId);
        }
    }
    return false; // Eser sepette bulunamadı
}

// Sepet sayfasını doldurmak için kullanılan fonksiyon
function loadCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalSpan = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        if (cartItemsList) cartItemsList.innerHTML = '';
        if (cartTotalSpan) cartTotalSpan.textContent = '0.00 TL';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        return;
    }

    if (cartItemsList) cartItemsList.innerHTML = ''; // Önceki içeriği temizle
    let totalCartPrice = 0;
    const userCart = getCartItems(loggedInUser);

    if (userCart && userCart.length > 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        userCart.forEach(item => {
            const artworkDetails = allArtworks.find(art => art.id === item.id);
            if (artworkDetails) {
                const listItem = document.createElement('li');
                listItem.classList.add('cart-item');
                const itemPrice = artworkDetails.fiyat || 0;
                const subtotal = itemPrice * (item.quantity || 1);
                totalCartPrice += subtotal;

                listItem.innerHTML = `
                    <div class="cart-item-image-container">
                        <img src="${artworkDetails.gorsel}" alt="${artworkDetails.ad}" class="cart-item-image">
                    </div>
                    <div class="cart-item-details">
                        <h3>${artworkDetails.ad}</h3>
                        <p>Sanatçı: ${artworkDetails.sanatci}</p>
                        <p>Birim Fiyat: ${itemPrice.toFixed(2)} TL</p>
                        <p>Miktar: <span class="cart-item-quantity">${item.quantity || 1}</span></p>
                        <p>Ara Toplam: ${subtotal.toFixed(2)} TL</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="decrease-quantity" data-artwork-id="${item.id}">-</button>
                        <button class="increase-quantity" data-artwork-id="${item.id}">+</button>
                        <button class="remove-item" data-artwork-id="${item.id}" data-artwork-title="${artworkDetails.ad}">Kaldır</button>
                    </div>
                `;
                cartItemsList.appendChild(listItem);
            }
        });
    } else {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    }
    if (cartTotalSpan) cartTotalSpan.textContent = totalCartPrice.toFixed(2) + ' TL';
}

// Event listener'lar: Bu, sepet.js'in yüklendiği sayfalarda (sepet.html, sergiyi_kesfet.html vb.) çalışacak.
document.addEventListener('DOMContentLoaded', function() {
    // Tüm sayfalarda sepet butonlarının tıklamalarını dinle (event delegation)
    document.body.addEventListener('click', function(event) {
        // "Sepete Ekle" butonu (sergiyi_kesfet.html gibi sayfalarda)
        if (event.target.closest('.add-to-cart')) {
            const button = event.target.closest('.add-to-cart');
            const loggedInUser = localStorage.getItem('loggedInUser');

            if (!loggedInUser) {
                alert('Sepete ürün eklemek için giriş yapmalısınız.');
                window.location.href = 'kullanici_giris.html';
                return;
            }

            const artworkId = button.dataset.artworkId;
            const artworkTitle = button.dataset.artworkTitle;
            const artworkPrice = parseFloat(button.dataset.artworkPrice);

            addArtworkToCart(loggedInUser, artworkId, artworkTitle, artworkPrice);
        }

        // Sepetim sayfasındaki butonlar (sepet.html için)
        if (event.target.classList.contains('remove-item')) {
            const button = event.target;
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) { return; }

            const artworkId = button.dataset.artworkId;
            const artworkTitle = button.dataset.artworkTitle;

            if (confirm(`${artworkTitle || 'Bu eseri'} sepetinizden tamamen kaldırmak istediğinizden emin misiniz?`)) {
                if (removeArtworkFromCart(loggedInUser, artworkId)) {
                    loadCartItems(); // Sepeti yeniden yükle
                } else {
                    alert('Eser sepetinizde bulunamadı.');
                }
            }
        } else if (event.target.classList.contains('increase-quantity')) {
            const button = event.target;
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) { return; }

            const artworkId = button.dataset.artworkId;
            const artworkDetails = allArtworks.find(art => art.id === artworkId); // Fiyat ve isim için
            if (artworkDetails) {
                addArtworkToCart(loggedInUser, artworkId, artworkDetails.ad, artworkDetails.fiyat);
                loadCartItems(); // Sepeti yeniden yükle
            }
        } else if (event.target.classList.contains('decrease-quantity')) {
            const button = event.target;
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) { return; }

            const artworkId = button.dataset.artworkId;
            if (decreaseArtworkQuantity(loggedInUser, artworkId)) {
                loadCartItems(); // Sepeti yeniden yükle
            } else {
                // Eğer miktar 1 idi ve kaldırıldıysa da loadCartItems çağrılmalı
                loadCartItems();
            }
        }
    });

    // Sadece sepet.html sayfasında sepeti yükle ve ödeme butonunu ayarla
    // Bu kısım, 'sepet.html' sayfasının DOM'unda `#cart-items-list` elementi varsa çalışır.
    if (document.getElementById('cart-items-list')) {
        loadCartItems(); // Sepet içeriğini yükle

        const checkoutButton = document.querySelector('.checkout-button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', function() {
                const total = parseFloat(document.getElementById('cart-total').textContent.replace(' TL', ''));
                if (total > 0) {
                    alert(`Toplam ${total.toFixed(2)} TL tutarındaki sepetiniz için ödeme sayfasına yönlendiriliyorsunuz. (Bu bir simülasyondur)`);
                    // Burada ödeme sayfasına yönlendirme veya ödeme işlemleri başlatılabilir
                    // window.location.href = 'odeme.html';
                } else {
                    alert('Sepetiniz boş. Lütfen önce ürün ekleyin.');
                }
            });
        }
    }
});