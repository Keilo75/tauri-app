import React, { useEffect } from 'react';
import { useRoute } from 'wouter';

const Editor: React.FC = () => {
  const [, params] = useRoute('/editor/:name/:path');

  useEffect(() => {
    if (!params) return;

    const name = decodeURI(params.name);
    const path = decodeURI(params.path);
  }, []);

  return <div className="editor"></div>;
};

export default Editor;
