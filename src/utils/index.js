export const IMG_URL = 'https://qiniu.imyuanli.cn/mini'

export const SET_INFO = {
    baseSetting: {
        simpleFooter: {
            intro: "更简洁的页脚信息",
            tips: "",
            type: "switch",
        },
    },
    //时间
    timeSetting: {
        show: {
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
    },
    //搜索框
    searchSetting: {
        show: {
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
    },
    toolSetting: {
        show: {
            intro: "显示快捷方式",
            tips: "",
            type: "switch",
        },
        size: {
            intro: "图标大小",
            tips: "",
            type: "slider",
            min: 30,
            max: 90,
        },
        radius: {
            intro: "图标圆角",
            tips: "",
            type: "slider",
            min: 0,
            max: 50,
        },
        opacity: {
            intro: "图标透明度",
            tips: "",
            type: "slider",
            min: 0,
            max: 100,
        },
        gapY: {
            intro: "行间距",
            tips: "",
            type: "slider",
            min: 0,
            max: 100,
        },
        gapX: {
            intro: "列间距",
            tips: "",
            type: "slider",
            min: 0,
            max: 100,
        },
        maxWidth: {
            intro: "最大宽度",
            tips: "",
            type: "slider",
            min: 800,
            max: 1400,
        },
    }
}

//默认的搜索引擎
export const DEFAULT_ENGINES = [
    {
        id: 'baidu',
        name: "百度",
        target: "https://www.baidu.com/s?&tn=68018901_2_oem_dgie=utf-8&wd=",
        icon: `${IMG_URL}/baidu.svg`
    },
    {
        id: 'google',
        name: "谷歌",
        target: "https://www.google.com/search?q=",
        icon: `${IMG_URL}/google.svg`
    },
    {
        id: "bing",
        name: "必应",
        target: "https://cn.bing.com/search?q=",
        icon: `${IMG_URL}/bing.svg`
    },
    {
        id: '360',
        name: "360",
        target: "https://www.so.com/s?q=",
        icon: `${IMG_URL}/360.svg`
    },
    {
        id: 'sougou',
        name: "搜狗",
        target: "https://www.sogou.com/web?query=",
        icon: `${IMG_URL}/sougou.svg`
    },
    {
        id: 'fsou',
        name: "F搜",
        target: "https://fsoufsou.com/search?q=",
        icon: `${IMG_URL}/fsou.svg`
    },
    {
        id: 'duck',
        name: "DuckDuckGo",
        target: "https://duckduckgo.com/?q=",
        icon: `${IMG_URL}/duckduckgo.svg`
    },
    {
        id: 'yahoo',
        name: "Yahoo",
        target: "https://hk.search.yahoo.com/search?p=",
        icon: `${IMG_URL}/yahoo.svg`
    },
    {
        id: 'csdn',
        name: "CSDN",
        target: "https://so.csdn.net/so/search?q=",
        icon: `${IMG_URL}/csdn.ico`
    },
    {
        id: 'github',
        name: "GitHub",
        target: "https://github.com/search?q=",
        icon: `${IMG_URL}/github.svg`
    },
    {
        id: 'stack',
        name: "StackOverflow",
        target: "https://stackoverflow.com/nocaptcha?s=",
        icon: `${IMG_URL}/stackoverflow.svg`
    },
    {
        id: 'kaifa',
        name: "开发者搜索",
        target: "https://kaifa.baidu.com/searchPage?wd=",
        icon: `${IMG_URL}/kaifabaidu.svg`
    },
    {
        id: 'mdn',
        name: "MDN",
        target: "https://developer.mozilla.org/zh-CN/search?q=",
        icon: `${IMG_URL}/mdn.svg`
    },
    {
        id: 'zhihu',
        name: "知乎",
        target: "https://www.zhihu.com/search?type=content&q=",
        icon: `${IMG_URL}/zhihu.svg`
    },
]