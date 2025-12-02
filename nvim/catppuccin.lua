local vim = vim

-- catppuccin setup
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
        nvimtree = true,
		coc_nvim = true,
		telescope = {
			enabled = true,
		},
	},
})

vim.cmd('colorscheme catppuccin')
