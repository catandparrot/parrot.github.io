$(document).ready(function() {
    $("#psupd").click(function() {
        $("#pu").show('fast');
        $("#emailUpdate").hide('fast');
    });
    $("#myEmail").click(function() {
        $("#emailUpdate").show('fast');
        $("#pu").hide('fast');
    });
    $("#exit").click(function() {
        window.location = "exit.jsp?" + new Date();
    });
    $("#exit_pj").click(function() {
        window.location = "exit_pj.jsp?" + new Date();
    });
    $("#btnEmail").click(function() {
        if (checkEmail('stuEmail')) {
            $("#emailUpdFrm").attr("src", "EmailUpdate.do?email=" + $('#stuEmail').val() + '&ran=' + new Date());
        }
    });
    $("#zhmm").click(function() {
        window.location = 'getpw.jsp?name=' + $('#username').val();
    });
    $('#getpwForm').submit(function() {
        if ($.trim($('#name').val()) == "") {
            alert("\u8bf7\u8f93\u5165\u7528\u6237\u540d\uff01");
            return false;
        }
        if (!checkEmail('email')) {
            return false;
        }
        return true;
    });
    $('.pjrt a').live('click', function() {
        votertaskid = $(this).attr('sjid');
        $a = $("#" + votertaskid);
        if ($.trim( $a.text() ).length > 0) {
            if ($a.css('display') == 'none') {
                $a.fadeIn(500);
            } else {
                $a.fadeOut(500);
            }
       }
       else {
            $a.load("ShowTarget.do", {
                id: votertaskid,
                ran: new Date()
            }, function() {
                $a.fadeIn(500);
            });
        }
    });
	 $('.pjrd span').live('click', function() {
		window.open('VoterResult.do?id='+$(this).attr('sjid')+'&taskId='+$(this).attr('taskId'));
	 });
    $('#defb').click(function() {
        $votes = $("#tForm .voteItem[disabled!='disabled']");
        $('#tForm').show();
        $('#def').hide();
		$('#targets').removeClass('cssPosition');
        $votes.attr('checked', false);
        $("#defc .voteItem:checked").each(function() {
            v = $(this).val();
            $votes.each(function() {
                if ($(this).attr('disabled') != 'disabled') {
                    if ($(this).val() == v) {
                        $(this).attr('checked', true);
						$(this).closest('.DIV1').css({'backgroundColor': '#d1e4f3', 'border-color': '#4d8fcb'});  //20150709
                    }
                }
            });
        });
		iframeH();
    });
    $('#defb2').click(function() {
        $f = $('#tForm');
        $d = $('#default_content');
        $f.show();
        $d.hide();
        defaultTxt = $d.find('textarea').val();
        $f.find('textarea.comment').each(function() {
//            v = $(this).val();
//            if($.trim(v).length==0){
            $(this).val(defaultTxt);
			if($.trim($(this).val())!=''){
				$(this).closest('.DIV1').css({'backgroundColor': '#d1e4f3', 'border-color': '#4d8fcb'});  //20150709
			}
//            }
        });
		iframeH();
    });
    $('.a_comb').live('click', function() {
        $('#myResulTable_name').val($(this).html());
        $('#myResulTable_form').submit();
    });
    // wf begin
    $('#ulXxlr .noUse').click(function() {
        alert('\u76ee\u524d\u4e0d\u9700\u8981\u586b\u5199!');
    });
    $('#tbc .stDate').addClass('Wdate').focus(function() {
        WdatePicker({
            skin: 'whyGreen',
            maxDate: '%y-%M-%d'
        })
    });
    $("#stszForm").submit(function() {
        var s = 0;
        //check all input
        var $ipt = $("#stszForm input");
        $ipt.each(function() {
            $(this).next('img').remove();
            if ($.trim(this.value) == '') {
                s = 1;
                $(this).parent().append(alertImg);
            }
        });
        //check all select
        var $slt = $("#stszForm select");
        $slt.each(function() {
            $(this).next('img').remove();
            if ($(this).children('option:selected').val() == '') {
                s = 1;
                $(this).parent().append(alertImg);
            }
        });
        if (s == 1) {
            alert('\u8fd8\u6ca1\u586b\u5b8c\u5462\uff01')//not completed!
            return false;
        }
// check int
        $("#stszForm .beInt").each(function() {
            $(this).next('img').remove();
            v = $(this).val();
            if (!feiFuZhengShu(v)) {
                s = 1;
                $(this).parent().append(alertImg);
            }
        });
        if (s == 1) {
            alert('\u5e94\u8f93\u5165\u975e\u8d1f\u6574\u6570\uff01'); //must be int
            return false;
        }
//check speed
        $("#stszForm .stMinute").each(function() {
            $(this).next('img').remove();
            v = $(this).val();
            if (!minute(v)) {
                s = 1;
                $(this).parent().append(alertImg);
            }
        });
        if (s == 1) {
            alert('\u8bf7\u6309\u89c4\u5b9a\u683c\u5f0f\u8f93\u5165\uff01');
            return false;
        }
// check num
        $("#stszForm .stNum").each(function() {
            $(this).next('img').remove();
            v = $(this).val();
            if (!shiShu(v)) {
                s = 1;
                $(this).parent().append(alertImg);
            }
        });
        if (s == 1) {
            alert('\u5e94\u8f93\u5165\u6570\u5b57\uff01'); //must be int
            return false;
        }
//check xueya
        $xy = $("#stszForm #stXy").val();
        msg = '\u8840\u538b\u683c\u5f0f\u9519\u8bef\uff0c\u5e94\u4e3a\u201c\u6536\u7f29\u538b/\u8212\u5f20\u538b\u201d\uff01';
        arr = $xy.split('/');
		if (arr.length != 2 || !(zhengZhengShu(arr[0]) && zhengZhengShu(arr[1])) || parseInt(arr[0]) <= parseInt(arr[1])) {
            alert(msg);
            return false;
        }
        return true;
    });
    $("form .tf").blur(function() {
        c = strLength($(this).val());
        if (c > 50) {
            $(this).parent().append(alertImg);
            alert('\u5b57\u6570(' + c + ')\u592a\u591a\u4e86\uff01');
        }
    });
    $("form .ta").blur(function() {
        c = strLength($(this).val());
        if (c > 500) {
            $(this).parent().append(alertImg)
            alert('\u5b57\u6570(' + c + ')\u592a\u591a\u4e86\uff01');
        }
    });
    $('form').find('.tf,.ta').focus(function() {
        $(this).next('img.alertImg').remove();
    })
    $("#pdjdForm,#dhdForm,#bzxcgForm,#zxjlForm").submit(function() {
        t = true;
        $('img.alertImg').remove();
        $(this).find('.bt').each(function() {
            if ($.trim(this.value) == '') {
                t = false;
                $(this).parent().append(alertImg);
                //return false;
            }
        });
        if (!t) {
            alert('\u8fd8\u6ca1\u586b\u5b8c\u5462\uff01')//not completed!
            return false;
        }

        $(this).find('.tf').each(function() {
            c = strLength($(this).val());
            if (c > 50) {
                $(this).parent().append(alertImg);
                t = false;
            }
        });
        $(this).find('.ta').each(function() {
            c = strLength($(this).val());
            if (c > 500) {
                $(this).parent().append(alertImg);
                t = false;
            }
        });
        if (!t) {
            alert('\u5b57\u6570\u592a\u591a\u4e86(\u7ea2\u8272\u53c9\u53f7\u6240\u6807\u8bc6\u7684\u90e8\u5206)\uff01'); //too more words!
            return false;
        }

        return true;
    });
    $("#wgyForm").submit(function() {
//=======
        b = false;
        $it = $(this).find('input[type=\'text\'],textarea');
        $it.each(function() {
            if ($.trim($(this).val()).length > 1) {
                b = true;
                return false;
            }
        });
        if (!b) {
            alert('\u6ca1\u6709\u586b\u5199\u4efb\u4f55\u5185\u5bb9\uff01'); //nothing input
            return false;
        }
//========
        $it.next('img.alertImg').remove();
        //========
        $(this).find('div.associate').each(function() {
            $asso = $(this).find('input,textarea');
            b2 = false;
            $asso.each(function() {
                if ($.trim($(this).val()).length < 1) {
                    $(this).parent().append(alertImg);
                } else {
                    b2 = true;
                }
            });
            if (!b2) {
                $asso.next('img.alertImg').remove();
            }
        });
        if ($(this).find('img.alertImg').length > 0) {
            alert('\u8bf7\u7ee7\u7eed\u586b\u5199\u7ea2\u8272\u53c9\u53f7\u6240\u6807\u8bc6\u7684\u90e8\u5206\u3002')
            return false;
        }
//========
        t = true;
        $(this).find('.tf').each(function() {
            c = strLength($(this).val());
            if (c > 50) {
                $(this).parent().append(alertImg);
                t = false;
            }
        });
        $(this).find('.ta').each(function() {
            c = strLength($(this).val());
            if (c > 500) {
                $(this).parent().append(alertImg);
                t = false;
            }
        });
        if (!t) {
            alert('\u5b57\u6570\u592a\u591a\u4e86(\u7ea2\u8272\u53c9\u53f7\u6240\u6807\u8bc6\u7684\u90e8\u5206)\uff01'); //too more words!
            return false;
        }
//=========
        return true;
    });
    $('a.aRecord').click(function() {
        $('a.aRecord').removeClass('aRecordFocus');
        $('#lrnr>div').hide();
        $i = this.id;
        $s = $('#section').val();
        $(this).addClass('aRecordFocus');
        $r = $('#lrnr #rec_' + $i);
        //        if($r.length>0){
        //            $r.show();
        //        }else
        if ($r.length < 1) {
            $.get("gQuery2.do", {
                id: $i,
                section: $s
            },
            function(data) {
                $('#lrnr').append('<div id=rec_' + $i + '>' + data + '</div>');
            });
        }
        $r.show();
    });
    $('#printController #printBtn').click(function() {
        $('#printStep1').show('slow');
    });
    $('#printController .printClose').click(function() {
        $('#printController .printStep').hide('slow');
    });
    $('#printController #printStep1Next').click(function() {
        $('#printController .printStep').hide();
        $('#printController #printStep2').show('slow');
    });
    $('#printController #printStep2Next').click(function() {
        $('#printController .printStep').hide();
        $('#printController #printStep3').show('slow');
    });
    $('#printController .printStepBtns span').hover(function() {
        $(this).addClass("printBtnFocus");
    }, function() {
        $(this).removeClass("printBtnFocus");
    });
    $('#printArea1').click(function() {
        $('#reportPart7').printArea();
    });
    // wf end
    $('#paper_item .itemPjBtn').on('click', function() {
        //$(this).next('iframe').remove();
        $i = $(this).attr('itemid');
        /*var thisPar = $(this).closest('div');
         thisPar.append('<iframe frameborder=1 class=itemPjFrm id=itemPjFrm_' + $i + ' width=100% height=400 src="GetTargets.do?id=' + taskId + '&item=' + $i + '&rc=' + $(this).attr('multi') + '&diff=' + Diff() + '"></iframe>');
         $(this).val('\u6b63\u5728\u6253\u5f00...').attr('disabled', 'disabled');*/
        $(this).closest('div').html('<iframe frameborder=0  style="background:#fafafa;border:1px solid #8c8c8c;" class=itemPjFrm id=itemPjFrm_' + $i + ' width=100% height=400 src="GetTargets.do?id=' + taskId + '&item=' + $i + '&rc=' + $(this).attr('multi') + '&diff=' + Diff() + '"></iframe>');
    });
    $('#paper_item .itemPjBtn3').click(function() {
        $i = $(this).attr('itemid');
        /*
         $(this).after('<iframe frameborder=1 class=itemPjFrm id=itemPjFrm_' + $i + ' width=100% height=400 src="GetTargets.do?id=' + taskId + '&item=' + $i + '&rc=3&diff=' + Diff() + '"></iframe>');
         $(this).val('\u6b63\u5728\u6253\u5f00...').attr('disabled', 'disabled');
         */
        $(this).closest('div').html('<iframe frameborder=0 style="background:#fafafa;border:1px solid #8c8c8c;" class=itemPjFrm id=itemPjFrm_' + $i + ' width=100% height=400 src="GetTargets.do?id=' + taskId + '&item=' + $i + '&rc=3&diff=' + Diff() + '"></iframe>');
    });
    $('form#jhymbForm,form#zwpjForm').submit(function() {
        len = getFckContentLength($('#editorName').val());
        if (len < 1) {
            alert('\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\uff01');
            return false;
        } else if (len > 1000) {
            alert('\u5185\u5bb9\u8fc7\u591a\uff01\u5982\u679c\u60a8\u786e\u5b9a\u5b57\u6570\u5728\u8bb8\u53ef\u8303\u56f4\u5185\uff0c\u53ef\u80fd\u662f\u91cd\u590d\u8bbe\u7f6e\u683c\u5f0f\u9020\u6210\u7684\uff0c\u8bf7\u6e05\u9664\u6240\u6709\u683c\u5f0f\uff0c\u7136\u540e\u91cd\u65b0\u8bbe\u7f6e\u683c\u5f0f\uff0c\u518d\u91cd\u65b0\u63d0\u4ea4\u3002');
            return false;
        }
        $('#btnSubmit').val('\u6b63\u5728\u63d0\u4ea4...').attr('disabled', 'disabled');
        return true;
    });
    $('#tForm textarea.comment').focus(function() {
        $('#tForm textarea.comment').removeClass('current_comment');
        $(this).addClass('current_comment');
    });
    $('#sjzh a').click(function() {
        $.post("anonymousAccount.do", {
            ran: new Date()
        },
        function(data) {
            $('#sjzh .spanW').html(data);
        });
    });
    $('input.speak2').change(function() {
        $s = $('#' + $(this).attr('name') + this.value + 'speak');
        if (this.checked) {
            $s.attr('disabled', false);
        } else {
            $s.attr('disabled', true);
        }
    });
});
function limitChoiceCount() { 
    $.each(arrChoices, function(i, n) {
        if (typeof ('max_' + n) !== "undefined") { 
            $c = $('.l_' + n);
            $c.change(function() {
                if ($(this).prop('checked')) { 
                    countChecked=$('.l_' + n).filter(':checked').length;
                    countMax=eval('max_' + n);
                    if ( countChecked > countMax) { 
                        $(this).attr('checked', false);
                        alert('\u6b64\u9879\u4e0d\u80fd\u591a\u4e8e' + eval('max_' + n) + '\u4e2a\uff01');
                    }
                }
            });
        }
    });
}
function checkItemSubmit() {
    $tb = $('table.DIV1 tr .tdMsg');
    $('.DIV1').css({'backgroundColor': '#d1e4f3', 'border-color': '#4d8fcb'});
    var sign = true;
    $tb.each(function(i, elem) {
        if ($(elem).find('input:checked').length < 1) {
            $(elem).closest('.DIV1').css({'backgroundColor': '#e4e4e4', 'border-color': '#ccc'});
            sign = false;
        }
        var tdInput = $(elem).find('input');
        tdInput.each(function(index, element) {
            $(element).on('click', function() {
                if ($(this).prop('checked') === true) {
                    $(this).closest('.DIV1').css({'backgroundColor': '#d1e4f3', 'border-color': '#4d8fcb'});
                }
            });
        });
    });
    if (!sign) {
        alert('\u7070\u8272\u533a\u57df\u5185\u60a8\u6ca1\u6709\u505a\u51fa\u8bc4\u4ef7\uff0c\u8bf7\u5b8c\u6210\u540e\u518d\u63d0\u4ea4\uff01');
        return false;
    } else {
        $.each(arrChoices, function(i, n) {
            var minCount=eval('min_' + n);
            var maxCount=eval('max_' + n);
            if (typeof (minCount) !== "undefined") { 
                c = $('.l_' + n + ':checked').length; 
                if (c < minCount) {
                    //alert($.trim($('#tag_limit_' + n).text()) + '\u3002\u5f53\u524d\uff1a' + c + '\u4e2a\u3002');
					
					var $wm = $('#winMsg', window.parent.document.body);
					$wm.find('.p1').html($.trim($('#tag_limit_' + n).text()) + '\u3002\u5f53\u524d\uff1a' + c + '\u4e2a\u3002');
					parent.showDialog();
					
					
                    sign = false;
                    return false;
                }
            }
            if (typeof (maxCount) !== "undefined") {
                c = $('.l_' + n + ':checked').length; 
                if (c > maxCount) {
                    //alert($.trim($('#tag_limit_' + n).text()) + '\u3002\u5f53\u524d\uff1a' + c + '\u4e2a\u3002');
					var $wm = $('#winMsg', window.parent.document.body);
					$wm.find('.p1').html($.trim($('#tag_limit_' + n).text()) + '\u3002\u5f53\u524d\uff1a' + c + '\u4e2a\u3002');
					parent.showDialog();
					
                    sign = false;
                    return false;
                }
            }
        });
        if (!sign) {
            return false;
        }
        if (confirm('\u786e\u5b9a\u8981\u63d0\u4ea4\u5417\uff1f\u63d0\u4ea4\u540e\u5c06\u4e0d\u53ef\u4fee\u6539\uff01')) {
            $('#pj_submit').val('\u6b63\u5728\u63d0\u4ea4...').attr('disabled', 'disabled');
            return true;
        }
        return false;
    }

}
function showDialog(){
	$('#winMsg').dialog({
		title : '\u63d0\u793a\u4fe1\u606f',
		modal: true,
		buttons : {
			'\u786e\u5b9a' : function (){	
				$( this ).dialog( "close" );
			}
		}
	});	
}
//var frameId="";
function Diff() {
    var a = new Date();
    var y = a.getYear() + "";
    var m = a.getMonth() + "";
    var d = a.getDay() + "";
    var h = a.getHours() + "";
    var x = a.getMinutes() + "";
    var s = a.getSeconds() + "";
    var ms = a.getMilliseconds() + "";
    var date = y + m + d + h + x + s + ms;
    return date;
}
//function incomplete(){
//    $.prompt('<image id=alert_img src=images/alert.png/>\u8BF7\u6CE8\u610F\uFF1A\u80CC\u666F\u4E3A\u7EA2\u8272\u7684\u533A\u57DF\u60A8\u6CA1\u6709\u505A\u51FA\u8BC4\u4EF7\uFF0C\n\n\u8BF7\u5B8C\u6210\u540E\u518D\u63D0\u4EA4\u3002',{
//        buttons:{
//            \u786E\u5B9A:true
//        },
//        prefix:'impromptu'
//    });
//}

