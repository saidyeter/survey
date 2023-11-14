# survey

## todo

- tum sorulari kopyalamayi ekle
- kopyalama islemleri sonrasinda toast cikar
- soru edit ekle
- anket sil
- anket baslik bilgilerini duzenle
- baslatma/bitirme/silme icin onay cikar

- anket sayfasini duzenle
- anket bitince tekrar anasayfada ankete basla diye gosterme ???
- anket bitiminde rapor olusturmayi baslat
- coklu secimi implemente et
- cevap aciklamasini implemente et
- zorunlu cevap vermeyi implemente et
- zorunlu olmayanlari cevap vermeden gecmeyi implemente et
- anket ekranin soru numaralarini yaz
- anket ekraninda anket ismi ve aciklamasi olacak
- ankete baslarken eczane GL kodu son 6 hanesi girilecek
- giris yapinca direk admine gitsin
- giris butonunu kaldir
- raporda sifir da olsa tum secenekleri goster
- aktif ankette typo icin edit olmali
- raporu indirme ekle
- gorselli soru yok
- aktif ankette kac kisi basladi kac kisi tamamladi


## issues

- Fix hardcoded url on redirection to `/survey/complete`


## tools

docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=my_p@ssW0rd' -p 1433:1433 --name azuresqledge -d mcr.microsoft.com/azure-sql-edge
