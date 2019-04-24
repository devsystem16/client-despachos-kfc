import React, { Component } from 'react';

 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
 
import Typography from '@material-ui/core/Typography';



class CardTab extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
<Card  >
      <CardActionArea>
        <CardMedia
         
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Ocurrió un problema al cargar los datos.
          </Typography>
          <Typography component="p">
            Para resolver este inconveniente es necesario volver a cargar la página.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
         
      </CardActions>
    </Card>

         );
    }
}
 
export default CardTab;