function fixUpper() {
	$('table', topf.document).css('margin','auto').attr('align','');
}

function fixLower() {
	var f = sisma.document;
	$('table + br', f).remove();
	$('td[width="90"],td[width="40"]', f).width('14%');
	$('table', f).width('auto').css('margin','auto').attr('align','');
	$('table[width="660"]', f).css('min-width','770px');
	$('a[name] + table,td[valign="top"] > table', f).width('100%');
	$('td[valign="top"] > table', f).css('background','#bdf').css('border-bottom','1px dotted #9cf');
	$('a[name!="1"] + table', f).css('background','#9cf').css('border-bottom','1px dotted #69f');
	$('img', f).attr('align','absmiddle');
	$('td[colspan="8"]').attr('colspan', '4');
	$('tr', f).css('height','auto');
	$('td[width="30"]:contains("יחידת לימוד מומלצת")', f).remove();
	$('b:contains("מספר"):contains("שבוע")', f).replaceWith('<b>שבוע</b>');
	$('tr[bgcolor="#E6F6FF"] > td:first-child', f).each(function() {
	    var t = $(this);
	    var n = t.next();
	    n.html(t.html() + '<br />' + n.html()).width('2%');
	}).remove();
	$('td[width="50"]', f).each(function() {
	    var t = $(this);
	    var n = t.next();
	    n.html(t.html() + n.html()).width('25%').css('cursor', 'pointer');
	}).remove();
	$('input[name="P_in_kod_peilut"]', f).each(function() {
		var cb = $(this);
		var id = 'kod' + cb.attr('value');
	    cb.attr('id', id).parent().wrapInner('<label for="' + id + '" />');
	});
	$('.popup + a[href="#"]', f).css('display','block').each(function(){
	    var a = $(this);
	    var p = a.prev();
	    var i = p.prev();
		a.prepend(i.css('padding','1px 3px').remove(), p.remove()).next().remove();
	});
}

function fixMapa() {
	$('frame')[1].onload = fixLower;
	$('frame')[0].onload = fixUpper;
	$('frameset')[0].rows = '90,*';
	fixUpper();
}


$(function() {
	fixMapa();
});
