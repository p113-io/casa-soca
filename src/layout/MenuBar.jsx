import {
  cloneElement, 
  Fragment, 
  useState, 
  forwardRef, 
  useMemo, 
  useRef 
} from 'react';

import {
  Menu,
  Box,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListDivider,
  Typography
}  from '@mui/joy';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ModeSwitcher } from '../Theme';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const css = {
  "list": {
          width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        overflow: 'hidden',
  },
  "listItem": {
    px: 2,
    flexGrow: 1,
    display: 'flex',
    width: 'auto',
    flexWrap: 'no-wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'stretch',
    justifyContent: 'space-around',
    overflow: 'hidden',
    borderRadius: '4px',
    maxWidth: 'fit-content',
    '--ListItem-radius': '8px',
    backgroundColor: 'transparent',
    borderColor: 'unset',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'unset',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      borderColor: 'unset',
    }
  }
}
const MenuButton = forwardRef(
  ({ children, menu, open, onOpen, onKeyDown, ...props }, ref) => {
    const buttonRef = useRef(null);
    const menuActions = useRef(null);
    const combinedRef = useMemo(() => {
      return (instance) => {
        if (instance) {
          ref(instance);
          buttonRef.current = instance;
        }
      };
    }, [buttonRef, ref]);

    const handleButtonKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        onOpen(event);
        if (event.key === 'ArrowUp') {
          menuActions.current?.highlightLastItem();
        }
      }
      onKeyDown(event);
    };

    return (
      <Fragment>
        <ListItemButton
          {...props}
          ref={combinedRef}
          role="menuitem"
          variant={open ? 'soft' : 'plain'}
          color="neutral"
          aria-haspopup="menu"
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? `toolbar-example-menu-${children}` : undefined}
          onClick={onOpen}
          onKeyDown={handleButtonKeyDown}
        >
          {children}
        </ListItemButton>
        {cloneElement(menu, {
          open,
          actions: menuActions,
          anchorEl: buttonRef.current,
          slotProps: {
            listbox: {
              id: `toolbar-menu-${children}`,
              'aria-label': children,
            },
          },
          placement: 'bottom-start',
          disablePortal: false,
          variant: 'soft',
        })}
      </Fragment>
    );
  },
);
MenuButton.propTypes = {
  children: PropTypes.node.isRequired,
  menu: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};


