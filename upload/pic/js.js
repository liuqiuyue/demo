//@import url("/common/js/util/_thousandSep.js")

;void function(){
  var lanCode = SILK_ANGORA.lanCode;
  // 最多10条凭证信息
  var RECEIP_TTOTAL = 10;
  var textUploadSuccess = ["Upload Successful!", "上传成功！"][lanCode];
  var textUploadFailure = ["Upload Failure!", "上传失败！"][lanCode];
  var textAddSuccess = ["Add Successful!", "添加成功！"][lanCode];
  var textAddFailure = ["Add Failure!", "添加失败！"][lanCode];
  var textSuccess = ["Successful!", "成功！"][lanCode];
  var textFailure = ["Failure!", "失败！"][lanCode];
  var textFormateError = ["Please upload receipt in JPG,JPEG,PNG or PDF within 10MB.", "未上传、格式不对、操过大小限制"][lanCode];
  var textLimitError = ["Please upload receipt in JPG,JPEG,PNG or PDF within 10MB.", "未上传、格式不对、操过大小限制"][lanCode];

  var tempFormInner = $('#temp-box').html(),
      formInnerCoat = $('#J-form-inner-coat');

  var valiSumAmounts = function(){
      var total = util.thousandBitSeparatorOut($.trim($('.J-total').text()));
      var sum = 0;
      formInnerCoat.find('[name="transferAccount"]').each(function(index, ele){
          sum += Number($.trim($(ele).val()));
      })
      return sum >= total;
  };
  var checkLeftCount = function(){
      var left = true;
      var leftCount = RECEIP_TTOTAL - formInnerCoat.find('.J-form-inner').length;
      $('.J-left-count').html(leftCount);
      if (leftCount == 9) {
          left = true;
          formInnerCoat.find('.J-btn-close').hide();
          $('.J-add-transfer').show();
      }else if(leftCount == 0){
          left = false;
          formInnerCoat.find('.J-btn-close').show();
          $('.J-add-transfer').hide();
      }else{
          left = true;
          formInnerCoat.find('.J-btn-close').show();
          $('.J-add-transfer').show();
      }
      return left;
  };
  var showError = function (feedback, wrapfor, txt) {
      var tip = '<label for="'+ wrapfor +'" generated="true" class="error" style="display: inline;">'+ txt +'</label>';
      $(feedback).html(tip);
  };
  var getUUID = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  };
  var getId = function (prefix, uuid) {
      return prefix + uuid;
  };    
  var addFormInner = function(){
      var UUID = getUUID();

      formInnerCoat.append(tempFormInner);
      // 初始化新增form数据
      var latestFormInner = formInnerCoat.find('.J-form-inner').last();

      Select.use(latestFormInner.find('select'));
      latestFormInner.find('.uploader').attr('id', getId('uploader_', UUID));
      var uploader = getUploadInstance(latestFormInner, UUID);
      latestFormInner.on('click', '.J-photo-box', function(){
          uploader.open();
      });
      latestFormInner.find('input, select').each(function(){
          var $this = $(this);
          $this.attr('id', getId($this.attr('name')+'_', UUID));
      });
      latestFormInner.find('.J-file-tip').attr('wrapfor', latestFormInner.find('.J-attachId').attr('id'));
      try {
          var picker = new Pikaday({ field: document.getElementById('transferDate_'+UUID), format: 'yyyy-mm-dd' });
      }catch (e){
          window.console && console.log(e);
      }

      checkLeftCount();

  };
  var getUploadInstance = function(formInner, uuid){
      var wrapfor = 'payVoucherID_' + uuid;
      return new FOCUS.widget.Upload({
          priority: ["html5", "iframe"],   // HTML5 模式默认可以使用 open 方法
          placeholder: '#uploader_' + uuid, // 占位元素
          postParams: {"type":"opo"},
          fileTypes: '*.jpeg, *.jpg, *.png, *.pdf',
          sizeLimit: '10MB',
          timeout: 10000,
          button: {
              text: '' // 按钮显示的文字
          },
          allowOpen: true // IE iframe 模式专属参数，允许在ie下手动调用open方法
      }).on("dialogComplete", function(){
          this.startUpload();
      }).on('queueError', function (file, queue_error_code, message) {
          if(queue_error_code === -130){
              formInner.find('.J-photo-box').removeClass('loading loaded').addClass('beginning');
              showError(formInner.find('.J-file-tip'), wrapfor, textFormateError);
          }else if(queue_error_code === -110){
              formInner.find('.J-photo-box').removeClass('loading loaded').addClass('beginning');
              showError(formInner.find('.J-file-tip'), wrapfor, textLimitError);
          }else {
              formInner.find('.J-photo-box').removeClass('loading loaded').addClass('beginning');
              showError(formInner.find('.J-file-tip'), wrapfor, textFailure);
          }
      }).on('uploadStart', function(file){
          // formInner.find('.J-photo-box').attr('class', 'photo-box J-photo-box loading');
      }).on('uploadSuccess', function(file, response){
          if (typeof(response) === 'string') {
              response = JSON.parse(response);
          }

          if ( response && response.code === '10001' && response.data ){
              formInner.find('.J-photo-box').removeClass('loading beginning').addClass('loaded');
              if (response.data.ext === 'pdf') {
                  formInner.find('.J-thumb').find('.J-img').replaceWith('<div class="thumb-pdf J-img"><span class="ob-icon icon-pdf"></span></div>');
              } else if (response.data.src) {
                  formInner.find('.J-thumb').find('.J-img').replaceWith('<img class="thumb-img J-img" src="'+ response.data.src +'"/>');
              }

              formInner.find('.J-attachId').val(response.data.id);
              formInner.find('.J-attachName').val(file.name);
              formInner.find('.J-attachType').val(response.data.ext);
              formInner.find('.J-imgUrl').val(response.data.src);
              // window.parent.bubble(textUploadSuccess);
              $('.J-file-tip').html('');
          }else {
              formInner.find('.J-photo-box').removeClass('loading loaded').addClass('beginning');
              showError(formInner.find('.J-file-tip'), wrapfor, response.data || response.msg || textFailure);
          }
      }).on('uploadError', function(file, upload_error_code, message){
          formInner.find('.J-photo-box').attr('class', 'photo-box J-photo-box beginning');
          showError(formInner.find('.J-file-tip'), wrapfor, textFailure);
      });
  };

  // 添加forminner
  $('.J-add-transfer').on('click', function(e){
      e.preventDefault();

      addFormInner();       
  });
  // 删除forminner
  formInnerCoat.on('click', '.J-form-inner .J-btn-close', function(){
      $(this).parent().remove();
      checkLeftCount();      
  });
  // 初始化第一个forminner
  var init = function(){
      formInnerCoat.find('.J-form-inner').each(function(index, ele){
          var UUID = getUUID();
          var $formInner = $(ele);
          Select.use($formInner.find('select'));
          $formInner.find('.uploader').attr('id', getId('uploader_', UUID));
          var uploader = getUploadInstance($formInner, UUID);
          $formInner.on('click', '.J-photo-box', function(){
              uploader.open();
          });
          $formInner.find('input, select').each(function(){
              var $this = $(this);
              $this.attr('id', getId($this.attr('name')+'_', UUID));
          });
          $formInner.find('.J-file-tip').attr('wrapfor', $formInner.find('.J-attachId').attr('id'));
          try {
              var picker = new Pikaday({ field: document.getElementById('transferDate_'+UUID), format: 'yyyy-mm-dd' });
          }catch (e){
              window.console && console.log(e);
          }

      })

      checkLeftCount();

  }();

  $.validator.addMethod("validateAmount", function(val, ele, param){
      var exp = /(^([1-9][0-9]{0,6}|0)$)|(^([1-9][0-9]{0,6}|0)(\.[\d]{1,2})?$)/;
      return exp.test($.trim(val));
  });
  $.validator.define("receiptForm", {
      payMethod: {
          required: {
              message: ["Please select a payment method.", "请选择支付方式"]
          }
      },
      bankName: {
          required: {
              message: ["Please enter a bank name.", "请输入名字"]
          },
          enOnly: {
              message: ["Please enter in English.", "非法字符"]
          }
      },
      ownerName: {
          required: {
              message: ["Please enter an owner name.", "请输入名字"]
          },
          enOnly: {
              message: ["Please enter in English.", "非法字符"]
          }
      },
      backAccountNumber: {         
          digits: {
              message: ["Please enter Arabic numbers.", "非法字符"]
          }
      },
      transferDate: {
          required: {
              message: ["Please select a date.", "请选择日期。"]
          }
      },
      transferAccount: {
          required: {
              message: ["Please enter a transfer amount.", "未填写"]
          },
          validateAmount: {
              message: ["Please enter numbers only (up to 7 integers with 2 decimal places, Max is 9999999.99).", "超长、输入非法字符"]
          }
      },
      attachId: {
          required: {
              message: ["Please upload receipt in JPG,JPEG,PNG or PDF within 10MB.", "未上传、格式不对、操过大小限制"]
          }
      }
  });

  $(".J-receipt-form").validate("receiptForm", {
      errorWrap: true,
      submitHandler: function(form){
          if (valiSumAmounts()) {   
              $('.J-m-alert').hide();
              // alert('submit');        
              form.submit();
          }else{
              $('.J-m-alert').show();
              $("html,body").animate({scrollTop:0},300);
          }
          
      }
  });

  $(".J-add-cancel").click(function(e){
      // e.preventDefault();
      
  });
  
  $(function(){
      $(".J-viewBank").click(function(e){
          e.preventDefault();
          new artDialog({
              title:'Beneficiary Bank Account',
              content:template($('#bankInfoTpl').html(),{}),
              width: window.innerWidth > 550 ? 550: 300,
              fixed: true,
              lock: true,
              ok:function(){},
              okVal:'Confirm'
          })
      });
  })
 



}.call(this);