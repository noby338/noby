import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "首页", icon: "home", link: "/" },
  { text: "代码笔记", icon: "code", link: "/codenotes/" },
  { text: "开源项目", icon: "free", link: "/projects/" },
  { text: "编码之外", icon: "palette", link: "/outofcode/" },
  { text: "资源下载", icon: "share", link: "/resources/" },
  { text: "三方导航", icon: "link", link: "/othernav/" },
  {
    text: "关于作者",
    icon: "mount",
    children: [
      {
        text: "Github",
        icon: "/navicon/github.svg",
        link: "https://github.com/noby338",
      },
      {
        text: "Gitee",
        icon: "/navicon/gitee.svg",
        link: "https://gitee.com/noby3388",
      },
      {
        text: "TikTok",
        icon: "/navicon/tiktok.svg",
        link: "https://www.douyin.com/user/MS4wLjABAAAAiBM0gdk-LaNni9TQG9p208UIP5KVf3pPICn-q4mprVw",
      },
      {
        text: "Bilibili",
        icon: "/navicon/bilibili.svg",
        link: "https://space.bilibili.com/59668246?spm_id_from=333.1007.0.0",
      },
    ],
  },
]);

