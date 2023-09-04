export type RoomDetailType = {
  description: string;
  vacancy: number;
  photo: string[];
  price: {
    max: number;
    min: number;
  };
};
