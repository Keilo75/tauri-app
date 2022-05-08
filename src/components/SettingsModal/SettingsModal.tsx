import {
  Button,
  CloseButton,
  Group,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Tabs,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDidUpdate } from '@mantine/hooks';
import { IconSettings, IconTool, IconX } from '@tabler/icons';
import React from 'react';
import { AppSettings } from '../../lib/app-store/app-store';
import './SettingsModal.scss';

export interface SettingsModalProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  close: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onSettingsChange,
  close,
}) => {
  const form = useForm({ initialValues: settings });

  useDidUpdate(() => {
    onSettingsChange(form.values);
  }, [form.values]);

  return (
    <Stack className="settings-modal">
      <CloseButton
        className="close-button"
        aria-label="Close"
        onClick={close}
      />
      <Tabs
        className="settings-modal-content"
        orientation="vertical"
        classNames={{ body: 'tab-body' }}
        tabPadding="lg"
      >
        <Tabs.Tab label="General" icon={<IconSettings size="15" />}>
          <Title order={2} mb="md">
            General
          </Title>
          <RadioGroup
            label="Color Scheme"
            orientation="vertical"
            {...form.getInputProps('general.colorScheme')}
          >
            <Radio value="dark" label="Dark" />
            <Radio value="light" label="Light" />
          </RadioGroup>
        </Tabs.Tab>
        <Tabs.Tab label="Developer" icon={<IconTool size="15" />}>
          <Title order={2} mb="md">
            Developer
          </Title>
          <Switch
            label="Empty folder on new project"
            {...form.getInputProps('developer.emptyFolderOnNewProject', {
              type: 'checkbox',
            })}
          />
        </Tabs.Tab>
      </Tabs>
      <Group position="right">
        <Button onClick={close}>Close</Button>
      </Group>
    </Stack>
  );
};

export default SettingsModal;
