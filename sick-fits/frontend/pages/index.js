import React from 'react';
import Link from 'next/link';

// class Home extends React.Component {
// 	render() {
// 		return <p>Hey!</p>;
// 	}
// }

const Home = (props) => (
	<div>
		<h1>This is the Home Page</h1>
		<Link href="/sell">
			<a>Click to go to Sell</a>
		</Link>
	</div>
);

export default Home;
