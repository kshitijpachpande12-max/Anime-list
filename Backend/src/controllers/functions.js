import Anime from "../Models/Anime.js";
import Watchlist from "../Models/Watchlist.js";

export async function getAll(req,res) {
    try {
        const animes = await Anime.find().sort({rating:-1});
        res.status(200).json(animes);
    } catch (error) {
        res.status(500).json({message: "internal server error"});
        console.error("error in getting all animes",error);
    }
};

export async function getById(req,res) {
    try {
        const anime = await Anime.findById(req.params.id);
        if(!anime) return res.status(404).json({message: "Anime not found"});
        res.status(200).json(anime);
    } catch (error) {
        res.status(500).json({message: "internal server error"});
        console.error("error in getting the animes",error);
    }
};

export async function createRating(req,res) {
    try {
        const {title,synopsis,rating,img} = req.body;
        const anime = new Anime({title,synopsis,rating,img});
        const saved = await anime.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({message: "internal server error"});
        console.error("error in creating rating for anime",error);
    }
};

export async function modifyRating(req,res) {
    try {
        const {title,synopsis,rating,img} = req.body;
        const modified = await Anime.findByIdAndUpdate(req.params.id,{title,synopsis,rating,img},{new: true,});
        if(!modified) return res.status(404).json({message: "Anime not found"});
        res.status(200).json(modified);
    } catch (error) {
        res.status(500).json({message: "internal server error"});
        console.error("error in modifying anime",error);
    }
};

export async function deleteRating(req,res) {
    try {
        const deleted = await Anime.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: "Anime not found"});
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({message: "internal server error"});
        console.error("error in deleting anime",error);
    }
};

export async function searchAnime(req, res) {
    try {
        const title = req.params.title;
        const response = await fetch(
            `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`
        );
        if (!response.ok) {
            return res.status(response.status).json({
                message: "Kitsu API error"
            });
        }
        const data = await response.json();
        res.status(200).json(data.data);
    } catch (error) {
        console.error("Error searching anime:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function watchlistanime(req,res){
    try {
        const watchlistAnimes = await Watchlist.find().sort({createdAt : -1});
        res.status(200).json(watchlistAnimes);
    } catch (error) {
        res.status(500).json({message : "internal server error"});
        console.error(error);
    }
};

export async function Addtowatchlist(req,res){
    try {
        const {title,synopsis,img} = req.body;
        const anime = new Watchlist({title,synopsis,img});
        const saved = await anime.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({message : "internal server error"});
        console.error(error);
    }
};

export async function deletewatchlist(req,res){
    try {
        const deleted = await Watchlist.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: "Anime not found"});
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({message: "internal server error"});
        console.error("error in deleting anime",error);
    }
};