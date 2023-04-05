import axios from 'axios';

export class Post {
    static URL_POST = location.protocol + '//' + location.host + '/api/posts';
    #container;
    constructor(element) {
        this.#container = element;
    }

    async getPostData(id) {
        var postData;
        let html = '';
        let data = await axios.get(Post.URL_POST + `/${id}`).then(function (response) {
            return response.data.data;
        });
        postData = data ? data : [];
        postData.forEach((element, index) => {
            html += `<div class="feed-item">
                    <div class="feed-item__header">
                        <img src="../img/icon.png" />
                        <div class="feed-item__header--text">
                            <strong>${element.ten_nguoi_dang} </strong>
                            <span>
                                đã thêm 1 bài đăng mới: ${element.tieu_de}
                            </span>
                            <div class="feed-item__header--text-time">${element.created_at}</div>
                        </div>
                    </div>
                    <div class="feed-item__content">
                        <div class="feed-item__content-1">${element.noi_dung}</div>
                    </div>
                    <form class="feed-item__comment">
                        <img src="../img/icon.png" />
                        <input type="text" class="feed-item__comment--input" />
                        <input type="submit" class="feed-item__comment--btn" value="Bình luận" />
                    </form>
                </div>`;
        });
        this.#container.innerHTML = html;
    }
}
