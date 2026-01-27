
import { TagStatus } from './components/status-tag'

export interface ProjectInfo {
    name: string
    responseCount: number
    totalQuestionCount: number
    totalRuntime: string // e.g. '2 hours', '46 days', '3 months'
    status: TagStatus
}