//function submitfunc(v,m,f){
//    if(!v){
//        return true;
//    }else{
//        $form=$("#tForm", document.getElementById('itemPjFrm_'+frameId).contentWindow.document);
//        $form.find('#pj_submit').val('\u6b63\u5728\u63d0\u4ea4...').attr('disabled','disabled');
//        $form.submit();
//    }
//    return true;
//}
function remind() {
    var txt = '<p class=cinfo>\u8BF7\u518D\u6B21\u70B9\u51FB\u53F3\u9762\u7684\u201C\u786E\u5B9A\u201D\u6309\u94AE\u63D0\u4EA4\u60A8\u505A\u51FA\u7684\u8BC4\u4EF7\uFF1B</p><p class=alert_msg>\u63D0\u4EA4\u4E4B\u540E\u5C06\u4E0D\u53EF\u4FEE\u6539\uFF01</p><p class=cinfo>\u73B0\u5728\u70B9\u51FB\u201C\u53D6\u6D88\u201D\u6309\u94AE\u53EF\u8FD4\u56DE\u4FEE\u6539\u3002</p>';
    $.prompt(txt, {
        buttons: {
            \u786E\u5B9A: true,
            \u53D6\u6D88: false
        },
        focus: 1,
        prefix: 'colsJqi',
        submit: submitfunc
    }).children('#colsJqi');
}

