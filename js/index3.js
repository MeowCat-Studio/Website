var t, dealEnds;

$(document).on('ready',function(){

/****************************************
  ==== HERO
****************************************/

  // Init
  frontpageHeader();

  if(!touch){
    $('div.video iframe').attr('src',$('div.video iframe').attr('data-src'));
    setTimeout(function(){
      $('div.video iframe').removeClass('hidden');
      $('.hero .gw').removeClass('hidden');
    }, 1000);
  }
  else {
    $('.hero-background').parallax({
      scalarX: 7.5,
      scalarY: 15,
      frictionX: 0.1,
      frictionY: 0.1,
      originX: 0,
      originY: 0
    });
    $('.hero .gw').removeClass('hidden');
  }

  $(window).on('resize', function() {
    // Throttling the resize function every 500ms
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
      frontpageHeader();
      eventFix();
    }, 500);
  });

/****************************************
  ==== BLOG FEED
****************************************/

  if(lang == 'jp'){
    $.get(ja_blogfeed, function(data, textStatus) {
      if(textStatus == 'success'){

        var posts = $(data).find('item').get(),
            months = ['','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
            postHtml = '';

        $(posts).each(function(i,post){

          if(i == 3) return false;

          var pubDate = new Date(post.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue),
              month = months[pubDate.getMonth() + 1],
              day = pubDate.getDate(),
              year = pubDate.getFullYear(),
              description = $.parseHTML(post.getElementsByTagName('description')[0].childNodes[0].nodeValue),
              img = description[0].getElementsByTagName('img')[0].getAttribute("src"),
              html = '';

          postHtml += '<div class="g12 post pb0 pt0">';
          postHtml +=   '<a href="'+ post.getElementsByTagName('link')[0].childNodes[0].nodeValue +'" class="clear c-dg txt-tdn">';
          postHtml +=     '<img src="'+ img +'" />';
          postHtml +=     '<small class="b txt-upper">'+ month +' '+ day +', '+ year +'</small>';
          postHtml +=     '<h4 class="mb0 txt-ellipsis" title="'+ post.getElementsByTagName('title')[0].childNodes[0].nodeValue +'">'+ post.getElementsByTagName('title')[0].childNodes[0].nodeValue +'</h4>';
          postHtml +=   '</a>';
          postHtml += '</div>';
          postHtml += '<div class="g12 pb0 pt0"><div class="bb clear"></div></div>';

        });

        $('#blog-posts-ja').html(postHtml);
        eventFix();

      }
    },'xml');
  }
  else {
    $.get(blogfeed, function(data, textStatus) {
      
      var posts = $(data).find('item').get();
      if (posts) {
        var months = ['','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
            postHtml = '';

        $(posts).each(function(i,post){

          if(i == 3) return false;

          var pubDate = new Date(post.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue),
              month   = months[pubDate.getMonth() + 1],
              day     = pubDate.getDate(),
              year    = pubDate.getFullYear(),
              excerpt = post.getElementsByTagName('description')[0].childNodes[0].nodeValue.slice(0,110) + '...',
              title   = post.getElementsByTagName('title')[0].childNodes[0].nodeValue.replace('(English) ','');

          postHtml += '' +
            '<div class="g12 post pb0 pt0">' +
              '<a href="'+ post.getElementsByTagName('link')[0].childNodes[0].nodeValue +'" class="clear c-dg txt-tdn">' +
                '<img src="'+ post.getElementsByTagName('image')[0].childNodes[0].nodeValue +'" />' +
                '<small class="b txt-upper">'+ month +' '+ day +', '+ year +'</small>' +
                '<h4 class="mb0 txt-ellipsis" title="'+ title +'">'+ title +'</h4>' +
              '</a>' +
            '</div>' +
            '<div class="g12 pb0 pt0"><div class="bb clear"></div></div>';

        });

        $('#blog-posts').html(postHtml);
        eventFix();
      }

    },'xml');
  }

/****************************************
  ==== 24H DEALS
****************************************/

  if($('.promo .as-24h').size() > 0){

    $.getJSON(dailyFeed, function(data, textStatus){
      if(textStatus == 'success') {

        var $parent = $('.promo .as-24h').parent().parent();


        var html = '';
        html += '<div class="digit"><div class="time hours"></div><div class="lbl">Hrs</div></div>';
        html += '<div class="digit"><div class="sep">:</div></div>';
        html += '<div class="digit"><div class="time minutes"></div><div class="lbl">Min</div></div>';
        html += '<div class="digit"><div class="sep">:</div></div>';
        html += '<div class="digit"><div class="time seconds"></div><div class="lbl">Sec</div></div>';


        var asHtml = '';
        asHtml += '<span>'+ data.daily.title +'<br><span class="b c-db">$' + data.daily.price['USD'] +' <s class="c-mg nb">$' + data.daily.price_original['USD'] +'</s></span></span>';

        /* $parent.find('.image-wrap').append('<div class="countdown">'+ html +'</div>'); */
        $parent.find('h4').html(asHtml);

        startCountdown();

      }
    });

  }

/****************************************
  ==== GA: CLICK EVENTS
****************************************/

  $('.promo a').click(function(){
    var label = $(this).find('.image').attr('data-label');
    _gaq.push(['_trackEvent', 'Frontpage tiles', label]);
  });

  $('.careers-banner a').click(function(){
    _gaq.push(['_trackEvent', 'Frontpage', 'Job promo']);
  });

/****************************************
  ==== SLIDERS
****************************************/

  $('.promos').on('init', function() {
    var $this = $(this),
        $arrows = $('.slick-arrow',$this);

    $arrows.css('opacity', '0');
    setTimeout(function(){
      if($arrows.css('opacity') !== '1') $arrows.css('opacity', '1');
      fixPromoArrows($this);
    }, 500)
  });
  $('.mwu').on('init', function() {
    var $this = $(this),
        $arrows = $('.slick-arrow',$this);

    $arrows.css('opacity', '0');
    setTimeout(function(){
      if($arrows.css('opacity') !== '1') $arrows.css('opacity', '1');
      fixPromoArrows($this);
    }, 500)
  });

  $(window).on('resize', function() {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
      fixPromoArrows($('.promos'));
      fixPromoArrows($('.mwu'));
    }, 500);
  });

  $('.promos').slick({
    centerPadding: '0px', slidesToShow: 4, slidesToScroll: 1, centerMode: false, dots: true, autoplay: true, autoplaySpeed: 4000, lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1600, settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1280, settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600, settings: { slidesToShow: 1 }
      }
    ]
  });

  $('.mwu').slick({
    centerPadding: '0px', slidesToShow: 3, slidesToScroll: 1, centerMode: true, dots: true, autoplay: false, autoplaySpeed: 4000, lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 1280,
      settings: { slidesToShow: 2, slidesToScroll: 1 }
    },{
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1, dots: false }
    }]
  });

});

