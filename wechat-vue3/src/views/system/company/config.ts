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
        title: '标题',
        dataIndex: 'title',
        key: 'title'
    }, 
    {
        title: '更新时间',
        dataIndex: 'updated_time',
        key: 'updated_time'
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
 {
    label: "标题",
    type: "input",
    key: "title",
    value: null,
    required: true,
    errMsg: "请输入",
    disabled: false
},{
    label: "详情",
    type: "tinymce",
    key: "desc",
    value: null,
    required: true,
    errMsg: "请输入",
    disabled: false
}]