function shiying2(iframeId) {
    $ifm = $("#" + iframeId);
    $ifm.height($ifm.contents().height());
}



function getCookieId() {
    var item_id = $("#itemId").val();
    var voter_id = $("#voterId").val();
    return item_id + "-" + voter_id;
}
function saveCookie() {
    var item_id = $("#itemId").val();
    var voter_id = $("#voterId").val();
    var chk = [];
    var checked = $("input:checked");
    for (var i = 0; i < checked.length; i++) {
        chk[i] = checked[i].id;
    }
    var a = chk.join("@");
    //$.cookie(item_id+"-"+voter_id, a, { expires: 30 });
    $.cookie(getCookieId(), a, {
        expires: 30
    });
//alert(a);
}
function resume() {
    $.prompt('<img src="images/remind.png" style=" float:  left"/><div style="float:left;height:60px;width:5px"></div>' +
            '<div style="padding-left:3px">\u5982\u679C\u60A8\u4E4B\u524D\u66FE\u7ECF\u8BC4\u8FC7\u8FD9\u4E00\u90E8\u5206\u800C\u6CA1\u6709\u63D0\u4EA4\u6210\u529F\uFF0C\u90A3\u4E48\u70B9\u51FB\u4E0B\u9762\u7684\u201C\u6062\u590D\u201D\u6309\u94AE\u53EF\u5BFC\u5165\u4E4B\u524D\u505A\u51FA\u7684\u8BC4\u4EF7' +
            '\uFF08\u8981\u6C42\u4F7F\u7528\u7684\u662F\u540C\u4E00\u53F0\u7535\u8111\uFF09\u3002</div>', {
                buttons: {
                    \u6062\u590D: true,
                    \u53D6\u6D88: false
                },
                focus: 1,
                prefix: 'jqismooth',
                submit: renew
            })
}
function renew(v, m, f) {
    if (!v)
        return true;
    else
        renewByCookie();
    return true;
}
function renewByCookie() {
    var ck = $.cookie(getCookieId());
    if (ck != null) {
        var arr_ck = ck.split("@");
        for (var i = 0; i < arr_ck.length; i++) {
            $("#" + arr_ck[i])[0].checked = true;
        }
    }
}

