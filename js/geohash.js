/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
"use strict"
var Geohash={}
Geohash.base32="0123456789bcdefghjkmnpqrstuvwxyz",Geohash.encode=function(e,a,n){if("undefined"==typeof n){for(var h=1;12>=h;h++){var o=Geohash.encode(e,a,h),r=Geohash.decode(o)
if(r.lat==e&&r.lon==a)return o}n=12}if(e=Number(e),a=Number(a),n=Number(n),isNaN(e)||isNaN(a)||isNaN(n))throw new Error("Invalid geohash")
for(var t=0,s=0,d=!0,f="",c=-90,i=90,u=-180,w=180;f.length<n;){if(d){var l=(u+w)/2
a>l?(t=2*t+1,u=l):(t=2*t,w=l)}else{var v=(c+i)/2
e>v?(t=2*t+1,c=v):(t=2*t,i=v)}d=!d,5==++s&&(f+=Geohash.base32.charAt(t),s=0,t=0)}return f},Geohash.decode=function(e){var a=Geohash.bounds(e),n=a.sw.lat,h=a.sw.lon,o=a.ne.lat,r=a.ne.lon,t=(n+o)/2,s=(h+r)/2
return t=t.toFixed(Math.floor(2-Math.log(o-n)/Math.LN10)),s=s.toFixed(Math.floor(2-Math.log(r-h)/Math.LN10)),{lat:Number(t),lon:Number(s)}},Geohash.bounds=function(e){if(0===e.length)throw new Error("Invalid geohash")
e=e.toLowerCase()
for(var a=!0,n=-90,h=90,o=-180,r=180,t=0;t<e.length;t++){var s=e.charAt(t),d=Geohash.base32.indexOf(s)
if(-1==d)throw new Error("Invalid geohash")
for(var f=4;f>=0;f--){var c=d>>f&1
if(a){var i=(o+r)/2
1==c?o=i:r=i}else{var u=(n+h)/2
1==c?n=u:h=u}a=!a}}var w={sw:{lat:n,lon:o},ne:{lat:h,lon:r}}
return w},Geohash.adjacent=function(e,a){if(e=e.toLowerCase(),a=a.toLowerCase(),0===e.length)throw new Error("Invalid geohash")
if(-1=="nsew".indexOf(a))throw new Error("Invalid direction")
var n={n:["p0r21436x8zb9dcf5h7kjnmqesgutwvy","bc01fg45238967deuvhjyznpkmstqrwx"],s:["14365h7k9dcfesgujnmqp0r2twvyx8zb","238967debc01fg45kmstqrwxuvhjyznp"],e:["bc01fg45238967deuvhjyznpkmstqrwx","p0r21436x8zb9dcf5h7kjnmqesgutwvy"],w:["238967debc01fg45kmstqrwxuvhjyznp","14365h7k9dcfesgujnmqp0r2twvyx8zb"]},h={n:["prxz","bcfguvyz"],s:["028b","0145hjnp"],e:["bcfguvyz","prxz"],w:["0145hjnp","028b"]},o=e.slice(-1),r=e.slice(0,-1),t=e.length%2
return-1!=h[a][t].indexOf(o)&&""!==r&&(r=Geohash.adjacent(r,a)),r+Geohash.base32.charAt(n[a][t].indexOf(o))},Geohash.neighbours=function(e){return{n:Geohash.adjacent(e,"n"),ne:Geohash.adjacent(Geohash.adjacent(e,"n"),"e"),e:Geohash.adjacent(e,"e"),se:Geohash.adjacent(Geohash.adjacent(e,"s"),"e"),s:Geohash.adjacent(e,"s"),sw:Geohash.adjacent(Geohash.adjacent(e,"s"),"w"),w:Geohash.adjacent(e,"w"),nw:Geohash.adjacent(Geohash.adjacent(e,"n"),"w")}},"undefined"!=typeof module&&module.exports&&(module.exports=Geohash),"function"==typeof define&&define.amd&&define([],function(){return Geohash})
