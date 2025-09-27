import * as React from 'react';

type YbugTranslationKey =
  | "launcherButton.Title"
  | "feedbackTypeForm.Heading"
  | "feedbackTypeForm.Subheading"
  | "feedbackTypeForm.ButtonSpecific"
  | "feedbackTypeForm.ButtonGeneral"
  | "feedbackForm.Heading"
  | "feedbackForm.RatingLabel"
  | "feedbackForm.TextLabel"
  | "feedbackForm.TextPlaceholder"
  | "feedbackForm.TitleLabel"
  | "feedbackForm.TitlePlaceholder"
  | "feedbackForm.EmailLabel"
  | "feedbackForm.EmailPlaceholder"
  | "feedbackForm.EmailError"
  | "feedbackForm.NameLabel"
  | "feedbackForm.PriorityLabel"
  | "feedbackForm.TypeLabel"
  | "feedbackForm.Types.1"
  | "feedbackForm.Types.2"
  | "feedbackForm.Types.3"
  | "feedbackForm.Types.4"
  | "feedbackForm.PhoneLabel"
  | "feedbackForm.PhoneError"
  | "feedbackForm.NpsLabel"
  | "feedbackForm.Nps.Unlikely"
  | "feedbackForm.Nps.Likely"
  | "feedbackForm.AssigneeLabel"
  | "feedbackForm.ButtonSubmit"
  | "feedbackForm.ButtonCancel"
  | "feedbackForm.RequiredError"
  | "feedbackForm.OptionalText"
  | "feedbackForm.AddScreenshot"
  | "feedbackForm.EditScreenshot"
  | "feedbackForm.AddVideoClip"
  | "feedbackForm.PreviewVideoClip"
  | "feedbackForm.Consent.Label"
  | "feedbackForm.Consent.TosUrl"
  | "feedbackForm.Consent.TosLabel"
  | "feedbackForm.AttachmentsLabel"
  | "feedbackForm.Attachments.DropFilesLabel"
  | "feedbackForm.Attachments.OrBrowseLabel"
  | "feedbackForm.Attachments.BrowseLabel"
  | "feedbackForm.Attachments.MaxFilesError"
  | "feedbackForm.Attachments.FileSizeError"
  | "feedbackForm.Attachments.FileTypeError"
  | "feedbackForm.MaxLengthError"
  | "feedbackForm.BeforeUnload"
  | "screenRecorder.Start"
  | "screenRecorder.Stop"
  | "screenRecorder.Audio.Mute"
  | "screenRecorder.Audio.Unmute"
  | "screenRecorder.Audio.NotSupported"
  | "videoPreview.RecordAgain"
  | "videoPreview.Done"
  | "highlighter.Cancel"
  | "highlighter.Undo"
  | "highlighter.tools.Pencil"
  | "highlighter.tools.Interact"
  | "highlighter.tools.Arrow"
  | "highlighter.tools.Rectangle"
  | "highlighter.tools.ColorPicker"
  | "highlighter.tools.Obfuscate"
  | "highlighter.tools.Text"
  | "highlighter.tools.Text.Placeholder"
  | "highlighter.tools.Text.Save"
  | "highlighter.Done"
  | "thankYouModal.Heading"
  | "thankYouModal.Text"
  | "thankYouModal.Button"
  | "processingModal.Heading"
  | "privacyTour.Title"
  | "privacyTour.Ok"
  | "privacyTour.Obfuscate";

type SetUserType = {
  id: string;
  name: string;
  email: string;
  phone?: string | null | undefined;
  [key: string]: string | null | undefined;
};

type YbugApi = {
  boot: () => void;
  show: (opt?: 'launcher') => void;
  open: (opt?: 'annotate' | 'feedback') => void;
  destroy: () => void;
  setUser: (infos: SetUserType) => void;
  close: () => void;
};

