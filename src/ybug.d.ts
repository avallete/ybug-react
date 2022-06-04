type SetUserType = {
  id: string;
  name: string;
  email: string;
  phone?: string | null | undefined;
} & { [key: string]: string | null | undefined };

type YbugApi = {
  boot: () => void;
  show: (opt?: 'launcher') => void;
  open: (opt?: 'annotate' | 'feedback') => void;
  destroy: () => void;
  setUser: (infos: SetUserType) => void;
  close: () => void;
};

type YbugSettings = {
  id: string;
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
  onload: () => unknown;
  onopen: () => unknown;
  onbeforesend: () => unknown;
  oncancel: () => unknown;
  onclose: () => unknown;
};

export type { SetUserType, YbugApi, YbugSettings };
