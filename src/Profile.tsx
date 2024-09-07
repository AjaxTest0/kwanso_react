import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button
} from '@mui/material';
import { User } from './types';

const Profile: React.FC = () => {
    const location = useLocation();
    const user = location.state?.user as User;
    if (!user) {
        return <Typography>No user data available.</Typography>;
    }

    return (



        <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
            <Card>
                <Box display="flex" justifyContent="center" padding={2}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="200"
                        image={user.picture.large}
                        alt={`${user.name.first} ${user.name.last}`}
                        style={{
                            objectFit: 'cover',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%' 
                        }}
                    />
                </Box>
                <CardContent>
                    <Typography variant="h5">{`${user.name.first} ${user.name.last}`}</Typography>
                    <Typography variant="subtitle1">{user.email}</Typography>
                    <Typography color="text.secondary">Gender: {user.gender}</Typography>
                    <Typography color="text.secondary">Date of Birth: {new Date(user.dob.date).toLocaleDateString()} (Age: {user.dob.age})</Typography>
                    <Typography color="text.secondary">Phone: {user.phone}</Typography>
                    <Typography color="text.secondary">Cell: {user.cell}</Typography>
                    <Typography color="text.secondary">Address: {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} ${user.location.postcode}`}</Typography>
                    <Typography color="text.secondary">Coordinates: {`Lat: ${user.location.coordinates.latitude}, Long: ${user.location.coordinates.longitude}`}</Typography>
                    <Typography color="text.secondary">Timezone: {user.location.timezone.description} (Offset: {user.location.timezone.offset})</Typography>
                    <Typography color="text.secondary">Username: {user.login.username}</Typography>
                    <Typography color="text.secondary">Registered: {new Date(user.registered.date).toLocaleDateString()} (Age: {user.registered.age})</Typography>
                    <Typography color="text.secondary">Nationality: {user.nat}</Typography>
                    <Typography color="text.secondary">ID: {user.id.name} ({user.id.value})</Typography>
                    <Box mt={2} display="flex" justifyContent="center" width="100%">
                        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                            Back
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
