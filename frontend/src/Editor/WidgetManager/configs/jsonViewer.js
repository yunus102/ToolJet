export const jsonViewerConfig = {
  name: 'JSONViewer',
  component: 'JSONViewer',
  displayName: 'JSON Viewer',
  description: 'Display and explore JSON data',
  defaultSize: {
    width: 15,
    height: 300,
  },
  others: {
    showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
    showOnMobile: { type: 'toggle', displayName: 'Show on mobile' },
  },
  properties: {
    data: {
      type: 'code',
      displayName: 'JSON Data',
      validation: {
        schema: { type: 'object' },
      },
    },
    expandedByDefault: {
      type: 'toggle',
      displayName: 'Expand all by default',
      validation: { schema: { type: 'boolean' } },
    },
  },
  events: {
    onDownload: { displayName: 'On Download' },
  },
  styles: {
    textColor: {
      type: 'color',
      displayName: 'Text Color',
      validation: {
        schema: { type: 'string' },
        defaultValue: '#000000',
      },
    },
    backgroundColor: {
      type: 'color',
      displayName: 'Background Color',
      validation: {
        schema: { type: 'string' },
        defaultValue: '#ffffff',
      },
    },
    fontSize: {
      type: 'number',
      displayName: 'Font Size',
      validation: {
        schema: { type: 'number' },
        defaultValue: 14,
      },
    },
  },
  exposedVariables: {
    data: {},
  },
  definition: {
    others: {
      showOnDesktop: { value: '{{true}}' },
      showOnMobile: { value: '{{false}}' },
    },
    properties: {
      data: { value: `{{ { "a": { "b": [1, 2, 3, 4, 5, 6, 7, 8, 9], "c": { "d": false }, "e": "hi" } } }}` },
      visible: { value: '{{true}}' },
      tooltip: { value: 'This is a tooltip' },
    },
    events: [
      {
        eventId: 'onClick',
        actionId: 'show-alert',
        message: 'Widget clicked!',
      },
    ],
    styles: {
      backgroundColor: { value: '#ffffff' },
      textColor: { value: '#000000' },
      borderRadius: { value: '4px' },
      padding: { value: '10px' },
    },
    generalStyles: {
      visibility: { value: '{{true}}' },
      disabledState: { value: '{{false}}' },
      boxShadow: { value: '0px 0px 0px 0px #00000040' },
    },
    exposedVariables: {
      clickCount: 0,
    },
  },
  actions: [
    {
      handle: 'setData',
      displayName: 'Set Data',
      params: [{ handle: 'data', displayName: 'JSON Data', defaultValue: '{}' }],
    },
    {
      handle: 'downloadJSON',
      displayName: 'Download JSON',
    },
  ],
};
