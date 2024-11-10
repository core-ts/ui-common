interface StringMap {
  [key: string]: string
}
const en: StringMap = {
  error_required: "{0} is required.",
  error_invalid: "You have inserted invalid {0}. Please try again",
  error_required_minlength: "{0} is required and {0} cannot be less than {1} characters.",
  error_minlength: "{0} cannot be less than {1} characters.",
  error_maxlength: "{0} cannot be greater than {1} characters.",
  error_min: "{0} must be greater than or equal to {1}.",
  error_max: "{0} must be smaller than or equal to {1}.",
  error_min_date: "{0} cannot be before {1}.",
  error_max_date: "{0} cannot be after {1}.",
  error_date: "{0} is not a valid date.",
  error_email: "Please enter a valid email address.",
  error_required_email: "{0} is required and must be a valid email address.",
  error_phone: "Invalid phone number. Please include area code and full phone number.",
  error_fax: "Invalid fax number. Please include area code and full fax number.",
  error_url: "{0} is not a valid URL.",
  error_ipv4: "{0} is not a valid ipv4.",
  error_ipv6: "{0} is not a valid ipv6.",
}
function getResource(): StringMap {
  return en
}
