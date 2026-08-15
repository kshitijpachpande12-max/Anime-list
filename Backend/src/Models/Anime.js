import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

const Anime = mongoose.model("Anime",animeSchema);
export default Anime;