using System.Globalization;
using System.Text;

namespace SurveyApi;

public class Faker
{
    public IEnumerable<FakeQuestionData> GetFakeQuestions()
    {
        string[] qs =
        {
            "2023 FİRMA-ECZANE İLETİŞİM ÖDÜLÜ|Firma",
            "2023 FARMAKOKİNETİK İNOVASYON ÖDÜLÜ|Inovasyon",
            "2023 ETKİLİ KOMBİNASYON ÜRÜNÜ|Ürün",
            "2023 SOSYAL SORUMLULUK PROJESİ|Proje",
            "2023 EN İYİ DERMOKOZMETİK FİRMASI|Fi̇rma",
            "2023 ANNE BEBEK DOSTU FİRMA|Fi̇rma",
            "2023 TAKVİYE EDİCİ GIDA FİRMASI|Fi̇rma",
            "2023 EN İYİ ÇIKIŞ YAPAN FİRMA|Fi̇rma",
            "2023 SAÇ BAKIM ÜRÜNÜ|Ürün",
            "2023 AĞIZ DİŞ BAKIM ÜRÜNÜ|Ürün",
            "2023 ÇOCUK SAĞLIĞI ÜRÜNÜ|Ürün",
            "2023 MULTİVİTAMİN ÜRÜNÜ|Ürün",
            "2023 CİLT SAĞLIĞI ÜRÜNÜ|Ürün",
            "2023 EKLEM KAS SAĞLIĞI ÜRÜNÜ|Ürün",
            "2023 GÖZ SAĞLIĞI ÜRÜNÜ|Ürün",
            "2023 ECZANE TASARIM ÖDÜLÜ|Ödül",
        };


        var random = new Random();
        foreach (var q in qs)
        {
            var t = q.Split('|')[0];
            var a = q.Split('|')[1];
            yield return new FakeQuestionData
            {
                Text = t,
                Answers = Enumerable
                .Range(1, random.Next(3, 10))
                .Select(i => a + " " + i)
                .ToArray()
            };
        }
    }

    public IEnumerable<FakeUserData> GetFakeUser()
    {
        var providers = new string[]
        {
            "@gmail.com",
            "@hotmail.com",
            "@mynet.com.tr",
            "@yahoo.com",
            "@mynet.com",
            "@msn.com",
        };
        var random = new Random();
        foreach (var u in users)
        {
            var firstname = u.Split(',')[0];
            var lastname = u.Split(',')[1];

            var firstname_normalized = string.Join("", firstname.Normalize(NormalizationForm.FormD).Where(c => char.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark));
            var lastname_normalized = string.Join("", lastname.Normalize(NormalizationForm.FormD).Where(c => char.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark));

            var separator = firstname.Length % 2 == 0 ? "." : "_";
            var emailprovider = providers[random.Next(providers.Length)];
            var email = string.Concat(firstname_normalized.ToLower(), separator, lastname_normalized.ToLower(), emailprovider);



            var code = "8680001" + random.Next(111111, 999999).ToString();
            var name = random.Next(1, 10) % 2 == 0 ? firstname : lastname;
            var title = random.Next(1, 10) % 2 == 0 ? "ECZANE " + name : name + " ECZANESI";
            var city = cities[random.Next(cities.Length)];
            yield return new FakeUserData
            {
                Code = code,
                Title = title,
                City = city,
                Subcity = city + " ilce 1",
                Email = email
            };
        }
    }

    #region data

