(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.now = function() {
	return Date.now();
};
var coconut_diffing_Widget = function(rendered,mounted,updated,unmounting) {
	this._coco_vStructure = rendered;
	this._coco_viewMounted = mounted;
	this._coco_viewUpdated = updated;
	this._coco_viewUnmounting = unmounting;
};
var coconut_vdom_View = function(render,shouldUpdate,track,beforeRerender,rendered) {
	this.__au = [];
	this.__bc = [];
	this.__bu = [];
	var _gthis = this;
	var mounted;
	if(rendered != null) {
		var _g = rendered;
		var a1 = true;
		mounted = function() {
			_g(a1);
		};
	} else {
		mounted = null;
	}
	var updated;
	if(rendered != null) {
		var _g1 = rendered;
		var a11 = false;
		updated = function() {
			_g1(a11);
		};
	} else {
		updated = null;
	}
	var firstTime = true;
	var last = null;
	var hasBeforeRerender = beforeRerender != null;
	var hasUpdated = updated != null;
	var _coco_revision = tink_state_State._new(0);
	var lastRev = tink_state_State.get_value(_coco_revision);
	var renderView = function() {
		var curRev = tink_state_State.get_value(_coco_revision);
		if(track != null) {
			track();
		}
		if(firstTime) {
			firstTime = false;
		} else {
			if(curRev == lastRev && shouldUpdate != null && !shouldUpdate()) {
				return last;
			}
			var hasCallbacks = _gthis.__bc.length > 0;
			if(hasBeforeRerender || hasCallbacks) {
				var before = tink_state_internal_AutoObservable.cur;
				tink_state_internal_AutoObservable.cur = null;
				if(hasBeforeRerender) {
					beforeRerender();
				}
				if(hasCallbacks) {
					var _g = 0;
					var _g1 = _gthis.__bc.splice(0,_gthis.__bc.length);
					while(_g < _g1.length) {
						var c = _g1[_g];
						++_g;
						tink_core_Callback.invoke(c,false);
					}
				}
				var ret = null;
				tink_state_internal_AutoObservable.cur = before;
			}
		}
		lastRev = curRev;
		last = render();
		return last;
	};
	coconut_diffing_Widget.call(this,new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(renderView),null,null),mounted,function() {
		var hasCallbacks = _gthis.__au.length > 0;
		if(hasUpdated || hasCallbacks) {
			var before = tink_state_internal_AutoObservable.cur;
			tink_state_internal_AutoObservable.cur = null;
			if(hasUpdated) {
				updated();
			}
			if(hasCallbacks) {
				var _g = 0;
				var _g1 = _gthis.__au.splice(0,_gthis.__au.length);
				while(_g < _g1.length) {
					var c = _g1[_g];
					++_g;
					tink_core_Callback.invoke(c,null);
				}
			}
			var ret = null;
			tink_state_internal_AutoObservable.cur = before;
		}
	},function() {
		last = null;
		firstTime = true;
		_gthis.__beforeUnmount();
	});
	this._coco_revision = _coco_revision;
};
coconut_vdom_View.__super__ = coconut_diffing_Widget;
coconut_vdom_View.prototype = $extend(coconut_diffing_Widget.prototype,{
	__beforeUnmount: function() {
		var _g = 0;
		var _g1 = this.__bu.splice(0,this.__bu.length);
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c != null) {
				c.cancel();
			}
		}
		var _g = 0;
		var _g1 = this.__bc.splice(0,this.__bu.length);
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			tink_core_Callback.invoke(c,true);
		}
	}
});
var Main = function(__coco_data_,implicits) {
	var _gthis = this;
	this._coco_implicits = implicits;
	this.__coco_count = tink_state_State._new(0,null);
	this.__initAttributes(__coco_data_);
	var snapshot = null;
	coconut_vdom_View.call(this,function() {
		return _gthis.render();
	},null,null,null,null);
};
Main.main = function() {
	coconut_vdom_Renderer.mountInto(window.document.getElementById("demo"),Main.fromHxx({ },{ }));
};
Main.fromHxx = function(hxxMeta,attributes) {
	var _g = Main.__factory;
	var tmp;
	if(_g == null) {
		tmp = Main.__factory = new coconut_diffing_internal_WidgetFactory(function(__coco_data_,implicits) {
			return new Main(__coco_data_,implicits);
		},function(v,attr) {
			v.__initAttributes(attr);
		});
	} else {
		var v = _g;
		tmp = v;
	}
	return new coconut_diffing_internal_VWidget(tmp,attributes,hxxMeta.key,hxxMeta.ref);
};
Main.__super__ = coconut_vdom_View;
Main.prototype = $extend(coconut_vdom_View.prototype,{
	render: function() {
		var _gthis = this;
		var hxxMeta = { };
		var __r = [];
		var hxxMeta1 = { };
		var __r1 = [];
		__r1.push(coconut_vdom__$Html_Text.inst.vnode("Click Here! (Clicked ",null,null,null));
		__r1.push(coconut_vdom_RenderResult.ofInt(tink_state_State.get_value(this.__coco_count)));
		__r1.push(coconut_vdom__$Html_Text.inst.vnode(" times)",null,null,null));
		__r.push(coconut_vdom_Html.BUTTON.vnode({ onclick : function() {
			var lhs = tink_state_State.get_value(_gthis.__coco_count);
			var param = lhs + 1;
			_gthis.__coco_count.set(param);
			return lhs;
		}},hxxMeta1.key,hxxMeta1.ref,__r1));
		__r.push(Bar.fromHxx({ },{ }));
		return coconut_vdom_Html.DIV.vnode({ },hxxMeta.key,hxxMeta.ref,__r);
	}
	,__initAttributes: function(attributes) {
	}
});
var Foo = function(__coco_data_,implicits) {
	var _gthis = this;
	this._coco_implicits = implicits;
	this.__coco_foo = new coconut_ui_internal_Slot(this,null,null);
	this.__initAttributes(__coco_data_);
	var snapshot = null;
	coconut_vdom_View.call(this,function() {
		return _gthis.render();
	},null,null,null,null);
};
Foo.fromHxx = function(hxxMeta,attributes) {
	var _g = Foo.__factory;
	var tmp;
	if(_g == null) {
		tmp = Foo.__factory = new coconut_diffing_internal_WidgetFactory(function(__coco_data_,implicits) {
			return new Foo(__coco_data_,implicits);
		},function(v,attr) {
			v.__initAttributes(attr);
		});
	} else {
		var v = _g;
		tmp = v;
	}
	return new coconut_diffing_internal_VWidget(tmp,attributes,hxxMeta.key,hxxMeta.ref);
};
Foo.__super__ = coconut_vdom_View;
Foo.prototype = $extend(coconut_vdom_View.prototype,{
	render: function() {
		var hxxMeta = { };
		var attr = { id : "foo-" + tink_state_Observable.get_value(this.__coco_foo)};
		var __r = [];
		__r.push(coconut_vdom__$Html_Text.inst.vnode("foo-",null,null,null));
		__r.push(coconut_vdom_RenderResult.ofInt(tink_state_Observable.get_value(this.__coco_foo)));
		return coconut_vdom_Html.DIV.vnode(attr,hxxMeta.key,hxxMeta.ref,__r);
	}
	,__initAttributes: function(attributes) {
		this.__coco_foo.setData(attributes.foo);
	}
});
var Bar = function(__coco_data_,implicits) {
	var _gthis = this;
	this._coco_implicits = implicits;
	this.__initAttributes(__coco_data_);
	var snapshot = null;
	coconut_vdom_View.call(this,function() {
		return _gthis.render();
	},null,null,null,null);
};
Bar.fromHxx = function(hxxMeta,attributes) {
	var _g = Bar.__factory;
	var tmp;
	if(_g == null) {
		tmp = Bar.__factory = new coconut_diffing_internal_WidgetFactory(function(__coco_data_,implicits) {
			return new Bar(__coco_data_,implicits);
		},function(v,attr) {
			v.__initAttributes(attr);
		});
	} else {
		var v = _g;
		tmp = v;
	}
	return new coconut_diffing_internal_VWidget(tmp,attributes,hxxMeta.key,hxxMeta.ref);
};
Bar.__super__ = coconut_vdom_View;
Bar.prototype = $extend(coconut_vdom_View.prototype,{
	render: function() {
		var tmp = new tink_state__$Observable_ConstObservable(42,null);
		return Foo.fromHxx({ },{ foo : tmp});
	}
	,__initAttributes: function(attributes) {
	}
});
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var StringTools = function() { };
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
var coconut_diffing_Cursor = function(applicator) {
	this.applicator = applicator;
};
coconut_diffing_Cursor.prototype = {
	current: function() {
		return null;
	}
};
var coconut_diffing_Factory = function() {
	var this1 = coconut_diffing_TypeId.idCounter++;
	this.type = this1;
};
coconut_diffing_Factory.prototype = {
	adopt: function(target) {
		return null;
	}
	,hydrate: function(target,data) {
	}
	,vnode: function(data,key,ref,children) {
		return new coconut_diffing_internal_VNative(this,data,key,ref,children);
	}
};
var coconut_diffing_Properties = function(construct,apply) {
	coconut_diffing_Factory.call(this);
	this.construct = construct;
	this.apply = apply;
};
coconut_diffing_Properties.set = function(target,nu,old,apply) {
	if(nu == null) {
		if(old != null) {
			var old1 = old;
			var _g = 0;
			var _g1 = Reflect.fields(old1);
			while(_g < _g1.length) {
				var k = _g1[_g];
				++_g;
				apply(target,k,null,null);
			}
		}
	} else if(old == null) {
		var nu1 = nu;
		var access = nu1;
		var _g_access = access;
		var _g_keys = Reflect.fields(access);
		var _g_index = 0;
		while(_g_index < _g_keys.length) {
			var key = _g_keys[_g_index++];
			var _g1_value = _g_access[key];
			var _g1_key = key;
			var k = _g1_key;
			var v = _g1_value;
			apply(target,k,v,null);
		}
	} else {
		var nu1 = nu;
		var old1 = old;
		var access = nu1;
		var _g_access = access;
		var _g_keys = Reflect.fields(access);
		var _g_index = 0;
		while(_g_index < _g_keys.length) {
			var key = _g_keys[_g_index++];
			var _g1_value = _g_access[key];
			var _g1_key = key;
			var k = _g1_key;
			var v = _g1_value;
			var old = old1[k];
			if(v != old) {
				apply(target,k,v,old);
			}
		}
		var _g = 0;
		var _g1 = Reflect.fields(old1);
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			if(!Object.prototype.hasOwnProperty.call(nu1,k)) {
				apply(target,k,null,null);
			}
		}
	}
};
coconut_diffing_Properties.__super__ = coconut_diffing_Factory;
coconut_diffing_Properties.prototype = $extend(coconut_diffing_Factory.prototype,{
	create: function(data) {
		var ret = this.construct();
		this.update(ret,data,null);
		return ret;
	}
	,update: function(target,next,prev) {
		coconut_diffing_Properties.set(target,next,prev,this.apply);
	}
});
var coconut_diffing_internal_Parent = function(context,parent) {
	this.pendingUpdates = [];
	this.context = context;
	this.parent = parent;
};
coconut_diffing_internal_Parent.withLater = function(f) {
	var tasks = [];
	var ret = f(function(task) {
		if(task != null) {
			tasks.push(task);
		}
	});
	var _g = 0;
	while(_g < tasks.length) {
		var t = tasks[_g];
		++_g;
		t();
	}
	return ret;
};
coconut_diffing_internal_Parent.prototype = {
	scheduleUpdate: function(child) {
		if(this.pendingUpdates.push(child) == 1) {
			this.invalidateParent();
		}
	}
	,performUpdate: function(later) {
		if(this.pendingUpdates.length > 0) {
			var _g = 0;
			var _g1 = this.pendingUpdates.splice(0,this.pendingUpdates.length);
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.performUpdate(later);
			}
		}
	}
	,invalidateParent: function() {
		var _gthis = this;
		var _g = this.parent;
		if(_g == null) {
			tink_state_Observable.scheduler.schedule(tink_state__$Scheduler_JustOnce.call(function() {
				coconut_diffing_internal_Parent.withLater($bind(_gthis,_gthis.performUpdate));
			}));
		} else {
			var v = _g;
			v.scheduleUpdate(this);
		}
	}
};
var coconut_diffing_Root = function(parent,applicator,content,hydration) {
	if(hydration == null) {
		hydration = 0;
	}
	var _gthis = this;
	coconut_diffing_internal_Parent.call(this,new coconut_ui_internal_ImplicitContext());
	var rendered = coconut_diffing_internal_Parent.withLater(function(later) {
		return new coconut_diffing_internal_RCell(_gthis,content,hydration == 2 ? applicator.siblings(parent) : applicator.children(parent),later,hydration != 0);
	});
	this.rendered = rendered;
};
coconut_diffing_Root.fromNative = function(parent,applicator) {
	var _g = coconut_diffing_Root.byParent.h[parent.__id__];
	var tmp;
	if(_g == null) {
		var v = new coconut_diffing_Root(parent,applicator);
		coconut_diffing_Root.byParent.set(parent,v);
		tmp = v;
	} else {
		var v = _g;
		tmp = v;
	}
	return tmp;
};
coconut_diffing_Root.__super__ = coconut_diffing_internal_Parent;
coconut_diffing_Root.prototype = $extend(coconut_diffing_internal_Parent.prototype,{
	render: function(v) {
		var _gthis = this;
		coconut_diffing_internal_Parent.withLater(function(later) {
			return _gthis.rendered.update(v,null,later);
		});
	}
});
var coconut_diffing_TypeId = {};
var coconut_diffing_internal_RCell = function(parent,virtual,cursor,later,hydrate) {
	this.empty = new coconut_diffing_internal_VEmpty();
	this.parent = parent;
	if(virtual == null) {
		virtual = this.empty;
	}
	this.virtual = virtual;
	this.rendered = virtual.render(parent,cursor,later,hydrate);
	this.applicator = cursor.applicator;
};
coconut_diffing_internal_RCell.prototype = {
	update: function(virtual,cursor,later) {
		var cursor1;
		if(cursor == null) {
			cursor1 = this.rendered.reiterate(this.applicator);
		} else {
			var v = cursor;
			cursor1 = v;
		}
		var unchanged = virtual == this.virtual;
		if(unchanged) {
			this.rendered.justInsert(cursor1,later);
		} else {
			if(virtual == null) {
				virtual = this.empty;
			}
			var last = this.virtual;
			this.virtual = virtual;
			if(last.type == virtual.type) {
				this.rendered.update(virtual,cursor1,later);
			} else {
				var old = this.rendered;
				this.rendered = virtual.render(this.parent,cursor1,later,false);
				cursor1.delete(old.destroy(this.applicator));
			}
		}
		return !unchanged;
	}
	,destroy: function(applicator) {
		return this.rendered.destroy(applicator);
	}
};
var coconut_diffing_internal_RChildren = function(parent,children,cursor,later,hydrate) {
	this.order = [];
	this.counts = new haxe_ds_IntMap();
	this.byType = new haxe_ds_IntMap();
	this.parent = parent;
	var _g = 0;
	while(_g < (children == null ? 0 : children.length)) {
		var c = children == null ? null : children[_g];
		++_g;
		if(c != null) {
			var r = c.render(parent,cursor,later,hydrate);
			var _g1 = c.key;
			var _g2 = this.byType.h[r.type];
			if(_g1 == null) {
				if(_g2 == null) {
					var v = [r];
					this.byType.h[r.type] = v;
				} else {
					var a = _g2;
					a.push(r);
				}
			} else {
				var k = _g1;
				this.setKey(k,r);
			}
			this.order.push(r);
		}
	}
};
coconut_diffing_internal_RChildren.prototype = {
	setKey: function(k,v) {
		var m;
		var _g = this.byKey;
		if(_g == null) {
			var this1 = new Map();
			var this2 = this1;
			m = this.byKey = this2;
		} else {
			var v1 = _g;
			m = v1;
		}
		m.set(k,v);
		return v;
	}
	,update: function(children,cursor,later) {
		var _gthis = this;
		var k = this.byType.keys();
		while(k.hasNext()) {
			var k1 = k.next();
			this.counts.h[k1] = 0;
		}
		var oldKeyed = this.byKey;
		this.byKey = null;
		var deleteCount = 0;
		var applicator = cursor.applicator;
		var index = 0;
		var _g = 0;
		while(_g < (children == null ? 0 : children.length)) {
			var v = children == null ? null : children[_g];
			++_g;
			if(v != null) {
				var tmp = this.order;
				var tmp1 = index++;
				var _g1 = v.key;
				var _g2 = this.byType.h[v.type];
				var tmp2;
				if(_g1 == null) {
					if(_g2 == null) {
						var v1 = [];
						this.byType.h[v.type] = v1;
						this.counts.h[v.type] = 0;
						var tmp3 = _gthis.byType.h[v.type];
						var tmp4 = v.type;
						var tmp5 = _gthis.counts.h[tmp4];
						var v2 = tmp5 + 1;
						_gthis.counts.h[tmp4] = v2;
						tmp2 = tmp3[tmp5] = v.render(_gthis.parent,cursor,later,false);
					} else {
						var rs = _g2;
						var _g3 = rs[this.counts.h[v.type]];
						if(_g3 == null) {
							var tmp6 = _gthis.byType.h[v.type];
							var tmp7 = v.type;
							var tmp8 = _gthis.counts.h[tmp7];
							var v3 = tmp8 + 1;
							_gthis.counts.h[tmp7] = v3;
							tmp2 = tmp6[tmp8] = v.render(_gthis.parent,cursor,later,false);
						} else {
							var r = _g3;
							var tmp9 = v.type;
							var v4 = this.counts.h[tmp9] + 1;
							this.counts.h[tmp9] = v4;
							r.update(v,cursor,later);
							tmp2 = r;
						}
					}
				} else {
					var k = _g1;
					var _g4;
					if(oldKeyed == null) {
						_g4 = null;
					} else {
						var m = oldKeyed;
						var _g5 = m.get(k);
						var _g6;
						if(_g5 == null) {
							_g6 = null;
						} else {
							var v5 = _g5;
							m.delete(k);
							_g6 = v5;
						}
						_g4 = _g6;
					}
					if(_g4 == null) {
						tmp2 = _gthis.setKey(k,v.render(_gthis.parent,cursor,later,false));
					} else {
						var old = _g4;
						if(old.type == v.type) {
							old.update(v,cursor,later);
							tmp2 = this.setKey(k,old);
						} else {
							deleteCount += old.destroy(applicator);
							tmp2 = _gthis.setKey(k,v.render(_gthis.parent,cursor,later,false));
						}
					}
				}
				tmp[tmp1] = tmp2;
			}
		}
		this.order.length = index;
		var _g = new haxe_iterators_MapKeyValueIterator(this.counts);
		while(_g.hasNext()) {
			var _g1 = _g.next();
			var id = _g1.key;
			var count = _g1.value;
			var _g2 = this.byType.h[id];
			if(_g2.length - count != 0) {
				var a = _g2;
				var _g3 = count;
				var _g4 = a.length;
				while(_g3 < _g4) {
					var i = _g3++;
					deleteCount += a[i].destroy(applicator);
				}
				a.length = count;
			}
		}
		if(oldKeyed != null) {
			var _g = this.byKey;
			if(_g == null) {
				var f = function(r) {
					deleteCount += r.destroy(applicator);
				};
				oldKeyed.forEach(function(v,_,_1) {
					f(v);
				});
			} else {
				var m = _g;
				var f1 = function(k,r) {
					if(!m.has(k)) {
						deleteCount += r.destroy(applicator);
					}
				};
				oldKeyed.forEach(function(v,k,_) {
					f1(k,v);
				});
			}
		}
		cursor.delete(deleteCount);
	}
	,destroy: function(applicator) {
		var ret = 0;
		var _g = 0;
		var _g1 = this.order;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			ret += r.destroy(applicator);
		}
		return ret;
	}
};
var coconut_diffing_internal_VEmpty = function() {
	this.key = null;
	this.type = coconut_diffing_internal_VEmpty.TYPE;
};
coconut_diffing_internal_VEmpty.prototype = {
	render: function(_,cursor,_1,hydrate) {
		return new coconut_diffing_internal_REmpty(cursor);
	}
};
var coconut_diffing_internal_REmpty = function(cursor) {
	this.type = coconut_diffing_internal_VEmpty.TYPE;
	cursor.insert(this.marker = cursor.applicator.createMarker());
};
coconut_diffing_internal_REmpty.prototype = {
	reiterate: function(applicator) {
		return applicator.siblings(this.marker);
	}
	,update: function(next,cursor,later) {
		cursor.insert(this.marker);
	}
	,justInsert: function(cursor,_) {
		cursor.insert(this.marker);
	}
	,destroy: function(applicator) {
		applicator.releaseMarker(this.marker);
		return 1;
	}
};
var coconut_diffing_internal_VNativeBase = function(type,key,ref,children) {
	this.type = type;
	this.key = key;
	this.ref = ref;
	this.children = children;
};
coconut_diffing_internal_VNativeBase.prototype = {
	render: function(parent,cursor,later,hydrate) {
		return new coconut_diffing_internal_RNativeBase(this,coconut_diffing_internal_VNativeBase,parent,cursor,later,hydrate);
	}
	,create: function(previous) {
		throw haxe_Exception.thrown("abstract");
	}
};
var coconut_diffing_internal_VNative = function(factory,data,key,ref,children) {
	coconut_diffing_internal_VNativeBase.call(this,factory.type,key,ref,children);
	this.factory = factory;
	this.data = data;
};
coconut_diffing_internal_VNative.__super__ = coconut_diffing_internal_VNativeBase;
coconut_diffing_internal_VNative.prototype = $extend(coconut_diffing_internal_VNativeBase.prototype,{
	render: function(parent,cursor,later,hydrate) {
		return new coconut_diffing_internal_RNative(this,coconut_diffing_internal_VNative,parent,cursor,later,hydrate);
	}
	,create: function(previous) {
		if(previous == null) {
			return this.factory.create(this.data);
		} else {
			var v = previous;
			var _g = this.factory.adopt(v);
			if(_g == null) {
				return this.factory.create(this.data);
			} else {
				var v = _g;
				this.factory.hydrate(v,this.data);
				return v;
			}
		}
	}
});
var coconut_diffing_internal_RNativeBase = function(v,cls,parent,cursor,later,hydrate) {
	this.last = v;
	this.cls = cls;
	this.type = v.type;
	this.native = v.create(hydrate ? cursor.current() : null);
	this.children = new coconut_diffing_internal_RChildren(parent,v.children,cursor.applicator.children(this.native),later,hydrate);
	cursor.insert(this.native);
	var _g = v.ref;
	if(_g != null) {
		var f = _g;
		f(this.native);
	}
};
coconut_diffing_internal_RNativeBase.prototype = {
	justInsert: function(cursor,_) {
		cursor.insert(this.native);
	}
	,updateNative: function(native,next,last,parent,later) {
		throw haxe_Exception.thrown("abstract");
	}
	,update: function(next,cursor,later) {
		var next1 = next;
		if(next1 == this.last) {
			this.justInsert(cursor,later);
			return;
		}
		this.updateNative(this.native,next1,this.last,this.children.parent,later);
		var prev = this.last;
		this.last = next1;
		this.children.update(next1.children,cursor.applicator.children(this.native),later);
		cursor.insert(this.native);
		if(prev.ref != next1.ref) {
			var _g = prev.ref;
			if(_g != null) {
				var f = _g;
				f(null);
			}
			var _g = next1.ref;
			if(_g != null) {
				var f = _g;
				f(this.native);
			}
		}
	}
	,reiterate: function(applicator) {
		return applicator.siblings(this.native);
	}
	,destroy: function(applicator) {
		applicator.children(this.native).delete(this.children.destroy(applicator));
		var _g = this.last.ref;
		if(_g != null) {
			var f = _g;
			f(null);
		}
		return 1;
	}
};
var coconut_diffing_internal_RNative = function(v,cls,parent,cursor,later,hydrate) {
	coconut_diffing_internal_RNativeBase.call(this,v,cls,parent,cursor,later,hydrate);
};
coconut_diffing_internal_RNative.__super__ = coconut_diffing_internal_RNativeBase;
coconut_diffing_internal_RNative.prototype = $extend(coconut_diffing_internal_RNativeBase.prototype,{
	updateNative: function(native,next,last,_,_1) {
		next.factory.update(native,next.data,last.data);
	}
});
var coconut_diffing_internal_VWidget = function(factory,data,key,ref) {
	this.factory = factory;
	this.type = factory.type;
	this.data = data;
	this.ref = ref;
	this.key = key;
};
coconut_diffing_internal_VWidget.prototype = {
	render: function(parent,cursor,later,hydrate) {
		return new coconut_diffing_internal_RWidget(parent,this,cursor,later,hydrate);
	}
};
var coconut_diffing_internal_WidgetLifeCycle = function(owner,context,parent,cursor,later,hydrate) {
	coconut_diffing_internal_Parent.call(this,context,parent);
	this.owner = owner;
	owner._coco_lifeCycle = this;
	this.applicator = cursor.applicator;
	this.rendered = new coconut_diffing_internal_RCell(this,this.poll(),cursor,later,hydrate);
	this.link = owner._coco_vStructure.onInvalidate(this);
	later(owner._coco_viewMounted);
};
coconut_diffing_internal_WidgetLifeCycle.__super__ = coconut_diffing_internal_Parent;
coconut_diffing_internal_WidgetLifeCycle.prototype = $extend(coconut_diffing_internal_Parent.prototype,{
	poll: function() {
		var before = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		var ret = tink_state_Observable.get_value(this.owner._coco_vStructure);
		tink_state_internal_AutoObservable.cur = before;
		return ret;
	}
	,reiterate: function(applicator) {
		return this.rendered.rendered.reiterate(applicator);
	}
	,justInsert: function(cursor,later) {
		this.rerender(later,cursor);
	}
	,rerender: function(later,cursor) {
		if(this.rendered.update(this.poll(),cursor,later)) {
			later(this.owner._coco_viewUpdated);
		}
	}
	,performUpdate: function(later) {
		if(this.owner._coco_lifeCycle != this) {
			return;
		}
		this.rerender(later);
		coconut_diffing_internal_Parent.prototype.performUpdate.call(this,later);
	}
	,invalidate: function() {
		this.invalidateParent();
	}
	,destroy: function(applicator) {
		var _g = this.owner._coco_viewUnmounting;
		if(_g != null) {
			var f = _g;
			f();
		}
		var this1 = this.link;
		if(this1 != null) {
			this1.cancel();
		}
		this.owner._coco_lifeCycle = null;
		return this.rendered.destroy(applicator);
	}
});
var coconut_diffing_internal_RWidget = function(parent,v,cursor,later,hydrate) {
	var context = parent.context;
	var widget = v.factory.create(v.data,context);
	coconut_diffing_internal_WidgetLifeCycle.call(this,widget,context,parent,cursor,later,hydrate);
	this.last = v;
	this.type = v.type;
	this.widget = widget;
	var _g = v.ref;
	if(_g != null) {
		var f = _g;
		f(widget);
	}
};
coconut_diffing_internal_RWidget.__super__ = coconut_diffing_internal_WidgetLifeCycle;
coconut_diffing_internal_RWidget.prototype = $extend(coconut_diffing_internal_WidgetLifeCycle.prototype,{
	update: function(next,cursor,later) {
		var next1 = next;
		if(this.last == next1) {
			this.justInsert(cursor,later);
			return;
		}
		if(next1.ref != this.last.ref) {
			var _g = this.last.ref;
			if(_g != null) {
				var f = _g;
				f(null);
			}
			var _g = next1.ref;
			if(_g != null) {
				var f = _g;
				f(this.widget);
			}
		}
		this.last = next1;
		next1.factory.update(this.widget,next1.data);
		this.rerender(later,cursor);
	}
	,destroy: function(applicator) {
		var _g = this.last.ref;
		if(_g != null) {
			var f = _g;
			f(null);
		}
		return coconut_diffing_internal_WidgetLifeCycle.prototype.destroy.call(this,applicator);
	}
});
var coconut_diffing_internal_WidgetFactory = function(create,update) {
	var this1 = coconut_diffing_TypeId.idCounter++;
	this.type = this1;
	this._create = create;
	this._update = update;
};
coconut_diffing_internal_WidgetFactory.prototype = {
	create: function(data,context) {
		return this._create(data,context);
	}
	,update: function(target,next) {
		this._update(target,next);
	}
};
var tink_state__$Observable_ConstObservable = function(value,toString) {
	this.revision = tink_state_internal_Revision._new();
	this.value = value;
};
tink_state__$Observable_ConstObservable.prototype = {
	getRevision: function() {
		return this.revision;
	}
	,getValue: function() {
		return this.value;
	}
	,getComparator: function() {
		return null;
	}
	,onInvalidate: function(i) {
		return null;
	}
};
var tink_core__$Lazy_LazyConst = function(value) {
	this.value = value;
};
var coconut_ui_internal_ImplicitContext = function(parent) {
	var tmp;
	if(parent == null) {
		tmp = coconut_ui_internal_ImplicitContext.ORPHAN;
	} else {
		var v = parent;
		tmp = v;
	}
	this.parent = tmp;
};
var tink_state_internal_Invalidator = function(toString) {
	this.list = new tink_core_CallbackList();
	var this1 = new Map();
	this.observers = this1;
	this.revision = tink_state_internal_Revision._new();
};
tink_state_internal_Invalidator.prototype = {
	getRevision: function() {
		return this.revision;
	}
	,onInvalidate: function(i) {
		var _gthis = this;
		if(this.observers.get(i)) {
			return null;
		} else {
			this.observers.set(i,true);
			var _this = this.list;
			var this1;
			if(_this.disposeHandlers == null) {
				this1 = null;
			} else {
				var node = new tink_core__$Callback_ListCell(function(_) {
					i.invalidate();
				},_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					var fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				this1 = node;
			}
			var this2 = new tink_core_SimpleLink(function() {
				return _gthis.observers.delete(i);
			});
			return new tink_core__$Callback_LinkPair(this1,this2);
		}
	}
	,fire: function() {
		this.revision = tink_state_internal_Revision._new();
		this.list.invoke(null);
	}
};
var coconut_ui_internal_Slot = function(owner,comparator,defaultData,toString) {
	var _gthis = this;
	tink_state_internal_Invalidator.call(this,toString);
	this.comparator = comparator;
	this.data = this.defaultData = defaultData;
	this.list.ondrain = function() {
		var this1 = _gthis.link;
		if(this1 != null) {
			this1.cancel();
		}
	};
	this.list.onfill = function() {
		_gthis.heatup();
	};
};
coconut_ui_internal_Slot.__super__ = tink_state_internal_Invalidator;
coconut_ui_internal_Slot.prototype = $extend(tink_state_internal_Invalidator.prototype,{
	heatup: function() {
		if(this.data != null) {
			this.link = this.data.onInvalidate(this);
		}
	}
	,invalidate: function() {
		this.fire();
	}
	,getComparator: function() {
		return this.comparator;
	}
	,getRevision: function() {
		var ret = this.revision;
		if(this.data != null) {
			var b = this.data.getRevision();
			if(!(ret > b)) {
				ret = b;
			}
		}
		if(this.defaultData != null) {
			var b = this.defaultData.getRevision();
			if(!(ret > b)) {
				ret = b;
			}
		}
		return ret;
	}
	,getValue: function() {
		var _g = this.data;
		var _g1 = this.defaultData;
		var _hx_tmp;
		if(_g == null) {
			if(_g1 == null) {
				return null;
			} else {
				var v = _g1;
				return v.getValue();
			}
		} else if(_g1 == null) {
			var v = _g;
			return v.getValue();
		} else {
			var v = _g1;
			_hx_tmp = _g.getValue();
			var ret = _hx_tmp;
			if(ret == null) {
				return v.getValue();
			} else {
				return ret;
			}
		}
	}
	,setData: function(data) {
		if(data == null) {
			data = this.defaultData;
		}
		if(data == this.data) {
			return;
		}
		this.data = data;
		if(this.list.used > 0) {
			var this1 = this.link;
			if(this1 != null) {
				this1.cancel();
			}
			this.heatup();
		}
		this.fire();
	}
});
var coconut_vdom__$Html_Updater = function(unset,rules,getRule) {
	this.deleters = new Map();
	this.applicators = new Map();
	this.unset = unset;
	this.rules = rules;
	this.getRule = getRule;
};
coconut_vdom__$Html_Updater.getFields = function(o) {
	var ret = Object.getOwnPropertyNames(o);
	switch(ret.length) {
	case 0:
		break;
	case 1:
		var _g = ret[0];
		break;
	case 2:
		var a = ret[0];
		var b = ret[1];
		if(a > b) {
			ret[0] = b;
			ret[1] = a;
		}
		break;
	default:
		ret.sort();
	}
	return ret;
};
coconut_vdom__$Html_Updater.prototype = {
	update: function(target,newVal,oldVal) {
		if(newVal != null) {
			(this.getApplicator(newVal))(target,newVal,oldVal);
		}
		if(oldVal != null) {
			(this.getDeleter(oldVal,newVal))(target);
		}
	}
	,getApplicator: function(obj) {
		var _gthis = this;
		var props = coconut_vdom__$Html_Updater.getFields(obj);
		var key = props.toString();
		var apply = this.applicators.get(key);
		if(apply == null) {
			var source = "if (old) {";
			var add = function(prefix) {
				var _g = 0;
				while(_g < props.length) {
					var p = props[_g];
					++_g;
					var source1 = source;
					var source2 = "\n  " + prefix(p);
					var _g1 = _gthis.getRule(_gthis.rules,p);
					var source3;
					if(_g1 == null) {
						source3 = "if (nu." + p + " == null) { " + _gthis.unset("target",p) + " } else target." + p + " = nu." + p + ";";
					} else {
						var rule = _g1;
						source3 = "this." + rule + "(target, \"" + p + "\", nu." + p + ", old && old." + p + ");";
					}
					source = source1 + (source2 + source3);
				}
			};
			add(function(p) {
				return "if (nu." + p + " !== old." + p + ") ";
			});
			source += "\n} else {";
			add(function(p) {
				return "";
			});
			source += "\n}";
			apply = new Function("target","nu","old",source).bind(this.rules);
			this.applicators.set(key,apply);
		}
		return apply;
	}
	,noop: function(target) {
	}
	,getDeleter: function(old,nu) {
		var _gthis = this;
		var forFields = function(fields) {
			var key = fields.toString();
			var ret = _gthis.deleters.get(key);
			if(ret == null) {
				var body = "";
				var _g = 0;
				var _g1 = fields;
				while(_g < _g1.length) {
					var f = _g1[_g];
					++_g;
					var _g2 = _gthis.getRule(_gthis.rules,f);
					var body1;
					if(_g2 == null) {
						body1 = _gthis.unset("target",f);
					} else {
						var rule = _g2;
						body1 = "this." + rule + "(target, \"" + f + "\", null);";
					}
					body += "\n" + body1;
				}
				var _gthis1 = _gthis.deleters;
				ret = new Function("target",body).bind(_gthis.rules);
				_gthis1.set(key,ret);
			}
			return ret;
		};
		if(nu == null) {
			return forFields(coconut_vdom__$Html_Updater.getFields(old));
		} else {
			var oldFields = coconut_vdom__$Html_Updater.getFields(old);
			var nuFields = coconut_vdom__$Html_Updater.getFields(nu);
			var nuKey = nuFields.toString();
			var oldKey = oldFields.toString();
			if(nuKey == oldKey) {
				return $bind(this,this.noop);
			} else {
				var key = "" + nuKey + ":" + oldKey;
				var ret = this.deleters.get(key);
				if(ret == null) {
					var tmp = this.deleters;
					var forFields1 = forFields;
					var _g = [];
					var _g1 = 0;
					while(_g1 < oldFields.length) {
						var f = oldFields[_g1];
						++_g1;
						if(nuFields.indexOf(f) == -1) {
							_g.push(f);
						}
					}
					ret = forFields1(_g);
					tmp.set(key,ret);
				}
				return ret;
			}
		}
	}
};
var coconut_vdom__$Html_Elt = function(tag) {
	coconut_diffing_Factory.call(this);
	this.tag = tag.toUpperCase();
};
coconut_vdom__$Html_Elt.hydrateEvents = function(target,attr) {
	var events = coconut_vdom__$Html_Elt.events;
	for (var name in attr) {
      if (name.startsWith("on")) {
        events.push(name);
      }
    }
	if(events.length > 0) {
		var handler = target.__eventHandler = { handleEvent : function(e) {
			this[e.type](e);
		}};
		var _g = 0;
		while(_g < events.length) {
			var event = events[_g];
			++_g;
			var fn = Reflect.field(attr,event);
			event = HxOverrides.substr(event,2,null);
			target.addEventListener(event,handler);
			handler[event] = fn;
		}
		events.length = 0;
	}
};
coconut_vdom__$Html_Elt.setAttributes = function(t,nu,old) {
	coconut_diffing_Properties.set(t,nu,old,function(t,k,v,_) {
		if(v == null) {
			t.removeAttribute(k);
		} else {
			t.setAttribute(k,v);
		}
	});
};
coconut_vdom__$Html_Elt.setEvent = function(element,event,newVal,_) {
	var event1 = HxOverrides.substr(event,2,null);
	var handler = element.__eventHandler;
	if(handler == null) {
		handler = { handleEvent : function(e) {
			this[e.type](e);
		}};
		element.__eventHandler = handler;
	}
	if(!Object.prototype.hasOwnProperty.call(handler,event1)) {
		element.addEventListener(event1,handler);
	}
	handler[event1] = newVal == null ? coconut_vdom__$Html_Elt.noop : newVal;
};
coconut_vdom__$Html_Elt.updateStyle = function(target,newVal,oldVal) {
	coconut_vdom__$Html_Elt.STYLES.update(target,newVal,oldVal);
};
coconut_vdom__$Html_Elt.noop = function(_) {
};
coconut_vdom__$Html_Elt.__super__ = coconut_diffing_Factory;
coconut_vdom__$Html_Elt.prototype = $extend(coconut_diffing_Factory.prototype,{
	create: function(attr) {
		var ret = window.document.createElement(this.tag);
		coconut_vdom__$Html_Elt.ELEMENTS.update(ret,attr,null);
		return ret;
	}
	,adopt: function(node) {
		if(node.nodeName == this.tag) {
			return node;
		} else {
			return null;
		}
	}
	,hydrate: function(target,attr) {
		coconut_vdom__$Html_Elt.hydrateEvents(target,attr);
	}
	,update: function(target,nu,old) {
		coconut_vdom__$Html_Elt.ELEMENTS.update(target,nu,old);
	}
});
var coconut_vdom__$Html_Svg = function(tag) {
	coconut_diffing_Factory.call(this);
	this.tag = tag.toLowerCase();
};
coconut_vdom__$Html_Svg.setSvgProp = function(element,name,newVal,oldVal) {
	var _hx_tmp;
	switch(name) {
	case "attributes":
		coconut_vdom__$Html_Elt.setAttributes(element,newVal,oldVal);
		break;
	case "className":
		coconut_vdom__$Html_Svg.setSvgProp(element,"class",newVal,oldVal);
		break;
	case "style":
		_hx_tmp = StringTools.startsWith(name,"on");
		if(_hx_tmp == true) {
			coconut_vdom__$Html_Elt.setEvent(element,name,newVal,oldVal);
		} else {
			coconut_vdom__$Html_Elt.updateStyle(element.style,newVal,oldVal);
		}
		break;
	case "xmlns":
		break;
	default:
		_hx_tmp = StringTools.startsWith(name,"on");
		if(_hx_tmp == true) {
			coconut_vdom__$Html_Elt.setEvent(element,name,newVal,oldVal);
		} else if(newVal == null) {
			element.removeAttribute(name);
		} else {
			element.setAttribute(name,newVal);
		}
	}
};
coconut_vdom__$Html_Svg.__super__ = coconut_diffing_Factory;
coconut_vdom__$Html_Svg.prototype = $extend(coconut_diffing_Factory.prototype,{
	adopt: function(node) {
		if(node.namespaceURI == "http://www.w3.org/2000/svg" && node.nodeName == this.tag) {
			return node;
		} else {
			return null;
		}
	}
	,hydrate: function(target,attr) {
		coconut_vdom__$Html_Elt.hydrateEvents(target,attr);
	}
	,create: function(attr) {
		var ret = window.document.createElementNS("http://www.w3.org/2000/svg",this.tag);
		this.update(ret,attr,null);
		return ret;
	}
	,update: function(target,nu,old) {
		coconut_diffing_Properties.set(target,nu,old,coconut_vdom__$Html_Svg.setSvgProp);
	}
});
var coconut_vdom_Html = function() { };
coconut_vdom_Html.nodeType = function(tag) {
	var _g = coconut_vdom_Html.nodeTypes.h[tag];
	var tmp;
	if(_g == null) {
		var this1 = coconut_vdom_Html.nodeTypes;
		var v;
		var _g1 = tag.split(":");
		switch(_g1.length) {
		case 1:
			var _g2 = _g1[0];
			v = new coconut_vdom__$Html_Elt(tag);
			break;
		case 2:
			var _g2 = _g1[0];
			if(_g2 == "svg") {
				var tag1 = _g1[1];
				v = new coconut_vdom__$Html_Svg(tag1);
			} else {
				var unknown = _g2;
				throw haxe_Exception.thrown("unknown namespace " + unknown);
			}
			break;
		default:
			throw haxe_Exception.thrown("invalid tag " + tag);
		}
		this1.h[tag] = v;
		tmp = v;
	} else {
		var v = _g;
		tmp = v;
	}
	return tmp;
};
var coconut_vdom__$Html_Text = function() {
	coconut_diffing_Factory.call(this);
};
coconut_vdom__$Html_Text.__super__ = coconut_diffing_Factory;
coconut_vdom__$Html_Text.prototype = $extend(coconut_diffing_Factory.prototype,{
	adopt: function(target) {
		if(target.nodeType == 3) {
			return target;
		} else {
			return null;
		}
	}
	,create: function(text) {
		return window.document.createTextNode(text);
	}
	,update: function(target,nu,old) {
		if(nu != old) {
			target.textContent = nu;
		}
	}
});
var coconut_vdom_RenderResult = {};
coconut_vdom_RenderResult.ofInt = function(i) {
	var s = "" + i;
	if(s == null) {
		return null;
	} else {
		return coconut_vdom__$Html_Text.inst.vnode(s,null,null,null);
	}
};
var coconut_vdom__$Renderer_DomBackend = function() {
	this.markers = [];
};
coconut_vdom__$Renderer_DomBackend.prototype = {
	createMarker: function() {
		var _g = this.markers.pop();
		if(_g == null) {
			return window.document.createTextNode("");
		} else {
			var v = _g;
			return v;
		}
	}
	,releaseMarker: function(marker) {
		this.markers.push(marker);
	}
	,siblings: function(first) {
		return new coconut_vdom__$Renderer_DomCursor(this,first.parentNode,first);
	}
	,children: function(parent) {
		return new coconut_vdom__$Renderer_DomCursor(this,parent,parent.firstChild);
	}
};
var coconut_vdom_Renderer = function() { };
coconut_vdom_Renderer.mountInto = function(target,vdom) {
	coconut_diffing_Root.fromNative(target,coconut_vdom_Renderer.BACKEND).render(vdom);
};
var coconut_vdom__$Renderer_DomCursor = function(applicator,parent,cur) {
	coconut_diffing_Cursor.call(this,applicator);
	this.parent = parent;
	this.cur = cur;
};
coconut_vdom__$Renderer_DomCursor.__super__ = coconut_diffing_Cursor;
coconut_vdom__$Renderer_DomCursor.prototype = $extend(coconut_diffing_Cursor.prototype,{
	current: function() {
		return this.cur;
	}
	,insert: function(real) {
		if(this.cur == null) {
			this.parent.appendChild(real);
		} else if(this.cur == real) {
			this.cur = real.nextSibling;
		} else {
			var next = real.nextSibling;
			var inserted = real.parentNode != this.parent;
			this.parent.insertBefore(real,this.cur);
			if(!inserted) {
				this.parent.insertBefore(this.cur,next);
				this.cur = real.nextSibling;
			}
		}
	}
	,'delete': function(count) {
		var v = this.cur;
		var _g = 0;
		var _g1 = count;
		while(_g < _g1) {
			var i = _g++;
			if(v == null || v.parentNode != this.parent) {
				throw haxe_Exception.thrown("assert");
			}
			var handler = v.__eventHandler;
			if(handler != null) {
				delete(v["__eventHandler"]);
				var _g2 = 0;
				var _g3 = Reflect.fields(handler);
				while(_g2 < _g3.length) {
					var k = _g3[_g2];
					++_g2;
					v.removeEventListener(k,handler[k]);
				}
			}
			var next = v.nextSibling;
			this.parent.removeChild(v);
			v = next;
		}
		this.cur = v;
	}
});
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
});
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.prototype = {
	get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.prototype = {
	get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.h);
	}
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var haxe_iterators_MapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys();
};
haxe_iterators_MapKeyValueIterator.prototype = {
	hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
};
var tink_core_Callback = {};
tink_core_Callback.invoke = function(this1,data) {
	if(tink_core_Callback.depth < 500) {
		tink_core_Callback.depth++;
		this1(data);
		tink_core_Callback.depth--;
	} else {
		tink_core_Callback.defer(function() {
			this1(data);
		});
	}
};
tink_core_Callback.defer = function(f) {
	haxe_Timer.delay(f,0);
};
var tink_core_SimpleLink = function(f) {
	this.f = f;
};
tink_core_SimpleLink.prototype = {
	cancel: function() {
		if(this.f != null) {
			this.f();
			this.f = null;
		}
	}
};
var tink_core__$Callback_LinkPair = function(a,b) {
	this.dissolved = false;
	this.a = a;
	this.b = b;
};
tink_core__$Callback_LinkPair.prototype = {
	cancel: function() {
		if(!this.dissolved) {
			this.dissolved = true;
			var this1 = this.a;
			if(this1 != null) {
				this1.cancel();
			}
			var this1 = this.b;
			if(this1 != null) {
				this1.cancel();
			}
			this.a = null;
			this.b = null;
		}
	}
};
var tink_core__$Callback_ListCell = function(cb,list) {
	if(cb == null) {
		throw haxe_Exception.thrown("callback expected but null received");
	}
	this.cb = cb;
	this.list = list;
};
tink_core__$Callback_ListCell.prototype = {
	cancel: function() {
		if(this.list != null) {
			var list = this.list;
			this.cb = null;
			this.list = null;
			if(--list.used <= list.cells.length >> 1) {
				list.compact();
			}
		}
	}
};
var tink_core_SimpleDisposable = function(dispose) {
	this.disposeHandlers = [];
	this.f = dispose;
};
tink_core_SimpleDisposable.noop = function() {
};
tink_core_SimpleDisposable.prototype = {
	dispose: function() {
		var _g = this.disposeHandlers;
		if(_g != null) {
			var v = _g;
			this.disposeHandlers = null;
			var f = this.f;
			this.f = tink_core_SimpleDisposable.noop;
			f();
			var _g = 0;
			while(_g < v.length) {
				var h = v[_g];
				++_g;
				h();
			}
		}
	}
};
var tink_core_CallbackList = function(destructive) {
	if(destructive == null) {
		destructive = false;
	}
	this.onfill = function() {
	};
	this.ondrain = function() {
	};
	this.busy = false;
	this.queue = [];
	this.used = 0;
	var _gthis = this;
	tink_core_SimpleDisposable.call(this,function() {
		if(!_gthis.busy) {
			_gthis.destroy();
		}
	});
	this.destructive = destructive;
	this.cells = [];
};
tink_core_CallbackList.__super__ = tink_core_SimpleDisposable;
tink_core_CallbackList.prototype = $extend(tink_core_SimpleDisposable.prototype,{
	destroy: function() {
		var _g = 0;
		var _g1 = this.cells;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.cb = null;
			c.list = null;
		}
		this.queue = null;
		this.cells = null;
		if(this.used > 0) {
			this.used = 0;
			var fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		}
	}
	,invoke: function(data) {
		var _gthis = this;
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			if(_gthis.disposeHandlers != null) {
				if(_gthis.busy) {
					if(_gthis.destructive != true) {
						var _g = $bind(_gthis,_gthis.invoke);
						var data1 = data;
						var tmp = function() {
							_g(data1);
						};
						_gthis.queue.push(tmp);
					}
				} else {
					_gthis.busy = true;
					if(_gthis.destructive) {
						_gthis.dispose();
					}
					var length = _gthis.cells.length;
					var _g1 = 0;
					var _g2 = length;
					while(_g1 < _g2) {
						var i = _g1++;
						var _this = _gthis.cells[i];
						if(_this.list != null) {
							_this.cb(data);
						}
					}
					_gthis.busy = false;
					if(_gthis.disposeHandlers == null) {
						_gthis.destroy();
					} else {
						if(_gthis.used < _gthis.cells.length) {
							_gthis.compact();
						}
						if(_gthis.queue.length > 0) {
							(_gthis.queue.shift())();
						}
					}
				}
			}
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				if(_gthis.disposeHandlers != null) {
					if(_gthis.busy) {
						if(_gthis.destructive != true) {
							var _g = $bind(_gthis,_gthis.invoke);
							var data1 = data;
							var tmp = function() {
								_g(data1);
							};
							_gthis.queue.push(tmp);
						}
					} else {
						_gthis.busy = true;
						if(_gthis.destructive) {
							_gthis.dispose();
						}
						var length = _gthis.cells.length;
						var _g1 = 0;
						var _g2 = length;
						while(_g1 < _g2) {
							var i = _g1++;
							var _this = _gthis.cells[i];
							if(_this.list != null) {
								_this.cb(data);
							}
						}
						_gthis.busy = false;
						if(_gthis.disposeHandlers == null) {
							_gthis.destroy();
						} else {
							if(_gthis.used < _gthis.cells.length) {
								_gthis.compact();
							}
							if(_gthis.queue.length > 0) {
								(_gthis.queue.shift())();
							}
						}
					}
				}
			});
		}
	}
	,compact: function() {
		if(this.busy) {
			return;
		} else if(this.used == 0) {
			this.resize(0);
			var fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		} else {
			var compacted = 0;
			var _g = 0;
			var _g1 = this.cells.length;
			while(_g < _g1) {
				var i = _g++;
				var _g2 = this.cells[i];
				var _g3 = _g2.list;
				if(_g2.cb != null) {
					var v = _g2;
					if(compacted != i) {
						this.cells[compacted] = v;
					}
					if(++compacted == this.used) {
						break;
					}
				}
			}
			this.resize(this.used);
		}
	}
	,resize: function(length) {
		this.cells.length = length;
	}
});
var tink_core_TypedError = function() { };
tink_core_TypedError.tryFinally = function(f,cleanup) {
	try { return f(); } finally { cleanup(); }
	return null;
};
var tink_state__$Scheduler_DirectScheduler = function() {
	this.queue = null;
};
tink_state__$Scheduler_DirectScheduler.prototype = {
	schedule: function(s) {
		if(this.queue != null) {
			this.queue.push(s);
		} else {
			var wasUpdating = tink_state_Observable.isUpdating;
			tink_state_Observable.isUpdating = true;
			tink_core_TypedError.tryFinally($bind(s,s.run),function() {
				tink_state_Observable.isUpdating = wasUpdating;
			});
		}
	}
};
var tink_state_Scheduler = {};
tink_state_Scheduler.batched = function(run) {
	return new tink_state__$Scheduler_BatchScheduler(run);
};
tink_state_Scheduler.batcher = function() {
	var later = function(fn) {
		haxe_Timer.delay(fn,10);
	};
	var later1;
	try {
		later1 = window.requestAnimationFrame != null ? function(fn) {
			window.requestAnimationFrame(fn);
		} : later;
	} catch( _g ) {
		later1 = later;
	}
	var asap = function(fn) {
		later1(fn);
	};
	var asap1;
	try {
		var p = Promise.resolve(42);
		asap1 = function(fn) {
			p.then(fn);
		};
	} catch( _g ) {
		asap1 = asap;
	}
	return function(b,isRerun) {
		var _g = $bind(b,b.progress);
		var maxSeconds = .01;
		(isRerun ? later1 : asap1)(function() {
			return _g(maxSeconds);
		});
	};
};
var tink_state__$Scheduler_BatchScheduler = function(run) {
	this.scheduled = false;
	this.queue = [];
	this.run = run;
};
tink_state__$Scheduler_BatchScheduler.prototype = {
	progress: function(maxSeconds) {
		var _gthis = this;
		var wasUpdating = tink_state_Observable.isUpdating;
		tink_state_Observable.isUpdating = true;
		return tink_core_TypedError.tryFinally(function() {
			var end = HxOverrides.now() / 1000 + maxSeconds;
			while(true) {
				var old = _gthis.queue;
				_gthis.queue = [];
				var _g = 0;
				while(_g < old.length) {
					var o = old[_g];
					++_g;
					o.run();
				}
				if(!(_gthis.queue.length > 0 && HxOverrides.now() / 1000 < end)) {
					break;
				}
			}
			if(_gthis.queue.length > 0) {
				_gthis.run(_gthis,true);
				return true;
			} else {
				return _gthis.scheduled = false;
			}
		},function() {
			tink_state_Observable.isUpdating = wasUpdating;
		});
	}
	,schedule: function(s) {
		this.queue.push(s);
		if(!this.scheduled) {
			this.scheduled = true;
			this.run(this,false);
		}
	}
};
var tink_state_Observable = {};
tink_state_Observable.get_value = function(this1) {
	var ret = this1.getValue();
	if(tink_state_internal_AutoObservable.cur != null) {
		tink_state_internal_AutoObservable.cur.subscribeTo(this1,ret);
	}
	return ret;
};
var tink_state__$Scheduler_JustOnce = function() {
};
tink_state__$Scheduler_JustOnce.call = function(f) {
	var ret;
	var _g = tink_state__$Scheduler_JustOnce.pool.pop();
	if(_g == null) {
		ret = new tink_state__$Scheduler_JustOnce();
	} else {
		var v = _g;
		ret = v;
	}
	ret.f = f;
	return ret;
};
tink_state__$Scheduler_JustOnce.prototype = {
	run: function() {
		var f = this.f;
		this.f = null;
		tink_state__$Scheduler_JustOnce.pool.push(this);
		f();
	}
};
var tink_state_State = {};
tink_state_State.get_value = function(this1) {
	var ret = this1.getValue();
	if(tink_state_internal_AutoObservable.cur != null) {
		tink_state_internal_AutoObservable.cur.subscribeTo(this1,ret);
	}
	return ret;
};
tink_state_State._new = function(value,comparator,guard,onStatusChange,toString) {
	var this1;
	if(guard == null) {
		this1 = new tink_state__$State_SimpleState(value,comparator,onStatusChange,toString);
	} else {
		var f = guard;
		this1 = new tink_state__$State_GuardedState(value,guard,comparator,onStatusChange,toString);
	}
	return this1;
};
var tink_state__$State_SimpleState = function(value,comparator,onStatusChange,toString) {
	tink_state_internal_Invalidator.call(this,toString);
	this.value = value;
	this.comparator = comparator;
	if(onStatusChange != null) {
		var _g = onStatusChange;
		var a1 = false;
		var tmp = function() {
			_g(a1);
		};
		this.list.ondrain = tmp;
		var _g1 = onStatusChange;
		var a11 = true;
		var tmp = function() {
			_g1(a11);
		};
		this.list.onfill = tmp;
	}
};
tink_state__$State_SimpleState.__super__ = tink_state_internal_Invalidator;
tink_state__$State_SimpleState.prototype = $extend(tink_state_internal_Invalidator.prototype,{
	getValue: function() {
		return this.value;
	}
	,getComparator: function() {
		return this.comparator;
	}
	,set: function(value) {
		if(tink_state_Observable.isUpdating && tink_state_Scheduler.direct.queue == null) {
			$global.console.warn("Updating state in a binding");
		}
		var this1 = this.comparator;
		var b = this.value;
		var tmp;
		if(this1 == null) {
			tmp = value == b;
		} else {
			var f = this1;
			tmp = f(value,b);
		}
		if(!tmp) {
			this.value = value;
			this.fire();
		}
		return value;
	}
});
var tink_state__$State_GuardedState = function(value,guard,comparator,onStatusChange,toString) {
	this.guardApplied = false;
	tink_state__$State_SimpleState.call(this,value,comparator,onStatusChange,toString);
	this.guard = guard;
};
tink_state__$State_GuardedState.__super__ = tink_state__$State_SimpleState;
tink_state__$State_GuardedState.prototype = $extend(tink_state__$State_SimpleState.prototype,{
	getValue: function() {
		if(!this.guardApplied) {
			this.guardApplied = true;
			return this.value = this.guard(this.value);
		} else {
			return this.value;
		}
	}
	,set: function(value) {
		if(!this.guardApplied) {
			this.guardApplied = true;
			this.value = this.guard(this.value);
		}
		return tink_state__$State_SimpleState.prototype.set.call(this,this.guard(value));
	}
});
var tink_state_internal__$AutoObservable_Computation = {};
tink_state_internal__$AutoObservable_Computation.sync = function(f) {
	var this1 = function(_,_1) {
		return f();
	};
	return this1;
};
var tink_state_internal__$AutoObservable_SubscriptionTo = function(source,cur,owner) {
	this.used = true;
	this.source = source;
	this.last = cur;
	this.lastRev = source.getRevision();
	this.owner = owner;
	if(owner.hot) {
		this.link = this.source.onInvalidate(this.owner);
	}
};
var tink_state_internal_AutoObservable = function(compute,comparator,toString) {
	this.sync = true;
	var this1 = new Map();
	this.dependencies = this1;
	this.last = null;
	this.status = 0;
	this.hot = false;
	var _gthis = this;
	tink_state_internal_Invalidator.call(this,toString);
	this.compute = compute;
	this.comparator = comparator;
	this.list.onfill = function() {
		_gthis.getValue();
		_gthis.getRevision();
		if(_gthis.subscriptions != null) {
			var _g = 0;
			var _g1 = _gthis.subscriptions;
			while(_g < _g1.length) {
				var s = _g1[_g];
				++_g;
				s.link = s.source.onInvalidate(s.owner);
			}
		}
		_gthis.hot = true;
	};
	this.list.ondrain = function() {
		_gthis.hot = false;
		if(_gthis.subscriptions != null) {
			var _g = 0;
			var _g1 = _gthis.subscriptions;
			while(_g < _g1.length) {
				var s = _g1[_g];
				++_g;
				var this1 = s.link;
				if(this1 != null) {
					this1.cancel();
				}
			}
		}
	};
};
tink_state_internal_AutoObservable.__super__ = tink_state_internal_Invalidator;
tink_state_internal_AutoObservable.prototype = $extend(tink_state_internal_Invalidator.prototype,{
	getRevision: function() {
		if(this.hot) {
			return this.revision;
		}
		if(this.subscriptions == null) {
			this.getValue();
		}
		var _g = 0;
		var _g1 = this.subscriptions;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.source.getRevision() > this.revision) {
				return this.revision = tink_state_internal_Revision._new();
			}
		}
		return this.revision;
	}
	,subsValid: function() {
		if(this.subscriptions == null) {
			return false;
		}
		var _g = 0;
		var _g1 = this.subscriptions;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.source.getRevision() != s.lastRev) {
				return false;
			}
		}
		return true;
	}
	,isValid: function() {
		if(this.status != 0) {
			if(!this.hot) {
				return this.subsValid();
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,getComparator: function() {
		return this.comparator;
	}
	,getValue: function() {
		var _gthis = this;
		var doCompute = function() {
			_gthis.status = 1;
			if(_gthis.subscriptions != null) {
				var _g = 0;
				var _g1 = _gthis.subscriptions;
				while(_g < _g1.length) {
					var s = _g1[_g];
					++_g;
					s.used = false;
				}
			}
			_gthis.subscriptions = [];
			_gthis.sync = true;
			var before = tink_state_internal_AutoObservable.cur;
			tink_state_internal_AutoObservable.cur = _gthis;
			var ret = _gthis.compute(function(v) {
				_gthis.update(v);
			});
			tink_state_internal_AutoObservable.cur = before;
			_gthis.last = ret;
			_gthis.sync = false;
		};
		var prevSubs = this.subscriptions;
		var count = 0;
		while(!this.isValid()) if(++count == tink_state_Observable.MAX_ITERATIONS) {
			throw haxe_Exception.thrown("no result after " + tink_state_Observable.MAX_ITERATIONS + " attempts");
		} else if(this.subscriptions != null) {
			var valid = true;
			var _g = 0;
			var _g1 = this.subscriptions;
			while(_g < _g1.length) {
				var s = _g1[_g];
				++_g;
				var nextRev = s.source.getRevision();
				var tmp;
				if(nextRev == s.lastRev) {
					tmp = false;
				} else {
					s.lastRev = nextRev;
					var before = s.last;
					var before1 = tink_state_internal_AutoObservable.cur;
					tink_state_internal_AutoObservable.cur = null;
					var ret = s.source.getValue();
					tink_state_internal_AutoObservable.cur = before1;
					s.last = ret;
					var this1 = s.source.getComparator();
					var a = s.last;
					var tmp1;
					if(this1 == null) {
						tmp1 = a == before;
					} else {
						var f = this1;
						tmp1 = f(a,before);
					}
					tmp = !tmp1;
				}
				if(tmp) {
					valid = false;
					break;
				}
			}
			if(valid) {
				this.status = 1;
			} else {
				doCompute();
				if(prevSubs != null) {
					var _g2 = 0;
					while(_g2 < prevSubs.length) {
						var s1 = prevSubs[_g2];
						++_g2;
						if(!s1.used) {
							if(this.hot) {
								var this2 = s1.link;
								if(this2 != null) {
									this2.cancel();
								}
							}
							this.dependencies.delete(s1.source);
						}
					}
				}
			}
		} else {
			doCompute();
		}
		return this.last;
	}
	,update: function(value) {
		if(!this.sync) {
			this.last = value;
			this.fire();
		}
	}
	,subscribeTo: function(source,cur) {
		var _g = this.dependencies.get(source);
		if(_g == null) {
			var sub = new tink_state_internal__$AutoObservable_SubscriptionTo(source,cur,this);
			this.dependencies.set(source,sub);
			this.subscriptions.push(sub);
		} else {
			var v = _g;
			if(!v.used) {
				v.used = true;
				v.last = cur;
				this.subscriptions.push(v);
			}
		}
	}
	,invalidate: function() {
		if(this.status == 1) {
			this.status = 0;
			this.fire();
		}
	}
});
var tink_state_internal_Revision = {};
tink_state_internal_Revision._new = function() {
	var this1 = tink_state_internal_Revision;
	var this2 = this1.counter += 1.0;
	return this2;
};
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
coconut_diffing_TypeId.idCounter = 0;
haxe_ds_ObjectMap.count = 0;
tink_state_internal_Revision.counter = .0;
coconut_diffing_Root.byParent = new haxe_ds_ObjectMap();
coconut_diffing_internal_VEmpty.TYPE = (function($this) {
	var $r;
	var this1 = coconut_diffing_TypeId.idCounter++;
	$r = this1;
	return $r;
}(this));
coconut_ui_internal_ImplicitContext.ORPHAN = new tink_core__$Lazy_LazyConst(null);
coconut_vdom__$Html_Elt.events = [];
coconut_vdom__$Html_Elt.ELEMENTS = new coconut_vdom__$Html_Updater(function(target,field) {
	return "" + target + "." + field + " = null";
},{ className : function(t,_,v,_1) {
	if(!v) {
		t.removeAttribute("class");
	} else {
		t.className = v;
	}
}, style : function(t,_,nu,old) {
	coconut_vdom__$Html_Elt.updateStyle(t.style,nu,old);
}, role : function(t,_,nu,old) {
	if(nu == null) {
		t.removeAttribute("role");
	} else {
		t.setAttribute("role",nu);
	}
}, attributes : function(t,_,nu,old) {
	coconut_vdom__$Html_Elt.setAttributes(t,nu,old);
}, on : coconut_vdom__$Html_Elt.setEvent},function(rules,field) {
	if(Object.prototype.hasOwnProperty.call(rules,field)) {
		return field;
	} else if(StringTools.startsWith(field,"on")) {
		return "on";
	} else {
		return null;
	}
});
coconut_vdom__$Html_Elt.STYLES = new coconut_vdom__$Html_Updater(function(target,field) {
	return "" + target + "." + field + " = null";
},null,function(_,_1) {
	return null;
});
coconut_vdom_Html.nodeTypes = new haxe_ds_StringMap();
coconut_vdom_Html.DIV = coconut_vdom_Html.nodeType("div");
coconut_vdom_Html.BUTTON = coconut_vdom_Html.nodeType("button");
coconut_vdom__$Html_Text.inst = new coconut_vdom__$Html_Text();
coconut_vdom_Renderer.BACKEND = new coconut_vdom__$Renderer_DomBackend();
tink_core_Callback.depth = 0;
tink_state_Scheduler.direct = new tink_state__$Scheduler_DirectScheduler();
tink_state_Observable.MAX_ITERATIONS = 100;
tink_state_Observable.scheduler = tink_state_Scheduler.batched(tink_state_Scheduler.batcher());
tink_state_Observable.isUpdating = false;
tink_state__$Scheduler_JustOnce.pool = [];
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
