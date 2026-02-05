const gtmScript = document.querySelector('script[data-analytics-type="gtm"]');
const gtmID = gtmScript.getAttribute('data-gtmid');
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', gtmID);