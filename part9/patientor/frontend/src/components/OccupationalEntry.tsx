import {OccupationalHealthcareEntry} from '../types';
import WorkOffIcon from '@mui/icons-material/WorkOff';

export const OccupationalEntry = (props: {entry: OccupationalHealthcareEntry}): JSX.Element | null => {
    const entry = props.entry;
    return (
            <div>
                <p>{entry.date}<WorkOffIcon/></p> 
                <em>{entry.description}</em>
                <p>diagnose by {entry.specialist}</p>
                <p>Employer Name: {entry.employerName}</p>
                <p>Sick Leave: {entry.sickLeave && entry.sickLeave.startDate ? entry.sickLeave.startDate : `N/A`} - {entry.sickLeave && entry.sickLeave.endDate ? entry.sickLeave.endDate : `N/A`}</p>
            </div>
            );
};