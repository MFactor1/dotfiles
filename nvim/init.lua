local vim = vim
local Plug = vim.fn['plug#']

vim.call('plug#begin')

Plug('catppuccin/nvim', { ['as'] = 'catppuccin'})
Plug('neoclide/coc.nvim', { ['branch'] = 'release' })
Plug('nvim-lua/plenary.nvim')
Plug('nvim-telescope/telescope.nvim', { ['branch'] = '0.1.x' })
--Plug('Bekaboo/dropbar.nvim')
Plug('lukas-reineke/indent-blankline.nvim')
Plug('lewis6991/gitsigns.nvim')

vim.call('plug#end')

vim.g.coc_global_extensions = {'coc-json', 'coc-sh', 'coc-pyright', 'coc-zig', 'coc-cmake'}

vim.opt.updatetime = 300
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.signcolumn = 'yes:2' 

local keyset = vim.keymap.set

require("catppuccin").setup({
	flavour = "mocha",
	styles = {
		comments = { "italic" },
		functions = { "bold" },
		keywords = { "italic" },
		operators = { "bold" },
		conditionals = { "bold" },
		loops = { "bold" },
		booleans = { "bold", "italic" },
		numbers = {},
		types = {},
		strings = {},
		variables = {},
		properties = {},
	},
	--[[
	color_overrides = {
		mocha = {
			base = "#000000",
			mantle = "#000000",
			crust = "#000000",
		},
	},
	]]--
	integrations = {
		coc_nvim = true,
		telescope = {
			enabled = true,
		},
	},
})

vim.cmd('colorscheme catppuccin')

require('gitsigns').setup {
	signs = {
		sign_priority = 1000,
	},
}

require("ibl").setup()
require('gitsigns').setup()

function _G.check_back_space()
    local col = vim.fn.col('.') - 1
    return col == 0 or vim.fn.getline('.'):sub(col, col):match('%s') ~= nil
end

local opts = {silent = true, noremap = true, expr = true, replace_keycodes = false}
keyset("i", "<TAB>", 'coc#pum#visible() ? coc#pum#confirm() : v:lua.check_back_space() ? "<TAB>" : coc#refresh()', opts)

vim.api.nvim_create_augroup("CocGroup", {})
vim.api.nvim_create_autocmd("CursorHold", {
    group = "CocGroup",
    command = "silent call CocActionAsync('highlight')",
    desc = "Highlight symbol under cursor on CursorHold"
})

keyset('n',  '<S-f>', ':Telescope find_files <CR>')

