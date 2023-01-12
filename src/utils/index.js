export const IMG_URL = 'https://qiniu.imyuanli.cn/mini/'

export const SET_INFO = {
    baseSetting: {
        simpleFooter: {
            intro: "更简洁的页脚信息",
            tips: "",
            type: "switch",
        },
        showGreeting: {
            intro: "显示问候",
            tips: "",
            type: "switch",
        },
    },
    //时间
    timeSetting: {
        show: {
            intro: "时间",
            tips: "",
            type: "switch",
        },
        date: {
            intro: "日期",
            tips: "",
            type: "switch",
        },
        weight: {
            intro: "显示粗体的时间",
            tips: "该项仅会更改时分，不会更改日期",
            type: "switch",
        },
        size: {
            intro: "选择字体大小",
            tips: "该项仅会更改时分，不会更改日期",
            type: "slider",
            min: 30,
            max: 60,
        },
        color: {
            intro: "选择颜色",
            tips: "该项仅会更改时分，不会更改日期",
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
            intro: "搜索框高度",
            tips: "",
            type: "slider",
            min: 36,
            max: 80,
        },
        radius: {
            intro: "搜索框圆角",
            tips: "",
            type: "slider",
            min: 0,
            max: 50,
        },
        opacity: {
            intro: "搜索框透明度",
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
            min: 40,
            max: 120,
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
        gapX: {
            intro: "行间距",
            tips: "",
            type: "slider",
            min: 0,
            max: 100,
        },
        gapY: {
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
        icon: `baidu.svg`
    },
    {
        id: 'google',
        name: "谷歌",
        target: "https://www.google.com/search?q=",
        icon: `google.svg`
    },
    {
        id: "bing",
        name: "必应",
        target: "https://cn.bing.com/search?q=",
        icon: `bing.svg`
    },
    {
        id: '360',
        name: "360",
        target: "https://www.so.com/s?q=",
        icon: `360.svg`
    },
    {
        id: 'sougou',
        name: "搜狗",
        target: "https://www.sogou.com/web?query=",
        icon: `sougou.svg`
    },
    {
        id: 'fsou',
        name: "F搜",
        target: "https://fsoufsou.com/search?q=",
        icon: `fsou.svg`
    },
    {
        id: 'duck',
        name: "DuckDuckGo",
        target: "https://duckduckgo.com/?q=",
        icon: `duckduckgo.svg`
    },
    {
        id: 'yahoo',
        name: "Yahoo",
        target: "https://hk.search.yahoo.com/search?p=",
        icon: `yahoo.svg`
    },
    {
        id: 'csdn',
        name: "CSDN",
        target: "https://so.csdn.net/so/search?q=",
        icon: `csdn.ico`
    },
    {
        id: 'github',
        name: "GitHub",
        target: "https://github.com/search?q=",
        icon: `github.svg`
    },
    {
        id: 'stack',
        name: "StackOverflow",
        target: "https://stackoverflow.com/nocaptcha?s=",
        icon: `stackoverflow.svg`
    },
    {
        id: 'kaifa',
        name: "开发者搜索",
        target: "https://kaifa.baidu.com/searchPage?wd=",
        icon: `kaifabaidu.svg`
    },
    {
        id: 'mdn',
        name: "MDN",
        target: "https://developer.mozilla.org/zh-CN/search?q=",
        icon: `mdn.svg`
    },
    {
        id: 'zhihu',
        name: "知乎",
        target: "https://www.zhihu.com/search?type=content&q=",
        icon: `zhihu.svg`
    },
]