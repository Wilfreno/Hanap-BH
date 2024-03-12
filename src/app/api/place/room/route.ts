import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import Room from "@/lib/database/model/Room";
import { RoomDetailType } from "@/lib/types/google-place-api/room-types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const form_data = await request.json();
    await dbConnect();

    const rooms = form_data.rooms.map(async (room: RoomDetailType) => {
      const new_room = new Room({
        description: room.description,
        specifics: {
          benifits: room.specifics.benifits,
          price: room.specifics.price,
          occupant_count: room.specifics.occupant_count,
        },
        photos: room.photos,
      });

      await new_room.save();

      new_room.toJSON();
      return new_room._id;
    });

    await PlaceDetail.updateOne(
      { place_id: form_data.place_id },
      {
        $set: {
          rooms,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
