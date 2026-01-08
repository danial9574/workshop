export interface Freezer {
  id: string;
  name: string;
  faecher: Fach[];
}

export interface Fach {
  id: string;
  nummer: number;
  bezeichnung?: string;
}

export interface Food {
  id: string;
  name: string;
  freezerId: String;
  fachNumber: number;
  bezeichnung?: string;
  photo?: any | null;
  date: String | null;
}