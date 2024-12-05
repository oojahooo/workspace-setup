return {
  'chrisgrieser/nvim-spider',
  lazy = true,
  config = function()
    require('spider').setup {
      skipInsignificantPunctuation = true,
      consistentOperatorPending = false,
      subworkMovement = true,
      customPatterns = {},
    }
  end,
  keys = {
    { 'w', "<cmd>lua require('spider').motion('w')<CR>", mode = { 'n', 'o', 'x' } },
    { 'e', "<cmd>lua require('spider').motion('e')<CR>", mode = { 'n', 'o', 'x' } },
    { 'b', "<cmd>lua require('spider').motion('b')<CR>", mode = { 'n', 'o', 'x' } },
  },
}
