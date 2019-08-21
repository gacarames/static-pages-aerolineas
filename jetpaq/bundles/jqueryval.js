(function(n){function i(n,t){for(var i=window,r=(n||"").split(".");i&&r.length;)i=i[r.shift()];return typeof i=="function"?i:(t.push(n),Function.constructor.apply(null,t))}function u(n){return n==="GET"||n==="POST"}function o(n,t){!u(t)&&n.setRequestHeader("X-HTTP-Method-Override",t)}function s(t,i,r){var u;r.indexOf("application/x-javascript")===-1&&(u=(t.getAttribute("data-ajax-mode")||"").toUpperCase(),n(t.getAttribute("data-ajax-update")).each(function(t,r){var f;switch(u){case"BEFORE":f=r.firstChild,n("<div />").html(i).contents().each(function(){r.insertBefore(this,f)});break;case"AFTER":n("<div />").html(i).contents().each(function(){r.appendChild(this)});break;default:n(r).html(i)}}))}function r(t,r){var h,c,f,e;(h=t.getAttribute("data-ajax-confirm"),!h||window.confirm(h))&&(c=n(t.getAttribute("data-ajax-loading")),e=t.getAttribute("data-ajax-loading-duration")||0,n.extend(r,{type:t.getAttribute("data-ajax-method")||undefined,url:t.getAttribute("data-ajax-url")||undefined,beforeSend:function(n){var r;return o(n,f),r=i(t.getAttribute("data-ajax-begin"),["xhr"]).apply(this,arguments),r!==!1&&c.show(e),r},complete:function(){c.hide(e),i(t.getAttribute("data-ajax-complete"),["xhr","status"]).apply(this,arguments)},success:function(n,r,u){s(t,n,u.getResponseHeader("Content-Type")||"text/html"),i(t.getAttribute("data-ajax-success"),["data","status","xhr"]).apply(this,arguments)},error:i(t.getAttribute("data-ajax-failure"),["xhr","status","error"])}),r.data.push({name:"X-Requested-With",value:"XMLHttpRequest"}),f=r.type.toUpperCase(),u(f)||(r.type="POST",r.data.push({name:"X-HTTP-Method-Override",value:f})),n.ajax(r))}function e(t){var i=n(t).data(f);return!i||!i.validate||i.validate()}var t="unobtrusiveAjaxClick",f="unobtrusiveValidation";n("a[data-ajax=true]").live("click",function(n){n.preventDefault(),r(this,{url:this.href,type:"GET",data:[]})}),n("form[data-ajax=true] input[type=image]").live("click",function(i){var f=i.target.name,e=n(i.target),r=e.parents("form")[0],u=e.offset();n(r).data(t,[{name:f+".x",value:Math.round(i.pageX-u.left)},{name:f+".y",value:Math.round(i.pageY-u.top)}]),setTimeout(function(){n(r).removeData(t)},0)}),n("form[data-ajax=true] :submit").live("click",function(i){var u=i.target.name,r=n(i.target).parents("form")[0];n(r).data(t,u?[{name:u,value:i.target.value}]:[]),setTimeout(function(){n(r).removeData(t)},0)}),n("form[data-ajax=true]").live("submit",function(i){var u=n(this).data(t)||[];(i.preventDefault(),e(this))&&r(this,{url:this.action,type:this.method||"GET",data:u.concat(n(this).serializeArray())})})})(jQuery),function(n){n.extend(n.fn,{validate:function(t){if(this.length){var i=n.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new n.validator(t,this[0]),n.data(this[0],"validator",i),i.settings.onsubmit&&(t=this.find("input, button"),t.filter(".cancel").click(function(){i.cancelSubmit=!0}),i.settings.submitHandler&&t.filter(":submit").click(function(){i.submitButton=this}),this.submit(function(t){function r(){if(i.settings.submitHandler){if(i.submitButton)var t=n("<input type='hidden'/>").attr("name",i.submitButton.name).val(i.submitButton.value).appendTo(i.currentForm);return i.settings.submitHandler.call(i,i.currentForm),i.submitButton&&t.remove(),!1}return!0}return(i.settings.debug&&t.preventDefault(),i.cancelSubmit)?(i.cancelSubmit=!1,r()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):r():(i.focusInvalid(),!1)})),i)}t&&t.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(n(this[0]).is("form"))return this.validate().form();var t=!0,i=n(this[0].form).validate();return this.each(function(){t&=i.element(this)}),t},removeAttrs:function(t){var r={},i=this;return n.each(t.split(/\s/),function(n,t){r[t]=i.attr(t),i.removeAttr(t)}),r},rules:function(t,i){var r=this[0],e;if(t){var f=n.data(r.form,"validator").settings,o=f.rules,u=n.validator.staticRules(r);switch(t){case"add":n.extend(u,n.validator.normalizeRule(i)),o[r.name]=u,i.messages&&(f.messages[r.name]=n.extend(f.messages[r.name],i.messages));break;case"remove":return i?(e={},n.each(i.split(/\s/),function(n,t){e[t]=u[t],delete u[t]}),e):(delete o[r.name],u)}}return r=n.validator.normalizeRules(n.extend({},n.validator.metadataRules(r),n.validator.classRules(r),n.validator.attributeRules(r),n.validator.staticRules(r)),r),r.required&&(f=r.required,delete r.required,r=n.extend({required:f},r)),r}}),n.extend(n.expr[":"],{blank:function(t){return!n.trim(""+t.value)},filled:function(t){return!!n.trim(""+t.value)},unchecked:function(n){return!n.checked}}),n.validator=function(t,i){this.settings=n.extend(!0,{},n.validator.defaults,t),this.currentForm=i,this.init()},n.validator.format=function(t,i){return arguments.length==1?function(){var i=n.makeArray(arguments);return i.unshift(t),n.validator.format.apply(this,i)}:(arguments.length>2&&i.constructor!=Array&&(i=n.makeArray(arguments).slice(1)),i.constructor!=Array&&(i=[i]),n.each(i,function(n,i){t=t.replace(RegExp("\\{"+n+"\\}","g"),i)}),t)},n.extend(n.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:n([]),errorLabelContainer:n([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(n){this.lastActive=n,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,n,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(n)).hide())},onfocusout:function(n){!this.checkable(n)&&(n.name in this.submitted||!this.optional(n))&&this.element(n)},onkeyup:function(n){(n.name in this.submitted||n==this.lastElement)&&this.element(n)},onclick:function(n){n.name in this.submitted?this.element(n):n.parentNode.name in this.submitted&&this.element(n.parentNode)},highlight:function(t,i,r){t.type==="radio"?this.findByName(t.name).addClass(i).removeClass(r):n(t).addClass(i).removeClass(r)},unhighlight:function(t,i,r){t.type==="radio"?this.findByName(t.name).removeClass(i).addClass(r):n(t).removeClass(i).addClass(r)}},setDefaults:function(t){n.extend(n.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:n.validator.format("Please enter no more than {0} characters."),minlength:n.validator.format("Please enter at least {0} characters."),rangelength:n.validator.format("Please enter a value between {0} and {1} characters long."),range:n.validator.format("Please enter a value between {0} and {1}."),max:n.validator.format("Please enter a value less than or equal to {0}."),min:n.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function i(t){var i=n.data(this[0].form,"validator"),r="on"+t.type.replace(/^validate/,"");i.settings[r]&&i.settings[r].call(i,this[0],t)}var r,t;this.labelContainer=n(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||n(this.currentForm),this.containers=n(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset(),r=this.groups={},n.each(this.settings.groups,function(t,i){n.each(i.split(/\s/),function(n,i){r[i]=t})}),t=this.settings.rules,n.each(t,function(i,r){t[i]=n.validator.normalizeRule(r)}),n(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",i).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",i),this.settings.invalidHandler&&n(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),n.extend(this.submitted,this.errorMap),this.invalid=n.extend({},this.errorMap),this.valid()||n(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var n=0,t=this.currentElements=this.elements();t[n];n++)this.check(t[n]);return this.valid()},element:function(t){this.lastElement=t=this.validationTargetFor(this.clean(t)),this.prepareElement(t),this.currentElements=n(t);var i=this.check(t);return i?delete this.invalid[t.name]:this.invalid[t.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i},showErrors:function(t){if(t){n.extend(this.errorMap,t),this.errorList=[];for(var i in t)this.errorList.push({message:t[i],element:this.findByName(i)[0]});this.successList=n.grep(this.successList,function(n){return!(n.name in t)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){n.fn.resetForm&&n(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(n){var t=0,i;for(i in n)t++;return t},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{n(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var t=this.lastActive;return t&&n.grep(this.errorList,function(n){return n.element.name==t.name}).length==1&&t},elements:function(){var i=this,t={};return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return(!this.name&&i.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in t||!i.objectLength(n(this).rules()))?!1:t[this.name]=!0})},clean:function(t){return n(t)[0]},errors:function(){return n(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=n([]),this.toHide=n([]),this.currentElements=n([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(n){this.reset(),this.toHide=this.errorsFor(n)},check:function(t){var f,e,u,i,r;t=this.validationTargetFor(this.clean(t)),f=n(t).rules(),e=!1;for(u in f){i={method:u,parameters:f[u]};try{if(r=n.validator.methods[u].call(this,t.value.replace(/\r/g,""),t,i.parameters),r=="dependency-mismatch")e=!0;else{if(e=!1,r=="pending"){this.toHide=this.toHide.not(this.errorsFor(t));return}if(!r)return this.formatAndAdd(t,i),!1}}catch(o){this.settings.debug&&window.console&&console.log("exception occured when checking element "+t.id+", check the '"+i.method+"' method",o);throw o;}}if(!e)return this.objectLength(f)&&this.successList.push(t),!0},customMetaMessage:function(t,i){if(n.metadata){var r=this.settings.meta?n(t).metadata()[this.settings.meta]:n(t).metadata();return r&&r.messages&&r.messages[i]}},customMessage:function(n,t){var i=this.settings.messages[n];return i&&(i.constructor==String?i:i[t])},findDefined:function(){for(var n=0;n<arguments.length;n++)if(arguments[n]!==undefined)return arguments[n]},defaultMessage:function(t,i){return this.findDefined(this.customMessage(t.name,i),this.customMetaMessage(t,i),!this.settings.ignoreTitle&&t.title||undefined,n.validator.messages[i],"<strong>Warning: No message defined for "+t.name+"</strong>")},formatAndAdd:function(n,t){var i=this.defaultMessage(n,t.method),r=/\$?\{(\d+)\}/g;typeof i=="function"?i=i.call(this,t.parameters,n):r.test(i)&&(i=jQuery.format(i.replace(r,"{$1}"),t.parameters)),this.errorList.push({message:i,element:n}),this.errorMap[n.name]=i,this.submitted[n.name]=i},addWrapper:function(n){return this.settings.wrapper&&(n=n.add(n.parent(this.settings.wrapper))),n},defaultShowErrors:function(){for(var t,n=0;this.errorList[n];n++)t=this.errorList[n],this.settings.highlight&&this.settings.highlight.call(this,t.element,this.settings.errorClass,this.settings.validClass),this.showLabel(t.element,t.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(n=0;this.successList[n];n++)this.showLabel(this.successList[n]);if(this.settings.unhighlight)for(n=0,t=this.validElements();t[n];n++)this.settings.unhighlight.call(this,t[n],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return n(this.errorList).map(function(){return this.element})},showLabel:function(t,i){var r=this.errorsFor(t);r.length?(r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),r.attr("generated")&&r.html(i)):(r=n("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(t),generated:!0}).addClass(this.settings.errorClass).html(i||""),this.settings.wrapper&&(r=r.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(r).length||(this.settings.errorPlacement?this.settings.errorPlacement(r,n(t)):r.insertAfter(t))),!i&&this.settings.success&&(r.text(""),typeof this.settings.success=="string"?r.addClass(this.settings.success):this.settings.success(r)),this.toShow=this.toShow.add(r)},errorsFor:function(t){var i=this.idOrName(t);return this.errors().filter(function(){return n(this).attr("for")==i})},idOrName:function(n){return this.groups[n.name]||(this.checkable(n)?n.name:n.id||n.name)},validationTargetFor:function(n){return this.checkable(n)&&(n=this.findByName(n.name).not(this.settings.ignore)[0]),n},checkable:function(n){return/radio|checkbox/i.test(n.type)},findByName:function(t){var i=this.currentForm;return n(document.getElementsByName(t)).map(function(n,r){return r.form==i&&r.name==t&&r||null})},getLength:function(t,i){switch(i.nodeName.toLowerCase()){case"select":return n("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return t.length},depend:function(n,t){return this.dependTypes[typeof n]?this.dependTypes[typeof n](n,t):!0},dependTypes:{boolean:function(n){return n},string:function(t,i){return!!n(t,i.form).length},"function":function(n,t){return n(t)}},optional:function(t){return!n.validator.methods.required.call(this,n.trim(t.value),t)&&"dependency-mismatch"},startRequest:function(n){this.pending[n.name]||(this.pendingRequest++,this.pending[n.name]=!0)},stopRequest:function(t,i){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],i&&this.pendingRequest==0&&this.formSubmitted&&this.form()?(n(this.currentForm).submit(),this.formSubmitted=!1):!i&&this.pendingRequest==0&&this.formSubmitted&&(n(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t){return n.data(t,"previousValue")||n.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},dateDE:{dateDE:!0},number:{number:!0},numberDE:{numberDE:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,i){t.constructor==String?this.classRuleSettings[t]=i:n.extend(this.classRuleSettings,t)},classRules:function(t){var i={};return(t=n(t).attr("class"))&&n.each(t.split(" "),function(){this in n.validator.classRuleSettings&&n.extend(i,n.validator.classRuleSettings[this])}),i},attributeRules:function(t){var r={},i,u;t=n(t);for(i in n.validator.methods)(u=i==="required"&&typeof n.fn.prop=="function"?t.prop(i):t.attr(i))?r[i]=u:t[0].getAttribute("type")===i&&(r[i]=!0);return r.maxlength&&/-1|2147483647|524288/.test(r.maxlength)&&delete r.maxlength,r},metadataRules:function(t){if(!n.metadata)return{};var i=n.data(t.form,"validator").settings.meta;return i?n(t).metadata()[i]:n(t).metadata()},staticRules:function(t){var r={},i=n.data(t.form,"validator");return i.settings.rules&&(r=n.validator.normalizeRule(i.settings.rules[t.name])||{}),r},normalizeRules:function(t,i){return n.each(t,function(r,u){if(u===!1)delete t[r];else if(u.param||u.depends){var f=!0;switch(typeof u.depends){case"string":f=!!n(u.depends,i.form).length;break;case"function":f=u.depends.call(i,i)}f?t[r]=u.param!==undefined?u.param:!0:delete t[r]}}),n.each(t,function(r,u){t[r]=n.isFunction(u)?u(i):u}),n.each(["minlength","maxlength","min","max"],function(){t[this]&&(t[this]=Number(t[this]))}),n.each(["rangelength","range"],function(){t[this]&&(t[this]=[Number(t[this][0]),Number(t[this][1])])}),n.validator.autoCreateRanges&&(t.min&&t.max&&(t.range=[t.min,t.max],delete t.min,delete t.max),t.minlength&&t.maxlength&&(t.rangelength=[t.minlength,t.maxlength],delete t.minlength,delete t.maxlength)),t.messages&&delete t.messages,t},normalizeRule:function(t){if(typeof t=="string"){var i={};n.each(t.split(/\s/),function(){i[this]=!0}),t=i}return t},addMethod:function(t,i,r){n.validator.methods[t]=i,n.validator.messages[t]=r!=undefined?r:n.validator.messages[t],i.length<3&&n.validator.addClassRules(t,n.validator.normalizeRule(t))},methods:{required:function(t,i,r){if(!this.depend(r,i))return"dependency-mismatch";switch(i.nodeName.toLowerCase()){case"select":return(t=n(i).val())&&t.length>0;case"input":if(this.checkable(i))return this.getLength(t,i)>0;default:return n.trim(t).length>0}},remote:function(t,i,r){var f,u,e;return this.optional(i)?"dependency-mismatch":(f=this.previousValue(i),this.settings.messages[i.name]||(this.settings.messages[i.name]={}),f.originalMessage=this.settings.messages[i.name].remote,this.settings.messages[i.name].remote=f.message,r=typeof r=="string"&&{url:r}||r,this.pending[i.name])?"pending":f.old===t?f.valid:(f.old=t,u=this,this.startRequest(i),e={},e[i.name]=t,n.ajax(n.extend(!0,{url:r,mode:"abort",port:"validate"+i.name,dataType:"json",data:e,success:function(r){var o,e;u.settings.messages[i.name].remote=f.originalMessage,o=r===!0,o?(e=u.formSubmitted,u.prepareElement(i),u.formSubmitted=e,u.successList.push(i),u.showErrors()):(e={},r=r||u.defaultMessage(i,"remote"),e[i.name]=f.message=n.isFunction(r)?r(t):r,u.showErrors(e)),f.valid=o,u.stopRequest(i,o)}},r)),"pending")},minlength:function(t,i,r){return this.optional(i)||this.getLength(n.trim(t),i)>=r},maxlength:function(t,i,r){return this.optional(i)||this.getLength(n.trim(t),i)<=r},rangelength:function(t,i,r){return t=this.getLength(n.trim(t),i),this.optional(i)||t>=r[0]&&t<=r[1]},min:function(n,t,i){return this.optional(t)||n>=i},max:function(n,t,i){return this.optional(t)||n<=i},range:function(n,t,i){return this.optional(t)||n>=i[0]&&n<=i[1]},email:function(n,t){return this.optional(t)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)},url:function(n,t){return this.optional(t)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)},date:function(n,t){return this.optional(t)||!/Invalid|NaN/.test(new Date(n))},dateISO:function(n,t){return this.optional(t)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(n)},number:function(n,t){return this.optional(t)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(n)},digits:function(n,t){return this.optional(t)||/^\d+$/.test(n)},creditcard:function(n,t){var r;if(this.optional(t))return"dependency-mismatch";if(/[^0-9 -]+/.test(n))return!1;var f=0,i=0,u=!1;for(n=n.replace(/\D/g,""),r=n.length-1;r>=0;r--)i=n.charAt(r),i=parseInt(i,10),u&&(i*=2)>9&&(i-=9),f+=i,u=!u;return f%10==0},accept:function(n,t,i){return i=typeof i=="string"?i.replace(/,/g,"|"):"png|jpe?g|gif",this.optional(t)||n.match(RegExp(".("+i+")$","i"))},equalTo:function(t,i,r){return r=n(r).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){n(i).valid()}),t==r.val()}}}),n.format=n.validator.format}(jQuery),function(n){var t={},i;n.ajaxPrefilter?n.ajaxPrefilter(function(n,i,r){i=n.port,n.mode=="abort"&&(t[i]&&t[i].abort(),t[i]=r)}):(i=n.ajax,n.ajax=function(r){var u=("port"in r?r:n.ajaxSettings).port;return("mode"in r?r:n.ajaxSettings).mode=="abort"?(t[u]&&t[u].abort(),t[u]=i.apply(this,arguments)):i.apply(this,arguments)})}(jQuery),function(n){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&n.each({focus:"focusin",blur:"focusout"},function(t,i){function r(t){return t=n.event.fix(t),t.type=i,n.event.handle.call(this,t)}n.event.special[i]={setup:function(){this.addEventListener(t,r,!0)},teardown:function(){this.removeEventListener(t,r,!0)},handler:function(t){return arguments[0]=n.event.fix(t),arguments[0].type=i,n.event.handle.apply(this,arguments)}}}),n.extend(n.fn,{validateDelegate:function(t,i,r){return this.bind(i,function(i){var u=n(i.target);if(u.is(t))return r.apply(u,arguments)})}})}(jQuery)