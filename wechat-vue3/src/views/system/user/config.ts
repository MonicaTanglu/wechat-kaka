// const menuObj = { 0: "菜单", 1: "菜单", 2: "按钮/权限" }
export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: "index",
        customRender: ({index}) => {
            return index + 1
        }
    },
    {
        title: '登录名',
        dataIndex: 'login_name',
        key: 'login_name'
    }, 
    {
        title: '真实姓名',
        dataIndex: 'real_name',
        key: 'real_name'
    },
    // 
    {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'center',
        width: 300
    }
]
export interface OptionsCustom {
    id: string;
    name: string;
  }
  export interface SelectOption {
    value: string;
    text: string;
  }
export const formArr = [
//     {
//     label: "菜单类型",
//     type: "radio",
//     key: "menuType",
//     value: 0,
//     required: true,
//     errMsg: "请选择",
//     fieldType: 'number',
//     options: [
//         { value: 0, text: '一级菜单' },
//         { value: 1, text: '子菜单' },
//         { value: 2, text: '按钮/权限' },
//     ],
// },
 {
    label: "登录名",
    type: "input",
    key: "login_name",
    value: null,
    required: true,
    errMsg: "请输入",
    disabled: false
},{
    label: "真实姓名",
    type: "input",
    key: "real_name",
    value: null,
    required: true,
    errMsg: "请输入",
    disabled: false
}]