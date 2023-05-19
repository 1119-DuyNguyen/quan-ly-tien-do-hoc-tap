
export class Info {
    static index(){
        // {
        //     'Thong tin ca nhan' : {
        //         0 : 2,
        //         'Ma so sinh vien:' : '3121410304',
        //         'Ho va ten:' : 'Tran Duong Dac Loc',
        //         'Ngay sinh' : '6-5-2003',
        //         'Email' : 'trandacloc123@gmail.com',
        //         'Mat khau' : '12345'
        //     },
        //     'Ly do ...' : [
        //         1,
        //         "Thieu tieng anh",
        //         'Cac hoc phan chua hoan thanh'
        //     ]
        // }
        let info = null
        axios.get('/api/info')
        .then((res) =>{
            info = res.data.data
            // console.log(info);
            Info.renderInfo(info)
        });


    }
    static renderInfo(info){
        for (const [key, value] of Object.entries(info)){
            if (key == null | value == null) continue
            let body = `
            <div class="item__container">
            <div class="item__title">${key}</div>
            <div class="item__block">`
            for (const [itemKey, itemValue] of Object.entries(value)){
                if (itemKey == 0) continue
                switch (value[0]){
                    case 2:
                        body +=
                        `<div class="item__line item__line--2col">
                            <div class="item-line__text">
                                ${itemKey}
                            </div>
                            <div class="item-line__text item-line__text--strong">
                                ${itemValue}
                            </div>
                        </div>`
                        break
                    case 1:
                        body +=
                        `<div class="item__line">
                            <div class="item-line__text">
                                ${itemValue}
                            </div>
                        </div>`
                        break
                }

            }

            // body += `<div class="item__button">
            //             <div>Thay đổi</div>
            //         </div>
            //     </div>
            // </div>`
            body += `
                </div>
            </div>`

            document.querySelector('.info-body').innerHTML += `${body}`

        }
    }
}
