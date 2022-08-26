/* eslint-disable react/jsx-key */
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
  interface CoursePartOne extends CoursePartBase {
    description: string;
  }
  
  interface CourseNormalPart extends CoursePartOne {
    type: "normal";
  }
  
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends CoursePartOne {
    type: "submission";
    exerciseSubmissionLink: string;
  }
  
type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

export default CoursePart