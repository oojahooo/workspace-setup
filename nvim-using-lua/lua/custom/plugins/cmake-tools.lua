return {
  'Civitasv/cmake-tools.nvim',
  lazy = true,
  init = function()
    local loaded = false
    local function check()
      local cwd = vim.uv.cwd()
      if vim.fn.filereadable(cwd .. '/CMakeLists.txt') == 1 then
        require('lazy').load { plugins = { 'cmake-tools.nvim' } }
        loaded = true
      end
    end
    check()
    vim.api.nvim_create_autocmd('DirChanged', {
      callback = function()
        if not loaded then
          check()
        end
      end,
    })
  end,
  opts = {},
  keys = {
    { '<leader>cg', '<cmd>CMakeGenerate<cr>', desc = 'CMake: Generate Build System' },
    { '<leader>cb', '<cmd>CMakeBuild<cr>', desc = 'CMake: Build Using Generated Build System' },
    { '<leader>cp', '<cmd>CMakeSelectConfigurePreset<cr>', desc = 'CMake: Select Configure Preset' },
    { '<leader>ct', '<cmd>CMakeSelectBuildTarget<cr>', desc = 'CMake: Select Build Target' },
  },
}
