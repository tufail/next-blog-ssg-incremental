import Head from 'next/head';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';

const HOST_NAME = process.env.HOST_NAME || 'https://5ea2c9f9b9f5ca00166c31d1.mockapi.io/api/';

export default class extends React.Component {
	static async getInitialProps() {
		const data = await fetch(`${HOST_NAME}posts`);
		const items = await data.json();
		return {
			items
		};
	}
	render() {
		const { items } = this.props;
		return (
			<section>
				<h1>Node.js Server Side Render in the Age of APIs</h1>
				<ul>
					{items.map((i) => (
						<li key={i.id}>
							<Link href={`/posts/[id]`} as={`/posts/${i.id}`}>
								<a>{i.title}</a>
							</Link>
						</li>
					))}
				</ul>
			</section>
		);
	}
}
