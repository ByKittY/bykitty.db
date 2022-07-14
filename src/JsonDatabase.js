const { readFileSync, writeFileSync, existsSync, unlinkSync } = require('fs');
const { set, get, unset } = require('lodash');
const Error = require('./Error.js');

class JsonDatabase {
static arrayDataBase = [];
static dataPath = {};

constructor(dataBasePath) {
this.Database = dataBasePath || './Database.json';

if (typeof this.Database !== 'string') throw new Error('Girdiğiniz JSON Dosyasının Adı String Tipinde Olmak Zorundadır!');
if (!this.Database.startsWith('./')) this.Database = './' + this.Database;
if (!this.Database.endsWith('.json')) this.Database = this.Database + '.json';

if (!existsSync(this.Database)) {
writeFileSync(this.Database, JSON.stringify({}), 'UTF-8');
} else {
JsonDatabase.dataPath = JSON.parse(readFileSync(this.Database, 'UTF-8'));
};

const repeatClass = JsonDatabase.arrayDataBase.find((data) => {
return data.fileName === this.fileName
});
if (!repeatClass) return JsonDatabase.arrayDataBase.push(this);
};

writeData() {
writeFileSync(this.Database, JSON.stringify(JsonDatabase.dataPath, null, 4), 'UTF-8');
};

set(data, value) {
if (!data) throw new Error('Bir Veri Girmelisiniz!');
if (!value) throw new Error('Bir Değer Girmelisiniz!');
if (typeof data !== 'string') return;
if (value === undefined || value === null) return;   

set(JsonDatabase.dataPath, data, value);
return this.writeData();
};

push(data, value) {
if (!data) throw new Error('Bir Veri Girmelisiniz!');
if (!value) throw new Error('Bir Değer Girmelisiniz!');
if (typeof data !== 'string') return;
if (value === undefined || value === null) return;   

if (Array.isArray(JsonDatabase.dataPath[data])) {
JsonDatabase.dataPath[data].push(value);
return this.writeData();
} else {
return this.set(data, [value]);
};
};

add(data, value) {
this.math(data, '+', value);
};

substract(data, value) {
this.math(data, '-', value);
};

divide(data, value) {
this.math(data, '/', value);
};
multiply(data, value) {
this.math(data, '*', value);
};
fetch(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (typeof data !== 'string') return;
if (typeof JsonDatabase.dataPath[data] !== 'string') return JsonDatabase.dataPath[data];
if (!JsonDatabase.dataPath[data]) return;
return JsonDatabase.dataPath[data] ? JsonDatabase.dataPath[data] : null;
};

get(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (typeof data !== 'string') return;
if (typeof JsonDatabase.dataPath[data] !== 'string') return get(JsonDatabase.dataPath, data);
if (!JsonDatabase.dataPath[data]) return;
return get(JsonDatabase.dataPath, data) ? get(JsonDatabase.dataPath, data) : null;
};

backup(filePath) {
filePath = filePath || 'JsonDatabase Backup';
if (!filePath) throw new Error('Yedeklemek İstediğiniz JSON Dosyasının Adını Girmelisiniz.');
if (typeof filePath !== 'string') throw new Error('Girdiğiniz JSON Dosyasının Adı String Tipinde Olmak Zorundadır!');
if (!filePath.startsWith('./')) filePath = './' + filePath;
writeFileSync(filePath, JSON.stringify(JsonDatabase.dataPath, null, 4), 'UTF-8');
return;
};

fetchAll() {
return JsonDatabase.dataPath;
};

all(limit = 0) {
if (isNaN(limit) || typeof limit != 'number') throw new Error('Girdiğiniz Limit Sayı Tipinde Olmak Zorundadır!');
const arr = [];
for (const data in JsonDatabase.dataPath) {
const keys = {
ID: data, 
Data: JsonDatabase.dataPath[data]
};
arr.push(keys);
};
return limit > 0 ? arr.splice(0, limit) : arr;
};

has(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
return JsonDatabase.dataPath.hasOwnProperty(data);
};

includes(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
return this.all().filter((key) => key.ID.includes(data));
};

math(data, operator, value) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (!operator) throw new Error('Bir İşlem Girmelisiniz.');
if (!value) throw new Error('Bir Değer Girmelisiniz.');
if (isNaN(value) || typeof value != 'number') throw new Error('Girdiğiniz Değer Sayı Tipinde Olmak Zorundadır!');

value = Number(value);
JsonDatabase.dataPath[data] = Number(JsonDatabase.dataPath[data]);
switch (operator) {

case '+':
if (!JsonDatabase.dataPath[data] || JsonDatabase.dataPath[data] === 0) return this.set(data, Number(value));
JsonDatabase.dataPath[data] += Number(value);
return this.writeData();
break;

case '-':
if (!JsonDatabase.dataPath[data] || JsonDatabase.dataPath[data] === 0) return;
if (JsonDatabase.dataPath[data] <= 0) return JsonDatabase.dataPath[data] = 0;
JsonDatabase.dataPath[data] -= Number(value);
return this.writeData();
break;

case '*':
if (!JsonDatabase.dataPath[data] || JsonDatabase.dataPath[data] === 0) return;
if (JsonDatabase.dataPath[data] <= 0) return JsonDatabase.dataPath[data] = 0;
JsonDatabase.dataPath[data] *= Number(value);
return this.writeData();
break;

case '/':
if (!JsonDatabase.dataPath[data] || JsonDatabase.dataPath[data] === 0) return;
if (JsonDatabase.dataPath[data] <= 0) return JsonDatabase.dataPath[data] = 0;
JsonDatabase.dataPath[data] /= Number(value);
return this.writeData();
break;

case '^':
if (!JsonDatabase.dataPath[data] || JsonDatabase.dataPath[data] === 0) return;
if (JsonDatabase.dataPath[data] <= 0) return JsonDatabase.dataPath[data] = 0;
JsonDatabase.dataPath[data] ^= Number(value);
return this.writeData();
break;
};
};

