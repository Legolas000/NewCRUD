import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import CourseListContainer from './course/CourseListContainer'; 
import AddOrEditCourseContainer from './course/AddOrEditCourseContainer'; 
import createBrowserHistory from 'history/createBrowserHistory';


const history = createBrowserHistory();


const App = () => {
    return (
        <div >
            <Router history={history}>
                <div>

                    <Switch>
                        <Route exact path="/" component={CourseListContainer} />
                        <Route exact path="/course" component={AddOrEditCourseContainer} />
                        <Route path="/course/:id" component={AddOrEditCourseContainer} />
                        <Route component={PageNotFound} />
                    </Switch>

                </div>

            </Router>
        </div>
    );
};


export default App;