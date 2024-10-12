return {
  'chrisgrieser/nvim-various-textobjs',
  event = 'UIEnter',
  opts = {
    useDefaultKeymaps = true,
    disabledKeymaps = { 'aS', 'iS' },
  },
  keys = {
    { 'a<leader>w', '<cmd>lua require("various-textobjs").subword("outer")<CR>', mode = { 'o', 'x' } },
    { 'i<leader>w', '<cmd>lua require("various-textobjs").subword("inner")<CR>', mode = { 'o', 'x' } },
  },
}
