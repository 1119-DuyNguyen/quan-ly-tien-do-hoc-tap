import { PaginationService } from '../../../smart-table-template/services/PaginationService';

export class Homework {
    static URL_POST = location.protocol + '//' + location.host + '/api/posts';
    static URL_EXCERCISE = location.protocol + '//' + location.host + '/api/exercises';
    static URL_BAI_TAP_SINH_VIEN = location.protocol + '//' + location.host + '/api/bai-tap-sinh-vien';
    static URL_FILE_BAI_TAP = location.protocol + '//' + location.host + '/api/file-bai-tap';
    static URL_CHAM_DIEM_SINH_VIEN = location.protocol + '//' + location.host + '/classroom/bai-tap';
    static _this = this;
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getTeacherBaiTapData(id, sortBaiTap) {
        this.#container.innerHTML = `<loader-component></loader-component>`;
        var BaiTapData;
        let html = '';
        let _this = this;
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        const urlNew = new URL(Homework.URL_EXCERCISE + `/${id}`);
        urlNew.searchParams.set('page', url.searchParams.get('page'));
        axios
            .get(urlNew.href, {
                params: {
                    sortBaiTap: `${sortBaiTap}`,
                },
            })
            .then((response) => {
                return response.data.data;
            })
            .then((data) => {
                BaiTapData = data.dataObject ? data.dataObject : [];
                BaiTapData.forEach((element, index) => {
                    html += `<div class="task" data-value="${decodeHtml(element.bai_dang_id)}">
                                <div class="task__container">
                                    <div class="task__author__avatar">
                                        <img src="../../img/person.png" alt="" />
                                    </div>
                                    <div class="task__text">
                                        <div class="task__text-1st">
                                            <div class="task__author__name">${decodeHtml(element.ten_nguoi_dang)}</div>
                                            <div class="task__title">đã đăng một bài tập mới: ${decodeHtml(
                                                element.tieu_de
                                            )}</div>
                                        </div>
                                        <div class="task__text-2nd">
                                            <div class="task__created-date">${decodeHtml(element.created_at)}</div>
                                        </div>
                                    </div>
                                    <div class="task__duration" style="width: fit-content; padding: 0px 5px;">${decodeHtml(
                                        Math.round(
                                            Math.abs(new Date() - new Date(`${element.ngay_ket_thuc}`)) /
                                                1000 /
                                                60 /
                                                60 /
                                                24
                                        )
                                    )}d<div>
                                    </div></div>
                                    
                                </div>
                                <div class="task__content">${decodeHtml(element.noi_dung)}</div>
                                <div class="feed-item-option" style="padding: 0 15px">
                                    <i class="fa-solid fa-pen-to-square" style="cursor: pointer"></i>
                                    <i class="fa-solid fa-trash-can" style="cursor: pointer"></i>
                                </div>
                                <div class="task__action task__action--blue">
                                    <a href="${decodeHtml(
                                        Homework.URL_CHAM_DIEM_SINH_VIEN + `/${element.bai_dang_id}`
                                    )}">Chấm điểm</a>
                                </div>
                                <div class="task__status task__status--green">
                                    <div class="task__status__icon">
                                        <img src="../../img/check-green.png" alt="" />
                                    </div>
                                </div>
                            </div>`;
                });
                this.#container.innerHTML = html;
                this.deleteBaiTap();
                this.editBaiTap();
                let pagination = new PaginationService(
                    _this.#container,
                    _this.getTeacherBaiTapData.bind(_this, id),
                    data.paginationOption
                );
                pagination.renderPagination();
            });
    }

