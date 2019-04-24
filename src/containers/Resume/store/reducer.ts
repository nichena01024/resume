import {ResumeActionTypes, ResumeState} from './types'

const initState: ResumeState = {
    personalInformation: {},
    educations: [],
    experiences: [],
    skills: [],
    projects: []
}

// @ts-ignore
export function resumeReducer(state = initState, action: ResumeActionTypes): ResumeState {
    switch(action.type) {
        case 'UPDATE_RESUME_DATA':
            return {
                ...action.newResume
            }
        case 'SET_RESUME_DATA':
            return {
                ...state,
                [action.section]: action.newData
            }
        case 'DELETE_RESUME_SECTION':
            return {
                ...state,
                [action.section]: action.section === 'educations' ? {} : []
            }
        case 'CHANGE_EDITABLE_STATUS':
            return {
                ...state,
                isEditable: action.status
            }
        default:
            return state
    }
}
