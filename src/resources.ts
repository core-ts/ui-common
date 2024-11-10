const en: StringMap = {
  error_required: "{0} is required.",
  error_minlength: "{0} cannot be less than {1} characters.",
  error_maxlength: "{0} cannot be greater than {1} characters.",

  error_email: "{0} is not a valid email address.",
  error_number: "{0} is not a valid number.",
  error_integer: "{0} is not a valid integer.",
  error_phone: "{0} is not a valid phone number.",
  error_fax: "{0} is not a valid fax number.",
  error_url: "{0} is not a valid URL.",
  error_ipv4: "{0} is not a valid ipv4.",
  error_ipv6: "{0} is not a valid ipv6.",
  error_digit: "{0} must contain digits only.",
  error_dash_digit: "{0} must contain digits and dash only.",
  error_code: "{0} must contain characters and digits only.",
  error_dash_code: "{0} must contain characters and digits and dash only.",
  error_routing_number: "{0} is not a valid routing number.",
  error_post_code: "{0} is not a valid post code.",
  error_ca_post_code: "{0} is not a valid Canada post code.",
  error_us_post_code: "{0} is not a valid US post code.",

  error_min: "{0} must be greater than or equal to {1}.",
  error_max: "{0} must be smaller than or equal to {1}.",
  error_equal: "{0} must be equal to {1}.",
  error_min_date: "{0} cannot be before {1}.",
  error_max_date: "{0} cannot be after {1}.",
  error_date: "{0} is not a valid date.",
  error_from_now: "{0} must be after now.",
  error_from_tomorrow: "{0} must be from tomorrow.",
  error_from: "{0} must be after {1}.",
  error_after_now: "{0} cannot be after now.",
  error_after_tomorrow: "{0} cannot be after tomorrow.",
  error_after: "{0} cannot be after {1}.",
}
function getResource(): StringMap {
  return en
}
