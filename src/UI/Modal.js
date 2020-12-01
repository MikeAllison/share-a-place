export class Modal {
  constructor(fallbackText) {
    this.fallbackText = fallbackText;
    this.modalTemplateEl = document.getElementById('modal-template');
    this.modalElements = document.importNode(this.modalTemplateEl.content, true);
    this.backdropElement = this.modalElements.querySelector('.backdrop');
    this.modalElement = this.modalElements.querySelector('.modal'); 
    this.contentTemplateEl = document.getElementById('loading-modal-content');
    this.contentElement = document.importNode(this.contentTemplateEl.content, true);
  }

  show() {
    if ('content' in document.createElement('template')) {  
      this.modalElement.appendChild(this.contentElement);

      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
      document.body.insertAdjacentElement('afterbegin', this.modalElement);
    } else {
      alert(this.fallbackText);
    }
  }
  
  hide() {
    document.body.removeChild(this.modalElement)
    document.body.removeChild(this.backdropElement);
    this.modalElement = null;
    this.backdropElement = null;
  }
}