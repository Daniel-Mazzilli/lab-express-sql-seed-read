const express = require("express");
const playlists = express.Router();
const {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
} = require("../queries/playlists");
const songController = require("./songController")

playlists.use("/:playlistId/songs", songController);

// Index
playlists.get("/", async (req, res) => {
  const allPlaylists = await getAllPlaylists();
  if (allPlaylists[0]) {
    res.status(200).json(allPlaylists);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// Show
playlists.get("/:id", async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylist(id);
  if (!playlist.message) {
    res.status(200).json(playlist);
  } else {
    res.status(404).redirect("/not-found");
  }
});

//Create
playlists.post("/", async (req, res) => {
  try {
    const playlist = await createPlaylist(req.body);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete
playlists.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlaylist = await deletePlaylist(id);
    res.status(200).json(deletedPlaylist);
  } catch (error) {
    res.status(404).json({ error: "id not found" });
  }
});

// Update
playlists.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlaylist = await updatePlaylist(id, req.body);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(404).json({ error: "id not found" });
  }
});

module.exports = playlists;