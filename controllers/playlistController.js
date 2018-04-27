'use strict';
const Playlist = require('../models/playlist');
const HTTPError = require('./../HTTPError');

// Create Playlist : [POST] /playlist
const addPlaylist = async ctx => {
	const received = ctx.request.body;
	const list = await Playlist.findOne({ playlist: received.playlist });
	const completeBody = (received.playlist && received.creator);
	if (list) {
		throw new HTTPError(400, 'This playlist already exists!');
	} else if (!completeBody) {
		throw new HTTPError(400, 'Please populate all fields');
	} else {
		const playlist = {
			playlist: received.playlist,
			creator: received.creator,
		};
		try {
			ctx.body = await Playlist.create(playlist);
			ctx.status = 201;
		} catch (error) {
			throw new HTTPError(400, `error creating entry into db: ${error}`);
		}
	}
};

const getPlaylists = async ctx => {
	try {
		ctx.body = await Playlist.find({});
		ctx.status = 200;
	} catch (error) {
		throw new HTTPError(500, `Error reading from DB${error}`);
	}
}

const getPlaylistInfo = async ctx => {
	try {
		const playlist = await Playlist.findOne({ _id: ctx.params.id });
		if (!playlist) {
			throw new HTTPError(400, 'This playlist do not exist!');
		} else {
			ctx.body = playlist;
			ctx.status = 200;
		}
	} catch (e) {
		throw new HTTPError(500, `Problems accessing the database, please try again..`)
	}
};

const addToPlaylist = async ctx => {
	const received = ctx.request.body;
	const playlist = await Playlist.findOne({ _id: ctx.params.id });
	const completeBody = (received.creator && received.url && received.description);
	if (!playlist) {
		throw new HTTPError(400, 'This playlist do not exist!');
	} else if (!completeBody) {
		throw new HTTPError(400, 'Please populate all fields');
	} else {
		playlist.videos.push(
			{
				creator: received.creator,
				url: received.url,
				description: received.description,
			});
		try {
			await playlist.save();
			ctx.status = 201;
			ctx.body = playlist.videos[playlist.videos.length - 1];
		} catch (e) {
			throw new HTTPError(500, `Problems accessing the database, please try again.`)
		}
	}
};

module.exports =
	{
		addPlaylist,
		getPlaylists,
		getPlaylistInfo,
		addToPlaylist,
	};
