
export class UserPermissions {
    static URL = location.protocol + '//' + location.host + '/api/admin/user-permissions';
    static edit({id}) {
        axios.get(UserPermissions.URL+'/'+id).then(response => {
            let data = response.data.data;

            data.tt_quyen.ten;
            data.tt_quyen.ghi_chu;
            console.log(data)
        })
    }
}