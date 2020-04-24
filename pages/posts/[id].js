import React from 'react';
import Link from 'next/link'; 
import fetch from 'node-fetch'

const HOST_NAME = process.env.HOST_NAME || 'https://5ea2c9f9b9f5ca00166c31d1.mockapi.io/api/';
 

const Post = ({item}) => { 
	return (
      <>
				{ item ? (<section>
					
					<h1>{item.title}</h1> 
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</section>)
					: ''}
		 </>
	)
}

export const getStaticPaths = async () => {
	const res = await fetch(`${HOST_NAME}posts`);
		const items = await res.json(); 
		const paths =	items.map(item => ({ 
			params: { 
					id: item.id.toString() 
				} 
		}));
 
		return {
			paths,
			fallback: false
		}
}

export const getStaticProps = async ({ params }) => {  
	console.log(params)
	const res = await fetch(`${HOST_NAME}posts/${params.id}`); 
	const item = await res.json(); 
	return  {
		unstable_revalidate: 1,
		props: {
			item
		}
	}
}

export default Post;