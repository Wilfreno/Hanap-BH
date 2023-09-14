import { Schema, models, model } from "mongoose";

const RatingSchema: Schema = new Schema({
  place_id: {
    type: String,
    required: true,
  },
  rating_value: {
    type: Number,
    required: true,
  },
});

export default models.Rating || model("Rating", RatingSchema);
