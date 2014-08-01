!function(a,b){"undefined"!=typeof exports?b(a,exports,require("underscore")):"function"==typeof define&&define.amd?define(["underscore","jquery","exports"],function(c,d,e){a.Backbone=b(a,e,c,d)}):a.Backbone=b(a,{},a._,a.jQuery||a.Zepto||a.ender)}(this,function(a,b,c,d){var e=a.Backbone,f=Array.prototype.slice,g=Array.prototype.splice;b.VERSION="0.9.2",b.setDomLibrary=function(a){d=a},b.noConflict=function(){return a.Backbone=e,b},b.emulateHTTP=!1,b.emulateJSON=!1;var h=/\s+/,i=b.Events={on:function(a,b,c){var d,e,f,g,i;if(!b)return this;for(a=a.split(h),d=this._callbacks||(this._callbacks={});e=a.shift();)f=(i=d[e])?i.tail:{},f.next=g={},f.context=c,f.callback=b,d[e]={tail:g,next:i?i.next:f};return this},off:function(a,b,d){var e,f,g,i,j,k;if(f=this._callbacks){if(!a&&!b&&!d)return delete this._callbacks,this;for(a=a?a.split(h):c.keys(f);e=a.shift();)if(g=f[e],delete f[e],g&&(b||d))for(i=g.tail;(g=g.next)!==i;)j=g.callback,k=g.context,(b&&j!==b||d&&k!==d)&&this.on(e,j,k);return this}},trigger:function(a){var b,c,d,e,g,i;if(!(d=this._callbacks))return this;for(g=d.all,a=a.split(h),i=f.call(arguments,1);b=a.shift();){if(c=d[b])for(e=c.tail;(c=c.next)!==e;)c.callback.apply(c.context||this,i);if(c=g)for(e=c.tail,b=[b].concat(i);(c=c.next)!==e;)c.callback.apply(c.context||this,b)}return this}};i.bind=i.on,i.unbind=i.off;var j=b.Model=function(a,b){var d;a||(a={}),b&&b.parse&&(a=this.parse(a)),(d=y(this,"defaults"))&&(a=c.extend({},d,a)),b&&b.collection&&(this.collection=b.collection),this.attributes={},this._escapedAttributes={},this.cid=c.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(a,{silent:!0}),this.changed={},this._silent={},this._pending={},this._previousAttributes=c.clone(this.attributes),this.initialize.apply(this,arguments)};c.extend(j.prototype,i,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(){return c.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;return(b=this._escapedAttributes[a])?b:(b=this.get(a),this._escapedAttributes[a]=c.escape(null==b?"":""+b))},has:function(a){return null!=this.get(a)},set:function(a,b,d){var e,f;if(c.isObject(a)||null==a?(e=a,d=b):(e={},e[a]=b),d||(d={}),!e)return this;if(e instanceof j&&(e=e.attributes),d.unset)for(f in e)e[f]=void 0;if(!this._validate(e,d))return!1;this.idAttribute in e&&(this.id=e[this.idAttribute]);var b=d.changes={},g=this.attributes,h=this._escapedAttributes,i=this._previousAttributes||{};for(f in e)a=e[f],(!c.isEqual(g[f],a)||d.unset&&c.has(g,f))&&(delete h[f],(d.silent?this._silent:b)[f]=!0),d.unset?delete g[f]:g[f]=a,c.isEqual(i[f],a)&&c.has(g,f)==c.has(i,f)?(delete this.changed[f],delete this._pending[f]):(this.changed[f]=a,d.silent||(this._pending[f]=!0));return d.silent||this.change(d),this},unset:function(a,b){return(b||(b={})).unset=!0,this.set(a,null,b)},clear:function(a){return(a||(a={})).unset=!0,this.set(c.clone(this.attributes),a)},fetch:function(a){var a=a?c.clone(a):{},d=this,e=a.success;return a.success=function(b,c,f){return d.set(d.parse(b,f),a)?void(e&&e(d,b)):!1},a.error=b.wrapError(a.error,d,a),(this.sync||b.sync).call(this,"read",this,a)},save:function(a,d,e){var f,g;if(c.isObject(a)||null==a?(f=a,e=d):(f={},f[a]=d),e=e?c.clone(e):{},e.wait){if(!this._validate(f,e))return!1;g=c.clone(this.attributes)}if(a=c.extend({},e,{silent:!0}),f&&!this.set(f,e.wait?a:e))return!1;var h=this,i=e.success;return e.success=function(a,b,d){return b=h.parse(a,d),e.wait&&(delete e.wait,b=c.extend(f||{},b)),h.set(b,e)?void(i?i(h,a):h.trigger("sync",h,a,e)):!1},e.error=b.wrapError(e.error,h,e),d=this.isNew()?"create":"update",d=(this.sync||b.sync).call(this,d,this,e),e.wait&&this.set(g,a),d},destroy:function(a){var a=a?c.clone(a):{},d=this,e=a.success,f=function(){d.trigger("destroy",d,d.collection,a)};if(this.isNew())return f(),!1;a.success=function(b){a.wait&&f(),e?e(d,b):d.trigger("sync",d,b,a)},a.error=b.wrapError(a.error,d,a);var g=(this.sync||b.sync).call(this,"delete",this,a);return a.wait||f(),g},url:function(){var a=y(this,"urlRoot")||y(this.collection,"url")||z();return this.isNew()?a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var d in this._silent)this._pending[d]=!0;var e=c.extend({},a.changes,this._silent);this._silent={};for(d in e)this.trigger("change:"+d,this,this.get(d),a);if(b)return this;for(;!c.isEmpty(this._pending);){this._pending={},this.trigger("change",this,a);for(d in this.changed)!this._pending[d]&&!this._silent[d]&&delete this.changed[d];this._previousAttributes=c.clone(this.attributes)}return this._changing=!1,this},hasChanged:function(a){return arguments.length?c.has(this.changed,a):!c.isEmpty(this.changed)},changedAttributes:function(a){if(!a)return this.hasChanged()?c.clone(this.changed):!1;var b,d,e=!1,f=this._previousAttributes;for(d in a)c.isEqual(f[d],b=a[d])||((e||(e={}))[d]=b);return e},previous:function(a){return arguments.length&&this._previousAttributes?this._previousAttributes[a]:null},previousAttributes:function(){return c.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;var a=c.extend({},this.attributes,a),d=this.validate(a,b);return d?(b&&b.error?b.error(this,d,b):this.trigger("error",this,d,b),!1):!0}});var k=b.Collection=function(a,b){b||(b={}),b.model&&(this.model=b.model),b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,{silent:!0,parse:b.parse})};c.extend(k.prototype,i,{model:j,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var d,e,f,h,i,j={},k={},l=[];for(b||(b={}),a=c.isArray(a)?a.slice():[a],d=0,e=a.length;e>d;d++){if(!(f=a[d]=this._prepareModel(a[d],b)))throw Error("Can't add an invalid model to a collection");h=f.cid,i=f.id,j[h]||this._byCid[h]||null!=i&&(k[i]||this._byId[i])?l.push(d):j[h]=k[i]=f}for(d=l.length;d--;)a.splice(l[d],1);for(d=0,e=a.length;e>d;d++)(f=a[d]).on("all",this._onModelEvent,this),this._byCid[f.cid]=f,null!=f.id&&(this._byId[f.id]=f);if(this.length+=e,g.apply(this.models,[null!=b.at?b.at:this.models.length,0].concat(a)),this.comparator&&this.sort({silent:!0}),b.silent)return this;for(d=0,e=this.models.length;e>d;d++)j[(f=this.models[d]).cid]&&(b.index=d,f.trigger("add",f,this,b));return this},remove:function(a,b){var d,e,f,g;for(b||(b={}),a=c.isArray(a)?a.slice():[a],d=0,e=a.length;e>d;d++)(g=this.getByCid(a[d])||this.get(a[d]))&&(delete this._byId[g.id],delete this._byCid[g.cid],f=this.indexOf(g),this.models.splice(f,1),this.length--,b.silent||(b.index=f,g.trigger("remove",g,this,b)),this._removeReference(g));return this},push:function(a,b){return a=this._prepareModel(a,b),this.add(a,b),a},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return a=this._prepareModel(a,b),this.add(a,c.extend({at:0},b)),a},shift:function(a){var b=this.at(0);return this.remove(b,a),b},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return c.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){if(a||(a={}),!this.comparator)throw Error("Cannot sort a set without a comparator");var b=c.bind(this.comparator,this);return 1==this.comparator.length?this.models=this.sortBy(b):this.models.sort(b),a.silent||this.trigger("reset",this,a),this},pluck:function(a){return c.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]),b||(b={});for(var d=0,e=this.models.length;e>d;d++)this._removeReference(this.models[d]);return this._reset(),this.add(a,c.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),this},fetch:function(a){a=a?c.clone(a):{},void 0===a.parse&&(a.parse=!0);var d=this,e=a.success;return a.success=function(b,c,f){d[a.add?"add":"reset"](d.parse(b,f),a),e&&e(d,b)},a.error=b.wrapError(a.error,d,a),(this.sync||b.sync).call(this,"read",this,a)},create:function(a,b){var d=this,b=b?c.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||d.add(a,b);var e=b.success;return b.success=function(c,f){b.wait&&d.add(c,b),e?e(c,f):c.trigger("sync",a,f,b)},a.save(null,b),a},parse:function(a){return a},chain:function(){return c(this.models).chain()},_reset:function(){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(a,b){if(b||(b={}),a instanceof j)a.collection||(a.collection=this);else{b.collection=this,a=new this.model(a,b),a._validate(a.attributes,b)||(a=!1)}return a},_removeReference:function(a){this==a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"==a||"remove"==a)&&c!=this||("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments))}}),c.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(a){k.prototype[a]=function(){return c[a].apply(c,[this.models].concat(c.toArray(arguments)))}});var l=b.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},m=/:\w+/g,n=/\*\w+/g,o=/[-[\]{}()+?.,\\^$|#\s]/g;c.extend(l.prototype,i,{initialize:function(){},route:function(a,d,e){return b.history||(b.history=new p),c.isRegExp(a)||(a=this._routeToRegExp(a)),e||(e=this[d]),b.history.route(a,c.bind(function(c){c=this._extractParameters(a,c),e&&e.apply(this,c),this.trigger.apply(this,["route:"+d].concat(c)),b.history.trigger("route",this,d,c)},this)),this},navigate:function(a,c){b.history.navigate(a,c)},_bindRoutes:function(){if(this.routes){var a,b=[];for(a in this.routes)b.unshift([a,this.routes[a]]);a=0;for(var c=b.length;c>a;a++)this.route(b[a][0],b[a][1],this[b[a][1]])}},_routeToRegExp:function(a){return a=a.replace(o,"\\$&").replace(m,"([^/]+)").replace(n,"(.*?)"),RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var p=b.History=function(){this.handlers=[],c.bindAll(this,"checkUrl")},q=/^[#\/]/,r=/msie [\w.]+/;p.started=!1,c.extend(p.prototype,i,{interval:50,getHash:function(a){return(a=(a?a.location:window.location).href.match(/#(.*)$/))?a[1]:""},getFragment:function(a,b){if(null==a)if(this._hasPushState||b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=this.getHash();return a.indexOf(this.options.root)||(a=a.substr(this.options.root.length)),a.replace(q,"")},start:function(a){if(p.started)throw Error("Backbone.history has already been started");p.started=!0,this.options=c.extend({},{root:"/"},this.options,a),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);var a=this.getFragment(),b=document.documentMode;return(b=r.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b))&&(this.iframe=d('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a)),this._hasPushState?d(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?d(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=a,a=window.location,b=a.pathname==this.options.root,this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b?(this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&b&&a.hash&&(this.fragment=this.getHash().replace(q,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment)),this.options.silent?void 0:this.loadUrl())},stop:function(){d(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),p.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();return a==this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe))),a==this.fragment?!1:(this.iframe&&this.navigate(a),void(this.loadUrl()||this.loadUrl(this.getHash())))},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return c.any(this.handlers,function(a){return a.route.test(b)?(a.callback(b),!0):void 0})},navigate:function(a,b){if(!p.started)return!1;b&&b!==!0||(b={trigger:b});var c=(a||"").replace(q,"");this.fragment!=c&&(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var s=b.View=function(a){this.cid=c.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},t=/^(\S+)\s*(.*)$/,u="model,collection,el,id,attributes,className,tagName".split(",");c.extend(s.prototype,i,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(a,b,c){return a=document.createElement(a),b&&d(a).attr(b),null!=c&&d(a).html(c),a},setElement:function(a,b){return this.$el&&this.undelegateEvents(),this.$el=a instanceof d?a:d(a),this.el=this.$el[0],b!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(a||(a=y(this,"events"))){this.undelegateEvents();for(var b in a){var d=a[b];if(c.isFunction(d)||(d=this[a[b]]),!d)throw Error('Method "'+a[b]+'" does not exist');var e=b.match(t),f=e[1],e=e[2],d=c.bind(d,this);f+=".delegateEvents"+this.cid,""===e?this.$el.bind(f,d):this.$el.delegate(e,f,d)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=c.extend({},this.options,a));for(var b=0,d=u.length;d>b;b++){var e=u[b];a[e]&&(this[e]=a[e])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var a=y(this,"attributes")||{};this.id&&(a.id=this.id),this.className&&(a["class"]=this.className),this.setElement(this.make(this.tagName,a),!1)}}}),j.extend=k.extend=l.extend=s.extend=function(a,b){var c=x(this,a,b);return c.extend=this.extend,c};var v={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};b.sync=function(a,e,f){var g=v[a];f||(f={});var h={type:g,dataType:"json"};return f.url||(h.url=y(e,"url")||z()),f.data||!e||"create"!=a&&"update"!=a||(h.contentType="application/json",h.data=JSON.stringify(e.toJSON())),b.emulateJSON&&(h.contentType="application/x-www-form-urlencoded",h.data=h.data?{model:h.data}:{}),!b.emulateHTTP||"PUT"!==g&&"DELETE"!==g||(b.emulateJSON&&(h.data._method=g),h.type="POST",h.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",g)}),"GET"===h.type||b.emulateJSON||(h.processData=!1),d.ajax(c.extend(h,f))},b.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d,a?a(b,e,c):b.trigger("error",b,e,c)}};var w=function(){},x=function(a,b,d){var e;return e=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)},c.extend(e,a),w.prototype=a.prototype,e.prototype=new w,b&&c.extend(e.prototype,b),d&&c.extend(e,d),e.prototype.constructor=e,e.__super__=a.prototype,e},y=function(a,b){return a&&a[b]?c.isFunction(a[b])?a[b]():a[b]:null},z=function(){throw Error('A "url" property or function must be specified')};return b});