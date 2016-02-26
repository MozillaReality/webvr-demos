(function () {

var body = document.body;

function initGoogleAnalytics (id) {
  (function (c, v, a, n) {
    c.GoogleAnalyticsObject = n;

    c[n] = c[n] || function () {
      (c[n].q = c[n].q || []).push(arguments);
    };
    c[n].l = 1 * new Date();

    var s = v.createElement('script');
    s.async = true;
    s.src = a;

    var m = v.getElementsByTagName('script')[0];
    m.parentNode.insertBefore(s, m);
  })(window, document, 'https://www.google-analytics.com/analytics.js', 'ga');
  window.ga('create', id, 'auto');
  window.ga('send', 'pageview');
}

function initGoogleAnalyticsEvents () {
  if (body.hasAttribute('data-index')) {
    body.addEventListener('click',  function (e) {
      var anchor = e.target.closest('a') || e.target;
      if (anchor.matches('.sites a')) {
        window.ga('send', 'event', 'click.demo', anchor.textContent);
      } else if (anchor.id === 'reset') {
        window.ga('send', 'event', 'click.reset', 'Reset Sensor');
      } else if (anchor) {
        window.ga('send', 'event', 'click.link', anchor.textContent);
      }
    });
  }

  window.ga('send', 'event', 'supports.getVRDevices', 'getVRDevices' in navigator);
  window.ga('send', 'event', 'supports.getVRDisplays', 'getVRDisplays' in navigator);
}

initGoogleAnalytics('UA-74058648-1');
initGoogleAnalyticsEvents();

})();