    async getStudentBaiTapData(id, sortBaiTap) {
        this.#container.innerHTML = `<loader-component></loader-component>`;
        var BaiTapData;
        var tungBaiTapData;
        let html = '';
        let _this = this;
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        const urlNew = new URL(Homework.URL_EXCERCISE + `/${id}`);
        urlNew.searchParams.set('page', url.searchParams.get('page'));
        axios
            .get(urlNew.href, {
                params: {
                    sortBaiTap: `${sortBaiTap}`,
                },
            })
            .then((response) => {
                return response.data.data;
            })
            .then(async (data) => {
                BaiTapData = data.dataObject ? data.dataObject : [];

                let dataTungBaiTap = await axios.get(Homework.URL_BAI_TAP_SINH_VIEN).then(function (response) {
                    return response.data.data;
                });
                tungBaiTapData = dataTungBaiTap ? dataTungBaiTap : [];

                BaiTapData.forEach((element, index) => {
                    let doneBaiTap = false;
                    let baiTaphtml = '';
                    tungBaiTapData.forEach((ele, index) => {
                        if (ele.bai_tap_id === element.bai_dang_id) {
                            doneBaiTap = true;
                            baiTaphtml += `<div data-value='${ele.bai_tap_id}'  class='bai_nop_bai_tap' >Tải file đã nộp</div>`;
                        }
                    });

                    let now = new Date();
                    let ngay_ket_thuc = new Date(element.ngay_ket_thuc);
                    let ngay_con_lai = Math.round(Math.abs(now - ngay_ket_thuc) / 86400000);

                    html += `<div class="task" data-value="${decodeHtml(element.bai_dang_id)}">
                            <div class="task__container">
                                <div class="task__author__avatar">
                                    <img src="../../img/person.png" alt="" />
                                </div>
                                <div class="task__text">
                                    <div class="task__text-1st">
                                        <div class="task__author__name">${decodeHtml(element.ten_nguoi_dang)}</div>
                                        <div class="task__title">đã đăng một bài tập mới: ${decodeHtml(
                                            element.tieu_de
                                        )}</div>
                                    </div>
                                    <div class="task__text-2nd">
                                        <div class="task__created-date">${decodeHtml(element.created_at)}</div>
                                    </div>
                                </div>
                                <div class="task__duration" style="width: fit-content; padding: 0px 5px;">${decodeHtml(
                                    ngay_con_lai
                                )}
                                d<div>
                                </div></div>
                                
                            </div>
                            <div class="task__content">${decodeHtml(element.noi_dung)}</div>
                            <div style="padding: 0.4rem; background-color: rgba(42, 131, 255, 0.3);">NỘP FILE BÀI TẬP
                                <form 
                                    id="sinh_vien_nop_bai_tap_${decodeHtml(element.bai_dang_id)}"
                                    method="POST" 
                                    enctype="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        class="new-homework__form--file-input"
                                        id="sinh_vien_nop_bai_tap_${decodeHtml(element.bai_dang_id)}_files"
                                        name="files"
                                        multiple
                                    />
                                    <div class="new-homework__form--submit">
                                        <input type="submit" value="Nộp" />
                                        <button 
                                            class="new-homework__form--submit-cancel" 
                                            type="button"
                                            id="sinh_vien_xoa_bai_tap_${decodeHtml(element.bai_dang_id)}"
                                        >Xoá bài đã nộp</button>
                                    </div>
                                </form>
                            </div>
                            
                            
                        `;

                    if (doneBaiTap) {
                        html += `<div class="task__action task__action--blue">
                                <div>${baiTaphtml}</div>
                             </div>`;
                    } else {
                        html += `<div class="task__action task__action--blue">
                                <div>CHƯA NỘP</div>
                             </div>`;
                    }
                    html += `<div class="task__status task__status--green">Điểm: 
                            <div class="task__status__icon">
                                <img src="../../img/check-green.png" alt="" />
                            </div>
                        </div>
                        </div>`;
                });
                this.#container.innerHTML = html;
                this.sinhVienNopBaiTap();
                this.sinhVienXoaBaiTap();
                this.sinhVienDownBaiTap();
                let pagination = new PaginationService(
                    _this.#container,
                    _this.getStudentBaiTapData.bind(_this, id),
                    data.paginationOption
                );
                pagination.renderPagination();
            });
    }

