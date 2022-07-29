//Hàm in dữ liệu 1 mảng ra giao diện
function render(arr) {
    var html = '';
    for (var i = 0; i < arr.length; i++) {
        var product = arr[i];
        html += `
        <tr>
            <td>${product.id}</td>
            <td><img src=${product.img} style="width:50px; height: 50px; border-radius: 50%; margin-right: 8px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-primary mr-2" title="edit" onclick="chinhSua('${product.id}')"><i class="fa fa-pen-to-square"></i>Sửa</button>
                <button class="btn btn-danger" title="delete" onclick="xoaProduct('${product.id}')"><i class="fa fa-trash-can"></i>Xóa</button>
            </td>
        </tr>`;
    }
    document.querySelector('#tblSanPham').innerHTML = html;
}

//---------------- GET: lấy dữ liêu từ server-------------
function layDanhSachProduct() { 
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });
    //Xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        //Sau khi lấy dữ liệu từ backend về dùng dữ liệu đó tạo ra tr trên table
        render(result.data);
    });
    //Xử lý thất bại
    promise.catch(function (err) {
        console.log(err);
    });
}
//Gọi hàm lấy dữ liệu từ server khi trang web vừa load xong
window.onload = function () {
    layDanhSachProduct();
}

//--------------- POST: Thêm dữ liệu (Tạo dữ liệu) --------------------
document.querySelector('#btnCreate').onclick = function () {
    var product = new SanPham();
    //Lấy thông tin từ phía giao diện
    product.id = document.querySelector('#id').value;
    product.img = document.querySelector('#img').value;
    product.name = document.querySelector('#name').value;
    product.type = document.querySelector('#type').value;
    product.price = document.querySelector('#price').value;
    product.description = document.querySelector('#description').value;

    //Gọi api đưa dữ liệu về backend
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: product, // dữ liệu gửi đi
    });
    promise.then(function (result) {
        console.log('Create',result.data);
        //Gọi lại api lấy danh sách sinh viên sau khi thêm thành công
        layDanhSachProduct();
    });
    promise.catch(function (err) {
        console.log(err);
    });
}

//--------------- DEL: Xóa dữ liệu --------------------
function xoaProduct(product) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + product,
        method: 'DELETE',
    });
    //Thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachProduct();
    });
    //Thất bại
    promise.catch(function (err) {
        console.log(err);
    });
}

//--------------- EDIT: Chỉnh sửa dữ liệu --------------------
function chinhSua(product) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + product,
        method: 'GET'
    })
    //Thành công
    promise.then(function (result) {
        var product = result.data;
        document.querySelector('#id').value = product.id;
        document.querySelector('#img').value = product.img;
        document.querySelector('#name').value = product.name;
        document.querySelector('#type').value = product.type;
        document.querySelector('#price').value = product.price;
        document.querySelector('#description').value = product.description;
    });
    //Thất bại
    promise.catch(function (err) {
        console.log(err);
    })
}

//--------------- PUT: Cập nhật dữ liệu --------------------
document.querySelector('#btnUpdate').onclick = function () {
    var productUpdate = new SanPham();
    productUpdate.id = document.querySelector('#id').value;
    productUpdate.img = document.querySelector('#img').value;
    productUpdate.name = document.querySelector('#name').value;
    productUpdate.type = document.querySelector('#type').value;
    productUpdate.price = document.querySelector('#price').value;
    productUpdate.description = document.querySelector('#description').value;
    //Call api
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + productUpdate.id,
        method: 'PUT',
        data: productUpdate
    });
    promise.then(function (result) {
        //Thành công
        console.log(result.data);
        layDanhSachProduct();
    });
    promise.catch(function (err) {
        console.log(err);
    })
}
//--------------- SEARCH: Tìm kiếm dữ liệu --------------------
document.querySelector('#btnTimKiem').onclick = function () {
    var nameProduct = document.querySelector('#search').value;
    console.log(nameProduct);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/SearchByName?name=' + nameProduct,
        method: 'GET',
    });
    //Xử lý thành công
    promise.then(function (result) {
        console.log(result);
        render(result.data);
    });
    //Xử lý thất bại
    promise.catch(function (err) {
        console.log('Không tìm thấy',err);;
    });
}
