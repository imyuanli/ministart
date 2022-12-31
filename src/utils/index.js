export const setInfo = {
    //时间
    time: {
        intro: "显示时间",
        tips: "",
        type: "switch",
    },
    month: {
        intro: "显示年月日",
        tips: "",
        type: "switch",
    },
    week: {
        intro: "显示星期",
        tips: "",
        type: "switch",
    },
    lunar: {
        intro: "显示农历",
        tips: "",
        type: "switch",
    },
    weight: {
        intro: "显示粗体的时间",
        tips: "该项仅会更改时分的粗细，不会更改日期",
        type: "switch",
    },
    size: {
        intro: "选择字体大小",
        tips: "该项仅会更改时分的大小，不会更改日期",
        type: "slider",
        min: 30,
        max: 60,
    },
    family: {
        intro: "选择时间字体",
        tips: "",
        type: "select",
        options: [
            {
                value: 'Option1',
                label: 'Option1',
            },
            {
                value: 'Option2',
                label: 'Option2',
            },
            {
                value: 'Option3',
                label: 'Option3',
            },
            {
                value: 'Option4',
                label: 'Option4',
            },
            {
                value: 'Option5',
                label: 'Option5',
            },
        ]
    },
    color: {
        intro: "选择颜色",
        tips: "",
        type: "picker",
    },

    //搜索框
    search: {
        intro: "显示搜索框",
        tips: "",
        type: "switch",
    },
    height: {
        intro: "搜索框的高度",
        tips: "",
        type: "slider",
        min: 36,
        max: 50,
    },
    radius: {
        intro: "搜索框的圆角",
        tips: "",
        type: "slider",
        min: 0,
        max: 50,
    },
    opacity: {
        intro: "搜索框的透明度",
        tips: "",
        type: "slider",
        min: 0,
        max: 100,
    },
    blank: {
        intro: "新标签页打开搜索结果",
        tips: "",
        type: "switch",
    },

    //常规
    searchNewBlank: {
        intro: "新标签页打开搜索结果",
        tips: "",
        type: "switch",
    },
    iconNewBlank: {
        intro: "新标签页打开图标",
        tips: "",
        type: "switch",
    },
    showWord: {
        intro: "显示一言",
        tips: "",
        type: "switch",
    },
    simpleFooter: {
        intro: "更简洁的页脚信息",
        tips: "",
        type: "switch",
    },

}
