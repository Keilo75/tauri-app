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
import { dialog, path } from '@tauri-apps/api';
import { defaultProject, ProjectInfo } from '../../models/project/project';
import { saveProject } from '../../lib/invoke';

export interface NewProjectModalProps {
  openProject: (folder: string) => Promise<void>;
  close: () => void;
}

type FormErrors = Record<keyof ProjectInfo, string | undefined>;

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  close,
  openProject,
}) => {
  const [loading, setLoading] = useState(false);

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

    const savePath = await path.join(values.path, `${values.name}.botlab`);
    try {
      await saveProject(savePath, defaultProject);
    } catch {}

    setLoading(false);
    openProject(savePath);
    close();
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
