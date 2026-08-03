const express = require("express");
const router = express.Router();

console.log("✅ Search Route Loaded");

const SearchController = require("../controllers/SearchController");

router.get("/test", (req, res) => {
    res.send("Search Route Working");
});

router.get("/search", SearchController.searchProducts);

module.exports = router;