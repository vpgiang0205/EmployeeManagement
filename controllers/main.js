var dsnv = new DSNV();
var validation = new Validation();

getLocalStorage();

function getEle(ele) {
    return document.getElementById(ele);
}

function layThongTinNV(isAdd) {
    var _tknv = getEle('tknv').value
    var _tennv = getEle('name').value
    var _email = getEle('email').value
    var _pass = getEle('password').value
    var _ngaylam = getEle('datepicker').value
    var _luongcb = getEle('luongCB').value
    var _chucvu = getEle('chucvu').value
    var _giolam = getEle('gioLam').value

    // 4. check Valid
    var isValid = true;
    if (isAdd) {
        // Valid tknv
        isValid &=
            validation.kiemTraRong(_tknv, "tbTKNV", "Tên đăng nhập không được để trống") &&
            validation.kiemTraDoDaiKiTu(_tknv, "tbTKNV", "(*) Vui long nhap 4 - 6 ki tu", 4, 6) &&
            validation.kiemTraMaNVTonTai(
                _tknv,
                "tbTKNV",
                "(*) Tên đăng nhập đã tồn tại!",
                dsnv.arr
            );
    }
    // Valid tennv
    isValid &=
        validation.kiemTraRong(_tennv, "tbTen", "Họ và Tên không được để trống") &&
        validation.kiemTraChuoiKiTu(_tennv, "tbTen", "(*) Tên không hợp lệ")

    // Valid Email
    isValid &=
        validation.kiemTraRong(_email, "tbEmail", "Email không được để trống") &&
        validation.kiemTraPattern(_email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "tbEmail", "(*) Email không hợp lệ!");

    // Valid Pass
    isValid &=
        validation.kiemTraRong(_pass, "tbMatKhau", "Mật Khẩu không được để trống") &&
        validation.kiemTraDoDaiKiTu(_tknv, "tbMatKhau", "(*) Vui lòng nhập 4 - 6 kí tự", 4, 10) &&
        validation.kiemTraPattern(_pass, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "tbMatKhau", "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt")

    // Valid ngaylam
    isValid &=
        validation.kiemTraRong(_ngaylam, "tbNgay", "Ngày làm không được để trống") &&
        validation.checkNgay(_ngaylam, "tbNgay", "(*) Ngày làm không hợp lệ")

    // Valid LuongCB
    isValid &=
        validation.kiemTraRong(_luongcb, "tbLuongCB", "Lương cơ bản không được để trống") &&
        validation.checkLuongCB(_luongcb, "tbLuongCB", "(*) Lương cơ bản từ 1000000 - 20000000")

    // Valid chucvu
    isValid &=
        validation.kiemTraRong("chucvu", "tbChucVu", "Chức vụ không được để trống") &&
        validation.checkChucVu("chucvu", "tbChucVu", "Chức vụ không hợp lệ")

    // Valid Giolam
    isValid &=
        validation.kiemTraRong(_giolam, "tbGiolam", "Giờ làm không được để trống")

    if (!isValid) return null;

    // 3. Tao doi tuong NhanVien -> vao NhanVien.js xem them
    var nv = new NhanVien(_tknv, _tennv, _email, _pass, _ngaylam, _luongcb, _chucvu, _giolam)
    nv.tongLuongNV();
    nv.xepLoaiNV();
    return nv
}

// 2. Them nhan vien
getEle("btnThemNV").addEventListener("click", function (event) {
    //ngăn chặn load lại trang
    event.preventDefault();
    
    var nv = layThongTinNV(true);
    console.log(nv)
    if (nv) {
        //them sv vao mang arr cua DSSV
        dsnv.themNV(nv);
        
        renderTable(dsnv.arr);
        
        setLocalStorage();
        $('#myModal').modal('hide');
    }
    
});

// 1. In ra table
function renderTable(data) {
    var content = "";

    for (var i = 0; i < data.length; i++) {
        var nv = data[i];
        // 5. Tinh tong luong -> NhanVien.js 
        // 6. Xep loai -> NhanVien.js
        content += `
        <tr>
            <td>${nv.tknv}</td>
            <td>${nv.tennv}</td>
            <td>${nv.email}</td>
            <td>${nv.ngaylam}</td>
            <td>${nv.chucvu}</td>
            <td>${nv.tongluong}</td>
            <td>${nv.loainv}</td>
            <td>
                <button class="btn btn-info" onclick="editNV('${nv.tknv}')">Edit</button>
                <button class="btn btn-danger" onclick="xoaNV('${nv.tknv}')">Delete</button>
            </td>
        </tr>
    `;
    }
    getEle("tableDanhSach").innerHTML = content;

}

function setLocalStorage() {
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", dataString)
}

function getLocalStorage() {
    //check condition
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //convert String => Json
        dsnv.arr = JSON.parse(dataString);
        //render table
        renderTable(dsnv.arr);
    }
}

// 7. Xoa Nhan Vien
function xoaNV(tknv) {
    dsnv.xoa(tknv);
    renderTable(dsnv.arr);
    setLocalStorage();
}

// 8. Cap nhat nhan vien
function editNV(tknv) {
    var nv = dsnv.layThongTinNV(tknv);

    $('#myModal').modal('show');
    getEle("btnThemNV").style.display = "none";

    if (nv) {
        //DOM toi cac the input show value
        getEle("tknv").value = nv.tknv;
        getEle("tknv").disabled = true;

        getEle('name').value = nv.tennv
        getEle('email').value = nv.email
        getEle('password').value = nv.pass
        getEle('datepicker').value = nv.ngaylam
        getEle('luongCB').value = nv.luongcb
        getEle('chucvu').value = nv.chucvu
        getEle('gioLam').value = nv.giolam

        // add event listener to "Update" button
        getEle("btnCapNhat").addEventListener("click", function (event) {
            event.preventDefault();
            var nv = layThongTinNV(false);
            dsnv.capNhatNV(nv);
            renderTable(dsnv.arr);
            setLocalStorage();
            $('#myModal').modal('hide');
        });
    }
}

// 9. Tim kiem
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemSV(keyword);
    renderTable(mangTimKiem);
});
