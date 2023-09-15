import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Space, Popconfirm, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";



function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {  storedToken, isLoggedIn } = useContext(AuthContext); 
  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`, 
    },
  });

  useEffect(() => {
    api
      .get('/api/artist')
      .then((response) => {
        setArtists(response.data.artists);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  const handleDelete = async (artistId) => {
    try {
      await api.delete(`/api/artist/${artistId}`);
      message.success("Artist deleted successfully");
      setArtists((prevArtists) =>
        prevArtists.filter((artist) => artist._id !== artistId)
      );
    } catch (error) {
      console.error("Error deleting artist:", error);
      message.error("An error occurred while deleting the artist");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <img src={record.image} alt={record.name} width={100} />
          <p>{record.name}</p>
        </div>
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (genre) => genre.join(", "),
    },
    {
      title: "Popularity",
      dataIndex: "popularity",
      key: "popularity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this artist?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button onClick={() => navigate(`/edit/artist/${record._id}`)}>
              Edit
            </Button>
            <Button type="danger">Delete</Button>
          </Popconfirm>
          <Link to={`/artist/${record._id}/album`}>View Albums</Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={artists}
        rowKey={(record) => record._id}
        loading={loading}
      />

      <Button type="primary" onClick={() => navigate("/add/artist")}>
        Add Artist
      </Button>
    </div>
  );
}

export default Artists;