    async addBaiTap(id) {
        const formData = new FormData(document.getElementById('class-center-container__class-dashboard--new-homework'));
        let time = document.querySelector(
            '#class-center-container__class-dashboard--new-homework .new-homework__date'
        ).value;
        time = time.toString().slice(0, 19).replace('T', ' ') + ':00';

        var formDataFilesLength = document.getElementById(
            'class-center-container__class-dashboard--edit-homework-files'
        ).files.length;
        for (var x = 0; x < formDataFilesLength; x++) {
            formData.append(
                'files[]',
                document.getElementById('class-center-container__class-dashboard--edit-homework-files').files[x]
            );
        }

        formData.append('loai_noi_dung', '2');
        formData.append('nhom_hoc_id', id);
        formData.append('ngay_ket_thuc', time);
        //cái này fix lại sau khi có auth
        formData.append('nguoi_dung_id', id);

        console.log(formData.get('ngay_ket_thuc'), time);
        await axios
            .post(Homework.URL_EXCERCISE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                alert('Đăng bài tập mới thành công');
                console.log(response);
            })
            .catch(function (error) {
                alert('Có lỗi khi đăng bài, vui lòng liên hệ bộ phận kĩ thuật để được khắc phục');
                console.log(error);
            });
        //document.getElementsByClassName('new-post__tilte').value = '';
        //document.getElementsByClassName('new-post__form--container-content').value = '';
        //document.getElementById('class-center-container__class-dashboard--new-post').style.display = 'none';
        //document.querySelector('.class-center-container__class-dashboard--post--add-btn').style.display = 'block';
    }

    deleteBaiTap() {
        let feedItems = document.querySelectorAll('.task-container .fa-trash-can');
        feedItems.forEach((element) => {
            element.addEventListener('click', (event) => {
                let bai_dang = element.parentElement.parentElement.dataset.value;
                if (confirm('Bạn có chắc muốn xoá bài viết này?')) {
                    axios
                        .delete(Homework.URL_POST + `/${bai_dang}`, {
                            headers: {
                                Accept: 'application/vnd.api+json',
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(function (response) {
                            alert('Đã xoá bài đăng thành công');
                        })
                        .catch(function (error) {
                            console.log(error);
                            alert('Có lỗi khi xoá bài, vui lòng liên hệ bộ phận kĩ thuật để được khắc phục');
                        });
                }
            });
        });
    }

    editBaiTap() {
        const editForm = document.getElementById('class-center-container__class-dashboard--edit-homework');

        var formDataFilesLength = document.getElementById(
            'class-center-container__class-dashboard--edit-homework-files'
        ).files.length;
        for (var x = 0; x < formDataFilesLength; x++) {
            formData.append(
                'files[]',
                document.getElementById('class-center-container__class-dashboard--edit-homework-files').files[x]
            );
        }

        let taskEditBtn = document.querySelectorAll('.task-container .fa-pen-to-square');

        taskEditBtn.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                let bai_dang = element.parentElement.parentElement.dataset.value;

                editForm.style.display = 'block';

                const cancelEditBtn = document.querySelector('.edit-form-cancel');
                cancelEditBtn.addEventListener('click', function (e) {
                    editForm.style.display = 'none';
                });
                editForm.addEventListener('submit', async function (e) {
                    e.preventDefault();
                    const formData = new FormData(
                        document.getElementById('class-center-container__class-dashboard--edit-homework')
                    );
                    let time = document.querySelector(
                        '#class-center-container__class-dashboard--edit-homework .new-homework__date'
                    ).value;

                    time = time.toString().slice(0, 19).replace('T', ' ') + ':00';

                    formData.append('ngay_ket_thuc', time);
                    formData.append('_method', 'put');

                    await axios
                        .put(Homework.URL_EXCERCISE + `/${bai_dang}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then(function (response) {
                            alert('Cập nhật mới thành công');
                            editForm.style.display = 'none';
                            console.log(response);
                        })
                        .catch(function (error) {
                            alert('Có lỗi khi cập nhật, vui lòng liên hệ bộ phận kĩ thuật để được khắc phục');
                            console.log(error);
                        });
                });
            });
        });
    }

    sinhVienNopBaiTap() {
        const baiTap = document.querySelectorAll('.class-center-container__class-dashboard--homework .task');
        baiTap.forEach((element, index) => {
            let bai_tap_id = element.dataset.value;
            const formNopBaiTap = document.querySelector(`#sinh_vien_nop_bai_tap_${bai_tap_id}`);

            //nộp bài tập
            formNopBaiTap.addEventListener('submit', async function (e) {
                e.preventDefault();
                const formNopBaiData = new FormData(document.getElementById(`sinh_vien_nop_bai_tap_${bai_tap_id}`));
                var formDataFilesLength = document.getElementById(`sinh_vien_nop_bai_tap_${bai_tap_id}_files`).files
                    .length;

                if (formDataFilesLength > 1) {
                    alert('Chỉ cho phép nộp 1 file cho một bài tập!');
                } else {
                    formNopBaiData.append('bai_tap_id', bai_tap_id);

                    await axios
                        .post(Homework.URL_BAI_TAP_SINH_VIEN, formNopBaiData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then(function (response) {
                            alert('Nộp bài tập mới thành công');
                            console.log(response);
                        })
                        .catch(function (error) {
                            alert('Có lỗi khi nộp bài, vui lòng liên hệ bộ phận kĩ thuật để được khắc phục');
                            console.log(error);
                        });
                }
            });
        });
    }

    sinhVienXoaBaiTap() {
        const xoaBaiTapBtns = document.querySelectorAll(
            '.class-center-container__class-dashboard--homework .new-homework__form--submit-cancel'
        );
        xoaBaiTapBtns.forEach((element, index) => {
            element.addEventListener('click', () => {
                let bai_tap_id = element.dataset.value;
                if (confirm('Bạn có chắc muốn xoá bài nộp?')) {
                    axios
                        .delete(Homework.URL_BAI_TAP_SINH_VIEN + `/${bai_tap_id}`, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then(function (response) {
                            alert('Xoá bài tập thành công');
                            console.log(response);
                        })
                        .catch(function (error) {
                            alert('Có lỗi khi xoá bài, vui lòng liên hệ bộ phận kĩ thuật để được khắc phục');
                            console.log(error);
                        });
                }
            });
        });
    }

    sinhVienDownBaiTap() {
        const btnDownBaiTapDaNop = document.querySelectorAll('.bai_nop_bai_tap');
        console.log(btnDownBaiTapDaNop);
        btnDownBaiTapDaNop.forEach((element) => {
            element.addEventListener('click', (e) => {
                let bai_tap_id = element.dataset.value;
                axios
                    .get(Homework.URL_FILE_BAI_TAP + `/${bai_tap_id}`, {
                        responseType: 'arraybuffer',
                    })
                    .then((response) => {
                        // Parses file, and creates proxy (local data-URL for file).
                        var proxy = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

                        // Download from proxy.
                        var link = document.createElement('a');
                        document.body.appendChild(link); // Maybe required by Fire-fox browsers.
                        link.href = proxy;
                        link.download = 'bai-tap-cua-toi.pdf';
                        link.click();

                        // Cleanup.
                        window.URL.revokeObjectURL(proxy);
                        link.remove();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
        });
    }
}
