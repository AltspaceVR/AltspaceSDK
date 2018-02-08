/*! @license Firebase v2.2.9
    License: https://www.firebase.com/terms/terms-of-service.html */
(function() {var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.vb=function(){return a.uf?a.uf:a.uf=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}var la=Date.now||function(){return+new Date};
function ma(a,b){function c(){}c.prototype=b.prototype;a.$g=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Wg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function na(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function oa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function pa(a){var b=0,c;for(c in a)b++;return b}function qa(a){for(var b in a)return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ta(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function ua(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function va(a,b){var c=ua(a,b,void 0);return c&&a[c]}function wa(a){for(var b in a)return!1;return!0}function xa(a){var b={},c;for(c in a)b[c]=a[c];return b}var ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function za(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ya.length;f++)c=ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Aa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ba(){this.Sd=void 0}
function Ca(a,b,c){switch(typeof b){case "string":Da(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ca(a,a.Sd?a.Sd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Da(f,c),
c.push(":"),Ca(a,a.Sd?a.Sd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ea={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function Da(a,b){b.push('"',a.replace(Fa,function(a){if(a in Ea)return Ea[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Ea[a]=e+b.toString(16)}),'"')};function Ga(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^la()).toString(36)};var Ha;a:{var Ia=aa.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){Ha=Ja;break a}}Ha=""};function Ka(){this.Wa=-1};function La(){this.Wa=-1;this.Wa=64;this.P=[];this.ne=[];this.Uf=[];this.Ld=[];this.Ld[0]=128;for(var a=1;a<this.Wa;++a)this.Ld[a]=0;this.ee=this.ac=0;this.reset()}ma(La,Ka);La.prototype.reset=function(){this.P[0]=1732584193;this.P[1]=4023233417;this.P[2]=2562383102;this.P[3]=271733878;this.P[4]=3285377520;this.ee=this.ac=0};
function Ma(a,b,c){c||(c=0);var d=a.Uf;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.P[0];c=a.P[1];for(var h=a.P[2],k=a.P[3],l=a.P[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),m=1518500249):(f=c^h^k,m=1859775393):60>e?(f=c&h|k&(c|h),m=2400959708):(f=c^h^k,m=3395469782),f=(b<<
5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.P[0]=a.P[0]+b&4294967295;a.P[1]=a.P[1]+c&4294967295;a.P[2]=a.P[2]+h&4294967295;a.P[3]=a.P[3]+k&4294967295;a.P[4]=a.P[4]+l&4294967295}
La.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.ne,f=this.ac;d<b;){if(0==f)for(;d<=c;)Ma(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){Ma(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){Ma(this,e);f=0;break}}this.ac=f;this.ee+=b}};var u=Array.prototype,Na=u.indexOf?function(a,b,c){return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=u.forEach?function(a,b,c){u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=u.filter?function(a,b,c){return u.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
a.split(""):a,k=0;k<d;k++)if(k in h){var l=h[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Qa=u.map?function(a,b,c){return u.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ra=u.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return u.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Oa(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Sa=u.every?function(a,b,
c){return u.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ta(a,b){var c=Ua(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ua(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Va(a,b){var c=Na(a,b);0<=c&&u.splice.call(a,c,1)}function Wa(a,b,c){return 2>=arguments.length?u.slice.call(a,b):u.slice.call(a,b,c)}
function Xa(a,b){a.sort(b||Ya)}function Ya(a,b){return a>b?1:a<b?-1:0};var Za=-1!=Ha.indexOf("Opera")||-1!=Ha.indexOf("OPR"),$a=-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE"),ab=-1!=Ha.indexOf("Gecko")&&-1==Ha.toLowerCase().indexOf("webkit")&&!(-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE")),bb=-1!=Ha.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Za&&aa.opera)return a=aa.opera.version,ha(a)?a():a;ab?b=/rv\:([^\);]+)(\)|;)/:$a?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:bb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Ha))?a[1]:"");return $a&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var cb=null,db=null,eb=null;function fb(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");gb();for(var c=b?db:cb,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,t=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,h||(k=64));d.push(c[t],c[f],c[k],c[m])}return d.join("")}
function gb(){if(!cb){cb={};db={};eb={};for(var a=0;65>a;a++)cb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),eb[db[a]]=a,62<=a&&(eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};var hb=hb||"2.2.9";function v(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function ib(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function jb(a){var b={};ib(a,function(a,d){b[a]=d});return b};function kb(a){var b=[];ib(a,function(a,d){ea(d)?Oa(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function lb(a){var b={};a=a.replace(/^\?/,"").split("&");Oa(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function z(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(z(a,b,d)+"must be a valid function.");}function mb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(z(a,b,!0)+"must be a valid context object.");};function nb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Aa(a)}function B(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ca(new Ba,a,b);a=b.join("")}return a};function ob(){this.Wd=C}ob.prototype.j=function(a){return this.Wd.Y(a)};ob.prototype.toString=function(){return this.Wd.toString()};function pb(){}pb.prototype.qf=function(){return null};pb.prototype.ze=function(){return null};var qb=new pb;function rb(a,b,c){this.Rf=a;this.Ka=b;this.Kd=c}rb.prototype.qf=function(a){var b=this.Ka.Q;if(sb(b,a))return b.j().J(a);b=null!=this.Kd?new tb(this.Kd,!0,!1):this.Ka.C();return this.Rf.xc(a,b)};rb.prototype.ze=function(a,b,c){var d=null!=this.Kd?this.Kd:ub(this.Ka);a=this.Rf.oe(d,b,1,c,a);return 0===a.length?null:a[0]};function vb(){this.ub=[]}function wb(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.ca(c.Zb())||(a.ub.push(c),c=null);null===c&&(c=new xb(f));c.add(e)}c&&a.ub.push(c)}function yb(a,b,c){wb(a,c);zb(a,function(a){return a.ca(b)})}function Ab(a,b,c){wb(a,c);zb(a,function(a){return a.contains(b)||b.contains(a)})}
function zb(a,b){for(var c=!0,d=0;d<a.ub.length;d++){var e=a.ub[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.ub[d],f=0;f<e.vd.length;f++){var h=e.vd[f];if(null!==h){e.vd[f]=null;var k=h.Vb();Bb&&Cb("event: "+h.toString());Db(k)}}a.ub[d]=null}else c=!1}c&&(a.ub=[])}function xb(a){this.ra=a;this.vd=[]}xb.prototype.add=function(a){this.vd.push(a)};xb.prototype.Zb=function(){return this.ra};function D(a,b,c,d){this.type=a;this.Ja=b;this.Xa=c;this.Le=d;this.Qd=void 0}function Eb(a){return new D(Fb,a)}var Fb="value";function Gb(a,b,c,d){this.ve=b;this.$d=c;this.Qd=d;this.ud=a}Gb.prototype.Zb=function(){var a=this.$d.mc();return"value"===this.ud?a.path:a.parent().path};Gb.prototype.Ae=function(){return this.ud};Gb.prototype.Vb=function(){return this.ve.Vb(this)};Gb.prototype.toString=function(){return this.Zb().toString()+":"+this.ud+":"+B(this.$d.mf())};function Hb(a,b,c){this.ve=a;this.error=b;this.path=c}Hb.prototype.Zb=function(){return this.path};Hb.prototype.Ae=function(){return"cancel"};
Hb.prototype.Vb=function(){return this.ve.Vb(this)};Hb.prototype.toString=function(){return this.path.toString()+":cancel"};function tb(a,b,c){this.w=a;this.ea=b;this.Ub=c}function Ib(a){return a.ea}function Jb(a,b){return b.e()?a.ea&&!a.Ub:sb(a,E(b))}function sb(a,b){return a.ea&&!a.Ub||a.w.Da(b)}tb.prototype.j=function(){return this.w};function Kb(a){this.eg=a;this.Dd=null}Kb.prototype.get=function(){var a=this.eg.get(),b=xa(a);if(this.Dd)for(var c in this.Dd)b[c]-=this.Dd[c];this.Dd=a;return b};function Lb(a,b){this.Nf={};this.fd=new Kb(a);this.ba=b;var c=1E4+2E4*Math.random();setTimeout(q(this.If,this),Math.floor(c))}Lb.prototype.If=function(){var a=this.fd.get(),b={},c=!1,d;for(d in a)0<a[d]&&v(this.Nf,d)&&(b[d]=a[d],c=!0);c&&this.ba.Ve(b);setTimeout(q(this.If,this),Math.floor(6E5*Math.random()))};function Mb(){this.Ec={}}function Nb(a,b,c){n(c)||(c=1);v(a.Ec,b)||(a.Ec[b]=0);a.Ec[b]+=c}Mb.prototype.get=function(){return xa(this.Ec)};var Ob={},Pb={};function Qb(a){a=a.toString();Ob[a]||(Ob[a]=new Mb);return Ob[a]}function Rb(a,b){var c=a.toString();Pb[c]||(Pb[c]=b());return Pb[c]};function F(a,b){this.name=a;this.S=b}function Sb(a,b){return new F(a,b)};function Tb(a,b){return Ub(a.name,b.name)}function Vb(a,b){return Ub(a,b)};function Wb(a,b,c){this.type=Xb;this.source=a;this.path=b;this.Ga=c}Wb.prototype.Xc=function(a){return this.path.e()?new Wb(this.source,G,this.Ga.J(a)):new Wb(this.source,H(this.path),this.Ga)};Wb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};function Yb(a,b){this.type=Zb;this.source=a;this.path=b}Yb.prototype.Xc=function(){return this.path.e()?new Yb(this.source,G):new Yb(this.source,H(this.path))};Yb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function $b(a,b){this.La=a;this.wa=b?b:ac}g=$b.prototype;g.Oa=function(a,b){return new $b(this.La,this.wa.Oa(a,b,this.La).X(null,null,!1,null,null))};g.remove=function(a){return new $b(this.La,this.wa.remove(a,this.La).X(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.wa;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function bc(a,b){for(var c,d=a.wa,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.wa.e()};g.count=function(){return this.wa.count()};g.Sc=function(){return this.wa.Sc()};g.fc=function(){return this.wa.fc()};g.ia=function(a){return this.wa.ia(a)};
g.Xb=function(a){return new cc(this.wa,null,this.La,!1,a)};g.Yb=function(a,b){return new cc(this.wa,a,this.La,!1,b)};g.$b=function(a,b){return new cc(this.wa,a,this.La,!0,b)};g.sf=function(a){return new cc(this.wa,null,this.La,!0,a)};function cc(a,b,c,d,e){this.Ud=e||null;this.Ge=d;this.Qa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Ge?a.left:a.right;else if(0===e){this.Qa.push(a);break}else this.Qa.push(a),a=this.Ge?a.right:a.left}
function J(a){if(0===a.Qa.length)return null;var b=a.Qa.pop(),c;c=a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value};if(a.Ge)for(b=b.left;!b.e();)a.Qa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Qa.push(b),b=b.left;return c}function dc(a){if(0===a.Qa.length)return null;var b;b=a.Qa;b=b[b.length-1];return a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value}}function ec(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:ac;this.right=null!=e?e:ac}g=ec.prototype;
g.X=function(a,b,c,d,e){return new ec(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function fc(a){return a.left.e()?a:fc(a.left)}g.Sc=function(){return fc(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Oa(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Oa(a,b,c));return gc(e)};function hc(a){if(a.left.e())return ac;a.left.fa()||a.left.left.fa()||(a=ic(a));a=a.X(null,null,null,hc(a.left),null);return gc(a)}
g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=ic(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=jc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=kc(c),c.left.left.fa()&&(c=jc(c),c=kc(c)));if(0===b(a,c.key)){if(c.right.e())return ac;d=fc(c.right);c=c.X(d.key,d.value,null,null,hc(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return gc(c)};g.fa=function(){return this.color};
function gc(a){a.right.fa()&&!a.left.fa()&&(a=lc(a));a.left.fa()&&a.left.left.fa()&&(a=jc(a));a.left.fa()&&a.right.fa()&&(a=kc(a));return a}function ic(a){a=kc(a);a.right.left.fa()&&(a=a.X(null,null,null,null,jc(a.right)),a=lc(a),a=kc(a));return a}function lc(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function jc(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
function kc(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function mc(){}g=mc.prototype;g.X=function(){return this};g.Oa=function(a,b){return new ec(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Sc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var ac=new mc;function nc(a,b){return a&&"object"===typeof a?(K(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function oc(a,b){var c=new pc;qc(a,new L(""),function(a,e){c.nc(a,rc(e,b))});return c}function rc(a,b){var c=a.B().H(),c=nc(c,b),d;if(a.L()){var e=nc(a.Ca(),b);return e!==a.Ca()||c!==a.B().H()?new sc(e,M(c)):a}d=a;c!==a.B().H()&&(d=d.ga(new sc(c)));a.R(N,function(a,c){var e=rc(c,b);e!==c&&(d=d.O(a,e))});return d};function L(a,b){if(1==arguments.length){this.n=a.split("/");for(var c=0,d=0;d<this.n.length;d++)0<this.n[d].length&&(this.n[c]=this.n[d],c++);this.n.length=c;this.Z=0}else this.n=a,this.Z=b}function O(a,b){var c=E(a);if(null===c)return b;if(c===E(b))return O(H(a),H(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}function E(a){return a.Z>=a.n.length?null:a.n[a.Z]}function tc(a){return a.n.length-a.Z}
function H(a){var b=a.Z;b<a.n.length&&b++;return new L(a.n,b)}function uc(a){return a.Z<a.n.length?a.n[a.n.length-1]:null}g=L.prototype;g.toString=function(){for(var a="",b=this.Z;b<this.n.length;b++)""!==this.n[b]&&(a+="/"+this.n[b]);return a||"/"};g.slice=function(a){return this.n.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.n.length)return null;for(var a=[],b=this.Z;b<this.n.length-1;b++)a.push(this.n[b]);return new L(a,0)};
g.u=function(a){for(var b=[],c=this.Z;c<this.n.length;c++)b.push(this.n[c]);if(a instanceof L)for(c=a.Z;c<a.n.length;c++)b.push(a.n[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Z>=this.n.length};g.ca=function(a){if(tc(this)!==tc(a))return!1;for(var b=this.Z,c=a.Z;b<=this.n.length;b++,c++)if(this.n[b]!==a.n[c])return!1;return!0};
g.contains=function(a){var b=this.Z,c=a.Z;if(tc(this)>tc(a))return!1;for(;b<this.n.length;){if(this.n[b]!==a.n[c])return!1;++b;++c}return!0};var G=new L("");function vc(a,b){this.Ra=a.slice();this.Ha=Math.max(1,this.Ra.length);this.lf=b;for(var c=0;c<this.Ra.length;c++)this.Ha+=wc(this.Ra[c]);xc(this)}vc.prototype.push=function(a){0<this.Ra.length&&(this.Ha+=1);this.Ra.push(a);this.Ha+=wc(a);xc(this)};vc.prototype.pop=function(){var a=this.Ra.pop();this.Ha-=wc(a);0<this.Ra.length&&--this.Ha};
function xc(a){if(768<a.Ha)throw Error(a.lf+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Ra.length)throw Error(a.lf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+yc(a));}function yc(a){return 0==a.Ra.length?"":"in property '"+a.Ra.join(".")+"'"};function zc(){this.wc={}}zc.prototype.set=function(a,b){null==b?delete this.wc[a]:this.wc[a]=b};zc.prototype.get=function(a){return v(this.wc,a)?this.wc[a]:null};zc.prototype.remove=function(a){delete this.wc[a]};zc.prototype.wf=!0;function Ac(a){this.Fc=a;this.Pd="firebase:"}g=Ac.prototype;g.set=function(a,b){null==b?this.Fc.removeItem(this.Pd+a):this.Fc.setItem(this.Pd+a,B(b))};g.get=function(a){a=this.Fc.getItem(this.Pd+a);return null==a?null:nb(a)};g.remove=function(a){this.Fc.removeItem(this.Pd+a)};g.wf=!1;g.toString=function(){return this.Fc.toString()};function Bc(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Ac(b)}}catch(c){}return new zc}var Cc=Bc("localStorage"),P=Bc("sessionStorage");function Dc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.lb=b;this.Db=c;this.Ug=d;this.Od=e||"";this.Pa=Cc.get("host:"+a)||this.host}function Ec(a,b){b!==a.Pa&&(a.Pa=b,"s-"===a.Pa.substr(0,2)&&Cc.set("host:"+a.host,a.Pa))}Dc.prototype.toString=function(){var a=(this.lb?"https://":"http://")+this.host;this.Od&&(a+="<"+this.Od+">");return a};var Fc=function(){var a=1;return function(){return a++}}();function K(a,b){if(!a)throw Gc(b);}function Gc(a){return Error("Firebase ("+hb+") INTERNAL ASSERT FAILED: "+a)}
function Hc(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{gb();for(var c=eb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==l)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Wa(d,c,
c+8192));b=a}}return b}catch(m){Cb("base64Decode failed: ",m)}return null}function Ic(a){var b=Jc(a);a=new La;a.update(b);var b=[],c=8*a.ee;56>a.ac?a.update(a.Ld,56-a.ac):a.update(a.Ld,a.Wa-(a.ac-56));for(var d=a.Wa-1;56<=d;d--)a.ne[d]=c&255,c/=256;Ma(a,a.ne);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.P[d]>>e&255,++c;return fb(b)}
function Kc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Kc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var Bb=null,Lc=!0;function Cb(a){!0===Lc&&(Lc=!1,null===Bb&&!0===P.get("logging_enabled")&&Mc(!0));if(Bb){var b=Kc.apply(null,arguments);Bb(b)}}function Nc(a){return function(){Cb(a,arguments)}}
function Oc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Kc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Pc(a){var b=Kc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function Q(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Kc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Qc(a){var b="",c="",d="",e="",f=!0,h="https",k=443;if(p(a)){var l=a.indexOf("//");0<=l&&(h=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(t){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===h||"wss"===h,k=b.substring(l+1),isFinite(k)&&
(k=String(k)),k=p(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,Rg:d,lb:f,scheme:h,$c:e}}function Rc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function Sc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function Ub(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Tc(a),d=Tc(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Uc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
function Vc(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=Vc(a[b[d]]);return c+"}"}function Wc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Xc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
function Yc(a){K(!Rc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var Zc=/^-?\d{1,10}$/;function Tc(a){return Zc.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Db(a){try{a()}catch(b){setTimeout(function(){Q("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function R(a,b){if(ha(a)){var c=Array.prototype.slice.call(arguments,1).slice();Db(function(){a.apply(null,c)})}};function Jc(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,K(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function wc(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function $c(a){var b={},c={},d={},e="";try{var f=a.split("."),b=nb(Hc(f[0])||""),c=nb(Hc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{Xg:b,Bc:c,data:d,Og:e}}function ad(a){a=$c(a).Bc;return"object"===typeof a&&a.hasOwnProperty("iat")?w(a,"iat"):null}function bd(a){a=$c(a);var b=a.Bc;return!!a.Og&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function cd(a){this.V=a;this.g=a.o.g}function dd(a,b,c,d){var e=[],f=[];Oa(b,function(b){"child_changed"===b.type&&a.g.Ad(b.Le,b.Ja)&&f.push(new D("child_moved",b.Ja,b.Xa))});ed(a,e,"child_removed",b,d,c);ed(a,e,"child_added",b,d,c);ed(a,e,"child_moved",f,d,c);ed(a,e,"child_changed",b,d,c);ed(a,e,Fb,b,d,c);return e}function ed(a,b,c,d,e,f){d=Pa(d,function(a){return a.type===c});Xa(d,q(a.fg,a));Oa(d,function(c){var d=fd(a,c,f);Oa(e,function(e){e.Kf(c.type)&&b.push(e.createEvent(d,a.V))})})}
function fd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Qd=c.rf(b.Xa,b.Ja,a.g));return b}cd.prototype.fg=function(a,b){if(null==a.Xa||null==b.Xa)throw Gc("Should only compare child_ events.");return this.g.compare(new F(a.Xa,a.Ja),new F(b.Xa,b.Ja))};function gd(){this.bb={}}
function hd(a,b){var c=b.type,d=b.Xa;K("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");K(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.bb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.bb[d];else if("child_removed"==c&&"child_changed"==f)a.bb[d]=new D("child_removed",e.Le,d);else if("child_changed"==c&&
"child_added"==f)a.bb[d]=new D("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Le);else throw Gc("Illegal combination of changes: "+b+" occurred after "+e);}else a.bb[d]=b};function id(a,b,c){this.Rb=a;this.qb=b;this.sb=c||null}g=id.prototype;g.Kf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.o.g;return new Gb("value",this,new S(a.Ja,b.mc(),c))};g.Vb=function(a){var b=this.sb;if("cancel"===a.Ae()){K(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.Rb;return function(){d.call(b,a.$d)}};g.gf=function(a,b){return this.qb?new Hb(this,a,b):null};
g.matches=function(a){return a instanceof id?a.Rb&&this.Rb?a.Rb===this.Rb&&a.sb===this.sb:!0:!1};g.tf=function(){return null!==this.Rb};function jd(a,b,c){this.ha=a;this.qb=b;this.sb=c}g=jd.prototype;g.Kf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.gf=function(a,b){return this.qb?new Hb(this,a,b):null};
g.createEvent=function(a,b){K(null!=a.Xa,"Child events should have a childName.");var c=b.mc().u(a.Xa);return new Gb(a.type,this,new S(a.Ja,c,b.o.g),a.Qd)};g.Vb=function(a){var b=this.sb;if("cancel"===a.Ae()){K(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.ha[a.ud];return function(){d.call(b,a.$d,a.Qd)}};
g.matches=function(a){if(a instanceof jd){if(!this.ha||!a.ha)return!0;if(this.sb===a.sb){var b=pa(a.ha);if(b===pa(this.ha)){if(1===b){var b=qa(a.ha),c=qa(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return oa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.tf=function(){return null!==this.ha};function kd(a){this.g=a}g=kd.prototype;g.K=function(a,b,c,d,e,f){K(a.Jc(this.g),"A node must be indexed if only a child is updated");e=a.J(b);if(e.Y(d).ca(c.Y(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?hd(f,new D("child_removed",e,b)):K(a.L(),"A child remove without an old child only makes sense on a leaf node"):e.e()?hd(f,new D("child_added",c,b)):hd(f,new D("child_changed",c,b,e)));return a.L()&&c.e()?a:a.O(b,c).mb(this.g)};
g.xa=function(a,b,c){null!=c&&(a.L()||a.R(N,function(a,e){b.Da(a)||hd(c,new D("child_removed",e,a))}),b.L()||b.R(N,function(b,e){if(a.Da(b)){var f=a.J(b);f.ca(e)||hd(c,new D("child_changed",e,b,f))}else hd(c,new D("child_added",e,b))}));return b.mb(this.g)};g.ga=function(a,b){return a.e()?C:a.ga(b)};g.Na=function(){return!1};g.Wb=function(){return this};function ld(a){this.Ce=new kd(a.g);this.g=a.g;var b;a.ma?(b=md(a),b=a.g.Pc(nd(a),b)):b=a.g.Tc();this.ed=b;a.pa?(b=od(a),a=a.g.Pc(pd(a),b)):a=a.g.Qc();this.Gc=a}g=ld.prototype;g.matches=function(a){return 0>=this.g.compare(this.ed,a)&&0>=this.g.compare(a,this.Gc)};g.K=function(a,b,c,d,e,f){this.matches(new F(b,c))||(c=C);return this.Ce.K(a,b,c,d,e,f)};
g.xa=function(a,b,c){b.L()&&(b=C);var d=b.mb(this.g),d=d.ga(C),e=this;b.R(N,function(a,b){e.matches(new F(a,b))||(d=d.O(a,C))});return this.Ce.xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.Ce};function qd(a){this.sa=new ld(a);this.g=a.g;K(a.ja,"Only valid if limit has been set");this.ka=a.ka;this.Jb=!rd(a)}g=qd.prototype;g.K=function(a,b,c,d,e,f){this.sa.matches(new F(b,c))||(c=C);return a.J(b).ca(c)?a:a.Eb()<this.ka?this.sa.Wb().K(a,b,c,d,e,f):sd(this,a,b,c,e,f)};
g.xa=function(a,b,c){var d;if(b.L()||b.e())d=C.mb(this.g);else if(2*this.ka<b.Eb()&&b.Jc(this.g)){d=C.mb(this.g);b=this.Jb?b.$b(this.sa.Gc,this.g):b.Yb(this.sa.ed,this.g);for(var e=0;0<b.Qa.length&&e<this.ka;){var f=J(b),h;if(h=this.Jb?0>=this.g.compare(this.sa.ed,f):0>=this.g.compare(f,this.sa.Gc))d=d.O(f.name,f.S),e++;else break}}else{d=b.mb(this.g);d=d.ga(C);var k,l,m;if(this.Jb){b=d.sf(this.g);k=this.sa.Gc;l=this.sa.ed;var t=td(this.g);m=function(a,b){return t(b,a)}}else b=d.Xb(this.g),k=this.sa.ed,
l=this.sa.Gc,m=td(this.g);for(var e=0,y=!1;0<b.Qa.length;)f=J(b),!y&&0>=m(k,f)&&(y=!0),(h=y&&e<this.ka&&0>=m(f,l))?e++:d=d.O(f.name,C)}return this.sa.Wb().xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.sa.Wb()};
function sd(a,b,c,d,e,f){var h;if(a.Jb){var k=td(a.g);h=function(a,b){return k(b,a)}}else h=td(a.g);K(b.Eb()==a.ka,"");var l=new F(c,d),m=a.Jb?ud(b,a.g):vd(b,a.g),t=a.sa.matches(l);if(b.Da(c)){for(var y=b.J(c),m=e.ze(a.g,m,a.Jb);null!=m&&(m.name==c||b.Da(m.name));)m=e.ze(a.g,m,a.Jb);e=null==m?1:h(m,l);if(t&&!d.e()&&0<=e)return null!=f&&hd(f,new D("child_changed",d,c,y)),b.O(c,d);null!=f&&hd(f,new D("child_removed",y,c));b=b.O(c,C);return null!=m&&a.sa.matches(m)?(null!=f&&hd(f,new D("child_added",
m.S,m.name)),b.O(m.name,m.S)):b}return d.e()?b:t&&0<=h(m,l)?(null!=f&&(hd(f,new D("child_removed",m.S,m.name)),hd(f,new D("child_added",d,c))),b.O(c,d).O(m.name,C)):b};function wd(a,b){this.ke=a;this.dg=b}function yd(a){this.U=a}
yd.prototype.ab=function(a,b,c,d){var e=new gd,f;if(b.type===Xb)b.source.xe?c=zd(this,a,b.path,b.Ga,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.bf,c=Ad(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===Bd)b.source.xe?c=Cd(this,a,b.path,b.children,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.bf,c=Dd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Ed)if(b.Vd)if(b=b.path,null!=c.tc(b))c=a;else{f=new rb(c,a,d);d=a.Q.j();if(b.e()||".priority"===E(b))Ib(a.C())?b=c.za(ub(a)):(b=a.C().j(),
K(b instanceof T,"serverChildren would be complete if leaf node"),b=c.yc(b)),b=this.U.xa(d,b,e);else{var h=E(b),k=c.xc(h,a.C());null==k&&sb(a.C(),h)&&(k=d.J(h));b=null!=k?this.U.K(d,h,k,H(b),f,e):a.Q.j().Da(h)?this.U.K(d,h,C,H(b),f,e):d;b.e()&&Ib(a.C())&&(d=c.za(ub(a)),d.L()&&(b=this.U.xa(b,d,e)))}d=Ib(a.C())||null!=c.tc(G);c=Fd(a,b,d,this.U.Na())}else c=Gd(this,a,b.path,b.Qb,c,d,e);else if(b.type===Zb)d=b.path,b=a.C(),f=b.j(),h=b.ea||d.e(),c=Hd(this,new Id(a.Q,new tb(f,h,b.Ub)),d,c,qb,e);else throw Gc("Unknown operation type: "+
b.type);e=ra(e.bb);d=c;b=d.Q;b.ea&&(f=b.j().L()||b.j().e(),h=Jd(a),(0<e.length||!a.Q.ea||f&&!b.j().ca(h)||!b.j().B().ca(h.B()))&&e.push(Eb(Jd(d))));return new wd(c,e)};
function Hd(a,b,c,d,e,f){var h=b.Q;if(null!=d.tc(c))return b;var k;if(c.e())K(Ib(b.C()),"If change path is empty, we must have complete server data"),b.C().Ub?(e=ub(b),d=d.yc(e instanceof T?e:C)):d=d.za(ub(b)),f=a.U.xa(b.Q.j(),d,f);else{var l=E(c);if(".priority"==l)K(1==tc(c),"Can't have a priority with additional path components"),f=h.j(),k=b.C().j(),d=d.ld(c,f,k),f=null!=d?a.U.ga(f,d):h.j();else{var m=H(c);sb(h,l)?(k=b.C().j(),d=d.ld(c,h.j(),k),d=null!=d?h.j().J(l).K(m,d):h.j().J(l)):d=d.xc(l,b.C());
f=null!=d?a.U.K(h.j(),l,d,m,e,f):h.j()}}return Fd(b,f,h.ea||c.e(),a.U.Na())}function Ad(a,b,c,d,e,f,h,k){var l=b.C();h=h?a.U:a.U.Wb();if(c.e())d=h.xa(l.j(),d,null);else if(h.Na()&&!l.Ub)d=l.j().K(c,d),d=h.xa(l.j(),d,null);else{var m=E(c);if(!Jb(l,c)&&1<tc(c))return b;var t=H(c);d=l.j().J(m).K(t,d);d=".priority"==m?h.ga(l.j(),d):h.K(l.j(),m,d,t,qb,null)}l=l.ea||c.e();b=new Id(b.Q,new tb(d,l,h.Na()));return Hd(a,b,c,e,new rb(e,b,f),k)}
function zd(a,b,c,d,e,f,h){var k=b.Q;e=new rb(e,b,f);if(c.e())h=a.U.xa(b.Q.j(),d,h),a=Fd(b,h,!0,a.U.Na());else if(f=E(c),".priority"===f)h=a.U.ga(b.Q.j(),d),a=Fd(b,h,k.ea,k.Ub);else{c=H(c);var l=k.j().J(f);if(!c.e()){var m=e.qf(f);d=null!=m?".priority"===uc(c)&&m.Y(c.parent()).e()?m:m.K(c,d):C}l.ca(d)?a=b:(h=a.U.K(k.j(),f,d,c,e,h),a=Fd(b,h,k.ea,a.U.Na()))}return a}
function Cd(a,b,c,d,e,f,h){var k=b;Kd(d,function(d,m){var t=c.u(d);sb(b.Q,E(t))&&(k=zd(a,k,t,m,e,f,h))});Kd(d,function(d,m){var t=c.u(d);sb(b.Q,E(t))||(k=zd(a,k,t,m,e,f,h))});return k}function Ld(a,b){Kd(b,function(b,d){a=a.K(b,d)});return a}
function Dd(a,b,c,d,e,f,h,k){if(b.C().j().e()&&!Ib(b.C()))return b;var l=b;c=c.e()?d:Md(Nd,c,d);var m=b.C().j();c.children.ia(function(c,d){if(m.Da(c)){var I=b.C().j().J(c),I=Ld(I,d);l=Ad(a,l,new L(c),I,e,f,h,k)}});c.children.ia(function(c,d){var I=!sb(b.C(),c)&&null==d.value;m.Da(c)||I||(I=b.C().j().J(c),I=Ld(I,d),l=Ad(a,l,new L(c),I,e,f,h,k))});return l}
function Gd(a,b,c,d,e,f,h){if(null!=e.tc(c))return b;var k=b.C();if(null!=d.value){if(c.e()&&k.ea||Jb(k,c))return Ad(a,b,c,k.j().Y(c),e,f,!1,h);if(c.e()){var l=Nd;k.j().R(Od,function(a,b){l=l.set(new L(a),b)});return Dd(a,b,c,l,e,f,!1,h)}return b}l=Nd;Kd(d,function(a){var b=c.u(a);Jb(k,b)&&(l=l.set(a,k.j().Y(b)))});return Dd(a,b,c,l,e,f,!1,h)};function Pd(){}var Qd={};function td(a){return q(a.compare,a)}Pd.prototype.Ad=function(a,b){return 0!==this.compare(new F("[MIN_NAME]",a),new F("[MIN_NAME]",b))};Pd.prototype.Tc=function(){return Rd};function Sd(a){this.cc=a}ma(Sd,Pd);g=Sd.prototype;g.Ic=function(a){return!a.J(this.cc).e()};g.compare=function(a,b){var c=a.S.J(this.cc),d=b.S.J(this.cc),c=c.Dc(d);return 0===c?Ub(a.name,b.name):c};g.Pc=function(a,b){var c=M(a),c=C.O(this.cc,c);return new F(b,c)};
g.Qc=function(){var a=C.O(this.cc,Td);return new F("[MAX_NAME]",a)};g.toString=function(){return this.cc};function Ud(){}ma(Ud,Pd);g=Ud.prototype;g.compare=function(a,b){var c=a.S.B(),d=b.S.B(),c=c.Dc(d);return 0===c?Ub(a.name,b.name):c};g.Ic=function(a){return!a.B().e()};g.Ad=function(a,b){return!a.B().ca(b.B())};g.Tc=function(){return Rd};g.Qc=function(){return new F("[MAX_NAME]",new sc("[PRIORITY-POST]",Td))};g.Pc=function(a,b){var c=M(a);return new F(b,new sc("[PRIORITY-POST]",c))};
g.toString=function(){return".priority"};var N=new Ud;function Vd(){}ma(Vd,Pd);g=Vd.prototype;g.compare=function(a,b){return Ub(a.name,b.name)};g.Ic=function(){throw Gc("KeyIndex.isDefinedOn not expected to be called.");};g.Ad=function(){return!1};g.Tc=function(){return Rd};g.Qc=function(){return new F("[MAX_NAME]",C)};g.Pc=function(a){K(p(a),"KeyIndex indexValue must always be a string.");return new F(a,C)};g.toString=function(){return".key"};var Od=new Vd;function Wd(){}ma(Wd,Pd);g=Wd.prototype;
g.compare=function(a,b){var c=a.S.Dc(b.S);return 0===c?Ub(a.name,b.name):c};g.Ic=function(){return!0};g.Ad=function(a,b){return!a.ca(b)};g.Tc=function(){return Rd};g.Qc=function(){return Xd};g.Pc=function(a,b){var c=M(a);return new F(b,c)};g.toString=function(){return".value"};var Yd=new Wd;function Zd(){this.Tb=this.pa=this.Lb=this.ma=this.ja=!1;this.ka=0;this.Nb="";this.ec=null;this.yb="";this.bc=null;this.wb="";this.g=N}var $d=new Zd;function rd(a){return""===a.Nb?a.ma:"l"===a.Nb}function nd(a){K(a.ma,"Only valid if start has been set");return a.ec}function md(a){K(a.ma,"Only valid if start has been set");return a.Lb?a.yb:"[MIN_NAME]"}function pd(a){K(a.pa,"Only valid if end has been set");return a.bc}
function od(a){K(a.pa,"Only valid if end has been set");return a.Tb?a.wb:"[MAX_NAME]"}function ae(a){var b=new Zd;b.ja=a.ja;b.ka=a.ka;b.ma=a.ma;b.ec=a.ec;b.Lb=a.Lb;b.yb=a.yb;b.pa=a.pa;b.bc=a.bc;b.Tb=a.Tb;b.wb=a.wb;b.g=a.g;return b}g=Zd.prototype;g.Ie=function(a){var b=ae(this);b.ja=!0;b.ka=a;b.Nb="";return b};g.Je=function(a){var b=ae(this);b.ja=!0;b.ka=a;b.Nb="l";return b};g.Ke=function(a){var b=ae(this);b.ja=!0;b.ka=a;b.Nb="r";return b};
g.ae=function(a,b){var c=ae(this);c.ma=!0;n(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.yb=b):(c.Lb=!1,c.yb="");return c};g.td=function(a,b){var c=ae(this);c.pa=!0;n(a)||(a=null);c.bc=a;n(b)?(c.Tb=!0,c.wb=b):(c.Zg=!1,c.wb="");return c};function be(a,b){var c=ae(a);c.g=b;return c}function ce(a){var b={};a.ma&&(b.sp=a.ec,a.Lb&&(b.sn=a.yb));a.pa&&(b.ep=a.bc,a.Tb&&(b.en=a.wb));if(a.ja){b.l=a.ka;var c=a.Nb;""===c&&(c=rd(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}
function de(a){return!(a.ma||a.pa||a.ja)}function ee(a){var b={};if(de(a)&&a.g==N)return b;var c;a.g===N?c="$priority":a.g===Yd?c="$value":a.g===Od?c="$key":(K(a.g instanceof Sd,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.ma&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.yb)));a.pa&&(b.endAt=B(a.bc),a.Tb&&(b.endAt+=","+B(a.wb)));a.ja&&(rd(a)?b.limitToFirst=a.ka:b.limitToLast=a.ka);return b}g.toString=function(){return B(ce(this))};function fe(a,b){this.Bd=a;this.dc=b}fe.prototype.get=function(a){var b=w(this.Bd,a);if(!b)throw Error("No index defined for "+a);return b===Qd?null:b};function ge(a,b,c){var d=na(a.Bd,function(d,f){var h=w(a.dc,f);K(h,"Missing index implementation for "+f);if(d===Qd){if(h.Ic(b.S)){for(var k=[],l=c.Xb(Sb),m=J(l);m;)m.name!=b.name&&k.push(m),m=J(l);k.push(b);return he(k,td(h))}return Qd}h=c.get(b.name);k=d;h&&(k=k.remove(new F(b.name,h)));return k.Oa(b,b.S)});return new fe(d,a.dc)}
function ie(a,b,c){var d=na(a.Bd,function(a){if(a===Qd)return a;var d=c.get(b.name);return d?a.remove(new F(b.name,d)):a});return new fe(d,a.dc)}var je=new fe({".priority":Qd},{".priority":N});function sc(a,b){this.A=a;K(n(this.A)&&null!==this.A,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||C;ke(this.aa);this.Cb=null}var le=["object","boolean","number","string"];g=sc.prototype;g.L=function(){return!0};g.B=function(){return this.aa};g.ga=function(a){return new sc(this.A,a)};g.J=function(a){return".priority"===a?this.aa:C};g.Y=function(a){return a.e()?this:".priority"===E(a)?this.aa:C};g.Da=function(){return!1};g.rf=function(){return null};
g.O=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:C.O(a,b).ga(this.aa)};g.K=function(a,b){var c=E(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;K(".priority"!==c||1===tc(a),".priority must be the last token in a path");return this.O(c,C.K(H(a),b))};g.e=function(){return!1};g.Eb=function(){return 0};g.R=function(){return!1};g.H=function(a){return a&&!this.B().e()?{".value":this.Ca(),".priority":this.B().H()}:this.Ca()};
g.hash=function(){if(null===this.Cb){var a="";this.aa.e()||(a+="priority:"+me(this.aa.H())+":");var b=typeof this.A,a=a+(b+":"),a="number"===b?a+Yc(this.A):a+this.A;this.Cb=Ic(a)}return this.Cb};g.Ca=function(){return this.A};g.Dc=function(a){if(a===C)return 1;if(a instanceof T)return-1;K(a.L(),"Unknown node type");var b=typeof a.A,c=typeof this.A,d=Na(le,b),e=Na(le,c);K(0<=d,"Unknown leaf type: "+b);K(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.A<a.A?-1:this.A===a.A?0:1:e-d};
g.mb=function(){return this};g.Jc=function(){return!0};g.ca=function(a){return a===this?!0:a.L()?this.A===a.A&&this.aa.ca(a.aa):!1};g.toString=function(){return B(this.H(!0))};function T(a,b,c){this.m=a;(this.aa=b)&&ke(this.aa);a.e()&&K(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.xb=c;this.Cb=null}g=T.prototype;g.L=function(){return!1};g.B=function(){return this.aa||C};g.ga=function(a){return this.m.e()?this:new T(this.m,a,this.xb)};g.J=function(a){if(".priority"===a)return this.B();a=this.m.get(a);return null===a?C:a};g.Y=function(a){var b=E(a);return null===b?this:this.J(b).Y(H(a))};g.Da=function(a){return null!==this.m.get(a)};
g.O=function(a,b){K(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new F(a,b),d,e;b.e()?(d=this.m.remove(a),c=ie(this.xb,c,this.m)):(d=this.m.Oa(a,b),c=ge(this.xb,c,this.m));e=d.e()?C:this.aa;return new T(d,e,c)};g.K=function(a,b){var c=E(a);if(null===c)return b;K(".priority"!==E(a)||1===tc(a),".priority must be the last token in a path");var d=this.J(c).K(H(a),b);return this.O(c,d)};g.e=function(){return this.m.e()};g.Eb=function(){return this.m.count()};
var ne=/^(0|[1-9]\d*)$/;g=T.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.R(N,function(f,h){b[f]=h.H(a);c++;e&&ne.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.B().e()&&(b[".priority"]=this.B().H());return b};g.hash=function(){if(null===this.Cb){var a="";this.B().e()||(a+="priority:"+me(this.B().H())+":");this.R(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Cb=""===a?"":Ic(a)}return this.Cb};
g.rf=function(a,b,c){return(c=oe(this,c))?(a=bc(c,new F(a,b)))?a.name:null:bc(this.m,a)};function ud(a,b){var c;c=(c=oe(a,b))?(c=c.Sc())&&c.name:a.m.Sc();return c?new F(c,a.m.get(c)):null}function vd(a,b){var c;c=(c=oe(a,b))?(c=c.fc())&&c.name:a.m.fc();return c?new F(c,a.m.get(c)):null}g.R=function(a,b){var c=oe(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.m.ia(b)};g.Xb=function(a){return this.Yb(a.Tc(),a)};
g.Yb=function(a,b){var c=oe(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.m.Yb(a.name,Sb),d=dc(c);null!=d&&0>b.compare(d,a);)J(c),d=dc(c);return c};g.sf=function(a){return this.$b(a.Qc(),a)};g.$b=function(a,b){var c=oe(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.m.$b(a.name,Sb),d=dc(c);null!=d&&0<b.compare(d,a);)J(c),d=dc(c);return c};g.Dc=function(a){return this.e()?a.e()?0:-1:a.L()||a.e()?1:a===Td?-1:0};
g.mb=function(a){if(a===Od||ta(this.xb.dc,a.toString()))return this;var b=this.xb,c=this.m;K(a!==Od,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(Sb),f=J(c);f;)e=e||a.Ic(f.S),d.push(f),f=J(c);d=e?he(d,td(a)):Qd;e=a.toString();c=xa(b.dc);c[e]=a;a=xa(b.Bd);a[e]=d;return new T(this.m,this.aa,new fe(a,c))};g.Jc=function(a){return a===Od||ta(this.xb.dc,a.toString())};
g.ca=function(a){if(a===this)return!0;if(a.L())return!1;if(this.B().ca(a.B())&&this.m.count()===a.m.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=J(b),d=J(a);c&&d;){if(c.name!==d.name||!c.S.ca(d.S))return!1;c=J(b);d=J(a)}return null===c&&null===d}return!1};function oe(a,b){return b===Od?null:a.xb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function M(a,b){if(null===a)return C;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);K(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new sc(a,M(c));if(a instanceof Array){var d=C,e=a;r(e,function(a,b){if(v(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.L()||!c.e())d=
d.O(b,c)}});return d.ga(M(c))}var f=[],h=!1,k=a;ib(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.B().e(),f.push(new F(a,b)))}});if(0==f.length)return C;var l=he(f,Tb,function(a){return a.name},Vb);if(h){var m=he(f,td(N));return new T(l,M(c),new fe({".priority":m},{".priority":N}))}return new T(l,M(c),je)}var pe=Math.log(2);
function qe(a){this.count=parseInt(Math.log(a+1)/pe,10);this.jf=this.count-1;this.cg=a+1&parseInt(Array(this.count+1).join("1"),2)}function re(a){var b=!(a.cg&1<<a.jf);a.jf--;return b}
function he(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],t=c?c(m):m;return new ec(t,m.S,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),y=e(m+1,d),m=a[m],t=c?c(m):m;return new ec(t,m.S,!1,f,y)}a.sort(b);var f=function(b){function d(b,h){var k=t-b,y=t;t-=b;var y=e(k+1,y),k=a[k],I=c?c(k):k,y=new ec(I,k.S,h,null,y);f?f.left=y:m=y;f=y}for(var f=null,m=null,t=a.length,y=0;y<b.count;++y){var I=re(b),xd=Math.pow(2,b.count-(y+1));I?d(xd,!1):(d(xd,!1),d(xd,!0))}return m}(new qe(a.length));
return null!==f?new $b(d||b,f):new $b(d||b)}function me(a){return"number"===typeof a?"number:"+Yc(a):"string:"+a}function ke(a){if(a.L()){var b=a.H();K("string"===typeof b||"number"===typeof b||"object"===typeof b&&v(b,".sv"),"Priority must be a string or number.")}else K(a===Td||a.e(),"priority of unexpected type.");K(a===Td||a.B().e(),"Priority nodes can't have a priority of their own.")}var C=new T(new $b(Vb),null,je);function se(){T.call(this,new $b(Vb),C,je)}ma(se,T);g=se.prototype;
g.Dc=function(a){return a===this?0:1};g.ca=function(a){return a===this};g.B=function(){return this};g.J=function(){return C};g.e=function(){return!1};var Td=new se,Rd=new F("[MIN_NAME]",C),Xd=new F("[MAX_NAME]",Td);function Id(a,b){this.Q=a;this.Yd=b}function Fd(a,b,c,d){return new Id(new tb(b,c,d),a.Yd)}function Jd(a){return a.Q.ea?a.Q.j():null}Id.prototype.C=function(){return this.Yd};function ub(a){return a.Yd.ea?a.Yd.j():null};function te(a,b){this.V=a;var c=a.o,d=new kd(c.g),c=de(c)?new kd(c.g):c.ja?new qd(c):new ld(c);this.Hf=new yd(c);var e=b.C(),f=b.Q,h=d.xa(C,e.j(),null),k=c.xa(C,f.j(),null);this.Ka=new Id(new tb(k,f.ea,c.Na()),new tb(h,e.ea,d.Na()));this.Ya=[];this.jg=new cd(a)}function ue(a){return a.V}g=te.prototype;g.C=function(){return this.Ka.C().j()};g.gb=function(a){var b=ub(this.Ka);return b&&(de(this.V.o)||!a.e()&&!b.J(E(a)).e())?b.Y(a):null};g.e=function(){return 0===this.Ya.length};g.Pb=function(a){this.Ya.push(a)};
g.kb=function(a,b){var c=[];if(b){K(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;Oa(this.Ya,function(a){(a=a.gf(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Ya.length;++f){var h=this.Ya[f];if(!h.matches(a))e.push(h);else if(a.tf()){e=e.concat(this.Ya.slice(f+1));break}}this.Ya=e}else this.Ya=[];return c};
g.ab=function(a,b,c){a.type===Bd&&null!==a.source.Ib&&(K(ub(this.Ka),"We should always have a full cache before handling merges"),K(Jd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.Hf.ab(d,a,b,c);b=this.Hf;c=a.ke;K(c.Q.j().Jc(b.U.g),"Event snap not indexed");K(c.C().j().Jc(b.U.g),"Server snap not indexed");K(Ib(a.ke.C())||!Ib(d.C()),"Once a server snap is complete, it should never go back");this.Ka=a.ke;return ve(this,a.dg,a.ke.Q.j(),null)};
function we(a,b){var c=a.Ka.Q,d=[];c.j().L()||c.j().R(N,function(a,b){d.push(new D("child_added",b,a))});c.ea&&d.push(Eb(c.j()));return ve(a,d,c.j(),b)}function ve(a,b,c,d){return dd(a.jg,b,c,d?[d]:a.Ya)};function xe(a,b,c){this.type=Bd;this.source=a;this.path=b;this.children=c}xe.prototype.Xc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new Wb(this.source,G,a.value):new xe(this.source,G,a);K(E(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new xe(this.source,H(this.path),this.children)};xe.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function ye(a,b){this.f=Nc("p:rest:");this.F=a;this.Hb=b;this.Aa=null;this.$={}}function ze(a,b){if(n(b))return"tag$"+b;var c=a.o;K(de(c)&&c.g==N,"should have a tag if it's not a default query.");return a.path.toString()}g=ye.prototype;
g.yf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.va());var f=ze(a,c),h={};this.$[f]=h;a=ee(a.o);var k=this;Ae(this,e+".json",a,function(a,b){var t=b;404===a&&(a=t=null);null===a&&k.Hb(e,t,!1,c);w(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Pf=function(a,b){var c=ze(a,b);delete this.$[c]};g.N=function(a,b){this.Aa=a;var c=$c(a),d=c.data,c=c.Bc&&c.Bc.exp;b&&b("ok",{auth:d,expires:c})};g.he=function(a){this.Aa=null;a("ok",null)};g.Ne=function(){};
g.Cf=function(){};g.Jd=function(){};g.put=function(){};g.zf=function(){};g.Ve=function(){};
function Ae(a,b,c,d){c=c||{};c.format="export";a.Aa&&(c.auth=a.Aa);var e=(a.F.lb?"https://":"http://")+a.F.host+b+"?"+kb(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=nb(f.responseText)}catch(c){Q("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
f.status&&Q("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function Be(a,b){this.value=a;this.children=b||Ce}var Ce=new $b(function(a,b){return a===b?0:a<b?-1:1});function De(a){var b=Nd;r(a,function(a,d){b=b.set(new L(d),a)});return b}g=Be.prototype;g.e=function(){return null===this.value&&this.children.e()};function Ee(a,b,c){if(null!=a.value&&c(a.value))return{path:G,value:a.value};if(b.e())return null;var d=E(b);a=a.children.get(d);return null!==a?(b=Ee(a,H(b),c),null!=b?{path:(new L(d)).u(b.path),value:b.value}:null):null}
function Fe(a,b){return Ee(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(E(a));return null!==b?b.subtree(H(a)):Nd};g.set=function(a,b){if(a.e())return new Be(b,this.children);var c=E(a),d=(this.children.get(c)||Nd).set(H(a),b),c=this.children.Oa(c,d);return new Be(this.value,c)};
g.remove=function(a){if(a.e())return this.children.e()?Nd:new Be(null,this.children);var b=E(a),c=this.children.get(b);return c?(a=c.remove(H(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?Nd:new Be(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(E(a));return b?b.get(H(a)):null};
function Md(a,b,c){if(b.e())return c;var d=E(b);b=Md(a.children.get(d)||Nd,H(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new Be(a.value,d)}function Ge(a,b){return He(a,G,b)}function He(a,b,c){var d={};a.children.ia(function(a,f){d[a]=He(f,b.u(a),c)});return c(b,a.value,d)}function Ie(a,b,c){return Je(a,b,G,c)}function Je(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=E(b);return(a=a.children.get(e))?Je(a,H(b),c.u(e),d):null}
function Ke(a,b,c){var d=G;if(!b.e()){var e=!0;a.value&&(e=c(d,a.value));!0===e&&(e=E(b),(a=a.children.get(e))&&Le(a,H(b),d.u(e),c))}}function Le(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=E(b);return(a=a.children.get(e))?Le(a,H(b),c.u(e),d):Nd}function Kd(a,b){Me(a,G,b)}function Me(a,b,c){a.children.ia(function(a,e){Me(e,b.u(a),c)});a.value&&c(b,a.value)}function Ne(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Nd=new Be(null);
Be.prototype.toString=function(){var a={};Kd(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Oe(a,b,c){this.type=Ed;this.source=Pe;this.path=a;this.Qb=b;this.Vd=c}Oe.prototype.Xc=function(a){if(this.path.e()){if(null!=this.Qb.value)return K(this.Qb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Qb.subtree(new L(a));return new Oe(G,a,this.Vd)}K(E(this.path)===a,"operationForChild called for unrelated child.");return new Oe(H(this.path),this.Qb,this.Vd)};
Oe.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Vd+" affectedTree="+this.Qb+")"};var Xb=0,Bd=1,Ed=2,Zb=3;function Qe(a,b,c,d){this.xe=a;this.pf=b;this.Ib=c;this.bf=d;K(!d||b,"Tagged queries must be from server.")}var Pe=new Qe(!0,!1,null,!1),Re=new Qe(!1,!0,null,!1);Qe.prototype.toString=function(){return this.xe?"user":this.bf?"server(queryID="+this.Ib+")":"server"};function Se(a){this.W=a}var Te=new Se(new Be(null));function Ue(a,b,c){if(b.e())return new Se(new Be(c));var d=Fe(a.W,b);if(null!=d){var e=d.path,d=d.value;b=O(e,b);d=d.K(b,c);return new Se(a.W.set(e,d))}a=Md(a.W,b,new Be(c));return new Se(a)}function Ve(a,b,c){var d=a;ib(c,function(a,c){d=Ue(d,b.u(a),c)});return d}Se.prototype.Rd=function(a){if(a.e())return Te;a=Md(this.W,a,Nd);return new Se(a)};function We(a,b){var c=Fe(a.W,b);return null!=c?a.W.get(c.path).Y(O(c.path,b)):null}
function Xe(a){var b=[],c=a.W.value;null!=c?c.L()||c.R(N,function(a,c){b.push(new F(a,c))}):a.W.children.ia(function(a,c){null!=c.value&&b.push(new F(a,c.value))});return b}function Ye(a,b){if(b.e())return a;var c=We(a,b);return null!=c?new Se(new Be(c)):new Se(a.W.subtree(b))}Se.prototype.e=function(){return this.W.e()};Se.prototype.apply=function(a){return Ze(G,this.W,a)};
function Ze(a,b,c){if(null!=b.value)return c.K(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(K(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Ze(a.u(b),f,c)});c.Y(a).e()||null===d||(c=c.K(a.u(".priority"),d));return c};function $e(){this.T=Te;this.na=[];this.Mc=-1}function af(a,b){for(var c=0;c<a.na.length;c++){var d=a.na[c];if(d.kd===b)return d}return null}g=$e.prototype;
g.Rd=function(a){var b=Ua(this.na,function(b){return b.kd===a});K(0<=b,"removeWrite called with nonexistent writeId.");var c=this.na[b];this.na.splice(b,1);for(var d=c.visible,e=!1,f=this.na.length-1;d&&0<=f;){var h=this.na[f];h.visible&&(f>=b&&bf(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=cf(this.na,df,G),this.Mc=0<this.na.length?this.na[this.na.length-1].kd:-1;else if(c.Ga)this.T=this.T.Rd(c.path);else{var k=this;r(c.children,function(a,b){k.T=k.T.Rd(c.path.u(b))})}return!0}return!1};
g.za=function(a,b,c,d){if(c||d){var e=Ye(this.T,a);return!d&&e.e()?b:d||null!=b||null!=We(e,G)?(e=cf(this.na,function(b){return(b.visible||d)&&(!c||!(0<=Na(c,b.kd)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||C,e.apply(b)):null}e=We(this.T,a);if(null!=e)return e;e=Ye(this.T,a);return e.e()?b:null!=b||null!=We(e,G)?(b=b||C,e.apply(b)):null};
g.yc=function(a,b){var c=C,d=We(this.T,a);if(d)d.L()||d.R(N,function(a,b){c=c.O(a,b)});else if(b){var e=Ye(this.T,a);b.R(N,function(a,b){var d=Ye(e,new L(a)).apply(b);c=c.O(a,d)});Oa(Xe(e),function(a){c=c.O(a.name,a.S)})}else e=Ye(this.T,a),Oa(Xe(e),function(a){c=c.O(a.name,a.S)});return c};g.ld=function(a,b,c,d){K(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.u(b);if(null!=We(this.T,a))return null;a=Ye(this.T,a);return a.e()?d.Y(b):a.apply(d.Y(b))};
g.xc=function(a,b,c){a=a.u(b);var d=We(this.T,a);return null!=d?d:sb(c,b)?Ye(this.T,a).apply(c.j().J(b)):null};g.tc=function(a){return We(this.T,a)};g.oe=function(a,b,c,d,e,f){var h;a=Ye(this.T,a);h=We(a,G);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.mb(f);if(h.e()||h.L())return[];b=[];a=td(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=J(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=J(e);return b};
function bf(a,b){return a.Ga?a.path.contains(b):!!ua(a.children,function(c,d){return a.path.u(d).contains(b)})}function df(a){return a.visible}
function cf(a,b,c){for(var d=Te,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=O(c,h),d=Ue(d,h,f.Ga)):h.contains(c)&&(h=O(h,c),d=Ue(d,G,f.Ga.Y(h)));else if(f.children)if(c.contains(h))h=O(c,h),d=Ve(d,h,f.children);else{if(h.contains(c))if(h=O(h,c),h.e())d=Ve(d,G,f.children);else if(f=w(f.children,E(h)))f=f.Y(H(h)),d=Ue(d,G,f)}else throw Gc("WriteRecord should have .snap or .children");}}return d}function ef(a,b){this.Mb=a;this.W=b}g=ef.prototype;
g.za=function(a,b,c){return this.W.za(this.Mb,a,b,c)};g.yc=function(a){return this.W.yc(this.Mb,a)};g.ld=function(a,b,c){return this.W.ld(this.Mb,a,b,c)};g.tc=function(a){return this.W.tc(this.Mb.u(a))};g.oe=function(a,b,c,d,e){return this.W.oe(this.Mb,a,b,c,d,e)};g.xc=function(a,b){return this.W.xc(this.Mb,a,b)};g.u=function(a){return new ef(this.Mb.u(a),this.W)};function ff(){this.ya={}}g=ff.prototype;g.e=function(){return wa(this.ya)};g.ab=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=w(this.ya,d),K(null!=d,"SyncTree gave us an op for an invalid query."),d.ab(a,b,c);var e=[];r(this.ya,function(d){e=e.concat(d.ab(a,b,c))});return e};g.Pb=function(a,b,c,d,e){var f=a.va(),h=w(this.ya,f);if(!h){var h=c.za(e?d:null),k=!1;h?k=!0:(h=d instanceof T?c.yc(d):C,k=!1);h=new te(a,new Id(new tb(h,k,!1),new tb(d,e,!1)));this.ya[f]=h}h.Pb(b);return we(h,b)};
g.kb=function(a,b,c){var d=a.va(),e=[],f=[],h=null!=gf(this);if("default"===d){var k=this;r(this.ya,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.ya[d],de(a.V.o)||e.push(a.V))})}else{var l=w(this.ya,d);l&&(f=f.concat(l.kb(b,c)),l.e()&&(delete this.ya[d],de(l.V.o)||e.push(l.V)))}h&&null==gf(this)&&e.push(new U(a.k,a.path));return{Ig:e,kg:f}};function hf(a){return Pa(ra(a.ya),function(a){return!de(a.V.o)})}g.gb=function(a){var b=null;r(this.ya,function(c){b=b||c.gb(a)});return b};
function jf(a,b){if(de(b.o))return gf(a);var c=b.va();return w(a.ya,c)}function gf(a){return va(a.ya,function(a){return de(a.V.o)})||null};function kf(a){this.ta=Nd;this.jb=new $e;this.af={};this.lc={};this.Nc=a}function lf(a,b,c,d,e){var f=a.jb,h=e;K(d>f.Mc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.na.push({path:b,Ga:c,kd:d,visible:h});h&&(f.T=Ue(f.T,b,c));f.Mc=d;return e?mf(a,new Wb(Pe,b,c)):[]}function nf(a,b,c,d){var e=a.jb;K(d>e.Mc,"Stacking an older merge on top of newer ones");e.na.push({path:b,children:c,kd:d,visible:!0});e.T=Ve(e.T,b,c);e.Mc=d;c=De(c);return mf(a,new xe(Pe,b,c))}
function of(a,b,c){c=c||!1;var d=af(a.jb,b);if(a.jb.Rd(b)){var e=Nd;null!=d.Ga?e=e.set(G,!0):ib(d.children,function(a,b){e=e.set(new L(a),b)});return mf(a,new Oe(d.path,e,c))}return[]}function pf(a,b,c){c=De(c);return mf(a,new xe(Re,b,c))}function qf(a,b,c,d){d=rf(a,d);if(null!=d){var e=sf(d);d=e.path;e=e.Ib;b=O(d,b);c=new Wb(new Qe(!1,!0,e,!0),b,c);return tf(a,d,c)}return[]}
function uf(a,b,c,d){if(d=rf(a,d)){var e=sf(d);d=e.path;e=e.Ib;b=O(d,b);c=De(c);c=new xe(new Qe(!1,!0,e,!0),b,c);return tf(a,d,c)}return[]}
kf.prototype.Pb=function(a,b){var c=a.path,d=null,e=!1;Ke(this.ta,c,function(a,b){var f=O(a,c);d=b.gb(f);e=e||null!=gf(b);return!d});var f=this.ta.get(c);f?(e=e||null!=gf(f),d=d||f.gb(G)):(f=new ff,this.ta=this.ta.set(c,f));var h;null!=d?h=!0:(h=!1,d=C,Ne(this.ta.subtree(c),function(a,b){var c=b.gb(G);c&&(d=d.O(a,c))}));var k=null!=jf(f,a);if(!k&&!de(a.o)){var l=vf(a);K(!(l in this.lc),"View does not exist, but we have a tag");var m=wf++;this.lc[l]=m;this.af["_"+m]=l}h=f.Pb(a,b,new ef(c,this.jb),
d,h);k||e||(f=jf(f,a),h=h.concat(xf(this,a,f)));return h};
kf.prototype.kb=function(a,b,c){var d=a.path,e=this.ta.get(d),f=[];if(e&&("default"===a.va()||null!=jf(e,a))){f=e.kb(a,b,c);e.e()&&(this.ta=this.ta.remove(d));e=f.Ig;f=f.kg;b=-1!==Ua(e,function(a){return de(a.o)});var h=Ie(this.ta,d,function(a,b){return null!=gf(b)});if(b&&!h&&(d=this.ta.subtree(d),!d.e()))for(var d=yf(d),k=0;k<d.length;++k){var l=d[k],m=l.V,l=zf(this,l);this.Nc.Ye(m,Af(this,m),l.xd,l.G)}if(!h&&0<e.length&&!c)if(b)this.Nc.be(a,null);else{var t=this;Oa(e,function(a){a.va();var b=t.lc[vf(a)];
t.Nc.be(a,b)})}Bf(this,e)}return f};kf.prototype.za=function(a,b){var c=this.jb,d=Ie(this.ta,a,function(b,c){var d=O(b,a);if(d=c.gb(d))return d});return c.za(a,d,b,!0)};function yf(a){return Ge(a,function(a,c,d){if(c&&null!=gf(c))return[gf(c)];var e=[];c&&(e=hf(c));r(d,function(a){e=e.concat(a)});return e})}function Bf(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!de(d.o)){var d=vf(d),e=a.lc[d];delete a.lc[d];delete a.af["_"+e]}}}
function xf(a,b,c){var d=b.path,e=Af(a,b);c=zf(a,c);b=a.Nc.Ye(b,e,c.xd,c.G);d=a.ta.subtree(d);if(e)K(null==gf(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Ge(d,function(a,b,c){if(!a.e()&&b&&null!=gf(b))return[ue(gf(b))];var d=[];b&&(d=d.concat(Qa(hf(b),function(a){return a.V})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Nc.be(c,Af(a,c));return b}
function zf(a,b){var c=b.V,d=Af(a,c);return{xd:function(){return(b.C()||C).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=rf(a,d)){var h=sf(b);b=h.path;h=h.Ib;f=O(b,f);f=new Yb(new Qe(!1,!0,h,!0),f);b=tf(a,b,f)}else b=[]}else b=mf(a,new Yb(Re,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function vf(a){return a.path.toString()+"$"+a.va()}function sf(a){var b=a.indexOf("$");K(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new L(a.substr(0,b))}}function rf(a,b){var c=a.af,d="_"+b;return d in c?c[d]:void 0}function Af(a,b){var c=vf(b);return w(a.lc,c)}var wf=1;
function tf(a,b,c){var d=a.ta.get(b);K(d,"Missing sync point for query tag that we're tracking");return d.ab(c,new ef(b,a.jb),null)}function mf(a,b){return Cf(a,b,a.ta,null,new ef(G,a.jb))}function Cf(a,b,c,d,e){if(b.path.e())return Df(a,b,c,d,e);var f=c.get(G);null==d&&null!=f&&(d=f.gb(G));var h=[],k=E(b.path),l=b.Xc(k);if((c=c.children.get(k))&&l)var m=d?d.J(k):null,k=e.u(k),h=h.concat(Cf(a,l,c,m,k));f&&(h=h.concat(f.ab(b,e,d)));return h}
function Df(a,b,c,d,e){var f=c.get(G);null==d&&null!=f&&(d=f.gb(G));var h=[];c.children.ia(function(c,f){var m=d?d.J(c):null,t=e.u(c),y=b.Xc(c);y&&(h=h.concat(Df(a,y,f,m,t)))});f&&(h=h.concat(f.ab(b,e,d)));return h};function Ef(){this.children={};this.nd=0;this.value=null}function Ff(a,b,c){this.Gd=a?a:"";this.Zc=b?b:null;this.w=c?c:new Ef}function Gf(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=E(c));)d=new Ff(e,d,w(d.w.children,e)||new Ef),c=H(c);return d}g=Ff.prototype;g.Ca=function(){return this.w.value};function Hf(a,b){K("undefined"!==typeof b,"Cannot set value to undefined");a.w.value=b;If(a)}g.clear=function(){this.w.value=null;this.w.children={};this.w.nd=0;If(this)};
g.wd=function(){return 0<this.w.nd};g.e=function(){return null===this.Ca()&&!this.wd()};g.R=function(a){var b=this;r(this.w.children,function(c,d){a(new Ff(d,b,c))})};function Jf(a,b,c,d){c&&!d&&b(a);a.R(function(a){Jf(a,b,!0,d)});c&&d&&b(a)}function Kf(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Zc?this.Gd:this.Zc.path()+"/"+this.Gd)};g.name=function(){return this.Gd};g.parent=function(){return this.Zc};
function If(a){if(null!==a.Zc){var b=a.Zc,c=a.Gd,d=a.e(),e=v(b.w.children,c);d&&e?(delete b.w.children[c],b.w.nd--,If(b)):d||e||(b.w.children[c]=a.w,b.w.nd++,If(b))}};function Lf(a){K(ea(a)&&0<a.length,"Requires a non-empty array");this.Vf=a;this.Oc={}}Lf.prototype.ge=function(a,b){for(var c=this.Oc[a]||[],d=0;d<c.length;d++)c[d].zc.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};Lf.prototype.Fb=function(a,b,c){Mf(this,a);this.Oc[a]=this.Oc[a]||[];this.Oc[a].push({zc:b,Ma:c});(a=this.Be(a))&&b.apply(c,a)};Lf.prototype.hc=function(a,b,c){Mf(this,a);a=this.Oc[a]||[];for(var d=0;d<a.length;d++)if(a[d].zc===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};
function Mf(a,b){K(Ta(a.Vf,function(a){return a===b}),"Unknown event: "+b)};var Nf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);K(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);K(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Of(){Lf.call(this,["online"]);this.jc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.jc||(a.jc=!0,a.ge("online",!0))},!1);window.addEventListener("offline",function(){a.jc&&(a.jc=!1,a.ge("online",!1))},!1)}}ma(Of,Lf);Of.prototype.Be=function(a){K("online"===a,"Unknown event type: "+a);return[this.jc]};ca(Of);function Pf(){Lf.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Ob=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.Ob&&(c.Ob=b,c.ge("visible",b))},!1)}}ma(Pf,Lf);Pf.prototype.Be=function(a){K("visible"===a,"Unknown event type: "+a);return[this.Ob]};ca(Pf);var Qf=/[\[\].#$\/\u0000-\u001F\u007F]/,Rf=/[\[\].#$\u0000-\u001F\u007F]/,Sf=/^[a-zA-Z][a-zA-Z._\-+]+$/;function Tf(a){return p(a)&&0!==a.length&&!Qf.test(a)}function Uf(a){return null===a||p(a)||ga(a)&&!Rc(a)||ia(a)&&v(a,".sv")}function Vf(a,b,c,d){d&&!n(b)||Wf(z(a,1,d),b,c)}
function Wf(a,b,c){c instanceof L&&(c=new vc(c,a));if(!n(b))throw Error(a+"contains undefined "+yc(c));if(ha(b))throw Error(a+"contains a function "+yc(c)+" with contents: "+b.toString());if(Rc(b))throw Error(a+"contains "+b.toString()+" "+yc(c));if(p(b)&&b.length>10485760/3&&10485760<wc(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+yc(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;ib(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!Tf(b)))throw Error(a+" contains an invalid key ("+b+") "+yc(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Wf(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+yc(c)+" in addition to actual children.");}}
function Xf(a,b,c){if(!ia(b)||ea(b))throw Error(z(a,1,!1)+" must be an Object containing the children to replace.");if(v(b,".value"))throw Error(z(a,1,!1)+' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');Vf(a,b,c,!1)}
function Yf(a,b,c){if(Rc(c))throw Error(z(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Uf(c))throw Error(z(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function Zf(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(z(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function $f(a,b,c,d){if((!d||n(c))&&!Tf(c))throw Error(z(a,b,d)+'was an invalid key: "'+c+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function ag(a,b){if(!p(b)||0===b.length||Rf.test(b))throw Error(z(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function bg(a,b){if(".info"===E(b))throw Error(a+" failed: Can't modify data under /.info/");}function cg(a,b){if(!p(b))throw Error(z(a,1,!1)+"must be a valid credential (a string).");}function dg(a,b,c){if(!p(c))throw Error(z(a,b,!1)+"must be a valid string.");}
function eg(a,b){dg(a,1,b);if(!Sf.test(b))throw Error(z(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function fg(a,b,c,d){if(!d||n(c))if(!ia(c)||null===c)throw Error(z(a,b,d)+"must be a valid object.");}function gg(a,b,c){if(!ia(b)||!v(b,c))throw Error(z(a,1,!1)+'must contain the key "'+c+'"');if(!p(w(b,c)))throw Error(z(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function hg(){this.set={}}g=hg.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return v(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return wa(this.set)};g.count=function(){return pa(this.set)};function ig(a,b){r(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function pc(){this.m=this.A=null}pc.prototype.find=function(a){if(null!=this.A)return this.A.Y(a);if(a.e()||null==this.m)return null;var b=E(a);a=H(a);return this.m.contains(b)?this.m.get(b).find(a):null};pc.prototype.nc=function(a,b){if(a.e())this.A=b,this.m=null;else if(null!==this.A)this.A=this.A.K(a,b);else{null==this.m&&(this.m=new hg);var c=E(a);this.m.contains(c)||this.m.add(c,new pc);c=this.m.get(c);a=H(a);c.nc(a,b)}};
function jg(a,b){if(b.e())return a.A=null,a.m=null,!0;if(null!==a.A){if(a.A.L())return!1;var c=a.A;a.A=null;c.R(N,function(b,c){a.nc(new L(b),c)});return jg(a,b)}return null!==a.m?(c=E(b),b=H(b),a.m.contains(c)&&jg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function qc(a,b,c){null!==a.A?c(b,a.A):a.R(function(a,e){var f=new L(b.toString()+"/"+a);qc(e,f,c)})}pc.prototype.R=function(a){null!==this.m&&ig(this.m,function(b,c){a(b,c)})};var kg="auth.firebase.com";function lg(a,b,c){this.od=a||{};this.fe=b||{};this.$a=c||{};this.od.remember||(this.od.remember="default")}var mg=["remember","redirectTo"];function ng(a){var b={},c={};ib(a||{},function(a,e){0<=Na(mg,a)?b[a]=e:c[a]=e});return new lg(b,{},c)};function og(a,b){this.Re=["session",a.Od,a.Db].join(":");this.ce=b}og.prototype.set=function(a,b){if(!b)if(this.ce.length)b=this.ce[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Re,a)};og.prototype.get=function(){var a=Qa(this.ce,q(this.og,this)),a=Pa(a,function(a){return null!==a});Xa(a,function(a,c){return ad(c.token)-ad(a.token)});return 0<a.length?a.shift():null};og.prototype.og=function(a){try{var b=a.get(this.Re);if(b&&b.token)return b}catch(c){}return null};
og.prototype.clear=function(){var a=this;Oa(this.ce,function(b){b.remove(a.Re)})};function pg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function qg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pg())}function rg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
function sg(a){var b=pg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function tg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function ug(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function vg(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
function wg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function xg(a){var b="";try{a=a.replace("#","");var c=lb(a);c&&v(c,"__firebase_request_key")&&(b=w(c,"__firebase_request_key"))}catch(d){}return b}function yg(){var a=Qc(kg);return a.scheme+"://"+a.host+"/v2"}function zg(a){return yg()+"/"+a+"/auth/channel"};function Ag(a){var b=this;this.Ac=a;this.de="*";sg(8)?this.Rc=this.zd=tg():(this.Rc=window.opener,this.zd=window);if(!b.Rc)throw"Unable to find relay frame";ug(this.zd,"message",q(this.ic,this));ug(this.zd,"message",q(this.Bf,this));try{Bg(this,{a:"ready"})}catch(c){ug(this.Rc,"load",function(){Bg(b,{a:"ready"})})}ug(window,"unload",q(this.zg,this))}function Bg(a,b){b=B(b);sg(8)?a.Rc.doPost(b,a.de):a.Rc.postMessage(b,a.de)}
Ag.prototype.ic=function(a){var b=this,c;try{c=nb(a.data)}catch(d){}c&&"request"===c.a&&(vg(window,"message",this.ic),this.de=a.origin,this.Ac&&setTimeout(function(){b.Ac(b.de,c.d,function(a,c){b.bg=!c;b.Ac=void 0;Bg(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};Ag.prototype.zg=function(){try{vg(this.zd,"message",this.Bf)}catch(a){}this.Ac&&(Bg(this,{a:"error",d:"unknown closed window"}),this.Ac=void 0);try{window.close()}catch(b){}};Ag.prototype.Bf=function(a){if(this.bg&&"die"===a.data)try{window.close()}catch(b){}};function Cg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}Cg.prototype.open=function(a,b){P.set("redirect_request_id",this.pc);P.set("redirect_request_id",this.pc);b.requestId=this.pc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+kb(b);window.location=a};Cg.isAvailable=function(){return!rg()&&!qg()};Cg.prototype.Cc=function(){return"redirect"};var Dg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Eg(a){var b=Error(w(Dg,a),a);b.code=a;return b};function Fg(a){var b;(b=!a.window_features)||(b=pg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
Fg.prototype.open=function(a,b,c){function d(a){h&&(document.body.removeChild(h),h=void 0);t&&(t=clearInterval(t));vg(window,"message",e);vg(window,"unload",d);if(m&&!a)try{m.close()}catch(b){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=nb(a.data);"ready"===b.a?k.postMessage(y,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=sg(8),h,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
var l=wg(a);if(l!==wg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(h=document.createElement("iframe"),h.setAttribute("src",this.options.relay_url),h.style.display="none",h.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(h),k=h.contentWindow);a+=(/\?/.test(a)?"":"?")+kb(b);var m=window.open(a,this.options.window_name,this.options.window_features);k||(k=m);var t=setInterval(function(){m&&m.closed&&
(d(!1),c&&(c(Eg("USER_CANCELLED")),c=null))},500),y=B({a:"request",d:b});ug(window,"unload",d);ug(window,"message",e)}};
Fg.isAvailable=function(){var a;if(a="postMessage"in window&&!rg())(a=qg()||"undefined"!==typeof navigator&&(!!pg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=pg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!pg().match(/PhantomJS/)};Fg.prototype.Cc=function(){return"popup"};function Gg(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
Gg.prototype.open=function(a,b,c){function d(){c&&(c(Eg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),h;ug(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=nb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Eg("SERVER_ERROR")):c(Eg("NETWORK_ERROR"));c=null;vg(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+kb(b),h=null;else{var k=this.options.headers.content_type;
"application/json"===k&&(h=B(b));"application/x-www-form-urlencoded"===k&&(h=kb(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};za(a,this.options.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(h)};Gg.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=pg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||sg(10);return a};Gg.prototype.Cc=function(){return"json"};function Hg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}
Hg.prototype.open=function(a,b,c){function d(){c&&(c(Eg("USER_CANCELLED")),c=null)}var e=this,f=Qc(kg),h;b.requestId=this.pc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=kb(b);(h=window.open(a,"_blank","location=no"))&&ha(h.addEventListener)?(h.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var m=document.createElement("a");m.href=a.url;b=m.host===f.host&&"/blank/page.html"===m.pathname;break a}catch(t){}b=!1}b&&(a=xg(a.url),h.removeEventListener("exit",
d),h.close(),a=new lg(null,null,{requestId:e.pc,requestKey:a}),e.Ef.requestWithCredential("/auth/session",a,c),c=null)}),h.addEventListener("exit",d)):c(Eg("TRANSPORT_UNAVAILABLE"))};Hg.isAvailable=function(){return qg()};Hg.prototype.Cc=function(){return"redirect"};function Ig(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
Ig.prototype.open=function(a,b,c){function d(){c&&(c(Eg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;wa(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);vg(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+kb(b);
ug(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Jg(f,a,c)};
function Jg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Eg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Eg("NETWORK_ERROR"))}},0)}Ig.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
Ig.prototype.Cc=function(){return"json"};function Kg(a,b,c,d){Lf.call(this,["auth_status"]);this.F=a;this.ef=b;this.Tg=c;this.Me=d;this.sc=new og(a,[Cc,P]);this.nb=null;this.Te=!1;Lg(this)}ma(Kg,Lf);g=Kg.prototype;g.ye=function(){return this.nb||null};function Lg(a){P.get("redirect_request_id")&&Mg(a);var b=a.sc.get();b&&b.token?(Ng(a,b),a.ef(b.token,function(c,d){Og(a,c,d,!1,b.token,b)},function(b,d){Pg(a,"resumeSession()",b,d)})):Ng(a,null)}
function Qg(a,b,c,d,e,f){"firebaseio-demo.com"===a.F.domain&&Q("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.ef(b,function(f,k){Og(a,f,k,!0,b,c,d||{},e)},function(b,c){Pg(a,"auth()",b,c,f)})}function Rg(a,b){a.sc.clear();Ng(a,null);a.Tg(function(a,d){if("ok"===a)R(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;R(b,f)}})}
function Og(a,b,c,d,e,f,h,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=bd(e)?e:"",c=null,b&&v(b,"uid")?c=w(b,"uid"):v(f,"uid")&&(c=w(f,"uid")),f.uid=c,c="custom",b&&v(b,"provider")?c=w(b,"provider"):v(f,"provider")&&(c=w(f,"provider")),f.provider=c,a.sc.clear(),bd(e)&&(h=h||{},c=Cc,"sessionOnly"===h.remember&&(c=P),"none"!==h.remember&&a.sc.set(f,c)),Ng(a,f)),R(k,null,f)):(a.sc.clear(),Ng(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,R(k,f))}
function Pg(a,b,c,d,e){Q(b+" was canceled: "+d);a.sc.clear();Ng(a,null);a=Error(d);a.code=c.toUpperCase();R(e,a)}function Sg(a,b,c,d,e){Tg(a);c=new lg(d||{},{},c||{});Ug(a,[Gg,Ig],"/auth/"+b,c,e)}
function Vg(a,b,c,d){Tg(a);var e=[Fg,Hg];c=ng(c);"anonymous"===b||"password"===b?setTimeout(function(){R(d,Eg("TRANSPORT_UNAVAILABLE"))},0):(c.fe.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.fe.relay_url=zg(a.F.Db),c.fe.requestWithCredential=q(a.qc,a),Ug(a,e,"/auth/"+b,c,d))}
function Mg(a){var b=P.get("redirect_request_id");if(b){var c=P.get("redirect_client_options");P.remove("redirect_request_id");P.remove("redirect_client_options");var d=[Gg,Ig],b={requestId:b,requestKey:xg(document.location.hash)},c=new lg(c,{},b);a.Te=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}Ug(a,d,"/auth/session",c,function(){this.Te=!1}.bind(a))}}
g.te=function(a,b){Tg(this);var c=ng(a);c.$a._method="POST";this.qc("/users",c,function(a,c){a?R(b,a):R(b,a,c)})};g.Ue=function(a,b){var c=this;Tg(this);var d="/users/"+encodeURIComponent(a.email),e=ng(a);e.$a._method="DELETE";this.qc(d,e,function(a,d){!a&&d&&d.uid&&c.nb&&c.nb.uid&&c.nb.uid===d.uid&&Rg(c);R(b,a)})};g.qe=function(a,b){Tg(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=ng(a);d.$a._method="PUT";d.$a.password=a.newPassword;this.qc(c,d,function(a){R(b,a)})};
g.pe=function(a,b){Tg(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=ng(a);d.$a._method="PUT";d.$a.email=a.newEmail;d.$a.password=a.password;this.qc(c,d,function(a){R(b,a)})};g.We=function(a,b){Tg(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=ng(a);d.$a._method="POST";this.qc(c,d,function(a){R(b,a)})};g.qc=function(a,b,c){Wg(this,[Gg,Ig],a,b,c)};
function Ug(a,b,c,d,e){Wg(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?Qg(a,c.token,c,d.od,function(a,b){a?R(e,a):R(e,null,b)}):R(e,b||Eg("UNKNOWN_ERROR"))})}
function Wg(a,b,c,d,e){b=Pa(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){R(e,Eg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.fe),d=jb(d.$a),d.v="js-"+hb,d.transport=b.Cc(),d.suppress_status_codes=!0,a=yg()+"/"+a.F.Db+c,b.open(a,d,function(a,b){if(a)R(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;R(e,c)}else R(e,null,b)}))}
function Ng(a,b){var c=null!==a.nb||null!==b;a.nb=b;c&&a.ge("auth_status",b);a.Me(null!==b)}g.Be=function(a){K("auth_status"===a,'initial event must be of type "auth_status"');return this.Te?null:[this.nb]};function Tg(a){var b=a.F;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===kg)throw Error("This custom Firebase server ('"+a.F.domain+"') does not support delegated login.");};function Xg(a){this.ic=a;this.Nd=[];this.Sb=0;this.re=-1;this.Gb=null}function Yg(a,b,c){a.re=b;a.Gb=c;a.re<a.Sb&&(a.Gb(),a.Gb=null)}function Zg(a,b,c){for(a.Nd[b]=c;a.Nd[a.Sb];){var d=a.Nd[a.Sb];delete a.Nd[a.Sb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Db(function(){f.ic(d[e])})}if(a.Sb===a.re){a.Gb&&(clearTimeout(a.Gb),a.Gb(),a.Gb=null);break}a.Sb++}};function $g(a,b,c){this.se=a;this.f=Nc(a);this.ob=this.pb=0;this.Va=Qb(b);this.Zd=c;this.Hc=!1;this.jd=function(a){b.host!==b.Pa&&(a.ns=b.Db);var c=[],f;for(f in a)a.hasOwnProperty(f)&&c.push(f+"="+a[f]);return(b.lb?"https://":"http://")+b.Pa+"/.lp?"+c.join("&")}}var ah,bh;
$g.prototype.open=function(a,b){this.hf=0;this.la=b;this.Af=new Xg(a);this.Ab=!1;var c=this;this.rb=setTimeout(function(){c.f("Timed out trying to connect.");c.hb();c.rb=null},Math.floor(3E4));Sc(function(){if(!c.Ab){c.Ta=new ch(function(a,b,d,k,l){dh(c,arguments);if(c.Ta)if(c.rb&&(clearTimeout(c.rb),c.rb=null),c.Hc=!0,"start"==a)c.id=b,c.Gf=d;else if("close"===a)b?(c.Ta.Xd=!1,Yg(c.Af,b,function(){c.hb()})):c.hb();else throw Error("Unrecognized command received: "+a);},function(a,b){dh(c,arguments);
Zg(c.Af,a,b)},function(){c.hb()},c.jd);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.ie&&(a.cb=c.Ta.ie);a.v="5";c.Zd&&(a.s=c.Zd);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.jd(a);c.f("Connecting via long-poll to "+a);eh(c.Ta,a,function(){})}})};
$g.prototype.start=function(){var a=this.Ta,b=this.Gf;a.sg=this.id;a.tg=b;for(a.me=!0;fh(a););a=this.id;b=this.Gf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.jd(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
$g.isAvailable=function(){return ah||!bh&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Vg)&&!0};g=$g.prototype;g.Ed=function(){};g.dd=function(){this.Ab=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.rb&&(clearTimeout(this.rb),this.rb=null)};
g.hb=function(){this.Ab||(this.f("Longpoll is closing itself"),this.dd(),this.la&&(this.la(this.Hc),this.la=null))};g.close=function(){this.Ab||(this.f("Longpoll is being closed."),this.dd())};g.send=function(a){a=B(a);this.pb+=a.length;Nb(this.Va,"bytes_sent",a.length);a=Jc(a);a=fb(a,!0);a=Wc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.ad.push({Kg:this.hf,Sg:a.length,kf:a[b]});c.me&&fh(c);this.hf++}};function dh(a,b){var c=B(b).length;a.ob+=c;Nb(a.Va,"bytes_received",c)}
function ch(a,b,c,d){this.jd=d;this.ib=c;this.Qe=new hg;this.ad=[];this.ue=Math.floor(1E8*Math.random());this.Xd=!0;this.ie=Fc();window["pLPCommand"+this.ie]=a;window["pRTLPCB"+this.ie]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||Cb("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.fb=a.contentDocument:a.contentWindow?a.fb=a.contentWindow.document:a.document&&(a.fb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.fb.open(),this.Ea.fb.write(a),this.Ea.fb.close()}catch(f){Cb("frame writing exception"),f.stack&&Cb(f.stack),Cb(f)}}
ch.prototype.close=function(){this.me=!1;if(this.Ea){this.Ea.fb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.ib;b&&(this.ib=null,b())};
function fh(a){if(a.me&&a.Xd&&a.Qe.count()<(0<a.ad.length?2:1)){a.ue++;var b={};b.id=a.sg;b.pw=a.tg;b.ser=a.ue;for(var b=a.jd(b),c="",d=0;0<a.ad.length;)if(1870>=a.ad[0].kf.length+30+c.length){var e=a.ad.shift(),c=c+"&seg"+d+"="+e.Kg+"&ts"+d+"="+e.Sg+"&d"+d+"="+e.kf;d++}else break;gh(a,b+c,a.ue);return!0}return!1}function gh(a,b,c){function d(){a.Qe.remove(c);fh(a)}a.Qe.add(c,1);var e=setTimeout(d,Math.floor(25E3));eh(a,b,function(){clearTimeout(e);d()})}
function eh(a,b,c){setTimeout(function(){try{if(a.Xd){var d=a.Ea.fb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){Cb("Long-poll script failed to load: "+b);a.Xd=!1;a.close()};a.Ea.fb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var hh=null;"undefined"!==typeof MozWebSocket?hh=MozWebSocket:"undefined"!==typeof WebSocket&&(hh=WebSocket);function ih(a,b,c){this.se=a;this.f=Nc(this.se);this.frames=this.Kc=null;this.ob=this.pb=this.cf=0;this.Va=Qb(b);this.eb=(b.lb?"wss://":"ws://")+b.Pa+"/.ws?v=5";"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(this.eb+="&r=f");b.host!==b.Pa&&(this.eb=this.eb+"&ns="+b.Db);c&&(this.eb=this.eb+"&s="+c)}var jh;
ih.prototype.open=function(a,b){this.ib=b;this.xg=a;this.f("Websocket connecting to "+this.eb);this.Hc=!1;Cc.set("previous_websocket_failure",!0);try{this.ua=new hh(this.eb)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.hb();return}var e=this;this.ua.onopen=function(){e.f("Websocket connected.");e.Hc=!0};this.ua.onclose=function(){e.f("Websocket connection was disconnected.");e.ua=null;e.hb()};this.ua.onmessage=function(a){if(null!==e.ua)if(a=a.data,e.ob+=
a.length,Nb(e.Va,"bytes_received",a.length),kh(e),null!==e.frames)lh(e,a);else{a:{K(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.cf=b;e.frames=[];a=null;break a}}e.cf=1;e.frames=[]}null!==a&&lh(e,a)}};this.ua.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.hb()}};ih.prototype.start=function(){};
ih.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==hh&&!jh};ih.responsesRequiredToBeHealthy=2;ih.healthyTimeout=3E4;g=ih.prototype;g.Ed=function(){Cc.remove("previous_websocket_failure")};function lh(a,b){a.frames.push(b);if(a.frames.length==a.cf){var c=a.frames.join("");a.frames=null;c=nb(c);a.xg(c)}}
g.send=function(a){kh(this);a=B(a);this.pb+=a.length;Nb(this.Va,"bytes_sent",a.length);a=Wc(a,16384);1<a.length&&this.ua.send(String(a.length));for(var b=0;b<a.length;b++)this.ua.send(a[b])};g.dd=function(){this.Ab=!0;this.Kc&&(clearInterval(this.Kc),this.Kc=null);this.ua&&(this.ua.close(),this.ua=null)};g.hb=function(){this.Ab||(this.f("WebSocket is closing itself"),this.dd(),this.ib&&(this.ib(this.Hc),this.ib=null))};g.close=function(){this.Ab||(this.f("WebSocket is being closed"),this.dd())};
function kh(a){clearInterval(a.Kc);a.Kc=setInterval(function(){a.ua&&a.ua.send("0");kh(a)},Math.floor(45E3))};function mh(a){nh(this,a)}var oh=[$g,ih];function nh(a,b){var c=ih&&ih.isAvailable(),d=c&&!(Cc.wf||!0===Cc.get("previous_websocket_failure"));b.Ug&&(c||Q("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.gd=[ih];else{var e=a.gd=[];Xc(oh,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function ph(a){if(0<a.gd.length)return a.gd[0];throw Error("No transports available");};function qh(a,b,c,d,e,f){this.id=a;this.f=Nc("c:"+this.id+":");this.ic=c;this.Wc=d;this.la=e;this.Oe=f;this.F=b;this.Md=[];this.ff=0;this.Of=new mh(b);this.Ua=0;this.f("Connection created");rh(this)}
function rh(a){var b=ph(a.Of);a.I=new b("c:"+a.id+":"+a.ff++,a.F);a.Se=b.responsesRequiredToBeHealthy||0;var c=sh(a,a.I),d=th(a,a.I);a.hd=a.I;a.cd=a.I;a.D=null;a.Bb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.yd=setTimeout(function(){a.yd=null;a.Bb||(a.I&&102400<a.I.ob?(a.f("Connection exceeded healthy timeout but has received "+a.I.ob+" bytes.  Marking connection healthy."),a.Bb=!0,a.I.Ed()):a.I&&10240<a.I.pb?a.f("Connection exceeded healthy timeout but has sent "+
a.I.pb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function th(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.F.Pa.substr(0,2)&&(Cc.remove("host:"+a.F.host),a.F.Pa=a.F.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.hd!==c&&a.cd!==c||a.close()):a.f("closing an old connection")}}
function sh(a,b){return function(c){if(2!=a.Ua)if(b===a.cd){var d=Uc("t",c);c=Uc("d",c);if("c"==d){if(d=Uc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Zd=c.s;Ec(a.F,f);0==a.Ua&&(a.I.start(),uh(a,a.I,d),"5"!==e&&Q("Protocol version mismatch detected"),c=a.Of,(c=1<c.gd.length?c.gd[1]:null)&&vh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.cd=a.D;for(c=0;c<a.Md.length;++c)a.Id(a.Md[c]);a.Md=[];wh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.Oe&&(a.Oe(c),a.Oe=null),a.la=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ec(a.F,c),1===a.Ua?a.close():(xh(a),rh(a))):"e"===d?Oc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),yh(a),zh(a)):Oc("Unknown control packet command: "+d)}else"d"==d&&a.Id(c)}else if(b===a.D)if(d=Uc("t",c),c=Uc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Ah(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.hd!==a.D&&a.cd!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.Mf--,Ah(a)));else if("d"==d)a.Md.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}qh.prototype.Fa=function(a){Bh(this,{t:"d",d:a})};function wh(a){a.hd===a.D&&a.cd===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.se),a.I=a.D,a.D=null)}
function Ah(a){0>=a.Mf?(a.f("Secondary connection is healthy."),a.Bb=!0,a.D.Ed(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.hd=a.D,wh(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}qh.prototype.Id=function(a){yh(this);this.ic(a)};function yh(a){a.Bb||(a.Se--,0>=a.Se&&(a.f("Primary connection is healthy."),a.Bb=!0,a.I.Ed()))}
function vh(a,b){a.D=new b("c:"+a.id+":"+a.ff++,a.F,a.Zd);a.Mf=b.responsesRequiredToBeHealthy||0;a.D.open(sh(a,a.D),th(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function uh(a,b,c){a.f("Realtime connection established.");a.I=b;a.Ua=1;a.Wc&&(a.Wc(c),a.Wc=null);0===a.Se?(a.f("Primary connection is healthy."),a.Bb=!0):setTimeout(function(){zh(a)},Math.floor(5E3))}
function zh(a){a.Bb||1!==a.Ua||(a.f("sending ping on primary."),Bh(a,{t:"c",d:{t:"p",d:{}}}))}function Bh(a,b){if(1!==a.Ua)throw"Connection is not connected";a.hd.send(b)}qh.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,xh(this),this.la&&(this.la(),this.la=null))};function xh(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.yd&&(clearTimeout(a.yd),a.yd=null)};function Ch(a,b,c,d){this.id=Dh++;this.f=Nc("p:"+this.id+":");this.xf=this.Fe=!1;this.$={};this.qa=[];this.Yc=0;this.Vc=[];this.oa=!1;this.Za=1E3;this.Fd=3E5;this.Hb=b;this.Uc=c;this.Pe=d;this.F=a;this.tb=this.Aa=this.Ia=this.Xe=null;this.Ob=!1;this.Td={};this.Jg=0;this.nf=!0;this.Lc=this.He=null;Eh(this,0);Pf.vb().Fb("visible",this.Ag,this);-1===a.host.indexOf("fblocal")&&Of.vb().Fb("online",this.yg,this)}var Dh=0,Fh=0;g=Ch.prototype;
g.Fa=function(a,b,c){var d=++this.Jg;a={r:d,a:a,b:b};this.f(B(a));K(this.oa,"sendRequest call when we're not connected not allowed.");this.Ia.Fa(a);c&&(this.Td[d]=c)};g.yf=function(a,b,c,d){var e=a.va(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};K(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,xd:b,Gg:a,tag:c};this.$[f][e]=a;this.oa&&Gh(this,a)};
function Gh(a,b){var c=b.Gg,d=c.path.toString(),e=c.va();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=ce(c.o),f.t=b.tag);f.h=b.xd();a.Fa("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&v(k,"w")){var m=w(k,"w");ea(m)&&0<=Na(m,"no_index")&&Q("Using an unspecified index. Consider adding "+('".indexOn": "'+c.o.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Hh(a,d,e),b.G&&b.G(l,
k))})}g.N=function(a,b,c){this.Aa={gg:a,of:!1,zc:b,md:c};this.f("Authenticating using credential: "+a);Ih(this);(b=40==a.length)||(a=$c(a).Bc,b="object"===typeof a&&!0===w(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Fd=3E4)};g.he=function(a){delete this.Aa;this.oa&&this.Fa("unauth",{},function(b){a(b.s,b.d)})};
function Ih(a){var b=a.Aa;a.oa&&b&&a.Fa("auth",{cred:b.gg},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Aa===b&&delete a.Aa;b.of?"ok"!==d&&b.md&&b.md(d,c):(b.of=!0,b.zc&&b.zc(d,c))})}g.Pf=function(a,b){var c=a.path.toString(),d=a.va();this.f("Unlisten called for "+c+" "+d);if(Hh(this,c,d)&&this.oa){var e=ce(a.o);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Fa("n",c)}};g.Ne=function(a,b,c){this.oa?Jh(this,"o",a,b,c):this.Vc.push({$c:a,action:"o",data:b,G:c})};
g.Cf=function(a,b,c){this.oa?Jh(this,"om",a,b,c):this.Vc.push({$c:a,action:"om",data:b,G:c})};g.Jd=function(a,b){this.oa?Jh(this,"oc",a,null,b):this.Vc.push({$c:a,action:"oc",data:null,G:b})};function Jh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Fa(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Kh(this,"p",a,b,c,d)};g.zf=function(a,b,c,d){Kh(this,"m",a,b,c,d)};
function Kh(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.qa.push({action:b,Jf:d,G:e});a.Yc++;b=a.qa.length-1;a.oa?Lh(a,b):a.f("Buffering put: "+c)}function Lh(a,b){var c=a.qa[b].action,d=a.qa[b].Jf,e=a.qa[b].G;a.qa[b].Hg=a.oa;a.Fa(c,d,function(d){a.f(c+" response",d);delete a.qa[b];a.Yc--;0===a.Yc&&(a.qa=[]);e&&e(d.s,d.d)})}g.Ve=function(a){this.oa&&(a={c:a},this.f("reportStats",a),this.Fa("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
g.Id=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Td[b];c&&(delete this.Td[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Hb(c.p,c.d,!1,c.t):"m"===b?this.Hb(c.p,c.d,!0,c.t):"c"===b?Mh(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Aa,delete this.Aa,c&&c.md&&c.md(a,b)):"sd"===b?this.Xe?this.Xe(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
"\nFIREBASE: ")):Oc("Unrecognized action received from server: "+B(b)+"\nAre you using the latest client?"))}};g.Wc=function(a){this.f("connection ready");this.oa=!0;this.Lc=(new Date).getTime();this.Pe({serverTimeOffset:a-(new Date).getTime()});this.nf&&(a={},a["sdk.js."+hb.replace(/\./g,"-")]=1,qg()&&(a["framework.cordova"]=1),this.Ve(a));Nh(this);this.nf=!1;this.Uc(!0)};
function Eh(a,b){K(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.tb&&clearTimeout(a.tb);a.tb=setTimeout(function(){a.tb=null;Oh(a)},Math.floor(b))}g.Ag=function(a){a&&!this.Ob&&this.Za===this.Fd&&(this.f("Window became visible.  Reducing delay."),this.Za=1E3,this.Ia||Eh(this,0));this.Ob=a};g.yg=function(a){a?(this.f("Browser went online."),this.Za=1E3,this.Ia||Eh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
g.Df=function(){this.f("data client disconnected");this.oa=!1;this.Ia=null;for(var a=0;a<this.qa.length;a++){var b=this.qa[a];b&&"h"in b.Jf&&b.Hg&&(b.G&&b.G("disconnect"),delete this.qa[a],this.Yc--)}0===this.Yc&&(this.qa=[]);this.Td={};Ph(this)&&(this.Ob?this.Lc&&(3E4<(new Date).getTime()-this.Lc&&(this.Za=1E3),this.Lc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Za=this.Fd,this.He=(new Date).getTime()),a=Math.max(0,this.Za-((new Date).getTime()-this.He)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),Eh(this,a),this.Za=Math.min(this.Fd,1.3*this.Za));this.Uc(!1)};function Oh(a){if(Ph(a)){a.f("Making a connection attempt");a.He=(new Date).getTime();a.Lc=null;var b=q(a.Id,a),c=q(a.Wc,a),d=q(a.Df,a),e=a.id+":"+Fh++;a.Ia=new qh(e,a.F,b,c,d,function(b){Q(b+" ("+a.F.toString()+")");a.xf=!0})}}g.zb=function(){this.Fe=!0;this.Ia?this.Ia.close():(this.tb&&(clearTimeout(this.tb),this.tb=null),this.oa&&this.Df())};g.rc=function(){this.Fe=!1;this.Za=1E3;this.Ia||Eh(this,0)};
function Mh(a,b,c){c=c?Qa(c,function(a){return Vc(a)}).join("$"):"default";(a=Hh(a,b,c))&&a.G&&a.G("permission_denied")}function Hh(a,b,c){b=(new L(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===pa(a.$[b])&&delete a.$[b]):d=void 0;return d}function Nh(a){Ih(a);r(a.$,function(b){r(b,function(b){Gh(a,b)})});for(var b=0;b<a.qa.length;b++)a.qa[b]&&Lh(a,b);for(;a.Vc.length;)b=a.Vc.shift(),Jh(a,b.action,b.$c,b.data,b.G)}function Ph(a){var b;b=Of.vb().jc;return!a.xf&&!a.Fe&&b};var V={mg:function(){ah=jh=!0}};V.forceLongPolling=V.mg;V.ng=function(){bh=!0};V.forceWebSockets=V.ng;V.Ng=function(a,b){a.k.Sa.Xe=b};V.setSecurityDebugCallback=V.Ng;V.Ze=function(a,b){a.k.Ze(b)};V.stats=V.Ze;V.$e=function(a,b){a.k.$e(b)};V.statsIncrementCounter=V.$e;V.sd=function(a){return a.k.sd};V.dataUpdateCount=V.sd;V.qg=function(a,b){a.k.Ee=b};V.interceptServerData=V.qg;V.wg=function(a){new Ag(a)};V.onPopupOpen=V.wg;V.Lg=function(a){kg=a};V.setAuthenticationServer=V.Lg;function S(a,b,c){this.w=a;this.V=b;this.g=c}S.prototype.H=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.w.H()};S.prototype.val=S.prototype.H;S.prototype.mf=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.w.H(!0)};S.prototype.exportVal=S.prototype.mf;S.prototype.lg=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.w.e()};S.prototype.exists=S.prototype.lg;
S.prototype.u=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));ag("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.V.u(b);return new S(this.w.Y(b),c,N)};S.prototype.child=S.prototype.u;S.prototype.Da=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ag("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.w.Y(b).e()};S.prototype.hasChild=S.prototype.Da;
S.prototype.B=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.w.B().H()};S.prototype.getPriority=S.prototype.B;S.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.w.L())return!1;var b=this;return!!this.w.R(this.g,function(c,d){return a(new S(d,b.V.u(c),N))})};S.prototype.forEach=S.prototype.forEach;
S.prototype.wd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.w.L()?!1:!this.w.e()};S.prototype.hasChildren=S.prototype.wd;S.prototype.name=function(){Q("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");x("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};S.prototype.name=S.prototype.name;S.prototype.key=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.key()};
S.prototype.key=S.prototype.key;S.prototype.Eb=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.w.Eb()};S.prototype.numChildren=S.prototype.Eb;S.prototype.mc=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};S.prototype.ref=S.prototype.mc;function Qh(a,b){this.F=a;this.Va=Qb(a);this.fd=null;this.da=new vb;this.Hd=1;this.Sa=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.ba=new ye(this.F,q(this.Hb,this)),setTimeout(q(this.Uc,this,!0),0)):this.ba=this.Sa=new Ch(this.F,q(this.Hb,this),q(this.Uc,this),q(this.Pe,this));this.Qg=Rb(a,q(function(){return new Lb(this.Va,this.ba)},this));this.uc=new Ff;
this.De=new ob;var c=this;this.Cd=new kf({Ye:function(a,b,f,h){b=[];f=c.De.j(a.path);f.e()||(b=mf(c.Cd,new Wb(Re,a.path,f)),setTimeout(function(){h("ok")},0));return b},be:ba});Rh(this,"connected",!1);this.la=new pc;this.N=new Kg(a,q(this.ba.N,this.ba),q(this.ba.he,this.ba),q(this.Me,this));this.sd=0;this.Ee=null;this.M=new kf({Ye:function(a,b,f,h){c.ba.yf(a,f,b,function(b,e){var f=h(b,e);Ab(c.da,a.path,f)});return[]},be:function(a,b){c.ba.Pf(a,b)}})}g=Qh.prototype;
g.toString=function(){return(this.F.lb?"https://":"http://")+this.F.host};g.name=function(){return this.F.Db};function Sh(a){a=a.De.j(new L(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Th(a){a=a={timestamp:Sh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
g.Hb=function(a,b,c,d){this.sd++;var e=new L(a);b=this.Ee?this.Ee(a,b):b;a=[];d?c?(b=na(b,function(a){return M(a)}),a=uf(this.M,e,b,d)):(b=M(b),a=qf(this.M,e,b,d)):c?(d=na(b,function(a){return M(a)}),a=pf(this.M,e,d)):(d=M(b),a=mf(this.M,new Wb(Re,e,d)));d=e;0<a.length&&(d=Uh(this,e));Ab(this.da,d,a)};g.Uc=function(a){Rh(this,"connected",a);!1===a&&Vh(this)};g.Pe=function(a){var b=this;Xc(a,function(a,d){Rh(b,d,a)})};g.Me=function(a){Rh(this,"authenticated",a)};
function Rh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.De;d.Wd=d.Wd.K(b,c);c=mf(a.Cd,new Wb(Re,b,c));Ab(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Yg:c});var e=Th(this);b=M(b,c);var e=rc(b,e),f=this.Hd++,e=lf(this.M,a,e,f,!0);wb(this.da,e);var h=this;this.ba.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||Q("set at "+a+" failed: "+b);e=of(h.M,f,!e);Ab(h.da,a,e);Wh(d,b,c)});e=Xh(this,a);Uh(this,e);Ab(this.da,e,[])};
g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Th(this),f={};r(b,function(a,b){d=!1;var c=M(a);f[b]=rc(c,e)});if(d)Cb("update() called with empty data.  Don't do anything."),Wh(c,"ok");else{var h=this.Hd++,k=nf(this.M,a,f,h);wb(this.da,k);var l=this;this.ba.zf(a.toString(),b,function(b,d){var e="ok"===b;e||Q("update at "+a+" failed: "+b);var e=of(l.M,h,!e),f=a;0<e.length&&(f=Uh(l,a));Ab(l.da,f,e);Wh(c,b,d)});b=Xh(this,a);Uh(this,b);Ab(this.da,a,[])}};
function Vh(a){a.f("onDisconnectEvents");var b=Th(a),c=[];qc(oc(a.la,b),G,function(b,e){c=c.concat(mf(a.M,new Wb(Re,b,e)));var f=Xh(a,b);Uh(a,f)});a.la=new pc;Ab(a.da,G,c)}g.Jd=function(a,b){var c=this;this.ba.Jd(a.toString(),function(d,e){"ok"===d&&jg(c.la,a);Wh(b,d,e)})};function Yh(a,b,c,d){var e=M(c);a.ba.Ne(b.toString(),e.H(!0),function(c,h){"ok"===c&&a.la.nc(b,e);Wh(d,c,h)})}function Zh(a,b,c,d,e){var f=M(c,d);a.ba.Ne(b.toString(),f.H(!0),function(c,d){"ok"===c&&a.la.nc(b,f);Wh(e,c,d)})}
function $h(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(Cb("onDisconnect().update() called with empty data.  Don't do anything."),Wh(d,"ok")):a.ba.Cf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=M(c[l]);a.la.nc(b.u(l),m)}Wh(d,e,f)})}function ai(a,b,c){c=".info"===E(b.path)?a.Cd.Pb(b,c):a.M.Pb(b,c);yb(a.da,b.path,c)}g.zb=function(){this.Sa&&this.Sa.zb()};g.rc=function(){this.Sa&&this.Sa.rc()};
g.Ze=function(a){if("undefined"!==typeof console){a?(this.fd||(this.fd=new Kb(this.Va)),a=this.fd.get()):a=this.Va.get();var b=Ra(sa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.$e=function(a){Nb(this.Va,a);this.Qg.Nf[a]=!0};g.f=function(a){var b="";this.Sa&&(b=this.Sa.id+":");Cb(b,arguments)};
function Wh(a,b,c){a&&Db(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function bi(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.Fb("value",f);c={path:b,update:c,G:d,status:null,Ff:Fc(),df:e,Lf:0,je:function(){h.hc("value",f)},le:null,Ba:null,pd:null,qd:null,rd:null};d=a.M.za(b,void 0)||C;c.pd=d;d=c.update(d.H());if(n(d)){Wf("transaction failed: Data returned ",d,c.path);c.status=1;e=Gf(a.uc,b);var k=e.Ca()||[];k.push(c);Hf(e,k);"object"===typeof d&&null!==d&&v(d,".priority")?(k=w(d,".priority"),K(Uf(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.M.za(b)||C).B().H();e=Th(a);d=M(d,k);e=rc(d,e);c.qd=d;c.rd=e;c.Ba=a.Hd++;c=lf(a.M,b,e,c.Ba,c.df);Ab(a.da,b,c);ci(a)}else c.je(),c.qd=null,c.rd=null,c.G&&(a=new S(c.pd,new U(a,c.path),N),c.G(null,!1,a))}function ci(a,b){var c=b||a.uc;b||di(a,c);if(null!==c.Ca()){var d=ei(a,c);K(0<d.length,"Sending zero length transaction queue");Sa(d,function(a){return 1===a.status})&&fi(a,c.path(),d)}else c.wd()&&c.R(function(b){ci(a,b)})}
function fi(a,b,c){for(var d=Qa(c,function(a){return a.Ba}),e=a.M.za(b,d)||C,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];K(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.Lf++;var k=O(b,h.path),d=d.K(k,h.qd)}d=d.H(!0);a.ba.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(of(a.M,c[f].Ba));if(c[f].G){var h=c[f].rd,k=new U(a,c[f].path);d.push(q(c[f].G,
null,null,!0,new S(h,k,N)))}c[f].je()}di(a,Gf(a.uc,b));ci(a);Ab(a.da,b,e);for(f=0;f<d.length;f++)Db(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(Q("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].le=d;Uh(a,b)}},e)}function Uh(a,b){var c=gi(a,b),d=c.path(),c=ei(a,c);hi(a,c,d);return d}
function hi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Qa(b,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],l=O(c,k.path),m=!1,t;K(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,t=k.le,e=e.concat(of(a.M,k.Ba,!0));else if(1===k.status)if(25<=k.Lf)m=!0,t="maxretry",e=e.concat(of(a.M,k.Ba,!0));else{var y=a.M.za(k.path,f)||C;k.pd=y;var I=b[h].update(y.H());n(I)?(Wf("transaction failed: Data returned ",I,k.path),l=M(I),"object"===typeof I&&null!=
I&&v(I,".priority")||(l=l.ga(y.B())),y=k.Ba,I=Th(a),I=rc(l,I),k.qd=l,k.rd=I,k.Ba=a.Hd++,Va(f,y),e=e.concat(lf(a.M,k.path,I,k.Ba,k.df)),e=e.concat(of(a.M,y,!0))):(m=!0,t="nodata",e=e.concat(of(a.M,k.Ba,!0)))}Ab(a.da,c,e);e=[];m&&(b[h].status=3,setTimeout(b[h].je,Math.floor(0)),b[h].G&&("nodata"===t?(k=new U(a,b[h].path),d.push(q(b[h].G,null,null,!1,new S(b[h].pd,k,N)))):d.push(q(b[h].G,null,Error(t),!1,null))))}di(a,a.uc);for(h=0;h<d.length;h++)Db(d[h]);ci(a)}}
function gi(a,b){for(var c,d=a.uc;null!==(c=E(b))&&null===d.Ca();)d=Gf(d,c),b=H(b);return d}function ei(a,b){var c=[];ii(a,b,c);c.sort(function(a,b){return a.Ff-b.Ff});return c}function ii(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.R(function(b){ii(a,b,c)})}function di(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Hf(b,0<c.length?c:null)}b.R(function(b){di(a,b)})}
function Xh(a,b){var c=gi(a,b).path(),d=Gf(a.uc,b);Kf(d,function(b){ji(a,b)});ji(a,d);Jf(d,function(b){ji(a,b)});return c}
function ji(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(K(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].le="set"):(K(1===c[h].status,"Unexpected transaction status in abort"),c[h].je(),e=e.concat(of(a.M,c[h].Ba,!0)),c[h].G&&d.push(q(c[h].G,null,Error("set"),!1,null))));-1===f?Hf(b,null):c.length=f+1;Ab(a.da,b.path(),e);for(h=0;h<d.length;h++)Db(d[h])}};function W(){this.oc={};this.Qf=!1}W.prototype.zb=function(){for(var a in this.oc)this.oc[a].zb()};W.prototype.rc=function(){for(var a in this.oc)this.oc[a].rc()};W.prototype.we=function(){this.Qf=!0};ca(W);W.prototype.interrupt=W.prototype.zb;W.prototype.resume=W.prototype.rc;function X(a,b){this.bd=a;this.ra=b}X.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);this.bd.Jd(this.ra,a||null)};X.prototype.cancel=X.prototype.cancel;X.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);bg("Firebase.onDisconnect().remove",this.ra);A("Firebase.onDisconnect().remove",1,a,!0);Yh(this.bd,this.ra,null,a)};X.prototype.remove=X.prototype.remove;
X.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);bg("Firebase.onDisconnect().set",this.ra);Vf("Firebase.onDisconnect().set",a,this.ra,!1);A("Firebase.onDisconnect().set",2,b,!0);Yh(this.bd,this.ra,a,b)};X.prototype.set=X.prototype.set;
X.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);bg("Firebase.onDisconnect().setWithPriority",this.ra);Vf("Firebase.onDisconnect().setWithPriority",a,this.ra,!1);Yf("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);Zh(this.bd,this.ra,a,b,c)};X.prototype.setWithPriority=X.prototype.Kb;
X.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);bg("Firebase.onDisconnect().update",this.ra);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Xf("Firebase.onDisconnect().update",a,this.ra);A("Firebase.onDisconnect().update",2,b,!0);
$h(this.bd,this.ra,a,b)};X.prototype.update=X.prototype.update;function Y(a,b,c,d){this.k=a;this.path=b;this.o=c;this.kc=d}
function ki(a){var b=null,c=null;a.ma&&(b=nd(a));a.pa&&(c=pd(a));if(a.g===Od){if(a.ma){if("[MIN_NAME]"!=md(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.pa){if("[MAX_NAME]"!=od(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!Uf(b)||null!=c&&!Uf(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(K(a.g instanceof Sd||a.g===Yd,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function li(a){if(a.ma&&a.pa&&a.ja&&(!a.ja||""===a.Nb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function mi(a,b){if(!0===a.kc)throw Error(b+": You can't combine multiple orderBy calls.");}g=Y.prototype;g.mc=function(){x("Query.ref",0,0,arguments.length);return new U(this.k,this.path)};
g.Fb=function(a,b,c,d){x("Query.on",2,4,arguments.length);Zf("Query.on",a,!1);A("Query.on",2,b,!1);var e=ni("Query.on",c,d);if("value"===a)ai(this.k,this,new id(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;ai(this.k,this,new jd(f,e.cancel,e.Ma))}return b};
g.hc=function(a,b,c){x("Query.off",0,3,arguments.length);Zf("Query.off",a,!0);A("Query.off",2,b,!0);mb("Query.off",3,c);var d=null,e=null;"value"===a?d=new id(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new jd(e,null,c||null));e=this.k;d=".info"===E(this.path)?e.Cd.kb(this,d):e.M.kb(this,d);yb(e.da,this.path,d)};
g.Bg=function(a,b){function c(h){f&&(f=!1,e.hc(a,c),b.call(d.Ma,h))}x("Query.once",2,4,arguments.length);Zf("Query.once",a,!1);A("Query.once",2,b,!1);var d=ni("Query.once",arguments[2],arguments[3]),e=this,f=!0;this.Fb(a,c,function(b){e.hc(a,c);d.cancel&&d.cancel.call(d.Ma,b)})};
g.Ie=function(a){Q("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");x("Query.limit",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.o.ja)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.o.Ie(a);li(b);return new Y(this.k,this.path,b,this.kc)};
g.Je=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.o.ja)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.Je(a),this.kc)};
g.Ke=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.o.ja)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.Ke(a),this.kc)};
g.Cg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');$f("Query.orderByChild",1,a,!1);mi(this,"Query.orderByChild");var b=be(this.o,new Sd(a));ki(b);return new Y(this.k,
this.path,b,!0)};g.Dg=function(){x("Query.orderByKey",0,0,arguments.length);mi(this,"Query.orderByKey");var a=be(this.o,Od);ki(a);return new Y(this.k,this.path,a,!0)};g.Eg=function(){x("Query.orderByPriority",0,0,arguments.length);mi(this,"Query.orderByPriority");var a=be(this.o,N);ki(a);return new Y(this.k,this.path,a,!0)};g.Fg=function(){x("Query.orderByValue",0,0,arguments.length);mi(this,"Query.orderByValue");var a=be(this.o,Yd);ki(a);return new Y(this.k,this.path,a,!0)};
g.ae=function(a,b){x("Query.startAt",0,2,arguments.length);Vf("Query.startAt",a,this.path,!0);$f("Query.startAt",2,b,!0);var c=this.o.ae(a,b);li(c);ki(c);if(this.o.ma)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new Y(this.k,this.path,c,this.kc)};
g.td=function(a,b){x("Query.endAt",0,2,arguments.length);Vf("Query.endAt",a,this.path,!0);$f("Query.endAt",2,b,!0);var c=this.o.td(a,b);li(c);ki(c);if(this.o.pa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.kc)};
g.ig=function(a,b){x("Query.equalTo",1,2,arguments.length);Vf("Query.equalTo",a,this.path,!1);$f("Query.equalTo",2,b,!0);if(this.o.ma)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.o.pa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.ae(a,b).td(a,b)};
g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.n.length;c++)""!==a.n[c]&&(b+="/"+encodeURIComponent(String(a.n[c])));return this.k.toString()+(b||"/")};g.va=function(){var a=Vc(ce(this.o));return"{}"===a?"default":a};
function ni(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,mb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(z(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.ref=Y.prototype.mc;Y.prototype.on=Y.prototype.Fb;Y.prototype.off=Y.prototype.hc;Y.prototype.once=Y.prototype.Bg;Y.prototype.limit=Y.prototype.Ie;Y.prototype.limitToFirst=Y.prototype.Je;
Y.prototype.limitToLast=Y.prototype.Ke;Y.prototype.orderByChild=Y.prototype.Cg;Y.prototype.orderByKey=Y.prototype.Dg;Y.prototype.orderByPriority=Y.prototype.Eg;Y.prototype.orderByValue=Y.prototype.Fg;Y.prototype.startAt=Y.prototype.ae;Y.prototype.endAt=Y.prototype.td;Y.prototype.equalTo=Y.prototype.ig;Y.prototype.toString=Y.prototype.toString;var Z={};Z.vc=Ch;Z.DataConnection=Z.vc;Ch.prototype.Pg=function(a,b){this.Fa("q",{p:a},b)};Z.vc.prototype.simpleListen=Z.vc.prototype.Pg;Ch.prototype.hg=function(a,b){this.Fa("echo",{d:a},b)};Z.vc.prototype.echo=Z.vc.prototype.hg;Ch.prototype.interrupt=Ch.prototype.zb;Z.Tf=qh;Z.RealTimeConnection=Z.Tf;qh.prototype.sendRequest=qh.prototype.Fa;qh.prototype.close=qh.prototype.close;
Z.pg=function(a){var b=Ch.prototype.put;Ch.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Ch.prototype.put=b}};Z.hijackHash=Z.pg;Z.Sf=Dc;Z.ConnectionTarget=Z.Sf;Z.va=function(a){return a.va()};Z.queryIdentifier=Z.va;Z.rg=function(a){return a.k.Sa.$};Z.listens=Z.rg;Z.we=function(a){a.we()};Z.forceRestClient=Z.we;function U(a,b){var c,d,e;if(a instanceof Qh)c=a,d=b;else{x("new Firebase",1,2,arguments.length);d=Qc(arguments[0]);c=d.Rg;"firebase"===d.domain&&Pc(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||Pc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.lb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&Q("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
c=new Dc(d.host,d.lb,c,"ws"===d.scheme||"wss"===d.scheme);d=new L(d.$c);e=d.toString();var f;!(f=!p(c.host)||0===c.host.length||!Tf(c.Db))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(p(e)&&0!==e.length&&!Rf.test(e)));if(f)throw Error(z("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof W)e=b;else if(p(b))e=W.vb(),c.Od=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
else e=W.vb();f=c.toString();var h=w(e.oc,f);h||(h=new Qh(c,e.Qf),e.oc[f]=h);c=h}Y.call(this,c,d,$d,!1)}ma(U,Y);var oi=U,pi=["Firebase"],qi=aa;pi[0]in qi||!qi.execScript||qi.execScript("var "+pi[0]);for(var ri;pi.length&&(ri=pi.shift());)!pi.length&&n(oi)?qi[ri]=oi:qi=qi[ri]?qi[ri]:qi[ri]={};U.goOffline=function(){x("Firebase.goOffline",0,0,arguments.length);W.vb().zb()};U.goOnline=function(){x("Firebase.goOnline",0,0,arguments.length);W.vb().rc()};
function Mc(a,b){K(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Bb=q(console.log,console):"object"===typeof console.log&&(Bb=function(a){console.log(a)})),b&&P.set("logging_enabled",!0)):a?Bb=a:(Bb=null,P.remove("logging_enabled"))}U.enableLogging=Mc;U.ServerValue={TIMESTAMP:{".sv":"timestamp"}};U.SDK_VERSION=hb;U.INTERNAL=V;U.Context=W;U.TEST_ACCESS=Z;
U.prototype.name=function(){Q("Firebase.name() being deprecated. Please use Firebase.key() instead.");x("Firebase.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;U.prototype.key=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:uc(this.path)};U.prototype.key=U.prototype.key;
U.prototype.u=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof L))if(null===E(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ag("Firebase.child",b)}else ag("Firebase.child",a);return new U(this.k,this.path.u(a))};U.prototype.child=U.prototype.u;U.prototype.parent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.k,a)};U.prototype.parent=U.prototype.parent;
U.prototype.root=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};U.prototype.root=U.prototype.root;U.prototype.set=function(a,b){x("Firebase.set",1,2,arguments.length);bg("Firebase.set",this.path);Vf("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);this.k.Kb(this.path,a,null,b||null)};U.prototype.set=U.prototype.set;
U.prototype.update=function(a,b){x("Firebase.update",1,2,arguments.length);bg("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Xf("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);this.k.update(this.path,a,b||null)};U.prototype.update=U.prototype.update;
U.prototype.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);bg("Firebase.setWithPriority",this.path);Vf("Firebase.setWithPriority",a,this.path,!1);Yf("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";this.k.Kb(this.path,a,b,c||null)};U.prototype.setWithPriority=U.prototype.Kb;
U.prototype.remove=function(a){x("Firebase.remove",0,1,arguments.length);bg("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);this.set(null,a)};U.prototype.remove=U.prototype.remove;
U.prototype.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);bg("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(z("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);bi(this.k,this.path,a,b||null,c)};U.prototype.transaction=U.prototype.transaction;
U.prototype.Mg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);bg("Firebase.setPriority",this.path);Yf("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);this.k.Kb(this.path.u(".priority"),a,null,b)};U.prototype.setPriority=U.prototype.Mg;
U.prototype.push=function(a,b){x("Firebase.push",0,2,arguments.length);bg("Firebase.push",this.path);Vf("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=Sh(this.k),c=Nf(c),c=this.u(c);"undefined"!==typeof a&&null!==a&&c.set(a,b);return c};U.prototype.push=U.prototype.push;U.prototype.ib=function(){bg("Firebase.onDisconnect",this.path);return new X(this.k,this.path)};U.prototype.onDisconnect=U.prototype.ib;
U.prototype.N=function(a,b,c){Q("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");x("Firebase.auth",1,3,arguments.length);cg("Firebase.auth",a);A("Firebase.auth",2,b,!0);A("Firebase.auth",3,b,!0);Qg(this.k.N,a,{},{remember:"none"},b,c)};U.prototype.auth=U.prototype.N;U.prototype.he=function(a){x("Firebase.unauth",0,1,arguments.length);A("Firebase.unauth",1,a,!0);Rg(this.k.N,a)};U.prototype.unauth=U.prototype.he;
U.prototype.ye=function(){x("Firebase.getAuth",0,0,arguments.length);return this.k.N.ye()};U.prototype.getAuth=U.prototype.ye;U.prototype.vg=function(a,b){x("Firebase.onAuth",1,2,arguments.length);A("Firebase.onAuth",1,a,!1);mb("Firebase.onAuth",2,b);this.k.N.Fb("auth_status",a,b)};U.prototype.onAuth=U.prototype.vg;U.prototype.ug=function(a,b){x("Firebase.offAuth",1,2,arguments.length);A("Firebase.offAuth",1,a,!1);mb("Firebase.offAuth",2,b);this.k.N.hc("auth_status",a,b)};U.prototype.offAuth=U.prototype.ug;
U.prototype.Xf=function(a,b,c){x("Firebase.authWithCustomToken",2,3,arguments.length);cg("Firebase.authWithCustomToken",a);A("Firebase.authWithCustomToken",2,b,!1);fg("Firebase.authWithCustomToken",3,c,!0);Qg(this.k.N,a,{},c||{},b)};U.prototype.authWithCustomToken=U.prototype.Xf;U.prototype.Yf=function(a,b,c){x("Firebase.authWithOAuthPopup",2,3,arguments.length);eg("Firebase.authWithOAuthPopup",a);A("Firebase.authWithOAuthPopup",2,b,!1);fg("Firebase.authWithOAuthPopup",3,c,!0);Vg(this.k.N,a,c,b)};
U.prototype.authWithOAuthPopup=U.prototype.Yf;U.prototype.Zf=function(a,b,c){x("Firebase.authWithOAuthRedirect",2,3,arguments.length);eg("Firebase.authWithOAuthRedirect",a);A("Firebase.authWithOAuthRedirect",2,b,!1);fg("Firebase.authWithOAuthRedirect",3,c,!0);var d=this.k.N;Tg(d);var e=[Cg],f=ng(c);"anonymous"===a||"firebase"===a?R(b,Eg("TRANSPORT_UNAVAILABLE")):(P.set("redirect_client_options",f.od),Ug(d,e,"/auth/"+a,f,b))};U.prototype.authWithOAuthRedirect=U.prototype.Zf;
U.prototype.$f=function(a,b,c,d){x("Firebase.authWithOAuthToken",3,4,arguments.length);eg("Firebase.authWithOAuthToken",a);A("Firebase.authWithOAuthToken",3,c,!1);fg("Firebase.authWithOAuthToken",4,d,!0);p(b)?(dg("Firebase.authWithOAuthToken",2,b),Sg(this.k.N,a+"/token",{access_token:b},d,c)):(fg("Firebase.authWithOAuthToken",2,b,!1),Sg(this.k.N,a+"/token",b,d,c))};U.prototype.authWithOAuthToken=U.prototype.$f;
U.prototype.Wf=function(a,b){x("Firebase.authAnonymously",1,2,arguments.length);A("Firebase.authAnonymously",1,a,!1);fg("Firebase.authAnonymously",2,b,!0);Sg(this.k.N,"anonymous",{},b,a)};U.prototype.authAnonymously=U.prototype.Wf;
U.prototype.ag=function(a,b,c){x("Firebase.authWithPassword",2,3,arguments.length);fg("Firebase.authWithPassword",1,a,!1);gg("Firebase.authWithPassword",a,"email");gg("Firebase.authWithPassword",a,"password");A("Firebase.authWithPassword",2,b,!1);fg("Firebase.authWithPassword",3,c,!0);Sg(this.k.N,"password",a,c,b)};U.prototype.authWithPassword=U.prototype.ag;
U.prototype.te=function(a,b){x("Firebase.createUser",2,2,arguments.length);fg("Firebase.createUser",1,a,!1);gg("Firebase.createUser",a,"email");gg("Firebase.createUser",a,"password");A("Firebase.createUser",2,b,!1);this.k.N.te(a,b)};U.prototype.createUser=U.prototype.te;U.prototype.Ue=function(a,b){x("Firebase.removeUser",2,2,arguments.length);fg("Firebase.removeUser",1,a,!1);gg("Firebase.removeUser",a,"email");gg("Firebase.removeUser",a,"password");A("Firebase.removeUser",2,b,!1);this.k.N.Ue(a,b)};
U.prototype.removeUser=U.prototype.Ue;U.prototype.qe=function(a,b){x("Firebase.changePassword",2,2,arguments.length);fg("Firebase.changePassword",1,a,!1);gg("Firebase.changePassword",a,"email");gg("Firebase.changePassword",a,"oldPassword");gg("Firebase.changePassword",a,"newPassword");A("Firebase.changePassword",2,b,!1);this.k.N.qe(a,b)};U.prototype.changePassword=U.prototype.qe;
U.prototype.pe=function(a,b){x("Firebase.changeEmail",2,2,arguments.length);fg("Firebase.changeEmail",1,a,!1);gg("Firebase.changeEmail",a,"oldEmail");gg("Firebase.changeEmail",a,"newEmail");gg("Firebase.changeEmail",a,"password");A("Firebase.changeEmail",2,b,!1);this.k.N.pe(a,b)};U.prototype.changeEmail=U.prototype.pe;
U.prototype.We=function(a,b){x("Firebase.resetPassword",2,2,arguments.length);fg("Firebase.resetPassword",1,a,!1);gg("Firebase.resetPassword",a,"email");A("Firebase.resetPassword",2,b,!1);this.k.N.We(a,b)};U.prototype.resetPassword=U.prototype.We;})();


/*!Please JS v0.4.2, Jordan Checkman 2014, Checkman.io, MIT License, Have fun.*/
!function(e,r,a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():r[e]=a()}("Please",this,function(){"use strict";function e(){function e(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),Math.floor(o()*(r-e+1))+e}function r(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),o()*(r-e)+e}function a(e,r,a){return Math.max(r,Math.min(e,a))}function o(e,r){var a;switch(e){case"hex":for(a=0;a<r.length;a++)r[a]=F.HSV_to_HEX(r[a]);break;case"rgb":for(a=0;a<r.length;a++)r[a]=F.HSV_to_RGB(r[a]);break;case"rgb-string":for(a=0;a<r.length;a++){var o=F.HSV_to_RGB(r[a]);r[a]="rgb("+o.r+","+o.g+","+o.b+")"}break;case"hsv":break;default:console.error("Format not recognized.")}return r}function n(e){var r=F.HSV_to_RGB(e),a=(299*r.r+587*r.g+114*r.b)/1e3;return a>=128?"dark":"light"}function t(e){var r={};for(var a in e)e.hasOwnProperty(a)&&(r[a]=e[a]);return r}function l(e){function r(){o=(o+1)%256,n=(n+a[o])%256;var e=a[o];return a[o]=a[n],a[n]=e,a[(a[o]+a[n])%256]}for(var a=[],o=0,n=0,t=0;256>t;t++)a[t]=t;for(var l=0,F=0;256>l;l++){F=(F+a[l]+e.charCodeAt(l%e.length))%256;var s=a[l];a[l]=a[F],a[F]=s}this.random=function(){for(var e=0,a=0,o=1;8>e;e++)a+=r()*o,o*=256;return a/0x10000000000000000}}var F={},s={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgrey:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkslategrey:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dimgrey:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",grey:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgrey:"D3D3D3",lightgreen:"90EE90",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370D8",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"D87093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",rebeccapurple:"663399",red:"FF0000",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",slategrey:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFFFFF",whitesmoke:"F5F5F5",yellow:"FFFF00",yellowgreen:"9ACD32"},i=.618033988749895,u={hue:null,saturation:null,value:null,base_color:"",greyscale:!1,grayscale:!1,golden:!0,full_random:!1,colors_returned:1,format:"hex",seed:null},c={scheme_type:"analogous",format:"hex"},h={golden:!1,format:"hex"};return F.NAME_to_HEX=function(e){return e=e.toLowerCase(),e in s?s[e]:(console.error("Color name not recognized."),void 0)},F.NAME_to_RGB=function(e){return F.HEX_to_RGB(F.NAME_to_HEX(e))},F.NAME_to_HSV=function(e){return F.HEX_to_HSV(F.NAME_to_HEX(e))},F.HEX_to_RGB=function(e){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(r,function(e,r,a,o){return r+r+a+a+o+o});var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null},F.RGB_to_HEX=function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)},F.HSV_to_RGB=function(e){var r,a,o,n,t,l,F,s,i=e.h,u=e.s,c=e.v;if(0===u)return{r:c,g:c,b:c};switch(i/=60,n=Math.floor(i),t=i-n,l=c*(1-u),F=c*(1-u*t),s=c*(1-u*(1-t)),n){case 0:r=c,a=s,o=l;break;case 1:r=F,a=c,o=l;break;case 2:r=l,a=c,o=s;break;case 3:r=l,a=F,o=c;break;case 4:r=s,a=l,o=c;break;case 5:r=c,a=l,o=F}return{r:Math.floor(255*r),g:Math.floor(255*a),b:Math.floor(255*o)}},F.RGB_to_HSV=function(e){var r=e.r/255,a=e.g/255,o=e.b/255,n=0,t=0,l=0,F=Math.min(r,Math.min(a,o)),s=Math.max(r,Math.max(a,o));if(F===s)return l=F,{h:0,s:0,v:l};var i=r===F?a-o:o===F?r-a:o-r,u=r===F?3:o===F?1:5;return n=60*(u-i/(s-F)),t=(s-F)/s,l=s,{h:n,s:t,v:l}},F.HSV_to_HEX=function(e){return F.RGB_to_HEX(F.HSV_to_RGB(e))},F.HEX_to_HSV=function(e){return F.RGB_to_HSV(F.HEX_to_RGB(e))},F.make_scheme=function(e,r){function n(e){return{h:e.h,s:e.s,v:e.v}}var l,F,s,i,u,h=t(c);if(null!==r)for(var d in r)r.hasOwnProperty(d)&&(h[d]=r[d]);var g=[e];switch(h.scheme_type.toLowerCase()){case"monochromatic":case"mono":for(u=1;2>=u;u++)l=n(e),s=l.s+.1*u,s=a(s,0,1),i=l.v+.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);for(u=1;2>=u;u++)l=n(e),s=l.s-.1*u,s=a(s,0,1),i=l.v-.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);break;case"complementary":case"complement":case"comp":l=n(e),l.h=(l.h+180)%360,g.push(l);break;case"split-complementary":case"split-complement":case"split":l=n(e),l.h=(l.h+165)%360,g.push(l),l=n(e),l.h=Math.abs((l.h-165)%360),g.push(l);break;case"double-complementary":case"double-complement":case"double":l=n(e),l.h=(l.h+180)%360,g.push(l),l.h=(l.h+30)%360,F=n(l),g.push(l),l.h=(l.h+180)%360,g.push(F);break;case"analogous":case"ana":for(u=1;5>=u;u++)l=n(e),l.h=(l.h+20*u)%360,g.push(l);break;case"triadic":case"triad":case"tri":for(u=1;3>u;u++)l=n(e),l.h=(l.h+120*u)%360,g.push(l);break;default:console.error("Color scheme not recognized.")}return o(h.format.toLowerCase(),g),g},F.make_color=function(n){var s=[],c=t(u),h=null;if(null!==n)for(var d in n)n.hasOwnProperty(d)&&(c[d]=n[d]);var g=null;"string"==typeof c.seed&&(g=new l(c.seed)),c.base_color.length>0&&(h=c.base_color.match(/^#?([0-9a-f]{3})([0-9a-f]{3})?$/i)?F.HEX_to_HSV(c.base_color):F.NAME_to_HSV(c.base_color));for(var m=0;m<c.colors_returned;m++){var f,E,b,p=e(0,360,g);null!==h?(f=a(e(h.h-5,h.h+5,g),0,360),E=0===h.s?0:r(.4,.85,g),b=r(.4,.85,g),s.push({h:f,s:E,v:b})):(f=c.greyscale===!0||c.grayscale===!0?0:c.golden===!0?(p+p/i)%360:null===c.hue||c.full_random===!0?p:a(c.hue,0,360),E=c.greyscale===!0||c.grayscale===!0?0:c.full_random===!0?r(0,1,g):null===c.saturation?.4:a(c.saturation,0,1),b=c.full_random===!0?r(0,1,g):c.greyscale===!0||c.grayscale===!0?r(.15,.75,g):null===c.value?.75:a(c.value,0,1),s.push({h:f,s:E,v:b}))}return o(c.format.toLowerCase(),s),s},F.make_contrast=function(e,r){var l=t(h);if(null!==r)for(var s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);var u,c,d=n(e);if(l.golden===!0)c=e.h*(1+i)%360;else{var g=F.make_scheme(e,{scheme_type:"complementary",format:"hsv"})[1];c=a(g.h-30,0,360)}var m;return"dark"===d?m=a(e.v-.25,0,1):"light"===d&&(m=a(e.v+.25,0,1)),u=[{h:c,s:e.s,v:m}],o(l.format.toLowerCase(),u),u[0]},F}return e()});
var Url=function(){"use strict";var t={protocol:"protocol",host:"hostname",port:"port",path:"pathname",query:"search",hash:"hash"},r={ftp:21,gopher:70,http:80,https:443,ws:80,wss:443},o=function(o,e){var a=document,i=a.createElement("a"),e=e||a.location.href,n=e.match(/\/\/(.*?)(?::(.*?))?@/)||[];i.href=e;for(var h in t)o[h]=i[t[h]]||"";if(o.protocol=o.protocol.replace(/:$/,""),o.query=o.query.replace(/^\?/,""),o.hash=o.hash.replace(/^#/,""),o.user=n[1]||"",o.pass=n[2]||"",o.port=r[o.protocol]==o.port||0==o.port?"":o.port,o.protocol||/^([a-z]+:)?\/\//.test(e))o.path=o.path.replace(/^\/?/,"/");else{var p=new Url(a.location.href.match(/(.*\/)/)[0]),c=p.path.split("/"),f=o.path.split("/");c.pop();for(var h=0,u=["protocol","user","pass","host","port"],l=u.length;h<l;h++)o[u[h]]=p[u[h]];for(;".."==f[0];)c.pop(),f.shift();o.path=("/"!=e.substring(0,1)?c.join("/"):"")+"/"+f.join("/")}s(o)},e=function(t){return t=t.replace(/\+/g," "),t=t.replace(/%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi,function(t,r,o,e){var s=parseInt(r,16)-224,a=parseInt(o,16)-128;if(0==s&&a<32)return t;var i=parseInt(e,16)-128,n=(s<<12)+(a<<6)+i;return n>65535?t:String.fromCharCode(n)}),t=t.replace(/%([cd][0-9a-f])%([89ab][0-9a-f])/gi,function(t,r,o){var e=parseInt(r,16)-192;if(e<2)return t;var s=parseInt(o,16)-128;return String.fromCharCode((e<<6)+s)}),t=t.replace(/%([0-7][0-9a-f])/gi,function(t,r){return String.fromCharCode(parseInt(r,16))})},s=function(t){var r=t.query;t.query=new function(t){for(var r,o=/([^=&]+)(=([^&]*))?/g;r=o.exec(t);){var s=decodeURIComponent(r[1].replace(/\+/g," ")),a=r[3]?e(r[3]):"";null!=this[s]?(this[s]instanceof Array||(this[s]=[this[s]]),this[s].push(a)):this[s]=a}this.clear=function(){for(s in this)this[s]instanceof Function||delete this[s]},this.toString=function(){var t="",r=encodeURIComponent;for(var o in this)if(!(this[o]instanceof Function))if(this[o]instanceof Array){var e=this[o].length;if(e)for(var s=0;s<e;s++)t+=t?"&":"",t+=r(o)+"="+r(this[o][s]);else t+=(t?"&":"")+r(o)+"="}else t+=t?"&":"",t+=r(o)+"="+r(this[o]);return t}}(r)};return function(t){this.toString=function(){return(this.protocol&&this.protocol+"://")+(this.user&&this.user+(this.pass&&":"+this.pass)+"@")+(this.host&&this.host)+(this.port&&":"+this.port)+(this.path&&this.path)+(this.query.toString()&&"?"+this.query)+(this.hash&&"#"+this.hash)},o(this,t)}}();
(function (Url,Firebase$1,Please) {
'use strict';

Url = Url && Url.hasOwnProperty('default') ? Url['default'] : Url;
Firebase$1 = Firebase$1 && Firebase$1.hasOwnProperty('default') ? Firebase$1['default'] : Firebase$1;
Please = Please && Please.hasOwnProperty('default') ? Please['default'] : Please;

'use strict';

/**
* Stubs out the A-Frame "system" concept.
* @see {@link https://aframe.io/docs/0.7.0/core/systems.html}
* @memberof module:altspace/components
*/
var AFrameSystem = function AFrameSystem () {};

var prototypeAccessors = { schema: {} };

prototypeAccessors.schema.get = function (){
	return null;
};

AFrameSystem.prototype.init = function init (){ };
AFrameSystem.prototype.tick = function tick (time, timeDelta){ };
AFrameSystem.prototype.pause = function pause (){ };
AFrameSystem.prototype.play = function play (){ };

Object.defineProperties( AFrameSystem.prototype, prototypeAccessors );

/**
* Stubs out the A-Frame "component" concept.
* @see {@link https://aframe.io/docs/0.7.0/core/component.html}
* @extends module:altspace/components.AFrameSystem
* @memberof module:altspace/components
*/
var AFrameComponent = (function (AFrameSystem) {
	function AFrameComponent () {
		AFrameSystem.apply(this, arguments);
	}

	if ( AFrameSystem ) AFrameComponent.__proto__ = AFrameSystem;
	AFrameComponent.prototype = Object.create( AFrameSystem && AFrameSystem.prototype );
	AFrameComponent.prototype.constructor = AFrameComponent;

	AFrameComponent.prototype.update = function update (oldData){ };
	AFrameComponent.prototype.remove = function remove (){ };
	AFrameComponent.prototype.updateSchema = function updateSchema (data){ };

	return AFrameComponent;
}(AFrameSystem));

function flatten(obj)
{
	var ret = {};
	if(!obj.__proto__){
		ret = Object.assign( {schema: {}, dependencies: []}, obj );
	}
	else {
		ret = Object.assign( flatten(obj.__proto__), obj );
	}

	if(obj.schema)
		{ Object.assign(ret.schema, obj.schema); }

	if(obj.dependencies)
		{ (ref = ret.dependencies).push.apply(ref, obj.dependencies); }

	return ret;
	var ref;
}

function registerComponentClass(name, cls)
{
	AFRAME.registerComponent(name, flatten(new cls()));
}

function registerSystemClass(name, cls)
{
	AFRAME.registerSystem(name, flatten(new cls()));
}

'use strict';

function safeDeepSet(obj, keys, value)
{
	if(keys.length === 0)
		{ return value; }
	else {
		obj[keys[0]] = safeDeepSet(obj[keys[0]] || {}, keys.slice(1), value);
		return obj;
	}
}

'use strict';

/**
* @name module:altspace/components.altspace-cursor-collider
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Enable or disable cursor collision on the object. @aframe
* @example <a-box altspace-cursor-collider='enabled: false'></a-box>
*/
var AltspaceCursorCollider = (function (AFrameComponent$$1) {
	function AltspaceCursorCollider () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) AltspaceCursorCollider.__proto__ = AFrameComponent$$1;
	AltspaceCursorCollider.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	AltspaceCursorCollider.prototype.constructor = AltspaceCursorCollider;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			/**
			* The state of the cursor collider. If `true`, the object can be clicked,
			* and things behind this object cannot be clicked.
			* @instance
			* @member {boolean} enabled
			* @default true
			* @memberof module:altspace/components.altspace-cursor-collider
			*/
			enabled: {type: 'boolean', default: true}
		};
	};

	AltspaceCursorCollider.prototype.init = function init ()
	{
		var this$1 = this;

		this.setColliderFlag(this.data.enabled);
		this.el.addEventListener('model-loaded', (function () {
			this$1.setColliderFlag(this$1.data.enabled);
		}).bind(this));
	};

	AltspaceCursorCollider.prototype.update = function update ()
	{
		this.setColliderFlag(this.data.enabled);
	};

	AltspaceCursorCollider.prototype.setColliderFlag = function setColliderFlag (state)
	{
		var obj = this.el.object3D;
		if(obj){
			safeDeepSet(obj.userData, ['altspace','collider','enabled'], state);
			obj.traverse(function (subobj) {
				if( subobj instanceof THREE.Mesh ){
					safeDeepSet(subobj.userData, ['altspace','collider','enabled'], state);
				}
			});
		}
	};

	Object.defineProperties( AltspaceCursorCollider.prototype, prototypeAccessors );

	return AltspaceCursorCollider;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.altspace-tracked-controls
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Enables tracked control support for A-Frame applications that use the built-in
* `tracked-controls`, `vive-controls` or `hand-controls` components. @aframe
*/
var AltspaceTrackedControls = (function (AFrameComponent$$1) {
	function AltspaceTrackedControls () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) AltspaceTrackedControls.__proto__ = AFrameComponent$$1;
	AltspaceTrackedControls.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	AltspaceTrackedControls.prototype.constructor = AltspaceTrackedControls;

	AltspaceTrackedControls.prototype.init = function init ()
	{
		this.gamepadIndex = null;
		this.trackedControlsSystem = document.querySelector('a-scene').systems['tracked-controls'];
		this.systemGamepads = 0;
		altspace.getGamepads();
	};

	AltspaceTrackedControls.prototype.tick = function tick ()
	{
		if (
			this.trackedControlsSystem &&
			this.systemGamepads !== this.trackedControlsSystem.controllers.length &&
			window.altspace && altspace.getGamepads && altspace.getGamepads().length
		) {
			var components = this.el.components;
			if (components['paint-controls']) {
				this.gamepadIndex = components['paint-controls'].data.hand === 'left' ? 2 : 1;
			}

			if (this.gamepadIndex === null && components['hand-controls']) {
				this.gamepadIndex = components['hand-controls'].data === 'left' ? 2 : 1;
			}

			if (this.gamepadIndex === null && components['vive-controls']) {
				this.gamepadIndex = components['vive-controls'].data.hand === 'left' ? 2 : 1;
			}

			if (this.gamepadIndex === null && components['tracked-controls']) {
				this.gamepadIndex = components['tracked-controls'].data.controller;
			}

			this.el.setAttribute('tracked-controls', 'id', altspace.getGamepads()[this.gamepadIndex].id);
			this.el.setAttribute('tracked-controls', 'controller', 0);
			this.systemGamepads = this.trackedControlsSystem.controllers.length;
		}
	};

	return AltspaceTrackedControls;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.altspace
* @class
* @extends module:altspace/components.AFrameComponent

* @classdesc The altspace component makes A-Frame apps compatible with AltspaceVR.
*
* **Note**: This component can have side-effects on some default components. To be
* safe, this component should be specified last. @aframe
*
* @example
* <head>
*   <title>My A-Frame Scene</title>
*   <script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>
*   <script src="https://cdn.rawgit.com/AltspaceVR/AltspaceSDK/v2.8.0/dist/altspace.min.js"></script>
* </head>
* <body>
*   <a-scene altspace>
*     <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
*   </a-scene>
* </body>
*/
var AltspaceComponent = (function (AFrameComponent$$1) {
	function AltspaceComponent () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) AltspaceComponent.__proto__ = AFrameComponent$$1;
	AltspaceComponent.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	AltspaceComponent.prototype.constructor = AltspaceComponent;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {

			/**
			* Allows you to use A-Frame units as CSS pixels.
			* This is the default behavior for three.js apps, but not for A-Frame apps.
			* @instance
			* @member {boolean} usePixelScale
			* @default false
			* @memberof module:altspace/components.altspace
			*/
			usePixelScale: { type: 'boolean', default: false},

			/**
			* Puts the origin at the `bottom`, `middle` (default), or `top` of the Altspace enclosure.
			* @instance
			* @member {string} verticalAlign
			* @default "middle"
			* @memberof module:altspace/components.altspace
			*/
			verticalAlign: { type: 'string',  default: 'middle'},

			/**
			* Prevents the scene from being created if enclosure is flat.
			* @instance
			* @member {boolean} enclosuresOnly
			* @default true
			* @memberof module:altspace/components.altspace
			*/
			enclosuresOnly: { type: 'boolean', default: true},

			/**
			* Puts the app into fullspace mode.
			* @instance
			* @member {boolean} fullspace
			* @default false
			* @memberof module:altspace/components.altspace
			*/
			fullspace: { type: 'boolean', default: false}
		}
	};

	AltspaceComponent.prototype.init = function init ()
	{
		this.version = 'AFRAME_ALTSPACE_VERSION';
		if(!(this.el.object3D instanceof THREE.Scene)){
			console.warn('aframe-altspace-component can only be attached to a-scene');
			return;
		}

		if (window.altspace && window.altspace.inClient) {
			this.el.setAttribute('vr-mode-ui', {enabled: false});
			this.initRenderer();
			this.initCursorEvents();
			this.initCollisionEvents();
		}
		else {
			console.warn('aframe-altspace-component only works inside of AltspaceVR');
		}
	};

	AltspaceComponent.prototype.tick = function tick (t, dt)
	{
		if(this.el.object3D.updateAllBehaviors)
			{ this.el.object3D.updateAllBehaviors(); }
	};

	/*
	* Swap in Altspace renderer when running in AltspaceVR.
	*/
	AltspaceComponent.prototype.initRenderer = function initRenderer ()
	{
		var this$1 = this;

		var scene = this.el.object3D;
		var sceneEl = this.el.sceneEl;
		var naturalScale = sceneEl.getAttribute('scale') || {x: 1, y: 1, z: 1};
		altspace.getEnclosure().then((function (enclosure) {

			if(this$1.data.fullspace){
				if (enclosure.fullspace) {
					safeDeepSet(scene.userData, ['altspace', 'initialized'], true);
				}
				enclosure.requestFullspace();
				enclosure.addEventListener('fullspacechange', function () {
					scene.scale.copy(naturalScale).multiplyScalar(enclosure.pixelsPerMeter);
					// Make sure we flag the scene as initialized if we weren't already in fullspace mode previously.
					safeDeepSet(scene.userData, ['altspace', 'initialized'], true);
				});
			}

			if (!this$1.data.usePixelScale || this$1.data.fullspace){
				scene.scale.copy(naturalScale).multiplyScalar(enclosure.pixelsPerMeter);
			}

			switch (this$1.data.verticalAlign) {
			case 'bottom':
				scene.position.y -= enclosure.innerHeight / 2;
				break;
			case 'top':
				scene.position.y += enclosure.innerHeight / 2;
				break;
			case 'middle':
				break;
			default:
				console.warn('Unexpected value for verticalAlign: ', this$1.data.verticalAlign);
			}

			if(this$1.data.enclosuresOnly && enclosure.innerDepth === 1){
				this$1.el.renderer.render(new THREE.Scene());
				this$1.el.renderer = this$1.el.effect = oldRenderer;
			}

			if (!this$1.data.fullspace) {
				safeDeepSet(scene.userData, ['altspace', 'initialized'], true);
			}
		}).bind(this));

		var oldRenderer = this.el.renderer;
		var renderer = this.el.renderer = this.el.effect = altspace.getThreeJSRenderer({
			aframeComponentVersion: this.version
		});

		var noop = function() {};
		renderer.setSize = noop;
		renderer.setPixelRatio = noop;
		renderer.setClearColor = noop;
		renderer.clear = noop;
		renderer.enableScissorTest = noop;
		renderer.setScissor = noop;
		renderer.setViewport = noop;
		renderer.getPixelRatio = noop;
		renderer.getMaxAnisotropy = noop;
		renderer.setFaceCulling = noop;
		renderer.submitFrame = noop;
		renderer.context = {canvas: {}};
		renderer.shadowMap = {};
		renderer.requestAnimationFrame = window.requestAnimationFrame.bind(window);
	};

	/*
	* Emulate A-Frame cursor events when running in AltspaceVR.
	*/
	AltspaceComponent.prototype.initCursorEvents = function initCursorEvents ()
	{

		var scene = this.el.object3D;
		var cursorEl = document.querySelector('a-cursor') || document.querySelector('a-entity[cursor]');
		if (cursorEl) {
			// Hide A-Frame cursor mesh.
			cursorEl.setAttribute('material', 'transparent', true);
			cursorEl.setAttribute('material', 'opacity', 0.0);
		}

		function emit(eventName, event)
		{
			// Fire events on intersected object and A-Frame cursor.
			var targetEl = event.target.el;
			if (cursorEl){
				cursorEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
			}

			if (targetEl){
				targetEl.emit(eventName, { target: targetEl, ray: event.ray, point: event.point });
			}
		}

		var cursordownObj = null;
		scene.addEventListener('cursordown', function (event) {
			cursordownObj = event.target;
			emit('mousedown', event);
		});

		scene.addEventListener('cursorup', function (event) {
			emit('mouseup', event);
			if (event.target.uuid === cursordownObj.uuid) {
				emit('click', event);
			}
			cursordownObj = null;
		});

		scene.addEventListener('cursorenter', function (event) {
			if (!event.target.el){
				return;
			}
			event.target.el.addState('hovered');
			if (cursorEl){
				cursorEl.addState('hovering');
			}
			emit('mouseenter', event);
		});

		scene.addEventListener('cursorleave', function (event) {
			if (!event.target.el){
				return;
			}
			event.target.el.removeState('hovered');
			if (cursorEl){
				cursorEl.removeState('hovering');
			}
			emit('mouseleave', event);
		});
	};

	AltspaceComponent.prototype.initCollisionEvents = function initCollisionEvents ()
	{
		var scene = this.el.object3D;

		function emit(eventName, event)
		{
			var targetEl = event.target.el;
			if (!targetEl)
				{ return; }

			//remap target and other from object3Ds to aframe element
			event.target = targetEl;
			if (event.other && event.other.el) {
				event.other = event.other.el;
			}
			targetEl.emit(eventName, event);
		}

		scene.addEventListener('collisionenter', function (event) {
			emit('collisionenter', event);
		});

		scene.addEventListener('collisionexit', function (event) {
			emit('collisionexit', event);
		});

		scene.addEventListener('triggerenter', function (event) {
			emit('triggerenter', event);
		});

		scene.addEventListener('triggerexit', function (event) {
			emit('triggerexit', event);
		});

	};

	Object.defineProperties( AltspaceComponent.prototype, prototypeAccessors );

	return AltspaceComponent;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.sync-color
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Sync the color property of the object between clients.
* Requires both a [sync-system]{@link module:altspace/components.sync-system} component on the `a-scene`, and a
* [sync]{@link module:altspace/components.sync} component on the target entity. @aframe
* @example <a-box random-color sync='own-on: click' sync-color></a-box>
*/

var SyncColor = (function (AFrameComponent$$1) {
	function SyncColor () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) SyncColor.__proto__ = AFrameComponent$$1;
	SyncColor.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncColor.prototype.constructor = SyncColor;

	var prototypeAccessors = { dependencies: {} };

	prototypeAccessors.dependencies.get = function (){
		return ['sync'];
	};

	SyncColor.prototype.init = function init ()
	{
		this.sync = this.el.components.sync;
		this.lastValue = null;

		// wait for firebase connection to start sync routine
		if(this.sync.isConnected)
			{ start(); }
		else
			{ this.el.addEventListener('connected', this.start.bind(this)); }
	};

	SyncColor.prototype.start = function start ()
	{
		var this$1 = this;

		var colorRef = this.sync.dataRef.child('material/color');
		var refChangedLocked = false;
		var firstValue = true;
		var self = this;

		this.el.addEventListener('componentchanged', function (event) {
			var name = event.detail.name;

			if (name === 'material'){
				var newData = self.el.getAttribute('material').color;
				if(!refChangedLocked && this$1.lastValue !== newData && self.sync.isMine)
				{
					self.lastValue = newData;
					//For some reason A-Frame has a misconfigured material reference if we do this too early
					setTimeout(function () { return colorRef.set(newData); }, 0);
				}
			}
		});

		colorRef.on('value', function (snapshot) {
			if(!self.sync.isMine || firstValue)
			{
				var color = snapshot.val();

				refChangedLocked = true;
				self.el.setAttribute('material', 'color', color);
				refChangedLocked = false;

				firstValue = false;
			}
		});
	};

	Object.defineProperties( SyncColor.prototype, prototypeAccessors );

	return SyncColor;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.sync
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Enables the synchronization of properties of the entity. Must be used in
* conjuction with the [sync-system]{@link module:altspace/components.sync-system} component and a component for a
* specific property (e.g. [sync-transform]{@link module:altspace/components.sync-transform}). @aframe
* @example <a-box random-color sync='own-on: click' sync-color></a-box>
*/
var SyncComponent = (function (AFrameComponent$$1) {
	function SyncComponent () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) SyncComponent.__proto__ = AFrameComponent$$1;
	SyncComponent.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncComponent.prototype.constructor = SyncComponent;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			mode: { default: 'link' },

			/**
			* The name of the event, or a list of events, that
			* will cause the local client to take ownership of this object. This field
			* cannot be updated after initialization.
			* @instance
			* @member {string} ownOn
			* @memberof module:altspace/components.sync
			*/
			ownOn: { type: 'string' } //cannot be changed after creation
		};
	};

	SyncComponent.prototype.init = function init ()
	{
		var this$1 = this;

		/**
		* Indicates whether the sync ownership is yours.
		* @instance
		* @member {boolean} isMine
		* @memberof module:altspace/components.sync
		* @readonly
		*/
		this.isMine = false;

		this.scene = this.el.sceneEl;
		this.syncSys = this.scene.systems['sync-system'];
		this.isConnected = false;

		if(this.syncSys.isConnected)
			{ this.start(); }
		else
			{ this.scene.addEventListener('connected', this.start.bind(this)); }

		if(this.data.ownOn)
		{
			var ownershipEvents = this.data.ownOn.split(/[ ,]+/);
			ownershipEvents.forEach((function (e) {
				this$1.el.addEventListener(e, (function () {
					if(this$1.isConnected){
						this$1.takeOwnership();
					}
				}).bind(this$1));
			}).bind(this));
		}
	};

	/**
	* Tell sync to start pushing local property values instead of updating
	* local from remote values.
	* @instance
	* @method takeOwnership
	* @memberof module:altspace/components.sync
	*/
	SyncComponent.prototype.takeOwnership = function takeOwnership ()
	{
		this.ownerRef.set(this.syncSys.clientId);

		//clear our ownership if we disconnect
		//this is needed if we are the last user in the room, but we expect people to join later
		this.ownerRef.onDisconnect().set(null);
	};

	SyncComponent.prototype.start = function start ()
	{
		var this$1 = this;

		//Make sure someone always owns an object. If the owner leaves and we are the master client, we will take it.
		//This ensures, for example, that synced animations keep playing
		this.scene.addEventListener('clientleft', (function (event) {
			var shouldTakeOwnership = (!this$1.ownerId || this$1.ownerId === event.detail.id) && this$1.syncSys.isMasterClient;
			if(shouldTakeOwnership)
				{ this$1.takeOwnership(); }
		}).bind(this));

		if (this.data.mode === 'link') {
			var id = this.el.id;
			if (!id) {
				console.error('Entities cannot be synced using link mode without an id.');
				return;
			}

			this.link(this.syncSys.sceneRef.child(id));
			this.setupReceive();

		} else {
			console.error('Unsupported sync mode: ' + this.data.mode);
			return;
		}

		/**
		 * @event connected
		 * @memberof module:altspace/components.sync
		 * Fired when the connection with the sync server is established.
		 */
		this.isConnected = true;
		this.el.emit('connected', null, false);
	};

	SyncComponent.prototype.link = function link (entityRef)
	{
		this.ref = entityRef;
		this.key = this.ref.key();
		this.dataRef = this.ref.child('data');
		this.ownerRef = this.ref.child('owner');
	};

	SyncComponent.prototype.setupReceive = function setupReceive ()
	{
		var this$1 = this;

		function onOwnerUpdate(snapshot)
		{
			var newOwnerId = snapshot.val();
			var gained = newOwnerId === this.syncSys.clientId && !this.isMine;
			if (gained) {
				this.el.emit('ownershipgained', null, false);
			}

			//note this also fires when we start up without ownership
			var lost = newOwnerId !== this.syncSys.clientId;
			if (lost) {
				this.el.emit('ownershiplost', null, false);

				//we no longer have to clear our ownership when we disconnect
				this.ownerRef.onDisconnect().cancel();
			}

			this.ownerId = newOwnerId;

			this.isMine = newOwnerId === this.syncSys.clientId;
		}

		this.ownerRef.transaction(
			(function (owner) {
				if (owner) { return undefined; }
				// try to take ownership
				return this$1.syncSys.clientId;
			}).bind(this),

			(function (error, committed) {
				if(committed) {
					// Commit succeeded. We are the owner, so set to null if we disconnect.
					this$1.ownerRef.onDisconnect().set(null);
				}
				this$1.ownerRef.on('value', onOwnerUpdate.bind(this$1));
			}).bind(this)
		);
	};

	Object.defineProperties( SyncComponent.prototype, prototypeAccessors );

	return SyncComponent;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.sync-system
* @class
* @extends module:altspace/components.AFrameSystem
* @classdesc Connect to a remote Firebase server, and facilitate synchronization. These
* options correspond exactly with the configuration options for
* [altspace.utilities.sync.connect]{@link ../js/module-altspace_utilities_sync.html#.connect}.
* This component must be present on `a-scene` for any other sync components to work. @aframe
* @example <a-scene sync-system='app: Testing; author: Altspace' altspace></a-scene>
*/
var SyncSystem = (function (AFrameSystem$$1) {
	function SyncSystem () {
		AFrameSystem$$1.apply(this, arguments);
	}

	if ( AFrameSystem$$1 ) SyncSystem.__proto__ = AFrameSystem$$1;
	SyncSystem.prototype = Object.create( AFrameSystem$$1 && AFrameSystem$$1.prototype );
	SyncSystem.prototype.constructor = SyncSystem;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			/**
			* A unique identifier for you or your organization.
			* @instance
			* @member {string} author
			* @memberof module:altspace/components.sync-system
			*/
			author: { type: 'string' },

			/**
			* The name of the app.
			* @instance
			* @member {string} app
			* @memberof module:altspace/components.sync-system
			*/
			app: { type: 'string' },

			/**
			* Override the instance ID. Can also be overridden with a URL parameter.
			* @instance
			* @member {string} instance
			* @memberof module:altspace/components.sync-system
			*/
			instance: { type: 'string' },

			/**
			* Override the base reference. Set this to use your own Firebase.
			* @instance
			* @member {string} refUrl
			* @memberof module:altspace/components.sync-system
			*/
			refUrl: { type: 'string' }
		};
	};

	/**
	* True if the sync system is connected and ready for syncing.
	* @member {boolean} isConnected
	* @memberof module:altspace/components.sync-system
	* @readonly
	*/

	/**
	* Fired when a connection is established and the sync system is fully initialized.
	* @event module:altspace/components.sync-system#connected
	* @property {boolean} shouldInitialize - True if this is the first client to establish a connection.
	*/

	/**
	* Fired when a client joins.
	* @event module:altspace/components.sync-system#clientjoined
	* @property {string} id - Guid identifying the client.
	*/

	/**
	* Fired when a client leaves.
	* @event module:altspace/components.sync-system#clientleft
	* @property {string} id - Guid identifying the client.
	*/

	SyncSystem.prototype.init = function init ()
	{
		if(!this.data || !this.data.app){
			console.warn('The sync-system must be present on the scene and configured with required data.');
			return;
		}
		console.log(this.data);

		// temporary way of having unique identifiers for each client
		this.clientId = this.sceneEl.object3D.uuid;
		this.masterClientId = null;

		this.queuedInstantiations = [];
		this.isConnected = false;
		Promise.all([
			altspace.utilities.sync.connect({
				authorId: this.data.author,
				appId: this.data.app,
				instanceId: this.data.instance,
				baseRefUrl: this.data.refUrl
			}),
			altspace.getUser()
		]).then(this.connected.bind(this));
	};

	SyncSystem.prototype.connected = function connected (results)
	{
		this.connection = results.shift();
		this.userInfo = results.shift();

		this.sceneRef = this.connection.instance.child('scene');
		this.clientsRef = this.connection.instance.child('clients');
		this.instantiatedElementsRef = this.connection.instance.child('instantiatedElements');

		this.instantiatedElementsRef.on('child_added', this.listenToInstantiationGroup.bind(this));
		this.instantiatedElementsRef.on('child_removed', this.stopListeningToInstantiationGroup.bind(this));

		var self = this;

		// local client connected
		this.clientsRef.on("value", function (snapshot) {
			var clientIds = snapshot.val();
			var masterClientKey = Object.keys(clientIds)[0];
			self.masterClientId = clientIds[masterClientKey];
		});

		// remote client connected
		this.clientsRef.on('child_added', function (childSnapshot) {
			var joinedClientId = childSnapshot.val();
			//let the master client flag get set first
			setTimeout(function () {
				self.sceneEl.emit('clientjoined', {id: joinedClientId}, false);
			}, 0);
		});

		// remote client disconnected
		this.clientsRef.on('child_removed', function (childSnapshot) {
			var leftClientId = childSnapshot.val();
			//let the master client flag get set first
			setTimeout(function () {
				self.sceneEl.emit('clientleft', {id: leftClientId}, false);
			}, 0);
		});

		// add our client ID to the list of connected clients,
		// but have it be automatically removed by firebase if we disconnect for any reason
		this.clientsRef.push(this.clientId).onDisconnect().remove();

		this.connection.instance.child('initialized').once('value', function (snapshot) {
			var shouldInitialize = !snapshot.val();
			snapshot.ref().set(true);

			self.processQueuedInstantiations();

			self.sceneEl.emit('connected', { shouldInitialize: shouldInitialize }, false);
			self.isConnected = true;
		});
	};

	/**
	* Returns true if the local client is the master client.
	* @instance
	* @method isMasterClient
	* @memberof module:altspace/components.sync-system
	* @returns {boolean}
	*/
	SyncSystem.prototype.isMasterClient = function isMasterClient ()
	{
		return this.masterClientId === this.clientId;
	};

	SyncSystem.prototype.listenToInstantiationGroup = function listenToInstantiationGroup (snapshot) {
		snapshot.ref().on('child_added', this.createElement.bind(this));
		snapshot.ref().on('child_removed', this.removeElement.bind(this));
	};

	SyncSystem.prototype.stopListeningToInstantiationGroup = function stopListeningToInstantiationGroup (snapshot) {
		snapshot.ref().off('child_added');
		snapshot.ref().off('child_removed');
	};

	SyncSystem.prototype.processQueuedInstantiations = function processQueuedInstantiations () {
		var this$1 = this;

		this.queuedInstantiations.forEach((function (instantiationProps) {
			instantiationProps.creatorUserId = this$1.userInfo.userId;
			instantiationProps.clientId = this$1.clientId;
			this$1.instantiatedElementsRef.child(instantiationProps.groupName).
				push(instantiationProps).
				onDisconnect().remove();
		}).bind(this));
		// Clear queue.
		this.queuedInstantiations.length = 0;
	};

	/**
	* Instantiate an entity with the given mixins. Instantiated entities that belong to the current user are given a
	* "mine" class name, so that they can be selected against.
	* @instance
	* @method module:altspace/components.sync-system#instantiate
	* @param {string} mixin - A comma-separated list of mixin ids which should be used to instantiate the entity.
	* @param {Element} [parent] - An element to which the entity should be added. Defaults to the scene.
	* @param {Element} [el] - The element responsible for instantiating this entity.
	* @param {string} [groupName] - A group that the entity should belong to. Used in conjunction with
	*	[removeLast]{@link module:altspace/components.sync-system#removeLast}.
	* @param {string} [instantiatorId] - Used by [removeLast]{@link module:altspace/components.sync-system#removeLast} to indicate who was
	*	responsible for the removed entity.
	*/
	SyncSystem.prototype.instantiate = function instantiate (mixin, parent, el, groupName, instantiatorId) {
		// TODO Validation should throw an error instead of a console.error, but A-Frame 0.3.0 doesn't propagate those
		// correctly.
		if (!mixin) {
			console.error('AltspaceVR: Instantiation requires a mixin value.', el);
			return;
		}
		var parentWithId = parent && parent.id;
		var parentIsScene = parent.nodeName === 'A-SCENE';
		if (!parentWithId && !parentIsScene) {
			console.error('AltspaceVR: Instantiation requires a parent with an id.', el);
			return;
		}

		var parentSelector = parentWithId ? '#' + parent.id : 'a-scene';
		var instantiationProps = {
			instantiatorId: instantiatorId || '',
			groupName: groupName || 'main',
			mixin: mixin,
			parent: parentSelector
		};
		this.queuedInstantiations.push(instantiationProps);
		if (this.isConnected) {
			this.processQueuedInstantiations();
		}
	};

	/**
	* Remove the last entity instantiated in the given group.
	* Returns a Promise which resolves with the instantiatorId associated with the removed entity.
	* @param {string} groupName - Name of the group from which to remove the entity.
	* @returns {Promise}
	*/
	SyncSystem.prototype.removeLast = function removeLast (groupName) {
		var this$1 = this;

		return new Promise((function (resolve) {
			this$1.instantiatedElementsRef.child(groupName).orderByKey().limitToLast(1).once(
				'value',
				function (snapshot) {
					if (!snapshot.hasChildren()) { resolve(); return; }
					var val = snapshot.val();
					var key = Object.keys(val)[0];
					resolve(val[key].instantiatorId);
					snapshot.ref().child(key).remove();
				}
			);
		}).bind(this));
	};

	SyncSystem.prototype.createElement = function createElement (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		var entityEl = document.createElement('a-entity');
		entityEl.id = val.groupName + '-instance-' + key;
		document.querySelector(val.parent).appendChild(entityEl);
		entityEl.setAttribute('mixin', val.mixin);
		entityEl.dataset.creatorUserId = val.creatorUserId;
		if (this.userInfo.userId === val.creatorUserId) {
			entityEl.classList.add('mine');
		}
	};

	SyncSystem.prototype.removeElement = function removeElement (snapshot) {
		var val = snapshot.val();
		var key = snapshot.key();
		var id = val.groupName + '-instance-' + key;
		var el = document.querySelector('#' + id);
		el.parentNode.removeChild(el);
	};

	Object.defineProperties( SyncSystem.prototype, prototypeAccessors );

	return SyncSystem;
}(AFrameSystem));

'use strict';

//from underscore.js
function throttle(func, wait, options) {
	var timeout, context, args, result;
	var previous = 0;
	if (!options) { options = {}; }

	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) { context = args = null; }
	};

	var throttled = function() {
		var now = Date.now();
		if (!previous && options.leading === false) { previous = now; }
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) { context = args = null; }
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};

	throttled.cancel = function() {
		clearTimeout(timeout);
		previous = 0;
		timeout = context = args = null;
	};

	return throttled;
}


/**
* @name module:altspace/components.sync-transform
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Synchronize the position, rotation, and scale of this object with all clients.
* Requires both a [sync-system]{@link module:altspace/components.sync-system} component on the `a-scene`, and a
* [sync]{@link module:altspace/components.sync} component on the target entity. @aframe
* @example
* <a-scene sync-system='app: myapp; author: name'>
*     <a-box move-it-around sync sync-transform></a-box>
* </a-scene>
*/
var SyncTransform = (function (AFrameComponent$$1) {
	function SyncTransform () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) SyncTransform.__proto__ = AFrameComponent$$1;
	SyncTransform.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncTransform.prototype.constructor = SyncTransform;

	var prototypeAccessors = { dependencies: {} };

	prototypeAccessors.dependencies.get = function (){ return ['sync']; };
	SyncTransform.prototype.init = function init ()
	{
		this.sync = this.el.components.sync;
		if(this.sync.isConnected)
			{ this.start(); }
		else
			{ this.el.addEventListener('connected', this.start.bind(this)); }
	};

	SyncTransform.prototype.start = function start ()
	{
		var sync = this.sync, component = this;
		var positionRef = sync.dataRef.child('position');
		var rotationRef = sync.dataRef.child('rotation');
		var scaleRef = sync.dataRef.child('scale');

		component.updateRate = 100;
		var stoppedAnimations = [];

		//pause all animations on ownership loss
		component.el.addEventListener('ownershiplost', function () {
			Array.from(component.el.children).forEach(function (child) {
				var tagName = child.tagName.toLowerCase();
				if (tagName === "a-animation") {
					stoppedAnimations.push(child);
					child.stop();
				}
			});
		});

		component.el.addEventListener('ownershipgained', function () {
			stoppedAnimations.forEach(function (a) { return a.start(); });
			stoppedAnimations = [];
		});

		function onTransform(snapshot, componentName) {
			if (sync.isMine) { return; }
			var value = snapshot.val();
			if (!value) { return; }

			component.el.setAttribute(componentName, value);
		}

		positionRef.on('value', function (snapshot) { return onTransform(snapshot, 'position'); });
		rotationRef.on('value', function (snapshot) { return onTransform(snapshot, 'rotation'); });
		scaleRef.on('value', function (snapshot) { return onTransform(snapshot, 'scale'); });

		var sendPosition = throttle(function(value){
			positionRef.set(value);
		}, component.updateRate);

		var sendRotation = throttle(function(value){
			rotationRef.set(value);
		}, component.updateRate);

		var sendScale = throttle(function(value){
			scaleRef.set(value);
		}, component.updateRate);

		function onComponentChanged(event)
		{
			if (!sync.isMine) { return; }

			var name = event.detail.name;
			var newData = component.el.getAttribute(name);

			if (name === 'position') {
				sendPosition(newData);
			} else if (name === 'rotation') {
				sendRotation(newData);
			} else if (name === 'scale') {
				sendScale(newData);
			}
		}

		component.el.addEventListener('componentchanged', onComponentChanged);
	};

	Object.defineProperties( SyncTransform.prototype, prototypeAccessors );

	return SyncTransform;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.sync-n-sound
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Synchronize the playback state of an [n-sound]{@link module:altspace/components.n-sound} component between clients.
* Requires both a [sync-system]{@link module:altspace/components.sync-system} component on the `a-scene`, and a
* [sync]{@link module:altspace/components.sync} component on the target entity. @aframe
*/
var SyncNSound = (function (AFrameComponent$$1) {
	function SyncNSound () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) SyncNSound.__proto__ = AFrameComponent$$1;
	SyncNSound.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncNSound.prototype.constructor = SyncNSound;

	var prototypeAccessors = { dependencies: {} };

	prototypeAccessors.dependencies.get = function (){
		return ['sync'];
	};

	SyncNSound.prototype.init = function init ()
	{
		this.sync = this.el.components.sync;
		this.scene = this.el.sceneEl;
		this.syncSys = this.scene.systems['sync-system'];

		this.soundStateRef = null;
		this.soundEventRef = null;

		if(this.sync.isConnected)
			{ this.start(); }
		else
			{ this.el.addEventListener('connected', this.start.bind(this)); }
	};

	SyncNSound.prototype.remove = function remove ()
	{
		this.soundStateRef.off('value');
		this.soundEventRef.off('value');
	};

	SyncNSound.prototype.start = function start ()
	{
		var this$1 = this;

		this.soundStateRef = this.sync.dataRef.child('sound/state');
		this.soundEventRef = this.sync.dataRef.child('sound/event');

		function sendEvent(event) {
			if (!this.sync.isMine) { return; }
			var event = {
				type: event.type,
				sender: this.syncSys.clientId,
				el: this.el.id,
				time: Firebase.ServerValue.TIMESTAMP
			};
			this.soundEventRef.set(event);
		}

		this.el.addEventListener('sound-played', sendEvent.bind(this));
		this.el.addEventListener('sound-paused', sendEvent.bind(this));

		// Retrieve the initial value once so we know to discard it.
		this.soundEventRef.once('value', function (snapshot) {
			var initialEvent = snapshot.val();
			this$1.soundEventRef.on('value', function (snapshot) {
				var event = snapshot.val();
				if (!event || (initialEvent && event.time === initialEvent.time) || this$1.sync.isMine) { return; }

				if (event.el === this$1.el.id) {
					var sound = this$1.el.components['n-sound'];
					if (event.type === 'sound-played') {
						sound.playSound();
					}
					else {
						sound.pauseSound();
					}
				}
			});
		});

		this.el.addEventListener('componentchanged', function (event) {
			if (!this$1.sync.isMine) { return; }
			var name = event.detail.name;
			if (name !== 'n-sound') { return; }
			this$1.soundStateRef.set(this$1.el.getAttribute(name));
		});

		this.soundStateRef.on('value', function (snapshot) {
			if (this$1.sync.isMine) { return; }
			var state = snapshot.val();
			if (!state) { return; }
			this$1.el.setAttribute('n-sound', state);
		});
	};

	Object.defineProperties( SyncNSound.prototype, prototypeAccessors );

	return SyncNSound;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.sync-n-skeleton-parent
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Syncs the attributes of an [n-skeleton-parent]{@link module:altspace/components.n-skeleton-parent} component across clients.
* Requires the [sync]{@link module:altspace/components.sync} component be present
* on the entity. @aframe
* @example <a-box n-skeleton-parent='userId: 123123123123;' sync sync-n-skeleton-parent></a-box>
*/

var SyncNSkeletonParent = (function (AFrameComponent$$1) {
	function SyncNSkeletonParent () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) SyncNSkeletonParent.__proto__ = AFrameComponent$$1;
	SyncNSkeletonParent.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	SyncNSkeletonParent.prototype.constructor = SyncNSkeletonParent;

	var prototypeAccessors = { dependencies: {} };

	prototypeAccessors.dependencies.get = function (){ return ['sync']; };

	SyncNSkeletonParent.prototype.init = function init ()
	{
		var scene = this.el.sceneEl;
		this.syncSys = scene.systems['sync-system'];
		this.sync = this.el.components.sync;
		if(this.syncSys.isConnected){
			this._start();
		}
		else {
			scene.addEventListener('connected', this._start.bind(this));
		}
	};

	SyncNSkeletonParent.prototype.getDataRef = function getDataRef (propertyName) {
		return this.sync.dataRef.child('n-skeleton-parent/' + propertyName);
	};

	SyncNSkeletonParent.prototype._start = function _start ()
	{
		this.attributeRef = this.sync.dataRef.child('n-skeleton-parent');
		this.attributeRef.on('value', function (snapshot) {
			var val = snapshot.val();
			if (!val) { return; }
			this.el.setAttribute('n-skeleton-parent', val);
		}.bind(this));

		// dataset.creatorUserId is defined when the entity is instantiated via the sync system.
		if (this.el.dataset.creatorUserId) {
			this.attributeRef.set(Object.assign(
				{}, this.el.components['n-skeleton-parent'].data, {userId: this.el.dataset.creatorUserId}));
		}

		this.el.addEventListener('componentchanged', function (event) {
			if (!this.sync.isMine) { return; }
			var name = event.detail.name;
			if (name === 'n-skeleton-parent') {
				this.attributeRef.set(this.el.getAttribute(name));
			}
		}.bind(this));
	};

	Object.defineProperties( SyncNSkeletonParent.prototype, prototypeAccessors );

	return SyncNSkeletonParent;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.wire
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc The wire component allows you to trigger an event on one entity when an event
* occurs on the another entity. If no targets are selected, it will target itself. @aframe
* @example <a-box id='proxy' wire='on: click; emit: click; target: #otherbox></a-box>
* <a-box id='otherbox' random-color></a-box>
**/

var Wire = (function (AFrameComponent$$1) {
	function Wire(){
		AFrameComponent$$1.call(this);
		this.multiple = true;
	}

	if ( AFrameComponent$$1 ) Wire.__proto__ = AFrameComponent$$1;
	Wire.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	Wire.prototype.constructor = Wire;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			/**
			* Name of an event to listen for
			* @instance
			* @member {string} on
			* @memberof module:altspace/components.wire
			*/
			on: {type: 'string'},

			/**
			* Name of an event to trigger on the targets
			* @instance
			* @member {string} emit
			* @memberof module:altspace/components.wire
			*/
			emit: {type: 'string'},

			/**
			* Name of a state to watch for
			* @instance
			* @member {string} gained
			* @memberof module:altspace/components.wire
			*/
			gained: {type: 'string'},

			/**
			* Name of a state to watch for
			* @instance
			* @member {string} lost
			* @memberof module:altspace/components.wire
			*/
			lost: {type: 'string'},

			/**
			* Name of a state to add on the target
			* @instance
			* @member {string} gain
			* @memberof module:altspace/components.wire
			*/
			gain: {type: 'string'},

			/**
			* Name of a state to remove on the target
			* @instance
			* @member {string} lose
			* @memberof module:altspace/components.wire
			*/
			lose: {type: 'string'},

			/**
			* A selector to pick which objects to wire to. The selector is re-evaluated when the wire is triggered.
			* @instance
			* @member {selector} targets
			* @memberof module:altspace/components.wire
			*/
			targets: {type: 'selectorAll'},

			/**
			* A selector to pick a single object to wire to. The selector is re-evaluated when the wire is triggered.
			* @instance
			* @member {selector} target
			* @memberof module:altspace/components.wire
			*/
			target: {type: 'selector'}
		};
	};

	Wire.prototype.init = function init ()
	{
		this.actOnTargets = (function()
		{
			function act(el) {
				if (this.data.emit) {
					el.emit(this.data.emit);
				}
				if (this.data.gain) {
					el.addState(this.data.gain);
				}
				if (this.data.lose) {
					el.removeState(this.data.lose);
				}
			}

			this.updateProperties(this.attrValue);

			if(this.data.targets)
				{ this.data.targets.forEach(act.bind(this)); }

			if(this.data.target)
				{ act.call(this, this.data.target); }

			if( !this.data.targets && !this.data.target )
				{ act.call(this, this.el); }

		}).bind(this);

		this.actOnTargetsIfStateMatches = (function (event) {
			var state = event.detail.state;
			if (state === this.data.gained || state === this.data.lost) {
				this.actOnTargets();
			}
		}).bind(this);
	};

	Wire.prototype.update = function update (oldData)
	{
		if (oldData.on) {
			this.el.removeEventListener(oldData.on, this.actOnTargets);
		}
		if (oldData.gained) {
			this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (oldData.lost) {
			this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}

		if (this.data.on) {
			this.el.addEventListener(this.data.on, this.actOnTargets);
		}
		if (this.data.gained) {
			this.el.addEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (this.data.lost) {
			this.el.addEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}
	};

	Wire.prototype.remove = function remove () {
		this.el.removeEventListener(this.data.on, this.actOnTargets);
		this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
	};

	Object.defineProperties( Wire.prototype, prototypeAccessors );

	return Wire;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.one-per-user
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Instantiates an entity for every user in the space using [sync-system]{@link module:altspace/components.sync-system}. @aframe
* @example <a-mixin id='handbox' n-skeleton-parent='part: hand; side: right' geometry='primitive: box;'></a-mixin>
* <a-entity one-per-user='mixin: #handbox'></a-entity>
*/
var OnePerUser = (function (AFrameComponent$$1) {
	function OnePerUser () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) OnePerUser.__proto__ = AFrameComponent$$1;
	OnePerUser.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	OnePerUser.prototype.constructor = OnePerUser;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			/**
			* A comma-separated list of mixin ids that are used to instantiate the object.
			* @member {string} mixin
			* @instance
			* @memberof module:altspace/components.one-per-user
			*/
			mixin: {type: 'string'},

			/**
			* A selector specifying which element should be the parent of the instantiated entity.
			* Defaults to the parent node (i.e. new element becomes a sibling of this entity).
			* @member {string} [parent]
			* @instance
			* @memberof module:altspace/components.one-per-user
			*/
			parent: {type: 'selector'}
		};
	};

	OnePerUser.prototype.init = function init (){
		var scene = this.el.sceneEl;
		this.syncSys = scene.systems['sync-system'];
		this.syncSys.instantiate(this.data.mixin, this.data.parent || this.el.parentNode, this.el);
	};

	Object.defineProperties( OnePerUser.prototype, prototypeAccessors );

	return OnePerUser;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.instantiator
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Instantiates objects on an event trigger, adds them to the scene and syncs their creation across clients.
* The instantiated objects are built using the specified mixins. @aframe
* @example <!-- attaches a ball to your head if you click the box -->
* <a-mixin id='headbox' geometry='primitive:sphere;' n-skeleton-parent='part: head'></a-mixin>
* <a-box instantiator='on: click; mixin: headbox;'></a-box>
*/
var Instantiator = (function (AFrameComponent$$1) {
	function Instantiator () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) Instantiator.__proto__ = AFrameComponent$$1;
	Instantiator.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	Instantiator.prototype.constructor = Instantiator;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){ return {
		/**
		* An event that triggers the instantiation
		* @instance
		* @member {string} on
		* @memberof module:altspace/components.instantiator
		*/
		on: {type: 'string'},

		/**
		* A space-separated list of mixins that should be used to instantiate the object.
		* @instance
		* @member {string} mixin
		* @memberof module:altspace/components.instantiator
		*/
		mixin: {type: 'string'},

		/**
		* A selector that determines which object the instantiated object will be added to.
		* @instance
		* @member {string} parent
		* @default "a-scene"
		* @memberof module:altspace/components.instantiator
		*/
		parent: {type: 'selector', default: 'a-scene'},

		/**
		* An identifier which can be used to group instantiated objects.
		* @instance
		* @member {string} group
		* @default "main"
		* @memberof module:altspace/components.instantiator
		*/
		group: {type: 'string', default: 'main'},

		/**
		* Whether the last object instantiated in a group should be removed before
		* instantiating a new object.
		* @instance
		* @member {boolean} removeLast
		* @default true
		* @memberof module:altspace/components.instantiator
		*/
		removeLast: {type: 'boolean', default: true},
	}; };

	Instantiator.prototype.init = function init () {
		this.onHandler = this.instantiateOrToggle.bind(this);
		this.el.addEventListener(this.data.on, this.onHandler);
		this.syncSys = this.el.sceneEl.systems['sync-system'];
	};

	Instantiator.prototype.instantiateOrToggle = function instantiateOrToggle () {
		var userGroup = this.data.group + '-' + this.syncSys.userInfo.userId;
		if (this.data.removeLast) {
			this.syncSys.removeLast(userGroup).then(function (lastInstantiatorId) {
				if (lastInstantiatorId !== this.el.id) {
					this.syncSys.instantiate(this.data.mixin, this.data.parent, this.el, userGroup, this.el.id);
				}
			}.bind(this));
		}
		else {
			this.syncSys.instantiate(this.el.id, userGroup, this.data.mixin, this.data.parent);
		}
	};

	Instantiator.prototype.remove = function remove () {
		this.el.removeEventListener(this.data.on, this.onHandler);
	};

	Object.defineProperties( Instantiator.prototype, prototypeAccessors );

	return Instantiator;
}(AFrameComponent));

'use strict';

// graceful fallback in web browsers
if (!window.altspace || !altspace.inClient)
{
	var noop = function () {};
	safeDeepSet(window, ['altspace','addNativeComponent'], noop);
	safeDeepSet(window, ['altspace','updateNativeComponent'], noop);
	safeDeepSet(window, ['altspace','removeNativeComponent'], noop);
}

// create js-side dummy meshes so things are processed correctly
var placeholderGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
var placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
placeholderMaterial.visible = false;
var PlaceholderMesh = (function (superclass) {
	function PlaceholderMesh(){
		superclass.call(this, placeholderGeometry, placeholderMaterial);
	}

	if ( superclass ) PlaceholderMesh.__proto__ = superclass;
	PlaceholderMesh.prototype = Object.create( superclass && superclass.prototype );
	PlaceholderMesh.prototype.constructor = PlaceholderMesh;

	return PlaceholderMesh;
}(THREE.Mesh));

/**
* Native components represent Unity-native game objects that offer extended functionality
* only in AltspaceVR, with added caveats. This is the abstract base class for all
* native components. Do not use this class directly.
*
* @memberof module:altspace/components
* @extends module:altspace/components.AFrameComponent
*/
var NativeComponent = (function (AFrameComponent$$1) {
	function NativeComponent(name, sendUpdates){
		if ( sendUpdates === void 0 ) sendUpdates = true;

		AFrameComponent$$1.call(this);
		Object.assign(this, {name: name, sendUpdates: sendUpdates});
	}

	if ( AFrameComponent$$1 ) NativeComponent.__proto__ = AFrameComponent$$1;
	NativeComponent.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	NativeComponent.prototype.constructor = NativeComponent;

	NativeComponent.prototype.init = function init ()
	{
		var this$1 = this;

		var mesh = this.mesh || this.el.getOrCreateObject3D('mesh', PlaceholderMesh);
		this.currentMesh = mesh;

		//If you attach native components to an entity, it will not use a default collider
		safeDeepSet(mesh.userData, ['altspace', 'collider', 'enabled'], false);
		altspace.addNativeComponent(mesh, this.name);

		this.update();

		if(!this.mesh && !this._dontRebind){
			this.el.addEventListener('object3dset', (function (event) {
				if(event.detail.type === 'mesh'){
					altspace.removeNativeComponent(this$1.currentMesh, this$1.name);
					this$1._dontRebind = true;
					this$1.init();
				}
			}).bind(this));
		}
	};

	NativeComponent.prototype.update = function update (){
		var mesh = this.mesh || this.el.object3DMap.mesh;
		if(this.sendUpdates){
			altspace.updateNativeComponent(mesh, this.name, this.data);
		}
	};

	NativeComponent.prototype.remove = function remove (){
		var mesh = this.mesh || this.el.object3DMap.mesh;
		altspace.removeNativeComponent(mesh, this.name);
	};

	NativeComponent.prototype.callComponent = function callComponent (name){
		var args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		var mesh = this.mesh || this.el.object3DMap.mesh;
		altspace.callNativeComponent(mesh, this.name, name, args);
	};

	return NativeComponent;
}(AFrameComponent));

'use strict';

/**
* @name module:altspace/components.n-object
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Attach a given native object to this entity. @aframe
* @example <a-entity n-object='res:architecture/wall-4w-4h'></a-entity>
*/
var NObject = (function (NativeComponent$$1) {
	function NObject(){ NativeComponent$$1.call(this, 'n-object'); }

	if ( NativeComponent$$1 ) NObject.__proto__ = NativeComponent$$1;
	NObject.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NObject.prototype.constructor = NObject;

	var prototypeAccessors = { schema: {} };
	prototypeAccessors.schema.get = function (){
		return {
			/**
			* The identifier for the [resource]{@link module:altspace/resources} you want. This component
			* can accept all resource types except for `interactables`.
			* @instance
			* @member {string} res
			* @memberof module:altspace/components.n-object
			*/
			res: {type: 'string'}
		};
	};

	Object.defineProperties( NObject.prototype, prototypeAccessors );

	return NObject;
}(NativeComponent));

/**
* @name module:altspace/components.n-spawner
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Create an object that spawns additional copies of itself when grabbed by a user (the copies are not spawners themselves).
* These copies will be physically interactive and automatically synchronized
* between users. @aframe
* @example <a-entity n-spawner='res: interactables/basketball'></a-entity>
*/
var NSpawner = (function (NativeComponent$$1) {
	function NSpawner(){ NativeComponent$$1.call(this, 'n-spawner'); }

	if ( NativeComponent$$1 ) NSpawner.__proto__ = NativeComponent$$1;
	NSpawner.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NSpawner.prototype.constructor = NSpawner;

	var prototypeAccessors$1 = { schema: {} };
	prototypeAccessors$1.schema.get = function (){
		return {
			/**
			* The identifier for the [resource]{@link module:altspace/resources} you want. This component
			* can only accept resources of type `interactables`.
			* @instance
			* @member {string} res
			* @memberof module:altspace/components.n-spawner
			*/
			res: {type: 'string'}
		};
	};

	Object.defineProperties( NSpawner.prototype, prototypeAccessors$1 );

	return NSpawner;
}(NativeComponent));


/**
* @name module:altspace/components.n-billboard
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Make the object's +Z always face the viewer. Currently will only directly apply
* to main mesh or native component on the attached entity, not any children or submeshes. @aframe
* @example <a-image src='#tree' n-billboard></a-image>
*/
var NBillboard = (function (NativeComponent$$1) {
	function NBillboard(){ NativeComponent$$1.call(this, 'n-billboard', false); }

	if ( NativeComponent$$1 ) NBillboard.__proto__ = NativeComponent$$1;
	NBillboard.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NBillboard.prototype.constructor = NBillboard;

	return NBillboard;
}(NativeComponent));

/**
* @name module:altspace/components.n-skeleton-parent
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Parents an entity to a joint on the avatar skeleton. @aframe
* @example <a-sphere n-skeleton-parent='part: head'></a-sphere>
*/
var NSkeletonParent = (function (NativeComponent$$1) {
	function NSkeletonParent(){ NativeComponent$$1.call(this, 'n-skeleton-parent'); }

	if ( NativeComponent$$1 ) NSkeletonParent.__proto__ = NativeComponent$$1;
	NSkeletonParent.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NSkeletonParent.prototype.constructor = NSkeletonParent;

	var prototypeAccessors$2 = { schema: {} };
	prototypeAccessors$2.schema.get = function (){ return {
		/**
		* One of 'eye, 'head', 'neck', 'spine', 'hips', 'upper-leg', 'lower-leg',
		* 'foot', 'toes', 'shoulder', 'upper-arm', 'lower-arm', 'hand', 'thumb',
		* 'index', 'middle', 'ring' or 'pinky'.
		* @member {string} module:altspace/components.n-skeleton-parent#part
		*/
		part: {type: 'string'},

		/**
		* Side of the body. Either 'left', 'center' or 'right'
		* @member {string} module:altspace/components.n-skeleton-parent#side
		* @default "center"
		*/
		side: {type: 'string', default: 'center'},

		/**
		* Bone index. e.g. Which knuckle joint to attach to.
		* @member {int} module:altspace/components.n-skeleton-parent#index
		* @default 0
		*/
		index: {type: 'int', default: 0},

		/**
		* Id of the user to which the entity should be attached. Defaults to the
		* local user.
		* @member {int} module:altspace/components.n-skeleton-parent#userId
		*/
		userId: {type: 'string'}
	}; };

	Object.defineProperties( NSkeletonParent.prototype, prototypeAccessors$2 );

	return NSkeletonParent;
}(NativeComponent));

/**
* 
* @name module:altspace/components.n-cockpit-parent
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Parents an entity to the cockpit, i.e. the player's HUD. This is primarily used for UI elements.
* Note that this does not dock the items to the radial menu. If you want that, use [altspace.open](../js/module-altspace.html#.open). @aframe
* @example <a-image src='#button' n-cockpit-parent></a-image>
*/
var NCockpitParent = (function (NativeComponent$$1) {
	function NCockpitParent(){ NativeComponent$$1.call(this, 'n-cockpit-parent', false); }

	if ( NativeComponent$$1 ) NCockpitParent.__proto__ = NativeComponent$$1;
	NCockpitParent.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NCockpitParent.prototype.constructor = NCockpitParent;

	return NCockpitParent;
}(NativeComponent));

'use strict';

/**
* @name module:altspace/components.n-collider
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Abstract base class for [n-sphere-collider]{@link module:altspace/components.n-sphere-collider},
* [n-box-collider]{@link module:altspace/components.n-box-collider},
* [n-capsule-collider]{@link module:altspace/components.n-capsule-collider},
* and [n-mesh-collider]{@link module:altspace/components.n-mesh-collider}. You cannot use
* this class directly, but instead you should add one of those components
* to your objects. @aframe
*/
var NCollider = (function (NativeComponent$$1) {
	function NCollider () {
		NativeComponent$$1.apply(this, arguments);
	}

	if ( NativeComponent$$1 ) NCollider.__proto__ = NativeComponent$$1;
	NCollider.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NCollider.prototype.constructor = NCollider;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){
		return {
			/**
			* The offset of the collider in local space.
			* @instance
			* @member {vec3} center
			* @default [0, 0, 0]
			* @memberof module:altspace/components.n-collider
			*/
			center: { type: 'vec3' },

			/**
			* The type of collider, one of: `object` | `environment` | `hologram`.
			* Object colliders collide with other objects, the environment, and the cursor.
			* Environment colliders collide with everything objects do, but you can also
			* teleport onto them. Hologram colliders only collide with other holograms and
			* the cursor.
			* @instance
			* @member {string} type
			* @default "hologram"
			* @memberof module:altspace/components.n-collider
			*/
			type: { type: 'string', default: 'object' },

			/**
			* If true, this collider will not block
			* other objects, but instead fire a `triggerenter` event when an object comes
			* into contact with it, and a `triggerexit` when it leaves contact.
			* @instance
			* @member {boolean} isTrigger
			* @default false
			* @memberof module:altspace/components.n-collider
			*/
			isTrigger: { default: false, type: 'boolean' }
		};
	};

	Object.defineProperties( NCollider.prototype, prototypeAccessors );

	return NCollider;
}(NativeComponent));

/**
* Fired when an object enters a trigger volume, e.g. `isTrigger: true`
* @event module:altspace/components.n-collider.triggerenter
*/

/**
* Fired when an object leaves a trigger volume, e.g. `isTrigger: true`
* @event module:altspace/components.n-collider.triggerexit
*/

/**
* @name module:altspace/components.n-sphere-collider
* @class
* @extends module:altspace/components.n-collider
* @classdesc Creates a sphere-shaped collider of the given radius. Collides with
* the cursor or avatars depending on the [type]{@link module:altspace/components.n-sphere-collider#type} property. @aframe
* @example <a-sphere radius=1 n-sphere-collider='radius: 1; type: object;'></a-sphere>
*/
var NSphereCollider = (function (NCollider) {
	function NSphereCollider(){ NCollider.call(this, 'n-sphere-collider'); }

	if ( NCollider ) NSphereCollider.__proto__ = NCollider;
	NSphereCollider.prototype = Object.create( NCollider && NCollider.prototype );
	NSphereCollider.prototype.constructor = NSphereCollider;

	var prototypeAccessors$1 = { schema: {} };
	prototypeAccessors$1.schema.get = function (){
		return {
			/**
			* The radius of the sphere collider in meters
			* @instance
			* @member {Number} radius
			* @default 1
			* @memberof module:altspace/components.n-sphere-collider
			*/
			radius: { default: 1, type: 'number' },
		};
	};

	Object.defineProperties( NSphereCollider.prototype, prototypeAccessors$1 );

	return NSphereCollider;
}(NCollider));

/**
* @name module:altspace/components.n-box-collider
* @class
* @extends module:altspace/components.n-collider
* @classdesc Creates a box-shaped collider with the given dimensions. Collides with
* the cursor or avatars depending on the [type]{@link module:altspace/components.n-box-collider#type} property. @aframe
* @example <a-box n-box-collider='type: environment; size: 1, 0.5, 1'></a-box>
*/
var NBoxCollider = (function (NCollider) {
	function NBoxCollider(){ NCollider.call(this, 'n-box-collider'); }

	if ( NCollider ) NBoxCollider.__proto__ = NCollider;
	NBoxCollider.prototype = Object.create( NCollider && NCollider.prototype );
	NBoxCollider.prototype.constructor = NBoxCollider;

	var prototypeAccessors$2 = { schema: {} };
	prototypeAccessors$2.schema.get = function (){
		return {
			/**
			* The dimensions of the collider.
			* @instance
			* @member {vec3} size
			* @default [1, 1, 1]
			* @memberof module:altspace/components.n-box-collider
			*/
			size: { type: 'vec3', default: {x:1,y:1,z:1} }
		};
	};

	Object.defineProperties( NBoxCollider.prototype, prototypeAccessors$2 );

	return NBoxCollider;
}(NCollider));

/**
* @name module:altspace/components.n-capsule-collider
* @class
* @extends module:altspace/components.n-collider
* @classdesc Create a capsule-shaped collider on this entity. Capsules
* are a union of a cylinder and two hemispheres on top and bottom. Collides with
* the cursor or avatars depending on the [type]{@link module:altspace/components.n-capsule-collider#type} property. @aframe
* @example <a-cylinder n-capsule-collider='type: environment'></a-cylinder>
*/
var NCapsuleCollider = (function (NCollider) {
	function NCapsuleCollider(){ NCollider.call(this, 'n-capsule-collider'); }

	if ( NCollider ) NCapsuleCollider.__proto__ = NCollider;
	NCapsuleCollider.prototype = Object.create( NCollider && NCollider.prototype );
	NCapsuleCollider.prototype.constructor = NCapsuleCollider;

	var prototypeAccessors$3 = { schema: {} };
	prototypeAccessors$3.schema.get = function (){
		return {

			/**
			* The radius of the capsule in meters.
			* @instance
			* @member {number} radius
			* @default 1
			* @memberof module:altspace/components.n-capsule-collider
			*/
			radius: { default: 0, type: 'number' },

			/**
			* The height of the shaft of the capsule in meters.
			* @instance
			* @member {number} height
			* @default 0
			* @memberof module:altspace/components.n-capsule-collider
			*/
			height: { default: 0, type: 'number' },

			/**
			* The axis with which the capsule is aligned. Must be one of 'x', 'y' or 'z'.
			* @instance
			* @member {string} direction
			* @default 'y'
			* @memberof module:altspace/components.n-capsule-collider
			*/
			direction: { default: 'y' }
		};
	};

	Object.defineProperties( NCapsuleCollider.prototype, prototypeAccessors$3 );

	return NCapsuleCollider;
}(NCollider));

/**
* @name module:altspace/components.n-mesh-collider
* @class
* @extends module:altspace/components.n-collider
* @classdesc Enable collision for the entire attached mesh. This is expensive to evaluate, so should only be used on
* low-poly meshes. If using this alongside the `geometry` component, make sure that
* `geometry` comes before this component. @aframe
* @example <a-entity gltf-model='#building' n-mesh-collider='type: environment'></a-entity>
*/
var NMeshCollider = (function (NCollider) {
	function NMeshCollider(mesh, data){
		if ( mesh === void 0 ) mesh = null;

		NCollider.call(this, 'n-mesh-collider');
		this.mesh = mesh;
		this.subcomponents = [];
	}

	if ( NCollider ) NMeshCollider.__proto__ = NCollider;
	NMeshCollider.prototype = Object.create( NCollider && NCollider.prototype );
	NMeshCollider.prototype.constructor = NMeshCollider;

	var prototypeAccessors$4 = { schema: {} };

	prototypeAccessors$4.schema.get = function (){
		return {

			/**
			* Whether the collider should be convex or concave. Set this to false if you have holes
			* in your mesh. Convex colliders are limited to 255 triangles. Note: concave colliders can be significantly more
			* expensive to evaluate compared to convex colliders, so should be used sparingly.
			* @instance
			* @member {boolean} convex
			* @default true
			* @memberof module:altspace/components.n-mesh-collider
			*/
			convex: { type: 'boolean', default: true }
		};
	};

	NMeshCollider.prototype.init = function init ()
	{
		var this$1 = this;

		if(this.mesh){
			NCollider.prototype.init.call(this);
		}
		else
		{
			this.subcomponents = [];
			var mesh = this.el.object3D;
			mesh.traverse((function (o) {
				if(o instanceof THREE.Mesh){
					var subcomp = new NMeshCollider(o);
					this$1.subcomponents.push(subcomp);
					subcomp.data = this$1.data;
					subcomp.init();
				}
			}).bind(this));

			this.el.addEventListener('model-loaded', this.init.bind(this));
		}
	};

	NMeshCollider.prototype.update = function update (oldData)
	{
		var this$1 = this;

		if(this.mesh){
			NCollider.prototype.update.call(this, oldData);
		}
		else {
			this.subcomponents.forEach((function (sub) {
				sub.data = this$1.data;
				sub.update(oldData);
			}).bind(this));
		}
	};

	NMeshCollider.prototype.remove = function remove ()
	{
		if(this.mesh){
			NCollider.prototype.remove.call(this);
		}
		else {
			this.subcomponents.forEach((function (sub) {
				sub.remove();
			}).bind(this));
		}
	};

	Object.defineProperties( NMeshCollider.prototype, prototypeAccessors$4 );

	return NMeshCollider;
}(NCollider));

'use strict';

/**
* @name module:altspace/components.n-container
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc A container keeps a running tally of how many objects are within
* its bounds, and adds and removes the states `container-full` and
* `container-empty` based on the current count of objects. Requires a native
* collider component set to trigger mode. @aframe
* @example <a-box n-box-collider="isTrigger: true" n-container="capacity: 6"></a-box>
*/
var NContainer = (function (NativeComponent$$1) {
	function NContainer(){ NativeComponent$$1.call(this, 'n-container'); }

	if ( NativeComponent$$1 ) NContainer.__proto__ = NativeComponent$$1;
	NContainer.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NContainer.prototype.constructor = NContainer;

	var prototypeAccessors = { schema: {} };
	prototypeAccessors.schema.get = function (){
		return {
			/**
			* The value at which the container will fire the `container-full` event.
			* @instance
			* @member {number} capacity
			* @default 4
			* @memberof module:altspace/components.n-container
			*/
			capacity: { default: 4, type: 'number' }
		};
	};
	NContainer.prototype.init = function init ()
	{
		NativeComponent$$1.prototype.init.call(this);

		var el = this.el;
		var component = this;

		el.addEventListener('stateadded', function (event) {
			if(event.detail.state === 'container-full'){
				/**
				* Fired when the n-container reaches its capacity.
				* @event container-full
				* @memberof module:altspace/components.n-container
				*/
				el.emit('container-full');
			}
			if(event.detail.state === 'container-empty'){
				/**
				* Fired when the n-container reaches zero objects contained.
				* @event container-empty
				* @memberof module:altspace/components.n-container
				*/
				el.emit('container-empty');
			}
		});

		/**
		* Fired every time an object enters or leaves the bounds of the n-container.
		* @event container-count-changed
		* @memberof module:altspace/components.n-container
		* @param {Object} event - Contains details of the event. The new object count
		* can be found at `event.detail.count`.
		*/
		el.addEventListener('container-count-changed', function (event) {

			/**
			* The number of objects in this container.
			* @instance
			* @member {int} count
			* @readonly
			* @memberof module:altspace/components.n-container
			*/
			component.count = event.detail.count;
		});
	};

	Object.defineProperties( NContainer.prototype, prototypeAccessors );

	return NContainer;
}(NativeComponent));

'use strict';

/**
* @name module:altspace/components.n-portal
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Spawn a portal that allows you to travel to a different space or a different location in the current space. @aframe
* @example <a-entity n-portal='target-space: campfire-lobby'></a-entity>
*/
var NPortal = (function (NativeComponent$$1) {
	function NPortal(){ NativeComponent$$1.call(this, 'n-portal'); }

	if ( NativeComponent$$1 ) NPortal.__proto__ = NativeComponent$$1;
	NPortal.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NPortal.prototype.constructor = NPortal;

	var prototypeAccessors = { schema: {} };
	prototypeAccessors.schema.get = function (){
		return {
			/**
			* The space id of the space that you want the portal to send users to.
			* @instance
			* @member {string} targetSpace
			* @memberof module:altspace/components.n-portal
			*/
			targetSpace: {type: 'string'},
			/**
			* The id of the event that you want the portal to send users to.
			* @instance
			* @member {string} targetEvent
			* @memberof module:altspace/components.n-portal
			*/
			targetEvent: {type: 'string'},
			/**
			* A selector pointing to an A-Frame Entity. The portal will send users to the selected entity's position
			* and rotate the user in its direction. Note: The target position/rotation will not be updated if the
			* targetEntity moves.
			* @instance
			* @member {selector} targetEntity
			* @memberof module:altspace/components.n-portal
			*/
			targetEntity: {type: 'selector'}
		};
	};
	NPortal.prototype.update = function update (){
		var mesh = this.el.object3DMap.mesh;
		var targetPosition, targetQuaternion;
		if (this.data.targetEntity) {
			// updateMatrixWorld doesn't traverse upwards to actually update an object's world matrix.
			// Updating the entire scene's world matrcies is overkill, but there isn't a simple way to do the right
			// thing at the moment. See https://github.com/mrdoob/three.js/pull/9410
			this.el.sceneEl.object3D.updateMatrixWorld(true);
			targetPosition = this.data.targetEntity.object3D.getWorldPosition();
			var quaternion = this.data.targetEntity.object3D.getWorldQuaternion();
			targetQuaternion = {x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w};
		}

		var data = {
			targetSpace: this.data.targetSpace,
			targetEvent: this.data.targetEvent,
			targetPosition: targetPosition,
			targetQuaternion: targetQuaternion
		};

		altspace.updateNativeComponent(mesh, this.name, data);
	};

	Object.defineProperties( NPortal.prototype, prototypeAccessors );

	return NPortal;
}(NativeComponent));

!function(){"use strict";function r(r){for(var t=[],e=0;e<r.length;e++){ t.push(r[e]); }return t}String.prototype.codePointAt||!function(){var r=function(){try{var r={},t=Object.defineProperty,e=t(r,r,r)&&t;}catch(r){}return e}(),t=function(r){if(null==this){ throw TypeError(); }var t=this+"",e=t.length,n=r?+r:0;if(n!=n&&(n=0),!(n<0||n>=e)){var o,i=t.charCodeAt(n);return i>=55296&&i<=56319&&e>n+1&&(o=t.charCodeAt(n+1),o>=56320&&o<=57343)?1024*(i-55296)+o-56320+65536:i}};r?r(String.prototype,"codePointAt",{value:t,configurable:!0,writable:!0}):String.prototype.codePointAt=t;}(),String.prototype.repeat||!function(){var r=function(){try{var r={},t=Object.defineProperty,e=t(r,r,r)&&t;}catch(r){}return e}(),t=function(r){if(null==this){ throw TypeError(); }var t=this+"",e=r?+r:0;if(e!=e&&(e=0),e<0||e==1/0){ throw RangeError(); }for(var n="";e;){ e%2==1&&(n+=t),e>1&&(t+=t),e>>=1; }return n};r?r(String.prototype,"repeat",{value:t,configurable:!0,writable:!0}):String.prototype.repeat=t;}(),String.prototype.includes||!function(){var r={}.toString,t=function(){try{var r={},t=Object.defineProperty,e=t(r,r,r)&&t;}catch(r){}return e}(),e="".indexOf,n=function(t){if(null==this){ throw TypeError(); }var n=this+"";if(t&&"[object RegExp]"==r.call(t)){ throw TypeError(); }var o=n.length,i=t+"",a=i.length,c=arguments.length>1?arguments[1]:void 0,u=c?+c:0;return u!=u&&(u=0),!(a+Math.min(Math.max(u,0),o)>o)&&e.call(n,i,u)!=-1};t?t(String.prototype,"includes",{value:n,configurable:!0,writable:!0}):String.prototype.includes=n;}(),String.prototype.startsWith||!function(){var r=function(){try{var r={},t=Object.defineProperty,e=t(r,r,r)&&t;}catch(r){}return e}(),t={}.toString,e=function(r){if(null==this){ throw TypeError(); }var e=this+"";if(r&&"[object RegExp]"==t.call(r)){ throw TypeError(); }var n=e.length,o=r+"",i=o.length,a=arguments.length>1?arguments[1]:void 0,c=a?+a:0;c!=c&&(c=0);var u=Math.min(Math.max(c,0),n);if(i+u>n){ return!1; }for(var l=-1;++l<i;){ if(e.charCodeAt(u+l)!=o.charCodeAt(l)){ return!1; } }return!0};r?r(String.prototype,"startsWith",{value:e,configurable:!0,writable:!0}):String.prototype.startsWith=e;}(),String.prototype.endsWith||!function(){var r=function(){try{var r={},t=Object.defineProperty,e=t(r,r,r)&&t;}catch(r){}return e}(),t={}.toString,e=function(r){if(null==this){ throw TypeError(); }var e=this+"";if(r&&"[object RegExp]"==t.call(r)){ throw TypeError(); }var n=e.length,o=r+"",i=o.length,a=n;if(arguments.length>1){var c=arguments[1];void 0!==c&&(a=c?+c:0,a!=a&&(a=0));}var u=Math.min(Math.max(a,0),n),l=u-i;if(l<0){ return!1; }for(var h=-1;++h<i;){ if(e.charCodeAt(l+h)!=o.charCodeAt(h)){ return!1; } }return!0};r?r(String.prototype,"endsWith",{value:e,configurable:!0,writable:!0}):String.prototype.endsWith=e;}(),String.fromCodePoint||!function(){var r=function(){try{var r={},t=Object.defineProperty,e=t(r,r,r)&&t;}catch(r){}return e}(),t=String.fromCharCode,e=Math.floor,n=function(r){
var arguments$1 = arguments;
var n,o,i=16384,a=[],c=-1,u=arguments.length;if(!u){ return""; }for(var l="";++c<u;){var h=+arguments$1[c];if(!isFinite(h)||h<0||h>1114111||e(h)!=h){ throw RangeError("Invalid code point: "+h); }h<=65535?a.push(h):(h-=65536,n=(h>>10)+55296,o=h%1024+56320,a.push(n,o)),(c+1==u||a.length>i)&&(l+=t.apply(null,a),a.length=0);}return l};r?r(String,"fromCodePoint",{value:n,configurable:!0,writable:!0}):String.fromCodePoint=n;}(),Object.defineProperty(String,"raw",{configurable:!0,enumerable:!1,writable:!0,value:function(t,e){var n;t=null!=t?t:{},e=arguments.length>1?r(arguments).slice(1):[];try{n=r(t.raw);}catch(r){throw new TypeError("Cannot convert undefined or null to object")}return n.map(function(r,n){return t.raw.length<=n?r:null!=e[n-1]?e[n-1]+r:r}).join("")}});}();

'use strict';

/**
* @name module:altspace/components.n-sound
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Play a sound from a particular location. Limiting sound duration to 5 seconds
* or less is recommended to prevent hitching when the sound loads. @aframe
* @example <a-entity n-sound='res: effects/fanfare-start; on: begin'></a-entity>
*/
var NSound = (function (NativeComponent$$1) {
	function NSound(){ NativeComponent$$1.call(this, 'n-sound'); }

	if ( NativeComponent$$1 ) NSound.__proto__ = NativeComponent$$1;
	NSound.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NSound.prototype.constructor = NSound;

	var prototypeAccessors = { schema: {} };
	prototypeAccessors.schema.get = function (){
		return {

			/**
			* Play the sound given by the `src` or `res` property from the location
			* of the entity.
			* The resource identifier for a built-in sound clip.
			* @instance
			* @member {string} res
			* @memberof module:altspace/components.n-sound
			*/
			res: { type: 'string' },

			/**
			* A URL to an external sound clip. The sound can be in WAV, OGG or MP3 format. However, only
			* WAV is supported on all platforms. MP3 is supported on Gear VR and OGG is supported on desktop.
			* @instance
			* @member {string} src
			* @memberof module:altspace/components.n-sound
			*/
			src: { type: 'string' },

			/**
			* The name of the event that will play this sound clip.
			* @instance
			* @member {string} on
			* @memberof module:altspace/components.n-sound
			*/
			on: { type: 'string' },

			/**
			* Tells the clip to loop back to the beginning of the clip once it's finished.
			* @instance
			* @member {boolean} loop
			* @default false
			* @memberof module:altspace/components.n-sound
			*/
			loop: { type: 'boolean' },

			/**
			* The volume of the clip, from [0,1].
			* @instance
			* @member {number} volume
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			volume: { type: 'number', default: 1 },

			/**
			* Tells the clip to start automatically when the scene loads, instead of waiting for `playSound()`.
			* @instance
			* @member {boolean} autoplay
			* @default false
			* @memberof module:altspace/components.n-sound
			*/
			autoplay: { type: 'boolean' },

			/**
			* Tells the clip to clean itself up when it
			* finishes playing. Allows for overlapping instances of the sound.
			* @instance
			* @member {boolean} oneshot
			* @default false
			* @memberof module:altspace/components.n-sound
			*/
			oneshot: { type: 'boolean' },

			/**
			* How spatialized a sound is, from [0,1].
			* A value of 1 will be fully localized, and the sound will pan left and
			* right as you turn your head. A value of 0 makes it non-spatialized, and
			* it will always be heard in both ears.
			* @instance
			* @member {number} spatialBlend
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			spatialBlend: { type: 'float', default: 1 },

			/**
			* The speed multiplier for the sound. 0.5 is one octave down, and 2 is one octave up.
			* @instance
			* @member {number} pitch
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			pitch: { type: 'float', default: 1 },

			/**
			* Inside this distance in meters, the sound is at full volume.
			* @instance
			* @member {number} minDistance
			* @default 1
			* @memberof module:altspace/components.n-sound
			*/
			minDistance: { type: 'float', default: 1 },

			/**
			* If rolloff is 'logarithmic', the sound will stop attenuating at this distance in meters.
			* If rolloff is 'linear' or 'cosine', the sound will be silent at this distance.
			* @instance
			* @member {number} maxDistance
			* @default 12
			* @memberof module:altspace/components.n-sound
			*/
			maxDistance: { type: 'float', default: 12 },

			/**
			* Set this to 'linear' or 'cosine' if you want to cut sounds off at a maxDistance.
			* @instance
			* @member {string} rolloff
			* @default "logarithmic"
			* @memberof module:altspace/components.n-sound
			*/
			rolloff: { type: 'string', default: 'logarithmic' },
		};
	};

	NSound.prototype.init = function init ()
	{
		var src = this.data.src;
		if (src && !src.startsWith('http')) {
			if (src.startsWith('/')) {
				this.data.src = location.origin + src;
			}
			else {
				var currPath = location.pathname;
				if (!currPath.endsWith('/')) {
					currPath = location.pathname.split('/').slice(0, -1).join('/') + '/';
				}
				this.data.src = location.origin + currPath + src;
			}

		}
		NativeComponent$$1.prototype.init.call(this);
	};

	NSound.prototype.update = function update (oldData)
	{
		NativeComponent$$1.prototype.update.call(this, oldData);
		if (this.playHandler) {
			this.el.removeEventListener(oldData.on, this.playHandler);
		}

		if (this.data.on) {
			this.playHandler = this.playSound.bind(this);
			this.el.addEventListener(this.data.on, this.playHandler);
		}
	};

	NSound.prototype.remove = function remove ()
	{
		NativeComponent$$1.prototype.remove.call(this);
		if (this.playHandler) {
			this.el.removeEventListener(this.data.on, this.playHandler);
		}
	};

	/**
	* Stop the playing sound, and preserve position in clip.
	* @fires module:altspace/components.n-sound#sound-paused
	*/
	NSound.prototype.pauseSound = function pauseSound () {
		this.callComponent('pause');

		this.el.emit('sound-paused');
	};

	/**
	* Start the sound playing.
	* @fires module:altspace/components.n-sound#sound-played
	*/
	NSound.prototype.playSound = function playSound () {
		this.callComponent('play');

		this.el.emit('sound-played');
	};

	/**
	* Jump to a position in the clip.
	* @param {number} time - The time in milliseconds to jump to.
	*/
	NSound.prototype.seek = function seek (time) {
		this.callComponent('seek', {time: time});
	};

	Object.defineProperties( NSound.prototype, prototypeAccessors );

	return NSound;
}(NativeComponent));

'use strict';

/**
* @name module:altspace/components.n-layout-browser
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Spawn a browser or enclosure during the "layout" phase when a space is first created or reset. 
* Layout browsers can only be used by apps that are set as the default app in a space.
* @aframe
*/
var NLayoutBrowser = (function (NativeComponent$$1) {
	function NLayoutBrowser(){ NativeComponent$$1.call(this, 'n-layout-browser'); }

	if ( NativeComponent$$1 ) NLayoutBrowser.__proto__ = NativeComponent$$1;
	NLayoutBrowser.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NLayoutBrowser.prototype.constructor = NLayoutBrowser;

	var prototypeAccessors = { schema: {} };
	prototypeAccessors.schema.get = function (){
		return {
			/**
			* An absolute URL that you want to load in the browser.
			* @instance
			* @member {string} url
			* @memberof module:altspace/components.n-layout-browser
			*/
			url: { default: 'about:blank'},
			/**
			* Whether the browser is a three-dimensional browser that can contain other apps.
			* @instance
			* @default false
			* @member {bool} isEnclosure
			* @memberof module:altspace/components.n-layout-browser
			*/
			isEnclosure: { default: false }
		};
	};

	Object.defineProperties( NLayoutBrowser.prototype, prototypeAccessors );

	return NLayoutBrowser;
}(NativeComponent));

/**
* @name module:altspace/components.n-gltf
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Load a 3D model as a native asset, and attach it to this node.
* As a native asset, the model will be inaccessible from javascript, but
* may have better performance, materials, and colliders than normal SDK objects.
* This feature is a work in progress, with improvements going out periodically.
* Because of the higher-fidelity material system, using this feature may cause
* framerates to drop, so proceed with caution. @aframe
*/
var NGLTF = (function (NativeComponent$$1) {
	function NGLTF() {NativeComponent$$1.call(this, 'n-gltf'); }

	if ( NativeComponent$$1 ) NGLTF.__proto__ = NativeComponent$$1;
	NGLTF.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NGLTF.prototype.constructor = NGLTF;

	var prototypeAccessors = { schema: {} };
	prototypeAccessors.schema.get = function () {
		return {
			/**
			* The URL of a glTF model.
			* @instance
			* @member {string} url
			* @memberof module:altspace/components.n-gltf
			*/
			url: { type: 'string' },

			/**
			* If the model file describes multiple scenes, load this one instead of the default.
			* @instance
			* @member {int} sceneIndex
			* @memberof module:altspace/components.n-gltf
			*/
			sceneIndex: { type: 'int' }
		};
	};
	NGLTF.prototype.update = function update (){
		var mesh = this.mesh || this.el.object3DMap.mesh;
		var data = Object.assign({}, this.data);
		data.url = new Url(data.url).toString();

		if(this.sendUpdates){
			altspace.updateNativeComponent(mesh, this.name, data);
		}
	};

	Object.defineProperties( NGLTF.prototype, prototypeAccessors );

	return NGLTF;
}(NativeComponent));

/**
* @name module:altspace/components.n-text
* @class
* @extends module:altspace/components.NativeComponent
* @classdesc Creates dynamic 2D text on the entity. The text will wrap automatically based on the width and height provided.
* This text will be clearer than texture-based text and more performant than geometry-based text. @aframe
* @example <a-entity n-text='text: Hello world!;'></a-entity>
*/
var NText = (function (NativeComponent$$1) {
	function NText(){ NativeComponent$$1.call(this, 'n-text'); }

	if ( NativeComponent$$1 ) NText.__proto__ = NativeComponent$$1;
	NText.prototype = Object.create( NativeComponent$$1 && NativeComponent$$1.prototype );
	NText.prototype.constructor = NText;

	var prototypeAccessors = { schema: {} };
	prototypeAccessors.schema.get = function (){
		return {
			/**
			* The text to be drawn.
			* @instance
			* @member {string} text
			* @memberof module:altspace/components.n-text
			*/
			text: { default: '', type: 'string' },

			/**
			* The height of the letters. 10pt ~= 1m
			* @instance
			* @member {int} fontSize
			* @default 10
			* @memberof module:altspace/components.n-text
			*/
			fontSize: { default: 10, type: 'int' },//roughly a meter tall

			/**
			* The width of the text area in meters. If the
			* text is wider than this value, the overflow will be wrapped to the next line.
			* @instance
			* @member {number} width
			* @default 10
			* @memberof module:altspace/components.n-text
			*/
			width: { default: 10, type: 'number' },//in meters

			/**
			* The height of the text area in meters. If the
			* text is taller than this value, the overflow will be cut off.
			* @instance
			* @member {number} height
			* @default 1
			* @memberof module:altspace/components.n-text
			*/
			height: { default: 1, type: 'number' },//in meters

			/**
			* The horizontal anchor point for the text. Can be `left`, `middle`, or `right`.
			* @instance
			* @member {string} horizontalAlign
			* @default "middle"
			* @memberof module:altspace/components.n-text
			*/
			horizontalAlign: { default: 'middle'},

			/**
			* The vertical anchor point for the text. Can be `top`, `middle`, or `bottom`.
			* @instance
			* @member {string} verticalAlign
			* @default "middle"
			* @memberof module:altspace/components.n-text
			*/
			verticalAlign: { default: 'middle'}
		};
	};

	Object.defineProperties( NText.prototype, prototypeAccessors );

	return NText;
}(NativeComponent));

/**
* @name module:altspace/components.collapse-model
* @class
* @extends module:altspace/components.AFrameComponent
* @classdesc Reaches into a model's hierarchy and directly assigns the first mesh found
* to the containing entity. This is mostly necessary for use alongside native
* components like [n-skeleton-parent]{@link module:altspace/components.n-skeleton-parent}. @aframe
* @example <a-gltf-model src='#thing' collapse-model n-skeleton-parent='part: hand'></a-gltf-model>
*/
var CollapseModel = (function (AFrameComponent$$1) {
	function CollapseModel () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) CollapseModel.__proto__ = AFrameComponent$$1;
	CollapseModel.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	CollapseModel.prototype.constructor = CollapseModel;

	CollapseModel.prototype.init = function init ()
	{
		var this$1 = this;

		function getFirstMesh(obj){
			if(obj.isMesh)
				{ return obj; }
			else if(obj.children.length === 0)
				{ return null; }
			else
				{ return obj.children.reduce(function (m,o) { return m || getFirstMesh(o); }, null); }
		}

		this.el.addEventListener('model-loaded', function () {
			this$1.el.setObject3D('mesh', getFirstMesh(this$1.el.object3DMap.mesh));
		});
	};

	return CollapseModel;
}(AFrameComponent));

// kill default visible component, replace with clone
if(window.AFRAME){
	delete AFRAME.components['visible'];
}

var Visible = (function (AFrameComponent$$1) {
	function Visible () {
		AFrameComponent$$1.apply(this, arguments);
	}

	if ( AFrameComponent$$1 ) Visible.__proto__ = AFrameComponent$$1;
	Visible.prototype = Object.create( AFrameComponent$$1 && AFrameComponent$$1.prototype );
	Visible.prototype.constructor = Visible;

	var prototypeAccessors = { schema: {} };

	prototypeAccessors.schema.get = function (){ return {default: true}; };
	Visible.prototype.init = function init (){
		this.el.addEventListener('model-loaded', this.update.bind(this));
	};
	Visible.prototype.update = function update (){
		var this$1 = this;

		this.el.object3D.traverse(function (obj) { return obj.visible = this$1.data; });
	};

	Object.defineProperties( Visible.prototype, prototypeAccessors );

	return Visible;
}(AFrameComponent));

/**
* AltspaceVR supports the 3D scene-building tool [A-Frame]{@link https://aframe.io/docs/0.7.0/introduction/}.
* In addition to the set of [default components provided by A-Frame]{@link https://aframe.io/docs/0.7.0/core/component.html},
* this SDK provides a set of components to add AltspaceVR compatibility and additional
* functionality to the toolset. At a minimum, A-Frame apps will need the [altspace]{@link module:altspace/components.altspace}
* component on the `<a-scene>` tag to function as an AltspaceVR app.
* @module module:altspace/components
* @example
* <html>
*   <head>
*     <title>My A-Frame Scene</title>
*     <script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>
*     <script src="https://cdn.rawgit.com/AltspaceVR/AltspaceSDK/v2.8.0/dist/altspace.min.js"></script>
*   </head>
*   <body>
*     <a-scene altspace>
*       <a-entity geometry="primitive: box" material="color: #C03546"></a-entity>
*     </a-scene>
*   </body>
* </html>
*/

'use strict';

if (window.AFRAME)
{
	registerComponentClass('altspace-cursor-collider', AltspaceCursorCollider);
	registerComponentClass('altspace-tracked-controls', AltspaceTrackedControls);
	registerComponentClass('altspace', AltspaceComponent);
	registerSystemClass('sync-system', SyncSystem);
	registerComponentClass('sync-color', SyncColor);
	registerComponentClass('sync-transform', SyncTransform);
	registerComponentClass('sync', SyncComponent);
	registerComponentClass('sync-n-sound', SyncNSound);
	registerComponentClass('sync-n-skeleton-parent', SyncNSkeletonParent);
	registerComponentClass('wire', Wire);
	registerComponentClass('one-per-user', OnePerUser);
	registerComponentClass('instantiator', Instantiator);
	registerComponentClass('n-object', NObject);
	registerComponentClass('n-portal', NPortal);
	registerComponentClass('n-spawner', NSpawner);
	registerComponentClass('n-text', NText);
	registerComponentClass('n-billboard', NBillboard);
	registerComponentClass('n-skeleton-parent', NSkeletonParent);
	registerComponentClass('n-cockpit-parent', NCockpitParent);
	registerComponentClass('n-container', NContainer);
	registerComponentClass('n-sound', NSound);
	registerComponentClass('n-sphere-collider', NSphereCollider);
	registerComponentClass('n-box-collider', NBoxCollider);
	registerComponentClass('n-capsule-collider', NCapsuleCollider);
	registerComponentClass('n-mesh-collider', NMeshCollider);
	registerComponentClass('n-layout-browser', NLayoutBrowser);
	registerComponentClass('n-gltf', NGLTF);
	registerComponentClass('collapse-model', CollapseModel);
	registerComponentClass('visible', Visible);
}




var components_lib = Object.freeze({
	AltspaceComponent: AltspaceComponent,
	AltspaceCursorCollider: AltspaceCursorCollider,
	AltspaceTrackedControls: AltspaceTrackedControls,
	SyncSystem: SyncSystem,
	SyncComponent: SyncComponent,
	SyncColor: SyncColor,
	SyncTransform: SyncTransform,
	SyncNSound: SyncNSound,
	Wire: Wire,
	OnePerUser: OnePerUser,
	Instantiator: Instantiator,
	SyncNSkeletonParent: SyncNSkeletonParent,
	NObject: NObject,
	NPortal: NPortal,
	NSpawner: NSpawner,
	NText: NText,
	NBillboard: NBillboard,
	NSkeletonParent: NSkeletonParent,
	NCockpitParent: NCockpitParent,
	NContainer: NContainer,
	NSound: NSound,
	NSphereCollider: NSphereCollider,
	NBoxCollider: NBoxCollider,
	NCapsuleCollider: NCapsuleCollider,
	NMeshCollider: NMeshCollider,
	NLayoutBrowser: NLayoutBrowser,
	CollapseModel: CollapseModel,
	NGLTF: NGLTF
});

/* global Url */
/**
 * The Sync utility is currently based on Firebase. It provides a quick way
 * to synchronize apps between users (even when they are running outside of
 * AltspaceVR).
 * During the SDK beta, please consider all data stored with the sync
 * utility to be ephemeral (it may be cleared or clobbered at any time).
 * You do not need a Firebase account to use the Sync utility.
 *
 *
 * Refer to the [Firebase API documentation](https://www.firebase.com/docs/web/api/)
 * when working with the sync instance.
 * @module altspace/utilities/sync
 */

var inAltspace = altspace && altspace.inClient;
var canonicalUrl = getCanonicalUrl();

function dashEscape(keyName) {
	return keyName ? encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-') : null;
}

function getCanonicalUrl() {
	var canonicalElement = document.querySelector('link[rel=canonical]');
	return canonicalElement ? canonicalElement.href : window.location.href;
}

function getProjectId(appId, authorId, canonicalUrl) {
	return dashEscape(authorId || canonicalUrl) + ':' + dashEscape(appId || '');
}


/**
* Retreived
* via [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync.connect}.
* @class module:altspace/utilities/sync~Connection
* @memberof module:altspace/utilities/sync
*/

/**
* (In-client only) A Firebase reference for the current user (on a per app basis). This can be used for things like a persistent inventory or personal highscores.
* @instance
* @member {Firebase} user
* @memberof module:altspace/utilities/sync~Connection
*/

/**
* A Firebase reference to the current instance of the app.
* This will change if the query paramater is removed through navigation, rebeaming, the space timing out, or other reasons.
* This can be used as an input to SceneSync
* @instance
* @member {Firebase} instance
* @memberof module:altspace/utilities/sync~Connection
*/

/**
* (In-client only) A Firebase reference for the current space. Especially useful if multiple apps / instances need to communicate inside the space.
* @instance
* @member {Firebase} space
* @memberof module:altspace/utilities/sync~Connection
*/

/**
* A Firebase reference for the app.
* This can be used for things like persistent high-scores, dynamic configuration, or inter-instance communication.
* @instance
* @member {Firebase} app
* @memberof module:altspace/utilities/sync~Connection
*/


/**
* Connect to a sync session to obtain Firebase references that can be used for syncronization of real-time and persistent state.
* Returns a promise that will fulfill with a [Connection]{@link module:altspace/utilities/sync~Connection}.
*
* Note: Calling this method will cause a reload of the app, since it adds an 'altspace-sync-instance' query
* parameter to the app's url. Best practice is to establish a sync connection first, before you load any resources
* or render anything in your app. The promise returned by this method will be rejected the first time it is called,
* while the app reloads with the new sync instance id.
*
* @method connect
* @param {Object} config
* @param {String} config.authorId A unique identifier for yourself or your organization
* @param {String} config.appId The name of your app
* @param {String} [config.baseRefUrl] Override the base reference. Set this to use your own Firebase.
* @param {String} [config.instanceId] Override the instanceId. Can also be overriden using a query parameter.
* @param {String} [config.spaceId] Override the spaceId. Can also be overriden using a query parameter.
* @param {String} [config.userId] Override the userId. Can also be overriden using a query parameter.
* @return {Promise}
* @memberof module:altspace/utilities/sync
**/
//todo clients
function connect(config)
{
	config = config || {};

	var url = new Url();

	// Our ref used for example apps. Data may be cleared periodically.
	var baseRefUrl = config.baseRefUrl || 'https://altspace-apps.firebaseio.com/apps/examples/';
	var baseRef = new Firebase$1(baseRefUrl);

	// Gather query paramaters (some may only be used as testing overrides)
	var instanceId = config.instanceId || url.query['altspace-sync-instance'];
	var spaceId = config.spaceId || url.query['altspace-sync-space'];
	var userId = config.userId || url.query['altspace-sync-user'];

	if (!config.appId || !config.authorId) {
		throw new Error('Both the appId and authorId must be provided to connect.');
	}

	var tasks = [];
	if (inAltspace) {
		if (!spaceId) { tasks.unshift(altspace.getSpace()); }
		if (!userId) { tasks.unshift(altspace.getUser()); }
	}

	var refs = {};
	var projectId = getProjectId(config.appId, config.authorId, canonicalUrl);
	refs.app = baseRef.child(projectId).child('app');
	var instancesRef = refs.app.child('instances');
	if(instanceId) {
		refs.instance = instancesRef.child(instanceId);
	}
	else {
		refs.instance = instancesRef.push();
		instanceId = refs.instance.key();
		url.query['altspace-sync-instance'] = instanceId;
		window.location.href = url.toString();
		// bail early and allow the page to reload
		return Promise.reject(new Error('Sync instance id not found. Reloading app with new sync id.'));
	}

	return Promise.all(tasks).then(function (results) {
		if (inAltspace) {
			if (!spaceId) { spaceId = results.pop().sid; }
			if (!userId) { userId = results.pop().userId; }
		}

		spaceId = dashEscape(spaceId);
		userId = dashEscape(userId);
		instanceId = dashEscape(instanceId);

		refs.space = spaceId ? refs.app.child('spaces').child(spaceId) : null;
		refs.user = userId ? refs.app.child('users').child(userId) : null;

		var connection = refs;
		return connection;
	});
}




var sync = Object.freeze({
	connect: connect
});

/**
* Detects mouse move/up/down events, raycasts to find intersected objects,
* then dispatches cursor move/up/down/enter/leave events that mimics
* Altspace events.
* @module altspace/utilities/shims/cursor
*/
'use strict';

var scene;
var camera;
var domElem;

var overObject;

var raycaster = new THREE.Raycaster();

/**
 * Initializes the cursor module
 * @static
 * @method init
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera - Camera used for raycasting.
 * @param {Object} [options] - An options object
 * @param {THREE.WebGLRenderer} [options.renderer] - If supplied, applies cursor movement to render target
 *	instead of entire client
 * @memberof module:altspace/utilities/shims/cursor
 */
function init(_scene, _camera, _params) {
	if (!_scene || !(_scene instanceof THREE.Scene)) {
		throw new TypeError('Requires THREE.Scene argument');
	}
	if (!_camera || !(_camera instanceof THREE.Camera)) {
		throw new TypeError('Requires THREE.Camera argument');
	}
	scene = _scene;
	camera = _camera;

	var p = _params || {};
	domElem = p.renderer && p.renderer.domElement || window;

	domElem.addEventListener('mousedown', mouseDown, false);
	domElem.addEventListener('mouseup', mouseUp, false);
	domElem.addEventListener('mousemove', mouseMove, false);
}

function mouseDown(event) {

	var intersection = findIntersection(event);
	if (!intersection || !intersection.point) { return; }

	var cursorEvent = createCursorEvent('cursordown', intersection);
	intersection.object.dispatchEvent(cursorEvent);
}

function mouseUp(event) {
	var intersection = findIntersection(event);

	var cursorEvent = createCursorEvent('cursorup', intersection);

	if (intersection) {
		intersection.object.dispatchEvent(cursorEvent);
	} else {
		scene.dispatchEvent(cursorEvent);
	}
}

function mouseMove(event) {
	var intersection = findIntersection(event);

	var cursorEvent = createCursorEvent('cursormove', intersection);//TODO improve and don't fire only on scene
	scene.dispatchEvent(cursorEvent);

	var object = intersection ? intersection.object : null;
	if (overObject != object) {
		if (overObject) {
			cursorEvent = createCursorEvent('cursorleave', intersection);
			overObject.dispatchEvent(cursorEvent);
		}

		if (object) {
			cursorEvent = createCursorEvent('cursorenter', intersection);
			object.dispatchEvent(cursorEvent);
		}

		overObject = object;
	}
}

function createCursorEvent(type, intersection) {
	return {
		type: type,
		bubbles: true,
		target: intersection ? intersection.object : null,
		ray: {
			origin: raycaster.ray.origin.clone(),
			direction: raycaster.ray.direction.clone()
		},
		point: intersection ? intersection.point.clone() : null
	}
}

function findIntersection(mouseEvent) {
	var mouse = new THREE.Vector2();
	mouse.x = (mouseEvent.offsetX / (domElem.width || domElem.innerWidth)) * 2 - 1;
	mouse.y = -(mouseEvent.offsetY / (domElem.height || domElem.innerHeight)) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersections = raycaster.intersectObjects(scene.children, true);

	// return the first object with an enabled collider
	return intersections.find(function(e){
		return !e.object.userData
			|| !e.object.userData.altspace
			|| !e.object.userData.altspace.collider
			|| e.object.userData.altspace.collider.enabled !== false;
	}) || null;
}




var cursor = Object.freeze({
	init: init
});

'use strict';

/**
* Simulation is a helper class that lets you quickly setup a three.js app with support for AltspaceVR. It creates a basic scene for you and starts the render and behavior loop.
*
* If all of your application logic is in behaviors, you do not need to create any additional requestAnimationFrame loops.
*
* It also automatically uses the WebGL renderer when running in a
* desktop browser and emulates cursor events with mouse clicks.
* @class Simulation
* @param {Object} [config] Optional parameters.
* @param {Boolean} [config.auto=true] Automatically start the render loop.
* @memberof module:altspace/utilities
*/
var Simulation = function Simulation(config)
{
	if ( config === void 0 ) config = {auto: true};

	this._scene = null;
	this._renderer = null;
	this._camera = null;

	var usingAFrame = window.AFRAME && document.querySelector('a-scene');

	if(usingAFrame)
	{
		var ascene = document.querySelector('a-scene');
		this._scene = ascene.object3D;
		this._renderer = ascene.renderer;

		var acamera = document.querySelector('a-camera');
		if(acamera)
			{ this._camera = acamera.object3D; }
	}
	else if (window.altspace && altspace.inClient)
	{
		this._scene = new THREE.Scene();
		this._renderer = altspace.getThreeJSRenderer();
		this._camera = new THREE.PerspectiveCamera(); // TODO: change from shim to symbolic
	}
	else {
		this._setupWebGL();
	}

	if(config.auto && !usingAFrame)
		{ this.loop(); }
};

var prototypeAccessors$1 = { scene: {},renderer: {},camera: {} };

Simulation.prototype._setupWebGL = function _setupWebGL ()
{
	var scene = this._scene = new THREE.Scene();
	var renderer = this._renderer = new THREE.WebGLRenderer({antialias: true});
	var camera = this._camera = new THREE.PerspectiveCamera();

	document.addEventListener("DOMContentLoaded", function (event) {
		document.body.style.margin = '0px';
		document.body.style.overflow = 'hidden';
		renderer.setClearColor('#035F72');
		var container = document.createElement('div');
		document.body.appendChild(container);
		container.appendChild(renderer.domElement);
	});

	function resizeRender(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	window.addEventListener('resize', resizeRender);
	resizeRender();

	camera.position.z = 500;
	camera.fov = 45;
	camera.near = 1;
	camera.far = 2000;
	scene.add(camera);
	scene.add(new THREE.AmbientLight('white'));

	// shim cursor
	this.cursor = init(scene, camera);
};

/**
* Begin the simulation. This loop is begun automatically by default.
*/
Simulation.prototype.loop = function loop ()
{
	window.requestAnimationFrame(this.loop.bind(this));

	if(this.scene.updateAllBehaviors)
		{ this.scene.updateAllBehaviors(); }

	this.renderer.render(this.scene, this.camera);
};

/**
* The simulation scene.
* @readonly
* @instance
* @member {THREE.Scene} scene
* @memberof module:altspace/utilities.Simulation
*/
prototypeAccessors$1.scene.get = function (){ return this._scene; };

/**
* The renderer being used.
* @readonly
* @instance
* @member {(THREE.WebGLRenderer|AltRenderer)} renderer
* @memberof module:altspace/utilities.Simulation
*/
prototypeAccessors$1.renderer.get = function (){ return this._renderer; };

/**
* The camera being used by the WebGL renderer.
* @readonly
* @instance
* @member {Three.Camera} camera
* @memberof module:altspace/utilities.Simulation
*/
prototypeAccessors$1.camera.get = function (){ return this._camera; };

Object.defineProperties( Simulation.prototype, prototypeAccessors$1 );

'use strict';

var loader;
var TRACE;
var baseUrl = '';
var crossOrigin = '';//assigned to THREE.MTLLoader.crossOrigin

var LoadRequest = function LoadRequest(){
	this.objUrls = [];//Paths to model geometry file, in Wavefront OBJ format.
	this.mtlUrls = [];//Paths to model materials file, in Wavefront MTL format.
	this.objects = [];//objects[i] is result of loader.load(objUrl[i], mtlUrl[i])
	this.error = null;//String indicating loading error with at least one file.
	this.objectsLoaded = 0;//Used internally to determine when loading complete.
};//end of LoadRequest

function init$1(params){
	var p = params || {};
	TRACE = p.TRACE || false;
	if (p.crossOrigin) { crossOrigin = p.crossOrigin; }
	if (p.baseUrl) { baseUrl = p.baseUrl; }
	if (baseUrl.slice(-1) !== '/') { baseUrl += '/'; }

	loader = new altspace.utilities.shims.OBJMTLLoader();
	loader.crossOrigin = crossOrigin;
	if (TRACE) { console.log('MultiLoader initialized with params', params); }
}

function load(loadRequest, onComplete){
	var req = loadRequest;
	var start = Date.now();
	if (!req || !(req instanceof LoadRequest)){
		throw new Error('MultiLoader.load expects first arg of type LoadRequest');
	}
	if (!onComplete || typeof(onComplete) !== 'function'){
		throw new Error('MultiLoader.load expects second arg of type function');
	}
	if (!req.objUrls || !req.mtlUrls || req.objUrls.length !== req.mtlUrls.length){
		throw new Error('MultiLoader.load called with bad LoadRequest');
	}
	var reqCount = req.objUrls.length;
	if (TRACE) { console.log('Loading models...'); }
	for (var i=0; i < reqCount; i++){
		var loadModel = function(req, i){//We need i in the closure to store result.
			var objUrl = baseUrl + req.objUrls[i];
			var mtlUrl = baseUrl + req.mtlUrls[i];
			if (TRACE) { console.log('Loading obj:'+objUrl+', mtl:'+mtlUrl); }
			loader.load(objUrl, mtlUrl, function(object3d){//onLoaded
				req.objects[i] = object3d;
				req.objectsLoaded++;
				if(req.objectsLoaded === reqCount){
					var elapsed = ((Date.now()-start)/1000.0).toFixed(2);
					if (TRACE) { console.log('Loaded '+reqCount+' models in '+elapsed+' seconds'); }
					onComplete();
				}
			}, onProgress, function(){//onError
				var url = xhr.target.responseURL || '';
				req.error = 'Error loading file '+url;
			});
		};
		loadModel(req, i);
	}
}

function onProgress(xhr){
	if (xhr.lengthComputable && xhr.target.responseURL) {
		//Skip progress log if no xhr url, meaning it's a local file.
		var percentComplete = xhr.loaded / xhr.total * 100;
		var filename = xhr.target.responseURL.split('/').pop();
		if (TRACE) { console.log('...'+filename+' '+Math.round(percentComplete,2)+'% downloaded'); }
	}
}




var multiloader = Object.freeze({
	init: init$1,
	load: load,
	LoadRequest: LoadRequest
});

/**
 * Utilities to help build AltspaceVR apps on CodePen.io.
 * @module altspace/utilities/codePen
 */

var name = 'VR CodePen';
var inTile = window.name && window.name.slice(0, 4) === 'pen-';
var inVR = !!window.altspace.inClient;
var inCodePen = !!location.href.match('codepen.io/');

function printDebugInfo() {
	console.log("In a tile: " + inTile);
	console.log("In VR: " + inVR);
}

/**
 * Will stop code exection and post a message informing the user to
 * open the example in VR
 * @method ensureInVR
 * @memberof module:altspace/utilities/codePen
 */
function ensureInVR() {
	if (inTile || !inVR) //inTile && inAltspace
	{
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = "@import url(https://fonts.googleapis.com/css?family=Open+Sans:800);.altspace-info{text-align:center;font-family:'Open Sans',sans-serif;line-height:.5}.altspace-vr-notice{color:rgba(0,0,0,.7);font-size:5vw}.altspace-pen-name{font-size:7vw}";
		document.head.appendChild(css);

		document.body.style.background = Please.make_color({ seed: getPenId() });

		var info = document.createElement("div");
		info.className = "altspace-info";
		document.body.appendChild(info);

		var nameEl = document.createElement("span");
		nameEl.className = "altspace-pen-name";
		nameEl.innerHTML = '<p>' + name.toUpperCase() + '</p>';
		info.appendChild(nameEl);

		if (inTile) {
			var errorMsg = 'VR mode does not support preview tiles. Stopping code execution.';
			console.log('ERROR: ' + errorMsg);
			throw new Error(errorMsg);
		}

		if (!inVR) {

			var launchEl = document.createElement("span");
			launchEl.className = "altspace-vr-notice";
			launchEl.innerHTML = '<p>View</p>';
			info.insertBefore(launchEl, nameEl);

			var notice = document.createElement("span");
			notice.className = "altspace-vr-notice";
			notice.innerHTML = '<p>in <a href="http://altvr.com"> AltspaceVR </a></p>';
			info.appendChild(notice);


			var errorMsg = 'Not in VR mode. Stopping code execution.';
			if (inTile) {
				console.log('ERROR: ' + errorMsg);//thrown error message not displayed in console when inTile, log it
			}
			throw new Error(errorMsg);
		}
		return;

	}
}

/**
 * Sets the name to be used by ensureInVR()
 * @method setName
 * @param {String} name
 * @memberof module:altspace/utilities/codePen
 */
function setName(n) {//TODO: A better method for this would be awesome
	name = n;
}

function getParsedUrl() {
	var canonicalElement = document.querySelector('link[rel=canonical]');
	var fullUrl = canonicalElement ? canonicalElement.href : window.location.href;
	return new Url(fullUrl);
}


/**
 * Returns the pen ID, useful for setting the sync instanceId.
 * @method getPenId
 * @return {String}
 * @memberof module:altspace/utilities/codePen
 */
function getPenId() {
	var url = getParsedUrl();
	var splitPath = url.path.split('/');
	var id = splitPath[splitPath.length - 1];
	return id;
}

/**
 * Returns the pen author ID, useful for setting the sync authorId.
 * @method getAuthorId
 * @return {String}
 * @memberof module:altspace/utilities/codePen
 */
function getAuthorId() {
	var url = getParsedUrl();
	var splitPath = url.path.split('/');
	var isTeam = splitPath[1] == 'team';
	var id = isTeam ? 'team-' + splitPath[2] : splitPath[1];
	return id;
}




var codepen = Object.freeze({
	inTile: inTile,
	inVR: inVR,
	inCodePen: inCodePen,
	ensureInVR: ensureInVR,
	setName: setName,
	getPenId: getPenId,
	getAuthorId: getAuthorId,
	printDebugInfo: printDebugInfo
});

'use strict';

/**
* Load an OBJ file and its material definition in one pass.
* @class OBJMTLLoader
* @memberof module:altspace/utilities/shims
*/
var OBJMTLLoader = function OBJMTLLoader () {};

OBJMTLLoader.prototype.load = function load (objFile, mtlFile, callback)
{
	var mtlLoader = new THREE.MTLLoader();
	var baseUrl = mtlFile.split('/').slice(0, -1).join('/');
	mtlLoader.setTexturePath(baseUrl + '/');
	mtlLoader.setCrossOrigin(this.crossOrigin);
	mtlLoader.load(mtlFile, function (materials) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(objFile, callback);
	});
};

/**
* The Altspace SDK adds event bubbling to Three.js' events system.
* Simply include the SDK in your app and add a bubbling property to your event to take advantage of this feature.
*
* AltspaceVR cursor events always make use of this bubbling shim.
*
* @example
* var parent = new THREE.Object3D();
* parent.addEventListener('custom', function () {
*     console.log('received custom event');
* });
* var child = new THREE.Object3D();
* parent.add(child);
* child.dispatchEvent({type: 'custom', bubbles: true});
* // Console log shows 'received custom event'
*
* @module altspace/utilities/shims/bubbling
*/

if(THREE && !altspace.inClient)
{
	THREE.EventDispatcher.prototype.dispatchEvent = dispatchEvent;
	THREE.Object3D.prototype.dispatchEvent = dispatchEvent;
}

function dispatchEvent( event ) {
	var this$1 = this;


	var shouldStopPropagation;
	var shouldStopPropagationImmediately;

	if ( event.bubbles ) {
		event.currentTarget = this;
		event.stopPropagation = function () {
			shouldStopPropagation = true;
		};

		event.stopImmediatePropagation = function () {
			shouldStopPropagationImmediately = true;
		};

	}

	if ( this._listeners ) {

		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];

		if ( listenerArray ) {
			event.target = event.target || this;

			var array = [];
			var length = listenerArray.length;

			for ( var i = 0; i < length; i ++ ) {
				array[ i ] = listenerArray[ i ];
			}

			for ( var i = 0; i < length; i ++ ) {
				array[ i ].call( this$1, event );
				if ( shouldStopPropagationImmediately ) { return; }
			}
		}
	}

	if ( event.bubbles && this.parent && this.parent.dispatchEvent && ! shouldStopPropagation ) {
		dispatchEvent.call( this.parent, event );
	}
}

/**
* @author gavanwilhite / http://gavanwilhite.com
*/

/**
* The AltspaceSDK includes a Behaviors shim that adds Behavior capabilities to
* Three.js.
* It adds methods to Three.js' Scene and Object3D classes which allow you to
* add, remove, retrieve and use Behaviors.
*
* @namespace THREE
*/

/**
* The AltspaceSDK adds Behavior capabilites to Three.js' Scene class.
* @class Scene
* @memberof THREE
*/

/**
* Update the behaviors of all the objects in this Scene.
* @instance
* @method updateAllBehaviors
* @memberof THREE.Scene
*/
THREE.Scene.prototype.updateAllBehaviors = function () {

	var now = performance.now();
	var lastNow = this.__lastNow || now;

	var deltaTime = now - lastNow;

	var self = this;

	//gather objects first so that behaviors can change the hierarchy during traversal without incident
	var objectsWithBehaviors = [];

	this.traverse(function (object3d) {

		if (object3d.__behaviorList) {
			objectsWithBehaviors.push(object3d);
		}

	});

	for (var i = 0, max = objectsWithBehaviors.length; i < max; i++) {
		var object3d = objectsWithBehaviors[i];
		object3d.updateBehaviors(deltaTime, self);
	}

	this.__lastNow = now;

};

/**
* The AltspaceSDK adds Behavior capabilites to Three.js' Object3D class.
* @class Object3D
* @memberof THREE
*/

/**
* Adds the given behavior to this object.
* @instance
* @method addBehavior
* @param {Behavior} behavior Behavior to add.
* @memberof THREE.Object3D
*/
THREE.Object3D.prototype.addBehavior = function(behavior)
{
	this.addBehaviors(behavior);
};

/**
* Adds the given behaviors to this object.
* @instance
* @method addBehaviors
* @param {...Behavior} behavior Behavior to add.
* @memberof THREE.Object3D
*/
THREE.Object3D.prototype.addBehaviors = function()
{
	var behaviors = [], len = arguments.length;
	while ( len-- ) behaviors[ len ] = arguments[ len ];

	this.__behaviorList = this.__behaviorList || [];
	(ref = this.__behaviorList).push.apply(ref, behaviors);
	var ref;
};

/**
* Removes the given behavior from this object. The behavior is disposed if
* possible.
* @instance
* @method removeBehavior
* @param {...Behavior} behavior Behavior to remove.
* @memberof THREE.Object3D
*/
THREE.Object3D.prototype.removeBehavior = function(behavior)
{
	if (!this.__behaviorList || this.__behaviorList.length === 0) { return null; }

	var i = this.__behaviorList.indexOf(behavior);
	if (i !== -1) {
		this.__behaviorList.splice(i, 1);
		try {

			if (behavior.dispose) { behavior.dispose.call(behavior, this); }

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this);
			console.groupEnd();

		}
	}
};

/**
* Removes all behaviors from this object. The behaviors are disposed if
* possible.
* @instance
* @method removeAllBehaviors
* @memberof THREE.Object3D
*/
THREE.Object3D.prototype.removeAllBehaviors = function ()
{
	var this$1 = this;

	if (!this.__behaviorList || this.__behaviorList.length === 0) { return null; }

	for (var i = 0, max = this.__behaviorList.length; i < max; i++) {
		var behavior = this$1.__behaviorList[i];

		try {

			if (behavior.dispose) { behavior.dispose.call(behavior, this$1); }

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this$1);
			console.groupEnd();

		}
	}

	this.__behaviorList.length = 0;
};

/**
* Retrieve a behavior by type.
* @instance
* @method getBehaviorByType
* @param {String} type
* @returns {Behavior}
* @memberof THREE.Object3D
*/
THREE.Object3D.prototype.getBehaviorByType = function(type) {
	var this$1 = this;

	if (!this.__behaviorList || this.__behaviorList.length === 0) { return null; }

	for (var i = 0, max = this.__behaviorList.length; i < max; i++) {
		if (this$1.__behaviorList[i].type === type)
			{ return this$1.__behaviorList[i]; }
	}
};

/**
* Update behaviors on this object.
* @instance
* @method updateBehaviors
* @param {Number} deltaTime Elapsed time in milliseconds
* @memberof THREE.Object3D
*/
THREE.Object3D.prototype.updateBehaviors = function(deltaTime, scene) {
	var this$1 = this;


	if (!this.__behaviorList || this.__behaviorList.length === 0) { return; }

	var toInit = [];
	var toUpdate = this.__behaviorList.slice(); // prevent mutation of the behavior list during this loop

	for (var i = 0, max = this.__behaviorList.length; i < max; i++) {

		var behavior = this$1.__behaviorList[i];
		if (!behavior.__isInitialized) { toInit.push(behavior); }

	}

	//Awake
	for (var i = 0, max = toInit.length; i < max; i++) {

		var behavior = toInit[i];
		try {

			if (behavior.awake) { behavior.awake.call(behavior, this$1, scene); }

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this$1);
			console.groupEnd();

		}

	}

	//Start
	for (var i = 0, max = toInit.length; i < max; i++) {

		var behavior = toInit[i];
		try {

			if (behavior.start) { behavior.start.call(behavior); }

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this$1);
			console.groupEnd();

		}
		behavior.__isInitialized = true;

	}

	//Update
	for (var i = 0, max = toUpdate.length; i < max; i++) {

		var behavior = toUpdate[i];
		try {

			if (behavior.update) { behavior.update.call(behavior, deltaTime); }

		} catch (error) {

			console.group();
			(console.error || console.log).call(console, error.stack || error);
			console.log('[Behavior]');
			console.log(behavior);
			console.log('[Object3D]');
			console.log(this$1);
			console.groupEnd();

		}

	}

};

/**
* @module altspace/utilities/shims
*/
'use strict';




var index = Object.freeze({
	OBJMTLLoader: OBJMTLLoader,
	cursor: cursor
});

'use strict';

/**
* Base class for all behaviors. Use this class as a pattern, but do not use
* directly.
* @memberof module:altspace/utilities/behaviors
*/
var Behavior = function Behavior(){};

var prototypeAccessors$2 = { type: {} };

/**
* The string name of this class. This is used for {@link THREE.Object3D#getBehaviorByType}.
* @instance
* @member {string} type
* @memberof module:altspace/utilities/behaviors.Behavior
*/
prototypeAccessors$2.type.get = function (){
	if(!this._typeWarning){
		console.warn('Behavior', this, 'does not expose type information!',
			'It will not be queryable by getBehaviorByType, which will break',
			'some built-in behaviors.');
		this._typeWarning = true;
	}
	return null; // is normally the name of the type, i.e. "Behavior"
};

/**
* Called when the behavior is attached to an object. Any setup that requires
* the object should be done here, e.g. adding event listeners.
* @param {Object3D} obj - The new parent object
* @param {Scene} scene - The scene the object is a member of
*/
Behavior.prototype.awake = function awake (obj, scene){};

/**
* Called when the behavior is ready to start. This is guaranteed to run after
* all behaviors are awake. Any setup that requires interdependence on other
* behaviors or objects should be done here.
*/
Behavior.prototype.start = function start (){};

/**
* Called every frame after awake/start. Run anything that needs to happen over
* time here, e.g. animations.
* @param {integer} deltaTime - The number of milliseconds elapsed since the
* last update
*/
Behavior.prototype.update = function update (deltaTime){};

/**
* Called when the behavior is removed from its object. Clean up your event
* handlers, etc. here.
* @param {Object3D} obj - The object this behavior was once attached to
*/
Behavior.prototype.dispose = function dispose (obj){};

Object.defineProperties( Behavior.prototype, prototypeAccessors$2 );

'use strict';

/**
* The Bob behavior adds a bobbing animation to an object
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
* @param {Object} [config]
* @param {Boolean} [config.shouldRotate=true] Whether the animation should include
*  rotation.
* @param {Boolean} [config.shouldMove=true] Whether the animation should
*  include movement.
* @param {Number} [config.x=3] Amount of bob on the x axis.
* @param {Number} [config.y=5] Amount of bob on the y axis.
**/
var Bob = (function (Behavior$$1) {
	function Bob(config)
	{
		Behavior$$1.call(this);
		this.config = Object.assign({x:3, y:5, shouldRotate:true, shouldMove:true}, config);
		this.object3d = null;
		this.offsetPosition = null;
		this.lastBobPosition = new THREE.Vector3();
		this.nowOffset = Math.random() * 10000;
	}

	if ( Behavior$$1 ) Bob.__proto__ = Behavior$$1;
	Bob.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	Bob.prototype.constructor = Bob;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'Bob'; };

	Bob.prototype.awake = function awake (o)
	{
		this.object3d = o;
		this.offsetPosition = this.object3d.position.clone();
	};

	Bob.prototype.update = function update (deltaTime)
	{
		var nowInt = Math.floor(performance.now()) + this.nowOffset;

		if (this.config.shouldMove)
		{
			if (!this.lastBobPosition.equals(this.object3d.position))
				{ this.offsetPosition.copy(this.object3d.position); }

			this.object3d.position.y = this.offsetPosition.y + Math.sin(nowInt / 800) * this.config.x;
			this.object3d.position.x = this.offsetPosition.x + Math.sin(nowInt / 500) * this.config.y;
			this.lastBobPosition.copy(this.object3d.position);
		}

		if (this.config.shouldRotate){
			this.object3d.rotation.x = Math.sin(nowInt / 500) / 15;
		}
	};

	Object.defineProperties( Bob.prototype, prototypeAccessors );

	return Bob;
}(Behavior));

'use strict';

/**
* A behavior that changes the color of an object when the cursor interacts with it.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
* @param {Object} [config] Optional parameters.
* @param {THREE.Color} [config.originalColor] Base material color.
* @param {Number} [config.overBrightness=1.5] Material brightness when cursor
*	is over button.
* @param {Number} [config.downBrightness=0.5] Material brightness when cursor
*	is clicked.
*/
var ButtonStateStyle = (function (Behavior$$1) {
	function ButtonStateStyle(config)
	{
		Behavior$$1.call(this);
		this.config = Object.assign({overBrightness: 1.5, downBrightness: 0.5}, config);
		this.object3d = null;
		this.scene = null;
		this.originalColor = null;
		this.modifiedColor = new THREE.Color();

		this._cbs = {
			cursorenter: this.cursorEnter.bind(this),
			cursordown: this.cursorDown.bind(this),
			cursorup: this.cursorUp.bind(this),
			cursorleave: this.cursorLeave.bind(this)
		};
	}

	if ( Behavior$$1 ) ButtonStateStyle.__proto__ = Behavior$$1;
	ButtonStateStyle.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	ButtonStateStyle.prototype.constructor = ButtonStateStyle;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'ButtonStateStyle'; };

	ButtonStateStyle.prototype.awake = function awake (o, s)
	{
		this.object3d = o;
		this.scene = s;
		this.originalColor = this.config.originalColor || this.object3d.material.color;
		this.object3d.addEventListener('cursorenter', this._cbs.cursorenter);
		this.object3d.addEventListener('cursordown', this._cbs.cursordown);
	};

	ButtonStateStyle.prototype.dispose = function dispose ()
	{
		this.object3d.removeEventListener('cursorenter', this._cbs.cursorenter);
		this.object3d.removeEventListener('cursorleave', this._cbs.cursorleave);
		this.object3d.removeEventListener('cursorup', this._cbs.cursorup);
		this.object3d.removeEventListener('cursordown', this._cbs.cursordown);
	};

	ButtonStateStyle.prototype.changeBrightness = function changeBrightness (brightness)
	{
		this.modifiedColor.set(this.originalColor);
		this.modifiedColor.multiplyScalar(brightness);
		this.modifiedColor.r = THREE.Math.clamp(this.modifiedColor.r, 0, 1);
		this.modifiedColor.g = THREE.Math.clamp(this.modifiedColor.g, 0, 1);
		this.modifiedColor.b = THREE.Math.clamp(this.modifiedColor.b, 0, 1);
		this.object3d.material.color = this.modifiedColor;
	};

	ButtonStateStyle.prototype.cursorLeave = function cursorLeave ()
	{
		this.object3d.removeEventListener('cursorleave', this._cbs.cursorleave);
		this.changeBrightness(1.0);
	};

	ButtonStateStyle.prototype.cursorEnter = function cursorEnter ()
	{
		this.changeBrightness(this.config.overBrightness);
		this.object3d.addEventListener('cursorleave', this._cbs.cursorleave);
	};

	ButtonStateStyle.prototype.cursorUp = function cursorUp (event)
	{
		this.scene.removeEventListener('cursorup', this._cbs.cursorup);
		this.object3d.addEventListener('cursorenter', this._cbs.cursorenter);
		if (event.target === this.object3d) {
			this.changeBrightness(this.config.overBrightness);
			this.object3d.addEventListener('cursorleave', this._cbs.cursorleave);
		} else {
			this.changeBrightness(1.0);
		}
	};

	ButtonStateStyle.prototype.cursorDown = function cursorDown ()
	{
		this.scene.addEventListener('cursorup', this._cbs.cursorup);
		this.object3d.removeEventListener('cursorleave', this._cbs.cursorleave);
		this.object3d.removeEventListener('cursorenter', this._cbs.cursorenter);
		this.changeBrightness(this.config.downBrightness);
	};

	Object.defineProperties( ButtonStateStyle.prototype, prototypeAccessors );

	return ButtonStateStyle;
}(Behavior));

'use strict';

//idea: API for symbolic camera from altspace? altspace.getThreeJSCenterCamera();
//idea: offset (drag from bottom of piece). Workaround if you reparent

//TODO: GSAP Draggable

function getWorldPosition(obj) {
	obj.updateMatrixWorld();
	var vec = new THREE.Vector3();
	vec.setFromMatrixPosition(obj.matrixWorld);
	return vec;
}

/**
* A behavior that makes an object draggable along a plane.
* @param {Object} [config] Specify the axes along which the object can be
*  dragged.
*  E.g. To constrain the object to an XY plane: `{x: true, y: true}`
*  Each axis can also be an object specifying the minimum and maximum limits
*  of the constraint. E.g. `{x: {min: -10, max: 20}, y: true}`
*  **Note:** Currently you must specify exactly two axes.
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
*/
var Drag = (function (Behavior$$1) {
	function Drag(config)
	{
		Behavior$$1.call(this);

		//space: view, local, world, sphere
		//gridSnap, cursorSnap
		//config: x: true, y: true, z: false, defaultDistance: 1000
		this.config = config = Object.assign(
			{space: 'world', x: false, y: false, z: false, cursorSnap: true},
			config
		);

		this.min = new THREE.Vector3(
			config.x.min !== undefined ? config.x.min : Number.NEGATIVE_INFINITY,
			config.y.min !== undefined ? config.y.min : Number.NEGATIVE_INFINITY,
			config.z.min !== undefined ? config.z.min : Number.NEGATIVE_INFINITY
		);
		this.max = new THREE.Vector3(
			config.x.max !== undefined ? config.x.max : Number.POSITIVE_INFINITY,
			config.y.max !== undefined ? config.y.max : Number.POSITIVE_INFINITY,
			config.z.max !== undefined ? config.z.max : Number.POSITIVE_INFINITY
		);

		//if (THREE.REVISION !== '72') throw new Error('Drag requires three.js revision 72'); //TODO: Do we need a revision check?

		this.object3d = null;
		this.scene = null;
		this.sync = null;
		this.intersector = null;
		this.dragOffset = new THREE.Vector3();
		this.raycaster = new THREE.Raycaster();
		this.raycaster.linePrecision = 3;

		this._cbs = {
			startDrag: this.startDrag.bind(this),
			moveDrag: this.moveDrag.bind(this),
			stopDrag: this.stopDrag.bind(this)
		};
	}

	if ( Behavior$$1 ) Drag.__proto__ = Behavior$$1;
	Drag.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	Drag.prototype.constructor = Drag;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'Drag'; };

	Drag.prototype.awake = function awake (o, s)
	{
		this.object3d = o;
		this.scene = s;
		this.sync = o.getBehaviorByType('Object3DSync');
		this.makeIntersector();
		this.scene.add(this.intersector);//TODO: see if I can remove it from the scene. Might not req 72.
	};

	Drag.prototype.start = function start ()
	{
		this.object3d.addEventListener('cursordown', this._cbs.startDrag);
	};

	Drag.prototype.dispose = function dispose ()
	{
		this.object3d.removeEventListener('cursordown', this._cbs.startDrag);
	};

	Drag.prototype.makeIntersector = function makeIntersector ()
	{
		var extent = 10000;
		var plane = new THREE.PlaneGeometry(extent, extent);

		function makeXY() {
			plane.rotateY(Math.PI);
		}
		function makeXZ() {
			plane.rotateX(Math.PI / 2);
		}
		function makeYZ() {
			plane.rotateY(Math.PI / 2);
		}
		var inX = !!this.config.x, inY = !!this.config.y, inZ = !!this.config.z;
		var axisCount = inX + inY + inZ; // implicit cast to integers

		if (axisCount === 3) {
			throw new Error('Arbitrary dragging currently unsupported. Please lock at least one axis.');
		}
		else if (axisCount === 2) {
			if (inX && inY) {
				makeXY();
			} else if (inX && inZ) {
				makeXZ();
			} else if (inY && inZ) {
				makeYZ();
			}
		}
		else if (axisCount === 1) {
			throw new Error('Single axis dragging currently unsupported.');
			//TODO: make possible, possibly via view-aligned plane
		}
		else {
			throw new Error('Invalid axis configuration');
		}

		var material = new THREE.MeshBasicMaterial({ color: 'purple' });
		material.side = THREE.DoubleSide;
		this.intersector = new THREE.Mesh(plane, material);
		this.intersector.visible = false;// ensures other raycasters don't hit our intersector
		this.intersector.material.visible = false;// ensures we never see flicker during temp visibility
	};

	Drag.prototype.startDrag = function startDrag (event)
	{
		this.scene.addEventListener('cursorup', this._cbs.stopDrag);
		this.scene.addEventListener('cursormove', this._cbs.moveDrag);

		//Remember difference between center of object and drag point.
		//Otherwise, object appears to 'jump' when selected, moving so its
		//center is directly until the cursor. We allow drag on edge of object.
		this.raycaster.set(event.ray.origin, event.ray.direction);
		var hit = this.raycaster.intersectObject(this.object3d, true)[0];
		if (!hit)
			{ return; }

		var dragPoint = hit.point.clone();
		var objectCenterPoint = getWorldPosition(this.object3d).clone();
		this.dragOffset.copy(dragPoint).sub(objectCenterPoint);

		//Move to drag point (not object center), where raycast hits the object.
		this.intersector.position.copy(this.intersector.parent.worldToLocal(dragPoint));
		this.intersector.quaternion.copy(this.object3d.parent.quaternion);
		this.intersector.updateMatrixWorld();// necessary for raycast, TODO: Make GH issue

		/**
		* Fired on an object when a drag interaction begins.
		*
		* @event dragstart
		* @type module:altspace/utilities/behaviors.Drag~DragEvent
		* @memberof module:altspace/utilities/behaviors.Drag
		*/
		var dragEvent = this.createDragEvent('dragstart');
		this.object3d.dispatchEvent(dragEvent);
	};

	Drag.prototype.moveDrag = function moveDrag (event)
	{
		if (this.sync && !this.sync.isMine)
			{ this.sync.takeOwnership(); }

		//find intersection
		this.intersector.visible = true;// allow our intersector to be intersected
		this.raycaster.set(event.ray.origin, event.ray.direction);
		var intersection = this.raycaster.intersectObject(this.intersector, true)[0];
		this.intersector.visible = false;// disallow our intersector to be intersected

		if (!intersection)
			{ return; }

		//New position is intersection point minus offset. Need offset since
		//user probably won't click on exact center of object to drag it.
		var targetWorldPosition = new THREE.Vector3();
		targetWorldPosition.copy(intersection.point).sub(this.dragOffset);

		//But maintain the original locked positions of the object.
		var self = this;
		var objWorldPos = getWorldPosition(this.object3d);
		['x','y','z'].filter(function (i) { return !self.config[i]; }).forEach(function (i) {
			targetWorldPosition[i] = objWorldPos[i];
		});

		//constrain target position
		targetWorldPosition.clamp(this.min, this.max);

		//move object
		this.object3d.parent.updateMatrixWorld();
		var targetLocalPosition = this.object3d.parent.worldToLocal(targetWorldPosition);//TODO: Test with nested objects
		this.object3d.position.set(
			this.config.x ? targetLocalPosition.x : this.object3d.position.x,
			this.config.y ? targetLocalPosition.y : this.object3d.position.y,
			this.config.z ? targetLocalPosition.z : this.object3d.position.z
		);

	};

	Drag.prototype.stopDrag = function stopDrag ()
	{
		this.scene.removeEventListener('cursorup', this._cbs.stopDrag);
		this.scene.removeEventListener('cursormove', this._cbs.moveDrag);

		/**
		* Fired on an object when a drag interaction ends
		*
		* @event dragstop
		* @type module:altspace/utilities/behaviors.Drag~DragEvent
		* @memberof module:altspace/utilities/behaviors.Drag
		*/
		var dragEvent = this.createDragEvent('dragstop');
		this.object3d.dispatchEvent(dragEvent);
	};

	/**
	* Represents events emitted during drag interactions
	*
	* @typedef {Object} module:altspace/utilities/behaviors.Drag~DragEvent
	* @property {THREE.Ray} ray - The raycaster ray at the time of the event.
	* @property {THREE.Object3D} target - The object which was dragged.
	*/
	Drag.prototype.createDragEvent = function createDragEvent (type)
	{
		return {
			type: type,
			bubbles: true,
			target: this.object3d,
			ray: this.raycaster.ray.clone()
		}
	};

	Object.defineProperties( Drag.prototype, prototypeAccessors );

	return Drag;
}(Behavior));

'use strict';

// ignore stick dead zone
var tolerance = 0.2;

/**
* Allows an object to be moved, rotated, and scaled using a gamepad controller.
* Left stick left / right and up / down moves object in the X-Y plane.
* Clicking left stick enters left alt mode, where movement is in X-Z plane.
* Clicking left stick again exits left alt mode.
* Right stick left / right rotates object clockwise / counterclockwise (y axis).
* Right stick up / down rotates object away forwards / backwards (x axis).
* Clicking right stick enters right alt mode, where left / right tumbles object (z axis).
* Clicking right stick again exits right alt mode.
* D-pad up / down scales object.
* Back / reset button resets object to its original position and rotation.
*
* @param {Boolean} [config.position=true] Whether object's position can be changed.
* @param {Boolean} [config.rotation=true] Whether object's rotation can be changed.
* @param {Boolean} [config.scale=true] Whether object's scale can be changed.
*
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
**/

var GamepadControls = (function (Behavior$$1) {
	function GamepadControls(config)
	{
		Behavior$$1.call(this);
		this.config = Object.assign(
			{position: true, rotation: true, scale: true},
			config
		);

		this.object3d = null;
		this.gamepad = null;
		this.scene = null;
		this.sync = null;

		this.isAltModeR = false;
		this.isAltModeL = false;
		this.prevAltButtonR = false;
		this.prevAltButtonL = false;
		this.isInitialized = false;

		this.originalObj = null;//used to reset
	}

	if ( Behavior$$1 ) GamepadControls.__proto__ = Behavior$$1;
	GamepadControls.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	GamepadControls.prototype.constructor = GamepadControls;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'GamepadControls'; };

	GamepadControls.prototype.awake = function awake (o, s)
	{
		var this$1 = this;

		this.object3d = o;
		this.scene = s;
		this.sync = this.object3d.getBehaviorByType('Object3DSync');
		this.originalObj = this.object3d.clone();
		this.gamepad = this.getGamepad();
		if (this.gamepad) {
			console.log('Gamepad detected: ' + this.gamepad.id);
		} else {
			var intervalID = setInterval((function () {
				this$1.gamepad = this$1.getGamepad();
				if (this$1.gamepad) {
					console.log('Gamepad connected: ' + this$1.gamepad.id);
					clearInterval(intervalID);
				}
			}).bind(this), 500);
		}

		this.scene.addEventListener('cursordown', (function (e) {
			//preventDefault only works when app has focus, so call after initial click
			if (this$1.gamepad && !this$1.isInitialized) {
				this$1.preventDefault(this$1.gamepad);
				this$1.isInitialized = true;
			}
		}).bind(this));

	};

	// utility function to fetch correct type of gamepad
	GamepadControls.prototype.getGamepad = function getGamepad ()
	{
		var this$1 = this;

		var gamepads = [];
		if (altspace && altspace.inClient) {
			gamepads = altspace.getGamepads();
		} else {
			//Gamepad API works in Chrome and Firefox browsers only
			//https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
			gamepads = navigator.getGamepads();
		}

		if (gamepads.length > 0) {
			for (var i=0; i < gamepads.length; i++) {
				var g = gamepads[i];
				if (g && g.axes  && g.axes.length === 4 && g.buttons && g.buttons.length === 16) {
					if (altspace && altspace.inClient) { this$1.preventDefault(g); }
					return g;//return first valid gamepad
				}
			}
		}
		return undefined;
	};

	GamepadControls.prototype.preventDefault = function preventDefault (g)
	{
		var axes = (new Array(4)).fill(false);
		var buttons = (new Array(16)).fill(false);
		if (this.config.position) {
			axes[0] = true;
			axes[1] = true;
			buttons[10] = true;
		}
		if (this.config.rotation) {
			axes[2] = true;
			axes[3] = true;
			buttons[11] = true;
		}
		if (this.config.scale) {
			buttons[12] = true;
			buttons[13] = true;
		}
		buttons[8] = true;
		g.preventDefault(axes, buttons);
	};

	GamepadControls.prototype.update = function update (deltaTime)
	{
		if ((!altspace || !altspace.inClient) && window.chrome && this.gamepad) {
			this.gamepad = this.getGamepad();//On Chrome, need to poll for updates.
		}
		if (!this.gamepad)
			{ return; }

		//For axis and button numbers see: https://w3c.github.io/gamepad/
		var isResetButton = this.gamepad.buttons[8].pressed;//reset / back button
		if (isResetButton)
		{
			if (!this.sync.isMine)
				{ this.sync.takeOwnership(); }
			this.object3d.position.copy(this.originalObj.position);
			this.object3d.rotation.copy(this.originalObj.rotation);
			this.object3d.scale.copy(this.originalObj.scale);
			return;
		}

		if (this.config.position)
		{
			var isAltButtonL = this.gamepad.buttons[10].pressed;//left stick button
			if (this.prevAltButtonL && !isAltButtonL)
				{ this.isAltModeL = !this.isAltModeL; }//button released
			this.prevAltButtonL = isAltButtonL;

			var leftStickX = this.gamepad.axes[0];//left / right
			var leftStickY = this.gamepad.axes[1];//up / down

			var isMove = Math.abs(leftStickX) > tolerance || Math.abs(leftStickY) > tolerance;
			if (isMove && !this.sync.isMine)
				{ this.sync.takeOwnership(); }

			var moveDistance = 200 * (deltaTime/1000);// 200 units per second

			// left stick X always controls X movement
			if (Math.abs(leftStickX) > tolerance){
				this.object3d.position.x += moveDistance * leftStickX;
			}

			// left stick Y controls Z movement in normal mode, Y movement in alt mode
			if(Math.abs(leftStickY) > tolerance)
			{
				if (this.isAltModeL){
					this.object3d.position.y += moveDistance * -leftStickY;
				}
				else {
					this.object3d.position.z += moveDistance * leftStickY;
				}
			}
		}

		if (this.config.rotation)
		{
			var isAltButtonR = this.gamepad.buttons[11].pressed;//right stick button
			if (this.prevAltButtonR && !isAltButtonR)
				{ this.isAltModeR = !this.isAltModeR; }//button released
			this.prevAltButtonR = isAltButtonR;

			var rightStickX = this.gamepad.axes[2];//left / right
			var rightStickY = this.gamepad.axes[3];//up / down

			var isRotate = Math.abs(rightStickX) > tolerance || Math.abs(rightStickY) > tolerance;
			if (isRotate && !this.sync.isMine)
				{ this.sync.takeOwnership(); }

			var rotateAngle = Math.PI * (deltaTime/1000);// 180 degrees per second

			if (!this.isAltModeR && Math.abs(rightStickY) > tolerance) {
				this.object3d.rotation.x += rotateAngle * rightStickY;
			}

			if (Math.abs(rightStickX) > tolerance) {
				if(this.isAltModeR)
					{ this.object3d.rotation.z += rotateAngle * -rightStickX; }
				else
					{ this.object3d.rotation.y += rotateAngle * rightStickX; }
			}
		}

		if (this.config.scale)
		{
			var scaleChange = 10 * (deltaTime/1000);// 10 units per second
			var dpadUp = this.gamepad.buttons[12].pressed;//d-pad up
			var dpadDown = this.gamepad.buttons[13].pressed;//d-pad down

			var isScale = this.gamepad.buttons[12].pressed || this.gamepad.buttons[13].pressed;
			if (isScale && !this.sync.isMine)
				{ this.sync.takeOwnership(); }

			var prev = this.object3d.scale;
			var v3 = new THREE.Vector3(1, 1, 1);
			v3.multiplyScalar(scaleChange);
			if (dpadUp) { this.object3d.scale.add(v3); }
			if (dpadDown) {
				if (prev.x > v3.x && prev.y > v3.y && prev.z > v3.z) {//Don't go negative.
					this.object3d.scale.sub(v3);
				}
			}
		}
	};

	Object.defineProperties( GamepadControls.prototype, prototypeAccessors );

	return GamepadControls;
}(Behavior));

'use strict';

/**
* Changes the color of an object when cursor hovers over it.
* @param {Object} [config] Optional parameters.
* @param {String} [config.event='cursorenter'] Specify the name of event which
*  triggers the color change.  Default is 'cursorenter' for a hover effect.
* @param {THREE.Color} [config.color=THREE.Color('yellow')] A THREE.Color value that will be applied to the object's
*  material.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
*/
var HoverColor = (function (Behavior$$1) {
	function HoverColor(config)
	{
		var this$1 = this;

		Behavior$$1.call(this);
		this.config = Object.assign(
			{event: 'cursorenter', color: new THREE.Color('yellow')},
			config
		);

		// Default is to trigger color change on cursorenter/cursorleave events,
		// also support triggering on cursordown/cursorup events.
		if (this.config.event !== 'cursorenter' && this.config.event !== 'cursordown') {
			throw Error('Expected config.event "cursorenter" or "cursordown"');
		}

		this.object3d = null;
		this.cursordownObject = null;
		this.cursorenterObject = null;
		this.scene = null;

		/*
		* These are here and not in the prototype because we need references
		* to the bound versions of these functions for "dispose".
		*/

		this.cursordown = (function (event) {
			this$1.cursordownObject = this$1.object3d;
			if (this$1.config.event === 'cursordown' ){
				this$1.setColor(this$1.cursordownObject);
			}
		}).bind(this);

		this.cursorenter = (function (event) {
			//ignore hover events if a different object is selected,
			//for example during a drag we don't want to change highlight
			if (this$1.cursordownObject && this$1.cursordownObject !== this$1.object3d){
				return;
			}
			if (this$1.cursorenterObject){
				this$1.unsetColor(this$1.cursorenterObject);
			}
			this$1.cursorenterObject = this$1.object3d;
			this$1.setColor(this$1.object3d);
		}).bind(this);

		this.cursorleave = (function (event) {
			if (this$1.cursorenterObject === this$1.object3d){
				this$1.cursorenterObject = null;
				this$1.unsetColor(this$1.object3d);
			}
		}).bind(this);

		this.cursorupScene = (function (event) {
			if (this$1.config.event === 'cursordown' && this$1.cursordownObject ){
				this$1.unsetColor(this$1.cursordownObject);
			}
			this$1.cursordownObject = null;
		}).bind(this);
	}

	if ( Behavior$$1 ) HoverColor.__proto__ = Behavior$$1;
	HoverColor.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	HoverColor.prototype.constructor = HoverColor;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'HoverColor'; };

	HoverColor.prototype.awake = function awake (o, s)
	{
		this.object3d = o;
		this.scene = s;
		this.object3d.addEventListener('cursordown', this.cursordown);
		this.scene.addEventListener('cursorup', this.cursorupScene);
		if (this.config.event === 'cursorenter') {
			this.object3d.addEventListener('cursorenter', this.cursorenter);
			this.object3d.addEventListener('cursorleave', this.cursorleave);
		}
	};

	HoverColor.prototype.dispose = function dispose ()
	{
		this.object3d.removeEventListener('cursordown', this.cursordown);
		this.scene.removeEventListener('cursorup', this.cursorupScene);
		this.object3d.removeEventListener('cursorenter', this.cursorenter);
		this.object3d.removeEventListener('cursorleave', this.cursorleave);
	};

	HoverColor.prototype.setColor = function setColor (o)
	{
		if (o.material && o.material.color){
			o.userData.origColor = o.material.color;
			o.material.color = this.config.color;
			//Not strictly needed but seems to make updating faster in Altspace.
			if (o.material) { o.material.needsUpdate = true; }
		}
		o.children.forEach(this.setColor.bind(this));
	};

	HoverColor.prototype.unsetColor = function unsetColor (o)
	{
		if (o.material && o.material.color){
			if (!o.userData.origColor){
				console.error('Cannot unsetColor, no userData.origColor for object', o);
				return;
			}
			o.material.color = o.userData.origColor;
			if (o.material) { o.material.needsUpdate = true; }
		}
		o.children.forEach(this.unsetColor.bind(this));
	};

	Object.defineProperties( HoverColor.prototype, prototypeAccessors );

	return HoverColor;
}(Behavior));

'use strict';

/**
* Changes the scale of an object when the cursor hovers over it, and restores the original scale when the cursor is no longer hovering over the object.
* @class HoverScale
* @param {Object} [config] Optional parameters.
* @param {Number} [config.scale=1.15] A scaling factor that will be applied to the object's initial scale when the cursor hovers over it.
* @param {Number} [config.duration=75] Duration the scaling effect is intended to take to complete, in milliseconds.
* @param {Boolean} [config.revertOnDispose=true] Specifies whether the object's original scale should be restored when the behavior has been destroyed.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
*/
var HoverScale = (function (Behavior$$1) {
	function HoverScale(config)
	{
		var this$1 = this;

		Behavior$$1.call(this);
		this.config = Object.assign(
			{scale: 1.15, duration: 75, revertOnDispose: true},
			config
		);

		this.object3d = null;
		this.originalScale = null;
		this.elapsedTime = this.config.duration;
		this.progress = 1;
		this.srcScale = null;
		this.destScale = null;

		this.onHoverStateChange = (function () {
			var assign;
			(assign = [this$1.destScale, this$1.srcScale], this$1.srcScale = assign[0], this$1.destScale = assign[1]);
			this$1.progress = 1 - this$1.progress;
			this$1.elapsedTime = this$1.config.duration - this$1.elapsedTime;
		}).bind(this);
	}

	if ( Behavior$$1 ) HoverScale.__proto__ = Behavior$$1;
	HoverScale.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	HoverScale.prototype.constructor = HoverScale;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'HoverScale'; };

	HoverScale.prototype.awake = function awake (o, s)
	{
		this.object3d = o;
		this.originalScale = this.object3d.scale.clone();

		this.srcScale = this.object3d.scale.clone();
		this.srcScale.multiplyScalar(this.config.scale);

		this.destScale = new THREE.Vector3();
		this.destScale.copy(this.originalScale);

		this.progress = 1;
		this.elapsedTime = this.config.duration;

		this.object3d.addEventListener('cursorenter', this.onHoverStateChange);
		this.object3d.addEventListener('cursorleave', this.onHoverStateChange);
	};

	HoverScale.prototype.update = function update (deltaTime)
	{
		if(this.progress < 1) {
			this.elapsedTime = THREE.Math.clamp(
				this.elapsedTime + deltaTime, 0, this.config.duration
			);

			this.progress = THREE.Math.clamp(this.elapsedTime / this.config.duration, 0, 1);
			this.object3d.scale.lerpVectors(this.srcScale, this.destScale, this.progress);
		}
	};

	HoverScale.prototype.dispose = function dispose ()
	{
		this.object3d.removeEventListener('cursorenter', this.onHoverStateChange);
		this.object3d.removeEventListener('cursorleave', this.onHoverStateChange);

		// Restore Original Object Scale Before Behavior Was Applied
		if(this.config.revertOnDispose)
			{ this.object3d.scale.copy(this.originalScale); }

		this.originalScale = null;
		this.srcScale = null;
		this.destScale = null;
		this.object3d = null;
	};

	Object.defineProperties( HoverScale.prototype, prototypeAccessors );

	return HoverScale;
}(Behavior));

'use strict';

/**
* An array in the form of `[bodyPart, side, subIndex]` identifying a joint in the tracking skeleton.
* E.g. `['Index', 'Left', 0]` identifies the first joint on the index finger of the left hand.
* See [TrackingSkeleton#getJoint]{@link module:altspace~TrackingSkeleton#getJoint} for available
* joint names.
* @typedef {Array.<String, String, Number>} module:altspace/utilities/behaviors.JointCollisionEvents~JointId
**/

// helper function to guarantee skeleton presence, and fetch if available
function initSkeleton(scene) {
	return new Promise(function (resolve, reject) {
		var skel = null;

		// Attempt to use existing skeleton when available
		scene.traverse(function (child) {
			if(child.type === 'TrackingSkeleton') {
				skel = child;
				return;
			}
		});

		if(skel)
			{ return resolve(skel); }

		// Skeleton has not been assigned to scene yet
		altspace.getThreeJSTrackingSkeleton().then(function(trackingSkeleton) {
			skel = trackingSkeleton;
			scene.add(skel);
			return resolve(skel);
		});
	});
}

/**
* The JointCollisionEvents behavior dispatches collision events which have been triggered by
* [TrackingJoints]{@link module:altspace~TrackingJoint} intersecting with the object that has this behavior.
*
* @param {Object} [config] Optional parameters.
* @param {Array.<JointId>} [config.joints=HAND_JOINTS] Array of
* [JointIds]{@link module:altspace/utilities/behaviors.JointCollisionEvents~JointId} to track.
* @param {Number} [config.jointCubeSize=15] Size of dummy cube used to track each joint.
* For optimal results, it is recommended that the value
* provided is scaled according to your enclosure scaling factor.
* @extends module:altspace/utilities/behaviors.Behavior
* @memberof module:altspace/utilities/behaviors
*/
var JointCollisionEvents = (function (Behavior$$1) {
	function JointCollisionEvents(config)
	{
		Behavior$$1.call(this);
		this.config = Object.assign(
			{jointCubeSize: 15, joints: JointCollisionEvents.HAND_JOINTS},
			config
		);

		this.object3d = null;
		this.skeleton = null;
		this.jointCube = null;
		this.hasCollided = false;
		this.collidedJoints = [];
		this.jointIntersectUnion = null;
	}

	if ( Behavior$$1 ) JointCollisionEvents.__proto__ = Behavior$$1;
	JointCollisionEvents.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	JointCollisionEvents.prototype.constructor = JointCollisionEvents;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'JointCollisionEvents'; };

	JointCollisionEvents.prototype.awake = function awake (o, s) {
		this.object3d = o;
		var self = this;
		// Get the tracking skeleton
		initSkeleton(s).then(function (_skeleton) {
			// Attach skeleton
			self.skeleton = _skeleton;

			self.jointCube = new THREE.Vector3(
				self.config.jointCubeSize,
				self.config.jointCubeSize,
				self.config.jointCubeSize
			);
		}).catch(function (err) {
			console.log('Failed to get tracking skeleton', err);
		});
	};

	JointCollisionEvents.prototype.update = function update (deltaTime)
	{
		var this$1 = this;

		if(!this.skeleton)
			{ return; }

		// Collect joints based on joints config option
		var joints = [];
		for(var i = 0; i < this.config.joints.length; i++) {
			joints[i] = this$1.skeleton.getJoint(
				this$1.config.joints[i][0],
				this$1.config.joints[i][1],
				this$1.config.joints[i][2] || 0
			);
		}

		// Get bounding box of owner object
		var objectBB = new THREE.Box3().setFromObject(this.object3d);

		// Add up all colliding joint intersects
		var prevJointIntersectUnion = this.jointIntersectUnion;
		this.jointIntersectUnion = null;

		var prevCollidedJoints = this.collidedJoints;
		this.collidedJoints = [];

		var hasPrevCollided = this.hasCollided;
		this.hasCollided = false;

		if(
			this.object3d.visible &&
			this.object3d.scale.x > Number.EPSILON &&
			this.object3d.scale.y > Number.EPSILON &&
			this.object3d.scale.z > Number.EPSILON
		) {
			for(var i$1 = 0; i$1 < this.config.joints.length; i$1++)
			{
				var joint = joints[i$1];
				if(joint && joint.confidence !== 0) {
					var jointBB = new THREE.Box3().setFromCenterAndSize(joint.position, this$1.jointCube);
					var collision = objectBB.intersectsBox(jointBB);

					if(collision) {
						var intersectBB = objectBB.intersect(jointBB);
						if(this$1.jointIntersectUnion) {
							this$1.jointIntersectUnion.union(intersectBB);
						} else {
							this$1.jointIntersectUnion = intersectBB;
						}
						this$1.hasCollided = true;
						this$1.collidedJoints.push(joint);
					}
				}
			}
		}

		// Dispatch collision event
		if(!hasPrevCollided && this.hasCollided)
		{
			this.object3d.dispatchEvent(new EnterEvent(
				this.jointIntersectUnion,
				this.collidedJoints,
				this.object3d
			));
		}
		else if(hasPrevCollided && !this.hasCollided)
		{
			this.object3d.dispatchEvent(new LeaveEvent(
				prevJointIntersectUnion || new THREE.Box3(),
				prevCollidedJoints,
				this.object3d
			));
		}

		// Dispatch collision event
		if(this.hasCollided)
		{
			this.object3d.dispatchEvent(new CollisionEvent(
				this.jointIntersectUnion,
				this.collidedJoints,
				this.object3d
			));
		}
	};

	Object.defineProperties( JointCollisionEvents.prototype, prototypeAccessors );

	return JointCollisionEvents;
}(Behavior));

var JointCollisionEvent = function JointCollisionEvent(type, union, joints, target)
{
	this.type = type;
	this.detail = {
		intersect: union,
		joints: joints
	};
	this.bubbles = true;
	this.target = target;
};

/**
* Fires a single event when any specified joints initially collide with the object.
*
* @event jointcollisionenter
* @property {Object} detail Event details
* @property {THREE.Box3} detail.intersect - A union of all joint bounding boxes which intersected with object.
* @property {module:altspace~TrackingJoint[]} detail.joints - An array of joints which which were involved in the intersection union.
* @property {THREE.Object3D} target - The object which was intersected.
* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
*/
var EnterEvent = (function (JointCollisionEvent) {
	function EnterEvent(){
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		JointCollisionEvent.apply(this, [ 'jointcollisionenter' ].concat( args ));
	}

	if ( JointCollisionEvent ) EnterEvent.__proto__ = JointCollisionEvent;
	EnterEvent.prototype = Object.create( JointCollisionEvent && JointCollisionEvent.prototype );
	EnterEvent.prototype.constructor = EnterEvent;

	return EnterEvent;
}(JointCollisionEvent));

/**
* Fires a single event when all joints are no longer colliding with the object.
*
* @event jointcollisionleave
* @property {Object} detail Event details
* @property {THREE.Box3} detail.intersect - A union of all joint bounding boxes which last intersected with the object.
* @property {module:altspace~TrackingJoint[]} detail.joints - An array of joints which which were involved in the intersection union.
* @property {THREE.Object3D} target - The object which was intersected.
* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
*/
var LeaveEvent = (function (JointCollisionEvent) {
	function LeaveEvent(){
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		JointCollisionEvent.apply(this, [ 'jointcollisionleave' ].concat( args ));
	}

	if ( JointCollisionEvent ) LeaveEvent.__proto__ = JointCollisionEvent;
	LeaveEvent.prototype = Object.create( JointCollisionEvent && JointCollisionEvent.prototype );
	LeaveEvent.prototype.constructor = LeaveEvent;

	return LeaveEvent;
}(JointCollisionEvent));

/**
* Fires a continuous event while any joints are colliding with the object.
*
* @event jointcollision
* @property {Object} detail Event details
* @property {THREE.Box3} detail.intersect - A union of all joint bounding boxes which intersected with the object.
* @property {module:altspace~TrackingJoint[]} detail.joints - An array of joints which which were involved in the intersection union.
* @property {THREE.Object3D} target - The object which was intersected.
* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
*/
var CollisionEvent = (function (JointCollisionEvent) {
	function CollisionEvent(){
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		JointCollisionEvent.apply(this, [ 'jointcollision' ].concat( args ));
	}

	if ( JointCollisionEvent ) CollisionEvent.__proto__ = JointCollisionEvent;
	CollisionEvent.prototype = Object.create( JointCollisionEvent && JointCollisionEvent.prototype );
	CollisionEvent.prototype.constructor = CollisionEvent;

	return CollisionEvent;
}(JointCollisionEvent));

/**
* An array of JointIds describing the tip of every finger on both hands.
* @constant {Array.<JointId>} HAND_JOINTS
* @memberof module:altspace/utilities/behaviors.JointCollisionEvents
*/
JointCollisionEvents.HAND_JOINTS = [
	['Hand', 'Left', 0],
	['Thumb', 'Left', 3],
	['Index', 'Left', 3],
	['Middle', 'Left', 3],
	['Ring', 'Left', 3],
	['Pinky', 'Left', 3],

	['Hand', 'Right', 0],
	['Thumb', 'Right', 3],
	['Index', 'Right', 3],
	['Middle', 'Right', 3],
	['Ring', 'Right', 3],
	['Pinky', 'Right', 3]
];

'use strict';

var containerMax = Symbol('containerMax');
var containerMin = Symbol('containerMin');
var object3D = Symbol('object3D');
var boundingBox = Symbol('boundingBox');
var origMatrix = Symbol('origMatrix');
var origMatrixAutoUpdate = Symbol('origMatrixAutoUpdate');
var parent = Symbol('parent');
var enclosure = Symbol('enclosure');
var origParentBoundingBoxes = new Map();

/**
* The Layout behavior allows you to position objects easily. You can
* position an object relative to its parent (either the Scene or a
* another object) by using a position specifier for each of the axes.
* The position specifier can be one of 'min', 'center' or 'max'. The default
* specifier is 'center'. You can also add a modifier to the position in pixels
* ('min+5'), a percentage ('min+10%') or meters ('min+1m'). Finally, you can
* choose the location of the anchor on the object you are trying to position
* by using the 'my' parameter.
* You must specify at least one axis on the 'at' parameter.
*
* @example
* // Position the top of the cube at 1.5 meters above the bottom of its parent.
* cube.addBehavior(new altpsace.utilities.behaviors.Layout({
*	   my: {y: 'max'},
*	   at: {y: 'min+1.5m'}
* });
*
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
* @param {Object} config
* @param {Object} config.at An object containing the axes and position
*  specifiers. At least one axis must be specified. E.g. `{x: 'min', y: 'max-5%'}`
* @param {Object} [config.my] An object containing the axes and position
*  specifiers for the layout anchor.
**/
var Layout = (function (Behavior$$1) {
	function Layout (ref) {
		var my = ref.my; if ( my === void 0 ) my = {};
		var at = ref.at;

		Behavior$$1.call(this);
		this.my = my;
		this.at = at;
	}

	if ( Behavior$$1 ) Layout.__proto__ = Behavior$$1;
	Layout.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	Layout.prototype.constructor = Layout;

	var prototypeAccessors = { type: {} };

	// TODO-BP Ideally these would be private methods.
	prototypeAccessors.type.get = function (){ return 'Layout'; };

	Layout.prototype.getAxisSettings = function getAxisSettings (axis, axisValue, min, max) {
		axisValue = axisValue || 'center';
		axisValue = /(\w+)([-+].+)?/.exec(axisValue);
		var position = axisValue[1];
		var offsetSetting = axisValue[2];
		var offset = parseFloat(offsetSetting) || 0;
		if (offsetSetting && offsetSetting.endsWith('%')) {
			offset = offset / 100 * (max[axis] - min[axis]);
		}
		else if (offsetSetting && offsetSetting.endsWith('m')) {
			offset = offset * this[enclosure].pixelsPerMeter;
		}
		return {
			position: position,
			offset: offset
		}
	};

	Layout.prototype.getAnchorOffset = function getAnchorOffset (axis, axisValue) {
		var max = this[boundingBox].max;
		var min = this[boundingBox].min;
		var ref = this.getAxisSettings(
			axis, axisValue, min, max);
		var position = ref.position;
		var offset = ref.offset;
		if (position === 'max') {
			return -max[axis] + offset
		}
		else if (position === 'min') {
			return -min[axis] + offset
		}
		else if (position === 'center') {
			return offset;
		}
		else {
			throw new Error(
				(axisValue + " is an invalid layout position for " + axis)
			);
		}
	};

	Layout.prototype.doLayout = function doLayout () {
		var this$1 = this;

		Array.from('xyz').forEach(function (axis) {
			var ref = this$1.getAxisSettings(
				axis, this$1.at[axis], this$1[containerMin], this$1[containerMax]);
			var position = ref.position;
			var offset = ref.offset;
			var anchorOffset = this$1.getAnchorOffset(axis, this$1.my[axis]);
			if (position === 'max') {
				this$1[object3D].position[axis] = this$1[containerMax][axis] + offset + anchorOffset;
			}
			else if (position === 'min') {
				this$1[object3D].position[axis] = this$1[containerMin][axis] + offset + anchorOffset;
			}
			else if (position === 'center') {
				this$1[object3D].position[axis] = offset + anchorOffset;
			}
			else {
				throw new Error(
					((this$1.at[axis]) + " is an invalid layout position for " + axis)
				);
			}
		});

		if (this[parent]) {
			// Restore the original parent transform
			this[parent].matrix = this[origMatrix];
			this[parent].updateMatrixWorld(true);
			this[parent].matrixAutoUpdate = this[origMatrixAutoUpdate];
		}
	};

	Layout.prototype.awake = function awake (_object3D) {
		var this$1 = this;

		this[object3D] = _object3D;
		this[boundingBox] = new THREE.Box3().setFromObject(this[object3D]);

		// TODO Listen for resize events on the enclosure
		altspace.getEnclosure().then(function (_enclosure) {
			this$1[enclosure] = _enclosure;
			if (this$1[object3D].parent instanceof THREE.Scene) {
				var
					hw = this$1[enclosure].innerWidth / 2,
					hh = this$1[enclosure].innerHeight / 2,
					hd = this$1[enclosure].innerDepth / 2;
				this$1[containerMax] = new THREE.Vector3(hw, hh, hd);
				this$1[containerMin] = new THREE.Vector3(-hw, -hh, -hd);
				this$1.doLayout();
			}
			else {
				var objWorldScale = this$1[object3D].getWorldScale();
				this$1[boundingBox].min.divide(objWorldScale);
				this$1[boundingBox].max.divide(objWorldScale);

				this$1[parent] = this$1[object3D].parent;

				this$1[origMatrix] = this$1[parent].matrix.clone();
				this$1[origMatrixAutoUpdate] = this$1[parent].matrixAutoUpdate;

				// We want to use the un-transormed anchor of the parent.
				// Reset the parent matrix so that we can get the original bounding box.
				this$1[parent].matrixAutoUpdate = false;
				this$1[parent].matrix.identity();

				var parentBoundingBox;
				if (origParentBoundingBoxes.has(this$1[parent].uuid)) {
					parentBoundingBox = origParentBoundingBoxes.get(this$1[parent].uuid);
				}
				else {
					this$1[parent].remove(this$1[object3D]);
					parentBoundingBox = new THREE.Box3().setFromObject(this$1[parent]);
					this$1[parent].add(this$1[object3D]);
					origParentBoundingBoxes.set(this$1[parent].uuid, parentBoundingBox);
				}

				this$1[containerMax] = parentBoundingBox.max;
				this$1[containerMin] = parentBoundingBox.min;
				this$1.doLayout();
			}
		});
	};

	Object.defineProperties( Layout.prototype, prototypeAccessors );

	return Layout;
}(Behavior));

'use strict';

// deep object comparison
function isEqual(a, b)
{
	// objects are directly equal
	if(a === b){
		return true;
	}
	// recurse for each pair of array items
	else if( Array.isArray(a) && Array.isArray(b) && a.length === b.length ){
		return a.every( function (v,i) { return isEqual(a[i], b[i]); } );
	}
	// recurse for every key/val pair in objects
	else if( a instanceof Object && b instanceof Object
		&& isEqual(Object.keys(a).sort(), Object.keys(b).sort()) )
	{
		for(var k in a){
			if( !isEqual(a[k], b[k]) )
				{ return false; }
		}
		return true;
	}
	else {
		return false;
	}
}

/**
* The Object3DSync behavior syncs an object's transform and data.
* **Note:** Object3DSync must be used in conjunction with
* [SceneSync]{@link module:altspace/utilities/behaviors.SceneSync}
*
* @param {Object} [config]
* @param {Boolean} [config.position=false] Whether object's position should
*  be synced
* @param {Boolean} [config.rotation=false] Whether object's rotation should
*  be synced
* @param {Boolean} [config.scale=false] Whether object's scale should
*  be synced
* @param {Boolean} [config.auto=false] Whether the object should be synced
*  automatically. Not currently recommended.
* @param {Boolean} [config.world=false] Whether world coordiantes should
*  be sent when synchronizing position and rotation, instead of the
*  transformation relative to the object's parent.  Use if synced object
*  is a child (e.g. of the tracking skeleton) only in the sender scene.
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
**/
var Object3DSync = (function (Behavior$$1) {
	function Object3DSync(config)
	{
		Behavior$$1.call(this);
		this.config = Object.assign(
			{position: false, rotation: false, scale: false, auto: false, world: false},
			config
		);

		this.object3d = null;
		this.scene = null;
		this.ref = null;
		this.key = null;
		this.dataRef = null;
		this.ownerRef = null;
		this.transformRef = null;

		this.sceneSync = null;
		this.isMine = false;

		this.position = new THREE.Vector3();
		this.quaternion = new THREE.Quaternion();
		this.scale = new THREE.Vector3();
	}

	if ( Behavior$$1 ) Object3DSync.__proto__ = Behavior$$1;
	Object3DSync.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	Object3DSync.prototype.constructor = Object3DSync;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'Object3DSync'; };

	Object3DSync.prototype.awake = function awake (o, s)
	{
		this.object3d = o;
		this.scene = s;

		this.setupReceive();
	};

	//TODO: lerp
	Object3DSync.prototype.setupReceive = function setupReceive ()
	{
		var this$1 = this;

		this.transformRef.on('value', (function (snapshot) {
			var value = snapshot.val();

			if( !this$1.isMine && value )
			{
				if (this$1.config.position) {
					this$1.object3d.position.set(value.position.x, value.position.y, value.position.z);
				}
				if (this$1.config.rotation) {
					this$1.object3d.quaternion.set(value.quaternion.x, value.quaternion.y, value.quaternion.z, value.quaternion.w);
				}
				if (this$1.config.scale) {
					this$1.object3d.scale.set(value.scale.x, value.scale.y, value.scale.z);
				}
			}
		}).bind(this));

		this.ownerRef.on('value', (function (snapshot) {
			var newOwnerId = snapshot.val();
			if (newOwnerId === this$1.sceneSync.clientId && !this$1.isMine)
			{
				/**
				* Fired when a synced object's ownership is transferred to the local client.
				* @event ownershipgained
				* @memberof module:altspace/utilities/behaviors.Object3DSync
				*/
				this$1.object3d.dispatchEvent({ type: 'ownershipgained' });
			}

			if (newOwnerId !== this$1.sceneSync.clientId && this$1.isMine)
			{
				/**
				* Fired when a synced object's ownership is transferred to someone else.
				* @event ownershiplost
				* @memberof module:altspace/utilities/behaviors.Object3DSync
				*/
				this$1.object3d.dispatchEvent({ type: 'ownershiplost' });
			}

			this$1.isMine = newOwnerId === this$1.sceneSync.clientId;
		}).bind(this));
	};

	Object3DSync.prototype.link = function link (objectRef, sS)
	{
		this.ref = objectRef;
		this.key = this.ref.key();
		this.transformRef = this.ref.child('batch');
		this.dataRef = this.ref.child('data');
		this.ownerRef = this.ref.child('owner');
		this.sceneSync = sS;
	};

	Object3DSync.prototype.autoSend = function autoSend ()
	{
		if (!this.isMine)
			{ return; }

		var transform = {};
		if (this.config.world) {
			this.object3d.updateMatrixWorld();//call before sending to avoid being a frame behind
			this.object3d.matrixWorld.decompose(this.position, this.quaternion, this.scale);
		} else {
			this.position = this.object3d.position;
			this.quaternion = this.object3d.quaternion;
			this.scale = this.object3d.scale;
		}
		if (this.config.position) {
			transform.position = {
				x: this.position.x,
				y: this.position.y,
				z: this.position.z
			};
		}
		if (this.config.rotation) {
			transform.quaternion = {
				x: this.quaternion.x,
				y: this.quaternion.y,
				z: this.quaternion.z,
				w: this.quaternion.w
			};
		}
		if (this.config.scale) {
			transform.scale = {
				x: this.scale.x,
				y: this.scale.y,
				z: this.scale.z
			};
		}
		if (Object.keys(transform).length > 0) {
			if (isEqual(transform, this.lastTransform)) { return; }
			this.transformRef.set(transform);
			this.lastTransform = transform;
		}
	};

	/**
	* Take ownership of this object. The client that instantiates an object owns it,
	* afterwards changes in ownership must be managed by the app. Manual modifications
	* to the Firebase ref's will not obey ownership status.
	* @instance
	* @method takeOwnership
	* @memberof module:altspace/utilities/behaviors.Object3DSync
	*/
	Object3DSync.prototype.takeOwnership = function takeOwnership () {
		this.ownerRef.set(this.sceneSync.clientId);
	};

	Object.defineProperties( Object3DSync.prototype, prototypeAccessors );

	return Object3DSync;
}(Behavior));

'use strict';

// common maps between identifiers and objects
var syncBehaviors = [];
var objectForKey = {};
var keyForUuid = {};

function autoSendAll() {
	syncBehaviors.forEach(function (s) { return s.autoSend(); });
}

/**
* The SceneSync behavior manages the synchronization of an entire scene.
* @param {Firebase} syncInstance - Obtain this by calling [altspace.utilities.sync.connect]{@link module:altspace/utilities/sync.connect}
* @param {Object} [config]
* @param {Object} [config.instantiators] A dictionary of instantiation
* callbacks by syncType. Instantiators are called on every client whenever an
* instantiation call is made. Instantiators are passed an initialization
* data object and the syncType. They should return an Object3D with an
* Object3DSync behavior.
* @param {Object} [config.destroyers] (Optional) A dictionary of destroy
* callbacks by syncType. Destroyers are called on every client whenever a
* destroy call is made. If no destroyer is provided, a default one will be use
* which will remove the object from its parent and dispose its geometry, material, and texture.
* If you return true from a custom destroyer, the default destroyer will also be called.
* @param {Function} [config.ready] A callback that is called after
* checking to see if the instance has already been initialized. The callback is passed a boolean that
* is true if this is the first callback that has been called for this sync instance.
* This is primarily useful for setting up any objects that should only be created
* once for an instance, and is not necessary otherwise.
* @param {integer} [config.autoSendRateMS=100] - The rate updates are published
* to other clients, in milliseconds. This can usually be left default.
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
**/
var SceneSync = (function (Behavior$$1) {
	function SceneSync(instanceRef, config)
	{
		Behavior$$1.call(this);
		this.config = Object.assign(
			{instantiators: {}, destroyers: {}, ready: null, autoSendRateMS: 100},
			config
		);

		this.instanceRef = instanceRef;
		this.sceneRef = instanceRef.child('scene');
		this.clientsRef = instanceRef.child('clients');

		this.clientId = null;
		// there should always be one master client in the room. For now it will be the longest person online.
		this.masterClientId = null;

	}

	if ( Behavior$$1 ) SceneSync.__proto__ = Behavior$$1;
	SceneSync.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	SceneSync.prototype.constructor = SceneSync;

	var prototypeAccessors = { type: {},isMasterClient: {} };

	prototypeAccessors.type.get = function (){ return 'SceneSync'; };

	SceneSync.prototype.awake = function awake (o, s)
	{
		var this$1 = this;

		setInterval(autoSendAll, this.config.autoSendRateMS);

		var scene = s;

		// temporary way of having unique identifiers for each client
		this.clientId = scene.uuid;
		this.clientsRef.on("value", (function (snapshot) {
			var clientIds = snapshot.val();
			if (!clientIds) { return; }

			var masterClientKey = Object.keys(clientIds)[0];
			this$1.masterClientId = clientIds[masterClientKey];
		}).bind(this));

		// add our client ID to the list of connected clients,
		// but have it be automatically removed by firebase if we disconnect for any reason
		this.clientsRef.push(this.clientId).onDisconnect().remove();

		this.instanceRef.child('initialized').once('value', (function (snapshot) {
			var shouldInitialize = !snapshot.val();
			snapshot.ref().set(true);
			if (this$1.config.ready) {
				this$1.config.ready(shouldInitialize);
			}
		}).bind(this));

		this.sceneRef.on('child_added', this.onInstantiate.bind(this));
		this.sceneRef.on('child_removed', this.onDestroy.bind(this));
	};

	/**
	* Instantiate an object by syncType.
	* @param {String} syncType Type of object to instantiate.
	* @param {Object} initData An object containing initialization data, passed
	* to the instantiator.
	* @param {Boolean} destroyOnDisconnect If the object should be destroyed
	* across all synced instance when the instantiating instance disconnects.
	* @returns {Object3DSync}
	*/
	SceneSync.prototype.instantiate = function instantiate (syncType, initData, destroyOnDisconnect)
	{
		if ( initData === void 0 ) initData = {};

		var objectRef = this.sceneRef.push({ syncType: syncType, initData: initData },
			function (error) { if (error) { throw Error('Failed to save to Firebase', error); } }
		);

		if(destroyOnDisconnect){
			objectRef.onDisconnect().remove();//send remvoe_child to remote clients
		}

		//instantiation done, local child_added callback happens syncronously with push
		var object = objectForKey[objectRef.key()];
		object.getBehaviorByType('Object3DSync').takeOwnership();
		return object;
	};

	SceneSync.prototype.onInstantiate = function onInstantiate (snapshot)
	{
		var data = snapshot.val();
		var key = snapshot.key();
		var instantiator = this.config.instantiators[data.syncType];

		if (!instantiator) {
			console.warn('No instantiator found for syncType: ' + data.syncType);
			return;
		}

		var object3d = instantiator(data.initData, data.syncType);
		if (!object3d) {
			console.error(data.syncType + '.create must return an Object3D');
			return;
		}
		objectForKey[key] = object3d;
		keyForUuid[object3d.uuid] = key;

		var syncBehavior = object3d.getBehaviorByType('Object3DSync');
		if (!syncBehavior) {
			console.error(data.syncType + ' instantiator must return an Object3D with an Object3DSync behavior');
			return;
		}

		syncBehaviors.push(syncBehavior);
		syncBehavior.link(snapshot.ref(), this);
	};

	/**
	* Destroy a synced object across instances.
	* @param {Object} object3d The object to destroy.
	*/
	SceneSync.prototype.destroy = function destroy (object3d)
	{
		var key = keyForUuid[object3d.uuid];
		if (!key) {
			console.warn('Failed to find key for object3d to be destroyed', object3d);
			return;
		}
		this.sceneRef.child(key).remove( function (error) {
			if (error) { console.warn('Failed to remove from Firebase', error); }
		});
		this.sceneRef.child(key).off();//detach all callbacks
	};

	SceneSync.prototype.onDestroy = function onDestroy (snapshot)
	{
		var data = snapshot.val();
		var key = snapshot.key();
		var object3d = objectForKey[key];
		if (!object3d) {
			console.warn('Failed to find object matching deleted key', key);
			return;
		}
		var syncType = data.syncType;
		if (!syncType) {
			console.warn('No syncType found for object being destroyed', object3d);
			return;
		}

		function defaultDestroyer(object3d)
		{
			// remove all behaviors including this one
			object3d.removeAllBehaviors();

			// remove from scene or parent
			if (object3d.parent) {
				object3d.parent.remove(object3d);
			}

			if (object3d.geometry) {
				object3d.geometry.dispose();
			}

			if (object3d.material) {
				if (object3d.material.map) {
					object3d.material.map.dispose();
				}
				object3d.material.dispose();
			}
		}

		var customDestroyer = this.config.destroyers[syncType];
		var shouldDefaultDestroy = !customDestroyer;

		if (customDestroyer){
			// returning true from a destroyer will additionally invoke the default destroyer
			shouldDefaultDestroy = customDestroyer(object3d);
		}

		if (shouldDefaultDestroy)
			{ defaultDestroyer(object3d); }

		//remove from our local bookkeeping
		delete objectForKey[key];
		delete keyForUuid[object3d.uuid];
	};

	/**
	* True if this client is the master, false otherwise. Master is generally the client that
	* has been in the room the longest.
	* @instance
	* @member {boolean} isMasterClient
	* @memberof module:altspace/utilities/behaviors.SceneSync
	*/
	prototypeAccessors.isMasterClient.get = function (){ return this.masterClientId === this.clientId; };

	Object.defineProperties( SceneSync.prototype, prototypeAccessors );

	return SceneSync;
}(Behavior));

'use strict';

/**
* The Spin behavior adds a spinning animation to an object.
* @param {Object} [config]
* @param {Number} [config.speed=0.0001] Rotation speed in radians per
*  millisecond
* @param {Vector3} [config.axis={0,1,0}] - The axis of rotation
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
*/
var Spin = (function (Behavior$$1) {
	function Spin(config) {
		Behavior$$1.call(this);
		this.config = Object.assign(
			{speed: 1e-4, axis: new THREE.Vector3(0,1,0)},
			config
		);
		this.config.axis.normalize();
		this.object3d = null;
	}

	if ( Behavior$$1 ) Spin.__proto__ = Behavior$$1;
	Spin.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	Spin.prototype.constructor = Spin;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'Spin'; };

	Spin.prototype.awake = function awake (o) {
		this.object3d = o;
	};

	Spin.prototype.update = function update (deltaTime) {
		this.object3d.rotateOnAxis(this.config.axis, this.config.speed * deltaTime);
	};

	Object.defineProperties( Spin.prototype, prototypeAccessors );

	return Spin;
}(Behavior));

'use strict';

// Returns a Promise that resovles static when a steamvr controller is found
function getController(hand, config) {
	var findGamepad = function (resolve, reject) {
		var gamepad = altspace.getGamepads().find(function (g) { return g.mapping === 'steamvr' && g.hand === hand; });
		if (gamepad) {
			if(config.logging) { console.log("SteamVR input device found", gamepad); }
			resolve(gamepad);
		} else {
			if(config.logging) { console.log("SteamVR input device not found trying again in 500ms..."); }
			setTimeout(findGamepad, 500, resolve, reject);
		}
	};

	return new Promise(findGamepad);
}

/**
* The SteamVRInput behavior manages SteamVR input devices. It should be added
* to the ThreeJS scene and is a requirement of [SteamVRTrackedObject]{@link module:altspace/utilities/behaviors.SteamVRTrackedObject}.
*
* @param {Object} [config]
* @param {Boolean} [config.logging=false] Display console log output during SteamVR input device detection
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
*
* @prop {Gamepad} leftController the left SteamVR [Gamepad]{@link module:altspace~Gamepad} or undefined if one has not yet been found
* @prop {Gamepad} rightController the right SteamVR [Gamepad]{@link module:altspace~Gamepad} or undefined if one has not yet been found
* @prop {Gamepad} firstController the first SteamVR [Gamepad]{@link module:altspace~Gamepad}  or undefined if none have yet been found
*
* @prop {Promise} leftControllerPromise a promise that resolves once the left SteamVR input device is found
* @prop {Promise} rightControllerPromise a promise that resolves once the right SteamVR input device is found
* @prop {Promise} firstControllerPromise a promise that resolves once any SteamVR input device is found
*/
var SteamVRInput = (function (Behavior$$1) {
	function SteamVRInput(config) {
		Behavior$$1.call(this);
		this.config = Object.assign({logging: false}, config);
	}

	if ( Behavior$$1 ) SteamVRInput.__proto__ = Behavior$$1;
	SteamVRInput.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	SteamVRInput.prototype.constructor = SteamVRInput;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'SteamVRInput'; };

	SteamVRInput.prototype.awake = function awake () {
		var this$1 = this;

		this.leftControllerPromise = getController(SteamVRInput.LEFT_CONTROLLER, this.config);
		this.rightControllerPromise = getController(SteamVRInput.RIGHT_CONTROLLER, this.config);
		this.firstControllerPromise = Promise.race([
			this.leftControllerPromise,
			this.rightControllerPromise ]);

		this.leftControllerPromise.then(function (controller) {
			this$1.leftController = controller;
		});
		this.rightControllerPromise.then(function (controller) {
			this$1.rightController = controller;
		});
		this.firstControllerPromise.then(function (controller) {
			this$1.firstController = controller;

			var blockedAxes = controller.axes.map(function () { return false; });
			var blockedButtons = controller.buttons.map(function () { return false; });

			blockedButtons[SteamVRInput.BUTTON_TRIGGER] = true;
			blockedButtons[SteamVRInput.BUTTON_TOUCHPAD] = true;

			controller.preventDefault(blockedAxes, blockedButtons);
		});
	};

	Object.defineProperties( SteamVRInput.prototype, prototypeAccessors );

	return SteamVRInput;
}(Behavior));

Object.assign(SteamVRInput, {
	BUTTON_TRIGGER: 0,
	BUTTON_GRIP: 1,
	BUTTON_TOUCHPAD: 2,
	BUTTON_DPAD_UP: 3,
	BUTTON_DPAD_RIGHT: 4,
	BUTTON_DPAD_DOWN: 5,
	BUTTON_DPAD_LEFT: 6,

	AXIS_TOUCHPAD_X: 0,
	AXIS_TOUCHPAD_Y: 1,

	FIRST_CONTROLLER: 'first',
	LEFT_CONTROLLER: 'left',
	RIGHT_CONTROLLER: 'right'
});

'use strict';

/**
* The SteamVRTrackedObject behavior updates an objects position and rotation to
* match the location of a SteamVR input device. A [SteamVRInput]{@link module:altspace/utilities/behaviors.SteamVRInput} behavior
* must be on the scene containing this object for it to function properly.
*
* @param {Object} [config]
* @param {string} [config.hand="first"] the input device to track. Eitehr SteamVRInput.LEFT_CONTROLLER, SteamVRInput.RIGHT_CONTROLLER, or SteamVRInput.FIRST_CONTROLLER
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
*/

var SteamVRTrackedObject = (function (Behavior$$1) {
	function SteamVRTrackedObject(ref) {
		var hand = ref.hand; if ( hand === void 0 ) hand = 'first';

		Behavior$$1.call(this);
		this._hand = hand;
	}

	if ( Behavior$$1 ) SteamVRTrackedObject.__proto__ = Behavior$$1;
	SteamVRTrackedObject.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	SteamVRTrackedObject.prototype.constructor = SteamVRTrackedObject;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'SteamVRTrackedObject'; };

	SteamVRTrackedObject.prototype.awake = function awake (object3d, scene) {
		this._object3d = object3d;
		this._scene = scene;

		this._steamVRInput = this._scene.getBehaviorByType('SteamVRInput');
	};

	SteamVRTrackedObject.prototype.update = function update () {
		var controller = this._steamVRInput[this._hand + "Controller"];
		var object3d = this._object3d;

		if (controller) {
			var ref = controller.position;
			var x = ref.x;
			var y = ref.y;
			var z = ref.z;
			object3d.position.set(x, y, z);

			var ref$1 = controller.rotation;
			var x = ref$1.x;
			var y = ref$1.y;
			var z = ref$1.z;
			var w = ref$1.w;
			object3d.quaternion.set(x, y, z, w);
		}
	};

	Object.defineProperties( SteamVRTrackedObject.prototype, prototypeAccessors );

	return SteamVRTrackedObject;
}(Behavior));

'use strict';

/**
* Spin an object with the GearVR touchpad
* @memberof module:altspace/utilities/behaviors
* @extends module:altspace/utilities/behaviors.Behavior
*/
var TouchpadRotate = (function (Behavior$$1) {
	function TouchpadRotate(config)
	{
		if ( config === void 0 ) config = {};

		Behavior$$1.call(this);
		this.object3d = null;
		this.scene = null;
		this.startingRotation = null;
		this.activelyRotating = false;
		this.lastDisplacementX = 0;
		this.runningCount = 5;
		this.runningAverageVelocityX = 0;
	}

	if ( Behavior$$1 ) TouchpadRotate.__proto__ = Behavior$$1;
	TouchpadRotate.prototype = Object.create( Behavior$$1 && Behavior$$1.prototype );
	TouchpadRotate.prototype.constructor = TouchpadRotate;

	var prototypeAccessors = { type: {} };

	prototypeAccessors.type.get = function (){ return 'TouchpadRotate'; };

	TouchpadRotate.prototype.awake = function awake (o, s)
	{
		this.object3d = o;
		this.scene = s;

		altspace.addEventListener('touchpadup', this.onTouchpadUp.bind(this));
		altspace.addEventListener('touchpaddown', this.onTouchpadDown.bind(this));
		altspace.addEventListener('touchpadmove', this.onTouchpadMove.bind(this));
	};

	TouchpadRotate.prototype.update = function update (deltaTime) {
		if (!this.activelyRotating && Math.abs(this.runningAverageVelocityX) > 0.01) {
			this.object3d.rotation.y += this.runningAverageVelocityX;
			this.runningAverageVelocityX *= 0.97;
		}
	};

	TouchpadRotate.prototype.onTouchpadUp = function onTouchpadUp (event) {
		this.activelyRotating = false;
	};

	TouchpadRotate.prototype.onTouchpadDown = function onTouchpadDown (event) {
		this.activelyRotating = true;
		this.startingRotation = this.object3d.rotation.clone();
	};

	TouchpadRotate.prototype.onTouchpadMove = function onTouchpadMove (event) {
		var deltaX = event.displacementX - this.lastDisplacementX;
		this.object3d.rotation.set(
			this.startingRotation.x,
			this.startingRotation.y + event.displacementX / 300,
			this.startingRotation.z
		);

		this.runningAverageVelocityX = (this.runningAverageVelocityX * this.runningCount + deltaX/300) / (this.runningCount + 1);
		this.lastDisplacementX = event.displacementX;
	};

	Object.defineProperties( TouchpadRotate.prototype, prototypeAccessors );

	return TouchpadRotate;
}(Behavior));

/**
* Behaviors are designed to be plug-and-play reusable modules to add some type of
* functionality to an object. See [Behavior]{@link module:altspace/utilities/behaviors.Behavior}
* for a full description of a behavior's lifecycle. You add behaviors to Object3Ds
* with [addBehavior]{@link THREE.Object3D}.
* @module altspace/utilities/behaviors
*/

'use strict';




var index$1 = Object.freeze({
	Behavior: Behavior,
	Bob: Bob,
	ButtonStateStyle: ButtonStateStyle,
	Drag: Drag,
	GamepadControls: GamepadControls,
	HoverColor: HoverColor,
	HoverScale: HoverScale,
	JointCollisionEvents: JointCollisionEvents,
	Layout: Layout,
	Object3DSync: Object3DSync,
	SceneSync: SceneSync,
	Spin: Spin,
	SteamVRInput: SteamVRInput,
	SteamVRTrackedObject: SteamVRTrackedObject,
	TouchpadRotate: TouchpadRotate
});

'use strict';




var utilities_lib = Object.freeze({
	sync: sync,
	Simulation: Simulation,
	multiloader: multiloader,
	codePen: codepen,
	shims: index,
	behaviors: index$1
});

'use strict';

/**
* The main module for the AltspaceVR SDK.
* @module altspace
*/

// include source packages
if(!Object.isFrozen(window.altspace))
	{ Object.assign(window.altspace, {components: {}, utilities: {}, inClient: false}); }

var version = '2.8.0';
if (window.altspace.requestVersion) {
	window.altspace.requestVersion(version);
}

// copy aframe's bundled version of THREE to global namespace
if(window.AFRAME && !window.THREE){
	window.THREE = window.AFRAME.THREE;
}

Object.assign(window.altspace.components || {}, components_lib);
Object.assign(window.altspace.utilities || {}, utilities_lib);

}(Url,Firebase,Please));
