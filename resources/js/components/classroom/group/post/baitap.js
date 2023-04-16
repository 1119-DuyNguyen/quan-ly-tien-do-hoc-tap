import axios from 'axios';

export class BaiTap {
    static URL_POST = location.protocol + '//' + location.host + '/api/posts';
    static URL_EXCERCISE = location.protocol + '//' + location.host + '/api/exercises';
    static _this = this;
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getTeacherBaiTapData(id) {
        var BaiTapData;
        let html = '';
        let data = await axios.get(BaiTap.URL_EXCERCISE + `/${id}`).then(function (response) {
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
                            <div>Xem thêm</div>
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
        let data = await axios.get(BaiTap.URL_EXCERCISE + `/${id}`).then(function (response) {
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
                        <div class="task__action task__action--blue">
                            <div>Xem thêm</div>
                        </div>
                        <div class="task__status task__status--green">
                            <div class="task__status__icon">
                                <img src="../../img/check-green.png" alt="" />
                            </div>
                        </div>
                    </div>`;
        });
        this.#container.innerHTML = html;
    }

    async addBaiTap(id) {
        const formData = new FormData(document.getElementById('class-center-container__class-dashboard--new-homework'));
        let time = document.querySelector(
            '#class-center-container__class-dashboard--new-homework .new-homework__date'
        ).value;
        time = time.toString().slice(0, 19).replace('T', ' ') + ':00';

        formData.append('loai_noi_dung', '2');
        formData.append('nhom_hoc_id', id);
        formData.append('ngay_ket_thuc', time);
        //cái này fix lại sau khi có auth
        formData.append('nguoi_dung_id', id);

        console.log(formData.get('ngay_ket_thuc'), time);
        await axios
            .post(BaiTap.URL_EXCERCISE, formData, {
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
                        .delete(BaiTap.URL_POST + `/${bai_dang[2]}`, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
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

        let taskEditBtn = document.querySelectorAll('.task-container .fa-pen-to-square');

        taskEditBtn.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                let bai_dang = element.parentElement.parentElement.id.split('_');

                editForm.style.display = 'block';

                const cancelEditBtn = document.querySelector('.edit-form-cancel');
                cancelEditBtn.addEventListener('click', function (e) {
                    editForm.style.display = 'none';
                });

                const tieu_de_edit = document.querySelector(
                    '#class-center-container__class-dashboard--edit-homework .new-homework__date .new-homework__title'
                );

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
                        .put(BaiTap.URL_EXCERCISE + `/${bai_dang[2]}`, formData, {
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
}
