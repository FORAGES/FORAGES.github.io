!function e(t,r,n){function o(i,a){if(!r[i]){if(!t[i]){var u="function"==typeof require&&require
if(!a&&u)return u(i,!0)
if(s)return s(i,!0)
throw new Error("Cannot find module '"+i+"'")}var c=r[i]={exports:{}}
t[i][0].call(c.exports,function(e){var r=t[i][1][e]
return o(r?r:e)},c,c.exports,e,t,r,n)}return r[i].exports}for(var s="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i])
return o}({1:[function(e,t,r){"use strict"
function n(e){return function(t,r){return t&&"unknown_error"===t.name&&(t.message=(t.message||"")+" Unknown error!  Did you remember to enable CORS?"),e(t,r)}}function o(e){this.status=400,this.name="authentication_error",this.message=e,this.error=!0
try{Error.captureStackTrace(this,o)}catch(t){}}var s=e("./utils")
r.signup=s.toPromise(function(e,t,r,i){var a=this
if("undefined"==typeof i&&(i="undefined"==typeof r?"undefined"==typeof t?e:t:r,r={}),-1===["http","https"].indexOf(a.type()))return i(new o('This plugin only works for the http/https adapter. So you should use new PouchDB("http://mysite.com:5984/mydb") instead.'))
if(!e)return i(new o("You must provide a username"))
if(!t)return i(new o("You must provide a password"))
var u="org.couchdb.user:"+e,c={name:e,password:t,roles:r.roles||[],type:"user",_id:u},f=["name","password","roles","type","salt","metadata"]
if(r.metadata){for(var l in r.metadata)if(r.hasOwnProperty(l)&&(-1!==f.indexOf(l)||l.startsWith("_")))return i(new o('cannot use reserved word in metadata: "'+l+'"'))
c=s.extend(!0,c,r.metadata)}var d=s.getUsersUrl(a)+"/"+encodeURIComponent(u),p=s.extend(!0,{method:"PUT",url:d,body:c},r.ajax||{})
s.ajax(p,n(i))}),r.signUp=r.signup,r.login=s.toPromise(function(e,t,r,i){var a=this
if("undefined"==typeof i&&(i=r,r={}),-1===["http","https"].indexOf(a.type()))return i(new o("this plugin only works for the http/https adapter"))
if(!e)return i(new o("you must provide a username"))
if(!t)return i(new o("you must provide a password"))
var u=s.extend(!0,{method:"POST",url:s.getSessionUrl(a),body:{name:e,password:t}},r.ajax||{})
s.ajax(u,n(i))}),r.logIn=r.login,r.logout=s.toPromise(function(e,t){var r=this
"undefined"==typeof t&&(t=e,e={})
var o=s.extend(!0,{method:"DELETE",url:s.getSessionUrl(r)},e.ajax||{})
s.ajax(o,n(t))}),r.logOut=r.logout,r.getSession=s.toPromise(function(e,t){var r=this
"undefined"==typeof t&&(t=e,e={})
var o=s.getSessionUrl(r),i=s.extend(!0,{method:"GET",url:o},e.ajax||{})
s.ajax(i,n(t))}),r.getUser=s.toPromise(function(e,t,r){var i=this
if("undefined"==typeof r&&(r="undefined"==typeof t?e:t,t={}),!e)return r(new o("you must provide a username"))
var a=s.getUsersUrl(i),u=s.extend(!0,{method:"GET",url:a+"/"+encodeURIComponent("org.couchdb.user:"+e)},t.ajax||{})
s.ajax(u,n(r))}),r.changePassword=s.toPromise(function(e,t,r,i){var a=this
return"undefined"==typeof i&&(i="undefined"==typeof r?"undefined"==typeof t?e:t:r,r={}),-1===["http","https"].indexOf(a.type())?i(new o('This plugin only works for the http/https adapter. So you should use new PouchDB("http://mysite.com:5984/mydb") instead.')):e?t?a.getUser(e,r,function(e,o){if(e)return i(e)
o.password=t
var u=s.getUsersUrl(a)+"/"+encodeURIComponent(o._id),c=s.extend(!0,{method:"PUT",url:u,body:o},r.ajax||{})
s.ajax(c,n(i))}):i(new o("You must provide a password")):i(new o("You must provide a username"))}),s.inherits(o,Error),"undefined"!=typeof window&&window.PouchDB&&window.PouchDB.plugin(r)},{"./utils":2}],2:[function(e,t,r){(function(t){"use strict"
function n(e){return e.getUrl().replace(/\/[^\/]+\/?$/,"")}var o=e("pouchdb/extras/promise")
r.getUsersUrl=function(e){return n(e)+"/_users"},r.getSessionUrl=function(e){return n(e)+"/_session"},r.once=function(e){var t=!1
return r.getArguments(function(r){if(t)throw console.trace(),new Error("once called  more than once")
t=!0,e.apply(this,r)})},r.getArguments=function(e){return function(){for(var t=arguments.length,r=new Array(t),n=-1;++n<t;)r[n]=arguments[n]
return e.call(this,r)}},r.toPromise=function(e){return r.getArguments(function(n){var s,i=this,a="function"==typeof n[n.length-1]?n.pop():!1
a&&(s=function(e,r){t.nextTick(function(){a(e,r)})})
var u=new o(function(t,o){try{var s=r.once(function(e,r){e?o(e):t(r)})
n.push(s),e.apply(i,n)}catch(a){o(a)}})
return s&&u.then(function(e){s(null,e)},s),u.cancel=function(){return this},u})},r.inherits=e("inherits"),r.extend=e("pouchdb-extend"),r.ajax=e("pouchdb/extras/ajax"),r.clone=function(e){return r.extend(!0,{},e)},r.uuid=e("./uuid"),r.Promise=o}).call(this,e("/Users/nolan/workspace/pouchdb-authentication/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))},{"./uuid":3,"/Users/nolan/workspace/pouchdb-authentication/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5,inherits:6,"pouchdb-extend":7,"pouchdb/extras/ajax":8,"pouchdb/extras/promise":9}],3:[function(e,t,r){"use strict"
function n(e){return 0|Math.random()*e}function o(e,t){t=t||s.length
var r="",o=-1
if(e){for(;++o<e;)r+=s[n(t)]
return r}for(;++o<36;)switch(o){case 8:case 13:case 18:case 23:r+="-"
break
case 19:r+=s[3&n(16)|8]
break
default:r+=s[n(16)]}return r}var s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
t.exports=o},{}],4:[function(e,t,r){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function s(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!s(e)||0>e||isNaN(e))throw TypeError("n must be a positive number")
return this._maxListeners=e,this},n.prototype.emit=function(e){var t,r,n,s,u,c
if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t
throw TypeError('Uncaught, unspecified "error" event.')}if(r=this._events[e],a(r))return!1
if(o(r))switch(arguments.length){case 1:r.call(this)
break
case 2:r.call(this,arguments[1])
break
case 3:r.call(this,arguments[1],arguments[2])
break
default:for(n=arguments.length,s=new Array(n-1),u=1;n>u;u++)s[u-1]=arguments[u]
r.apply(this,s)}else if(i(r)){for(n=arguments.length,s=new Array(n-1),u=1;n>u;u++)s[u-1]=arguments[u]
for(c=r.slice(),n=c.length,u=0;n>u;u++)c[u].apply(this,s)}return!0},n.prototype.addListener=function(e,t){var r
if(!o(t))throw TypeError("listener must be a function")
if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned){var r
r=a(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,r&&r>0&&this._events[e].length>r&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function r(){this.removeListener(e,r),n||(n=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function")
var n=!1
return r.listener=t,this.on(e,r),this},n.prototype.removeListener=function(e,t){var r,n,s,a
if(!o(t))throw TypeError("listener must be a function")
if(!this._events||!this._events[e])return this
if(r=this._events[e],s=r.length,n=-1,r===t||o(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t)
else if(i(r)){for(a=s;a-->0;)if(r[a]===t||r[a].listener&&r[a].listener===t){n=a
break}if(0>n)return this
1===r.length?(r.length=0,delete this._events[e]):r.splice(n,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,r
if(!this._events)return this
if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this
if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t)
return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],o(r))this.removeListener(e,r)
else for(;r.length;)this.removeListener(e,r[r.length-1])
return delete this._events[e],this},n.prototype.listeners=function(e){var t
return t=this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.listenerCount=function(e,t){var r
return r=e._events&&e._events[t]?o(e._events[t])?1:e._events[t].length:0}},{}],5:[function(e,t,r){function n(){}var o=t.exports={}
o.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener
if(e)return function(e){return window.setImmediate(e)}
if(t){var r=[]
return window.addEventListener("message",function(e){var t=e.source
if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),r.length>0)){var n=r.shift()
n()}},!0),function(e){r.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),o.title="browser",o.browser=!0,o.env={},o.argv=[],o.on=n,o.once=n,o.off=n,o.emit=n,o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")}},{}],6:[function(e,t,r){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t
var r=function(){}
r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},{}],7:[function(e,t,r){"use strict"
function n(e){return null===e?String(e):"object"==typeof e||"function"==typeof e?c[p.call(e)]||"object":typeof e}function o(e){return null!==e&&e===e.window}function s(e){if(!e||"object"!==n(e)||e.nodeType||o(e))return!1
try{if(e.constructor&&!h.call(e,"constructor")&&!h.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}var r
for(r in e);return void 0===r||h.call(e,r)}function i(e){return"function"===n(e)}function a(){for(var e=[],t=-1,r=arguments.length,n=new Array(r);++t<r;)n[t]=arguments[t]
var o={}
e.push({args:n,result:{container:o,key:"key"}})
for(var s;s=e.pop();)u(e,s.args,s.result)
return o.key}function u(e,t,r){var n,o,a,u,c,f,l,d=t[0]||{},p=1,h=t.length,m=!1,v=/\d+/
for("boolean"==typeof d&&(m=d,d=t[1]||{},p=2),"object"==typeof d||i(d)||(d={}),h===p&&(d=this,--p);h>p;p++)if(null!=(n=t[p])){l=y(n)
for(o in n)if(!(o in Object.prototype)){if(l&&!v.test(o))continue
if(a=d[o],u=n[o],d===u)continue
m&&u&&(s(u)||(c=y(u)))?(c?(c=!1,f=a&&y(a)?a:[]):f=a&&s(a)?a:{},e.push({args:[m,f,u],result:{container:d,key:o}})):void 0!==u&&(y(n)&&i(u)||(d[o]=u))}}r.container[r.key]=d}for(var c={},f=["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],l=0;l<f.length;l++){var d=f[l]
c["[object "+d+"]"]=d.toLowerCase()}var p=c.toString,h=c.hasOwnProperty,y=Array.isArray||function(e){return"array"===n(e)}
t.exports=a},{}],8:[function(e,t,r){"use strict"
t.exports=e("../lib/deps/ajax/ajaxCore")},{"../lib/deps/ajax/ajaxCore":11}],9:[function(e,t,r){"use strict"
t.exports=e("../lib/deps/promise")},{"../lib/deps/promise":34}],10:[function(e,t,r){"use strict"
function n(e){a()?chrome.storage.onChanged.addListener(function(t){null!=t.db_name&&e.emit(t.dbName.newValue)}):u()&&("undefined"!=typeof addEventListener?addEventListener("storage",function(t){e.emit(t.key)}):window.attachEvent("storage",function(t){e.emit(t.key)}))}function o(){s.call(this),this._listeners={},n(this)}var s=e("events").EventEmitter,i=e("inherits"),a=e("./deps/env/isChromeApp"),u=e("./deps/env/hasLocalStorage"),c=e("./deps/pick")
i(o,s),o.prototype.addListener=function(e,t,r,n){function o(){if(s._listeners[t]){if(i)return void(i="waiting")
i=!0
var e=c(n,["style","include_docs","attachments","conflicts","filter","doc_ids","view","since","query_params","binary"])
r.changes(e).on("change",function(e){e.seq>n.since&&!n.cancelled&&(n.since=e.seq,n.onChange(e))}).on("complete",function(){"waiting"===i&&setTimeout(function(){o()},0),i=!1}).on("error",function(){i=!1})}}if(!this._listeners[t]){var s=this,i=!1
this._listeners[t]=o,this.on(e,o)}},o.prototype.removeListener=function(e,t){t in this._listeners&&s.prototype.removeListener.call(this,e,this._listeners[t])},o.prototype.notifyLocalWindows=function(e){a()?chrome.storage.local.set({dbName:e}):u()&&(localStorage[e]="a"===localStorage[e]?"b":"a")},o.prototype.notify=function(e){this.emit(e),this.notifyLocalWindows(e)},t.exports=o},{"./deps/env/hasLocalStorage":26,"./deps/env/isChromeApp":27,"./deps/pick":33,events:4,inherits:6}],11:[function(e,t,r){"use strict"
function n(e,t){function r(t,r,n){if(e.binary||e.json||!e.processData||"string"==typeof t){if(!e.binary&&e.json&&"string"==typeof t)try{t=JSON.parse(t)}catch(o){return n(o)}}else t=JSON.stringify(t)
Array.isArray(t)&&(t=t.map(function(e){return e.error||e.missing?s.generateErrorFromResponse(e):e})),e.binary&&a(t,r),n(null,t,r)}function n(e,t){var r,n
if(e.code&&e.status){var o=new Error(e.message||e.code)
return o.status=e.status,t(o)}try{r=JSON.parse(e.responseText),n=s.generateErrorFromResponse(r)}catch(i){n=s.generateErrorFromResponse(e)}t(n)}e=i.clone(e)
var f={method:"GET",headers:{},json:!0,processData:!0,timeout:1e4,cache:!1}
return e=i.extend(f,e),e.json&&(e.binary||(e.headers.Accept="application/json"),e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json"),e.binary&&(e.encoding=null,e.json=!1),e.processData||(e.json=!1),o(e,function(o,i,a){if(o){if(i){var f="undefined"!=typeof document&&document.location.origin,l=f&&0===e.url.indexOf(f)
l&&0===i.statusCode&&c(),o.status=i.statusCode}else o.status=400
return n(o,t)}var d,p=i.headers&&i.headers["content-type"],h=a||u()
if(!e.binary&&(e.json||!e.processData)&&"object"!=typeof h&&(/json/.test(p)||/^[\s]*\{/.test(h)&&/\}[\s]*$/.test(h)))try{h=JSON.parse(h.toString())}catch(y){}i.statusCode>=200&&i.statusCode<300?r(h,i,t):(d=s.generateErrorFromResponse(h),d.status=i.statusCode,t(d))})}var o=e("request"),s=e("./../errors"),i=e("../../utils"),a=e("./applyTypeToBuffer"),u=e("./defaultBody"),c=e("./explainCors")
t.exports=n},{"../../utils":37,"./../errors":28,"./applyTypeToBuffer":12,"./defaultBody":13,"./explainCors":15,request:17}],12:[function(e,t,r){"use strict"
t.exports=function(){}},{}],13:[function(e,t,r){"use strict"
t.exports=function(){return""}},{}],14:[function(e,t,r){(function(e){"use strict"
t.exports=function(t){"console"in e&&"info"in console&&console.info("The above 404 is totally normal. "+t)}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,r){(function(e){"use strict"
t.exports=function(){"console"in e&&"warn"in console&&console.warn("PouchDB: the remote database may not have CORS enabled.If not please enable CORS: http://pouchdb.com/errors.html#no_access_control_allow_origin_header")}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],16:[function(e,t,r){"use strict"
var n=e("./ajaxCore")
t.exports=function(e,t){if(("POST"===e.method||"GET"===e.method)&&!e.cache){var r=-1!==e.url.indexOf("?")
e.url+=(r?"&":"?")+"_nonce="+Date.now()}return n(e,t)}},{"./ajaxCore":11}],17:[function(e,t,r){"use strict"
function n(){for(var e={},t=new u.Promise(function(t,r){e.resolve=t,e.reject=r}),r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n]
return e.promise=t,u.Promise.resolve().then(function(){return fetch.apply(null,r)}).then(function(t){e.resolve(t)})["catch"](function(t){e.reject(t)}),e}function o(e,t){var r,o,s,i=new Headers,a={method:e.method,credentials:"include",headers:i}
return e.json&&(i.set("Accept","application/json"),i.set("Content-Type",e.headers["Content-Type"]||"application/json")),e.body&&e.body instanceof Blob?c(e.body,function(e){a.body=e}):e.body&&e.processData&&"string"!=typeof e.body?a.body=JSON.stringify(e.body):"body"in e?a.body=e.body:a.body=null,Object.keys(e.headers).forEach(function(t){e.headers.hasOwnProperty(t)&&i.set(t,e.headers[t])}),r=n(e.url,a),e.timeout>0&&(o=setTimeout(function(){r.reject(new Error("Load timeout for resource: "+e.url))},e.timeout)),r.promise.then(function(t){return s={statusCode:t.status},e.timeout>0&&clearTimeout(o),s.statusCode>=200&&s.statusCode<300?e.binary?t.blob():t.text():t.json()}).then(function(e){s.statusCode>=200&&s.statusCode<300?t(null,s,e):t(e,s)})["catch"](function(e){t(e,s)}),{abort:r.reject}}function s(e,t){var r,n,o,s=function(){r.abort()}
r=e.xhr?new e.xhr:new XMLHttpRequest,r.open(e.method,e.url),r.withCredentials=!0,"GET"===e.method?delete e.headers["Content-Type"]:e.json&&(e.headers.Accept="application/json",e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.body&&e.processData&&"string"!=typeof e.body&&(e.body=JSON.stringify(e.body))),e.binary&&(r.responseType="arraybuffer"),"body"in e||(e.body=null)
for(var i in e.headers)e.headers.hasOwnProperty(i)&&r.setRequestHeader(i,e.headers[i])
return e.timeout>0&&(n=setTimeout(s,e.timeout),r.onprogress=function(){clearTimeout(n),n=setTimeout(s,e.timeout)},"undefined"==typeof o&&(o=-1!==Object.keys(r).indexOf("upload")&&"undefined"!=typeof r.upload),o&&(r.upload.onprogress=r.onprogress)),r.onreadystatechange=function(){if(4===r.readyState){var n={statusCode:r.status}
if(r.status>=200&&r.status<300){var o
o=e.binary?a([r.response||""],{type:r.getResponseHeader("Content-Type")}):r.responseText,t(null,n,o)}else{var s={}
try{s=JSON.parse(r.response)}catch(i){}t(s,n)}}},e.body&&e.body instanceof Blob?c(e.body,function(e){r.send(e)}):r.send(e.body),{abort:s}}function i(){try{return new XMLHttpRequest,!0}catch(e){return!1}}var a=e("./../binary/blob.js"),u=e("../../utils"),c=e("./../binary/readAsArrayBuffer"),f=i()
t.exports=function(e,t){return f||e.xhr?s(e,t):o(e,t)}},{"../../utils":37,"./../binary/blob.js":21,"./../binary/readAsArrayBuffer":23}],18:[function(e,t,r){"use strict"
var n=e("./buffer")
"function"==typeof atob?r.atob=function(e){return atob(e)}:r.atob=function(e){var t=new n(e,"base64")
if(t.toString("base64")!==e)throw"Cannot base64 encode full string"
return t.toString("binary")},"function"==typeof btoa?r.btoa=function(e){return btoa(e)}:r.btoa=function(e){return new n(e,"binary").toString("base64")}},{"./buffer":22}],19:[function(e,t,r){"use strict"
t.exports=function(e){for(var t=e.length,r=new ArrayBuffer(t),n=new Uint8Array(r),o=0;t>o;o++)n[o]=e.charCodeAt(o)
return r}},{}],20:[function(e,t,r){"use strict"
var n=e("./blob"),o=e("./binaryStringToArrayBuffer")
t.exports=function(e,t){return n([o(e)],{type:t})}},{"./binaryStringToArrayBuffer":19,"./blob":21}],21:[function(e,t,r){"use strict"
function n(e,t){e=e||[],t=t||{}
try{return new Blob(e,t)}catch(r){if("TypeError"!==r.name)throw r
for(var n="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,o=new n,s=0;s<e.length;s+=1)o.append(e[s])
return o.getBlob(t.type)}}t.exports=n},{}],22:[function(e,t,r){t.exports={}},{}],23:[function(e,t,r){"use strict"
t.exports=function(e,t){var r=new FileReader
r.onloadend=function(e){var r=e.target.result||new ArrayBuffer(0)
t(r)},r.readAsArrayBuffer(e)}},{}],24:[function(e,t,r){"use strict"
function n(e){if("function"!=typeof e.hasOwnProperty)return!1
var t
for(t in e);return void 0===t||e.hasOwnProperty(t)}t.exports=function o(e){var t,r,s
if(!e||"object"!=typeof e)return e
if(Array.isArray(e)){for(t=[],r=0,s=e.length;s>r;r++)t[r]=o(e[r])
return t}if(e instanceof Date)return e.toISOString()
if(!n(e))return e
t={}
for(r in e)if(e.hasOwnProperty(r)){var i=o(e[r])
"undefined"!=typeof i&&(t[r]=i)}return t}},{}],25:[function(e,t,r){"use strict"
function n(e){return e.reduce(function(e,t){return e[t]=!0,e},{})}function o(e){if(!/^\d+\-./.test(e))return i.error(i.INVALID_REV)
var t=e.indexOf("-"),r=e.substring(0,t),n=e.substring(t+1)
return{prefix:parseInt(r,10),id:n}}function s(e,t){for(var r=e.start-e.ids.length+1,n=e.ids,o=[n[0],t,[]],s=1,i=n.length;i>s;s++)o=[n[s],{status:"missing"},[o]]
return[{pos:r,ids:o}]}var i=e("./../errors"),a=e("./../uuid"),u=n(["_id","_rev","_attachments","_deleted","_revisions","_revs_info","_conflicts","_deleted_conflicts","_local_seq","_rev_tree","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats","_removed"]),c=n(["_attachments","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"])
r.invalidIdError=function(e){var t
if(e?"string"!=typeof e?t=i.error(i.INVALID_ID):/^_/.test(e)&&!/^_(design|local)/.test(e)&&(t=i.error(i.RESERVED_ID)):t=i.error(i.MISSING_ID),t)throw t},r.parseDoc=function(e,t){var n,f,l,d={status:"available"}
if(e._deleted&&(d.deleted=!0),t)if(e._id||(e._id=a()),f=a(32,16).toLowerCase(),e._rev){if(l=o(e._rev),l.error)return l
e._rev_tree=[{pos:l.prefix,ids:[l.id,{status:"missing"},[[f,d,[]]]]}],n=l.prefix+1}else e._rev_tree=[{pos:1,ids:[f,d,[]]}],n=1
else if(e._revisions&&(e._rev_tree=s(e._revisions,d),n=e._revisions.start,f=e._revisions.ids[0]),!e._rev_tree){if(l=o(e._rev),l.error)return l
n=l.prefix,f=l.id,e._rev_tree=[{pos:n,ids:[f,d,[]]}]}r.invalidIdError(e._id),e._rev=n+"-"+f
var p={metadata:{},data:{}}
for(var h in e)if(Object.prototype.hasOwnProperty.call(e,h)){var y="_"===h[0]
if(y&&!u[h]){var m=i.error(i.DOC_VALIDATION,h)
throw m.message=i.DOC_VALIDATION.message+": "+h,m}y&&!c[h]?p.metadata[h.slice(1)]=e[h]:p.data[h]=e[h]}return p}},{"./../errors":28,"./../uuid":36}],26:[function(e,t,r){"use strict"
var n,o=e("./isChromeApp")
if(o())n=!1
else try{localStorage.setItem("_pouch_check_localstorage",1),n=!!localStorage.getItem("_pouch_check_localstorage")}catch(s){n=!1}t.exports=function(){return n}},{"./isChromeApp":27}],27:[function(e,t,r){"use strict"
t.exports=function(){return"undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage&&"undefined"!=typeof chrome.storage.local}},{}],28:[function(e,t,r){"use strict"
function n(e){Error.call(this,e.reason),this.status=e.status,this.name=e.error,this.message=e.reason,this.error=!0}var o=e("inherits")
o(n,Error),n.prototype.toString=function(){return JSON.stringify({status:this.status,name:this.name,message:this.message})},r.UNAUTHORIZED=new n({status:401,error:"unauthorized",reason:"Name or password is incorrect."}),r.MISSING_BULK_DOCS=new n({status:400,error:"bad_request",reason:"Missing JSON list of 'docs'"}),r.MISSING_DOC=new n({status:404,error:"not_found",reason:"missing"}),r.REV_CONFLICT=new n({status:409,error:"conflict",reason:"Document update conflict"}),r.INVALID_ID=new n({status:400,error:"invalid_id",reason:"_id field must contain a string"}),r.MISSING_ID=new n({status:412,error:"missing_id",reason:"_id is required for puts"}),r.RESERVED_ID=new n({status:400,error:"bad_request",reason:"Only reserved document ids may start with underscore."}),r.NOT_OPEN=new n({status:412,error:"precondition_failed",reason:"Database not open"}),r.UNKNOWN_ERROR=new n({status:500,error:"unknown_error",reason:"Database encountered an unknown error"}),r.BAD_ARG=new n({status:500,error:"badarg",reason:"Some query argument is invalid"}),r.INVALID_REQUEST=new n({status:400,error:"invalid_request",reason:"Request was invalid"}),r.QUERY_PARSE_ERROR=new n({status:400,error:"query_parse_error",reason:"Some query parameter is invalid"}),r.DOC_VALIDATION=new n({status:500,error:"doc_validation",reason:"Bad special document member"}),r.BAD_REQUEST=new n({status:400,error:"bad_request",reason:"Something wrong with the request"}),r.NOT_AN_OBJECT=new n({status:400,error:"bad_request",reason:"Document must be a JSON object"}),r.DB_MISSING=new n({status:404,error:"not_found",reason:"Database not found"}),r.IDB_ERROR=new n({status:500,error:"indexed_db_went_bad",reason:"unknown"}),r.WSQ_ERROR=new n({status:500,error:"web_sql_went_bad",reason:"unknown"}),r.LDB_ERROR=new n({status:500,error:"levelDB_went_went_bad",reason:"unknown"}),r.FORBIDDEN=new n({status:403,error:"forbidden",reason:"Forbidden by design doc validate_doc_update function"}),r.INVALID_REV=new n({status:400,error:"bad_request",reason:"Invalid rev format"}),r.FILE_EXISTS=new n({status:412,error:"file_exists",reason:"The database could not be created, the file already exists."}),r.MISSING_STUB=new n({status:412,error:"missing_stub"}),r.error=function(e,t,r){function o(t){for(var n in e)"function"!=typeof e[n]&&(this[n]=e[n])
void 0!==r&&(this.name=r),void 0!==t&&(this.reason=t)}return o.prototype=n.prototype,new o(t)},r.getErrorTypeByProp=function(e,t,n){var o=r,s=Object.keys(o).filter(function(r){var n=o[r]
return"function"!=typeof n&&n[e]===t}),i=n&&s.filter(function(e){var t=o[e]
return t.message===n})[0]||s[0]
return i?o[i]:null},r.generateErrorFromResponse=function(e){var t,n,o,s,i,a=r
return n=e.error===!0&&"string"==typeof e.name?e.name:e.error,i=e.reason,o=a.getErrorTypeByProp("name",n,i),e.missing||"missing"===i||"deleted"===i||"not_found"===n?o=a.MISSING_DOC:"doc_validation"===n?(o=a.DOC_VALIDATION,s=i):"bad_request"===n&&o.message!==i&&(o=a.BAD_REQUEST),o||(o=a.getErrorTypeByProp("status",e.status,i)||a.UNKNOWN_ERROR),t=a.error(o,i,n),s&&(t.message=s),e.id&&(t.id=e.id),e.status&&(t.status=e.status),e.missing&&(t.missing=e.missing),t}},{inherits:6}],29:[function(e,t,r){"use strict"
function n(e,t){for(var r in t)if(t.hasOwnProperty(r)){var n=o(t[r])
"undefined"!=typeof n&&(e[r]=n)}}var o=e("./clone")
t.exports=function(e,t,r){return n(e,t),r&&n(e,r),e}},{"./clone":24}],30:[function(e,t,r){"use strict"
t.exports=function(e,t){for(var r,n=e.slice();r=n.pop();)for(var o=r.pos,s=r.ids,i=s[2],a=t(0===i.length,o,s[0],r.ctx,s[1]),u=0,c=i.length;c>u;u++)n.push({pos:o+1,ids:i[u],ctx:a})}},{}],31:[function(e,t,r){"use strict"
function n(e){var t=!1
return o(function(r){if(t)throw new Error("once called more than once")
t=!0,e.apply(this,r)})}var o=e("argsarray")
t.exports=n},{argsarray:38}],32:[function(e,t,r){"use strict"
function n(e){for(var t=a.exec(e),r={},n=14;n--;){var u=o[n],c=t[n]||"",f=-1!==["user","password"].indexOf(u)
r[u]=f?decodeURIComponent(c):c}return r[s]={},r[o[12]].replace(i,function(e,t,n){t&&(r[s][t]=n)}),r}var o=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],s="queryKey",i=/(?:^|&)([^&=]*)=?([^&]*)/g,a=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
t.exports=n},{}],33:[function(e,t,r){"use strict"
t.exports=function(e,t){for(var r={},n=0,o=t.length;o>n;n++){var s=t[n]
s in e&&(r[s]=e[s])}return r}},{}],34:[function(e,t,r){"use strict"
t.exports="function"==typeof Promise?Promise:e("lie")},{lie:42}],35:[function(e,t,r){(function(r){"use strict"
function n(e){return s(function(t){var n,s=this,a="function"==typeof t[t.length-1]?t.pop():!1
a&&(n=function(e,t){r.nextTick(function(){a(e,t)})})
var u=new o(function(r,n){var o
try{var a=i(function(e,t){e?n(e):r(t)})
t.push(a),o=e.apply(s,t),o&&"function"==typeof o.then&&r(o)}catch(u){n(u)}})
return n&&u.then(function(e){n(null,e)},n),u})}var o=e("./promise"),s=e("argsarray"),i=e("./once")
t.exports=n}).call(this,e("/Users/nolan/workspace/pouchdb-authentication/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))},{"./once":31,"./promise":34,"/Users/nolan/workspace/pouchdb-authentication/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5,argsarray:38}],36:[function(e,t,r){t.exports=e(3)},{}],37:[function(e,t,r){function n(e,t,r){try{return!e(t,r)}catch(n){var o="Filter function threw: "+n.toString()
return c.error(c.BAD_REQUEST,o)}}var o=e("./deps/merge/traverseRevTree")
r.ajax=e("./deps/ajax/prequest"),r.uuid=e("./deps/uuid"),r.getArguments=e("argsarray")
var s=e("pouchdb-collections")
r.Map=s.Map,r.Set=s.Set
var i=e("./deps/docs/parseDoc"),a=e("./deps/promise")
r.Promise=a
var u=e("./deps/binary/base64"),c=e("./deps/errors")
r.atob=u.atob,r.btoa=u.btoa
var f=e("./deps/binary/binaryStringToBlobOrBuffer")
r.binaryStringToBlobOrBuffer=f,r.clone=e("./deps/clone"),r.extend=e("./deps/extend"),r.pick=e("./deps/pick"),r.inherits=e("inherits"),r.filterChange=function(e){var t={},r=e.filter&&"function"==typeof e.filter
return t.query=e.query_params,function(o){o.doc||(o.doc={})
var s=r&&n(e.filter,o.doc,t)
if("object"==typeof s)return s
if(s)return!1
if(e.include_docs){if(!e.attachments)for(var i in o.doc._attachments)o.doc._attachments.hasOwnProperty(i)&&(o.doc._attachments[i].stub=!0)}else delete o.doc
return!0}},r.parseDoc=i.parseDoc,r.invalidIdError=i.invalidIdError,r.isCordova=function(){return"undefined"!=typeof cordova||"undefined"!=typeof PhoneGap||"undefined"!=typeof phonegap},r.Changes=e("./changesHandler"),r.once=e("./deps/once"),r.toPromise=e("./deps/toPromise"),r.adapterFun=function(t,n){function o(e,t,r){if(s.enabled){for(var n=[e._db_name,t],o=0;o<r.length-1;o++)n.push(r[o])
s.apply(null,n)
var i=r[r.length-1]
r[r.length-1]=function(r,n){var o=[e._db_name,t]
o=o.concat(r?["error",r]:["success",n]),s.apply(null,o),i(r,n)}}}var s=e("debug")("pouchdb:api")
return r.toPromise(r.getArguments(function(e){if(this._closed)return a.reject(new Error("database is closed"))
var r=this
return o(r,t,e),this.taskqueue.isReady?n.apply(this,e):new a(function(n,o){r.taskqueue.addTask(function(s){s?o(s):n(r[t].apply(r,e))})})}))},r.explain404=e("./deps/ajax/explain404"),r.parseUri=e("./deps/parseUri"),r.compare=function(e,t){return t>e?-1:e>t?1:0},r.compactTree=function(e){var t=[]
return o(e.rev_tree,function(e,r,n,o,s){"available"!==s.status||e||(t.push(r+"-"+n),s.status="missing")}),t}
var l=e("vuvuzela")
r.safeJsonParse=function(e){try{return JSON.parse(e)}catch(t){return l.parse(e)}},r.safeJsonStringify=function(e){try{return JSON.stringify(e)}catch(t){return l.stringify(e)}}},{"./changesHandler":10,"./deps/ajax/explain404":14,"./deps/ajax/prequest":16,"./deps/binary/base64":18,"./deps/binary/binaryStringToBlobOrBuffer":20,"./deps/clone":24,"./deps/docs/parseDoc":25,"./deps/errors":28,"./deps/extend":29,"./deps/merge/traverseRevTree":30,"./deps/once":31,"./deps/parseUri":32,"./deps/pick":33,"./deps/promise":34,"./deps/toPromise":35,"./deps/uuid":36,argsarray:38,debug:39,inherits:6,"pouchdb-collections":44,vuvuzela:45}],38:[function(e,t,r){"use strict"
function n(e){return function(){var t=arguments.length
if(t){for(var r=[],n=-1;++n<t;)r[n]=arguments[n]
return e.call(this,r)}return e.call(this,[])}}t.exports=n},{}],39:[function(e,t,r){function n(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors
if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+r.humanize(this.diff),!t)return e
var n="color: "+this.color
e=[e[0],n,"color: inherit"].concat(Array.prototype.slice.call(e,1))
var o=0,s=0
return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(s=o))}),e.splice(s,0,n),e}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function i(e){try{null==e?r.storage.removeItem("debug"):r.storage.debug=e}catch(t){}}function a(){var e
try{e=r.storage.debug}catch(t){}return e}function u(){try{return window.localStorage}catch(e){}}r=t.exports=e("./debug"),r.log=s,r.formatArgs=o,r.save=i,r.load=a,r.useColors=n,r.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),r.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],r.formatters.j=function(e){return JSON.stringify(e)},r.enable(a())},{"./debug":40}],40:[function(e,t,r){function n(){return r.colors[f++%r.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,s=t-(c||t)
e.diff=s,e.prev=c,e.curr=t,c=t,null==e.useColors&&(e.useColors=r.useColors()),null==e.color&&e.useColors&&(e.color=n())
var i=Array.prototype.slice.call(arguments)
i[0]=r.coerce(i[0]),"string"!=typeof i[0]&&(i=["%o"].concat(i))
var a=0
i[0]=i[0].replace(/%([a-z%])/g,function(t,n){if("%%"===t)return t
a++
var o=r.formatters[n]
if("function"==typeof o){var s=i[a]
t=o.call(e,s),i.splice(a,1),a--}return t}),"function"==typeof r.formatArgs&&(i=r.formatArgs.apply(e,i))
var u=o.log||r.log||console.log.bind(console)
u.apply(e,i)}t.enabled=!1,o.enabled=!0
var s=r.enabled(e)?o:t
return s.namespace=e,s}function s(e){r.save(e)
for(var t=(e||"").split(/[\s,]+/),n=t.length,o=0;n>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")))}function i(){r.enable("")}function a(e){var t,n
for(t=0,n=r.skips.length;n>t;t++)if(r.skips[t].test(e))return!1
for(t=0,n=r.names.length;n>t;t++)if(r.names[t].test(e))return!0
return!1}function u(e){return e instanceof Error?e.stack||e.message:e}r=t.exports=o,r.coerce=u,r.disable=i,r.enable=s,r.enabled=a,r.humanize=e("ms"),r.names=[],r.skips=[],r.formatters={}
var c,f=0},{ms:41}],41:[function(e,t,r){function n(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e)
if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase()
switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*l
case"days":case"day":case"d":return r*f
case"hours":case"hour":case"hrs":case"hr":case"h":return r*c
case"minutes":case"minute":case"mins":case"min":case"m":return r*u
case"seconds":case"second":case"secs":case"sec":case"s":return r*a
case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=c?Math.round(e/c)+"h":e>=u?Math.round(e/u)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function s(e){return i(e,f,"day")||i(e,c,"hour")||i(e,u,"minute")||i(e,a,"second")||e+" ms"}function i(e,t,r){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+r:Math.ceil(e/t)+" "+r+"s"}var a=1e3,u=60*a,c=60*u,f=24*c,l=365.25*f
t.exports=function(e,t){return t=t||{},"string"==typeof e?n(e):t["long"]?s(e):o(e)}},{}],42:[function(e,t,r){"use strict"
function n(){}function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function")
this.state=g,this.queue=[],this.outcome=void 0,e!==n&&u(this,e)}function s(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function i(e,t,r){h(function(){var n
try{n=t(r)}catch(o){return y.reject(e,o)}n===e?y.reject(e,new TypeError("Cannot resolve promise with itself")):y.resolve(e,n)})}function a(e){var t=e&&e.then
return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}function u(e,t){function r(t){s||(s=!0,y.reject(e,t))}function n(t){s||(s=!0,y.resolve(e,t))}function o(){t(n,r)}var s=!1,i=c(o)
"error"===i.status&&r(i.value)}function c(e,t){var r={}
try{r.value=e(t),r.status="success"}catch(n){r.status="error",r.value=n}return r}function f(e){return e instanceof this?e:y.resolve(new this(n),e)}function l(e){var t=new this(n)
return y.reject(t,e)}function d(e){function t(e,t){function n(e){i[t]=e,++a!==o||s||(s=!0,y.resolve(c,i))}r.resolve(e).then(n,function(e){s||(s=!0,y.reject(c,e))})}var r=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var o=e.length,s=!1
if(!o)return this.resolve([])
for(var i=new Array(o),a=0,u=-1,c=new this(n);++u<o;)t(e[u],u)
return c}function p(e){function t(e){r.resolve(e).then(function(e){s||(s=!0,y.resolve(a,e))},function(e){s||(s=!0,y.reject(a,e))})}var r=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var o=e.length,s=!1
if(!o)return this.resolve([])
for(var i=-1,a=new this(n);++i<o;)t(e[i])
return a}var h=e("immediate"),y={},m=["REJECTED"],v=["FULFILLED"],g=["PENDING"]
t.exports=r=o,o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===v||"function"!=typeof t&&this.state===m)return this
var r=new this.constructor(n)
if(this.state!==g){var o=this.state===v?e:t
i(r,o,this.outcome)}else this.queue.push(new s(r,e,t))
return r},s.prototype.callFulfilled=function(e){y.resolve(this.promise,e)},s.prototype.otherCallFulfilled=function(e){i(this.promise,this.onFulfilled,e)},s.prototype.callRejected=function(e){y.reject(this.promise,e)},s.prototype.otherCallRejected=function(e){i(this.promise,this.onRejected,e)},y.resolve=function(e,t){var r=c(a,t)
if("error"===r.status)return y.reject(e,r.value)
var n=r.value
if(n)u(e,n)
else{e.state=v,e.outcome=t
for(var o=-1,s=e.queue.length;++o<s;)e.queue[o].callFulfilled(t)}return e},y.reject=function(e,t){e.state=m,e.outcome=t
for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t)
return e},r.resolve=f,r.reject=l,r.all=d,r.race=p},{immediate:43}],43:[function(e,t,r){(function(e){"use strict"
function r(){f=!0
for(var e,t,r=l.length;r;){for(t=l,l=[],e=-1;++e<r;)t[e]()
r=l.length}f=!1}function n(e){1!==l.push(e)||f||o()}var o,s=e.MutationObserver||e.WebKitMutationObserver
if(s){var i=0,a=new s(r),u=e.document.createTextNode("")
a.observe(u,{characterData:!0}),o=function(){u.data=i=++i%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)o="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script")
t.onreadystatechange=function(){r(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(r,0)}
else{var c=new e.MessageChannel
c.port1.onmessage=r,o=function(){c.port2.postMessage(0)}}var f,l=[]
t.exports=n}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],44:[function(e,t,r){"use strict"
function n(){this.store={}}function o(e){if(this.store=new n,e&&Array.isArray(e))for(var t=0,r=e.length;r>t;t++)this.add(e[t])}r.Map=n,r.Set=o,n.prototype.mangle=function(e){if("string"!=typeof e)throw new TypeError("key must be a string but Got "+e)
return"$"+e},n.prototype.unmangle=function(e){return e.substring(1)},n.prototype.get=function(e){var t=this.mangle(e)
return t in this.store?this.store[t]:void 0},n.prototype.set=function(e,t){var r=this.mangle(e)
return this.store[r]=t,!0},n.prototype.has=function(e){var t=this.mangle(e)
return t in this.store},n.prototype["delete"]=function(e){var t=this.mangle(e)
return t in this.store?(delete this.store[t],!0):!1},n.prototype.forEach=function(e){for(var t=Object.keys(this.store),r=0,n=t.length;n>r;r++){var o=t[r],s=this.store[o]
o=this.unmangle(o),e(s,o)}},o.prototype.add=function(e){return this.store.set(e,!0)},o.prototype.has=function(e){return this.store.has(e)},o.prototype["delete"]=function(e){return this.store["delete"](e)}},{}],45:[function(e,t,r){"use strict"
function n(e,t,r){var n=r[r.length-1]
e===n.element&&(r.pop(),n=r[r.length-1])
var o=n.element,s=n.index
if(Array.isArray(o))o.push(e)
else if(s===t.length-2){var i=t.pop()
o[i]=e}else t.push(e)}r.stringify=function(e){var t=[]
t.push({obj:e})
for(var r,n,o,s,i,a,u,c,f,l,d,p="";r=t.pop();)if(n=r.obj,o=r.prefix||"",s=r.val||"",p+=o,s)p+=s
else if("object"!=typeof n)p+="undefined"==typeof n?null:JSON.stringify(n)
else if(null===n)p+="null"
else if(Array.isArray(n)){for(t.push({val:"]"}),i=n.length-1;i>=0;i--)a=0===i?"":",",t.push({obj:n[i],prefix:a})
t.push({val:"["})}else{u=[]
for(c in n)n.hasOwnProperty(c)&&u.push(c)
for(t.push({val:"}"}),i=u.length-1;i>=0;i--)f=u[i],l=n[f],d=i>0?",":"",d+=JSON.stringify(f)+":",t.push({obj:l,prefix:d})
t.push({val:"{"})}return p},r.parse=function(e){for(var t,r,o,s,i,a,u,c,f,l=[],d=[],p=0;;)if(t=e[p++],"}"!==t&&"]"!==t&&"undefined"!=typeof t)switch(t){case" ":case"	":case"\n":case":":case",":break
case"n":p+=3,n(null,l,d)
break
case"t":p+=3,n(!0,l,d)
break
case"f":p+=4,n(!1,l,d)
break
case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":for(r="",p--;;){if(o=e[p++],!/[\d\.\-e\+]/.test(o)){p--
break}r+=o}n(parseFloat(r),l,d)
break
case'"':for(s="",i=void 0,a=0;;){if(u=e[p++],'"'===u&&("\\"!==i||a%2!==1))break
s+=u,i=u,"\\"===i?a++:a=0}n(JSON.parse('"'+s+'"'),l,d)
break
case"[":c={element:[],index:l.length},l.push(c.element),d.push(c)
break
case"{":f={element:{},index:l.length},l.push(f.element),d.push(f)
break
default:throw new Error("unexpectedly reached end of input: "+t)}else{if(1===l.length)return l.pop()
n(l.pop(),l,d)}}},{}]},{},[1])