    string[] users =
    {
        "FATMA,ŞEN",
        "AYŞE,KANDEMİR",
        "EMİNE,ÇEVİK",
        "HATİCE,ERKURAN",
        "ZEYNEP,TÜTEN",
        "MERYEM,ÖZTÜRK",
        "ŞERİFE,YÜZBAŞIOĞLU",
        "SULTAN,VURAL",
        "HANİFE,YÜCEL",
        "ELİF,SÖNMEZ",
        "FADİME,ERTEKİN",
        "HAVVA,DEDE",
        "CEMİLE,UYANIK",
        "ZELİHA,ASLAN",
        "ZEHRA,AKBULUT",
        "SEVİM,ORHON",
        "HACER,UZ",
        "HAYRİYE,YAVUZ",
        "KADRİYE,ERDEM",
        "GÜLSÜM,KULAÇ",
        "AYSEL,KAYA",
        "HALİME,SELVİ",
        "HANIM,AKPINAR",
        "ASİYE,ABACIOĞLU",
        "HAVA,ÇAY",
        "DÖNDÜ,IŞIK",
        "LEYLA,ÖZER",
        "MELEK,ÖZDEMİR",
        "ZEKİYE,ÖZTÜRK",
        "KEZİBAN,TAHTACI",
        "NACİYE,BÜYÜKCAM",
        "HÜLYA,KULAKSIZ",
        "NURİYE,AKSEL",
        "AYTEN,EROĞLU",
        "AYNUR,KARAKUM",
        "MAKBULE,DAL",
        "SANİYE,ÖCAL",
        "TÜRKAN,AYHAN",
        "GÜLLÜ,YİĞİT",
        "NAZMİYE,YARBİL",
        "DUDU,CANACANKATAN",
        "SAFİYE,GÜMÜŞAY",
        "ÖZLEM,MURT",
        "HAMİDE,HALHALLI",
        "HURİYE,ULUÖZ",
        "FERİDE,ŞEYHANLI",
        "RUKİYE,ÇALIŞKANTÜRK",
        "YASEMİN,YILMAZ",
        "ŞÜKRAN,SARAÇOĞLU",
        "REMZİYE,SEZER",
        "CEMALETTİN,ALTUNÖZ",
        "SERHAT,GAZİ",
        "NAZİF,ARSLAN",
        "BASRİ,İNSELÖZ",
        "ERGÜN,KOCA",
        "TALİP,YEŞİLKAYA",
        "EMRULLAH,ÜNAL",
        "HAYATİ,TAŞ",
        "FAZLI,UYSAL",
        "ATİLLA,DEVECİ",
        "RİZA,ACAR",
        "ESAT,SİL",
        "CAVİT,ÜNGÜR",
        "KADRİ,KÜTÜKOĞLU",
        "NECMİ,EROĞLU",
        "BİROL,ERDOĞAN",
        "SEZAİ,TUNÇ",
        "İLHAMİ,GÜMÜRDÜ",
        "NADİR,KASKALAN",
        "CUMALİ,OLCAR",
        "FEYZİ,ÇAKMAK",
        "KAYA,ALBAY",
        "ALPER,AYDIN",
        "ALAATTİN,DOĞAN",
        "NUSRET,ALBEN",
        "RÜSTEM,AVCI",
        "ERTUĞRUL,AK",
        "DURDU,ÖZBEK",
        "SAİM,TEMURTAŞ",
        "VEYSİ,TURAN",
        "EYYÜP,ÜÇGÜL",
        "LATİF,EKİNCİ",
        "TOLGA,ERDOĞMUŞ",
        "BEŞİR,ALTAŞ",
        "NURULLAH,KAÇIRA",
        "HULUSİ,KANKILIÇ",
        "SEMİH,OYNAK",
        "TARIK,YAKUT",
        "CÜNEYT,BERENT",
        "ASLAN,SUZAN",
        "SITKI,KARDAŞ",
        "TAMER,KAYA",
        "OKAN,ASLAN",
        "BÜNYAMİN,KANKILIÇ",
        "FEYZULLAH,YILMAZ",
        "HİMMET,ÜZEN",
        "SAMET,GÜLLÜ",
        "NAİM,SERT",
        "İZZETTİN,DEMİRER",
        "RIFAT,ÇAKMAK",
    };
    string[] cities =
    {
        "Adana",
        "Adıyaman",
        "Afyonkarahisar",
        "Ağrı",
        "Aksaray",
        "Amasya",
        "Ankara",
        "Antalya",
        "Ardahan",
        "Artvin",
        "Aydın",
        "Balıkesir",
        "Bartın",
        "Batman",
        "Bayburt",
        "Bilecik",
        "Bingöl",
        "Bitlis",
        "Bolu",
        "Burdur",
        "Bursa",
        "Çanakkale",
        "Çankırı",
        "Çorum",
        "Denizli",
        "Diyarbakır",
        "Düzce",
        "Edirne",
        "Elazığ",
        "Erzincan",
        "Erzurum",
        "Eskişehir",
        "Gaziantep",
        "Giresun",
        "Gümüşhane",
        "Hakkâri",
        "Hatay",
        "Iğdır",
        "Isparta",
        "İstanbul",
        "İzmir",
        "Kahramanmaraş",
        "Karabük",
        "Karaman",
        "Kars",
        "Kastamonu",
        "Kayseri",
        "Kırıkkale",
        "Kırklareli",
        "Kırşehir",
        "Kilis",
        "Kocaeli",
        "Konya",
        "Kütahya",
        "Malatya",
        "Manisa",
        "Mardin",
        "Mersin",
        "Muğla",
        "Muş",
        "Nevşehir",
        "Niğde",
        "Ordu",
        "Osmaniye",
        "Rize",
        "Sakarya",
        "Samsun",
        "Siirt",
        "Sinop",
        "Sivas",
        "Şanlıurfa",
        "Şırnak",
        "Tekirdağ",
        "Tokat",
        "Trabzon",
        "Tunceli",
        "Uşak",
        "Van",
        "Yalova",
        "Yozgat",
        "Zonguldak"
    };
    #endregion
}
public class FakeUserData
{
    public string Code { get; set; }
    public string Title { get; set; }
    public string City { get; set; }
    public string Subcity { get; set; }
    public string Email { get; set; }
}
public class FakeQuestionData
{
    public string Text { get; set; }
    public string[] Answers { get; set; }
}