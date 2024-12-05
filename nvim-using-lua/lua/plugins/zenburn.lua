return {
  'phha/zenburn.nvim',
  opts = {},
  config = function(_)
    require('zenburn').setup()
    vim.cmd [[colorscheme zenburn]]
  end,
}
