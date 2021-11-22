const express = require("express");
const router = express.Router();
const { getBookById, getSimilarBooks } = require("../controllers/get");

router.get("/", (req, res) => {
	res.render("main_pages/index");
});

router.get("/literature", (req, res) => {
	res.render("main_pages/literature");
});

router.get("/literature-subpage", (req, res) => {
	res.render("main_pages/literature-subpage");
});

router.get("/lifestory", (req, res) => {
	res.render("main_pages/lifestory");
});

router.get("/memorial", (req, res) => {
	res.render("main_pages/memorial");
});

router.get("/book/:id", async (req, res) => {
	const { id } = req.params;
	const { name, description, publisher, publishing_year, subject, category, details, quotes, index, links } = await getBookById(id);
	const similarBooks = await getSimilarBooks(category, id);

	res.render("main_pages/book", {
		name,
		description,
		publisher,
		publishing_year,
		subject,
		pages_count: details.pages_count,
		copy_type: details.copy_type,
		quotes,
		chapters: index,
		img: links.img,
		wiki: links.wiki_link,
		sBooks: similarBooks,
	});
});

module.exports = { router };
