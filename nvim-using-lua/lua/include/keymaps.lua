-- [[ Basic Keymaps ]]
--  See `:help vim.keymap.set()`

-- Disable default keymap 's' in normal mode
vim.keymap.set('n', 's', '<nop>', { noremap = true, silent = true })

-- Clear highlights on search when pressing <Esc> in normal mode
--  See `:help hlsearch`
vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>')

-- Diagnostic keymaps
vim.keymap.set('n', '<leader>q', vim.diagnostic.setloclist, { desc = 'Open diagnostic [Q]uickfix list' })

-- move cursor more fast
vim.keymap.set('n', '<C-h>', '^', { desc = 'Move cursor to start of line' })
vim.keymap.set('n', '<C-l>', '$', { desc = 'Move cursor to end of line' })
vim.keymap.set('n', '<C-j>', 'G', { desc = 'Move cursor to end of file' })
vim.keymap.set('n', '<C-k>', 'gg', { desc = 'Move cursor to start of file' })

-- locate cursor as center of screen when searching
vim.keymap.set('n', 'n', 'nzz')
vim.keymap.set('n', 'N', 'Nzz')

-- move cursor to next/prev same word
vim.keymap.set('n', '<C-n>', '*')
vim.keymap.set('n', '<C-p>', '#')

-- keymaps for internal terminal
vim.keymap.set('n', '<C-w>t', ':vs<CR>:term<CR>', { desc = 'Split window vertically and open terminal' })
vim.keymap.set('t', '<C-[>', '<C-\\><C-n>', { desc = 'Switch from terminal mode to normal mode' })
