import axios from 'axios';

export class Post {
    static URL_POST = location.protocol + '//' + location.host + '/api/posts';
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getTeacherPostData(id) {
        var postData;
        let html = '';
        let data = await axios.get(Post.URL_POST + `/${id}`).then(function (response) {
            return response.data.data;
        });
        postData = data ? data : [];
        postData.forEach((element, index) => {
            html += `<div class="feed-item" id="bai_dang_${decodeHtml(element.bai_dang_id)}">
                    <div class="feed-item__header">
                        <img src="../../img/icon.png" />
                        <div class="feed-item__header--text">
                            <strong>${decodeHtml(element.ten_nguoi_dang)} </strong>
                            <span>
                                đã thêm 1 bài đăng mới: ${decodeHtml(element.tieu_de)}
                            </span>
                            <div class="feed-item__header--text-time">${decodeHtml(element.created_at)}</div>
                        </div>
                    </div>
                    <div class="feed-item__content">
                        <div class="feed-item__content-1">${decodeHtml(element.noi_dung)}</div>
                    </div>
                    <div class="feed-item-option">
                        <i class="fa-solid fa-pen-to-square" style="cursor: pointer"></i>
                        <i class="fa-solid fa-trash-can" style="cursor: pointer"></i>
                    </div>
                    <form class="feed-item__comment">
                        <img src="../../img/icon.png" />
                        <input type="text" class="feed-item__comment--input" />
                        <input type="submit" class="feed-item__comment--btn" value="Bình luận" />
                    </form>
                </div>`;
        });
        this.#container.innerHTML = html;
        this.deletePost();
        this.editPost();
    }

    async getStudentPostData(id) {
        var postData;
        let html = '';
        let data = await axios.get(Post.URL_POST + `/${id}`).then(function (response) {
            return response.data.data;
        });
        postData = data ? data : [];
        postData.forEach((element, index) => {
            html += `<div class="feed-item" id="bai_dang_${decodeHtml(element.bai_dang_id)}">
                    <div class="feed-item__header">
                        <img src="../../img/icon.png" />
                        <div class="feed-item__header--text">
                            <strong>${decodeHtml(element.ten_nguoi_dang)} </strong>
                            <span>
                                đã thêm 1 bài đăng mới: ${decodeHtml(element.tieu_de)}
                            </span>
                            <div class="feed-item__header--text-time">${decodeHtml(element.created_at)}</div>
                        </div>
                    </div>
                    <div class="feed-item__content">
                        <div class="feed-item__content-1">${decodeHtml(element.noi_dung)}</div>
                    </div>
                    <form class="feed-item__comment">
                        <img src="../../img/icon.png" />
                        <input type="text" class="feed-item__comment--input" />
                        <input type="submit" class="feed-item__comment--btn" value="Bình luận" />
                    </form>
                </div>`;
        });
        this.#container.innerHTML = html;
    }

    async addPost(id) {
        const formData = new FormData(document.getElementById('class-center-container__class-dashboard--new-post'));

        formData.append('loai_noi_dung', '1');
        formData.append('nhom_hoc_id', id);
        //cái này fix lại sau khi có auth
        formData.append('nguoi_dung_id', id);

        await axios
            .post(Post.URL_POST, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                alert('Đăng bài viết mới thành công');
                console.log(response);
            })
            .catch(function (error) {
                alert('Có lỗi khi đăng bài, vui lòng liên hệ bộ phận kĩ thuật để được khắc phục');
                console.log(error);
            });
        document.getElementsByClassName('new-post__tilte').value = '';
        document.getElementsByClassName('new-post__form--container-content').value = '';
        document.getElementById('class-center-container__class-dashboard--new-post').style.display = 'none';
        document.querySelector('.class-center-container__class-dashboard--post--add-btn').style.display = 'block';
    }

    deletePost() {
        let feedItems = document.querySelectorAll('.feed-item .fa-trash-can');
        feedItems.forEach((element) => {
            element.addEventListener('click', (event) => {
                let bai_dang = element.parentElement.parentElement.id.split('_');
                if (confirm('Bạn có chắc muốn xoá bài viết này?')) {
                    axios
                        .delete(Post.URL_POST + `/${bai_dang[2]}`, {
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

    editPost() {
        const editForm = document.getElementById('class-center-container__class-dashboard--edit-post');

        let taskEditBtn = document.querySelectorAll('.feed-item .fa-pen-to-square');

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
                        document.getElementById('class-center-container__class-dashboard--edit-post')
                    );
                    formData.append('_method', 'put');

                    await axios
                        .put(Post.URL_POST + `/${bai_dang[2]}`, formData, {
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
