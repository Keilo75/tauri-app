import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';

const Editor: React.FC = () => {
  const [, params] = useRoute('/editor/:name/:path');
  const [state, setState] = useState({ name: '', path: '' });

  useEffect(() => {
    if (!params) return;

    const name = decodeURI(params.name);
    const path = decodeURI(params.path);

    setState({ name, path });
  }, []);

  return <div className="editor">{JSON.stringify(state)}</div>;
};

export default Editor;