/****************************************
  ==== FUNCTIONS
****************************************/

function frontpageHeader(){

  var $header = $('.main-header'),
      $hero = $('.hero'),
      $iframe = $('iframe',$hero),
      heroH = $hero.outerHeight(true),
      headerH = $header.outerHeight(true),
      heroTotal = heroH + headerH + 150,
      iframeH = heroTotal,
      iframeW = iframeH * 1.5625;

  if(iframeW < getWidth()){
    iframeW = getWidth();
    iframeH = iframeW * 0.5625;
  }

  $iframe.width(iframeW).height(iframeH);
}

function eventFix(){

  var $event = $('.next-event'),
      $posts = $('.blog-posts .post'),
      eventH = $('.wrap',$event).height(),
      postsH = 0,
      pad = parseInt($event.parent().css('padding')) * 2;

  $posts.each(function(i,p){
    postsH += $(this).outerHeight(true);
  });

  postsH = postsH - eventH - pad + 2;

  $event.css({ 'padding-top' : postsH / 2, 'padding-bottom' : postsH / 2 })

}

function startCountdown(){
  dealEnds = getEndDate();
  countdown();
  t = setInterval(countdown, 1000);
}

function countdown(){

  var end = moment.utc(dealEnds),
      timeleft = end.format('X') - moment.utc().format('X'),
      diff = moment.duration(timeleft, 'seconds');

  if(timeleft < 0){
    $('.daily-deal .loading').show();
    clearInterval(t);
    startCountdown();
    return;
  }
  else {
    $('.not-live').removeClass('hide');
  }

  $('.hours').text(zero(Math.floor(diff.asHours())));
  $('.minutes').text(zero(diff.minutes()));
  $('.seconds').text(zero(diff.seconds()));

}

function zero(number) {
  return (number < 10 ? '0' : '') + number  
}

function getEndDate(){

  var now = new Date();
      now = moment(now).utc();

  var end = new Date();
      end = moment(end).utc().hour(13).minute(0).second(0);

  if(now > end){
    end.date(now.date()+1);
  }
  return end;

}

/****************************************
  ==== PLUGINS
****************************************/

