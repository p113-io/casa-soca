import {
  Sheet,
  Button,
 } from '@mui/joy';

const css ={
  "main": {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    position: 'fixed',
    borderColor: 'divider',
    backgroundColor: 'transparent',
    bottom: 0, 
    left: 0, 
    right: 0
  }
}
const Footer = () => {
  return (
    <Sheet 
      sx={css.main}
    >
      <Button 
        onClick={() => window.location.assign("https://www.p113.io")} 
        variant="outlined"
        color=''  
      >
          @P113 2023 
        </Button>
    </Sheet>
  )
}
export default Footer;