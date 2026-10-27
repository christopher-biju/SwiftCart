let productarray = JSON.parse(sessionStorage.getItem("productarray")) || []
display()
addProductForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let name = productName.value
    console.log(name);
    let category = productCategory.value
    let price = productPrice.value
    let sku = productSKU.value
    let image = productImage.value
    let description = productDescription.value
    const editIndex = Number(document.getElementById("editIndex").value);
    const product = {
        na: name,
        cate: category,
        pri: price,
        sk: sku,
        img: image,
        descr: description
    };
    if (editIndex === -1) {
        productarray.push(product);
    } else {
        productarray[editIndex] = product;
    }
    sessionStorage.setItem("productarray", JSON.stringify(productarray));
    addProductForm.reset();
    document.getElementById("editIndex").value = "-1";
    document.getElementById("addProductLabel").textContent = "Add a product";
    document.querySelector(".addprobt").textContent = "Add product";
    document.querySelector(".modal-subtitle").textContent =
        "Fill in the details to add it to the catalog.";
    bootstrap.Modal.getOrCreateInstance(
        document.getElementById("addProductModal")
    ).hide();
    display();
})

function display() {
    productlist.innerHTML = ""
    productarray.forEach((val, index) => {
        productlist.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="${val.img}" class="product-image"
                            alt="Red running shoe">
                        <div class="product-actions">
                            <button onclick="editprod(${index})" class="action-btn edit-btn" type="button">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button onclick="deleteprod(${index})" class="action-btn delete-btn" type="button">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-details">
                        <div class="product-meta">
                            <span class="category-badge">${val.cate}</span>
                            <span class="product-code">${val.sk}</span>
                        </div>
                        <h5 class="product-name">${val.na}</h5>
                        <p class="product-description">
                            ${val.descr}
                        </p>
                        <p class="product-price">$${val.pri}</p>
                    </div>
                </div>
            </div>
        `
    })
}

function deleteprod(index) {
    if (confirm("Are you sure, you want to delete the data")) {
        productarray.splice(index, 1)
        sessionStorage.setItem("productarray", JSON.stringify(productarray))
        display()
    }
}

function editprod(index) {
    const product = productarray[index];
    if (!product) return;
    productName.value = product.na || "";
    productCategory.value = product.cate || "General";
    productPrice.value = product.pri || "";
    productSKU.value = product.sk || "";
    productImage.value = product.img || "";
    productDescription.value = product.descr || "";
    document.getElementById("editIndex").value = index;
    document.getElementById("addProductLabel").textContent = "Edit product";
    document.querySelector(".modal-subtitle").textContent =
        "Update the details and save your changes.";
    document.querySelector(".addprobt").textContent = "Save changes";
    const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("addProductModal")
    );
    modal.show();
}