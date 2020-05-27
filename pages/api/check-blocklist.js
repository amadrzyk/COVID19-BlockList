import axios from 'axios'
import Cors from 'cors'

const BLOCKLIST_ENDPOINT = 'https://blocklist.cyberthreatcoalition.org/vetted/domain.txt';

const cors = Cors({
	methods: ['GET', 'HEAD'],
});

function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}

export default async (req, res) => {
	try {
		await runMiddleware(req, res, cors);

		const response = {
			safe: [],
			unsafe: []
		};
		let endpoints = req.body.endpoints || [];
		endpoints = endpoints.map(endpoint => endpoint.trim());

		// download blocklist
		let data = (await axios.get(BLOCKLIST_ENDPOINT)).data;

		// split into array
		const blockedDomains = data
			.split(/\r?\n/)
			.map(domain => domain.trim())
			.filter(domain => {
				return domain.length !== 0
			});

		// check if each endpoint is safe
		for (const endpoint of endpoints){
			let safe = true;
			for (const blockedDomain of blockedDomains){
				if (endpoint.includes(blockedDomain)){
					response.unsafe.push(endpoint);
					safe = false;
					break;
				}
			}

			if (safe) response.safe.push(endpoint);
		}

		// return response
		res.json(response);
	} catch (err) {
		console.log(err);
		const {name, message} = err;
		res.json({err: {name, message}});
	}
}