type YbugSettings = {
  feedback?: {
    comment?: string;
    rating?: number;
    email?: string;
    name?: string;
  };
  user?: SetUserType;
  anonymize_elements?: string;
  language_override?: string;
  launcher_position?: 'bottom-left' | 'bottom-right' | 'left-middle' | 'right-middle' | 'top-middle';
  widget_position?: 'center' | 'left' | 'right';
  skip_to?: 'feedback';
  hide_launcher?: boolean;
  console_log?: boolean;
  /**
   * @deprecated Use `translate: { "launcherButton.Title": "Report a problem" }` property instead.
   */
  launcherButton?: never;
  translate?: {
    [key in YbugTranslationKey]?: string;
  };
  translations?: {
    [languageCode: string]: {
      [key in YbugTranslationKey]?: string;
    };
  };
  rating?: boolean; // Rating is disabled by default
  rating_required?: boolean;
  comment?: boolean; // Comment is enabled and required
  comment_required?: boolean;
  name?: boolean; // Name field is disabled
  name_required?: boolean;
  email?: boolean; // Email field is enabled and optional
  email_required?: boolean;
  type?: boolean; // Feedback type (Bug, Improvement, Question, ...)
  type_required?: boolean;
  title?: boolean; // Feedback title/summary field
  title_required?: boolean;
  priority?: boolean; // Feedback priority
  priority_required?: boolean;
  phone?: boolean; // Phone number field
  phone_required?: boolean;
  nps?: boolean; // Net Promoter Score® field
  nps_required?: boolean;
  close_countdown?: number;
  shortcut?: boolean;
  nonce?: string; // CSP nonce
  onload?: () => unknown;
  onopen?: () => unknown;
  onbeforesend?: () => unknown;
  oncancel?: () => unknown;
  onclose?: () => unknown;
};

type YbugContextType = {
  Ybug: YbugApi | null;
  init: (settings: Partial<YbugSettings>) => void;
};

type YbugProviderProps = {
  ybugId: string;
  /*
    If you need for some reason to load the widget from another url than the default widget.ybug.io one
    you can pass the url here. You must ensure that the script at this url will match your ybugId
    eg: https://my.custom.domain/assets/scripts/ybug.js
  */
  url?: string;
  children: React.ReactNode;
  settings?: YbugSettings;
};

const YbugContext = React.createContext<YbugContextType | null>(null);

function useYbugApi(): YbugContextType | null {
  return React.useContext(YbugContext);
}

function YbugProvider({ ybugId, url, children, settings }: YbugProviderProps): JSX.Element {
  const YBUG_DEFAULT_SCRIPT_URL = `https://widget.ybug.io/button/${ybugId}.js`;
  const [ybugApi, setYbugApi] = React.useState<YbugApi | null>(null);

  React.useEffect(() => {
    // @ts-expect-error will not be defined in window
    window.ybug_settings = {
      ...settings,
      id: ybugId,
      onload: () => {
        // @ts-expect-error will not be defined in window
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setYbugApi(window.Ybug);
        settings?.onload?.();
      },
    };
    const script = document.createElement('script');
    script.defer = true;
    script.src = url ?? YBUG_DEFAULT_SCRIPT_URL;
    if (settings?.nonce) {
      script.nonce = settings.nonce;
    }
    document.head.appendChild(script);

    return () => {
      if (ybugApi) {
        ybugApi.destroy();
      }
      script.remove();
    };
  }, []);

  const initYbug: YbugContextType['init'] = (settings) => {
    // @ts-expect-error will not be defined in window
    window.ybug_settings = {
      ...settings,
      id: ybugId,
      onload: () => {
        // @ts-expect-error will not be defined in window
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setYbugApi(window.Ybug);
        settings?.onload?.();
      },
    };
    if (ybugApi) {
      ybugApi.destroy();
      ybugApi.boot();
    }
  };

  return <YbugContext.Provider value={{ Ybug: ybugApi, init: initYbug }}>{children}</YbugContext.Provider>;
}

export type { YbugApi, YbugSettings, SetUserType, YbugContextType, YbugProviderProps, YbugTranslationKey };
export { useYbugApi, YbugProvider };
