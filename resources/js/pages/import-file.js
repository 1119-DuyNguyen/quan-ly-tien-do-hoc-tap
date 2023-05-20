import axios from "axios"

export class import_file {
    static index(){
        let import_input_sheet = document.querySelector("#import-input-sheet")
        let import_input_header = document.querySelector("#import-input-header")
        let import_select_type = document.querySelector('#import-select-type')
        let import_file = document.querySelector('#import-file')
        let import_button = document.querySelector('#import-button')
        let import_err = document.querySelector('#import-err')


        // import_input_header.setAttribute('readonly', '')
        // import_input_sheet.setAttribute('readonly', '')

        import_button.addEventListener('click', ()=>{
            let sheet = import_input_sheet.value
            let header = import_input_header.value
            let file = import_file.files

            import_err.textContent = ""
            import_err.style.color = "#0080ff"

            if (sheet.trim() == ""){
                import_err.style.color = "#f33a58"
                import_err.style.textContent = "Tên bảng tính không được trống!"
                return
            }

            if (header.trim() == ""){
                import_err.style.color = "#f33a58"
                import_err.textContent = "Số thứ tự tiêu đề không được trống!"
                return
            }


            if (file.length == 0){
                import_err.style.color = "#f33a58"
                import_err.textContent = "Tệp tải lên không được trống!"
                return
            }

            let form_data = new FormData()
            let files = []
            console.log(file);
            for (let i = 0; i < file.length; i++){
                form_data.append("files[]", file[i])
            }
            console.log(form_data);
            // form_data.append("files[]", file[0])
            let import_value = [{
                file: 0,
                sheets: [ sheet ],
                header: header
            }]
            form_data.append(import_select_type.value, JSON.stringify(import_value))
            axios.post('/api/import-data', form_data, {
                headers: {
                    "Content-Type": "multipart/form-data;",
                  }
            })
            .then((res)=>{
                console.log(res);
                if (res.status == 200)
                    import_err.textContent = "Nhập dữ liệu thành công!"
                // import_err.textContent = res.data
                // res.data.data.foreach((key ) =>{

                // })
            })

        })

    }
}
