

class Http {

	static request(uri, method, body) {

		let promise;
		if ('post' === method.toLocaleLowerCase()) {

			const config = {
				method,
				headers: {
					'Accept': 'application/json, text/plain, */*',
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body
			};
			
			promise = fetch(`http://192.168.2.24/:6001/${uri}`, config)
			.then(response => {
				return response.json();
			});

		} else {

			promise = fetch(`http://192.168.2.24:6001/${uri}`)
			.then(response => {
				return response.json();
			});

		}

		return promise;
	}

}

export default Http;