import { useState, useEffect } from 'react';

import {
  Sheet, 
} from '@mui/joy';

import { useReactive } from '../hooks/useReactive';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as Logo } from '../assets/logo.svg';
import loadable from '@loadable/component';
import { useNavigate } from 'react-router-dom';
//import { getMenu } from '../api/useNavigation';

import { menuTabs } from '../config/Menu';
// menu
const MyMenu = loadable(() => import('./menu'));
const MenuBar = loadable(() => import('./MenuBar'));

// css 
const css={
  "main": {
    display: 'flex', 
    zIndex: 1002, 
    borderBottom: 0, 
    borderColor: 'divider', 
    width: '100%',  
    justifyContent:'space-between',
    backgroundColor: 'transparent',
  },
  "btn": {
    backgroundColor: 'transparent',
    borderColor: 'unset', 
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'unset', 
    },
    '&:focus': {
      backgroundColor: 'transparent',
      borderColor: 'unset',
      outline: 'none !important',
    }
  },
};

///////////////////
// Header
//////////////////
const Header = () => {
  const navigate = useNavigate();
  const {isSmall, isMobile} = useReactive();
  const [menu, setMenu] = useState([
    {
      title: 'Home',
      path: '/',
      parent: null,
    },
    {
      title: 'FBX',
      path: '/fbx',
      parent: 'fileLoader',
    },
    {
      title: 'OBJ',
      path: '/obj',
      parent: 'fileLoader',
    },
    {
      title: 'JsxObject',
      path: '/jsx',
      parent: 'fileLoader',
    },
    {
      title: 'GLTF',
      path: '/gltf',
      parent: 'fileLoader',
    },
    {
      title: 'Grass',
      path: '/grass',
      parent: 'elements',
    },
    {
      title: 'Terrain',
      path: '/terrain',
      parent: 'elements',
    },
    {
      title: 'Scenes',
      path: '/Scenes',
      parent: null,
    }
  ]);
  
  const variant ="soft";
  const color="primary";
  const handleStore = (data) => setMenu(data);
  const [elements, setElements] = useState();
  const [fileLoader, setFileLoader] = useState(null);
  const [menuList, setMenuList] = useState();

  useEffect(() => {
    setElements(menu.filter(m => m.parent === 'elements'));
    setFileLoader(menu.filter(m => m.parent === 'fileLoader'));
    setMenuList(menu.filter(m => m.parent === null));
    //getMenu({id: 2, handleStore});
  },[]);

  return(
    <Sheet sx={css.main}>
      {!isSmall && !isMobile ? (
        <MenuBar
          variant={variant}
          color={color}
          menuTabs={menuTabs}
            sx={{
              display: 'flex',
              width: '90vw',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              overflow: 'hidden',
              borderRadius: '4px',
              maxWidth: 'fit-content',
              '--ListItem-radius': '8px',
            }}
          />
        )
        :
        <MyMenu menu={menu} />
      }
   
  </Sheet>
)};
export default Header;
