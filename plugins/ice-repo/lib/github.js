// This file contains the HTTP Req Abs, Repo API and getRepo
// portions of Top Level API from github.com/michael/github.js

// ORIGINAL LIB:
// Github.js 0.7.0
// (c) 2012 Michael Aufreiter, Development Seed
// Github.js is freely distributable under the MIT license.
// For all details and documentation:
// http://substance.io/michael/github

(function(){var e,t="https://api.github.com";e=window.Github=function(n){function r(e,r,i,s,o){function u(){var e=t+r;return e+(/\?/.test(e)?"&":"?")+(new Date).getTime()}var a=new XMLHttpRequest;o||(a.dataType="json"),a.open(e,u()),a.onreadystatechange=function(){this.readyState==4&&(this.status>=200&&this.status<300||this.status===304?s(null,o?this.responseText:this.responseText?JSON.parse(this.responseText):!0):s({request:this,error:this.status}))},a.setRequestHeader("Accept","application/vnd.github.raw"),a.setRequestHeader("Content-Type","application/json;charset=UTF-8"),(n.auth=="oauth"&&n.token||n.auth=="basic"&&n.username&&n.password)&&a.setRequestHeader("Authorization",n.auth=="oauth"?"token "+n.token:"Basic "+Base64.encode(n.username+":"+n.password)),i?a.send(JSON.stringify(i)):a.send()}e.Repository=function(e){function u(e,t){if(e===o.branch&&o.sha)return t(null,o.sha);i.getRef("heads/"+e,function(n,r){o.branch=e,o.sha=r,t(n,r)})}var t=e.name,n=e.user,i=this,s="/repos/"+n+"/"+t,o={branch:null,sha:null};this.getRef=function(e,t){r("GET",s+"/git/refs/"+e,null,function(e,n){if(e)return t(e);t(null,n.object.sha)})},this.createRef=function(e,t){r("POST",s+"/git/refs",e,t)},this.deleteRef=function(t,n){r("DELETE",s+"/git/refs/"+t,e,n)},this.listBranches=function(e){r("GET",s+"/git/refs/heads",null,function(t,n){if(t)return e(t);e(null,_.map(n,function(e){return _.last(e.ref.split("/"))}))})},this.getBlob=function(e,t){r("GET",s+"/git/blobs/"+e,null,t,"raw")},this.getSha=function(e,t,n){if(t==="")return i.getRef("heads/"+e,n);i.getTree(e+"?recursive=true",function(e,r){var i=_.select(r,function(e){return e.path===t})[0];n(null,i?i.sha:null)})},this.getTree=function(e,t){r("GET",s+"/git/trees/"+e,null,function(e,n){if(e)return t(e);t(null,n.tree)})},this.postBlob=function(e,t){typeof e=="string"&&(e={content:e,encoding:"utf-8"}),r("POST",s+"/git/blobs",e,function(e,n){if(e)return t(e);t(null,n.sha)})},this.updateTree=function(e,t,n,i){var o={base_tree:e,tree:[{path:t,mode:"100644",type:"blob",sha:n}]};r("POST",s+"/git/trees",o,function(e,t){if(e)return i(e);i(null,t.sha)})},this.postTree=function(e,t){r("POST",s+"/git/trees",{tree:e},function(e,n){if(e)return t(e);t(null,n.sha)})},this.commit=function(t,n,i,u){var a={message:i,author:{name:e.username},parents:[t],tree:n};r("POST",s+"/git/commits",a,function(e,t){o.sha=t.sha;if(e)return u(e);u(null,t.sha)})},this.updateHead=function(e,t,n){r("PATCH",s+"/git/refs/heads/"+e,{sha:t},function(e,t){n(e)})},this.show=function(e){r("GET",s,null,e)},this.contents=function(e,t){r("GET",s+"/contents",{path:e},t)},this.fork=function(e){r("POST",s+"/forks",null,e)},this.createPullRequest=function(e,t){r("POST",s+"/pulls",e,t)},this.read=function(e,t,n){i.getSha(e,t,function(e,t){if(!t)return n("not found",null);i.getBlob(t,function(e,r){n(e,r,t)})})},this.remove=function(e,t,n){u(e,function(r,s){i.getTree(s+"?recursive=true",function(r,o){var u=_.reject(o,function(e){return e.path===t});_.each(u,function(e){e.type==="tree"&&delete e.sha}),i.postTree(u,function(r,o){i.commit(s,o,"Deleted "+t,function(t,r){i.updateHead(e,r,function(e){n(e)})})})})})},this.move=function(e,t,n,r){u(e,function(s,o){i.getTree(o+"?recursive=true",function(s,u){_.each(u,function(e){e.path===t&&(e.path=n),e.type==="tree"&&delete e.sha}),i.postTree(u,function(n,s){i.commit(o,s,"Deleted "+t,function(t,n){i.updateHead(e,n,function(e){r(e)})})})})})},this.write=function(e,t,n,r,s){u(e,function(o,u){if(o)return s(o);i.postBlob(n,function(n,o){if(n)return s(n);i.updateTree(u,t,o,function(t,n){if(t)return s(t);i.commit(u,n,r,function(t,n){if(t)return s(t);i.updateHead(e,n,s)})})})})}},e.Gist=function(e){var t=e.id,n=this,i="/gists/"+t;this.read=function(e){r("GET",i,null,function(t,n){e(t,n)})},this.delete=function(e){r("DELETE",i,null,function(t,n){e(t,n)})},this.fork=function(e){r("POST",i+"/fork",null,function(t,n){e(t,n)})},this.update=function(e,t){r("PATCH",i,e,function(e,n){t(e,n)})}},this.getRepo=function(t,n){return new e.Repository({user:t,name:n})}}}).call(this)