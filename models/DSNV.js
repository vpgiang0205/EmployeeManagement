function DSNV() {
    this.arr = [];
    // Method:
    this.themNV = function (nv) {
        this.arr.push(nv)
    }

    // tim vi tri bang tknv
    this.timViTri = function (tknv) {
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.tknv === tknv) {
                index = i;
                break;
            }
        }
        return index; // add this line to return the index
    };


    this.xoa = function (tknv) {
        var index = this.timViTri(tknv);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    // edit
    this.layThongTinNV = function (tknv) {
        var index = this.timViTri(tknv);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };
    this.capNhatNV = function (nv) {
        var index = this.timViTri(nv.tknv);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };
}


DSNV.prototype.timKiemSV = function (keyword) {
    /**
     * 0. tao mangTimKiem = [];
     * 1. Duyet mang arr
     * 2. sv = arr[i];
     * 3. Nếu sv.tenSV trùng với keyword
     *      => true => Thêm sv vô mangTimKiem
     * 4. trả về mangTimKiem
     */
    var mangTimKiem = [];

    for (var i = 0; i < this.arr.length; i++) {
        var nv = this.arr[i];
        //Chuyển keyword về chữ viết thường
        var keywordToLowerCase = keyword.toLowerCase();
        //Chuyển nv.tennv về chữ viết thường
        var tkNVToLowerCase = nv.loainv.toLowerCase();
        if (tkNVToLowerCase.indexOf(keywordToLowerCase) !== -1) {
            mangTimKiem.push(nv);
        }
    }

    return mangTimKiem;
};
