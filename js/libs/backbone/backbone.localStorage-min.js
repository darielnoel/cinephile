!function(a,b){"object"==typeof exports&&"function"==typeof require?module.exports=b(require("backbone")):"function"==typeof define&&define.amd?define(["backbone"],function(c){return b(c||a.Backbone)}):b(Backbone)}(this,function(a){function b(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function c(){return b()+b()+"-"+b()+"-"+b()+"-"+b()+"-"+b()+b()+b()}function d(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1}function e(a,b){for(var c in b)a[c]=b[c];return a}return a.LocalStorage=window.Store=function(a,b){if(!this.localStorage)throw"Backbone.localStorage: Environment does not support localStorage.";this.name=a,this.serializer=b||{serialize:function(a){return _.isObject(a)?JSON.stringify(a):a},deserialize:function(a){return a&&JSON.parse(a)}};var c=this.localStorage().getItem(this.name);this.records=c&&c.split(",")||[]},e(a.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(a){return a.id||(a.id=c(),a.set(a.idAttribute,a.id)),this.localStorage().setItem(this._itemName(a.id),this.serializer.serialize(a)),this.records.push(a.id.toString()),this.save(),this.find(a)!==!1},update:function(a){this.localStorage().setItem(this._itemName(a.id),this.serializer.serialize(a));var b=a.id.toString();return d(this.records,b)||(this.records.push(b),this.save()),this.find(a)!==!1},find:function(a){return this.serializer.deserialize(this.localStorage().getItem(this._itemName(a.id)))},findAll:function(){for(var a,b,c=[],d=0;d<this.records.length;d++)a=this.records[d],b=this.serializer.deserialize(this.localStorage().getItem(this._itemName(a))),null!=b&&c.push(b);return c},destroy:function(a){this.localStorage().removeItem(this._itemName(a.id));for(var b=a.id.toString(),c=0;c<this.records.length;c++)this.records[c]===b&&this.records.splice(c,1);return this.save(),a},localStorage:function(){return localStorage},_clear:function(){var a=this.localStorage(),b=new RegExp("^"+this.name+"-");a.removeItem(this.name);for(var c in a)b.test(c)&&a.removeItem(c);this.records.length=0},_storageSize:function(){return this.localStorage().length},_itemName:function(a){return this.name+"-"+a}}),a.LocalStorage.sync=window.Store.sync=a.localSync=function(b,c,d){var e,f,g=c.localStorage||c.collection.localStorage,h=a.$?a.$.Deferred&&a.$.Deferred():a.Deferred&&a.Deferred();try{switch(b){case"read":e=void 0!=c.id?g.find(c):g.findAll();break;case"create":e=g.create(c);break;case"update":e=g.update(c);break;case"delete":e=g.destroy(c)}}catch(i){f=22===i.code&&0===g._storageSize()?"Private browsing is unsupported":i.message}return e?(d&&d.success&&("0.9.10"===a.VERSION?d.success(c,e,d):d.success(e)),h&&h.resolve(e)):(f=f?f:"Record Not Found",d&&d.error&&("0.9.10"===a.VERSION?d.error(c,f,d):d.error(f)),h&&h.reject(f)),d&&d.complete&&d.complete(e),h&&h.promise()},a.ajaxSync=a.sync,a.getSyncMethod=function(b){return b.localStorage||b.collection&&b.collection.localStorage?a.localSync:a.ajaxSync},a.sync=function(b,c,d){return a.getSyncMethod(c).apply(this,[b,c,d])},a.LocalStorage});