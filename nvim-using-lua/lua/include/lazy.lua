local lazypath = vim.fn.stdpath 'data' .. '/lazy/lazy.nvim'
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = 'https://github.com/folke/lazy.nvim.git'
  local out = vim.fn.system { 'git', 'clone', '--filter=blob:none', '--branch=stable', lazyrepo, lazypath }
  if vim.v.shell_error ~= 0 then
    error('Error cloning lazy.nvim:\n' .. out)
  end
end ---@diagnostic disable-next-line: undefined-field
vim.opt.rtp:prepend(lazypath)

require('lazy').setup({
  require 'plugins.cmake-tools',
  require 'plugins.comment',
  require 'plugins.conform',
  require 'plugins.diffview',
  require 'plugins.distant',
  require 'plugins.dressing',
  require 'plugins.eyeliner',
  require 'plugins.fugitive',
  require 'plugins.gitsigns',
  require 'plugins.lazydev',
  require 'plugins.lualine',
  require 'plugins.luvit-meta',
  require 'plugins.mini',
  require 'plugins.notify',
  require 'plugins.nvim-cmp',
  require 'plugins.nvim-lspconfig',
  require 'plugins.nvim-treesitter',
  require 'plugins.nvim-window',
  require 'plugins.overseer',
  require 'plugins.spider',
  require 'plugins.telescope',
  require 'plugins.toggleterm',
  require 'plugins.trouble',
  require 'plugins.various-textobjs',
  require 'plugins.vim-sleuth',
  require 'plugins.vim-spirv',
  require 'plugins.vimspector',
  require 'plugins.which-key',
  require 'plugins.wrapping',
  require 'plugins.zenburn',

  -- kickstart default plugins
  -- require 'plugins.debug',
  -- require 'plugins.indent_line',
  -- require 'plugins.lint',
  require 'plugins.autopairs',
  require 'plugins.neo-tree',
  -- require 'plugins.gitsigns',
}, {
  ui = {
    icons = vim.g.have_nerd_font and {} or {
      cmd = '⌘',
      config = '🛠',
      event = '📅',
      ft = '📂',
      init = '⚙',
      keys = '🗝',
      plugin = '🔌',
      runtime = '💻',
      require = '🌙',
      source = '📄',
      start = '🚀',
      task = '📌',
      lazy = '💤 ',
    },
  },
})
