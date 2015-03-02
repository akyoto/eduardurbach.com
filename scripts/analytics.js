(function(window, document, variableName, scriptElement, firstScript) {
    window['GoogleAnalyticsObject'] = variableName;
    window[variableName] || (window[variableName] = function() {
      (window[variableName].q = window[variableName].q || []).push(arguments);
    });
    window[variableName].l = +new Date;
  }(window, document, 'ga'));

ga('create', 'UA-22786508-1', 'blitzprog.org');
ga('require', 'displayfeatures');
ga('send', 'pageview');