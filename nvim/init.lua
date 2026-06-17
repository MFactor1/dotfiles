local vim = vim
local Plug = vim.fn['plug#']

vim.call('plug#begin')

Plug('catppuccin/nvim', { ['as'] = 'catppuccin' })
Plug('neoclide/coc.nvim', { ['branch'] = 'release' })
Plug('nvim-lua/plenary.nvim')
Plug('nvim-telescope/telescope.nvim', { ['branch'] = 'master' })
Plug('nvim-telescope/telescope-fzf-native.nvim', { ['do'] = 'make' })
Plug('MunifTanjim/nui.nvim')
Plug('Bekaboo/dropbar.nvim')
Plug('lukas-reineke/indent-blankline.nvim')
Plug('lewis6991/gitsigns.nvim')
Plug('lervag/vimtex')
Plug('leafgarland/typescript-vim')
Plug('peitalin/vim-jsx-typescript')
Plug('Vimjas/vim-python-pep8-indent')
Plug('kdheepak/lazygit.nvim')
Plug('neovim/nvim-lspconfig')
Plug('hrsh7th/nvim-cmp')
Plug('hrsh7th/cmp-nvim-lsp')
Plug('romus204/tree-sitter-manager.nvim')

vim.call('plug#end')

vim.g.mapleader = " "
vim.g.vimtex_mappings_prefix = "\\"
vim.g.vimtex_view_method = "general"
vim.opt.updatetime = 300
vim.opt.swapfile = false
vim.opt.wrap = false

-- nvim LSP setup
vim.lsp.inlay_hint.enable(true)

local capabilities = require('cmp_nvim_lsp').default_capabilities()
capabilities.textDocument.inlayHint = {}

-- LSP config for gopls
vim.lsp.config("gopls", {
    capabilities = capabilities,
    settings = {
        gopls = {
            buildFlags = { "-tags=unit,e2e" },
            completeUnimported = true,
            usePlaceholders = true,
        },
    },
})
vim.lsp.enable("gopls")

-- Display LSP diagnostics
vim.diagnostic.config({
  -- show error text inline
  virtual_text = true,

  -- pop-up windows
  float = {
    border = "rounded",
    source = true,
  },
})

require('tree-sitter-manager').setup({
    ensure_installed = {
        "python",
        "yaml",
        "hyprlang",
        "javascript",
        "go",
        "latex",
        "lua",
        "toml",
        "zsh",
        "cpp",
    },
})

-- coc auto install extensions
vim.g.coc_global_extensions = {
	'coc-json',
	'coc-sh',
	'coc-pyright',
	'coc-zig',
	'coc-cmake',
	'coc-java',
	'coc-tsserver',
	'coc-html',
	'coc-clangd',
	'coc-rust-analyzer',
}

-- setup left side columm
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.signcolumn = 'yes:2'

-- formatting opts
vim.opt.expandtab = true
vim.opt.shiftwidth = 4
vim.opt.tabstop = 4
vim.opt.softtabstop = 4

-- Set filetypes as typescriptreact for .tsx and .jsx files
vim.api.nvim_create_autocmd({ "BufNewFile", "BufRead" }, {
    pattern = { "*.tsx", "*.jsx" },
    command = "set filetype=typescriptreact",
})

-- Set TS indenting
vim.api.nvim_create_augroup("typescriptindent", { clear = true })
vim.api.nvim_create_autocmd("FileType", {
    group = "typescriptindent",
    pattern = "typescript",
    callback = function()
        vim.opt_local.expandtab = true
        vim.opt_local.tabstop = 2
        vim.opt_local.shiftwidth = 2
    end,
})

-- Set JS indenting
vim.api.nvim_create_augroup("javascriptindent", { clear = true })
vim.api.nvim_create_autocmd("FileType", {
    group = "javascriptindent",
    pattern = "javascript",
    callback = function()
        vim.opt_local.expandtab = true
        vim.opt_local.tabstop = 2
        vim.opt_local.shiftwidth = 2
    end,
})

-- Set TSX indenting
vim.api.nvim_create_augroup("typescriptreactindent", { clear = true })
vim.api.nvim_create_autocmd("FileType", {
    group = "typescriptreactindent",
    pattern = "typescriptreact",
    callback = function()
        vim.opt_local.expandtab = true
        vim.opt_local.tabstop = 2
        vim.opt_local.shiftwidth = 2
    end,
})

-- Set JSX indenting
vim.api.nvim_create_augroup("javascriptreactindent", { clear = true })
vim.api.nvim_create_autocmd("FileType", {
    group = "javascriptreactindent",
    pattern = "javascriptreact",
    callback = function()
        vim.opt_local.expandtab = true
        vim.opt_local.tabstop = 2
        vim.opt_local.shiftwidth = 2
    end,
})

