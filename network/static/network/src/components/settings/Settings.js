import React from "react";
import Layout from "../Layout";
import { List } from "../list";
import SettingItem from "./SettingItem";
import MaterialIcon from "../MaterialIcon";

const Settings = () => {
  return (
    <Layout appBar={{ title: "Settings" }}>
      <List>
        <SettingItem
          to="/logout"
          title="Logout"
          Icon={() => <MaterialIcon name="settings" />}
        />
      </List>
    </Layout>
  );
};

export default Settings;
