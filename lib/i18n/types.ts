export type Lang = "en" | "es";

export interface StepItem {
  title: string;
  body: string;
}

export interface WorkflowStep extends StepItem {
  key: string;
}

export interface CardItem {
  title: string;
  body: string;
}

export interface SecurityItem {
  title: string;
  status: string;
  desc: string;
}

export interface Translations {
  navPlatform: string;
  navWorkspace: string;
  navSecurity: string;
  navManifesto: string;
  navCta: string;
  heroTitle: string;
  heroSub: string;
  heroCtaSecondary: string;
  problemP1: string;
  problemP2: string;
  problemP3: string;
  demoEyebrow: string;
  demoSub: string;
  platformTitle: string;
  platformSub: string;
  practiceAreas: string[];
  cards: CardItem[];
  workspaceEyebrow: string;
  workspaceTitle: string;
  workspaceSub: string;
  workflowSteps: WorkflowStep[];
  visibilityEyebrow: string;
  visibilitySub: string;
  visibilitySteps: StepItem[];
  growthEyebrow: string;
  growthSub: string;
  growthSteps: StepItem[];
  manifestoP1: string;
  manifestoP2: string;
  manifestoP3: string;
  manifestoP4: string;
  manifestoP5: string;
  manifestoP6: string;
  manifestoP7: string;
  manifestoP8: string;
  securityTitle: string;
  securitySub: string;
  securityItems: SecurityItem[];
  securityFeatures: StepItem[];
  footerPrivacy: string;
  footerSecurity: string;
  footerCopy: string;
}
