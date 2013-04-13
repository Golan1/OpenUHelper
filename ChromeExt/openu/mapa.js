function fixUpper() {
	$(topf.document.documentElement).html(function(i,val){
	    return val.replace(/PLEASE_WAIT/g,'listperiod');
	});
	$('table', topf.document).css('margin','auto').attr('align','');
}

function fixLower() {
	var f = sisma.document;
	$(f.documentElement).html(function(i,val){
	    return val.replace(/PLEASE_WAIT/g,'listperiod');
	});
	$('table + br', f).remove();
	$('td[width="90"],td[width="40"]', f).width('14%');
	$('table', f).width('auto').css('margin','auto').attr('align','');
	$('table[width="660"]', f).css('min-width','770px');
	var frm  = $('form', f).css('margin-bottom','1.5em');
	$('table table:has(table):first', f).wrap(frm).prepend($('<thead/>').prepend(
			$('table table:has(table):first tr:first', f).remove()))
		.css('position','absolute').css('top','0em').css('width','660px')
		.css('background','#eee').css('border','2px outset #111').hover(
			function(){ $(this).find('tbody').fadeIn(); },
			function(){ $(this).find('tbody').fadeOut(); }
	);
	frm.remove();
	$('a[name] + table,td[valign="top"] > table', f).width('100%');
	$('td[valign="top"] > table', f).css('background','#bdf').css('border-bottom','1px dotted #9cf')
		.css('margin-bottom','.25em');
	$('a[name] + table', f).not(':has(img[src$="nextmonth.gif"])').css('background','#9cf').css('border-bottom','1px dotted #69f');
	$('img', f).attr('align','absmiddle');
	$('td[colspan="8"]').attr('colspan', '4');
	$('tr', f).css('height','auto');
	$('td[width="30"]:contains("יחידת לימוד מומלצת")', f).remove();
	$('b:contains("מספר"):contains("שבוע")', f).replaceWith('<b>שבוע</b>');
	$('tr[bgcolor="#E6F6FF"] > td:first-child', f).each(function() {
	    var t = $(this).wrapInner('<div/>');
	    var n = t.next().wrapInner('<div/>');
	    n.prepend(t.html() + '&nbsp;').width('2%');
	}).remove();
	$('td[width="50"]', f).each(function() {
	    var t = $(this);
	    var n = t.next();
	    n.html(t.html() + n.html()).width('25%').css('cursor', 'pointer');
	}).remove();
	$('input[name="P_in_kod_peilut"]', f).each(function() {
		var cb = $(this);
		var id = 'kod_' + cb.attr('value');
	    cb.attr('id', id).parent().wrapInner('<label for="' + id + '" />');
	});
	$('.popup + a[href="#"]', f).css('display','block').each(function(){
	    var a = $(this);
	    var p = a.prev();
	    var i = p.prev();
		a.prepend(i.css('padding','3px').remove(), p.remove()).next().remove();
	});
	$('img[src$="today.gif"]', f).each(function(){
		var im=$(this);
		im.parent().css('background','#fed');
		im.prev().css('background','#fc9 url(' + im.attr('src') + ') center center no-repeat');
	}).remove();
	$('table table:has(table):first tbody', f).fadeOut();
}

function fixMapa() {
	$(document.documentElement).html(function(i,val){
	    return val.replace(/PLEASE_WAIT/g,'listperiod');
	});
	$('frame')[1].onload = fixLower;
	$('frame')[0].onload = fixUpper;
	$('frameset')[0].rows = '90,*';
	fixUpper();
}

$(function() {
	fixMapa();
});