import { alertComponent } from "../../components/helper/alert-component";
import NiceSelect from "../../components/helper/nice-select";
import { toast } from "../../components/helper/toast";
import { SmartTableTemplate } from "../../components/smart-table-template/SmartTableTemplate";
import { PaginationService } from "../../components/smart-table-template/services/PaginationService";
import { TableTree } from "../../components/table-tree";
import { routeHref } from "../../routes/route";

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export class AdministrativeClasses {
    static URL = location.protocol + '//' + location.host + '/classes';
    static URL_ADMIN = location.protocol + '//' + location.host + '/api/admin';
    static URL_LIST = location.protocol + '//' + location.host + '/api/admin/classes';

    static index() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const class_idn = (urlParams.get('class_idn') === null) ? "" : urlParams.get('class_idn');
        const renderDSLop = async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const page = (urlParams.get('page') === null) ? 1 : urlParams.get('page');
            const class_idn = (urlParams.get('class_idn') === null) ? "" : urlParams.get('class_idn');

            let ds_lop = await axios.get(AdministrativeClasses.URL_LIST + '?class_idn='+class_idn+'&page='+page).then(response => response.data.data)

            document.querySelector("#ds_lop table").innerHTML = `<thead>
                <tr>
                    <th>Mã lớp</th>
                    <th>Tên lớp</th>
                    <th>Số lượng sinh viên</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody></tbody>`
            ds_lop.dataObject.forEach(element => {
                let html = `<tr>
                    <td>${element.ma_lop}</td>
                    <td>${element.ten_lop}</td>
                    <td>${element.so_luong_sinh_vien}</td>
                    <td><a href="${AdministrativeClasses.URL + "/" + element.id}" class="xem_chi_tiet_lop">Xem chi tiết</a></td>
                </tr>`;
                document.querySelector("#ds_lop tbody").insertAdjacentHTML('beforeend', html);
            });

            if (ds_lop.dataObject.length == 0) {
                document.querySelector('#ds_lop').innerHTML = "Không tìm thấy lớp!";
            }

            const xem_chi_tiet_lop = document.querySelectorAll(".xem_chi_tiet_lop");

            xem_chi_tiet_lop.forEach(lop => {
                lop.addEventListener('click', e => {
                    e.preventDefault();
                    routeHref(lop.getAttribute('href'));
                });
            })
        }
        
        const renderTblLop = (data) => {
            document.querySelector('#ds_lop').innerHTML = `<div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã lớp</th>
                            <th>Tên lớp</th>
                            <th>Số lượng sinh viên</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>`;
            // new SmartTableTemplate
            const paginateContainer = new PaginationService(document.querySelector('#ds_lop'), renderDSLop, data.paginationOption);
            paginateContainer.renderPagination();
            renderDSLop();
        }
        axios.get(AdministrativeClasses.URL_LIST+"?class_idn="+class_idn).then(response => {
            document.querySelector('#ds_lop').innerHTML = "<loader-component></loader-component>";
            renderTblLop(response.data.data);
        }).catch(error => {
            console.error(error);
        });

        document.querySelector("#tim_lop").addEventListener('submit', e => {
            e.preventDefault();

            const lop_can_tim = document.querySelector("#lop_can_tim");
            routeHref(AdministrativeClasses.URL + "?class_idn=" + lop_can_tim.value);

            document.querySelector('#ds_lop').innerHTML = "<loader-component></loader-component>";
            axios.get(AdministrativeClasses.URL_LIST+"?class_idn="+lop_can_tim.value).then(response => {
                renderTblLop(response.data.data);
            }).catch(error => {
                console.error(error);
            });
        })

        document.querySelector("#them_lop").addEventListener('click', e => {
            routeHref(AdministrativeClasses.URL + "/add");
        });
    }

    static add() {

        let obj_lop = {
            ma_lop: '',
            ten_lop: '',
            ma_ctdt: -1,
            ma_cvht: null,
            bat_dau: null,
            ket_thuc: null,
        }

        const chon_ctdt = document.querySelector("#chon_ctdt");
        const chon_cvht = document.querySelector("#chon_cvht");
        const chon_bat_dau = document.querySelector("#bat_dau");
        const chon_ket_thuc = document.querySelector("#ket_thuc");

        axios.get(AdministrativeClasses.URL_ADMIN + '/classes-program').then(response => {
            const data = response.data.data;

            if (data === null) return;

            data.forEach(ctdt => {
                const option = document.createElement("option");
                option.value = ctdt.id;
                option.text = `${ctdt.ten} - ${ctdt.ten_nganh} - ${ctdt.ten_khoa} - ${ctdt.nam_bat_dau}-${ctdt.nam_ket_thuc}`;
                chon_ctdt.add(option);
            })

            const chonCTDTNiceSelector = new NiceSelect(chon_ctdt, {
                searchable: true,
                maxSelectedOption: 1
            })
        }).catch(error => {
            console.error(error);
        })

        axios.get(AdministrativeClasses.URL_ADMIN + '/classes-advisor').then(response => {
            const data = response.data.data;
            if (data === null) return;

            data.forEach(cvht => {
                const option = document.createElement("option");
                option.value = cvht.id;
                option.text = `${cvht.ten_dang_nhap} - ${cvht.ten}`;
                chon_cvht.add(option);
            });

            const chonCVHTNiceSelector = new NiceSelect(chon_cvht, {
                searchable: true,
                maxSelectedOption: 1
            })
        })

        chon_ctdt.addEventListener('change', () => {
            obj_lop.ma_ctdt = parseInt(chon_ctdt.value);

            console.log('chon_ctdt changed');
        })
        chon_cvht.addEventListener('change', () => {
            obj_lop.ma_cvht = parseInt(chon_cvht.value);

            if (parseInt(chon_cvht.value) == -1) obj_lop.ma_cvht = null;
        })

        chon_bat_dau.addEventListener('change', () => {
            obj_lop.bat_dau = chon_bat_dau.value + " 00:00:00";
        })
        chon_ket_thuc.addEventListener('change', () => {
            obj_lop.ket_thuc = chon_ket_thuc.value + " 23:59:59";
        })

        document.querySelector('#tao_moi').addEventListener('click', () => {

            obj_lop.ma_lop = document.querySelector("#ma_lop").value;
            obj_lop.ten_lop = document.querySelector("#ten_lop").value;

            if (obj_lop.ma_lop.length == 0) {
                toast({
                    title: 'Lỗi',
                    message: 'Mã lớp không được để trống!',
                    type: 'error',
                    duration: 3000
                })
                document.querySelector("#ma_lop").focus();
                return;
            }

            if (obj_lop.ten_lop.length == 0) {
                toast({
                    title: 'Lỗi',
                    message: 'Tên lớp không được để trống!',
                    type: 'error',
                    duration: 3000
                })
                document.querySelector("#ten_lop").focus();
                return;
            }

            if (obj_lop.ma_ctdt == -1) {
                toast({
                    title: 'Lỗi',
                    message: 'Hãy chọn chương trình đào tạo!',
                    type: 'error',
                    duration: 3000
                })
                chon_ctdt.focus();
                return;
            }

            axios.post(AdministrativeClasses.URL_LIST, obj_lop).then((response) => {
                routeHref(AdministrativeClasses.URL + '/' + response.data.data);
            }).catch((error) => {
                console.error(error);
                toast({
                    title: 'Lỗi!',
                    message: error.response.data.message,
                    type: 'error',
                    duration: 3000
                })
            })
        })
    }

    static async view({id}) {
        const chon_ctdt = document.querySelector("#chon_ctdt");
        const chonCTDTNiceSelector = new NiceSelect(chon_ctdt, {
            searchable: true,
            maxSelectedOption: 1
        })

        const chon_cvht = document.querySelector("#chon_cvht");
        const chonCVHTNiceSelector = new NiceSelect(chon_cvht, {
            searchable: true,
            maxSelectedOption: 1
        })

        const chon_bat_dau = document.querySelector("#bat_dau");
        const chon_ket_thuc = document.querySelector("#ket_thuc");

        await axios.get(AdministrativeClasses.URL_ADMIN + '/classes-program').then(response => {
            const data = response.data.data;

            data.forEach(ctdt => {
                const option = document.createElement("option");
                option.value = ctdt.id;
                option.text = `${ctdt.ten} - ${ctdt.ten_nganh} - ${ctdt.ten_khoa} - ${ctdt.nam_bat_dau}-${ctdt.nam_ket_thuc}`;
                chon_ctdt.add(option);
            })
        }).catch(error => {
            console.error(error);
            toast({
                title: 'Lỗi!',
                message: error.response.data.message,
                type: 'error',
                duration: 3000
            })
        })

        await axios.get(AdministrativeClasses.URL_ADMIN + '/classes-advisor').then(response => {
            const data = response.data.data;
            if (data === null) return;

            data.forEach(cvht => {
                const option = document.createElement("option");
                option.value = cvht.id;
                option.text = `${cvht.ten_dang_nhap} - ${cvht.ten}`;
                chon_cvht.add(option);
            });
            chonCVHTNiceSelector.update();
        })

        await axios.get(AdministrativeClasses.URL_LIST + '/' + id).then(response => {
            const data = response.data.data;

            if (data.chuong_trinh_dao_tao_id === null)
                chon_ctdt.value = -1;
            else
                chon_ctdt.value = data.chuong_trinh_dao_tao_id;

            chon_ctdt.options[chon_ctdt.selectedIndex].setAttribute('selected', 'selected');

            chonCTDTNiceSelector.update();

            document.querySelector("#ma_lop").value = data.ma_lop;
            document.querySelector("#ten_lop").value = data.ten_lop;

            if (data.co_van_hoc_tap_id === null) 
                chon_cvht.value = -1;
            else chon_cvht.value = data.co_van_hoc_tap_id;

            chon_cvht.options[chon_cvht.selectedIndex].setAttribute('selected', 'selected');

            chonCVHTNiceSelector.update();
            
            chon_bat_dau.value = formatDate(data.thoi_gian_vao_hoc)
            chon_ket_thuc.value = formatDate(data.thoi_gian_ket_thuc)
        }).catch(error => {
            console.error(error);
            toast({
                title: 'Lỗi!',
                message: error.response.data.message,
                type: 'error',
                duration: 3000
            })
        })

        document.querySelector('#chinh_sua').addEventListener('click', () => {
            routeHref(AdministrativeClasses.URL + '/' + id + '/edit');
        })

        document.querySelector('#xoa').addEventListener('click', () => {
            if (confirm("Bạn có muốn xoá lớp này không?")) {
                axios.delete(AdministrativeClasses.URL_LIST+'/' + id).then((response) => {
                    routeHref(AdministrativeClasses.URL);
                }).catch((error) => {
                    console.error(error);

                    toast({
                        type: 'error',
                        title: "Xảy ra lỗi khi xoá lớp!"
                    })
                })
            }
        })

        AdministrativeClasses.sv_thuoc_lop({id});
    }

    static edit({id}) {
        AdministrativeClasses.view({ id });

        let obj_lop = {
            ma_lop: '',
            ten_lop: '',
            ma_ctdt: -1,
            ma_cvht: null,
            bat_dau: null,
            ket_thuc: null,
        }

        document.querySelector("#chinh_sua").addEventListener('click', async () => {
            const chon_bat_dau = document.querySelector("#bat_dau");
            const chon_ket_thuc = document.querySelector("#ket_thuc");

            obj_lop = {
                ma_lop: document.querySelector('#ma_lop').value,
                ten_lop: document.querySelector('#ten_lop').value,
                ma_ctdt: document.querySelector('#chon_ctdt').value,
                ma_cvht: (document.querySelector('#chon_cvht').value == -1) ? null : document.querySelector('#chon_cvht').value,
                bat_dau: chon_bat_dau.value + " 00:00:00",
                ket_thuc: chon_ket_thuc.value + " 23:59:59",
            }

            axios.put(AdministrativeClasses.URL_LIST + '/' + id, obj_lop).then((response) => {
                routeHref(AdministrativeClasses.URL + '/' + id);
            }).catch((error) => {
                console.error(error);
                toast({
                    title: 'Lỗi!',
                    message: error.response.data.message,
                    type: 'error',
                    duration: 3000
                })
            })
        })

    }

    static renderDSSVTable() {
        const dssv_table = document.querySelector('#dssv_table');
        if (dssv_table === null)
            return;
        dssv_table.innerHTML = `<div class='dssv_table'>
            <table>
                <thead>
                    <tr>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>`;
    }

    static addSVToDSSVTable(ten_dang_nhap, ten, id_sv) {
        const dssv_table = document.querySelector('#dssv_table tbody');

        if (dssv_table === null) return;
        dssv_table.innerHTML += `<tr class='sinhvien' data-id='${id_sv}'>
            <td>${ten_dang_nhap}</td>
            <td>${ten}</td>
            <td><button class='btn btn--danger del_sv' id='del_sv_${id_sv}' style='margin: .5rem 0' data-id='${id_sv}'>Xoá khỏi danh sách</button></td>
        </tr>`;

        setTimeout(() => {
            document.querySelector(`#del_sv_${id_sv}`).addEventListener('click', e => {
                AdministrativeClasses.removeSVFromDSSVTable(id_sv);
            })
        }, 1);
    }

    static removeSVFromDSSVTable(id) {
        const dssv = document.querySelectorAll('.sinhvien');

        dssv.forEach(sv => {
            if (sv.dataset.id == id) {
                sv.remove();
            }
        })
    }

    static formAddSv(id_class) {
        const sv_to_dssv_form = document.querySelector('#sv_to_dssv_form');

        if (sv_to_dssv_form === null) return;
        
        sv_to_dssv_form.addEventListener('submit', e => {
            e.preventDefault();

            const sv_to_dssv = document.querySelector('#sv_to_dssv');
            let sv_idn = sv_to_dssv.value;
            if (sv_idn.length == 0) 
                sv_idn = 'none';

            axios.get(AdministrativeClasses.URL_LIST + '/'+ id_class + '/student/' + sv_idn).then(response => {
                const data = response.data.data
                if (data === null) {
                    toast({
                        title: "Không tìm thấy sinh viên!",
                        type: 'error'
                    })
                    return;
                }
                AdministrativeClasses.removeSVFromDSSVTable(data.id);
                AdministrativeClasses.addSVToDSSVTable(data.ten_dang_nhap, data.ten, data.id);
                toast({
                    title: "Thêm sinh viên thành công!",
                    type: 'success'
                })
            })
        })
    }

    static async sv_thuoc_lop({id}) {
        AdministrativeClasses.renderDSSVTable();
        await axios.get(AdministrativeClasses.URL_LIST + '/' + id + '/student').then(response => {
            const data = response.data.data;

            if (data === null)
                return;
            
            data.forEach(sv => {
                AdministrativeClasses.addSVToDSSVTable(sv.ten_dang_nhap, sv.ten, sv.id);
            })
        })

        AdministrativeClasses.formAddSv(id);

        const cap_nhat_dssv = document.querySelector('#cap_nhat_dssv')

        if (cap_nhat_dssv === null) return;

        cap_nhat_dssv.addEventListener('click', () => {
            const dssv = document.querySelectorAll('.sinhvien');

            if (dssv === null) return;
            let sv_arr = [];
            dssv.forEach(sv => {
                sv_arr.push(sv.dataset.id);
            })

            axios.post(AdministrativeClasses.URL_LIST + '/' + id + '/student', {
                dssv: sv_arr
            }).then(response => {
                console.log(response.data.data);
            })
        })
    }
}