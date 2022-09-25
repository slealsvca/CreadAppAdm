/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }

/** @type {import('next').NextConfig} */

const withImages = require("next-images");

module.exports = {
	reactStrictMode: true,
	esModule: true,
	styledComponents: true,
	env: {
		API_APP_URL:
			"http://localhost:8080",
		CLIENT_ID:
			"86282043700-eopv874vgfrhagndhs6ja55gfqnni2m7.apps.googleusercontent.com",
		CLIENT_SECRET_KEY:
			"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",
		REDIRECT_URI:
			"http://localhost:3000",
		REFRESH_TOKEN:
			"1//04EGPiBIsWdNUCgYIARAAGAQSNwF-L9Ir-RszoMB94MFiHObYjk8j032ht1Ji5QyCCnPpR9qzcWj6oQdDaLjdGoqa2HMKb4U4-tU",
	},
};
