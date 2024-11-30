import { hopeTheme } from "vuepress-theme-hope";
//中文导航栏
import { zhNavbar } from "./navbar/index.js";
//中文侧边栏
import { zhSidebar } from "./sidebar/index.js";

// 主题设置
export default hopeTheme({
  // 当前网站部署到的域名
  hostname: "https://noby.site",


  // 文章显示的默认作者
  author: {
    name: "Noby",
    url: "https://github.com/noby338",
  },

  // 使用官方提供的图标库-也可以构建自己的图标库
  iconAssets: "iconfont",

  // 网站图标
  logo: "/site_logo.png",

  // 导航栏上的个人仓库地址
  repo: "https://github.com/noby338/noby",

  // 自定义仓库链接文字-默认从repo中自动推断为"GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  repoLabel: "GitHub",

  // 是否在导航栏内显示仓库链接-默认为true
  repoDisplay: false,

  // 导航栏布局
  navbarLayout: {
    left: ["Brand"],
    center: ["Links"],
    right: ["Language", "Repo", "Outlook", "Search"],
  },

  // 页面显示信息
  pageInfo: ["Category", "Tag", "Word", "Date"],

  // 路径导航
  breadcrumb: true,

  // 路径导航的图标显示
  breadcrumbIcon: true,

  // 用户可以自定义的多主题色
  // themeColor: {
  //   yellow: "#FEC201",
  //   pink: "#EF699F",
  //   purple: "#684CCE",
  //   orange: "#FF8C3D",
  // },
  // 暗黑模式切换-在深色模式和浅色模式中切换
  darkmode: "toggle",
  // 全屏按钮
  fullscreen: false,
  // 返回顶部按钮-下滑300px后显示
  backToTop: true,
  // 纯净模式-禁用
  pure: false,

  // 文章的最后更新时间
  lastUpdated: true,

  // 显示页面的贡献者
  contributors: true,

  // 显示编辑本页面
  editLink: false,

  // 文章所在仓库
  // docsRepo: "https://github.com/noby338/noby338.github.io",

  // 文章所在分支
  docsBranch: "master",

  // 文章所在目录
  // docsDir: "src",
  docsDir: "/",

  // 多语言设置
  locales: {
    "/": {
      // 导航栏
      navbar: zhNavbar,

      // 侧边栏
      sidebar: zhSidebar,

      // 全局设置页脚信息
      footer: "本站若有资源涉及侵权，请立即联系作者删除，非常抱歉。（<a href='mailto:1326981297@qq.com?subject=noby个人网站-信息反馈' target='_blank' style='color: var(--c-text-lighter);'>1326981297@qq.com</a>）",
      // 显示页脚
      displayFooter: true,

      // 页面配置信息
      // metaLocales: {
      //   editLink: "在【Github】上编辑此页(仅作者)",
      // },
    },
  },
  // 博客配置
  blog: {
    // 头像
    avatar: "/site_logo.png",
    // 名称
    name: "Noby",
    // 是否是圆形头像
    roundAvatar: true,
    // 个人描述
    description: "Just do it!",
    // 社交媒体
    // medias: {
    //   Github: "https://github.com/noby338",
    //   Gitee: "https://gitee.com/noby3388",
    //   Email: "https://gitee.com/noby3388"
    // },
    // 博客的侧边栏设置
    sidebarDisplay: "mobile",
    // 每页展示的文章数量
    articlePerPage: 20,
    timeline: "Noby's time line",
  },
  plugins: {
    // 在MD文件中启用的组件
    components: [
      // 为站点提供了在MD文档中自定义颜色的徽章
      "Badge",
      // 为站点提供了在MD文档中加载B站视频的功能，但是不建议使用
      // "BiliBili",
      // 为站点提供了在MD文档中加载PDF阅读器的功能，但是不建议使用
      // 原因一：PDF书籍较大，上传到码云后会大量占用码云空间
      // 原因二：当PDF阅读器较多的时候，将MD文档渲染成HTML页面比较耗费性能，使页面加载速度变慢
      // "PDF",
    ],
    // 代码复制功能-vuepress-plugin-copy-code2
    copyCode: {
      // 在移动端也可以实现复制代码
      showInMobile: true,
      // 代码复制成功提示消息的时间-ms
      duration: 3000,
      // 纯净模式
      pure: false,
    },
    // MarkDown文件增强
    mdEnhance: {
      align: false,
      attrs: false,
      chart: false,
      codetabs: false,
      container: false,
      demo: false,
      echarts: false,
      flowchart: false,
      gfm: false,
      imageSize: false,
      include: false,
      katex: false,
      mark: false,
      mermaid: false,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: false,
      sup: false,
      tabs: false,
      // vpre: true,
      vuePlayground: false,
    },
    // 打开博客功能
    blog: {
      // 在文章列表页面自动提取文章的摘要进行显示
      autoExcerpt: false,
    },
    // 开启git实现编辑此页面-最后更新时间-贡献者功能
    git: true,
    // 关闭sitemap插件
    sitemap: true,

    // comment: {
    //   provider: "waline",
    //   serverURL: "YOUR_SERVER_URL", // your server url
    // },
    // commentPlugin({
    //   provider: "Giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    // })
  },
});
