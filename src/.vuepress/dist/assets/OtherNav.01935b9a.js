import{_ as h}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as c,l as n,w as e,r as s,c as x,m as g,F as v,b as o,a as y,d as _,t as d}from"./app.42351022.js";const w={name:"OtherNav",components:{},props:{arr:{type:String,default:""}},data(){return{cardArr:JSON.parse(this.arr),type:"success"}},methods:{gotoSite(a){window.open(a,"_blank").location}}},N=["src","alt"];function k(a,B,S,C,i,p){const l=s("el-col"),m=s("el-tooltip"),r=s("el-row"),u=s("el-card");return c(),n(r,{gutter:20},{default:e(()=>[(c(!0),x(v,null,g(i.cardArr,(t,f)=>(c(),n(l,{xs:12,sm:12,md:8,lg:8,xl:8,key:f,class:"col"},{default:e(()=>[o(u,{onClick:$=>p.gotoSite(t.url),shadow:"hover","body-style":{padding:"20px"}},{default:e(()=>[o(r,{class:"box-card-header"},{default:e(()=>[o(l,{xs:4,sm:4,md:4,lg:4,xl:4},{default:e(()=>[y("img",{src:a.$withBase(t.icon),alt:t.title,class:"card-ico"},null,8,N)]),_:2},1024),o(l,{xs:20,sm:20,md:20,lg:20,xl:20,class:"card-title"},{default:e(()=>[o(m,{effect:"light",content:t.desc,placement:"bottom-start"},{default:e(()=>[_(d(t.title),1)]),_:2},1032,["content"])]),_:2},1024)]),_:2},1024),o(r,{class:"box-card-body"},{default:e(()=>[_(d(t.desc),1)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})}const A=h(w,[["render",k],["__file","OtherNav.vue"]]);export{A as default};
