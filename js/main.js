// bootstrap tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
// error notes variables
const errorList = {
  "emptyError":"This Field is required and Should not be empty",
  "formatError":"Only numbers are allowed no other characters"
};

function validationError(current,errortype) {
  current.parent().addClass('border-danger');
  current.next().removeClass('d-none');
  current.next().children().attr('title',errorList[errortype]);
  current.next().children().attr('aria-label',errorList[errortype]);
  current.next().children().attr('data-bs-original-title',errorList[errortype]);
}

function validationSuccess(current) {
  current.parent().removeClass('border-danger');
  current.parent().addClass('border-success');
  current.next().addClass('d-none');
}

// check input validation
$('form input[type="text"]').each(function(){
  $(this).change(function(){
    let current = $(this);
    let e = $(this).val();
    if(e == '' || e == ' ' || e == null || e == undefined) {
      validationError(current,"emptyError");
    } else if (isNaN(Number(e))) {
      validationError(current,"formatError");
    } else {
      validationSuccess(current)
    }
  });
});

$('form select').change(function(){
  let current = $(this);
    let e = $(this).val();
    if(e == null){
      validationError(current,"emptyError");
    } else {
      validationSuccess(current);
      dropDownformValidated = true;
    }
});

$('.form-btn-submit').submit(function(e){
  e.preventDefault();

  // validation form 
  let count = 0;
  let totalLength = $('form input').length + $('form select').length;
  
  // check input validation
  $('form input[type="text"]').each(function(){
    let current = $(this);
    let e = $(this).val();
    if(e == '' || e == ' ' || e == null || e == undefined) {
      validationError(current,"emptyError");
    } else if (isNaN(Number(e))) {
      validationError(current,"formatError");
    } else {
      validationSuccess(current)
      count ++;
    }
  });

  // check dropdown validation
  $('form select').each(function(){
    let current = $(this);
    let e = $(this).val();
    if(e == null){
      validationError(current,"emptyError");
    } else {
      validationSuccess(current);
      count ++;
    }
  });
  // after validation action
  if(count == totalLength) {
    // tax calculation
      let grossincome = $('input#grossincome').val();
      let extraincome = $('input#extraincome').val();
      let age = parseInt($('select#age').val())/100;
      let applicable = $('input#applicable').val();
      let totalSlab = parseInt(grossincome) + parseInt(extraincome) - parseInt(applicable);
      console.log('totalSlab', totalSlab);
      let taxAmount = 0;
      if(totalSlab > 800000) {
        taxAmount = (age*(totalSlab - 800000)).toLocaleString();
      }
    // rsult show
      $('.incomeTax').html(taxAmount)
      $('#resultpop').modal('show');
  }
  
})
