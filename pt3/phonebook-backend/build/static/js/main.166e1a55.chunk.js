(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),i=n(2),u=function(e){var t=e.filter,n=e.setFilter,a=e.persons,o=e.setFiltered,c=function(e){var t=[];a.map((function(n){n.name.toLowerCase().includes(e)&&t.push(n)})),o(t)};return r.a.createElement("div",null,r.a.createElement("input",{value:t,onChange:function(e){e.preventDefault(),n(e.target.value),c(e.target.value)},placeholder:"filter.."}))},l=n(4),s=n(3),m=n.n(s),d="/api/persons",f=function(){return m.a.get(d).then((function(e){return e.data})).catch((function(e){return console.log("error handling get req: ",e)}))},p=function(e){return m.a.post(d,e).then((function(e){return e.data}))},h=function(e,t){return m.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data})).catch((function(e){console.log("error handling create req: ",e)}))},b=function(e){return m.a.delete("".concat(d,"/").concat(e))},g=function(e){var t=e.persons,n=e.setPersons,a=e.newPerson,o=e.setNewPerson,c=e.setNotification,i=function(){return t.filter((function(e){return e.name===a.name}))[0].id};return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(e){e.preventDefault();t.map((function(e){return e.name})).includes(a.name)?window.confirm('The phonebook already has someone named "'.concat(a.name,'" do you want to update the number?'))&&h(i(),a).then((function(e){n(t.map((function(t){return t.id!==i()?t:e})))})).catch((function(e){console.log(e),c({type:"bad",show:!0,message:"The person with name ".concat(a.name," has already been deleted")}),n(t.filter((function(e){return e.id!==i()})))})):(p(a).then((function(e){n(t.concat(e)),c({type:"good",show:!0,message:"Added ".concat(a.name," to the phonebook")})})).catch((function(e){c({type:"bad",show:!0,message:JSON.stringify(e.response.data)})})),o({name:"",number:""}))}},"Name:",r.a.createElement("input",{name:"name",onChange:function(e){e.preventDefault(),o(Object(l.a)({},a,{name:e.target.value}))},value:a.name,placeholder:"name..."}),r.a.createElement("br",null),"Number:",r.a.createElement("input",{name:"number",onChange:function(e){e.preventDefault(),o(Object(l.a)({},a,{number:e.target.value}))},value:a.number,placeholder:"number..."}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"}," Submit ")))},E=function(e){var t=e.persons,n=e.setPersons,a=e.filtered,o=e.setFiltered,c=e.isFilter,i=e.setNotification,u=function(e,r){window.confirm('Are you sure you want to delete "'.concat(r,'"?'))&&(b(e).then((function(e){return i({type:"bad",show:!0,message:"Deleted ".concat(r," from the phonebook")})})).catch((function(e){return i({type:"bad",show:!0,message:"The person with name ".concat(r," has already been deleted")})})),n(t.filter((function(t){return t.id!==e}))),c&&o(a.filter((function(t){return t.id!==e}))))};return c?r.a.createElement("div",null,a.map((function(e){return r.a.createElement("div",{key:e.id},r.a.createElement("p",{style:{display:"inline-block",marginRight:"5px"}},e.name," ",e.number),r.a.createElement("button",{onClick:function(){return u(e.id,e.name)}},"Delete"))}))):r.a.createElement("div",null,t.map((function(e){return console.log(e),r.a.createElement("div",{key:e.id},r.a.createElement("p",{style:{display:"inline-block",marginRight:"5px"}},e.name," ",e.number),r.a.createElement("button",{onClick:function(){return u(e.id,e.name)}},"Delete"))})))},v=function(e){var t=e.notification,n=e.setNotification,a=[{color:"red",border:"3px solid red",width:"500px",textAlign:"center"},{color:"green",border:"3px solid green",width:"500px",textAlign:"center"}];return setTimeout((function(){return n({type:"",show:!1,message:""})}),5e3),"bad"===t.type?r.a.createElement("div",{style:a[0]},r.a.createElement("p",null,t.message)):"good"===t.type?r.a.createElement("div",{style:a[1]},r.a.createElement("p",null,t.message)):null},w=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)({name:"",number:""}),l=Object(i.a)(c,2),s=l[0],m=l[1],d=Object(a.useState)(""),p=Object(i.a)(d,2),h=p[0],b=p[1],w=Object(a.useState)([]),y=Object(i.a)(w,2),O=y[0],j=y[1],k=Object(a.useState)(!1),N=Object(i.a)(k,2),S=N[0],x=N[1],P=Object(a.useState)({type:"",show:!1,message:""}),F=Object(i.a)(P,2),D=F[0],C=F[1];Object(a.useEffect)((function(){f().then((function(e){return o(e)}))}),[o]),Object(a.useEffect)((function(){h.length>0&&x(!0)}),[h.length]);return r.a.createElement("div",null,function(){if(D.show)return r.a.createElement(v,{notification:D,setNotification:C})}(),r.a.createElement("h2",null,"Phonebook"),r.a.createElement(u,{filter:h,setFilter:b,persons:n,setFiltered:j}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(g,{persons:n,setPersons:o,newPerson:s,setNewPerson:m,setNotification:C}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(E,{persons:n,setPersons:o,filtered:O,setFiltered:j,isFilter:S,setNotification:C}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.166e1a55.chunk.js.map