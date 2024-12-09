import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import Api from './Api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar() {
  let [api,setApi] = React.useState([])
  let [searchQuery,setSearchQuery] = React.useState("")
  let [sort,setSort] = React.useState("")
  let fetchData = async ()=>{
    let {data} = await axios.get("https://api.github.com/users")
    console.log(data)
    setApi(data)
  }
  React.useEffect(()=>{
    fetchData()
  },[])

  let filteredSearch = api.filter(({id,login})=>{
    return (
      id.toString().includes(searchQuery.toLowerCase()) ||
      login.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })
  let filteredSearchOrSort = filteredSearch.sort((a,b)=>{
     if(sort === "High"){
      return a.id - b.id
     }else if(sort === "Low"){
      return b.id - a.id
     }else{
      return 0
     }
  })
  return (
    <>
    <Box sx={{ flexGrow: 1,  width:1000,marginBottom:1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e)=>{setSearchQuery(e.target.value)}}
            />
          </Search>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value = {sort}
        label="Sort"
        onChange = {(e)=>{setSort(e.target.value)}}
      
      >
      
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        
      </Select>
    </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
     <Api filteredSearch={filteredSearch}  filteredSearchOrSort={filteredSearchOrSort}/>
     </>
  );
}
