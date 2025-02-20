export function detectMobileOs(userAgent: string) {
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios'
  } else if (/android/i.test(userAgent)) {
    // Redirect to the Google Play Store
    return 'android'
  } else {
    return 'other'
  }
}

export function isInAppBrowser(userAgent: string) {
  // source1: https://gist.github.com/fostyfost/0591c79f4cd7ca26e5941a53fd4bf1a4
  // source2: https://gist.github.com/monkianer/c163651c86897d744f10
  const rules = [
    // If it says it's a webview, let's go with that.
    'WebView',
    // iOS webview will be the same as safari but missing "Safari".
    '(iPhone|iPod|iPad)(?!.*Safari)',
    // https://developer.chrome.com/docs/multidevice/user-agent/#webview_user_agent
    'Android.*Version/[0-9].[0-9]',
    // Also, we should save the wv detected for Lollipop.
    // Android Lollipop and Above: webview will be the same as native,
    // but it will contain "wv".
    'Android.*wv',
    // Old chrome android webview agent
    'Linux; U; Android',
    // Facebook app in-app browser
    'FBAV',
    // Line app in-app browser
    'Line',
  ]
  const regex = new RegExp(`(${rules.join('|')})`, 'ig')
  return regex.test(userAgent)
}
