import type { YbugSettings } from '../index';

// Test that demonstrates the exact usage from the user's issue
describe('Issue fix validation', () => {
  it('should support the exact pattern used in the issue', () => {
    // This is the exact code structure from the user's screenshot
    const settings: YbugSettings = {
      id: 'test-id',
      feedback: {
        email: "userData?.email || ''",
        name: "userData?.name || ''",
      },
      language_override: "currentLanguage || 'en'",
      translate: {
        "launcherButton.title": "Custom Title"
      }
    };
    
    expect(settings.translate?.['launcherButton.title']).toBe('Custom Title');
    expect(settings.feedback?.email).toBe("userData?.email || ''");
    expect(settings.feedback?.name).toBe("userData?.name || ''");
    expect(settings.language_override).toBe("currentLanguage || 'en'");
  });
});