-- Set XML indenting
vim.api.nvim_create_augroup("xmlindent", { clear = true })
vim.api.nvim_create_autocmd("FileType", {
    group = "xmlindent",
    pattern = "xml",
    callback = function()
        vim.opt_local.expandtab = true
        vim.opt_local.tabstop = 2
        vim.opt_local.shiftwidth = 2
    end,
})

local keyset = vim.keymap.set

-- sidebar git change indicators
require('gitsigns').setup({
	signs = {
		sign_priority = 1000,
	},
})

-- vertical tabspace lines
require("ibl").setup()

-- breaks telescope
--[[
require("dropbar").setup({
	bar = {
		enable = true,
		sources = function(buf, _)
		  local sources = require('dropbar.sources')
		  local utils = require('dropbar.utils')
		  if vim.bo[buf].ft == 'markdown' then
			return {
			  sources.path,
			  sources.lsp,
			  sources.markdown,
			}
		  end
		  if vim.bo[buf].buftype == 'terminal' then
			return {
			  sources.terminal,
			}
		  end
		  return {
			sources.path,
			sources.lsp,
		  }
		end,
	}
})
--]]

local cmp = require('cmp')

-- nvim-cmp setup
cmp.setup({
    snippet = {
        expand = function(args)
            vim.snippet.expand(args.body)
        end,
    },
    mapping = cmp.mapping.preset.insert({
        ["<C-Space>"] = cmp.mapping.complete(),
        ["<C-e>"] = cmp.mapping.abort(),
        ["<CR>"] = cmp.mapping.confirm({ select = true }),
        ["<Down>"] = cmp.mapping(function(fallback)
            if cmp.visible() then
                cmp.select_next_item()
            else
                fallback() -- Moves cursor down normally if menu is closed
            end
        end, { "i", "s" }),

        ["<Up>"] = cmp.mapping(function(fallback)
            if cmp.visible() then
                cmp.select_prev_item()
            else
                fallback() -- Moves cursor up normally if menu is closed
            end
        end, { "i", "s" }),
        -- Scroll documentation window with mouse wheel
        ["<ScrollWheelUp>"] = cmp.mapping(function(fallback)
            if cmp.visible() then
                cmp.scroll_docs(-1) -- Scrolls up 1 line
            else
                fallback()
            end
        end, { "i", "s" }),

        ["<ScrollWheelDown>"] = cmp.mapping(function(fallback)
            if cmp.visible() then
                cmp.scroll_docs(1) -- Scrolls down 1 line
            else
                fallback()
            end
        end, { "i", "s" }),
    }),
    sources = cmp.config.sources({
        { name = "nvim_lsp" },
    }, {
        { name = "buffer" },
    }),
})

-- autocomplete
function _G.check_back_space()
    local col = vim.fn.col('.') - 1
    return col == 0 or vim.fn.getline('.'):sub(col, col):match('%s') ~= nil
end

-- autocomplete keymap
local opts = {silent = true, noremap = true, expr = true, replace_keycodes = false}
keyset("i", "<TAB>", 'coc#pum#visible() ? coc#pum#confirm() : v:lua.check_back_space() ? "<TAB>" : coc#refresh()', opts)

-- Copilot accept keymap
vim.keymap.set('i', '<D-a>', 'copilot#Accept("")', {
    expr = true,
    replace_keycodes = false
})
vim.g.copilot_no_tab_map = true

-- highlight symbol under curson
vim.api.nvim_create_augroup("CocGroup", {})
vim.api.nvim_create_autocmd("CursorHold", {
    group = "CocGroup",
    command = "silent call CocActionAsync('highlight')",
    desc = "Highlight symbol under cursor on CursorHold"
})

-- telescope keybinds
keyset('n', '<leader>f', ':Telescope find_files <CR>')
keyset('n', '<leader>g', ':Telescope live_grep <CR>')
keyset('n', '<leader>c', ':Telescope grep_string <CR>')
keyset('n', '<leader>wq', ':wall <CR>:q <CR>') -- save and close all

-- lazygit keybind
keyset('n', '<leader>lg', ':LazyGit <CR>')

-- lsp keybinds
keyset('n', '<leader>v', vim.diagnostic.open_float)

-- coc keybinds
keyset('n', '<leader>gd', '<Plug>(coc-definition)')
keyset('n', '<leader>em', ':CocCommand rust-analyzer.expandMacro <CR>')

-- trailing whitespace/newline highlighting
vim.cmd('highlight EoLSpace ctermbg=244 guibg=#5e3f53')
vim.cmd('match EoLSpace /\\s\\+$/')
--vim.cmd('highlight EoFNewline ctermbg=244 guibg=#5e3f53')
--vim.cmd('match EoFNewline /^\\n\\%$/')

-- import the selected theme selection (this can change based on setup options)
require('selected-theme')
