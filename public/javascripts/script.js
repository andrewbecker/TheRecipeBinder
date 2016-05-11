"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function (a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = a(require("jquery")) : a(jQuery);
}(function (a) {
	a.extend(a.fn, { validate: function validate(b) {
			if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));var c = a.data(this[0], "validator");return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function (b) {
				c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0);
			}), this.on("submit.validate", function (b) {
				function d() {
					var d, e;return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0;
				}return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1);
			})), c);
		}, valid: function valid() {
			var b, c, d;return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function () {
				b = c.element(this) && b, b || (d = d.concat(c.errorList));
			}), c.errorList = d), b;
		}, rules: function rules(b, c) {
			if (this.length) {
				var d,
				    e,
				    f,
				    g,
				    h,
				    i,
				    j = this[0];if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {case "add":
						a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));break;case "remove":
						return c ? (i = {}, a.each(c.split(/\s/), function (b, c) {
							i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required");
						}), i) : (delete e[j.name], f);}return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g;
			}
		} }), a.extend(a.expr[":"], { blank: function blank(b) {
			return !a.trim("" + a(b).val());
		}, filled: function filled(b) {
			var c = a(b).val();return null !== c && !!a.trim("" + c);
		}, unchecked: function unchecked(b) {
			return !a(b).prop("checked");
		} }), a.validator = function (b, c) {
		this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init();
	}, a.validator.format = function (b, c) {
		return 1 === arguments.length ? function () {
			var c = a.makeArray(arguments);return c.unshift(b), a.validator.format.apply(this, c);
		} : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
			b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
				return c;
			});
		}), b);
	}, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function onfocusin(a) {
				this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)));
			}, onfocusout: function onfocusout(a) {
				this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a);
			}, onkeyup: function onkeyup(b, c) {
				var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b);
			}, onclick: function onclick(a) {
				a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
			}, highlight: function highlight(b, c, d) {
				"radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
			}, unhighlight: function unhighlight(b, c, d) {
				"radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
			} }, setDefaults: function setDefaults(b) {
			a.extend(a.validator.defaults, b);
		}, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date ( ISO ).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") }, autoCreateRanges: !1, prototype: { init: function init() {
				function b(b) {
					var c = a.data(this.form, "validator"),
					    d = "on" + b.type.replace(/^validate/, ""),
					    e = c.settings;e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b);
				}this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();var c,
				    d = this.groups = {};a.each(this.settings.groups, function (b, c) {
					"string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
						d[c] = b;
					});
				}), c = this.settings.rules, a.each(c, function (b, d) {
					c[b] = a.validator.normalizeRule(d);
				}), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
			}, form: function form() {
				return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
			}, checkForm: function checkForm() {
				this.prepareForm();for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) {
					this.check(b[a]);
				}return this.valid();
			}, element: function element(b) {
				var c,
				    d,
				    e = this.clean(b),
				    f = this.validationTargetFor(e),
				    g = this,
				    h = !0;return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function (a, b) {
					b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = h && g.check(e)));
				}), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h;
			}, showErrors: function showErrors(b) {
				if (b) {
					var c = this;a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function (a, b) {
						return { message: a, element: c.findByName(b)[0] };
					}), this.successList = a.grep(this.successList, function (a) {
						return !(a.name in b);
					});
				}this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
			}, resetForm: function resetForm() {
				a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b);
			}, resetElements: function resetElements(a) {
				var b;if (this.settings.unhighlight) for (b = 0; a[b]; b++) {
					this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
				} else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
			}, numberOfInvalids: function numberOfInvalids() {
				return this.objectLength(this.invalid);
			}, objectLength: function objectLength(a) {
				var b,
				    c = 0;for (b in a) {
					a[b] && c++;
				}return c;
			}, hideErrors: function hideErrors() {
				this.hideThese(this.toHide);
			}, hideThese: function hideThese(a) {
				a.not(this.containers).text(""), this.addWrapper(a).hide();
			}, valid: function valid() {
				return 0 === this.size();
			}, size: function size() {
				return this.errorList.length;
			}, focusInvalid: function focusInvalid() {
				if (this.settings.focusInvalid) try {
					a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
				} catch (b) {}
			}, findLastActive: function findLastActive() {
				var b = this.lastActive;return b && 1 === a.grep(this.errorList, function (a) {
					return a.element.name === b.name;
				}).length && b;
			}, elements: function elements() {
				var b = this,
				    c = {};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
					var d = this.name || a(this).attr("name");return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), d in c || !b.objectLength(a(this).rules()) ? !1 : (c[d] = !0, !0);
				});
			}, clean: function clean(b) {
				return a(b)[0];
			}, errors: function errors() {
				var b = this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement + "." + b, this.errorContext);
			}, resetInternals: function resetInternals() {
				this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]);
			}, reset: function reset() {
				this.resetInternals(), this.currentElements = a([]);
			}, prepareForm: function prepareForm() {
				this.reset(), this.toHide = this.errors().add(this.containers);
			}, prepareElement: function prepareElement(a) {
				this.reset(), this.toHide = this.errorsFor(a);
			}, elementValue: function elementValue(b) {
				var c,
				    d,
				    e = a(b),
				    f = b.type;return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c);
			}, check: function check(b) {
				b = this.validationTargetFor(this.clean(b));var c,
				    d,
				    e,
				    f = a(b).rules(),
				    g = a.map(f, function (a, b) {
					return b;
				}).length,
				    h = !1,
				    i = this.elementValue(b);if ("function" == typeof f.normalizer) {
					if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");delete f.normalizer;
				}for (d in f) {
					e = { method: d, parameters: f[d] };try {
						if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
							h = !0;continue;
						}if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b)));if (!c) return this.formatAndAdd(b, e), !1;
					} catch (j) {
						throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j;
					}
				}if (!h) return this.objectLength(f) && this.successList.push(b), !0;
			}, customDataMessage: function customDataMessage(b, c) {
				return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
			}, customMessage: function customMessage(a, b) {
				var c = this.settings.messages[a];return c && (c.constructor === String ? c : c[b]);
			}, findDefined: function findDefined() {
				for (var a = 0; a < arguments.length; a++) {
					if (void 0 !== arguments[a]) return arguments[a];
				}
			}, defaultMessage: function defaultMessage(b, c) {
				var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
				    e = /\$?\{(\d+)\}/g;return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d;
			}, formatAndAdd: function formatAndAdd(a, b) {
				var c = this.defaultMessage(a, b);this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c;
			}, addWrapper: function addWrapper(a) {
				return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
			}, defaultShowErrors: function defaultShowErrors() {
				var a, b, c;for (a = 0; this.errorList[a]; a++) {
					c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
				}if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) {
					this.showLabel(this.successList[a]);
				}if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) {
					this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
				}this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
			}, validElements: function validElements() {
				return this.currentElements.not(this.invalidElements());
			}, invalidElements: function invalidElements() {
				return a(this.errorList).map(function () {
					return this.element;
				});
			}, showLabel: function showLabel(b, c) {
				var d,
				    e,
				    f,
				    g,
				    h = this.errorsFor(b),
				    i = this.idOrName(b),
				    j = a(b).attr("aria-describedby");h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function (b, c) {
					c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"));
				})))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h);
			}, errorsFor: function errorsFor(b) {
				var c = this.escapeCssMeta(this.idOrName(b)),
				    d = a(b).attr("aria-describedby"),
				    e = "label[for='" + c + "'], label[for='" + c + "'] *";return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e);
			}, escapeCssMeta: function escapeCssMeta(a) {
				return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
			}, idOrName: function idOrName(a) {
				return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
			}, validationTargetFor: function validationTargetFor(b) {
				return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
			}, checkable: function checkable(a) {
				return (/radio|checkbox/i.test(a.type)
				);
			}, findByName: function findByName(b) {
				return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']");
			}, getLength: function getLength(b, c) {
				switch (c.nodeName.toLowerCase()) {case "select":
						return a("option:selected", c).length;case "input":
						if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;}return b.length;
			}, depend: function depend(a, b) {
				return this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)] ? this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)](a, b) : !0;
			}, dependTypes: { "boolean": function boolean(a) {
					return a;
				}, string: function string(b, c) {
					return !!a(b, c.form).length;
				}, "function": function _function(a, b) {
					return a(b);
				} }, optional: function optional(b) {
				var c = this.elementValue(b);return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
			}, startRequest: function startRequest(b) {
				this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0);
			}, stopRequest: function stopRequest(b, c) {
				this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
			}, previousValue: function previousValue(b, c) {
				return a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) });
			}, destroy: function destroy() {
				this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur");
			} }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function addClassRules(b, c) {
			b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b);
		}, classRules: function classRules(b) {
			var c = {},
			    d = a(b).attr("class");return d && a.each(d.split(" "), function () {
				this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
			}), c;
		}, normalizeAttributeRule: function normalizeAttributeRule(a, b, c, d) {
			/min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0);
		}, attributeRules: function attributeRules(b) {
			var c,
			    d,
			    e = {},
			    f = a(b),
			    g = b.getAttribute("type");for (c in a.validator.methods) {
				"required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
			}return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
		}, dataRules: function dataRules(b) {
			var c,
			    d,
			    e = {},
			    f = a(b),
			    g = b.getAttribute("type");for (c in a.validator.methods) {
				d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
			}return e;
		}, staticRules: function staticRules(b) {
			var c = {},
			    d = a.data(b.form, "validator");return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
		}, normalizeRules: function normalizeRules(b, c) {
			return a.each(b, function (d, e) {
				if (e === !1) return void delete b[d];if (e.param || e.depends) {
					var f = !0;switch (_typeof(e.depends)) {case "string":
							f = !!a(e.depends, c.form).length;break;case "function":
							f = e.depends.call(c, c);}f ? b[d] = void 0 !== e.param ? e.param : !0 : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]);
				}
			}), a.each(b, function (d, e) {
				b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e;
			}), a.each(["minlength", "maxlength"], function () {
				b[this] && (b[this] = Number(b[this]));
			}), a.each(["rangelength", "range"], function () {
				var c;b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]));
			}), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b;
		}, normalizeRule: function normalizeRule(b) {
			if ("string" == typeof b) {
				var c = {};a.each(b.split(/\s/), function () {
					c[this] = !0;
				}), b = c;
			}return b;
		}, addMethod: function addMethod(b, c, d) {
			a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
		}, methods: { required: function required(b, c, d) {
				if (!this.depend(d, c)) return "dependency-mismatch";if ("select" === c.nodeName.toLowerCase()) {
					var e = a(c).val();return e && e.length > 0;
				}return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0;
			}, email: function email(a, b) {
				return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
			}, url: function url(a, b) {
				return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a);
			}, date: function date(a, b) {
				return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString());
			}, dateISO: function dateISO(a, b) {
				return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
			}, number: function number(a, b) {
				return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
			}, digits: function digits(a, b) {
				return this.optional(b) || /^\d+$/.test(a);
			}, minlength: function minlength(b, c, d) {
				var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || e >= d;
			}, maxlength: function maxlength(b, c, d) {
				var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || d >= e;
			}, rangelength: function rangelength(b, c, d) {
				var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || e >= d[0] && e <= d[1];
			}, min: function min(a, b, c) {
				return this.optional(b) || a >= c;
			}, max: function max(a, b, c) {
				return this.optional(b) || c >= a;
			}, range: function range(a, b, c) {
				return this.optional(b) || a >= c[0] && a <= c[1];
			}, step: function step(b, c, d) {
				var e = a(c).attr("type"),
				    f = "Step attribute on input type " + e + " is not supported.",
				    g = ["text", "number", "range"],
				    h = new RegExp("\\b" + e + "\\b"),
				    i = e && !h.test(g.join());if (i) throw new Error(f);return this.optional(c) || b % d === 0;
			}, equalTo: function equalTo(b, c, d) {
				var e = a(d);return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
					a(c).valid();
				}), b === e.val();
			}, remote: function remote(b, c, d, e) {
				if (this.optional(c)) return "dependency-mismatch";e = "string" == typeof e && e || "remote";var f,
				    g,
				    h,
				    i = this.previousValue(c, e);return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, { mode: "abort", port: "validate" + c.name, dataType: "json", data: g, context: f.currentForm, success: function success(a) {
						var d,
						    g,
						    h,
						    j = a === !0 || "true" === a;f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j);
					} }, d)), "pending");
			} } });var b,
	    c = {};a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
		var e = a.port;"abort" === a.mode && (c[e] && c[e].abort(), c[e] = d);
	}) : (b = a.ajax, a.ajax = function (d) {
		var e = ("mode" in d ? d : a.ajaxSettings).mode,
		    f = ("port" in d ? d : a.ajaxSettings).port;return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments);
	});
});
$(function () {
	$('.login_form').validate({
		// Validation rules
		rules: {
			username: "required",
			password: "required"
		},
		// Specify the validation messages
		messages: {
			username: "Please enter your username",
			password: "Please enter your password"
		},
		submitHandler: function submitHandler(form) {
			form.submit();
		}
	});

	$('#signup_form').validate({
		// Validation rules
		rules: {
			first_name: "required",
			last_name: "required",
			username: "required",
			password: "required"
		},
		messages: {
			// Vaidation messages
			first_name: "Please enter your first name",
			last_name: "Please enter your last name",
			username: "Please enter your username",
			password: "Please enter your password"
		},
		submitHandler: function submitHandler(form) {
			form.submit();
		}
	});
});

