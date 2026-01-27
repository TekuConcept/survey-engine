import { TagStatus } from '@features/project-card/components/status-tag'

export type ProjectInfo = {
    name: string
    responseCount: number
    totalQuestionCount: number
    totalRuntime: string
    status: TagStatus
}

export const DEMO_PROJECTS: ProjectInfo[] = [
    {
        name: 'Customer Satisfaction Survey',
        responseCount: 128,
        totalQuestionCount: 12,
        totalRuntime: '3 weeks',
        status: TagStatus.Draft,
    },
    {
        name: 'Onboarding Feedback',
        responseCount: 56,
        totalQuestionCount: 9,
        totalRuntime: '5 days',
        status: TagStatus.Active,
    },
    {
        name: 'Event Post-Mortem',
        responseCount: 203,
        totalQuestionCount: 16,
        totalRuntime: '2 months',
        status: TagStatus.Archived,
    },
    {
        name: 'Product Discovery – Q1',
        responseCount: 91,
        totalQuestionCount: 14,
        totalRuntime: '4 weeks',
        status: TagStatus.Draft,
    },
    {
        name: 'NPS – Retail Locations',
        responseCount: 771,
        totalQuestionCount: 8,
        totalRuntime: '6 months',
        status: TagStatus.Stopped,
    },
    {
        name: 'Internal Team Pulse',
        responseCount: 34,
        totalQuestionCount: 10,
        totalRuntime: '2 weeks',
        status: TagStatus.Draft,
    },
]
