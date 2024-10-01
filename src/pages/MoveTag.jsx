import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { Typography } from "@mui/material";
import axios from "../axios";
import { useParams } from "react-router-dom";

export const MoveTag = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const [data, setData] = React.useState();

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const { tag } = useParams();

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    axios.get(`/posts/tags/${tag}`).then((res) => {
      setData(res.data);
    });
  }, [1]);

  let zzz = [...new Set(tags.items)];

  return (
    <>
      <Typography
        variant="h1"
        gutterBottom
        fontWeight={600}
        className="H1"
        style={{ opacity: ".65" }}
      >
        #{tag}
      </Typography>
      <Grid container spacing={4}>
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
            .filter(function (obj) {
              if (!isPostsLoading) {
                if (obj.props.tags[0] == tag) {
                  return obj;
                }
                if (obj.props.tags[1] == tag) {
                  return obj;
                }
                if (obj.props.tags[2] == tag) {
                  return obj;
                }
              }
            })
            .reverse()}
        </Grid>

        <Grid xs={4} item className="tatata">
          <TagsBlock items={zzz} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
