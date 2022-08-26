/* eslint-disable react/jsx-key */
import CoursePart from "../types";

const Part = ({course}: {course: CoursePart}) => {
    switch (course.type) {
        case "normal":
            return <p>{course.name} {course.exerciseCount} {course.description}</p>
        case "groupProject":
            return <p>{course.name} {course.exerciseCount} {course.groupProjectCount}</p>
        case "submission":
            return <p>{course.name} {course.exerciseCount} {course.description} {course.exerciseSubmissionLink}</p>
    }
}

export default Part