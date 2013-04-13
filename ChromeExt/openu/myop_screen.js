function fixCourses(f) {
	$('td:contains("פירוט"):not(:has(td)):first', f)[0].remove();
	$('a[href^="course_info.courseinfo"]', f).css('display','block').each(function() {
	    var a = $(this);
	    var t1 = a.parent();
	    var t2 = t1.next().next().next().next().next().next();
		t2.wrapInner(a);
		t1.remove();
	});
}

function fixNews(f) {
	$('th:contains("פירוט")', f).remove();
	$('a[href="#chadash"]', f).css('display','block').each(function() {
	    var a = $(this);
	    var t1 = a.parent().parent();
	    var t2 = /*t1.parent().find('td:eq(1)');*/t1.prev().prev();
		t2.wrapInner(a);
		t1.remove();
	});
	$('input[type="CHECKBOX"]', f).css('height','100%').css('min-height','1em')
		.css('width','100%').css('cursor', 'pointer');

	$('table:contains("ציונים"):last tr', f).slice(2).each(function() {
		var r = $(this),
			s = r.find('font:eq(1)').text().trim().replace('א','a').replace('ב','b').replace('ג','c'),
			c = r.find('font:eq(2)').text().trim(),
			m = r.find('font:eq(4)').text().trim(),
			t = m.charAt(0) == '0',
			h = 'p_kurs='+c+'&p_semester='+s+'&p_semester_hagasha='+s+(t?'&p_kod_peilut_kurs=01':'')+'&p_mis_matala='+m,
			a = t ? 'matalat_macshev.answers table[bgcolor="#D1DDF1"]' :
					'course_info_2.ziunmesichim table table:has(table):last',
			d = $('<div/>').css('border','3px outset #036').css('bottom','26px').css('left','-8px')
				.css('display','none').css('position','absolute').load(
				'/pls/dmyopt2/' + a, h,
				t ? function() {
					$(this).find('td:first td:first-child').each(function(){
						$(this).text($(this).text().trim().replace(/\s+/g,'\xa0').split("").reverse().join(""));
					});
					$(this).find('td td:first-child').each(function(){
						$(this).text($(this).text());
					});
				} : function() {
					$(this).attr('dir','ltr').find('tr').filter(function(){
						return $(this).find('font:first').text().trim().length == 0;
				}).remove();
		}).prependTo(r.find('td:eq(5)').css('position','relative'));
		r.hover(function() { d.fadeIn(); }, function() { d.fadeOut(); });
	});		
		//+'&p_time=213913041113
}
//https://sheilta.apps.openu.ac.il/pls/dmyopt2/course_info_2.ZIUNMATALA?p_kurs=20476&p_semester=2012c&p_time=111858041213&p_MERKAZ_LIMUD=630&p_KVUTZAT_LIMUD=60&P_KOD_PEILUT_KURS=01#
//https://sheilta.apps.openu.ac.il/pls/dmyopt2/matalat_macshev.answers?p_kurs=20476&p_semester=2012c&p_semester_hagasha=2012c&p_kod_peilut_kurs=01&p_mis_matala=02&p_time=111858041213


function fixMain() {
	var f = main.document;
	switch (main.location.pathname.substr(13)) {
	case 'myop.new_screen': return fixNews(f);
	case 'course_info.courses': return fixCourses(f);
	default:
	}	
}

function fix() {
	if (main.document.readyState == 'complete') fixMain();
	$('frame[name="main"]')[0].onload = fixMain;
}

$(function() {
	fix();	
});