$(function () {
	var slideshow = {
		total_width: $('.slider ul').width(),
		total_slides: $('.slider_slide').length,
		slider_width: $('.slider').width(),
		slide_width: $('.slider_slide').width(),
		moves_before_reset: 0
	};

	// console.log('Slider total width: ' + slideshow.total_width + 'px');
	// //2200
	// console.log('Pics: ' + slideshow.total_slides + 'px');
	// //4
	// console.log('Width: ' + slideshow.slider_width + 'px');
	// //1170
	// console.log('Slide width: ' + slideshow.slide_width + 'px');

	var totalMove = slideshow.total_width - slideshow.slider_width;
	// console.log('Total move: ' + totalMove + 'px');

	slideshow.moves_before_reset = Math.ceil(totalMove / slideshow.slide_width);

	// console.log('Moves before reset: ' + slideshow.moves_before_reset);

	/*****  Meat and Potatoes  *****/

	function moveSlider(length, slider) {
		slider.animate({ left: length }, "slow");
	}

	// function debug() {
	// 	$('.slider_total_width').html("Total slider width: " + slideshow.total_width);
	// 	$('.total_slides').html("Total number of slides: " + slideshow.total_slides);
	// 	$('.slider_width').html("Slider visible width: " + slideshow.slider_width);
	// 	$('.slide_width').html("Slide width: " + slideshow.slide_width);
	// 	$('.moves_before_reset').html("Moves before reset: " + slideshow.moves_before_reset);
	// 	//$('.total_move').html("Total Move: " + total_move);
	// 	$('.difference_slide_to_window').html("Difference: " + (slideshow.total_width - slideshow.slider_width));
	// 	// console.log('Slider total width: ' + slideshow.total_width + 'px');
	// 	// console.log('Pics: ' + slideshow.total_slides + 'px');
	// 	// console.log('Width: ' + slideshow.slider_width + 'px');
	// 	// console.log('Slide width: ' + slideshow.slide_width + 'px');
	// 	// console.log('Total - Slider: ' + (slideshow.total_width - slideshow.slider_width));
	// }

	var $slider = $('.slider ul');

	var moveLength = slideshow.slide_width;
	var moveNum = 1;

	var calculateSliderInfo = setInterval(function () {
		slideshow.total_width = $('.slider ul').width();
		slideshow.slider_width = $('.slider').width();
		totalMove = slideshow.total_width - slideshow.slider_width;
		slideshow.moves_before_reset = Math.ceil(totalMove / slideshow.slide_width);
	}, 500);

	// var outputStats = setInterval(function() {
	// 	debug();
	// }, 500);

	var slideAdvance = setInterval(function () {
		var move = moveLength * moveNum;

		if (moveNum > slideshow.moves_before_reset) {
			moveNum = 0;
			move = moveLength * moveNum;
		} else if (move > slideshow.total_width - slideshow.slider_width) {
			move = slideshow.total_width - slideshow.slider_width;
		}

		moveSlider(-move, $slider);
		moveNum += 1;
	}, 4000);
});
$(function () {

	var heightArray = [];
	var maxHeight = 0;
	var windowWidth = $('.main-area').outerWidth();

	$('.recipe-card').each(function (i, obj) {
		var imgHeight, titleHeight, descriptionHeight, totalHeight;
		imgHeight = $(this).find('img').innerHeight();
		titleHeight = $(this).find('h3').outerHeight();
		descriptionHeight = $(this).find('p').innerHeight();
		totalHeight = imgHeight + titleHeight + descriptionHeight + 40;

		heightArray.push(totalHeight);
	});

	var maxHeight = Math.max.apply(Math, _toConsumableArray(heightArray));

	$('.recipe-card').each(function () {
		$(this).height(maxHeight);
	});

	//********************** TESTING AREA

	$('.special-row').height(maxHeight + 22);

	//**********************

	var checkWidth = setInterval(function () {
		var newWindowWidth = $('.main-area').outerWidth();
		if (newWindowWidth !== windowWidth) {
			windowWidth = newWindowWidth;
			heightArray = [];

			$('.recipe-card').each(function (i, obj) {
				var imgHeight, titleHeight, descriptionHeight, totalHeight;
				imgHeight = $(this).find('img').innerHeight();
				titleHeight = $(this).find('h3').outerHeight();
				descriptionHeight = $(this).find('p').innerHeight();
				totalHeight = imgHeight + titleHeight + descriptionHeight + 40;

				heightArray.push(totalHeight);
			});

			var maxHeight = Math.max.apply(Math, _toConsumableArray(heightArray));

			$('.recipe-card').each(function () {
				$(this).height(maxHeight);
			});

			//***** TESTING   ******//
			$('.special-row').height(maxHeight + 22);
		};
	}, 250);
});