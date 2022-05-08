import { Anchor, Group, Stack, Text, Title } from '@mantine/core';
import { IconFolder, IconPlus } from '@tabler/icons';
import React from 'react';
import Label from '../../components/Label/Label';
import { ProjectInfo } from '../../models/project/project';
import './Home.scss';

export interface HomeProps {
  recentProjects: ProjectInfo[];
  openNewProjectModal: () => void;
}

const Home: React.FC<HomeProps> = ({ recentProjects, openNewProjectModal }) => {
  const handleNewProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openNewProjectModal();
  };

  return (
    <div className="home">
      <Stack spacing={0}>
        <Title order={3}>BotLab</Title>
        <Text>BotLab Slogan</Text>
        <Group className="home-columns" mt="md">
          <div className="home-column">
            <Label>Start</Label>
            <Anchor
              href="#"
              className="home-action"
              onClick={handleNewProjectClick}
            >
              <IconPlus />
              New Project
            </Anchor>
            <Anchor href="#" className="home-action">
              <IconFolder />
              Open Project
            </Anchor>
          </div>
          <div className="home-column">
            <Label>Recent</Label>
            {recentProjects.length === 0 ? (
              <Text>No recent projects.</Text>
            ) : (
              <>
                {recentProjects.slice(0, 15).map((project) => (
                  <div className="recent-project" key={project.path}>
                    <Anchor mr="xs" href="#">
                      {project.name}
                    </Anchor>
                    <div className="project-path">{project.path}</div>
                  </div>
                ))}
                <div className="recent-project">
                  <Anchor href="#">Clear Recently Opened</Anchor>
                </div>
              </>
            )}
          </div>
        </Group>
      </Stack>
    </div>
  );
};

export default Home;
