(function(undefined){if(typeof(Wicket)==="object"&&typeof(Wicket.Head)==="object"){return
}if(typeof(DOMParser)==="undefined"&&Wicket.Browser.isSafari()){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(){window.alert("You are using an old version of Safari.\nTo be able to use this page you need at least version 2.0.1.")
}
}var createIFrame,getAjaxBaseUrl,isUndef,replaceAll,htmlToDomDocument;
isUndef=function(target){return(typeof(target)==="undefined"||target===null)
};
replaceAll=function(str,from,to){var regex=new RegExp(from.replace(/\W/g,"\\$&"),"g");
return str.replace(regex,to)
};
createIFrame=function(iframeName){var $iframe=jQuery('<iframe name="'+iframeName+'" id="'+iframeName+'" src="about:blank" style="position: absolute; top: -9999px; left: -9999px;">');
return $iframe[0]
};
getAjaxBaseUrl=function(){var baseUrl=Wicket.Ajax.baseUrl||".";
return baseUrl
};
htmlToDomDocument=function(htmlDocument){var xmlAsString=htmlDocument.body.outerText;
xmlAsString=xmlAsString.replace(/^\s+|\s+$/g,"");
xmlAsString=xmlAsString.replace(/(\n|\r)-*/g,"");
var xmldoc=Wicket.Xml.parse(xmlAsString);
return xmldoc
};
var FunctionsExecuter=function(functions){this.functions=functions;
this.current=0;
this.depth=0;
this.processNext=function(){if(this.current<this.functions.length){var f,run;
f=this.functions[this.current];
run=function(){try{var n=jQuery.proxy(this.notify,this);
f(n)
}catch(e){Wicket.Log.error("FunctionsExecuter.processNext: "+e)
}};
run=jQuery.proxy(run,this);
this.current++;
if(this.depth>1000){this.depth=0;
window.setTimeout(run,1)
}else{this.depth++;
run()
}}};
this.start=function(){this.processNext()
};
this.notify=function(){this.processNext()
}
};
Wicket.Class={create:function(){return function(){this.initialize.apply(this,arguments)
}
}};
Wicket.Log={enabled:function(){return Wicket.Ajax.DebugWindow&&Wicket.Ajax.DebugWindow.enabled
},info:function(msg){if(Wicket.Log.enabled()){Wicket.Ajax.DebugWindow.logInfo(msg)
}},error:function(msg){if(Wicket.Log.enabled()){Wicket.Ajax.DebugWindow.logError(msg)
}},log:function(msg){if(Wicket.Log.enabled()){Wicket.Ajax.DebugWindow.log(msg)
}}};
Wicket.Channel=Wicket.Class.create();
Wicket.Channel.prototype={initialize:function(name){name=name||"0|s";
var res=name.match(/^([^|]+)\|(d|s|a)$/);
if(isUndef(res)){this.name="0";
this.type="s"
}else{this.name=res[1];
this.type=res[2]
}this.callbacks=[];
this.busy=false
},schedule:function(callback){if(this.busy===false){this.busy=true;
try{return callback()
}catch(exception){this.busy=false;
Wicket.Log.error("An error occurred while executing Ajax request:"+exception)
}}else{var busyChannel="Channel '"+this.name+"' is busy";
if(this.type==="s"){Wicket.Log.info(busyChannel+" - scheduling the callback to be executed when the previous request finish.");
this.callbacks.push(callback)
}else{if(this.type==="d"){Wicket.Log.info(busyChannel+" - dropping all previous scheduled callbacks and scheduled a new one to be executed when the current request finish.");
this.callbacks=[];
this.callbacks[0]=callback
}else{if(this.type==="a"){Wicket.Log.info(busyChannel+" - ignoring the Ajax call because there is a running request.")
}}}return null
}},done:function(){var c=null;
if(this.callbacks.length>0){c=this.callbacks.shift()
}if(c!==null&&typeof(c)!=="undefined"){Wicket.Log.info("Calling postponed function...");
window.setTimeout(c,1)
}else{this.busy=false
}}};
Wicket.ChannelManager=Wicket.Class.create();
Wicket.ChannelManager.prototype={initialize:function(){this.channels={}
},schedule:function(channel,callback){var parsed=new Wicket.Channel(channel);
var c=this.channels[parsed.name];
if(isUndef(c)){c=parsed;
this.channels[c.name]=c
}else{c.type=parsed.type
}return c.schedule(callback)
},done:function(channel){var parsed=new Wicket.Channel(channel);
var c=this.channels[parsed.name];
if(!isUndef(c)){c.done();
if(!c.busy){delete this.channels[parsed.name]
}}}};
Wicket.Ajax={};
Wicket.Ajax.Call=Wicket.Class.create();
Wicket.Ajax.Call.prototype={initialize:jQuery.noop,_initializeDefaults:function(attrs){if(typeof(attrs.ch)!=="string"){attrs.ch="0|s"
}if(typeof(attrs.wr)!=="boolean"){attrs.wr=true
}if(typeof(attrs.dt)!=="string"){attrs.dt="xml"
}if(typeof(attrs.m)!=="string"){attrs.m="GET"
}if(attrs.async!==false){attrs.async=true
}if(!jQuery.isNumeric(attrs.rt)){attrs.rt=0
}if(attrs.ad!==true){attrs.ad=false
}if(!attrs.sp){attrs.sp="stop"
}},_getTarget:function(attrs){var target;
if(attrs.event){target=attrs.event.target
}else{if(!jQuery.isWindow(attrs.c)){target=Wicket.$(attrs.c)
}else{target=window
}}return target
},_executeHandlers:function(handlers){if(jQuery.isArray(handlers)){var args=Array.prototype.slice.call(arguments).slice(1);
var attrs=args[0];
var that=this._getTarget(attrs);
for(var i=0;
i<handlers.length;
i++){var handler=handlers[i];
if(jQuery.isFunction(handler)){handler.apply(that,args)
}else{new Function(handler).apply(that,args)
}}}},_asParamArray:function(parameters){var result=[],value,name;
if(jQuery.isArray(parameters)){result=parameters
}else{if(jQuery.isPlainObject(parameters)){for(name in parameters){value=parameters[name];
result.push({name:name,value:value})
}}}return result
},_calculateDynamicParameters:function(attrs){var deps=attrs.dep,params=[];
for(var i=0;
i<deps.length;
i++){var dep=deps[i],extraParam;
if(jQuery.isFunction(dep)){extraParam=dep(attrs)
}else{extraParam=new Function("attrs",dep)(attrs)
}extraParam=this._asParamArray(extraParam);
params=params.concat(extraParam)
}return jQuery.param(params)
},ajax:function(attrs){this._initializeDefaults(attrs);
var res=Wicket.channelManager.schedule(attrs.ch,Wicket.bind(function(){this.doAjax(attrs)
},this));
return res!==null?res:true
},doAjax:function(attrs){this.channel=attrs.ch;
var headers={"Wicket-Ajax":"true","Wicket-Ajax-BaseURL":getAjaxBaseUrl()},data=this._asParamArray(attrs.ep),self=this,defaultPrecondition=[function(attributes){if(attributes.c){if(attributes.f){return Wicket.$$(attributes.c)&&Wicket.$$(attributes.f)
}else{return Wicket.$$(attributes.c)
}}return true
}],context={attrs:attrs,steps:[]},we=Wicket.Event,topic=we.Topic;
if(Wicket.Focus.lastFocusId){headers["Wicket-FocusedElementId"]=Wicket.Focus.lastFocusId
}self._executeHandlers(attrs.bh,attrs);
we.publish(topic.AJAX_CALL_BEFORE,attrs);
var preconditions=attrs.pre||[];
preconditions=defaultPrecondition.concat(preconditions);
if(jQuery.isArray(preconditions)){var that=this._getTarget(attrs);
for(var p=0;
p<preconditions.length;
p++){var precondition=preconditions[p];
var result;
if(jQuery.isFunction(precondition)){result=precondition.call(that,attrs)
}else{result=new Function(precondition).call(that,attrs)
}if(result===false){Wicket.Log.info("Ajax request stopped because of precondition check, url: "+attrs.u);
self.done();
return false
}}}we.publish(topic.AJAX_CALL_PRECONDITION,attrs);
if(attrs.mp){var ret=self.submitMultipartForm(context);
return ret
}if(attrs.f){var form=Wicket.$(attrs.f);
data=data.concat(Wicket.Form.serializeForm(form));
if(attrs.sc){var scName=attrs.sc;
data=data.concat({name:scName,value:1})
}}else{if(attrs.c&&!jQuery.isWindow(attrs.c)){var el=Wicket.$(attrs.c);
data=data.concat(Wicket.Form.serializeElement(el))
}}data=jQuery.param(data);
var jqXHR=jQuery.ajax({url:attrs.u,type:attrs.m,context:self,beforeSend:function(jqXHR,settings){if(jQuery.isArray(attrs.dep)){var queryString,separator;
queryString=this._calculateDynamicParameters(attrs);
if(settings.type.toLowerCase()==="post"){separator=settings.data.length>0?"&":"";
settings.data=settings.data+separator+queryString;
jqXHR.setRequestHeader("Content-Type",settings.contentType)
}else{separator=settings.url.indexOf("?")>-1?"&":"?";
settings.url=settings.url+separator+queryString
}}self._executeHandlers(attrs.bsh,attrs,jqXHR,settings);
we.publish(topic.AJAX_CALL_BEFORE_SEND,attrs,jqXHR,settings);
if(attrs.i){Wicket.DOM.showIncrementally(attrs.i)
}},data:data,dataType:attrs.dt,async:attrs.async,timeout:attrs.rt,cache:false,headers:headers,success:function(data,textStatus,jqXHR){if(attrs.wr){self.processAjaxResponse(data,textStatus,jqXHR,context)
}else{self._executeHandlers(attrs.sh,attrs,jqXHR,data,textStatus);
we.publish(topic.AJAX_CALL_SUCCESS,attrs,jqXHR,data,textStatus)
}},error:function(jqXHR,textStatus,errorMessage){self.failure(context,jqXHR,errorMessage,textStatus)
},complete:function(jqXHR,textStatus){context.steps.push(jQuery.proxy(function(notify){if(attrs.i){Wicket.DOM.hideIncrementally(attrs.i)
}self._executeHandlers(attrs.coh,attrs,jqXHR,textStatus);
we.publish(topic.AJAX_CALL_COMPLETE,attrs,jqXHR,textStatus);
self.done()
},self));
var executer=new FunctionsExecuter(context.steps);
executer.start()
}});
self._executeHandlers(attrs.ah,attrs);
we.publish(topic.AJAX_CALL_AFTER,attrs);
return jqXHR
},process:function(data){var context={attrs:{},steps:[]};
var xmlDocument=Wicket.Xml.parse(data);
this.loadedCallback(xmlDocument,context);
var executer=new FunctionsExecuter(context.steps);
executer.start()
},processAjaxResponse:function(data,textStatus,jqXHR,context){if(jqXHR.readyState===4){var redirectUrl;
try{redirectUrl=jqXHR.getResponseHeader("Ajax-Location")
}catch(ignore){}if(typeof(redirectUrl)!=="undefined"&&redirectUrl!==null&&redirectUrl!==""){this.success(context);
this.done();
var rhttp=/^http:\/\//,rhttps=/^https:\/\//;
if(redirectUrl.charAt(0)==="/"||rhttp.test(redirectUrl)||rhttps.test(redirectUrl)){window.location=redirectUrl
}else{var urlDepth=0;
while(redirectUrl.substring(0,3)==="../"){urlDepth++;
redirectUrl=redirectUrl.substring(3)
}var calculatedRedirect=window.location.pathname;
while(urlDepth>-1){urlDepth--;
var i=calculatedRedirect.lastIndexOf("/");
if(i>-1){calculatedRedirect=calculatedRedirect.substring(0,i)
}}calculatedRedirect+="/"+redirectUrl;
if(Wicket.Browser.isGecko()){calculatedRedirect=window.location.protocol+"//"+window.location.host+calculatedRedirect
}window.location=calculatedRedirect
}}else{if(Wicket.Log.enabled()){var responseAsText=jqXHR.responseText;
Wicket.Log.info("Received ajax response ("+responseAsText.length+" characters)");
Wicket.Log.info("\n"+responseAsText)
}return this.loadedCallback(data,context)
}}},submitMultipartForm:function(context){var attrs=context.attrs;
var form=Wicket.$(attrs.f);
if(!form){Wicket.Log.error("Wicket.Ajax.Call.submitForm: Trying to submit form with id '"+attrs.f+"' that is not in document.");
return
}if(form.tagName.toLowerCase()!=="form"){do{form=form.parentNode
}while(form.tagName.toLowerCase()!=="form"&&form!==document.body)
}if(form.tagName.toLowerCase()!=="form"){Wicket.Log.error("Cannot submit form with id "+attrs.f+" because there is no form element in the hierarchy.");
return false
}var submittingAttribute="data-wicket-submitting";
if(form.onsubmit&&!form.getAttribute(submittingAttribute)){form.setAttribute(submittingAttribute,submittingAttribute);
var retValue=form.onsubmit();
if(typeof(retValue)==="undefined"){retValue=true
}form.removeAttribute(submittingAttribute);
if(!retValue){return
}}var originalFormAction=form.action;
var originalFormTarget=form.target;
var originalFormMethod=form.method;
var originalFormEnctype=form.enctype;
var originalFormEncoding=form.encoding;
var iframeName="wicket-submit-"+(""+Math.random()).substr(2);
var iframe=createIFrame(iframeName);
document.body.appendChild(iframe);
form.target=iframe.name;
var separator=(attrs.u.indexOf("?")>-1?"&":"?");
form.action=attrs.u+separator+"wicket-ajax=true&wicket-ajax-baseurl="+Wicket.Form.encode(getAjaxBaseUrl());
if(attrs.ep){var extraParametersArray=this._asParamArray(attrs.ep);
if(extraParametersArray.length>0){var extraParametersQueryString=jQuery.param(extraParametersArray);
form.action=form.action+"&"+extraParametersQueryString
}}if(jQuery.isArray(attrs.dep)){var dynamicExtraParameters=this._calculateDynamicParameters(attrs);
if(dynamicExtraParameters){form.action=form.action+"&"+dynamicExtraParameters
}}form.method=/PhantomJS/.test(navigator.userAgent)?"get":"post";
form.enctype="multipart/form-data";
form.encoding="multipart/form-data";
if(attrs.sc){var $btn=jQuery("<input type='hidden' name='"+attrs.sc+"' id='"+iframe.id+"-btn' value='1'/>");
form.appendChild($btn[0])
}var we=Wicket.Event;
var topic=we.Topic;
this._executeHandlers(attrs.bsh,attrs,null,null);
we.publish(topic.AJAX_CALL_BEFORE_SEND,attrs,null,null);
if(attrs.i){Wicket.DOM.showIncrementally(attrs.i)
}form.submit();
this._executeHandlers(attrs.ah,attrs);
we.publish(topic.AJAX_CALL_AFTER,attrs);
we.add(iframe,"load.handleMultipartComplete",jQuery.proxy(this.handleMultipartComplete,this),context);
form.action=originalFormAction;
form.target=originalFormTarget;
form.method=originalFormMethod;
form.enctype=originalFormEnctype;
form.encoding=originalFormEncoding;
return true
},handleMultipartComplete:function(event){var context=event.data,iframe=event.target,envelope;
event.stopPropagation();
jQuery(iframe).off("load.handleMultipartComplete");
try{envelope=iframe.contentWindow.document
}catch(e){Wicket.Log.error("Cannot read Ajax response for multipart form submit: "+e)
}if(isUndef(envelope)){this.failure(context,null,"No XML response in the IFrame document","Failure")
}else{if(envelope.XMLDocument){envelope=envelope.XMLDocument
}this.loadedCallback(envelope,context)
}context.steps.push(jQuery.proxy(function(notify){setTimeout(function(){jQuery("#"+iframe.id+"-btn").remove();
jQuery(iframe).remove()
},0);
var attrs=context.attrs;
if(attrs.i){Wicket.DOM.hideIncrementally(attrs.i)
}this._executeHandlers(attrs.coh,attrs,null,null);
Wicket.Event.publish(Wicket.Event.Topic.AJAX_CALL_COMPLETE,attrs,null,null);
this.done()
},this));
var executer=new FunctionsExecuter(context.steps);
executer.start()
},loadedCallback:function(envelope,context){try{var root=envelope.getElementsByTagName("ajax-response")[0];
if(isUndef(root)&&envelope.compatMode==="BackCompat"){envelope=htmlToDomDocument(envelope);
root=envelope.getElementsByTagName("ajax-response")[0]
}if(isUndef(root)||root.tagName!=="ajax-response"){this.failure(context,null,"Could not find root <ajax-response> element",null);
return
}var steps=context.steps;
for(var i=0;
i<root.childNodes.length;
++i){var childNode=root.childNodes[i];
if(childNode.tagName==="header-contribution"){this.processHeaderContribution(context,childNode)
}else{if(childNode.tagName==="priority-evaluate"){this.processEvaluation(context,childNode)
}}}var stepIndexOfLastReplacedComponent=-1;
for(var c=0;
c<root.childNodes.length;
++c){var node=root.childNodes[c];
if(node.tagName==="component"){if(stepIndexOfLastReplacedComponent===-1){this.processFocusedComponentMark(context)
}stepIndexOfLastReplacedComponent=steps.length;
this.processComponent(context,node)
}else{if(node.tagName==="evaluate"){this.processEvaluation(context,node)
}else{if(node.tagName==="redirect"){this.processRedirect(context,node)
}}}}if(stepIndexOfLastReplacedComponent!==-1){this.processFocusedComponentReplaceCheck(steps,stepIndexOfLastReplacedComponent)
}this.success(context)
}catch(exception){this.failure(context,null,exception,null)
}},success:function(context){context.steps.push(jQuery.proxy(function(notify){Wicket.Log.info("Response processed successfully.");
var attrs=context.attrs;
this._executeHandlers(attrs.sh,attrs,null,null,"success");
Wicket.Event.publish(Wicket.Event.Topic.AJAX_CALL_SUCCESS,attrs,null,null,"success");
Wicket.Focus.attachFocusEvent();
window.setTimeout("Wicket.Focus.requestFocus();",0);
notify()
},this))
},failure:function(context,jqXHR,errorMessage,textStatus){context.steps.push(jQuery.proxy(function(notify){if(errorMessage){Wicket.Log.error("Wicket.Ajax.Call.failure: Error while parsing response: "+errorMessage)
}var attrs=context.attrs;
this._executeHandlers(attrs.fh,attrs,errorMessage);
Wicket.Event.publish(Wicket.Event.Topic.AJAX_CALL_FAILURE,attrs,jqXHR,errorMessage,textStatus);
notify()
},this))
},done:function(){Wicket.channelManager.done(this.channel)
},processComponent:function(context,node){context.steps.push(function(notify){var compId=node.getAttribute("id");
var text=jQuery(node).text();
var encoding=node.getAttribute("encoding");
if(encoding){text=Wicket.Head.Contributor.decode(encoding,text)
}var element=Wicket.$(compId);
if(isUndef(element)){Wicket.Log.error("Wicket.Ajax.Call.processComponent: Component with id [["+compId+"]] was not found while trying to perform markup update. Make sure you called component.setOutputMarkupId(true) on the component whose markup you are trying to update.")
}else{Wicket.DOM.replace(element,text)
}notify()
})
},processEvaluation:function(context,node){var scriptWithIdentifierR=new RegExp("^\\(function\\(\\)\\{([a-zA-Z_]\\w*)\\|((.|\\n)*)?\\}\\)\\(\\);$");
var scriptSplitterR=new RegExp("\\(function\\(\\)\\{.*?}\\)\\(\\);","gi");
var text=Wicket.DOM.text(node);
var encoding=node.getAttribute("encoding");
if(encoding){text=Wicket.Head.Contributor.decode(encoding,text)
}var steps=context.steps;
var log=Wicket.Log;
var evaluateWithManualNotify=function(parameters,body){return function(notify){var f=jQuery.noop;
var toExecute="f = function("+parameters+") {"+body+"};";
try{eval(toExecute);
f(notify)
}catch(exception){log.error("Wicket.Ajax.Call.processEvaluation: Exception evaluating javascript: "+exception+", text: "+text)
}}
};
var evaluate=function(script){return function(notify){try{eval(script)
}catch(exception){log.error("Wicket.Ajax.Call.processEvaluation: Exception evaluating javascript: "+exception+", text: "+text)
}notify()
}
};
if(scriptWithIdentifierR.test(text)){var scripts=[];
var scr;
while((scr=scriptSplitterR.exec(text))!=null){scripts.push(scr[0])
}for(var s=0;
s<scripts.length;
s++){var script=scripts[s];
if(script){var scriptWithIdentifier=script.match(scriptWithIdentifierR);
if(scriptWithIdentifier){steps.push(evaluateWithManualNotify(scriptWithIdentifier[1],scriptWithIdentifier[2]))
}else{steps.push(evaluate(script))
}}}}else{steps.push(evaluate(text))
}},processHeaderContribution:function(context,node){var c=Wicket.Head.Contributor;
c.processContribution(context,node)
},processRedirect:function(context,node){var text=jQuery(node).text();
Wicket.Log.info("Redirecting to: "+text);
window.location=text
},processFocusedComponentMark:function(context){context.steps.push(function(notify){Wicket.Focus.markFocusedComponent();
notify()
})
},processFocusedComponentReplaceCheck:function(steps,lastReplaceComponentStep){steps.splice(lastReplaceComponentStep+1,0,function(notify){Wicket.Focus.checkFocusedComponentReplaced();
notify()
})
}};
Wicket.ThrottlerEntry=Wicket.Class.create();
Wicket.ThrottlerEntry.prototype={initialize:function(func){this.func=func;
this.timestamp=new Date().getTime();
this.timeoutVar=undefined
},getTimestamp:function(){return this.timestamp
},getFunc:function(){return this.func
},setFunc:function(func){this.func=func
},getTimeoutVar:function(){return this.timeoutVar
},setTimeoutVar:function(timeoutVar){this.timeoutVar=timeoutVar
}};
Wicket.Throttler=Wicket.Class.create();
Wicket.Throttler.entries=[];
Wicket.Throttler.prototype={initialize:function(postponeTimerOnUpdate){this.postponeTimerOnUpdate=postponeTimerOnUpdate
},throttle:function(id,millis,func){var entries=Wicket.Throttler.entries;
var entry=entries[id];
var me=this;
if(typeof(entry)==="undefined"){entry=new Wicket.ThrottlerEntry(func);
entry.setTimeoutVar(window.setTimeout(function(){me.execute(id)
},millis));
entries[id]=entry
}else{entry.setFunc(func);
if(this.postponeTimerOnUpdate){window.clearTimeout(entry.getTimeoutVar());
entry.setTimeoutVar(window.setTimeout(function(){me.execute(id)
},millis))
}}},execute:function(id){var entries=Wicket.Throttler.entries;
var entry=entries[id];
if(typeof(entry)!=="undefined"){var func=entry.getFunc();
entries[id]=undefined;
return func()
}}};
jQuery.extend(true,Wicket,{channelManager:new Wicket.ChannelManager(),throttler:new Wicket.Throttler(),$:function(arg){return Wicket.DOM.get(arg)
},$$:function(element){return Wicket.DOM.inDoc(element)
},merge:function(object1,object2){return jQuery.extend({},object1,object2)
},bind:function(fn,context){return jQuery.proxy(fn,context)
},Xml:{parse:function(text){var xmlDocument;
if(window.DOMParser){var parser=new DOMParser();
xmlDocument=parser.parseFromString(text,"text/xml")
}else{if(window.ActiveXObject){try{xmlDocument=new ActiveXObject("Msxml2.DOMDocument.6.0")
}catch(err6){try{xmlDocument=new ActiveXObject("Msxml2.DOMDocument.5.0")
}catch(err5){try{xmlDocument=new ActiveXObject("Msxml2.DOMDocument.4.0")
}catch(err4){try{xmlDocument=new ActiveXObject("MSXML2.DOMDocument.3.0")
}catch(err3){try{xmlDocument=new ActiveXObject("Microsoft.XMLDOM")
}catch(err2){Wicket.Log.error("Cannot create DOM document: "+err2)
}}}}}if(xmlDocument){xmlDocument.async="false";
if(!xmlDocument.loadXML(text)){Wicket.Log.error("Error parsing response: "+text)
}}}}return xmlDocument
}},Form:{encode:function(text){if(window.encodeURIComponent){return window.encodeURIComponent(text)
}else{return window.escape(text)
}},serializeSelect:function(select){var result=[];
if(select){var $select=jQuery(select);
if($select.length>0&&$select.prop("disabled")===false){var name=$select.prop("name");
var values=$select.val();
if(jQuery.isArray(values)){for(var v=0;
v<values.length;
v++){var value=values[v];
result.push({name:name,value:value})
}}else{result.push({name:name,value:values})
}}}return result
},serializeInput:function(input){var result=[];
if(input&&input.type&&!(input.type==="image"||input.type==="submit")){var $input=jQuery(input);
result=$input.serializeArray()
}return result
},excludeFromAjaxSerialization:{},serializeElement:function(element){if(!element){return[]
}else{if(typeof(element)==="string"){element=Wicket.$(element)
}}if(Wicket.Form.excludeFromAjaxSerialization&&element.id&&Wicket.Form.excludeFromAjaxSerialization[element.id]==="true"){return[]
}var tag=element.tagName.toLowerCase();
if(tag==="select"){return Wicket.Form.serializeSelect(element)
}else{if(tag==="input"||tag==="textarea"){return Wicket.Form.serializeInput(element)
}else{return[]
}}},serializeForm:function(form){var result=[],elements,nodeListToArray,nodeId;
nodeListToArray=function(nodeList){var arr=[];
if(nodeList&&nodeList.length){for(nodeId=0;
nodeId<nodeList.length;
nodeId++){arr.push(nodeList.item(nodeId))
}}return arr
};
if(form){if(form.tagName.toLowerCase()==="form"){elements=form.elements
}else{do{form=form.parentNode
}while(form.tagName.toLowerCase()!=="form"&&form.tagName.toLowerCase()!=="body");
elements=nodeListToArray(form.getElementsByTagName("input"));
elements=elements.concat(nodeListToArray(form.getElementsByTagName("select")));
elements=elements.concat(nodeListToArray(form.getElementsByTagName("textarea")))
}}for(var i=0;
i<elements.length;
++i){var el=elements[i];
if(el.name&&el.name!==""){result=result.concat(Wicket.Form.serializeElement(el))
}}return result
},serialize:function(element,dontTryToFindRootForm){if(typeof(element)==="string"){element=Wicket.$(element)
}if(element.tagName.toLowerCase()==="form"){return Wicket.Form.serializeForm(element)
}else{var elementBck=element;
if(dontTryToFindRootForm!==true){do{element=element.parentNode
}while(element.tagName.toLowerCase()!=="form"&&element.tagName.toLowerCase()!=="body")
}if(element.tagName.toLowerCase()==="form"){return Wicket.Form.serializeForm(element)
}else{var form=document.createElement("form");
var parent=elementBck.parentNode;
parent.replaceChild(form,elementBck);
form.appendChild(elementBck);
var result=Wicket.Form.serializeForm(form);
parent.replaceChild(elementBck,form);
return result
}}}},DOM:{show:function(e){e=Wicket.$(e);
if(e!==null){e.style.display=""
}},hide:function(e){e=Wicket.$(e);
if(e!==null){e.style.display="none"
}},showIncrementally:function(e){e=Wicket.$(e);
if(e===null){return
}var count=e.getAttribute("showIncrementallyCount");
count=parseInt(isUndef(count)?0:count,10);
if(count>=0){Wicket.DOM.show(e)
}e.setAttribute("showIncrementallyCount",count+1)
},hideIncrementally:function(e){e=Wicket.$(e);
if(e===null){return
}var count=e.getAttribute("showIncrementallyCount");
count=parseInt(isUndef(count)?0:count-1,10);
if(count<=0){Wicket.DOM.hide(e)
}e.setAttribute("showIncrementallyCount",count)
},get:function(arg){if(isUndef(arg)){return null
}if(arguments.length>1){var e=[];
for(var i=0;
i<arguments.length;
i++){e.push(Wicket.DOM.get(arguments[i]))
}return e
}else{if(typeof arg==="string"){return document.getElementById(arg)
}else{return arg
}}},inDoc:function(element){if(element===window){return true
}if(typeof(element)==="string"){element=Wicket.$(element)
}if(isUndef(element)||isUndef(element.tagName)){return false
}var id=element.getAttribute("id");
if(isUndef(id)||id===""){return element.ownerDocument===document
}else{return document.getElementById(id)===element
}},replace:function(element,text){var we=Wicket.Event;
var topic=we.Topic;
we.publish(topic.DOM_NODE_REMOVING,element);
if(element.tagName.toLowerCase()==="title"){var titleText=/>(.*?)</.exec(text)[1];
document.title=titleText;
return
}else{var cleanedText=jQuery.trim(text);
var $newElement=jQuery(cleanedText);
jQuery(element).replaceWith($newElement)
}var newElement=Wicket.$(element.id);
if(newElement){we.publish(topic.DOM_NODE_ADDED,newElement)
}},serializeNodeChildren:function(node){if(isUndef(node)){return""
}var result=[];
if(node.childNodes.length>0){for(var i=0;
i<node.childNodes.length;
i++){var thisNode=node.childNodes[i];
switch(thisNode.nodeType){case 1:case 5:result.push(this.serializeNode(thisNode));
break;
case 8:result.push("<!--");
result.push(thisNode.nodeValue);
result.push("-->");
break;
case 4:result.push("<![CDATA[");
result.push(thisNode.nodeValue);
result.push("]]>");
break;
case 3:case 2:result.push(thisNode.nodeValue);
break;
default:break
}}}else{result.push(node.textContent||node.text)
}return result.join("")
},serializeNode:function(node){if(isUndef(node)){return""
}var result=[];
result.push("<");
result.push(node.nodeName);
if(node.attributes&&node.attributes.length>0){for(var i=0;
i<node.attributes.length;
i++){if(node.attributes[i].nodeValue&&node.attributes[i].specified){result.push(" ");
result.push(node.attributes[i].name);
result.push('="');
result.push(node.attributes[i].value);
result.push('"')
}}}result.push(">");
result.push(Wicket.DOM.serializeNodeChildren(node));
result.push("</");
result.push(node.nodeName);
result.push(">");
return result.join("")
},containsElement:function(element){var id=element.getAttribute("id");
if(id){return Wicket.$(id)!==null
}else{return false
}},text:function(node){if(isUndef(node)){return""
}var result=[];
if(node.childNodes.length>0){for(var i=0;
i<node.childNodes.length;
i++){var thisNode=node.childNodes[i];
switch(thisNode.nodeType){case 1:case 5:result.push(this.text(thisNode));
break;
case 3:case 4:result.push(thisNode.nodeValue);
break;
default:break
}}}else{result.push(node.textContent||node.text)
}return result.join("")
}},Ajax:{Call:Wicket.Ajax.Call,_handleEventCancelation:function(attrs){var evt=attrs.event;
if(evt){if(!attrs.ad){try{evt.preventDefault()
}catch(ignore){}}if(attrs.sp==="stop"){Wicket.Event.stop(evt)
}else{if(attrs.sp==="stopImmediate"){Wicket.Event.stop(evt,true)
}}}},get:function(attrs){attrs.m="GET";
return Wicket.Ajax.ajax(attrs)
},post:function(attrs){attrs.m="POST";
return Wicket.Ajax.ajax(attrs)
},ajax:function(attrs){attrs.c=attrs.c||window;
attrs.e=attrs.e||["domready"];
if(!jQuery.isArray(attrs.e)){attrs.e=[attrs.e]
}jQuery.each(attrs.e,function(idx,evt){Wicket.Event.add(attrs.c,evt,function(jqEvent,data){var call=new Wicket.Ajax.Call();
var attributes=jQuery.extend({},attrs);
attributes.event=Wicket.Event.fix(jqEvent);
if(data){attributes.event.extraData=data
}var throttlingSettings=attributes.tr;
if(throttlingSettings){var postponeTimerOnUpdate=throttlingSettings.p||false;
var throttler=new Wicket.Throttler(postponeTimerOnUpdate);
throttler.throttle(throttlingSettings.id,throttlingSettings.d,Wicket.bind(function(){call.ajax(attributes)
},this))
}else{call.ajax(attributes)
}Wicket.Ajax._handleEventCancelation(attributes)
})
})
},process:function(data){var call=new Wicket.Ajax.Call();
call.process(data)
}},Head:{Contributor:{decode:function(encoding,text){var decode1=function(text){return replaceAll(text,"]^","]")
};
if(encoding==="wicket1"){text=decode1(text)
}return text
},parse:function(headerNode){var text=jQuery(headerNode).text();
var encoding=headerNode.getAttribute("encoding");
if(encoding!==null&&encoding!==""){text=this.decode(encoding,text)
}if(Wicket.Browser.isKHTML()){text=text.replace(/<script/g,"<SCRIPT");
text=text.replace(/<\/script>/g,"</SCRIPT>")
}var xmldoc=Wicket.Xml.parse(text);
return xmldoc
},_checkParserError:function(node){var result=false;
if(!isUndef(node.tagName)&&node.tagName.toLowerCase()==="parsererror"){Wicket.Log.error("Error in parsing: "+node.textContent);
result=true
}return result
},processContribution:function(context,headerNode){var xmldoc=this.parse(headerNode);
var rootNode=xmldoc.documentElement;
if(this._checkParserError(rootNode)){return
}for(var i=0;
i<rootNode.childNodes.length;
i++){var node=rootNode.childNodes[i];
if(this._checkParserError(node)){return
}if(!isUndef(node.tagName)){var name=node.tagName.toLowerCase();
if(name==="wicket:link"){for(var j=0;
j<node.childNodes.length;
++j){var childNode=node.childNodes[j];
if(childNode.nodeType===1){node=childNode;
name=node.tagName.toLowerCase();
break
}}}if(name==="link"){this.processLink(context,node)
}else{if(name==="script"){this.processScript(context,node)
}else{if(name==="style"){this.processStyle(context,node)
}}}}else{if(node.nodeType===8){this.processComment(context,node)
}}}},processLink:function(context,node){context.steps.push(function(notify){if(Wicket.Head.containsElement(node,"href")){notify();
return
}var css=Wicket.Head.createElement("link");
css.id=node.getAttribute("id");
css.rel=node.getAttribute("rel");
css.href=node.getAttribute("href");
css.type=node.getAttribute("type");
Wicket.Head.addElement(css);
var img=document.createElement("img");
var notifyCalled=false;
img.onerror=function(){if(!notifyCalled){notifyCalled=true;
notify()
}};
img.src=css.href;
if(img.complete){if(!notifyCalled){notifyCalled=true;
notify()
}}})
},processStyle:function(context,node){context.steps.push(function(notify){if(Wicket.DOM.containsElement(node)){notify();
return
}var content=Wicket.DOM.serializeNodeChildren(node);
var style=Wicket.Head.createElement("style");
style.id=node.getAttribute("id");
if(Wicket.Browser.isIE()){try{document.createStyleSheet().cssText=content
}catch(ignore){var run=function(){try{document.createStyleSheet().cssText=content
}catch(e){Wicket.Log.error("Wicket.Head.Contributor.processStyle: "+e)
}};
window.setTimeout(run,1)
}}else{var textNode=document.createTextNode(content);
style.appendChild(textNode)
}Wicket.Head.addElement(style);
notify()
})
},processScript:function(context,node){context.steps.push(function(notify){if(Wicket.DOM.containsElement(node)||Wicket.Head.containsElement(node,"src")){notify();
return
}var src=node.getAttribute("src");
if(src!==null&&src!==""){var scriptDomNode=document.createElement("script");
var attrs=node.attributes;
for(var a=0;
a<attrs.length;
a++){var attr=attrs[a];
scriptDomNode[attr.name]=attr.value
}var onScriptReady=function(){notify()
};
if(typeof(scriptDomNode.onload)!=="undefined"){scriptDomNode.onload=onScriptReady
}else{if(typeof(scriptDomNode.onreadystatechange)!=="undefined"){scriptDomNode.onreadystatechange=function(){if(scriptDomNode.readyState==="loaded"||scriptDomNode.readyState==="complete"){onScriptReady()
}}
}else{if(Wicket.Browser.isGecko()){scriptDomNode.onload=onScriptReady
}else{window.setTimeout(onScriptReady,10)
}}}Wicket.Head.addElement(scriptDomNode)
}else{var text=Wicket.DOM.serializeNodeChildren(node);
text=text.replace(/^\n\/\*<!\[CDATA\[\*\/\n/,"");
text=text.replace(/\n\/\*\]\]>\*\/\n$/,"");
var id=node.getAttribute("id");
var type=node.getAttribute("type");
if(typeof(id)==="string"&&id.length>0){Wicket.Head.addJavascript(text,id,"",type)
}else{try{eval(text)
}catch(e){Wicket.Log.error("Wicket.Head.Contributor.processScript: "+e+": eval -> "+text)
}}notify()
}})
},processComment:function(context,node){context.steps.push(function(notify){var comment=document.createComment(node.nodeValue);
Wicket.Head.addElement(comment);
notify()
})
}},createElement:function(name){if(isUndef(name)||name===""){Wicket.Log.error("Cannot create an element without a name");
return
}return document.createElement(name)
},addElement:function(element){var head=document.getElementsByTagName("head");
if(head[0]){head[0].appendChild(element)
}},containsElement:function(element,mandatoryAttribute){var attr=element.getAttribute(mandatoryAttribute);
if(isUndef(attr)||attr===""){return false
}var head=document.getElementsByTagName("head")[0];
if(element.tagName==="script"){head=document
}var nodes=head.getElementsByTagName(element.tagName);
for(var i=0;
i<nodes.length;
++i){var node=nodes[i];
if(node.tagName.toLowerCase()===element.tagName.toLowerCase()){var loadedUrl=node.getAttribute(mandatoryAttribute);
var loadedUrl_=node.getAttribute(mandatoryAttribute+"_");
if(loadedUrl===attr||loadedUrl_===attr){return true
}}}return false
},addJavascript:function(content,id,fakeSrc,type){var script=Wicket.Head.createElement("script");
if(id){script.id=id
}if(!type||type.toLowerCase()==="text/javascript"){type="text/javascript";
content="try{"+content+"}catch(e){Wicket.Log.error(e);}"
}script.setAttribute("src_",fakeSrc);
script.setAttribute("type",type);
if(null===script.canHaveChildren||script.canHaveChildren){var textNode=document.createTextNode(content);
script.appendChild(textNode)
}else{script.text=content
}Wicket.Head.addElement(script)
},addJavascripts:function(element,contentFilter){function add(element){var src=element.getAttribute("src");
var type=element.getAttribute("type");
if(src!==null&&src.length>0){var e=document.createElement("script");
if(type){e.setAttribute("type",type)
}e.setAttribute("src",src);
Wicket.Head.addElement(e)
}else{var content=Wicket.DOM.serializeNodeChildren(element);
if(isUndef(content)||content===""){content=element.text
}if(typeof(contentFilter)==="function"){content=contentFilter(content)
}Wicket.Head.addJavascript(content,element.id,"",type)
}}if(typeof(element)!=="undefined"&&typeof(element.tagName)!=="undefined"&&element.tagName.toLowerCase()==="script"){add(element)
}else{if(element.childNodes.length>0){var scripts=element.getElementsByTagName("script");
for(var i=0;
i<scripts.length;
++i){add(scripts[i])
}}}}},Drag:{init:function(element,onDragBegin,onDragEnd,onDrag){if(typeof(onDragBegin)==="undefined"){onDragBegin=jQuery.noop
}if(typeof(onDragEnd)==="undefined"){onDragEnd=jQuery.noop
}if(typeof(onDrag)==="undefined"){onDrag=jQuery.noop
}element.wicketOnDragBegin=onDragBegin;
element.wicketOnDrag=onDrag;
element.wicketOnDragEnd=onDragEnd;
Wicket.Event.add(element,"mousedown",Wicket.Drag.mouseDownHandler)
},mouseDownHandler:function(e){e=Wicket.Event.fix(e);
var element=this;
Wicket.Event.stop(e);
if(e.preventDefault){e.preventDefault()
}element.wicketOnDragBegin(element);
element.lastMouseX=e.clientX;
element.lastMouseY=e.clientY;
element.old_onmousemove=document.onmousemove;
element.old_onmouseup=document.onmouseup;
element.old_onselectstart=document.onselectstart;
element.old_onmouseout=document.onmouseout;
document.onselectstart=function(){return false
};
document.onmousemove=Wicket.Drag.mouseMove;
document.onmouseup=Wicket.Drag.mouseUp;
document.onmouseout=Wicket.Drag.mouseOut;
Wicket.Drag.current=element;
return false
},clean:function(element){element.onmousedown=null
},mouseMove:function(e){e=Wicket.Event.fix(e);
var o=Wicket.Drag.current;
if(e.clientX<0||e.clientY<0){return
}if(o!==null){var deltaX=e.clientX-o.lastMouseX;
var deltaY=e.clientY-o.lastMouseY;
var res=o.wicketOnDrag(o,deltaX,deltaY,e);
if(isUndef(res)){res=[0,0]
}o.lastMouseX=e.clientX+res[0];
o.lastMouseY=e.clientY+res[1]
}return false
},mouseUp:function(){var o=Wicket.Drag.current;
if(o){o.wicketOnDragEnd(o);
o.lastMouseX=null;
o.lastMouseY=null;
document.onmousemove=o.old_onmousemove;
document.onmouseup=o.old_onmouseup;
document.onselectstart=o.old_onselectstart;
document.onmouseout=o.old_onmouseout;
o.old_mousemove=null;
o.old_mouseup=null;
o.old_onselectstart=null;
o.old_onmouseout=null;
Wicket.Drag.current=null
}},mouseOut:function(e){if(false&&Wicket.Browser.isGecko()){e=Wicket.Event.fix(e);
if(e.target.tagName==="HTML"){Wicket.Drag.mouseUp(e)
}}}},Focus:{lastFocusId:"",refocusLastFocusedComponentAfterResponse:false,focusSetFromServer:false,setFocus:function(event){event=Wicket.Event.fix(event);
var target=event.target;
if(target){Wicket.Focus.refocusLastFocusedComponentAfterResponse=false;
Wicket.Focus.lastFocusId=target.id;
Wicket.Log.info("focus set on "+Wicket.Focus.lastFocusId)
}},blur:function(event){event=Wicket.Event.fix(event);
var target=event.target;
if(target&&Wicket.Focus.lastFocusId===target.id){if(Wicket.Focus.refocusLastFocusedComponentAfterResponse){Wicket.Log.info("focus removed from "+target.id+" but ignored because of component replacement")
}else{Wicket.Focus.lastFocusId=null;
Wicket.Log.info("focus removed from "+target.id)
}}},getFocusedElement:function(){if(typeof(Wicket.Focus.lastFocusId)!=="undefined"&&Wicket.Focus.lastFocusId!==""&&Wicket.Focus.lastFocusId!==null){Wicket.Log.info("returned focused element: "+Wicket.$(Wicket.Focus.lastFocusId));
return Wicket.$(Wicket.Focus.lastFocusId)
}},setFocusOnId:function(id){if(typeof(id)!=="undefined"&&id!==""&&id!==null){Wicket.Focus.refocusLastFocusedComponentAfterResponse=true;
Wicket.Focus.focusSetFromServer=true;
Wicket.Focus.lastFocusId=id;
Wicket.Log.info("focus set on "+Wicket.Focus.lastFocusId+" from serverside")
}else{Wicket.Focus.refocusLastFocusedComponentAfterResponse=false;
Wicket.Log.info("refocus focused component after request stopped from serverside")
}},markFocusedComponent:function(){var focusedElement=Wicket.Focus.getFocusedElement();
if(typeof(focusedElement)!=="undefined"&&focusedElement!==null){focusedElement.wasFocusedBeforeComponentReplacements=true;
Wicket.Focus.refocusLastFocusedComponentAfterResponse=true;
Wicket.Focus.focusSetFromServer=false
}else{Wicket.Focus.refocusLastFocusedComponentAfterResponse=false
}},checkFocusedComponentReplaced:function(){var focusedElement=Wicket.Focus.getFocusedElement();
if(Wicket.Focus.refocusLastFocusedComponentAfterResponse===true){if(typeof(focusedElement)!=="undefined"&&focusedElement!==null){if(typeof(focusedElement.wasFocusedBeforeComponentReplacements)!=="undefined"){Wicket.Focus.refocusLastFocusedComponentAfterResponse=false
}}else{Wicket.Focus.refocusLastFocusedComponentAfterResponse=false;
Wicket.Focus.lastFocusId=""
}}},requestFocus:function(){if(Wicket.Focus.refocusLastFocusedComponentAfterResponse&&typeof(Wicket.Focus.lastFocusId)!=="undefined"&&Wicket.Focus.lastFocusId!==""&&Wicket.Focus.lastFocusId!==null){var toFocus=Wicket.$(Wicket.Focus.lastFocusId);
if(toFocus!==null&&typeof(toFocus)!=="undefined"){Wicket.Log.info("Calling focus on "+Wicket.Focus.lastFocusId);
try{if(Wicket.Focus.focusSetFromServer){toFocus.focus()
}else{var temp=toFocus.onfocus;
toFocus.onfocus=null;
toFocus.focus();
window.setTimeout(function(){toFocus.onfocus=temp
},0)
}}catch(ignore){}}else{Wicket.Focus.lastFocusId="";
Wicket.Log.info("Couldn't set focus on "+Wicket.Focus.lastFocusId+" not on the page anymore")
}}else{if(Wicket.Focus.refocusLastFocusedComponentAfterResponse){Wicket.Log.info("last focus id was not set")
}else{Wicket.Log.info("refocus last focused component not needed/allowed")
}}Wicket.Focus.refocusLastFocusedComponentAfterResponse=false
},setFocusOnElements:function(elements){var len=elements.length;
for(var i=0;
i<len;
i++){if(elements[i].wicketFocusSet!==true){Wicket.Event.add(elements[i],"focus",Wicket.Focus.setFocus);
Wicket.Event.add(elements[i],"blur",Wicket.Focus.blur);
elements[i].wicketFocusSet=true
}}},attachFocusEvent:function(){Wicket.Focus.setFocusOnElements(document.getElementsByTagName("input"));
Wicket.Focus.setFocusOnElements(document.getElementsByTagName("select"));
Wicket.Focus.setFocusOnElements(document.getElementsByTagName("textarea"));
Wicket.Focus.setFocusOnElements(document.getElementsByTagName("button"));
Wicket.Focus.setFocusOnElements(document.getElementsByTagName("a"))
}}});
jQuery.event.special.inputchange={keys:{BACKSPACE:8,TAB:9,ENTER:13,ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,END:35,HOME:36},keyDownPressed:false,setup:function(){if(Wicket.Browser.isIE()){jQuery(this).on("keydown",function(event){jQuery.event.special.inputchange.keyDownPressed=true
});
jQuery(this).on("cut paste",function(evt){var self=this;
if(false===jQuery.event.special.inputchange.keyDownPressed){window.setTimeout(function(){jQuery.event.special.inputchange.handler.call(self,evt)
},10)
}});
jQuery(this).on("keyup",function(evt){jQuery.event.special.inputchange.keyDownPressed=false;
jQuery.event.special.inputchange.handler.call(this,evt)
})
}else{jQuery(this).on("input",jQuery.event.special.inputchange.handler)
}},teardown:function(){jQuery(this).off("input keyup cut paste",jQuery.event.special.inputchange.handler)
},handler:function(evt){var WE=Wicket.Event;
var k=jQuery.event.special.inputchange.keys;
var kc=WE.keyCode(WE.fix(evt));
switch(kc){case k.ENTER:case k.UP:case k.DOWN:case k.ESC:case k.TAB:case k.RIGHT:case k.LEFT:case k.SHIFT:case k.ALT:case k.CTRL:case k.HOME:case k.END:return WE.stop(evt);
default:evt.type="inputchange";
var args=Array.prototype.slice.call(arguments,0);
return jQuery(this).trigger(evt.type,args)
}}};
Wicket.Event.add(window,"domready",Wicket.Focus.attachFocusEvent);
Wicket.Event.subscribe("/dom/node/removing",function(jqEvent,element){var id=element.id;
if(Wicket.TimerHandles&&Wicket.TimerHandles[id]){window.clearTimeout(Wicket.TimerHandles[id]);
delete Wicket.TimerHandles[id]
}});
Wicket.Event.subscribe("/dom/node/added",function(){if(Wicket.TimerHandles){for(var timerHandle in Wicket.TimerHandles){if(Wicket.$$(timerHandle)===false){window.clearTimeout(timerHandle);
delete Wicket.TimerHandles[timerHandle]
}}}})
})();