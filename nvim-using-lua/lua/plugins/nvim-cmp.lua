return{
    {
        'hrsh7th/nvim-cmp',
        lazy = false,
        priority = 100,
        dependencies = {
            'hrsh7th/cmp-nvim-lsp',
            'hrsh7th/cmp-buffer',
            'hrsh7th/cmp-path',
            'hrsh7th/cmp-nvim-lsp',
            'hrsh7th/cmp-nvim-lsp-signature-help',
            'onsails/lspkind.nvim',
            'ray-x/cmp-treesitter',
            'L3MON4D3/LuaSnip'
        },
        event = "InsertEnter",
        config = function()
        local cmp = require 'cmp'
        local luasnip = require 'luasnip'
        cmp.setup {
            snippet = {
                expand = function(args)
                    luasnip.lsp_expand(args.body)
                end,
            },
            formatting = {
                format = require 'lspkind'.cmp_format {
                    mode = "symbol_text",
                    menu = {
                        nvim_lsp = "[LSP]",
                        buffer = "[Buffer]",
                        latex_symbols = "[Latex]",
                        luasnip = "[LuaSnip]",
                    }
                }
            },
            window = {
                completion = cmp.config.window.bordered(),
                documentation = cmp.config.window.bordered(),
            },
            view = {
                entries = {
                    name = 'custom',
                    selection_order = 'near_cursor'
                }
            },
            mapping = cmp.mapping.preset.insert({
                ['<C-b>'] = cmp.mapping.scroll_docs(-4),
                ['<C-f>'] = cmp.mapping.scroll_docs(4),
                ['<C-Space>'] = cmp.mapping.complete(),
                ['<CR>'] = cmp.mapping.confirm {
                    behavior = cmp.ConfirmBehavior.Replace,
                    select = true,
                },
                ['<Tab>'] = cmp.mapping(function(fallback)
                    if cmp.visible() then
                        cmp.select_next_item()
                    elseif luasnip.expand_or_jumpable() then
                        luasnip.expand_or_jump()
                    else
                        fallback()
                    end
                end, { 'i', 's' }),
                ['<S-Tab>'] = cmp.mapping(function(fallback)
                    if cmp.visible() then
                        cmp.select_prev_item()
                    elseif luasnip.jumpable(-1) then
                        luasnip.jump(-1)
                    else
                        fallback()
                    end
                end, { 'i', 's' }),
            }),
            sources = cmp.config.sources({
                { name = 'nvim_lsp' },
                { name = 'luasnip' },
                { name = 'buffer' },
                { name = 'calc' },
                { name = 'path' },
                { name = 'treesitter' },
            })
        }
    end
    }

}
