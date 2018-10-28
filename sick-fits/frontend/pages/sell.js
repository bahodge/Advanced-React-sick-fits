import React from 'react';
import Link from 'next/link';

const Sell = (props) => (
	<div>
		<h1>This is the sell page!</h1>
		<Link href="/">
			<a>Click to go to Sell</a>
		</Link>
	</div>
);

export default Sell;
