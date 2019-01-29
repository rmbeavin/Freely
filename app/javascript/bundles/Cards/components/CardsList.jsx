import React from 'react';
import axios from 'axios';
import { Grid, Card } from 'semantic-ui-react';
import Cards from './Cards';

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': ReactOnRails.authenticityToken()
}

export default class CardsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    this.geolocate()
  }

  geolocate = () => {
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 27000
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        // success callback
        (position) => {
          axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=${position.coords.latitude}&location.longitude=${position.coords.longitude}&location.within=25km&expand=venue,category&token=N3UJC5A67XVRFFOQQBCG`)
            .then(response => {
              this.setState({ cards: response.data.events })
            })
        },
        // failure callback
        () => { console.log('Oops') },
        // options
        geolocationOptions
      );
    }
  }

  render() {
    return (
        <div>
          <Grid columns='equal' centered>
            {
              this.state.cards.map((eventcard, index) => {
                return <Cards key={index} eventcard={eventcard} />
              })
            }
          </Grid>
        </div>
    )
  }
}