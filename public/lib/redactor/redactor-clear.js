(function ($, uuid, Range) {
	'use strict'
	function Redactor(el, options) {
		return new Redactor.prototype.init(el, options);
	}
	uuid = 0, Range = function(range) {
		return this[0] = range.startOffset, this[1] = range.endOffset, this.range = range, this;
	}, Range.prototype.equals = function() {
		return this[0] === this[1];
	}, $.fn.redactor = function(options) {
		var val = [];
		var args = Array.prototype.slice.call(arguments, 1);
		return typeof options === 'string' ? this.each(function() {
			var instance = $.data(this, 'redactor');
			if (typeof instance !== 'undefined' && $.isFunction(instance[options])) {
				var methodVal = instance[options].apply(instance, args);
				methodVal !== undefined && methodVal !== instance && val.push(methodVal);
			} else return $.error('No such method "' + options + '" for Redactor');
		}) : this.each(function() {
			$.data(this, 'redactor') || $.data(this, 'redactor', Redactor(this, options));
		}), val.length === 0 ? this : val.length === 1 ? val[0] : val;
	}, $.Redactor = Redactor, $.Redactor.VERSION = '9.0.1', $.Redactor.opts = {
		initCallback: !1,
		changeCallback: !1,
		focusCallback: !1,
		blurCallback: !1,
		keydownCallback: !1,
		keyupCallback: !1,
		execCommandCallback: !1,
		pasteBeforeCallback: !1,
		pasteAfterCallback: !1,
		autosaveCallback: !1,
		imageUploadCallback: !1,
		imageUploadErrorCallback: !1,
		imageDeleteCallback: !1,
		fileUploadCallback: !1,
		fileUploadErrorCallback: !1,
		rangy: !1,
		iframe: !1,
		fullpage: !1,
		css: !1,
		lang: 'en',
		direction: 'ltr',
		placeholder: !1,
		wym: !1,
		mobile: !0,
		cleanup: !0,
		visual: !0,
		focus: !1,
		tabindex: !1,
		autoresize: !0,
		minHeight: !1,
		shortcuts: !0,
		autosave: !1,
		autosaveInterval: 60,
		plugins: !1,
		linkAnchor: !1,
		linkEmail: !1,
		linkProtocol: 'http://',
		imageGetJson: !1,
		imageUpload: !1,
		fileUpload: !1,
		s3: !1,
		uploadFields: !1,
		observeImages: !0,
		modalOverlay: !0,
		tabFocus: !0,
		air: !1,
		airButtons: ['formatting', '|', 'bold', 'italic', 'deleted', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', '|', 'fontcolor', 'backcolor'],
		toolbar: !0,
		toolbarFixed: !1,
		toolbarFixedTopOffset: 0,
		toolbarFixedBox: !1,
		toolbarExternal: !1,
		buttonSource: !0,
		buttonSeparator: '<li class="redactor_separator"></li>',
		buttonsCustom: {},
		buttonsAdd: [],
		buttons: ['html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', '|', 'image', 'video', 'file', 'table', 'link', '|', 'fontcolor', 'backcolor', '|', 'alignment', '|', 'horizontalrule'],
		colors: ['#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646', '#ffff00', '#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada', '#fff2ca', '#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5', '#ffe694', '#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#b7dde8', '#fac08f', '#f2c314', '#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#92cddc', '#e36c09', '#c09100', '#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#31859b', '#974806', '#7f6000'],
		activeButtons: ['deleted', 'italic', 'bold', 'underline', 'unorderedlist', 'orderedlist', 'alignleft', 'aligncenter', 'alignright', 'justify', 'table'],
		activeButtonsStates: {
			b: 'bold',
			strong: 'bold',
			i: 'italic',
			em: 'italic',
			del: 'deleted',
			strike: 'deleted',
			ul: 'unorderedlist',
			ol: 'orderedlist',
			u: 'underline',
			tr: 'table',
			td: 'table',
			table: 'table'
		},
		activeButtonsAdd: !1,
		formattingTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4'],
		linebreaks: !1,
		paragraphy: !0,
		convertDivs: !0,
		convertLinks: !0,
		formattingPre: !1,
		phpTags: !1,
		allowedTags: !1,
		deniedTags: ['html', 'head', 'link', 'body', 'meta', 'script', 'style', 'applet'],
		boldTag: 'strong',
		italicTag: 'em',
		buffer: [],
		rebuffer: [],
		textareamode: !1,
		emptyHtml: '<p>&#x200b;</p>',
		invisibleSpace: '&#x200b;',
		alignmentTags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'TD', 'DIV', 'BLOCKQUOTE'],
		ownLine: ['area', 'body', 'head', 'hr', 'i?frame', 'link', 'meta', 'noscript', 'style', 'script', 'table', 'tbody', 'thead', 'tfoot'],
		contOwnLine: ['li', 'dt', 'dt', 'h[1-6]', 'option', 'script'],
		newLevel: ['blockquote', 'div', 'dl', 'fieldset', 'form', 'frameset', 'map', 'ol', 'p', 'pre', 'select', 'td', 'th', 'tr', 'ul'],
		blockLevelElements: ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DD', 'DL', 'DT', 'DIV', 'LI', 'BLOCKQUOTE', 'OUTPUT', 'FIGCAPTION', 'PRE', 'ADDRESS', 'SECTION', 'HEADER', 'FOOTER', 'ASIDE', 'ARTICLE'],
		langs: {
			en: {
				html: 'HTML',
				video: 'Insert Video',
				image: 'Insert Image',
				table: 'Table',
				link: 'Link',
				link_insert: 'Insert link',
				link_edit: 'Edit link',
				unlink: 'Unlink',
				formatting: 'Formatting',
				paragraph: 'Normal text',
				quote: 'Quote',
				code: 'Code',
				header1: 'Header 1',
				header2: 'Header 2',
				header3: 'Header 3',
				header4: 'Header 4',
				bold: 'Bold',
				italic: 'Italic',
				fontcolor: 'Font Color',
				backcolor: 'Back Color',
				unorderedlist: 'Unordered List',
				orderedlist: 'Ordered List',
				outdent: 'Outdent',
				indent: 'Indent',
				cancel: 'Cancel',
				insert: 'Insert',
				save: 'Save',
				_delete: 'Delete',
				insert_table: 'Insert Table',
				insert_row_above: 'Add Row Above',
				insert_row_below: 'Add Row Below',
				insert_column_left: 'Add Column Left',
				insert_column_right: 'Add Column Right',
				delete_column: 'Delete Column',
				delete_row: 'Delete Row',
				delete_table: 'Delete Table',
				rows: 'Rows',
				columns: 'Columns',
				add_head: 'Add Head',
				delete_head: 'Delete Head',
				title: 'Title',
				image_position: 'Position',
				none: 'None',
				left: 'Left',
				right: 'Right',
				image_web_link: 'Image Web Link',
				text: 'Text',
				mailto: 'Email',
				web: 'URL',
				video_html_code: 'Video Embed Code',
				file: 'Insert File',
				upload: 'Upload',
				download: 'Download',
				choose: 'Choose',
				or_choose: 'Or choose',
				drop_file_here: 'Drop file here',
				align_left: 'Align text to the left',
				align_center: 'Center text',
				align_right: 'Align text to the right',
				align_justify: 'Justify text',
				horizontalrule: 'Insert Horizontal Rule',
				deleted: 'Deleted',
				anchor: 'Anchor',
				link_new_tab: 'Open link in new tab',
				underline: 'Underline',
				alignment: 'Alignment',
				filename: 'Name (optional)'
			}
		}
	}, Redactor.fn = $.Redactor.prototype = {
		keyCode: {
			BACKSPACE: 8,
			DELETE: 46,
			DOWN: 40,
			ENTER: 13,
			ESC: 27,
			TAB: 9,
			CTRL: 17,
			META: 91,
			LEFT: 37,
			LEFT_WIN: 91
		},
		init: function(el, options) {
			if (this['$element'] = this['$source'] = $(el), this.uuid = uuid++, this.opts = $.extend({}, $.Redactor.opts, this['$element'].data(), options), this.dropdowns = [], this.sourceHeight = this['$source'].css('height'), this.sourceWidth = this['$source'].css('width'), this.opts.fullpage && (this.opts.iframe = !0), this.opts.linebreaks && (this.opts.paragraphy = !1), this.opts.paragraphy && (this.opts.linebreaks = !1), this.opts.toolbarFixedBox && (this.opts.toolbarFixed = !0), this.document = document, this.window = window, this.savedSel = !1, this.cleanlineBefore = new RegExp('^<(/?' + this.opts.ownLine.join('|/?') + '|' + this.opts.contOwnLine.join('|') + ')[ >]'), this.cleanlineAfter = new RegExp('^<(br|/?' + this.opts.ownLine.join('|/?') + '|/' + this.opts.contOwnLine.join('|/') + ')[ >]'), this.cleannewLevel = new RegExp('^</?(' + this.opts.newLevel.join('|') + ')[ >]'), this.rTestBlock = new RegExp('^(' + this.opts.blockLevelElements.join('|') + ')$', 'i'), this.opts.linebreaks === !1 && (this.opts.allowedTags !== !1 && $.inArray('p', this.opts.allowedTags) === '-1' && this.opts.allowedTags.push('p'), this.opts.deniedTags !== !1)) {
				var pos = $.inArray('p', this.opts.deniedTags);
				pos !== '-1' && this.opts.deniedTags.splice(pos, pos);
			}(this.browser('msie') || this.browser('opera')) && (this.opts.buttons = this.removeFromArrayByValue(this.opts.buttons, 'horizontalrule')),
			this.opts.curLang = this.opts.langs[this.opts.lang], this.buildStart();
		},
		initToolbar: function(lang) {
			return {
				html: {
					title: lang.html,
					func: 'toggle'
				},
				formatting: {
					title: lang.formatting,
					func: 'show',
					dropdown: {
						p: {
							title: lang.paragraph,
							func: 'formatBlocks'
						},
						blockquote: {
							title: lang.quote,
							func: 'formatQuote',
							className: 'redactor_format_blockquote'
						},
						pre: {
							title: lang.code,
							func: 'formatBlocks',
							className: 'redactor_format_pre'
						},
						h1: {
							title: lang.header1,
							func: 'formatBlocks',
							className: 'redactor_format_h1'
						},
						h2: {
							title: lang.header2,
							func: 'formatBlocks',
							className: 'redactor_format_h2'
						},
						h3: {
							title: lang.header3,
							func: 'formatBlocks',
							className: 'redactor_format_h3'
						},
						h4: {
							title: lang.header4,
							func: 'formatBlocks',
							className: 'redactor_format_h4'
						}
					}
				},
				bold: {
					title: lang.bold,
					exec: 'bold'
				},
				italic: {
					title: lang.italic,
					exec: 'italic'
				},
				deleted: {
					title: lang.deleted,
					exec: 'strikethrough'
				},
				underline: {
					title: lang.underline,
					exec: 'underline'
				},
				unorderedlist: {
					title: '&bull; ' + lang.unorderedlist,
					exec: 'insertunorderedlist'
				},
				orderedlist: {
					title: '1. ' + lang.orderedlist,
					exec: 'insertorderedlist'
				},
				outdent: {
					title: '< ' + lang.outdent,
					func: 'indentingOutdent'
				},
				indent: {
					title: '> ' + lang.indent,
					func: 'indentingIndent'
				},
				image: {
					title: lang.image,
					func: 'imageShow'
				},
				video: {
					title: lang.video,
					func: 'videoShow'
				},
				file: {
					title: lang.file,
					func: 'fileShow'
				},
				table: {
					title: lang.table,
					func: 'show',
					dropdown: {
						insert_table: {
							title: lang.insert_table,
							func: 'tableShow'
						},
						separator_drop1: {
							name: 'separator'
						},
						insert_row_above: {
							title: lang.insert_row_above,
							func: 'tableAddRowAbove'
						},
						insert_row_below: {
							title: lang.insert_row_below,
							func: 'tableAddRowBelow'
						},
						insert_column_left: {
							title: lang.insert_column_left,
							func: 'tableAddColumnLeft'
						},
						insert_column_right: {
							title: lang.insert_column_right,
							func: 'tableAddColumnRight'
						},
						separator_drop2: {
							name: 'separator'
						},
						add_head: {
							title: lang.add_head,
							func: 'tableAddHead'
						},
						delete_head: {
							title: lang.delete_head,
							func: 'tableDeleteHead'
						},
						separator_drop3: {
							name: 'separator'
						},
						delete_column: {
							title: lang.delete_column,
							func: 'tableDeleteColumn'
						},
						delete_row: {
							title: lang.delete_row,
							func: 'tableDeleteRow'
						},
						delete_table: {
							title: lang.delete_table,
							func: 'tableDeleteTable'
						}
					}
				},
				link: {
					title: lang.link,
					func: 'show',
					dropdown: {
						link: {
							title: lang.link_insert,
							func: 'linkShow'
						},
						unlink: {
							title: lang.unlink,
							exec: 'unlink'
						}
					}
				},
				fontcolor: {
					title: lang.fontcolor,
					func: 'show'
				},
				backcolor: {
					title: lang.backcolor,
					func: 'show'
				},
				alignment: {
					title: lang.alignment,
					func: 'show',
					dropdown: {
						alignleft: {
							title: lang.align_left,
							func: 'alignmentLeft'
						},
						aligncenter: {
							title: lang.align_center,
							func: 'alignmentCenter'
						},
						alignright: {
							title: lang.align_right,
							func: 'alignmentRight'
						},
						justify: {
							title: lang.align_justify,
							func: 'alignmentJustify'
						}
					}
				},
				alignleft: {
					title: lang.align_left,
					func: 'alignmentLeft'
				},
				aligncenter: {
					title: lang.align_center,
					func: 'alignmentCenter'
				},
				alignright: {
					title: lang.align_right,
					func: 'alignmentRight'
				},
				justify: {
					title: lang.align_justify,
					func: 'alignmentJustify'
				},
				horizontalrule: {
					exec: 'inserthorizontalrule',
					title: lang.horizontalrule
				}
			};
		},
		callback: function(type, event, data) {
			var callback = this.opts[type + 'Callback'];
			return $.isFunction(callback) ? event === !1 ? callback.call(this, data) : callback.call(this, event, data) : data;
		},
		destroy: function() {
			clearInterval(this.autosaveInterval), $(window).off('.redactor'), this['$element'].off('.redactor').removeData('redactor');
			var html = this.get();
			if (this.opts.textareamode) this['$box'].after(this.$source), this['$box'].remove(), this['$source'].val(html).show();
			else {
				var $elem = this['$editor'];
				this.opts.iframe && ($elem = this['$element']), this['$box'].after($elem), this['$box'].remove(), $elem.removeClass('redactor_editor').removeClass('redactor_editor_wym').removeAttr('contenteditable').html(html).show();
			}
		},
		get: function() {
			return this['$source'].val();
		},
		getCodeIframe: function() {
			this['$editor'].removeAttr('contenteditable').removeAttr('dir');
			var html = this.outerHtml(this['$frame'].contents().children());
			return this['$editor'].attr({
				contenteditable: !0,
				dir: this.opts.direction
			}), html;
		},
		set: function(html, strip) {
			html = html.toString(), this.opts.fullpage ? this.setCodeIframe(html) : this.setEditor(html, strip);
		},
		setEditor: function(html, strip) {
			strip !== !1 && (html = this.cleanSavePreCode(html), html = this.cleanStripTags(html), html = this.cleanConvertProtected(html), html = this.cleanConvertInlineTags(html), this.opts.linebreaks === !1 ? html = this.cleanConverters(html) : html = html.replace(/<p(.*?)>([\w\W]*?)<\/p>/gi, '$2<br>')), html = this.cleanEmpty(html), this['$editor'].html(html), this.sync();
		},
		setCodeIframe: function(html) {
			var doc = this.iframePage();
			this['$frame'][0].src = 'about:blank', html = this.cleanConvertProtected(html), html = this.cleanConvertInlineTags(html), html = this.cleanRemoveSpaces(html), doc.open(), doc.write(html), doc.close(), this.opts.fullpage && (this['$editor'] = this['$frame'].contents().find('body').attr({
				contenteditable: !0,
				dir: this.opts.direction
			})), this.sync();
		},
		setFullpageOnInit: function(html) {
			html = this.cleanSavePreCode(html, !0), html = this.cleanConverters(html), html = this.cleanEmpty(html), this['$editor'].html(html), this.sync();
		},
		sync: function() {
			var html = '';
			this.cleanUnverified(), this.opts.fullpage ? html = this.getCodeIframe() : html = this['$editor'].html(), html = this.syncClean(html), html = this.cleanRemoveSpaces(html), html = this.cleanRemoveEmptyTags(html), html = html.replace(/<\/li><(ul|ol)>([\w\W]*?)<\/(ul|ol)>/gi, '<$1>$2</$1></li>'), $.trim(html) === '<br>' && (html = ''), html !== '' && (html = this.cleanHtml(html)), html = this.callback('syncBefore', !1, html), this['$source'].val(html), typeof htmlEncode != 'undefined' && $('#' + this['$element'][0].id + '_code').html(htmlEncode(html)), this.callback('syncAfter', !1, html), this.callback('change', !1, html);
		},
		syncClean: function(html) {
			return this.opts.fullpage || (html = this.cleanStripTags(html)), html = $.trim(html), html = this.placeholderRemoveFromCode(html), html = html.replace(/&#x200b;/gi, ''), html = html.replace(/&#8203;/gi, ''), html = html.replace(/&nbsp;/gi, ' '), html = html.replace('<!--?php', '<?php'), html = html.replace('?-->', '?>'),
			html = html.replace(/<span(.*?)data-redactor="verified"(.*?)>([\w\W]*?)<\/span>/gi, '<font$1data-redactor="verified"$2>$3</font>'), html = html.replace(/<span(.*?)>([\w\W]*?)<\/span>/gi, '$2'), html = html.replace(/<font(.*?)data-redactor="verified"(.*?)>([\w\W]*?)<\/font>/gi, '<span$1$2>$3</span>'), html = html.replace(/<br\s?\/?>\n?<\/(.*?)>/gi, '</$1>'), html = html.replace(/<span(.*?)data-redactor-inlineMethods=""(.*?)>([\w\W]*?)<\/span>/gi, '<span$1$2>$3</span>'), html = html.replace(/<span\s*?>([\w\W]*?)<\/span>/gi, '$1'), html = html.replace(/<span\s*?id="selection-marker(.*?)"(.*?)>([\w\W]*?)<\/span>/gi, ''), html = this.cleanReConvertProtected(html), html;
		},
		buildStart: function() {
			this.content = '', this['$box'] = $('<div class="redactor_box" />'), this['$source'][0].tagName === 'TEXTAREA' && (this.opts.textareamode = !0), this.opts.mobile === !1 && this.isMobile() ? this.buildMobile() : (this.buildContent(), this.opts.iframe ? (this.opts.autoresize = !1, this.iframeStart()) : this.opts.textareamode ? this.buildFromTextarea() : this.buildFromElement(), this.opts.iframe || (this.buildOptions(), this.buildAfter()));
		},
		buildMobile: function() {
			this.opts.textareamode || (this['$editor'] = this['$source'], this['$editor'].hide(), this['$source'] = this.buildCodearea(this.$editor), this['$source'].val(this.content)), this['$box'].insertAfter(this.$source).append(this.$source);
		},
		buildContent: function() {
			this.opts.textareamode ? this.content = $.trim(this['$source'].val()) : this.content = $.trim(this['$source'].html());
		},
		buildFromTextarea: function() {
			this['$editor'] = $('<div />'), this['$box'].insertAfter(this.$source).append(this.$editor).append(this.$source), this.buildAddClasses(this.$editor), this.buildEnable();
		},
		buildFromElement: function() {
			this['$editor'] = this['$source'], this['$source'] = this.buildCodearea(this.$editor), this['$box'].insertAfter(this.$editor).append(this.$editor).append(this.$source), this.buildEnable();
		},
		buildCodearea: function($source) {
			return $('<textarea />').attr('name', $source.attr('id')).css('height', this.sourceHeight);
		},
		buildAddClasses: function(el) {
			$.each(this['$source'].get(0).className.split(/\s+/), function(i, s) {
				el.addClass('redactor_' + s);
			});
		},
		buildEnable: function() {
			this['$editor'].addClass('redactor_editor').attr({
				contenteditable: !0,
				dir: this.opts.direction
			}), this['$source'].attr('dir', this.opts.direction).hide(), this.set(this.content);
		},
		buildOptions: function() {
			var $source = this['$editor'];
			this.opts.iframe && ($source = this['$frame']),
			this.opts.tabindex && $source.attr('tabindex', this.opts.tabindex), this.opts.minHeight && $source.css('min-height', this.opts.minHeight + 'px'), this.opts.wym && this['$editor'].addClass('redactor_editor_wym'), this.opts.autoresize || $source.css('height', this.sourceHeight);
		},
		buildAfter: function() {
			if (this.opts.toolbar && (this.opts.toolbar = this.initToolbar(this.opts.curLang), this.toolbarBuild()), this.modalTemplatesInit(), this.buildPlugins(), this.browser('opera') || this.pasteInit(), this.buildBindKeyboard(), this.opts.autosave && this.autosave(), setTimeout($.proxy(this.observeStart, this), 4), this.browser('mozilla')) try {
				this.document.execCommand('enableObjectResizing', !1, !1), this.document.execCommand('enableInlineTableEditing', !1, !1);
			} catch (e) {}
			this.opts.focus && setTimeout($.proxy(this.focus, this), 100), this.opts.visual || setTimeout($.proxy(function() {
				this.opts.visual = !0, this.toggle(!1);
			}, this), 200), this.callback('init');
		},
		buildBindKeyboard: function() {
			this['$editor'].on('keydown.redactor', $.proxy(function(e) {
				var key = e.which;
				var ctrl = e.ctrlKey || e.metaKey;
				var parent = this.getParent();
				var current = this.getCurrent();
				var block = this.getBlock();
				var pre = !1;
				if (this.callback('keydown', e), (parent && $(parent).get(0).tagName === 'PRE' || current && $(current).get(0).tagName === 'PRE') && (pre = !0, key === this.keyCode.DOWN && this.insertAfterLastElement(block)), key === this.keyCode.DOWN && (parent && $(parent).get(0).tagName === 'BLOCKQUOTE' && this.insertAfterLastElement(parent), current && $(current).get(0).tagName === 'BLOCKQUOTE' && this.insertAfterLastElement(current)), ctrl && !e.shiftKey && this.shortcuts(e, key), ctrl && key === 90 && !e.shiftKey && !e.altKey) {
					e.preventDefault(), this.opts.buffer.length ? this.bufferUndo() : this.document.execCommand('undo', !1, !1);
					return;
				} else if (ctrl && key === 90 && e.shiftKey && !e.altKey) {
					e.preventDefault(), this.opts.rebuffer.length != 0 ? this.bufferRedo() : this.document.execCommand('redo', !1, !1);
					return;
				}
				if (ctrl && (key === 65 ? this.selectall = !0 : key != this.keyCode.LEFT_WIN && !ctrl && (this.selectall = !1)), key == this.keyCode.ENTER && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
					if (parent.nodeType == 1 && (parent.tagName == 'TD' || parent.tagName == 'TH')) return this.insertNode(document.createElement('br')), e.preventDefault(), !1;
					if (pre === !0) {
						this.bufferSet(), e.preventDefault();
						var html = $(current).parent().text();
						return this.insertNode(document.createTextNode('\n')), html.search(/\s$/) == -1 && this.insertNode(document.createTextNode('\n')), this.sync(), !1;
					} else {
						if (!this.opts.linebreaks)
							if (block && /^(P|H[1-6]|LI|ADDRESS|SECTION|HEADER|FOOTER|ASIDE|ARTICLE)$/i .test(block.tagName)) setTimeout($.proxy(function() {
								var blockElem = this.getBlock();
								if (blockElem.tagName === 'DIV' && !$(blockElem).hasClass('redactor_editor')) {
									var node = $('<p>' + this.opts.invisibleSpace + '</p>');
									$(blockElem).replaceWith(node), this.selectionStart(node);
								}
							}, this), 1);
							else
						if (block === !1) {
							var node = $('<p>' + this.opts.invisibleSpace + '</p>');
							return this.insertNode(node[0]), this.selectionStart(node), !1;
						}
						if (this.opts.linebreaks)
							if (block && /^(P|H[1-6]|LI|ADDRESS|SECTION|HEADER|FOOTER|ASIDE|ARTICLE)$/i .test(block.tagName)) setTimeout($.proxy(function() {
								var blockElem = this.getBlock();
								(blockElem.tagName === 'DIV' || blockElem.tagName === 'P') && !$(blockElem).hasClass('redactor_editor') && this.replaceLineBreak(blockElem);
							}, this), 1);
							else {
								this.insertLineBreak(), e.preventDefault();
								return;
							}
						if (block.tagName == 'BLOCKQUOTE' || block.tagName == 'FIGCAPTION') {
							this.insertLineBreak(), e.preventDefault();
							return;
						}
					}
				} else key === this.keyCode.ENTER && (e.ctrlKey || e.shiftKey) && (this.bufferSet(), e.preventDefault(), this.insertLineBreak()); if (key === this.keyCode.TAB && this.opts.shortcuts) {
					if (!this.opts.tabFocus) return !0;
					if (this.isEmpty(this.get())) return !0;
					if (e.preventDefault(), pre === !0 && !e.shiftKey) return this.bufferSet(), this.insertNode(document.createTextNode('	')), this.sync(), !1;
					else e.shiftKey ? this.indentingOutdent() : this.indentingIndent();
					return !1;
				}
				if (key === this.keyCode.BACKSPACE && typeof current.nodeValue !== 'undefined' && current.nodeValue !== null) {
					var value = $.trim(current.nodeValue.replace(/[^\u0000-~]/g, ''));
					current.remove && current.nodeType === 3 && current.nodeValue.charCodeAt(0) == 8203 && value == '' && current.remove();
				}
			}, this)), this['$editor'].on('keyup.redactor', $.proxy(function(e) {
				var key = e.which;
				var parent = this.getParent();
				var current = this.getCurrent();
				if (!this.opts.linebreaks && current.nodeType == 3 && (parent == 0 || parent.tagName == 'BODY')) {
					var node = $('<p>').append($(current).clone());
					$(current).replaceWith(node);
					var next = $(node).next();
					next[0].tagName == 'BR' && next.remove(), this.selectionEnd(node);
				}
				if (this.opts.convertLinks && key === this.keyCode.ENTER && this.formatLinkify(this.opts.linkProtocol),
					this.opts.linebreaks === !1 && (key === this.keyCode.DELETE || key === this.keyCode.BACKSPACE)) return this.formatEmpty(e);
				this.callback('keyup', e), this.sync();
			}, this)), $.isFunction(this.opts.focusCallback) && this['$editor'].on('focus.redactor', $.proxy(this.opts.focusCallback, this)), $.isFunction(this.opts.blurCallback) && this['$editor'].on('blur.redactor', $.proxy(this.opts.blurCallback, this));
		},
		buildPlugins: function() {
			if (!this.opts.plugins) return;
			$.each(this.opts.plugins, $.proxy(function(i, s) {
				RedactorPlugins[s] && ($.extend(this, RedactorPlugins[s]), $.isFunction(RedactorPlugins[s].init) && this.init());
			}, this));
		},
		iframeStart: function() {
			this.iframeCreate(), this.opts.textareamode ? this.iframeAppend(this.$source) : (this['$sourceOld'] = this['$source'].hide(), this['$source'] = this.buildCodearea(this.$sourceOld), this.iframeAppend(this.$sourceOld));
		},
		iframeAppend: function(el) {
			this['$source'].attr('dir', this.opts.direction).hide(), this['$box'].insertAfter(el).append(this.$frame).append(this.$source);
		},
		iframeCreate: function() {
			this['$frame'] = $('<iframe style="width: 100%;" frameborder="0" />').one('load', $.proxy(function() {
				if (this.opts.fullpage) {
					this.iframePage(), this.content === '' && (this.content = this.opts.invisibleSpace), this['$frame'].contents()[0].write(this.content), this['$frame'].contents()[0].close();
					var timer = setInterval($.proxy(function() {
						this['$frame'].contents().find('body').html() && (clearInterval(timer), this.iframeLoad());
					}, this), 0);
				} else this.iframeLoad();
			}, this));
		},
		iframeDoc: function() {
			return this['$frame'][0].contentWindow.document;
		},
		iframePage: function() {
			var doc = this.iframeDoc();
			return doc.documentElement && doc.removeChild(doc.documentElement), doc;
		},
		iframeAddCss: function(css) {
			css = css || this.opts.css, this.isString(css) && this['$frame'].contents().find('head').append('<link rel="stylesheet" href="' + css + '" />'), $.isArray(css) && $.each(css, $.proxy(function(i, url) {
				this.iframeAddCss(url);
			}, this));
		},
		iframeLoad: function() {
			this['$editor'] = this['$frame'].contents().find('body').attr({
				contenteditable: !0,
				dir: this.opts.direction
			}), this['$editor'][0] && (this.document = this['$editor'][0].ownerDocument, this.window = this.document.defaultView || window), this.iframeAddCss(), this.opts.fullpage ? this.setFullpageOnInit(this['$editor'].html()) : this.set(this.content), this.buildOptions(), this.buildAfter();
		},
		placeholderStart: function(html) {
			return this.isEmpty(html) && (this['$element'].attr('placeholder') && (this.opts.placeholder = this['$element'].attr('placeholder')), this.opts.placeholder === '' && (this.opts.placeholder = !1),
				this.opts.placeholder !== !1) ? (this.opts.focus = !1, this['$editor'].one('focus.redactor_placeholder', $.proxy(this.placeholderFocus, this)), $('<span class="redactor_placeholder" data-redactor="verified">').attr('contenteditable', !1).text(this.opts.placeholder)) : !1;
		},
		placeholderFocus: function() {
			this['$editor'].find('span.redactor_placeholder').remove();
			var html = '';
			this.opts.linebreaks === !1 && (html = this.opts.emptyHtml), this['$editor'].off('focus.redactor_placeholder'), this['$editor'].html(html), this.opts.linebreaks === !1 && this.selectionStart(this['$editor'].children()[0]), this.sync();
		},
		placeholderRemove: function() {
			this.opts.placeholder = !1, this['$editor'].find('span.redactor_placeholder').remove(), this['$editor'].off('focus.redactor_placeholder');
		},
		placeholderRemoveFromCode: function(html) {
			return html.replace(/<span class="redactor_placeholder"(.*?)>(.*?)<\/span>/i, '');
		},
		shortcuts: function(e, key) {
			if (!this.opts.shortcuts) return;
			e.altKey ? key === 48 ? this.shortcutsLoadFormat(e, 'p') : key === 49 ? this.shortcutsLoadFormat(e, 'h1') : key === 50 ? this.shortcutsLoadFormat(e, 'h2') : key === 51 ? this.shortcutsLoadFormat(e, 'h3') : key === 52 ? this.shortcutsLoadFormat(e, 'h4') : key === 53 ? this.shortcutsLoadFormat(e, 'h5') : key === 54 && this.shortcutsLoadFormat(e, 'h6') : key === 77 ? this.shortcutsLoad(e, 'removeFormat') : key === 66 ? this.shortcutsLoad(e, 'bold') : key === 73 ? this.shortcutsLoad(e, 'italic') : key === 74 ? this.shortcutsLoad(e, 'insertunorderedlist') : key === 75 ? this.shortcutsLoad(e, 'insertorderedlist') : key === 76 ? this.shortcutsLoad(e, 'superscript') : key === 72 && this.shortcutsLoad(e, 'subscript');
		},
		shortcutsLoad: function(e, cmd) {
			e.preventDefault(), this.execCommand(cmd, !1);
		},
		shortcutsLoadFormat: function(e, cmd) {
			e.preventDefault(), this.formatBlocks(cmd);
		},
		focus: function() {
			this.browser('opera') ? this['$editor'].focus() : this.window.setTimeout($.proxy(this.focusSet, this, !0), 1);
		},
		focusEnd: function() {
			this.focusSet();
		},
		focusSet: function(collapse) {
			this['$editor'].focus();
			var range = this.getRange();
			range.selectNodeContents(this['$editor'][0]), range.collapse(collapse || !1);
			var sel = this.getSelection();
			sel.removeAllRanges(), sel.addRange(range);
		},
		toggle: function(direct) {
			var html;
			if (this.opts.visual) {
				direct !== !1 && this.selectionSave();
				var height = null;
				this.opts.iframe ? (height = this['$frame'].height(), this.opts.fullpage && this['$editor'].removeAttr('contenteditable'), this['$frame'].hide()) : (height = this['$editor'].innerHeight(), this['$editor'].hide()), html = this['$source'].val(), this.modified = html, this['$source'].height(height).show().focus(), this['$source'].on('keydown.redactor-textarea', function(e) {
					if (e.keyCode === 9) {
						var $el = $(this);
						var start = $el.get(0).selectionStart;
						return $el.val($el.val().substring(0, start) + '	' + $el.val().substring($el.get(0).selectionEnd)), $el.get(0).selectionStart = $el.get(0).selectionEnd = start + 1, !1;
					}
				}),
				this.buttonInactiveVisual(), this.buttonActive('html'), this.opts.visual = !1;
			} else html = this['$source'].hide().val(), typeof this.modified !== 'undefined' && (this.modified = this.cleanRemoveSpaces(this.modified, !1) !== this.cleanRemoveSpaces(html, !1)), this.modified && (this.opts.fullpage && html === '' ? this.setFullpageOnInit(html) : (this.set(html), this.opts.fullpage && this.buildBindKeyboard())), this.opts.iframe ? this['$frame'].show() : this['$editor'].show(), this.opts.fullpage && this['$editor'].attr('contenteditable', !0), this['$source'].off('keydown.redactor-textarea'), this['$editor'].focus(), this.selectionRestore(), this.observeStart(), this.buttonActiveVisual(), this.buttonInactive('html'), this.opts.visual = !0;
		},
		autosave: function() {
			var savedHtml = !1;
			this.autosaveInterval = setInterval($.proxy(function() {
				var html = this.get();
				savedHtml !== html && $.ajax({
					url: this.opts.autosave,
					type: 'post',
					data: this['$source'].attr('name') + '=' + escape(encodeURIComponent(html)),
					success: $.proxy(function(data) {
						this.callback('autosave', !1, data), savedHtml = html;
					}, this)
				});
			}, this), this.opts.autosaveInterval * 1000);
		},
		toolbarBuild: function() {
			if (this.opts.air) this.opts.buttons = this.opts.airButtons;
			else if (!this.opts.buttonSource) {
				var index = this.opts.buttons.indexOf('html'),
					next = this.opts.buttons[index + 1];
				this.opts.buttons.splice(index, 1), next === '|' && this.opts.buttons.splice(index, 1);
			}
			if ($.extend(this.opts.toolbar, this.opts.buttonsCustom), $.each(this.opts.buttonsAdd, $.proxy(function(i, s) {
				this.opts.buttons.push(s);
			}, this)), this.opts.toolbar && $.each(this.opts.toolbar.formatting.dropdown, $.proxy(function(i, s) {
				$.inArray(i, this.opts.formattingTags) == '-1' && delete this.opts.toolbar.formatting.dropdown[i];
			}, this)), this.opts.buttons.length === 0) return !1;
			if (this.airEnable(), this['$toolbar'] = $('<ul>').addClass('redactor_toolbar').attr('id', 'redactor_toolbar_' + this.uuid), this.opts.air ? (this['$air'] = $('<div class="redactor_air">').attr('id', 'redactor_air_' + this.uuid).hide(), this['$air'].append(this.$toolbar), $('body').append(this.$air)) : this.opts.toolbarExternal ? $(this.opts.toolbarExternal).html(this.$toolbar) : this['$box'].prepend(this.$toolbar), $.each(this.opts.buttons, $.proxy(function(i, btnName) {
				if (btnName === '|') this['$toolbar'].append($(this.opts.buttonSeparator));
				else if (this.opts.toolbar[btnName]) {
					var btnObject = this.opts.toolbar[btnName];
					if (this.opts.fileUpload === !1 && btnName === 'file') return !0;
					this['$toolbar'].append($('<li>').append(this.buttonBuild(btnName, btnObject)));
				}
			}, this)), this['$toolbar'].find('a').attr('tabindex', '-1'), this.opts.toolbarFixed && (this.toolbarObserveScroll(), $(document).on('scroll.redactor', $.proxy(this.toolbarObserveScroll, this))), this.opts.activeButtons) {
				var buttonActiveObserver = $.proxy(this.buttonActiveObserver, this);
				this['$editor'].on('mouseup.redactor keyup.redactor', buttonActiveObserver);
			}
		},
		toolbarObserveScroll: function() {
			var scrollTop = $(this.document).scrollTop();
			var boxTop = this['$box'].offset().top;
			var left = 0;
			var end = boxTop + this['$box'].height() + 40;
			if (scrollTop > boxTop) {
				var width = '100%';
				this.opts.toolbarFixedBox && (left = this['$box'].offset().left, width = this['$box'].innerWidth(), this['$toolbar'].addClass('toolbar_fixed_box')), this.toolbarFixed = !0, this['$toolbar'].css({
					position: 'fixed',
					width: width,
					zIndex: 1005,
					top: this.opts.toolbarFixedTopOffset + 'px',
					left: left
				}), scrollTop < end ? this['$toolbar'].css('visibility', 'visible') : this['$toolbar'].css('visibility', 'hidden');
			} else this.toolbarFixed = !1, this['$toolbar'].css({
				position: 'relative',
				width: 'auto',
				top: 0,
				left: left
			}), this.opts.toolbarFixedBox && this['$toolbar'].removeClass('toolbar_fixed_box');
		},
		airEnable: function() {
			if (!this.opts.air) return;
			this['$editor'].on('mouseup.redactor keyup.redactor', this, $.proxy(function(e) {
				var text = this.getSelectionText();
				if (e.type === 'mouseup' && text != '' && this.airShow(e), e.type === 'keyup' && e.shiftKey && text != '') {
					var $focusElem = $(this.getElement(this.getSelection().focusNode)),
						offset = $focusElem.offset();
					offset.height = $focusElem.height(), this.airShow(offset, !0);
				}
			}, this));
		},
		airShow: function(e, keyboard) {
			if (!this.opts.air) return;
			var left, top;
			if ($('.redactor_air').hide(), keyboard) left = e.left, top = e.top + e.height + 14, this.opts.iframe && (top += this['$box'].position().top - $(this.document).scrollTop(), left += this['$box'].position().left);
			else {
				var width = this['$air'].innerWidth();
				left = e.clientX, $(this.document).width() < left + width && (left -= width), top = e.clientY + 14, this.opts.iframe ? (top += this['$box'].position().top, left += this['$box'].position().left) : top += $(this.document).scrollTop();
			}
			this['$air'].css({
				left: left + 'px',
				top: top + 'px'
			}).show(), this.airBindHide();
		},
		airBindHide: function() {
			if (!this.opts.air) return;
			var hideHandler = $.proxy(function(doc) {
				$(doc).on('mousedown.redactor', $.proxy(function(e) {
					$(e.target).closest(this.$toolbar).length === 0 && (this['$air'].fadeOut(100), this.selectionRemove(), $(doc).off(e));
				}, this)).on('keydown.redactor',
					$.proxy(function(e) {
						e.which === this.keyCode.ESC && this.getSelection().collapseToStart(), this['$air'].fadeOut(100), $(doc).off(e);
					}, this));
			}, this);
			hideHandler(document), this.opts.iframe && hideHandler(this.document);
		},
		airBindMousemoveHide: function() {
			if (!this.opts.air) return;
			var hideHandler = $.proxy(function(doc) {
				$(doc).on('mousemove.redactor', $.proxy(function(e) {
					$(e.target).closest(this.$toolbar).length === 0 && (this['$air'].fadeOut(100), $(doc).off(e));
				}, this));
			}, this);
			hideHandler(document), this.opts.iframe && hideHandler(this.document);
		},
		pickerBuild: function($dropdown, key) {
			$dropdown.width(210);
			var rule = 'color';
			key === 'backcolor' && (rule = 'background-color');
			var len = this.opts.colors.length;
			var _self = this;
			for (var i = 0; i < len; i++) {
				var color = this.opts.colors[i];
				var $swatch = $('<a rel="' + color + '" href="javascript:;" class="redactor_color_link"></a>').css({
					backgroundColor: color
				});
				$dropdown.append($swatch), $swatch.on('click', function() {
					var type = $(this).attr('rel');
					key === 'backcolor' && (type = $(this).css('background-color')), _self.pickerSet(rule, type);
				});
			}
			var $elNone = $('<a href="javascript:;" class="redactor_color_none"></a>').html(this.opts.curLang.none).on('click', function() {
				_self.pickerSet(rule, !1);
			});
			$dropdown.append($elNone);
		},
		pickerSet: function(rule, type) {
			this.bufferSet(), this['$editor'].focus(), this.inlineRemoveStyle(rule), type !== !1 && this.inlineSetStyle(rule, type), this.opts.air && this['$air'].fadeOut(100), this.sync();
		},
		dropdownBuild: function($dropdown, dropdownObject) {
			$.each(dropdownObject, $.proxy(function(btnName, btnObject) {
				btnObject.className || (btnObject.className = '');
				var $item;
				btnObject.name === 'separator' ? $item = $('<a class="redactor_separator_drop">') : ($item = $('<a href="javascript:;" class="' + btnObject.className + ' redactor_dropdown_' + btnName + '">' + btnObject.title + '</a>'), $item.on('click', $.proxy(function(e) {
					e.preventDefault && e.preventDefault(), this.browser('msie') && (e.returnValue = !1), btnObject.callback && btnObject.callback.call(this, btnName, $item, btnObject), btnObject.exec && this.execCommand(btnObject.exec, btnName), btnObject.func && this[btnObject.func](btnName), this.buttonActiveObserver(), this.opts.air && this['$air'].fadeOut(100);
				}, this))), $dropdown.append($item);
			}, this));
		},
		dropdownShow: function(e, $dropdown, key) {
			if (!this.opts.visual) return e.preventDefault(), !1;
			if (this.buttonGet(key).hasClass('dropact')) this.dropdownHideAll();
			else {
				this.dropdownHideAll(), this.buttonActive(key), this.buttonGet(key).addClass('dropact');
				var keyPosition = this.buttonGet(key).position(),
					left = keyPosition.left + 'px',
					btnHeight = 29;
				this.opts.air ? $dropdown.css({
					position: 'absolute',
					left: left,
					top: btnHeight + 'px'
				}).show() : this.opts.toolbarFixed && this.toolbarFixed ? $dropdown.css({
					position: 'fixed',
					left: left,
					top: btnHeight + 'px'
				}).show() : $dropdown.css({
					position: 'absolute',
					left: left,
					top: keyPosition.top + btnHeight + 'px'
				}).show();
			}
			var hdlHideDropDown = $.proxy(function(e) {
				this.dropdownHide(e, $dropdown);
			}, this);
			$(document).one('click', hdlHideDropDown), this['$editor'].one('click', hdlHideDropDown), e.stopPropagation();
		},
		dropdownHideAll: function() {
			this['$toolbar'].find('a.dropact').removeClass('redactor_act').removeClass('dropact'), $('.redactor_dropdown').hide();
		},
		dropdownHide: function(e, $dropdown) {
			$(e.target).hasClass('dropact') || ($dropdown.removeClass('dropact'), this.dropdownHideAll());
		},
		buttonBuild: function(btnName, btnObject) {
			var $button = $('<a href="javascript:;" title="' + btnObject.title + '" class="redactor_btn redactor_btn_' + btnName + '"></a>');
			var $dropdown = $('<div class="redactor_dropdown" style="display: none;">');
			return $button.on('click', $.proxy(function(e) {
				if (e.preventDefault && e.preventDefault(), this.browser('msie') && (e.returnValue = !1), !this.opts.visual && btnName !== 'html') return !1;
				btnObject.exec ? (this.execCommand(btnObject.exec, btnName), this.airBindMousemoveHide()) : btnObject.func && btnObject.func !== 'show' ? (this[btnObject.func](btnName), this.airBindMousemoveHide()) : btnObject.callback ? (btnObject.callback.call(this, btnName, $button, btnObject), this.airBindMousemoveHide()) : (btnName === 'backcolor' || btnName === 'fontcolor' || btnObject.dropdown) && this.dropdownShow(e, $dropdown, btnName), this.buttonActiveObserver();
			}, this)), (btnName === 'backcolor' || btnName === 'fontcolor' || btnObject.dropdown) && ($dropdown.appendTo(this.$toolbar), btnName === 'backcolor' || btnName === 'fontcolor' ? this.pickerBuild($dropdown, btnName) : this.dropdownBuild($dropdown, btnObject.dropdown)), $button;
		},
		buttonGet: function(key) {
			return this.opts.toolbar ? $(this['$toolbar'].find('a.redactor_btn_' + key)) : !1;
		},
		buttonActive: function(key) {
			this.buttonGet(key).addClass('redactor_act');
		},
		buttonInactive: function(key) {
			this.buttonGet(key).removeClass('redactor_act');
		},
		buttonInactiveAll: function() {
			$.each(this.opts.activeButtons, $.proxy(function(i, s) {
				this.buttonInactive(s);
			}, this));
		},
		buttonActiveVisual: function() {
			this['$toolbar'].find('a.redactor_btn').not('a.redactor_btn_html').removeClass('redactor_button_disabled');
		},
		buttonInactiveVisual: function() {
			this['$toolbar'].find('a.redactor_btn').not('a.redactor_btn_html').addClass('redactor_button_disabled');
		},
		buttonChangeIcon: function(key, classname) {
			this.buttonGet(key).addClass('redactor_btn_' + classname);
		},
		buttonRemoveIcon: function(key, classname) {
			this.buttonGet(key).removeClass('redactor_btn_' + classname);
		},
		buttonAddSeparator: function() {
			this['$toolbar'].append($(this.opts.buttonSeparator));
		},
		buttonAddSeparatorAfter: function(key) {
			this.buttonGet(key).parent().after($(this.opts.buttonSeparator));
		},
		buttonAddSeparatorBefore: function(key) {
			this.buttonGet(key).parent().before($(this.opts.buttonSeparator));
		},
		buttonRemoveSeparatorAfter: function(key) {
			this.buttonGet(key).parent().next().remove();
		},
		buttonRemoveSeparatorBefore: function(key) {
			this.buttonGet(key).parent().prev().remove();
		},
		buttonSetRight: function(key) {
			if (!this.opts.toolbar) return;
			this.buttonGet(key).parent().addClass('redactor_btn_right');
		},
		buttonSetLeft: function(key) {
			if (!this.opts.toolbar) return;
			this.buttonGet(key).parent().removeClass('redactor_btn_right');
		},
		buttonAdd: function(key, title, callback, dropdown) {
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, {
				title: title,
				callback: callback,
				dropdown: dropdown
			});
			this['$toolbar'].append($('<li>').append(btn));
		},
		buttonAddFirst: function(key, title, callback, dropdown) {
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, {
				title: title,
				callback: callback,
				dropdown: dropdown
			});
			this['$toolbar'].prepend($('<li>').append(btn));
		},
		buttonAddAfter: function(afterkey, key, title, callback, dropdown) {
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, {
				title: title,
				callback: callback,
				dropdown: dropdown
			});
			var $btn = this.buttonGet(afterkey);
			$btn.parent().after($('<li>').append(btn));
		},
		buttonAddBefore: function(beforekey, key, title, callback, dropdown) {
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, {
				title: title,
				callback: callback,
				dropdown: dropdown
			});
			var $btn = this.buttonGet(beforekey);
			$btn.parent().before($('<li>').append(btn));
		},
		buttonRemove: function(key, separator) {
			var $btn = this.buttonGet(key);
			separator && $btn.parent().next().remove(), $btn.parent().removeClass('redactor_btn_right'), $btn.remove();
		},
		buttonActiveObserver: function() {
			var parent = this.getParent();
			this.buttonInactiveAll(), parent && parent.tagName === 'A' ? this['$toolbar'].find('a.redactor_dropdown_link').text(this.opts.curLang.link_edit) : this['$toolbar'].find('a.redactor_dropdown_link').text(this.opts.curLang.link_insert), this.opts.activeButtonsAdd && ($.each(this.opts.activeButtonsAdd, $.proxy(function(i, s) {
				this.opts.activeButtons.push(s);
			}, this)), $.extend(this.opts.activeButtonsStates, this.opts.activeButtonsAdd)), $.each(this.opts.activeButtonsStates, $.proxy(function(key, value) {
				$(parent).closest(key, this['$editor'].get()[0]).length != 0 && this.buttonActive(value);
			}, this));
			var $parent = $(parent).closest(this.opts.alignmentTags.toString().toLowerCase(), this['$editor'][0]);
			if ($parent.length) {
				var align = $parent.css('text-align');
				switch (align) {
					case 'right':
						this.buttonActive('alignright');
						break;
					case 'center':
						this.buttonActive('aligncenter');
						break;
					case 'justify':
						this.buttonActive('justify');
						break;
					default:
						this.buttonActive('alignleft');
						break;
				}
			}
		},
		exec: function(cmd, param, sync) {
			cmd === 'formatblock' && this.browser('msie') && (param = '<' + param + '>'), cmd === 'inserthtml' && this.browser('msie') ? (this['$editor'].focus(), this.document.selection.createRange().pasteHTML(param)) : this.document.execCommand(cmd, !1, param), sync !== !1 && this.sync(), this.callback('execCommand', cmd, param);
		},
		execCommand: function(cmd, param, sync) {
			if (!this.opts.visual) return this['$source'].focus(), !1;
			if (cmd === 'inserthtml') {
				this.insertHtml(param, sync), this.callback('execCommand', cmd, param);
				return;
			}
			if (this.currentOrParentIs('PRE') && !this.opts.formattingPre) return !1;
			if (cmd === 'insertunorderedlist' || cmd === 'insertorderedlist') {
				var parent = this.getParent();
				var $list = $(parent).closest('ol, ul');
				var remove = !1;
				if ($list.length) {
					remove = !0;
					var listTag = $list[0].tagName;
					(cmd === 'insertunorderedlist' && listTag === 'OL' || cmd === 'insertorderedlist' && listTag === 'UL') && (remove = !1);
				}
				if (remove) {
					this.selectionSave();
					var nodes = this.getNodes();
					var elems = this.getBlocks(nodes);
					typeof nodes[0] != 'undefined' && nodes.length > 1 && nodes[0].nodeType == 3 && elems.unshift(this.getBlock());
					var data = '',
						replaced = '';
					$.each(elems, $.proxy(function(i, s) {
						if (s.tagName == 'LI') {
							var $s = $(s);
							var cloned = $s.clone();
							cloned.find('ul', 'ol').remove(), this.opts.linebreaks === !1 ? data += this.outerHtml($('<p>').append(cloned.contents())) : data += cloned.html() + '<br>', i == 0 ? ($s.addClass('redactor-replaced').empty(), replaced = this.outerHtml($s)) : $s.remove();
						}
					}, this)), html = this['$editor'].html().replace(replaced, '</' + listTag + '>' + data + '<' + listTag + '>'), this['$editor'].html(html), this['$editor'].find(listTag + ':empty').remove(), this.selectionRestore();
				} else {
					this.selectionSave(), this.document.execCommand(cmd);
					var parent = this.getParent();
					var $list = $(parent).closest('ol, ul');
					if ($list.length) {
						(this.browser('msie') || this.browser('mozilla')) && parent.tagName !== 'LI' && $(parent).replaceWith($(parent).html());
						var $listParent = $list.parent();
						this.isParentRedactor($listParent) && this.nodeTestBlocks($listParent[0]) && $listParent.replaceWith($listParent.contents());
					}
					this.browser('mozilla') && this['$editor'].focus(), this.selectionRestore();
				}
				this.sync(), this.callback('execCommand', cmd, param);
				return;
			}
			if (cmd === 'unlink') {
				var parent = this.getParent();
				if ($(parent)[0].tagName === 'A') {
					$(parent).replaceWith($(parent).text()), this.sync(), this.callback('execCommand', cmd, param);
					return;
				}
			}
			this.exec(cmd, param, sync), cmd === 'inserthorizontalrule' && this['$editor'].find('hr').removeAttr('id');
		},
		indentingIndent: function() {
			this.indentingStart('indent');
		},
		indentingOutdent: function() {
			this.indentingStart('outdent');
		},
		indentingStart: function(cmd) {
			if (cmd === 'indent') {
				var block = this.getBlock();
				if (block && block.tagName == 'LI') {
					this.selectionSave();
					var parent = this.getParent();
					var $list = $(parent).closest('ol, ul');
					var listTag = $list[0].tagName;
					var elems = this.getBlocks();
					$.each(elems, function(i, s) {
						if (s.tagName == 'LI') {
							var $prev = $(s).prev();
							if ($prev.size() != 0 && $prev[0].tagName == 'LI') {
								var $childList = $prev.children('ul, ol');
								$childList.size() == 0 ? $prev.append($('<' + listTag + '>').append(s)) : $childList.append(s);
							}
						}
					}), this.selectionRestore();
				}
			} else {
				this.selectionSave();
				var block = this.getBlock();
				if (block && block.tagName == 'LI') {
					var elems = this.getBlocks();
					var index = 0;
					this.insideOutdent(block, index, elems);
				}
				this.selectionRestore();
			}
		},
		insideOutdent: function(li, index, elems) {
			if (li && li.tagName == 'LI') {
				var $parent = $(li).parent().parent();
				$parent.size() != 0 && $parent[0].tagName == 'LI' ? $parent.after(li) : typeof elems[index] != 'undefined' ? (li = elems[index], index++, this.insideOutdent(li, index, elems)) : this.execCommand('insertunorderedlist');
			}
		},
		cleanEmpty: function(html) {
			var ph = this.placeholderStart(html);
			return ph !== !1 ? ph : (this.opts.linebreaks === !1 && (html === '' ? html = this.opts.emptyHtml : html.search(/^<hr\s?\/?>$/gi) !== -1 && (html = '<hr>' + this.opts.emptyHtml)), html);
		},
		cleanConverters: function(html) {
			return this.opts.convertDivs && (html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '<p$1>$2</p>')), this.opts.paragraphy && (html = this.cleanParagraphy(html)), html;
		},
		cleanConvertProtected: function(html) {
			return html = html.replace(/<script(.*?)>([\w\W]*?)<\/script>/gi, '<title type="text/javascript" style="display: none;" class="redactor-script-tag"$1>$2</title>'), html = html.replace(/<style(.*?)>([\w\W]*?)<\/style>/gi, '<section$1 style="display: none;" rel="redactor-style-tag">$2</section>'), html = html.replace(/<form(.*?)>([\w\W]*?)<\/form>/gi, '<section$1 rel="redactor-form-tag">$2</section>'), this.opts.phpTags ? html = html.replace(/<\?php([\w\W]*?)\?>/gi, '<section style="display: none;" rel="redactor-php-tag">$1</section>') : html = html.replace(/<\?php([\w\W]*?)\?>/gi, ''), html;
		},
		cleanReConvertProtected: function(html) {
			return html = html.replace(/<title type="text\/javascript" style="display: none;" class="redactor-script-tag"(.*?)>([\w\W]*?)<\/title>/gi, '<script$1 type="text/javascript">$2</script>'), html = html.replace(/<section(.*?) style="display: none;" rel="redactor-style-tag">([\w\W]*?)<\/section>/gi, '<style$1>$2</style>'), html = html.replace(/<section(.*?)rel="redactor-form-tag"(.*?)>([\w\W]*?)<\/section>/gi, '<form$1$2>$3</form>'), this.opts.phpTags && (html = html.replace(/<section style="display: none;" rel="redactor-php-tag">([\w\W]*?)<\/section>/gi, '<?php\n$1\n?>')), html;
		},
		cleanRemoveSpaces: function(html, buffer) {
			if (buffer !== !1) {
				var buffer = [],
					z = 0,
					code;
				code = html.match(/<(pre|style|script|title)(.*?)>([\w\W]*?)<\/(pre|style|script|title)>/gi), code !== null && $.each(code, function(i, s) {
					z = i, html = html.replace(s, 'buffer_' + z), buffer.push(s);
				}), this.opts.phpTags && (code = html.match(/<\?php([\w\W]*?)\?>/gi), code !== null && $.each(code, function(i, s) {
					z += i, html = html.replace(s, 'buffer_' + i), buffer.push(s);
				}));
			}
			return html = html.replace(/\n/g, ' '), html = html.replace(/[\t]*/g, ''), html = html.replace(/\n\s*\n/g, '\n'), html = html.replace(/^[\s\n]*/g, ' '), html = html.replace(/[\s\n]*$/g, ' '), html = html.replace(/>\s{2,}</g, '><'), buffer !== !1 && (html = this.cleanReplacer(buffer, html)), html = html.replace(/\n\n/g, '\n'), html;
		},
		cleanReplacer: function(arr, html) {
			return arr && $.each(arr, function(i, s) {
				html = html.replace('buffer_' + i, s);
			}), html;
		},
		cleanRemoveEmptyTags: function(html) {
			html = html.replace(/<span>([\w\W]*?)<\/span>/gi, '$1'), html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');
			var etags = ['<pre></pre>', '<blockquote>\s*</blockquote>', '<dd></dd>', '<dt></dt>', '<em>\s*</em>', '<ul></ul>', '<ol></ol>', '<li></li>', '<table></table>', '<tr></tr>', '<span>\s*<span>', '<span>&nbsp;<span>', '<b>\s*</b>', '<b>&nbsp;</b>', '<p>\s*</p>', '<p></p>', '<p>&nbsp;</p>', '<p>\s*<br>\s*</p>', '<div>\s*</div>', '<div>\s*<br>\s*</div>'];
			var len = etags.length;
			for (var i = 0; i < len; ++i) html = html.replace(new RegExp(etags[i], 'gi'), '');
			return html;
		},
		cleanParagraphy: function(html) {
			function R(str, mod, r) {
				return html.replace(new RegExp(str, mod), r);
			}
			if (html = $.trim(html), this.opts.linebreaks === !0) return html;
			if (html === '' || html === '<p></p>') return this.opts.emptyHtml;
			html += '\n';
			var safes = [];
			var z = 0;
			html.search(/<(table|div|pre|object)/gi) !== -1 && $.each(html.match(/<(table|div|pre|object)(.*?)>([\w\W]*?)<\/(table|div|pre|object)>/gi), function(i, s) {
				z++, safes[z] = s, html = html.replace(s, '{replace' + z + '}\n');
			}), this.opts.phpTags && html.search(/<section(.*?)rel="redactor-php-tag">/gi) !== -1 && $.each(html.match(/<section(.*?)rel="redactor-php-tag">([\w\W]*?)<\/section>/gi), function(i, s) {
				z++, safes[z] = s, html = html.replace(s, '{replace' + z + '}\n');
			}), html = html.replace(/<\!\-\-([\w\W]*?)\-\->/gi, '<comment>$1</comment>'), html = html.replace(/<br \/>\s*<br \/>/gi, '\n\n');
			var blocks = '(comment|html|body|head|title|meta|style|script|link|iframe|table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|option|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)';
			html = R('(<' + blocks + '[^>]*>)', 'gi', '\n$1'), html = R('(</' + blocks + '>)', 'gi', '$1\n\n'), html = R('\n', 'g', '\n'), html = R('\n', 'g', '\n'), html = R('/\n\n+/', 'g', '\n\n');
			var htmls = html.split(new RegExp('\ns*\n', 'g'), -1);
			html = '';
			for (var i in htmls) htmls.hasOwnProperty(i) && (htmls[i].search('{replace') == -1 ? html += '<p>' + htmls[i].replace(/^\n+|\n+$/g, '') + '</p>' : html += htmls[i]);
			return html.search(/<blockquote/gi) !== -1 && $.each(html.match(/<blockquote(.*?)>([\w\W]*?)<\/blockquote>/gi), function(i, s) {
				var str = '';
				str = s.replace('<p>', ''), str = str.replace('</p>', '<br>'), html = html.replace(s, str);
			}), html = R('<p>s*</p>', 'gi', ''), html = R('<p>([^<]+)</(div|address|form)>', 'gi', '<p>$1</p></$2>'), html = R('<p>s*(</?' + blocks + '[^>]*>)s*</p>', 'gi', '$1'), html = R('<p>(<li.+?)</p>', 'gi', '$1'), html = R('<p>s*(</?' + blocks + '[^>]*>)', 'gi', '$1'), html = R('(</?' + blocks + '[^>]*>)s*</p>', 'gi', '$1'), html = R('(</?' + blocks + '[^>]*>)s*<br />', 'gi', '$1'), html = R('<br />(s*</?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)', 'gi', '$1'), html = R('\n</p>', 'gi', '</p>'), html = R('</li><p>', 'gi', '</li>'), html = R('</ul><p>(.*?)</li>', 'gi', '</ul></li>'), html = R('</ol><p>', 'gi', '</ol>'), html = R('<p>	?\n?<p>', 'gi', '<p>'), html = R('</dt><p>', 'gi', '</dt>'), html = R('</dd><p>', 'gi', '</dd>'), html = R('<br></p></blockquote>', 'gi', '</blockquote>'), $.each(safes, function(i, s) {
				html = html.replace('{replace' + i + '}', s);
			}), html = html.replace(/<comment>([\w\W]*?)<\/comment>/gi, '<!--$1-->'), $.trim(html);
		},
		cleanConvertInlineTags: function(html) {
			var boldTag = 'strong';
			this.opts.boldTag === 'b' && (boldTag = 'b');
			var italicTag = 'em';
			return this.opts.italicTag === 'i' && (italicTag = 'i'), html = html.replace(/<span style="font-style: italic;">([\w\W]*?)<\/span>/gi, '<' + italicTag + '>$1</' + italicTag + '>'), html = html.replace(/<span style="font-weight: bold;">([\w\W]*?)<\/span>/gi, '<' + boldTag + '>$1</' + boldTag + '>'), this.opts.boldTag === 'strong' ? html = html.replace(/<b>([\w\W]*?)<\/b>/gi, '<strong>$1</strong>') : html = html.replace(/<strong>([\w\W]*?)<\/strong>/gi, '<b>$1</b>'), this.opts.italicTag === 'em' ? html = html.replace(/<i>([\w\W]*?)<\/i>/gi, '<em>$1</em>') : html = html.replace(/<em>([\w\W]*?)<\/em>/gi, '<i>$1</i>'), html = html.replace(/<strike>([\w\W]*?)<\/strike>/gi, '<del>$1</del>'), /<span(.*?)data-redactor="verified"(.*?)>([\w\W]*?)<\/span>/gi .test(html) || (html = html.replace(/<span(.*?)(?!data-redactor="verified")(.*?)>([\w\W]*?)<\/span>/gi, '<span$1 data-redactor="verified"$2>$3</span>')), html;
		},
		cleanStripTags: function(html) {
			if (html == '' || typeof html == 'undefined') return html;
			var allowed = !1;
			this.opts.allowedTags !== !1 && (allowed = !0);
			var arr = allowed === !0 ? this.opts.allowedTags : this.opts.deniedTags;
			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
			return html = html.replace(tags, function($0, $1) {
				return allowed === !0 ? $.inArray($1.toLowerCase(), arr) > '-1' ? $0 : '' : $.inArray($1.toLowerCase(), arr) > '-1' ? '' : $0;
			}), html = this.cleanConvertInlineTags(html), html;
		},
		cleanSavePreCode: function(html, encode) {
			var pre = html.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/gi);
			return pre !== null && $.each(pre, $.proxy(function(i, s) {
				var arr = s.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/i);
				arr[3] = arr[3].replace(/&nbsp;/g, ' '), encode !== !1 && (arr[3] = this.cleanEncodeEntities(arr[3])), html = html.replace(s, '<' + arr[1] + arr[2] + '>' + arr[3] + '</' + arr[1] + '>');
			}, this)), html;
		},
		cleanEncodeEntities: function(str) {
			return str = String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'), String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		},
		cleanUnverified: function() {
			var $elem = this['$editor'].find('img, a, b, strong, sub, sup, i, em, u, small, strike, del, span, cite');
			$elem.filter('[style*="font-size"][style*="line-height"]').css('font-size', '').css('line-height', ''), $elem.filter('[style*="background-color: transparent;"][style*="line-height"]').css('background-color', '').css('line-height', ''), $elem.filter('[style*="background-color: transparent;"]').css('background-color', ''), $.each($elem, $.proxy(function(i, s) {
				this.removeEmptyAttr(s, 'style');
			}, this)), this['$editor'].find('div[style="text-align: -webkit-auto;"]').contents().unwrap();
		},
		cleanHtml: function(code) {
			var i = 0,
				codeLength = code.length,
				point = 0,
				start = null,
				end = null,
				tag = '',
				out = '',
				cont = '';
			for (this.cleanlevel = 0; i < codeLength; i++) {
				if (point = i, -1 == code.substr(i).indexOf('<')) return out += code.substr(i), this.cleanFinish(out);
				while (point < codeLength && code.charAt(point) != '<') point++;
				i != point && (cont = code.substr(i, point - i), cont.match(/^\s{2,}$/g) || ('\n' == out.charAt(out.length - 1) ? out += this.cleanGetTabs() : '\n' == cont.charAt(0) && (out += '\n' + this.cleanGetTabs(), cont = cont.replace(/^\s+/, '')), out += cont), cont.match(/\n/) && (out += '\n' + this.cleanGetTabs())), start = point;
				while (point < codeLength && '>' != code.charAt(point)) point++;
				tag = code.substr(start, point - start), i = point;
				var t;
				if ('!--' == tag.substr(1, 3)) {
					if (!tag.match(/--$/)) {
						while ('-->' != code.substr(point, 3)) point++;
						point += 2, tag = code.substr(start, point - start), i = point;
					}
					'\n' != out.charAt(out.length - 1) && (out += '\n'), out += this.cleanGetTabs(), out += tag + '>\n';
				} else '!' == tag[1] ? out = this.placeTag(tag + '>', out) : '?' == tag[1] ? out += tag + '>\n' : (t = tag.match(/^<(script|style|pre)/i)) ? (t[1] = t[1].toLowerCase(), tag = this.cleanTag(tag), out = this.placeTag(tag, out), end = String(code.substr(i + 1)).toLowerCase().indexOf('</' + t[1]), end && (cont = code.substr(i + 1, end), i += end, out += cont)) : (tag = this.cleanTag(tag), out = this.placeTag(tag, out));
			}
			return this.cleanFinish(out);
		},
		cleanGetTabs: function() {
			var s = '';
			for (var j = 0; j < this.cleanlevel; j++) s += '	';
			return s;
		},
		cleanFinish: function(code) {
			return code = code.replace(/\n\s*\n/g, '\n'), code = code.replace(/^[\s\n]*/, ''), code = code.replace(/[\s\n]*$/, ''), code = code.replace(/<script(.*?)>\n<\/script>/gi,
				'<script$1></script>'), this.cleanlevel = 0, code;
		},
		cleanTag: function(tag) {
			var tagout = '';
			tag = tag.replace(/\n/g, ' '), tag = tag.replace(/\s{2,}/g, ' '), tag = tag.replace(/^\s+|\s+$/g, ' ');
			var suffix = '';
			tag.match(/\/$/) && (suffix = '/', tag = tag.replace(/\/+$/, ''));
			var m;
			while (m = /\s*([^= ]+)(?:=((['"']).*?\3|[^ ]+))?/ .exec(tag)) m[2] ? tagout += m[1].toLowerCase() + '=' + m[2] : m[1] && (tagout += m[1].toLowerCase()), tagout += ' ', tag = tag.substr(m[0].length);
			return tagout.replace(/\s*$/, '') + suffix + '>';
		},
		placeTag: function(tag, out) {
			var nl = tag.match(this.cleannewLevel);
			return (tag.match(this.cleanlineBefore) || nl) && (out = out.replace(/\s*$/, ''), out += '\n'), nl && '/' == tag.charAt(1) && this.cleanlevel--, '\n' == out.charAt(out.length - 1) && (out += this.cleanGetTabs()), nl && '/' != tag.charAt(1) && this.cleanlevel++, out += tag, (tag.match(this.cleanlineAfter) || tag.match(this.cleannewLevel)) && (out = out.replace(/ *$/, ''), out += '\n'), out;
		},
		alignmentLeft: function() {
			this.alignmentSet('', 'JustifyLeft');
		},
		alignmentRight: function() {
			this.alignmentSet('right', 'JustifyRight');
		},
		alignmentCenter: function() {
			this.alignmentSet('center', 'JustifyCenter');
		},
		alignmentJustify: function() {
			this.alignmentSet('justify', 'JustifyFull');
		},
		alignmentSet: function(type, cmd) {
			if (this.bufferSet(), this.oldIE()) return this.document.execCommand(cmd, !1, !1), !0;
			this.selectionSave();
			var elements = this.getBlocks();
			$.each(elements, $.proxy(function(i, elem) {
				var $el = !1;
				$.inArray(elem.tagName, this.opts.alignmentTags) !== -1 ? $el = $(elem) : $el = $(elem).closest(this.opts.alignmentTags.toString().toLowerCase(), this['$editor'][0]), $el && ($el.css('text-align', type), this.removeEmptyAttr($el, 'style'));
			}, this)), this.selectionRestore(), this.sync();
		},
		formatEmpty: function(e) {
			var html = $.trim(this['$editor'].html());
			html = html.replace(/<br\s?\/?>/i, '');
			var thtml = html.replace(/<p>\s?<\/p>/gi, '');
			if (html === '' || thtml === '') {
				e.preventDefault();
				var node = $(this.opts.emptyHtml).get(0);
				this['$editor'].html(node), this.focus();
			}
			this.sync();
		},
		formatBlocks: function(tag) {
			this.bufferSet();
			var nodes = this.getBlocks();
			this.selectionSave(), $.each(nodes, $.proxy(function(i, node) {
				node.tagName !== 'LI' && this.formatBlock(tag, node);
			}, this)), this.selectionRestore(), this.sync();
		},
		formatBlock: function(tag, block) {
			if (block === !1 && (block = this.getBlock()), block === !1) return this.opts.linebreaks === !0 && this.execCommand('formatblock', tag), !0;
			var contents = '';
			if (tag !== 'pre' ? contents = $(block).contents() : (contents = $(block).html(), $.trim(contents) === '' && (contents = '<span id="selection-marker-1"></span>')), block.tagName === 'PRE' && (tag = 'p'), this.opts.linebreaks === !0 && tag === 'p') $(block).replaceWith($('<div>').append(contents).html() + '<br>');
			else {
				var node = $('<' + tag + '>').append(contents);
				$(block).replaceWith(node);
			}
		},
		formatChangeTag: function(fromElement, toTagName, save) {
			save !== !1 && this.selectionSave();
			var newElement = $('<' + toTagName + '/>');
			return $(fromElement).replaceWith(function() {
				return newElement.append($(this).contents());
			}), save !== !1 && this.selectionRestore(), newElement;
		},
		formatQuote: function() {
			if (this.bufferSet(), this.opts.linebreaks === !1) {
				this.selectionSave();
				var blocks = this.getBlocks();
				blocks && $.each(blocks, $.proxy(function(i, s) {
					s.tagName === 'BLOCKQUOTE' ? this.formatBlock('p', s, !1) : s.tagName !== 'LI' && this.formatBlock('blockquote', s, !1);
				}, this)), this.selectionRestore();
			} else {
				var block = this.getBlock();
				if (block.tagName === 'BLOCKQUOTE') this.selectionSave(), $(block).replaceWith($(block).html() + '<br>'), this.selectionRestore();
				else {
					var wrapper = this.selectionWrap('blockquote');
					var html = $(wrapper).html();
					var blocksElemsRemove = ['ul', 'ol', 'table', 'tr', 'tbody', 'thead', 'tfoot', 'dl'];
					$.each(blocksElemsRemove, function(i, s) {
						html = html.replace(new RegExp('<' + s + '(.*?)>', 'gi'), ''), html = html.replace(new RegExp('</' + s + '>', 'gi'), '');
					});
					var blocksElems = this.opts.blockLevelElements;
					blocksElems.push('td'), $.each(blocksElems, function(i, s) {
						html = html.replace(new RegExp('<' + s + '(.*?)>', 'gi'), ''), html = html.replace(new RegExp('</' + s + '>', 'gi'), '<br>');
					}), $(wrapper).html(html), this.selectionElement(wrapper);
					var next = $(wrapper).next();
					next[0].tagName === 'BR' && next.remove();
				}
			}
			this.sync();
		},
		blockRemoveAttr: function(attr, value) {
			var nodes = this.getBlocks();
			$(nodes).removeAttr(attr), this.sync();
		},
		blockSetAttr: function(attr, value) {
			var nodes = this.getBlocks();
			$(nodes).attr(attr, value), this.sync();
		},
		blockRemoveStyle: function(rule) {
			var nodes = this.getBlocks();
			$(nodes).css(rule, ''),
			this.removeEmptyAttr(nodes, 'style'), this.sync();
		},
		blockSetStyle: function(rule, value) {
			var nodes = this.getBlocks();
			$(nodes).css(rule, value), this.sync();
		},
		blockRemoveClass: function(className) {
			var nodes = this.getBlocks();
			$(nodes).removeClass(className), this.removeEmptyAttr(nodes, 'class'), this.sync();
		},
		blockSetClass: function(className) {
			var nodes = this.getBlocks();
			$(nodes).addClass(className), this.sync();
		},
		inlineRemoveClass: function(className) {
			this.selectionSave(), this.inlineEachNodes(function(node) {
				$(node).removeClass(className), this.removeEmptyAttr(node, 'class');
			}), this.selectionRestore(), this.sync();
		},
		inlineSetClass: function(className) {
			var current = this.getCurrent();
			$(current).hasClass(className) || this.inlineMethods('addClass', className);
		},
		inlineRemoveStyle: function(rule) {
			this.selectionSave(), this.inlineEachNodes(function(node) {
				$(node).css(rule, ''), this.removeEmptyAttr(node, 'style');
			}), this.selectionRestore(), this.sync();
		},
		inlineSetStyle: function(rule, value) {
			this.inlineMethods('css', rule, value);
		},
		inlineRemoveAttr: function(attr) {
			this.selectionSave();
			var range = this.getRange(),
				node = this.getElement(),
				nodes = this.getNodes();
			(range.collapsed || range.startContainer === range.endContainer && node) && (nodes = $(node)), $(nodes).removeAttr(attr), this.inlineUnwrapSpan(), this.selectionRestore(), this.sync();
		},
		inlineSetAttr: function(attr, value) {
			this.inlineMethods('attr', attr, value);
		},
		inlineMethods: function(type, attr, value) {
			this.selectionSave();
			var range = this.getRange(),
				el = this.getElement();
			if (range.collapsed || range.startContainer === range.endContainer && el) $(el)[type](attr, value);
			else {
				this.document.execCommand('fontSize', !1, 4);
				var fonts = this['$editor'].find('font');
				$.each(fonts, $.proxy(function(i, s) {
					this.inlineSetMethods(type, s, attr, value);
				}, this));
			}
			this.selectionRestore(), this.sync();
		},
		inlineSetMethods: function(type, s, attr, value) {
			var parent = $(s).parent(),
				el;
			return parent && parent[0].tagName === 'SPAN' ? (el = parent, $(s).replaceWith($(s).html())) : (el = $('<span data-redactor="verified" data-redactor-inlineMethods>').append($(s).contents()), $(s).replaceWith(el)), $(el)[type](attr, value), el;
		},
		inlineEachNodes: function(callback) {
			var range = this.getRange(),
				node = this.getElement(),
				nodes = this.getNodes(),
				collapsed;
			(range.collapsed || range.startContainer === range.endContainer && node) && (nodes = $(node), collapsed = !0), $.each(nodes, $.proxy(function(i, node) {
					if (!collapsed && node.tagName !== 'SPAN')
						if (node.parentNode.tagName === 'SPAN' && !$(node.parentNode).hasClass('redactor_editor')) node = node.parentNode;
						else return;
					callback.call(this, node);
				}, this));
		},
		inlineUnwrapSpan: function() {
			var $spans = this['$editor'].find('span[data-redactor-inlineMethods]');
			$.each($spans, $.proxy(function(i, span) {
				var $span = $(span);
				$span.attr('class') === undefined && $span.attr('style') === undefined && $span.contents().unwrap();
			}, this));
		},
		inlineFormat: function(tag) {
			this.selectionSave(), this.document.execCommand('fontSize', !1, 4);
			var fonts = this['$editor'].find('font');
			var last;
			$.each(fonts, function(i, s) {
				var el = $('<' + tag + '/>').append($(s).contents());
				$(s).replaceWith(el), last = el;
			}), this.selectionRestore(), this.sync();
		},
		inlineRemoveFormat: function(tag) {
			this.selectionSave();
			var utag = tag.toUpperCase();
			var nodes = this.getNodes();
			$.each(nodes, function(i, s) {
				s.tagName === utag && $(s).replaceWith($(s).contents());
			}), this.selectionRestore(), this.sync();
		},
		insertHtml: function(html, sync) {
			var current = this.getCurrent();
			var parent = current.parentNode;
			this['$editor'].focus(), this.bufferSet();
			var $html = $('<div>').append($.parseHTML(html));
			html = $html.html(), html = this.cleanRemoveEmptyTags(html), $html = $('<div>').append($.parseHTML(html));
			var currBlock = this.getBlock();
			if ($html.contents().length == 1) {
				var htmlTagName = $html.contents()[0].tagName;
				(htmlTagName != 'P' && htmlTagName == currBlock.tagName || htmlTagName == 'PRE') && (html = $html.text(), $html = $('<div>').append(html));
			}!this.opts.linebreaks && $html.contents().length == 1 && $html.contents()[0].nodeType == 3 && (this.getRangeSelectedNodes().length > 2 || !current || current.tagName == 'BODY' && !parent || parent.tagName == 'HTML') && (html = '<p>' + html + '</p>'), currBlock.tagName == 'BLOCKQUOTE' && html.indexOf('<a') === -1 ? this.insertText(html) : $html.contents().length > 1 && currBlock || $html.contents().is('p, :header, ul, ol, div, table, blockquote, pre, address, section, header, footer, aside, article') ? this.browser('msie') ? this.document.selection.createRange().pasteHTML(html) : this.document.execCommand('inserthtml', !1, html) : this.insertHtmlAdvanced(html), this.selectall && this.window.setTimeout($.proxy(function() {
				this.opts.linebreaks ? this.focusEnd() : this.selectionEnd(this['$editor'].contents().last());
			}, this), 1), this.observeStart(), sync !== !1 && this.sync();
		},
		insertHtmlAdvanced: function(html) {
			var sel = this.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				var range = sel.getRangeAt(0);
				range.deleteContents();
				var el = this.document.createElement('div');
				el.innerHTML = html;
				var frag = this.document.createDocumentFragment(),
					node, lastNode;
				while (node = el.firstChild) lastNode = frag.appendChild(node);
				range.insertNode(frag), lastNode && (range = range.cloneRange(), range.setStartAfter(lastNode), range.collapse(!0), sel.removeAllRanges(), sel.addRange(range));
			}
		},
		insertText: function(html) {
			var $html = $($.parseHTML(html));
			$html.length && (html = $html.text()), this['$editor'].focus(), this.browser('msie') ? this.document.selection.createRange().pasteHTML(html) : this.document.execCommand('inserthtml', !1, html), this.sync();
		},
		insertNode: function(node) {
			node = node[0] || node;
			var sel = this.getSelection();
			sel.getRangeAt && sel.rangeCount && (range = sel.getRangeAt(0), range.deleteContents(), range.insertNode(node), range.setEndAfter(node), range.setStartAfter(node), sel.removeAllRanges(), sel.addRange(range));
		},
		insertAfterLastElement: function(element) {
			if (this.isEndOfElement() && this.opts.linebreaks === !1) {
				if (this['$editor'].contents().last()[0] !== element) return !1;
				this.bufferSet();
				var node = $(this.opts.emptyHtml);
				$(element).after(node), this.selectionStart(node);
			}
		},
		insertLineBreak: function() {
			this.selectionSave(), this['$editor'].find('#selection-marker-1').before('<br>' + (this.browser('webkit') ? this.opts.invisibleSpace : '')), this.selectionRestore();
		},
		insertDoubleLineBreak: function() {
			this.selectionSave(), this['$editor'].find('#selection-marker-1').before('<br><br>' + (this.browser('webkit') ? this.opts.invisibleSpace : '')), this.selectionRestore();
		},
		replaceLineBreak: function(element) {
			var node = $('<br>' + this.opts.invisibleSpace);
			$(element).replaceWith(node), this.selectionStart(node);
		},
		pasteInit: function() {
			if (this.isMobile()) return !1;
			this['$editor'].on('paste.redactor', $.proxy(function(e) {
				if (!this.opts.cleanup) return !0;
				this.selectionSave(), this.selectall || (this.opts.autoresize === !0 ? (this['$editor'].height(this['$editor'].height()), this.saveScroll = this.document.body.scrollTop) : this.saveScroll = this['$editor'].scrollTop());
				var frag = this.extractContent();
				setTimeout($.proxy(function() {
					var pastedFrag = this.extractContent();
					this['$editor'].append(frag), this.selectionRestore();
					var html = this.getFragmentHtml(pastedFrag);
					this.pasteClean(html), this.opts.autoresize === !0 && this['$editor'].css('height', 'auto');
				}, this), 1);
			}, this));
		},
		pasteClean: function(html) {
			if (html = this.callback('pasteBefore', !1, html), this.currentOrParentIs('PRE')) return html = this.pastePre(html), this.pasteInsert(html), !0;
			if (html = html.replace(/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi, ''), html = html.replace(/(&nbsp;){2,}/gi, '&nbsp;'), html = html.replace(/&nbsp;/gi, ' '),
				html = html.replace(/<b\sid="internal-source-marker(.*?)">([\w\W]*?)<\/b>/gi, '$2'), html = this.cleanStripTags(html), html = html.replace(/<td><\/td>/gi, '[td]'), html = html.replace(/<td>&nbsp;<\/td>/gi, '[td]'), html = html.replace(/<td><br><\/td>/gi, '[td]'), html = html.replace(/<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi, '[a href="$2"]$4[/a]'), html = html.replace(/<iframe(.*?)>([\w\W]*?)<\/iframe>/gi, '[iframe$1]$2[/iframe]'), html = html.replace(/<video(.*?)>([\w\W]*?)<\/video>/gi, '[video$1]$2[/video]'), html = html.replace(/<audio(.*?)>([\w\W]*?)<\/audio>/gi, '[audio$1]$2[/audio]'), html = html.replace(/<embed(.*?)>([\w\W]*?)<\/embed>/gi, '[embed$1]$2[/embed]'), html = html.replace(/<object(.*?)>([\w\W]*?)<\/object>/gi, '[object$1]$2[/object]'), html = html.replace(/<param(.*?)>/gi, '[param$1]'), html = html.replace(/<img(.*?)style="(.*?)"(.*?)>/gi, '[img$1$3]'), html = html.replace(/<(\w+)([\w\W]*?)>/gi, '<$1>'), html = html.replace(/<[^\/>][^>]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, ''), html = html.replace(/<div>\s*?\t*?\n*?(<ul>|<ol>|<p>)/gi, '$1'), html = html.replace(/\[td\]/gi, '<td>&nbsp;</td>'), html = html.replace(/\[a href="(.*?)"\]([\w\W]*?)\[\/a\]/gi, '<a href="$1">$2</a>'), html = html.replace(/\[iframe(.*?)\]([\w\W]*?)\[\/iframe\]/gi, '<iframe$1>$2</iframe>'), html = html.replace(/\[video(.*?)\]([\w\W]*?)\[\/video\]/gi, '<video$1>$2</video>'), html = html.replace(/\[audio(.*?)\]([\w\W]*?)\[\/audio\]/gi, '<audio$1>$2</audio>'), html = html.replace(/\[embed(.*?)\]([\w\W]*?)\[\/embed\]/gi, '<embed$1>$2</embed>'), html = html.replace(/\[object(.*?)\]([\w\W]*?)\[\/object\]/gi, '<object$1>$2</object>'), html = html.replace(/\[param(.*?)\]/gi, '<param$1>'), html = html.replace(/\[img(.*?)\]/gi, '<img$1>'), this.opts.convertDivs && (html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '<p>$2</p>'), html = html.replace(/<\/div><p>/gi, '<p>'), html = html.replace(/<\/p><\/div>/gi, '</p>')), html = this.cleanParagraphy(html), html = html.replace(/<span(.*?)>([\w\W]*?)<\/span>/gi, '$2'), html = html.replace(/<img>/gi, ''), html = html.replace(/<[^\/>][^>][^img|param|source]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, ''), html = html.replace(/\n{3,}/gi, '\n'), html = html.replace(/<p><p>/gi, '<p>'), html = html.replace(/<\/p><\/p>/gi, '</p>'), this.opts.linebreaks === !0 && (html = html.replace(/<p(.*?)>([\w\W]*?)<\/p>/gi, '$2<br>')), html = html.replace(/<[^\/>][^>][^img|param|source]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, ''), this.browser('mozilla'))
				while (/<br>$/gi .test(html)) html = html.replace(/<br>$/gi, '');
			while (/<font>([\w\W]*?)<\/font>/gi .test(html)) html = html.replace(/<font>([\w\W]*?)<\/font>/gi, '$1');
			this.pasteInsert(html);
		},
		pastePre: function(s) {
			s = s.replace(/<br>|<\/H[1-6]>|<\/p>|<\/div>/gi, '\n');
			var tmp = this.document.createElement('div');
			return tmp.innerHTML = s, this.cleanEncodeEntities(tmp.textContent || tmp.innerText);
		},
		pasteInsert: function(html) {
			this.selectall && (this.opts.linebreaks ? this['$editor'].html('') : this['$editor'].html(this.opts.emptyHtml), this['$editor'].focus()), html = this.callback('pasteAfter', !1, html), this.insertHtml(html), this.selectall = !1, this.opts.autoresize ? $(this.document.body).scrollTop(this.saveScroll) : this['$editor'].scrollTop(this.saveScroll);
		},
		bufferSet: function(html) {
			html !== undefined ? this.opts.buffer.push(html) : (this.selectionSave(), this.opts.buffer.push(this['$editor'].html()), this.selectionRemoveMarkers(!0));
		},
		bufferUndo: function() {
			if (this.opts.buffer.length === 0) {
				this['$editor'].focus();
				return;
			}
			this.selectionSave(), this.opts.rebuffer.push(this['$editor'].html()), this.selectionRestore(!1, !0), this['$editor'].html(this.opts.buffer.pop()), this.selectionRestore(), setTimeout($.proxy(this.observeStart, this), 100);
		},
		bufferRedo: function() {
			if (this.opts.rebuffer.length === 0) return this['$editor'].focus(), !1;
			this.selectionSave(), this.opts.buffer.push(this['$editor'].html()), this.selectionRestore(!1, !0), this['$editor'].html(this.opts.rebuffer.pop()), this.selectionRestore(!0), setTimeout($.proxy(this.observeStart, this), 4);
		},
		observeStart: function() {
			this.observeImages(), this.observeTables();
		},
		observeTables: function() {
			this['$editor'].find('table').on('click', $.proxy(this.tableObserver, this));
		},
		observeImages: function() {
			if (this.opts.observeImages === !1) return !1;
			this['$editor'].find('img').each($.proxy(function(i, elem) {
				this.browser('msie') && $(elem).attr('unselectable', 'on'), this.imageResize(elem);
			}, this));
		},
		getSelection: function() {
			return this.opts.rangy ? this.opts.iframe ? rangy.getSelection(this['$frame'][0]) : rangy.getSelection() : this.document.getSelection();
		},
		getRange: function() {
			if (!this.opts.rangy) {
				if (this.document.getSelection) {
					var sel = this.document.getSelection();
					if (sel.getRangeAt && sel.rangeCount) return sel.getRangeAt(0);
				}
				return this.document.createRange();
			} else return this.opts.iframe ? rangy.createRange(this.iframeDoc()) : rangy.createRange();
		},
		selectionElement: function(node) {
			this.setCaret(node);
		},
		selectionStart: function(node) {
			this.selectionSet(node[0] || node, 0, null, 0);
		},
		selectionEnd: function(node) {
			this.selectionSet(node[0] || node, 1, null, 1);
		},
		selectionSet: function(orgn, orgo, focn, foco) {
			focn == null && (focn = orgn), foco == null && (foco = orgo);
			var sel = this.getSelection();
			if (!sel) return;
			var range = this.getRange();
			range.setStart(orgn, orgo), range.setEnd(focn, foco);
			try {
				sel.removeAllRanges();
			} catch (e) {}
			sel.addRange(range);
		},
		selectionWrap: function(tag) {
			tag = tag.toLowerCase();
			var block = this.getBlock();
			if (block) {
				var wrapper = this.formatChangeTag(block, tag);
				return this.sync(), wrapper;
			}
			var sel = this.getSelection();
			var range = sel.getRangeAt(0);
			var wrapper = document.createElement(tag);
			return wrapper.appendChild(range.extractContents()), range.insertNode(wrapper), this.selectionElement(wrapper), wrapper;
		},
		selectionAll: function() {
			var range = this.getRange();
			range.selectNodeContents(this['$editor'][0]);
			var sel = this.getSelection();
			sel.removeAllRanges(), sel.addRange(range);
		},
		selectionRemove: function() {
			this.getSelection().removeAllRanges();
		},
		getCaretOffset: function(element) {
			var caretOffset = 0;
			var range = this.getSelection().getRangeAt(0);
			var preCaretRange = range.cloneRange();
			return preCaretRange.selectNodeContents(element), preCaretRange.setEnd(range.endContainer, range.endOffset), caretOffset = $.trim(preCaretRange.toString()).length, caretOffset;
		},
		getCaretOffsetRange: function() {
			return new Range(this.getSelection().getRangeAt(0));
		},
		setCaret: function(el, start, end) {
			typeof end === 'undefined' && (end = start), el = el[0] || el;
			var range = this.getRange();
			range.selectNodeContents(el);
			var textNodes = this.getTextNodesIn(el);
			var foundStart = !1;
			var charCount = 0,
				endCharCount;
			if (textNodes.length == 1 && start) range.setStart(textNodes[0], start), range.setEnd(textNodes[0], end);
			else
				for (var i = 0, textNode; textNode = textNodes[i++];) {
					if (endCharCount = charCount + textNode.length, !foundStart && start >= charCount && (start < endCharCount || start == endCharCount && i < textNodes.length) && (range.setStart(textNode, start - charCount), foundStart = !0), foundStart && end <= endCharCount) {
						range.setEnd(textNode, end - charCount);
						break;
					}
					charCount = endCharCount;
				}
			var sel = this.getSelection();
			sel.removeAllRanges(), sel.addRange(range);
		},
		getTextNodesIn: function(node) {
			var textNodes = [];
			if (node.nodeType == 3) textNodes.push(node);
			else {
				var children = node.childNodes;
				for (var i = 0, len = children.length; i < len; ++i) textNodes.push.apply(textNodes, this.getTextNodesIn(children[i]));
			}
			return textNodes;
		},
		selectionSave: function() {
			this.isFocused() || this['$editor'].focus(), this.opts.rangy ? this.savedSel = rangy.saveSelection() : this.selectionCreateMarker(this.getRange());
		},
		selectionCreateMarker: function(range, remove) {
			if (!range) return;
			var node1 = $('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>', this.document)[0];
			var node2 = $('<span id="selection-marker-2">' + this.opts.invisibleSpace + '</span>', this.document)[0];
			range.collapsed === !0 ? this.selectionSetMarker(range, node1, !0) : (this.selectionSetMarker(range, node1, !0), this.selectionSetMarker(range, node2, !1)), this.savedSel = this['$editor'].html(), this.selectionRestore(!1, !1);
		},
		selectionSetMarker: function(range, node, type) {
			var boundaryRange = range.cloneRange();
			boundaryRange.collapse(type), boundaryRange.insertNode(node), boundaryRange.detach();
		},
		selectionRestore: function(replace, remove) {
			if (!this.opts.rangy) {
				replace === !0 && this.savedSel && this['$editor'].html(this.savedSel);
				var node1 = this['$editor'].find('span#selection-marker-1');
				var node2 = this['$editor'].find('span#selection-marker-2');
				this.isFocused() || this['$editor'].focus(), node1.length != 0 && node2.length != 0 ? this.selectionSet(node1[0], 0, node2[0], 0) : node1.length != 0 && this.selectionSet(node1[0], 0, null, 0), remove !== !1 && (this.selectionRemoveMarkers(), this.savedSel = !1);
			} else rangy.restoreSelection(this.savedSel);
		},
		selectionRemoveMarkers: function() {
			this.opts.rangy ? rangy.removeMarkers(this.savedSel) : (this['$editor'].find('span#selection-marker-1').remove(), this['$editor'].find('span#selection-marker-2').remove());
		},
		getCurrent: function() {
			var el = !1;
			var sel = this.getSelection();
			return sel.rangeCount > 0 && (el = sel.getRangeAt(0).startContainer), this.isParentRedactor(el);
		},
		getParent: function(elem) {
			return elem = elem || this.getCurrent(), elem ? this.isParentRedactor($(elem).parent()[0]) : !1;
		},
		getBlock: function(node) {
			typeof node === 'undefined' && (node = this.getCurrent());
			while (node) {
				if (this.nodeTestBlocks(node)) return $(node).hasClass('redactor_editor') ? !1 : node;
				node = node.parentNode;
			}
			return !1;
		},
		getBlocks: function(nodes) {
			var newnodes = [];
			if (typeof nodes == 'undefined') {
				var range = this.getRange();
				if (range && range.collapsed === !0) return [this.getBlock()];
				var nodes = this.getNodes(range);
			}
			return $.each(nodes, $.proxy(function(i, node) {
				if (this.opts.iframe === !1 && $(node).parents('div.redactor_editor').size() == 0) return !1;
				this.nodeTestBlocks(node) && newnodes.push(node);
			}, this)), newnodes.length === 0 && (newnodes = [this.getBlock()]), newnodes;
		},
		nodeTestBlocks: function(node) {
			return node.nodeType == 1 && this.rTestBlock.test(node.nodeName);
		},
		tagTestBlock: function(tag) {
			return this.rTestBlock.test(tag);
		},
		getSelectedNodes: function(range) {
			if (typeof range == 'undefined' || range == 0) var range = this.getRange();
			if (range && range.collapsed === !0) return [this.getCurrent()];
			var sel = this.getSelection();
			try {
				var frag = sel.getRangeAt(0).cloneContents();
			} catch (e) {
				return !1;
			}
			var tempspan = this.document.createElement('span');
			tempspan.appendChild(frag), window.selnodes = tempspan.childNodes;
			var len = selnodes.length;
			var output = [];
			for (var i = 0, u = len; i < u; i++) output.push(selnodes[i]);
			return output.length == 0 && output.push(this.getCurrent()), output;
		},
		getNodes: function(range, tag) {
			if (this.opts.linebreaks) return this.getSelectedNodes(range);
			if (typeof range == 'undefined' || range == 0) var range = this.getRange();
			if (range && range.collapsed === !0)
				if (typeof tag === 'undefined' && this.tagTestBlock(tag)) {
					var block = this.getBlock();
					return block.tagName == tag ? [block] : [];
				} else return [this.getCurrent()];
			var nodes = [],
				finalnodes = [];
			var sel = this.document.getSelection();
			if (sel.isCollapsed || (nodes = this.getRangeSelectedNodes(sel.getRangeAt(0))), $.each(nodes, $.proxy(function(i, node) {
				if (this.opts.iframe === !1 && $(node).parents('div.redactor_editor').size() == 0) return !1;
				typeof tag === 'undefined' ? $.trim(node.textContent) != '' && finalnodes.push(node) : node.tagName == tag && finalnodes.push(node);
			}, this)), finalnodes.length == 0)
				if (typeof tag === 'undefined' && this.tagTestBlock(tag)) {
					var block = this.getBlock();
					return block.tagName == tag ? finalnodes.push(block) : [];
				} else finalnodes.push(this.getCurrent());
			return finalnodes;
		},
		getElement: function(node) {
			node || (node = this.getCurrent());
			while (node) {
				if (node.nodeType == 1) return $(node).hasClass('redactor_editor') ? !1 : node;
				node = node.parentNode;
			}
			return !1;
		},
		getRangeSelectedNodes: function(range) {
			range = range || this.getRange();
			var node = range.startContainer;
			var endNode = range.endContainer;
			if (node == endNode) return [node];
			var rangeNodes = [];
			while (node && node != endNode) rangeNodes.push(node = this.nextNode(node));
			node = range.startContainer;
			while (node && node != range.commonAncestorContainer) rangeNodes.unshift(node), node = node.parentNode;
			return rangeNodes;
		},
		nextNode: function(node) {
			if (node.hasChildNodes()) return node.firstChild;
			else {
				while (node && !node.nextSibling) node = node.parentNode;
				return node ? node.nextSibling : null;
			}
		},
		getSelectionText: function() {
			return this.getSelection().toString();
		},
		getSelectionHtml: function() {
			var html = '';
			var sel = this.getSelection();
			if (sel.rangeCount) {
				var container = this.document.createElement('div');
				var len = sel.rangeCount;
				for (var i = 0; i < len; ++i) container.appendChild(sel.getRangeAt(i).cloneContents());
				html = container.innerHTML;
			}
			return this.syncClean(html);
		},
		tableShow: function() {
			this.selectionSave(), this.modalInit(this.opts.curLang.table, this.opts.modal_table, 300, $.proxy(function() {
				$('#redactor_insert_table_btn').click($.proxy(this.tableInsert, this)), setTimeout(function() {
					$('#redactor_table_rows').focus();
				}, 200);
			}, this));
		},
		tableInsert: function() {
			var rows = $('#redactor_table_rows').val(),
				columns = $('#redactor_table_columns').val(),
				$table_box = $('<div></div>'),
				tableId = Math.floor(Math.random() * 99999),
				$table = $('<table id="table' + tableId + '"><tbody></tbody></table>'),
				i, $row, z, $column;
			for (i = 0; i < rows; i++) {
				for ($row = $('<tr></tr>'), z = 0; z < columns; z++) $column = $('<td>' + this.opts.invisibleSpace + '</td>'), i === 0 && z === 0 && $column.append('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>'), $($row).append($column);
				$table.append($row);
			}
			$table_box.append($table);
			var html = $table_box.html();
			this.modalClose(), this.selectionRestore();
			var current = this.getBlock() || this.getCurrent();
			current ? $(current).after(html) : this.insertHtmlAdvanced(html), this.selectionRestore();
			var table = this['$editor'].find('#table' + tableId);
			this.tableObserver(table), this.buttonActiveObserver(), table.removeAttr('id'), this.sync();
		},
		tableObserver: function(e) {
			this['$table'] = $(e.target || e).closest('table'), this['$tbody'] = $(e.target).closest('tbody'), this['$thead'] = this['$table'].find('thead'), this['$current_td'] = $(e.target || this['$table'].find('td').first()), this['$current_tr'] = $(e.target || this['$table'].find('tr').first()).closest('tr');
		},
		tableDeleteTable: function() {
			if (this.bufferSet(), !this['$table']) return;
			this['$table'].remove(), this['$table'] = !1, this.sync();
		},
		tableDeleteRow: function() {
			if (this.bufferSet(), !this['$current_tr']) return;
			var $focusTR = this['$current_tr'].prev().length ? this['$current_tr'].prev() : this['$current_tr'].next();
			if ($focusTR.length) {
				var $focusTD = $focusTR.children('td').first();
				$focusTD.length && ($focusTD.prepend('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>'), this.selectionRestore());
			}
			this['$current_tr'].remove(), this.sync();
		},
		tableDeleteColumn: function() {
			this.bufferSet();
			var index = this['$current_td'].get(0).cellIndex;
			this['$table'].find('tr').each($.proxy(function(i, elem) {
				var focusIndex = index - 1 < 0 ? index + 1 : index - 1;
				i === 0 && ($(elem).find('td').eq(focusIndex).prepend('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>'), this.selectionRestore()), $(elem).find('td').eq(index).remove();
			}, this)), this.sync();
		},
		tableAddHead: function() {
			if (this.bufferSet(), this['$table'].find('thead').size() !== 0) this.tableDeleteHead();
			else {
				var tr = this['$table'].find('tr').first().clone();
				tr.find('td').html(this.opts.invisibleSpace), this['$thead'] = $('<thead></thead>'), this['$thead'].append(tr), this['$table'].prepend(this.$thead), this.sync();
			}
		},
		tableDeleteHead: function() {
			this.bufferSet(), $(this.$thead).remove(), this['$thead'] = !1, this.sync();
		},
		tableAddRowAbove: function() {
			this.tableAddRow('before');
		},
		tableAddRowBelow: function() {
			this.tableAddRow('after');
		},
		tableAddColumnLeft: function() {
			this.tableAddColumn('before');
		},
		tableAddColumnRight: function() {
			this.tableAddColumn('after');
		},
		tableAddRow: function(type) {
			this.bufferSet();
			var new_tr = this['$current_tr'].clone();
			new_tr.find('td').html(this.opts.invisibleSpace), type === 'after' ? this['$current_tr'].after(new_tr) : this['$current_tr'].before(new_tr), this.sync();
		},
		tableAddColumn: function(type) {
			this.bufferSet();
			var index = 0;
			this['$current_tr'].find('td').each($.proxy(function(i, elem) {
				$(elem)[0] === this['$current_td'][0] && (index = i);
			}, this)), this['$table'].find('tr').each($.proxy(function(i, elem) {
				var $current = $(elem).find('td').eq(index);
				var td = $current.clone();
				td.html(this.opts.invisibleSpace), type === 'after' ? $current.after(td) : $current.before(td);
			}, this)), this.sync();
		},
		videoShow: function() {
			this.selectionSave(), this.modalInit(this.opts.curLang.video, this.opts.modal_video, 600, $.proxy(function() {
				$('#redactor_insert_video_btn').click($.proxy(this.videoInsert, this)), setTimeout(function() {
					$('#redactor_insert_video_area').focus();
				}, 200);
			}, this));
		},
		videoInsert: function() {
			var data = $('#redactor_insert_video_area').val();
			data = this.cleanStripTags(data), this.selectionRestore();
			var current = this.getBlock() || this.getCurrent();
			current ? ($(current).after(data), this.sync()) : this.insertHtmlAdvanced(data), this.modalClose();
		},
		linkShow: function() {
			this.selectionSave();
			var callback = $.proxy(function() {
				this.insert_link_node = !1;
				var sel = this.getSelection();
				var url = '',
					text = '',
					target = '';
				var elem = this.getParent();
				var par = $(elem).parent().get(0);
				par && par.tagName === 'A' && (elem = par), elem && elem.tagName === 'A' ? (url = elem.href, text = $(elem).text(), target = elem.target, this.insert_link_node = elem) : text = sel.toString(), $('.redactor_link_text').val(text);
				var thref = self.location.href.replace(/\/$/i, '');
				var turl = url.replace(thref, '');
				var tabs = $('#redactor_tabs').find('a');
				this.opts.linkEmail === !1 && tabs.eq(1).remove(), this.opts.linkAnchor === !1 && tabs.eq(2).remove(), this.opts.linkEmail === !1 && this.opts.linkAnchor === !1 ? ($('#redactor_tabs').remove(), $('#redactor_link_url').val(turl)) : url.search('mailto:') === 0 ? (this.modalSetTab.call(this, 2), $('#redactor_tab_selected').val(2), $('#redactor_link_mailto').val(url.replace('mailto:', ''))) : turl.search(/^/gi) === 0 ? (this.modalSetTab.call(this, 3), $('#redactor_tab_selected').val(3), $('#redactor_link_anchor').val(turl.replace(/^/gi, ''))) : $('#redactor_link_url').val(turl), target === '_blank' && $('#redactor_link_blank').prop('checked', !0), $('#redactor_insert_link_btn').click($.proxy(this.linkProcess, this)), setTimeout(function() {
					$('#redactor_link_url').focus();
				}, 200);
			}, this);
			this.modalInit(this.opts.curLang.link, this.opts.modal_link, 460, callback);
		},
		linkProcess: function() {
			var tab_selected = $('#redactor_tab_selected').val();
			var link = '',
				text = '',
				target = '',
				targetBlank = '';
			if (tab_selected === '1') {
				link = $('#redactor_link_url').val(), text = $('#redactor_link_url_text').val(), $('#redactor_link_blank').prop('checked') && (target = ' target="_blank"', targetBlank = '_blank');
				var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}';
				var re = new RegExp('^(http|ftp|https)://' + pattern, 'i');
				var re2 = new RegExp('^' + pattern, 'i');
				link.search(re) == -1 && link.search(re2) == 0 && this.opts.linkProtocol && (link = this.opts.linkProtocol + link);
			} else tab_selected === '2' ? (link = 'mailto:' + $('#redactor_link_mailto').val(), text = $('#redactor_link_mailto_text').val()) : tab_selected === '3' && (link = '#' + $('#redactor_link_anchor').val(), text = $('#redactor_link_anchor_text').val());
			this.linkInsert('<a href="' + link + '"' + target + '>' + text + '</a>', $.trim(text), link, targetBlank);
		},
		linkInsert: function(a, text, link, target) {
			this.selectionRestore(), text !== '' && (this.insert_link_node ? (this.bufferSet(), $(this.insert_link_node).text(text).attr('href', link), target !== '' ? $(this.insert_link_node).attr('target', target) : $(this.insert_link_node).removeAttr('target'), this.sync()) : this.exec('inserthtml', a)), this.modalClose();
		},
		fileShow: function() {
			this.selectionSave();
			var callback = $.proxy(function() {
				var sel = this.getSelection();
				var text = '';
				this.oldIE() ? text = sel.text : text = sel.toString(), $('#redactor_filename').val(text), this.isMobile() || this.draguploadInit('#redactor_file', {
					url: this.opts.fileUpload,
					uploadFields: this.opts.uploadFields,
					success: $.proxy(this.fileCallback, this),
					error: $.proxy(function(obj, json) {
						this.callback('fileUploadError', json);
					}, this)
				}), this.uploadInit('redactor_file', {
					auto: !0,
					url: this.opts.fileUpload,
					success: $.proxy(this.fileCallback, this),
					error: $.proxy(function(obj, json) {
						this.callback('fileUploadError', json);
					}, this)
				});
			}, this);
			this.modalInit(this.opts.curLang.file, this.opts.modal_file, 500, callback);
		},
		fileCallback: function(json) {
			if (this.selectionRestore(), json !== !1) {
				var text = $('#redactor_filename').val();
				text === '' && (text = json.filename);
				var link = '<a href="' + json.filelink + '" id="filelink-marker">' + text + '</a>';
				this.browser('webkit') && this.window.chrome && (link += '&nbsp;'), this.execCommand('inserthtml', link, !1);
				var linkmarker = $(this['$editor'].find('a#filelink-marker'));
				linkmarker.size() != 0 ? linkmarker.removeAttr('id') : linkmarker = !1, this.sync(), this.callback('fileUpload', linkmarker, json);
			}
			this.modalClose();
		},
		imageShow: function() {
			this.selectionSave();
			var callback = $.proxy(function() {
				if (this.opts.imageGetJson ? $.getJSON(this.opts.imageGetJson, $.proxy(function(data) {
					var folders = {}, count = 0;
					$.each(data, $.proxy(function(key, val) {
						typeof val.folder !== 'undefined' && (count++, folders[val.folder] = count);
					}, this));
					var folderclass = !1;
					if ($.each(data, $.proxy(function(key, val) {
						var thumbtitle = '';
						typeof val.title !== 'undefined' && (thumbtitle = val.title);
						var folderkey = 0;
						!$.isEmptyObject(folders) && typeof val.folder !== 'undefined' && (folderkey = folders[val.folder], folderclass === !1 && (folderclass = '.redactorfolder' + folderkey));
						var img = $('<img src="' + val.thumb + '" class="redactorfolder redactorfolder' + folderkey + '" rel="' + val.image + '" title="' + thumbtitle + '" />');
						$('#redactor_image_box').append(img), $(img).click($.proxy(this.imageThumbClick, this));
					}, this)), !$.isEmptyObject(folders)) {
						$('.redactorfolder').hide(), $(folderclass).show();
						var onchangeFunc = function(e) {
							$('.redactorfolder').hide(), $('.redactorfolder' + $(e.target).val()).show();
						};
						var select = $('<select id="redactor_image_box_select">');
						$.each(folders, function(k, v) {
							select.append($('<option value="' + v + '">' + k + '</option>'));
						}), $('#redactor_image_box').before(select), select.change(onchangeFunc);
					}
				}, this)) : $('#redactor_tabs').find('a').eq(1).remove(), this.opts.imageUpload || this.opts.s3)!this.isMobile() && this.opts.s3 === !1 && $('#redactor_file').length && this.draguploadInit('#redactor_file', {
					url: this.opts.imageUpload,
					uploadFields: this.opts.uploadFields,
					success: $.proxy(this.imageCallback, this),
					error: $.proxy(function(obj, json) {
						this.callback('imageUploadError', json);
					}, this)
				}), this.opts.s3 === !1 ? this.uploadInit('redactor_file', {
					auto: !0,
					url: this.opts.imageUpload,
					success: $.proxy(this.imageCallback, this),
					error: $.proxy(function(obj, json) {
						this.callback('imageUploadError', json);
					}, this)
				}) : $('#redactor_file').on('change.redactor', $.proxy(this.s3handleFileSelect, this));
				else if ($('.redactor_tab').hide(), !this.opts.imageGetJson) $('#redactor_tabs').remove(), $('#redactor_tab3').show();
				else {
					var tabs = $('#redactor_tabs').find('a');
					tabs.eq(0).remove(), tabs.eq(1).addClass('redactor_tabs_act'), $('#redactor_tab2').show();
				}
				$('#redactor_upload_btn').click($.proxy(this.imageCallbackLink, this)), this.opts.imageUpload || this.opts.imageGetJson || setTimeout(function() {
					$('#redactor_file_link').focus();
				}, 200);
			}, this);
			this.modalInit(this.opts.curLang.image, this.opts.modal_image, 610, callback);
		},
		imageEdit: function(e) {
			var $el = $(e.target);
			var parent = $el.parent();
			var callback = $.proxy(function() {
				$('#redactor_file_alt').val($el.attr('alt')), $('#redactor_image_edit_src').attr('href', $el.attr('src')), $('#redactor_form_image_align').val($el.css('float')), $(parent).get(0).tagName === 'A' && $('#redactor_file_link').val($(parent).attr('href')), $('#redactor_image_delete_btn').click($.proxy(function() {
					this.imageRemove($el);
				}, this)),
				$('#redactorSaveBtn').click($.proxy(function() {
					this.imageSave($el);
				}, this));
			}, this);
			this.modalInit(this.opts.curLang.image, this.opts.modal_image_edit, 380, callback);
		},
		imageRemove: function(el) {
			var parent = $(el).parent();
			$(el).remove(),
			parent.length && parent[0].tagName === 'P' && (this['$editor'].focus(), this.selectionStart(parent)), this.callback('imageDelete', el), this.modalClose(), this.sync();
		},
		imageSave: function(el) {
			var parent = $(el).parent();
			$(el).attr('alt', $('#redactor_file_alt').val());
			var floating = $('#redactor_form_image_align').val();
			floating === 'left' ? $(el).css({
				float: 'left',
				margin: '0 10px 10px 0'
			}) : floating === 'right' ? $(el).css({
				float: 'right',
				margin: '0 0 10px 10px'
			}) : $(el).css({
				float: 'none',
				margin: '0'
			});
			var link = $.trim($('#redactor_file_link').val());
			link !== '' ? $(parent).get(0).tagName !== 'A' ? $(el).replaceWith('<a href="' + link + '">' + this.outerHtml(el) + '</a>') : $(parent).attr('href', link) : $(parent).get(0).tagName === 'A' && $(parent).replaceWith(this.outerHtml(el)), this.modalClose(), this.observeImages(), this.sync();
		},
		imageResize: function(image) {
			var $image = $(image),
				clicked = !1,
				clicker = !1,
				start_x, start_y, ratio = $image.width() / $image.height(),
				min_w = 10,
				min_h = 10;
			$image.off('hover mousedown mouseup click mousemove'), $image.hover(function() {
				$image.css('cursor', 'nw-resize');
			}, function() {
				$image.css('cursor', ''), clicked = !1;
			}), $image.mousedown(function(e) {
				e.preventDefault(), ratio = $image.width() / $image.height(), clicked = !0, clicker = !0, start_x = Math.round(e.pageX - $image.eq(0).offset().left), start_y = Math.round(e.pageY - $image.eq(0).offset().top);
			}), $image.mouseup($.proxy(function(e) {
				clicked = !1, $image.css('cursor', ''), this.sync();
			}, this)), $image.click($.proxy(function(e) {
				clicker && this.imageEdit(e);
			}, this)), $image.mousemove(function(e) {
				if (clicked) {
					clicker = !1;
					var mouse_x = Math.round(e.pageX - $(this).eq(0).offset().left) - start_x;
					var mouse_y = Math.round(e.pageY - $(this).eq(0).offset().top) - start_y;
					var div_h = $image.height();
					var new_h = parseInt(div_h, 10) + mouse_y;
					var new_w = Math.round(new_h * ratio);
					new_w > min_w && $image.width(new_w), start_x = Math.round(e.pageX - $(this).eq(0).offset().left), start_y = Math.round(e.pageY - $(this).eq(0).offset().top);
				}
			});
		},
		imageThumbClick: function(e) {
			var img = '<img id="image-marker" src="' + $(e.target).attr('rel') + '" alt="' + $(e.target).attr('title') + '" />';
			this.opts.paragraphy && (img = '<p>' + img + '</p>'), this.imageInsert(img, !0);
		},
		imageCallbackLink: function() {
			var val = $('#redactor_file_link').val();
			if (val !== '') {
				var data = '<img id="image-marker" src="' + val + '" />';
				this.opts.linebreaks === !1 && (data = '<p>' + data + '</p>'), this.imageInsert(data, !0);
			} else this.modalClose();
		},
		imageCallback: function(data) {
			this.imageInsert(data);
		},
		imageInsert: function(json, link) {
			if (this.selectionRestore(), json !== !1) {
				var html = '';
				link !== !0 ? (html = '<img id="image-marker" src="' + json.filelink + '" />', this.opts.paragraphy && (html = '<p>' + html + '</p>')) : html = json, this.execCommand('inserthtml', html, !1);
				var image = $(this['$editor'].find('img#image-marker'));
				image.length ? image.removeAttr('id') : image = !1, this.sync(), link !== !0 && this.callback('imageUpload', image, json);
			}
			this.modalClose(), this.observeImages();
		},
		modalTemplatesInit: function() {
			$.extend(this.opts, {
				modal_file: String() + '<section>' + '<div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;">' + '<div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div>' + '</div>' + '<form id="redactorUploadFileForm" method="post" action="" enctype="multipart/form-data">' + '<label>' + this.opts.curLang.filename + '</label>' + '<input type="text" id="redactor_filename" class="redactor_input" />' + '<div style="margin-top: 7px;">' + '<input type="file" id="redactor_file" name="file" />' + '</div>' + '</form>' + '</section>',
				modal_image_edit: String() + '<section>' + '<label>' + this.opts.curLang.title + '</label>' + '<input id="redactor_file_alt" class="redactor_input" />' + '<label>' + this.opts.curLang.link + '</label>' + '<input id="redactor_file_link" class="redactor_input" />' + '<label>' + this.opts.curLang.image_position + '</label>' + '<select id="redactor_form_image_align">' + '<option value="none">' + this.opts.curLang.none + '</option>' + '<option value="left">' + this.opts.curLang.left + '</option>' + '<option value="right">' + this.opts.curLang.right + '</option>' + '</select>' + '</section>' + '<footer>' + '<a href="#" id="redactor_image_delete_btn" class="redactor_modal_btn">' + this.opts.curLang._delete + '</a>&nbsp;&nbsp;&nbsp;' + '<a href="#" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>' + '<input type="button" name="save" class="redactor_modal_btn" id="redactorSaveBtn" value="' + this.opts.curLang.save + '" />' + '</footer>',
				modal_image: String() + '<section>' + '<div id="redactor_tabs">' + '<a href="#" class="redactor_tabs_act">' + this.opts.curLang.upload + '</a>' + '<a href="#">' + this.opts.curLang.choose + '</a>' + '<a href="#">' + this.opts.curLang.link + '</a>' + '</div>' + '<div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;">' + '<div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div>' + '</div>' + '<form id="redactorInsertImageForm" method="post" action="" enctype="multipart/form-data">' + '<div id="redactor_tab1" class="redactor_tab">' + '<input type="file" id="redactor_file" name="file" />' + '</div>' + '<div id="redactor_tab2" class="redactor_tab" style="display: none;">' + '<div id="redactor_image_box"></div>' + '</div>' + '</form>' + '<div id="redactor_tab3" class="redactor_tab" style="display: none;">' + '<label>' + this.opts.curLang.image_web_link + '</label>' + '<input type="text" name="redactor_file_link" id="redactor_file_link" class="redactor_input"  />' + '</div>' + '</section>' + '<footer>' + '<a href="#" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>' + '<input type="button" name="upload" class="redactor_modal_btn" id="redactor_upload_btn" value="' + this.opts.curLang.insert + '" />' + '</footer>',
				modal_link: String() + '<section>' + '<form id="redactorInsertLinkForm" method="post" action="">' + '<div id="redactor_tabs">' + '<a href="#" class="redactor_tabs_act">URL</a>' + '<a href="#">Email</a>' + '<a href="#">' + this.opts.curLang.anchor + '</a>' + '</div>' + '<input type="hidden" id="redactor_tab_selected" value="1" />' + '<div class="redactor_tab" id="redactor_tab1">' + '<label>URL</label>' + '<input type="text" id="redactor_link_url" class="redactor_input"  />' + '<label>' + this.opts.curLang.text + '</label>' + '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_url_text" />' + '<label><input type="checkbox" id="redactor_link_blank"> ' + this.opts.curLang.link_new_tab + '</label>' + '</div>' + '<div class="redactor_tab" id="redactor_tab2" style="display: none;">' + '<label>Email</label>' + '<input type="text" id="redactor_link_mailto" class="redactor_input" />' + '<label>' + this.opts.curLang.text + '</label>' + '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_mailto_text" />' + '</div>' + '<div class="redactor_tab" id="redactor_tab3" style="display: none;">' + '<label>' + this.opts.curLang.anchor + '</label>' + '<input type="text" class="redactor_input" id="redactor_link_anchor"  />' + '<label>' + this.opts.curLang.text + '</label>' + '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_anchor_text" />' + '</div>' + '</form>' + '</section>' + '<footer>' + '<a href="#" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>' + '<input type="button" class="redactor_modal_btn" id="redactor_insert_link_btn" value="' + this.opts.curLang.insert + '" />' + '</footer>',
				modal_table: String() + '<section>' + '<label>' + this.opts.curLang.rows + '</label>' + '<input type="text" size="5" value="2" id="redactor_table_rows" />' + '<label>' + this.opts.curLang.columns + '</label>' + '<input type="text" size="5" value="3" id="redactor_table_columns" />' + '</section>' + '<footer>' + '<a href="#" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>' + '<input type="button" name="upload" class="redactor_modal_btn" id="redactor_insert_table_btn" value="' + this.opts.curLang.insert + '" />' + '</footer>',
				modal_video: String() + '<section>' + '<form id="redactorInsertVideoForm">' + '<label>' + this.opts.curLang.video_html_code + '</label>' + '<textarea id="redactor_insert_video_area" style="width: 99%; height: 160px;"></textarea>' + '</form>' + '</section>' + '<footer>' + '<a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>' + '<input type="button" class="redactor_modal_btn" id="redactor_insert_video_btn" value="' + this.opts.curLang.insert + '" />' + '</footer>'
			});
		},
		modalInit: function(title, content, width, callback) {
			var $redactorModalOverlay = $('#redactor_modal_overlay');
			$redactorModalOverlay.length || (this['$overlay'] = $redactorModalOverlay = $('<div id="redactor_modal_overlay" style="display: none;"></div>'), $('body').prepend(this.$overlay)), this.opts.modalOverlay && $redactorModalOverlay.show().on('click', $.proxy(this.modalClose, this));
			var $redactorModal = $('#redactor_modal');
			$redactorModal.length || (this['$modal'] = $redactorModal = $('<div id="redactor_modal" style="display: none;"><div id="redactor_modal_close">&times;</div><header id="redactor_modal_header"></header><div id="redactor_modal_inner"></div></div>'), $('body').append(this.$modal)), $('#redactor_modal_close').on('click', $.proxy(this.modalClose, this)), this.hdlModalClose = $.proxy(function(e) {
				return e.keyCode === this.keyCode.ESC ? (this.modalClose(), !1) : void 0;
			}, this), $(document).keyup(this.hdlModalClose), this['$editor'].keyup(this.hdlModalClose), this.modalcontent = !1, content.indexOf('#') == 0 ? (this.modalcontent = $(content), $('#redactor_modal_inner').empty().append(this.modalcontent.html()), this.modalcontent.html('')) : $('#redactor_modal_inner').empty().append(content), $redactorModal.find('#redactor_modal_header').html(title),
			typeof $.fn.draggable !== 'undefined' && ($redactorModal.draggable({
				handle: '#redactor_modal_header'
			}), $redactorModal.find('#redactor_modal_header').css('cursor', 'move'));
			var $redactor_tabs = $('#redactor_tabs');
			if ($redactor_tabs.length) {
				var that = this;
				$redactor_tabs.find('a').each(function(i, s) {
					i++, $(s).on('click', function(e) {
						if (e.preventDefault(), $redactor_tabs.find('a').removeClass('redactor_tabs_act'), $(this).addClass('redactor_tabs_act'), $('.redactor_tab').hide(), $('#redactor_tab' + i).show(), $('#redactor_tab_selected').val(i), that.isMobile() === !1) {
							var height = $redactorModal.outerHeight();
							$redactorModal.css('margin-top', '-' + (height + 10) / 2 + 'px');
						}
					});
				});
			}
			$redactorModal.find('.redactor_btn_modal_close').on('click', $.proxy(this.modalClose, this)), this.isMobile() === !1 ? ($redactorModal.css({
				position: 'fixed',
				top: '-2000px',
				left: '50%',
				width: width + 'px',
				marginLeft: '-' + (width + 60) / 2 + 'px'
			}).show(), this.modalSaveBodyOveflow = $(document.body).css('overflow'), $(document.body).css('overflow', 'hidden')) : $redactorModal.css({
				position: 'fixed',
				width: '100%',
				height: '100%',
				top: '0',
				left: '0',
				margin: '0',
				minHeight: '300px'
			}).show(), typeof callback === 'function' && callback(), this.isMobile() === !1 && setTimeout(function() {
				var height = $redactorModal.outerHeight();
				$redactorModal.css({
					top: '50%',
					height: 'auto',
					minHeight: 'auto',
					marginTop: '-' + (height + 10) / 2 + 'px'
				});
			}, 20);
		},
		modalClose: function() {
			return $('#redactor_modal_close').off('click', this.modalClose), $('#redactor_modal').fadeOut('fast', $.proxy(function() {
				var redactorModalInner = $('#redactor_modal_inner');
				this.modalcontent !== !1 && (this.modalcontent.html(redactorModalInner.html()), this.modalcontent = !1), redactorModalInner.html(''), this.opts.modalOverlay && $('#redactor_modal_overlay').hide().off('click', this.modalClose), $(document).unbind('keyup', this.hdlModalClose), this['$editor'].unbind('keyup', this.hdlModalClose);
			}, this)), this.isMobile() === !1 && $(document.body).css('overflow', this.modalSaveBodyOveflow ? this.modalSaveBodyOveflow : 'visible'), !1;
		},
		modalSetTab: function(num) {
			$('.redactor_tab').hide(), $('#redactor_tabs').find('a').removeClass('redactor_tabs_act').eq(num - 1).addClass('redactor_tabs_act'), $('#redactor_tab' + num).show();
		},
		s3handleFileSelect: function(e) {
			var files = e.target.files;
			for (var i = 0, f; f = files[i]; i++) this.s3uploadFile(f);
		},
		s3uploadFile: function(file) {
			this.s3executeOnSignedUrl(file, $.proxy(function(signedURL) {
				this.s3uploadToS3(file, signedURL);
			}, this));
		},
		s3executeOnSignedUrl: function(file, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', this.opts.s3 + '?name=' + file.name + '&type=' + file.type, !0), xhr.overrideMimeType('text/plain; charset=x-user-defined'), xhr.onreadystatechange = function(e) {
				this.readyState == 4 && this.status == 200 ? ($('#redactor-progress').fadeIn(), callback(decodeURIComponent(this.responseText))) : this.readyState == 4 && this.status != 200;
			}, xhr.send();
		},
		s3createCORSRequest: function(method, url) {
			var xhr = new XMLHttpRequest();
			return 'withCredentials' in xhr ? xhr.open(method, url, !0) : typeof XDomainRequest != 'undefined' ? (xhr = new XDomainRequest(), xhr.open(method, url)) : xhr = null, xhr;
		},
		s3uploadToS3: function(file, url) {
			var xhr = this.s3createCORSRequest('PUT', url);
			xhr && (xhr.onload = $.proxy(function() {
				if (xhr.status == 200) {
					$('#redactor-progress').hide();
					var s3image = url.split('?');
					if (!s3image[0]) return !1;
					this.selectionRestore();
					var html = '';
					html = '<img id="image-marker" src="' + s3image[0] + '" />', this.opts.paragraphy && (html = '<p>' + html + '</p>'), this.execCommand('inserthtml', html, !1);
					var image = $(this['$editor'].find('img#image-marker'));
					image.length ? image.removeAttr('id') : image = !1, this.sync(), this.callback('imageUpload', image, !1), this.modalClose(), this.observeImages();
				}
			}, this), xhr.onerror = function() {}, xhr.upload.onprogress = function(e) {}, xhr.setRequestHeader('Content-Type', file.type), xhr.setRequestHeader('x-amz-acl', 'public-read'), xhr.send(file));
		},
		uploadInit: function(el, options) {
			this.uploadOptions = {
				url: !1,
				success: !1,
				error: !1,
				start: !1,
				trigger: !1,
				auto: !1,
				input: !1
			}, $.extend(this.uploadOptions, options);
			var $el = $('#' + el);
			$el.length && $el[0].tagName === 'INPUT' ? (this.uploadOptions.input = $el, this.el = $($el[0].form)) : this.el = $el, this.element_action = this.el.attr('action'), this.uploadOptions.auto ? $(this.uploadOptions.input).change($.proxy(function(e) {
				this.el.submit(function(e) {
					return !1;
				}), this.uploadSubmit(e);
			}, this)) : this.uploadOptions.trigger && $('#' + this.uploadOptions.trigger).click($.proxy(this.uploadSubmit, this));
		},
		uploadSubmit: function(e) {
			$('#redactor-progress').fadeIn(), this.uploadForm(this.element, this.uploadFrame());
		},
		uploadFrame: function() {
			this.id = 'f' + Math.floor(Math.random() * 99999);
			var d = this.document.createElement('div');
			var iframe = '<iframe style="display:none" id="' + this.id + '" name="' + this.id + '"></iframe>';
			return d.innerHTML = iframe, $(d).appendTo('body'), this.uploadOptions.start && this.uploadOptions.start(), $('#' + this.id).load($.proxy(this.uploadLoaded, this)), this.id;
		},
		uploadForm: function(f, name) {
			if (this.uploadOptions.input) {
				var formId = 'redactorUploadForm' + this.id,
					fileId = 'redactorUploadFile' + this.id;
				this.form = $('<form  action="' + this.uploadOptions.url + '" method="POST" target="' + name + '" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" />'), this.opts.uploadFields !== !1 && typeof this.opts.uploadFields === 'object' && $.each(this.opts.uploadFields, $.proxy(function(k, v) {
					v.toString().indexOf('#') === 0 && (v = $(v).val());
					var hidden = $('<input/>', {
						type: 'hidden',
						name: k,
						value: v
					});
					$(this.form).append(hidden);
				}, this));
				var oldElement = this.uploadOptions.input;
				var newElement = $(oldElement).clone();
				$(oldElement).attr('id', fileId).before(newElement).appendTo(this.form), $(this.form).css('position', 'absolute').css('top', '-2000px').css('left', '-2000px').appendTo('body'), this.form.submit();
			} else f.attr('target', name).attr('method', 'POST').attr('enctype', 'multipart/form-data').attr('action', this.uploadOptions.url), this.element.submit();
		},
		uploadLoaded: function() {
			var i = $('#' + this.id)[0],
				d;
			if (i.contentDocument ? d = i.contentDocument : i.contentWindow ? d = i.contentWindow.document : d = window.frames[this.id].document, this.uploadOptions.success)
				if ($('#redactor-progress').hide(), typeof d !== 'undefined') {
					var rawString = d.body.innerHTML;
					var jsonString = rawString.match(/\{(.|\n)*\}/)[0];
					jsonString = jsonString.replace(/^\[/, ''), jsonString = jsonString.replace(/\]$/, '');
					var json = $.parseJSON(jsonString);
					typeof json.error == 'undefined' ? this.uploadOptions.success(json) : (this.uploadOptions.error(this, json), this.modalClose());
				} else this.modalClose(), alert('Upload failed!');
			this.el.attr('action', this.element_action), this.el.attr('target', '');
		},
		draguploadInit: function(el, options) {
			if (this.draguploadOptions = $.extend({
				url: !1,
				success: !1,
				error: !1,
				preview: !1,
				uploadFields: !1,
				text: this.opts.curLang.drop_file_here,
				atext: this.opts.curLang.or_choose
			}, options), window.FormData === undefined) return !1;
			this.droparea = $('<div class="redactor_droparea"></div>'), this.dropareabox = $('<div class="redactor_dropareabox">' + this.draguploadOptions.text + '</div>'), this.dropalternative = $('<div class="redactor_dropalternative">' + this.draguploadOptions.atext + '</div>'), this.droparea.append(this.dropareabox), $(el).before(this.droparea), $(el).before(this.dropalternative), this.dropareabox.on('dragover', $.proxy(function() {
				return this.draguploadOndrag();
			}, this)), this.dropareabox.on('dragleave', $.proxy(function() {
				return this.draguploadOndragleave();
			}, this)), this.dropareabox.get(0).ondrop = $.proxy(function(e) {
				e.preventDefault(), this.dropareabox.removeClass('hover').addClass('drop'), this.draguploadUpload(e.dataTransfer.files[0]);
			}, this);
		},
		draguploadUpload: function(file) {
			var xhr = jQuery.ajaxSettings.xhr();
			xhr.upload && xhr.upload.addEventListener('progress', $.proxy(this.uploadProgress, this), !1);
			var provider = function() {
				return xhr;
			};
			var fd = new FormData();
			this.draguploadOptions.uploadFields !== !1 && typeof this.draguploadOptions.uploadFields === 'object' && $.each(this.draguploadOptions.uploadFields, $.proxy(function(k, v) {
				v.toString().indexOf('#') === 0 && (v = $(v).val()), fd.append(k, v);
			}, this)), fd.append('file', file), $.ajax({
				url: this.draguploadOptions.url,
				dataType: 'html',
				data: fd,
				xhr: provider,
				cache: !1,
				contentType: !1,
				processData: !1,
				type: 'POST',
				success: $.proxy(function(data) {
					data = data.replace(/^\[/, ''), data = data.replace(/\]$/, '');
					var json = $.parseJSON(data);
					typeof json.error == 'undefined' ? this.draguploadOptions.success(json) : (this.draguploadOptions.error(this, json), this.draguploadOptions.success(!1));
				}, this)
			});
		},
		draguploadOndrag: function() {
			return this.dropareabox.addClass('hover'), !1;
		},
		draguploadOndragleave: function() {
			return this.dropareabox.removeClass('hover'), !1;
		},
		uploadProgress: function(e, text) {
			var percent = e.loaded ? parseInt(e.loaded / e.total * 100, 10) : e;
			this.dropareabox.text('Loading ' + percent + '% ' + (text || ''));
		},
		isMobile: function() {
			return /(iPhone|iPod|BlackBerry|Android)/ .test(navigator.userAgent);
		},
		outerHtml: function(el) {
			return $('<div>').append($(el).eq(0).clone()).html();
		},
		isString: function(obj) {
			return Object.prototype.toString.call(obj) == '[object String]';
		},
		isEmpty: function(html) {
			return html = html.replace(/&#x200b;|<br>|<br\/>|&nbsp;/gi, ''), html = html.replace(/\s/g, ''), html = html.replace(/^<p>[^\w\d]*?<\/p>$/i, ''), html == '';
		},
		browser: function(browser) {
			var ua = navigator.userAgent.toLowerCase();
			var match = /(chrome)[ \/]([\w.]+)/ .exec(ua) || /(webkit)[ \/]([\w.]+)/ .exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/ .exec(ua) || /(msie) ([\w.]+)/ .exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/ .exec(ua) || [];
			return browser == 'version' ? match[2] : browser == 'webkit' ? match[1] == 'chrome' || match[1] == 'webkit' : match[1] == browser;
		},
		oldIE: function() {
			return this.browser('msie') && parseInt(this.browser('version'), 10) < 9 ? !0 : !1;
		},
		getFragmentHtml: function(fragment) {
			var cloned = fragment.cloneNode(!0);
			var div = this.document.createElement('div');
			return div.appendChild(cloned), div.innerHTML;
		},
		extractContent: function() {
			var node = this['$editor'][0];
			var frag = this.document.createDocumentFragment();
			var child;
			while (child = node.firstChild) frag.appendChild(child);
			return frag;
		},
		isParentRedactor: function(el) {
			return el ? this.opts.iframe ? el : $(el).parents('div.redactor_editor').length == 0 || $(el).hasClass('redactor_editor') ? !1 : el : !1;
		},
		currentOrParentIs: function(tagName) {
			var parent = this.getParent(),
				current = this.getCurrent();
			return parent && parent.tagName === tagName ? parent : current && current.tagName === tagName ? current : !1;
		},
		isEndOfElement: function() {
			var current = this.getBlock();
			var offset = this.getCaretOffset(current);
			var text = $.trim($(current).text()).replace(/\n\r\n/g, '');
			var len = text.length;
			return offset == len ? !0 : !1;
		},
		isFocused: function() {
			var el, sel = this.getSelection();
			return sel.rangeCount && sel.rangeCount > 0 && (el = sel.getRangeAt(0).startContainer), el ? this.opts.iframe ? this.getCaretOffsetRange().equals() ? !this['$editor'].is(el) : !0 : $(el).closest('div.redactor_editor').length != 0 : !1;
		},
		removeEmptyAttr: function(el, attr) {
			$(el).attr(attr) == '' && $(el).removeAttr(attr);
		},
		removeFromArrayByValue: function(array, value) {
			var index = null;
			while ((index = array.indexOf(value)) !== -1) array.splice(index, 1);
			return array;
		}
	}, Redactor.prototype.init.prototype = Redactor.prototype, $.Redactor.fn.formatLinkify = function(protocol) {
		var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
			url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g;
		var childNodes = (this['$editor'] ? this['$editor'].get(0) : this).childNodes,
			i = childNodes.length;
		while (i--) {
			var n = childNodes[i];
			if (n.nodeType === 3) {
				var html = n.nodeValue;
				html && (html.match(url1) || html.match(url2)) && (html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(url1, '$1<a href="' + protocol + '$2">$2</a>$3').replace(url2, '$1<a href="$2">$2</a>$5'), $(n).after(html).remove());
			} else n.nodeType === 1 && !/^(a|button|textarea)$/i .test(n.tagName) && $.Redactor.fn.formatLinkify.call(n, protocol);
		}
	};
}(jQuery));