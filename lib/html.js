module.exports = {
	scrub: function(text) {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/[\n]/g, '<br \\>')
			.replace(/[\t]/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	}
};
