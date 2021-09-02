module.exports = {
	notes: async (user, args, {models}) => {
		return await models.notes.find({author: user._id}).sort({_id: -1});
	},
	favorites: async (user, args, {models}) => {
		return await models.Note.find({favoritedBy: user._id}).sort({_id: -1});
	},
};
