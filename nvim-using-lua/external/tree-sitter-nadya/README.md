
# tree-sitter-nadya
## Introduction

This project is for helping nadya developer by providing a simple syntax highlighting.

## Installation
### nvim-treesitter

You can integrate `tree-sitter-nadya` with `nvim-treesitter` by adding the following to your configuration.

```bash
git clone --depth 1 git@github.com:ENERZAi/tree-sitter-nadya.git
mkdir -p ~/.local/share/nvim/lazy/nvim-treesitter/queries/nadya
cp tree-sitter-nadya/queries/* ~/.local/share/nvim/lazy/nvim-treesitter/queries/nadya
```
Unfortunately, we need to add highlight query manually. If you are using `Lazy` package manager, `nvim-treesitter` directory might be `~/.local/share/nvim/lazy/nvim-treesitter`. Download this repository and copy `queries` directory to `~/.local/share/nvim/lazy/nvim-treesitter/queries/nadya`.

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.nadya = {
  install_info = {
    url = "path to downloaded tree-sitter-nadya",
    files = { "src/parser.c" },
    branch = "main",
    generate_requires_npm = false,
    requires_generate_from_grammar = false,
  },
  filetype = "nadya",
}

vim.filetype.add {
    pattern = {
        ["*.ndy"] = "nadya",
    }
}
```

Add this configuration in your neovim configuration files and add dependency appropriately. You need to fill `url` with the path to downloaded `tree-sitter-nadya` repository.

```vim
au BufRead,BufNewFile *.ndy set filetype=nadya
```

Above code make vim tend `*.ndy` files to `nadya` filetype and execute following commands.

```vim
:TSInstall nadya
```

Now you integrated `nadya` and `nvim`.


## References
- [tree-sitter](https://tree-sitter.github.io/tree-sitter/)
- [Nadya](https://github.com/ENERZAi/Nadya)
