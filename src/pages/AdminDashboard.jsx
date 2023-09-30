import React, { useEffect, useState, useContext } from 'react';
import { Tabs, Table } from 'antd';
import AppActivityTab from '../components/admin/AppActivityTab'; 
import StreamingTab from '../components/admin/StreamingTab';
import UserStatistics from '../components/admin/UserStatistics';
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom';
import axios from 'axios';

const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appActivity, setAppActivity] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  useEffect(() => {

    api.get('/auth/get-user/').then((response) => {
      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      }
    });

   
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Welcome to the Admin Dashboard</h1>
          <Tabs defaultActiveKey="appActivity">
            <TabPane tab="App Activity" key="appActivity">
              <AppActivityTab />
            </TabPane>
            <TabPane tab="LoggedIn Users" key="users">
              <Table columns={columns} dataSource={users} />
            </TabPane>
            <TabPane tab="Streaming" key="streaming">
              <StreamingTab />
            </TabPane>
            <TabPane tab="User Statistics" key="Statistics">
              <UserStatistics />
            </TabPane>
          </Tabs>
          <Link path="/">User interface</Link>
        </>
      ) : (
        <p>Please log in to access the admin dashboard.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
