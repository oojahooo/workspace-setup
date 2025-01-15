-- config commentstring by filetype
local ft = require 'Comment.ft'

ft.mlir = '// %s'
ft.llvm = '; %s'
ft.nadya = '// %s'

-- config nadya treesitter
local parser_config = require('nvim-treesitter.parsers').get_parser_configs()

parser_config.nadya = {
  install_info = {
    url = '/home/oojahooo/.config/nvim/external/tree-sitter-nadya',
    files = { 'src/parser.c' },
    branch = 'main',
    generate_requires_npm = false,
    requires_generate_from_grammar = false,
  },
  filetype = 'nadya',
}
