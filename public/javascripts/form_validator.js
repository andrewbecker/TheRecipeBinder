$(function() {
  $('.login_form').validate({
    // Validation rules
    rules: {
      username: "required",
      password: "required"
    },
    // Specify the validation messages
    messages: {
      username: "Please enter your username",
      password: "Please enter your password"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });

  $('#signup_form').validate({
    // Validation rules
    rules: {
      first_name: "required",
      last_name: "required",
      username: "required",
      password: "required"
    },
    messages: {
    // Vaidation messages
      first_name: "Please enter your first name",
      last_name: "Please enter your last name",
      username: "Please enter your username",
      password: "Please enter your password"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});
