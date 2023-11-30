import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { getDirname, path } from "@vuepress/utils";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

//自定义用户配置
export default defineUserConfig({
  base: "/",

  // 多语言设置
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Noby 的编程笔记",
      // 设置favicon
      head: [
        ["link", { rel: "icon", href: "/site_logo.png" }],
        ['meta', { name: "baidu-site-verification", content: "codeva-2o7EWQ18Dr" }],
        ['meta', { name: "description", content: "诺比的个人IT技术博客" }],
        [
          "script",
          {},
          `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?20478574e92b6344aaff41781542e446";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
            `
        ]
      ]
    },
  },
  // 主题设置
  theme,
  plugins: [
    // 注册全局组件的插件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    // 搜索插件
    searchPlugin({
      //多语言支持
      locales: {
        "/": {
          placeholder: "搜索本站",
        },
      },
      // 热键支持
      hotKeys: ["command", "k"],
      // 最大推荐个数
      maxSuggestions: 10,
      // 排除首页
      isSearchable: (page) => page.path !== "/",
    }),
    //seo优化插件
    sitemapPlugin({
      hostname: 'https://noby.site'
    })
  ],

  shouldPrefetch: false,
});