function scollToDom(domId) {
    $.scrollTo($('#' + domId), 800);
}
function defa() {
    c = $('#tForm .voteItem:checked[disabled!="disabled"]').length;
    if (c > 0) {
        if (confirm("\u8fd9\u5c06\u53d6\u6d88\u6b64\u9898\u76ee\u4e0b\u5f53\u524d\u5df2\u505a\u51fa\u7684\u8bc4\u4ef7\uff0c\u8981\u7ee7\u7eed\u5417\uff1f")) {
        } else {
            return;
        }
    }
    $('#tForm').hide();
    $('#defc').html($('#tForm .DIV2').eq(0).html());
	$('#targets').addClass('cssPosition');
    $('#defc input').removeAttr('disabled');
    $('#defc div.target_info').html('<div style="margin-bottom:10px">\u8bf7\u8BBE\u7F6E\u9ED8\u8BA4\u9009\u4E2D\u9879\uFF1A</div>')
    $('#def').show();
	iframeH();
}
function defa2() {
    countNotNull = $('#tForm textarea.comment[value!=""]').length;
    if (countNotNull > 0) {
        if (confirm("\u4f7f\u7528\u9ed8\u8ba4\u529f\u80fd\u5c06\u6e05\u9664\u5df2\u586b\u5199\u7684\u5185\u5bb9\uff0c\u786e\u5b9a\u5417\uff1f")) {
        } else {
            return;
        }
    }
    $('#tForm').hide();
    $d = $('#default_content');
    $d.find('textarea').val('');
    $d.show();
	iframeH();
}
function iframeH(){
	var $pf = $('#itemPjFrm_' + myId, window.parent.document.body);
    $pf.height($('body').height() + 30);
    $(window).resize(function() {
        $pf.height($('body').height() + 30);
    });	
}
function feiFuZhengShu(n) {
//if(/^[0-9]+$/.test(n)){
    if (/0|^[1-9][0-9]*$/.test(n)) {
        return true;
    }
    return false;
}
function shiShu(n) {
    if (/^[-+]?\d+(\.\d+)?$/.test(n)) {
        return true;
    }
    return false;
}
function minute(n) {
    if (/^(0|^[1-9][0-9]*)[\u5206][0-5][0-9]{0,1}[\u79d2]$/.test(n)) {
        return true;
    }
    return false;
}
function strLength(str) {//one chinse word leads to one char
    return   str.replace(/[^\x00-\xff]/g, "*").length;
}

function zhengZhengShu(n) {
    if (/^[1-9]\d*$/.test(n)) {
        return true;
    }
    return false;
}
function getFckContentLength(id) {
    var oEditor = FCKeditorAPI.GetInstance(id);
    content = oEditor.GetXHTML(true);
    if ($.trim(content) == '') {
        return 0
    }
    return content.length;
}