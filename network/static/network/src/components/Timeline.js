import React, { useEffect } from "react";
import Layout from "./Layout";
import user from "../api/user";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

const Timeline = () => {
  const auth = useAuth();
  const userApi = useApi(user.getTimeline);

  useEffect(() => {
    userApi.request(auth.user.id).then((res) => console.log(res.data));
  }, []);
  return <Layout appBar={{ title: "Timeline" }}></Layout>;
};

export default Timeline;
