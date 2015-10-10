//    PouchDB 4.0.3
//    
//    (c) 2012-2015 Dale Harvey and the PouchDB team
//    PouchDB may be freely distributed under the Apache license, version 2.0.
//    For all details and documentation:
//    http://pouchdb.com
// returns first element of arr satisfying callback predicate
// Wrapper for functions that call the bulkdocs api with a single doc,
// if the first result is an error, return an error
// clean docs given to us by the user
// compare two docs, first by _id then by _rev
// for every node in a revision tree computes its distance from the closest
// leaf
// all compaction is done in a queue, to avoid attaching
// too many listeners at once
// compact one document and fire callback
// by compacting we mean removing all revisions which
// are further from the leaf in revision tree than max_height
// compact the whole database using single document
// compaction
// according to http://stackoverflow.com/a/417184/680742,
// the de facto URL length limit is 2000 characters.
// but since most of our measurements don't take the full
// URL into account, we fudge it a bit.
// TODO: we could measure the full URL to enforce exactly 2000 chars
// Get all the information you possibly can about the URI given by name and
// return it as a suitable object.
// Generate a URL with the host data given by opts and the given path
// Generate a URL with the host data given by opts and the given path
// Implements the PouchDB API for dealing with CouchDB instances over HTTP
// HttpPouch is a valid adapter.
//
// Detect blob support. Chrome didn't support it until version 38.
// In version 37 they had a broken version where PNGs (and possibly
// other binary types) aren't stored correctly, because when you fetch
// them, the content type is always null.
//
// Furthermore, they have some outstanding bugs where blobs occasionally
// are read by FileReader as null, or by ajax as 404s.
//
// Sadly we use the 404 bug to detect the FileReader bug, so if they
// get fixed independently and released in different versions of Chrome,
// then the bug could come back. So it's worthwhile to watch these issues:
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// IndexedDB requires a versioned database structure, so we use the
// version here to manage migrations.
// The object stores created for each database
// DOC_STORE stores the document meta data, its revision history and state
// Keyed by document id
// BY_SEQ_STORE stores a particular version of a document, keyed by its
// sequence id
// Where we store attachments
// Where we store many-to-many relations
// between attachment digests and seqs
// Where we store database-wide meta data in a single record
// keyed by id: META_STORE
// Where we store local documents
// Where we detect blob support
// Unfortunately, the metadata has to be stringified
// when it is put into the database, because otherwise
// IndexedDB can throw errors for deeply-nested objects.
// Originally we just used JSON.parse/JSON.stringify; now
// we use this custom vuvuzela library that avoids recursion.
// If we could do it all over again, we'd probably use a
// format for the revision trees other than JSON.
// read the doc back out from the database. we don't store the
// _id or _rev because we already have _doc_id_rev.
// Read a blob from the database, encoding as necessary
// and translating from base64 if the IDB doesn't support
// native Blobs
// IDB-specific postprocessing necessary because
// we don't know whether we stored a true Blob or
// a base64-encoded string, and if it's a Blob it
// needs to be read outside of the transaction context
// The object stores created for each database
// DOC_STORE stores the document meta data, its revision history and state
// BY_SEQ_STORE stores a particular version of a document, keyed by its
// sequence id
// Where we store attachments
// where we store many-to-many relations between attachment
// digests and seqs
// these indexes cover the ground for most allDocs queries
// escapeBlob and unescapeBlob are workarounds for a websql bug:
// https://code.google.com/p/chromium/issues/detail?id=422690
// https://bugs.webkit.org/show_bug.cgi?id=137637
// The goal is to never actually insert the \u0000 character
// in the database.
// question mark groups IN queries, e.g. 3 -> '(?,?,?)'
// OK, so here's the deal. Consider this code:
//     var db1 = new PouchDB('foo');
//     var db2 = new PouchDB('foo');
//     db1.destroy();
// ^ these two both need to emit 'destroyed' events,
// as well as the PouchDB constructor itself.
// So we have one db object (whichever one got destroy() called on it)
// responsible for emitting the initial event, which then gets emitted
// by the constructor, which then broadcasts it to any other dbs
// that may have been created with the same name.
// the blob already has a type; do nothing
// create a "part" suitable for multipart. in the browser
// this is an ArrayBuffer; in Node it's a binary string
// designed to give info to browser users, who are disturbed
// when they see 404s in the console
// Create a multipart/related stream out of a document,
// so we can upload documents in that format when
// attachments are large. This is shamefully stolen from
// https://github.com/sballesteros/couch-multipart-stream/
// and https://github.com/npm/npm-fullfat-registry
//Can't find original post, but this is close
//http://stackoverflow.com/questions/6965107/ (continues on next line)
//converting-between-strings-and-arraybuffers
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor (e.g.
// old QtWebKit versions, Android < 4.4).
// hey guess what, we don't need this in the browser
// simplified API. universal browser support is assumed
// shim for browsers that don't support it
// check if a specific revision of a doc has been deleted
//  - metadata: the metadata object from the doc store
//  - rev: (optional) the revision to check. defaults to winning revision
// List of top level reserved words for doc
// List of reserved words that should end up the document
// Determine id an ID is valid
//   - invalid IDs begin with an underescore that does not begin '_design' or
//     '_local'
//   - any other string value is a valid id
// Returns the specific error object for each case
// Preprocess documents, parse their revisions, assign an id and a
// revision for new writes that are missing them, etc
// Find one of the errors defined above based on the value
// of the specified property.
// If reason is provided prefer the error matching that reason.
// This is for differentiating between errors with the same name and status,
// eg, bad_request.
// convert a 64-bit int to a binary string
// convert an array of 64-bit ints into
// a base64-encoded string
// returns revs of all conflicts that is leaves such that
// 1. are not deleted and
// 2. are different than winning revision
// for a better overview of what this is doing, read:
// https://github.com/apache/couchdb/blob/master/src/couchdb/couch_key_tree.erl
//
// But for a quick intro, CouchDB uses a revision tree to store a documents
// history, A -> B -> C, when a document has conflicts, that is a branch in the
// tree, A -> (B1 | B2 -> C), We store these as a nested array in the format
//
// KeyTree = [Path ... ]
// Path = {pos: position_from_root, ids: Tree}
// Tree = [Key, Opts, [Tree, ...]], in particular single node: [Key, []]
// classic binary search
// assuming the arr is sorted, insert the item in the proper place
// Turn a path as a flat array into a tree with a single branch.
// If any should be stemmed from the beginning of the array, that's passed
// in as the second argument
// compare the IDs of two trees
// Merge two trees together
// The roots of tree1 and tree2 must be the same revision
// To ensure we dont grow the revision tree infinitely, we stem old revisions
// return true if a rev exists in the rev tree, false otherwise
// build up a list of all the paths to the leafs in this revision tree
// Pretty much all below can be combined into a higher order function to
// traverse revisions
// The return value from the callback will be passed as context to all
// children of that node
// We fetch all leafs of the revision tree, and sort them based on tree length
// and whether they were deleted, undeleted documents with the longest revision
// tree (most edits) win
// The final sort algorithm is slightly documented in a sidebar here:
// http://guide.couchdb.org/draft/conflicts.html
//
// Parsing hex strings. Yeah.
//
// So basically we need this because of a bug in WebSQL:
// https://code.google.com/p/chromium/issues/detail?id=422690
// https://bugs.webkit.org/show_bug.cgi?id=137637
//
// UTF-8 and UTF-16 are provided as separate functions
// for meager performance improvements
//
// Example:
// pragma encoding=utf8;
// select hex('A');
// returns '41'
// Example:
// pragma encoding=utf16;
// select hex('A');
// returns '4100'
// notice that the 00 comes after the 41 (i.e. it's swizzled)
// originally parseUri 1.2.2, now patched by us
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// use the "loose" parser
// like underscore/lodash _.pick()
// this is essentially the "update sugar" function from daleharvey/pouchdb#1388
// the diffFun tells us what delta to apply to the doc.  it either returns
// the doc, or false if it doesn't need to do an update after all
// BEGIN Math.uuid.js
// returns a promise for a list of docs to update, based on the input docId.
// the order doesn't matter, because post-3.2.0, bulkDocs
// is an atomic operation in all three adapters.
// updates all emitted key/value docs and metaDocs in the mrview database
// for the given batch of documents from the source database
// Promise finally util similar to Q.finally
// uniq an array of strings, order not guaranteed
// similar to underscore/lodash _.uniq
// This is an arbitrary number to limit the
// amount of replication history we save in the checkpoint.
// If we save too much, the checkpoing docs will become very big,
// if we save fewer, we'll run a greater risk of having to
// read all the changes from 0 when checkpoint PUTs fail
// CouchDB 2.0 has a more involved history pruning,
// but let's go for the simple version for now.
// This checkpoint comparison is ported from CouchDBs source
// they come from here:
// https://github.com/apache/couchdb-couch-replicator/blob/master/src/couch_replicator.erl#L863-L906
// Generate a unique id particular to this replication.
// Not guaranteed to align perfectly with CouchDB's rep ids.
//
// Fetch all the documents from the src as described in the "diffs",
// which is a mapping of docs IDs to revisions. If the state ever
// changes to "cancelled", then the returned promise will be rejected.
// Else it will be resolved with a list of fetched documents.
//
// We create a basic promise so the caller can cancel the replication possibly
// before we have actually started listening to changes etc
// TODO: don't export these
// TODO: only used by the integration tests
// compact a tree by marking its non-leafs as missing,
// and return a list of revs to delete
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// Backwards-compat with node 0.10.x
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
// emits a 'removeListener' event iff the listener was removed
// shim for using process in browser
// v8 likes predictible objects
//named nextTick for less confusing stack traces
// couch considers null/NaN/Infinity/-Infinity === undefined,
// for the purposes of mapreduce indexes. also, dates get stringified.
// convert the given key to a string that would be appropriate
// for lexical sorting, e.g. within a database, where the
// sorting is the same given by the collate() function.
// move up the stack while parsing
// this function moved outside of parseIndexableString for performance
// The collation is defined by erlangs ordered terms
// the atoms null, true, false come first, then numbers, strings,
// arrays, then objects
// null/undefined/NaN/Infinity/-Infinity are all considered null
// conversion:
// x yyy zz...zz
// x = 0 for negative, 1 for 0, 2 for positive
// y = exponent (for negative numbers negated) moved so that it's >= 0
// z = mantisse
// based on https://github.com/montagejs/collections
// Convenience function for the parse function.
// This pop function is basically copied from
// pouchCollate.parseIndexableString
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e()
else if("function"==typeof define&&define.amd)define([],e)
else{var t
t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.PouchDB=e()}}(function(){var define,module,exports
return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require
if(!a&&c)return c(s,!0)
if(i)return i(s,!0)
var u=new Error("Cannot find module '"+s+"'")
throw u.code="MODULE_NOT_FOUND",u}var f=n[s]={exports:{}}
t[s][0].call(f.exports,function(e){var n=t[s][1][e]
return o(n?n:e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s])
return o}({1:[function(e,t,n){(function(n){"use strict"
function r(e,t){for(var n=0;n<e.length;n++)if(t(e[n],n)===!0)return e[n]
return!1}function o(e){return function(t,n){t||n[0]&&n[0].error?e(t||n[0]):e(null,n.length?n[0]:n)}}function i(e){for(var t=0;t<e.length;t++){var n=e[t]
if(n._deleted)delete n._attachments
else if(n._attachments)for(var r=Object.keys(n._attachments),o=0;o<r.length;o++){var i=r[o]
n._attachments[i]=l.pick(n._attachments[i],["data","digest","content_type","length","revpos","stub"])}}}function s(e,t){var n=l.compare(e._id,t._id)
if(0!==n)return n
var r=e._revisions?e._revisions.start:0,o=t._revisions?t._revisions.start:0
return l.compare(r,o)}function a(e){var t={},n=[]
return b(e,function(e,r,o,i){var s=r+"-"+o
return e&&(t[s]=0),void 0!==i&&n.push({from:i,to:s}),s}),n.reverse(),n.forEach(function(e){void 0===t[e.from]?t[e.from]=1+t[e.to]:t[e.from]=Math.min(t[e.from],1+t[e.to])}),t}function c(e,t,n){var r="limit"in t?t.keys.slice(t.skip,t.limit+t.skip):t.skip>0?t.keys.slice(t.skip):t.keys
if(t.descending&&r.reverse(),!r.length)return e._allDocs({limit:0},n)
var o={offset:t.skip}
return y.all(r.map(function(n){var r=l.extend({key:n,deleted:"ok"},t)
return["limit","skip","keys"].forEach(function(e){delete r[e]}),new y(function(t,i){e._allDocs(r,function(e,r){return e?i(e):(o.total_rows=r.total_rows,void t(r.rows[0]||{key:n,error:"not_found"}))})})})).then(function(e){return o.rows=e,o})}function u(e){var t=e._compactionQueue[0],r=t.opts,o=t.callback
e.get("_local/compaction")["catch"](function(){return!1}).then(function(t){t&&t.last_seq&&(r.last_seq=t.last_seq),e._compact(r,function(t,r){t?o(t):o(null,r),n.nextTick(function(){e._compactionQueue.shift(),e._compactionQueue.length&&u(e)})})})}function f(e){return"_"===e.charAt(0)?e+"is not a valid attachment name, attachment names cannot start with '_'":!1}function d(){p.call(this)}var l=e(84),h=e(48),p=e(87).EventEmitter,v=e(64),_=e(14),y=l.Promise,m=e(38),g=e(39),b=e(56),E=e(52),w=e(55),S=e(51)
l.inherits(d,p),t.exports=d,d.prototype.post=l.adapterFun("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),"object"!=typeof e||Array.isArray(e)?n(h.error(h.NOT_AN_OBJECT)):void this.bulkDocs({docs:[e]},t,o(n))}),d.prototype.put=l.adapterFun("put",l.getArguments(function(e){var t,n,r,i,s=e.shift(),a="_id"in s
if("object"!=typeof s||Array.isArray(s))return(i=e.pop())(h.error(h.NOT_AN_OBJECT))
for(s=l.clone(s);;)if(t=e.shift(),n=typeof t,"string"!==n||a?"string"!==n||!a||"_rev"in s?"object"===n?r=t:"function"===n&&(i=t):s._rev=t:(s._id=t,a=!0),!e.length)break
r=r||{}
var c=l.invalidIdError(s._id)
return c?i(c):g(s._id)&&"function"==typeof this._putLocal?s._deleted?this._removeLocal(s,i):this._putLocal(s,i):void this.bulkDocs({docs:[s]},r,o(i))})),d.prototype.putAttachment=l.adapterFun("putAttachment",function(e,t,n,r,o,i){function s(e){return e._attachments=e._attachments||{},e._attachments[t]={content_type:o,data:r},a.put(e)}var a=this
return"function"==typeof o&&(i=o,o=r,r=n,n=null),"undefined"==typeof o&&(o=r,r=n,n=null),a.get(e).then(function(e){if(e._rev!==n)throw h.error(h.REV_CONFLICT)
return s(e)},function(t){if(t.reason===h.MISSING_DOC.message)return s({_id:e})
throw t})}),d.prototype.removeAttachment=l.adapterFun("removeAttachment",function(e,t,n,r){var o=this
o.get(e,function(e,i){return e?void r(e):i._rev!==n?void r(h.error(h.REV_CONFLICT)):i._attachments?(delete i._attachments[t],0===Object.keys(i._attachments).length&&delete i._attachments,void o.put(i,r)):r()})}),d.prototype.remove=l.adapterFun("remove",function(e,t,n,r){var i
"string"==typeof t?(i={_id:e,_rev:t},"function"==typeof n&&(r=n,n={})):(i=e,"function"==typeof t?(r=t,n={}):(r=n,n=t)),n=l.clone(n||{}),n.was_delete=!0
var s={_id:i._id,_rev:i._rev||n.rev}
return s._deleted=!0,g(s._id)&&"function"==typeof this._removeLocal?this._removeLocal(i,r):void this.bulkDocs({docs:[s]},n,o(r))}),d.prototype.revsDiff=l.adapterFun("revsDiff",function(e,t,n){function r(e,t){a.has(e)||a.set(e,{missing:[]}),a.get(e).missing.push(t)}function o(t,n){var o=e[t].slice(0)
b(n,function(e,n,i,s,a){var c=n+"-"+i,u=o.indexOf(c);-1!==u&&(o.splice(u,1),"available"!==a.status&&r(t,c))}),o.forEach(function(e){r(t,e)})}"function"==typeof t&&(n=t,t={}),t=l.clone(t)
var i=Object.keys(e)
if(!i.length)return n(null,{})
var s=0,a=new l.Map
i.map(function(t){this._getRevisionTree(t,function(r,c){if(r&&404===r.status&&"missing"===r.message)a.set(t,{missing:e[t]})
else{if(r)return n(r)
o(t,c)}if(++s===i.length){var u={}
return a.forEach(function(e,t){u[t]=e}),n(null,u)}})},this)}),d.prototype.compactDocument=l.adapterFun("compactDocument",function(e,t,n){var r=this
this._getRevisionTree(e,function(o,i){if(o)return n(o)
var s=a(i),c=[],u=[]
Object.keys(s).forEach(function(e){s[e]>t&&c.push(e)}),b(i,function(e,t,n,r,o){var i=t+"-"+n
"available"===o.status&&-1!==c.indexOf(i)&&u.push(i)}),r._doCompaction(e,u,n)})}),d.prototype.compact=l.adapterFun("compact",function(e,t){"function"==typeof e&&(t=e,e={})
var n=this
e=l.clone(e||{}),n._compactionQueue=n._compactionQueue||[],n._compactionQueue.push({opts:e,callback:t}),1===n._compactionQueue.length&&u(n)}),d.prototype._compact=function(e,t){function n(e){s.push(o.compactDocument(e.id,0))}function r(e){var n=e.last_seq
y.all(s).then(function(){return v(o,"_local/compaction",function(e){return!e.last_seq||e.last_seq<n?(e.last_seq=n,e):!1})}).then(function(){t(null,{ok:!0})})["catch"](t)}var o=this,i={returnDocs:!1,last_seq:e.last_seq||0},s=[]
o.changes(i).on("change",n).on("complete",r).on("error",t)},d.prototype.get=l.adapterFun("get",function(e,t,n){function o(){var r=[],o=i.length
return o?void i.forEach(function(i){s.get(e,{rev:i,revs:t.revs,attachments:t.attachments},function(e,t){e?r.push({missing:i}):r.push({ok:t}),o--,o||n(null,r)})}):n(null,r)}if("function"==typeof t&&(n=t,t={}),"string"!=typeof e)return n(h.error(h.INVALID_ID))
if(g(e)&&"function"==typeof this._getLocal)return this._getLocal(e,n)
var i=[],s=this
if(!t.open_revs)return this._get(e,t,function(e,o){if(t=l.clone(t),e)return n(e)
var i=o.doc,a=o.metadata,c=o.ctx
if(t.conflicts){var u=S(a)
u.length&&(i._conflicts=u)}if(m(a,i._rev)&&(i._deleted=!0),t.revs||t.revs_info){var f=w(a.rev_tree),d=r(f,function(e){return-1!==e.ids.map(function(e){return e.id}).indexOf(i._rev.split("-")[1])}),h=d.ids.map(function(e){return e.id}).indexOf(i._rev.split("-")[1])+1,p=d.ids.length-h
if(d.ids.splice(h,p),d.ids.reverse(),t.revs&&(i._revisions={start:d.pos+d.ids.length-1,ids:d.ids.map(function(e){return e.id})}),t.revs_info){var v=d.pos+d.ids.length
i._revs_info=d.ids.map(function(e){return v--,{rev:v+"-"+e.id,status:e.opts.status}})}}if(t.attachments&&i._attachments){var _=i._attachments,y=Object.keys(_).length
if(0===y)return n(null,i)
Object.keys(_).forEach(function(e){this._getAttachment(_[e],{binary:t.binary,ctx:c},function(t,r){var o=i._attachments[e]
o.data=r,delete o.stub,delete o.length,--y||n(null,i)})},s)}else{if(i._attachments)for(var g in i._attachments)i._attachments.hasOwnProperty(g)&&(i._attachments[g].stub=!0)
n(null,i)}})
if("all"===t.open_revs)this._getRevisionTree(e,function(e,t){return e?n(e):(i=E(t).map(function(e){return e.rev}),void o())})
else{if(!Array.isArray(t.open_revs))return n(h.error(h.UNKNOWN_ERROR,"function_clause"))
i=t.open_revs
for(var a=0;a<i.length;a++){var c=i[a]
if("string"!=typeof c||!/^\d+-/.test(c))return n(h.error(h.INVALID_REV))}o()}}),d.prototype.getAttachment=l.adapterFun("getAttachment",function(e,t,n,r){var o=this
n instanceof Function&&(r=n,n={}),n=l.clone(n),this._get(e,n,function(e,i){return e?r(e):i.doc._attachments&&i.doc._attachments[t]?(n.ctx=i.ctx,n.binary=!0,o._getAttachment(i.doc._attachments[t],n,r),void 0):r(h.error(h.MISSING_DOC))})}),d.prototype.allDocs=l.adapterFun("allDocs",function(e,t){if("function"==typeof e&&(t=e,e={}),e=l.clone(e),e.skip="undefined"!=typeof e.skip?e.skip:0,e.start_key&&(e.startkey=e.start_key),e.end_key&&(e.endkey=e.end_key),"keys"in e){if(!Array.isArray(e.keys))return t(new TypeError("options.keys must be an array"))
var n=["startkey","endkey","key"].filter(function(t){return t in e})[0]
if(n)return void t(h.error(h.QUERY_PARSE_ERROR,"Query parameter `"+n+"` is not compatible with multi-get"))
if("http"!==this.type())return c(this,e,t)}return this._allDocs(e,t)}),d.prototype.changes=function(e,t){return"function"==typeof e&&(t=e,e={}),new _(this,e,t)},d.prototype.close=l.adapterFun("close",function(e){return this._closed=!0,this._close(e)}),d.prototype.info=l.adapterFun("info",function(e){var t=this
this._info(function(n,r){return n?e(n):(r.db_name=r.db_name||t._db_name,r.auto_compaction=!(!t.auto_compaction||"http"===t.type()),r.adapter=t.type(),void e(null,r))})}),d.prototype.id=l.adapterFun("id",function(e){return this._id(e)}),d.prototype.type=function(){return"function"==typeof this._type?this._type():this.adapter},d.prototype.bulkDocs=l.adapterFun("bulkDocs",function(e,t,n){if("function"==typeof t&&(n=t,t={}),t=l.clone(t||{}),Array.isArray(e)&&(e={docs:e}),!e||!e.docs||!Array.isArray(e.docs))return n(h.error(h.MISSING_BULK_DOCS))
for(var r=0;r<e.docs.length;++r)if("object"!=typeof e.docs[r]||Array.isArray(e.docs[r]))return n(h.error(h.NOT_AN_OBJECT))
var o
return e.docs.forEach(function(e){e._attachments&&Object.keys(e._attachments).forEach(function(e){o=o||f(e)})}),o?n(h.error(h.BAD_REQUEST,o)):(e=l.clone(e),"new_edits"in t||("new_edits"in e?t.new_edits=e.new_edits:t.new_edits=!0),t.new_edits||"http"===this.type()||e.docs.sort(s),i(e.docs),this._bulkDocs(e,t,function(e,r){return e?n(e):(t.new_edits||(r=r.filter(function(e){return e.error})),void n(null,r))}))}),d.prototype.registerDependentDatabase=l.adapterFun("registerDependentDatabase",function(e,t){function n(t){return t.dependentDbs=t.dependentDbs||{},t.dependentDbs[e]?!1:(t.dependentDbs[e]=!0,t)}var r=new this.constructor(e,this.__opts)
v(this,"_local/_pouch_dependentDbs",n).then(function(){t(null,{db:r})})["catch"](t)}),d.prototype.destroy=l.adapterFun("destroy",function(e,t){function n(){r._destroy(e,function(e,n){return e?t(e):(r.emit("destroyed"),void t(null,n||{ok:!0}))})}"function"==typeof e&&(t=e,e={})
var r=this,o="use_prefix"in r?r.use_prefix:!0
return"http"===r.type()?n():void r.get("_local/_pouch_dependentDbs",function(e,i){if(e)return 404!==e.status?t(e):n()
var s=i.dependentDbs,a=r.constructor,c=Object.keys(s).map(function(e){var t=o?e.replace(new RegExp("^"+a.prefix),""):e
return new a(t,r.__opts).destroy()})
y.all(c).then(n,function(e){t(e)})})})}).call(this,e(88))},{14:14,38:38,39:39,48:48,51:51,52:52,55:55,56:56,64:64,84:84,87:87,88:88}],2:[function(e,t,n){"use strict"
t.exports={idb:e(8),websql:e(12)}},{12:12,8:8}],3:[function(e,t,n){"use strict"
function r(e){var t=e.doc&&e.doc._attachments
t&&Object.keys(t).forEach(function(e){var n=t[e]
n.data=h(n.data,n.content_type)})}function o(e){return/^_design/.test(e)?"_design/"+encodeURIComponent(e.slice(8)):/^_local/.test(e)?"_local/"+encodeURIComponent(e.slice(7)):encodeURIComponent(e)}function i(e){return e._attachments&&Object.keys(e._attachments)?v.all(Object.keys(e._attachments).map(function(t){var n=e._attachments[t]
return n.data&&"string"!=typeof n.data?S(n.data).then(function(e){n.data=e}):void 0})):v.resolve()}function s(e,t){var n=p.parseUri(e);(n.user||n.password)&&(n.auth={username:n.user,password:n.password})
var r=n.path.replace(/(^\/|\/$)/g,"").split("/")
if(n.db=r.pop(),n.path=r.join("/"),t=t||{},t=_(t),n.headers=t.headers||t.ajax&&t.ajax.headers||{},t.auth||n.auth){var o=t.auth||n.auth,i=m(o.username+":"+o.password)
n.headers.Authorization="Basic "+i}return t.headers&&(n.headers=t.headers),n}function a(e,t){return c(e,e.db+"/"+t)}function c(e,t){var n=e.path?"/":""
return e.protocol+"://"+e.host+":"+e.port+"/"+e.path+n+t}function u(e,t){function n(e,t){var n=p.extend(_(q),e)
return E(n.method+" "+n.url),p.ajax(n,t)}function u(e){return new v(function(t,r){n(e,function(e,n){return e?r(e):void t(n)})})}function h(e,t){return p.adapterFun(e,p.getArguments(function(e){y().then(function(n){return t.apply(this,e)})["catch"](function(t){var n=e.pop()
n(t)})}))}function y(){if(e.skipSetup)return v.resolve()
if(R)return R
var t={headers:_(k.headers),method:"GET",url:A},n={headers:_(k.headers),method:"PUT",url:A}
return R=u(t)["catch"](function(e){return e&&e.status&&404===e.status?(p.explain404("PouchDB is just detecting if the remote exists."),u(n)):v.reject(e)})["catch"](function(e){return e&&e.status&&401===e.status?u(t):e&&e.status&&412===e.status?!0:v.reject(e)}),R["catch"](function(){R=null}),R}function m(e){return e.split("/").map(encodeURIComponent).join("/")}var x=this,O=s
e.getHost&&(O=e.getHost)
var k=O(e.name,e),A=a(k,"")
x.getUrl=function(){return A},x.getHeaders=function(){return _(k.headers)}
var q=e.ajax||{}
e=_(e)
var R
setTimeout(function(){t(null,x)}),x.type=function(){return"http"},x.id=h("id",function(e){n({headers:_(k.headers),method:"GET",url:c(k,"")},function(t,n){var r=n&&n.uuid?n.uuid+k.db:a(k,"")
e(null,r)})}),x.request=h("request",function(e,t){e.headers=k.headers,e.url=a(k,e.url),n(e,t)}),x.compact=h("compact",function(e,t){"function"==typeof e&&(t=e,e={}),e=_(e),n({headers:_(k.headers),url:a(k,"_compact"),method:"POST"},function(){function n(){x.info(function(r,o){o.compact_running?setTimeout(n,e.interval||200):t(null,{ok:!0})})}n()})}),x._info=function(e){y().then(function(){n({headers:_(k.headers),method:"GET",url:a(k,"")},function(t,n){return t?e(t):(n.host=a(k,""),void e(null,n))})})},x.get=h("get",function(e,t,n){function r(e){var n=e._attachments,r=n&&Object.keys(n)
return n&&r.length?v.all(r.map(function(r){var i=n[r],s=o(e._id)+"/"+m(r)+"?rev="+e._rev
return u({headers:_(k.headers),method:"GET",url:a(k,s),binary:!0}).then(function(e){return t.binary?e:S(e)}).then(function(e){delete i.stub,delete i.length,i.data=e})})):void 0}function i(e){return Array.isArray(e)?v.all(e.map(function(e){return e.ok?r(e.ok):void 0})):r(e)}"function"==typeof t&&(n=t,t={}),t=_(t)
var s=[]
t.revs&&s.push("revs=true"),t.revs_info&&s.push("revs_info=true"),t.open_revs&&("all"!==t.open_revs&&(t.open_revs=JSON.stringify(t.open_revs)),s.push("open_revs="+t.open_revs)),t.rev&&s.push("rev="+t.rev),t.conflicts&&s.push("conflicts="+t.conflicts),s=s.join("&"),s=""===s?"":"?"+s,e=o(e)
var c={headers:_(k.headers),method:"GET",url:a(k,e+s)},f=t.ajax||{}
p.extend(c,f),u(c).then(function(e){return v.resolve().then(function(){return t.attachments?i(e):void 0}).then(function(){n(null,e)})})["catch"](n)}),x.remove=h("remove",function(e,t,r,i){var s
"string"==typeof t?(s={_id:e,_rev:t},"function"==typeof r&&(i=r,r={})):(s=e,"function"==typeof t?(i=t,r={}):(i=r,r=t))
var c=s._rev||r.rev
n({headers:_(k.headers),method:"DELETE",url:a(k,o(s._id))+"?rev="+c},i)}),x.getAttachment=h("getAttachment",function(e,t,r,i){"function"==typeof r&&(i=r,r={})
var s=r.rev?"?rev="+r.rev:"",c=a(k,o(e))+"/"+m(t)+s
n({headers:_(k.headers),method:"GET",url:c,binary:!0},i)}),x.removeAttachment=h("removeAttachment",function(e,t,r,i){var s=a(k,o(e)+"/"+m(t))+"?rev="+r
n({headers:_(k.headers),method:"DELETE",url:s},i)}),x.putAttachment=h("putAttachment",function(e,t,r,i,s,c){"function"==typeof s&&(c=s,s=i,i=r,r=null)
var u=o(e)+"/"+m(t),f=a(k,u)
if(r&&(f+="?rev="+r),"string"==typeof i){var d
try{d=g(i)}catch(h){return c(b.error(b.BAD_ARG,"Attachments need to be base64 encoded"))}i=d?l(d,s):""}var p={headers:_(k.headers),method:"PUT",url:f,processData:!1,body:i,timeout:q.timeout||6e4}
p.headers["Content-Type"]=s,n(p,c)}),x.put=h("put",p.getArguments(function(e){var t,n,r,s=e.shift(),c=e.pop()
if("object"!=typeof s||Array.isArray(s))return c(b.error(b.NOT_AN_OBJECT))
var f="_id"in s
s=_(s),i(s).then(function(){for(;;)if(t=e.shift(),n=typeof t,"string"!==n||f?"string"!==n||!f||"_rev"in s?"object"===n&&(r=_(t)):s._rev=t:(s._id=t,f=!0),!e.length)break
r=r||{},T.invalidIdError(s._id)
var i=[]
r&&"undefined"!=typeof r.new_edits&&i.push("new_edits="+r.new_edits),i=i.join("&"),""!==i&&(i="?"+i)
var d={headers:_(k.headers),method:"PUT",url:a(k,o(s._id))+i,body:s}
return v.resolve().then(function(){var e=s._attachments&&Object.keys(s._attachments).filter(function(e){return!s._attachments[e].stub}).length
if(e){var t=w(s)
d.body=t.body,d.processData=!1,d.headers=p.extend(d.headers,t.headers)}})["catch"](function(){throw new Error("Did you forget to base64-encode an attachment?")}).then(function(){return u(d)}).then(function(e){e.ok=!0,c(null,e)})})["catch"](c)})),x.post=h("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),t=_(t),"object"!=typeof e?n(b.error(b.NOT_AN_OBJECT)):("_id"in e||(e._id=p.uuid()),void x.put(e,t,function(e,t){return e?n(e):(t.ok=!0,void n(null,t))}))}),x._bulkDocs=function(e,t,r){e.new_edits=t.new_edits,y().then(function(){return v.all(e.docs.map(i))}).then(function(){n({headers:_(k.headers),method:"POST",url:a(k,"_bulk_docs"),body:e},function(e,t){return e?r(e):(t.forEach(function(e){e.ok=!0}),void r(null,t))})})["catch"](r)},x.allDocs=h("allDocs",function(e,t){"function"==typeof e&&(t=e,e={}),e=_(e)
var n,o=[],i="GET"
if(e.conflicts&&o.push("conflicts=true"),e.descending&&o.push("descending=true"),e.include_docs&&o.push("include_docs=true"),e.attachments&&o.push("attachments=true"),e.key&&o.push("key="+encodeURIComponent(JSON.stringify(e.key))),e.start_key&&(e.startkey=e.start_key),e.startkey&&o.push("startkey="+encodeURIComponent(JSON.stringify(e.startkey))),e.end_key&&(e.endkey=e.end_key),e.endkey&&o.push("endkey="+encodeURIComponent(JSON.stringify(e.endkey))),"undefined"!=typeof e.inclusive_end&&o.push("inclusive_end="+!!e.inclusive_end),"undefined"!=typeof e.limit&&o.push("limit="+e.limit),"undefined"!=typeof e.skip&&o.push("skip="+e.skip),o=o.join("&"),""!==o&&(o="?"+o),"undefined"!=typeof e.keys){var s="keys="+encodeURIComponent(JSON.stringify(e.keys))
s.length+o.length+1<=d?o+=(-1!==o.indexOf("?")?"&":"?")+s:(i="POST",n={keys:e.keys})}u({headers:_(k.headers),method:i,url:a(k,"_all_docs"+o),body:n}).then(function(n){e.include_docs&&e.attachments&&e.binary&&n.rows.forEach(r),t(null,n)})["catch"](t)}),x._changes=function(e){var t="batch_size"in e?e.batch_size:f
e=_(e),e.timeout=e.timeout||q.timeout||3e4
var o,i={timeout:e.timeout-5e3},s="undefined"!=typeof e.limit?e.limit:!1
o="returnDocs"in e?e.returnDocs:!0
var c=s
if(e.style&&(i.style=e.style),(e.include_docs||e.filter&&"function"==typeof e.filter)&&(i.include_docs=!0),e.attachments&&(i.attachments=!0),e.continuous&&(i.feed="longpoll"),e.conflicts&&(i.conflicts=!0),e.descending&&(i.descending=!0),e.filter&&"string"==typeof e.filter&&(i.filter=e.filter,"_view"===e.filter&&e.view&&"string"==typeof e.view&&(i.view=e.view)),e.query_params&&"object"==typeof e.query_params)for(var u in e.query_params)e.query_params.hasOwnProperty(u)&&(i[u]=e.query_params[u])
var l,h="GET"
if(e.doc_ids){i.filter="_doc_ids"
var v=JSON.stringify(e.doc_ids)
v.length<d?i.doc_ids=v:(h="POST",l={doc_ids:e.doc_ids})}var m,g,E=function(r,o){if(!e.aborted){i.since=r,"object"==typeof i.since&&(i.since=JSON.stringify(i.since)),e.descending?s&&(i.limit=c):i.limit=!s||c>t?t:c
var u="?"+Object.keys(i).map(function(e){return e+"="+encodeURIComponent(i[e])}).join("&"),f={headers:_(k.headers),method:h,url:a(k,"_changes"+u),timeout:e.timeout,body:l}
g=r,e.aborted||y().then(function(){m=n(f,o)})}},w=10,S=0,T={results:[]},x=function(n,i){if(!e.aborted){var a=0
if(i&&i.results){a=i.results.length,T.last_seq=i.last_seq
var u={}
u.query=e.query_params,i.results=i.results.filter(function(t){c--
var n=p.filterChange(e)(t)
return n&&(e.include_docs&&e.attachments&&e.binary&&r(t),o&&T.results.push(t),e.onChange(t)),n})}else if(n)return e.aborted=!0,void e.complete(n)
i&&i.last_seq&&(g=i.last_seq)
var f=s&&0>=c||i&&t>a||e.descending
if((!e.continuous||s&&0>=c)&&f)e.complete(null,T)
else{n?S+=1:S=0
var d=1<<S,l=w*d,h=e.maximumWait||3e4
if(l>h)return void e.complete(n||b.error(b.UNKNOWN_ERROR))
setTimeout(function(){E(g,x)},l)}}}
return E(e.since||0,x),{cancel:function(){e.aborted=!0,m&&m.abort()}}},x.revsDiff=h("revsDiff",function(e,t,r){"function"==typeof t&&(r=t,t={}),n({headers:_(k.headers),method:"POST",url:a(k,"_revs_diff"),body:e},r)}),x._close=function(e){e()},x._destroy=function(t,r){y().then(function(){n({url:a(k,""),method:"DELETE",headers:_(k.headers)},function(t,n){return t?(x.emit("error",t),r(t)):(x.emit("destroyed"),x.constructor.emit("destroyed",e.name),void r(null,n))})})}}var f=25,d=1800,l=e(31),h=e(29),p=e(84),v=p.Promise,_=p.clone,y=e(28),m=y.btoa,g=y.atob,b=e(48),E=e(89)("pouchdb:http"),w=e(24),S=e(33),T=e(42)
u.valid=function(){return!0},t.exports=u},{24:24,28:28,29:29,31:31,33:33,42:42,48:48,84:84,89:89}],4:[function(e,t,n){"use strict"
function r(e,t,n,r,o){try{if(e&&t)return o?IDBKeyRange.bound(t,e,!n,!1):IDBKeyRange.bound(e,t,!1,!n)
if(e)return o?IDBKeyRange.upperBound(e):IDBKeyRange.lowerBound(e)
if(t)return o?IDBKeyRange.lowerBound(t,!n):IDBKeyRange.upperBound(t,!n)
if(r)return IDBKeyRange.only(r)}catch(i){return{error:i}}return null}function o(e,t,n,r){return"DataError"===n.name&&0===n.code?r(null,{total_rows:e._meta.docCount,offset:t.skip,rows:[]}):void r(s.error(s.IDB_ERROR,n.name,n.message))}function i(e,t,n,i){function s(e,i){function s(t,n,r){var o=t.id+"::"+r
N.get(o).onsuccess=function(r){n.doc=h(r.target.result),e.conflicts&&(n.doc._conflicts=u(t)),v(n.doc,e,R)}}function a(t,n,r){var o={id:r.id,key:r.id,value:{rev:n}},i=r.deleted
if("ok"===e.deleted)L.push(o),i?(o.value.deleted=!0,o.doc=null):e.include_docs&&s(r,o,n)
else if(!i&&S--<=0&&(L.push(o),e.include_docs&&s(r,o,n),0===--T))return
t["continue"]()}function c(e){j=t._meta.docCount
var n=e.target.result
if(n){var r=p(n.value),o=r.winningRev
a(n,o,r)}}function m(){i(null,{total_rows:j,offset:e.skip,rows:L})}function g(){e.attachments?_(L,e.binary).then(m):m()}var b="startkey"in e?e.startkey:!1,E="endkey"in e?e.endkey:!1,w="key"in e?e.key:!1,S=e.skip||0,T="number"==typeof e.limit?e.limit:-1,x=e.inclusive_end!==!1,O="descending"in e&&e.descending?"prev":null,k=r(b,E,x,w,O)
if(k&&k.error)return o(t,e,k.error,i)
var A=[l,d]
e.attachments&&A.push(f)
var q=y(n,A,"readonly")
if(q.error)return i(q.error)
var R=q.txn,C=R.objectStore(l),I=R.objectStore(d),D=O?C.openCursor(k,O):C.openCursor(k),N=I.index("_doc_id_rev"),L=[],j=0
R.oncomplete=g,D.onsuccess=c}function a(e,n){return 0===e.limit?n(null,{total_rows:t._meta.docCount,offset:e.skip,rows:[]}):void s(e,n)}a(e,i)}var s=e(48),a=e(9),c=e(7),u=e(51),f=c.ATTACH_STORE,d=c.BY_SEQ_STORE,l=c.DOC_STORE,h=a.decodeDoc,p=a.decodeMetadata,v=a.fetchAttachmentsIfNecessary,_=a.postProcessAttachments,y=a.openTransactionSafely
t.exports=i},{48:48,51:51,7:7,9:9}],5:[function(e,t,n){"use strict"
function r(e,t){return new o.Promise(function(n,r){var s=i([""],{type:"image/png"})
e.objectStore(a).put(s,"key"),e.oncomplete=function(){var e=t.transaction([a],"readwrite"),i=e.objectStore(a).get("key")
i.onerror=r,i.onsuccess=function(e){var t=e.target.result,r=URL.createObjectURL(t)
o.ajax({url:r,cache:!0,binary:!0},function(e,t){e&&405===e.status?n(!0):(n(!(!t||"image/png"!==t.type)),e&&404===e.status&&o.explain404("PouchDB is just detecting blob URL support.")),URL.revokeObjectURL(r)})}}})["catch"](function(){return!1})}var o=e(84),i=e(32),s=e(7),a=s.DETECT_BLOB_SUPPORT_STORE
t.exports=r},{32:32,7:7,84:84}],6:[function(e,t,n){"use strict"
function r(e,t,n,r,u,f){function w(){var e=[p,h,l,_,v,d],t=E(r,e,"readwrite")
return t.error?f(t.error):(N=t.txn,N.onerror=b(f),N.ontimeout=b(f),N.oncomplete=x,L=N.objectStore(p),j=N.objectStore(h),B=N.objectStore(l),F=N.objectStore(d),void k(function(e){return e?(W=!0,f(e)):void T()}))}function S(){a(P,n,G,N,V,A,t)}function T(){function e(){++n===P.length&&S()}function t(t){var n=m(t.target.result)
n&&G.set(n.id,n),e()}if(P.length)for(var n=0,r=0,o=P.length;o>r;r++){var i=P[r]
if(i._id&&c(i._id))e()
else{var s=L.get(i.metadata.id)
s.onsuccess=t}}}function x(){W||(u.notify(n._meta.name),n._meta.docCount+=U,f(null,V))}function O(e,t){var n=B.get(e)
n.onsuccess=function(n){if(n.target.result)t()
else{var r=i.error(i.MISSING_STUB,"unknown stub attachment with digest "+e)
r.status=412,t(r)}}}function k(e){function t(){++o===n.length&&e(r)}var n=[]
if(P.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t]
r.stub&&n.push(r.digest)})}),!n.length)return e()
var r,o=0
n.forEach(function(e){O(e,function(e){e&&!r&&(r=e),t()})})}function A(e,t,n,r,o,i,s,a){U+=i,e.metadata.winningRev=t,e.metadata.deleted=n
var c=e.data
c._id=e.metadata.id,c._rev=e.metadata.rev,r&&(c._deleted=!0)
var u=c._attachments&&Object.keys(c._attachments).length
return u?C(e,t,n,o,s,a):void R(e,t,n,o,s,a)}function q(e){var t=o.compactTree(e.metadata)
y(t,e.metadata.id,N)}function R(e,t,r,o,i,s){function a(i){o&&n.auto_compaction&&q(e),d.seq=i.target.result,delete d.rev
var s=g(d,t,r),a=L.put(s)
a.onsuccess=u}function c(e){e.preventDefault(),e.stopPropagation()
var t=j.index("_doc_id_rev"),n=t.getKey(f._doc_id_rev)
n.onsuccess=function(e){var t=j.put(f,e.target.result)
t.onsuccess=a}}function u(){V[i]={ok:!0,id:d.id,rev:t},G.set(e.metadata.id,e.metadata),I(e,d.seq,s)}var f=e.data,d=e.metadata
f._doc_id_rev=d.id+"::"+d.rev,delete f._id,delete f._rev
var l=j.put(f)
l.onsuccess=a,l.onerror=c}function C(e,t,n,r,o,i){function s(){u===f.length&&R(e,t,n,r,o,i)}function a(){u++,s()}var c=e.data,u=0,f=Object.keys(c._attachments)
f.forEach(function(t){var n=e.data._attachments[t]
if(n.stub)u++,s()
else{var r=n.data
delete n.data
var o=n.digest
D(o,r,a)}})}function I(e,t,n){function r(){++i===s.length&&n()}function o(n){var o=e.data._attachments[n].digest,i=F.put({seq:t,digestSeq:o+"::"+t})
i.onsuccess=r,i.onerror=function(e){e.preventDefault(),e.stopPropagation(),r()}}var i=0,s=Object.keys(e.data._attachments||{})
if(!s.length)return n()
for(var a=0;a<s.length;a++)o(s[a])}function D(e,t,n){var r=B.count(e)
r.onsuccess=function(r){var o=r.target.result
if(o)return n()
var i={digest:e,body:t},s=B.put(i)
s.onsuccess=n}}for(var N,L,j,B,F,M,P=e.docs,U=0,H=0,J=P.length;J>H;H++){var Q=P[H]
Q._id&&c(Q._id)||(Q=P[H]=o.parseDoc(Q,t.new_edits),Q.error&&!M&&(M=Q))}if(M)return f(M)
var V=new Array(P.length),G=new o.Map,W=!1,K=n._meta.blobSupport?"blob":"base64"
s(P,K,function(e){return e?f(e):void w()})}var o=e(84),i=e(48),s=e(43),a=e(44),c=e(39),u=e(9),f=e(7),d=f.ATTACH_AND_SEQ_STORE,l=f.ATTACH_STORE,h=f.BY_SEQ_STORE,p=f.DOC_STORE,v=f.LOCAL_STORE,_=f.META_STORE,y=u.compactRevs,m=u.decodeMetadata,g=u.encodeMetadata,b=u.idbError,E=u.openTransactionSafely
t.exports=r},{39:39,43:43,44:44,48:48,7:7,84:84,9:9}],7:[function(e,t,n){"use strict"
n.ADAPTER_VERSION=5,n.DOC_STORE="document-store",n.BY_SEQ_STORE="by-sequence",n.ATTACH_STORE="attach-store",n.ATTACH_AND_SEQ_STORE="attach-seq-store",n.META_STORE="meta-store",n.LOCAL_STORE="local-store",n.DETECT_BLOB_SUPPORT_STORE="detect-blob-support"},{}],8:[function(e,t,n){(function(n){"use strict"
function r(e,t){var n=this
L.queue.push({action:function(t){o(n,e,t)},callback:t}),O()}function o(e,t,o){function f(e){var t=e.createObjectStore(S,{keyPath:"id"})
e.createObjectStore(E,{autoIncrement:!0}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0}),e.createObjectStore(b,{keyPath:"digest"}),e.createObjectStore(x,{keyPath:"id",autoIncrement:!1}),e.createObjectStore(w),t.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),e.createObjectStore(T,{keyPath:"_id"})
var n=e.createObjectStore(g,{autoIncrement:!0})
n.createIndex("seq","seq"),n.createIndex("digestSeq","digestSeq",{unique:!0})}function d(e,t){var n=e.objectStore(S)
n.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),n.openCursor().onsuccess=function(e){var r=e.target.result
if(r){var o=r.value,i=a(o)
o.deletedOrLocal=i?"1":"0",n.put(o),r["continue"]()}else t()}}function O(e){e.createObjectStore(T,{keyPath:"_id"}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0})}function L(e,t){var n=e.objectStore(T),r=e.objectStore(S),o=e.objectStore(E),i=r.openCursor()
i.onsuccess=function(e){var i=e.target.result
if(i){var s=i.value,a=s.id,u=c(a),f=_(s)
if(u){var d=a+"::"+f,l=a+"::",h=a+"::~",p=o.index("_doc_id_rev"),v=IDBKeyRange.bound(l,h,!1,!1),y=p.openCursor(v)
y.onsuccess=function(e){if(y=e.target.result){var t=y.value
t._doc_id_rev===d&&n.put(t),o["delete"](y.primaryKey),y["continue"]()}else r["delete"](i.primaryKey),i["continue"]()}}else i["continue"]()}else t&&t()}}function F(e){var t=e.createObjectStore(g,{autoIncrement:!0})
t.createIndex("seq","seq"),t.createIndex("digestSeq","digestSeq",{unique:!0})}function M(e,t){var n=e.objectStore(E),r=e.objectStore(b),o=e.objectStore(g),i=r.count()
i.onsuccess=function(e){var r=e.target.result
return r?void(n.openCursor().onsuccess=function(e){var n=e.target.result
if(!n)return t()
for(var r=n.value,i=n.primaryKey,s=Object.keys(r._attachments||{}),a={},c=0;c<s.length;c++){var u=r._attachments[s[c]]
a[u.digest]=!0}var f=Object.keys(a)
for(c=0;c<f.length;c++){var d=f[c]
o.put({seq:i,digestSeq:d+"::"+i})}n["continue"]()}):t()}}function P(e){function t(e){return e.data?q(e):(e.deleted="1"===e.deletedOrLocal,e)}var n=e.objectStore(E),r=e.objectStore(S),o=r.openCursor()
o.onsuccess=function(e){function o(){var e=a.id+"::",t=a.id+"::￿",r=n.index("_doc_id_rev").openCursor(IDBKeyRange.bound(e,t)),o=0
r.onsuccess=function(e){var t=e.target.result
if(!t)return a.seq=o,i()
var n=t.primaryKey
n>o&&(o=n),t["continue"]()}}function i(){var e=R(a,a.winningRev,a.deleted),t=r.put(e)
t.onsuccess=function(){s["continue"]()}}var s=e.target.result
if(s){var a=t(s.value)
return a.winningRev=a.winningRev||_(a),a.seq?i():void o()}}}var U=t.name,H=null
e._meta=null,e.type=function(){return"idb"},e._id=s.toPromise(function(t){t(null,e._meta.instanceId)}),e._bulkDocs=function(t,n,o){l(t,n,e,H,r.Changes,o)},e._get=function(e,t,n){function r(){n(s,{doc:o,metadata:i,ctx:c})}var o,i,s,c=t.ctx
if(!c){var f=j(H,[S,E,b],"readonly")
if(f.error)return n(f.error)
c=f.txn}c.objectStore(S).get(e).onsuccess=function(e){if(i=q(e.target.result),!i)return s=u.error(u.MISSING_DOC,"missing"),r()
if(a(i)&&!t.rev)return s=u.error(u.MISSING_DOC,"deleted"),r()
var n=c.objectStore(E),f=t.rev||i.winningRev,d=i.id+"::"+f
n.index("_doc_id_rev").get(d).onsuccess=function(e){return o=e.target.result,o&&(o=A(o)),o?void r():(s=u.error(u.MISSING_DOC,"missing"),r())}}},e._getAttachment=function(e,t,n){var r
if(t.ctx)r=t.ctx
else{var o=j(H,[S,E,b],"readonly")
if(o.error)return n(o.error)
r=o.txn}var i=e.digest,s=e.content_type
r.objectStore(b).get(i).onsuccess=function(e){var r=e.target.result.body
N(r,s,t.binary,function(e){n(null,e)})}},e._info=function(t){if(null===H||!B[U]){var n=new Error("db isn't open")
return n.id="idbNull",t(n)}var r,o,i=j(H,[E],"readonly")
if(i.error)return t(i.error)
var s=i.txn,a=s.objectStore(E).openCursor(null,"prev")
a.onsuccess=function(t){var n=t.target.result
r=n?n.key:0,o=e._meta.docCount},s.oncomplete=function(){t(null,{doc_count:o,update_seq:r,idb_attachment_format:e._meta.blobSupport?"binary":"base64"})}},e._allDocs=function(t,n){h(t,e,H,n)},e._changes=function(t){function n(e){function n(){return a.seq!==s?e["continue"]():(f=s,a.winningRev===i._rev?o(i):void r())}function r(){var e=i._id+"::"+a.winningRev,t=_.get(e)
t.onsuccess=function(e){o(A(e.target.result))}}function o(n){var r=t.processChange(n,a,t)
r.seq=a.seq
var o=g(r)
return"object"==typeof o?t.complete(o):(o&&(m++,l&&y.push(r),t.attachments&&t.include_docs?C(n,t,h,function(){D([r],t.binary).then(function(){t.onChange(r)})}):t.onChange(r)),void(m!==d&&e["continue"]()))}var i=A(e.value),s=e.key
if(u&&!u.has(i._id))return e["continue"]()
var a
return(a=w.get(i._id))?n():void(v.get(i._id).onsuccess=function(e){a=q(e.target.result),w.set(i._id,a),n()})}function o(e){var t=e.target.result
t&&n(t)}function i(){var e=[S,E]
t.attachments&&e.push(b)
var n=j(H,e,"readonly")
if(n.error)return t.complete(n.error)
h=n.txn,h.onerror=I(t.complete),h.oncomplete=a,p=h.objectStore(E),v=h.objectStore(S),_=p.index("_doc_id_rev")
var r
r=t.descending?p.openCursor(null,"prev"):p.openCursor(IDBKeyRange.lowerBound(t.since,!0)),r.onsuccess=o}function a(){function e(){t.complete(null,{results:y,last_seq:f})}!t.continuous&&t.attachments?D(y).then(e):e()}if(t=s.clone(t),t.continuous){var c=U+":"+s.uuid()
return r.Changes.addListener(U,c,e,t),r.Changes.notify(U),{cancel:function(){r.Changes.removeListener(U,c)}}}var u=t.doc_ids&&new s.Set(t.doc_ids)
t.since=t.since||0
var f=t.since,d="limit"in t?t.limit:-1
0===d&&(d=1)
var l
l="returnDocs"in t?t.returnDocs:!0
var h,p,v,_,y=[],m=0,g=s.filterChange(t),w=new s.Map
i()},e._close=function(e){return null===H?e(u.error(u.NOT_OPEN)):(H.close(),delete B[U],H=null,void e())},e._getRevisionTree=function(e,t){var n=j(H,[S],"readonly")
if(n.error)return t(n.error)
var r=n.txn,o=r.objectStore(S).get(e)
o.onsuccess=function(e){var n=q(e.target.result)
n?t(null,n.rev_tree):t(u.error(u.MISSING_DOC))}},e._doCompaction=function(e,t,n){var r=[S,E,b,g],o=j(H,r,"readwrite")
if(o.error)return n(o.error)
var i=o.txn,s=i.objectStore(S)
s.get(e).onsuccess=function(n){var r=q(n.target.result)
y(r.rev_tree,function(e,n,r,o,i){var s=n+"-"+r;-1!==t.indexOf(s)&&(i.status="missing")}),k(t,e,i)
var o=r.winningRev,s=r.deleted
i.objectStore(S).put(R(r,o,s))},i.onerror=I(n),i.oncomplete=function(){n()}},e._getLocal=function(e,t){var n=j(H,[T],"readonly")
if(n.error)return t(n.error)
var r=n.txn,o=r.objectStore(T).get(e)
o.onerror=I(t),o.onsuccess=function(e){var n=e.target.result
n?(delete n._doc_id_rev,t(null,n)):t(u.error(u.MISSING_DOC))}},e._putLocal=function(e,t,n){"function"==typeof t&&(n=t,t={}),delete e._revisions
var r=e._rev,o=e._id
r?e._rev="0-"+(parseInt(r.split("-")[1],10)+1):e._rev="0-1"
var i,s=t.ctx
if(!s){var a=j(H,[T],"readwrite")
if(a.error)return n(a.error)
s=a.txn,s.onerror=I(n),s.oncomplete=function(){i&&n(null,i)}}var c,f=s.objectStore(T)
r?(c=f.get(o),c.onsuccess=function(o){var s=o.target.result
if(s&&s._rev===r){var a=f.put(e)
a.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)}}else n(u.error(u.REV_CONFLICT))}):(c=f.add(e),c.onerror=function(e){n(u.error(u.REV_CONFLICT)),e.preventDefault(),e.stopPropagation()},c.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)})},e._removeLocal=function(e,t,n){"function"==typeof t&&(n=t,t={})
var r=t.ctx
if(!r){var o=j(H,[T],"readwrite")
if(o.error)return n(o.error)
r=o.txn,r.oncomplete=function(){i&&n(null,i)}}var i,s=e._id,a=r.objectStore(T),c=a.get(s)
c.onerror=I(n),c.onsuccess=function(r){var o=r.target.result
o&&o._rev===e._rev?(a["delete"](s),i={ok:!0,id:s,rev:"0-0"},t.ctx&&n(null,i)):n(u.error(u.MISSING_DOC))}},e._destroy=function(e,t){r.Changes.removeAllListeners(U),r.openReqList[U]&&r.openReqList[U].result&&(r.openReqList[U].result.close(),delete B[U])
var n=indexedDB.deleteDatabase(U)
n.onsuccess=function(){r.openReqList[U]&&(r.openReqList[U]=null),v()&&U in localStorage&&delete localStorage[U],t(null,{ok:!0})},n.onerror=I(t)}
var J=B[U]
if(J)return H=J.idb,e._meta=J.global,void n.nextTick(function(){o(null,e)})
var Q=indexedDB.open(U,m)
"openReqList"in r||(r.openReqList={}),r.openReqList[U]=Q,Q.onupgradeneeded=function(e){function t(){var e=o[i-1]
i++,e&&e(r,t)}var n=e.target.result
if(e.oldVersion<1)return f(n)
var r=e.currentTarget.transaction
e.oldVersion<3&&O(n),e.oldVersion<4&&F(n)
var o=[d,L,M,P],i=e.oldVersion
t()},Q.onsuccess=function(t){H=t.target.result,H.onversionchange=function(){H.close(),delete B[U]},H.onabort=function(){H.close(),delete B[U]}
var n=H.transaction([x,w,S],"readwrite"),r=n.objectStore(x).get(x),a=null,c=null,u=null
r.onsuccess=function(t){var r=function(){null!==a&&null!==c&&null!==u&&(e._meta={name:U,instanceId:u,blobSupport:a,docCount:c},B[U]={idb:H,global:e._meta},o(null,e))},f=t.target.result||{id:x}
U+"_id"in f?(u=f[U+"_id"],r()):(u=s.uuid(),f[U+"_id"]=u,n.objectStore(x).put(f).onsuccess=function(){r()}),i||(i=p(n,H)),i.then(function(e){a=e,r()})
var d=n.objectStore(S).index("deletedOrLocal")
d.count(IDBKeyRange.only("0")).onsuccess=function(e){c=e.target.result,r()}}},Q.onerror=function(e){var t="Failed to open indexedDB, are you in private browsing mode?"
console.error(t),o(u.error(u.IDB_ERROR,t))}}var i,s=e(84),a=e(38),c=e(39),u=e(48),f=e(9),d=e(7),l=e(6),h=e(4),p=e(5),v=e(46),_=e(57),y=e(56),m=d.ADAPTER_VERSION,g=d.ATTACH_AND_SEQ_STORE,b=d.ATTACH_STORE,E=d.BY_SEQ_STORE,w=d.DETECT_BLOB_SUPPORT_STORE,S=d.DOC_STORE,T=d.LOCAL_STORE,x=d.META_STORE,O=f.applyNext,k=f.compactRevs,A=f.decodeDoc,q=f.decodeMetadata,R=f.encodeMetadata,C=f.fetchAttachmentsIfNecessary,I=f.idbError,D=f.postProcessAttachments,N=f.readBlobData,L=f.taskQueue,j=f.openTransactionSafely,B={}
r.valid=function(){var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform)
return!e&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange},r.Changes=new s.Changes,t.exports=r}).call(this,e(88))},{38:38,39:39,4:4,46:46,48:48,5:5,56:56,57:57,6:6,7:7,84:84,88:88,9:9}],9:[function(e,t,n){(function(t){"use strict"
function r(e,t,n){try{e.apply(t,n)}catch(r){"undefined"!=typeof PouchDB&&PouchDB.emit("error",r)}}var o=e(48),i=e(84),s=e(28),a=s.btoa,c=e(7),u=e(36),f=e(29),d=e(32)
n.taskQueue={running:!1,queue:[]},n.applyNext=function(){if(!n.taskQueue.running&&n.taskQueue.queue.length){n.taskQueue.running=!0
var e=n.taskQueue.queue.shift()
e.action(function(o,i){r(e.callback,this,[o,i]),n.taskQueue.running=!1,t.nextTick(n.applyNext)})}},n.idbError=function(e){return function(t){var n=t.target&&t.target.error&&t.target.error.name||t.target
e(o.error(o.IDB_ERROR,n,t.type))}},n.encodeMetadata=function(e,t,n){return{data:i.safeJsonStringify(e),winningRev:t,deletedOrLocal:n?"1":"0",seq:e.seq,id:e.id}},n.decodeMetadata=function(e){if(!e)return null
var t=i.safeJsonParse(e.data)
return t.winningRev=e.winningRev,t.deleted="1"===e.deletedOrLocal,t.seq=e.seq,t},n.decodeDoc=function(e){if(!e)return e
var t=e._doc_id_rev.lastIndexOf(":")
return e._id=e._doc_id_rev.substring(0,t-1),e._rev=e._doc_id_rev.substring(t+1),delete e._doc_id_rev,e},n.readBlobData=function(e,t,n,r){n?r(e?"string"!=typeof e?e:f(e,t):d([""],{type:t})):e?"string"!=typeof e?u(e,function(e){r(a(e))}):r(e):r("")},n.fetchAttachmentsIfNecessary=function(e,t,n,r){function o(){++a===s.length&&r&&r()}function i(e,t){var r=e._attachments[t],i=r.digest,s=n.objectStore(c.ATTACH_STORE).get(i)
s.onsuccess=function(e){r.body=e.target.result.body,o()}}var s=Object.keys(e._attachments||{})
if(!s.length)return r&&r()
var a=0
s.forEach(function(n){t.attachments&&t.include_docs?i(e,n):(e._attachments[n].stub=!0,o())})},n.postProcessAttachments=function(e,t){return i.Promise.all(e.map(function(e){if(e.doc&&e.doc._attachments){var r=Object.keys(e.doc._attachments)
return i.Promise.all(r.map(function(r){var o=e.doc._attachments[r]
if("body"in o){var s=o.body,a=o.content_type
return new i.Promise(function(c){n.readBlobData(s,a,t,function(t){e.doc._attachments[r]=i.extend(i.pick(o,["digest","content_type"]),{data:t}),c()})})}}))}}))},n.compactRevs=function(e,t,n){function r(){f--,f||o()}function o(){i.length&&i.forEach(function(e){var t=u.index("digestSeq").count(IDBKeyRange.bound(e+"::",e+"::￿",!1,!1))
t.onsuccess=function(t){var n=t.target.result
n||a["delete"](e)}})}var i=[],s=n.objectStore(c.BY_SEQ_STORE),a=n.objectStore(c.ATTACH_STORE),u=n.objectStore(c.ATTACH_AND_SEQ_STORE),f=e.length
e.forEach(function(e){var n=s.index("_doc_id_rev"),o=t+"::"+e
n.getKey(o).onsuccess=function(e){var t=e.target.result
if("number"!=typeof t)return r()
s["delete"](t)
var n=u.index("seq").openCursor(IDBKeyRange.only(t))
n.onsuccess=function(e){var t=e.target.result
if(t){var n=t.value.digestSeq.split("::")[0]
i.push(n),u["delete"](t.primaryKey),t["continue"]()}else r()}}})},n.openTransactionSafely=function(e,t,n){try{return{txn:e.transaction(t,n)}}catch(r){return{error:r}}}}).call(this,e(88))},{28:28,29:29,32:32,36:36,48:48,7:7,84:84,88:88}],10:[function(e,t,n){"use strict"
function r(e,t,n,r,f,g){function b(){return I?g(I):(f.notify(n._name),n._docCount=-1,void g(null,D))}function E(e,t){var n="SELECT count(*) as cnt FROM "+h+" WHERE digest=?"
C.executeSql(n,[e],function(n,r){if(0===r.rows.item(0).cnt){var o=i.error(i.MISSING_STUB,"unknown stub attachment with digest "+e)
t(o)}else t()})}function w(e){function t(){++o===n.length&&e(r)}var n=[]
if(q.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t]
r.stub&&n.push(r.digest)})}),!n.length)return e()
var r,o=0
n.forEach(function(e){E(e,function(e){e&&!r&&(r=e),t()})})}function S(e,t,r,i,s,a,c,u){function f(){function t(e,t){function r(){return++i===s.length&&t(),!1}function o(t){var o="INSERT INTO "+p+" (digest, seq) VALUES (?,?)",i=[n._attachments[t].digest,e]
C.executeSql(o,i,r,r)}var i=0,s=Object.keys(n._attachments||{})
if(!s.length)return t()
for(var a=0;a<s.length;a++)o(s[a])}var n=e.data,r=i?1:0,o=n._id,s=n._rev,a=_(n),c="INSERT INTO "+l+" (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);",u=[o,s,a,r]
C.executeSql(c,u,function(e,n){var r=n.insertId
t(r,function(){b(e,r)})},function(){var e=v("seq",l,null,"doc_id=? AND rev=?")
return C.executeSql(e,[o,s],function(e,n){var i=n.rows.item(0).seq,c="UPDATE "+l+" SET json=?, deleted=? WHERE doc_id=? AND rev=?;",u=[a,r,o,s]
e.executeSql(c,u,function(e){t(i,function(){b(e,i)})})}),!1})}function h(e){E||(e?(E=e,u(E)):w===S.length&&f())}function m(e){w++,h(e)}function g(){if(s&&n.auto_compaction){var t=e.metadata.id,r=o.compactTree(e.metadata)
y(r,t,C)}}function b(n,r){g(),e.metadata.seq=r,delete e.metadata.rev
var i=s?"UPDATE "+d+" SET json=?, max_seq=?, winningseq=(SELECT seq FROM "+l+" WHERE doc_id="+d+".id AND rev=?) WHERE id=?":"INSERT INTO "+d+" (id, winningseq, max_seq, json) VALUES (?,?,?,?);",a=o.safeJsonStringify(e.metadata),f=e.metadata.id,h=s?[a,r,t,f]:[f,r,r,a]
n.executeSql(i,h,function(){D[c]={ok:!0,id:e.metadata.id,rev:t},N.set(f,e.metadata),u()})}var E=null,w=0
e.data._id=e.metadata.id,e.data._rev=e.metadata.rev
var S=Object.keys(e.data._attachments||{})
i&&(e.data._deleted=!0),S.forEach(function(t){var n=e.data._attachments[t]
if(n.stub)w++,h()
else{var r=n.data
delete n.data
var o=n.digest
O(o,r,m)}}),S.length||f()}function T(){c(q,n,N,C,D,S,t)}function x(e){function t(){++n===q.length&&e()}if(!q.length)return e()
var n=0
q.forEach(function(e){if(e._id&&a(e._id))return t()
var n=e.metadata.id
C.executeSql("SELECT json FROM "+d+" WHERE id = ?",[n],function(e,r){if(r.rows.length){var i=o.safeJsonParse(r.rows.item(0).json)
N.set(n,i)}t()})})}function O(e,t,n){var r="SELECT digest FROM "+h+" WHERE digest=?"
C.executeSql(r,[e],function(o,i){return i.rows.length?n():(r="INSERT INTO "+h+" (digest, body, escaped) VALUES (?,?,1)",void o.executeSql(r,[e,u.escapeBlob(t)],function(){n()},function(){return n(),!1}))})}var k=t.new_edits,A=e.docs,q=A.map(function(e){if(e._id&&a(e._id))return e
var t=o.parseDoc(e,k)
return t}),R=q.filter(function(e){return e.error})
if(R.length)return g(R[0])
var C,I,D=new Array(q.length),N=new o.Map
s(q,"binary",function(e){return e?g(e):void r.transaction(function(e){C=e,w(function(e){e?I=e:x(T)})},m(g),b)})}var o=e(84),i=e(48),s=e(43),a=e(39),c=e(44),u=e(13),f=e(11),d=f.DOC_STORE,l=f.BY_SEQ_STORE,h=f.ATTACH_STORE,p=f.ATTACH_AND_SEQ_STORE,v=u.select,_=u.stringifyDoc,y=u.compactRevs,m=u.unknownError
t.exports=r},{11:11,13:13,39:39,43:43,44:44,48:48,84:84}],11:[function(e,t,n){"use strict"
function r(e){return"'"+e+"'"}n.ADAPTER_VERSION=7,n.DOC_STORE=r("document-store"),n.BY_SEQ_STORE=r("by-sequence"),n.ATTACH_STORE=r("attach-store"),n.LOCAL_STORE=r("local-store"),n.META_STORE=r("metadata-store"),n.ATTACH_AND_SEQ_STORE=r("attach-seq-store")},{}],12:[function(e,t,n){"use strict"
function r(e,t,n,r,o){function s(){++u===c.length&&o&&o()}function a(e,o){var a=e._attachments[o],c={binary:t.binary,ctx:r}
n._getAttachment(a,c,function(t,n){e._attachments[o]=i.extend(i.pick(a,["digest","content_type"]),{data:n}),s()})}var c=Object.keys(e._attachments||{})
if(!c.length)return o&&o()
var u=0
c.forEach(function(n){t.attachments&&t.include_docs?a(e,n):(e._attachments[n].stub=!0,s())})}function o(e,t){function n(){d()&&(window.localStorage["_pouch__websqldb_"+$._name]=!0),t(null,$)}function p(e,t){e.executeSql(L),e.executeSql("ALTER TABLE "+g+" ADD COLUMN deleted TINYINT(1) DEFAULT 0",[],function(){e.executeSql(D),e.executeSql("ALTER TABLE "+m+" ADD COLUMN local TINYINT(1) DEFAULT 0",[],function(){e.executeSql("CREATE INDEX IF NOT EXISTS 'doc-store-local-idx' ON "+m+" (local, id)")
var n="SELECT "+m+".winningseq AS seq, "+m+".json AS metadata FROM "+g+" JOIN "+m+" ON "+g+".seq = "+m+".winningseq"
e.executeSql(n,[],function(e,n){for(var r=[],o=[],i=0;i<n.rows.length;i++){var c=n.rows.item(i),u=c.seq,f=JSON.parse(c.metadata)
s(f)&&r.push(u),a(f.id)&&o.push(f.id)}e.executeSql("UPDATE "+m+"SET local = 1 WHERE id IN "+T(o.length),o,function(){e.executeSql("UPDATE "+g+" SET deleted = 1 WHERE seq IN "+T(r.length),r,t)})})})})}function P(e,t){var n="CREATE TABLE IF NOT EXISTS "+E+" (id UNIQUE, rev, json)"
e.executeSql(n,[],function(){var n="SELECT "+m+".id AS id, "+g+".json AS data FROM "+g+" JOIN "+m+" ON "+g+".seq = "+m+".winningseq WHERE local = 1"
e.executeSql(n,[],function(e,n){function r(){if(!o.length)return t(e)
var n=o.shift(),i=JSON.parse(n.data)._rev
e.executeSql("INSERT INTO "+E+" (id, rev, json) VALUES (?,?,?)",[n.id,i,n.data],function(e){e.executeSql("DELETE FROM "+m+" WHERE id=?",[n.id],function(e){e.executeSql("DELETE FROM "+g+" WHERE seq=?",[n.seq],function(){r()})})})}for(var o=[],i=0;i<n.rows.length;i++)o.push(n.rows.item(i))
r()})})}function U(e,t){function n(n){function r(){if(!n.length)return t(e)
var o=n.shift(),i=u(o.hex,Y),s=i.lastIndexOf("::"),a=i.substring(0,s),c=i.substring(s+2),f="UPDATE "+g+" SET doc_id=?, rev=? WHERE doc_id_rev=?"
e.executeSql(f,[a,c,i],function(){r()})}r()}var r="ALTER TABLE "+g+" ADD COLUMN doc_id"
e.executeSql(r,[],function(e){var t="ALTER TABLE "+g+" ADD COLUMN rev"
e.executeSql(t,[],function(e){e.executeSql(N,[],function(e){var t="SELECT hex(doc_id_rev) as hex FROM "+g
e.executeSql(t,[],function(e,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o))
n(r)})})})})}function H(e,t){function n(e){var n="SELECT COUNT(*) AS cnt FROM "+b
e.executeSql(n,[],function(e,n){function r(){var n=k(M+", "+m+".id AS id",[m,g],F,null,m+".id ")
n+=" LIMIT "+s+" OFFSET "+i,i+=s,e.executeSql(n,[],function(e,n){function o(e,t){var n=i[e]=i[e]||[];-1===n.indexOf(t)&&n.push(t)}if(!n.rows.length)return t(e)
for(var i={},s=0;s<n.rows.length;s++)for(var a=n.rows.item(s),c=O(a.data,a.id,a.rev),u=Object.keys(c._attachments||{}),f=0;f<u.length;f++){var d=c._attachments[u[f]]
o(d.digest,a.seq)}var l=[]
if(Object.keys(i).forEach(function(e){var t=i[e]
t.forEach(function(t){l.push([e,t])})}),!l.length)return r()
var h=0
l.forEach(function(t){var n="INSERT INTO "+S+" (digest, seq) VALUES (?,?)"
e.executeSql(n,t,function(){++h===l.length&&r()})})})}var o=n.rows.item(0).cnt
if(!o)return t(e)
var i=0,s=10
r()})}var r="CREATE TABLE IF NOT EXISTS "+S+" (digest, seq INTEGER)"
e.executeSql(r,[],function(e){e.executeSql(B,[],function(e){e.executeSql(j,[],n)})})}function J(e,t){var n="ALTER TABLE "+b+" ADD COLUMN escaped TINYINT(1) DEFAULT 0"
e.executeSql(n,[],t)}function Q(e,t){var n="ALTER TABLE "+m+" ADD COLUMN max_seq INTEGER"
e.executeSql(n,[],function(e){var n="UPDATE "+m+" SET max_seq=(SELECT MAX(seq) FROM "+g+" WHERE doc_id=id)"
e.executeSql(n,[],function(e){var n="CREATE UNIQUE INDEX IF NOT EXISTS 'doc-max-seq-idx' ON "+m+" (max_seq)"
e.executeSql(n,[],t)})})}function V(e,t){e.executeSql('SELECT HEX("a") AS hex',[],function(e,n){var r=n.rows.item(0).hex
Y=2===r.length?"UTF-8":"UTF-16",t()})}function G(){for(;te.length>0;){var e=te.pop()
e(null,Z)}}function W(e,t){if(0===t){var n="CREATE TABLE IF NOT EXISTS "+w+" (dbid, db_version INTEGER)",r="CREATE TABLE IF NOT EXISTS "+b+" (digest UNIQUE, escaped TINYINT(1), body BLOB)",o="CREATE TABLE IF NOT EXISTS "+S+" (digest, seq INTEGER)",s="CREATE TABLE IF NOT EXISTS "+m+" (id unique, json, winningseq, max_seq INTEGER UNIQUE)",a="CREATE TABLE IF NOT EXISTS "+g+" (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, json, deleted TINYINT(1), doc_id, rev)",c="CREATE TABLE IF NOT EXISTS "+E+" (id UNIQUE, rev, json)"
e.executeSql(r),e.executeSql(c),e.executeSql(o,[],function(){e.executeSql(j),e.executeSql(B)}),e.executeSql(s,[],function(){e.executeSql(L),e.executeSql(a,[],function(){e.executeSql(D),e.executeSql(N),e.executeSql(n,[],function(){var t="INSERT INTO "+w+" (db_version, dbid) VALUES (?,?)"
Z=i.uuid()
var n=[y,Z]
e.executeSql(t,n,function(){G()})})})})}else{var u=function(){var n=y>t
n&&e.executeSql("UPDATE "+w+" SET db_version = "+y)
var r="SELECT dbid FROM "+w
e.executeSql(r,[],function(e,t){Z=t.rows.item(0).dbid,G()})},f=[p,P,U,H,J,Q,u],d=t,l=function(e){f[d-1](e,l),d++}
l(e)}}function K(){ne.transaction(function(e){V(e,function(){z(e)})},q(t),n)}function z(e){var t="SELECT sql FROM sqlite_master WHERE tbl_name = "+w
e.executeSql(t,[],function(e,t){t.rows.length?/db_version/.test(t.rows.item(0).sql)?e.executeSql("SELECT db_version FROM "+w,[],function(e,t){var n=t.rows.item(0).db_version
W(e,n)}):e.executeSql("ALTER TABLE "+w+" ADD COLUMN db_version INTEGER",[],function(){W(e,1)}):W(e,0)})}function X(e,t){if(-1!==$._docCount)return t($._docCount)
var n=k("COUNT("+m+".id) AS 'num'",[m,g],F,g+".deleted=0")
e.executeSql(n,[],function(e,n){$._docCount=n.rows.item(0).num,t($._docCount)})}var Y,$=this,Z=null,ee=R(e),te=[]
$._docCount=-1,$._name=e.name
var ne=C({name:$._name,version:I,description:$._name,size:ee,location:e.location,createFromLocation:e.createFromLocation,androidDatabaseImplementation:e.androidDatabaseImplementation})
return ne?("function"!=typeof ne.readTransaction&&(ne.readTransaction=ne.transaction),i.isCordova()?window.addEventListener($._name+"_pouch",function re(){window.removeEventListener($._name+"_pouch",re,!1),K()},!1):K(),$.type=function(){return"websql"},$._id=i.toPromise(function(e){e(null,Z)}),$._info=function(e){ne.readTransaction(function(t){X(t,function(n){var r="SELECT MAX(seq) AS seq FROM "+g
t.executeSql(r,[],function(t,r){var o=r.rows.item(0).seq||0
e(null,{doc_count:n,update_seq:o,sqlite_plugin:ne._sqlitePlugin,websql_encoding:Y})})})},q(e))},$._bulkDocs=function(e,t,n){_(e,t,$,ne,o.Changes,n)},$._get=function(e,t,n){function r(){n(a,{doc:o,metadata:s,ctx:u})}var o,s,a,u=t.ctx
if(!u)return ne.readTransaction(function(r){$._get(e,i.extend({ctx:r},t),n)})
var f,d
t.rev?(f=k(M,[m,g],m+".id="+g+".doc_id",[g+".doc_id=?",g+".rev=?"]),d=[e,t.rev]):(f=k(M,[m,g],F,m+".id=?"),d=[e]),u.executeSql(f,d,function(e,n){if(!n.rows.length)return a=c.error(c.MISSING_DOC,"missing"),r()
var u=n.rows.item(0)
return s=i.safeJsonParse(u.metadata),u.deleted&&!t.rev?(a=c.error(c.MISSING_DOC,"deleted"),r()):(o=O(u.data,s.id,u.rev),void r())})},$._allDocs=function(e,t){var n,o=[],s="startkey"in e?e.startkey:!1,a="endkey"in e?e.endkey:!1,c="key"in e?e.key:!1,u="descending"in e?e.descending:!1,f="limit"in e?e.limit:-1,d="skip"in e?e.skip:0,h=e.inclusive_end!==!1,p=[],v=[]
if(c!==!1)v.push(m+".id = ?"),p.push(c)
else if(s!==!1||a!==!1){if(s!==!1&&(v.push(m+".id "+(u?"<=":">=")+" ?"),p.push(s)),a!==!1){var _=u?">":"<"
h&&(_+="="),v.push(m+".id "+_+" ?"),p.push(a)}c!==!1&&(v.push(m+".id = ?"),p.push(c))}"ok"!==e.deleted&&v.push(g+".deleted = 0"),ne.readTransaction(function(t){X(t,function(s){if(n=s,0!==f){var a=k(M,[m,g],F,v,m+".id "+(u?"DESC":"ASC"))
a+=" LIMIT "+f+" OFFSET "+d,t.executeSql(a,p,function(t,n){for(var s=0,a=n.rows.length;a>s;s++){var c=n.rows.item(s),u=i.safeJsonParse(c.metadata),f=u.id,d=O(c.data,f,c.rev),h=d._rev,p={id:f,key:f,value:{rev:h}}
if(e.include_docs&&(p.doc=d,p.doc._rev=h,e.conflicts&&(p.doc._conflicts=l(u)),r(p.doc,e,$,t)),c.deleted){if("ok"!==e.deleted)continue
p.value.deleted=!0,p.doc=null}o.push(p)}})}})},q(t),function(){t(null,{total_rows:n,offset:e.skip,rows:o})})},$._changes=function(e){function t(){var t=m+".json AS metadata, "+m+".max_seq AS maxSeq, "+g+".json AS winningDoc, "+g+".rev AS winningRev ",n=m+" JOIN "+g,o=m+".id="+g+".doc_id AND "+m+".winningseq="+g+".seq",d=["maxSeq > ?"],l=[e.since]
e.doc_ids&&(d.push(m+".id IN "+T(e.doc_ids.length)),l=l.concat(e.doc_ids))
var h="maxSeq "+(s?"DESC":"ASC"),p=k(t,n,o,d,h),v=i.filterChange(e)
e.view||e.filter||(p+=" LIMIT "+a)
var _=e.since||0
ne.readTransaction(function(t){t.executeSql(p,l,function(t,n){function o(t){return function(){e.onChange(t)}}for(var s=0,d=n.rows.length;d>s;s++){var l=n.rows.item(s),h=i.safeJsonParse(l.metadata)
_=l.maxSeq
var p=O(l.winningDoc,h.id,l.winningRev),y=e.processChange(p,h,e)
y.seq=l.maxSeq
var m=v(y)
if("object"==typeof m)return e.complete(m)
if(m&&(f++,c&&u.push(y),e.attachments&&e.include_docs?r(p,e,$,t,o(y)):o(y)()),f===a)break}})},q(e.complete),function(){e.continuous||e.complete(null,{results:u,last_seq:_})})}if(e=i.clone(e),e.continuous){var n=$._name+":"+i.uuid()
return o.Changes.addListener($._name,n,$,e),o.Changes.notify($._name),{cancel:function(){o.Changes.removeListener($._name,n)}}}var s=e.descending
e.since=e.since&&!s?e.since:0
var a="limit"in e?e.limit:-1
0===a&&(a=1)
var c
c="returnDocs"in e?e.returnDocs:!0
var u=[],f=0
t()},$._close=function(e){e()},$._getAttachment=function(e,t,n){var r,o=t.ctx,s=e.digest,a=e.content_type,c="SELECT escaped, CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM "+b+" WHERE digest=?"
o.executeSql(c,[s],function(e,o){var s=o.rows.item(0),c=s.escaped?v.unescapeBlob(s.body):u(s.body,Y)
r=t.binary?f(c,a):i.btoa(c),n(null,r)})},$._getRevisionTree=function(e,t){ne.readTransaction(function(n){var r="SELECT json AS metadata FROM "+m+" WHERE id = ?"
n.executeSql(r,[e],function(e,n){if(n.rows.length){var r=i.safeJsonParse(n.rows.item(0).metadata)
t(null,r.rev_tree)}else t(c.error(c.MISSING_DOC))})})},$._doCompaction=function(e,t,n){return t.length?void ne.transaction(function(n){var r="SELECT json AS metadata FROM "+m+" WHERE id = ?"
n.executeSql(r,[e],function(n,r){var o=i.safeJsonParse(r.rows.item(0).metadata)
h(o.rev_tree,function(e,n,r,o,i){var s=n+"-"+r;-1!==t.indexOf(s)&&(i.status="missing")})
var s="UPDATE "+m+" SET json = ? WHERE id = ?"
n.executeSql(s,[i.safeJsonStringify(o),e])}),A(t,e,n)},q(n),function(){n()}):n()},$._getLocal=function(e,t){ne.readTransaction(function(n){var r="SELECT json, rev FROM "+E+" WHERE id=?"
n.executeSql(r,[e],function(n,r){if(r.rows.length){var o=r.rows.item(0),i=O(o.json,e,o.rev)
t(null,i)}else t(c.error(c.MISSING_DOC))})})},$._putLocal=function(e,t,n){function r(e){var r,f
i?(r="UPDATE "+E+" SET rev=?, json=? WHERE id=? AND rev=?",f=[o,u,s,i]):(r="INSERT INTO "+E+" (id, rev, json) VALUES (?,?,?)",f=[s,o,u]),e.executeSql(r,f,function(e,r){r.rowsAffected?(a={ok:!0,id:s,rev:o},t.ctx&&n(null,a)):n(c.error(c.REV_CONFLICT))},function(){return n(c.error(c.REV_CONFLICT)),!1})}"function"==typeof t&&(n=t,t={}),delete e._revisions
var o,i=e._rev,s=e._id
o=i?e._rev="0-"+(parseInt(i.split("-")[1],10)+1):e._rev="0-1"
var a,u=x(e)
t.ctx?r(t.ctx):ne.transaction(r,q(n),function(){a&&n(null,a)})},$._removeLocal=function(e,t,n){function r(r){var i="DELETE FROM "+E+" WHERE id=? AND rev=?",s=[e._id,e._rev]
r.executeSql(i,s,function(r,i){return i.rowsAffected?(o={ok:!0,id:e._id,rev:"0-0"},void(t.ctx&&n(null,o))):n(c.error(c.MISSING_DOC))})}"function"==typeof t&&(n=t,t={})
var o
t.ctx?r(t.ctx):ne.transaction(r,q(n),function(){o&&n(null,o)})},void($._destroy=function(e,t){o.Changes.removeAllListeners($._name),ne.transaction(function(e){var t=[m,g,b,w,E,S]
t.forEach(function(t){e.executeSql("DROP TABLE IF EXISTS "+t,[])})},q(t),function(){d()&&(delete window.localStorage["_pouch__websqldb_"+$._name],delete window.localStorage[$._name]),t(null,{ok:!0})})})):t(c.error(c.UNKNOWN_ERROR))}var i=e(84),s=e(38),a=e(39),c=e(48),u=e(59),f=e(31),d=e(46),l=e(51),h=e(56),p=e(11),v=e(13),_=e(10),y=p.ADAPTER_VERSION,m=p.DOC_STORE,g=p.BY_SEQ_STORE,b=p.ATTACH_STORE,E=p.LOCAL_STORE,w=p.META_STORE,S=p.ATTACH_AND_SEQ_STORE,T=v.qMarks,x=v.stringifyDoc,O=v.unstringifyDoc,k=v.select,A=v.compactRevs,q=v.unknownError,R=v.getSize,C=v.openDB,I=1,D="CREATE INDEX IF NOT EXISTS 'by-seq-deleted-idx' ON "+g+" (seq, deleted)",N="CREATE UNIQUE INDEX IF NOT EXISTS 'by-seq-doc-id-rev' ON "+g+" (doc_id, rev)",L="CREATE INDEX IF NOT EXISTS 'doc-winningseq-idx' ON "+m+" (winningseq)",j="CREATE INDEX IF NOT EXISTS 'attach-seq-seq-idx' ON "+S+" (seq)",B="CREATE UNIQUE INDEX IF NOT EXISTS 'attach-seq-digest-idx' ON "+S+" (digest, seq)",F=g+".seq = "+m+".winningseq",M=g+".seq AS seq, "+g+".deleted AS deleted, "+g+".json AS data, "+g+".rev AS rev, "+m+".json AS metadata"
o.valid=v.valid,o.Changes=new i.Changes,t.exports=o},{10:10,11:11,13:13,31:31,38:38,39:39,46:46,48:48,51:51,56:56,59:59,84:84}],13:[function(e,t,n){"use strict"
function r(e){return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"")}function o(e){return e.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,"")}function i(e){return delete e._id,delete e._rev,JSON.stringify(e)}function s(e,t,n){return e=JSON.parse(e),e._id=t,e._rev=n,e}function a(e){for(var t="(";e--;)t+="?",e&&(t+=",")
return t+")"}function c(e,t,n,r,o){return"SELECT "+e+" FROM "+("string"==typeof t?t:t.join(" JOIN "))+(n?" ON "+n:"")+(r?" WHERE "+("string"==typeof r?r:r.join(" AND ")):"")+(o?" ORDER BY "+o:"")}function u(e,t,n){function r(){++i===e.length&&o()}function o(){if(s.length){var e="SELECT DISTINCT digest AS digest FROM "+b+" WHERE seq IN "+a(s.length)
n.executeSql(e,s,function(e,t){for(var n=[],r=0;r<t.rows.length;r++)n.push(t.rows.item(r).digest)
if(n.length){var o="DELETE FROM "+b+" WHERE seq IN ("+s.map(function(){return"?"}).join(",")+")"
e.executeSql(o,s,function(e){var t="SELECT digest FROM "+b+" WHERE digest IN ("+n.map(function(){return"?"}).join(",")+")"
e.executeSql(t,n,function(e,t){for(var r=new v.Set,o=0;o<t.rows.length;o++)r.add(t.rows.item(o).digest)
n.forEach(function(t){r.has(t)||(e.executeSql("DELETE FROM "+b+" WHERE digest=?",[t]),e.executeSql("DELETE FROM "+g+" WHERE digest=?",[t]))})})})}})}}if(e.length){var i=0,s=[]
e.forEach(function(e){var o="SELECT seq FROM "+m+" WHERE doc_id=? AND rev=?"
n.executeSql(o,[t,e],function(e,t){if(!t.rows.length)return r()
var n=t.rows.item(0).seq
s.push(n),e.executeSql("DELETE FROM "+m+" WHERE seq=?",[n],r)})})}}function f(e){return function(t){var n=t&&t.constructor.toString().match(/function ([^\(]+)/),r=n&&n[1]||t.type,o=t.target||t.message
e(_.error(_.WSQ_ERROR,o,r))}}function d(e){if("size"in e)return 1e6*e.size
var t=/Android/.test(window.navigator.userAgent)
return t?5e6:1}function l(){return"undefined"!=typeof sqlitePlugin?sqlitePlugin.openDatabase.bind(sqlitePlugin):"undefined"!=typeof openDatabase?function(e){return openDatabase(e.name,e.version,e.description,e.size)}:void 0}function h(e){var t=l(),n=E[e.name]
return n||(n=E[e.name]=t(e),n._sqlitePlugin="undefined"!=typeof sqlitePlugin),n}function p(){return"undefined"!=typeof openDatabase||"undefined"!=typeof SQLitePlugin}var v=e(84),_=e(48),y=e(11),m=y.BY_SEQ_STORE,g=y.ATTACH_STORE,b=y.ATTACH_AND_SEQ_STORE,E={}
t.exports={escapeBlob:r,unescapeBlob:o,stringifyDoc:i,unstringifyDoc:s,qMarks:a,select:c,compactRevs:u,unknownError:f,getSize:d,openDB:h,valid:p}},{11:11,48:48,84:84}],14:[function(e,t,n){"use strict"
function r(e,t,n){function r(){o.cancel()}c.call(this)
var o=this
this.db=e,t=t?i.clone(t):{}
var s=t.complete=i.once(function(t,n){t?o.emit("error",t):o.emit("complete",n),o.removeAllListeners(),e.removeListener("destroyed",r)})
n&&(o.on("complete",function(e){n(null,e)}),o.on("error",function(e){n(e)})),e.once("destroyed",r),t.onChange=function(e){t.isCancelled||(o.emit("change",e),o.startSeq&&o.startSeq<=e.seq&&(o.startSeq=!1),e.deleted?o.emit("delete",e):1===e.changes.length&&"1-"===e.changes[0].rev.slice(0,2)?o.emit("create",e):o.emit("update",e))}
var a=new i.Promise(function(e,n){t.complete=function(t,r){t?n(t):e(r)}})
o.once("cancel",function(){e.removeListener("destroyed",r),t.complete(null,{status:"cancelled"})}),this.then=a.then.bind(a),this["catch"]=a["catch"].bind(a),this.then(function(e){s(null,e)},s),e.taskqueue.isReady?o.doChanges(t):e.taskqueue.addTask(function(){o.isCancelled?o.emit("cancel"):o.doChanges(t)})}function o(e,t,n){var r=[{rev:e._rev}]
"all_docs"===n.style&&(r=h(t.rev_tree).map(function(e){return{rev:e.rev}}))
var o={id:t.id,changes:r,doc:e}
return s(t,e._rev)&&(o.deleted=!0),n.conflicts&&(o.doc._conflicts=p(t),o.doc._conflicts.length||delete o.doc._conflicts),o}var i=e(84),s=e(38),a=e(48),c=e(87).EventEmitter,u=e(66),f=e(67),d=e(41),l=e(40),h=e(52),p=e(51)
t.exports=r,i.inherits(r,c),r.prototype.cancel=function(){this.isCancelled=!0,this.db.taskqueue.isReady&&this.emit("cancel")},r.prototype.doChanges=function(e){var t=this,n=e.complete
if(e=i.clone(e),"live"in e&&!("continuous"in e)&&(e.continuous=e.live),e.processChange=o,"latest"===e.since&&(e.since="now"),e.since||(e.since=0),"now"===e.since)return void this.db.info().then(function(r){return t.isCancelled?void n(null,{status:"cancelled"}):(e.since=r.update_seq,void t.doChanges(e))},n)
if(e.continuous&&"now"!==e.since&&this.db.info().then(function(e){t.startSeq=e.update_seq},function(e){if("idbNull"!==e.id)throw e}),e.filter&&"string"==typeof e.filter&&("_view"===e.filter?e.view=l(e.view):e.filter=l(e.filter),"http"!==this.db.type()&&!e.doc_ids))return this.filterChanges(e)
"descending"in e||(e.descending=!1),e.limit=0===e.limit?1:e.limit,e.complete=n
var r=this.db._changes(e)
if(r&&"function"==typeof r.cancel){var s=t.cancel
t.cancel=i.getArguments(function(e){r.cancel(),s.apply(this,e)})}},r.prototype.filterChanges=function(e){var t=this,n=e.complete
if("_view"===e.filter){if(!e.view||"string"!=typeof e.view){var r=a.error(a.BAD_REQUEST,"`view` filter parameter not found or invalid.")
return n(r)}var o=d(e.view)
this.db.get("_design/"+o[0],function(r,i){if(t.isCancelled)return n(null,{status:"cancelled"})
if(r)return n(a.generateErrorFromResponse(r))
var s=i&&i.views&&i.views[o[1]]&&i.views[o[1]].map
return s?(e.filter=f(s),void t.doChanges(e)):n(a.error(a.MISSING_DOC,i.views?"missing json key: "+o[1]:"missing json key: views"))})}else{var i=d(e.filter)
if(!i)return n(a.error(a.BAD_REQUEST,"`filter` filter parameter invalid."))
this.db.get("_design/"+i[0],function(r,o){if(t.isCancelled)return n(null,{status:"cancelled"})
if(r)return n(a.generateErrorFromResponse(r))
var s=o&&o.filters&&o.filters[i[1]]
return s?(e.filter=u(s),void t.doChanges(e)):n(a.error(a.MISSING_DOC,o&&o.filters?"missing json key: "+i[1]:"missing json key: filters"))})}}},{38:38,40:40,41:41,48:48,51:51,52:52,66:66,67:67,84:84,87:87}],15:[function(e,t,n){"use strict"
function r(e){a()?chrome.storage.onChanged.addListener(function(t){null!=t.db_name&&e.emit(t.dbName.newValue)}):c()&&("undefined"!=typeof addEventListener?addEventListener("storage",function(t){e.emit(t.key)}):window.attachEvent("storage",function(t){e.emit(t.key)}))}function o(){i.call(this),this._listeners={},r(this)}var i=e(87).EventEmitter,s=e(92),a=e(47),c=e(46),u=e(61)
s(o,i),o.prototype.addListener=function(e,t,n,r){function o(){if(i._listeners[t]){if(s)return void(s="waiting")
s=!0
var e=u(r,["style","include_docs","attachments","conflicts","filter","doc_ids","view","since","query_params","binary"])
n.changes(e).on("change",function(e){e.seq>r.since&&!r.cancelled&&(r.since=e.seq,r.onChange(e))}).on("complete",function(){"waiting"===s&&setTimeout(function(){o()},0),s=!1}).on("error",function(){s=!1})}}if(!this._listeners[t]){var i=this,s=!1
this._listeners[t]=o,this.on(e,o)}},o.prototype.removeListener=function(e,t){t in this._listeners&&i.prototype.removeListener.call(this,e,this._listeners[t])},o.prototype.notifyLocalWindows=function(e){a()?chrome.storage.local.set({dbName:e}):c()&&(localStorage[e]="a"===localStorage[e]?"b":"a")},o.prototype.notify=function(e){this.emit(e),this.notifyLocalWindows(e)},t.exports=o},{46:46,47:47,61:61,87:87,92:92}],16:[function(e,t,n){(function(n){"use strict"
function r(e){e&&n.debug&&console.error(e)}function o(e,t){function n(){i.emit("destroyed",o),i.emit(o,"destroyed")}function r(){e.removeListener("destroyed",n),e.emit("destroyed",e)}var o=t.originalName,i=e.constructor,s=i._destructionListeners
e.once("destroyed",n),s.has(o)||s.set(o,[]),s.get(o).push(r)}function i(e,t,n){if(!(this instanceof i))return new i(e,t,n)
var d=this;("function"==typeof t||"undefined"==typeof t)&&(n=t,t={}),e&&"object"==typeof e&&(t=e,e=void 0),"undefined"==typeof n&&(n=r),e=e||t.name,t=c.clone(t),delete t.name,this.__opts=t
var l=n
d.auto_compaction=t.auto_compaction,d.prefix=i.prefix,a.call(d),d.taskqueue=new u
var h=new f(function(r,a){n=function(e,t){return e?a(e):(delete t.then,void r(t))},t=c.clone(t)
var u,f,l=t.name||e
return function(){try{if("string"!=typeof l)throw f=new Error("Missing/invalid DB name"),f.code=400,f
if(u=i.parseAdapter(l,t),t.originalName=l,t.name=u.name,t.prefix&&"http"!==u.adapter&&"https"!==u.adapter&&(t.name=t.prefix+t.name),t.adapter=t.adapter||u.adapter,d._adapter=t.adapter,s("pouchdb:adapter")("Picked adapter: "+t.adapter),d._db_name=l,!i.adapters[t.adapter])throw f=new Error("Adapter is missing"),f.code=404,f
if(!i.adapters[t.adapter].valid())throw f=new Error("Invalid Adapter"),f.code=404,f}catch(e){d.taskqueue.fail(e)}}(),f?a(f):(d.adapter=t.adapter,d.replicate={},d.replicate.from=function(e,t,n){return d.constructor.replicate(e,d,t,n)},d.replicate.to=function(e,t,n){return d.constructor.replicate(d,e,t,n)},d.sync=function(e,t,n){return d.constructor.sync(d,e,t,n)},d.replicate.sync=d.sync,i.adapters[t.adapter].call(d,t,function(e){return e?(d.taskqueue.fail(e),void n(e)):(o(d,t),d.emit("created",d),i.emit("created",t.originalName),d.taskqueue.ready(d),void n(null,d))}),void(c.isCordova()&&cordova.fireWindowEvent(t.name+"_pouch",{})))})
h.then(function(e){l(null,e)},l),d.then=h.then.bind(h),d["catch"]=h["catch"].bind(h)}var s=e(89),a=e(1),c=e(84),u=e(83),f=c.Promise
c.inherits(i,a),i.debug=s,t.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{1:1,83:83,84:84,89:89}],17:[function(e,t,n){"use strict"
function r(e,t){function n(t,n,r){if(e.binary||e.json||!e.processData||"string"==typeof t){if(!e.binary&&e.json&&"string"==typeof t)try{t=JSON.parse(t)}catch(o){return r(o)}}else t=JSON.stringify(t)
Array.isArray(t)&&(t=t.map(function(e){return e.error||e.missing?i.generateErrorFromResponse(e):e})),e.binary&&a(t,n),r(null,t,n)}function r(e,t){var n,r
if(e.code&&e.status){var o=new Error(e.message||e.code)
return o.status=e.status,t(o)}try{n=JSON.parse(e.responseText),r=i.generateErrorFromResponse(n)}catch(s){r=i.generateErrorFromResponse(e)}t(r)}e=s.clone(e)
var f={method:"GET",headers:{},json:!0,processData:!0,timeout:1e4,cache:!1}
return e=s.extend(f,e),e.json&&(e.binary||(e.headers.Accept="application/json"),e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json"),e.binary&&(e.encoding=null,e.json=!1),e.processData||(e.json=!1),o(e,function(o,s,a){if(o){if(s){var f="undefined"!=typeof document&&document.location.origin,d=f&&0===e.url.indexOf(f)
d&&0===s.statusCode&&u(),o.status=s.statusCode}else o.status=400
return r(o,t)}var l,h=s.headers&&s.headers["content-type"],p=a||c()
if(!e.binary&&(e.json||!e.processData)&&"object"!=typeof p&&(/json/.test(h)||/^[\s]*\{/.test(p)&&/\}[\s]*$/.test(p)))try{p=JSON.parse(p.toString())}catch(v){}s.statusCode>=200&&s.statusCode<300?n(p,s,t):(l=i.generateErrorFromResponse(p),l.status=s.statusCode,t(l))})}var o=e(26),i=e(48),s=e(84),a=e(18),c=e(21),u=e(23)
t.exports=r},{18:18,21:21,23:23,26:26,48:48,84:84}],18:[function(e,t,n){"use strict"
t.exports=function(){}},{}],19:[function(e,t,n){"use strict"
var r=e(32)
t.exports=function(e,t){return r(e,{type:t})}},{32:32}],20:[function(e,t,n){"use strict"
var r=e(30)
t.exports=function(e){return r(e)}},{30:30}],21:[function(e,t,n){"use strict"
t.exports=function(){return""}},{}],22:[function(e,t,n){(function(e){"use strict"
t.exports=function(t){"console"in e&&"info"in console&&console.info("The above 404 is totally normal. "+t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],23:[function(e,t,n){(function(e){"use strict"
t.exports=function(){"console"in e&&"warn"in console&&console.warn("PouchDB: the remote database may not have CORS enabled.If not please enable CORS: http://pouchdb.com/errors.html#no_access_control_allow_origin_header")}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],24:[function(e,t,n){"use strict"
function r(e){e=c(e)
var t=s(),n={}
Object.keys(e._attachments).forEach(function(t){var r=e._attachments[t]
if(!r.stub){var o=i(r.data)
n[t]={type:r.content_type,data:o},r.length=o.length,r.follows=!0,delete r.digest,delete r.data}})
var r="--"+t+"\r\nContent-Type: application/json\r\n\r\n",o=[r,JSON.stringify(e)]
Object.keys(n).forEach(function(e){var r=n[e],i="\r\n--"+t+"\r\nContent-Disposition: attachment; filename="+JSON.stringify(e)+"\r\nContent-Type: "+r.type+"\r\nContent-Length: "+r.data.length+"\r\n\r\n"
o.push(i),o.push(f(r.data))}),o.push("\r\n--"+t+"--")
var a="multipart/related; boundary="+t,d=u(o,a)
return{headers:{"Content-Type":a},body:d}}var o=e(28),i=o.atob,s=e(65),a=e(84),c=a.clone,u=e(19),f=e(20)
t.exports=r},{19:19,20:20,28:28,65:65,84:84}],25:[function(e,t,n){"use strict"
var r=e(17)
t.exports=function(e,t){if(("POST"===e.method||"GET"===e.method)&&!e.cache){var n=-1!==e.url.indexOf("?")
e.url+=(n?"&":"?")+"_nonce="+Date.now()}return r(e,t)}},{17:17}],26:[function(e,t,n){"use strict"
function r(){for(var e={},t=new c.Promise(function(t,n){e.resolve=t,e.reject=n}),n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r]
return e.promise=t,c.Promise.resolve().then(function(){return fetch.apply(null,n)}).then(function(t){e.resolve(t)})["catch"](function(t){e.reject(t)}),e}function o(e,t){var n,o,i,s=new Headers,a={method:e.method,credentials:"include",headers:s}
return e.json&&(s.set("Accept","application/json"),s.set("Content-Type",e.headers["Content-Type"]||"application/json")),e.body&&e.body instanceof Blob?u(e.body,function(e){a.body=e}):e.body&&e.processData&&"string"!=typeof e.body?a.body=JSON.stringify(e.body):"body"in e?a.body=e.body:a.body=null,Object.keys(e.headers).forEach(function(t){e.headers.hasOwnProperty(t)&&s.set(t,e.headers[t])}),n=r(e.url,a),e.timeout>0&&(o=setTimeout(function(){n.reject(new Error("Load timeout for resource: "+e.url))},e.timeout)),n.promise.then(function(t){return i={statusCode:t.status},e.timeout>0&&clearTimeout(o),i.statusCode>=200&&i.statusCode<300?e.binary?t.blob():t.text():t.json()}).then(function(e){i.statusCode>=200&&i.statusCode<300?t(null,i,e):t(e,i)})["catch"](function(e){t(e,i)}),{abort:n.reject}}function i(e,t){var n,r,o,i=function(){n.abort()}
n=e.xhr?new e.xhr:new XMLHttpRequest,n.open(e.method,e.url),n.withCredentials=!0,"GET"===e.method?delete e.headers["Content-Type"]:e.json&&(e.headers.Accept="application/json",e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.body&&e.processData&&"string"!=typeof e.body&&(e.body=JSON.stringify(e.body))),e.binary&&(n.responseType="arraybuffer"),"body"in e||(e.body=null)
for(var s in e.headers)e.headers.hasOwnProperty(s)&&n.setRequestHeader(s,e.headers[s])
return e.timeout>0&&(r=setTimeout(i,e.timeout),n.onprogress=function(){clearTimeout(r),r=setTimeout(i,e.timeout)},"undefined"==typeof o&&(o=-1!==Object.keys(n).indexOf("upload")&&"undefined"!=typeof n.upload),o&&(n.upload.onprogress=n.onprogress)),n.onreadystatechange=function(){if(4===n.readyState){var r={statusCode:n.status}
if(n.status>=200&&n.status<300){var o
o=e.binary?a([n.response||""],{type:n.getResponseHeader("Content-Type")}):n.responseText,t(null,r,o)}else{var i={}
try{i=JSON.parse(n.response)}catch(s){}t(i,r)}}},e.body&&e.body instanceof Blob?u(e.body,function(e){n.send(e)}):n.send(e.body),{abort:i}}function s(){try{return new XMLHttpRequest,!0}catch(e){return!1}}var a=e(32),c=e(84),u=e(35),f=s()
t.exports=function(e,t){return f||e.xhr?i(e,t):o(e,t)}},{32:32,35:35,84:84}],27:[function(e,t,n){"use strict"
t.exports=function(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=0;r>o;o++)t+=String.fromCharCode(n[o])
return t}},{}],28:[function(e,t,n){"use strict"
var r=e(34)
"function"==typeof atob?n.atob=function(e){return atob(e)}:n.atob=function(e){var t=new r(e,"base64")
if(t.toString("base64")!==e)throw"Cannot base64 encode full string"
return t.toString("binary")},"function"==typeof btoa?n.btoa=function(e){return btoa(e)}:n.btoa=function(e){return new r(e,"binary").toString("base64")}},{34:34}],29:[function(e,t,n){"use strict"
var r=e(28).atob,o=e(31)
t.exports=function(e,t){return o(r(e),t)}},{28:28,31:31}],30:[function(e,t,n){"use strict"
t.exports=function(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=0;t>o;o++)r[o]=e.charCodeAt(o)
return n}},{}],31:[function(e,t,n){"use strict"
var r=e(32),o=e(30)
t.exports=function(e,t){return r([o(e)],{type:t})}},{30:30,32:32}],32:[function(e,t,n){"use strict"
function r(e,t){e=e||[],t=t||{}
try{return new Blob(e,t)}catch(n){if("TypeError"!==n.name)throw n
for(var r="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,o=new r,i=0;i<e.length;i+=1)o.append(e[i])
return o.getBlob(t.type)}}t.exports=r},{}],33:[function(e,t,n){"use strict"
var r=e(62),o=e(36),i=e(28).btoa
t.exports=function(e){return new r(function(t){o(e,function(e){t(i(e))})})}},{28:28,36:36,62:62}],34:[function(e,t,n){t.exports={}},{}],35:[function(e,t,n){"use strict"
t.exports=function(e,t){var n=new FileReader
n.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0)
t(n)},n.readAsArrayBuffer(e)}},{}],36:[function(e,t,n){"use strict"
var r=e(27)
t.exports=function(e,t){var n=new FileReader,o="function"==typeof n.readAsBinaryString
n.onloadend=function(e){var n=e.target.result||""
return o?t(n):void t(r(n))},o?n.readAsBinaryString(e):n.readAsArrayBuffer(e)}},{27:27}],37:[function(e,t,n){"use strict"
function r(e){if("function"!=typeof e.hasOwnProperty)return!1
var t
for(t in e);return void 0===t||e.hasOwnProperty(t)}t.exports=function o(e){var t,n,i
if(!e||"object"!=typeof e)return e
if(Array.isArray(e)){for(t=[],n=0,i=e.length;i>n;n++)t[n]=o(e[n])
return t}if(e instanceof Date)return e.toISOString()
if(!r(e))return e
t={}
for(n in e)if(e.hasOwnProperty(n)){var s=o(e[n])
"undefined"!=typeof s&&(t[n]=s)}return t}},{}],38:[function(e,t,n){"use strict"
function r(e){return e.ids}function o(e,t){t||(t=i(e))
for(var n,o=t.substring(t.indexOf("-")+1),s=e.rev_tree.map(r);n=s.pop();){if(n[0]===o)return!!n[1].deleted
s=s.concat(n[2])}}var i=e(57)
t.exports=o},{57:57}],39:[function(e,t,n){"use strict"
function r(e){return/^_local/.test(e)}t.exports=r},{}],40:[function(e,t,n){"use strict"
var r=e(41)
t.exports=function(e){var t=r(e)
return t?t.join("/"):null}},{41:41}],41:[function(e,t,n){"use strict"
t.exports=function(e){if(!e)return null
var t=e.split("/")
return 2===t.length?t:1===t.length?[e,e]:null}},{}],42:[function(e,t,n){"use strict"
function r(e){return e.reduce(function(e,t){return e[t]=!0,e},{})}function o(e){if(!/^\d+\-./.test(e))return s.error(s.INVALID_REV)
var t=e.indexOf("-"),n=e.substring(0,t),r=e.substring(t+1)
return{prefix:parseInt(n,10),id:r}}function i(e,t){for(var n=e.start-e.ids.length+1,r=e.ids,o=[r[0],t,[]],i=1,s=r.length;s>i;i++)o=[r[i],{status:"missing"},[o]]
return[{pos:n,ids:o}]}var s=e(48),a=e(65),c=r(["_id","_rev","_attachments","_deleted","_revisions","_revs_info","_conflicts","_deleted_conflicts","_local_seq","_rev_tree","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats","_removed"]),u=r(["_attachments","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"])
n.invalidIdError=function(e){var t
if(e?"string"!=typeof e?t=s.error(s.INVALID_ID):/^_/.test(e)&&!/^_(design|local)/.test(e)&&(t=s.error(s.RESERVED_ID)):t=s.error(s.MISSING_ID),t)throw t},n.parseDoc=function(e,t){var r,f,d,l={status:"available"}
if(e._deleted&&(l.deleted=!0),t)if(e._id||(e._id=a()),f=a(32,16).toLowerCase(),e._rev){if(d=o(e._rev),d.error)return d
e._rev_tree=[{pos:d.prefix,ids:[d.id,{status:"missing"},[[f,l,[]]]]}],r=d.prefix+1}else e._rev_tree=[{pos:1,ids:[f,l,[]]}],r=1
else if(e._revisions&&(e._rev_tree=i(e._revisions,l),r=e._revisions.start,f=e._revisions.ids[0]),!e._rev_tree){if(d=o(e._rev),d.error)return d
r=d.prefix,f=d.id,e._rev_tree=[{pos:r,ids:[f,l,[]]}]}n.invalidIdError(e._id),e._rev=r+"-"+f
var h={metadata:{},data:{}}
for(var p in e)if(Object.prototype.hasOwnProperty.call(e,p)){var v="_"===p[0]
if(v&&!c[p]){var _=s.error(s.DOC_VALIDATION,p)
throw _.message=s.DOC_VALIDATION.message+": "+p,_}v&&!u[p]?h.metadata[p.slice(1)]=e[p]:h.data[p]=e[p]}return h}},{48:48,65:65}],43:[function(e,t,n){"use strict"
function r(e,t,n){function r(e){try{return o.atob(e)}catch(t){var n=c.error(c.BAD_ARG,"Attachments need to be base64 encoded")
return{error:n}}}function f(e,n){if(e.stub)return n()
if("string"==typeof e.data){var c=r(e.data)
if(c.error)return n(c.error)
e.length=c.length,"blob"===t?e.data=a(c,e.content_type):"base64"===t?e.data=o.btoa(c):e.data=c,u(c).then(function(t){e.digest="md5-"+t,n()})}else s(e.data,function(r){"binary"===t?e.data=i(r):"base64"===t&&(e.data=o.btoa(i(r))),u(r).then(function(t){e.digest="md5-"+t,e.length=r.byteLength,n()})})}function d(){h++,e.length===h&&(l?n(l):n())}if(!e.length)return n()
var l,h=0
e.forEach(function(e){function t(e){l=e,r++,r===n.length&&d()}var n=e.data&&e.data._attachments?Object.keys(e.data._attachments):[],r=0
if(!n.length)return d()
for(var o in e.data._attachments)e.data._attachments.hasOwnProperty(o)&&f(e.data._attachments[o],t)})}var o=e(28),i=e(27),s=e(35),a=e(31),c=e(48),u=e(50)
t.exports=r},{27:27,28:28,31:31,35:35,48:48,50:50}],44:[function(e,t,n){"use strict"
function r(e,t,n,r,f,l,h,p){function v(e,t,n){var r=c(e.metadata),i=s(e.metadata,r)
if("was_delete"in h&&i)return f[t]=o.error(o.MISSING_DOC,"deleted"),n()
var a=i?0:1
l(e,r,i,i,!1,a,t,n)}function _(){++g===b&&p&&p()}var y=h.new_edits,m=new d,g=0,b=e.length
e.forEach(function(e,n){if(e._id&&a(e._id))return void t[e._deleted?"_removeLocal":"_putLocal"](e,{ctx:r},function(e){e?f[n]=e:f[n]={ok:!0},_()})
var o=e.metadata.id
m.has(o)?(b--,m.get(o).push([e,n])):m.set(o,[[e,n]])}),m.forEach(function(e,t){function r(){++s<e.length?o():_()}function o(){var o=e[s],a=o[0],c=o[1]
if(n.has(t))i(n.get(t),a,f,c,r,l,y)
else{var d=u([],a.metadata.rev_tree[0],1e3)
a.metadata.rev_tree=d.tree,v(a,c,r)}}var s=0
o()})}var o=e(48),i=e(45),s=e(38),a=e(39),c=e(57),u=e(53),f=e(97),d=f.Map
t.exports=r},{38:38,39:39,45:45,48:48,53:53,57:57,97:97}],45:[function(e,t,n){"use strict"
function r(e,t,n,r,f,d,l){if(u(e.rev_tree,t.metadata.rev))return n[r]=t,f()
var h=e.winningRev||a(e),p="deleted"in e?e.deleted:i(e,h),v="deleted"in t.metadata?t.metadata.deleted:i(t.metadata),_=/^1-/.test(t.metadata.rev)
if(p&&!v&&l&&_){var y=t.data
y._rev=h,y._id=t.metadata.id,t=s(y,l)}var m=c(e.rev_tree,t.metadata.rev_tree[0],1e3),g=l&&(p&&v||!p&&"new_leaf"!==m.conflicts||p&&!v&&"new_branch"===m.conflicts)
if(g){var b=o.error(o.REV_CONFLICT)
return n[r]=b,f()}var E=t.metadata.rev
t.metadata.rev_tree=m.tree,e.rev_map&&(t.metadata.rev_map=e.rev_map)
var w,S=a(t.metadata),T=i(t.metadata,S),x=p===T?0:T>p?-1:1
w=E===S?T:i(t.metadata,E),d(t,S,T,w,!0,x,r,f)}var o=e(48),i=e(38),s=e(42).parseDoc,a=e(57),c=e(53),u=e(54)
t.exports=r},{38:38,42:42,48:48,53:53,54:54,57:57}],46:[function(e,t,n){"use strict"
var r,o=e(47)
if(o())r=!1
else try{localStorage.setItem("_pouch_check_localstorage",1),r=!!localStorage.getItem("_pouch_check_localstorage")}catch(i){r=!1}t.exports=function(){return r}},{47:47}],47:[function(e,t,n){"use strict"
t.exports=function(){return"undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage&&"undefined"!=typeof chrome.storage.local}},{}],48:[function(e,t,n){"use strict"
function r(e){Error.call(this,e.reason),this.status=e.status,this.name=e.error,this.message=e.reason,this.error=!0}var o=e(92)
o(r,Error),r.prototype.toString=function(){return JSON.stringify({status:this.status,name:this.name,message:this.message})},n.UNAUTHORIZED=new r({status:401,error:"unauthorized",reason:"Name or password is incorrect."}),n.MISSING_BULK_DOCS=new r({status:400,error:"bad_request",reason:"Missing JSON list of 'docs'"}),n.MISSING_DOC=new r({status:404,error:"not_found",reason:"missing"}),n.REV_CONFLICT=new r({status:409,error:"conflict",reason:"Document update conflict"}),n.INVALID_ID=new r({status:400,error:"invalid_id",reason:"_id field must contain a string"}),n.MISSING_ID=new r({status:412,error:"missing_id",reason:"_id is required for puts"}),n.RESERVED_ID=new r({status:400,error:"bad_request",reason:"Only reserved document ids may start with underscore."}),n.NOT_OPEN=new r({status:412,error:"precondition_failed",reason:"Database not open"}),n.UNKNOWN_ERROR=new r({status:500,error:"unknown_error",reason:"Database encountered an unknown error"}),n.BAD_ARG=new r({status:500,error:"badarg",reason:"Some query argument is invalid"}),n.INVALID_REQUEST=new r({status:400,error:"invalid_request",reason:"Request was invalid"}),n.QUERY_PARSE_ERROR=new r({status:400,error:"query_parse_error",reason:"Some query parameter is invalid"}),n.DOC_VALIDATION=new r({status:500,error:"doc_validation",reason:"Bad special document member"}),n.BAD_REQUEST=new r({status:400,error:"bad_request",reason:"Something wrong with the request"}),n.NOT_AN_OBJECT=new r({status:400,error:"bad_request",reason:"Document must be a JSON object"}),n.DB_MISSING=new r({status:404,error:"not_found",reason:"Database not found"}),n.IDB_ERROR=new r({status:500,error:"indexed_db_went_bad",reason:"unknown"}),n.WSQ_ERROR=new r({status:500,error:"web_sql_went_bad",reason:"unknown"}),n.LDB_ERROR=new r({status:500,error:"levelDB_went_went_bad",reason:"unknown"}),n.FORBIDDEN=new r({status:403,error:"forbidden",reason:"Forbidden by design doc validate_doc_update function"}),n.INVALID_REV=new r({status:400,error:"bad_request",reason:"Invalid rev format"}),n.FILE_EXISTS=new r({status:412,error:"file_exists",reason:"The database could not be created, the file already exists."}),n.MISSING_STUB=new r({status:412,error:"missing_stub"}),n.error=function(e,t,n){function o(t){for(var r in e)"function"!=typeof e[r]&&(this[r]=e[r])
void 0!==n&&(this.name=n),void 0!==t&&(this.reason=t)}return o.prototype=r.prototype,new o(t)},n.getErrorTypeByProp=function(e,t,r){var o=n,i=Object.keys(o).filter(function(n){var r=o[n]
return"function"!=typeof r&&r[e]===t}),s=r&&i.filter(function(e){var t=o[e]
return t.message===r})[0]||i[0]
return s?o[s]:null},n.generateErrorFromResponse=function(e){var t,r,o,i,s,a=n
return r=e.error===!0&&"string"==typeof e.name?e.name:e.error,s=e.reason,o=a.getErrorTypeByProp("name",r,s),e.missing||"missing"===s||"deleted"===s||"not_found"===r?o=a.MISSING_DOC:"doc_validation"===r?(o=a.DOC_VALIDATION,i=s):"bad_request"===r&&o.message!==s&&(o=a.BAD_REQUEST),o||(o=a.getErrorTypeByProp("status",e.status,s)||a.UNKNOWN_ERROR),t=a.error(o,s,r),i&&(t.message=i),e.id&&(t.id=e.id),e.status&&(t.status=e.status),e.missing&&(t.missing=e.missing),t}},{92:92}],49:[function(e,t,n){"use strict"
function r(e,t){for(var n in t)if(t.hasOwnProperty(n)){var r=o(t[n])
"undefined"!=typeof r&&(e[n]=r)}}var o=e(37)
t.exports=function(e,t,n){return r(e,t),n&&r(e,n),e}},{37:37}],50:[function(e,t,n){(function(n){"use strict"
function r(e){return String.fromCharCode(255&e)+String.fromCharCode(e>>>8&255)+String.fromCharCode(e>>>16&255)+String.fromCharCode(e>>>24&255)}function o(e){for(var t="",n=0,o=e.length;o>n;n++)t+=r(e[n])
return c.btoa(t)}function i(e,t,n,r){(n>0||r<t.byteLength)&&(t=new Uint8Array(t,n,Math.min(r,t.byteLength)-n)),e.append(t)}function s(e,t,n,r){(n>0||r<t.length)&&(t=t.substring(n,r)),e.appendBinary(t)}var a=e(63),c=e(28),u=e(98),f=n.setImmediate||n.setTimeout,d=32768
t.exports=a(function(e,t){function n(){var r=h*c,i=r+c
if(h++,l>h)v(p,e,r,i),f(n)
else{v(p,e,r,i)
var s=p.end(!0),a=o(s)
t(null,a),p.destroy()}}var r="string"==typeof e,a=r?e.length:e.byteLength,c=Math.min(d,a),l=Math.ceil(a/c),h=0,p=r?new u:new u.ArrayBuffer,v=r?s:i
n()})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{28:28,63:63,98:98}],51:[function(e,t,n){"use strict"
var r=e(57),o=e(52)
t.exports=function(e){for(var t=r(e),n=o(e.rev_tree),i=[],s=0,a=n.length;a>s;s++){var c=n[s]
c.rev===t||c.opts.deleted||i.push(c.rev)}return i}},{52:52,57:57}],52:[function(e,t,n){"use strict"
function r(e,t){return e.pos-t.pos}var o=e(56)
t.exports=function(e){var t=[]
o(e,function(e,n,r,o,i){e&&t.push({rev:n+"-"+r,pos:n,opts:i})}),t.sort(r).reverse()
for(var n=0,i=t.length;i>n;n++)delete t[n].pos
return t}},{56:56}],53:[function(e,t,n){"use strict"
function r(e,t){return e.pos-t.pos}function o(e,t,n){for(var r,o=0,i=e.length;i>o;)r=o+i>>>1,n(e[r],t)<0?o=r+1:i=r
return o}function i(e,t,n){var r=o(e,t,n)
e.splice(r,0,t)}function s(e,t){for(var n,r,o=t,i=e.length;i>o;o++){var s=e[o],a=[s.id,s.opts,[]]
r?(r[2].push(a),r=a):n=r=a}return n}function a(e,t){return e[0]<t[0]?-1:1}function c(e,t){for(var n=[{tree1:e,tree2:t}],r=!1;n.length>0;){var o=n.pop(),s=o.tree1,c=o.tree2;(s[1].status||c[1].status)&&(s[1].status="available"===s[1].status||"available"===c[1].status?"available":"missing")
for(var u=0;u<c[2].length;u++)if(s[2][0]){for(var f=!1,d=0;d<s[2].length;d++)s[2][d][0]===c[2][u][0]&&(n.push({tree1:s[2][d],tree2:c[2][u]}),f=!0)
f||(r="new_branch",i(s[2],c[2][u],a))}else r="new_leaf",s[2][0]=c[2][u]}return{conflicts:r,tree:e}}function u(e,t,n){var o,i=[],s=!1,a=!1
if(!e.length)return{tree:[t],conflicts:"new_leaf"}
for(var u=0,f=e.length;f>u;u++){var d=e[u]
if(d.pos===t.pos&&d.ids[0]===t.ids[0])o=c(d.ids,t.ids),i.push({pos:d.pos,ids:o.tree}),s=s||o.conflicts,a=!0
else if(n!==!0){var l=d.pos<t.pos?d:t,h=d.pos<t.pos?t:d,p=h.pos-l.pos,v=[],_=[]
for(_.push({ids:l.ids,diff:p,parent:null,parentIdx:null});_.length>0;){var y=_.pop()
if(0!==y.diff)for(var m=y.ids[2],g=0,b=m.length;b>g;g++)_.push({ids:m[g],diff:y.diff-1,parent:y.ids,parentIdx:g})
else y.ids[0]===h.ids[0]&&v.push(y)}var E=v[0]
E?(o=c(E.ids,h.ids),E.parent[2][E.parentIdx]=o.tree,i.push({pos:l.pos,ids:l.ids}),s=s||o.conflicts,a=!0):i.push(d)}else i.push(d)}return a||i.push(t),i.sort(r),{tree:i,conflicts:s||"internal_node"}}function f(e,t){for(var n,r=d(e),o=0,i=r.length;i>o;o++){var a=r[o],c=a.ids,f=Math.max(0,c.length-t),l={pos:a.pos+f,ids:s(c,f)}
n=n?u(n,l,!0).tree:[l]}return n}var d=e(55)
t.exports=function(e,t,n){var r=u(e,t)
return{tree:f(r.tree,n),conflicts:r.conflicts}}},{55:55}],54:[function(e,t,n){"use strict"
t.exports=function(e,t){for(var n,r=e.slice(),o=t.split("-"),i=parseInt(o[0],10),s=o[1];n=r.pop();){if(n.pos===i&&n.ids[0]===s)return!0
for(var a=n.ids[2],c=0,u=a.length;u>c;c++)r.push({pos:n.pos+1,ids:a[c]})}return!1}},{}],55:[function(e,t,n){"use strict"
t.exports=function(e){for(var t,n=[],r=e.slice();t=r.pop();){var o=t.pos,i=t.ids,s=i[0],a=i[1],c=i[2],u=0===c.length,f=t.history?t.history.slice():[]
f.push({id:s,opts:a}),u&&n.push({pos:o+1-f.length,ids:f})
for(var d=0,l=c.length;l>d;d++)r.push({pos:o+1,ids:c[d],history:f})}return n.reverse()}},{}],56:[function(e,t,n){"use strict"
t.exports=function(e,t){for(var n,r=e.slice();n=r.pop();)for(var o=n.pos,i=n.ids,s=i[2],a=t(0===s.length,o,i[0],n.ctx,i[1]),c=0,u=s.length;u>c;c++)r.push({pos:o+1,ids:s[c],ctx:a})}},{}],57:[function(e,t,n){"use strict"
t.exports=function(e){for(var t,n,r,o,i=e.rev_tree.slice();o=i.pop();){var s=o.ids,a=s[2],c=o.pos
if(a.length)for(var u=0,f=a.length;f>u;u++)i.push({pos:c+1,ids:a[u]})
else{var d=!!s[1].deleted,l=s[0];(!t||(r!==d?r:n!==c?c>n:l>t))&&(t=l,n=c,r=d)}}return n+"-"+t}},{}],58:[function(e,t,n){"use strict"
function r(e){var t=!1
return o(function(n){if(t)throw new Error("once called more than once")
t=!0,e.apply(this,n)})}var o=e(86)
t.exports=r},{86:86}],59:[function(e,t,n){"use strict"
function r(e){return decodeURIComponent(window.escape(e))}function o(e){return 65>e?e-48:e-55}function i(e,t,n){for(var r="";n>t;)r+=String.fromCharCode(o(e.charCodeAt(t++))<<4|o(e.charCodeAt(t++)))
return r}function s(e,t,n){for(var r="";n>t;)r+=String.fromCharCode(o(e.charCodeAt(t+2))<<12|o(e.charCodeAt(t+3))<<8|o(e.charCodeAt(t))<<4|o(e.charCodeAt(t+1))),t+=4
return r}function a(e,t){return"UTF-8"===t?r(i(e,0,e.length)):s(e,0,e.length)}t.exports=a},{}],60:[function(e,t,n){"use strict"
function r(e){for(var t=a.exec(e),n={},r=14;r--;){var c=o[r],u=t[r]||"",f=-1!==["user","password"].indexOf(c)
n[c]=f?decodeURIComponent(u):u}return n[i]={},n[o[12]].replace(s,function(e,t,r){t&&(n[i][t]=r)}),n}var o=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],i="queryKey",s=/(?:^|&)([^&=]*)=?([^&]*)/g,a=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
t.exports=r},{}],61:[function(e,t,n){"use strict"
t.exports=function(e,t){for(var n={},r=0,o=t.length;o>r;r++){var i=t[r]
i in e&&(n[i]=e[i])}return n}},{}],62:[function(e,t,n){"use strict"
t.exports="function"==typeof Promise?Promise:e(93)},{93:93}],63:[function(e,t,n){(function(n){"use strict"
function r(e){return i(function(t){var r,i=this,a="function"==typeof t[t.length-1]?t.pop():!1
a&&(r=function(e,t){n.nextTick(function(){a(e,t)})})
var c=new o(function(n,r){var o
try{var a=s(function(e,t){e?r(e):n(t)})
t.push(a),o=e.apply(i,t),o&&"function"==typeof o.then&&n(o)}catch(c){r(c)}})
return r&&c.then(function(e){r(null,e)},r),c})}var o=e(62),i=e(86),s=e(58)
t.exports=r}).call(this,e(88))},{58:58,62:62,86:86,88:88}],64:[function(e,t,n){"use strict"
function r(e,t,n){return e.put(t).then(function(e){return{updated:!0,rev:e.rev}},function(r){if(409!==r.status)throw r
return i(e,t._id,n)})}var o=e(62),i=t.exports=function(e,t,n){return new o(function(o,i){return"string"!=typeof t?i(new Error("doc id is required")):void e.get(t,function(s,a){if(s){if(404!==s.status)return i(s)
a={}}var c=a._rev,u=n(a)
return u?(u._id=t,u._rev=c,void o(r(e,u,n))):o({updated:!1,rev:c})})})}},{62:62}],65:[function(e,t,n){"use strict"
function r(e){return 0|Math.random()*e}function o(e,t){t=t||i.length
var n="",o=-1
if(e){for(;++o<e;)n+=i[r(t)]
return n}for(;++o<36;)switch(o){case 8:case 13:case 18:case 23:n+="-"
break
case 19:n+=i[3&r(16)|8]
break
default:n+=i[r(16)]}return n}var i="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
t.exports=o},{}],66:[function(_dereq_,module,exports){"use strict"
function evalFilter(input){return eval(["(function () { return ",input," })()"].join(""))}module.exports=evalFilter},{}],67:[function(_dereq_,module,exports){"use strict"
function evalView(input){return eval(["(function () {","  return function (doc) {","    var emitted = false;","    var emit = function (a, b) {","      emitted = true;","    };","    var view = "+input+";","    view(doc);","    if (emitted) {","      return true;","    }","  }","})()"].join("\n"))}module.exports=evalView},{}],68:[function(e,t,n){"use strict"
var r=e(64),o=e(62),i=e(71)
t.exports=function(e){var t=e.db,n=e.viewName,s=e.map,a=e.reduce,c=e.temporary,u=s.toString()+(a&&a.toString())+"undefined"
if(!c&&t._cachedViews){var f=t._cachedViews[u]
if(f)return o.resolve(f)}return t.info().then(function(e){function o(e){e.views=e.views||{}
var t=n;-1===t.indexOf("/")&&(t=n+"/"+n)
var r=e.views[t]=e.views[t]||{}
if(!r[f])return r[f]=!0,e}var f=e.db_name+"-mrview-"+(c?"temp":i(u))
return r(t,"_local/mrviews",o).then(function(){return t.registerDependentDatabase(f).then(function(e){var n=e.db
n.auto_compaction=!0
var r={name:f,db:n,sourceDB:t,adapter:t.adapter,mapFun:s,reduceFun:a}
return r.db.get("_local/lastSeq")["catch"](function(e){if(404!==e.status)throw e}).then(function(e){return r.seq=e?e.seq:0,c||(t._cachedViews=t._cachedViews||{},t._cachedViews[u]=r,r.db.once("destroyed",function(){delete t._cachedViews[u]})),r})})})})}},{62:62,64:64,71:71}],69:[function(_dereq_,module,exports){"use strict"
module.exports=function(func,emit,sum,log,isArray,toJSON){return eval("'use strict'; ("+func.replace(/;\s*$/,"")+");")}},{}],70:[function(e,t,n){(function(t){"use strict"
function r(e){return-1===e.indexOf("/")?[e,e]:e.split("/")}function o(e){return 1===e.length&&/^1-/.test(e[0].rev)}function i(e,t){try{e.emit("error",t)}catch(n){console.error("The user's map/reduce function threw an uncaught error.\nYou can debug this error by doing:\nmyDatabase.on('error', function (err) { debugger; });\nPlease double-check your map/reduce function."),console.error(t)}}function s(e,t,n){try{return{output:t.apply(null,n)}}catch(r){return i(e,r),{error:r}}}function a(e,t){var n=j(e.key,t.key)
return 0!==n?n:j(e.value,t.value)}function c(e,t,n){return n=n||0,"number"==typeof t?e.slice(n,t+n):n>0?e.slice(n):e}function u(e){var t=e.value,n=t&&"object"==typeof t&&t._id||e.id
return n}function f(e){e.rows.forEach(function(e){var t=e.doc&&e.doc._attachments
t&&Object.keys(t).forEach(function(e){var n=t[e]
t[e].data=D(n.data,n.content_type)})})}function d(e){return function(t){return e.include_docs&&e.attachments&&e.binary&&f(t),t}}function l(e){var t="builtin "+e+" function requires map values to be numbers or number arrays"
return new C(t)}function h(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n]
if("number"!=typeof o){if(!Array.isArray(o))throw l("_sum")
t="number"==typeof t?[t]:t
for(var i=0,s=o.length;s>i;i++){var a=o[i]
if("number"!=typeof a)throw l("_sum")
"undefined"==typeof t[i]?t.push(a):t[i]+=a}}else"number"==typeof t?t+=o:t[0]+=o}return t}function p(e,t,n,r){var o=t[e]
"undefined"!=typeof o&&(r&&(o=encodeURIComponent(JSON.stringify(o))),n.push(e+"="+o))}function v(e,t){var n=e.descending?"endkey":"startkey",r=e.descending?"startkey":"endkey"
if("undefined"!=typeof e[n]&&"undefined"!=typeof e[r]&&j(e[n],e[r])>0)throw new q("No rows can match your key range, reverse your start_key and end_key or set {descending : true}")
if(t.reduce&&e.reduce!==!1){if(e.include_docs)throw new q("{include_docs:true} is invalid for reduce")
if(e.keys&&e.keys.length>1&&!e.group&&!e.group_level)throw new q("Multi-key fetches for reduce views must use {group: true}")}if(e.group_level){if("number"!=typeof e.group_level)throw new q('Invalid value for integer: "'+e.group_level+'"')
if(e.group_level<0)throw new q('Invalid value for positive integer: "'+e.group_level+'"')}}function _(e,t,n){var o,i=[],s="GET"
if(p("reduce",n,i),p("include_docs",n,i),p("attachments",n,i),p("limit",n,i),p("descending",n,i),p("group",n,i),p("group_level",n,i),p("skip",n,i),p("stale",n,i),p("conflicts",n,i),p("startkey",n,i,!0),p("start_key",n,i,!0),p("endkey",n,i,!0),p("end_key",n,i,!0),p("inclusive_end",n,i),p("key",n,i,!0),i=i.join("&"),i=""===i?"":"?"+i,"undefined"!=typeof n.keys){var a=2e3,c="keys="+encodeURIComponent(JSON.stringify(n.keys))
c.length+i.length+1<=a?i+=("?"===i[0]?"&":"?")+c:(s="POST","string"==typeof t?o={keys:n.keys}:t.keys=n.keys)}if("string"==typeof t){var u=r(t)
return e.request({method:s,url:"_design/"+u[0]+"/_view/"+u[1]+i,body:o}).then(d(n))}return o=o||{},Object.keys(t).forEach(function(e){Array.isArray(t[e])?o[e]=t[e]:o[e]=t[e].toString()}),e.request({method:"POST",url:"_temp_view"+i,body:o}).then(d(n))}function y(e){return function(t){if(404===t.status)return e
throw t}}function m(e,t,n){function r(){return o(d)?J.resolve(c):t.db.get(a)["catch"](y(c))}function i(e){return e.keys.length?t.db.allDocs({keys:e.keys,include_docs:!0}):J.resolve({rows:[]})}function s(e,t){for(var n=[],r={},o=0,i=t.rows.length;i>o;o++){var s=t.rows[o],a=s.doc
if(a&&(n.push(a),r[a._id]=!0,a._deleted=!f[a._id],!a._deleted)){var c=f[a._id]
"value"in c&&(a.value=c.value)}}var u=Object.keys(f)
return u.forEach(function(e){if(!r[e]){var t={_id:e},o=f[e]
"value"in o&&(t.value=o.value),n.push(t)}}),e.keys=H.uniq(u.concat(e.keys)),n.push(e),n}var a="_local/doc_"+e,c={_id:a,keys:[]},u=n[e],f=u.indexableKeysToKeyValues,d=u.changes
return r().then(function(e){return i(e).then(function(t){return s(e,t)})})}function g(e,t,n){var r="_local/lastSeq"
return e.db.get(r)["catch"](y({_id:r,seq:0})).then(function(r){var o=Object.keys(t)
return J.all(o.map(function(n){return m(n,e,t)})).then(function(t){var o=H.flatten(t)
return r.seq=n,o.push(r),e.db.bulkDocs({docs:o})})})}function b(e){var t="string"==typeof e?e:e.name,n=V[t]
return n||(n=V[t]=new L),n}function E(e){return H.sequentialize(b(e),function(){return w(e)})()}function w(e){function t(e,t){var n={id:o._id,key:F(e)}
"undefined"!=typeof t&&null!==t&&(n.value=F(t)),r.push(n)}function n(t,n){return function(){return g(e,t,n)}}var r,o,i
if("function"==typeof e.mapFun&&2===e.mapFun.length){var c=e.mapFun
i=function(e){return c(e,t)}}else i=U(e.mapFun.toString(),t,h,I,Array.isArray,JSON.parse)
var u=e.seq||0,f=new L
return new J(function(t,c){function d(){f.finish().then(function(){e.seq=u,t()})}function l(){function t(e){c(e)}e.sourceDB.changes({conflicts:!0,include_docs:!0,style:"all_docs",since:u,limit:W}).on("complete",function(t){var c=t.results
if(!c.length)return d()
for(var h={},p=0,v=c.length;v>p;p++){var _=c[p]
if("_"!==_.doc._id[0]){r=[],o=_.doc,o._deleted||s(e.sourceDB,i,[o]),r.sort(a)
for(var y,m={},g=0,b=r.length;b>g;g++){var E=r[g],w=[E.key,E.id]
0===j(E.key,y)&&w.push(g)
var S=B(w)
m[S]=E,y=E.key}h[_.doc._id]={indexableKeysToKeyValues:m,changes:_.changes}}u=_.seq}return f.add(n(h,u)),c.length<W?d():l()}).on("error",t)}l()})}function S(e,t,n){0===n.group_level&&delete n.group_level
var r,o=n.group||n.group_level
r=K[e.reduceFun]?K[e.reduceFun]:U(e.reduceFun.toString(),null,h,I,Array.isArray,JSON.parse)
var i=[],a=n.group_level
t.forEach(function(e){var t=i[i.length-1],n=o?e.key:null
return o&&Array.isArray(n)&&"number"==typeof a&&(n=n.length>a?n.slice(0,a):n),t&&0===j(t.key[0][0],n)?(t.key.push([n,e.id]),void t.value.push(e.value)):void i.push({key:[[n,e.id]],value:[e.value]})})
for(var u=0,f=i.length;f>u;u++){var d=i[u],l=s(e.sourceDB,r,[d.key,d.value,!1])
if(l.error&&l.error instanceof C)throw l.error
d.value=l.error?null:l.output,d.key=d.key[0][0]}return{rows:c(i,n.limit,n.skip)}}function T(e,t){return H.sequentialize(b(e),function(){return x(e,t)})()}function x(e,t){function n(t){return t.include_docs=!0,e.db.allDocs(t).then(function(e){return o=e.total_rows,e.rows.map(function(e){if("value"in e.doc&&"object"==typeof e.doc.value&&null!==e.doc.value){var t=Object.keys(e.doc.value).sort(),n=["id","key","value"]
if(!(n>t||t>n))return e.doc.value}var r=M(e.doc._id)
return{key:r[0],id:r[1],value:"value"in e.doc?e.doc.value:null}})})}function r(n){var r
if(r=i?S(e,n,t):{total_rows:o,offset:s,rows:n},t.include_docs){var a=H.uniq(n.map(u))
return e.sourceDB.allDocs({keys:a,include_docs:!0,conflicts:t.conflicts,attachments:t.attachments,binary:t.binary}).then(function(e){var t={}
return e.rows.forEach(function(e){e.doc&&(t["$"+e.id]=e.doc)}),n.forEach(function(e){var n=u(e),r=t["$"+n]
r&&(e.doc=r)}),r})}return r}var o,i=e.reduceFun&&t.reduce!==!1,s=t.skip||0
"undefined"==typeof t.keys||t.keys.length||(t.limit=0,delete t.keys)
var a=function(e){return e.reduce(function(e,t){return e.concat(t)})}
if("undefined"!=typeof t.keys){var c=t.keys,f=c.map(function(e){var t={startkey:B([e]),endkey:B([e,{}])}
return n(t)})
return J.all(f).then(a).then(r)}var d={descending:t.descending}
if(t.start_key&&(t.startkey=t.start_key),t.end_key&&(t.endkey=t.end_key),"undefined"!=typeof t.startkey&&(d.startkey=B(t.descending?[t.startkey,{}]:[t.startkey])),"undefined"!=typeof t.endkey){var l=t.inclusive_end!==!1
t.descending&&(l=!l),d.endkey=B(l?[t.endkey,{}]:[t.endkey])}if("undefined"!=typeof t.key){var h=B([t.key]),p=B([t.key,{}])
d.descending?(d.endkey=h,d.startkey=p):(d.startkey=h,d.endkey=p)}return i||("number"==typeof t.limit&&(d.limit=t.limit),d.skip=s),n(d).then(r)}function O(e){return e.request({method:"POST",url:"_view_cleanup"})}function k(e){return e.get("_local/mrviews").then(function(t){var n={}
Object.keys(t.views).forEach(function(e){var t=r(e),o="_design/"+t[0],i=t[1]
n[o]=n[o]||{},n[o][i]=!0})
var o={keys:Object.keys(n),include_docs:!0}
return e.allDocs(o).then(function(r){var o={}
r.rows.forEach(function(e){var r=e.key.substring(8)
Object.keys(n[e.key]).forEach(function(n){var i=r+"/"+n
t.views[i]||(i=n)
var s=Object.keys(t.views[i]),a=e.doc&&e.doc.views&&e.doc.views[n]
s.forEach(function(e){o[e]=o[e]||a})})})
var i=Object.keys(o).filter(function(e){return!o[e]}),s=i.map(function(t){return H.sequentialize(b(t),function(){return new e.constructor(t,e.__opts).destroy()})()})
return J.all(s).then(function(){return{ok:!0}})})},y({ok:!0}))}function A(e,n,o){if("http"===e.type())return _(e,n,o)
if("string"!=typeof n){v(o,n)
var i={db:e,viewName:"temp_view/temp_view",map:n.map,reduce:n.reduce,temporary:!0}
return G.add(function(){return P(i).then(function(e){function t(){return e.db.destroy()}return H.fin(E(e).then(function(){return T(e,o)}),t)})}),G.finish()}var s=n,a=r(s),c=a[0],u=a[1]
return e.get("_design/"+c).then(function(n){var r=n.views&&n.views[u]
if(!r||"string"!=typeof r.map)throw new R("ddoc "+c+" has no view named "+u)
v(o,r)
var i={db:e,viewName:s,map:r.map,reduce:r.reduce}
return P(i).then(function(e){return"ok"===o.stale||"update_after"===o.stale?("update_after"===o.stale&&t.nextTick(function(){E(e)}),T(e,o)):E(e).then(function(){return T(e,o)})})})}function q(e){this.status=400,this.name="query_parse_error",this.message=e,this.error=!0
try{Error.captureStackTrace(this,q)}catch(t){}}function R(e){this.status=404,this.name="not_found",this.message=e,this.error=!0
try{Error.captureStackTrace(this,R)}catch(t){}}function C(e){this.status=500,this.name="invalid_value",this.message=e,this.error=!0
try{Error.captureStackTrace(this,C)}catch(t){}}var I,D=e(29),N=e(95),L=e(72),j=N.collate,B=N.toIndexableString,F=N.normalizeKey,M=N.parseIndexableString,P=e(68),U=e(69)
I="undefined"!=typeof console&&"function"==typeof console.log?Function.prototype.bind.call(console.log,console):function(){}
var H=e(73),J=e(62),Q=e(92),V={},G=new L,W=50,K={_sum:function(e,t){return h(t)},_count:function(e,t){return t.length},_stats:function(e,t){function n(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n]
t+=o*o}return t}return{sum:h(t),min:Math.min.apply(null,t),max:Math.max.apply(null,t),count:t.length,sumsqr:n(t)}}}
n.viewCleanup=H.callbackify(function(){var e=this
return"http"===e.type()?O(e):k(e)}),n.query=function(e,t,n){"function"==typeof t&&(n=t,t={}),t=t||{},"function"==typeof e&&(e={map:e})
var r=this,o=J.resolve().then(function(){return A(r,e,t)})
return H.promisedCallback(o,n),o},Q(q,Error),Q(R,Error),Q(C,Error)}).call(this,e(88))},{29:29,62:62,68:68,69:69,72:72,73:73,88:88,92:92,95:95}],71:[function(e,t,n){"use strict"
var r=e(98)
t.exports=function(e){return r.hash(e)}},{98:98}],72:[function(e,t,n){"use strict"
function r(){this.promise=new o(function(e){e()})}var o=e(62)
r.prototype.add=function(e){return this.promise=this.promise["catch"](function(){}).then(function(){return e()}),this.promise},r.prototype.finish=function(){return this.promise},t.exports=r},{62:62}],73:[function(e,t,n){(function(t){"use strict"
var r=e(86)
n.promisedCallback=function(e,n){return n&&e.then(function(e){t.nextTick(function(){n(null,e)})},function(e){t.nextTick(function(){n(e)})}),e},n.callbackify=function(e){return r(function(t){var r=t.pop(),o=e.apply(this,t)
return"function"==typeof r&&n.promisedCallback(o,r),o})},n.fin=function(e,t){return e.then(function(e){return t().then(function(){return e})},function(e){return t().then(function(){throw e})})},n.sequentialize=function(e,t){return function(){var n=arguments,r=this
return e.add(function(){return t.apply(r,n)})}},n.flatten=function(e){for(var t=[],n=0,r=e.length;r>n;n++)t=t.concat(e[n])
return t},n.uniq=function(e){for(var t={},n=0,r=e.length;r>n;n++)t["$"+e[n]]=!0
var o=Object.keys(t),i=new Array(o.length)
for(n=0,r=o.length;r>n;n++)i[n]=o[n].substring(1)
return i}}).call(this,e(88))},{86:86,88:88}],74:[function(e,t,n){"use strict"
function r(e,t){e=parseInt(e,10),t=parseInt(t,10),e!==e&&(e=0),t!==t||e>=t?t=(e||1)<<1:t+=1
var n=Math.random(),r=t-e
return~~(r*n+e)}function o(e){var t=0
return e||(t=2e3),r(e,t)}function i(e,t,n,r){return e.retry===!1?(t.emit("error",n),void t.removeAllListeners()):("function"!=typeof e.back_off_function&&(e.back_off_function=o),t.emit("requestError",n),"active"===t.state&&(t.emit("paused",n),t.state="stopped",t.once("active",function(){e.current_back_off=s})),e.current_back_off=e.current_back_off||s,e.current_back_off=e.back_off_function(e.current_back_off),void setTimeout(r,e.current_back_off))}var s=0
t.exports=i},{}],75:[function(e,t,n){"use strict"
function r(e,t,n,o,i){return e.get(t)["catch"](function(n){if(404===n.status)return"http"===e.type()&&u("PouchDB is just checking if a remote checkpoint exists."),{session_id:o,_id:t,history:[],replicator:h,version:l}
throw n}).then(function(s){return i.cancelled?void 0:(s.history=(s.history||[]).filter(function(e){return e.session_id!==o}),s.history.unshift({last_seq:n,session_id:o}),s.history=s.history.slice(0,p),s.version=l,s.replicator=h,s.session_id=o,s.last_seq=n,e.put(s)["catch"](function(s){if(409===s.status)return r(e,t,n,o,i)
throw s}))})}function o(e,t,n,r){this.src=e,this.target=t,this.id=n,this.returnValue=r}function i(e,t){if(e.session_id===t.session_id)return{last_seq:e.last_seq,history:e.history||[]}
var n=e.history||[],r=t.history||[]
return s(n,r)}function s(e,t){var n=e[0],r=e.slice(1),o=t[0],i=t.slice(1)
if(!n||0===t.length)return{last_seq:v,history:[]}
var c=n.session_id
if(a(c,t))return{last_seq:n.last_seq,history:e}
var u=o.session_id
return a(u,r)?{last_seq:o.last_seq,history:i}:s(r,i)}function a(e,t){var n=t[0],r=t.slice(1)
return e&&0!==t.length?e===n.session_id?!0:a(e,r):!1}var c=e(62),u=e(22),f=e(95),d=f.collate,l=1,h="pouchdb",p=5,v=0
o.prototype.writeCheckpoint=function(e,t){var n=this
return this.updateTarget(e,t).then(function(){return n.updateSource(e,t)})},o.prototype.updateTarget=function(e,t){return r(this.target,this.id,e,t,this.returnValue)},o.prototype.updateSource=function(e,t){var n=this
return this.readOnlySource?c.resolve(!0):r(this.src,this.id,e,t,this.returnValue)["catch"](function(e){var t="number"==typeof e.status&&4===Math.floor(e.status/100)
if(t)return n.readOnlySource=!0,!0
throw e})}
var _={undefined:function(e,t){return 0===d(e.last_seq,t.last_seq)?t.last_seq:0},1:function(e,t){return i(t,e).last_seq}}
o.prototype.getCheckpoint=function(){var e=this
return e.target.get(e.id).then(function(t){return e.src.get(e.id).then(function(e){if(t.version!==e.version)return v
var n
return n=t.version?t.version.toString():"undefined",n in _?_[n](t,e):v},function(n){if(404===n.status&&t.last_seq)return e.src.put({_id:e.id,last_seq:v}).then(function(){return v},function(n){return 401===n.status?(e.readOnlySource=!0,t.last_seq):v})
throw n})})["catch"](function(e){if(404!==e.status)throw e
return v})},t.exports=o},{22:22,62:62,95:95}],76:[function(e,t,n){"use strict"
function r(e){return Object.keys(e).sort(a).reduce(function(t,n){return t[n]=e[n],t},{})}function o(e,t,n){var o=n.doc_ids?n.doc_ids.sort(a):"",c=n.filter?n.filter.toString():"",u="",f=""
return n.filter&&n.query_params&&(u=JSON.stringify(r(n.query_params))),n.filter&&"_view"===n.filter&&(f=n.view.toString()),i.all([e.id(),t.id()]).then(function(e){var t=e[0]+e[1]+c+f+u+o
return s(t)}).then(function(e){return e=e.replace(/\//g,".").replace(/\+/g,"_"),"_local/"+e})}var i=e(62),s=e(50),a=e(95).collate
t.exports=o},{50:50,62:62,95:95}],77:[function(e,t,n){"use strict"
function r(e){return/^1-/.test(e)}function o(e,t,n){function o(t,r){var o={revs:!0,open_revs:r,attachments:!0,binary:!0}
return e.get(t,o).then(function(e){if(n.cancelled)throw new Error("cancelled")
e.forEach(function(e){e.ok&&p.push(e.ok)})})}function i(e){for(var n=t[e].missing,r=[],i=0;i<n.length;i+=c){var s=n.slice(i,Math.min(n.length,i+c))
r.push(s)}return a.all(r.map(function(t){return o(e,t)}))}function u(){var e=Object.keys(t)
return a.all(e.map(i))}function f(e){return e._attachments&&Object.keys(e._attachments).length>0}function d(o){return e.allDocs({keys:o,include_docs:!0}).then(function(e){if(n.cancelled)throw new Error("cancelled")
e.rows.forEach(function(e){!e.deleted&&e.doc&&r(e.value.rev)&&!f(e.doc)&&(p.push(e.doc),delete t[e.id])})})}function l(){var e=Object.keys(t).filter(function(e){var n=t[e].missing
return 1===n.length&&r(n[0])})
return e.length>0?d(e):void 0}function h(){return p}t=s(t)
var p=[]
return a.resolve().then(l).then(u).then(h)}var i=e(84),s=i.clone,a=i.Promise,c=50
t.exports=o},{84:84}],78:[function(e,t,n){"use strict"
function r(e,t){var n=t.PouchConstructor
return"string"==typeof e?new n(e,t):e}function o(e,t,n,o){if("function"==typeof n&&(o=n,n={}),"undefined"==typeof n&&(n={}),n.doc_ids&&!Array.isArray(n.doc_ids))throw c.error(c.BAD_REQUEST,"`doc_ids` filter parameter is not a list.")
n.complete=o,n=i.clone(n),n.continuous=n.continuous||n.live,n.retry="retry"in n?n.retry:!1,n.PouchConstructor=n.PouchConstructor||this
var u=new a(n),f=r(e,n),d=r(t,n)
return s(f,d,n,u),u}var i=e(84),s=e(79),a=e(80),c=e(48)
t.exports={replicate:o,toPouch:r}},{48:48,79:79,80:80,84:84}],79:[function(e,t,n){"use strict"
function r(e,t,n,u,f){function d(){return k?o.Promise.resolve():a(e,t,n).then(function(n){O=n,k=new i(e,t,O,M)})}function l(){if(0!==x.docs.length){var e=x.docs
return t.bulkDocs({docs:e,new_edits:!1}).then(function(t){if(M.cancelled)throw g(),new Error("cancelled")
var n=[],r={}
t.forEach(function(e){e.error&&(f.doc_write_failures++,n.push(e),r[e.id]=e)}),P=P.concat(n),f.docs_written+=x.docs.length-n.length
var i=n.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name})
if(U=[],e.forEach(function(e){var t=r[e._id]
t?u.emit("denied",o.clone(t)):U.push(e)}),i.length>0){var s=new Error("bulkDocs error")
throw s.other_errors=n,m("target.bulkDocs failed to write docs",s),new Error("bulkWrite partial failure")}},function(t){throw f.doc_write_failures+=e.length,t})}}function h(){return R=!0,k.writeCheckpoint(x.seq,H).then(function(){if(R=!1,M.cancelled)throw g(),new Error("cancelled")
f.last_seq=D=x.seq
var e=o.clone(f)
e.docs=U,u.emit("change",e),x=void 0,S()})["catch"](function(e){throw R=!1,m("writeCheckpoint completed with error",e),e})}function p(){var e={}
return x.changes.forEach(function(t){"_user/"!==t.id&&(e[t.id]=t.changes.map(function(e){return e.rev}))}),t.revsDiff(e).then(function(e){if(M.cancelled)throw g(),new Error("cancelled")
x.diffs=e})}function v(){return c(e,x.diffs,M).then(function(e){e.forEach(function(e){delete x.diffs[e._id],f.docs_read++,x.docs.push(e)})})}function _(){if(!M.cancelled&&!x){if(0===A.length)return void y(!0)
x=A.shift(),p().then(v).then(l).then(h).then(_)["catch"](function(e){m("batch processing terminated with error",e)})}}function y(e){return 0===q.changes.length?void(0!==A.length||x||((N&&J.live||C)&&(u.state="pending",u.emit("paused")),C&&g())):void((e||C||q.changes.length>=L)&&(A.push(q),q={seq:0,changes:[],docs:[]},("pending"===u.state||"stopped"===u.state)&&(u.state="active",u.emit("active")),_()))}function m(e,t){I||(t.message||(t.message=e),f.ok=!1,f.status="aborting",f.errors.push(t),P=P.concat(t),A=[],q={seq:0,changes:[],docs:[]},g())}function g(){if(!(I||M.cancelled&&(f.status="cancelled",R))){f.status=f.status||"complete",f.end_time=new Date,f.last_seq=D,I=M.cancelled=!0
var o=P.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name})
if(o.length>0){var i=P.pop()
P.length>0&&(i.other_errors=P),i.result=f,s(n,u,i,function(){r(e,t,n,u)})}else f.errors=P,u.emit("complete",f),u.removeAllListeners()}}function b(e){if(M.cancelled)return g()
var t=o.filterChange(n)(e)
t&&(q.seq=e.seq,q.changes.push(e),y(0===A.length))}function E(e){return B=!1,M.cancelled?g():(e.results.length>0?(J.since=e.last_seq,S()):N?(J.live=!0,S()):C=!0,void y(!0))}function w(e){return B=!1,M.cancelled?g():void m("changes rejected",e)}function S(){function t(){o.cancel()}function r(){u.removeListener("cancel",t)}if(!B&&!C&&A.length<j){B=!0,u._changes&&(u.removeListener("cancel",u._abortChanges),u._changes.cancel()),u.once("cancel",t)
var o=e.changes(J).on("change",b)
o.then(r,r),o.then(E)["catch"](w),n.retry&&(u._changes=o,u._abortChanges=t)}}function T(){d().then(function(){return M.cancelled?void g():k.getCheckpoint().then(function(e){D=e,J={since:D,limit:L,batch_size:L,style:"all_docs",doc_ids:F,returnDocs:!0},n.filter&&("string"!=typeof n.filter?J.include_docs=!0:J.filter=n.filter),n.query_params&&(J.query_params=n.query_params),n.view&&(J.view=n.view),S()})})["catch"](function(e){m("getCheckpoint rejected with ",e)})}var x,O,k,A=[],q={seq:0,changes:[],docs:[]},R=!1,C=!1,I=!1,D=0,N=n.continuous||n.live||!1,L=n.batch_size||100,j=n.batches_limit||10,B=!1,F=n.doc_ids,M={cancelled:!1},P=[],U=[],H=o.uuid()
f=f||{ok:!0,start_time:new Date,docs_read:0,docs_written:0,doc_write_failures:0,errors:[]}
var J={}
return u.ready(e,t),u.cancelled?void g():(u._addedListeners||(u.once("cancel",g),"function"==typeof n.complete&&(u.once("error",n.complete),u.once("complete",function(e){n.complete(null,e)})),u._addedListeners=!0),void("undefined"==typeof n.since?T():d().then(function(){return R=!0,k.writeCheckpoint(n.since,H)}).then(function(){return R=!1,M.cancelled?void g():(D=n.since,void T())})["catch"](function(e){throw R=!1,m("writeCheckpoint completed with error",e),e})))}var o=e(84),i=e(75),s=e(74),a=e(76),c=e(77)
t.exports=r},{74:74,75:75,76:76,77:77,84:84}],80:[function(e,t,n){"use strict"
function r(){i.call(this),this.cancelled=!1,this.state="pending"
var e=this,t=new s(function(t,n){e.once("complete",t),e.once("error",n)})
e.then=function(e,n){return t.then(e,n)},e["catch"]=function(e){return t["catch"](e)},e["catch"](function(){})}var o=e(84),i=e(87).EventEmitter,s=o.Promise
o.inherits(r,i),r.prototype.cancel=function(){this.cancelled=!0,this.state="cancelled",this.emit("cancel")},r.prototype.ready=function(e,t){function n(){o.cancel()}function r(){e.removeListener("destroyed",n),t.removeListener("destroyed",n)}var o=this
o._readyCalled||(o._readyCalled=!0,e.once("destroyed",n),t.once("destroyed",n),o.once("complete",r))},t.exports=r},{84:84,87:87}],81:[function(e,t,n){"use strict"
function r(e){Object.keys(s.prototype).forEach(function(t){"function"==typeof s.prototype[t]&&(e[t]=c[t].bind(c))})
var t=e._destructionListeners=new i.Map
e.on("destroyed",function(e){t.has(e)&&(t.get(e).forEach(function(e){e()}),t["delete"](e))})}var o=e(16),i=e(84),s=e(87).EventEmitter,a=e(46)
o.adapters={},o.preferredAdapters=[],o.prefix="_pouch_"
var c=new s
r(o),o.parseAdapter=function(e,t){var n,r,i=e.match(/([a-z\-]*):\/\/(.*)/)
if(i){if(e=/http(s?)/.test(i[1])?i[1]+"://"+i[2]:i[2],n=i[1],!o.adapters[n].valid())throw"Invalid adapter"
return{name:e,adapter:i[1]}}var s="idb"in o.adapters&&"websql"in o.adapters&&a()&&localStorage["_pouch__websqldb_"+o.prefix+e]
if(t.adapter)r=t.adapter
else if("undefined"!=typeof t&&t.db)r="leveldb"
else for(var c=0;c<o.preferredAdapters.length;++c)if(r=o.preferredAdapters[c],r in o.adapters){if(s&&"idb"===r){console.log('PouchDB is downgrading "'+e+'" to WebSQL to avoid data loss, because it was already opened with WebSQL.')
continue}break}n=o.adapters[r]
var u=n&&"use_prefix"in n?n.use_prefix:!0
return{name:u?o.prefix+e:e,adapter:r}},o.destroy=i.toPromise(function(e,t,n){console.log("PouchDB.destroy() is deprecated and will be removed. Please use db.destroy() instead."),("function"==typeof t||"undefined"==typeof t)&&(n=t,t={}),e&&"object"==typeof e&&(t=e,e=void 0),new o(e,t,function(e,t){return e?n(e):void t.destroy(n)})}),o.adapter=function(e,t,n){t.valid()&&(o.adapters[e]=t,n&&o.preferredAdapters.push(e))},o.plugin=function(e){return Object.keys(e).forEach(function(t){o.prototype[t]=e[t]}),o},o.defaults=function(e){function t(n,r,s){return this instanceof t?(("function"==typeof r||"undefined"==typeof r)&&(s=r,r={}),n&&"object"==typeof n&&(r=n,n=void 0),r=i.extend({},e,r),void o.call(this,n,r,s)):new t(n,r,s)}return i.inherits(t,o),t.destroy=i.toPromise(function(t,n,r){return("function"==typeof n||"undefined"==typeof n)&&(r=n,n={}),t&&"object"==typeof t&&(n=t,t=void 0),n=i.extend({},e,n),o.destroy(t,n,r)}),r(t),t.preferredAdapters=o.preferredAdapters.slice(),Object.keys(o).forEach(function(e){e in t||(t[e]=o[e])}),t},t.exports=o},{16:16,46:46,84:84,87:87}],82:[function(e,t,n){"use strict"
function r(e,t,n,r){return"function"==typeof n&&(r=n,n={}),"undefined"==typeof n&&(n={}),n=i.clone(n),n.PouchConstructor=n.PouchConstructor||this,e=s.toPouch(e,n),t=s.toPouch(t,n),new o(e,t,n,r)}function o(e,t,n,r){function o(e){d.emit("change",{direction:"pull",change:e})}function s(e){d.emit("change",{direction:"push",change:e})}function c(e){d.emit("denied",{direction:"push",doc:e})}function u(e){d.emit("denied",{direction:"pull",doc:e})}function f(e){return function(t,n){var r="change"===t&&(n===o||n===s),i=t in l;(r||i)&&(t in h||(h[t]={}),h[t][e]=!0,2===Object.keys(h[t]).length&&d.removeAllListeners(t))}}var d=this
this.canceled=!1,this.push=a(e,t,n),this.pull=a(t,e,n)
var l={},h={}
n.live&&(this.push.on("complete",d.pull.cancel.bind(d.pull)),this.pull.on("complete",d.push.cancel.bind(d.push))),this.on("newListener",function(e){"change"===e?(d.pull.on("change",o),d.push.on("change",s)):"denied"===e&&(d.pull.on("denied",u),d.push.on("denied",c))}),this.on("removeListener",function(e){"change"===e&&(d.pull.removeListener("change",o),d.push.removeListener("change",s))}),this.pull.on("removeListener",f("pull")),this.push.on("removeListener",f("push"))
var p=i.Promise.all([this.push,this.pull]).then(function(e){var t={push:e[0],pull:e[1]}
return d.emit("complete",t),r&&r(null,t),d.removeAllListeners(),t},function(e){if(d.cancel(),r?r(e):d.emit("error",e),d.removeAllListeners(),r)throw e})
this.then=function(e,t){return p.then(e,t)},this["catch"]=function(e){return p["catch"](e)}}var i=e(84),s=e(78),a=s.replicate,c=e(87).EventEmitter
i.inherits(o,c),t.exports=r,o.prototype.cancel=function(){this.canceled||(this.canceled=!0,this.push.cancel(),this.pull.cancel())}},{78:78,84:84,87:87}],83:[function(e,t,n){"use strict"
function r(){this.isReady=!1,this.failed=!1,this.queue=[]}t.exports=r,r.prototype.execute=function(){var e
if(this.failed)for(;e=this.queue.shift();)e(this.failed)
else for(;e=this.queue.shift();)e()},r.prototype.fail=function(e){this.failed=e,this.execute()},r.prototype.ready=function(e){this.isReady=!0,this.db=e,this.execute()},r.prototype.addTask=function(e){this.queue.push(e),this.failed&&this.execute()}},{}],84:[function(e,t,n){function r(e,t,n){try{return!e(t,n)}catch(r){var o="Filter function threw: "+r.toString()
return u.error(u.BAD_REQUEST,o)}}var o=e(56)
n.ajax=e(25),n.uuid=e(65),n.getArguments=e(86)
var i=e(97)
n.Map=i.Map,n.Set=i.Set
var s=e(42),a=e(62)
n.Promise=a
var c=e(28),u=e(48)
n.atob=c.atob,n.btoa=c.btoa
var f=e(31)
n.binaryStringToBlobOrBuffer=f,n.clone=e(37),n.extend=e(49),n.pick=e(61),n.inherits=e(92),n.filterChange=function(e){var t={},n=e.filter&&"function"==typeof e.filter
return t.query=e.query_params,function(o){o.doc||(o.doc={})
var i=n&&r(e.filter,o.doc,t)
if("object"==typeof i)return i
if(i)return!1
if(e.include_docs){if(!e.attachments)for(var s in o.doc._attachments)o.doc._attachments.hasOwnProperty(s)&&(o.doc._attachments[s].stub=!0)}else delete o.doc
return!0}},n.parseDoc=s.parseDoc,n.invalidIdError=s.invalidIdError,n.isCordova=function(){return"undefined"!=typeof cordova||"undefined"!=typeof PhoneGap||"undefined"!=typeof phonegap},n.Changes=e(15),n.once=e(58),n.toPromise=e(63),n.adapterFun=function(t,r){function o(e,t,n){if(i.enabled){for(var r=[e._db_name,t],o=0;o<n.length-1;o++)r.push(n[o])
i.apply(null,r)
var s=n[n.length-1]
n[n.length-1]=function(n,r){var o=[e._db_name,t]
o=o.concat(n?["error",n]:["success",r]),i.apply(null,o),s(n,r)}}}var i=e(89)("pouchdb:api")
return n.toPromise(n.getArguments(function(e){if(this._closed)return a.reject(new Error("database is closed"))
var n=this
return o(n,t,e),this.taskqueue.isReady?r.apply(this,e):new a(function(r,o){n.taskqueue.addTask(function(i){i?o(i):r(n[t].apply(n,e))})})}))},n.explain404=e(22),n.parseUri=e(60),n.compare=function(e,t){return t>e?-1:e>t?1:0},n.compactTree=function(e){var t=[]
return o(e.rev_tree,function(e,n,r,o,i){"available"!==i.status||e||(t.push(n+"-"+r),i.status="missing")}),t}
var d=e(99)
n.safeJsonParse=function(e){try{return JSON.parse(e)}catch(t){return d.parse(e)}},n.safeJsonStringify=function(e){try{return JSON.stringify(e)}catch(t){return d.stringify(e)}}},{15:15,22:22,25:25,28:28,31:31,37:37,42:42,48:48,49:49,56:56,58:58,60:60,61:61,62:62,63:63,65:65,86:86,89:89,92:92,97:97,99:99}],85:[function(e,t,n){t.exports="4.0.3"},{}],86:[function(e,t,n){"use strict"
function r(e){return function(){var t=arguments.length
if(t){for(var n=[],r=-1;++r<t;)n[r]=arguments[r]
return e.call(this,n)}return e.call(this,[])}}t.exports=r},{}],87:[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function i(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!i(e)||0>e||isNaN(e))throw TypeError("n must be a positive number")
return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,i,c,u
if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t
throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],a(n))return!1
if(o(n))switch(arguments.length){case 1:n.call(this)
break
case 2:n.call(this,arguments[1])
break
case 3:n.call(this,arguments[1],arguments[2])
break
default:for(r=arguments.length,i=new Array(r-1),c=1;r>c;c++)i[c-1]=arguments[c]
n.apply(this,i)}else if(s(n)){for(r=arguments.length,i=new Array(r-1),c=1;r>c;c++)i[c-1]=arguments[c]
for(u=n.slice(),r=u.length,c=0;r>c;c++)u[c].apply(this,i)}return!0},r.prototype.addListener=function(e,t){var n
if(!o(t))throw TypeError("listener must be a function")
if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned){var n
n=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function")
var r=!1
return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,i,a
if(!o(t))throw TypeError("listener must be a function")
if(!this._events||!this._events[e])return this
if(n=this._events[e],i=n.length,r=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t)
else if(s(n)){for(a=i;a-->0;)if(n[a]===t||n[a].listener&&n[a].listener===t){r=a
break}if(0>r)return this
1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n
if(!this._events)return this
if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this
if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t)
return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],o(n))this.removeListener(e,n)
else for(;n.length;)this.removeListener(e,n[n.length-1])
return delete this._events[e],this},r.prototype.listeners=function(e){var t
return t=this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.listenerCount=function(e,t){var n
return n=e._events&&e._events[t]?o(e._events[t])?1:e._events[t].length:0}},{}],88:[function(e,t,n){function r(){f=!1,a.length?u=a.concat(u):d=-1,u.length&&o()}function o(){if(!f){var e=setTimeout(r)
f=!0
for(var t=u.length;t;){for(a=u,u=[];++d<t;)a&&a[d].run()
d=-1,t=u.length}a=null,f=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function s(){}var a,c=t.exports={},u=[],f=!1,d=-1
c.nextTick=function(e){var t=new Array(arguments.length-1)
if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n]
u.push(new i(e,t)),1!==u.length||f||setTimeout(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=s,c.addListener=s,c.once=s,c.off=s,c.removeListener=s,c.removeAllListeners=s,c.emit=s,c.binding=function(e){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(e){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],89:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors
if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e
var r="color: "+this.color
e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1))
var o=0,i=0
return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r),e}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(t){}}function a(){var e
try{e=n.storage.debug}catch(t){}return e}function c(){try{return window.localStorage}catch(e){}}n=t.exports=e(90),n.log=i,n.formatArgs=o,n.save=s,n.load=a,n.useColors=r,n.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(a())},{90:90}],90:[function(e,t,n){function r(){return n.colors[f++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,i=t-(u||t)
e.diff=i,e.prev=u,e.curr=t,u=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r())
var s=Array.prototype.slice.call(arguments)
s[0]=n.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s))
var a=0
s[0]=s[0].replace(/%([a-z%])/g,function(t,r){if("%%"===t)return t
a++
var o=n.formatters[r]
if("function"==typeof o){var i=s[a]
t=o.call(e,i),s.splice(a,1),a--}return t}),"function"==typeof n.formatArgs&&(s=n.formatArgs.apply(e,s))
var c=o.log||n.log||console.log.bind(console)
c.apply(e,s)}t.enabled=!1,o.enabled=!0
var i=n.enabled(e)?o:t
return i.namespace=e,i}function i(e){n.save(e)
for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;r>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function s(){n.enable("")}function a(e){var t,r
for(t=0,r=n.skips.length;r>t;t++)if(n.skips[t].test(e))return!1
for(t=0,r=n.names.length;r>t;t++)if(n.names[t].test(e))return!0
return!1}function c(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=c,n.disable=s,n.enable=i,n.enabled=a,n.humanize=e(91),n.names=[],n.skips=[],n.formatters={}
var u,f=0},{91:91}],91:[function(e,t,n){function r(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e)
if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase()
switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*d
case"days":case"day":case"d":return n*f
case"hours":case"hour":case"hrs":case"hr":case"h":return n*u
case"minutes":case"minute":case"mins":case"min":case"m":return n*c
case"seconds":case"second":case"secs":case"sec":case"s":return n*a
case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=u?Math.round(e/u)+"h":e>=c?Math.round(e/c)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function i(e){return s(e,f,"day")||s(e,u,"hour")||s(e,c,"minute")||s(e,a,"second")||e+" ms"}function s(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var a=1e3,c=60*a,u=60*c,f=24*u,d=365.25*f
t.exports=function(e,t){return t=t||{},"string"==typeof e?r(e):t["long"]?i(e):o(e)}},{}],92:[function(e,t,n){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t
var n=function(){}
n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],93:[function(e,t,n){"use strict"
function r(){}function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function")
this.state=m,this.queue=[],this.outcome=void 0,e!==r&&c(this,e)}function i(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function s(e,t,n){p(function(){var r
try{r=t(n)}catch(o){return v.reject(e,o)}r===e?v.reject(e,new TypeError("Cannot resolve promise with itself")):v.resolve(e,r)})}function a(e){var t=e&&e.then
return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}function c(e,t){function n(t){i||(i=!0,v.reject(e,t))}function r(t){i||(i=!0,v.resolve(e,t))}function o(){t(r,n)}var i=!1,s=u(o)
"error"===s.status&&n(s.value)}function u(e,t){var n={}
try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}function f(e){return e instanceof this?e:v.resolve(new this(r),e)}function d(e){var t=new this(r)
return v.reject(t,e)}function l(e){function t(e,t){function r(e){s[t]=e,++a!==o||i||(i=!0,v.resolve(u,s))}n.resolve(e).then(r,function(e){i||(i=!0,v.reject(u,e))})}var n=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var o=e.length,i=!1
if(!o)return this.resolve([])
for(var s=new Array(o),a=0,c=-1,u=new this(r);++c<o;)t(e[c],c)
return u}function h(e){function t(e){n.resolve(e).then(function(e){i||(i=!0,v.resolve(a,e))},function(e){i||(i=!0,v.reject(a,e))})}var n=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var o=e.length,i=!1
if(!o)return this.resolve([])
for(var s=-1,a=new this(r);++s<o;)t(e[s])
return a}var p=e(94),v={},_=["REJECTED"],y=["FULFILLED"],m=["PENDING"]
t.exports=n=o,o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===y||"function"!=typeof t&&this.state===_)return this
var n=new this.constructor(r)
if(this.state!==m){var o=this.state===y?e:t
s(n,o,this.outcome)}else this.queue.push(new i(n,e,t))
return n},i.prototype.callFulfilled=function(e){v.resolve(this.promise,e)},i.prototype.otherCallFulfilled=function(e){s(this.promise,this.onFulfilled,e)},i.prototype.callRejected=function(e){v.reject(this.promise,e)},i.prototype.otherCallRejected=function(e){s(this.promise,this.onRejected,e)},v.resolve=function(e,t){var n=u(a,t)
if("error"===n.status)return v.reject(e,n.value)
var r=n.value
if(r)c(e,r)
else{e.state=y,e.outcome=t
for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(t)}return e},v.reject=function(e,t){e.state=_,e.outcome=t
for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t)
return e},n.resolve=f,n.reject=d,n.all=l,n.race=h},{94:94}],94:[function(e,t,n){(function(e){"use strict"
function n(){f=!0
for(var e,t,n=d.length;n;){for(t=d,d=[],e=-1;++e<n;)t[e]()
n=d.length}f=!1}function r(e){1!==d.push(e)||f||o()}var o,i=e.MutationObserver||e.WebKitMutationObserver
if(i){var s=0,a=new i(n),c=e.document.createTextNode("")
a.observe(c,{characterData:!0}),o=function(){c.data=s=++s%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)o="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script")
t.onreadystatechange=function(){n(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(n,0)}
else{var u=new e.MessageChannel
u.port1.onmessage=n,o=function(){u.port2.postMessage(0)}}var f,d=[]
t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],95:[function(e,t,n){"use strict"
function r(e){if(null!==e)switch(typeof e){case"boolean":return e?1:0
case"number":return f(e)
case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"")
case"object":var t=Array.isArray(e),r=t?e:Object.keys(e),o=-1,i=r.length,s=""
if(t)for(;++o<i;)s+=n.toIndexableString(r[o])
else for(;++o<i;){var a=r[o]
s+=n.toIndexableString(a)+n.toIndexableString(e[a])}return s}return""}function o(e,t){var n,r=t,o="1"===e[t]
if(o)n=0,t++
else{var i="0"===e[t]
t++
var s="",a=e.substring(t,t+l),c=parseInt(a,10)+d
for(i&&(c=-c),t+=l;;){var u=e[t]
if("\x00"===u)break
s+=u,t++}s=s.split("."),n=1===s.length?parseInt(s,10):parseFloat(s[0]+"."+s[1]),i&&(n-=10),0!==c&&(n=parseFloat(n+"e"+c))}return{num:n,length:t-r}}function i(e,t){var n=e.pop()
if(t.length){var r=t[t.length-1]
n===r.element&&(t.pop(),r=t[t.length-1])
var o=r.element,i=r.index
if(Array.isArray(o))o.push(n)
else if(i===e.length-2){var s=e.pop()
o[s]=n}else e.push(n)}}function s(e,t){for(var r=Math.min(e.length,t.length),o=0;r>o;o++){var i=n.collate(e[o],t[o])
if(0!==i)return i}return e.length===t.length?0:e.length>t.length?1:-1}function a(e,t){return e===t?0:e>t?1:-1}function c(e,t){for(var r=Object.keys(e),o=Object.keys(t),i=Math.min(r.length,o.length),s=0;i>s;s++){var a=n.collate(r[s],o[s])
if(0!==a)return a
if(a=n.collate(e[r[s]],t[o[s]]),0!==a)return a}return r.length===o.length?0:r.length>o.length?1:-1}function u(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e)
return~n?null===e?1:Array.isArray(e)?5:3>n?n+2:n+3:Array.isArray(e)?5:void 0}function f(e){if(0===e)return"1"
var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),r=0>e,o=r?"0":"2",i=(r?-n:n)-d,s=p.padLeft(i.toString(),"0",l)
o+=h+s
var a=Math.abs(parseFloat(t[0]))
r&&(a=10-a)
var c=a.toFixed(20)
return c=c.replace(/\.?0+$/,""),o+=h+c}var d=-324,l=3,h="",p=e(96)
n.collate=function(e,t){if(e===t)return 0
e=n.normalizeKey(e),t=n.normalizeKey(t)
var r=u(e),o=u(t)
if(r-o!==0)return r-o
if(null===e)return 0
switch(typeof e){case"number":return e-t
case"boolean":return e===t?0:t>e?-1:1
case"string":return a(e,t)}return Array.isArray(e)?s(e,t):c(e,t)},n.normalizeKey=function(e){switch(typeof e){case"undefined":return null
case"number":return e===1/0||e===-(1/0)||isNaN(e)?null:e
case"object":var t=e
if(Array.isArray(e)){var r=e.length
e=new Array(r)
for(var o=0;r>o;o++)e[o]=n.normalizeKey(t[o])}else{if(e instanceof Date)return e.toJSON()
if(null!==e){e={}
for(var i in t)if(t.hasOwnProperty(i)){var s=t[i]
"undefined"!=typeof s&&(e[i]=n.normalizeKey(s))}}}}return e},n.toIndexableString=function(e){var t="\x00"
return e=n.normalizeKey(e),u(e)+h+r(e)+t},n.parseIndexableString=function(e){for(var t=[],n=[],r=0;;){var s=e[r++]
if("\x00"!==s)switch(s){case"1":t.push(null)
break
case"2":t.push("1"===e[r]),r++
break
case"3":var a=o(e,r)
t.push(a.num),r+=a.length
break
case"4":for(var c="";;){var u=e[r]
if("\x00"===u)break
c+=u,r++}c=c.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(c)
break
case"5":var f={element:[],index:t.length}
t.push(f.element),n.push(f)
break
case"6":var d={element:{},index:t.length}
t.push(d.element),n.push(d)
break
default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+s)}else{if(1===t.length)return t.pop()
i(t,n)}}}},{96:96}],96:[function(e,t,n){"use strict"
function r(e,t,n){for(var r="",o=n-e.length;r.length<o;)r+=t
return r}n.padLeft=function(e,t,n){var o=r(e,t,n)
return o+e},n.padRight=function(e,t,n){var o=r(e,t,n)
return e+o},n.stringLexCompare=function(e,t){var n,r=e.length,o=t.length
for(n=0;r>n;n++){if(n===o)return 1
var i=e.charAt(n),s=t.charAt(n)
if(i!==s)return s>i?-1:1}return o>r?-1:0},n.intToDecimalForm=function(e){var t=0>e,n=""
do{var r=t?-Math.ceil(e%10):Math.floor(e%10)
n=r+n,e=t?Math.ceil(e/10):Math.floor(e/10)}while(e)
return t&&"0"!==n&&(n="-"+n),n}},{}],97:[function(e,t,n){"use strict"
function r(){this.store={}}function o(e){if(this.store=new r,e&&Array.isArray(e))for(var t=0,n=e.length;n>t;t++)this.add(e[t])}n.Map=r,n.Set=o,r.prototype.mangle=function(e){if("string"!=typeof e)throw new TypeError("key must be a string but Got "+e)
return"$"+e},r.prototype.unmangle=function(e){return e.substring(1)},r.prototype.get=function(e){var t=this.mangle(e)
return t in this.store?this.store[t]:void 0},r.prototype.set=function(e,t){var n=this.mangle(e)
return this.store[n]=t,!0},r.prototype.has=function(e){var t=this.mangle(e)
return t in this.store},r.prototype["delete"]=function(e){var t=this.mangle(e)
return t in this.store?(delete this.store[t],!0):!1},r.prototype.forEach=function(e){for(var t=Object.keys(this.store),n=0,r=t.length;r>n;n++){var o=t[n],i=this.store[o]
o=this.unmangle(o),e(i,o)}},o.prototype.add=function(e){return this.store.set(e,!0)},o.prototype.has=function(e){return this.store.has(e)},o.prototype["delete"]=function(e){return this.store["delete"](e)}},{}],98:[function(e,t,n){!function(e){if("object"==typeof n)t.exports=e()
else if("function"==typeof define&&define.amd)define(e)
else{var r
try{r=window}catch(o){r=self}r.SparkMD5=e()}}(function(e){"use strict"
var t=function(e,t){return e+t&4294967295},n=function(e,n,r,o,i,s){return n=t(t(n,e),t(o,s)),t(n<<i|n>>>32-i,r)},r=function(e,t,r,o,i,s,a){return n(t&r|~t&o,e,t,i,s,a)},o=function(e,t,r,o,i,s,a){return n(t&o|r&~o,e,t,i,s,a)},i=function(e,t,r,o,i,s,a){return n(t^r^o,e,t,i,s,a)},s=function(e,t,r,o,i,s,a){return n(r^(t|~o),e,t,i,s,a)},a=function(e,n){var a=e[0],c=e[1],u=e[2],f=e[3]
a=r(a,c,u,f,n[0],7,-680876936),f=r(f,a,c,u,n[1],12,-389564586),u=r(u,f,a,c,n[2],17,606105819),c=r(c,u,f,a,n[3],22,-1044525330),a=r(a,c,u,f,n[4],7,-176418897),f=r(f,a,c,u,n[5],12,1200080426),u=r(u,f,a,c,n[6],17,-1473231341),c=r(c,u,f,a,n[7],22,-45705983),a=r(a,c,u,f,n[8],7,1770035416),f=r(f,a,c,u,n[9],12,-1958414417),u=r(u,f,a,c,n[10],17,-42063),c=r(c,u,f,a,n[11],22,-1990404162),a=r(a,c,u,f,n[12],7,1804603682),f=r(f,a,c,u,n[13],12,-40341101),u=r(u,f,a,c,n[14],17,-1502002290),c=r(c,u,f,a,n[15],22,1236535329),a=o(a,c,u,f,n[1],5,-165796510),f=o(f,a,c,u,n[6],9,-1069501632),u=o(u,f,a,c,n[11],14,643717713),c=o(c,u,f,a,n[0],20,-373897302),a=o(a,c,u,f,n[5],5,-701558691),f=o(f,a,c,u,n[10],9,38016083),u=o(u,f,a,c,n[15],14,-660478335),c=o(c,u,f,a,n[4],20,-405537848),a=o(a,c,u,f,n[9],5,568446438),f=o(f,a,c,u,n[14],9,-1019803690),u=o(u,f,a,c,n[3],14,-187363961),c=o(c,u,f,a,n[8],20,1163531501),a=o(a,c,u,f,n[13],5,-1444681467),f=o(f,a,c,u,n[2],9,-51403784),u=o(u,f,a,c,n[7],14,1735328473),c=o(c,u,f,a,n[12],20,-1926607734),a=i(a,c,u,f,n[5],4,-378558),f=i(f,a,c,u,n[8],11,-2022574463),u=i(u,f,a,c,n[11],16,1839030562),c=i(c,u,f,a,n[14],23,-35309556),a=i(a,c,u,f,n[1],4,-1530992060),f=i(f,a,c,u,n[4],11,1272893353),u=i(u,f,a,c,n[7],16,-155497632),c=i(c,u,f,a,n[10],23,-1094730640),a=i(a,c,u,f,n[13],4,681279174),f=i(f,a,c,u,n[0],11,-358537222),u=i(u,f,a,c,n[3],16,-722521979),c=i(c,u,f,a,n[6],23,76029189),a=i(a,c,u,f,n[9],4,-640364487),f=i(f,a,c,u,n[12],11,-421815835),u=i(u,f,a,c,n[15],16,530742520),c=i(c,u,f,a,n[2],23,-995338651),a=s(a,c,u,f,n[0],6,-198630844),f=s(f,a,c,u,n[7],10,1126891415),u=s(u,f,a,c,n[14],15,-1416354905),c=s(c,u,f,a,n[5],21,-57434055),a=s(a,c,u,f,n[12],6,1700485571),f=s(f,a,c,u,n[3],10,-1894986606),u=s(u,f,a,c,n[10],15,-1051523),c=s(c,u,f,a,n[1],21,-2054922799),a=s(a,c,u,f,n[8],6,1873313359),f=s(f,a,c,u,n[15],10,-30611744),u=s(u,f,a,c,n[6],15,-1560198380),c=s(c,u,f,a,n[13],21,1309151649),a=s(a,c,u,f,n[4],6,-145523070),f=s(f,a,c,u,n[11],10,-1120210379),u=s(u,f,a,c,n[2],15,718787259),c=s(c,u,f,a,n[9],21,-343485551),e[0]=t(a,e[0]),e[1]=t(c,e[1]),e[2]=t(u,e[2]),e[3]=t(f,e[3])},c=function(e){var t,n=[]
for(t=0;64>t;t+=4)n[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24)
return n},u=function(e){var t,n=[]
for(t=0;64>t;t+=4)n[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24)
return n},f=function(e){var t,n,r,o,i,s,u=e.length,f=[1732584193,-271733879,-1732584194,271733878]
for(t=64;u>=t;t+=64)a(f,c(e.substring(t-64,t)))
for(e=e.substring(t-64),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e.charCodeAt(t)<<(t%4<<3)
if(r[t>>2]|=128<<(t%4<<3),t>55)for(a(f,r),t=0;16>t;t+=1)r[t]=0
return o=8*u,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),s=parseInt(o[1],16)||0,r[14]=i,r[15]=s,a(f,r),f},d=function(e){var t,n,r,o,i,s,c=e.length,f=[1732584193,-271733879,-1732584194,271733878]
for(t=64;c>=t;t+=64)a(f,u(e.subarray(t-64,t)))
for(e=c>t-64?e.subarray(t-64):new Uint8Array(0),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e[t]<<(t%4<<3)
if(r[t>>2]|=128<<(t%4<<3),t>55)for(a(f,r),t=0;16>t;t+=1)r[t]=0
return o=8*c,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),s=parseInt(o[1],16)||0,r[14]=i,r[15]=s,a(f,r),f},l=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],h=function(e){var t,n=""
for(t=0;4>t;t+=1)n+=l[e>>8*t+4&15]+l[e>>8*t&15]
return n},p=function(e){var t
for(t=0;t<e.length;t+=1)e[t]=h(e[t])
return e.join("")},v=function(e){return p(f(e))},_=function(){this.reset()}
return"5d41402abc4b2a76b9719d911017c592"!==v("hello")&&(t=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16)
return r<<16|65535&n}),_.prototype.append=function(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),this.appendBinary(e),this},_.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length
var t,n=this._buff.length
for(t=64;n>=t;t+=64)a(this._state,c(this._buff.substring(t-64,t)))
return this._buff=this._buff.substr(t-64),this},_.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
for(t=0;o>t;t+=1)i[t>>2]|=r.charCodeAt(t)<<(t%4<<3)
return this._finish(i,o),n=e?this._state:p(this._state),this.reset(),n},_.prototype._finish=function(e,t){var n,r,o,i=t
if(e[i>>2]|=128<<(i%4<<3),i>55)for(a(this._state,e),i=0;16>i;i+=1)e[i]=0
n=8*this._length,n=n.toString(16).match(/(.*?)(.{0,8})$/),r=parseInt(n[2],16),o=parseInt(n[1],16)||0,e[14]=r,e[15]=o,a(this._state,e)},_.prototype.reset=function(){return this._buff="",this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},_.prototype.destroy=function(){delete this._state,delete this._buff,delete this._length},_.hash=function(e,t){/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e)))
var n=f(e)
return t?n:p(n)},_.hashBinary=function(e,t){var n=f(e)
return t?n:p(n)},_.ArrayBuffer=function(){this.reset()},_.ArrayBuffer.prototype.append=function(e){var t,n=this._concatArrayBuffer(this._buff,e),r=n.length
for(this._length+=e.byteLength,t=64;r>=t;t+=64)a(this._state,u(n.subarray(t-64,t)))
return this._buff=r>t-64?n.subarray(t-64):new Uint8Array(0),this},_.ArrayBuffer.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
for(t=0;o>t;t+=1)i[t>>2]|=r[t]<<(t%4<<3)
return this._finish(i,o),n=e?this._state:p(this._state),this.reset(),n},_.ArrayBuffer.prototype._finish=_.prototype._finish,_.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},_.ArrayBuffer.prototype.destroy=_.prototype.destroy,_.ArrayBuffer.prototype._concatArrayBuffer=function(e,t){var n=e.length,r=new Uint8Array(n+t.byteLength)
return r.set(e),r.set(new Uint8Array(t),n),r},_.ArrayBuffer.hash=function(e,t){var n=d(new Uint8Array(e))
return t?n:p(n)},_})},{}],99:[function(e,t,n){"use strict"
function r(e,t,n){var r=n[n.length-1]
e===r.element&&(n.pop(),r=n[n.length-1])
var o=r.element,i=r.index
if(Array.isArray(o))o.push(e)
else if(i===t.length-2){var s=t.pop()
o[s]=e}else t.push(e)}n.stringify=function(e){var t=[]
t.push({obj:e})
for(var n,r,o,i,s,a,c,u,f,d,l,h="";n=t.pop();)if(r=n.obj,o=n.prefix||"",i=n.val||"",h+=o,i)h+=i
else if("object"!=typeof r)h+="undefined"==typeof r?null:JSON.stringify(r)
else if(null===r)h+="null"
else if(Array.isArray(r)){for(t.push({val:"]"}),s=r.length-1;s>=0;s--)a=0===s?"":",",t.push({obj:r[s],prefix:a})
t.push({val:"["})}else{c=[]
for(u in r)r.hasOwnProperty(u)&&c.push(u)
for(t.push({val:"}"}),s=c.length-1;s>=0;s--)f=c[s],d=r[f],l=s>0?",":"",l+=JSON.stringify(f)+":",t.push({obj:d,prefix:l})
t.push({val:"{"})}return h},n.parse=function(e){for(var t,n,o,i,s,a,c,u,f,d=[],l=[],h=0;;)if(t=e[h++],"}"!==t&&"]"!==t&&"undefined"!=typeof t)switch(t){case" ":case"	":case"\n":case":":case",":break
case"n":h+=3,r(null,d,l)
break
case"t":h+=3,r(!0,d,l)
break
case"f":h+=4,r(!1,d,l)
break
case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":for(n="",h--;;){if(o=e[h++],!/[\d\.\-e\+]/.test(o)){h--
break}n+=o}r(parseFloat(n),d,l)
break
case'"':for(i="",s=void 0,a=0;;){if(c=e[h++],'"'===c&&("\\"!==s||a%2!==1))break
i+=c,s=c,"\\"===s?a++:a=0}r(JSON.parse('"'+i+'"'),d,l)
break
case"[":u={element:[],index:d.length},d.push(u.element),l.push(u)
break
case"{":f={element:{},index:d.length},d.push(f.element),l.push(f)
break
default:throw new Error("unexpectedly reached end of input: "+t)}else{if(1===d.length)return d.pop()
r(d.pop(),d,l)}}},{}],100:[function(e,t,n){"use strict"
var r=e(81)
t.exports=r,r.ajax=e(25),r.utils=e(84),r.Errors=e(48),r.replicate=e(78).replicate,r.sync=e(82),r.version=e(85)
var o=e(3)
r.adapter("http",o),r.adapter("https",o),r.plugin(e(70))
var i=e(2)
Object.keys(i).forEach(function(e){r.adapter(e,i[e],!0)})},{2:2,25:25,3:3,48:48,70:70,78:78,81:81,82:82,84:84,85:85}]},{},[100])(100)})
