export type RoomDetailType = {
  description: string;
  specifics: {
    benifits: string[];
    price: number;
    occupant_count: number;
  };
  photos: string[];
};
