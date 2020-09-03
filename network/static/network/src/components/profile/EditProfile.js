import React from "react";
import Layout from "../Layout";
import CompleteRegistration from "../CompleteRegistration";
import useAuth from "../../hooks/useAuth";

const EditProfile = () => {
  const auth = useAuth();
  return (
    <Layout appBar={{ title: "Edit Profile" }}>
      <CompleteRegistration redirectTo={`/profile/${auth.user.id}`} />
    </Layout>
  );
};

export default EditProfile;
