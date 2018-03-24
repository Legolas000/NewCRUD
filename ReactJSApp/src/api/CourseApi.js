import delay from './delay';

const courses = [
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (course) => {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     };
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

class CourseApi {

    static getAllCourses() {
        return new Promise((resolve) => {
            setTimeout(() => {
                fetch(`http://localhost:5000/courses`)
                .then(result=>resolve(result.json()))
            }, delay);

        });
    }

    static saveCourse(course) {
        course = Object.assign({}, course); 
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                const minCourseTitleLength = 1;
                if (course.title.length < minCourseTitleLength) {
                    reject(`Character length is low for ${minCourseTitleLength} `);
                }

                if (course.id) {
                    const existingCourseIndex = courses.findIndex(a => a.id === course.id);
                    courses.splice(existingCourseIndex, 1, course);
                } else {

                    course.id = generateId(course);
                    course.watchHref = `http://www.books.com/courses/${course.id}`;
                    courses.push(course);
                }

                fetch("http://localhost:5000/courses",
                {
                    method: 'post',
                    headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(course)
                })

                resolve(course);
            }, delay);
        });
    }

    static deleteCourse(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                fetch("http://localhost:5000/courses/" + courseId,
                {
                    method: "DELETE"
                })
                resolve();
            }, delay);
        });
    }


    static getCourse(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                fetch(`http://localhost:5000/courses/`+courseId)
                .then(result=>resolve(result.json()))

            }, delay);
        });
    }

}

export default CourseApi;
