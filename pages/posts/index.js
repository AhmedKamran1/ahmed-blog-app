import React from "react";
import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

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

const AllPostsPage = (props) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorial and posts!"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60,
  };
};

export default AllPostsPage;
