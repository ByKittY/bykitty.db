const { readFileSync, writeFileSync, existsSync, unlinkSync } = require('fs');
const { set, get, unset } = require('lodash');
const YAML = require('yaml');
const Error = require('./Error.js');

class YamlDatabase {
static arrayDataBase = [];
static dataPath = {};

constructor(dataBasePath) {
this.Database = dataBasePath || './Database.yaml';

if (typeof this.Database !== 'string') throw new Error('Girdiğiniz YAML Dosyasının Adı String Tipinde Olmak Zorundadır!');
if (!this.Database.startsWith('./')) this.Database = './' + this.Database;
if (!this.Database.endsWith('.yaml')) this.Database = this.Database + '.yaml';

if (!existsSync(this.Database)) {
writeFileSync(this.Database, YAML.stringify(""), 'UTF-8');
} else {
YamlDatabase.dataPath = YAML.parse(readFileSync(this.Database, 'UTF-8'));
};

const repeatClass = YamlDatabase.arrayDataBase.find((data) => {
return data.fileName === this.fileName 
});
if (!repeatClass) return YamlDatabase.arrayDataBase.push(this);
};

writeData() {
writeFileSync(this.Database, YAML.stringify(YamlDatabase.dataPath, null, 4), 'UTF-8');
};

set(data, value) {
if (!data) throw new Error('Bir Veri Girmelisiniz!');
if (!value) throw new Error('Bir Değer Girmelisiniz!');
if (typeof data !== 'string') return;
if (value === undefined || value === null) return;   

set(YamlDatabase.dataPath, data, value);
return this.writeData();
};

push(data, value) {
if (!data) throw new Error('Bir Veri Girmelisiniz!');
if (!value) throw new Error('Bir Değer Girmelisiniz!');
if (typeof data !== 'string') return;
if (value === undefined || value === null) return;   

if (Array.isArray(YamlDatabase.dataPath[data])) {
YamlDatabase.dataPath[data].push(value);
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

fetch(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (typeof data !== 'string') return;
if (typeof YamlDatabase.dataPath[data] !== 'string') return YamlDatabase.dataPath[data];
if (!YamlDatabase.dataPath[data]) return;
return YamlDatabase.dataPath[data] ? YamlDatabase.dataPath[data] : null;
};

get(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (typeof data !== 'string') return;
if (typeof YamlDatabase.dataPath[data] !== 'string') return get(YamlDatabase.dataPath, data);
if (!YamlDatabase.dataPath[data]) return;
return get(YamlDatabase.dataPath, data) ? get(YamlDatabase.dataPath, data) : null;
};

backup(filePath) {
filePath = filePath || 'YamlDatabase Backup';
if (!filePath) throw new Error('Yedeklemek İstediğiniz YAML Dosyasının Adını Girmelisiniz.');
if (typeof filePath !== 'string') throw new Error('Girdiğiniz YAML Dosyasının Adı String Tipinde Olmak Zorundadır!');
if (!filePath.startsWith('./')) filePath = './' + filePath;
writeFileSync(filePath, YAML.stringify(YamlDatabase.dataPath, null, 4), 'UTF-8');
return;
};

fetchAll() {
return YamlDatabase.dataPath;
};

all(limit = 0) {
if (isNaN(limit) || typeof limit != 'number') throw new Error('Girdiğiniz Limit Sayı Tipinde Olmak Zorundadır!');
const arr = [];
for (const data in YamlDatabase.dataPath) {
const keys = {
ID: data, 
Data: YamlDatabase.dataPath[data]
};
arr.push(keys);
};
return limit > 0 ? arr.splice(0, limit) : arr;
};

has(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
return YamlDatabase.dataPath.hasOwnProperty(data);
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
YamlDatabase.dataPath[data] = Number(YamlDatabase.dataPath[data]);
switch (operator) {

case '+':
if (!YamlDatabase.dataPath[data] || YamlDatabase.dataPath[data] === 0) return this.set(data, Number(value));
YamlDatabase.dataPath[data] += Number(value);
return this.writeData();
break;

case '-':
if (!YamlDatabase.dataPath[data] || YamlDatabase.dataPath[data] === 0) return;
if (YamlDatabase.dataPath[data] <= 0) return YamlDatabase.dataPath[data] = 0;
YamlDatabase.dataPath[data] -= Number(value);
return this.writeData();
break;

case '*':
if (!YamlDatabase.dataPath[data] || YamlDatabase.dataPath[data] === 0) return;
if (YamlDatabase.dataPath[data] <= 0) return YamlDatabase.dataPath[data] = 0;
YamlDatabase.dataPath[data] *= Number(value);
return this.writeData();
break;

case '/':
if (!YamlDatabase.dataPath[data] || YamlDatabase.dataPath[data] === 0) return;
if (YamlDatabase.dataPath[data] <= 0) return YamlDatabase.dataPath[data] = 0;
YamlDatabase.dataPath[data] /= Number(value);
return this.writeData();
break;

case '^':
if (!YamlDatabase.dataPath[data] || YamlDatabase.dataPath[data] === 0) return;
if (YamlDatabase.dataPath[data] <= 0) return YamlDatabase.dataPath[data] = 0;
YamlDatabase.dataPath[data] ^= Number(value);
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
if (!YamlDatabase.dataPath[data]) return;

if (YamlDatabase.dataPath[data]) {
delete(YamlDatabase.dataPath[data]);
} else {
unset(YamlDatabase.dataPath, data)
};
return this.writeData();
};

unset(data) {
if (!data) throw new Error('Bir Veri Girmelisiniz.');
if (typeof data !== 'string') return;
if (!YamlDatabase.dataPath[data]) return;

if (YamlDatabase.dataPath[data]) {
unset(YamlDatabase.dataPath, data)
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
YamlDatabase.dataPath = {};
this.writeData();
return;
};

destroy() {
return unlinkSync(this.Database);
};
};

module.exports = YamlDatabase