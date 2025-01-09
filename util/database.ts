import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('places.db');

export async function init() {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL, 
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            );
        `);
    } catch (error) {
        console.error('Error creating table', error);
    }
}
