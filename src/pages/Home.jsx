import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const [tab, setTab] = useState(0);

  const isTab = (event, newTab) => {
    setTab(newTab);
  };

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  let zzz = [...new Set(tags.items)];

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [1]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 20 }}
        value={tab}
        onChange={isTab}
        aria-label="basic tabs example"
        textColor="inherit"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        {tab == 0 ? (
          <Grid xs={8} item>
            {(isPostsLoading ? [...Array(5)] : posts.items)
              .map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    _id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl
                        ? `https://realblog-xfuyyabb.b4a.run${obj.imageUrl}`
                        : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={0}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                    key={obj._id}
                  />
                )
              )
              .reverse()}
          </Grid>
        ) : (
          <Grid xs={8} item>
            {(isPostsLoading ? [...Array(5)] : posts.items)
              .map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    _id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl
                        ? `https://realblog-xfuyyabb.b4a.run${obj.imageUrl}`
                        : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={0}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                    key={obj._id}
                  />
                )
              )
              .sort((a, b) => b.props.viewsCount - a.props.viewsCount)}
          </Grid>
        )}
        <Grid xs={4} item className="tatata">
          <TagsBlock items={zzz} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
