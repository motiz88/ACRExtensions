// ==UserScript==
// @name            Amazon Cloud Reader extensions
// @description     A GreaseMonkey script that allows you to copy text from the Kindle Cloud reader
// @include         https://read.amazon.com/
// @grant			unsafeWindow
// @grant			GM_setClipboard
// ==/UserScript==

(function()
{
var installReaderContextMenu;

var locateReaderContextMenu = function()
{
	var w = null;
	if (typeof unsafeWindow.KindleReaderContextMenu !== 'undefined') {
		w = unsafeWindow;
	} else if (unsafeWindow.length) {
		for (var i=0;i<unsafeWindow.length;i++) {
			if (typeof unsafeWindow[i].KindleReaderContextMenu !== 'undefined') {
				w = unsafeWindow[i];
				break;
			}
		}
	}
	if (w === null)
	{
		window.setTimeout(locateReaderContextMenu,500);
	}
	else
	{
		installReaderContextMenu(w);
	}
}

installReaderContextMenu = function(w)
{
	var $ = unsafeWindow.$;


	var kDoc = null;
	var kObj = null;


	if (typeof w === 'object') {
		kObj = w.KindleReaderContextMenu;
		kDoc = w.document;

		if (typeof kObj.ACRExtensions === 'undefined') {
			kObj.ACRExtensions = true;
			var oldMethod = kObj.show;
			kObj.show = function () {
				var res = oldMethod.apply(kObj, arguments);
				var txtDoc = null;
				var r = null;

				if (typeof (arguments[3]) !== 'undefined' && typeof (arguments[3]['start']) !== 'undefined') {
					var sId = arguments[3]['start'];
					var eId = arguments[3]['end'];

					$('iframe', kDoc).each(function (j, textIframe) {
						var textIFrameDoc = $(textIframe).contents().get(0);
						if ($('#'+sId, textIFrameDoc).get(0)) {
							txtDoc = textIFrameDoc;
							return false;
						}
					});

					if (txtDoc) {
						r = txtDoc.createRange();
						r.setStartBefore($('#'+sId, txtDoc).get(0));
						r.setEndAfter($('#'+eId, txtDoc).get(0));
					}
				}

				$('#ACRExtensions_copyB_sep', kDoc).remove();
				$('#ACRExtensions_copyB', kDoc).remove();
				var sepEl = $('<div id="ACRExtensions_copyB_sep" class="kindle_menu_separator"></div>');
				var copyB = $('<div id="ACRExtensions_copyB" class="kindle_menu_button button_enabled ui-corner-left">Copy</div>');
				$('#kindle_menu_border', kDoc).append(sepEl).append(copyB);
				$('#ACRExtensions_copyB', kDoc).click(function (evt) {
					if (r) {
						var newW = window.open(null, null, "height=400,width=400,location=0,menubar=0,scrollbars=1,toolbar=0");
						newW.document.body.appendChild(r.cloneContents());
						GM_setClipboard(r.toString());
					}
				});

				return res;
			};

			alert('ACRExtensions is now active.');
		} else {
			alert('ACRExtensions is already active.');
		}
	} else {
		alert('Error: ACRExtensions is not active. The Amazon Cloud Reader window could not be found.');
	}
}

locateReaderContextMenu();
}) ();