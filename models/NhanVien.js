function NhanVien(_tknv, _tennv, _email, _pass, _ngaylam, _luongcb, _chucvu, _giolam) {
    this.tknv = _tknv;
    this.tennv = _tennv;
    this.email = _email;
    this.pass = _pass;
    this.ngaylam = _ngaylam;
    this.luongcb = _luongcb;
    this.chucvu = _chucvu;
    this.giolam = _giolam;
    this.tongluong = 0;
    this.loainv = "";
    // Method:
    this.tongLuongNV = function () {
        if (this.chucvu == "Sếp") {
            this.tongluong = (Number(this.luongcb) * 3)
        }
        if (this.chucvu == "Trưởng phòng") {
            this.tongluong = (Number(this.luongcb) * 2)
        }
        if (this.chucvu == "Nhân viên") {
            this.tongluong = (Number(this.luongcb))
        }
    }

    this.xepLoaiNV = function () {
        if (parseInt(this.giolam) >= 192) {
            this.loainv = "Nhân viên xuất sắc"
        }
        else if (parseInt(this.giolam) >= 176) {
            this.loainv = "Nhân viên giỏi"
        }
        else if (parseInt(this.giolam) >= 160) {
            this.loainv = "Nhân viên khá"
        }
        else if (parseInt(this.giolam) < 160) {
            this.loainv = "Nhân viên trung bình"
        }
    }
}