import type { MindElixirData } from '../index'
import { codeBlock, katexHTML, styledDiv } from './htmlText'

const aboutMindElixir: MindElixirData = {
  nodeData: {
    id: 'me-root',
    topic: 'Mind Elixir',
    root: true,
    tags: ['Mind Map Core'],
    children: [
      {
        topic: 'logo2',
        id: '56dae51a90d350a8',
        direction: 0,
        expanded: true,
        children: [
          {
            id: 'use-image',
            topic: 'mind-elixir',
            image: {
              url: 'https://raw.githubusercontent.com/ssshooter/mind-elixir-core/master/images/logo2.png',
              height: 90,
              width: 90,
            },
          },
        ],
      },
      {
        topic: 'What is Mind Elixir',
        id: 'bd4313fbac40284b',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'A mind map core',
            id: 'beeb823afd6d2114',
          },
          {
            topic: 'Free',
            id: 'c1f068377de9f3a0',
          },
          {
            topic: 'Open-Source',
            id: 'c1f06d38a09f23ca',
          },
          {
            topic: 'Use without JavaScript framework',
            id: 'c1f06e4cbcf16463',
            expanded: true,
            children: [],
          },
          {
            topic: 'Use in your own project',
            id: 'c1f1f11a7fbf7550',
            children: [
              {
                topic: "import MindElixir from 'mind-elixir'",
                id: 'c1f1e245b0a89f9b',
              },
              {
                topic: 'new MindElixir({...}).init(data)',
                id: 'c1f1ebc7072c8928',
              },
            ],
          },
          {
            topic: 'Easy to use',
            id: 'c1f0723c07b408d7',
            expanded: true,
            children: [
              {
                topic: 'Use it like other mind map application',
                id: 'c1f09612fd89920d',
              },
            ],
          },
        ],
      },
      {
        topic: 'Basics',
        id: 'bd1b66c4b56754d9',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'tab - Create a child node',
            id: 'bd1b6892bcab126a',
          },
          {
            topic: 'enter - Create a sibling node',
            id: 'bd1b6b632a434b27',
          },
          {
            topic: 'del - Remove a node',
            id: 'bd1b983085187c0a',
          },
        ],
      },
      {
        topic: 'Focus mode',
        id: 'bd1b9b94a9a7a913',
        direction: 1,
        expanded: true,
        children: [
          {
            topic: 'Right click and select Focus Mode',
            id: 'bd1bb2ac4bbab458',
          },
          {
            topic: 'Right click and select Cancel Focus Mode',
            id: 'bd1bb4b14d6697c3',
          },
        ],
      },
      {
        topic: 'Left menu',
        id: 'bd1b9d1816ede134',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'Node distribution',
            id: 'bd1ba11e620c3c1a',
            expanded: true,
            children: [
              {
                topic: 'Left',
                id: 'bd1c1cb51e6745d3',
              },
              {
                topic: 'Right',
                id: 'bd1c1e12fd603ff6',
              },
              {
                topic: 'Both l & r',
                id: 'bd1c1f03def5c97b',
              },
            ],
          },
        ],
      },
      {
        topic: 'Bottom menu',
        id: 'bd1ba66996df4ba4',
        direction: 1,
        expanded: true,
        children: [
          {
            topic: 'Full screen',
            id: 'bd1ba81d9bc95a7e',
          },
          {
            topic: 'Return to Center',
            id: 'bd1babdd5c18a7a2',
          },
          {
            topic: 'Zoom in',
            id: 'bd1bae68e0ab186e',
          },
          {
            topic: 'Zoom out',
            id: 'bd1bb06377439977',
          },
        ],
      },
      {
        topic: 'Link',
        id: 'bd1beff607711025',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'Right click and select Link',
            id: 'bd1bf320da90046a',
          },
          {
            topic: 'Click the target you want to link',
            id: 'bd1bf6f94ff2e642',
          },
          {
            topic: 'Modify link with control points',
            id: 'bd1c0c4a487bd036',
          },
        ],
      },
      {
        topic: 'Node style',
        id: 'bd1c217f9d0b20bd',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'Font Size',
            id: 'bd1c24420cd2c2f5',
            style: {
              fontSize: '32',
              color: '#3298db',
            },
          },
          {
            topic: 'Font Color',
            id: 'bd1c2a59b9a2739c',
            style: {
              color: '#c0392c',
            },
          },
          {
            topic: 'Background Color',
            id: 'bd1c2de33f057eb4',
            style: {
              color: '#bdc3c7',
              background: '#2c3e50',
            },
          },
          {
            topic: 'Add tags',
            id: 'bd1cff58364436d0',
            tags: ['Completed'],
          },
          {
            topic: 'Add icons',
            id: 'bd1d0317f7e8a61a',
            icons: ['😂'],
            tags: ['www'],
          },
          {
            topic: 'Bolder',
            id: 'bd41fd4ca32322a4',
            style: {
              fontWeight: 'bold',
            },
          },
          {
            topic: 'Hyper link',
            id: 'bd41fd4ca32322a5',
            hyperLink: 'https://github.com/ssshooter/mind-elixir-core',
          },
        ],
      },
      {
        topic: 'Draggable',
        id: 'bd1f03fee1f63bc6',
        direction: 1,
        expanded: true,
        children: [
          {
            topic: 'Drag a node to another node\nand the former one will become a child node of latter one',
            id: 'bd1f07c598e729dc',
          },
        ],
      },
      {
        topic: 'Export data',
        id: 'beeb7586973430db',
        direction: 1,
        expanded: true,
        children: [
          {
            topic: 'JSON',
            id: 'beeb784cc189375f',
          },
          {
            topic: 'HTML',
            id: 'beeb7a6bec2d68f5',
          },
          {
            topic: 'SVG',
            id: 'beeb7a6bec2d68e6',
          },
        ],
      },
      {
        topic: 'dangerouslySetInnerHTML',
        id: 'c00a1cf60baa44f0',
        children: [
          {
            topic: 'Katex',
            id: 'c00a2264f4532611',
            children: [
              {
                topic: '',
                id: 'c00a2264f4532612',
                dangerouslySetInnerHTML: katexHTML,
              },
            ],
          },
          {
            topic: 'Code Block',
            id: 'c00a2264fdaw32612',
            children: [
              {
                topic: '',
                id: 'c00a2264f4532613',
                dangerouslySetInnerHTML: codeBlock,
              },
            ],
          },
          {
            topic: 'Customized Div',
            id: 'c00a2264f4532615',
            children: [
              {
                topic: '',
                id: 'c00a2264f4532614',
                dangerouslySetInnerHTML: styledDiv,
              },
            ],
          },
        ],
      },
      {
        topic: 'Caution',
        id: 'bd42dad21aaf6bae',
        direction: 0,
        style: {
          background: '#f1c40e',
        },
        expanded: true,
        children: [
          {
            topic: 'Only save manually',
            id: 'bd42e1d0163ebf04',
            expanded: true,
            children: [
              {
                topic: 'Save button in the top-right corner',
                id: 'bd42e619051878b3',
                branchColor: 'green',
                expanded: true,
                children: [],
              },
              {
                topic: 'ctrl + S',
                id: 'bd42e97d7ac35e99',
              },
            ],
          },
        ],
      },
    ],
    expanded: true,
  },
  arrows: [
    {
      id: 'ac5fb1df7345e9c4',
      label: 'Render',
      from: 'beeb784cc189375f',
      to: 'beeb7a6bec2d68f5',
      delta1: {
        x: 142.8828125,
        y: -57,
      },
      delta2: {
        x: 146.1171875,
        y: 45,
      },
    },
    {
      id: 'c00a1cf60ba4f0',
      label: '1211',
      from: 'c00a1cf60baa44f0',
      to: 'beeb7a6bec2d68f5',
      delta1: {
        x: 142.8828125,
        y: -57,
      },
      delta2: {
        x: 146.1171875,
        y: 45,
      },
    },
  ],
  summaries: [
    {
      id: 'a5e68e6a2ce1b648',
      parent: 'bd42e1d0163ebf04',
      start: 0,
      end: 1,
      text: 'summary',
    },
    {
      id: 'a5e6978f1bc69f4a',
      parent: 'bd4313fbac40284b',
      start: 3,
      end: 5,
      text: 'summary',
    },
  ],
  direction: 2,
  theme: {
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
  },
}

export default aboutMindElixir
