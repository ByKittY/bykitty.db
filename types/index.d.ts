declare module 'bykitty.db' {
export class JsonDatabase<V> {
public static arrayDatabase: [V | JsonDatabase<V>]: V;
private static dataPath: { [data: string]: V };
public constructor(dataBasePath?: string);
public dataBasePath: string;

public writeData(): V;
public set(data: string, value: V) V;
public push(data: string, value: any): V;
public add(data: string, value: number): V;
public substract(data: string, value: number): V;
public fetch(data: string): V;
public get(data: string): V;
public backup(filePath: string): V;
public fetchAll(): V;
public all(limit?: number): Array<{ ID: string, Data: V }>;
public has(data: string): boolean;
public includes(data: string): Array<{ ID: string, Data: V }>;
public math(data: string, islem: '+' | '-' | '*' | '/' | '^', value: number): V;
public type(data: string):  'array' | 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'object' | 'function' | 'undefined';
public size(): number;
public version(): string;
public fileName(): string;
public startsWith(data: string): Array<{ ID: string, Data: V }>;
public endsWith(data: string): Array<{ ID: string, Data: V }>;
public arrayHas(data: string): boolean;
public keyArray(): string[];
public valueArray(): V[];
public delete(data: string): void;
public unset(data: string): void;
public deleteIncludes(data: string): void;
public deleteAll(): void;
public destroy(): void;
};

export class YamlDatabase<V> {
public static arrayDatabase: [V | YamlDatabase<V>]: V;
private static dataPath: { [data: string]: V };
public constructor(dataBasePath?: string);
public dataBasePath: string;

public writeData(): V;
public set(data: string, value: V) V;
public push(data: string, value: any): V;
public add(data: string, value: number): V;
public substract(data: string, value: number): V;
public fetch(data: string): V;
public get(data: string): V;
public backup(filePath: string): V;
public fetchAll(): V;
public all(limit?: number): Array<{ ID: string, Data: V }>;
public has(data: string): boolean;
public includes(data: string): Array<{ ID: string, Data: V }>;
public math(data: string, islem: '+' | '-' | '*' | '/' | '^', value: number): V;
public type(data: string):  'array' | 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'object' | 'function' | 'undefined';
public size(): number;
public version(): string;
public fileName(): string;
public startsWith(data: string): Array<{ ID: string, Data: V }>;
public endsWith(data: string): Array<{ ID: string, Data: V }>;
public arrayHas(data: string): boolean;
public keyArray(): string[];
public valueArray(): V[];
public delete(data: string): void;
public unset(data: string): void;
public deleteIncludes(data: string): void;
public deleteAll(): void;
public destroy(): void;
};

export class DatabaseError extends Error {
public constructor(redMessage: string);
public get name(): string;
};
};