(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{147:function(e,t,n){e.exports=n(202)},201:function(e,t,n){},202:function(e,t,n){"use strict";n.r(t);n(148),n(173);var a=n(0),r=n.n(a),c=n(34),o=n.n(c),u=n(40),l=n.n(u),i=[{id:"home",hash:"home",panels:[{id:"base",hash:"/notes"},{id:"placeholder",hash:"/settings"}]},{id:"profile",hash:"profile",panels:[{id:"base",hash:"/base"}]}],s=n(12),p=n.n(s),m=n(15),f=n(13),h=n(4),b=n(205),d=n(206),v=n(204),j=n(207);var E=Object(h.R)(function(e){var t=e.id,n=e.platform,c=e.router,o=e.openSnackbar,u=e.notes,l=e.getNotes,i=Object(a.useState)(""),s=Object(f.a)(i,2),E=s[0],O=s[1],g=Object(a.useState)(""),k=Object(f.a)(g,2),y=k[0],w=k[1],x=Object(a.useState)(""),N=Object(f.a)(x,2),S=N[0],C=N[1],B=Object(a.useState)(""),M=Object(f.a)(B,2),L=M[0],P=M[1],A=Object(a.useState)("0/100"),I=Object(f.a)(A,2),V=I[0],W=I[1],z=Object(a.useState)("0/300"),D=Object(f.a)(z,2),T=D[0],_=D[1];function H(e){return K.apply(this,arguments)}function K(){return(K=Object(m.a)(p.a.mark(function e(t){var n,a,r;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.currentTarget,a=n.name,r=n.value,"name"===a?(O(r),W("".concat(r.length,"/100"))):"value"===a?(w(r),_("".concat(r.length,"/300"))):"status"===a?C(r):"priority"===a&&P(r);case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function R(){return(R=Object(m.a)(p.a.mark(function e(){var t,n,a,i;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=window.location.search.slice(1).replace(/&/gi,"/"),e.next=4,fetch("https://sab.wan-group.ru/notes?method=notes.createNote&access_token=".concat(t,"&name=").concat(E.replace(/&/gi,"\xa6"),"&value=").concat(y.replace(/&/gi,"\xa6"),"&status=").concat(S,"&priority=").concat(L));case 4:return n=e.sent,e.next=7,n.json();case 7:a=e.sent,n.ok?((i=u).count+=1,i.items.unshift({noteId:a.noteId,name:E,priority:Number(L),status:Number(S),value:y.replace(/&/gi,"\xa6")}),l(i),c.toBack(),o("\u0417\u0430\u043c\u0435\u0442\u043a\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430!",r.a.createElement(b.a,null))):a.error&&("12"===a.code?(c.toBack(),o("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0435 \u0438\u043c\u044f. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"10"===a.code?(c.toBack(),o("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u0441\u0442\u0430\u0442\u0443\u0441. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"11"===a.code?(c.toBack(),o("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"13"===a.code?(c.toBack(),o("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"14"===a.code&&(c.toBack(),o("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u0430\u0439\u0434\u0438 \u0437\u0430\u043c\u0435\u0442\u043a\u0438. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null)))),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}},e,null,[[0,11]])}))).apply(this,arguments)}return r.a.createElement(h.t,{id:t,header:r.a.createElement(h.u,{left:n!==h.s&&r.a.createElement(h.A,{onClick:function(){return c.toBack()}},r.a.createElement(v.a,null)),right:n===h.s&&r.a.createElement(h.A,{onClick:function(){return c.toBack()}},r.a.createElement(j.a,null))},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u043c\u0435\u0442\u043a\u0443"),onClose:function(){return c.toBack()},settlingHeight:100},r.a.createElement(h.n,null,r.a.createElement(h.m,{top:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u0437\u0430\u043c\u0435\u0442\u043a\u0438",bottom:V},r.a.createElement(h.L,{name:"name",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435...",maxLength:100,value:E,onChange:function(e){e.currentTarget.value.length>100||H(e)}})),r.a.createElement(h.m,{top:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0441\u0442 \u0437\u0430\u043c\u0435\u0442\u043a\u0438",bottom:T},r.a.createElement(h.L,{value:y,name:"value",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435...",maxLength:300,onChange:function(e){e.currentTarget.value.length>300||H(e)}})),r.a.createElement(h.m,{top:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"},r.a.createElement(h.w,{name:"status",placeholder:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",onChange:function(e){return H(e)}},[{value:"0",status:"\u041e\u0442\u043a\u0440\u044b\u0442"},{value:"1",status:"\u0412 \u0440\u0430\u0431\u043e\u0442\u0435"},{value:"2",status:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d"},{value:"3",status:"\u041d\u0430 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0438"}].map(function(e){return r.a.createElement("option",{value:e.value},e.status)}))),r.a.createElement(h.m,{top:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"},r.a.createElement(h.w,{name:"priority",placeholder:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",onChange:function(e){return H(e)}},[{value:"0",priority:"\u041d\u0438\u0437\u043a\u0438\u0439"},{value:"1",priority:"\u0421\u0440\u0435\u0434\u043d\u0438\u0439"},{value:"2",priority:"\u0412\u044b\u0441\u043e\u043a\u0438\u0439"},{value:"3",priority:"\u041a\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439"}].map(function(e){return r.a.createElement("option",{value:e.value},e.priority)}))),r.a.createElement(h.j,null,r.a.createElement(h.f,{size:"l",stretched:!0,onClick:function(){return function(){return R.apply(this,arguments)}()}},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"))))});var O=Object(h.R)(function(e){var t=e.id,n=e.getMinorNotes,c=e.getMiddleNotes,o=e.getMajorNotes,u=e.getCriticalNotes,l=e.platform,i=e.getNotes,s=e.openSnackbar,E=e.router,O=e.noteId,g=e.noteName,k=e.noteValue,y=e.noteStatus,w=e.notePriority,x=Object(a.useState)(g),N=Object(f.a)(x,2),S=N[0],C=N[1],B=Object(a.useState)(k),M=Object(f.a)(B,2),L=M[0],P=M[1],A=Object(a.useState)(y),I=Object(f.a)(A,2),V=I[0],W=I[1],z=Object(a.useState)(w),D=Object(f.a)(z,2),T=D[0],_=D[1],H=Object(a.useState)("".concat(g.length,"/100")),K=Object(f.a)(H,2),R=K[0],G=K[1],J=Object(a.useState)("".concat(k.length,"/300")),F=Object(f.a)(J,2),Q=F[0],U=F[1];function q(e){return X.apply(this,arguments)}function X(){return(X=Object(m.a)(p.a.mark(function e(t){var n,a,r;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.currentTarget,a=n.name,r=n.value,"name"===a?(C(r),G("".concat(r.length,"/100"))):"value"===a?(P(r),U("".concat(r.length,"/300"))):"status"===a?W(r):"priority"===a&&_(r);case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Y(){return(Y=Object(m.a)(p.a.mark(function e(){var t,a,l;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=window.location.search.slice(1).replace(/&/gi,"/"),e.next=4,fetch("https://sab.wan-group.ru/notes?method=notes.editNote&access_token=".concat(t,"&name=").concat(S.replace(/&/gi,"\xa6"),"&value=").concat(L.replace(/&/gi,"\xa6"),"&status=").concat(V,"&priority=").concat(T,"&noteId=").concat(O));case 4:return a=e.sent,e.next=7,a.json();case 7:l=e.sent,a.ok?(E.toBack(),i(),n(),c(),o(),u(),s("\u0417\u0430\u043c\u0435\u0442\u043a\u0430 \u043e\u0442\u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0430!",r.a.createElement(b.a,null))):l.error&&("12"===l.code?(E.toBack(),s("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0435 \u0438\u043c\u044f. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"10"===l.code?(E.toBack(),s("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u0441\u0442\u0430\u0442\u0443\u0441. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"11"===l.code?(E.toBack(),s("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"13"===l.code?(E.toBack(),s("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null))):"14"===l.code&&(E.toBack(),s("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u0430\u0439\u0434\u0438 \u0437\u0430\u043c\u0435\u0442\u043a\u0438. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430!",r.a.createElement(d.a,null)))),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}},e,null,[[0,11]])}))).apply(this,arguments)}return r.a.createElement(h.t,{id:t,header:r.a.createElement(h.u,{left:l!==h.s&&r.a.createElement(h.A,{onClick:function(){return E.toBack()}},r.a.createElement(v.a,null)),right:l===h.s&&r.a.createElement(h.A,{onClick:function(){return E.toBack()}},r.a.createElement(j.a,null))},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"),onClose:function(){return E.toBack()},settlingHeight:100},r.a.createElement(h.n,null,r.a.createElement(h.m,{top:"\u0418\u043c\u044f \u0437\u0430\u043c\u0435\u0442\u043a\u0438",bottom:R},r.a.createElement(h.L,{name:"name",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435...",maxLength:100,value:S,onChange:function(e){return q(e)}})),r.a.createElement(h.m,{top:"\u0422\u0435\u043a\u0441\u0442 \u0437\u0430\u043c\u0435\u0442\u043a\u0438",bottom:Q},r.a.createElement(h.L,{value:L,name:"value",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435...",maxLength:300,onChange:function(e){return q(e)}})),r.a.createElement(h.m,{top:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"},r.a.createElement(h.w,{name:"status",placeholder:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",value:V,onChange:function(e){return q(e)}},[{value:"0",status:"\u041e\u0442\u043a\u0440\u044b\u0442"},{value:"1",status:"\u0412 \u0440\u0430\u0431\u043e\u0442\u0435"},{value:"2",status:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d"},{value:"3",status:"\u041d\u0430 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0438"}].map(function(e){return r.a.createElement("option",{value:e.value},e.status)}))),r.a.createElement(h.m,{top:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"},r.a.createElement(h.w,{name:"priority",placeholder:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",value:T,onChange:function(e){return q(e)}},[{value:"0",priority:"\u041d\u0438\u0437\u043a\u0438\u0439"},{value:"1",priority:"\u0421\u0440\u0435\u0434\u043d\u0438\u0439"},{value:"2",priority:"\u0412\u044b\u0441\u043e\u043a\u0438\u0439"},{value:"3",priority:"\u041a\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439"}].map(function(e){return r.a.createElement("option",{value:e.value},e.priority)}))),r.a.createElement(h.j,null,r.a.createElement(h.f,{size:"l",stretched:!0,onClick:function(){return function(){return Y.apply(this,arguments)}()}},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"))))}),g=n(14),k=n.n(g),y=Object(a.lazy)(function(){return n.e(4).then(n.bind(null,213))}),w=Object(a.lazy)(function(){return n.e(7).then(n.bind(null,214))}),x=Object(a.lazy)(function(){return n.e(5).then(n.bind(null,215))}),N=!1,S=Object(h.Q)(function(e){var t=e.viewWidth,n=e.router,c=Object(a.useState)({count:0,items:[]}),o=Object(f.a)(c,2),u=o[0],l=o[1],i=Object(a.useState)(null),s=Object(f.a)(i,2),b=s[0],d=s[1],v=Object(a.useState)(null),j=Object(f.a)(v,2),g=j[0],S=j[1],C=Object(a.useState)(null),B=Object(f.a)(C,2),M=B[0],L=B[1],P=Object(a.useState)(null),A=Object(f.a)(P,2),I=A[0],V=A[1],W=Object(a.useState)(null),z=Object(f.a)(W,2),D=z[0],T=z[1],_=Object(a.useState)("light"),H=Object(f.a)(_,2),K=H[0],R=H[1],G=Object(a.useState)(null),J=Object(f.a)(G,2),F=J[0],Q=J[1],U=Object(a.useState)({count:0,items:[]}),q=Object(f.a)(U,2),X=q[0],Y=q[1],Z=Object(a.useState)({count:0,items:[]}),$=Object(f.a)(Z,2),ee=$[0],te=$[1],ne=Object(a.useState)({count:0,items:[]}),ae=Object(f.a)(ne,2),re=ae[0],ce=ae[1],oe=Object(a.useState)({count:0,items:[]}),ue=Object(f.a)(oe,2),le=ue[0],ie=ue[1];function se(e,t){return pe.apply(this,arguments)}function pe(){return(pe=Object(m.a)(p.a.mark(function e(t,n){var a,r,c;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(N&&!n){e.next=21;break}return e.prev=1,a=window.location.search.slice(1).replace(/&/gi,"/"),e.next=5,fetch("https://sab.wan-group.ru/notes?method=notes.getMyNotes&access_token=".concat(a));case 5:return r=e.sent,e.next=8,r.json();case 8:return(c=e.sent).items.reverse(),e.next=12,l(c);case 12:N=!0,me(c),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),console.log(e.t0);case 19:e.next=23;break;case 21:l(t),me(t);case 23:case"end":return e.stop()}},e,null,[[1,16]])}))).apply(this,arguments)}function me(e){return fe.apply(this,arguments)}function fe(){return(fe=Object(m.a)(p.a.mark(function e(t){var n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.items.filter(function(e){return 0===e.priority}),console.log(t),Y({count:n.length,items:n}),he(t);case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function he(e){return be.apply(this,arguments)}function be(){return(be=Object(m.a)(p.a.mark(function e(t){var n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.items.filter(function(e){return 1===e.priority}),te({count:n.length,items:n}),de(t);case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function de(e){return ve.apply(this,arguments)}function ve(){return(ve=Object(m.a)(p.a.mark(function e(t){var n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.items.filter(function(e){return 2===e.priority}),ce({count:n.length,items:n}),je(t);case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function je(e){return Ee.apply(this,arguments)}function Ee(){return(Ee=Object(m.a)(p.a.mark(function e(t){var n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.items.filter(function(e){return 3===e.priority}),ie({count:n.length,items:n});case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Oe(){return(Oe=Object(m.a)(p.a.mark(function e(t){var n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("vkcom"!==t){e.next=4;break}R("vkcom_light"),e.next=9;break;case 4:return k.a.subscribe(function(e){if("VKWebAppUpdateConfig"===e.detail.type){var t=e.detail.data.scheme;R(t)}}),e.next=7,k.a.send("VKWebAppGetConfig");case 7:n=e.sent,R(n.scheme);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ge(e,t){return ke.apply(this,arguments)}function ke(){return(ke=Object(m.a)(p.a.mark(function e(t,n){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:Q(r.a.createElement(h.F,{className:!we&&"snack",layout:"vertical",onClose:function(){return Q(null)},before:n},t));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ye(){return(ye=Object(m.a)(p.a.mark(function e(t,a,r,c,o){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:d(t),S(a),L(r),V(c),T(o),n.toModal("editNote");case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}Object(a.useEffect)(function(){!function(e){Oe.apply(this,arguments)}(xe),se()},[]);var we=t>=3,xe=we?h.N:Object(h.P)(),Ne=!0!==we,Se=r.a.createElement(h.v,{activeModal:n.modal},r.a.createElement(E,{id:"addNote",openSnackbar:function(e,t){return ge(e,t)},getNotes:function(e){return se(e)},platform:xe,onClose:function(){return n.toBack()},router:n,notes:u,setMinorNotes:function(e){return Y(e)},setMiddleNotes:function(e){return te(e)},setMajorNotes:function(e){return ce(e)},setCriticalNotes:function(e){return ie(e)}}),r.a.createElement(O,{openSnackbar:function(e,t){return ge(e,t)},onClose:function(){return n.toBack()},getNotes:function(){return se("",!0)},id:"editNote",getMinorNotes:function(){return me()},getMiddleNotes:function(){return he()},getMajorNotes:function(){return de()},getCriticalNotes:function(){return je()},noteId:b,noteName:g,noteValue:M,noteStatus:I,notePriority:D,platform:xe,router:n}));return r.a.createElement(h.i,{platform:xe,isWebView:!0,scheme:K},r.a.createElement(h.d,null,r.a.createElement(h.H,{header:Ne&&r.a.createElement(h.y,{separator:!1}),style:{justifyContent:"center"}},r.a.createElement(h.G,{animate:!we,spaced:we,width:we?"560px":"100%",maxWidth:we?"560px":"100%"},r.a.createElement(h.k,{activeStory:n.activeView},r.a.createElement(h.O,{id:"home",activePanel:n.activePanel,popout:n.popout,modal:Se},r.a.createElement(h.x,{id:"base"},r.a.createElement(a.Suspense,{fallback:r.a.createElement(h.D,null)},r.a.createElement(y,{openSnackbar:function(e,t){return ge(e,t)},editNote:function(e,t,n,a,r){return function(e,t,n,a,r){return ye.apply(this,arguments)}(e,t,n,a,r)},minorNotes:X,middleNotes:ee,majorNotes:re,criticalNotes:le,setCriticalNotes:function(e){return ie(e)},allNotes:u,getNotes:function(e,t){return se(e,t)},router:n,isDesktop:we})),F),r.a.createElement(h.x,{id:"placeholder"},r.a.createElement(a.Suspense,{fallback:r.a.createElement(h.D,null)},r.a.createElement(w,{router:n,platform:xe})))),r.a.createElement(h.O,{id:"profile",activePanel:n.activePanel,popout:n.popout,modal:Se},r.a.createElement(h.x,{id:"base"},r.a.createElement(a.Suspense,{fallback:r.a.createElement(h.D,null)},r.a.createElement(x,{router:n,isDesktop:we})))))))))},{viewWidth:!0}),C=Object(u.withRouter)(S);n(200),n(201);k.a.send("VKWebAppInit",{}),o.a.render(r.a.createElement(l.a,{structure:i},r.a.createElement(h.b,null,r.a.createElement(C,null))),document.getElementById("root")),Promise.all([n.e(3),n.e(6)]).then(n.bind(null,212)).then(function(e){e.default})}},[[147,1,2]]]);