import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { BulbOutlined, StarOutlined, PlayCircleOutlined, PlaySquareOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';
import "./MusicLibery.css"

function MusicLibrary() {
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <>
      <div>
        <Menu theme={theme} mode="vertical" defaultSelectedKeys={['1']} className="custom-menu">
          <Menu.Item key="1" icon={<PlaySquareOutlined />}>
            <Link className='menu-style' to="/album/list">Album</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlayCircleOutlined />}>
            <Link className='menu-style' to="/playlist">Playlist</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link className='menu-style' to="/artist">Artist</Link>
          </Menu.Item>
          <Menu.Item key="4"  className="custom-menu-item" icon={<AudioOutlined/> }>
            <Link className='menu-style' to="/songs">Songs</Link>
          </Menu.Item>

        </Menu>
        {/* <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button onClick={toggleTheme}>
            {theme === 'light' ? <BulbOutlined /> : <StarOutlined />}
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </Button>
        </div> */}
      </div>
    </>
  );
}

export default MusicLibrary;














// import {Link} from "react-router-dom"





// function MusicLibery (){
//     return(
//         <> 
//         {/* <Playlist/> */}
// <Link to="/album/list">Album</Link><br>
// </br>
// <Link to="/playlist"> PLaylist</Link><br>
// </br>
// <Link to="/artist">Artist</Link><br>
// </br>
// <Link to="/songs">Songs</Link>

//         </>
//     )
// }

// export default MusicLibery;




