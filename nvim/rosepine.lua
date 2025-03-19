local vim = vim

-- "rosepine" is actually just catppuccin with different bg colors since I hate the rosepine highlighting
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
	color_overrides = {
		mocha = {
			base = "#191724",
			mantle = "#1f1d2e",
			crust = "#26233a",
		},
	},
	integrations = {
		coc_nvim = true,
		telescope = {
			enabled = true,
		},
	},
})

vim.cmd('colorscheme catppuccin')