// moment.js // version : 2.1.0 // author : Tim Wood // license : MIT // momentjs.com
!function(t){function e(t,e){return function(n){return u(t.call(this,n),e)}}function n(t,e){return function(n){return this.lang().ordinal(t.call(this,n),e)}}function s(){}function i(t){a(this,t)}function r(t){var e=t.years||t.year||t.y||0,n=t.months||t.month||t.M||0,s=t.weeks||t.week||t.w||0,i=t.days||t.day||t.d||0,r=t.hours||t.hour||t.h||0,a=t.minutes||t.minute||t.m||0,o=t.seconds||t.second||t.s||0,u=t.milliseconds||t.millisecond||t.ms||0;this._input=t,this._milliseconds=u+1e3*o+6e4*a+36e5*r,this._days=i+7*s,this._months=n+12*e,this._data={},this._bubble()}function a(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function o(t){return 0>t?Math.ceil(t):Math.floor(t)}function u(t,e){for(var n=t+"";n.length<e;)n="0"+n;return n}function h(t,e,n,s){var i,r,a=e._milliseconds,o=e._days,u=e._months;a&&t._d.setTime(+t._d+a*n),(o||u)&&(i=t.minute(),r=t.hour()),o&&t.date(t.date()+o*n),u&&t.month(t.month()+u*n),a&&!s&&H.updateOffset(t),(o||u)&&(t.minute(i),t.hour(r))}function d(t){return"[object Array]"===Object.prototype.toString.call(t)}function c(t,e){var n,s=Math.min(t.length,e.length),i=Math.abs(t.length-e.length),r=0;for(n=0;s>n;n++)~~t[n]!==~~e[n]&&r++;return r+i}function f(t){return t?ie[t]||t.toLowerCase().replace(/(.)s$/,"$1"):t}function l(t,e){return e.abbr=t,x[t]||(x[t]=new s),x[t].set(e),x[t]}function _(t){if(!t)return H.fn._lang;if(!x[t]&&A)try{require("./lang/"+t)}catch(e){return H.fn._lang}return x[t]}function m(t){return t.match(/\[.*\]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"")}function y(t){var e,n,s=t.match(E);for(e=0,n=s.length;n>e;e++)s[e]=ue[s[e]]?ue[s[e]]:m(s[e]);return function(i){var r="";for(e=0;n>e;e++)r+=s[e]instanceof Function?s[e].call(i,t):s[e];return r}}function M(t,e){function n(e){return t.lang().longDateFormat(e)||e}for(var s=5;s--&&N.test(e);)e=e.replace(N,n);return re[e]||(re[e]=y(e)),re[e](t)}function g(t,e){switch(t){case"DDDD":return V;case"YYYY":return X;case"YYYYY":return $;case"S":case"SS":case"SSS":case"DDD":return I;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return R;case"a":case"A":return _(e._l)._meridiemParse;case"X":return B;case"Z":case"ZZ":return j;case"T":return q;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return J;default:return new RegExp(t.replace("\\",""))}}function p(t){var e=(j.exec(t)||[])[0],n=(e+"").match(ee)||["-",0,0],s=+(60*n[1])+~~n[2];return"+"===n[0]?-s:s}function D(t,e,n){var s,i=n._a;switch(t){case"M":case"MM":i[1]=null==e?0:~~e-1;break;case"MMM":case"MMMM":s=_(n._l).monthsParse(e),null!=s?i[1]=s:n._isValid=!1;break;case"D":case"DD":case"DDD":case"DDDD":null!=e&&(i[2]=~~e);break;case"YY":i[0]=~~e+(~~e>68?1900:2e3);break;case"YYYY":case"YYYYY":i[0]=~~e;break;case"a":case"A":n._isPm=_(n._l).isPM(e);break;case"H":case"HH":case"h":case"hh":i[3]=~~e;break;case"m":case"mm":i[4]=~~e;break;case"s":case"ss":i[5]=~~e;break;case"S":case"SS":case"SSS":i[6]=~~(1e3*("0."+e));break;case"X":n._d=new Date(1e3*parseFloat(e));break;case"Z":case"ZZ":n._useUTC=!0,n._tzm=p(e)}null==e&&(n._isValid=!1)}function Y(t){var e,n,s=[];if(!t._d){for(e=0;7>e;e++)t._a[e]=s[e]=null==t._a[e]?2===e?1:0:t._a[e];s[3]+=~~((t._tzm||0)/60),s[4]+=~~((t._tzm||0)%60),n=new Date(0),t._useUTC?(n.setUTCFullYear(s[0],s[1],s[2]),n.setUTCHours(s[3],s[4],s[5],s[6])):(n.setFullYear(s[0],s[1],s[2]),n.setHours(s[3],s[4],s[5],s[6])),t._d=n}}function w(t){var e,n,s=t._f.match(E),i=t._i;for(t._a=[],e=0;e<s.length;e++)n=(g(s[e],t).exec(i)||[])[0],n&&(i=i.slice(i.indexOf(n)+n.length)),ue[s[e]]&&D(s[e],n,t);i&&(t._il=i),t._isPm&&t._a[3]<12&&(t._a[3]+=12),t._isPm===!1&&12===t._a[3]&&(t._a[3]=0),Y(t)}function k(t){var e,n,s,r,o,u=99;for(r=0;r<t._f.length;r++)e=a({},t),e._f=t._f[r],w(e),n=new i(e),o=c(e._a,n.toArray()),n._il&&(o+=n._il.length),u>o&&(u=o,s=n);a(t,s)}function v(t){var e,n=t._i,s=K.exec(n);if(s){for(t._f="YYYY-MM-DD"+(s[2]||" "),e=0;4>e;e++)if(te[e][1].exec(n)){t._f+=te[e][0];break}j.exec(n)&&(t._f+=" Z"),w(t)}else t._d=new Date(n)}function T(e){var n=e._i,s=G.exec(n);n===t?e._d=new Date:s?e._d=new Date(+s[1]):"string"==typeof n?v(e):d(n)?(e._a=n.slice(0),Y(e)):e._d=n instanceof Date?new Date(+n):new Date(n)}function b(t,e,n,s,i){return i.relativeTime(e||1,!!n,t,s)}function S(t,e,n){var s=W(Math.abs(t)/1e3),i=W(s/60),r=W(i/60),a=W(r/24),o=W(a/365),u=45>s&&["s",s]||1===i&&["m"]||45>i&&["mm",i]||1===r&&["h"]||22>r&&["hh",r]||1===a&&["d"]||25>=a&&["dd",a]||45>=a&&["M"]||345>a&&["MM",W(a/30)]||1===o&&["y"]||["yy",o];return u[2]=e,u[3]=t>0,u[4]=n,b.apply({},u)}function F(t,e,n){var s,i=n-e,r=n-t.day();return r>i&&(r-=7),i-7>r&&(r+=7),s=H(t).add("d",r),{week:Math.ceil(s.dayOfYear()/7),year:s.year()}}function O(t){var e=t._i,n=t._f;return null===e||""===e?null:("string"==typeof e&&(t._i=e=_().preparse(e)),H.isMoment(e)?(t=a({},e),t._d=new Date(+e._d)):n?d(n)?k(t):w(t):T(t),new i(t))}function z(t,e){H.fn[t]=H.fn[t+"s"]=function(t){var n=this._isUTC?"UTC":"";return null!=t?(this._d["set"+n+e](t),H.updateOffset(this),this):this._d["get"+n+e]()}}function C(t){H.duration.fn[t]=function(){return this._data[t]}}function L(t,e){H.duration.fn["as"+t]=function(){return+this/e}}for(var H,P,U="2.1.0",W=Math.round,x={},A="undefined"!=typeof module&&module.exports,G=/^\/?Date\((\-?\d+)/i,Z=/(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/,E=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,N=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,J=/\d\d?/,I=/\d{1,3}/,V=/\d{3}/,X=/\d{1,4}/,$=/[+\-]?\d{1,6}/,R=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,j=/Z|[\+\-]\d\d:?\d\d/i,q=/T/i,B=/[\+\-]?\d+(\.\d{1,3})?/,K=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,Q="YYYY-MM-DDTHH:mm:ssZ",te=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],ee=/([\+\-]|\d\d)/gi,ne="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),se={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},ie={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",w:"week",M:"month",y:"year"},re={},ae="DDD w W M D d".split(" "),oe="M D H h m s w W".split(" "),ue={M:function(){return this.month()+1},MMM:function(t){return this.lang().monthsShort(this,t)},MMMM:function(t){return this.lang().months(this,t)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(t){return this.lang().weekdaysMin(this,t)},ddd:function(t){return this.lang().weekdaysShort(this,t)},dddd:function(t){return this.lang().weekdays(this,t)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return u(this.year()%100,2)},YYYY:function(){return u(this.year(),4)},YYYYY:function(){return u(this.year(),5)},gg:function(){return u(this.weekYear()%100,2)},gggg:function(){return this.weekYear()},ggggg:function(){return u(this.weekYear(),5)},GG:function(){return u(this.isoWeekYear()%100,2)},GGGG:function(){return this.isoWeekYear()},GGGGG:function(){return u(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return u(~~(this.milliseconds()/10),2)},SSS:function(){return u(this.milliseconds(),3)},Z:function(){var t=-this.zone(),e="+";return 0>t&&(t=-t,e="-"),e+u(~~(t/60),2)+":"+u(~~t%60,2)},ZZ:function(){var t=-this.zone(),e="+";return 0>t&&(t=-t,e="-"),e+u(~~(10*t/6),4)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()}};ae.length;)P=ae.pop(),ue[P+"o"]=n(ue[P],P);for(;oe.length;)P=oe.pop(),ue[P+P]=e(ue[P],2);for(ue.DDDD=e(ue.DDD,3),s.prototype={set:function(t){var e,n;for(n in t)e=t[n],"function"==typeof e?this[n]=e:this["_"+n]=e},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(t){return this._months[t.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(t){return this._monthsShort[t.month()]},monthsParse:function(t){var e,n,s;for(this._monthsParse||(this._monthsParse=[]),e=0;12>e;e++)if(this._monthsParse[e]||(n=H([2e3,e]),s="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[e]=new RegExp(s.replace(".",""),"i")),this._monthsParse[e].test(t))return e},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(t){return this._weekdays[t.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(t){return this._weekdaysShort[t.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(t){return this._weekdaysMin[t.day()]},weekdaysParse:function(t){var e,n,s;for(this._weekdaysParse||(this._weekdaysParse=[]),e=0;7>e;e++)if(this._weekdaysParse[e]||(n=H([2e3,1]).day(e),s="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[e]=new RegExp(s.replace(".",""),"i")),this._weekdaysParse[e].test(t))return e},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(t){var e=this._longDateFormat[t];return!e&&this._longDateFormat[t.toUpperCase()]&&(e=this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t]=e),e},isPM:function(t){return"p"===(t+"").toLowerCase()[0]},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(t,e,n){return t>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(t,e){var n=this._calendar[t];return"function"==typeof n?n.apply(e):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(t,e,n,s){var i=this._relativeTime[n];return"function"==typeof i?i(t,e,n,s):i.replace(/%d/i,t)},pastFuture:function(t,e){var n=this._relativeTime[t>0?"future":"past"];return"function"==typeof n?n(e):n.replace(/%s/i,e)},ordinal:function(t){return this._ordinal.replace("%d",t)},_ordinal:"%d",preparse:function(t){return t},postformat:function(t){return t},week:function(t){return F(t,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6}},H=function(t,e,n){return O({_i:t,_f:e,_l:n,_isUTC:!1})},H.utc=function(t,e,n){return O({_useUTC:!0,_isUTC:!0,_l:n,_i:t,_f:e})},H.unix=function(t){return H(1e3*t)},H.duration=function(t,e){var n,s,i=H.isDuration(t),a="number"==typeof t,o=i?t._input:a?{}:t,u=Z.exec(t);return a?e?o[e]=t:o.milliseconds=t:u&&(n="-"===u[1]?-1:1,o={y:0,d:~~u[2]*n,h:~~u[3]*n,m:~~u[4]*n,s:~~u[5]*n,ms:~~u[6]*n}),s=new r(o),i&&t.hasOwnProperty("_lang")&&(s._lang=t._lang),s},H.version=U,H.defaultFormat=Q,H.updateOffset=function(){},H.lang=function(t,e){return t?(e?l(t,e):x[t]||_(t),H.duration.fn._lang=H.fn._lang=_(t),void 0):H.fn._lang._abbr},H.langData=function(t){return t&&t._lang&&t._lang._abbr&&(t=t._lang._abbr),_(t)},H.isMoment=function(t){return t instanceof i},H.isDuration=function(t){return t instanceof r},H.fn=i.prototype={clone:function(){return H(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){return M(H(this).utc(),"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var t=this;return[t.year(),t.month(),t.date(),t.hours(),t.minutes(),t.seconds(),t.milliseconds()]},isValid:function(){return null==this._isValid&&(this._isValid=this._a?!c(this._a,(this._isUTC?H.utc(this._a):H(this._a)).toArray()):!isNaN(this._d.getTime())),!!this._isValid},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(t){var e=M(this,t||H.defaultFormat);return this.lang().postformat(e)},add:function(t,e){var n;return n="string"==typeof t?H.duration(+e,t):H.duration(t,e),h(this,n,1),this},subtract:function(t,e){var n;return n="string"==typeof t?H.duration(+e,t):H.duration(t,e),h(this,n,-1),this},diff:function(t,e,n){var s,i,r=this._isUTC?H(t).zone(this._offset||0):H(t).local(),a=6e4*(this.zone()-r.zone());return e=f(e),"year"===e||"month"===e?(s=432e5*(this.daysInMonth()+r.daysInMonth()),i=12*(this.year()-r.year())+(this.month()-r.month()),i+=(this-H(this).startOf("month")-(r-H(r).startOf("month")))/s,i-=6e4*(this.zone()-H(this).startOf("month").zone()-(r.zone()-H(r).startOf("month").zone()))/s,"year"===e&&(i/=12)):(s=this-r,i="second"===e?s/1e3:"minute"===e?s/6e4:"hour"===e?s/36e5:"day"===e?(s-a)/864e5:"week"===e?(s-a)/6048e5:s),n?i:o(i)},from:function(t,e){return H.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)},fromNow:function(t){return this.from(H(),t)},calendar:function(){var t=this.diff(H().startOf("day"),"days",!0),e=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";return this.format(this.lang().calendar(e,this))},isLeapYear:function(){var t=this.year();return 0===t%4&&0!==t%100||0===t%400},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(t){var e=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=t?"string"==typeof t&&(t=this.lang().weekdaysParse(t),"number"!=typeof t)?this:this.add({d:t-e}):e},month:function(t){var e,n=this._isUTC?"UTC":"";return null!=t?"string"==typeof t&&(t=this.lang().monthsParse(t),"number"!=typeof t)?this:(e=this.date(),this.date(1),this._d["set"+n+"Month"](t),this.date(Math.min(e,this.daysInMonth())),H.updateOffset(this),this):this._d["get"+n+"Month"]()},startOf:function(t){switch(t=f(t)){case"year":this.month(0);case"month":this.date(1);case"week":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===t&&this.weekday(0),this},endOf:function(t){return this.startOf(t).add(t,1).subtract("ms",1)},isAfter:function(t,e){return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)>+H(t).startOf(e)},isBefore:function(t,e){return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)<+H(t).startOf(e)},isSame:function(t,e){return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)===+H(t).startOf(e)},min:function(t){return t=H.apply(null,arguments),this>t?this:t},max:function(t){return t=H.apply(null,arguments),t>this?this:t},zone:function(t){var e=this._offset||0;return null==t?this._isUTC?e:this._d.getTimezoneOffset():("string"==typeof t&&(t=p(t)),Math.abs(t)<16&&(t=60*t),this._offset=t,this._isUTC=!0,e!==t&&h(this,H.duration(e-t,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},daysInMonth:function(){return H.utc([this.year(),this.month()+1,0]).date()},dayOfYear:function(t){var e=W((H(this).startOf("day")-H(this).startOf("year"))/864e5)+1;return null==t?e:this.add("d",t-e)},weekYear:function(t){var e=F(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==t?e:this.add("y",t-e)},isoWeekYear:function(t){var e=F(this,1,4).year;return null==t?e:this.add("y",t-e)},week:function(t){var e=this.lang().week(this);return null==t?e:this.add("d",7*(t-e))},isoWeek:function(t){var e=F(this,1,4).week;return null==t?e:this.add("d",7*(t-e))},weekday:function(t){var e=(this._d.getDay()+7-this.lang()._week.dow)%7;return null==t?e:this.add("d",t-e)},isoWeekday:function(t){return null==t?this.day()||7:this.day(this.day()%7?t:t-7)},lang:function(e){return e===t?this._lang:(this._lang=_(e),this)}},P=0;P<ne.length;P++)z(ne[P].toLowerCase().replace(/s$/,""),ne[P]);z("year","FullYear"),H.fn.days=H.fn.day,H.fn.months=H.fn.month,H.fn.weeks=H.fn.week,H.fn.isoWeeks=H.fn.isoWeek,H.fn.toJSON=H.fn.toISOString,H.duration.fn=r.prototype={_bubble:function(){var t,e,n,s,i=this._milliseconds,r=this._days,a=this._months,u=this._data;u.milliseconds=i%1e3,t=o(i/1e3),u.seconds=t%60,e=o(t/60),u.minutes=e%60,n=o(e/60),u.hours=n%24,r+=o(n/24),u.days=r%30,a+=o(r/30),u.months=a%12,s=o(a/12),u.years=s},weeks:function(){return o(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+2592e6*(this._months%12)+31536e6*~~(this._months/12)},humanize:function(t){var e=+this,n=S(e,!t,this.lang());return t&&(n=this.lang().pastFuture(e,n)),this.lang().postformat(n)},add:function(t,e){var n=H.duration(t,e);return this._milliseconds+=n._milliseconds,this._days+=n._days,this._months+=n._months,this._bubble(),this},subtract:function(t,e){var n=H.duration(t,e);return this._milliseconds-=n._milliseconds,this._days-=n._days,this._months-=n._months,this._bubble(),this},get:function(t){return t=f(t),this[t.toLowerCase()+"s"]()},as:function(t){return t=f(t),this["as"+t.charAt(0).toUpperCase()+t.slice(1)+"s"]()},lang:H.fn.lang};for(P in se)se.hasOwnProperty(P)&&(L(P,se[P]),C(P.toLowerCase()));L("Weeks",6048e5),H.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},H.lang("en",{ordinal:function(t){var e=t%10,n=1===~~(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th";return t+n}}),A&&(module.exports=H),"undefined"==typeof ender&&(this.moment=H),"function"==typeof define&&define.amd&&define("moment",[],function(){return H})}.call(this);

/**
 * jQuery || Zepto Parallax Plugin
 * @author Matthew Wagerfield - @wagerfield
 * @description Creates a parallax effect between an array of layers, driving the motion from the gyroscope output of a smartdevice. If no gyroscope is available, the cursor position is used.
 * @git https://github.com/wagerfield/parallax
 */
!function(a,b,c,d){"use strict";function h(b,c){this.element=b,this.$context=a(b).data("api",this),this.$layers=this.$context.find(".layer");var d={calibrateX:this.$context.data("calibrate-x")||null,calibrateY:this.$context.data("calibrate-y")||null,invertX:this.$context.data("invert-x")||null,invertY:this.$context.data("invert-y")||null,limitX:parseFloat(this.$context.data("limit-x"))||null,limitY:parseFloat(this.$context.data("limit-y"))||null,scalarX:parseFloat(this.$context.data("scalar-x"))||null,scalarY:parseFloat(this.$context.data("scalar-y"))||null,frictionX:parseFloat(this.$context.data("friction-x"))||null,frictionY:parseFloat(this.$context.data("friction-y"))||null,originX:parseFloat(this.$context.data("origin-x"))||null,originY:parseFloat(this.$context.data("origin-y"))||null};for(var e in d)null===d[e]&&delete d[e];a.extend(this,g,c,d),this.calibrationTimer=null,this.calibrationFlag=!0,this.enabled=!1,this.depths=[],this.raf=null,this.bounds=null,this.ex=0,this.ey=0,this.ew=0,this.eh=0,this.ecx=0,this.ecy=0,this.erx=0,this.ery=0,this.cx=0,this.cy=0,this.ix=0,this.iy=0,this.mx=0,this.my=0,this.vx=0,this.vy=0,this.onMouseMove=this.onMouseMove.bind(this),this.onDeviceOrientation=this.onDeviceOrientation.bind(this),this.onOrientationTimer=this.onOrientationTimer.bind(this),this.onCalibrationTimer=this.onCalibrationTimer.bind(this),this.onAnimationFrame=this.onAnimationFrame.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.initialise()}var e="parallax",f=30,g={relativeInput:!1,clipRelativeInput:!1,calibrationThreshold:100,calibrationDelay:500,supportDelay:500,calibrateX:!1,calibrateY:!0,invertX:!0,invertY:!0,limitX:!1,limitY:!1,scalarX:10,scalarY:10,frictionX:.1,frictionY:.1,originX:.5,originY:.5};h.prototype.transformSupport=function(a){for(var e=c.createElement("div"),f=!1,g=null,h=!1,i=null,j=null,k=0,l=this.vendors.length;k<l;k++)if(null!==this.vendors[k]?(i=this.vendors[k][0]+"transform",j=this.vendors[k][1]+"Transform"):(i="transform",j="transform"),e.style[j]!==d){f=!0;break}switch(a){case"2D":h=f;break;case"3D":if(f){var m=c.body||c.createElement("body"),n=c.documentElement,o=n.style.overflow,p=!1;c.body||(p=!0,n.style.overflow="hidden",n.appendChild(m),m.style.overflow="hidden",m.style.background=""),m.appendChild(e),e.style[j]="translate3d(1px,1px,1px)",g=b.getComputedStyle(e).getPropertyValue(i),h=g!==d&&g.length>0&&"none"!==g,n.style.overflow=o,m.removeChild(e),p&&(m.removeAttribute("style"),m.parentNode.removeChild(m))}}return h},h.prototype.ww=null,h.prototype.wh=null,h.prototype.wcx=null,h.prototype.wcy=null,h.prototype.wrx=null,h.prototype.wry=null,h.prototype.portrait=null,h.prototype.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),h.prototype.vendors=[null,["-webkit-","webkit"],["-moz-","Moz"],["-o-","O"],["-ms-","ms"]],h.prototype.motionSupport=!!b.DeviceMotionEvent,h.prototype.orientationSupport=!!b.DeviceOrientationEvent,h.prototype.orientationStatus=0,h.prototype.transform2DSupport=h.prototype.transformSupport("2D"),h.prototype.transform3DSupport=h.prototype.transformSupport("3D"),h.prototype.propertyCache={},h.prototype.initialise=function(){"static"===this.$context.css("position")&&this.$context.css({position:"relative"}),this.accelerate(this.$context),this.updateLayers(),this.updateDimensions(),this.enable(),this.queueCalibration(this.calibrationDelay)},h.prototype.updateLayers=function(){this.$layers=this.$context.find(".layer"),this.depths=[],this.$layers.css({position:"relative",display:"block",left:0}),this.$layers.first().css({position:"absolute"}),this.accelerate(this.$layers),this.$layers.each(a.proxy(function(b,c){this.depths.push(a(c).data("depth")||0)},this))},h.prototype.updateDimensions=function(){this.ww=b.innerWidth,this.wh=b.innerHeight,this.wcx=this.ww*this.originX,this.wcy=this.wh*this.originY,this.wrx=Math.max(this.wcx,this.ww-this.wcx),this.wry=Math.max(this.wcy,this.wh-this.wcy)},h.prototype.updateBounds=function(){this.bounds=this.element.getBoundingClientRect(),this.ex=this.bounds.left,this.ey=this.bounds.top,this.ew=this.bounds.width,this.eh=this.bounds.height,this.ecx=this.ew*this.originX,this.ecy=this.eh*this.originY,this.erx=Math.max(this.ecx,this.ew-this.ecx),this.ery=Math.max(this.ecy,this.eh-this.ecy)},h.prototype.queueCalibration=function(a){clearTimeout(this.calibrationTimer),this.calibrationTimer=setTimeout(this.onCalibrationTimer,a)},h.prototype.enable=function(){this.enabled||(this.enabled=!0,this.orientationSupport?(this.portrait=null,this.$context.attr("data-mode","orientation"),b.addEventListener("deviceorientation",this.onDeviceOrientation),setTimeout(this.onOrientationTimer,this.supportDelay)):(this.cx=0,this.cy=0,this.portrait=!1,this.$context.attr("data-mode","cursor"),b.addEventListener("mousemove",this.onMouseMove)),b.addEventListener("resize",this.onWindowResize),this.raf=requestAnimationFrame(this.onAnimationFrame))},h.prototype.disable=function(){this.enabled&&(this.enabled=!1,this.orientationSupport?b.removeEventListener("deviceorientation",this.onDeviceOrientation):b.removeEventListener("mousemove",this.onMouseMove),b.removeEventListener("resize",this.onWindowResize),cancelAnimationFrame(this.raf))},h.prototype.calibrate=function(a,b){this.calibrateX=a===d?this.calibrateX:a,this.calibrateY=b===d?this.calibrateY:b},h.prototype.invert=function(a,b){this.invertX=a===d?this.invertX:a,this.invertY=b===d?this.invertY:b},h.prototype.friction=function(a,b){this.frictionX=a===d?this.frictionX:a,this.frictionY=b===d?this.frictionY:b},h.prototype.scalar=function(a,b){this.scalarX=a===d?this.scalarX:a,this.scalarY=b===d?this.scalarY:b},h.prototype.limit=function(a,b){this.limitX=a===d?this.limitX:a,this.limitY=b===d?this.limitY:b},h.prototype.origin=function(a,b){this.originX=a===d?this.originX:a,this.originY=b===d?this.originY:b},h.prototype.clamp=function(a,b,c){return a=Math.max(a,b),a=Math.min(a,c)},h.prototype.css=function(b,c,e){var f=this.propertyCache[c];if(!f)for(var g=0,h=this.vendors.length;g<h;g++)if(f=null!==this.vendors[g]?a.camelCase(this.vendors[g][1]+"-"+c):c,b.style[f]!==d){this.propertyCache[c]=f;break}b.style[f]=e},h.prototype.accelerate=function(a){for(var b=0,c=a.length;b<c;b++){var d=a[b];this.css(d,"transform","translate3d(0,0,0)"),this.css(d,"transform-style","preserve-3d"),this.css(d,"backface-visibility","hidden")}},h.prototype.setPosition=function(a,b,c){b+="px",c+="px",this.transform3DSupport?this.css(a,"transform","translate3d("+b+","+c+",0)"):this.transform2DSupport?this.css(a,"transform","translate("+b+","+c+")"):(a.style.left=b,a.style.top=c)},h.prototype.onOrientationTimer=function(a){this.orientationSupport&&0===this.orientationStatus&&(this.disable(),this.orientationSupport=!1,this.enable())},h.prototype.onCalibrationTimer=function(a){this.calibrationFlag=!0},h.prototype.onWindowResize=function(a){this.updateDimensions()},h.prototype.onAnimationFrame=function(){this.updateBounds();var a=this.ix-this.cx,b=this.iy-this.cy;(Math.abs(a)>this.calibrationThreshold||Math.abs(b)>this.calibrationThreshold)&&this.queueCalibration(0),this.portrait?(this.mx=this.calibrateX?b:this.iy,this.my=this.calibrateY?a:this.ix):(this.mx=this.calibrateX?a:this.ix,this.my=this.calibrateY?b:this.iy),this.mx*=this.ew*(this.scalarX/100),this.my*=this.eh*(this.scalarY/100),isNaN(parseFloat(this.limitX))||(this.mx=this.clamp(this.mx,-this.limitX,this.limitX)),isNaN(parseFloat(this.limitY))||(this.my=this.clamp(this.my,-this.limitY,this.limitY)),this.vx+=(this.mx-this.vx)*this.frictionX,this.vy+=(this.my-this.vy)*this.frictionY;for(var c=0,d=this.$layers.length;c<d;c++){var e=this.depths[c],f=this.$layers[c],g=this.vx*e*(this.invertX?-1:1),h=this.vy*e*(this.invertY?-1:1);this.setPosition(f,g,h)}this.raf=requestAnimationFrame(this.onAnimationFrame)},h.prototype.onDeviceOrientation=function(a){if(!this.desktop&&null!==a.beta&&null!==a.gamma){this.orientationStatus=1;var c=(a.beta||0)/f,d=(a.gamma||0)/f,e=b.innerHeight>b.innerWidth;this.portrait!==e&&(this.portrait=e,this.calibrationFlag=!0),this.calibrationFlag&&(this.calibrationFlag=!1,this.cx=c,this.cy=d),this.ix=c,this.iy=d}},h.prototype.onMouseMove=function(a){var b=a.clientX,c=a.clientY;!this.orientationSupport&&this.relativeInput?(this.clipRelativeInput&&(b=Math.max(b,this.ex),b=Math.min(b,this.ex+this.ew),c=Math.max(c,this.ey),c=Math.min(c,this.ey+this.eh)),this.ix=(b-this.ex-this.ecx)/this.erx,this.iy=(c-this.ey-this.ecy)/this.ery):(this.ix=(b-this.wcx)/this.wrx,this.iy=(c-this.wcy)/this.wry)};var i={enable:h.prototype.enable,disable:h.prototype.disable,updateLayers:h.prototype.updateLayers,calibrate:h.prototype.calibrate,friction:h.prototype.friction,invert:h.prototype.invert,scalar:h.prototype.scalar,limit:h.prototype.limit,origin:h.prototype.origin};a.fn[e]=function(b){var c=arguments;return this.each(function(){var d=a(this),f=d.data(e);f||(f=new h(this,b),d.data(e,f)),i[b]&&f[b].apply(f,Array.prototype.slice.call(c,1))})}}(window.jQuery||window.Zepto,window,document),function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-a)),f=window.setTimeout(function(){b(d+e)},e);return a=d+e,f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();
;