type(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (Array.isArray(this.fetch(data))) return 'Array';
if (typeof this.fetch(data) === 'string') return 'String';
if (typeof this.fetch(data) === 'number') return 'Number';
if (typeof this.fetch(data) === 'bigint') return 'Bigint';
if (typeof this.fetch(data) === 'boolean') return 'Boolean';
if (typeof this.fetch(data) === 'symbol') return 'Symbol';
if (typeof this.fetch(data) === 'object') return 'Object';
if (typeof this.fetch(data) === 'function') return 'Function';
if (typeof this.fetch(data) === 'undefined') return 'Undefined';
};

size() {
return this.all().length;
};

version() {
return require('../package.json').version;
};

olustur() {
    fs.appendFile('bykitty.json', '{}\n', (err) => {
        if (err)
            throw err;
    });
};
sil() {
    if(!dataBasePath) throw new Error('Veritabanı dosyası zaten yok.');
}
fileName() {
const splited = this.Database.split('/');
return splited[splited.length - 1];
};

startsWith(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
return this.all().filter((key) => key.ID.startsWith(data));
};

endsWith(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
return this.all().filter((key) => key.ID.endsWith(data));
};

arrayHas(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
return Boolean(Array.isArray(this.fetch(data)));
};

keyArray() {
return this.all().map((key) => key.ID);
};

valueArray() {
return this.all().map((value) => value.Data);
};

delete(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (typeof data !== 'string') return;
if (!JsonDatabase.dataPath[data]) return;

if (JsonDatabase.dataPath[data]) {
delete(JsonDatabase.dataPath[data]);
} else {
unset(JsonDatabase.dataPath, data)
};
return this.writeData();
};

unset(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (typeof data !== 'string') return;
if (!JsonDatabase.dataPath[data]) return;

if (JsonDatabase.dataPath[data]) {
unset(JsonDatabase.dataPath, data)
};
return this.writeData();
};

deleteIncludes(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
return this.all()
.filter((key) => key.ID.includes(data))
.forEach((key) => {
this.delete(key.ID);
});
};

deleteAll() {
JsonDatabase.dataPath = {};
this.writeData();
return;
};

destroy() {
return unlinkSync(this.Database);
};
};

module.exports = JsonDatabase