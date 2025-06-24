-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- Disable default keymap 's' in normal mode
vim.keymap.set("n", "s", "<nop>", { noremap = true, silent = true })

-- Clear highlights on search when pressing <Esc> in normal mode
--  See `:help hlsearch`
vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<CR>")

-- Diagnostic keymaps
vim.keymap.set("n", "<leader>q", vim.diagnostic.setloclist, { desc = "Open diagnostic [Q]uickfix list" })

-- move cursor more fast
-- vim.keymap.set("n", "<C-h>", "^", { desc = "Move cursor to start of line" })
-- vim.keymap.set("n", "<C-l>", "$", { desc = "Move cursor to end of line" })

-- locate cursor as center of screen when searching
vim.keymap.set("n", "n", "nzz")
vim.keymap.set("n", "N", "Nzz")

-- move cursor to next/prev same word
vim.keymap.set("n", "<C-n>", "*")
vim.keymap.set("n", "<C-p>", "#")

-- keymaps for internal terminal
vim.keymap.set("n", "<C-w>t", ":vs<CR>:term<CR>", { desc = "Split window vertically and open terminal" })
vim.keymap.set("t", "<C-[>", "<C-\\><C-n>", { desc = "Switch from terminal mode to normal mode" })

-- keymaps for vimspector
vim.keymap.set("n", "<leader>di", "<Plug>VimspectorBalloonEval", { desc = "Inspect word in debug mode" })
vim.keymap.set("x", "<leader>di", "<Plug>VimspectorBalloonEval", { desc = "Inspect text in debug mode" })

vim.keymap.set("n", "<leader>bt", ":VimspectorEval bt<CR>", { desc = "Vimspector: show backtrace" })
vim.keymap.set("n", "<leader>fi", ":VimspectorEval frame info<CR>", { desc = "Vimspector: show frame info" })

vim.keymap.set("n", "<leader>gf", ":lua GetNumberForVimspector()<CR>", { desc = "Vimspector: go to specific frame" })

function GetNumberForVimspector()
  local num = vim.fn.nr2char(vim.fn.getchar())

  if not num:match("%d") then
    print("The argument is not a number.")
    return
  end

  vim.cmd("VimspectorEval f " .. num)
end

vim.keymap.set("n", "<leader>fu", ":VimspectorEval up<cr>", { desc = "Vimspector: go up from current frame" })
vim.keymap.set("n", "<leader>fd", ":VimspectorEval up<cr>", { desc = "Vimspector: go down from current frame" })
