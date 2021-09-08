(self.webpackChunkdoc_ops=self.webpackChunkdoc_ops||[]).push([[2415],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=s(n),f=i,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||o;return n?r.createElement(m,a(a({ref:t},u),{},{components:n})):r.createElement(m,a({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1706:function(e,t,n){"use strict";n.r(t),n.d(t,{contentTitle:function(){return d},default:function(){return g},frontMatter:function(){return u},metadata:function(){return p},toc:function(){return f}});var r=n(2122),i=n(9756),o=n(7294),a=n(3905),c=n(6010);function l(e){var t=e.nodeReplitLink,n=e.rustReplitLink,r=o.useState("node"),i=r[0],a=r[1];return(0,o.useEffect)((function(){var e=localStorage.getItem("lang");a(e||"node")})),o.createElement("div",null,o.createElement("div",{className:(0,c.Z)("langSelector")},o.createElement("button",{className:(0,c.Z)("button","languageButton","mr-sm",{activeButton:"node"===i,inactiveButton:"node"!==i}),onClick:function(){localStorage.setItem("lang","node"),a("node")}},"Node.js"),o.createElement("button",{className:(0,c.Z)("button","languageButton",{activeButton:"rust"==i,inactiveButton:"rust"!==i}),onClick:function(){localStorage.setItem("lang","rust"),a("rust")}},"Rust")),o.createElement("div",{className:(0,c.Z)("codeSnippetContainer")},"node"===i?o.createElement("iframe",{frameborder:"0",width:"100%",height:"600px",src:t}):o.createElement("iframe",{frameborder:"0",width:"100%",height:"600px",src:n})))}var s=["components"],u={title:"Creating a Decentralized Identity",sidebar_label:"Create and Publish",description:"DID Documents and publishing them to the Tangle",image:"/img/Identity_icon.png",keywords:["Documents","DID","Tangle","Publish"]},d=void 0,p={unversionedId:"getting-started/decentralized_identifiers/create",id:"getting-started/decentralized_identifiers/create",isDocsHomePage:!1,title:"Creating a Decentralized Identity",description:"DID Documents and publishing them to the Tangle",source:"@site/docs/getting-started/decentralized_identifiers/create.mdx",sourceDirName:"getting-started/decentralized_identifiers",slug:"/getting-started/decentralized_identifiers/create",permalink:"/docs/getting-started/decentralized_identifiers/create",editUrl:"https://github.com/iotaledger/identity.rs/edit/dev/documentation/docs/getting-started/decentralized_identifiers/create.mdx",tags:[],version:"current",frontMatter:{title:"Creating a Decentralized Identity",sidebar_label:"Create and Publish",description:"DID Documents and publishing them to the Tangle",image:"/img/Identity_icon.png",keywords:["Documents","DID","Tangle","Publish"]},sidebar:"docs",previous:{title:"Decentralized Identifiers (DID)",permalink:"/docs/getting-started/decentralized_identifiers/overview"},next:{title:"Resolve",permalink:"/docs/getting-started/decentralized_identifiers/resolve"}},f=[],m={toc:f};function g(e){var t=e.components,n=(0,i.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"TODO: Explain DID, DID Documents and publishing them to the Tangle."),(0,a.kt)(l,{nodeReplitLink:"https://repl.it/@abdulmth/Create-did?lite=true",rustReplitLink:"https://repl.it/@abdulmth/create-did-rust?lite=true",mdxType:"CodeSnippet"}))}g.isMDXComponent=!0},6010:function(e,t,n){"use strict";function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})}}]);