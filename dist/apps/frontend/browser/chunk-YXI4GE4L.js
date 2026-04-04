import{A as ot,B as st,G as lt,P as ft,S as ut,T as ct,V as dt,a as et,b as tt,ha as ye,i as U,ia as te,j as nt,ja as k,l as N,o as at,r as rt,v as it,va as mt,ya as ht,z as ve}from"./chunk-JP4YNUQ2.js";function Ce(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,a=Array(n);t<n;t++)a[t]=e[t];return a}function ra(e){if(Array.isArray(e))return e}function ia(e){if(Array.isArray(e))return Ce(e)}function oa(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function pt(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,Vt(a.key),a)}}function sa(e,n,t){return n&&pt(e.prototype,n),t&&pt(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function re(e,n){var t=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=We(e))||n&&e&&typeof e.length=="number"){t&&(e=t);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(l){throw l},f:r}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){t=t.call(e)},n:function(){var l=t.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||t.return==null||t.return()}finally{if(s)throw i}}}}function h(e,n,t){return(n=Vt(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function la(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function fa(e,n){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var a,r,i,o,s=[],l=!0,u=!1;try{if(i=(t=t.call(e)).next,n===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(a=i.call(t)).done)&&(s.push(a.value),s.length!==n);l=!0);}catch(d){u=!0,r=d}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(u)throw r}}return s}}function ua(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ca(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gt(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,a)}return t}function f(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?gt(Object(t),!0).forEach(function(a){h(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):gt(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function ue(e,n){return ra(e)||fa(e,n)||We(e,n)||ua()}function P(e){return ia(e)||la(e)||We(e)||ca()}function da(e,n){if(typeof e!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var a=t.call(e,n||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}function Vt(e){var n=da(e,"string");return typeof n=="symbol"?n:n+""}function se(e){"@babel/helpers - typeof";return se=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},se(e)}function We(e,n){if(e){if(typeof e=="string")return Ce(e,n);var t={}.toString.call(e).slice(8,-1);return t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set"?Array.from(e):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Ce(e,n):void 0}}var vt=function(){},He={},Xt={},Kt=null,Jt={mark:vt,measure:vt};try{typeof window<"u"&&(He=window),typeof document<"u"&&(Xt=document),typeof MutationObserver<"u"&&(Kt=MutationObserver),typeof performance<"u"&&(Jt=performance)}catch(e){}var ma=He.navigator||{},yt=ma.userAgent,bt=yt===void 0?"":yt,z=He,v=Xt,xt=Kt,ne=Jt,zo=!!z.document,T=!!v.documentElement&&!!v.head&&typeof v.addEventListener=="function"&&typeof v.createElement=="function",qt=~bt.indexOf("MSIE")||~bt.indexOf("Trident/"),be,ha=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,pa=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,Qt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},graphite:{"fa-thin":"thin",fagt:"thin"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"},utility:{"fa-semibold":"semibold",fausb:"semibold"},"utility-duo":{"fa-semibold":"semibold",faudsb:"semibold"},"utility-fill":{"fa-semibold":"semibold",faufsb:"semibold"}},ga={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Zt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-graphite","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],w="classic",Q="duotone",en="sharp",tn="sharp-duotone",nn="chisel",an="etch",rn="graphite",on="jelly",sn="jelly-duo",ln="jelly-fill",fn="notdog",un="notdog-duo",cn="slab",dn="slab-press",mn="thumbprint",hn="utility",pn="utility-duo",gn="utility-fill",vn="whiteboard",va="Classic",ya="Duotone",ba="Sharp",xa="Sharp Duotone",wa="Chisel",Sa="Etch",ka="Graphite",Aa="Jelly",Ia="Jelly Duo",Ca="Jelly Fill",Fa="Notdog",Pa="Notdog Duo",Na="Slab",Ea="Slab Press",Ma="Thumbprint",Da="Utility",Oa="Utility Duo",Ta="Utility Fill",ja="Whiteboard",yn=[w,Q,en,tn,nn,an,rn,on,sn,ln,fn,un,cn,dn,mn,hn,pn,gn,vn],_o=(be={},h(h(h(h(h(h(h(h(h(h(be,w,va),Q,ya),en,ba),tn,xa),nn,wa),an,Sa),rn,ka),on,Aa),sn,Ia),ln,Ca),h(h(h(h(h(h(h(h(h(be,fn,Fa),un,Pa),cn,Na),dn,Ea),mn,Ma),hn,Da),pn,Oa),gn,Ta),vn,ja)),za={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},graphite:{100:"fagt"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"},utility:{600:"fausb"},"utility-duo":{600:"faudsb"},"utility-fill":{600:"faufsb"}},_a={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Graphite":{100:"fagt",normal:"fagt"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"},"Font Awesome 7 Utility":{600:"fausb",normal:"fausb"},"Font Awesome 7 Utility Duo":{600:"faudsb",normal:"faudsb"},"Font Awesome 7 Utility Fill":{600:"faufsb",normal:"faufsb"}},$a=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["graphite",{defaultShortPrefixId:"fagt",defaultStyleId:"thin",styleIds:["thin"],futureStyleIds:[],defaultFontWeight:100}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["utility",{defaultShortPrefixId:"fausb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-duo",{defaultShortPrefixId:"faudsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-fill",{defaultShortPrefixId:"faufsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),La={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},graphite:{thin:"fagt"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},utility:{semibold:"fausb"},"utility-duo":{semibold:"faudsb"},"utility-fill":{semibold:"faufsb"},whiteboard:{semibold:"fawsb"}},bn=["fak","fa-kit","fakd","fa-kit-duotone"],wt={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Ra=["kit"],Wa="kit",Ha="kit-duotone",Ua="Kit",Ya="Kit Duotone",$o=h(h({},Wa,Ua),Ha,Ya),Ba={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},Ga={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Va={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},St={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},xe,ae={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Xa=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-graphite","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],Ka="classic",Ja="duotone",qa="sharp",Qa="sharp-duotone",Za="chisel",er="etch",tr="graphite",nr="jelly",ar="jelly-duo",rr="jelly-fill",ir="notdog",or="notdog-duo",sr="slab",lr="slab-press",fr="thumbprint",ur="utility",cr="utility-duo",dr="utility-fill",mr="whiteboard",hr="Classic",pr="Duotone",gr="Sharp",vr="Sharp Duotone",yr="Chisel",br="Etch",xr="Graphite",wr="Jelly",Sr="Jelly Duo",kr="Jelly Fill",Ar="Notdog",Ir="Notdog Duo",Cr="Slab",Fr="Slab Press",Pr="Thumbprint",Nr="Utility",Er="Utility Duo",Mr="Utility Fill",Dr="Whiteboard",Lo=(xe={},h(h(h(h(h(h(h(h(h(h(xe,Ka,hr),Ja,pr),qa,gr),Qa,vr),Za,yr),er,br),tr,xr),nr,wr),ar,Sr),rr,kr),h(h(h(h(h(h(h(h(h(xe,ir,Ar),or,Ir),sr,Cr),lr,Fr),fr,Pr),ur,Nr),cr,Er),dr,Mr),mr,Dr)),Or="kit",Tr="kit-duotone",jr="Kit",zr="Kit Duotone",Ro=h(h({},Or,jr),Tr,zr),_r={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},graphite:{"fa-thin":"fagt"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"},utility:{"fa-semibold":"fausb"},"utility-duo":{"fa-semibold":"faudsb"},"utility-fill":{"fa-semibold":"faufsb"}},$r={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],graphite:["fagt"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"],utility:["fausb"],"utility-duo":["faudsb"],"utility-fill":["faufsb"]},Fe={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},graphite:{fagt:"fa-thin"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"},utility:{fausb:"fa-semibold"},"utility-duo":{faudsb:"fa-semibold"},"utility-fill":{faufsb:"fa-semibold"}},Lr=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],xn=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fagt","fajr","fajfr","fajdr","facr","fausb","faudsb","faufsb"].concat(Xa,Lr),Rr=["solid","regular","light","thin","duotone","brands","semibold"],wn=[1,2,3,4,5,6,7,8,9,10],Wr=wn.concat([11,12,13,14,15,16,17,18,19,20]),Hr=["aw","fw","pull-left","pull-right"],Ur=[].concat(P(Object.keys($r)),Rr,Hr,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",ae.GROUP,ae.SWAP_OPACITY,ae.PRIMARY,ae.SECONDARY]).concat(wn.map(function(e){return"".concat(e,"x")})).concat(Wr.map(function(e){return"w-".concat(e)})),Yr={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},D="___FONT_AWESOME___",Pe=16,Sn="fa",kn="svg-inline--fa",R="data-fa-i2svg",Ne="data-fa-pseudo-element",Br="data-fa-pseudo-element-pending",Ue="data-prefix",Ye="data-icon",kt="fontawesome-i2svg",Gr="async",Vr=["HTML","HEAD","STYLE","SCRIPT"],An=["::before","::after",":before",":after"],In=(function(){try{return!0}catch(e){return!1}})();function Z(e){return new Proxy(e,{get:function(t,a){return a in t?t[a]:t[w]}})}var Cn=f({},Qt);Cn[w]=f(f(f(f({},{"fa-duotone":"duotone"}),Qt[w]),wt.kit),wt["kit-duotone"]);var Xr=Z(Cn),Ee=f({},La);Ee[w]=f(f(f(f({},{duotone:"fad"}),Ee[w]),St.kit),St["kit-duotone"]);var At=Z(Ee),Me=f({},Fe);Me[w]=f(f({},Me[w]),Va.kit);var Be=Z(Me),De=f({},_r);De[w]=f(f({},De[w]),Ba.kit);var Wo=Z(De),Kr=ha,Fn="fa-layers-text",Jr=pa,qr=f({},za),Ho=Z(qr),Qr=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],we=ga,Zr=[].concat(P(Ra),P(Ur)),K=z.FontAwesomeConfig||{};function ei(e){var n=v.querySelector("script["+e+"]");if(n)return n.getAttribute(e)}function ti(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}v&&typeof v.querySelector=="function"&&(It=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]],It.forEach(function(e){var n=ue(e,2),t=n[0],a=n[1],r=ti(ei(t));r!=null&&(K[a]=r)}));var It,Pn={styleDefault:"solid",familyDefault:w,cssPrefix:Sn,replacementClass:kn,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};K.familyPrefix&&(K.cssPrefix=K.familyPrefix);var G=f(f({},Pn),K);G.autoReplaceSvg||(G.observeMutations=!1);var m={};Object.keys(Pn).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(t){G[e]=t,J.forEach(function(a){return a(m)})},get:function(){return G[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(n){G.cssPrefix=n,J.forEach(function(t){return t(m)})},get:function(){return G.cssPrefix}});z.FontAwesomeConfig=m;var J=[];function ni(e){return J.push(e),function(){J.splice(J.indexOf(e),1)}}var j=Pe,E={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ai(e){if(!(!e||!T)){var n=v.createElement("style");n.setAttribute("type","text/css"),n.innerHTML=e;for(var t=v.head.childNodes,a=null,r=t.length-1;r>-1;r--){var i=t[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return v.head.insertBefore(n,a),e}}var ri="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Ct(){for(var e=12,n="";e-- >0;)n+=ri[Math.random()*62|0];return n}function V(e){for(var n=[],t=(e||[]).length>>>0;t--;)n[t]=e[t];return n}function Ge(e){return e.classList?V(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(n){return n})}function Nn(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ii(e){return Object.keys(e||{}).reduce(function(n,t){return n+"".concat(t,'="').concat(Nn(e[t]),'" ')},"").trim()}function ce(e){return Object.keys(e||{}).reduce(function(n,t){return n+"".concat(t,": ").concat(e[t].trim(),";")},"")}function Ve(e){return e.size!==E.size||e.x!==E.x||e.y!==E.y||e.rotate!==E.rotate||e.flipX||e.flipY}function oi(e){var n=e.transform,t=e.containerWidth,a=e.iconWidth,r={transform:"translate(".concat(t/2," 256)")},i="translate(".concat(n.x*32,", ").concat(n.y*32,") "),o="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),s="rotate(".concat(n.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:u}}function si(e){var n=e.transform,t=e.width,a=t===void 0?Pe:t,r=e.height,i=r===void 0?Pe:r,o=e.startCentered,s=o===void 0?!1:o,l="";return s&&qt?l+="translate(".concat(n.x/j-a/2,"em, ").concat(n.y/j-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(n.x/j,"em), calc(-50% + ").concat(n.y/j,"em)) "):l+="translate(".concat(n.x/j,"em, ").concat(n.y/j,"em) "),l+="scale(".concat(n.size/j*(n.flipX?-1:1),", ").concat(n.size/j*(n.flipY?-1:1),") "),l+="rotate(".concat(n.rotate,"deg) "),l}var li=`:root, :host {
  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';
  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';
  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';
  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';
  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';
  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';
  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';
  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';
  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';
  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';
  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';
  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';
  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';
  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';
  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';
  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';
  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';
  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';
  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';
  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function En(){var e=Sn,n=kn,t=m.cssPrefix,a=m.replacementClass,r=li;if(t!==e||a!==n){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(n),"g");r=r.replace(i,".".concat(t,"-")).replace(o,"--".concat(t,"-")).replace(s,".".concat(a))}return r}var Ft=!1;function Se(){m.autoAddCss&&!Ft&&(ai(En()),Ft=!0)}var fi={mixout:function(){return{dom:{css:En,insertCss:Se}}},hooks:function(){return{beforeDOMElementCreation:function(){Se()},beforeI2svg:function(){Se()}}}},O=z||{};O[D]||(O[D]={});O[D].styles||(O[D].styles={});O[D].hooks||(O[D].hooks={});O[D].shims||(O[D].shims=[]);var F=O[D],Mn=[],Dn=function(){v.removeEventListener("DOMContentLoaded",Dn),le=1,Mn.map(function(n){return n()})},le=!1;T&&(le=(v.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(v.readyState),le||v.addEventListener("DOMContentLoaded",Dn));function ui(e){T&&(le?setTimeout(e,0):Mn.push(e))}function ee(e){var n=e.tag,t=e.attributes,a=t===void 0?{}:t,r=e.children,i=r===void 0?[]:r;return typeof e=="string"?Nn(e):"<".concat(n," ").concat(ii(a),">").concat(i.map(ee).join(""),"</").concat(n,">")}function Pt(e,n,t){if(e&&e[n]&&e[n][t])return{prefix:n,iconName:t,icon:e[n][t]}}var ci=function(n,t){return function(a,r,i,o){return n.call(t,a,r,i,o)}},ke=function(n,t,a,r){var i=Object.keys(n),o=i.length,s=r!==void 0?ci(t,r):t,l,u,d;for(a===void 0?(l=1,d=n[i[0]]):(l=0,d=a);l<o;l++)u=i[l],d=s(d,n[u],u,n);return d};function On(e){return P(e).length!==1?null:e.codePointAt(0).toString(16)}function Nt(e){return Object.keys(e).reduce(function(n,t){var a=e[t],r=!!a.icon;return r?n[a.iconName]=a.icon:n[t]=a,n},{})}function Oe(e,n){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=t.skipHooks,r=a===void 0?!1:a,i=Nt(n);typeof F.hooks.addPack=="function"&&!r?F.hooks.addPack(e,Nt(n)):F.styles[e]=f(f({},F.styles[e]||{}),i),e==="fas"&&Oe("fa",n)}var q=F.styles,di=F.shims,Tn=Object.keys(Be),mi=Tn.reduce(function(e,n){return e[n]=Object.keys(Be[n]),e},{}),Xe=null,jn={},zn={},_n={},$n={},Ln={};function hi(e){return~Zr.indexOf(e)}function pi(e,n){var t=n.split("-"),a=t[0],r=t.slice(1).join("-");return a===e&&r!==""&&!hi(r)?r:null}var Rn=function(){var n=function(i){return ke(q,function(o,s,l){return o[l]=ke(s,i,{}),o},{})};jn=n(function(r,i,o){if(i[3]&&(r[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){r[l.toString(16)]=o})}return r}),zn=n(function(r,i,o){if(r[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){r[l]=o})}return r}),Ln=n(function(r,i,o){var s=i[2];return r[o]=o,s.forEach(function(l){r[l]=o}),r});var t="far"in q||m.autoFetchSvg,a=ke(di,function(r,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!t&&(s="fas"),typeof o=="string"&&(r.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});_n=a.names,$n=a.unicodes,Xe=de(m.styleDefault,{family:m.familyDefault})};ni(function(e){Xe=de(e.styleDefault,{family:m.familyDefault})});Rn();function Ke(e,n){return(jn[e]||{})[n]}function gi(e,n){return(zn[e]||{})[n]}function L(e,n){return(Ln[e]||{})[n]}function Wn(e){return _n[e]||{prefix:null,iconName:null}}function vi(e){var n=$n[e],t=Ke("fas",e);return n||(t?{prefix:"fas",iconName:t}:null)||{prefix:null,iconName:null}}function _(){return Xe}var Hn=function(){return{prefix:null,iconName:null,rest:[]}};function yi(e){var n=w,t=Tn.reduce(function(a,r){return a[r]="".concat(m.cssPrefix,"-").concat(r),a},{});return yn.forEach(function(a){(e.includes(t[a])||e.some(function(r){return mi[a].includes(r)}))&&(n=a)}),n}function de(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=n.family,a=t===void 0?w:t,r=Xr[a][e];if(a===Q&&!e)return"fad";var i=At[a][e]||At[a][r],o=e in F.styles?e:null,s=i||o||null;return s}function bi(e){var n=[],t=null;return e.forEach(function(a){var r=pi(m.cssPrefix,a);r?t=r:a&&n.push(a)}),{iconName:t,rest:n}}function Et(e){return e.sort().filter(function(n,t,a){return a.indexOf(n)===t})}var Mt=xn.concat(bn);function me(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=n.skipLookups,a=t===void 0?!1:t,r=null,i=Et(e.filter(function(p){return Mt.includes(p)})),o=Et(e.filter(function(p){return!Mt.includes(p)})),s=i.filter(function(p){return r=p,!Zt.includes(p)}),l=ue(s,1),u=l[0],d=u===void 0?null:u,c=yi(i),g=f(f({},bi(o)),{},{prefix:de(d,{family:c})});return f(f(f({},g),ki({values:e,family:c,styles:q,config:m,canonical:g,givenPrefix:r})),xi(a,r,g))}function xi(e,n,t){var a=t.prefix,r=t.iconName;if(e||!a||!r)return{prefix:a,iconName:r};var i=n==="fa"?Wn(r):{},o=L(a,r);return r=i.iconName||o||r,a=i.prefix||a,a==="far"&&!q.far&&q.fas&&!m.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}var wi=yn.filter(function(e){return e!==w||e!==Q}),Si=Object.keys(Fe).filter(function(e){return e!==w}).map(function(e){return Object.keys(Fe[e])}).flat();function ki(e){var n=e.values,t=e.family,a=e.canonical,r=e.givenPrefix,i=r===void 0?"":r,o=e.styles,s=o===void 0?{}:o,l=e.config,u=l===void 0?{}:l,d=t===Q,c=n.includes("fa-duotone")||n.includes("fad"),g=u.familyDefault==="duotone",p=a.prefix==="fad"||a.prefix==="fa-duotone";if(!d&&(c||g||p)&&(a.prefix="fad"),(n.includes("fa-brands")||n.includes("fab"))&&(a.prefix="fab"),!a.prefix&&wi.includes(t)){var b=Object.keys(s).find(function(S){return Si.includes(S)});if(b||u.autoFetchSvg){var y=$a.get(t).defaultShortPrefixId;a.prefix=y,a.iconName=L(a.prefix,a.iconName)||a.iconName}}return(a.prefix==="fa"||i==="fa")&&(a.prefix=_()||"fas"),a}var Ai=(function(){function e(){oa(this,e),this.definitions={}}return sa(e,[{key:"add",value:function(){for(var t=this,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=r.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){t.definitions[s]=f(f({},t.definitions[s]||{}),o[s]),Oe(s,o[s]);var l=Be[w][s];l&&Oe(l,o[s]),Rn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(t,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(i){var o=r[i],s=o.prefix,l=o.iconName,u=o.icon,d=u[2];t[s]||(t[s]={}),d.length>0&&d.forEach(function(c){typeof c=="string"&&(t[s][c]=u)}),t[s][l]=u}),t}}])})(),Dt=[],Y={},B={},Ii=Object.keys(B);function Ci(e,n){var t=n.mixoutsTo;return Dt=e,Y={},Object.keys(B).forEach(function(a){Ii.indexOf(a)===-1&&delete B[a]}),Dt.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(o){typeof r[o]=="function"&&(t[o]=r[o]),se(r[o])==="object"&&Object.keys(r[o]).forEach(function(s){t[o]||(t[o]={}),t[o][s]=r[o][s]})}),a.hooks){var i=a.hooks();Object.keys(i).forEach(function(o){Y[o]||(Y[o]=[]),Y[o].push(i[o])})}a.provides&&a.provides(B)}),t}function Te(e,n){for(var t=arguments.length,a=new Array(t>2?t-2:0),r=2;r<t;r++)a[r-2]=arguments[r];var i=Y[e]||[];return i.forEach(function(o){n=o.apply(null,[n].concat(a))}),n}function W(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),a=1;a<n;a++)t[a-1]=arguments[a];var r=Y[e]||[];r.forEach(function(i){i.apply(null,t)})}function $(){var e=arguments[0],n=Array.prototype.slice.call(arguments,1);return B[e]?B[e].apply(null,n):void 0}function je(e){e.prefix==="fa"&&(e.prefix="fas");var n=e.iconName,t=e.prefix||_();if(n)return n=L(t,n)||n,Pt(Un.definitions,t,n)||Pt(F.styles,t,n)}var Un=new Ai,Fi=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,W("noAuto")},Pi={i2svg:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return T?(W("beforeI2svg",n),$("pseudoElements2svg",n),$("i2svg",n)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=n.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,ui(function(){Ei({autoReplaceSvgRoot:t}),W("watch",n)})}},Ni={icon:function(n){if(n===null)return null;if(se(n)==="object"&&n.prefix&&n.iconName)return{prefix:n.prefix,iconName:L(n.prefix,n.iconName)||n.iconName};if(Array.isArray(n)&&n.length===2){var t=n[1].indexOf("fa-")===0?n[1].slice(3):n[1],a=de(n[0]);return{prefix:a,iconName:L(a,t)||t}}if(typeof n=="string"&&(n.indexOf("".concat(m.cssPrefix,"-"))>-1||n.match(Kr))){var r=me(n.split(" "),{skipLookups:!0});return{prefix:r.prefix||_(),iconName:L(r.prefix,r.iconName)||r.iconName}}if(typeof n=="string"){var i=_();return{prefix:i,iconName:L(i,n)||n}}}},I={noAuto:Fi,config:m,dom:Pi,parse:Ni,library:Un,findIconDefinition:je,toHtml:ee},Ei=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=n.autoReplaceSvgRoot,a=t===void 0?v:t;(Object.keys(F.styles).length>0||m.autoFetchSvg)&&T&&m.autoReplaceSvg&&I.dom.i2svg({node:a})};function he(e,n){return Object.defineProperty(e,"abstract",{get:n}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(a){return ee(a)})}}),Object.defineProperty(e,"node",{get:function(){if(T){var a=v.createElement("div");return a.innerHTML=e.html,a.children}}}),e}function Mi(e){var n=e.children,t=e.main,a=e.mask,r=e.attributes,i=e.styles,o=e.transform;if(Ve(o)&&t.found&&!a.found){var s=t.width,l=t.height,u={x:s/l/2,y:.5};r.style=ce(f(f({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:n}]}function Di(e){var n=e.prefix,t=e.iconName,a=e.children,r=e.attributes,i=e.symbol,o=i===!0?"".concat(n,"-").concat(m.cssPrefix,"-").concat(t):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},r),{},{id:o}),children:a}]}]}function Oi(e){var n=["aria-label","aria-labelledby","title","role"];return n.some(function(t){return t in e})}function Je(e){var n=e.icons,t=n.main,a=n.mask,r=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.maskId,u=e.extra,d=e.watchable,c=d===void 0?!1:d,g=a.found?a:t,p=g.width,b=g.height,y=[m.replacementClass,i?"".concat(m.cssPrefix,"-").concat(i):""].filter(function(M){return u.classes.indexOf(M)===-1}).filter(function(M){return M!==""||!!M}).concat(u.classes).join(" "),S={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":r,"data-icon":i,class:y,role:u.attributes.role||"img",viewBox:"0 0 ".concat(p," ").concat(b)})};!Oi(u.attributes)&&!u.attributes["aria-hidden"]&&(S.attributes["aria-hidden"]="true"),c&&(S.attributes[R]="");var x=f(f({},S),{},{prefix:r,iconName:i,main:t,mask:a,maskId:l,transform:o,symbol:s,styles:f({},u.styles)}),A=a.found&&t.found?$("generateAbstractMask",x)||{children:[],attributes:{}}:$("generateAbstractIcon",x)||{children:[],attributes:{}},C=A.children,H=A.attributes;return x.children=C,x.attributes=H,s?Di(x):Mi(x)}function Ot(e){var n=e.content,t=e.width,a=e.height,r=e.transform,i=e.extra,o=e.watchable,s=o===void 0?!1:o,l=f(f({},i.attributes),{},{class:i.classes.join(" ")});s&&(l[R]="");var u=f({},i.styles);Ve(r)&&(u.transform=si({transform:r,startCentered:!0,width:t,height:a}),u["-webkit-transform"]=u.transform);var d=ce(u);d.length>0&&(l.style=d);var c=[];return c.push({tag:"span",attributes:l,children:[n]}),c}function Ti(e){var n=e.content,t=e.extra,a=f(f({},t.attributes),{},{class:t.classes.join(" ")}),r=ce(t.styles);r.length>0&&(a.style=r);var i=[];return i.push({tag:"span",attributes:a,children:[n]}),i}var Ae=F.styles;function ze(e){var n=e[0],t=e[1],a=e.slice(4),r=ue(a,1),i=r[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:n,height:t,icon:o}}var ji={found:!1,width:512,height:512};function zi(e,n){!In&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(n,'" is missing.'))}function _e(e,n){var t=n;return n==="fa"&&m.styleDefault!==null&&(n=_()),new Promise(function(a,r){if(t==="fa"){var i=Wn(e)||{};e=i.iconName||e,n=i.prefix||n}if(e&&n&&Ae[n]&&Ae[n][e]){var o=Ae[n][e];return a(ze(o))}zi(e,n),a(f(f({},ji),{},{icon:m.showMissingIcons&&e?$("missingIconAbstract")||{}:{}}))})}var Tt=function(){},$e=m.measurePerformance&&ne&&ne.mark&&ne.measure?ne:{mark:Tt,measure:Tt},X='FA "7.2.0"',_i=function(n){return $e.mark("".concat(X," ").concat(n," begins")),function(){return Yn(n)}},Yn=function(n){$e.mark("".concat(X," ").concat(n," ends")),$e.measure("".concat(X," ").concat(n),"".concat(X," ").concat(n," begins"),"".concat(X," ").concat(n," ends"))},qe={begin:_i,end:Yn},ie=function(){};function jt(e){var n=e.getAttribute?e.getAttribute(R):null;return typeof n=="string"}function $i(e){var n=e.getAttribute?e.getAttribute(Ue):null,t=e.getAttribute?e.getAttribute(Ye):null;return n&&t}function Li(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function Ri(){if(m.autoReplaceSvg===!0)return oe.replace;var e=oe[m.autoReplaceSvg];return e||oe.replace}function Wi(e){return v.createElementNS("http://www.w3.org/2000/svg",e)}function Hi(e){return v.createElement(e)}function Bn(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=n.ceFn,a=t===void 0?e.tag==="svg"?Wi:Hi:t;if(typeof e=="string")return v.createTextNode(e);var r=a(e.tag);Object.keys(e.attributes||[]).forEach(function(o){r.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){r.appendChild(Bn(o,{ceFn:a}))}),r}function Ui(e){var n=" ".concat(e.outerHTML," ");return n="".concat(n,"Font Awesome fontawesome.com "),n}var oe={replace:function(n){var t=n[0];if(t.parentNode)if(n[1].forEach(function(r){t.parentNode.insertBefore(Bn(r),t)}),t.getAttribute(R)===null&&m.keepOriginalSource){var a=v.createComment(Ui(t));t.parentNode.replaceChild(a,t)}else t.remove()},nest:function(n){var t=n[0],a=n[1];if(~Ge(t).indexOf(m.replacementClass))return oe.replace(n);var r=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var i=a[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});a[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",i.toNode.join(" "))}var o=a.map(function(s){return ee(s)}).join(`
`);t.setAttribute(R,""),t.innerHTML=o}};function zt(e){e()}function Gn(e,n){var t=typeof n=="function"?n:ie;if(e.length===0)t();else{var a=zt;m.mutateApproach===Gr&&(a=z.requestAnimationFrame||zt),a(function(){var r=Ri(),i=qe.begin("mutate");e.map(r),i(),t()})}}var Qe=!1;function Vn(){Qe=!0}function Le(){Qe=!1}var fe=null;function _t(e){if(xt&&m.observeMutations){var n=e.treeCallback,t=n===void 0?ie:n,a=e.nodeCallback,r=a===void 0?ie:a,i=e.pseudoElementsCallback,o=i===void 0?ie:i,s=e.observeMutationsRoot,l=s===void 0?v:s;fe=new xt(function(u){if(!Qe){var d=_();V(u).forEach(function(c){if(c.type==="childList"&&c.addedNodes.length>0&&!jt(c.addedNodes[0])&&(m.searchPseudoElements&&o(c.target),t(c.target)),c.type==="attributes"&&c.target.parentNode&&m.searchPseudoElements&&o([c.target],!0),c.type==="attributes"&&jt(c.target)&&~Qr.indexOf(c.attributeName))if(c.attributeName==="class"&&$i(c.target)){var g=me(Ge(c.target)),p=g.prefix,b=g.iconName;c.target.setAttribute(Ue,p||d),b&&c.target.setAttribute(Ye,b)}else Li(c.target)&&r(c.target)})}}),T&&fe.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Yi(){fe&&fe.disconnect()}function Bi(e){var n=e.getAttribute("style"),t=[];return n&&(t=n.split(";").reduce(function(a,r){var i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),t}function Gi(e){var n=e.getAttribute("data-prefix"),t=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"",r=me(Ge(e));return r.prefix||(r.prefix=_()),n&&t&&(r.prefix=n,r.iconName=t),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=gi(r.prefix,e.innerText)||Ke(r.prefix,On(e.innerText))),!r.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Vi(e){var n=V(e.attributes).reduce(function(t,a){return t.name!=="class"&&t.name!=="style"&&(t[a.name]=a.value),t},{});return n}function Xi(){return{iconName:null,prefix:null,transform:E,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function $t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},t=Gi(e),a=t.iconName,r=t.prefix,i=t.rest,o=Vi(e),s=Te("parseNodeAttributes",{},e),l=n.styleParser?Bi(e):[];return f({iconName:a,prefix:r,transform:E,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Ki=F.styles;function Xn(e){var n=m.autoReplaceSvg==="nest"?$t(e,{styleParser:!1}):$t(e);return~n.extra.classes.indexOf(Fn)?$("generateLayersText",e,n):$("generateSvgReplacementMutation",e,n)}function Ji(){return[].concat(P(bn),P(xn))}function Lt(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!T)return Promise.resolve();var t=v.documentElement.classList,a=function(c){return t.add("".concat(kt,"-").concat(c))},r=function(c){return t.remove("".concat(kt,"-").concat(c))},i=m.autoFetchSvg?Ji():Zt.concat(Object.keys(Ki));i.includes("fa")||i.push("fa");var o=[".".concat(Fn,":not([").concat(R,"])")].concat(i.map(function(d){return".".concat(d,":not([").concat(R,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=V(e.querySelectorAll(o))}catch(d){}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var l=qe.begin("onTree"),u=s.reduce(function(d,c){try{var g=Xn(c);g&&d.push(g)}catch(p){In||p.name==="MissingIcon"&&console.error(p)}return d},[]);return new Promise(function(d,c){Promise.all(u).then(function(g){Gn(g,function(){a("active"),a("complete"),r("pending"),typeof n=="function"&&n(),l(),d()})}).catch(function(g){l(),c(g)})})}function qi(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Xn(e).then(function(t){t&&Gn([t],n)})}function Qi(e){return function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(n||{}).icon?n:je(n||{}),r=t.mask;return r&&(r=(r||{}).icon?r:je(r||{})),e(a,f(f({},t),{},{mask:r}))}}var Zi=function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.transform,r=a===void 0?E:a,i=t.symbol,o=i===void 0?!1:i,s=t.mask,l=s===void 0?null:s,u=t.maskId,d=u===void 0?null:u,c=t.classes,g=c===void 0?[]:c,p=t.attributes,b=p===void 0?{}:p,y=t.styles,S=y===void 0?{}:y;if(n){var x=n.prefix,A=n.iconName,C=n.icon;return he(f({type:"icon"},n),function(){return W("beforeDOMElementCreation",{iconDefinition:n,params:t}),Je({icons:{main:ze(C),mask:l?ze(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:x,iconName:A,transform:f(f({},E),r),symbol:o,maskId:d,extra:{attributes:b,styles:S,classes:g}})})}},eo={mixout:function(){return{icon:Qi(Zi)}},hooks:function(){return{mutationObserverCallbacks:function(t){return t.treeCallback=Lt,t.nodeCallback=qi,t}}},provides:function(n){n.i2svg=function(t){var a=t.node,r=a===void 0?v:a,i=t.callback,o=i===void 0?function(){}:i;return Lt(r,o)},n.generateSvgReplacementMutation=function(t,a){var r=a.iconName,i=a.prefix,o=a.transform,s=a.symbol,l=a.mask,u=a.maskId,d=a.extra;return new Promise(function(c,g){Promise.all([_e(r,i),l.iconName?_e(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(p){var b=ue(p,2),y=b[0],S=b[1];c([t,Je({icons:{main:y,mask:S},prefix:i,iconName:r,transform:o,symbol:s,maskId:u,extra:d,watchable:!0})])}).catch(g)})},n.generateAbstractIcon=function(t){var a=t.children,r=t.attributes,i=t.main,o=t.transform,s=t.styles,l=ce(s);l.length>0&&(r.style=l);var u;return Ve(o)&&(u=$("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),a.push(u||i.icon),{children:a,attributes:r}}}},to={mixout:function(){return{layer:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,i=r===void 0?[]:r;return he({type:"layer"},function(){W("beforeDOMElementCreation",{assembler:t,params:a});var o=[];return t(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(P(i)).join(" ")},children:o}]})}}}},no={mixout:function(){return{counter:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,i=r===void 0?null:r,o=a.classes,s=o===void 0?[]:o,l=a.attributes,u=l===void 0?{}:l,d=a.styles,c=d===void 0?{}:d;return he({type:"counter",content:t},function(){return W("beforeDOMElementCreation",{content:t,params:a}),Ti({content:t.toString(),title:i,extra:{attributes:u,styles:c,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(P(s))}})})}}}},ao={mixout:function(){return{text:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?E:r,o=a.classes,s=o===void 0?[]:o,l=a.attributes,u=l===void 0?{}:l,d=a.styles,c=d===void 0?{}:d;return he({type:"text",content:t},function(){return W("beforeDOMElementCreation",{content:t,params:a}),Ot({content:t,transform:f(f({},E),i),extra:{attributes:u,styles:c,classes:["".concat(m.cssPrefix,"-layers-text")].concat(P(s))}})})}}},provides:function(n){n.generateLayersText=function(t,a){var r=a.transform,i=a.extra,o=null,s=null;if(qt){var l=parseInt(getComputedStyle(t).fontSize,10),u=t.getBoundingClientRect();o=u.width/l,s=u.height/l}return Promise.resolve([t,Ot({content:t.innerHTML,width:o,height:s,transform:r,extra:i,watchable:!0})])}}},Kn=new RegExp('"',"ug"),Rt=[1105920,1112319],Wt=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),_a),Yr),Ga),Re=Object.keys(Wt).reduce(function(e,n){return e[n.toLowerCase()]=Wt[n],e},{}),ro=Object.keys(Re).reduce(function(e,n){var t=Re[n];return e[n]=t[900]||P(Object.entries(t))[0][1],e},{});function io(e){var n=e.replace(Kn,"");return On(P(n)[0]||"")}function oo(e){var n=e.getPropertyValue("font-feature-settings").includes("ss01"),t=e.getPropertyValue("content"),a=t.replace(Kn,""),r=a.codePointAt(0),i=r>=Rt[0]&&r<=Rt[1],o=a.length===2?a[0]===a[1]:!1;return i||o||n}function so(e,n){var t=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(n),r=isNaN(a)?"normal":a;return(Re[t]||{})[r]||ro[t]}function Ht(e,n){var t="".concat(Br).concat(n.replace(":","-"));return new Promise(function(a,r){if(e.getAttribute(t)!==null)return a();var i=V(e.children),o=i.filter(function(pe){return pe.getAttribute(Ne)===n})[0],s=z.getComputedStyle(e,n),l=s.getPropertyValue("font-family"),u=l.match(Jr),d=s.getPropertyValue("font-weight"),c=s.getPropertyValue("content");if(o&&!u)return e.removeChild(o),a();if(u&&c!=="none"&&c!==""){var g=s.getPropertyValue("content"),p=so(l,d),b=io(g),y=u[0].startsWith("FontAwesome"),S=oo(s),x=Ke(p,b),A=x;if(y){var C=vi(b);C.iconName&&C.prefix&&(x=C.iconName,p=C.prefix)}if(x&&!S&&(!o||o.getAttribute(Ue)!==p||o.getAttribute(Ye)!==A)){e.setAttribute(t,A),o&&e.removeChild(o);var H=Xi(),M=H.extra;M.attributes[Ne]=n,_e(x,p).then(function(pe){var na=Je(f(f({},H),{},{icons:{main:pe,mask:Hn()},prefix:p,iconName:A,extra:M,watchable:!0})),ge=v.createElementNS("http://www.w3.org/2000/svg","svg");n==="::before"?e.insertBefore(ge,e.firstChild):e.appendChild(ge),ge.outerHTML=na.map(function(aa){return ee(aa)}).join(`
`),e.removeAttribute(t),a()}).catch(r)}else a()}else a()})}function lo(e){return Promise.all([Ht(e,"::before"),Ht(e,"::after")])}function fo(e){return e.parentNode!==document.head&&!~Vr.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Ne)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var uo=function(n){return!!n&&An.some(function(t){return n.includes(t)})},co=function(n){if(!n)return[];var t=new Set,a=n.split(/,(?![^()]*\))/).map(function(l){return l.trim()});a=a.flatMap(function(l){return l.includes("(")?l:l.split(",").map(function(u){return u.trim()})});var r=re(a),i;try{for(r.s();!(i=r.n()).done;){var o=i.value;if(uo(o)){var s=An.reduce(function(l,u){return l.replace(u,"")},o);s!==""&&s!=="*"&&t.add(s)}}}catch(l){r.e(l)}finally{r.f()}return t};function Ut(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(T){var t;if(n)t=e;else if(m.searchPseudoElementsFullScan)t=e.querySelectorAll("*");else{var a=new Set,r=re(document.styleSheets),i;try{for(r.s();!(i=r.n()).done;){var o=i.value;try{var s=re(o.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,d=co(u.selectorText),c=re(d),g;try{for(c.s();!(g=c.n()).done;){var p=g.value;a.add(p)}}catch(y){c.e(y)}finally{c.f()}}}catch(y){s.e(y)}finally{s.f()}}catch(y){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(y.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(y){r.e(y)}finally{r.f()}if(!a.size)return;var b=Array.from(a).join(", ");try{t=e.querySelectorAll(b)}catch(y){}}return new Promise(function(y,S){var x=V(t).filter(fo).map(lo),A=qe.begin("searchPseudoElements");Vn(),Promise.all(x).then(function(){A(),Le(),y()}).catch(function(){A(),Le(),S()})})}}var mo={hooks:function(){return{mutationObserverCallbacks:function(t){return t.pseudoElementsCallback=Ut,t}}},provides:function(n){n.pseudoElements2svg=function(t){var a=t.node,r=a===void 0?v:a;m.searchPseudoElements&&Ut(r)}}},Yt=!1,ho={mixout:function(){return{dom:{unwatch:function(){Vn(),Yt=!0}}}},hooks:function(){return{bootstrap:function(){_t(Te("mutationObserverCallbacks",{}))},noAuto:function(){Yi()},watch:function(t){var a=t.observeMutationsRoot;Yt?Le():_t(Te("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},Bt=function(n){var t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return n.toLowerCase().split(" ").reduce(function(a,r){var i=r.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return a.flipX=!0,a;if(o&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(o){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},t)},po={mixout:function(){return{parse:{transform:function(t){return Bt(t)}}}},hooks:function(){return{parseNodeAttributes:function(t,a){var r=a.getAttribute("data-fa-transform");return r&&(t.transform=Bt(r)),t}}},provides:function(n){n.generateAbstractTransformGrouping=function(t){var a=t.main,r=t.transform,i=t.containerWidth,o=t.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),u="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),d="rotate(".concat(r.rotate," 0 0)"),c={transform:"".concat(l," ").concat(u," ").concat(d)},g={transform:"translate(".concat(o/2*-1," -256)")},p={outer:s,inner:c,path:g};return{tag:"g",attributes:f({},p.outer),children:[{tag:"g",attributes:f({},p.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:f(f({},a.icon.attributes),p.path)}]}]}}}},Ie={x:0,y:0,width:"100%",height:"100%"};function Gt(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||n)&&(e.attributes.fill="black"),e}function go(e){return e.tag==="g"?e.children:[e]}var vo={hooks:function(){return{parseNodeAttributes:function(t,a){var r=a.getAttribute("data-fa-mask"),i=r?me(r.split(" ").map(function(o){return o.trim()})):Hn();return i.prefix||(i.prefix=_()),t.mask=i,t.maskId=a.getAttribute("data-fa-mask-id"),t}}},provides:function(n){n.generateAbstractMask=function(t){var a=t.children,r=t.attributes,i=t.main,o=t.mask,s=t.maskId,l=t.transform,u=i.width,d=i.icon,c=o.width,g=o.icon,p=oi({transform:l,containerWidth:c,iconWidth:u}),b={tag:"rect",attributes:f(f({},Ie),{},{fill:"white"})},y=d.children?{children:d.children.map(Gt)}:{},S={tag:"g",attributes:f({},p.inner),children:[Gt(f({tag:d.tag,attributes:f(f({},d.attributes),p.path)},y))]},x={tag:"g",attributes:f({},p.outer),children:[S]},A="mask-".concat(s||Ct()),C="clip-".concat(s||Ct()),H={tag:"mask",attributes:f(f({},Ie),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[b,x]},M={tag:"defs",children:[{tag:"clipPath",attributes:{id:C},children:go(g)},H]};return a.push(M,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(C,")"),mask:"url(#".concat(A,")")},Ie)}),{children:a,attributes:r}}}},yo={provides:function(n){var t=!1;z.matchMedia&&(t=z.matchMedia("(prefers-reduced-motion: reduce)").matches),n.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:f(f({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=f(f({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return t||s.children.push({tag:"animate",attributes:f(f({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:f(f({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:t?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),t||a.push({tag:"path",attributes:f(f({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},bo={hooks:function(){return{parseNodeAttributes:function(t,a){var r=a.getAttribute("data-fa-symbol"),i=r===null?!1:r===""?!0:r;return t.symbol=i,t}}}},xo=[fi,eo,to,no,ao,mo,ho,po,vo,yo,bo];Ci(xo,{mixoutsTo:I});var Uo=I.noAuto,Jn=I.config,Yo=I.library,qn=I.dom,Qn=I.parse,Bo=I.findIconDefinition,Go=I.toHtml,Zn=I.icon,Vo=I.layer,wo=I.text,So=I.counter;var Ao=["*"],Io=(()=>{class e{defaultPrefix="fas";fallbackIcon=null;fixedWidth;set autoAddCss(t){Jn.autoAddCss=t,this._autoAddCss=t}get autoAddCss(){return this._autoAddCss}_autoAddCss=!0;static \u0275fac=function(a){return new(a||e)};static \u0275prov=U({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Co=(()=>{class e{definitions={};addIcons(...t){for(let a of t){a.prefix in this.definitions||(this.definitions[a.prefix]={}),this.definitions[a.prefix][a.iconName]=a;for(let r of a.icon[2])typeof r=="string"&&(this.definitions[a.prefix][r]=a)}}addIconPacks(...t){for(let a of t){let r=Object.keys(a).map(i=>a[i]);this.addIcons(...r)}}getIconDefinition(t,a){return t in this.definitions&&a in this.definitions[t]?this.definitions[t][a]:null}static \u0275fac=function(a){return new(a||e)};static \u0275prov=U({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Fo=e=>{throw new Error(`Could not find icon with iconName=${e.iconName} and prefix=${e.prefix} in the icon library.`)},Po=()=>{throw new Error("Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.")},ta=e=>e!=null&&(e===90||e===180||e===270||e==="90"||e==="180"||e==="270"),No=e=>{let n=ta(e.rotate),t={[`fa-${e.animation}`]:e.animation!=null&&!e.animation.startsWith("spin"),"fa-spin":e.animation==="spin"||e.animation==="spin-reverse","fa-spin-pulse":e.animation==="spin-pulse"||e.animation==="spin-pulse-reverse","fa-spin-reverse":e.animation==="spin-reverse"||e.animation==="spin-pulse-reverse","fa-pulse":e.animation==="spin-pulse"||e.animation==="spin-pulse-reverse","fa-fw":e.fixedWidth,"fa-border":e.border,"fa-inverse":e.inverse,"fa-layers-counter":e.counter,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both",[`fa-${e.size}`]:e.size!==null,[`fa-rotate-${e.rotate}`]:n,"fa-rotate-by":e.rotate!=null&&!n,[`fa-pull-${e.pull}`]:e.pull!==null,[`fa-stack-${e.stackItemSize}`]:e.stackItemSize!=null};return Object.keys(t).map(a=>t[a]?a:null).filter(a=>a!=null)},Ze=new WeakSet,ea="fa-auto-css";function Eo(e,n){if(!n.autoAddCss||Ze.has(e))return;if(e.getElementById(ea)!=null){n.autoAddCss=!1,Ze.add(e);return}let t=e.createElement("style");t.setAttribute("type","text/css"),t.setAttribute("id",ea),t.innerHTML=qn.css();let a=e.head.childNodes,r=null;for(let i=a.length-1;i>-1;i--){let o=a[i],s=o.nodeName.toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=o)}e.head.insertBefore(t,r),n.autoAddCss=!1,Ze.add(e)}var Mo=e=>e.prefix!==void 0&&e.iconName!==void 0,Do=(e,n)=>Mo(e)?e:Array.isArray(e)&&e.length===2?{prefix:e[0],iconName:e[1]}:{prefix:n,iconName:e},Oo=(()=>{class e{stackItemSize=te("1x");size=te();_effect=rt(()=>{if(this.size())throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.')});static \u0275fac=function(a){return new(a||e)};static \u0275dir=st({type:e,selectors:[["fa-icon","stackItemSize",""],["fa-duotone-icon","stackItemSize",""]],inputs:{stackItemSize:[1,"stackItemSize"],size:[1,"size"]}})}return e})(),To=(()=>{class e{size=te();classes=ye(()=>{let t=this.size(),a=t?{[`fa-${t}`]:!0}:{};return tt(et({},a),{"fa-stack":!0})});static \u0275fac=function(a){return new(a||e)};static \u0275cmp=ve({type:e,selectors:[["fa-stack"]],hostVars:2,hostBindings:function(a,r){a&2&&dt(r.classes())},inputs:{size:[1,"size"]},ngContentSelectors:Ao,decls:1,vars:0,template:function(a,r){a&1&&(ut(),ct(0))},encapsulation:2,changeDetection:0})}return e})(),is=(()=>{class e{icon=k();title=k();animation=k();mask=k();flip=k();size=k();pull=k();border=k();inverse=k();symbol=k();rotate=k();fixedWidth=k();transform=k();a11yRole=k();renderedIconHTML=ye(()=>{let t=this.icon()??this.config.fallbackIcon;if(!t)return Po(),"";let a=this.findIconDefinition(t);if(!a)return"";let r=this.buildParams();Eo(this.document,this.config);let i=Zn(a,r);return this.sanitizer.bypassSecurityTrustHtml(i.html.join(`
`))});document=N(at);sanitizer=N(ht);config=N(Io);iconLibrary=N(Co);stackItem=N(Oo,{optional:!0});stack=N(To,{optional:!0});constructor(){this.stack!=null&&this.stackItem==null&&console.error('FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x" />.')}findIconDefinition(t){let a=Do(t,this.config.defaultPrefix);if("icon"in a)return a;let r=this.iconLibrary.getIconDefinition(a.prefix,a.iconName);return r??(Fo(a),null)}buildParams(){let t=this.fixedWidth(),a={flip:this.flip(),animation:this.animation(),border:this.border(),inverse:this.inverse(),size:this.size(),pull:this.pull(),rotate:this.rotate(),fixedWidth:typeof t=="boolean"?t:this.config.fixedWidth,stackItemSize:this.stackItem!=null?this.stackItem.stackItemSize():void 0},r=this.transform(),i=typeof r=="string"?Qn.transform(r):r,o=this.mask(),s=o!=null?this.findIconDefinition(o):null,l={},u=this.a11yRole();u!=null&&(l.role=u);let d={};return a.rotate!=null&&!ta(a.rotate)&&(d["--fa-rotate-angle"]=`${a.rotate}`),{title:this.title(),transform:i,classes:No(a),mask:s??void 0,symbol:this.symbol(),attributes:l,styles:d}}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=ve({type:e,selectors:[["fa-icon"]],hostAttrs:[1,"ng-fa-icon"],hostVars:2,hostBindings:function(a,r){a&2&&(ft("innerHTML",r.renderedIconHTML(),it),lt("title",r.title()??void 0))},inputs:{icon:[1,"icon"],title:[1,"title"],animation:[1,"animation"],mask:[1,"mask"],flip:[1,"flip"],size:[1,"size"],pull:[1,"pull"],border:[1,"border"],inverse:[1,"inverse"],symbol:[1,"symbol"],rotate:[1,"rotate"],fixedWidth:[1,"fixedWidth"],transform:[1,"transform"],a11yRole:[1,"a11yRole"]},outputs:{icon:"iconChange",title:"titleChange",animation:"animationChange",mask:"maskChange",flip:"flipChange",size:"sizeChange",pull:"pullChange",border:"borderChange",inverse:"inverseChange",symbol:"symbolChange",rotate:"rotateChange",fixedWidth:"fixedWidthChange",transform:"transformChange",a11yRole:"a11yRoleChange"},decls:0,vars:0,template:function(a,r){},encapsulation:2,changeDetection:0})}return e})();var os=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=ot({type:e});static \u0275inj=nt({})}return e})();var jo=(()=>{class e{constructor(){this.settings={categoriesApiUrl:"",usersApiUrl:"",articlesApiUrl:""}}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275prov=U({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),ds=(()=>{class e{constructor(){this.http=N(mt),this.appSettingsService=N(jo)}initializeApp(){this.http.get("assets/settings.json").subscribe(t=>this.appSettingsService.settings=t)}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275prov=U({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{jo as a,ds as b,is as c,os as d};
