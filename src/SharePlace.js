import { Modal } from './UI/Modal';
import { Map } from './UI/Map'
import { getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    this.shareLinkInput = document.getElementById('share-link');
    this.sharePlaceBtn = document.getElementById('share-btn');
    this.addressForm = document.querySelector('#place-data form');
    this.locateBtn = document.getElementById('locate-btn');
    this.shareLinkDefaultText = this.shareLinkInput.value;

    // Using bind so that the function isn't run in the context of the event
    this.sharePlaceBtn.addEventListener('click', this.copyLocationUrl.bind(this.shareLinkInput));
    this.addressForm.addEventListener('submit', this.findAddresshandler.bind(this));
    this.locateBtn.addEventListener('click', this.locateUserHandler.bind(this));
  }

  copyLocationUrl() {
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (!result.state == "granted" || !result.state == "prompt") {
        alert('Please copy the link manually');
        this.select();
        return;
      }

      this.select();
      navigator.clipboard.writeText(this.value)
        .then(() => {
          const modalTemplateEl = document.getElementById('modal-template');
          const modalElements = document.importNode(modalTemplateEl.content, true);
          const backdropElement = modalElements.querySelector('.backdrop');

          document.body.insertAdjacentElement('afterbegin', backdropElement);
          setTimeout(() => {
            document.body.removeChild(backdropElement);
          }, 50);
        })
        .catch(error => {
          alert('Please copy the link manually');
          this.select();
        });
    });
  }

  updateMap(lat, lng) {
    if (this.map) {
      this.marker = this.map.render(lat, lng);
    } else {
      this.map = new Map(document.getElementById('map'));
      this.marker  = this.map.render(lat, lng);
    }

    this.marker.addListener('click', () => {
      this.updateShareSection();
    });
  }

  updateShareSection() {
    this.shareLinkInput.value = this.marker.map.mapUrl;
    this.sharePlaceBtn.disabled = false;
  }

  async findAddresshandler(event) {
    event.preventDefault();

    this.shareLinkInput.value = this.shareLinkDefaultText;
    
    const address = event.target.querySelector('input').value;

    if (!address || address.trim().length === 0) {
      alert('Address not found - please try again.');
      return;
    }

    const modal = new Modal('Loading location.  Please wait.');
    
    modal.show();
    
    const coordinates = await getCoordsFromAddress(address);
    
    this.updateMap(coordinates.lat, coordinates.lng);

    modal.hide();
  }

  locateUserHandler() {
    this.shareLinkInput.value = this.shareLinkDefaultText;
    this.addressForm.querySelector('input').value = null;

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