/// <reference types="tree-sitter-cli/dsl" />
// @ts-checbuiltin_function_name_wo_rt_speicifick

module.exports = grammar({
  name: 'nadya',

  conflicts: $ => [
    [$.let_expression, $.statement],
    [$.for_expression, $.statement],
    [$.while_expression, $.statement],
    [$.print_expression, $.statement],
    [$.function_definition, $.statement],
    [$.access_vector],
    [$._expressions],
    [$._expressions, $.group_expression],
    [$._unary_operator_expression],
    [$._binary_operator_expression, $._unary_operator_expression],
    [$.tuple_type],
    [$._struct_declaration_variables],
    [$.struct_declaration],
    [$.assign_expression, $._block],
    [$._patterns],
    [$.union_declaration_cell],
    [$.single_trait_expression],
    [$._match_clause, $.assign_expression],
    [$.access_vector, $.user_type],
    [$.access_vector, $._prefix_expression_wo_statement_expression],
    [$.user_type, $._prefix_expression_wo_statement_expression],
    [$.struct_implementation_body_cell],
    [$.struct_implementation_trait_cell],
    [$.let_expression],
    [$.for_expression],
    [$.while_expression],
    [$.print_expression],
    [$.assign_expression],
    [$._expressions, $.assign_expression],
    [$.assign_expression, $._let_lambda_statement],
    [$.assign_expression, $._let_rec_statement],
    [$.template_parameter],
    [$.placeholder_pattern, $.union_constructor_pattern],

    [$.rt_literal, $._rt_prefix_expression],
    [$._rt_let_expression],
    [$._rt_expressions],
    [$.rt_let_lambda_argument, $.let_lambda_argument],
    [$.rt_print_expression],
    [$.rt_while_expression],
    [$.rt_for_expression],
    [$._rt_expressions, $.rt_group],
    [$._rt_unary_operator_expression, $._rt_binary_operator_expression],
    [$._prefix_expression_wo_statement_expression, $.rt_literal, $._rt_prefix_expression],
    [$._prefix_expression_wo_statement_expression, $.rt_literal],
    [$.builtin_function_name, $.rt_builtin_function],
    [$._patterns, $.rt_pattern],
    [$.closure_argument, $.rt_closure_argument],
    [$.rt_match_expression],
    [$._rt_expressions, $.rt_assign_expression],
    [$.rt_assign_expression, $.rt_attribute],
    [$.rt_assign_expression, $._rt_block],
    [$.rt_assign_expression, $._rt_let_lambda_expression],
    [$.rt_assign_expression, $._rt_let_expression],
    [$.rt_assign_expression, $._rt_let_rec_lambda_expression],
    [$.rt_assign_expression, $.rt_print_expression],
    [$.rt_assign_expression, $.rt_while_expression],
    [$.rt_assign_expression, $._rt_match_clause],
    [$.rt_assign_expression, $.rt_for_expression],
    [$.rt_assign_expression],
    [$._unary_operator_expression, $._rt_unary_operator_expression],
    [$.rt_literal, $.for_statement],
  ],

  extras: $ => [
    /\s|\f|\v|\\\r?\n/,
    $.comment,
  ],

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => seq(
      repeat($.module_import),
      repeat($.statement),
      optional($._prefix_expression_wo_statement_expression)
    ),

    module_import: $ => seq(
      'module',
      $.access_vector,
      optional($._module_alias)
    ),

    _module_alias: $ => seq(
      'as',
      $.identifier
    ),

    access_vector: $ => seq(
      $.identifier,
      repeat(seq('::', $.identifier))
    ),

    //------------------------------------------------------------------------//
    /// Patterns
    //------------------------------------------------------------------------//

    pattern: $ => choice(
      $.tuple_pattern,
      $.integer_pattern,
      $.boolean_pattern,
      $.float_pattern,
      $.placeholder_pattern,
      $.empty_pattern,
      $.group_pattern,
      $.union_constructor_pattern
    ),

    _patterns: $ => seq(
      $.pattern,
      repeat(seq(',', $.pattern))
    ),

    tuple_pattern: $ => seq(
      '(',
      choice(
        seq(
          $.pattern,
          ',',
        ),
        seq(
          $.pattern,
          ',',
          $._patterns,
          optional(','),
        )
      ),
      ')'
    ),

    integer_pattern: $ => $.integer_literal,

    float_pattern: $ => $.float_literal,

    boolean_pattern: $ => choice(
      $.true_literal,
      $.false_literal
    ),

    placeholder_pattern: $ => $.identifier,

    empty_pattern: $ => '_',

    group_pattern: $ => seq(
      '(',
      $.pattern,
      ')'
    ),

    union_constructor_pattern: $ => seq(
      optional(seq($.access_vector, '::')),
      $.identifier,
      optional(seq('(', $._patterns, ')'))
    ),

    //------------------------------------------------------------------------//
    /// Types
    //------------------------------------------------------------------------//

    type: $ => choice(
      $.tuple_type,
      $.closure_type,
      $.primitive_type,
      $.pointer_type,
      $.tensor_type,
      $.user_type
    ),

    _types: $ => seq(
      $.type,
      repeat(seq(',', $.type))
    ),

    tuple_type: $ => seq(
      $.type,
      repeat1(seq('*', $.type))
    ),

    closure_type: $ => prec.right(1, seq(
      $.type, '->', $.type
    )),

    primitive_type: $ => choice(
      'i2', 'i4', 'i8', 'i16', 'i32', 'i64',
      'u2', 'u4', 'u8', 'u16', 'u32', 'u64',
      'index', 'boolean', 'string', 'rtExpr', 'rtType', 'rtTuple', 'rtTupleType',
      'f8', 'f16', 'f32', 'f64', 'f128', 'bf16', 'tf32',
      'Self', 'none',
    ),

    pointer_type: $ => seq(
      'ptr',
      '<',
      $.type,
      '>',
    ),

    tensor_type: $ => seq(
      'tensor',
      '<',
      $.type,
      optional(seq(',', /[0-9]+/)),
      '>',
    ),

    user_type: $ => seq(
      optional(seq($.access_vector, '::')),
      $.identifier,
      optional(
        seq(
          '<',
          $.type,
          repeat(seq(',', $.type)),
          '>'
        )
      ),
    ),

    group_type: $ => seq(
      '(',
      $.type,
      ')'
    ),

    //------------------------------------------------------------------------//
    /// Trait Expression
    //------------------------------------------------------------------------//

    trait_expression: $ => choice(
      $.single_trait_expression,
      $.or_trait_expression
    ),

    single_trait_expression: $ => seq(
      $.identifier,
      optional(seq(
        $.identifier,
        '<',
        $._types,
        '>',
      ))
    ),

    or_trait_expression: $ => prec.left(1, seq(
      $.trait_expression,
      '|',
      $.trait_expression
    )),

    //------------------------------------------------------------------------//
    /// Attributes
    //------------------------------------------------------------------------//

    attribute: $ => seq(
      'attr', '[',
      optional(seq(
        $.map_attribute_element,
        repeat(seq(',', $.map_attribute_element)),
      )),
      ']'
    ),

    attribute_data: $ => seq(
      $.map_attribute_data,
      $.value_attribute_data,
    ),

    map_attribute_data: $ => seq(
      '{',
      optional(seq(
        $.map_attribute_element,
        repeat(seq(',', $.map_attribute_element))
      )),
      '}'
    ),

    map_attribute_element: $ => seq(
      field('property', $.identifier),
      optional(seq(':',
        $.attribute_data),
      )
    ),

    value_attribute_data: $ => choice(
      $.expression
    ),


    //------------------------------------------------------------------------//
    /// Expressions
    //------------------------------------------------------------------------//

    expression: $ => choice(
      $._prefix_expression,
      $._infix_expression,
    ),

    _expressions: $ => seq(
      $.expression,
      repeat(seq(',', $.expression))
    ),

    _prefix_expression: $ => choice(
      $._prefix_expression_wo_statement_expression,
      $.let_expression,
      $.for_expression,
      $.while_expression,
      $.print_expression,
    ),

    _prefix_expression_wo_statement_expression: $ => choice(
      $.integer_literal,
      $.float_literal,
      $.identifier,
      $.string_literal,
      $.tensor_expression,
      $.tuple_expression,
      $.group_expression,
      $.builtin_function,
      $.rtType,
      $.if_expression,
      $.closure_expression,
      $.match_expression,

      $.runtime_expression,
      $.dummy_expression,

      $._unary_operator_expression,
    ),

    _infix_expression: $ => choice(
      $.assign_expression,
      $._binary_operator_expression
    ),

    tuple_expression: $ => seq(
      '(',
      $._expressions,
      optional(','),
      ')'
    ),

    boolean_literal: $ => choice(
      $.true_literal,
      $.false_literal
    ),

    string_literal: $ => seq(
      '"',
      repeat(choice(
        alias(token.immediate(prec(1, /[^\\"\n]+/)), $.string_content),
        $.escape_sequence,
      )),
      '"',
    ),

    escape_sequence: _ => token(prec(1, seq(
      '\\',
      choice(
        /[^xuU]/,
        /\d{2,3}/,
        /x[0-9a-fA-F]{2,}/,
        /u[0-9a-fA-F]{4}/,
        /U[0-9a-fA-F]{8}/,
      ),
    ))),

    group_expression: $ => seq(
      '(', $.expression, ')'
    ),

    if_expression: $ => prec.right(100, seq(
      'if',
      '(', $.expression, ')',
      $._block,
      optional(seq(
        'else',
        $._block
      ))
    )),

    closure_argument: $ => seq(
      $.identifier,
      optional(
        seq(':', $.type)
      )
    ),

    closure_expression: $ => prec(100, seq(
      'lambda',
      '(',
      $.closure_argument,
      repeat(seq(
        ',',
        $.closure_argument
      )),
      ')',
      optional(seq('->', $.type)),
      $._block
    )),

    tensor_expression: $ => prec(100, seq(
      'tensor',
      '(',
      $.expression,
      ',',
      choice(
        $.expression,
        seq(
          '{', $._expressions, optional(','), '}'
        )
      ),
      ')'
    )),

    _match_clause: $ => seq(
      '|',
      $._patterns,
      '->',
      $.expression,
    ),

    match_expression: $ => prec(100, seq(
      'match',
      $._expressions,
      'with',
      repeat1($._match_clause)
    )),

    assign_expression: $ => seq(
      $.expression,
      '<-',
      $.expression,
      optional($.expression)
    ),

    let_expression: $ => prec(100, seq(
      $.let_statement,
      optional($.expression)
    )),

    for_expression: $ => prec(100, seq(
      $.for_statement,
      optional($.expression)
    )),

    while_expression: $ => prec(100, seq(
      $.while_statement,
      optional($.expression)
    )),

    print_expression: $ => prec(100, seq(
      $.print_statement,
      optional($.expression)
    )),

    builtin_function_name_rt_specific: $ => choice(
      'rtTupleType', 'rtTuple', 'rtExpr', 'rtTensorType',
    ),

    builtin_function_name_wo_rt_speicific: $ => choice(
      'reshapeTo', 'shapeOf', 'getElementType', 'tupleSize', 'append', 'except', 'toStr', 'cast', 'bitcast',
    ),

    builtin_function_name: $ => choice(
      $.builtin_function_name_rt_specific,
      $.builtin_function_name_wo_rt_speicific
    ),

    builtin_function: $ => prec(100, choice(
      seq(
        field("name", $.builtin_function_name),
        optional($.template_arguments),
        '(',
        optional($._expressions),
        ')',
      ),
      $.math_unary_function,
      $.math_binary_function,
      $.intrinsic_function)),

    math_unary_function_name: $ => choice(
      '__abs', '__sin', '__cos', '__tan', '__atan', '__tanh', '__exp', '__log', '__log2', '__log10', '__sqrt'
    ),

    math_unary_function: $ => prec(100, seq(
      field("name", $.math_unary_function_name),
      '(',
      $._expressions,
      ')',
    )),

    math_binary_function_name: $ => choice(
      '__min', '__max', '__atan2'
    ),

    math_binary_function: $ => prec(100, seq(
      field("name", $.math_binary_function_name),
      '(',
      $.expression, ',', $.expression,
      ')'
    )),

    intrinsic_function_name: $ => choice(
      '__select', '__lookup'
    ),

    intrinsic_function: $ => seq(
      field("name", $.intrinsic_function_name),
      '(', $._expressions, ')'
    ),

    rtType: $ => seq(
      'rtType',
      '(', $.type, ')'
    ),

    dummy_expression: $ => "_end_",

    template_arguments: $ => seq(
      '<',
      $._types,
      '>'
    ),

    runtime_expression: $ => seq(
      '!{',
      $.rt_expression,
      '}'
    ),

    _unary_operator_expression: $ => prec.right(1, choice(
      seq('@', $.expression),
      seq('~', $.expression),
      seq('!', $.expression),
      seq('-', $.expression),
      seq('&', $.expression),
      seq('::', optional($.expression)),
      seq(':', optional($.expression), optional(seq(':', optional($.expression)))),
    )),

    _binary_operator_expression: $ => prec.right(1, choice(
      seq($.expression, '.', $.identifier),
      seq($.expression, '(', optional($._expressions), ')'),
      $.infix_template_arguments,
      seq($.expression, '[|', $.expression, '|]'),
      seq($.expression, '</', $.expression, '/>'),
      seq($.expression, '[', $.expression, ']'),
      seq($.expression, $.expression),
      seq($.expression, '<|', $.expression),
      seq($.expression, '|>', $.expression),
      seq($.expression, '*', $.expression),
      seq($.expression, '/', $.expression),
      seq($.expression, '%', $.expression),
      seq($.expression, '+', $.expression),
      seq($.expression, '-', $.expression),
      seq($.expression, '<<', $.expression),
      seq($.expression, '>>', $.expression),
      seq($.expression, '<', $.expression),
      seq($.expression, '>', $.expression),
      seq($.expression, '<=', $.expression),
      seq($.expression, '>=', $.expression),
      seq($.expression, '==', $.expression),
      seq($.expression, '!=', $.expression),
      seq($.expression, '&', $.expression),
      seq($.expression, '^', $.expression),
      seq($.expression, '|', $.expression),
      seq($.expression, '<<<', $.expression),
      seq($.expression, '>>>', $.expression),
      seq($.expression, '&&', $.expression),
      seq($.expression, '||', $.expression),
      seq($.expression, ':', $.expression),
      seq($.expression, '::', $.expression)
    )),

    infix_template_arguments: $ => seq(
      field('left', $.expression),
      field('arguments', $.template_arguments)
    ),

    //------------------------------------------------------------------------//
    /// Runtime
    //------------------------------------------------------------------------//

    rt_expression: $ => choice(
      $._rt_prefix_expression,
      $._rt_infix_expression,
    ),

    _rt_expressions: $ => seq(
      $.rt_expression,
      repeat(seq(',', $.rt_expression))
    ),

    rt_static_pattern: $ => seq(
      '${',
      $.expression,
      "}",
    ),

    rt_pattern: $ => choice(
      $.pattern,
      $.rt_static_pattern
    ),

    _rt_patterns: $ => seq(
      $.rt_pattern,
      repeat(seq(',', $.rt_pattern))
    ),

    rt_literal: $ => choice(
      $.integer_literal,
      $.float_literal,
      $.string_literal,
      $.boolean_literal,
      $.dummy_expression,
      $.identifier
    ),

    rt_tuple: $ => seq(
      '(',
      choice(
        seq(
          $.rt_expression,
          ',',
        ),
        seq(
          $.rt_expression,
          ',',
          $._rt_expressions,
          optional(','),
        )
      ),
      ')'
    ),

    rt_group: $ => seq(
      '(',
      $.rt_expression,
      ')'
    ),

    _rt_prefix_expression: $ => choice(
      $.rt_literal,
      $.rt_tensor_expression,
      $.rt_tuple,
      $.rt_group,

      $.rt_builtin_function,
      $.rt_math_unary_function,
      $.rt_intrinsic_function,

      $.rt_let_expression,
      $.rt_for_expression,
      $.rt_while_expression,
      $.rt_attribute,
      $.rt_print_expression,

      $.rt_static_expression,
      $.rt_if_expression,
      $.rt_match_expression,
      $.rt_closure_expression,
      $.dummy_expression,

      $._rt_unary_operator_expression,
    ),

    _rt_infix_expression: $ => choice(
      $.rt_assign_expression,
      $._rt_binary_operator_expression,
    ),

    _rt_unary_operator_expression: $ => prec.right(1, choice(
      seq('~', $.rt_expression),
      seq('!', $.rt_expression),
      seq('-', $.rt_expression),
      seq('&', $.rt_expression),
      seq('@', $.rt_expression),
      seq('::', optional($.rt_expression)),
      seq(':', optional($.rt_expression)),
    )),

    _rt_binary_operator_expression: $ => prec.right(1, choice(
      seq($.rt_expression, '.', $.identifier),
      seq($.rt_expression, '(', optional($._rt_expressions), ')'),
      seq($.rt_expression, '[|', $.rt_expression, '|]'),
      seq($.rt_expression, '[', $.rt_expression, ']'),
      seq($.rt_expression, $.rt_expression),
      seq($.rt_expression, '<|', $.rt_expression),
      seq($.rt_expression, '|>', $.rt_expression),
      seq($.rt_expression, '*', $.rt_expression),
      seq($.rt_expression, '/', $.rt_expression),
      seq($.rt_expression, '%', $.rt_expression),
      seq($.rt_expression, '+', $.rt_expression),
      seq($.rt_expression, '-', $.rt_expression),
      seq($.rt_expression, '<<', $.rt_expression),
      seq($.rt_expression, '>>', $.rt_expression),
      seq($.rt_expression, '<', $.rt_expression),
      seq($.rt_expression, '>', $.rt_expression),
      seq($.rt_expression, '<=', $.rt_expression),
      seq($.rt_expression, '>=', $.rt_expression),
      seq($.rt_expression, '==', $.rt_expression),
      seq($.rt_expression, '!=', $.rt_expression),
      seq($.rt_expression, '&', $.rt_expression),
      seq($.rt_expression, '^', $.rt_expression),
      seq($.rt_expression, '|', $.rt_expression),
      seq($.rt_expression, '<<<', $.rt_expression),
      seq($.rt_expression, '>>>', $.rt_expression),
      seq($.rt_expression, '&&', $.rt_expression),
      seq($.rt_expression, '||', $.rt_expression),
      seq($.rt_expression, ':', $.rt_expression),
      seq($.rt_expression, '::', $.rt_expression)
    )),

    rt_assign_expression: $ => seq(
      $.rt_expression,
      '<-',
      $.rt_expression,
      optional($.rt_expression)
    ),

    rt_builtin_function: $ => choice(
      seq(
        field("name", $.builtin_function_name_wo_rt_speicific),
        optional($.template_arguments),
        '(',
        optional($._rt_expressions),
        ')',
      ),
      seq(
        field("name", $.builtin_function_name_wo_rt_speicific),
        '</',
        $._expressions,
        '/>',
        '(',
        optional($._rt_expressions),
        ')'
      ),
    ),

    rt_math_unary_function: $ => seq(
      field("name", $.math_unary_function_name),
      '(',
      $.rt_expression,
      ')',
    ),

    rt_math_binary_function: $ => seq(
      field("name", $.math_binary_function_name),
      '(',
      $.rt_expression, ',', $.rt_expression,
      ')'
    ),

    rt_intrinsic_function: $ => seq(
      field("name", $.intrinsic_function_name),
      '(', $._rt_expressions, ')'
    ),

    rt_if_expression: $ => prec.left(100, seq(
      'if',
      '(', $.rt_expression, ')',
      $._rt_block,
      optional(seq(
        'else',
        $._rt_block
      )),
    )),

    _rt_block: $ => choice(
      seq(
        '{',
        $.rt_expression,
        '}'),
      $.rt_expression
    ),

    rt_static_expression: $ => seq(
      '${',
      $.expression,
      '}',
    ),

    rt_let_expression: $ => choice(
      $._rt_let_expression,
      $._rt_let_lambda_expression,
      $._rt_let_rec_lambda_expression
    ),

    _rt_let_expression: $ => seq(
      'let',
      optional('mut'),
      $._rt_patterns,
      '=',
      $._rt_expressions,
      optional($.rt_expression),
    ),

    rt_let_lambda_argument: $ => choice(
      $.identifier,
      $.rt_static_expression,
      seq(
        '(', $.identifier, ':', $.expression, ')'
      )
    ),

    _rt_let_lambda_expression: $ => seq(
      'let',
      optional('mut'),
      $.identifier,
      repeat1($.rt_let_lambda_argument),
      '=',
      $.rt_expression,
      optional($.rt_expression),
    ),

    _rt_let_rec_lambda_expression: $ => seq(
      'let',
      'rec',
      $.identifier,
      repeat1($.rt_let_lambda_argument),
      optional(seq('->', $.expression)),
      '=',
      $.rt_expression,
      optional($.rt_expression)
    ),

    rt_for_expression: $ => seq(
      'for',
      '(',
      $.rt_expression,
      'from',
      $.rt_expression,
      'to',
      $.rt_expression,
      optional(seq(
        'step',
        $.rt_expression
      )),
      ')',
      $._rt_block,
      optional($.rt_expression)
    ),

    rt_while_expression: $ => seq(
      'while',
      '(',
      $.rt_expression,
      ')',
      $._rt_block,
      optional($.rt_expression),
    ),

    rt_attribute: $ => seq(
      'attr', '[',
      $.map_attribute_data,
      ']',
      $.rt_expression
    ),

    rt_print_expression: $ => seq(
      'print',
      '(', $._rt_expressions, ')',
      optional($.rt_expression),
    ),

    rt_tensor_expression: $ => seq(
      'tensor',
      '(',
      $.rt_expression,
      ',',
      choice(
        $.rt_expression,
        seq(
          '{', $._rt_expressions, optional(','), '}'
        )
      ),
      ')',
    ),

    _rt_match_clause: $ => seq(
      '|',
      $._rt_patterns,
      '->',
      $.rt_expression,
    ),

    rt_match_expression: $ => seq(
      'match',
      $._rt_expressions,
      'with',
      repeat1($._rt_match_clause),
    ),

    rt_closure_argument: $ => seq(
      $.identifier,
      optional(seq(':', $.expression))
    ),

    rt_closure_expression: $ => seq(
      'lambda',
      '(',
      $.rt_closure_argument,
      repeat(seq(
        ',',
        $.rt_closure_argument
      )),
      ')',
      optional(seq('->', $.expression)),
      $._rt_block
    ),

    //------------------------------------------------------------------------//
    /// Statements
    //------------------------------------------------------------------------//

    statement: $ => choice(
      $.let_statement,
      $.for_statement,
      $.while_statement,
      $.print_statement,
      $.assign_statement,
      $.struct_declaration,
      $.struct_implementation,
      $.union_declaration,
      $.function_declaration,
      $.function_definition,
      $.runtime_function,
    ),

    let_statement: $ => choice(
      $._let_statement,
      $._let_lambda_statement,
      $._let_rec_statement
    ),

    /// let statement
    _let_statement: $ => seq(
      'let',
      optional('mut'),
      $._patterns,
      '=',
      $._expressions,
    ),

    _let_lambda_statement: $ => seq(
      'let',
      optional('mut'),
      $.identifier,
      repeat1($.let_lambda_argument),
      '=',
      $.expression
    ),

    _let_rec_statement: $ => seq(
      'let',
      'rec',
      $.identifier,
      repeat1($.let_lambda_argument),
      optional(seq('->', $.type)),
      '=',
      $.expression,
    ),

    let_lambda_argument: $ => choice(
      $.identifier,
      seq(
        '(', $.identifier, ':', $.type, ')'
      )
    ),


    /// for statemennt
    for_statement: $ => seq(
      optional($.attribute),
      'for',
      '(',
      $.identifier,
      'from',
      $.expression,
      'to',
      $.expression,
      optional(seq(
        'step',
        $.expression
      )),
      ')',
      $._block
    ),

    /// while statement
    while_statement: $ => seq(
      'while',
      '(',
      $.expression,
      ')',
      $._block
    ),

    /// assign statement
    assign_statement: $ => seq(
      $.expression,
      '<-',
      $.expression
    ),

    /// print statement
    print_statement: $ => seq(
      'print',
      '(', $._expressions, ')'
    ),


    _block: $ => seq(
      choice(
        seq(
          '{',
          $.expression,
          '}'),
        $.expression
      )
    ),


    template_parameters: $ => seq(
      '<',
      $.template_parameter,
      repeat(seq(',', $.template_parameter)),
      '>'
    ),

    template_parameter: $ => choice(
      seq(
        $.identifier,
        optional(seq(':', $.trait_expression))
      ),
      seq(
        $.lifetime_specifier,
        optional(
          seq('>',
            $.lifetime_specifier,
            repeat(seq(',', $.lifetime_specifier))
          )
        )
      )
    ),

    /// struct decl
    struct_declaration: $ => seq(
      'type',
      optional(field('template', $.template_parameters)),
      field('name', $.identifier),
      optional(seq(
        'with',
        $.trait_expression
      )),
      repeat1($._struct_declaration_body_cell)
    ),

    _struct_declaration_body_cell: $ => seq(
      optional(choice('public', 'private')),
      $._struct_declaration_variables
    ),

    _struct_declaration_variables: $ => seq(
      $.struct_declaration_variable,
      repeat(seq(optional(','), $.struct_declaration_variable))
    ),

    struct_declaration_variable: $ => seq(
      field('name', $.identifier),
      ':',
      field('type', $.type)
    ),


    /// struct impl
    struct_implementation: $ => seq(
      'impl',
      optional(field('template', $.template_parameters)),
      field('struct_type', $.type),
      optional($.struct_implementation_body)
    ),

    struct_implementation_body: $ =>
      repeat1(choice(
        $.struct_implementation_body_cell,
        $.struct_implementation_trait_cell
      )),

    struct_implementation_body_cell: $ => seq(
      choice('public', 'private'),
      repeat1($.function_definition)
    ),

    struct_implementation_trait_cell: $ => seq(
      'trait',
      $.trait_expression,
      repeat1($.function_definition)
    ),


    /// Union decl
    union_declaration: $ => seq(
      'type',
      optional(field("template", $.template_parameters)),
      field("name", $.identifier),
      repeat1($.union_declaration_cell)
    ),

    union_declaration_cell: $ => seq(
      '|',
      field('constructor', $.identifier),
      optional(
        seq(
          '(',
          $.type,
          repeat(seq(',', $.type)),
          ')'
        )
      )
    ),


    //------------------------------------------------------------------------//
    /// Functions
    //------------------------------------------------------------------------//

    function_parameter: $ => seq(
      choice(
        seq(
          choice('mut &', '&'),
          field("name", $.identifier),
          ':',
          field("lifetime", $.lifetime_specifier),
          field("type", $.type)
        ),
        seq(
          optional('mut'),
          field("name", $.identifier),
          ':',
          field("type", $.type),
        )
      )
    ),

    _function_parameters: $ => seq(
      $.function_parameter,
      repeat(seq(',', $.function_parameter))
    ),

    return_type: $ => seq(
      optional(seq(
        '&',
        $.lifetime_specifier,
      )),
      $.type
    ),

    function_declaration: $ => seq(
      optional($.attribute),
      'fun',
      optional(field("template", $.template_parameters)),
      field("name", $.identifier),
      '(',
      field("parameters", optional($._function_parameters)),
      ')',
      '->',
      field("return_type", $.return_type),
    ),

    function_definition: $ => seq(
      $.function_declaration,
      field("body", $._block)
    ),

    //------------------------------------------------------------------------//
    /// Runtime Functions
    //------------------------------------------------------------------------//

    runtime_function: $ => seq(
      optional(field("runtime_template", $.runtime_template)),
      optional($.attribute),
      '!',
      'fun',
      optional(field("template", $.template_parameters)),
      field("name", $.identifier),
      '(',
      field("parameters", $._runtime_parameters),
      ')',
      '->',
      field("return_type", $._runtime_function_return_type),
      field("body", $._block)
    ),

    runtime_template: $ => seq(
      'template',
      '</',
      $._function_parameters,
      '/>',
    ),

    _runtime_parameters: $ => seq(
      $.runtime_parameter,
      repeat(seq(',', $.runtime_parameter))
    ),

    runtime_parameter: $ => seq(
      choice(
        seq(
          choice('mut &', '&'),
          field('name', $.identifier),
          ':',
          $.lifetime_specifier,
          field('type', $.expression)
        ),
        seq(
          optional('mut'),
          field('name', $.identifier),
          ':',
          field('type', $.expression)
        )
      )
    ),

    _runtime_function_return_type: $ => seq(
      optional(seq(
        '&',
        $.lifetime_specifier,
      )),
      $.expression
    ),

    //------------------------------------------------------------------------//
    /// Trait Definition
    //------------------------------------------------------------------------//

    trait_definition: $ => seq(
      'trait',
      optional(field("template", $.template_parameters)),
      $.identifier,
      optional(
        seq(
          ':', $.trait_expression
        )
      ),
      repeat($.function_declaration)
    ),

    lifetime_specifier: $ => seq(
      "`",
      $.identifier
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    true_literal: $ => token('true'),
    false_literal: $ => token('false'),

    integer_literal: $ => token(
      seq(
        choice(
          seq(
            '0b',
            /[01_]+/,
          ),
          seq('0x',
            /[0-9a-fA-F]+/,),
          /[0-9]+/,
        ),
        optional(choice('i', 'u',
          seq(
            /[ui]/,
            /2|4|8|16|32|64/
          ))),
      )
    ),

    float_literal: $ => token(
      choice(
        "inf",
        seq(
          /[0-9]+/,
          optional(
            seq(
              '.',
              optional(/[0-9]+/)),
          ),
          optional(
            seq(
              /[eE][+-]/,
              /[0-9]+/
            )
          ),
          optional(
            choice('f', 'b', 's',
              seq(
                'f',
                /8|16|32|64|128/
              ),
              'bf16', 'tf32'
            ))
        ),
      )

    ),

    // http://stackoverflow.com/questions/13014947/regex-to-match-a-c-style-multiline-comment/36328890#36328890
    comment: _ => token(choice(
      seq('//', /(\\+(.|\r?\n)|[^\\\n])*/),
      seq(
        '/*',
        /[^*]*\*+([^/*][^*]*\*+)*/,
        '/',
      ),
    )),
  }
});
