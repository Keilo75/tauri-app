import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';

const Editor: React.FC = () => {
  const [, params] = useRoute('/editor/:path');

  useEffect(() => {
    if (!params) return;

    const path = decodeURI(params.path);
  }, []);

  return <div className="editor"></div>;
};

export default Editor;
