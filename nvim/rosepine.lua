local vim = vim

-- "rosepine" is actually just catppuccin with different bg colors since I hate the rosepine highlighting
require("catppuccin").setup({
	flavour = "mocha",
	styles = {
		comments = { "italic" },
		functions = { "bold" },
		keywords = { "italic", "bold" },
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
    custom_highlights = function(colors)
        return {
            Type = { fg = colors.yellow },
            Keyword = { fg = colors.mauve },
            Boolean = { fg = colors.mauve },
            ["@punctuation.bracket"] = { fg = colors.text }, -- () [] {}
            ["@punctuation.delimiter"] = { fg = colors.text }, -- , ; :
            ["@punctuation.special"] = { fg = colors.text },
            ["@variable"] = { fg = colors.text },
            ["@variable.parameter"] = { fg = colors.red },
            ["@variable.builtin"] = { fg = colors.red },
            ["@operator"] = { fg = colors.teal, style = { "bold" } },
            ["@type.builtin.python"] = { fg = colors.peach },
            ["@constant.python"] = { fg = colors.lavender },
            ["@function.call"] = { fg = colors.blue, style = { "bold" } },
            ["@method.call"] = { fg = colors.blue, style = { "bold" } },
            ["@string.documentation.python"] = { fg = colors.subtext0 },
            ["@constant.builtin.python"] = { fg = colors.mauve, style = { "bold", "italic" } },
            ["@function.builtin.python"] = { fg = colors.mauve, style = { "bold" }},
            ["@constructor.python"] = { fg = colors.sapphire },
            ["@string.regexp"] = { fg = colors.pink },
        }
    end,
	integrations = {
        nvimtree = true,
		coc_nvim = true,
		telescope = {
			enabled = true,
		},
	},
})

vim.cmd('colorscheme catppuccin')
