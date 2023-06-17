import React from "react";
import Head from "next/head"
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";

// const DUMMY_POSTS = [
//   {
//     slug: "getting-started-with-nextjs1",
//     title: "Getting Started With NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJs the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR",
//     date: "2023-06-12",
//   },
//   {
//     slug: "getting-started-with-nextjs2",
//     title: "Getting Started With NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJs the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR",
//     date: "2023-06-12",
//   },
//   {
//     slug: "getting-started-with-nextjs3",
//     title: "Getting Started With NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJs the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR",
//     date: "2023-06-12",
//   },
//   {
//     slug: "getting-started-with-nextjs4",
//     title: "Getting Started With NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJs the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR",
//     date: "2023-06-12",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Ahmed Blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 60,
  };
};

export default HomePage;
