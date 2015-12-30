function coverage(data) {
	var hits = 0, total = 0;
	if(Array.isArray(data)) {
		total = data.length;
		data.forEach(function(line) {
			if(+line.hits > 0) {
				hits++;
			}
		});
	} else {
		Object.keys(data).forEach(function(entry) {
			var stats = coverage(data[entry]);
			hits += stats.hits;
			total += stats.total;
		});
	}
	return {
		hits: hits,
		total: total,
		percent: (hits / total * 100.0).toFixed(2) + ' %'
	};
}

module.exports = {
	coverage: coverage
};
