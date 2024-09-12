import type { Theme } from '.'

export const LEFT = 0
export const RIGHT = 1
export const SIDE = 2
export const DOWN = 3

// TODO: move to options
export const GAP = 30 // must sync with --gap in index.less

export const THEME: Theme = {
  name: 'Latte',
  palette: ['#dd7878', '#ea76cb', '#8839ef', '#e64553', '#fe640b', '#df8e1d', '#40a02b', '#209fb5', '#1e66f5', '#7287fd'],
  cssVar: {
    '--main-color': '#444446',
    '--main-bgcolor': '#ffffff',
    '--color': '#777777',
    '--bgcolor': '#f6f6f6',
    '--panel-color': '#444446',
    '--panel-bgcolor': '#ffffff',
    '--panel-border-color': '#eaeaea',
  },
}

export const DARK_THEME: Theme = {
  name: 'Dark',
  palette: ['#848FA0', '#748BE9', '#D2F9FE', '#4145A5', '#789AFA', '#706CF4', '#EF987F', '#775DD5', '#FCEECF', '#DA7FBC'],
  cssVar: {
    '--main-color': '#ffffff',
    '--main-bgcolor': '#4c4f69',
    '--color': '#cccccc',
    '--bgcolor': '#252526',
    '--panel-color': '#ffffff',
    '--panel-bgcolor': '#2d3748',
    '--panel-border-color': '#696969',
  },
}
