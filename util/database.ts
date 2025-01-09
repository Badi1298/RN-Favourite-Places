import * as SQLite from 'expo-sqlite';

import { Place } from '../types/places';

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

export async function fetchPlaces(): Promise<Place[]> {
    const allRows: Place[] = await db.getAllAsync('SELECT * FROM places');

    return allRows;
}

export async function fetchPlace(id: string): Promise<Place> {
    const place: Place | null = await db.getFirstAsync('SELECT * FROM places WHERE id = ?;', [id]);

    if (!place) {
        throw new Error(`Place with id ${id} not found`);
    }

    return place;
}

export async function insertPlace(
    title: string,
    imageUri: string,
    address: string,
    lat: number,
    lng: number
) {
    try {
        await db.runAsync(
            'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
            [title, imageUri, address, lat, lng]
        );
    } catch (error) {
        console.error('Error inserting place', error);
    }
}

export async function deletePlace(id: number) {
    try {
        await db.runAsync('DELETE FROM places WHERE id = ?;', [id]);
    } catch (error) {
        console.error('Error deleting place', error);
    }
}
