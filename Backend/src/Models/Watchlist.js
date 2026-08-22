import mongoose from "mongoose";

const watchlistschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

const Watchlist = mongoose.model("Watchlist",watchlistschema);
export default Watchlist