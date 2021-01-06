(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4252fe1a"],{"230c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container-article"},[r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("my-bread",[e._v("内容管理")])],1),r("el-form",{attrs:{"label-width":"80px"}},[r("el-form-item",{attrs:{label:"状态:"}},[r("el-radio-group",{model:{value:e.reqParams.status,callback:function(t){e.$set(e.reqParams,"status",t)},expression:"reqParams.status"}},[r("el-radio",{attrs:{label:null}},[e._v("全部")]),r("el-radio",{attrs:{label:0}},[e._v("草稿")]),r("el-radio",{attrs:{label:1}},[e._v("待审核")]),r("el-radio",{attrs:{label:2}},[e._v("审核通过")]),r("el-radio",{attrs:{label:3}},[e._v("审核失败")]),r("el-radio",{attrs:{label:4}},[e._v("已删除")])],1)],1),r("el-form-item",{attrs:{label:"频道:"}},[r("my-channel",{model:{value:e.reqParams.channel_id,callback:function(t){e.$set(e.reqParams,"channel_id",t)},expression:"reqParams.channel_id"}})],1),r("el-form-item",{attrs:{label:"日期:"}},[r("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.changeDate},model:{value:e.dateArr,callback:function(t){e.dateArr=t},expression:"dateArr"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("筛选")])],1)],1)],1),r("el-card",{staticStyle:{"margin-top":"20px"}},[r("div",{attrs:{slot:"header"},slot:"header"},[e._v("根据筛选条件共查询到 "+e._s(e.total)+" 条结果：")]),r("el-table",{attrs:{data:e.articles}},[r("el-table-column",{attrs:{label:"封面"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("el-image",{staticStyle:{width:"180px",height:"120px"},attrs:{src:e.row.cover.images[0]}},[r("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[r("img",{staticStyle:{width:"180px",height:"120px"},attrs:{src:a("e77c"),alt:""}})])])]}}])}),r("el-table-column",{attrs:{label:"标题",prop:"title"}}),r("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.status?r("el-tag",{attrs:{type:"info"}},[e._v("草稿")]):e._e(),1===t.row.status?r("el-tag",[e._v("待审核")]):e._e(),2===t.row.status?r("el-tag",{attrs:{type:"success"}},[e._v("审核通过")]):e._e(),3===t.row.status?r("el-tag",{attrs:{type:"warning"}},[e._v("审核失败")]):e._e(),4===t.row.status?r("el-tag",{attrs:{type:"danger"}},[e._v("已删除")]):e._e()]}}])}),r("el-table-column",{attrs:{label:"发布时间",prop:"pubdate"}}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",plain:""},on:{click:function(a){return e.toEdit(t.row.id)}}}),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",plain:""},on:{click:function(a){return e.toDelete(t.row.id)}}})]}}])})],1),r("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{background:"",layout:"prev, pager, next","current-page":e.reqParams.page,"page-size":e.reqParams.per_page,total:e.total},on:{"current-change":e.changePager}})],1)],1)},l=[],n=(a("96cf"),a("1da1")),s={name:"page-article",data:function(){return{reqParams:{status:null,channel_id:null,begin_pubdate:null,end_pubdate:null,page:1,per_page:20},dateArr:[],articles:[],channelOptions:[],total:0}},created:function(){this.getArticles()},methods:{getArticles:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("articles",{params:e.reqParams});case 2:a=t.sent,e.articles=a.data.data.results,e.total=a.data.data.total_count;case 5:case"end":return t.stop()}}),t)})))()},changePager:function(e){this.reqParams.page=e,this.getArticles()},search:function(){this.reqParams.page=1,this.getArticles()},changeDate:function(e){e?(this.reqParams.begin_pubdate=e[0],this.reqParams.end_pubdate=e[1]):(this.reqParams.begin_pubdate=null,this.reqParams.end_pubdate=null)},toEdit:function(e){this.$router.push({path:"/publish",query:{id:e}})},toDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文章, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,t.$http.delete("articles/".concat(e));case 3:t.$message({type:"success",message:"删除成功!"}),t.getArticles(),a.next=10;break;case 7:a.prev=7,a.t0=a["catch"](0),t.$message({type:"info",message:"删除失败"});case 10:case"end":return a.stop()}}),a,null,[[0,7]])})))).catch((function(){}))}}},i=s,c=a("2877"),o=Object(c["a"])(i,r,l,!1,null,"e1dd4560",null);t["default"]=o.exports},e77c:function(e,t,a){e.exports=a.p+"img/error.3f7b1f94.gif"}}]);
//# sourceMappingURL=chunk-4252fe1a.94e23e9c.js.map