import Document, { Html, Head, Main, NextScript } from "next/document"

export default class WaddDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<title>WADD - Finance Tracker</title>
					<link rel="shortcut icon" href="/images/favicon.ico" />
					<link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css" rel="stylesheet" type="text/css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
