document.addEventListener('DOMContentLoaded', function() {
    // HTML elemanlarını seçme
    const sanatciResim = document.getElementById('sanatci-resim');
    const sanatciAdi = document.getElementById('sanatci-adi');
    const sanatciDogumDeger = document.getElementById('sanatci-dogum-deger');
    const sanatciEgitimDeger = document.getElementById('sanatci-egitim-deger');
    const sanatciBiyografi = document.getElementById('sanatci-biyografi');
    const sanatciEserleriListe = document.querySelector('.sanatci-eserleri-liste');

    const sanatciBilgiUst = document.querySelector('.sanatci-bilgi-ust');
    const sanatciEserleriBolumu = document.querySelector('.sanatci-eserleri');


    // Sanatçı verileri
    const sanatciVerileri = {
        '1': {
            ad: 'Hatice Fer',
            dogum: 'Bursa, 1978',
            egitim: 'Marmara Üniversitesi Geleneksel Türk Sanatları Bölümü',
            biyografi: 'Hatice Fer, Türk Ebru sanatının günümüzdeki en önemli temsilcilerinden biridir. Çocukluğundan itibaren suya ve renklere olan özel ilgisi, onu geleneksel sanatlarımıza yöneltti. Lise eğitimini tamamladıktan sonra Marmara Üniversitesi Güzel Sanatlar Fakültesi Geleneksel Türk Sanatları Bölümüne girdi ve burada özellikle Ebru sanatı üzerine yoğunlaştı. Sanat kariyeri boyunca sayısız kişisel ve karma sergiye imza atan Hatice Fer, eserlerini dünyanın dört bir yanındaki sanatseverlerle buluşturdu. Özellikle Japonya, Almanya ve ABD deki sergileri, Ebru sanatının uluslararası alanda tanınmasına önemli katkılar sağladı. Eserleri, prestijli müzelerde ve özel koleksiyonlarda yer almakla birlikte, UNESCO nun Somut Olmayan Kültürel Miras listesine giren Ebru sanatının korunması ve tanıtılması adına yürüttüğü çalışmalarla da takdir topladı.',
            resim: 'sanatci1_buyuk.jpg',
            eserler: [
                { ad: 'Eser 1', resim: 'ebru1_kucuk.jpg' },
                { ad: 'Eser 2', resim: 'ebru2_kucuk.jpg' },
                { ad: 'Eser 3', resim: 'ebru3_kucuk.jpg' },
                { ad: 'Eser 4', resim: 'ebru4_kucuk.jpg' }
            ]
        },
        '2': {
            ad: 'Ali Pek',
            dogum: 'İstanbul, 1975',
            egitim: 'Mimar Sinan Güzel Sanatlar Üniversitesi',
            biyografi: '1975 yılında İstanbulda doğan Ali Pek,Mimar Sinan Güzel Sanatlar Üniversitesinden 1997 yılında mezun oldu.Heykel yapmayı sever. Özellikle hayvan heykelleri yapmak konusunda ustadır.Kendisinin yüzden fazla heykelleri vardır ve bir sürü sergi açmıştır.',
            resim: 'sanatci2_kucuk.jpg',
            eserler: [
                { ad: 'Heykel 1', resim: 'heykel1_kucuk.jpg' },
                { ad: 'Heykel 2', resim: 'heykel2_kucuk.jpg' }
            ]
        },
        // *** 3. SANATÇI OLARAK ARDA DEMİR BURADA ***
        '3': { // Bu ID, sanatcilar.html'deki linkte 'id=3' olarak kullanılacak
            ad: 'Arda Demir',
            dogum: 'Ankara, 1985',
            egitim: 'Dokuz Eylül Üniversitesi Güzel Sanatlar Fakültesi ',
            biyografi: '1985 Ankara doğumlu Arda Demir,renkli kişiliği ve enerjik fırça darbeleriyle tanınan bir ressamdır. Ankarada doğan Arda, sanata olan ilgisini genç yaşta keşfetmiş ve bu tutkusunu profesyonel bir kariyere dönüştürmüştür.  Arda nın resimleri genellikle içsel duygularını ve dış dünyadan aldığı izlenimleri yansıtır. İzleyiciyi renklerin ve formların dünyasına davet eden sanatçı, eserleriyle pozitif enerji ve neşe yaymayı hedefler.  Farklı malzemelerle yaptığı denemeler ve kendine özgü teknikleriyle dikkat çeken Arda, sanatını sürekli olarak yenilemekte ve geliştirmektedir. Bugüne kadar birçok karma sergiye katılan Arda Demir, 2023 yılında İstanbulda ilk kişisel sergisini açmıştır. Sergisi sanatseverler ve eleştirmenler tarafından ilgiyle karşılanmış ve sanatçının kariyerinde önemli bir dönüm noktası olmuştur. ',
            resim: 'sanatci2.jpg', 
            eserler: [
                { ad: 'Resim 1', resim: 'resim1_kucuk.jpg' }, 
                { ad: 'Resim 6', resim: 'resim6_kucuk.jpg' },
                { ad: 'Resim 7', resim: 'resim7_kucuk.jpg' },
                {ad:  'Resim 5',resim: 'esim5_kucuk.jpg'}
            ]
        },
        '4': { // Bu ID, sanatcilar.html'deki linkte 'id=4' olarak kullanılacak
            ad: 'Elif Kaya',
            dogum: 'İstanbul, 2002',
            egitim:'Marmara Üniversitesi Güzel Sanatlar Fakültesi,Resim Bölümü',
            biyografi: ' karakterlerin iç dünyalarını yansıtmayı ve izleyiciyle duygusal bir bağ kurmayı amaçlar. Paletinde canlı ve sıcak renkleri ustalıkla kullanan Elif, eserlerinde hem hüzün hem de umut gibi çeşitli duyguları bir arada işlemeyi başarır.Üniversite yıllarında çeşitli öğrenci sergilerine katılan Elif, 2024 yılında genç yetenekleri desteklemeyi amaçlayan özel bir galeride ilk kişisel sergisini açmıştır. Sergisi sanat çevrelerinden olumlu eleştiriler almış ve eserleri sanatseverlerin ilgisini çekmiştir.',
            resim: 'sanatci1.jpg',
            eserler: [
                { ad: 'Resim 4', resim: 'resim4_kucuk.jpg' }, 
                { ad: 'resim 8', resim: 'resim8_kucuk.jpg' },
                { ad: 'Resim 9', resim: 'resim9_kucuk.jpg' }
            ]
        }
        // Daha fazla sanatçı verisi buraya eklenebilir
       
    };

    // URL'den sanatçı ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const sanatciId = urlParams.get('id');

    // Sanatçı ID'sine göre verileri bul ve sayfayı güncelle
    if (sanatciId && sanatciVerileri[sanatciId]) {
        const sanatci = sanatciVerileri[sanatciId];

        // Sanatçı resmini güncelle
        if (sanatciResim) {
            sanatciResim.src = sanatci.resim;
            sanatciResim.alt = sanatci.ad;
        }

        // Diğer bilgileri güncelle
        if (sanatciAdi) {
            sanatciAdi.textContent = sanatci.ad;
        }
        if (sanatciDogumDeger) {
            sanatciDogumDeger.textContent = sanatci.dogum;
        }
        if (sanatciEgitimDeger) {
            sanatciEgitimDeger.textContent = sanatci.egitim;
        }
        if (sanatciBiyografi) {
            sanatciBiyografi.textContent = sanatci.biyografi;
        }

        // Eserleri listelemeden önce mevcut listeyi temizle
        if (sanatciEserleriListe) {
            sanatciEserleriListe.innerHTML = '';
            if (sanatci.eserler && sanatci.eserler.length > 0) {
                sanatci.eserler.forEach(eser => {
                    const li = document.createElement('li');
                    const img = document.createElement('img');
                    img.src = eser.resim;
                    img.alt = eser.ad;
                    li.appendChild(img);
                    sanatciEserleriListe.appendChild(li);
                });
            } else {
                // Eser yoksa bilgi mesajı göster
                const noArtworksMessage = document.createElement('p');
                noArtworksMessage.textContent = "Bu sanatçının henüz eseri bulunmamaktadır.";
                sanatciEserleriListe.appendChild(noArtworksMessage);
            }
        }

    } else {
        // Sanatçı bulunamadığında tüm içerik bölümünü gizle ve hata mesajı göster
        if (sanatciBilgiUst) sanatciBilgiUst.style.display = 'none';
        if (sanatciEserleriBolumu) sanatciEserleriBolumu.style.display = 'none';

        const mainBolumu = document.querySelector('main.sanatci-detay-container');
        if (mainBolumu) {
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.innerHTML = '<h2>Sanatçı Bulunamadı</h2><p>Geçersiz bir sanatçı ID\'si girdiniz veya böyle bir sanatçı bulunmamaktadır.</p>';
            errorMessageDiv.style.textAlign = 'center';
            errorMessageDiv.style.padding = '40px';
            errorMessageDiv.style.backgroundColor = '#fff';
            errorMessageDiv.style.borderRadius = '8px';
            errorMessageDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            
            mainBolumu.appendChild(errorMessageDiv);
        }
    }
});