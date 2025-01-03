class Place {
    public id: string;

    constructor(
        public title: string,
        public address: string,
        public imageUri: string,
        public location: { lat: number; lng: number }
    ) {
        this.id = new Date().toISOString() + Math.random().toString();
        this.title = title;
        this.address = address;
        this.imageUri = imageUri;
        this.location = location;
    }
}
