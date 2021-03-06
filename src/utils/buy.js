export const buyProduct = (KMT, DIN, quantity, value, buyer) => {
	KMT.buy(
		DIN,
		quantity,
		value,
		{
			from: buyer,
			gas: 4700000 // TODO: Use estimated gas
		},
		(error, result) => {
			if (!error) {
				console.log(result);
			} else {
				console.log(error);
			}
		}
	);
};

export const buyKMT = (etherMarket, value, buyer) => {
	etherMarket.contribute({ from: buyer, value: value }, (error, result) => {
		if (!error) {
			console.log(result);
		} else {
			console.log(error);
		}
	});
};