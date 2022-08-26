import {HealthCheckEntry} from '../types';
import MedicationIcon from '@mui/icons-material/Medication';


export const HealthCheck = (props: {entry: HealthCheckEntry}): JSX.Element | null => {
    const entry = props.entry;
    return (
            <div>
                <p>{entry.date} <MedicationIcon style={{color: 'red'}}/></p>
                <em> {entry.description} </em>
                <p>diagnose by {entry.specialist}</p>
                <p>Health Check Rating: {entry.healthCheckRating}</p>
            </div>
            );
};