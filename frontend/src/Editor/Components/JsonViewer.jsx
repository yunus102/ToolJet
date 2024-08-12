import React, { useState, useEffect } from 'react';
import { JsonEditor } from 'json-edit-react';

const JSONViewer = function JSONViewer(props) {
  const { width, height, properties, styles, fireEvent, setExposedVariable } = props;
  const { data, expandedByDefault } = properties;
  const { textColor, backgroundColor, fontSize } = styles;

  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      setJsonData(parsedData);
      setExposedVariable('data', parsedData);
    } catch (error) {
      console.error('Invalid JSON data:', error);
      setJsonData({});
      setExposedVariable('data', {});
    }
  }, [data, setExposedVariable]);

  const handleDownload = () => {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    fireEvent('onDownload');
  };

  return (
    <div
      className="json-viewer-component 
"
      // style={{
      //   width,
      //   height,
      //   overflow: 'auto',
      //   position: 'relative',
      //   backgroundColor,
      //   color: textColor,
      //   fontSize: `${fontSize}px`,
      // }}
    >
      <JsonEditor
        data={jsonData}
        collapsible
        collapsed={!expandedByDefault}
        // readOnly
        showOnEdit={false}
        theme={{
          background: backgroundColor,
          color: textColor,
          keys: '#cb4b16',
          string: '#268bd2',
          number: '#859900',
          boolean: '#b58900',
          null: '#dc322f',
          width: '100%',
          height: '100%',
        }}
        height={height}
      />
      <button
        onClick={handleDownload}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          backgroundColor: '#4368E3',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Download
      </button>
    </div>
  );
};

export default JSONViewer;
