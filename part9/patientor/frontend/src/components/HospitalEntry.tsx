import {HospitalEntry} from '../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export const HospitalE = (props: {entry: HospitalEntry}): JSX.Element | null => {
    const entry = props.entry;
    return (
            <div>
                <p>{entry.date} <MedicalServicesIcon/></p>
                <em>{entry.description}</em>
                <p>diagnose by {entry.specialist}</p>
                <p>Discharge: {entry.discharge.date}: {entry.discharge.criteria}</p>
            </div>
            );
};