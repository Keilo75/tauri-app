import { validateProjectName } from './project-name';

describe('validate project name', () => {
  it('is required', () => {
    expect(validateProjectName('')).toEqual('Project Name is required');
    expect(validateProjectName('    ')).toEqual('Project Name is required');
  });

  it('can only contain specific characters', () => {
    expect(validateProjectName('?')).toEqual(
      'Project Name can only contain letters, numbers and spaces'
    );
  });

  it('has a maximum length', () => {
    expect(
      validateProjectName(
        'this name is definetly, without doubt, longer than 30 characters and will thus fail'
      )
    ).toEqual('Project Name must be 10 characters or less');
  });

  it("doesn't error on valid names", () => {
    expect(validateProjectName('valid name')).toBeUndefined();
    expect(validateProjectName('123')).toBeUndefined();
    expect(validateProjectName('TeST NaMe')).toBeUndefined();
  });
});
