import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import Layout from "../Layout";
import postApi from "../../api/post";
import useApi from "./../../hooks/useApi";
import PostCard from "./PostCard";
import PostEditor from "./PostEditor";

const Post = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(location?.state?.edit || false);
  const post = useApi(postApi.getById);
  const updatePostApi = useApi(postApi.update);
  const params = useParams();
  //   const history = useHistory();

  const getPost = async () => {
    return await post.request(params.post_id);
  };

  const handlePostEdit = async (data) => {
    await updatePostApi.request(params.post_id, {
      ...post.data,
      content: data,
    });
    await getPost();
    setIsEdit(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Layout appBar={{ title: "Post" }}>
      {!isEdit ? (
        <PostCard {...post.data} onEdit={() => setIsEdit(true)} />
      ) : (
        <PostEditor
          onEdit={true}
          onEditSubmit={handlePostEdit}
          value={post.data.content}
        />
      )}
    </Layout>
  );
};

export default Post;
