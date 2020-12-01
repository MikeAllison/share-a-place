export class Map {
  constructor(renderHook) {
    this.renderHook = renderHook;
  }

  render(lat, lng) {
    if (!google) {
      alert('Could not load map.');
      return;
    }

    const map = new google.maps.Map(this.renderHook, {
      center: { lat: lat, lng: lng },
      zoom: 19
    });

    new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      title: 'My Location',
    });
  }
}