# ACRExtensions

Amazon Cloud Reader extensions

The Amazon Cloud Reader does not allow the user to copy text. And in the words of the Big Lebowski, _"this aggression will not stand, man!"_.

This script enables you easily copy the text you select in the Amazon Cloud Reader browser app to the clipboard.

Once activated, the script will create an extra Copy button in addition to Highlight and Note that will open the selected text in a popup window so the user can easily copy it and also keep the basic HTML formatting.

## Compatibility notes

Bookmarklet: Tested in Chrome and FF on Ubuntu, OSX and Windows. 
User script: Tested in FF on Windows. The script depends on Greasemonkey-specific features (especially unsafeWindow) and so does not work on Chrome.

The script (in both versions) uses document ranges so it may not work in all browsers especially IE.

## Browser Bookmarklet

In your browser do an "Add bookmark" action on the Bookmarks Bar and enter "ACRExtensions" for the name and copy and paste the bookmarklet code from the [raw source](https://raw.github.com/binarycrafts/ACRExtensions/master/bookmarklet/bookmarklet.js).

Once you have the bookmarklet set up you just need to click on it once right after the Amazon Cloud Read app is loaded.

Important note regarding the issue of the Copy button not showing up. This is pretty hard to reproduce but it still happens some times. The fix is to reload the browser page and click again on the bookmarklet button. It always works for me.

Source available in the bookmarklet folder.


## Greasemonkey User Script

In Firefox with Greasemonkey installed, open up ACRExtensions.user.js and click "Install Script".

The user script is compatible with the bookmarklet version; You can always still use the bookmarklet without disabling the user script first.