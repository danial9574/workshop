export interface Detail {
    title: string;
    notice: string;
}

export interface Photo {
    photo: any;
}

export interface Artikel {
    id: string;
    detail: Detail;
    photo: Photo;
    duration: any;
    firstPrice: number;
}