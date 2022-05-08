import { validateProjectPath } from './project-path';
import { Crypto } from '@peculiar/webcrypto';
import { clearMocks, mockIPC } from '@tauri-apps/api/mocks';

beforeAll(() => {
  window.crypto = new Crypto();
});

afterEach(() => {
  clearMocks();
});

describe('validate project path', () => {
  mockIPC((cmd, args) => {
    console.log(cmd);
  });

  it('it is required', () => {
    expect(validateProjectPath('')).resolves.toEqual(
      'Project Path is required'
    );
  });

  it('is a valid path', () => {
    mockIPC(() => {
      throw new Error('oh no');
    });

    expect(validateProjectPath('/')).resolves.toEqual(
      'Path is not a valid folder'
    );
  });

  it('is an empty folder', () => {
    mockIPC(() => false);

    expect(validateProjectPath('/')).resolves.toEqual('Folder is not empty');
  });

  it("doesn't error on valid paths", () => {
    mockIPC(() => true);

    expect(validateProjectPath('/')).resolves.toBeUndefined();
  });
});
