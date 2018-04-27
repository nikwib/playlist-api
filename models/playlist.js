'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlaylistSchema = new Schema(
	{
		playlist: { type: String, required: true, trim: true },
		creator: { type: String, required: true, trim: true },
		videos: [
			{
				creator: { type: String, required: true, trim: true },
				url: { type: String, required: true, trim: true },
				description: { type: String, required: true, trim: true },
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Playlist', PlaylistSchema);
