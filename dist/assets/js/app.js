!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},i={},r={},n={}.hasOwnProperty,a=/^\.\.?(\/|$)/,u=function(e,t){for(var i,r=[],n=(a.test(t)?e+"/"+t:t).split("/"),u=0,c=n.length;u<c;u++)i=n[u],".."===i?r.pop():"."!==i&&""!==i&&r.push(i);return r.join("/")},c=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(i){var r=u(c(t),i);return e.require(r,t)}},l=function(e,t){var r=v&&v.createHot(e),n={id:e,exports:{},hot:r};return i[e]=n,t(n.exports,o(e),n),n.exports},s=function(e){return r[e]?s(r[e]):e},d=function(e,t){return s(u(c(e),t))},f=function(e,r){null==r&&(r="/");var a=s(e);if(n.call(i,a))return i[a].exports;if(n.call(t,a))return l(a,t[a]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};f.alias=function(e,t){r[t]=e};var h=/\.[^.\/]+$/,m=/\/index(\.[^\/]+)?$/,g=function(e){if(h.test(e)){var t=e.replace(h,"");n.call(r,t)&&r[t].replace(h,"")!==t+"/index"||(r[t]=e)}if(m.test(e)){var i=e.replace(m,"");n.call(r,i)||(r[i]=e)}};f.register=f.define=function(e,r){if(e&&"object"==typeof e)for(var a in e)n.call(e,a)&&f.register(a,e[a]);else t[e]=r,delete i[e],g(e)},f.list=function(){var e=[];for(var i in t)n.call(t,i)&&e.push(i);return e};var v=e._hmr&&new e._hmr(d,f,t,i);f._cache=i,f.hmr=v&&v.wrap,f.brunch=!0,e.require=f}}(),function(){"undefined"==typeof window?this:window;require.register("app.js",function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var n=t("firebase"),a=(r(n),t("jquery")),u=r(a),c=t("./reporting-service"),o=r(c),l=t("./firebase-client"),s=r(l),d=t("./click-report"),f=r(d);(0,u["default"])(document).foundation();var h=new s["default"];h.requireAuth();var m=new o["default"](h.firebase),g=new f["default"](m);(0,u["default"])(document).ready(function(){g.loadCharts(function(){h.requireAuth().then(function(){g.draw()})}),jQuery("#a_button").click(function(){h.saveButtonClicked("a",m)}),jQuery("#b_button").click(function(){h.saveButtonClicked("b",m)}),jQuery("#c_button").click(function(){h.saveButtonClicked("c",m)}),jQuery("#d_button").click(function(){h.saveButtonClicked("d",m)}),(0,u["default"])(window).resize(function(){g.draw()}),h.onDataSaved(function(){g.draw()})})}),require.register("click-report.js",function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),a=function(){function e(t){r(this,e),this.reporting=t}return n(e,[{key:"loadCharts",value:function(e){google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback(e)}},{key:"draw",value:function(){this.drawTotalClicked(),this.drawTotalUsers(),this.drawLastClicked(),this.drawPieChart("pie_chart_div"),this.drawLineChart("line_chart_div","minute"),this.drawLineChart("line_chart_div2","hour"),this.drawLineChart("line_chart_div3","day"),this.drawLineChart("line_chart_div4","week")}},{key:"drawLineChart",value:function(e,t){var i=void 0,r=new Date,n=new Date;switch(r.setMilliseconds(0),r.setSeconds(0),r.setMinutes(0),t){case"minute":i="Clicked this Hour",n.setTime(r.getTime()),n.setHours(r.getHours()+1);break;case"hour":i="Clicked Today",r.setHours(0),n.setTime(r.getTime()),n.setDate(r.getDate()+1);break;case"day":i="Clicked this Month",r.setHours(0),r.setDate(1),n.setTime(r.getTime()),n.setMonth(r.getMonth()+1);break;case"week":i="Clicked this Year",r.setHours(0),r.setDate(1),r.setMonth(1),n.setTime(r.getTime()),n.setFullYear(r.getFullYear()+1)}var a=this.reporting.filter().sum("aclicked").during(t).range(r.getTime(),n.getTime()).values(!0),u=this.reporting.filter().sum("bclicked").during(t).range(r.getTime(),n.getTime()).values(!0),c=this.reporting.filter().sum("cclicked").during(t).range(r.getTime(),n.getTime()).values(!0),o=this.reporting.filter().sum("dclicked").during(t).range(r.getTime(),n.getTime()).values(!0);Promise.all([a,u,c,o]).then(function(t){for(var r=jQuery("#"+e),n=[["Time","A","B","C","D"]],a=0;a<t[0].length;a++)n.push([new Date(t[0][a].timestamp),t[0][a].value,t[1][a].value,t[2][a].value,t[3][a].value]);var u=new google.visualization.arrayToDataTable(n),c={title:i,width:r.width(),height:400,legend:{position:"bottom"}},o=new google.visualization.LineChart(r[0]);o.draw(u,c)})}},{key:"drawPieChart",value:function(e){var t=this.reporting.filter().sum("aclicked").value(),i=this.reporting.filter().sum("bclicked").value(),r=this.reporting.filter().sum("cclicked").value(),n=this.reporting.filter().sum("dclicked").value();Promise.all([t,i,r,n]).then(function(t){var i=jQuery("#"+e),r=new google.visualization.arrayToDataTable([["Button","Times Clicked"],["A",t[0]],["B",t[1]],["C",t[2]],["D",t[3]]]),n={width:i.width(),height:400,legend:{position:"bottom"}},a=new google.visualization.PieChart(i[0]);a.draw(r,n)})}},{key:"drawTotalClicked",value:function(){var e=this.reporting.filter().sum("anyclicked").select(1);e.then(function(e){jQuery("#total_clicked_count").text(e[0]||0)})["catch"](function(e){console.log(e)})}},{key:"drawTotalUsers",value:function(){var e=this.reporting.filter("users").sum("anyclicked").count();e.then(function(e){jQuery("#total_users_count").text(e||0)})["catch"](function(e){console.log(e)})}},{key:"drawLastClicked",value:function(){var e=this.reporting.filter().last("timestamp").select(1);e.then(function(e){if(0===e.length)jQuery("#last_clicked_time").text("never");else{var t=new Date;t.setTime(e[0]),jQuery("#last_clicked_time").text(t.toLocaleString())}})["catch"](function(e){console.log(e)})}}]),e}();i.exports=a}),require.register("firebase-client.js",function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),u=t("firebase"),c=r(u),o=function(){function e(){n(this,e),this.firebase=c["default"].initializeApp({apiKey:"AIzaSyDRf-RxCxWRecif5l-q2ZMEQ595ohApojs",authDomain:"fir-reporting.firebaseapp.com",databaseURL:"https://fir-reporting.firebaseio.com",storageBucket:"",messagingSenderId:"275159253276"}),this.dataRef=this.firebase.database().ref("data")}return a(e,[{key:"saveButtonClicked",value:function(e,t){var i=this,r={uid:this.firebase.auth().currentUser.uid,timestamp:c["default"].database.ServerValue.TIMESTAMP,anyclicked:1};r[e+"clicked"]=1,t.saveMetrics(r).then(function(){i.dataRef.push().set(r)})}},{key:"onDataSaved",value:function(e){var t=this.dataRef.orderByChild("timestamp");t.limitToLast(1).once("value",function(i){var r=i.val(),n=r?Object.keys(r):null;n&&n.length>0&&(t=t.startAt(r[n[0]].timestamp+1)),t.on("child_added",e)})}},{key:"waitForAuth",value:function(){var e=this.firebase.auth(),t=new Promise(function(t){var i=function(){r(),t()},r=e.onAuthStateChanged(i)});return t}},{key:"requireAuth",value:function(){var e=this,t=new Promise(function(t,i){e.waitForAuth().then(function(){e.firebase.auth().currentUser?t():e.firebase.auth().signInAnonymously().then(t)["catch"](i)})["catch"](i)});return t}}]),e}();i.exports=o}),require.register("reporting-service.js",function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=t("@greenhousegames/firebase-reporting"),o=r(c),l=function(e){function t(e){n(this,t);var i=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{firebase:e.database().ref("reporting")}));return i.addFilter("users",["uid"]),i.addMetric("timestamp",["first","last"]),i.addMetric("anyclicked",["sum"]),i.enableRetainer("minute","anyclicked",["sum"]),i.enableRetainer("hour","anyclicked",["sum"]),i.enableRetainer("day","anyclicked",["sum"]),i.enableRetainer("week","anyclicked",["sum"]),i.addMetric("aclicked",["sum"]),i.enableRetainer("minute","aclicked",["sum"]),i.enableRetainer("hour","aclicked",["sum"]),i.enableRetainer("day","aclicked",["sum"]),i.enableRetainer("week","aclicked",["sum"]),i.addMetric("bclicked",["sum"]),i.enableRetainer("minute","bclicked",["sum"]),i.enableRetainer("hour","bclicked",["sum"]),i.enableRetainer("day","bclicked",["sum"]),i.enableRetainer("week","bclicked",["sum"]),i.addMetric("cclicked",["sum"]),i.enableRetainer("minute","cclicked",["sum"]),i.enableRetainer("hour","cclicked",["sum"]),i.enableRetainer("day","cclicked",["sum"]),i.enableRetainer("week","cclicked",["sum"]),i.addMetric("dclicked",["sum"]),i.enableRetainer("minute","dclicked",["sum"]),i.enableRetainer("hour","dclicked",["sum"]),i.enableRetainer("day","dclicked",["sum"]),i.enableRetainer("week","dclicked",["sum"]),i}return u(t,e),t}(o["default"]);i.exports=l}),require.register("___globals___",function(e,t,i){window.jQuery=t("jquery"),window.$=t("jquery")})}(),require("___globals___");