export enum MailTemplate {
  NewUser = 'new-user.hbs',
  NewPropertyOwner = 'new-property-owner.hbs',
  ForgotPassword = 'forgot-password.hbs',
}

export type MailTemplateData = {
  [MailTemplate.NewUser]: {
    name: string;
  };
  [MailTemplate.NewPropertyOwner]: {
    name: string;
    property: {
      name: string;
      description: string;
    };
  };
  [MailTemplate.ForgotPassword]: {
    name: string;
    reset_url: string;
  };
};

export interface ISendEmail<T extends MailTemplate> {
  to: {
    name: string;
    email: string;
  };
  subject: string;

  template: {
    name: T;

    data: MailTemplateData[T];
  };
}