const MenuBar = ({menuTabs, variant, color, sx}) => {
  const menus = useRef([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const navigate = useNavigate();

  const renderShortcut = (text) => (
    <Typography level="body2" textColor="text.tertiary" ml="auto">
      {text}
    </Typography>
  );

  const openNextMenu = () => {
    if (typeof menuIndex === 'number') {
      if (menuIndex === menus.current.length - 1) {
        setMenuIndex(0);
      } else {
        setMenuIndex(menuIndex + 1);
      }
    }
  };

  const openPreviousMenu = () => {
    if (typeof menuIndex === 'number') {
      if (menuIndex === 0) {
        setMenuIndex(menus.current.length - 1);
      } else {
        setMenuIndex(menuIndex - 1);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      openNextMenu();
    }
    if (event.key === 'ArrowLeft') {
      openPreviousMenu();
    }
  };

  const createHandleButtonKeyDown = (index) => (event) => {
    if (event.key === 'ArrowRight') {
      if (index === menus.current.length - 1) {
        menus.current[0]?.focus();
      } else {
        menus.current[index + 1]?.focus();
      }
    }
    if (event.key === 'ArrowLeft') {
      if (index === 0) {
        menus.current[menus.current.length]?.focus();
      } else {
        menus.current[index - 1]?.focus();
      }
    }
  };

  const itemProps = {
    onClick: () => setMenuIndex(null),
    onKeyDown: handleKeyDown,
  };
  const SubMenus = ({name,items, index}) => {
    const navigate = useNavigate();

    return (
      <List 
        key={'sub-menu-list-' + index}
                aria-label="Submenus"
                variant={variant}
                color={color}
                sx={{
                  px: 2,
                  width: '100%', 
                }}
      > 
                <ListItem
                      sx={{
                      px: 2,
                      width: '100%', 
                    }}
                    key={'sub-menu-item-list-' + 'sections'}
                    nested
                  >
                    {name}
                </ListItem>
                  {items?.map((subItem, subItemIndex) => (
                          
                  <ListItem
                    sx={{
                      px: 2,
                      width: '100%',
                    }}
                    key={'sub-menu-item-list-' + subItemIndex}
                    nested
                  >
                    
                    <MenuItem 
                      {...itemProps}
                      key={'sub-menu-item-list-item' + subItemIndex}
                      variant={variant}
                      color={color}
                      onClick={() => navigate(subItem.url)}
                    >
                      {subItem.name}
                    </MenuItem>
                  </ListItem>
                                    
                ))}
                <ListDivider />
              </List>
    );
};
SubMenus.propTypes = {
  items: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

  return (
    <List
      orientation="horizontal"
      aria-label="menu bar"
      role="menubar"
      variant={variant}
      color={color}
      sx={css.list}

    >
      <ListItem
        variant={variant}
        color={color}
        sx={css.listItem}
        >
          <SvgIcon 
            color={color}
            variant={variant} 
            component={Logo} 
            inheritViewBox 
            onClick={() => navigate('/')}
            sx={{
              fontSize: 35,
              cursor: 'pointer',
              '&:hover': {
                cursor: 'pointer',
              }
            }}
          />
        </ListItem>
      {menuTabs.map((tab, index) => (
          <ListItem
            role="menuitem"
            tabIndex={-1}
            variant={variant}
            color={color}
            key={'menu-tab-' + index}
          >
            {!tab.items ? 
              <Button
                variant={variant}
                color={color}
                key={'menu-button-' + index}
                onClick={() => navigate(tab.url)}
                onKeyDown={createHandleButtonKeyDown(index)}
                ref={(instance) => {
                  menus.current[index] = instance;
                }}
              >{tab.name}</Button>
              :
              <MenuButton
                variant={variant}
                color={color}
                key={'menu-button-' + index}
                open={menuIndex === index}
                onOpen={() => setMenuIndex(index)}
                onClick={() => (tab.items) ? void(0) : tab.url ? navigate(tab.url) : null}
                onKeyDown={createHandleButtonKeyDown(index)}
                onMouseEnter={() => {
                  if (typeof menuIndex === 'number') {
                    setMenuIndex(index);
                  }
                }}
                ref={(instance) => {
                  menus.current[index] = instance;
                }}
                menu={
                  <Menu
                    variant={variant}
                    color={color}
                    onClose={() => {
                      menus.current[index]?.focus();
                      setMenuIndex(null);
                    }}
                    sx={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      maxWidth: 'fit-content',
                    }}
                  >
                    {tab?.items?.map((item, itemIndex) => (
                      <ListItem 
                        variant={variant}
                        color={color}
                        key={'tab-menu-item-' + itemIndex}
                        nested
                        sx={{
                          width: '100%',
                        }}
                      >
                        <List 
                          key={'tab-sub-item-' + itemIndex}
                          aria-label="Sub menu"
                          sx={{
                            width: '100%',
                            m:0,
                            p:0,
                          }}  
                        >
                  
                          {item.items?.length > 0 
                          ? 
                            <MenuItem 
                              {...itemProps}
                              key={'menu-item-' + itemIndex}
                            >
                            <SubMenus 
                              key={'submenus-' + itemIndex}
                              index={index} 
                              name={item.name} 
                              items={item.items}
                            />
                              <ListDivider />
                            </MenuItem>
                          :
                            <MenuItem 
                              sx={{
                                px: 2,
                                width: '100%',
                              }}
                              {...itemProps}
                              onClick={() => navigate(item.url)} 
                              key={'menu-item-' + itemIndex}
                            >
                              {item.name} {renderShortcut(item.keybindings)}
                            </MenuItem>
                          }
                        </List>
                    </ListItem>
                    ))}
                  </Menu>
                }
              >
                {tab.name}
              </MenuButton>
            }
            
          </ListItem>
      ))}
      <ModeSwitcher sx={{
        cursor: 'pointer',
        width: 'auto',
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
      }}/>
    </List>
  );
};
MenuBar.propTypes = {
  menuTabs: PropTypes.array.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string
};
export default MenuBar;