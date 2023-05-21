function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            //Sai
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }

        //Dung
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };

    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (min <= value.length && value.length <= max) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }

        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraChuoiKiTu = function (value, errorId, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }

        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraPattern = function (value, letter, errorId, mess) {
        if (value.match(letter)) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }

        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    // Ngay:
    this.checkNgay = function (dateString, errorId, mess) {
        // Check if the input string matches the expected format
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
        }

        // Parse the input string into day, month, and year integers
        const [day, month, year] = dateString.split('/').map(Number);

        // Check if the year is valid (between 1900 and the current year)
        const currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
        }

        // Check if the month is valid (between 1 and 12)
        if (month < 1 || month > 12) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
        }

        // Check if the day is valid for the given month and year
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
        }

        // If all checks pass, the date is valid
        return true;
    }
    this.checkLuongCB = function (value, errorId, mess) {
        if (parseFloat(value) < 1000000 || parseFloat(value) > 20000000) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
        };
        return true
    }

    // ChucVu:
    this.checkChucVu = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }

        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.checkGioLam = function (value, errorId, mess) {
        if (parseInt(value) < 80 || parseInt(value) > 200){
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
        };
        return true
    }

    // Chek tknv ton tai chua

    this.kiemTraMaNVTonTai = function (value, errorId, mess, arr) {
        var exist = false;

        for (var i = 0; i < arr.length; i++) {
            var nv = arr[i];
            if (nv.tknv === value) {
                exist = true;
                break;
            }
        }

        if (exist) {
            //false
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }

        //true
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };
}
