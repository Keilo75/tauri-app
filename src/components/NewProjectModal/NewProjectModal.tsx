import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFolder } from '@tabler/icons';
import React, { useState } from 'react';
import { validateProjectName } from '../../lib/validater/project-name/project-name';
import { validateProjectPath } from '../../lib/validater/project-path/project-path';
import { dialog } from '@tauri-apps/api';
import { defaultProject, ProjectInfo } from '../../models/project/project';
import { useLocation } from 'wouter';
import { saveProject } from '../../lib/invoke';

export interface NewProjectModalProps {
  close: () => void;
}

type FormErrors = Record<keyof ProjectInfo, string | undefined>;

const NewProjectModal: React.FC<NewProjectModalProps> = ({ close }) => {
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm<ProjectInfo>({
    initialValues: {
      name: 'TauriBot',
      path: 'C:\\Users\\gesch\\Documents\\BotLab Bots\\TauriBot',
    },
  });

  const handleSubmit = async (values: ProjectInfo) => {
    const errors = await validateValues(values);
    form.setErrors(errors);
    if (Object.values(errors).some((entry) => entry !== undefined)) return;

    setLoading(true);
    try {
      await saveProject(values.name, values.path, defaultProject);
    } catch {}

    setLoading(false);
    close();
    setLocation(encodeURI(`/editor/${values.path}`));
  };

  const validateValues = async (values: ProjectInfo): Promise<FormErrors> => {
    const errors: FormErrors = {
      name: validateProjectName(values.name),
      path: await validateProjectPath(values.path),
    };

    return errors;
  };

  const handleBrowseClick = async () => {
    const selectedDir = await dialog.open({ directory: true });
    if (!selectedDir || Array.isArray(selectedDir)) return;

    form.setFieldValue('path', selectedDir);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={loading} />
      <TextInput label="Project Name" mb="md" {...form.getInputProps('name')} />
      <TextInput
        label="Project Path"
        rightSection={
          <Tooltip label="Browse">
            <ActionIcon onClick={handleBrowseClick} aria-label="Browse">
              <IconFolder size={18} />
            </ActionIcon>
          </Tooltip>
        }
        mb="md"
        {...form.getInputProps('path')}
      />
      <Group position="right">
        <Button onClick={close} variant="default">
          Cancel
        </Button>
        <Button color="teal" type="submit">
          Create
        </Button>
      </Group>
    </form>
  );
};

export default NewProjectModal;
