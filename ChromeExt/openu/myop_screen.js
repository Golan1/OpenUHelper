function semester(s) {
	return s.trim().replace('א','a').replace('ב','b').replace('ג','c');
}

function fixCourses(f) {
	$('td:contains("פירוט"):not(:has(td)):first', f)[0].remove();
	$('a[href^="course_info.courseinfo"]', f).css('display','block').each(function() {
	    var a = $(this).attr('title','לפרטים נוספים');
	    var t1 = a.parent();
	    var t2 = t1.next().next().next().next().next().next();
		t2.wrapInner(a);
		t1.remove();
		t1 = t2.next();
		t2 = t1.next();
		var h = 'http://telem.openu.ac.il/courses/' + semester(t2.text()) +
			'/c' + t1.text().trim();
		t1.wrapInner($('<a/>').attr('title','לאתר הקורס').attr('href', h)
				.attr('target', 'new_window' + t1.text().trim()));
	});
}

function fixNews(f) {
	$('th:contains("פירוט")', f).remove();
	$('th:contains("תאור ההודעה")', f).css('width','420px');
	$('td:contains("הצג שוב")', f).css('width','50px');
	$('td:not(:has(td)):has(a[href="#chadash"],img[src$="smsgreen2.gif"])', f).each(function() {
	    var t1 = $(this);
	    var t2 = t1.prev().prev();
	    t1.find('a[href="#chadash"]').css('display','block').each(function(){
	    	t2.wrapInner($(this));
	    }).remove();
		t2.prepend(t1.children());
	}).remove();
	$('td[width="30"]:contains("פירוט")', f).remove();
	$('a[href="#pniya"]', f).css('display','block').each(function() {
	    var a = $(this);
	    var t1 = a.parent().parent();
	    var t2 = t1.parent().find('td:eq(1)');
		t2.wrapInner(a);
		t1.remove();
	});
	$('input[type="CHECKBOX"]', f).css('height','100%').css('min-height','1em')
		.css('width','100%').css('width','50px').css('cursor', 'pointer');

	$('table:contains("ציונים"):last tr', f).slice(2).each(function() {
		var r = $(this),
			s = semester(r.find('font:eq(1)').text()),
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
	$('td:not(:has(*))', f).filter(function(){return $(this).text().trim().length==0;}).remove();
}

function fixMain() {
	var f = main.document;
	switch (main.location.pathname.substr(13)) {
	case 'myop.new_screen': return fixNews(f);
	case 'course_info.courses': return fixCourses(f);
	default:
	}	
}

$(function() {
	fixMain();
});