function Time(Sec){ // / 1000
	if(Sec / 60 >= 1){
		var Min = parseInt((Sec / 60), 10);
		Sec %= 60;
	}
	else
		if(Sec == Math.round(Sec))
			return `${parseFloat(Sec)}s`;
		else
			return `${parseFloat(Sec).toFixed(2)}s`;

	if(Min / 60 >= 1){
		var Hr = parseInt((Min / 60), 10);
		Min %= 60;
	}
	else
		if(Sec == Math.round(Sec))
			return `${Min}m ${parseFloat(Sec)}s`;
		else
			return `${Min}m ${parseFloat(Sec).toFixed(2)}s`;

	if(Sec == Math.round(Sec))
		return `${Hr}h ${Min}m ${parseFloat(Sec)}s`;
	else
		return `${Hr}h ${Min}m ${parseFloat(Sec).toFixed(2)}s`;
} exports.Time = Time;