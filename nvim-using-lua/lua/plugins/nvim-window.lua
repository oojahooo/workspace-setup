return {
  'yorickpeterse/nvim-window',
  keys = {
    { '<leader>wj', "<cmd>lua require('nvim-window').pick()<cr>", desc = 'nvim-window: Jump to window' },
  },
  config = true,
  opts = {
    chars = {
      'q',
      'w',
      'e',
      'r',
      'a',
      's',
      'd',
      'f',
    },
  },
}
