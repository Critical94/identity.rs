(self.webpackChunkdoc_ops=self.webpackChunkdoc_ops||[]).push([[4214],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(n),d=i,f=m["".concat(u,".").concat(d)]||m[d]||p[d]||a;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3246:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return c},default:function(){return m}});var r=n(2122),i=n(9756),a=(n(7294),n(3905)),o=["components"],l={},u="\ud83d\uddd3\ufe0f Team Identity Meeting Notes - 2020-09-09",s={unversionedId:"meeting-notes/2020-09-09",id:"meeting-notes/2020-09-09",isDocsHomePage:!1,title:"\ud83d\uddd3\ufe0f Team Identity Meeting Notes - 2020-09-09",description:"\ud83d\udc65 Participants",source:"@site/docs/meeting-notes/2020-09-09.md",sourceDirName:"meeting-notes",slug:"/meeting-notes/2020-09-09",permalink:"/docs/meeting-notes/2020-09-09",editUrl:"https://github.com/iotaledger/identity.rs/edit/dev/documentation/docs/meeting-notes/2020-09-09.md",tags:[],version:"current",frontMatter:{}},c=[{value:"\ud83d\udc65 Participants",id:"-participants",children:[]},{value:"\ud83d\udcac Discussion topics",id:"-discussion-topics",children:[{value:"Standup",id:"standup",children:[]},{value:"Fragment Name Uniqueness",id:"fragment-name-uniqueness",children:[]},{value:"Questions",id:"questions",children:[]}]}],p={toc:c};function m(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\ufe0f-team-identity-meeting-notes---2020-09-09"},"\ud83d\uddd3\ufe0f Team Identity Meeting Notes - 2020-09-09"),(0,a.kt)("h2",{id:"-participants"},"\ud83d\udc65 Participants"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"@Thoralf-M"),(0,a.kt)("li",{parentName:"ul"},"@nothingismagick"),(0,a.kt)("li",{parentName:"ul"},"@tensor-programming"),(0,a.kt)("li",{parentName:"ul"},"@JelleMillenaar"),(0,a.kt)("li",{parentName:"ul"},"@l1h3r")),(0,a.kt)("h2",{id:"-discussion-topics"},"\ud83d\udcac Discussion topics"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Standup"),(0,a.kt)("li",{parentName:"ul"},"Fragment Name Uniqueness"),(0,a.kt)("li",{parentName:"ul"},"Working Group participation"),(0,a.kt)("li",{parentName:"ul"},"LD Proof Scope: Merkle Tree"),(0,a.kt)("li",{parentName:"ul"},"Questions"),(0,a.kt)("li",{parentName:"ul"},"Account required data and module implementation")),(0,a.kt)("h3",{id:"standup"},"Standup"),(0,a.kt)("h4",{id:"what-was-last-weeks-progress-on-your-project"},"What was last week's progress on your project?"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Worked on a library for handling LD Proofs and credential verfication (PR open). Looked at DIDcomm"),(0,a.kt)("li",{parentName:"ul"},"Worked on the Proc macro for the Diff library - almost finished."),(0,a.kt)("li",{parentName:"ul"},"Dereferencing part for the resolver + resolver itself"),(0,a.kt)("li",{parentName:"ul"},"Started writing the MethodSpec for W3C. Researched DIDcomm enviroment. Looking at DID Auth + NOISE."),(0,a.kt)("li",{parentName:"ul"},"Discovered existing DIDComm Spec and add facts to presentation. ")),(0,a.kt)("h4",{id:"what-will-be-the-projects-focus-this-week"},"What will be the project's focus this week?"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Continue with the resolver-"),(0,a.kt)("li",{parentName:"ul"},"finish debugging the proc macro and move on to the account module."),(0,a.kt)("li",{parentName:"ul"},"Continue MethodSpec. Kickstart P2P Comms Layer. "),(0,a.kt)("li",{parentName:"ul"},"Add some ",(0,a.kt)("inlineCode",{parentName:"li"},"jsonwebtoken"),"-based signature suites and look at SIOP DID-"),(0,a.kt)("li",{parentName:"ul"},"Start to write DIDComm as Spec and in Code for experimental purposes-")),(0,a.kt)("h3",{id:"fragment-name-uniqueness"},"Fragment Name Uniqueness"),(0,a.kt)("p",null,"Question: Do we check for name uniqueness and throw an error?\n(",(0,a.kt)("a",{parentName:"p",href:"https://github.com/iotaledger/identity.rs/issues/29"},"issue here"),")"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Figure out when a fragment reference is legal"),(0,a.kt)("li",{parentName:"ul"},"Add a function to check if all fragments are unique"),(0,a.kt)("li",{parentName:"ul"},"Execute function when adding a new object to a DID Document"),(0,a.kt)("li",{parentName:"ul"},"Leave additional checks up to the implementer (Call the function manually) ")),(0,a.kt)("h3",{id:"questions"},"Questions"),(0,a.kt)("p",null,"Q: Can our current Proof implementation handle extra logic such as putting the data through a merkle tree?\nA: Yes"),(0,a.kt)("p",null,"Q: Can we run our signature logic within Stronghold?\nA: Most likely without too much hassle."))}m.isMDXComponent=!0}}]);