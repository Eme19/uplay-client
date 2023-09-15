import React from "react";
import { Layout } from "antd";
import {
  PlaySquareOutlined,
  PlayCircleOutlined,
  UserOutlined,
  AudioOutlined,
  SearchOutlined, 
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Footer.css"

function Footer() {
  return (
    <Layout.Footer className="sticky-footer">
      <div className="footr-positioning">
        <Link id="footer-link-style" to="/album/list" className="menu-style">
          <PlaySquareOutlined />
        </Link>
        <Link id="footer-link-style"  to="/playlist" className="menu-style">
          < PlayCircleOutlined />
        </Link>
        <Link id="footer-link-style"  to="/artist" className="menu-style">
          <UserOutlined />
        </Link>
        <Link id="footer-link-style"  to="/songs" className="menu-style">
          <AudioOutlined
          />
        </Link>
        <Link id="footer-link-style"  to="/" className="menu-style">
          <SearchOutlined /> 
        </Link>
      </div>
    </Layout.Footer>
  );
}

export default Footer;
