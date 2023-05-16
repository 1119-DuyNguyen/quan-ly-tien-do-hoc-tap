export class Homework {
    static URL_POST = location.protocol + '//' + location.host + '/api/posts';
    static URL_EXCERCISE = location.protocol + '//' + location.host + '/api/exercises';
    static URL_BAI_TAP_SINH_VIEN = location.protocol + '//' + location.host + '/api/bai-tap-sinh-vien';
    static URL_FILE_BAI_TAP = location.protocol + '//' + location.host + '/classroom/file-bai-tap';
    static _this = this;
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getTeacherBaiTapData(id) {
        var BaiTapData;
        let html = '';
        let data = await axios.get(Homework.URL_EXCERCISE + `/${id}`).then(function (response) {
            return response.data.data;
        });
        BaiTapData = data ? data : [];
        BaiTapData.forEach((element, index) => {
            html += `<div class="task" id="bai_dang_${decodeHtml(element.bai_dang_id)}">
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
                                    Math.abs(new Date() - new Date(`${element.ngay_ket_thuc}`)) / 1000 / 60 / 60 / 24
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
    }

    async getStudentBaiTapData(id) {
        var BaiTapData;
        let html = '';
        let data = await axios.get(Homework.URL_EXCERCISE + `/${id}`).then(function (response) {
            return response.data.data;
        });
        BaiTapData = data ? data : [];
        BaiTapData.forEach(async (element, index) => {
            // var fileHref;
            // let fileLink = axios
            //     .get(BaiTap.URL_BAI_TAP_SINH_VIEN + `/${element.bai_dang_id}`)
            //     .then(function (response) {
            //         return response.data;
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
            // fileHref = fileLink ? fileLink : 'a';
            // console.log(fileHref);
            axios
                .get(Homework.URL_BAI_TAP_SINH_VIEN + `/${element.bai_dang_id}`)
                .then(function (response) {
                    console.log(response.data.data);
                    console.log(element.bai_dang_id);
                })
                .catch(function (err) {
                    console.log(err);
                });

            html += `<div class="task" id="bai_dang_${decodeHtml(element.bai_dang_id)}">
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
                                    Math.abs(new Date() - new Date(`${element.ngay_ket_thuc}`)) / 1000 / 60 / 60 / 24
                                )
                            )}d<div>
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
                        <div class="task__action task__action--blue">
                            <div>Xem thêm</div>
                        </div>
                        <div class="task__status task__status--green">Điểm: 
                            <div class="task__status__icon">
                                <img src="../../img/check-green.png" alt="" />
                            </div>
                        </div>
                    </div>`;
        });
        this.#container.innerHTML = html;
        this.sinhVienNopBaiTap();
        this.sinhVienXoaBaiTap();
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
                let bai_dang = element.parentElement.parentElement.id.split('_');
                if (confirm('Bạn có chắc muốn xoá bài viết này?')) {
                    axios
                        .delete(Homework.URL_POST + `/${bai_dang[2]}`, {
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
                let bai_dang = element.parentElement.parentElement.id.split('_');

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
                        .put(Homework.URL_EXCERCISE + `/${bai_dang[2]}`, formData, {
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
            let bai_tap_id = element.id.split('_');
            const formNopBaiTap = document.querySelector(`#sinh_vien_nop_bai_tap_${bai_tap_id[2]}`);

            //nộp bài tập
            formNopBaiTap.addEventListener('submit', async function (e) {
                e.preventDefault();
                const formNopBaiData = new FormData(document.getElementById(`sinh_vien_nop_bai_tap_${bai_tap_id[2]}`));
                var formDataFilesLength = document.getElementById(`sinh_vien_nop_bai_tap_${bai_tap_id[2]}_files`).files
                    .length;

                if (formDataFilesLength > 1) {
                    alert('Chỉ cho phép nộp 1 file cho một bài tập!');
                } else {
                    formNopBaiData.append('bai_tap_id', bai_tap_id[2]);

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

            //xoá bài tập
        });
    }

    sinhVienXoaBaiTap() {
        const xoaBaiTapBtns = document.querySelectorAll(
            '.class-center-container__class-dashboard--homework .new-homework__form--submit-cancel'
        );
        xoaBaiTapBtns.forEach((element, index) => {
            element.addEventListener('click', () => {
                let bai_tap_id = element.id.split('_');
                if (confirm('Bạn có chắc muốn xoá bài nộp?')) {
                    axios
                        .delete(Homework.URL_BAI_TAP_SINH_VIEN + `/${bai_tap_id[5]}`, {
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
}
