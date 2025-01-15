; highlights.scm

[
  "as"
  "attr"
  "else"
  "for"
  "from"
  "fun"
  "if"
  "impl"
  "lambda"
  "let"
  "match"
  "module"
  "mut"
  "private"
  "public"
  "rec"
  "step"
  "template"
  "tensor"
  "to"
  "trait"
  "type"
  "while"
  "with"
] @keyword

"," @punctuation.delimiter
"." @punctuation.delimiter

[
  ":"
  "-"
  "~"
  "!"
  "+"
  "*"
  "/"
  "%"
  ">"
  "<"
  "&"
  "|"
  "^"
  "@"
  "="
  "::"
  "=="
  "!="
  "<="
  ">="
  "<<<"
  ">>>"
  "->"
  "<-"
  "&&"
  "||"
  "<<"
  ">>"
  "<|"
  "|>"
] @operator

[
"("
")"
"{"
"}"
"["
"]"
"</"
"/>"
"!{"
"${"
"</"
"/>"
"[|"
"|]"
] @punctuation.bracket

(user_type) @type
(primitive_type) @type.builtin

(string_literal) @string
(integer_literal) @number
(true_literal) @constant.builtin
(false_literal) @constant.builtin
(float_literal) @number
(tensor_expression
  "tensor" @function.builtin)
(rtType
  "rtType" @function.builtin)
(comment) @comment
(lifetime_specifier) @tag

(template_parameter
  (identifier) @type )

(template_arguments
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(template_parameters
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(pointer_type
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(tensor_type
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(user_type
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(single_trait_expression
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(function_declaration
  name: (identifier) @function)

(function_parameter
  name: (identifier) @variable.parameter)

(struct_declaration
  name: (identifier) @type)

(struct_declaration_variable
  name: (identifier) @variable.member)

(union_declaration
  name: (identifier) @type)

(union_declaration_cell
  constructor: (identifier) @function)

(runtime_function
  name: (identifier) @function)

(runtime_parameter
  name: (identifier) @variable.parameter)

(rt_let_lambda_argument
  (identifier) @variable.parameter)

(let_lambda_argument
  (identifier) @variable.parameter)

(let_lambda_argument
  (identifier) @variable.parameter)

(closure_argument
  (identifier) @variable.parameter)

(rt_closure_argument
  (identifier) @variable.parameter)

(infix_template_arguments
  left: (expression
          (identifier) @type))

(dummy_expression) @keyword

(math_unary_function_name) @function.builtin

(math_binary_function_name) @function.builtin

(builtin_function_name) @function.builtin

(intrinsic_function_name) @function.builtin

(access_vector
  (identifier) @module)

