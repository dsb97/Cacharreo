const { ipcRenderer } = require('electron');
const products = document.querySelector('#products');
ipcRenderer.on('nuevo:producto', (e, newProduct) => {
    //console.log(newProduct)
    const newProductTemplate = `
                <div class="col-4">
                    <div class="card text-center">
                        <div class="card-header">
                            <h5 class="card-title">${newProduct.name}</h5>
                        </div>
                        <div class="card-body">
                            ${newProduct.descriptionProduct}
                        <hr/>
                            ${newProduct.price}
                        </div>
                        <div class="card-footer">
                            <button onclick="event.target.parentElement.parentElement.parentElement.remove();" class="btn btn-danger btn-sm">
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            `;

    products.innerHTML += newProductTemplate;
})
ipcRenderer.on('products:remove-all', (e) => {
    products.innerHTML = '';
})