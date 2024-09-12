require "nvchad.mappings"

-- add yours here

local map = vim.keymap.set

map("n", ";", ":", { desc = "CMD enter command mode" })
map("i", "jk", "<ESC>")

map("n", "n", "nzz")
map("n", "N", "Nzz")

map("n", "<C-h>", "^")
map("n", "<C-l>", "$")
map("n", "<C-j>", "G")
map("n", "<C-k>", "gg")

map("i", "<C-d>", "<Del>")

-- map({ "n", "i", "v" }, "<C-s>", "<cmd> w <cr>")
