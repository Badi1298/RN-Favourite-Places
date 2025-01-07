export class Place {
    public id: string;

    constructor(
        public title: string,
        public imageUri: string,
        public location: { lat: number; lng: number; address: string }
    ) {
        this.id = new Date().toISOString() + Math.random().toString();
        this.title = title;
        this.imageUri = imageUri;
        this.location = location;
    }
}

export type PlaceType = {
    id: string;
    title: string;
    imageUri: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
};
