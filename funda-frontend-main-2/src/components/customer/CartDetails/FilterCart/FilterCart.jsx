import React, {useState} from 'react'
import { ListItemIcon, ListSubheader,ListItemText, List, Collapse, ListItem } from '@mui/material';
import {ExpandLess, SendAndArchive, DraftsOutlined, InboxOutlined, ExpandMore, StarBorder, AppsOutlined, AssignmentReturnedTwoTone} from  "@mui/icons-material"
import { makeStyles } from '@mui/styles';
import './styles.scss'

const useStyles = makeStyles({
    listIcon : {
        margin: "0 8px" ,
        display: "flex" , 
        alignItems: "center",
        background: "white" ,
        borderRadius: "10px",
        padding: "0 10px" ,
        cursor: "pointer"
    } ,
    appIcon : {
        marginRight : "10px"
    } ,
    filterText : {
        color: "#1a2030"
    } ,
    listMenu : {
        padding: "0 14px"
    } ,
    listItem : {
        padding: "8px 0" ,
        borderBottom: "1px solid #80808045"
    }
})

const FilterCart = () =>{
    const classes = useStyles()
    const 
    [all, setAll] = useState(false),
    [trending, setTrending] = useState(false),
    [prime , setPrime] = useState(false), 
    [gender, setGender] = useState(false),
    [price, setPrice] = useState(false),
    [brand, setBrand ] = useState(false)

    const handleClick = (option) =>{
        switch(option) {
            case "all" :
                setAll(!all)
            break;
            case "trending" :
                setTrending(!trending)
            break;
            case "prime" : 
                setPrime(!prime)
            break;
            case "gender" :
                setGender(!gender)
            break;
            case "price" :
                setPrice(!price)
            break;
            case "brand" :
                setBrand(!brand)
            break;
            default: 
            return 
        }
        // setOpen(!open)
    }
    return(
        <div className="filter-container custom-scroll">
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"   
    >
        <div className="filter-div">
            <ListItemIcon onClick={()=>handleClick("all")} className={classes.listIcon}>
            <AppsOutlined className={classes.appIcon}/>
            <ListItemText primary="All" className={classes.filterText}/>
            {all ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
        {/* </ListItemButton> */}
            <Collapse in={all} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.listMenu}>
                    <ListItem className={classes.listItem}>Best Sellers</ListItem>
                    <ListItem className={classes.listItem}>Mobiles</ListItem>
                    <ListItem className={classes.listItem}>Fashion</ListItem>
                    <ListItem className={classes.listItem}>Electronics</ListItem>
                    <ListItem className={classes.listItem}>New Releases</ListItem>
                    <ListItem className={classes.listItem}>Costumer Services</ListItem>
                    <ListItem className={classes.listItem}>Computers</ListItem>
                    <ListItem className={classes.listItem}>Amazon Pay</ListItem>
                </List>
            </Collapse>
        </div>
        <div className="filter-div">
            <ListItemIcon onClick={()=>handleClick("trending")} className={classes.listIcon}>
                <AppsOutlined className={classes.appIcon}/>
                <ListItemText primary="Trending" className={classes.filterText}/>
                {trending ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            {/* </ListItemButton> */}
            <Collapse in={trending} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.listMenu}>
                    <ListItem className={classes.listItem}>Best Sellers</ListItem>
                    <ListItem className={classes.listItem}>Mobiles</ListItem>
                    <ListItem className={classes.listItem}>Fashion</ListItem>
                    <ListItem className={classes.listItem}>Electronics</ListItem>
                    <ListItem className={classes.listItem}>New Releases</ListItem>
                    <ListItem className={classes.listItem}>Costumer Services</ListItem>
                    <ListItem className={classes.listItem}>Computers</ListItem>
                    <ListItem className={classes.listItem}>Amazon Pay</ListItem>
                </List>
            </Collapse>
        </div>
        <div className="filter-div">
            <ListItemIcon onClick={()=>handleClick("prime")} className={classes.listIcon}>
                <AppsOutlined className={classes.appIcon}/>
                <ListItemText primary="Prime" className={classes.filterText}/>
                {prime ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
            {/* </ListItemButton> */}
            <Collapse in={prime} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.listMenu}>
                    <ListItem className={classes.listItem}>Best Sellers</ListItem>
                    <ListItem className={classes.listItem}>Mobiles</ListItem>
                    <ListItem className={classes.listItem}>Fashion</ListItem>
                    <ListItem className={classes.listItem}>Electronics</ListItem>
                    <ListItem className={classes.listItem}>New Releases</ListItem>
                    <ListItem className={classes.listItem}>Costumer Services</ListItem>
                    <ListItem className={classes.listItem}>Computers</ListItem>
                    <ListItem className={classes.listItem}>Amazon Pay</ListItem>
                </List>
            </Collapse>
        </div>
        <div className="filter-div">
            <ListItemIcon onClick={()=>handleClick("gender")} className={classes.listIcon}>
                <AppsOutlined className={classes.appIcon}/>
                <ListItemText primary="Gender" className={classes.filterText}/>
                {gender ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
            {/* </ListItemButton> */}
            <Collapse in={gender} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.listMenu}>
                    <ListItem className={classes.listItem}>Best Sellers</ListItem>
                    <ListItem className={classes.listItem}>Mobiles</ListItem>
                    <ListItem className={classes.listItem}>Fashion</ListItem>
                    <ListItem className={classes.listItem}>Electronics</ListItem>
                    <ListItem className={classes.listItem}>New Releases</ListItem>
                    <ListItem className={classes.listItem}>Costumer Services</ListItem>
                    <ListItem className={classes.listItem}>Computers</ListItem>
                    <ListItem className={classes.listItem}>Amazon Pay</ListItem>
                </List>
            </Collapse>
        </div>
        <div className="filter-div">
            <ListItemIcon onClick={()=>handleClick("price")} className={classes.listIcon}>
                <AppsOutlined className={classes.appIcon}/>
                <ListItemText primary="Prime" className={classes.filterText}/>
                {price ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
            {/* </ListItemButton> */}
            <Collapse in={price} timeout="auto" unmountOnExit>
                
            </Collapse>
        </div>
        <div className="filter-div">
            <ListItemIcon onClick={()=>handleClick("brand")} className={classes.listIcon}>
                <AppsOutlined className={classes.appIcon} />
                <ListItemText primary="Brand" className={classes.filterText}/>
                {brand ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
            {/* </ListItemButton> */}
            <Collapse in={brand} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.listMenu}>
                    <ListItem className={classes.listItem}>Best Sellers</ListItem>
                    <ListItem className={classes.listItem}>Mobiles</ListItem>
                    <ListItem className={classes.listItem}>Fashion</ListItem>
                    <ListItem className={classes.listItem}>Electronics</ListItem>
                    <ListItem className={classes.listItem}>New Releases</ListItem>
                    <ListItem className={classes.listItem}>Costumer Services</ListItem>
                    <ListItem className={classes.listItem}>Computers</ListItem>
                    <ListItem className={classes.listItem}>Amazon Pay</ListItem>
                </List>
            </Collapse>
        </div>
        
    
    </List>
        </div>
    )
}

export default FilterCart;