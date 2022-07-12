

npm install bykitty.db




# Kurulum
```javascript
//----------------------------JSON----------------------------\\

const { JsonDatabase, YamlDatabase } = require('bykitty.db');
const db = new JsonDatabase('Database');

//----------------------------YAML----------------------------\\

const { JsonDatabase, YamlDatabase } = require('bykitty.db');
const db = new YamlDatabase('Database');

//------------------------------------------------------------\\
```

# Veriyi Kaydetme Methodları
```js
db.set('Veri', 'Değer'); // --> Veriyi Kaydeder.
db.push('Veri', 'Değer'); // --> Veriyi Array Olarak Kaydeder.
```


# Veriyi Çekme Methodları
```js
db.fetch('Veri'); // --> Veriyi Çeker.
db.get('Veri'); // --> Veriyi Çeker.
```


# Veriyi Silme methodları
```js
db.delete('Veri'); // --> Kaydedilmiş Olan Veriyi Siler.
db.unset('Veri'); // --> Kaydedilmiş Olan Veriyi Siler.
db.deleteIncludes('Veri'); // --> Girdiğiniz Verinin Adını İçeren Bütün Verileri Siler.
db.deleteAll(); // --> Veritabanında Bulunan Bütün Verileri Siler.
db.destroy(); // --> Veritabanı Dosyasını Siler.
```
# Boolean Methodları
```js
db.has('Veri'); // --> Verinin Veritabanında Olup Olmadığını Kontrol Eder.
db.arrayHas('Veri'); // --> Verinin Array Olup Olmadığını Kontrol Eder.
```


# Veriyi Bulma Methodları
```js
db.fetchAll(); // --> Veritabanında Bulunan Bütün Verileri Çeker.
db.all() || db.all(5); // --> Veritabanında Bulunan Bütün Verileri Array İçine Ekler Ve Çeker.
db.includes('Veri'); // --> Girdiğiniz Verinin Adını İçeren Bütün Verileri Array İçine Ekler.
db.startsWith('Veri'); // --> Girdiğiniz Verinin Adı İle Başlayan Bütün Verileri Array İçine Ekler.
db.endsWith('Veri'); // --> Girdiğiniz Verinin Adı İle Biten Bütün Verileri Array İçine Ekler.
db.keyArray(); // --> Veritabanında Bulunan Bütün Verileri Değerleri Olmadan Array İçine Ekler.
db.valueArray(); // --> Veritabanında Bulunan Bütün Verilerin Değerlerini Array İçine Ekler.
```


# Matematik Methodları
```js
db.add('Veri', 5); // --> Veriye Girdiğiniz Sayıyı Ekler.
db.substract('Veri', 5); // --> Kaydedilmiş Olan Veriden Girdiğiniz Sayıyı Çıkarır.
db.math('Veri', '*', 5); // --> Kaydedilmiş Olan Veride Matematik İşlemi Yapar.
```


# Bilgilendirme Methodları
```js
db.type('Veri'); // --> Verinin Tipini Gösterir.
db.size(); // --> Veritabanında Bulunan Toplam Veri Sayısını Gösterir.
db.version(); // --> Modül Sürümünü Gösterir.
db.fileName(); // --> Veritabanı Dosyasının Adını Gösterir.
db.backup() || db.backup('JsonDatabase'); // --> Veritabanı Dosyasının Yedeğini Alır.
```







# 💬 İletişim
[Discord](https://discord.gg/UwPZm6p4rH)
