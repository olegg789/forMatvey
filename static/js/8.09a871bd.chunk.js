(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{233:function(e,t,a){"use strict";var n=a(0),c=a.n(n),o=a(9),r=a.n(o),l=a(10),i=a(6),s=a(11),u="0 0 28 28",h="add_outline_28",d='<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="add_outline_28"><g fill="none" fill-rule="evenodd"><path d="M0 0h28v28H0z" /><path d="M14 4a1 1 0 011 1v8h8a1 1 0 010 2h-8v8a1 1 0 01-2 0v-8H5a1 1 0 010-2h8V5a1 1 0 011-1z" fill="currentColor" fill-rule="nonzero" /></g></symbol>',m=!1;function f(){m||(Object(i.a)(new r.a({id:h,viewBox:u,content:d})),m=!0)}var w=function(e){return Object(i.b)(function(){f()},[]),c.a.createElement(s.a,Object(l.assign)({},e,{viewBox:u,id:h,width:isNaN(e.width)?28:+e.width,height:isNaN(e.height)?28:+e.height}))};w.mountIcon=f,t.a=w},239:function(e,t,a){"use strict";a.r(t);var n=a(12),c=a.n(n),o=a(15),r=a(13),l=a(0),i=a.n(l),s=a(5),u=a(9),h=a.n(u),d=a(10),m=a(6),f=a(11),w="0 0 28 28",p="school_outline_28",v='<symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="school_outline_28"><path clip-rule="evenodd" d="M14.637 6.104a2 2 0 00-1.274 0c-.17.057-.38.177-.724.483-.353.314-.774.754-1.39 1.402l-3.525 3.7A1 1 0 017 12H4v7c0 .717 0 1.194.03 1.56.03.356.081.518.133.621a1.5 1.5 0 00.656.655c.103.053.265.104.62.133C5.806 22 6.283 22 7 22h3.5v-3.5a3.5 3.5 0 117 0V22H21c.717 0 1.194 0 1.56-.03.356-.03.518-.081.621-.133a1.5 1.5 0 00.655-.656c.053-.103.104-.265.133-.62C24 20.194 24 19.717 24 19v-7h-3a1 1 0 01-.724-.31l-3.524-3.7c-.617-.649-1.038-1.09-1.39-1.403-.345-.306-.555-.426-.725-.483zM15.5 18.5V22h-3v-3.5a1.5 1.5 0 013 0zM7 24h14.04c.666 0 1.226 0 1.683-.037.48-.04.934-.124 1.366-.345a3.5 3.5 0 001.53-1.529c.22-.432.304-.887.344-1.366.037-.457.037-1.017.037-1.683V10.96c0-.666 0-1.226-.037-1.683-.04-.48-.124-.934-.345-1.366a3.5 3.5 0 00-1.529-1.53c-.432-.22-.887-.305-1.366-.344C22.266 6 21.706 6 21.04 6h-3.423a17.647 17.647 0 00-.927-.908c-.438-.389-.883-.705-1.417-.884a4 4 0 00-2.546 0c-.534.18-.98.495-1.417.884-.28.25-.584.554-.927.908H6.96c-.666 0-1.226 0-1.683.037-.48.04-.934.124-1.366.344a3.5 3.5 0 00-1.53 1.53c-.22.432-.305.887-.344 1.366C2 9.734 2 10.294 2 10.96V19.04c0 .666 0 1.226.037 1.683.04.48.124.934.344 1.366a3.5 3.5 0 001.53 1.53c.432.22.887.304 1.366.344C5.734 24 6.294 24 6.96 24zm16.994-14a9.244 9.244 0 00-.025-.56c-.029-.356-.08-.518-.133-.621a1.5 1.5 0 00-.655-.656c-.103-.052-.265-.103-.62-.132C22.194 8 21.717 8 21 8h-1.476l1.905 2zM8.476 8H7c-.717 0-1.194 0-1.56.03-.356.03-.518.081-.621.133a1.5 1.5 0 00-.656.656c-.052.103-.103.265-.132.62-.013.162-.021.345-.025.561H6.57zM14 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="currentColor" fill-rule="evenodd" /></symbol>',b=!1;function g(){b||(Object(m.a)(new h.a({id:p,viewBox:w,content:v})),b=!0)}var E=function(e){return Object(m.b)(function(){g()},[]),i.a.createElement(f.a,Object(d.assign)({},e,{viewBox:w,id:p,width:isNaN(e.width)?28:+e.width,height:isNaN(e.height)?28:+e.height}))};E.mountIcon=g;var N=E,_=a(233),z=a(14),j=a.n(z),x=!1,O=["\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."];t.default=function(e){var t=e.isDesktop,a=e.router,n=Object(l.useState)(O),u=Object(r.a)(n,2),h=u[0],d=u[1];function m(){return(m=Object(o.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.toPopout(i.a.createElement(s.G,null)),e.next=3,j.a.send("VKWebAppGetUserInfo");case 3:t=e.sent,O[0]=t.first_name+" "+t.last_name,O.push(t.photo_200),O.push(t.id),d(O),x=!0,a.toPopout();case 10:case"end":return e.stop()}},e)}))).apply(this,arguments)}return Object(l.useEffect)(function(){x||function(){m.apply(this,arguments)}()}),i.a.createElement(i.a.Fragment,null,i.a.createElement(s.B,{separator:!1},"\u041f\u0440\u043e\u0444\u0438\u043b\u044c"),i.a.createElement(s.q,null,i.a.createElement(s.p,{className:t?"ProfileUserWeb":"ProfileUserMobail"},i.a.createElement(s.d,{size:96,src:h[1]}),i.a.createElement(s.P,{className:"NameUser",level:"2",weight:"medium"},h[0]),i.a.createElement(s.N,{className:"SubheaderUser"},"\u041a\u0430\u043a\u043e\u0439-\u043d\u0438\u0431\u0443\u0434\u044c \u0441\u0442\u0430\u0442\u0443\u0441 \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430..."),i.a.createElement(s.e,{size:"m",mode:"secondary",href:"https://vk.com/id".concat(h[2]),target:"_blank"},"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443")),i.a.createElement(s.r,null,"\u0423\u0447\u0435\u0431\u043d\u044b\u0435 \u0437\u0430\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u0438 \u043a\u043b\u0430\u0441\u0441\u044b"),i.a.createElement(s.H,{before:i.a.createElement(N,null),description:"\u0415\u043a\u0430\u0442\u0435\u0440\u0438\u043d\u0431\u0443\u0440\u0433"},"\u0428\u043a\u043e\u043b\u0430 \u2116180"),i.a.createElement(s.g,{before:i.a.createElement(_.a,null)},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0447\u0435\u0431\u043d\u043e\u0435 \u0437\u0430\u0432\u0435\u0434\u0435\u043d\u0438\u0435")))}}}]);