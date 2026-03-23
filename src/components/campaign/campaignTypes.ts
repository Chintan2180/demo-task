export type WorkflowMode = 'advanced' | 'standard'

export type CampaignScreen = 'overview' | 'advanced-builder' | 'standard-builder'

export type CampaignType = 'linkedin-invitation'
export type ImportMethod = 'linkedin' | 'csv' | 'lookalike' | 'webhook' | null

export type AdvancedBuilderStage =
  | 'choose-method'
  | 'linkedin-details'
  | 'csv-upload'
  | 'csv-mapping'
  | 'sender-profiles'

export type StandardBuilderStage =
  | 'leads-list'
  | 'target-audience'
  | 'campaign-flow'
