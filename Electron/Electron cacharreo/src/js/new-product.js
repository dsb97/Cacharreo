const { ipcRenderer } = require('electron');
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    const nameProduct = document.querySelector('#name').value;
    const priceProduct = document.querySelector('#price').value;
    const descriptionProduct = document.querySelector('#description').value;

    const newProduct = {
        name: nameProduct,
        price: priceProduct,
        descriptionProduct: descriptionProduct
    }
    
    ipcRenderer.send('nuevo:producto', newProduct)
    e.preventDefault();
})