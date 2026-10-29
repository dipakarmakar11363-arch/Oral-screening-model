export interface QuestionnaireData {
  ageGroup: string;
  tobaccoUse: string;
  sugarFrequency: string;
  painSensitivity: string;
  bleedingGums: string;
  lastCheckup: string;
  extraNotes: string;
}

export interface AttentionItem {
  title: string;
  description: string;
  level: 'Routine' | 'Moderate Attention' | 'Special Attention' | string;
}

export interface EducationalReport {
  overallSummary: string;
  visualObservations: string[];
  possibleAreasOfAttention: AttentionItem[];
  lifestyleSuggestions: string[];
  educationalDisclaimer: string;
}

export interface PresetProfile {
  id: string;
  name: string;
  tagline: string;
  data: QuestionnaireData;
  sampleImage: string;
}
