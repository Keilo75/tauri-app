import { Center, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { loadProject } from '../../lib/invoke';
import { Project } from '../../models/project/project';
import './Editor.scss';

const Editor: React.FC = () => {
  const [, params] = useRoute('/editor/:path');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = decodeURI(params?.path ?? '');
    loadProject(path).then((projectJSON) => {
      const project: Project = JSON.parse(projectJSON);

      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Center className="editor">
        <Loader />
      </Center>
    );
  }

  return <div className="editor">h</div>;
};

export default Editor;
