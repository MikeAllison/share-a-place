import { Modal } from './UI/Modal';
import { Map } from './UI/Map'
import { getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    this.addressForm = document.querySelector('#place-data form');
    this.locateBtn = document.getElementById('locate-btn');

    // Using bind so that the function isn't run in the context of the event
    this.addressForm.addEventListener('submit', this.findAddresshandler.bind(this));
    this.locateBtn.addEventListener('click', this.locateUserHandler.bind(this));
  }

  updateMap(lat, lng) {
    if (this.map) {
      this.map.render(lat, lng);
    } else {
      this.map = new Map(document.getElementById('map'));
      this.map.render(lat, lng);
    }
  }

  findAddresshandler(event) {
    event.preventDefault();
    
    const address = event.target.querySelector('input').value;

    if (!address || address.trim().length === 0) {
      alert('Address not found - please try again.');
      return;
    }

    const modal = new Modal('Loading location.  Please wait.');
    modal.show();
    
    const coordinates = getCoordsFromAddress(address);
    coordinates.then(data => {
        console.log(data);
      });

    modal.hide();
  }

  locateUserHandler() {
    if(!navigator.geolocation) {
      alert('Please use a modern browser or the search form');
      return;
    }

    const modal = new Modal('Loading location.  Please wait.');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      success => {
        this.updateMap(success.coords.latitude, success.coords.longitude);
        modal.hide();
      }, 
      error => {
        modal.hide();
        alert('Sorry, we could not locate you.  Please use the search form.');
      }
    );
  }
}

new PlaceFinder;