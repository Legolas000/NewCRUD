import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';



const coursesReducer = (state = initialState.coursesReducer, action) => {
    switch(action.type) {
        case ActionType.GET_COURSES_RESPONSE: {
            return {
                ...state, 
                courses: _.assign(action.courses)
            };
        }


        default: { return state; }
    }
};



export default coursesReducer;