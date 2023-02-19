function Time(Sec) { // / 1000
	if (Sec / 60 >= 1) {
		var Min = parseInt((Sec / 60), 10);
		Sec %= 60;
	} else
		return Sec == Math.round(Sec) ? `${parseFloat(Sec)}s` : `${parseFloat(Sec).toFixed(2)}s`;
	if (Min / 60 >= 1) {
		var Hr = parseInt((Min / 60), 10);
		Min %= 60;
	} else
		return Sec == Math.round(Sec) ? `${Min}m ${parseFloat(Sec)}s` : `${Min}m ${parseFloat(Sec).toFixed(2)}s`;
	return Sec == Math.round(Sec) ? `${Hr}h ${Min}m ${parseFloat(Sec)}s` : `${Hr}h ${Min}m ${parseFloat(Sec).toFixed(2)}s`;
} exports.Time = Time;