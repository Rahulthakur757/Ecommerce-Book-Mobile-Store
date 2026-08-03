const Book = require("../models/Book");
const Mobile = require("../models/Mobile");

async function searchProducts(req, res) {
    try {

         console.log("SEARCH CONTROLLER QUERY =", req.query.query);
         

         
        let query = (req.query.query || "").trim();

        if (!query) {
            return res.send({
                success: true,
                books: [],
                mobiles: []
            });
        }

        let safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // Books Search
        const books = await Book.find({
            $or: [
                { bookTitle: { $regex: safeQuery, $options: "i" } },
                { author: { $regex: safeQuery, $options: "i" } },
                { genre: { $regex: safeQuery, $options: "i" } }
            ]
        });

        // Mobiles Search
        const mobiles = await Mobile.find({
            $or: [
                { name: { $regex: safeQuery, $options: "i" } },
                { brand: { $regex: safeQuery, $options: "i" } },
                { shortDescription: { $regex: safeQuery, $options: "i" } }
            ]
        });

        return res.send({
            success: true,
            books,
            mobiles
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports = {
    searchProducts
};