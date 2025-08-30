import type { YbugSettings } from '../index';

// TODO: write proper tests
it('Works', () => {
  expect(true).toBe(true);
});

describe('YbugSettings type', () => {
  it('should allow launcherButton.title property', () => {
    const settings: YbugSettings = {
      id: 'test-id',
      launcherButton: {
        title: 'Custom Title'
      }
    };
    
    expect(settings.launcherButton?.title).toBe('Custom Title');
  });

  it('should allow translate property with launcherButton.title', () => {
    const settings: YbugSettings = {
      id: 'test-id',
      translate: {
        'launcherButton.title': 'Custom Title'
      }
    };
    
    expect(settings.translate?.['launcherButton.title']).toBe('Custom Title');
  });

  it('should allow settings without launcherButton property', () => {
    const settings: YbugSettings = {
      id: 'test-id',
      hide_launcher: true
    };
    
    expect(settings.launcherButton).toBeUndefined();
    expect(settings.translate).toBeUndefined();
  });
});
