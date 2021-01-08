import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import { Library } from "./Librarydata";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Icon, TextField } from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    maxWidth: 240,
  },
  media: {
    height: 160,
  },
});

const Home = (props) => {

  const [search, setSearch] = useState('');
  const [originalItems, setoriginalItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setoriginalItems(result)
          //console.log(result.length)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  },[]);

  const classes = useStyles();

  function searchHandler(evt){
    const searchText = evt.target.value?evt.target.value.trim().toLowerCase():'';
    console.log(searchText)
    //let tempLibData = JSON.parse(JSON.stringify(Library));
    let tempLibData = JSON.parse(JSON.stringify(originalItems));
    if(searchText){
      tempLibData =  tempLibData.filter(item => item.title.toLowerCase().includes(searchText));
    }
    setItems(tempLibData);
    setSearch(evt.target.value);
  }

  const rentbookHandler = (bookId) =>{
    console.log(bookId)
  }

  return (
    // <div className='App'>
    //   <div className='App-header'>
    //     <div> Home page</div>
    //     <p>{props.location.state.user}</p>
    //   </div>
    //   <div><input type='text' placeholder='search' /></div>
    //   <div>
    //   {Library.map((book) =>
    //     <>
    //     <div key={book.id}>{book.title}</div>
    //     <img src={book.thumbnailUrl} />
    //     </>

    //   )}
    //   </div>
    // </div>

    <div className='User-page'>
      <h1>Library Management System</h1>
      <div><p>{props.location.state.user.toUpperCase()}</p>
      <TextField id="outlined-basic" placeholder='search for a book' label="Search for a book"onChange={searchHandler}  variant="outlined" />
      </div>
      <p></p>
      <Grid container spacing={2}>
        
      {items.map((book) => 
      <Grid item xs={3}>
      <Card className={classes.root}> 
      <div>
      <CardActionArea>
          <div>
          <CardMedia
            className={classes.media}
            image={book.thumbnailUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {book.title}
            </Typography>
          </CardContent>
          <CardActions>
          <Button size="small" color="primary" onClick={()=>rentbookHandler(book.id)}>
            Rent this book
          </Button>
          
      </CardActions>
          </div>
      </CardActionArea>
      </div>
    </Card>
   
        </Grid>)}

      </Grid>
     </div>
  );
}

export default withRouter(Home);
